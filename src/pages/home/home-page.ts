import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { PageMixin } from '@open-cells/page-mixin';

import '../../components/page-layout/page-layout.js';
import '../../components/game-button/game-button.js';
import '../../components/game-input/game-input.js';
import '../../components/game-form/game-form.js';

// @ts-ignore
@customElement('home-page')
export class HomePage extends PageTransitionsMixin(PageMixin(LitElement)) {
  /**
   * Player name entered from the form. Used when starting the game.
   *
   * @type {string}
   * @protected
   */
  @state()
  protected _playerName: string = '';

  /**
   * Optional error message displayed in the form. Null means no error is shown.
   *
   * @type {string | null}
   * @protected
   */
  @state()
  protected _error: string | null = null;

  /**
   * Lifecycle called after the component is first rendered. Retrieves the page-layout instance
   * inside the shadow/root.
   *
   * @param {any} props - Changed properties.
   */
  firstUpdated(props: any) {
    super.firstUpdated?.(props);
    this._layout = this.renderRoot.querySelector('page-layout');
  }

  /**
   * Handles the `form-submit` event emitted by <form-game>. Saves the player's name, publishes it
   * through the controller, and navigates to the game page.
   *
   * @private
   * @param {CustomEvent} e - Event containing the submitted player name.
   * @event form-submit
   * @detail {value: string}
   */
  private _startGame(e: CustomEvent) {
    const name = e.detail.value;
    localStorage.setItem('playerName', name);
    this.publish('player-name', name);
    this.navigate('game', { playerName: name });
  }

  render() {
    return html`
      <page-layout>
        <form-game
          style="padding-top:2rem"
          @form-submit=${this._startGame}
          @go-score=${() => this.navigate('score')}
        ></form-game>
      </page-layout>
    `;
  }
}
