import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { customElement } from 'lit/decorators.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import { PageLayout } from '../../components/page-layout/page-layout.js';

// @ts-ignore
@customElement('not-found-page')
export class NotFoundPage extends PageTransitionsMixin(LitElement) {
  /** PageController used to integrate the page with the OpenCells navigation lifecycle. */
  pageController = new PageController(this);

  /**
   * Reference to the internal <page-layout> element. Used to reset scrolling when leaving the page.
   *
   * @private
   * @type {PageLayout | null}
   */
  private _layout: PageLayout | null = null;

  /**
   * Lifecycle: called after the first update cycle. Retrieves the page-layout instance from the
   * light DOM.
   *
   * @param {any} props - Previously changed properties.
   */
  firstUpdated(props: any) {
    super.firstUpdated?.(props);

    // Because createRenderRoot() returns `this`,
    // we query directly in the light DOM.
    this._layout = this.querySelector('page-layout');
  }

  /**
   * Overrides Lit’s shadow DOM creation. This page renders directly into the light DOM.
   *
   * @returns {HTMLElement | DocumentFragment}
   */
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <page-layout>
        <div class="page-header">
          <ul class="page-header-sup">
            <li>
              <md-outlined-button aria-label="Back to home" href="#!/">
                <md-icon filled slot="icon">arrow_back</md-icon>
                <span class="md-outlined-button-text">Back to</span>
                home
              </md-outlined-button>
            </li>
          </ul>

          <h2>Page not found</h2>
        </div>
      </page-layout>
    `;
  }

  /**
   * Navigation hook called when the user moves away from this page. Resets scroll to the top inside
   * the PageLayout component.
   */
  onPageLeave() {
    this._layout?.resetScroll();
  }
}
