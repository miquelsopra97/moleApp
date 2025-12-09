import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { TemplateResult } from 'lit';
import '../../pages/game/game-page.js';
import { saveScore } from '../../config/score-config.config.js';
import { getMoleSettings, SIZES_MOLETABLE } from '../../config/mole-config.config.js';
import { MoleMode } from '../../models/enums/moles-mode.enum.js';

interface GamePage extends HTMLElement {
  subscribe: (ev: string, cb: Function) => void;
  firstUpdated(): unknown;
  performUpdate: any;
  params: { playerName: string };
  publish(eventName: string, data?: unknown): void;
  navigate(route: string, params?: unknown): void;

  _handleMoleHit(e: CustomEvent): void;
  _controllerGame(): void;
  _stopLoop(): void;
  _saveHighScore(): void;
  _goBack(): void;
  render(): TemplateResult;
  _clearGame(): void;
  _startLoop(): void;
  _controlMolesMode(): void;

  _playerName: string;
  _score: number;
  _isPlaying: boolean;
  _activeMoles: boolean[];
  _intervalId: number | null;
  _timerId: number | null;
  _timeLeft: number;
  level: any;
  __testCallbacks: any;

  _molesMode: MoleMode;
}

describe('game-page (unit)', () => {
  let el: GamePage;

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();

    const Ctor = customElements.get('game-page') as CustomElementConstructor;
    el = new Ctor() as GamePage;

    el.publish = vi.fn();
    el.navigate = vi.fn();
  });

  it('increases score when a mole is hit while playing', () => {
    el._isPlaying = true;

    const event = new CustomEvent('mole-hit', {
      detail: { active: true },
    });

    el._handleMoleHit(event);
    expect(el._score).toBe(10);
  });

  it('start/stop game controll isPlaying and resets score', () => {
    el._controllerGame();

    expect(el._isPlaying).toBe(true);
    expect(el._score).toBe(0);

    el._controllerGame();

    expect(el._isPlaying).toBe(false);
  });

  it('_goBack stops game, resets state and navigates home', () => {
    el._isPlaying = true;
    el._intervalId = 99 as unknown as number;

    el._goBack();

    expect(el._isPlaying).toBe(false);
    expect(el._score).toBe(0);
    expect(el.navigate).toHaveBeenCalledWith('home');
    expect(el._intervalId).toBeNull();
  });

  it('_stopLoop clears interval and active moles', () => {
    el._intervalId = 123 as unknown as number;

    el._stopLoop();

    expect(el._intervalId).toBeNull();
    expect(el._activeMoles).toEqual([]);
  });

  it('_saveHighScore calls saveScore correctly', () => {
    el._playerName = 'Miquel';
    el._score = 42;

    el._saveHighScore();

    expect(saveScore).toHaveBeenCalledWith('Miquel', 42);
  });

  it('_startTimer decreases time and ends game at zero', () => {
    el._isPlaying = true;
    el._timeLeft = 3;

    const clearTimerSpy = vi.spyOn(el as any, '_clearTimer');
    const stopLoopSpy = vi.spyOn(el as any, '_stopLoop');
    const saveScoreSpy = vi.spyOn(el as any, '_saveHighScore');

    (el as any)._startTimer();

    vi.advanceTimersByTime(3000);

    expect(stopLoopSpy).toHaveBeenCalled();
    expect(saveScoreSpy).toHaveBeenCalled();
    expect(clearTimerSpy).toHaveBeenCalled();
  });

  it('restores playerName from params', async () => {
    document.body.innerHTML = '<game-page></game-page>';
    const el = document.querySelector('game-page') as GamePage;

    el.params = { playerName: 'Miquel' };

    await el.performUpdate?.();

    expect(el._playerName).toBe('Miquel');
  });

  it('restores playerName from localStorage', async () => {
    localStorage.setItem('playerName', 'StoredName');

    document.body.innerHTML = '<game-page></game-page>';
    const el = document.querySelector('game-page') as GamePage;

    await el.performUpdate?.();

    expect(el._playerName).toBe('StoredName');
  });

  it('defaults playerName to "Player"', async () => {
    document.body.innerHTML = '<game-page></game-page>';
    const el = document.querySelector('game-page') as GamePage;

    await (el as any).performUpdate?.();

    expect(el._playerName).toBe('Player');
  });

  it('updates player name when receiving "player-name" event', async () => {
    document.body.innerHTML = '<game-page></game-page>';
    const el = document.querySelector('game-page') as GamePage;

    await el.performUpdate?.();

    el.__testCallbacks = {};
    el.subscribe = (ev: string, cb: Function) => {
      el.__testCallbacks[ev] = cb;
    };
    el.publish = (ev: string, data: any) => {
      el.__testCallbacks[ev]?.(data);
    };

    el.firstUpdated();

    el.publish('player-name', 'NewName');

    expect(el._playerName).toBe('NewName');
    expect(localStorage.getItem('playerName')).toBe('NewName');
  });

  it('restarts loop when game-level changes while playing', async () => {
    document.body.innerHTML = '<game-page></game-page>';
    const el = document.querySelector('game-page') as any;

    await el.performUpdate?.();

    el.__testCallbacks = {};
    el.subscribe = (ev: string, cb: Function) => {
      el.__testCallbacks[ev] = cb;
    };
    el.publish = (ev: string, data: any) => {
      el.__testCallbacks[ev]?.(data);
    };

    el.firstUpdated();

    el._isPlaying = true;

    const stopSpy = vi.spyOn(el, '_stopLoop');
    const startSpy = vi.spyOn(el, '_startLoop');

    el.publish('game-level', 'medium');

    expect(stopSpy).toHaveBeenCalled();
    expect(startSpy).toHaveBeenCalled();
  });

  it('unsubscribe is called on disconnectedCallback', async () => {
    document.body.innerHTML = '<game-page></game-page>';
    const el = document.querySelector('game-page') as GamePage;

    const unsubSpy = vi.spyOn(el as any, 'unsubscribe');

    el.remove();

    expect(unsubSpy).toHaveBeenCalledWith('player-name');
    expect(unsubSpy).toHaveBeenCalledWith('game-level');
  });

  it('_controlMolesMode toggles between 1 and 2', () => {
    el._molesMode = 1;
    el._controlMolesMode();
    expect(el._molesMode).toBe(2);

    el._controlMolesMode();
    expect(el._molesMode).toBe(1);
  });

  it('_startLoop generates exactly 1 mole in mode 1', () => {
    el._isPlaying = true;
    el._molesMode = 1;

    el._startLoop();
    vi.advanceTimersByTime(1000);

    const active = el._activeMoles.filter(Boolean);
    expect(active.length).toBe(1);

    el._stopLoop();
  });

  it('_startLoop generates exactly 2 moles in mode 2', () => {
    el._isPlaying = true;
    el._molesMode = 2;

    el._startLoop();
    vi.advanceTimersByTime(1000);

    const active = el._activeMoles.filter(Boolean);
    expect(active.length).toBe(2);

    (el as any)._stopLoop();
  });

  it('_startLoop does nothing if _isPlaying is false', () => {
    el._isPlaying = false;
    el._molesMode = 1;

    el._startLoop();
    vi.advanceTimersByTime(1000);

    expect(el._activeMoles.some(Boolean)).toBe(false);

    el._stopLoop();
  });

  it('_startLoop hides moles after timeout', () => {
    el._isPlaying = true;
    el._molesMode = 1;

    el._startLoop();

    vi.advanceTimersByTime(1);

    const settings = getMoleSettings(el.level);
    const hideTime = Math.max(0, settings.interval - 100);

    vi.advanceTimersByTime(hideTime);

    expect(el._activeMoles.some(Boolean)).toBe(false);

    el._stopLoop();
  });

  it('_clearGame fully resets the game state', () => {
    el._isPlaying = true;
    el._score = 50;
    el._timeLeft = 5;
    el._molesMode = 2;
    el._activeMoles = [true, true, false];

    el._intervalId = 123 as unknown as number;
    el._timerId = 456 as unknown as number;

    (el as GamePage)._clearGame();

    expect(el._isPlaying).toBe(false);

    expect(el._intervalId).toBeNull();
    expect(el._timerId).toBeNull();

    expect(el._score).toBe(0);
    expect(el._timeLeft).toBe(30);

    expect(el._activeMoles.length).toBe(SIZES_MOLETABLE * SIZES_MOLETABLE);
    expect(el._activeMoles.every((mole) => mole === false)).toBe(true);

    expect(el._molesMode).toBe(1);
  });
});
