import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';

import '../../components/page-layout/page-layout.js';
import '../../components/mole-table/mole-table.js';
import '../../components/game-button/game-button.js';
import '../../components/game-header/game-header.js';

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
   * Player name coming from navigation params or localStorage. Used to save highscores and display
   * in the header.
   *
   * @type {string}
   * @protected
   */
  @state()
  protected _playerName: string = '';

  /**
   * Current selected difficulty level (affects speed & points).
   *
   * @private
   * @type {DifficultyLevel}
   */
  @state()
  private _level: DifficultyLevel = DifficultyLevel.LOW;

  /**
   * Duration of the match in seconds. Must be @state because navigation can provide it.
   *
   * @type {string}
   * @public
   */
  @state()
  _time: string = String(TimeMode.SHORT);

  /**
   * Current score of the active match.
   *
   * @type {number}
   * @protected
   */
  @state()
  protected _score: number = 0;

  /**
   * Whether the game is currently running.
   *
   * @private
   * @type {boolean}
   */
  @state()
  private _isPlaying: boolean = false;

  /**
   * Boolean array representing active mole positions.
   *
   * @private
   * @type {boolean[]}
   */
  @state()
  private _activeMoles: boolean[] = new Array(SIZES_MOLETABLE * SIZES_MOLETABLE).fill(false);

  /**
   * Game mode: 1 or 2 moles appear at a time.
   *
   * @private
   * @type {MoleMode}
   */
  @state()
  private _molesMode: MoleMode = MoleMode.ONE;

  /**
   * Saved selected time (string), used to reset timer.
   *
   * @private
   * @type {string}
   */
  @state()
  private _selectedTime: string = String(TimeMode.SHORT);

  /**
   * Real-time countdown value (in seconds).
   *
   * @private
   * @type {number}
   */
  @state()
  private _timeLeft: number = TimeMode.SHORT;

  /**
   * Interval ID controlling mole appearance logic.
   *
   * @private
   * @type {number | null}
   */
  private _intervalId: number | null = null;

  /**
   * Interval ID controlling countdown timer.
   *
   * @private
   * @type {number | null}
   */
  private _timerId: number | null = null;

  firstUpdated() {
    const paramName = this.params?.playerName;
    const saved = localStorage.getItem('playerName');

    this._playerName = paramName || saved || 'Player';

    this._selectedTime = this._time;
    this._timeLeft = Number(this._time);
  }

  connectedCallback() {
    super.connectedCallback();
    this.subscribe('player-name', (name: string) => {
      this._playerName = name;
    });
  }

  disconnectedCallback() {
    this.unsubscribe('player-name');
    super.disconnectedCallback();
  }

  /**
   * Handles a mole hit event. Only increments score if:
   *
   * - Game is active AND
   * - The mole was active
   *
   * @param {CustomEvent<{ active: boolean }>} e
   */
  private _handleMoleHit(e: CustomEvent) {
    if (this._isPlaying && e.detail?.active) {
      const { points } = getMoleSettings(this._level);
      this._score += points;
    }
  }

  /**
   * Clears countdown interval.
   *
   * @private
   */
  private _clearTimer() {
    if (this._timerId) clearInterval(this._timerId);
    this._timerId = null;
  }

  /**
   * Toggles between 1 mole and 2 moles mode.
   *
   * @private
   */
  private _controlMolesMode() {
    this._molesMode = this._molesMode === MoleMode.ONE ? MoleMode.TWO : MoleMode.ONE;
  }

  /**
   * Saves current score in localStorage leaderboard.
   *
   * @private
   */
  private _saveHighScore() {
    saveScore(this._playerName, this._score, this._selectedTime);
  }

  /**
   * Toggles gameplay start/stop. Controls both the mole loop and the countdown timer.
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
   * Starts mole appearance loop:
   *
   * - Picks random mole(s)
   * - Makes them visible
   * - Hides them after hideTime
   *
   * @private
   */
  private _startLoop() {
    const settings = getMoleSettings(this._level);
    const interval = settings.interval;
    const hideTime = Math.max(0, interval - 100);

    this._intervalId = window.setInterval(() => {
      if (!this._isPlaying) return;

      const index1 = getRandomMoleIndex();
      const indices = [index1];

      if (this._molesMode === MoleMode.TWO) {
        let index2;
        do index2 = getRandomMoleIndex();
        while (index2 === index1);
        indices.push(index2);
      }

      this._activeMoles = generateActiveMoles(indices);

      setTimeout(() => {
        if (this._isPlaying) {
          this._activeMoles = new Array(SIZES_MOLETABLE * SIZES_MOLETABLE).fill(false);
        }
      }, hideTime);
    }, interval);
  }

  /**
   * Stops mole loop and clears active moles array.
   *
   * @private
   */
  private _stopLoop() {
    if (this._intervalId) clearInterval(this._intervalId);
    this._intervalId = null;
    this._activeMoles = [];
  }

  /**
   * Starts main countdown timer. When time reaches 0:
   *
   * - Stops gameplay
   * - Saves score
   * - Resets timer & score
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

        this._timeLeft = Number(this._selectedTime);
        this._score = 0;
      }
    }, 1000);
  }

  /**
   * Resets full game state:
   *
   * - Stops intervals
   * - Resets score, timer, mole grid and mode
   *
   * @private
   */
  private _clearGame() {
    this._isPlaying = false;
    this._stopLoop();
    this._clearTimer();

    this._score = 0;
    this._timeLeft = Number(this._selectedTime);
    this._activeMoles = new Array(SIZES_MOLETABLE * SIZES_MOLETABLE).fill(false);
    this._molesMode = MoleMode.ONE;
  }

  /**
   * Navigates back to home and clears the game.
   *
   * @private
   */
  private _goBack() {
    this._clearGame();
    this.navigate('home');
  }

  /**
   * Handles difficulty change from <game-header>. If game is running, restarts loop to apply new
   * speed.
   *
   * @private
   * @param {CustomEvent<{ value: DifficultyLevel }>} e
   */
  private _getLevel(e: CustomEvent) {
    this._level = e.detail.value;

    if (this._isPlaying) {
      this._stopLoop();
      this._startLoop();
    }
  }

  /**
   * Handles time change from <game-header>. Updates selected time & fully resets game.
   *
   * @private
   * @param {CustomEvent<{ value: string }>} e
   */
  private _getTime(e: CustomEvent) {
    this._time = e.detail.value;
    this._selectedTime = this._time;
    this._clearGame();
  }

  render() {
    return html`
      <game-header
        .playerName=${this._playerName}
        .level=${this._level}
        .time=${this._time}
        @header-level=${this._getLevel}
        @header-time=${this._getTime}
      ></game-header>
      <page-layout style="padding-top: 1.2rem;">
        <game-button variant="back" style="margin-bottom: 1rem;" @game-click=${this._goBack}>
          <svg
            slot="icon"
            fill="#fff"
            width="32"
            height="32"
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z"
            />
          </svg>
        </game-button>
        <h2>Puntuación: ${this._score}</h2>
        <h4>Tiempo restante: ${this._timeLeft}s</h4>
        <mole-table
          size=${SIZES_MOLETABLE}
          .activeMoles=${this._activeMoles}
          @mole-hit=${this._handleMoleHit}
        ></mole-table>
        <game-button
          style="margin-top: 1rem;"
          text="${this._molesMode === MoleMode.ONE ? '1 Topo' : '2 Topos'}"
          @game-click=${this._controlMolesMode}
        ></game-button>
        <game-button
          style="margin-top: 0.8rem;"
          text="${this._isPlaying ? 'Parar partida' : 'Empezar partida'}"
          @game-click=${this._controllerGame}
        ></game-button>
      </page-layout>
    `;
  }
}
