import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './game-header.css.js';
import { DifficultyLevel, TimeMode } from '../../models/enums/game-select.enum.js';
import '../game-select/game-select.js';

@customElement('game-header')
export class GameHeader extends LitElement {
  static styles = styles;

  /**
   * Player name displayed in the header.
   *
   * - Received from `<game-page>`
   * - Used to show both the avatar initial and the player's full name
   * - Defaults to `"Player"` when no name is provided
   *
   * @type {string}
   */
  @property({ type: String })
  playerName: string = 'Player';

  /**
   * Current difficulty level selected in the game.
   *
   * - Received from `<game-page>`
   * - Determines mole speed and scoring behavior
   * - Uses the `DifficultyLevel` enum
   *
   * @type {DifficultyLevel}
   */
  @property({ type: String })
  level: DifficultyLevel = DifficultyLevel.LOW;

  /**
   * Current game duration (in seconds).
   *
   * - Received from `<game-page>`
   * - Used by the countdown timer
   * - Value comes as a string because it is bound to a `<select>`
   *
   * @type {string}
   */
  @property({ type: String })
  time: string = String(TimeMode.SHORT);

  /**
   * Computes the first letter of the player's name. Used as the avatar initial.
   *
   * @returns {string} Uppercase first character of `playerName`.
   */
  private get _initial(): string {
    return (this.playerName || 'P')[0].toUpperCase();
  }

  /**
   * Handles "level-change" events coming from <game-select>. Updates the internal value and
   * re-dispatches the event upward as `"header-level"` so the parent (game-page) receives it.
   *
   * @param {CustomEvent} e - Event containing the selected difficulty.
   */
  private _onLevel(e: CustomEvent) {
    const value = e.detail.value;
    this.level = value;

    this.dispatchEvent(
      new CustomEvent('header-level', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Handles "time-change" events coming from <game-select>. Updates the internal time and
   * re-dispatches the change upward as `"header-time"` so <game-page> can update timer settings.
   *
   * @param {CustomEvent} e - Event containing the selected duration.
   */
  private _onTime(e: CustomEvent) {
    const value = e.detail.value;
    this.time = value;

    this.dispatchEvent(
      new CustomEvent('header-time', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <header class="header">
        <div class="header__left">
          <div class="avatar">${this._initial}</div>
          <span class="player">${this.playerName}</span>
        </div>
        <div class="header__right">
          <span class="label">Nivel</span>
          <game-select
            .value=${this.level}
            .options=${[DifficultyLevel.LOW, DifficultyLevel.MEDIUM, DifficultyLevel.HIGH]}
            @level-change=${this._onLevel}
          ></game-select>
          <span class="label" style="margin-left:1rem;">Tiempo</span>
          <game-select
            type="time"
            .value=${this.time}
            .options=${[String(TimeMode.SHORT), String(TimeMode.MEDIUM), String(TimeMode.LONG)]}
            @time-change=${this._onTime}
          ></game-select>
        </div>
      </header>
    `;
  }
}
