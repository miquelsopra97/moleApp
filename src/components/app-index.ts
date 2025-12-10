import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
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
  /**
   * Global ElementController (OpenCells). Used only to subscribe to the `player-name` event
   * dispatched by other pages.
   */
  private readonly controller: ElementController = new ElementController(this);

  static styles = styles;

  /** Current route extracted from the URL hash. Updated whenever the hash changes. */
  @state()
  private currentRoute: string = this.getRoute();

  /**
   * Lifecycle: component attached to the DOM.
   *
   * - Loads saved player name
   * - Subscribes to the global `player-name` event
   * - Sets up a listener for hash-based navigation
   */
  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener('hashchange', this._onHashChange);
  }

  /** Lifecycle: component removed from the DOM. Cleans event listeners and controller subscriptions. */
  disconnectedCallback() {
    globalThis.removeEventListener('hashchange', this._onHashChange);
    this.controller.unsubscribe('player-name');
    super.disconnectedCallback();
  }

  /** Triggered whenever the URL hash changes. Updates the current route accordingly. */
  private readonly _onHashChange = () => {
    this.currentRoute = this.getRoute();
  };

  /**
   * Extracts the active route from the URL hash.
   *
   * Examples: #!/home → "home" #!/game → "game"
   *
   * If no match is found, "home" is returned by default.
   */
  private getRoute() {
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
