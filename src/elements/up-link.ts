import { css, CSSResult, html, LitElement, type TemplateResult } from 'npm:lit'
import { customElement, property } from 'npm:lit/decorators.js'
import { PageType } from '../types/page.ts'
import { styles } from '../utils/styles.ts'

declare global {
  interface HTMLElementTagNameMap {
    'up-link': UpLink
  }
}

// #dirs#
const parentURL: { readonly [type in PageType]: string } = {
  'Homepage': '/',
  'Index': '/',
  'Log': '/log',
  'Note': '/notes',
  'Profile': '/',
}

const parentText: { readonly [type in PageType]: string } = {
  'Homepage': 'homepage',
  'Index': 'homepage',
  'Log': 'log index',
  'Note': 'notes index',
  'Profile': 'homepage',
}

@customElement('up-link')
export class UpLink extends LitElement {
  static override styles: CSSResult = css`
    ${styles}
    a {
      display: inline-block;
      margin-block-start: var(--half-space);
    }
  `

  @property()
  accessor type: PageType | undefined

  protected override render(): TemplateResult {
    if (!this.type) throw Error('missing type')
    return html`
      <a href='${parentURL[this.type]}'>
        🖜 Back to the ${parentText[this.type]}
      </a>.
    `
  }
}
