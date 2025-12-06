import{p as f,i as u,a as p,E as b,x as i,t as m,n as g}from"./index-CiA9MfzI.js";import{d as v}from"./PageTransitionsMixin-C3JExxZE.js";const _=e=>class extends e{static get properties(){return{params:{type:Object}}}constructor(){super(),this.pluginCellsCoreAPI(this),this.params={}}pluginCellsCoreAPI(t){f(t)}static get BRIDGE_PAGE_PRIVATE_CHANNEL_PREFIX(){return"__oc_page_"}static getPagePrivateChannel(t){return`${this.BRIDGE_PAGE_PRIVATE_CHANNEL_PREFIX}${t.toLowerCase().replace("-page","")}`}connectedCallback(){super.connectedCallback(),this.__handleConnections()}__handleConnections(){this.__hasPageHandlers()&&this.__handlePagePrivateChannel()}__hasPageHandlers(){return!!this.onPageEnter||!!this.onPageLeave}__handlePagePrivateChannel(){const t=this.constructor.getPagePrivateChannel(this.tagName),r=this.__wrapPrivateChannelCallback();this.subscribe(t,r)}__wrapPrivateChannelCallback(){return({value:t})=>{const r=()=>{t?this.onPageEnter&&this.onPageEnter():this.onPageLeave&&this.onPageLeave()};r&&r()}}},D=v(_),x=u`
  :host {
    --on-surface: var(--on-surface-dark, #1f1b13);
    --surface: var(--surface-dark, #fff8f0);

    box-sizing: border-box;
    background-color: var(--surface);
    color: var(--on-surface);
    overflow: hidden;
  }

  .scroller {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 6rem;
  }

  .region {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .zone {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .footer-content {
    width: 100%;
    padding: 5rem 0 2rem;
  }

  a {
    text-decoration: none;
    color: var(--primary);
  }
  a:hover,
  a:focus {
    color: var(--on-surface-variant);
  }

  /* 768px */
  @media (min-width: 48rem) {
    .footer-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  /* 1024px */
  @media (min-width: 60rem) {
    .zone {
      max-width: 58rem;
      margin: 0 auto;
    }

    .footer-content {
      max-width: 58rem;
      margin: 0 auto;
    }
  }

  /* 1440px */
  @media (min-width: 90rem) {
    .zone {
      max-width: 71.5rem;
    }

    .footer-content {
      max-width: 71.5rem;
    }
  }

  /* DARK MODE */
  /* @media (prefers-color-scheme: dark) {
    :host {
      --on-surface-dark: #EAE2D4;
      --surface-dark: #16130B;
    }
  } */

  :root[color-scheme-dark] {
    --on-surface-dark: #eae2d4;
    --surface-dark: #16130b;
  }
`;var C=Object.getOwnPropertyDescriptor,P=(e,t,r,a)=>{for(var o=a>1?void 0:a?C(t,r):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(o=s(o)||o);return o};let c=class extends p{constructor(){super(...arguments),this.elementController=new b(this),this._scroller=null}firstUpdated(e){var t,r;super.firstUpdated(e),this._scroller=(t=this.shadowRoot)==null?void 0:t.querySelector(".scroller"),(r=this._scroller)==null||r.addEventListener("scroll",a=>{var o;this.elementController.publish("scroll",{scrollTop:(o=a.target)==null?void 0:o.scrollTop})})}disconnectedCallback(){var e;(e=this._scroller)==null||e.removeEventListener("scroll",t=>{var r;this.elementController.publish("scroll",{scrollTop:(r=t.target)==null?void 0:r.scrollTop})}),this.elementController.unsubscribe("scroll"),super.disconnectedCallback()}render(){return i`
      <div class="scroller">
        <div class="content">
          <div class="region">
            <div class="zone">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `}resetScroll(){var e;(e=this._scroller)==null||e.scrollTo(0,0)}};c.styles=x;c=P([m("page-layout")],c);const w=u`
  :host {
    display: inline-block;
    width: 100%;
  }

  button {
    width: 100%;
    padding: 0.7rem 1.4rem;
    background: #7a5f3e;
    color: #fff;
    border: none;
    border-radius: 0.5rem; /* 8px */

    font-size: 1rem;
    font-weight: 600;

    cursor: pointer;
    transition:
      background 0.2s,
      transform 0.15s;
  }

  button:hover {
    background: #6a5136;
  }

  button:active {
    transform: scale(0.95);
  }

  button:disabled {
    background: #b8a999;
    cursor: not-allowed;
    opacity: 0.7;
  }

  button.back {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border-radius: 50%;
    font-size: 1.25rem;
    line-height: 2.5rem;
    text-align: center;
  }

  button.back .icon {
    display: inline-flex;
  }

  button.back .icon ::slotted(svg) {
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.625rem;
  }
`;var d=(e=>(e.DEFAULT="default",e.BACK="back",e))(d||{}),k=Object.defineProperty,y=Object.getOwnPropertyDescriptor,h=(e,t,r,a)=>{for(var o=a>1?void 0:a?y(t,r):t,n=e.length-1,s;n>=0;n--)(s=e[n])&&(o=(a?s(t,r,o):s(o))||o);return a&&o&&k(t,r,o),o};let l=class extends p{constructor(){super(...arguments),this.text="",this.variant=d.DEFAULT}_onClick(){this.dispatchEvent(new CustomEvent("game-click",{detail:{text:this.text},bubbles:!0,composed:!0}))}render(){const e=this.variant===d.BACK;return i`
      <button class=${this.variant} @click=${this._onClick}>
        ${e?i`
              <span class="icon">
                <slot name="icon"></slot>
              </span>
            `:null}
        <span class="label">${this.text}</span>      </button>
    `}};l.styles=w;h([g({type:String})],l.prototype,"text",2);h([g({type:String})],l.prototype,"variant",2);l=h([m("game-button")],l);export{D as P};
