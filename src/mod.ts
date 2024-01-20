#!/usr/bin/env -S deno --quiet run --allow-read --allow-run --allow-write --check=typescript
import { render } from 'npm:@lit-labs/ssr'
import { type TemplateResult } from 'npm:lit'
import { createWalkEntry } from 'std/fs/_create_walk_entry.ts'
import { expandGlob, WalkEntry } from 'std/fs/mod.ts'
import * as path from 'std/path/mod.ts'
import { renderPageTemplate } from './page-template.ts'
import { parsePage } from './parsers/page-parser.ts'
import { dateCompare, dateFromYYYYMMDD } from './types/date.ts'
import type { Page, PageType } from './types/page.ts'

const filename = path.fromFileUrl(import.meta.url)
const contentDir = path.join(path.dirname(filename), '../content')
const distDir = path.join(path.dirname(filename), '../dist')
// #dirs#
const mdRoutes: readonly Readonly<Route>[] = [
  {
    autoIndex: true,
    dirname: 'log',
    sort: 'datePublished',
    title: 'Log',
    type: 'Log',
  },
  {
    autoIndex: true,
    dirname: 'notes',
    sort: 'dateModified',
    title: 'Notes',
    type: 'Note',
  },
  {
    autoIndex: false,
    dirname: 'stephen',
    sort: 'dateModified',
    title: 'Profile',
    type: 'Profile',
  },
]
const extraMdFilenames: readonly [PageType, string][] = [
  ['Homepage', 'index.md'],
]
const mdExt: string = 'md'
const htmlExt: string = 'html'

type Route = {
  /** Whether to automatically generate an index. */
  autoIndex: boolean
  dirname: string
  sort: 'datePublished' | 'dateModified'
  title: string
  type: PageType
}

async function main(): Promise<void> {
  // await fs.emptyDir(distDir)
  // await fs.copy(contentDir, distDir, { overwrite: true }) // to-do: post Deno bug for symlinks; closest is https://github.com/denoland/deno_std/issues/2619
  const { ok } =
    await exec`cp --archive --no-target-directory ${contentDir} ${distDir}`
  if (!ok) throw Error('content copy failed')
  for (const { autoIndex, dirname, sort, title, type } of mdRoutes) {
    const entries = expandGlob(`${distDir}/${dirname}/**/*.${mdExt}`, {
      includeDirs: false,
    })
    const pages = []
    for await (const entry of entries) {
      const page = await renderPage(entry, type)
      pages.push(page)
    }
    pages
      .sort((lhs, rhs) =>
        dateCompare(
          dateFromYYYYMMDD(lhs.meta[sort]),
          dateFromYYYYMMDD(rhs.meta[sort]),
        )
      )
      .reverse()

    const maxDateModified = pages.length
      ? pages.reduce(
        (max, page) =>
          dateCompare(
              dateFromYYYYMMDD(max),
              dateFromYYYYMMDD(page.meta.dateModified),
            ) < 0
            ? page.meta.dateModified
            : max,
        pages[0]!.meta.dateModified,
      )
      : ''
    const minDatePublished = pages.length
      ? pages.reduce(
        (min, page) =>
          dateCompare(
              dateFromYYYYMMDD(min),
              dateFromYYYYMMDD(page.meta.datePublished),
            ) > 0
            ? page.meta.datePublished
            : min,
        pages[0]!.meta.datePublished,
      )
      : ''
    const keywords = pages.reduce(
      (sum, article) => sum.concat(article.meta.keywords),
      [] as string[],
    )

    if (!autoIndex) continue
    const index: Page = {
      meta: {
        dateModified: maxDateModified,
        datePublished: minDatePublished,
        keywords,
        headline: 'Index',
        hideTitle: false,
        title,
      },
      html: '',
      type: 'Index',
      url: dirname,
    }
    renderIndex(index, pages)
  }
  for (const [type, filename] of extraMdFilenames) {
    const entry = await createWalkEntry(`${distDir}/${filename}`)
    await renderPage(entry, type)
  }
}

async function renderIndex(
  page: Page,
  subpages: readonly Page[],
): Promise<Page> {
  const htmlFilename = `${distDir}/${page.url}/index.${htmlExt}`
  await renderHTML(renderPageTemplate(page, subpages), htmlFilename)
  return page
}

async function renderPage(
  entry: WalkEntry,
  type: PageType,
): Promise<Page> {
  const md = await Deno.readTextFile(entry.path)

  const url = entry.path.slice(distDir.length + 1, -entry.name.length - 1)
  const page = await parsePage(type, url, md)

  const htmlFilename = `${entry.path.slice(0, -mdExt.length)}${htmlExt}`
  await renderHTML(renderPageTemplate(page, []), htmlFilename)

  return page
}

async function renderHTML(
  template: TemplateResult,
  htmlFilename: string,
): Promise<void> {
  const html = []
  for await (const str of render(template)) html.push(str)
  await Deno.writeTextFile(
    htmlFilename,
    `
<!doctype html>
${html.join('\n')}
    `.trim(),
  )
}

await main()

async function exec(
  strs: TemplateStringsArray,
  ...vals: readonly unknown[]
): Promise<{ ok: boolean; text: string }> {
  let cmd = ''
  for (const [i, str] of strs.entries()) {
    // to-do: this is a bit clumsy to stitch everything together than split on
    // space.
    cmd += `${str}${i in vals ? vals[i] : ''}`
  }

  const [exe, ...args] = cmd.trim().split(/\s+/)
  const out = await new Deno.Command(exe!, { args }).output()
  const err = new TextDecoder().decode(out.stderr)
  if (err) console.error(err)
  return { ok: out.success, text: new TextDecoder().decode(out.stdout) }
}
