import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styles } from './game-form.css.js';

import '../game-input/game-input.js';
import '../game-button/game-button.js';

@customElement('form-game')
export class FormGame extends LitElement {
  static readonly styles = styles;

  /**
   * Current value of the input field. Updated on every `game-input` event emitted by <game-input>.
   *
   * @type {string}
   * @protected
   */
  @state()
  protected _value: string = '';

  /**
   * Error message shown below the input. Null when no error should be displayed.
   *
   * @type {string | null}
   * @protected
   */
  @state()
  protected _error: string | null = null;

  /**
   * Handles input updates from <game-input>. Clears the error when the value becomes valid.
   *
   * @param {CustomEvent} e - Contains the updated field value.
   */
  private _onInput(e: CustomEvent) {
    this._value = e.detail.value;
    if (this._error && this._value.trim().length > 0) {
      this._error = null;
    }
  }

  /**
   * Validates the input and emits a `form-submit` event. If the name is empty, sets an error
   * message instead.
   *
   * @event form-submit
   * @detail {value: string} Player name submitted by the form.
   */
  private _onSubmit() {
    const name = this._value.trim();

    if (!name) {
      this._error = 'Por favor introduce un nombre válido.';
      return;
    }

    this.dispatchEvent(
      new CustomEvent('form-submit', {
        detail: { value: name },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Emits a `go-score` event to navigate to the score screen.
   *
   * @event go-score
   */
  private _goToScore() {
    this.dispatchEvent(
      new CustomEvent('go-score', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="form-container">
        <game-input
          label="Nombre del jugador"
          placeholder="Escribe tu nombre"
          .value=${this._value}
          .error=${this._error}
          @game-input=${this._onInput}
        ></game-input>
        <game-button text="Empezar Juego" @game-click=${this._onSubmit}></game-button>
        <game-button text="Ver Resultados" @game-click=${this._goToScore}></game-button>
      </div>
    `;
  }
}
