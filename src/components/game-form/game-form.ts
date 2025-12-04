import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styles } from './game-form.css.js';

import '../game-input/game-input.js';
import '../game-button/game-button.js';

@customElement('form-game')
export class FormGame extends LitElement {
  static styles = styles;

  @state()
  protected _value: string = '';

  @state()
  protected _error: string | null = null;

  private _onInput(e: CustomEvent) {
    this._value = e.detail.value;
    if (this._error && this._value.trim().length > 0) {
      this._error = null;
    }
  }

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

        <game-button text="Empezar juego" @game-click=${this._onSubmit}></game-button>
        <game-button text="Ver puntuaciones" @game-click=${this._goToScore}></game-button>
      </div>
    `;
  }
}
