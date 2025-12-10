import { describe, it, expect, beforeEach, vi } from 'vitest';
import './game-header.js';
import { DifficultyLevel, TimeMode } from '../../models/enums/game-select.enum.js';

describe('game-header', () => {
  type GameHeaderTest = HTMLElement & {
    updateComplete: Promise<void>;
    playerName: string;
    level: DifficultyLevel;
    time: string;
  };

  let el: GameHeaderTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    el = document.createElement('game-header') as GameHeaderTest;
    document.body.appendChild(el);
  });

  it('renders default player name and avatar', async () => {
    await el.updateComplete;

    const name = el.shadowRoot!.querySelector('.player')!;
    const avatar = el.shadowRoot!.querySelector('.avatar')!;

    expect(name.textContent).toBe('Player');
    expect(avatar.textContent).toBe('P');
  });

  it('updates player name and avatar when property changes', async () => {
    el.playerName = 'Miquel';
    await el.updateComplete;

    const name = el.shadowRoot!.querySelector('.player')!;
    const avatar = el.shadowRoot!.querySelector('.avatar')!;

    expect(name.textContent).toBe('Miquel');
    expect(avatar.textContent).toBe('M');
  });

  it('renders default difficulty and time', async () => {
    await el.updateComplete;

    const selects = el.shadowRoot!.querySelectorAll('game-select');
    const levelSelect: any = selects[0];
    const timeSelect: any = selects[1];

    expect(levelSelect.value).toBe(DifficultyLevel.LOW);
    expect(timeSelect.value).toBe(String(TimeMode.SHORT));
  });

  it('dispatches "header-level" when level changes', async () => {
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener('header-level', handler);

    const levelSelect = el.shadowRoot!.querySelectorAll('game-select')[0];

    levelSelect.dispatchEvent(
      new CustomEvent('level-change', {
        detail: { value: DifficultyLevel.MEDIUM },
        bubbles: true,
        composed: true,
      }),
    );

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.value).toBe(DifficultyLevel.MEDIUM);
  });

  it('dispatches "header-time" when time changes', async () => {
    await el.updateComplete;

    const handler = vi.fn();
    el.addEventListener('header-time', handler);

    const timeSelect = el.shadowRoot!.querySelectorAll('game-select')[1];

    timeSelect.dispatchEvent(
      new CustomEvent('time-change', {
        detail: { value: String(TimeMode.LONG) },
        bubbles: true,
        composed: true,
      }),
    );

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.value).toBe(String(TimeMode.LONG));
  });

  it('updates internal properties when invoking private handlers', () => {
    (el as any)._onLevel({
      detail: { value: DifficultyLevel.HIGH },
    } as CustomEvent);

    expect(el.level).toBe(DifficultyLevel.HIGH);

    (el as any)._onTime({
      detail: { value: String(TimeMode.MEDIUM) },
    } as CustomEvent);

    expect(el.time).toBe(String(TimeMode.MEDIUM));
  });
});
