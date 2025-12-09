import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './mole-table.css.js';
import '../mole-button/mole-button.js';
import { SIZES_MOLETABLE } from '../../config/mole-config.config.js';

@customElement('mole-table')
export class MoleTable extends LitElement {
  static readonly styles = styles;

  /**
   * Number of columns and rows of the mole grid. The grid is always square (size × size). Defaults
   * to the value defined in `SIZES_MOLETABLE`.
   *
   * @type {number}
   */
  @property({ type: Number })
  size: number = SIZES_MOLETABLE;

  /**
   * Boolean array indicating which mole positions are active. The length should match `size *
   * size`.
   *
   * Example: [false, true, false, ...]
   *
   * @type {boolean[]}
   */
  @property({ type: Array })
  activeMoles: boolean[] = [];

  /**
   * Total number of cells in the grid (computed).
   *
   * @private
   * @returns {number}
   */
  private get _totalCells(): number {
    return this.size * this.size;
  }

  /**
   * Handles `mole-hit` events emitted by individual <mole-button> children. Re-emits the event with
   * additional context:
   *
   * - The index of the mole clicked.
   * - Whether it was active when hit.
   *
   * @private
   * @param {number} index - Position of the mole in the grid.
   * @param {CustomEvent} e - Original event from <mole-button>.
   * @event mole-hit
   * @detail {index: number, active: boolean}
   */
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
        ${[...new Array(this._totalCells).keys()].map((index) => {
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
