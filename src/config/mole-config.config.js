export const MOLE_LEVELS = {
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

export function getMoleSettings(level) {
  return MOLE_LEVELS[level] || MOLE_LEVELS.Low;
}

export function getRandomMoleIndex() {
  const total = SIZES_MOLETABLE * SIZES_MOLETABLE;
  return Math.floor(Math.random() * total);
}

export function generateActiveMoles(activeIndex) {
  const total = SIZES_MOLETABLE * SIZES_MOLETABLE;
  const result = new Array(total).fill(false);
  if (activeIndex >= 0 && activeIndex < total) {
    result[activeIndex] = true;
  }
  return result;
}
