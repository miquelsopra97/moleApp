import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { styles } from './page-layout.css';

@customElement('page-layout')
export class PageLayout extends LitElement {
  /**
   * Controller used to publish and subscribe to events between components. Handles communication
   * such as scroll notifications.
   */
  elementController = new ElementController(this);

  /**
   * Reference to the scrollable container element inside the shadow DOM. Assigned during
   * `firstUpdated`.
   *
   * @private
   */
  private _scroller: HTMLElement | undefined | null = null;

  static readonly styles = styles;

  /**
   * Lifecycle method executed after the component’s template is first rendered. Sets up the scroll
   * listener and publishes scroll positions via the ElementController.
   *
   * @param {any} props - Previously changed properties.
   */
  firstUpdated(props: any) {
    super.firstUpdated(props);

    this._scroller = this.shadowRoot?.querySelector('.scroller');

    this._scroller?.addEventListener('scroll', (ev) => {
      this.elementController.publish('scroll', {
        scrollTop: (ev.target as HTMLElement)?.scrollTop,
      });
    });
  }

  /**
   * Clean-up performed when the element is detached from the DOM:
   *
   * - Removes the scroll listener
   * - Unsubscribes from controller events
   */
  disconnectedCallback() {
    this._scroller?.removeEventListener('scroll', (ev) => {
      this.elementController.publish('scroll', {
        scrollTop: (ev.target as HTMLElement)?.scrollTop,
      });
    });

    this.elementController.unsubscribe('scroll');
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="scroller">
        <div class="content">
          <div class="region">
            <div class="zone">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /** Resets the scrollable container back to the top. Public utility method to be called externally. */
  resetScroll() {
    this._scroller?.scrollTo(0, 0);
  }
}
