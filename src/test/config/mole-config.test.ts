import { describe, it, expect } from 'vitest';
import {
  getMoleSettings,
  getRandomMoleIndex,
  generateActiveMoles,
  SIZES_MOLETABLE,
  MOLE_LEVELS,
} from '../../config/mole-config.config.js';

describe('mole-config', () => {
  it('returns correct settings for known levels', () => {
    expect(getMoleSettings('Low')).toEqual({ interval: 1000, points: 10 });
    expect(getMoleSettings('Medium')).toEqual({ interval: 750, points: 20 });
    expect(getMoleSettings('High')).toEqual({ interval: 500, points: 30 });
  });

  it('falls back to Low level when unknown level is provided', () => {
    expect(getMoleSettings('UNKNOWN' as any)).toEqual(MOLE_LEVELS.Low);
    expect(getMoleSettings(undefined as any)).toEqual(MOLE_LEVELS.Low);
    expect(getMoleSettings(null as any)).toEqual(MOLE_LEVELS.Low);
  });

  it('getRandomMoleIndex always returns valid index', () => {
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    for (let i = 0; i < 20; i++) {
      const index = getRandomMoleIndex();
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(total);
    }
  });

  it('generateActiveMoles sets only activeIndex as true', () => {
    const activeIndex = 4;
    const arr = generateActiveMoles(activeIndex);
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    expect(arr.length).toBe(total);
    arr.forEach((v, i) => {
      if (i === activeIndex) expect(v).toBe(true);
      else expect(v).toBe(false);
    });
  });

  it('generateActiveMoles handles out-of-range', () => {
    const arr = generateActiveMoles(50);
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    expect(arr.length).toBe(total);
    expect(arr.every(v => v === false)).toBe(true);
  });
});
