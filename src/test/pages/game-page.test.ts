import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { TemplateResult } from 'lit';
import '../../pages/game/game-page.js';
import { saveScore } from '../../config/score-config.config.js';

interface GamePage extends HTMLElement {
  publish(eventName: string, data?: unknown): void;
  navigate(route: string, params?: unknown): void;

  _handleMoleHit(e: CustomEvent): void;
  _controllerGame(): void;
  _stopLoop(): void;
  _saveHighScore(): void;
  _goBack(): void;
  render(): TemplateResult;

  _playerName: string;
  _score: number;
  _isPlaying: boolean;
  _activeMoles: boolean[];
  _intervalId: number | null;
  _timerId: number | null;
  _timeLeft: number;
  level: any;
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

  //
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
});
