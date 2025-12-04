import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PageMixin } from '@open-cells/page-mixin';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { getScores } from '../../config/score-config.config.js';

import '../../components/page-layout/page-layout.js';
import '../../components/game-button/game-button.js';
import { IScore } from './score-page.interface.js';

// @ts-ignore
@customElement('score-page')
export class ScorePage extends PageTransitionsMixin(PageMixin(LitElement)) {
@state() private _scores: IScore[] = [];

  firstUpdated() {
    super.firstUpdated?.(null);
    this._scores = getScores();
  }

  private _goBackHome() {
    this.navigate('home');
  }

  render() {
    return html`
      <page-layout>
        <div class="score-container">
          <h2>Ranking de puntuaciones</h2>
          ${this._scores.length
            ? html`
                <ul>
                  ${this._scores.map(
                    (item, i) => html`
                      <li><strong>${i + 1}. ${item.name}</strong> — ${item.score} pts</li>
                    `,
                  )}
                </ul>
              `
            : html`<p>No hay puntuaciones todavía.</p>`}

          <game-button text="Volver" @game-click=${this._goBackHome}></game-button>
        </div>
      </page-layout>
    `;
  }
}
