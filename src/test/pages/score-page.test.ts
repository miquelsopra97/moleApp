import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import '../../pages/score/score-page.js';

vi.mock('../../config/score-config.config.js', () => ({
  getScores: vi.fn(),
}));

import { getScores } from '../../config/score-config.config.js';

describe('score-page (unit)', () => {
  let el: any;

  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  const create = async () => {
    el = document.createElement('score-page');
    el.navigate = vi.fn();
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  };

  it('loads scores on firstUpdated', async () => {
    (getScores as Mock).mockReturnValue([{ name: 'Ana', score: 40, time: 30 }]);

    const el = await create();

    expect(getScores).toHaveBeenCalled();
    expect(el._scores).toEqual([{ name: 'Ana', score: 40, time: 30 }]);
  });

  it('renders "No hay puntuaciones" when empty', async () => {
    (getScores as Mock).mockReturnValue([]);

    const el = await create();
    const shadow = el.shadowRoot!;

    expect(shadow.querySelector('p')?.textContent).toContain('No hay puntuaciones');
  });

  it('renders score list when scores exist', async () => {
    (getScores as Mock).mockReturnValue([
      { name: 'Miquel', score: 50, time: 60 },
      { name: 'Ana', score: 20, time: 90 },
    ]);

    const el = await create();
    const shadow = el.shadowRoot!;
    const list = shadow.querySelectorAll('li');

    expect(list.length).toBe(2);
    expect(list[0].textContent).toContain('1. Miquel');
    expect(list[0].textContent).toContain('50 pts');
    expect(list[0].textContent).toContain('60 segundos');
  });

  it('clicking "Volver" calls navigate("home")', async () => {
    (getScores as Mock).mockReturnValue([]);

    const el = await create();
    const shadow = el.shadowRoot!;

    const btn = shadow.querySelector('game-button')!;
    btn.dispatchEvent(new CustomEvent('game-click'));

    expect(el.navigate).toHaveBeenCalledWith('home');
  });
});
