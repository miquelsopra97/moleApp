import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './mole-table.css.js';
// ajusta la ruta según tu árbol
import '../mole-button/mole-button.js';
import { SIZES_MOLETABLE } from '../../config/mole-config.config.js';

@customElement('mole-table')
export class MoleTable extends LitElement {
  static styles = styles;

  @property({ type: Number }) size = SIZES_MOLETABLE;

  @property({ type: Array }) activeMoles: boolean[] = [];

  private get _totalCells(): number {
    return this.size * this.size;
  }

  private _onMoleHit(index: number, e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('mole-hit', {
        detail: {
          index,
          active: e.detail?.active,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...Array(this._totalCells).keys()].map(index => {
          const isActive = this.activeMoles?.[index] ?? false;
          return html`
            <mole-button
              .active=${isActive}
              @mole-hit=${(e: CustomEvent) => this._onMoleHit(index, e)}
            ></mole-button>
          `;
        })}
      </div>
    `;
  }
}
