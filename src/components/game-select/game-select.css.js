import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    pointer-events: auto;
  }

  select {
    pointer-events: auto;
    background: transparent;
    border: none;
    border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.6);
    color: white;
    font-size: 0.9rem;
    padding: 0.125rem 0.25rem;
    outline: none;
    cursor: pointer;
  }

  option {
    background: #f5e7d4;
    color: #3a2818;
  }

  :host([type='time']) select {
    border-bottom-color: #7a5f3e;
    color: #7a5f3e;
  }
`;
