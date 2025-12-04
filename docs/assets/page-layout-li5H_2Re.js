var h=Object.defineProperty;var p=(t,e,r)=>e in t?h(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var d=(t,e,r)=>p(t,typeof e!="symbol"?e+"":e,r);import{i as k,a as T,E as g,x,t as y}from"./index-B9eIj8SN.js";const u=new WeakMap;function _(t,e){let r=e;for(;r;){if(u.get(r)===t)return!0;r=Object.getPrototypeOf(r)}return!1}function P(t){return e=>{if(_(t,e))return e;const r=t(e);return u.set(r,t),r}}const v={static:{forwardsIn:"static",forwardsOut:"static",backwardsIn:"static",backwardsOut:"static"},fade:{forwardsIn:"fadeIn",forwardsOut:"fadeOut",backwardsIn:"fadeIn",backwardsOut:"fadeOut"},horizontal:{forwardsIn:"moveFromRight",forwardsOut:"moveToLeft",backwardsIn:"moveFromLeft",backwardsOut:"moveToRight"},horizontalEverForwards:{forwardsIn:"moveFromRight",forwardsOut:"moveToLeft",backwardsIn:"moveFromRight",backwardsOut:"moveToLeft"},horizontalEverBackwards:{forwardsIn:"moveFromLeft",forwardsOut:"moveToRight",backwardsIn:"moveFromLeft",backwardsOut:"moveToRight"},verticalDownForwards:{forwardsIn:"static",forwardsOut:"moveToBottom",backwardsIn:"moveFromLeft",backwardsOut:"moveToRight"},verticalDownBackwards:{forwardsIn:"moveFromRight",forwardsOut:"moveToLeft",backwardsIn:"static",backwardsOut:"moveToBottom"},verticalUpForwards:{forwardsIn:"moveFromBottom",forwardsOut:"static",backwardsIn:"moveFromLeft",backwardsOut:"moveToRight"},verticalUp:{forwardsIn:"moveFromBottom",forwardsOut:"static",backwardsIn:"static",backwardsOut:"moveToBottom"}};function E(t,e){return[...e.parentElement.children].filter(r=>r!==e).find(r=>r.getAttribute("state")===t||r.state===t)}function l(t){t.removeAttribute("page-animation"),t.removeAttribute("page-animation-direction"),t.removeEventListener("animationend",t._animCb),t.removeEventListener("animationcancel",t._animCb)}function w(t){var r;const e=(r=t._isPreviousNavigationFor)==null?void 0:r.page;t._isPreviousNavigationFor=null,e&&w(e)}function b(t){t.dispatchEvent(new CustomEvent("page-active",{bubbles:!0,composed:!0}))}function f(t,e,r){e.eventPhase===2&&(l(t),!t.hasAttribute("page-animation")&&!r.hasAttribute("page-animation")&&requestAnimationFrame(()=>{const o=t.state==="active"?t:r;b(o)}))}function F(t,e){t._animCb=r=>f(t,r,e),t.addEventListener("animationend",t._animCb),t.addEventListener("animationcancel",t._animCb),e._animCb=r=>f(e,r,t),e.addEventListener("animationend",e._animCb),e.addEventListener("animationcancel",e._animCb)}function C(t,e,r){return(r==null?void 0:r[e])||v.static}function c(t,e,r,o){t.setAttribute("page-animation",e),t.setAttribute("page-animation-direction",r),o&&t.dispatchEvent(new CustomEvent(`animation-${r}`,{bubbles:!0,composed:!0}))}function A(t,e,r,o){let a=!1,i=r,n=o;e&&t._isPreviousNavigationFor?(i=t._isPreviousNavigationFor.type,n=t._isPreviousNavigationFor.animations,w(t),a=!0):e._isPreviousNavigationFor={page:t,type:r,animations:o},F(t,e);const s=C(t,i,n);requestAnimationFrame(()=>{a?(c(t,s.backwardsIn,"backward"),c(e,s.backwardsOut,"backward",!0)):(c(t,s.forwardsIn,"forward"),c(e,s.forwardsOut,"forward",!0))})}function O(t,{disabled:e,type:r,animations:o}={}){l(t);const a=E("inactive",t);a&&!e?(l(a),A(t,a,r,o)):b(t)}const L=t=>{var e;return e=class extends t{get _pageTransitions(){return this.constructor.pageTransitionDefinitions}constructor(){super(),this.pageTransitionType="fade",this.pageTransitionDisabled=!1}connectedCallback(){super.connectedCallback(),this.dataset.cellsPage=""}updated(r){var o;(o=super.updated)==null||o.call(this,r),r.has("state")&&this.state==="active"&&O(this,{disabled:this.pageTransitionDisabled,type:this.pageTransitionType,animations:this._pageTransitions})}},d(e,"properties",{state:{reflect:!0},pageTransitionType:{attribute:"page-transition-type"},pageTransitionDisabled:{type:Boolean,attribute:"page-transition-disabled"}}),d(e,"pageTransitionDefinitions",{...v}),e},M=P(L),D=k`
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
`;var R=Object.getOwnPropertyDescriptor,B=(t,e,r,o)=>{for(var a=o>1?void 0:o?R(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(a=n(a)||a);return a};let m=class extends T{constructor(){super(...arguments),this.elementController=new g(this),this._scroller=null}firstUpdated(t){var e,r;super.firstUpdated(t),this._scroller=(e=this.shadowRoot)==null?void 0:e.querySelector(".scroller"),(r=this._scroller)==null||r.addEventListener("scroll",o=>{var a;this.elementController.publish("scroll",{scrollTop:(a=o.target)==null?void 0:a.scrollTop})})}disconnectedCallback(){var t;(t=this._scroller)==null||t.removeEventListener("scroll",e=>{var r;this.elementController.publish("scroll",{scrollTop:(r=e.target)==null?void 0:r.scrollTop})}),this.elementController.unsubscribe("scroll"),super.disconnectedCallback()}render(){return x`
      <div class="scroller">
        <div class="content">
          <div class="region">
            <div class="zone">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `}resetScroll(){var t;(t=this._scroller)==null||t.scrollTo(0,0)}};m.styles=D;m=B([y("page-layout")],m);export{M as P,P as d};
