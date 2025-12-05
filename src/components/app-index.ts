import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import '@open-cells/page-transitions/page-transition-head-styles.js';
import './game-select/game-select.js';
import { globalFontCSS } from '../styles/global-styles.css.js';
import { DifficultyLevel } from '../models/enums/game-select.enum.js'


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
  private controller = new ElementController(this);
  private headerEl: HTMLElement | null = null;

  static styles = styles;

  @state() private currentRoute = this.getRoute();
  @state() private playerName = '';
  @state() private level: DifficultyLevel = DifficultyLevel.HIGH;

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
    if (savedName) {
      this.playerName = savedName;
    }

    this.controller.subscribe('player-name', (name: string) => {
      this.playerName = name;
      localStorage.setItem('playerName', name);
    });

    window.addEventListener('hashchange', this.onHashChange);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.onHashChange);
    this.controller.unsubscribe('scroll');
    this.controller.unsubscribe('player-name');
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.headerEl = this.shadowRoot?.querySelector('header') ?? null;
  }

  private onHashChange = () => {
    this.currentRoute = this.getRoute();
  };

  private getRoute() {
    const hash = window.location.hash || '';
    const match = hash.match(/^#!\/([^?]*)/);
    return match?.[1] || 'home';
  }

  private onLevelChange = (e: CustomEvent) => {
    const value = e.detail.value as 'Low' | 'Medium' | 'High';
    this.level = value as DifficultyLevel;
    this.controller.publish('game-level', value);
  };

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

  private renderHeader() {
    if (!this.isGame) {
      return html`<header class="header header--home"></header>`;
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
            <span class="level-label">Level</span>
            <select-game .value=${this.level} @level-change=${this.onLevelChange}></select-game>
          </div>
        </div>
      </header>
    `;
  }
}
