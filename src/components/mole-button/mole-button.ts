import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './mole-button.css.js';
import moleImg from '../../../public/images/TopoMontySMP.png';


@customElement('mole-button')
export class MoleButton extends LitElement {
  static styles = styles;

  @property({ type: Boolean }) active = false;

  private _onClick() {
    this.active && navigator.vibrate?.(40);
    this.dispatchEvent(
      new CustomEvent('mole-hit', {
        detail: { active: this.active },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button @click=${this._onClick}>
        ${this.active
          ? html`<img class='mole-img' src="${moleImg}" alt="Mole" />`
          : ''}
      </button>
    `;
  }
}
