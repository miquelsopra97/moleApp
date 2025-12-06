import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { TemplateResult } from 'lit';
import '../../pages/home/home-page.js';

interface HomePageInstance extends HTMLElement {
  publish(eventName: string, data?: unknown): void;
  navigate(route: string, params?: unknown): void;
  _startGame(e: CustomEvent<{ value: string }>): void;
  render(): TemplateResult;
}

describe('home-page (unit)', () => {
  let el: HomePageInstance;

  beforeEach(() => {
    localStorage.clear();

    const Ctor = customElements.get('home-page') as CustomElementConstructor;
    el = new Ctor() as HomePageInstance;
    el.publish = vi.fn();
    el.navigate = vi.fn();
  });

  it('_startGame stores the name, publishes, and navigates to game', () => {
    const event = new CustomEvent<{ value: string }>('form-submit', {
      detail: { value: 'Miquel' },
    });

    el._startGame(event);

    expect(localStorage.getItem('playerName')).toBe('Miquel');
    expect(el.publish).toHaveBeenCalledWith('player-name', 'Miquel');
    expect(el.navigate).toHaveBeenCalledWith('game', { playerName: 'Miquel' });
  });

  it('template contains go-score handler that navigates to score', () => {
    const tpl = el.render();
    const index = tpl.strings.findIndex(staticPart => staticPart.includes('@go-score='));
    expect(index).toBeGreaterThanOrEqual(0);
    const handler = tpl.values[index] as () => void;
    handler();
    expect(el.navigate).toHaveBeenCalledWith('score');
  });
});
