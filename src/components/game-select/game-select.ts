import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-select.css.js';
import { TypeSelect } from '../../models/enums/game-select.enum.js';

@customElement('game-select')
export class GameSelect extends LitElement {
  static readonly styles = styles;

  /** Type of selector: "level" or "time". Controls which values and which event will be emitted. */
  @property({ type: String })
  type: TypeSelect = TypeSelect.LEVEL;

  /** Current selected value. Can be DifficultyLevel or a number depending on the selector. */
  @property({ type: String })
  value: string = '';

  /** Array of options to show in the dropdown. */
  @property({ type: Array })
  options: string[] = [];

  private onChange = (e: Event) => {
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
      <select .value=${this.value} @change=${this.onChange}>
        ${this.options.map(
          (opt) => html`
            <option value="${opt}">${opt}</option>
          `,
        )}
      </select>
    `;
  }
}
