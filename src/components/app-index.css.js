import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    --header-bg: #7a5f3e;
    --header-text: #ffffff;
    --header-subtext: #f5e7d4;
  }

  main {
    min-height: auto;
  }

  .header {
    height: 3.5rem;
    background-color: var(--header-bg);
    color: var(--header-text);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.15);
  }

  .header--home {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mole-logo {
    height: 7.44rem;
    width: 10.5rem;
    padding-top: 3.9rem;
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
    width: 2rem;
    height: 2rem;
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
    border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.6);
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
    box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.25);
  }
`;
