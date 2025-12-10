import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';

import '@open-cells/page-transitions/page-transition-head-styles.js';
import { globalFontCSS } from '../../styles/global-styles.css.js';

import moleLogo from '../../public/images/logomole.png';

// Inject global fonts into document
document.adoptedStyleSheets = [...document.adoptedStyleSheets, globalFontCSS];

startApp({
  routes,
  mainNode: 'app-content',
  viewLimit: 2,
  persistentPages: [],
  commonPages: [],
});

@customElement('app-index')
export class AppIndex extends LitElement {
  static styles = styles;

  /**
   * Current route extracted from the URL hash.
   *
   * This value determines whether the top header is shown. Example hashes: #!/home → "home" #!/game
   * → "game"
   */
  @state()
  private currentRoute: string = this._getRoute();

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener('hashchange', this._onHashChange);
  }

  disconnectedCallback() {
    globalThis.removeEventListener('hashchange', this._onHashChange);
    super.disconnectedCallback();
  }

  /**
   * Handler for browser hash changes. Updates the `currentRoute` state property.
   *
   * @private
   */
  private readonly _onHashChange = () => {
    this.currentRoute = this._getRoute();
  };

  /**
   * Extracts the active application route from the URL hash.
   *
   * @private
   * @returns {string} Route name extracted from the hash (defaults to `"home"`).
   *
   *   Examples:
   *
   *   - `#!/home` → `"home"`
   *   - `#!/game` → `"game"`
   *   - No hash → `"home"`
   */
  private _getRoute(): string {
    const hash = globalThis.location.hash || '';
    const match = /^#!\/([^?]*)/.exec(hash);
    return match?.[1] || 'home';
  }

  render() {
    const isHome = this.currentRoute === 'home';
    return html`
      ${isHome
        ? html`
            <header class="header header--home">
              <img class="mole-logo" src="${moleLogo}" alt="Mole Game Logo" />
            </header>
          `
        : undefined}
      <main>
        <slot></slot>
      </main>
    `;
  }
}
