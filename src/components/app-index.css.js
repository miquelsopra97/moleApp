import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    --header-bg: #7a5f3e;
    --header-text: #ffffff;
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
`;
