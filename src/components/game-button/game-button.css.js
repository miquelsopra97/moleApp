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
    border-radius: 8px;

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
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
  }
`;
