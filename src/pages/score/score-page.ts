import { IScoreEntry } from './../../models/interfaces/score.interfaces';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { getScores } from '../../config/score-config.config.js';

import '../../components/page-layout/page-layout.js';
import '../../components/game-button/game-button.js';

// @ts-ignore
@customElement('score-page')
export class ScorePage extends PageTransitionsMixin(PageMixin(LitElement)) {
  /**
   * List of saved score entries. Retrieved from localStorage through `getScores()`.
   *
   * Each entry has the shape: { name: string; score: number; }
   *
   * @private
   * @type {IScoreEntry[]}
   */
  @state()
  private _scores: IScoreEntry[] = [];

  /** Lifecycle method executed after the first render. Loads the persisted list of scores. */
  firstUpdated() {
    super.firstUpdated?.(null);
    this._scores = getScores();
  }

  /**
   * Navigates back to the home page. Triggered by the "Back" button.
   *
   * @private
   */
  private _goBackHome() {
    this.navigate('home');
  }

  render() {
    return html`
      <page-layout>
        <h2>Ranking de puntuaciones</h2>
        ${this._scores.length
          ? html`
              <ul>
                ${this._scores.map(
                  (item, i) => html`
                    <li>
                      <strong>${i + 1}. ${item.name}</strong>
                      — ${item.score} pts
                    </li>
                  `,
                )}
              </ul>
            `
          : html`
              <p>No hay puntuaciones todavía.</p>
            `}
        <game-button text="Volver" @game-click=${this._goBackHome}></game-button>
      </page-layout>
    `;
  }
}
