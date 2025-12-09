import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';

import '../../components/page-layout/page-layout.js';
import '../../components/mole-table/mole-table.js';
import '../../components/game-button/game-button.js';
import '../../components/game-select/game-select.js';

import {
  getMoleSettings,
  getRandomMoleIndex,
  generateActiveMoles,
  SIZES_MOLETABLE,
} from '../../config/mole-config.config.js';

import { saveScore } from '../../config/score-config.config.js';
import { DifficultyLevel, TimeMode } from '../../models/enums/game-select.enum.js';
import { MoleMode } from '../../models/enums/moles-mode.enum.js';

// @ts-ignore
@customElement('game-page')
export class GamePage extends PageTransitionsMixin(PageMixin(LitElement)) {
  /**
   * Player name, coming from navigation params or localStorage.
   *
   * @type {string}
   * @protected
   */
  @state()
  protected _playerName = '';

  /**
   * Current score accumulated during the match.
   *
   * @type {number}
   * @protected
   */
  @state()
  protected _score = 0;

  /**
   * Indicates whether the game is currently active.
   *
   * @private
   * @type {boolean}
   */
  @state()
  private _isPlaying = false;

  /**
   * Boolean grid indicating which moles are active.
   *
   * @private
   * @type {boolean[]}
   */
  @state()
  private _activeMoles: boolean[] = new Array(SIZES_MOLETABLE * SIZES_MOLETABLE).fill(false);

  /**
   * Interval ID for the mole appearance loop.
   *
   * @private
   * @type {number | null}
   */
  @state()
  private _intervalId: number | null = null;

  /**
   * Difficulty level (Low, Medium, High).
   *
   * @private
   * @type {DifficultyLevel}
   */
  @state()
  private level: DifficultyLevel = DifficultyLevel.LOW;

  /**
   * Time remaining in the match, in seconds.
   *
   * @private
   * @type {number}
   */
  @state()
  private _timeLeft: TimeMode = TimeMode.SHORT;

  @state()
  private _selectedTime: string = '30';

  /**
   * Current mole spawn mode.
   *
   * - `1` → Only one mole appears at a time.
   * - `2` → Two moles appear simultaneously in random positions.
   *
   * @private
   * @type {1 | 2}
   */
  @state()
  private _molesMode: MoleMode = MoleMode.ONE;

  /**
   * Interval ID for the timer countdown.
   *
   * @private
   * @type {number | null}
   */
  private _timerId: number | null = null;

  /** Loads player name, subscribes to events and difficulty changes. */
  firstUpdated(props: any) {
    super.firstUpdated?.(props);

    const playerName = this.params?.playerName as string | undefined;
    const savedName = localStorage.getItem('playerName');

    // Restore player name
    if (playerName) {
      this._playerName = playerName;
    } else if (savedName) {
      this._playerName = savedName;
    } else {
      this._playerName = 'Player';
    }

    // Listen for player name updates
    this.subscribe('player-name', (name: string) => {
      this._playerName = name;
      localStorage.setItem('playerName', name);
    });

    // Listen for difficulty changes (from AppIndex)
    this.subscribe('game-level', (level: DifficultyLevel) => {
      this.level = level;

      // Restart loop immediately if game is ongoing
      if (this._isPlaying) {
        this._stopLoop();
        this._startLoop();
      }
    });
  }

  /** Clean up subscriptions when leaving the page. */
  disconnectedCallback(): void {
    this.unsubscribe('player-name');
    this.unsubscribe('game-level');
    super.disconnectedCallback();
  }

  /**
   * Handles a mole click. Only active moles increase the score.
   *
   * @private
   * @param {CustomEvent} e - Event detail contains `{ active: boolean }`
   */
  private _handleMoleHit(e: CustomEvent) {
    if (this._isPlaying && e.detail?.active) {
      const { points } = getMoleSettings(this.level);
      this._score += points;
    }
  }

  /**
   * Stops and clears the countdown timer.
   *
   * @private
   */
  private _clearTimer() {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  }

  /**
   * Toggles the mole spawn mode between:
   *
   * - `1` → Only one mole appears at a time.
   * - `2` → Two moles appear at the same time.
   *
   * Each click on the button switches between the two modes.
   *
   * @private
   */
  private _controlMolesMode() {
    this._molesMode = this._molesMode === MoleMode.ONE ? MoleMode.TWO : MoleMode.ONE;
  }

