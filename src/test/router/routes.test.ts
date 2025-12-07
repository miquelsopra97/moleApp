import { describe, it, expect, vi } from 'vitest';
import { routes } from '../../router/routes.js';

describe('routes config', () => {
  it('contains all expected routes', () => {
    expect(routes.map((r) => r.name)).toEqual(['home', 'game', 'score', 'not-found']);
  });

  it('each route has required properties', () => {
    routes.forEach((route) => {
      expect(route.path).toBeTypeOf('string');
      expect(route.name).toBeTypeOf('string');
      expect(route.component).toBeTypeOf('string');
      expect(route.action).toBeTypeOf('function');
    });
  });

  it('lazy-loads every route module correctly', async () => {
    const lazyRoutes = [
      { name: 'home', module: '../../pages/home/home-page.js' },
      { name: 'game', module: '../../pages/game/game-page.js' },
      { name: 'score', module: '../../pages/score/score-page.js' },
      { name: 'not-found', module: '../../pages/not-found/not-found-page.js' },
    ];

    for (const entry of lazyRoutes) {
      const route = routes.find((r) => r.name === entry.name)!;
      vi.doMock(entry.module, () => ({ default: {} }));
      await expect(route.action()).resolves.not.toThrow();
    }
  });
});
