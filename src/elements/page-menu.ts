import { css, CSSResult, html, LitElement, type TemplateResult } from 'npm:lit'
import { customElement } from 'npm:lit/decorators.js'
import { styles } from '../utils/styles.ts'

declare global {
  interface HTMLElementTagNameMap {
    'page-menu': PageMenu
  }
}

// #dirs#
const links: readonly string[][] = [
  ['Notes', '/notes'],
  ['Log', '/log'],
  ['Profile', '/stephen'],
] as const

@customElement('page-menu')
export class PageMenu extends LitElement {
  static override styles: CSSResult = css`
    ${styles}
    menu {
      display: flex;
      column-gap: var(--space);
      row-gap: var(--half-space);
      flex-wrap: wrap;
      list-style: none;
      margin: var(--half-space);
      padding: 0;
      font-size: 20px; /* to-do: font sizing vars */
    }
    @media (max-width: 600px) {
      li:first-child {
        /* Put links on second line. */
        width: 100%;
      }
    }
    li {
      display: flex;
      align-items: center;
    }
    img {
      image-rendering: pixelated;
    }
  `
  // ┌>°┐
  // │  │idoid
  // └──┘

  protected override render(): TemplateResult {
    const items = links.map(
      ([label, href]) => html`<li><a href=${href}>${label}</a></li>`,
    )
    return html`
      <menu>
        <li>
          <a href='/'>
            <img src='/oidoid.png' width='212' height='52' alt='oidoid'>
          </a>
        </li>
        ${items}
      </menu>
    `
  }
}
