import { createExtractor, type Parser } from 'std/front_matter/mod.ts'
import { parse as parseYAML } from 'std/yaml/parse.ts'
import { dateFromYYYYMMDD } from '../types/date.ts'
import type { Meta, Page, PageType } from '../types/page.ts'
import { parseHTML } from './html-parser.ts'

const metaKeys: { readonly [key: string]: true } = {
  dateModified: true,
  datePublished: true,
  keywords: true,
  headline: true,
  hideTitle: true,
  image: true,
  title: true,
} satisfies { [key in keyof Required<Meta>]: true }

export async function parsePage(
  type: PageType,
  url: string,
  markdown: string,
): Promise<Page> {
  const matter = createExtractor({ yaml: parseYAML as Parser })(markdown)
  const meta = parseMeta(url, matter.attrs)
  const html = await parseHTML(meta, matter.body)
  return { meta, html, type, url }
}

function parseMeta(url: string, matter: Partial<Meta>): Meta {
  const unknownKeys = Object.keys(matter).filter((key) => !metaKeys[key])
  if (unknownKeys.length) {
    throw Error(
      `"${url}" meta has unknown props: ${unknownKeys.join(', ')}`,
    )
  }

  const dateModified = matter.dateModified
  if (typeof dateModified !== 'string' || !dateFromYYYYMMDD(dateModified)) {
    throw Error(`"${url}" meta dateModified must be YYYY-MM-DD date string`)
  }

  const datePublished = matter.datePublished
  if (typeof datePublished !== 'string' || !dateFromYYYYMMDD(datePublished)) {
    throw Error(`"${url}" meta datePublished must be YYYY-MM-DD date string`)
  }

  const headline = matter.headline
  if (typeof headline !== 'string' || isBlank(headline)) {
    throw Error(`"${url}" meta headline must be nonblank string`)
  }

  const hideTitle = matter.hideTitle
  if (hideTitle != null && typeof hideTitle !== 'boolean') {
    throw Error(`"${url}" meta hideTitle must be nullish or boolean`)
  }

  const image = matter.image ?? undefined
  if (image != null && (typeof image !== 'string' || isBlank(image))) {
    throw Error(`"${url}" meta image must be nullish or nonblank string`)
  }

  if (!Array.isArray(matter.keywords)) {
    throw Error(`"${url}" meta missing keywords array`)
  }
  const keywords = []
  for (const keyword of matter.keywords) {
    if (typeof keyword !== 'string' || isBlank(keyword)) {
      throw Error(`"${url}" meta keyword must be nonblank string`)
    }
    keywords.push(keyword)
  }

  const title = matter.title
  if (typeof title !== 'string' || isBlank(title)) {
    throw Error(`"${url}" meta title must be nonblank string`)
  }

  return {
    dateModified,
    datePublished,
    keywords,
    headline,
    hideTitle: hideTitle ?? false,
    image,
    title,
  }
}

function isBlank(str: string): boolean {
  return /^\s*$/.test(str)
}
