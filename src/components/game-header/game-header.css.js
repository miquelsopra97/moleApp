import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    --header-bg: #7a5f3e;
    --header-text: #ffffff;
    --header-subtext: #f5e7d4;
  }

  header.header {
    height: 3.5rem;
    background-color: var(--header-bg);
    color: var(--header-text);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    box-sizing: border-box;
    position: relative;
    z-index: 4;
  }

  .header__left {
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
    flex-shrink: 0;
  }

  .player {
    font-size: 1rem;
    font-weight: 600;
  }

  .header__right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.9rem;
    color: var(--header-subtext);
  }

  .label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.8rem;
  }
`;
