import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-button.css.js';
import { MoleButtonVariant } from '../../models/enums/game-button.enum.js';

@customElement('game-button')
export class GameButton extends LitElement {
  static readonly styles = styles;

  /**
   * Text displayed inside the button.
   *
   * @type {string}
   */
  @property({ type: String })
  text = '';

  /**
   * Visual style of the button.\
   * Accepts values from the `MoleButtonVariant` enum (e.g., DEFAULT, BACK).\
   * When set to BACK, an icon slot will be rendered before the label.
   *
   * @type {MoleButtonVariant}
   */
  @property({ type: String })
  variant: MoleButtonVariant = MoleButtonVariant.DEFAULT;

  /**
   * Event emitted when the button is clicked. Event name: `game-click`
   *
   * @event game-click
   * @detail {text: string} Sends the current button text.
   */
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
    const isBack = this.variant === MoleButtonVariant.BACK;
    return html`
      <button class=${this.variant} @click=${this._onClick}>
        ${isBack
          ? html`
              <span class="icon">
                <slot name="icon"></slot>
              </span>
            `
          : null}
        <span class="label">${this.text}</span>
      </button>
    `;
  }
}
