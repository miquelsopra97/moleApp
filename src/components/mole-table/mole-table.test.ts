import { describe, it, expect, vi, beforeEach } from 'vitest';
import './mole-table.js';
import '../mole-button/mole-button.js';
import { SIZES_MOLETABLE } from '../../config/mole-config.config.js';

describe('mole-table', () => {
  type MoleTableTest = HTMLElement & {
    updateComplete: Promise<void>;
    size: number;
    activeMoles: boolean[];
  };

  let el: MoleTableTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    el = document.createElement('mole-table') as MoleTableTest;
    document.body.appendChild(el);
  });

  const wait = async () => {
    await el.updateComplete;
  };

  const getButtons = () => Array.from(el.shadowRoot!.querySelectorAll('mole-button'));

  it('renders correct number of mole buttons', async () => {
    el.size = 3;
    await wait();

    const buttons = getButtons();
    expect(buttons.length).toBe(9);
  });

  it('renders mole buttons with active state from activeMoles array', async () => {
    type MoleButtonTest = HTMLElement & { active: boolean };

    el.size = 3;
    el.activeMoles = [true, false, true, false, false, true, false, true, false];
    await wait();

    const buttons = getButtons();

    expect((buttons[0] as MoleButtonTest).active).toBe(true);
    expect((buttons[1] as MoleButtonTest).active).toBe(false);
    expect((buttons[2] as MoleButtonTest).active).toBe(true);
  });

  it('defaults to SIZES_MOLETABLE when no size provided', async () => {
    await wait();

    const expected = SIZES_MOLETABLE * SIZES_MOLETABLE;
    expect(getButtons().length).toBe(expected);
  });

  it('emits mole-hit from table when a mole-button emits it', async () => {
    el.size = 2;
    el.activeMoles = [false, true, false, false];
    await wait();

    const handler = vi.fn();
    el.addEventListener('mole-hit', handler);

    const buttons = getButtons();

    const moleEvent = new CustomEvent('mole-hit', {
      detail: { active: true },
      bubbles: false,
      composed: false,
    });

    buttons[1].dispatchEvent(moleEvent);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({
      index: 1,
      active: true,
    });
  });
});
