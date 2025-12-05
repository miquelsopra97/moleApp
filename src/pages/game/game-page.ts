import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';

import '../../components/page-layout/page-layout.js';
import '../../components/mole-table/mole-table.js';
import '../../components/game-button/game-button.js';
import {
  getMoleSettings,
  getRandomMoleIndex,
  generateActiveMoles,
  SIZES_MOLETABLE,
} from '../../config/mole-config.config.js';
import { saveScore } from '../../config/score-config.config.js';
import { DifficultyLevel } from '../../models/enums/game-select.enum.js';

// @ts-ignore
@customElement('game-page')
export class GamePage extends PageTransitionsMixin(PageMixin(LitElement)) {
  @state() protected _playerName = '';
  @state() protected _score = 0;
  @state() private _isPlaying = false;
  @state() private _activeMoles: boolean[] = Array(SIZES_MOLETABLE * SIZES_MOLETABLE).fill(false);
  @state() private _intervalId: number | null = null;

  @state() private level: 'Low' | 'Medium' | 'High' = 'High';

  firstUpdated(props: any) {
    super.firstUpdated?.(props);
    const playerName = this.params?.playerName as string | undefined;
    const savedName = localStorage.getItem('playerName');

    if (playerName) {
      this._playerName = playerName;
    } else if (savedName) {
      this._playerName = savedName;
    } else {
      this._playerName = 'Player';
    }

    this.subscribe('player-name', (name: string) => {
      this._playerName = name;
      localStorage.setItem('playerName', name);
    });

    this.subscribe('game-level', (level: DifficultyLevel) => {
      this.level = level;
      if (this._isPlaying) {
        this._stopLoop();
        this._startLoop();
      }
    });
  }

  disconnectedCallback(): void {
    this.unsubscribe('player-name');
    this.unsubscribe('game-level');
    super.disconnectedCallback();
  }

  private _handleMoleHit(e: CustomEvent) {
    if (this._isPlaying && e.detail?.active) {
      const { points } = getMoleSettings(this.level);
      this._score += points;
    }
  }

  private _saveHighScore() {
    saveScore(this._playerName, this._score);
  }

  private _toggleGame() {
    this._isPlaying = !this._isPlaying;

    if (this._isPlaying) {
      this._score = 0;
      this._startLoop();
    } else {
      this._saveHighScore();
      this._stopLoop();
    }
  }

  private _startLoop() {
    const settings = getMoleSettings(this.level);
    const interval = settings.interval;
    const hideTime = interval - 100;

    this._intervalId = window.setInterval(() => {
      if (!this._isPlaying) return;

      const index = getRandomMoleIndex();
      this._activeMoles = generateActiveMoles(index);

      setTimeout(() => {
        if (this._isPlaying) {
          this._activeMoles = Array(9).fill(false);
        }
      }, hideTime);
    }, interval);
  }

  private _stopLoop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    this._activeMoles = [];
  }

  private _goBack() {
    this._isPlaying = false;

    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }

    this._score = 0;
    this._activeMoles = Array(SIZES_MOLETABLE * SIZES_MOLETABLE).fill(false);
    this.navigate('home');
  }

  render() {
    return html`
      <page-layout>
        <div class="game-container">
          <game-button variant="back" @game-click=${this._goBack}>
            <svg
              slot="icon"
              fill="#ffff"
              width="800px"
              height="800px"
              viewBox="0 0 52 52"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z"
              />
            </svg>
          </game-button>
          <h3>Puntuación: ${this._score}</h3>
          <mole-table
            size=${SIZES_MOLETABLE}
            .activeMoles=${this._activeMoles}
            @mole-hit=${this._handleMoleHit}
          ></mole-table>
          <game-button
            text="${this._isPlaying ? 'Parar partida' : 'Empezar partida'}"
            @game-click=${this._toggleGame}
          ></game-button>
        </div>
      </page-layout>
    `;
  }
}
