import { RouteDefinition } from '@open-cells/core/types'; // Import the missing 'RouteDefinition' type

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/game',
    name: 'game',
    component: 'game-page',
    action: async () => {
      await import('../pages/game/game-page.js');
    },
  },
    {
    path: '/score',
    name: 'score',
    component: 'score-page',
    action: async () => {
      await import('../pages/score/score-page.js');
    },
  },
  {
    path: '/not-found',
    name: 'not-found',
    notFound: false,
    component: 'not-found-page',
    action: async () => {
      await import('../pages/not-found/not-found-page.js');
    },
  },
];
