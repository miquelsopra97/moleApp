import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    --header-bg: #7a5f3e;
    --header-text: #ffffff;
    --header-subtext: #f5e7d4;
  }

  main {
    min-height: 100vh;
  }

  .header {
    height: 56px;
    background-color: var(--header-bg);
    color: var(--header-text);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  .header--game .header-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    box-sizing: border-box;
    position: relative;
    z-index: 4;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f0e0c5;
    color: #5a4025;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .player-name {
    font-size: 1rem;
    font-weight: 600;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--header-subtext);
  }

  .level-label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.8rem;
  }

  .level-select {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    color: var(--header-text);
    font: inherit;
    padding: 0 0 2px 0;
    outline: none;
    cursor: pointer;
  }

  .level-select option {
    background: #f7efe4;
    color: #3a2818;
  }

  .header.scrolled {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }
`;
