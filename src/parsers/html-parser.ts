import {
  marked,
  RendererExtension,
  RendererExtensionFunction,
  RendererThis,
  Token,
  TokenizerExtension,
  TokenizerThis,
  Tokens,
} from 'marked'
import { escape } from 'std/html/mod.ts'
import { Meta } from '../types/page.ts'
import { ElementID } from '../utils/element-util.ts'

export async function parseHTML(meta: Meta, markdown: string): Promise<string> {
  marked.use({ extensions: [new SectionExtension(meta)] }, {
    renderer: {
      code(code) {
        // Unindent fences. Fences are indented so the section parser doesn't
        // need to discriminate headings within fences. Four space-prefix blocks
        // without the ``` openers and closers should work too.
        // deno-lint-ignore no-regex-spaces
        return `<pre>${(code.text.replace(/^  /mg, ''))}</pre>`
      },
    },
  })
  const html = await marked.parse(
    `# ${meta.hideTitle ? '' : meta.title}\n${markdown}`, // Inject the title from meta.
    { gfm: true },
  )
  return `<div class='markdown'>${html}</div>`
}

type HeadingToken = Tokens.Generic & {
  heading: { level: number; text: string | undefined; tokens: Token[] }
}

class SectionExtension implements TokenizerExtension, RendererExtension {
  readonly name = 'section'
  readonly level = 'block'

  constructor(meta: Meta) {
    this.renderer = function (this: RendererThis, token: Tokens.Generic) {
      return renderSection.call(
        this,
        <HeadingToken> token,
        meta,
      )
    }
  }

  tokenizer(this: TokenizerThis, src: string): HeadingToken | undefined {
    const match = src.match(
      /(?<hash>^#{1,6}) (?<heading>[^\n]*)(?<body>[^]*?)(?=\n#|$)/,
    )
    if (!match?.groups?.hash) return

    return {
      type: 'section',
      raw: match[0],
      heading: {
        level: match.groups.hash.length,
        text: match.groups.heading,
        tokens: match.groups.heading == null
          ? []
          : this.lexer.inline(match.groups.heading), // Parse the heading.
      },
      tokens: match.groups.body == null
        ? []
        : this.lexer.blockTokens(match.groups.body), // Parse the body.
    }
  }

  renderer: RendererExtensionFunction = () => undefined
}

function renderSection(
  this: RendererThis,
  token: HeadingToken,
  meta: Meta,
): string {
  let heading
  if (token.heading.level === 1) {
    heading = token.heading.text
      ? `
      <page-title
        modified='${escape(meta.dateModified)}'
        label='${escape(meta.title ?? '')}'
        published='${escape(meta.datePublished)}'
        sublabel='${escape(meta.title ? meta.headline : '')}'></page-title>
    `
      : ''
  } else {
    heading = `
      <section-heading
        id='${ElementID(token.heading.text ?? '')}'
        level=${token.heading.level}
      >
        ${this.parser.parseInline(token.heading.tokens)}
      </section-heading>
    `.trim()
  }
  return `
    <section>
      ${heading}
      <div class="section-body">${this.parser.parse(token.tokens ?? [])}</div>
    </section>
  `
}
