import {
  css,
  CSSResult,
  html,
  LitElement,
  nothing,
  type TemplateResult,
} from 'npm:lit'
import { customElement, property } from 'npm:lit/decorators.js'
import { ElementID } from '../utils/element-util.ts'
import { styles } from '../utils/styles.ts'
import './section-heading.ts'

declare global {
  interface HTMLElementTagNameMap {
    'page-title': PageTitle
  }
}

@customElement('page-title')
export class PageTitle extends LitElement {
  static override styles: CSSResult = css`
    ${styles}
    .box {
      margin-bottom: var(--half-space);
    }
    .box::after { /* Wraparound float. */
      display: block;
      content: '';
      clear: both;
    }
    small {
      display: block;
      float: right;

      margin-inline-start: 1rem; /* Keep distance from sublabel. */
    }
    time {
      display: inline-block; /* Hack: workaround trailing space. */
    }
  `

  @property()
  label: string = ''
  @property()
  modified: string = ''
  @property()
  published: string = ''
  @property()
  sublabel: string = ''

  protected override render(): TemplateResult {
    let dates
    if (this.published && this.modified) {
      dates = html`
        Published
        <time dateTime=${this.published}>${this.published}</time>;
        modified:
        <time dateTime=${this.modified}>${this.modified}</time>.
      `
    } else if (this.modified) {
      dates = html`
        Modified:
        <time dateTime=${this.modified}>${this.modified}</time>.
      `
    }
    let heading: TemplateResult | typeof nothing = nothing
    if (this.label) {
      heading = html`
        <section-heading id='${ElementID(this.label)}' level=1>
          ${this.label}
        </section-heading>
      `
    }
    return html`
      <div class='box'>
        ${heading}
        <small>${dates}</small>
        ${this.sublabel}
      </div>
    `
  }
}
