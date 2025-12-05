// ---------- OpenCells global mocks ----------
import { vi } from 'vitest';

vi.mock('@open-cells/core', () => ({
  $bridge: {
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    publish: vi.fn(),
    registerInConnection: vi.fn(),
  },
}));

vi.mock('@open-cells/page-mixin', () => ({
  PageMixin: (Base: any) =>
    class extends Base {
      publish = vi.fn();
      navigate = vi.fn();
      subscribe = vi.fn();
      unsubscribe = vi.fn();
    },
}));

vi.mock('@open-cells/page-transitions', () => ({
  PageTransitionsMixin: (Base: any) => class extends Base {},
}));

// ---------- score-config global mock ----------
vi.mock('../../config/score-config.config.js', () => ({
  saveScore: vi.fn(),
}));

export {};
