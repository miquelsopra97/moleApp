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
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    color: white;
    font-size: 0.9rem;
    padding: 2px 4px;
    outline: none;
    cursor: pointer;
  }

  option {
    background: #f5e7d4;
    color: #3a2818;
  }
`;
