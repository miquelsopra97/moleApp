import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-select.css.js';
import { TypeSelect } from '../../models/enums/game-select.enum.js';

@customElement('game-select')
export class GameSelect extends LitElement {
  /** Component styles */
  static readonly styles = styles;

  /**
   * Type of selector.
   *
   * - `"level"` → emits `level-change`
   * - `"time"` → emits `time-change`
   *
   * @type {TypeSelect}
   */
  @property({ type: String })
  type: TypeSelect = TypeSelect.LEVEL;

  /**
   * Current selected value. It can be:
   *
   * - A DifficultyLevel string
   * - A numeric time represented as string
   *
   * @type {string}
   */
  @property({ type: String })
  value: string = '';

  /**
   * List of values to display in the `<select>` element. Each entry becomes an `<option>`.
   *
   * @type {string[]}
   */
  @property({ type: Array })
  options: string[] = [];

  /**
   * Handles `<select>` change events.
   *
   * - Updates the component's `value`
   * - Emits:
   *
   *   - `level-change` when type = "level"
   *   - `time-change` when type = "time"
   *
   * @private
   * @param {Event} e - The native change event from <select>
   */
  private _onChange = (e: Event) => {
    const val = (e.target as HTMLSelectElement).value;

    this.value = val;

    const eventName = this.type === TypeSelect.LEVEL ? 'level-change' : 'time-change';

    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { value: val },
        bubbles: true,
        composed: true,
      }),
    );
  };

  render() {
    return html`
      <select .value=${this.value} @change=${this._onChange}>
        ${this.options.map(
          (opt) => html`
            <option value="${opt}">${opt}</option>
          `,
        )}
      </select>
    `;
  }
}