  private onTimeChange = (e: CustomEvent) => {
    const newTime = Number(e.detail.value);
    this._selectedTime = newTime.toString();
    this._clearGame();
    this._timeLeft = newTime;
  };

  /**
   * Saves the player's high score to localStorage.
   *
   * @private
   */
  private _saveHighScore() {
    saveScore(this._playerName, this._score);
  }

  /**
   * Toggles the game state between start and stop. score.
   *
   * @private
   */
  private _controllerGame() {
    this._isPlaying = !this._isPlaying;

    if (this._isPlaying) {
      this._startLoop();
      this._startTimer();
    } else {
      this._stopLoop();
      this._clearTimer();
    }
  }

  /**
   * Starts the mole appearance loop. Interval depends on selected difficulty.
   *
   * @private
   */
  private _startLoop() {
    const settings = getMoleSettings(this.level);
    const interval = settings.interval;
    const hideTime = Math.max(0, interval - 100);

    this._intervalId = window.setInterval(() => {
      if (!this._isPlaying) return;

      const index1 = getRandomMoleIndex();
      let indices = [index1];

      if (this._molesMode === MoleMode.TWO) {
        let index2;
        do {
          index2 = getRandomMoleIndex();
        } while (index2 === index1);

        indices.push(index2);
      }

      this._activeMoles = generateActiveMoles(indices);

      setTimeout(() => {
        if (!this._isPlaying) return;
        this._activeMoles = new Array(SIZES_MOLETABLE * SIZES_MOLETABLE).fill(false);
      }, hideTime);
    }, interval);
  }

  /**
   * Stops the mole appearance loop and clears active moles.
   *
   * @private
   */
  private _stopLoop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    this._activeMoles = [];
  }

  /**
   * Starts the countdown timer. Ends the game at 0 seconds.
   *
   * @private
   */
  private _startTimer() {
    this._clearTimer();

    this._timerId = window.setInterval(() => {
      this._timeLeft--;

      if (this._timeLeft <= 0) {
        this._isPlaying = false;
        this._stopLoop();
        this._saveHighScore();
        this._clearTimer();

        this._timeLeft = 30;
        this._score = 0;
      }

      this.requestUpdate();
    }, 1000);
  }

  /**
   * Fully resets the game state.
   *
   * Stops all active intervals (mole loop and timer), clears the board, restores default values
   * (score, time, mode), and prepares the page for a fresh new game session.
   */
  private _clearGame() {
    this._isPlaying = false;

    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }

    this._score = 0;
    this._timeLeft = 30;
    this._activeMoles = new Array(SIZES_MOLETABLE * SIZES_MOLETABLE).fill(false);
    this._molesMode = MoleMode.ONE;
  }

  /**
   * Navigates back to the home page and resets the game state.
   *
   * @private
   */
  private _goBack() {
    this._clearGame();
    this._selectedTime = this._timeLeft.toString();
    this.navigate('home');
  }

  render() {
    return html`
      <page-layout>
        <game-button variant="back" @game-click=${this._goBack}>
          <svg
            slot="icon"
            fill="#ffff"
            width="800px"
            height="800px"
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z"
            />
          </svg>
        </game-button>
        <h2>Puntuación: ${this._score}</h2>

        <div>
          <span>Seleccione tiempo:</span>
          <game-select
            type="time"
            .value=${this._selectedTime}
            .options=${['30', '60', '90']}
            @time-change=${this.onTimeChange}
          ></game-select>
        </div>
        <h4>Tiempo Restante: ${this._timeLeft}s</h4>
        <mole-table
          size=${SIZES_MOLETABLE}
          .activeMoles=${this._activeMoles}
          @mole-hit=${this._handleMoleHit}
        ></mole-table>
        <game-button
          style="padding-bottom: 0.5rem"
          text="${this._molesMode === MoleMode.ONE ? 'Modo: 1 topo' : 'Modo: 2 topos'}"
          @game-click=${this._controlMolesMode}
        ></game-button>
        <game-button
          text="${this._isPlaying ? 'Parar partida' : 'Empezar partida'}"
          @game-click=${this._controllerGame}
        ></game-button>
      </page-layout>
    `;
  }
}
