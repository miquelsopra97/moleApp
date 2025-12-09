import { DifficultyLevel } from '../models/enums/game-select.enum';
import type { IMoleLevels, IMolePoints } from '../models/interfaces/mole-levels.interfaces';

export const MOLE_LEVELS: IMoleLevels = {
  [DifficultyLevel.LOW]: {
    interval: 1000,
    points: 10,
  },
  [DifficultyLevel.MEDIUM]: {
    interval: 750,
    points: 20,
  },
  [DifficultyLevel.HIGH]: {
    interval: 500,
    points: 30,
  },
};

export const SIZES_MOLETABLE: number = 3;

/**
 * Returns the mole configuration (speed, timing, etc.) for a given level. Falls back to Low if
 * level is invalid or undefined.
 */
export function getMoleSettings(level: DifficultyLevel | null): IMolePoints {
  return level && MOLE_LEVELS[level] ? MOLE_LEVELS[level] : MOLE_LEVELS[DifficultyLevel.LOW];
}

/** Generates a random index inside the mole table grid. */
export function getRandomMoleIndex(): number {
  const total = SIZES_MOLETABLE * SIZES_MOLETABLE;
  return Math.floor(Math.random() * total);
}

/** Creates an array showing which mole is active. */
export function generateActiveMoles(indices: number[]): boolean[] {
  const total = SIZES_MOLETABLE * SIZES_MOLETABLE;
  const result = new Array(total).fill(false);

  indices.forEach((i) => {
    if (i >= 0 && i < total) {
      result[i] = true;
    }
  });

  return result;
}
