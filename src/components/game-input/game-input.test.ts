import { describe, it, expect, vi, beforeEach } from 'vitest';
import './game-input.js';

describe('game-input', () => {
  type GameInputTest = HTMLElement & {
    updateComplete: Promise<void>;
    label: string;
    placeholder: string;
    value: string;
    error: string | null;
  };

  let el: GameInputTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    el = document.createElement('game-input') as GameInputTest;
    document.body.appendChild(el);
  });

  const waitForUpdate = async () => {
    await el.updateComplete;
  };

  const getInputEl = () => {
    return el.shadowRoot!.querySelector('input') as HTMLInputElement;
  };

  it('renders default props', async () => {
    await waitForUpdate();

    const input = getInputEl();

    expect(input.value).toBe('');
    expect(input.placeholder).toBe('');
    expect(el.shadowRoot!.querySelector('.field__label')).toBeNull();
    expect(el.shadowRoot!.querySelector('.field__error')).toBeNull();
  });

  it('renders label when provided', async () => {
    el.label = 'Nombre del jugador';
    await waitForUpdate();

    const label = el.shadowRoot!.querySelector('.field__label')!;
    expect(label.textContent).toBe('Nombre del jugador');
  });

  it('renders placeholder', async () => {
    el.placeholder = 'Escribe tu nombre';
    await waitForUpdate();

    const input = getInputEl();
    expect(input.placeholder).toBe('Escribe tu nombre');
  });

  it('reflects value to the input field', async () => {
    el.value = 'Miquel';
    await waitForUpdate();

    const input = getInputEl();
    expect(input.value).toBe('Miquel');
  });

  it('renders error message when provided', async () => {
    el.error = 'Campo inválido';
    await waitForUpdate();

    const err = el.shadowRoot!.querySelector('.field__error')!;
    expect(err.textContent).toBe('Campo inválido');
  });

  it('sanitizes input and emits game-input event', async () => {
    await waitForUpdate();

    const handlerInput = vi.fn();
    el.addEventListener('game-input', handlerInput);

    const input = getInputEl();

    input.value = 'Miquel!!!***@@@@';
    input.dispatchEvent(new Event('input'));

    await waitForUpdate();

    expect(el.value).toBe('Miquel');

    expect(handlerInput).toHaveBeenCalledTimes(1);
    expect(handlerInput.mock.calls[0][0].detail).toEqual({ value: 'Miquel' });
  });
});
