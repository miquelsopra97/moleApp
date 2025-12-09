import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import '@open-cells/page-transitions/page-transition-head-styles.js';
import './game-select/game-select.js';
import { globalFontCSS } from '../../styles/global-styles.css.js';
import { DifficultyLevel, TimeMode } from '../models/enums/game-select.enum.js';
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
   * Controller responsible for managing publish/subscribe communication within the OpenCells
   * ecosystem.
   *
   * @private
   * @type {ElementController}
   */
  private readonly controller: ElementController = new ElementController(this);

  /**
   * Reference to the header element inside the shadow DOM. Used for toggling the `scrolled` class
   * based on scroll events.
   *
   * @private
   * @type {HTMLElement | null}
   */
  private headerEl: HTMLElement | null = null;

  static readonly styles = styles;

  /**
   * Current route extracted from the URL hash. Examples:
   *
   * - "home"
   * - "game"
   *
   * @private
   * @type {string}
   */
  @state()
  private currentRoute: string = this.getRoute();

  /**
   * Player name stored and synced via localStorage and events.
   *
   * @private
   * @type {string}
   */
  @state()
  private playerName: string = '';

  /**
   * Currently selected difficulty level.
   *
   * Possible values:
   *
   * - DifficultyLevel.LOW
   * - DifficultyLevel.MEDIUM
   * - DifficultyLevel.HIGH
   *
   * This value is synced with `<game-select>` and broadcast through the controller.
   *
   * @private
   * @type {DifficultyLevel}
   */
  @state()
  private level: DifficultyLevel = DifficultyLevel.LOW;

  /**
   * Selected match duration.
   *
   * Stored as **string**, because `<game-select>` always emits string values.
   *
   * Possible values:
   *
   * - "30" → short match
   * - "60" → medium match
   * - "90" → long match
   *
   * This mirrors the numeric values in `TimeMode`, but intentionally stored as string.
   *
   * @private
   * @type {string}
   */
  @state()
  private time: string = String(TimeMode.SHORT);

  /** Sets up subscriptions and restores saved state. */
  connectedCallback() {
    super.connectedCallback();

    this.controller.subscribe('scroll', (el: HTMLElement) => {
      if (this.headerEl) {
        el.scrollTop > 0
          ? this.headerEl.classList.add('scrolled')
          : this.headerEl.classList.remove('scrolled');
      }
    });

    const savedName = localStorage.getItem('playerName');
    if (savedName) this.playerName = savedName;

    this.controller.subscribe('player-name', (name: string) => {
      this.playerName = name;
      localStorage.setItem('playerName', name);
    });

    globalThis.addEventListener('hashchange', this.onHashChange);
  }

  disconnectedCallback() {
    globalThis.removeEventListener('hashchange', this.onHashChange);
    this.controller.unsubscribe('scroll');
    this.controller.unsubscribe('player-name');
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.headerEl = this.shadowRoot?.querySelector('header') ?? null;
  }

  /**
   * Handles hash change from browser navigation.
   *
   * @private
   */
  private readonly onHashChange = () => {
    this.currentRoute = this.getRoute();
  };

  /**
   * Extracts the route name from the hash URL.
   *
   * @private
   * @returns {string} The current route (default: "home")
   */
  private getRoute() {
    const hash = globalThis.location.hash || '';
    const match = /^#!\/([^?]*)/.exec(hash);
    return match?.[1] || 'home';
  }

  /**
   * Handles difficulty level updates coming from `<game-select>`. Re-broadcasts the new value to
   * the rest of the application.
   *
   * @private
   * @param {CustomEvent} e - Event containing the selected difficulty level.
   */
  private readonly onLevelChange = (e: CustomEvent) => {
    const value = e.detail.value;
    this.level = value;
    this.controller.publish('game-level', value);
  };

  /**
   * Handles match time updates coming from `<game-select>`. Re-broadcasts the selected time value.
   *
   * @private
   * @param {CustomEvent} e - Event containing the selected time.
   */
  private readonly onTimeChange = (e: CustomEvent) => {
    const value = e.detail.value;
    this.time = value;
    this.controller.publish('game-time', value);
  };

  /** Whether the current route corresponds to the game screen. */
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
   * - **Home header:** only shows the Mole Game logo.
   * - **Game header:** shows avatar, player name, difficulty selector and time selector.
   *
   * @private
   * @returns {import('lit').TemplateResult}
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
              .options=${[DifficultyLevel.LOW, DifficultyLevel.MEDIUM, DifficultyLevel.HIGH]}
              @level-change=${this.onLevelChange}
            ></game-select>
            <span class="level-label" style="margin-left: 1rem;">Tiempo</span>
            <game-select
              type="time"
              .value=${this.time}
              .options=${[String(TimeMode.SHORT), String(TimeMode.MEDIUM), String(TimeMode.LONG)]}
              @time-change=${this.onTimeChange}
            ></game-select>
          </div>
        </div>
      </header>
    `;
  }
}
