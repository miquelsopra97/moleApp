import { describe, it, expect, beforeEach, vi } from 'vitest';
import './game-select.js';
import { TypeSelect } from '../../models/enums/game-select.enum.js';

describe('game-select', () => {
  type GameSelectTest = HTMLElement & {
    updateComplete: Promise<void>;
    type: TypeSelect;
    value: string;
    options: string[];
  };

  let el: GameSelectTest;

  beforeEach(async () => {
    document.body.innerHTML = '';

    el = document.createElement('game-select') as GameSelectTest;
    el.options = ['LOW', 'MEDIUM', 'HIGH'];
    el.value = 'LOW';

    document.body.appendChild(el);
    await el.updateComplete;
  });

  it('renders select with options', async () => {
    const select = el.shadowRoot!.querySelector('select')!;
    expect(select).not.toBeNull();
    expect(select.querySelectorAll('option').length).toBe(3);
  });

  it('renders initial value', async () => {
    const select = el.shadowRoot!.querySelector('select')!;
    expect(select.value).toBe('LOW');
  });

  it('updates when property changes', async () => {
    el.value = 'MEDIUM';
    await el.updateComplete;

    const select = el.shadowRoot!.querySelector('select')!;
    expect(select.value).toBe('MEDIUM');
  });

  it('updates component value on change', async () => {
    const select = el.shadowRoot!.querySelector('select')!;
    select.value = 'HIGH';

    select.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect(el.value).toBe('HIGH');
  });

  it('emits level-change when type = LEVEL', async () => {
    el.type = TypeSelect.LEVEL;
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener('level-change', handler);

    const select = el.shadowRoot!.querySelector('select')!;
    select.value = 'MEDIUM';
    select.dispatchEvent(new Event('change'));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ value: 'MEDIUM' });
  });

  it('emits time-change when type = TIME', async () => {
    el.type = TypeSelect.TIME;
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener('time-change', handler);

    const select = el.shadowRoot!.querySelector('select')!;
    select.value = 'HIGH';
    select.dispatchEvent(new Event('change'));

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({ value: 'HIGH' });
  });
});
