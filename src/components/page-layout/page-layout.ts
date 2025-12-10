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
  elementController: ElementController = new ElementController(this);

  /**
   * Reference to the scrollable container element inside the shadow DOM. Assigned during
   * `firstUpdated`.
   *
   * @private
   */
  private _scroller: HTMLElement | undefined | null = null;

  static readonly styles = styles;

  firstUpdated(props: any) {
    super.firstUpdated(props);

    this._scroller = this.shadowRoot?.querySelector('.scroller');

    this._scroller?.addEventListener('scroll', (ev) => {
      this.elementController.publish('scroll', {
        scrollTop: (ev.target as HTMLElement)?.scrollTop,
      });
    });
  }

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

  resetScroll() {
    this._scroller?.scrollTo(0, 0);
  }
}
