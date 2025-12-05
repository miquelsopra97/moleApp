import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    margin-bottom: 1rem;
    font-family: inherit;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .field__label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #5c452c;
  }

  .field__control {
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    border: 2px solid #b79a7a;
    background: #fffaf4;
    color: #3a2a18;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  }

  .field__control::placeholder {
    color: #b8a999;
  }

  .field__control:focus {
    border-color: #7a5f3e;
    box-shadow: 0 0 0 2px rgba(122, 95, 62, 0.25);
    background: #fff8ee;
  }

  .field__control:disabled {
    background: #f0e6da;
    border-color: #c9b9a4;
    color: #888;
    cursor: not-allowed;
  }

  .field__error {
    font-size: 0.8rem;
    color: #b44a3c;
  }
`;
