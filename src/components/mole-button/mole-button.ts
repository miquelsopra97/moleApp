import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './mole-button.css.js';
import moleImg from '../../../public/images/mole.png';

@customElement('mole-button')
export class MoleButton extends LitElement {
  static readonly styles = styles;

  /**
   * Determines whether the mole is visible (active) or hidden. When active:
   *
   * - The mole image is rendered.
   * - Clicking triggers vibration (if supported) and plays a hit sound.
   *
   * @type {boolean}
   */
  @property({ type: Boolean })
  active: boolean = false;

  /**
   * Sound played when an active mole is clicked. Uses the app's BASE_URL to resolve the audio path
   * correctly.
   *
   * @private
   */
  private readonly hitSound = new Audio(`${import.meta.env.BASE_URL}sounds/hitmole.mp3`);

  /**
   * Handles clicks on the button. If the mole is active, plays the hit sound and vibrates the
   * device.
   *
   * Emits:
   *
   * @private
   * @event mole-hit
   * @detail {active: boolean} Indicates whether the mole was active when hit.
   */
  private _onClick() {
    if (this.active) {
      navigator.vibrate?.(80);
      this.hitSound.currentTime = 0;
      this.hitSound.play();
    }

    this.dispatchEvent(
      new CustomEvent('mole-hit', {
        detail: { active: this.active },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <button @click=${this._onClick}>
        ${this.active
          ? html`
              <img class="mole-img" src="${moleImg}" alt="Mole" />
            `
          : undefined}
      </button>
    `;
  }
}
