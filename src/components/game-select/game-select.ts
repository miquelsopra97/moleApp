import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-select.css.js';
import { DifficultyLevel } from '../../models/enums/game-select.enum.js';

@customElement('select-game')
export class SelectGame extends LitElement {
  static readonly styles = styles;

  /**
   * Current selected difficulty level. Must be one of the values from the `DifficultyLevel` enum.
   * Defaults to `DifficultyLevel.LOW`.
   *
   * @type {DifficultyLevel}
   */
  @property({ type: String })
  value: DifficultyLevel = DifficultyLevel.LOW;

  /**
   * Handles changes from the <select> element and emits a `level-change` event.
   *
   * @private
   * @param {Event} e - Change event emitted by the native <select>.
   * @event level-change
   * @detail {value: DifficultyLevel} The newly selected difficulty level.
   */
  private readonly onChange = (e: Event) => {
    const val = (e.target as HTMLSelectElement).value as DifficultyLevel;
    this.value = val;

    this.dispatchEvent(
      new CustomEvent('level-change', {
        detail: { value: val },
        bubbles: true,
        composed: true,
      }),
    );
  };

  render() {
    return html`
      <select .value=${this.value} @change=${this.onChange}>
        <option value="Low">Facil</option>
        <option value="Medium">Medio</option>
        <option value="High">Dificil</option>
      </select>
    `;
  }
}
