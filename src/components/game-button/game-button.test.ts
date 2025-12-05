import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MoleButtonVariant } from '../../models/enums/game-button.enum.js';
import './game-button.js';

describe('game-button', () => {
  type GameButtonTest = HTMLElement & {
    updateComplete: Promise<void>;
    text: string;
    disabled: boolean;
    variant: MoleButtonVariant;
  };

  let el: GameButtonTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    el = document.createElement('game-button') as GameButtonTest;
    document.body.appendChild(el);
  });

  it('renders default props', async () => {
    await el.updateComplete;

    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.className).toBe(MoleButtonVariant.DEFAULT);
    expect(btn.disabled).toBe(false);
  });

  it('sets text correctly', async () => {
    el.text = 'Play';
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector('.label')!;
    expect(label.textContent).toBe('Play');
  });

  it('renders icon slot only for back variant', async () => {
    el.setAttribute('variant', MoleButtonVariant.BACK);
    el.innerHTML = `<span slot="icon" class="test-icon"></span>`;

    await el.updateComplete;

    const iconContainer = el.shadowRoot!.querySelector('.icon');
    expect(iconContainer).not.toBeNull();
  });

  it('emits game-click event when clicked', async () => {
    el.text = 'Hola';
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener('game-click', handler);

    const btn = el.shadowRoot!.querySelector('button')!;
    btn.click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ text: 'Hola' });
  });
});
