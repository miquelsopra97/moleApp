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
    expect(getMoleSettings(undefined)).toEqual(MOLE_LEVELS.Low);
    expect(getMoleSettings(null)).toEqual(MOLE_LEVELS.Low);
  });

  it('getRandomMoleIndex always returns valid index', () => {
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    for (let i = 0; i < 20; i++) {
      const index = getRandomMoleIndex();
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(total);
    }
  });

  it('generateActiveMoles sets only the provided indices to true', () => {
    const indices = [2, 5];
    const arr = generateActiveMoles(indices);
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    expect(arr.length).toBe(total);

    arr.forEach((v, i) => {
      if (indices.includes(i)) expect(v).toBe(true);
      else expect(v).toBe(false);
    });
  });

  it('generateActiveMoles handles out-of-range indices gracefully', () => {
    const arr = generateActiveMoles([50, -3]);
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    expect(arr.length).toBe(total);
    expect(arr.every((v) => v === false)).toBe(true);
  });

  it('generateActiveMoles works with single index', () => {
    const arr = generateActiveMoles([4]);
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    expect(arr[4]).toBe(true);
    expect(arr.filter(Boolean).length).toBe(1);
    expect(arr.length).toBe(total);
  });

  it('generateActiveMoles works with empty array', () => {
    const arr = generateActiveMoles([]);
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    expect(arr.length).toBe(total);
    expect(arr.every((v) => v === false)).toBe(true);
  });
});
