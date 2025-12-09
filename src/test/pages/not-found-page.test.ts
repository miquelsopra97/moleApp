import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../pages/not-found/not-found-page.js';

describe('not-found-page (unit)', () => {
  let el: any;

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const create = async () => {
    el = document.createElement('not-found-page');
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  };

  it('renders a page-layout and header text', async () => {
    const el = await create();
    const pageLayout = el.querySelector('page-layout');

    expect(pageLayout).toBeTruthy();
    expect(el.textContent).toContain('Page not found');
  });

  it('renders a Back to home button', async () => {
    const el = await create();

    const btn = el.querySelector('md-outlined-button');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Back to');
  });

  it('stores _layout on firstUpdated', async () => {
    const el = await create();
    const layout = el.querySelector('page-layout');

    expect(el._layout).toBe(layout);
  });

  it('onPageLeave calls resetScroll on _layout', async () => {
    const el = await create();

    el._layout.resetScroll = vi.fn();

    el.onPageLeave();

    expect(el._layout.resetScroll).toHaveBeenCalled();
  });
});
