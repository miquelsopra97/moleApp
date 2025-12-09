import { vi } from 'vitest';

/** FULL MOCK: Replaces ALL exports with mocked versions. */
export const fullScoreConfigMock = {
  getScores: vi.fn(),
};

/** PARTIAL MOCK: Keeps the real module and allows mocking only specific functions. */
export const partialScoreConfigMock = async () => {
  const actual = await vi.importActual<any>('../../config/score-config.config.js');
  return {
    ...actual,
    getScores: vi.fn(actual.getScores),
  };
};
