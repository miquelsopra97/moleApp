import { describe, it, expect, beforeEach, vi } from 'vitest';

let saveScore: (name: string, score: number, time: string) => void;
let getScores: () => any[];

describe('score-config (unit)', () => {
  let getItem = vi.fn();
  let setItem = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.unstubAllGlobals();

    getItem = vi.fn();
    setItem = vi.fn();

    vi.stubGlobal('localStorage', {
      getItem,
      setItem,
    });

    vi.mock('../../config/score-config.config.js', () => {
      const actual = vi.importActual('../../config/score-config.config.js');
      return actual;
    });

    const mod = await import('../../config/score-config.config.js');
    saveScore = mod.saveScore;
    getScores = mod.getScores;
  });

  it('stores a new score with time', () => {
    getItem.mockReturnValueOnce('[]');

    saveScore('Miquel', 50, '60');

    expect(setItem).toHaveBeenCalledWith(
      'scores',
      JSON.stringify([{ name: 'Miquel', score: 50, time: 60 }]),
    );
  });

  it('updates score if higher and replaces time', () => {
    getItem.mockReturnValueOnce(JSON.stringify([{ name: 'Miquel', score: 40, time: 90 }]));

    saveScore('Miquel', 60, '30');

    expect(setItem).toHaveBeenCalledWith(
      'scores',
      JSON.stringify([{ name: 'Miquel', score: 60, time: 30 }]),
    );
  });

  it('does NOT update score if lower', () => {
    getItem.mockReturnValueOnce(JSON.stringify([{ name: 'Miquel', score: 80, time: 30 }]));

    saveScore('Miquel', 50, '60');

    expect(setItem).toHaveBeenCalledWith(
      'scores',
      JSON.stringify([{ name: 'Miquel', score: 80, time: 30 }]),
    );
  });

  it('updates time if same score and new time is lower', () => {
    getItem.mockReturnValueOnce(JSON.stringify([{ name: 'Miquel', score: 50, time: 60 }]));

    saveScore('Miquel', 50, '30');

    expect(setItem).toHaveBeenCalledWith(
      'scores',
      JSON.stringify([{ name: 'Miquel', score: 50, time: 30 }]),
    );
  });

  it('does NOT update time if same score but time is worse', () => {
    getItem.mockReturnValueOnce(JSON.stringify([{ name: 'Miquel', score: 50, time: 30 }]));

    saveScore('Miquel', 50, '90');

    expect(setItem).toHaveBeenCalledWith(
      'scores',
      JSON.stringify([{ name: 'Miquel', score: 50, time: 30 }]),
    );
  });

  it('returns stored scores', () => {
    const mock = [{ name: 'Ana', score: 10, time: 30 }];
    getItem.mockReturnValueOnce(JSON.stringify(mock));

    expect(getScores()).toEqual(mock);
  });

  it('returns empty array if no scores', () => {
    getItem.mockReturnValueOnce(null);

    expect(getScores()).toEqual([]);
  });
});
