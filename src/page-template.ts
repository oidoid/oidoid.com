import { type TemplateResult } from 'npm:lit'
import { unsafeHTML } from 'npm:lit/directives/unsafe-html.js'
import { html, unsafeStatic } from 'npm:lit/static-html.js'
import './elements/instant-photo.ts' // Only used on profile.
import './elements/page-menu.ts'
import './elements/page-title.ts'
import './elements/section-heading.ts'
import './elements/up-link.ts'
import type { Page } from './types/page.ts'
import { styles } from './utils/styles.ts'

type TemplateProps = {
  readonly dateModified: string
  readonly datePublished: string
  readonly keywords: string[]
  readonly headline: string
  readonly image?: string | undefined
  readonly template?: TemplateResult | undefined
  readonly title?: string | undefined
  readonly url: string
}

export function renderPageTemplate(
  page: Page,
  subpages: readonly Page[],
): TemplateResult {
  const templateProps = {
    dateModified: page.meta.dateModified,
    datePublished: page.meta.datePublished,
    headline: page.meta.headline,
    image: page.meta.image,
    keywords: page.meta.keywords,
    title: page.meta.title,
    url: page.url,
  }
  const content = html`${unsafeHTML(page.html)}`

  switch (page.type) {
    case 'Homepage':
    case 'Profile':
      return renderTemplate({ ...templateProps, template: content })

    case 'Index': {
      if (!page.meta.title) throw Error(`"${page.url}" missing title`)
      const isLogs = page.meta.title === 'Log'
      const subcontent = html`
        <table class=zebra>
          <thead>
            <tr>
              <th>${isLogs ? 'Published' : 'Modified'}</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
        ${
        subpages.map((subpage) =>
          html`
              <tr>
                <td style='white-space: nowrap;'>${
            isLogs ? subpage.meta.datePublished : subpage.meta.dateModified
          }</td>
                <td><a href="/${subpage.url}">${subpage.meta.title}</a></td>
                <td>${subpage.meta.headline}</td>
              </tr>
            `
        )
      }
          </tbody>
        </table>
      `
      return renderTemplate({
        ...templateProps,
        template: html`
          <page-title
            modified='${page.meta.dateModified}'
            label='${page.meta.title}'
            published='${page.meta.datePublished}'></page-title>
          ${content}
          ${subcontent}
        `,
      })
    }

    case 'Log':
    case 'Note':
      if (!page.meta.title) throw Error(`"${page.url}" missing title`)
      return renderTemplate({
        ...templateProps,
        template: html`
          ${content}
          <up-link type=${page.type}></up-link>
        `,
      })
  }
}

function renderTemplate(props: TemplateProps): TemplateResult {
  const canonicalURL = `https://oidoid.com/${props.url}`
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: {
      '@type': 'Person',
      name: 'Stephen Niedzielski',
      url: 'https://oidoid.com',
    },
    dateModified: props.dateModified,
    datePublished: props.datePublished,
    headline: props.headline,
    image: props.image,
    name: props.title,
    url: canonicalURL,
    publisher: {
      '@type': 'Organization',
      logo: 'https://oidoid.com/oidoid.png',
      name: 'oidoid',
      url: 'https://oidoid.com',
    },
  })
  return html`
    <html lang='en'>
      <head>
        <meta charset='utf-8'>
        <meta name="viewport" content='width=device-width'>
        <meta name='keywords' content='${props.keywords.join()}'>
        <meta name='theme-color' content='#f2f5f5'>
        <meta name='creator' content='Stephen Niedzielski'>
        <link rel='canonical' href='${canonicalURL}'>
        <meta
          http-equiv='Content-Security-Policy'
          content="upgrade-insecure-requests; form-action 'none'; base-uri 'none'; default-src 'none'; img-src 'self' data:; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; media-src 'self'"
        >
        ${
    unsafeStatic(
      `<title>${props.title ? `${props.title} - oidoid` : 'oidoid'}</title>`,
    )
  }
        <link rel='icon' href='/favicon.png'>
        <style>
          :root {
            --color-background: #f2f5f5;
            --color-paper: #fff;
            --color-accent: #0002;
            /* to-do: other colors and spaces (2px, radii, 4px, border-width), 1rem */
            --space: 32px;
            --half-space: 16px;
            --quarter-space: 8px;
            --paper-width: 800px;

            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 16px;
          }

          ${unsafeStatic(styles.cssText)}

          body {
            margin: 0;
            background-color: var(--color-background);
          }

          .page-body {
            max-width: var(--paper-width);
            overflow: hidden;
            margin-block: 0;
            margin-inline: auto;
          }

          /* to-do: .paper*/

          main {
            padding: var(--space);
            background: var(--color-paper);
            border-width: 1px;
            border-style: solid;
            border-color: #0002;
            border-radius: 2px;
          }

          footer {
            margin: var(--half-space);
            max-width: var(--paper-width);
            font-size: 12px;
          }

          .markdown {
            *, *::after, *::before {
              max-width: 100%;
            }
            a {
              font-weight: bold;
            }

            code {
              background-color: #fffff9;
            }
            pre {
              column-span: all;
              max-height: 100vh;
              display: block;
              overflow-x: auto;
              overflow-y: auto;
              background-color: #fffff9;
              padding: 1rem;
              scroll-padding-top: 2px;
              scroll-padding-inline: 32px;
              scroll-padding-block: 32px;
              outline: 1px solid #f0f0f0;
              border-radius: 2px;
            }
            table {width: 100%; column-span: all;}
            .section-body {
              @media (min-width: 800px) { /* --paper-width */
                column-count: 2;
              }

              p:first-child, ul:first-child, ol:first-child {
                margin-top: 0;
              }
            }
          }
          td, th {
            padding: 6px;
          }
          .zebra {
            a { font-weight: normal;}
            & {
              width: 100%;
              border-spacing: 0;
              border-width: 1px;
              border-style: solid;
              border-color: #0002;
              border-radius: 2px;
            }
            thead tr {
              outline-width: 1px;
              outline-style: solid;
              outline-color: #00000028;
              box-shadow: 0 .5px 0 0 #00000028;
            }
            tbody tr {
              box-shadow: 0 0 1px 0 #00000028;
            }
            thead th {
              font-weight: normal;
              text-align: start;
            }
            tr:nth-child(odd) {
              background-color: #00000008;
            }
          }
        </style>
      </head>
      <body>
        <header><page-menu></page-menu></header>
        <div class='page-body'>
          <main>${props.template}</main>
        </div>
        <footer>© oidoid.</footer>
        ${unsafeStatic(`<script type='application/ld+json'>${jsonld}</script>`)}
      </body>
    </html>
  `
}
