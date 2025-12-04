import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    width: 100%;
  }

  button {
    width: 100%;
    padding: 0.7rem 1.4rem;
    background: #7a5f3e;
    color: #fff;
    border: none;
    border-radius: 0.5rem; /* 8px */

    font-size: 1rem;
    font-weight: 600;

    cursor: pointer;
    transition:
      background 0.2s,
      transform 0.15s;
  }

  button:hover {
    background: #6a5136;
  }

  button:active {
    transform: scale(0.95);
  }

  button:disabled {
    background: #b8a999;
    cursor: not-allowed;
    opacity: 0.7;
  }

  button.back {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border-radius: 50%;
    font-size: 1.25rem;
    line-height: 2.5rem;
    text-align: center;
  }

  button.back .icon {
    display: inline-flex;
  }

  button.back .icon ::slotted(svg) {
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.625rem;
  }
`;
