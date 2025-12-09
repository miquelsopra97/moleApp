import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import '@open-cells/page-transitions/page-transition-head-styles.js';
import './game-select/game-select.js';
import { globalFontCSS } from '../../styles/global-styles.css.js';
import { DifficultyLevel } from '../models/enums/game-select.enum.js';
import moleLogo from '../../public/images/logomole.png';

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
   * Controller handling event publishing and subscriptions between components in the OpenCells
   * ecosystem.
   *
   * @private
   */
  private readonly controller = new ElementController(this);

  /**
   * Reference to the header element inside the component’s shadow DOM. Used to toggle the
   * `scrolled` class when page scrolls.
   *
   * @private
   */
  private headerEl: HTMLElement | null = null;

  static readonly styles = styles;

  /**
   * Current active route extracted from the URL hash. Determines which view/layout should be
   * rendered.
   *
   * @private
   * @type {string}
   */
  @state()
  private currentRoute = this.getRoute();

  /**
   * Player name stored in localStorage and updated through events. Displayed in the header during
   * the game.
   *
   * @private
   * @type {string}
   */
  @state()
  private playerName = '';

  /**
   * Current selected difficulty level. Synced with <select-game> and broadcasted via
   * ElementController.
   *
   * @private
   * @type {DifficultyLevel}
   */
  @state()
  private level: DifficultyLevel = DifficultyLevel.LOW;

  /** Sets up event subscriptions and restores user preferences. */
  connectedCallback() {
    super.connectedCallback();

    // Listen to scroll events from page-layout
    this.controller.subscribe('scroll', (el: HTMLElement) => {
      if (this.headerEl) {
        el.scrollTop > 0
          ? this.headerEl.classList.add('scrolled')
          : this.headerEl.classList.remove('scrolled');
      }
    });

    // Restore player name from localStorage
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      this.playerName = savedName;
    }

    // Listen for updates to player name
    this.controller.subscribe('player-name', (name: string) => {
      this.playerName = name;
      localStorage.setItem('playerName', name);
    });

    // Listen for hash route changes
    globalThis.addEventListener('hashchange', this.onHashChange);
  }

  /** Clean-up: unsubscribe from controller events and remove listeners. */
  disconnectedCallback() {
    globalThis.removeEventListener('hashchange', this.onHashChange);
    this.controller.unsubscribe('scroll');
    this.controller.unsubscribe('player-name');
    super.disconnectedCallback();
  }

  /** Obtains reference to the <header> element after render. */
  firstUpdated() {
    this.headerEl = this.shadowRoot?.querySelector('header') ?? null;
  }

  /**
   * Updates the current route when the location hash changes.
   *
   * @private
   */
  private readonly onHashChange = () => {
    this.currentRoute = this.getRoute();
  };

  /**
   * Extracts the route from the location hash using the pattern `#!/something`.
   *
   * @private
   * @returns {string} The current route name, e.g. "home" or "game".
   */
  private getRoute() {
    const hash = globalThis.location.hash || '';
    const match = new RegExp(/^#!\/([^?]*)/).exec(hash);
    return match?.[1] || 'home';
  }

  /**
   * Handles difficulty level changes from <select-game> and broadcasts the update through
   * ElementController.
   *
   * @private
   * @param {CustomEvent} e - Contains the new difficulty level in `detail.value`.
   */
  private readonly onLevelChange = (e: CustomEvent) => {
    const value = e.detail.value as DifficultyLevel;
    this.level = value;
    this.controller.publish('game-level', value);
  };

  /**
   * Whether the current route corresponds to the game screen.
   *
   * @private
   * @returns {boolean}
   */
  private get isGame() {
    return this.currentRoute === 'game';
  }

  render() {
    return html`
      ${this.renderHeader()}
      <main>
        <slot></slot>
      </main>
    `;
  }

  /**
   * Renders the dynamic header:
   *
   * - Home header (minimal)
   * - Game header (avatar, player name, difficulty selector)
   *
   * @private
   * @returns {TemplateResult}
   */
  private renderHeader() {
    if (!this.isGame) {
      return html`
        <header class="header header--home">
          <img class="mole-logo" src="${moleLogo}" alt="Mole Game Logo" />
        </header>
      `;
    }

    const initial = (this.playerName || 'P')[0].toUpperCase();

    return html`
      <header class="header header--game">
        <div class="header-content">
          <div class="header-left">
            <div class="avatar">${initial}</div>
            <span class="player-name">${this.playerName || 'Player'}</span>
          </div>
          <div class="header-right">
            <span class="level-label">Nivel</span>
            <game-select
              .value=${this.level}
              .options=${['Facil', 'Medio', 'Dificil']}
              @level-change=${this.onLevelChange}
            ></game-select>
          </div>
        </div>
      </header>
    `;
  }
}
