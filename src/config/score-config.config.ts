import { IScoreEntry } from '../models/interfaces/score.interfaces';

/**
 * Saves a player's score in localStorage.
 *
 * @param {string} name - Player name.
 * @param {number} score - Score achieved by the player.
 * @param {number} time - Game duration used (e.g., 30, 60, 90).
 */
export function saveScore(name: string, score: number, time: string) {
  const stored = JSON.parse(localStorage.getItem('scores') || '[]');

  const existing = stored.find((entry: IScoreEntry) => entry.name === name);
  const newTime = Number(time);

  if (existing) {
    const oldTime = Number(existing.time);

    if (score > existing.score) {
      existing.score = score;
      existing.time = newTime;
    } else if (score === existing.score && newTime < oldTime) {
      existing.time = newTime;
    }
  } else {
    stored.push({ name, score, time: newTime });
  }

  stored.sort((a: IScoreEntry, b: IScoreEntry) => {
    if (b.score !== a.score) return b.score - a.score;

    return Number(a.time) - Number(b.time);
  });

  localStorage.setItem('scores', JSON.stringify(stored));
}

/**
 * Retrieves the list of stored scores from localStorage.
 *
 * @returns {IScoreEntry[]} Sorted list of score entries.
 */
export function getScores(): IScoreEntry[] {
  return JSON.parse(localStorage.getItem('scores') || '[]') as IScoreEntry[];
}
