import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-button.css.js';
import { MoleButtonVariant } from '../../models/enums/game-button.enum.js';

@customElement('game-button')
export class GameButton extends LitElement {
  static readonly styles = styles;

  @property({ type: String }) text = '';

  @property({ type: String })
  variant: MoleButtonVariant = MoleButtonVariant.DEFAULT;

  private _onClick() {
    this.dispatchEvent(
      new CustomEvent('game-click', {
        detail: { text: this.text },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const isBack = this.variant === MoleButtonVariant.BACK
    return html`
      <button class=${this.variant} @click=${this._onClick}>
        ${isBack
          ? html`
              <span class="icon">
                <slot name="icon"></slot>
              </span>
            `
          : null}
        <span class="label">${this.text}</span>      </button>
    `;
  }
}
