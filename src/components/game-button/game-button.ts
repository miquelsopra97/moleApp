import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-button.css.js';
import { MoleButtonVariant } from './game-button.enum.js';

@customElement('game-button')
export class GameButton extends LitElement {
  static styles = styles;

  @property({ type: String }) text = '';

  @property({ type: Boolean }) disabled = false;

  @property({ type: String })
  variant: MoleButtonVariant = MoleButtonVariant.DEFAULT;

  private _onClick() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('game-click', {
        detail: { text: this.text },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <button class=${this.variant} ?disabled=${this.disabled} @click=${this._onClick}>
        ${this.text}
      </button>
    `;
  }
}
