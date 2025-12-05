import { describe, it, expect, vi, beforeEach } from 'vitest';
import './mole-button.js';

const playMock = vi.fn();
const vibrateMock = vi.fn();

vi.stubGlobal('Audio', class {
  currentTime = 0;
  play = playMock;
});

vi.stubGlobal('navigator', {
  vibrate: vibrateMock
});

describe('mole-button', () => {
  type MoleButtonTest = HTMLElement & {
    updateComplete: Promise<void>;
    active: boolean;
    hitSound: HTMLAudioElement;
  };

  let el: MoleButtonTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    el = document.createElement('mole-button') as MoleButtonTest;
    document.body.appendChild(el);

    playMock.mockClear();
    vibrateMock.mockClear();
  });

  const wait = async () => {
    await el.updateComplete;
  };

  const getButton = () =>
    el.shadowRoot!.querySelector('button') as HTMLButtonElement;

  it('renders without mole image when inactive', async () => {
    el.active = false;
    await wait();

    const img = el.shadowRoot!.querySelector('.mole-img');
    expect(img).toBeNull();
  });

  it('renders mole image when active', async () => {
    el.active = true;
    await wait();

    const img = el.shadowRoot!.querySelector('.mole-img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('alt')).toBe('Mole');
  });

  it('emits mole-hit event on click', async () => {
    await wait();

    const handler = vi.fn();
    el.addEventListener('mole-hit', handler);

    getButton().click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ active: false });
  });

  it('plays sound and vibrates when active', async () => {
    el.active = true;
    await wait();

    getButton().click();

    expect(vibrateMock).toHaveBeenCalledWith(40);

    expect(playMock).toHaveBeenCalledTimes(1);
    expect(el.hitSound.currentTime).toBe(0);
  });

  it('does NOT play sound or vibrate when inactive', async () => {
    el.active = false;
    await wait();

    getButton().click();

    expect(vibrateMock).not.toHaveBeenCalled();
    expect(playMock).not.toHaveBeenCalled();
  });
});
