import { describe, it, expect, vi, beforeEach } from 'vitest';
import './game-select.js';
import { DifficultyLevel } from '../../models/enums/game-select.enum.js';

describe('select-game', () => {
  type SelectGameTest = HTMLElement & {
    updateComplete: Promise<void>;
    value: DifficultyLevel;
  };

  let el: SelectGameTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    el = document.createElement('select-game') as SelectGameTest;
    document.body.appendChild(el);
  });

  const waitForUpdate = async () => {
    await el.updateComplete;
  };

  const getSelect = () => {
    return el.shadowRoot!.querySelector('select') as HTMLSelectElement;
  };

  it('renders with default value LOW', async () => {
    await waitForUpdate();

    const select = getSelect();
    expect(select.value).toBe(DifficultyLevel.LOW);
  });

  it('updates select value when property changes', async () => {
    el.value = DifficultyLevel.LOW;
    await waitForUpdate();

    const select = getSelect();
    expect(select.value).toBe(DifficultyLevel.LOW);
  });

  it('updates property when user selects an option', async () => {
    await waitForUpdate();

    const select = getSelect();

    select.value = DifficultyLevel.MEDIUM;
    select.dispatchEvent(new Event('change'));

    await waitForUpdate();

    expect(el.value).toBe(DifficultyLevel.MEDIUM);
  });

  it('emits level-change event when selection changes', async () => {
    await waitForUpdate();

    const handler = vi.fn();
    el.addEventListener('level-change', handler);

    const select = getSelect();

    select.value = DifficultyLevel.LOW;
    select.dispatchEvent(new Event('change'));

    await waitForUpdate();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail).toEqual({ value: DifficultyLevel.LOW });
  });
});
