import { IScoreEntry } from '../models/interfaces/score.interfaces';

/**
 * Saves a player's score in localStorage.
 *
 * - If the player already exists, their score is updated only if the new score is higher.
 * - If the player does not exist, a new entry is added.
 * - The score list is always sorted from highest to lowest.
 */
export function saveScore(name: string, score: number): void {
  const stored: IScoreEntry[] = JSON.parse(localStorage.getItem('scores') || '[]');

  // Check if the player already exists in the stored list
  const existing = stored.find(entry => entry.name === name);

  if (existing) {
    // Update only if the new score is higher
    if (score > existing.score) {
      existing.score = score;
    }
  } else {
    // If player doesn't exist, add a new entry
    stored.push({ name, score });
  }

  // Sort scores in descending order (highest first)
  stored.sort((a, b) => b.score - a.score);

  localStorage.setItem('scores', JSON.stringify(stored));
}

// ------------------------------------------
// getScores
// ------------------------------------------

/**
 * Retrieves the list of stored scores from localStorage.
 *
 * @returns {IScoreEntry[]} Sorted list of score entries.
 */
export function getScores(): IScoreEntry[] {
  return JSON.parse(localStorage.getItem('scores') || '[]') as IScoreEntry[];
}
