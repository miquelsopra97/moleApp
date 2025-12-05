import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './mole-button.css.js';
import moleImg from '../../../public/images/TopoMontySMP.png';

@customElement('mole-button')
export class MoleButton extends LitElement {
  static styles = styles;

  @property({ type: Boolean }) active = false;

private hitSound = new Audio(`${import.meta.env.BASE_URL}sounds/hitmole.mp3`);

  private _onClick() {
    if (this.active) {
      navigator.vibrate?.(40);
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
        ${this.active ? html`<img class="mole-img" src="${moleImg}" alt="Mole" />` : ''}
      </button>
    `;
  }
}