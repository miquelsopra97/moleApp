// ------------------------------------------------------
// Global mocks for OpenCells and shared browser objects
// Loaded from vitest.config.ts → test.setupFiles
// ------------------------------------------------------

import { vi } from 'vitest';

// ------------------------------------------------------
// Mock: @open-cells/core
// ------------------------------------------------------
vi.mock('@open-cells/core', () => ({
  $bridge: {
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    publish: vi.fn(),
    registerInConnection: vi.fn(),
  },
  startApp: vi.fn(),
}));

// ------------------------------------------------------
// Mock: @open-cells/page-mixin
// ------------------------------------------------------
vi.mock('@open-cells/page-mixin', () => ({
  PageMixin: (Base: any) =>
    class extends Base {
      publish = vi.fn();
      navigate = vi.fn();
      subscribe = vi.fn();
      unsubscribe = vi.fn();
    },
}));

// ------------------------------------------------------
// Mock: @open-cells/page-transitions
// ------------------------------------------------------
vi.mock('@open-cells/page-transitions', () => ({
  PageTransitionsMixin: (Base: any) => class extends Base {},
}));

// ------------------------------------------------------
// Mock: @open-cells/element-controller
// ------------------------------------------------------
export const subscribeMock = vi.fn();
export const publishMock = vi.fn();
export const unsubscribeMock = vi.fn();

vi.mock('@open-cells/element-controller', () => ({
  ElementController: class {
    subscribe = subscribeMock;
    publish = publishMock;
    unsubscribe = unsubscribeMock;
  },
}));
// ------------------------------------------------------
// Mock: score-config
// ------------------------------------------------------
export const saveScoreMock = vi.fn();

vi.mock('../../config/score-config.config.js', () => ({
  saveScore: saveScoreMock,
}));

export {};
