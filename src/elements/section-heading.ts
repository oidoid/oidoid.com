import { css, CSSResult, LitElement, type TemplateResult } from 'npm:lit'
import { customElement, property } from 'npm:lit/decorators.js'
import { html, unsafeStatic } from 'npm:lit/static-html.js'
import { styles } from '../utils/styles.ts'

declare global {
  interface HTMLElementTagNameMap {
    'section-heading': SectionHeading
  }
}

@customElement('section-heading')
export class SectionHeading extends LitElement {
  static override styles: CSSResult = css`
    ${styles}

    a {
      /* Don't draw attention to the headings being links. */
      color: currentColor;
      text-decoration: none;
    }

    h1, h2, h3, h4, h5, h6 {
      /* About as small as possible without trampling multi-line headings. */
      line-height: 1;

      margin-block-end: 0;
      font-weight: normal;
    }

    h1 {
      font-size: 24px;

      /* h1 is only used for titles which appear at the top of the page. */
      margin-block: 0;
    }
    h2 {font-size: 18px;}
    h3 {font-size: 17px;}
    h4 {font-size: 16px;}
    h5 {font-size: 15px;}
    h6 {font-size: 14px;}
    h3:before {
      display: inline;
      content: '⁚';
    }
    h4:before {
      display: inline;
      content: '⁖';
    }
    h5:before {
      display: inline;
      content: '⁘';
    }
    h6:before {
      display: inline;
      content: '⁙';
    }
    hr {
      border-style: solid;
      border-top-width: 1px;
      border-right-width: 0;
      border-bottom-width: 0;
      border-left-width: 0;
      border-color: var(--color-accent);
      margin-block-start: 2px;
    }
    h2 + hr, h3 + hr, h4 + hr, h5 + hr, h6 + hr {
      margin-block-end: 1rem;
    }
  `

  @property()
  override accessor id: string = ''

  @property({ type: Number })
  accessor level: 1 | 2 | 3 | 4 | 5 | 6 = 1

  protected override render(): TemplateResult {
    const heading = unsafeStatic(`h${this.level}`)
    return html`
      <${heading}>
        ${
      this.id
        ? html`<a href='#${this.id}'><slot></slot></a>`
        : html`<slot></slot>`
    }
      </${heading}>
      <hr>
    `
  }
}
