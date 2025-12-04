import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { PageMixin } from '@open-cells/page-mixin';

import '../../components/page-layout/page-layout.js';
import '../../components/game-button/game-button.js';
import '../../components/game-input/game-input.js';
import '../../components/game-form/game-form.js';

import { PageLayout } from '../../components/page-layout/page-layout.js';

// @ts-ignore
@customElement('home-page')
export class HomePage extends PageTransitionsMixin(PageMixin(LitElement)) {
  private _layout: PageLayout | null = null;

  @state()
  protected _playerName: string = '';

  @state()
  protected _error: string | null = null;

  firstUpdated(props: any) {
    super.firstUpdated?.(props);
    this._layout = this.renderRoot.querySelector('page-layout') as PageLayout | null;
  }

  private _startGame(e: CustomEvent) {
    const name = e.detail.value;
    localStorage.setItem('playerName', name);
    this.publish('player-name', name);
    this.navigate('game', { playerName: name });
  }

  render() {
    return html`
      <page-layout>
        <form-game @form-submit=${this._startGame} @go-score=${() => this.navigate('score')}></form-game>
      </page-layout>
    `;
  }

  onPageLeave() {
    this._layout?.resetScroll();
  }
}
