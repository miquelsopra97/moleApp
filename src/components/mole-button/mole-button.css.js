import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
  }

  button {
    width: 5.6rem;
    height: 5.6rem;
    font-size: 2.5rem;
    border-radius: 0.63rem;

    border: 3px solid #333;
    background: #e6d5ad;
    color: #000;

    cursor: pointer;
    transition:
      transform 0.1s,
      background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button[data-active='true'] {
    background: #ffe8a3;
    transform: scale(1.05);
  }

  button:active {
    transform: scale(0.9);
  }
  .mole-img {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
    display: block;
    pointer-events: none;
  }
`;
