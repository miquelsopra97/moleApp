import{p as u,i as g,n as p,a as d,x as h,t as b}from"./index-CJNkyyjE.js";import{d as _}from"./page-layout-CfvpH8Ss.js";const P=t=>class extends t{static get properties(){return{params:{type:Object}}}constructor(){super(),this.pluginCellsCoreAPI(this),this.params={}}pluginCellsCoreAPI(e){u(e)}static get BRIDGE_PAGE_PRIVATE_CHANNEL_PREFIX(){return"__oc_page_"}static getPagePrivateChannel(e){return`${this.BRIDGE_PAGE_PRIVATE_CHANNEL_PREFIX}${e.toLowerCase().replace("-page","")}`}connectedCallback(){super.connectedCallback(),this.__handleConnections()}__handleConnections(){this.__hasPageHandlers()&&this.__handlePagePrivateChannel()}__hasPageHandlers(){return!!this.onPageEnter||!!this.onPageLeave}__handlePagePrivateChannel(){const e=this.constructor.getPagePrivateChannel(this.tagName),a=this.__wrapPrivateChannelCallback();this.subscribe(e,a)}__wrapPrivateChannelCallback(){return({value:e})=>{const a=()=>{e?this.onPageEnter&&this.onPageEnter():this.onPageLeave&&this.onPageLeave()};a&&a()}}},k=_(P),m=g`
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
`;var l=(t=>(t.DEFAULT="default",t.BACK="back",t))(l||{}),C=Object.defineProperty,v=Object.getOwnPropertyDescriptor,c=(t,e,a,s)=>{for(var n=s>1?void 0:s?v(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(n=(s?o(e,a,n):o(n))||n);return s&&n&&C(e,a,n),n};let r=class extends d{constructor(){super(...arguments),this.text="",this.variant=l.DEFAULT}_onClick(){this.dispatchEvent(new CustomEvent("game-click",{detail:{text:this.text},bubbles:!0,composed:!0}))}render(){const t=this.variant===l.BACK;return h`
      <button class=${this.variant} @click=${this._onClick}>
        ${t?h`
              <span class="icon">
                <slot name="icon"></slot>
              </span>
            `:null}
        <span class="label">${this.text}</span>      </button>
    `}};r.styles=m;c([p({type:String})],r.prototype,"text",2);c([p({type:String})],r.prototype,"variant",2);r=c([b("game-button")],r);export{k as P};
