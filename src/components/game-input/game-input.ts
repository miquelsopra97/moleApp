import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-input.css.js';

@customElement('game-input')
export class GameInput extends LitElement {
  static styles = styles;

  @property({ type: String }) label = '';

  @property({ type: String }) placeholder = '';

  @property({ type: String }) value = '';

  @property({ type: String }) error: string | null = null;

  private _sanitize(value: string): string {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  }

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
        ${this.label ? html`<span class="field__label">${this.label}</span>` : null}

        <input
          class="field__control"
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this._onInput}
          required
        />

        ${this.error ? html`<span class="field__error">${this.error}</span>` : null}
      </label>
    `;
  }
}
