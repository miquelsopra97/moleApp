import{p as d,i as u,n as h,a as b,x as p,t as g}from"./index-CIOabpnB.js";import{d as _}from"./page-layout-DUF6-2Qa.js";const P=t=>class extends t{static get properties(){return{params:{type:Object}}}constructor(){super(),this.pluginCellsCoreAPI(this),this.params={}}pluginCellsCoreAPI(e){d(e)}static get BRIDGE_PAGE_PRIVATE_CHANNEL_PREFIX(){return"__oc_page_"}static getPagePrivateChannel(e){return`${this.BRIDGE_PAGE_PRIVATE_CHANNEL_PREFIX}${e.toLowerCase().replace("-page","")}`}connectedCallback(){super.connectedCallback(),this.__handleConnections()}__handleConnections(){this.__hasPageHandlers()&&this.__handlePagePrivateChannel()}__hasPageHandlers(){return!!this.onPageEnter||!!this.onPageLeave}__handlePagePrivateChannel(){const e=this.constructor.getPagePrivateChannel(this.tagName),a=this.__wrapPrivateChannelCallback();this.subscribe(e,a)}__wrapPrivateChannelCallback(){return({value:e})=>{const a=()=>{e?this.onPageEnter&&this.onPageEnter():this.onPageLeave&&this.onPageLeave()};a&&a()}}},k=_(P),m=u`
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
`;var c=(t=>(t.DEFAULT="default",t.BACK="back",t))(c||{}),C=Object.defineProperty,v=Object.getOwnPropertyDescriptor,i=(t,e,a,r)=>{for(var n=r>1?void 0:r?v(e,a):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(n=(r?l(e,a,n):l(n))||n);return r&&n&&C(e,a,n),n};let s=class extends b{constructor(){super(...arguments),this.text="",this.disabled=!1,this.variant=c.DEFAULT}_onClick(){this.disabled||this.dispatchEvent(new CustomEvent("game-click",{detail:{text:this.text},bubbles:!0,composed:!0}))}render(){const t=this.variant===c.BACK;return p`
      <button class=${this.variant} ?disabled=${this.disabled} @click=${this._onClick}>
        ${t?p`
              <span class="icon">
                <slot name="icon"></slot>
              </span>
            `:null}
        <span class="label">${this.text}</span>      </button>
    `}};s.styles=m;i([h({type:String})],s.prototype,"text",2);i([h({type:Boolean})],s.prototype,"disabled",2);i([h({type:String})],s.prototype,"variant",2);s=i([g("game-button")],s);export{k as P};
