import{p,i as d,n as c,a as u,x as b,t as g}from"./index-B9eIj8SN.js";import{d as _}from"./page-layout-li5H_2Re.js";const P=t=>class extends t{static get properties(){return{params:{type:Object}}}constructor(){super(),this.pluginCellsCoreAPI(this),this.params={}}pluginCellsCoreAPI(e){p(e)}static get BRIDGE_PAGE_PRIVATE_CHANNEL_PREFIX(){return"__oc_page_"}static getPagePrivateChannel(e){return`${this.BRIDGE_PAGE_PRIVATE_CHANNEL_PREFIX}${e.toLowerCase().replace("-page","")}`}connectedCallback(){super.connectedCallback(),this.__handleConnections()}__handleConnections(){this.__hasPageHandlers()&&this.__handlePagePrivateChannel()}__hasPageHandlers(){return!!this.onPageEnter||!!this.onPageLeave}__handlePagePrivateChannel(){const e=this.constructor.getPagePrivateChannel(this.tagName),a=this.__wrapPrivateChannelCallback();this.subscribe(e,a)}__wrapPrivateChannelCallback(){return({value:e})=>{const a=()=>{e?this.onPageEnter&&this.onPageEnter():this.onPageLeave&&this.onPageLeave()};a&&a()}}},E=_(P),C=d`
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
    border-radius: 8px;

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
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
  }
`;var h=(t=>(t.DEFAULT="default",t.BACK="back",t))(h||{}),v=Object.defineProperty,f=Object.getOwnPropertyDescriptor,i=(t,e,a,s)=>{for(var n=s>1?void 0:s?f(e,a):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(n=(s?l(e,a,n):l(n))||n);return s&&n&&v(e,a,n),n};let r=class extends u{constructor(){super(...arguments),this.text="",this.disabled=!1,this.variant=h.DEFAULT}_onClick(){this.disabled||this.dispatchEvent(new CustomEvent("game-click",{detail:{text:this.text},bubbles:!0,composed:!0}))}render(){return b`
      <button class=${this.variant} ?disabled=${this.disabled} @click=${this._onClick}>
        ${this.text}
      </button>
    `}};r.styles=C;i([c({type:String})],r.prototype,"text",2);i([c({type:Boolean})],r.prototype,"disabled",2);i([c({type:String})],r.prototype,"variant",2);r=i([g("game-button")],r);export{E as P};
