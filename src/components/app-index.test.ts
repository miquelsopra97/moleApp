import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './app-index.js';
import { publishMock, subscribeMock, unsubscribeMock } from '../test/mocks/open-cells-mock.js';

// Mock hash
Object.defineProperty(globalThis, 'location', {
  value: { hash: '' },
  writable: true,
});

describe('app-index', () => {
  type AppIndexTest = HTMLElement & {
    updateComplete: Promise<void>;
    currentRoute: string;
  };

  let el: AppIndexTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();

    subscribeMock.mockReset();
    publishMock.mockReset();
    unsubscribeMock.mockReset();
  });

  afterEach(() => {
    el?.remove();
  });

  const create = async () => {
    el = document.createElement('app-index') as AppIndexTest;
    document.body.appendChild(el);
    await el.updateComplete;
  };

  const getHeader = () => el.shadowRoot!.querySelector('header') as HTMLElement;

  it('renders home header when route is "home"', async () => {
    globalThis.location.hash = '#!/home';
    await create();

    const header = getHeader();
    expect(header).not.toBeNull();
    expect(header.classList.contains('header--home')).toBe(true);
  });

  it('does not render header when route is NOT home', async () => {
    globalThis.location.hash = '#!/game';
    await create();

    const header = getHeader();
    expect(header).toBeNull();
  });

  it('updates currentRoute on hashchange event', async () => {
    globalThis.location.hash = '#!/home';
    await create();

    globalThis.location.hash = '#!/game';
    globalThis.dispatchEvent(new Event('hashchange'));

    expect(el.currentRoute).toBe('game');
  });
});
