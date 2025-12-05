import { describe, it, expect, vi, beforeEach } from 'vitest';
import './game-form.js';

describe('form-game', () => {
  type FormGameTest = HTMLElement & {
    updateComplete: Promise<void>;
    _value: string;
    _error: string | null;
  };

  let el: FormGameTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    el = document.createElement('form-game') as FormGameTest;
    document.body.appendChild(el);
  });

  const waitForUpdate = async () => {
    await el.updateComplete;
  };

  const getButtons = () => {
    const root = el.shadowRoot!;
    const buttons = root.querySelectorAll('game-button');
    return {
      startBtn: buttons[0],
      scoreBtn: buttons[1],
    };
  };

  const getInput = () => {
    return el.shadowRoot!.querySelector('game-input') as HTMLElement;
  };

  it('updates value when receiving game-input event', async () => {
    await waitForUpdate();

    const input = getInput();

    input.dispatchEvent(
      new CustomEvent('game-input', {
        detail: { value: 'Miquel' },
        bubbles: true,
        composed: true,
      }),
    );

    await waitForUpdate();

    expect(el._value).toBe('Miquel');
  });

  it('sets error when trying to submit empty name', async () => {
    await waitForUpdate();

    const { startBtn } = getButtons();

    startBtn.shadowRoot!.querySelector('button')!.click();
    await waitForUpdate();

    expect(el._error).toBe('Por favor introduce un nombre válido.');
  });

  it('emits form-submit when name is valid', async () => {
    await waitForUpdate();

    const handlerSubmit = vi.fn();
    el.addEventListener('form-submit', handlerSubmit);

    const input = getInput();
    input.dispatchEvent(
      new CustomEvent('game-input', {
        detail: { value: 'Miquel' },
        bubbles: true,
        composed: true,
      }),
    );
    await waitForUpdate();

    const { startBtn } = getButtons();
    startBtn.shadowRoot!.querySelector('button')!.click();
    await waitForUpdate();

    expect(handlerSubmit).toHaveBeenCalledTimes(1);
    expect(handlerSubmit.mock.calls[0][0].detail).toEqual({ value: 'Miquel' });
  });

  it('emits go-score when clicking the score button', async () => {
    await waitForUpdate();

    const handlerScore = vi.fn();
    el.addEventListener('go-score', handlerScore);

    const { scoreBtn } = getButtons();

    scoreBtn.shadowRoot!.querySelector('button')!.click();
    await waitForUpdate();

    expect(handlerScore).toHaveBeenCalledTimes(1);
  });
});
