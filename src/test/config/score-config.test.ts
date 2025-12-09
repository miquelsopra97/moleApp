import { describe, it, expect, beforeEach, vi } from 'vitest';

let saveScore: (arg0: string, arg1: number) => void;
let getScores: () => void;

describe('score-config (unit)', () => {
  let getItem = vi.fn();
  let setItem = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
    vi.resetModules();
    vi.unstubAllGlobals();

    vi.doUnmock('../../config/score-config.config.js');
    vi.unmock('../../config/score-config.config.js');

    getItem = vi.fn();
    setItem = vi.fn();

    vi.stubGlobal('localStorage', {
      getItem,
      setItem,
    });

    const mod = await import('../../config/score-config.config.js');
    saveScore = mod.saveScore;
    getScores = mod.getScores;
  });

  it('stores a new score', () => {
    getItem.mockReturnValueOnce('[]');

    saveScore('Miquel', 50);

    expect(setItem).toHaveBeenCalledWith('scores', JSON.stringify([{ name: 'Miquel', score: 50 }]));
  });

  it('updates score only if higher', () => {
    getItem.mockReturnValueOnce(JSON.stringify([{ name: 'Miquel', score: 40 }]));

    saveScore('Miquel', 60);

    expect(setItem).toHaveBeenCalledWith('scores', JSON.stringify([{ name: 'Miquel', score: 60 }]));
  });

  it('does NOT update score if lower', () => {
    getItem.mockReturnValueOnce(JSON.stringify([{ name: 'Miquel', score: 80 }]));

    saveScore('Miquel', 50);

    expect(setItem).toHaveBeenCalledWith('scores', JSON.stringify([{ name: 'Miquel', score: 80 }]));
  });

  it('returns stored scores', () => {
    const mock = [{ name: 'Ana', score: 10 }];
    getItem.mockReturnValueOnce(JSON.stringify(mock));

    expect(getScores()).toEqual(mock);
  });

  it('returns empty array if no scores', () => {
    getItem.mockReturnValueOnce(null);

    expect(getScores()).toEqual([]);
  });
});
