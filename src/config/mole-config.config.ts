import type { IMoleLevels, IMolePoints } from '../models/interfaces/mole-levels.interfaces';

export const MOLE_LEVELS: IMoleLevels = {
  Low: {
    interval: 1000,
    points: 10,
  },
  Medium: {
    interval: 750,
    points: 20,
  },
  High: {
    interval: 500,
    points: 30,
  },
};

export const SIZES_MOLETABLE = 3;

/**
 * Returns the mole configuration (speed, timing, etc.) for a given level. Falls back to Low if
 * level is invalid or undefined.
 */
export function getMoleSettings(level?: keyof IMoleLevels | null): IMolePoints {
  return level && MOLE_LEVELS[level] ? MOLE_LEVELS[level] : MOLE_LEVELS.Low;
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
