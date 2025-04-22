import { css, CSSResult, html, LitElement, type TemplateResult } from 'npm:lit'
import { customElement, property } from 'npm:lit/decorators.js'
import { styles } from '../utils/styles.ts'

declare global {
  interface HTMLElementTagNameMap {
    'instant-photo': InstantPhoto
  }
}

@customElement('instant-photo')
export class InstantPhoto extends LitElement {
  static override styles: CSSResult = css`
    ${styles}
    :host {
      /* I'm unsure of the exact dimensions but these are what my calipers
         reported with a little artistic liberty. */
      --width: 8.85cm;
      --height: 10.75cm;

      /* Prevent squishing. */
      display: block;
      min-width: var(--width);
      min-height: var(--height);
    }
    
    .box {
      width: var(--width);
      height: var(--height);
      /* If the underlying image exceeds the available space, clip it. */
      overflow: hidden;
      /* The corners are rounded. */
      border-top-left-radius: 2px;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 3px;
      border-bottom-left-radius: 1px;
      /* The greyish-white diamond pattern. */
      background: url('data:image/svg+xml,%3C%3Fxml version="1.0" encoding="UTF-8"%3F%3E%3Csvg xmlns="http://www.w3.org/2000/svg" width="1.5mm" height=".75mm" viewBox="0 0 1.5 .75"%3E%3Cpath fill="%23e2ebef60" d="M-.5.375l.5-.25.5.25-.5.25zM1 .375l.5-.25.5.25-.5.25zM.25 0l.5-.25.5.25-.5.25zM.25.75l.5-.25.5.25-.5.25z" /%3E%3C/svg%3E'),
        #d9e2e5;
      box-shadow:
        1px 0.85px 1px 1px rgba(0, 0, 0, 0.15),
        1.5px 2px 2px 2px rgba(0, 0, 0, 0.1);
    }

    .image-area {
      margin-top: 6.5mm;
      margin-right: 6mm;
      margin-left: 6mm;
      margin-bottom: 0;
      position: relative;
    }

    /* to-do: background should be black while image loads in and ideally
       dissolves in on load like film. */
    img {
      display: block;
      width: 7.65cm;
      height: 7.9cm;
      filter: sepia(10%) contrast(1.05) saturate(1.05);
      /* Photo lining. */
      box-shadow: 0 0 0.3px 0.5px #0c080c, 0.5px 0.5px 0.3px 0.5px #faffff,
        0 0 0 2mm rgba(0, 0, 0, 0.015);
      object-fit: cover;
      border-radius: 0.2px 0.1px / 1px 0.5px;
    }

    .image-overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      /* Noisy photo fuzz. */
      background: url('data:image/svg+xml,%3C%3Fxml version="1.0" encoding="UTF-8"%3F%3E%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Cdefs%3E%3Cfilter id="a"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="800" result="noisy" /%3E%3C/filter%3E%3C/defs%3E%3Cpath filter="url(%23a)" d="M0 0l-10 10" /%3E%3C/svg%3E%0A');
      opacity: 0.25;
      top: 0;
      /* Do not receive pointer events. This interferes with right-click. */
      pointer-events: none;
    }

    .caption-container {
      line-height: 2.2cm;
      text-align: center;
      /* Thick padding within the card stock. */
      background: repeating-linear-gradient(
          180deg,
          #0000,
          #0000 3.4mm,
          rgba(0, 0, 0, 0.02) 0,
          rgba(0, 0, 0, 0.02) 2cm
        ),
        repeating-linear-gradient(
          180deg,
          #0000,
          #0000 2.6mm,
          rgba(0, 0, 0, 0.015) 0,
          rgba(0, 0, 0, 0.015) 2.1cm
        );
    }

    .caption {
      padding: 5mm;
      --color: #333;
      display: inline-block;
      vertical-align: middle;
      /* Marker-like. */
      font-weight: bold;
      font-size: 0.9cm;
      font-variant: small-caps;
      font-family: 'Comic Sans', 'Comic Sans MS', 'Lucida Handwriting', 'Chalkboard',
        'Brush Script MT', cursive, sans-serif;
      color: var(--color);
      /* Extra faux-bold. */
      text-shadow: 1px 1px 0 var(--color);
    }
  `

  @property()
  accessor alt: string = ''
  @property()
  accessor src: string = ''

  protected override render(): TemplateResult {
    return html`
      <div class=box>
        <div class="image-area">
          <img alt="${this.alt}" src="${this.src}">
          <div class="image-overlay"></div>
        </div>
        <div class="caption-container">
          <div class="caption"><slot></slot></div>
        </div>
      </div>
    `
  }
}
