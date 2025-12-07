import { describe, it, expect, vi, beforeEach } from 'vitest';
import './page-layout.js';

const publishMock = vi.fn();
const unsubscribeMock = vi.fn();

vi.mock('@open-cells/element-controller', () => ({
  ElementController: class {
    publish = publishMock;
    unsubscribe = unsubscribeMock;
  },
}));

describe('page-layout', () => {
  type PageLayoutTest = HTMLElement & {
    updateComplete: Promise<void>;
    resetScroll: () => void;
  };

  let el: PageLayoutTest;

  beforeEach(() => {
    document.body.innerHTML = '';
    el = document.createElement('page-layout') as PageLayoutTest;
    document.body.appendChild(el);

    publishMock.mockClear();
    unsubscribeMock.mockClear();
  });

  const wait = async () => {
    await el.updateComplete;
  };

  const getScroller = () => el.shadowRoot!.querySelector('.scroller') as HTMLElement;

  it('renders required layout elements', async () => {
    await wait();

    const scroller = getScroller();
    const content = el.shadowRoot!.querySelector('.content');
    const region = el.shadowRoot!.querySelector('.region');
    const zone = el.shadowRoot!.querySelector('.zone');

    expect(scroller).not.toBeNull();
    expect(content).not.toBeNull();
    expect(region).not.toBeNull();
    expect(zone).not.toBeNull();
  });

  it('calls ElementController.publish on scroll', async () => {
    await wait();

    const scroller = getScroller();
    scroller.scrollTop = 123;

    // Simulamos scroll
    scroller.dispatchEvent(new Event('scroll'));

    expect(publishMock).toHaveBeenCalledTimes(1);
    expect(publishMock.mock.calls[0][0]).toBe('scroll');
    expect(publishMock.mock.calls[0][1]).toEqual({ scrollTop: 123 });
  });

  it('calls unsubscribe on disconnectedCallback', async () => {
    await wait();

    el.remove();

    expect(unsubscribeMock).toHaveBeenCalledWith('scroll');
  });

  it('resetScroll() sets scrollTop back to 0', async () => {
    await wait();

    const scroller = getScroller();

    scroller.scrollTop = 200;
    expect(scroller.scrollTop).toBe(200);

    el.resetScroll();
    expect(scroller.scrollTop).toBe(0);
  });
});
