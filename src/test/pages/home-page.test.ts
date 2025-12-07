import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { TemplateResult } from 'lit';
import '../../pages/home/home-page.js';
import { PageLayout } from '../../components/page-layout/page-layout.js';

interface HomePageInstance extends HTMLElement {
  publish(eventName: string, data?: unknown): void;
  navigate(route: string, params?: unknown): void;
  _startGame(e: CustomEvent<{ value: string }>): void;
  render(): TemplateResult;
  updateComplete: Promise<boolean>;

  _layout: PageLayout | null;
}

describe('home-page', () => {
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
    const index = tpl.strings.findIndex((staticPart) => staticPart.includes('@go-score='));

    expect(index).toBeGreaterThanOrEqual(0);

    const handler = tpl.values[index] as () => void;
    handler();

    expect(el.navigate).toHaveBeenCalledWith('score');
  });

  it('firstUpdated retrieves the page-layout element inside the shadow DOM', async () => {
    document.body.innerHTML = '<home-page></home-page>';
    const el = document.querySelector('home-page') as HomePageInstance;

    await el.updateComplete;

    const layout = el._layout;

    expect(layout).not.toBeNull();
    expect(layout!.tagName.toLowerCase()).toBe('page-layout');

    expect(el.shadowRoot?.querySelector('page-layout')).not.toBeNull();
  });
});
