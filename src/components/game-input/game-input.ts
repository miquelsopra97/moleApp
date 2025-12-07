import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-input.css.js';

@customElement('game-input')
export class GameInput extends LitElement {
  static readonly styles = styles;

  /**
   * Label displayed above the input.
   *
   * @type {string}
   */
  @property({ type: String })
  label = '';

  /**
   * Placeholder text shown inside the input field.
   *
   * @type {string}
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Current value of the input. Sanitized on every keystroke to allow only letters, numbers and
   * spaces.
   *
   * @type {string}
   */
  @property({ type: String })
  value = '';

  /**
   * Error message displayed below the input. When null, no error is shown.
   *
   * @type {string | null}
   */
  @property({ type: String })
  error: string | null = null;

  /**
   * Removes any character that is not alphanumeric or a space.
   *
   * @private
   * @param {string} value - Raw user input.
   * @returns {string} Sanitized string.
   */
  private _sanitize(value: string): string {
    return value.replaceAll(/[^a-zA-Z0-9 ]/g, '');
  }

  /**
   * Handles input changes, sanitizes the value and emits a `game-input` event.
   *
   * @private
   * @param {Event} e - Input event from the <input> element.
   * @event game-input
   * @detail {value: string} The updated sanitized input value.
   */
  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const clean = this._sanitize(target.value);
    this.value = clean;

    this.dispatchEvent(
      new CustomEvent('game-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label class="field">
        ${this.label
          ? html`
              <span class="field__label">${this.label}</span>
            `
          : null}

        <input
          class="field__control"
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this._onInput}
          required
        />

        ${this.error
          ? html`
              <span class="field__error">${this.error}</span>
            `
          : null}
      </label>
    `;
  }
}
