import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './app-index.js';
import { publishMock, subscribeMock, unsubscribeMock } from '../test/mocks/open-cells-mock.js';

// -------- Mock de location.hash --------
Object.defineProperty(globalThis, 'location', {
  value: { hash: '' },
  writable: true,
});

describe('app-index', () => {
  type AppIndexTest = HTMLElement & {
    updateComplete: Promise<void>;
    playerName: string;
    currentRoute: string;
    level: string;
    onLevelChange: (e: CustomEvent) => void;
    resetScroll?: () => void;
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

  it('renders header home when route is not "game"', async () => {
    globalThis.location.hash = '#!/home';
    await create();

    const header = getHeader();
    expect(header.classList.contains('header--home')).toBe(true);
  });

  it('renders header game when current route is "game"', async () => {
    globalThis.location.hash = '#!/game';
    await create();

    const header = getHeader();
    expect(header.classList.contains('header--game')).toBe(true);
  });

  it('subscribes to scroll and player-name on connectedCallback', async () => {
    globalThis.location.hash = '#!/game';

    // simulate no name stored
    localStorage.clear();

    await create();

    expect(subscribeMock).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(subscribeMock).toHaveBeenCalledWith('player-name', expect.any(Function));
  });

  it('loads saved playerName from localStorage', async () => {
    localStorage.setItem('playerName', 'Miquel');

    await create();

    expect(el.playerName).toBe('Miquel');
  });

  it('updates playerName when receiving "player-name" event', async () => {
    await create();

    const subCall = subscribeMock.mock.calls.find(c => c[0] === 'player-name');
    expect(subCall).toBeDefined();

    const callback = subCall![1];
    callback('Carlos');

    expect(el.playerName).toBe('Carlos');
    expect(localStorage.getItem('playerName')).toBe('Carlos');
  });

  it('updates currentRoute on hashchange event', async () => {
    globalThis.location.hash = '#!/home';
    await create();

    globalThis.location.hash = '#!/game';
    globalThis.dispatchEvent(new Event('hashchange'));

    expect(el.currentRoute).toBe('game');
  });

  it('header shows avatar initial and player name', async () => {
    globalThis.location.hash = '#!/game';
    localStorage.setItem('playerName', 'Miquel');

    await create();

    const avatar = el.shadowRoot!.querySelector('.avatar')!;
    const name = el.shadowRoot!.querySelector('.player-name')!;

    expect(avatar.textContent).toBe('M');
    expect(name.textContent).toBe('Miquel');
  });

  it('calls publish("game-level") when select-game emits level-change', async () => {
    globalThis.location.hash = '#!/game';
    await create();

    const select = el.shadowRoot!.querySelector('select-game')!;
    select.dispatchEvent(
      new CustomEvent('level-change', {
        detail: { value: 'Medium' },
        bubbles: true,
      }),
    );

    expect(publishMock).toHaveBeenCalledWith('game-level', 'Medium');
  });

  it('removes subscriptions on disconnectedCallback', async () => {
    await create();
    el.remove();

    expect(unsubscribeMock).toHaveBeenCalledWith('scroll');
    expect(unsubscribeMock).toHaveBeenCalledWith('player-name');
  });
});
