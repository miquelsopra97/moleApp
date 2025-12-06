import { describe, it, expect, vi, beforeEach } from 'vitest';

// Limpia TODOS los mocks y módulos cacheados antes de cada test
beforeEach(() => {
  vi.resetModules();
});

// Importa SIEMPRE el módulo real después de resetear (versión ESM)
async function loadModule() {
  return await import('../../config/mole-config.config.js');
}

describe('mole-config', () => {
  it('returns correct settings for known levels', async () => {
    const { getMoleSettings } = await loadModule();

    expect(getMoleSettings('Low')).toEqual({ interval: 1000, points: 10 });
    expect(getMoleSettings('Medium')).toEqual({ interval: 750, points: 20 });
    expect(getMoleSettings('High')).toEqual({ interval: 500, points: 30 });
  });

  it('falls back to Low level when unknown level is provided', async () => {
    const { getMoleSettings, MOLE_LEVELS } = await loadModule();

    expect(getMoleSettings('UNKNOWN')).toEqual(MOLE_LEVELS.Low);
    expect(getMoleSettings(undefined)).toEqual(MOLE_LEVELS.Low);
    expect(getMoleSettings(null)).toEqual(MOLE_LEVELS.Low);
  });

  it('getRandomMoleIndex always returns valid index', async () => {
    const { getRandomMoleIndex, SIZES_MOLETABLE } = await loadModule();

    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    for (let i = 0; i < 20; i++) {
      const index = getRandomMoleIndex();
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(total);
    }
  });

  it('generateActiveMoles sets only activeIndex as true', async () => {
    const { generateActiveMoles, SIZES_MOLETABLE } = await loadModule();

    const activeIndex = 4;
    const arr = generateActiveMoles(activeIndex);
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    expect(arr.length).toBe(total);

    arr.forEach((v: boolean, i: number) => {
      if (i === activeIndex) expect(v).toBe(true);
      else expect(v).toBe(false);
    });
  });

  it('generateActiveMoles handles out-of-range', async () => {
    const { generateActiveMoles, SIZES_MOLETABLE } = await loadModule();

    const arr = generateActiveMoles(50);
    const total = SIZES_MOLETABLE * SIZES_MOLETABLE;

    expect(arr.length).toBe(total);
    expect(arr.every((v: boolean) => v === false)).toBe(true);
  });
});
