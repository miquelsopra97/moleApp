import{i as g,n as m,a as d,x as n,t as h,r as _}from"./index-CJNkyyjE.js";import{P as v}from"./page-layout-CfvpH8Ss.js";import{P as y}from"./game-button-DZQmMp36.js";const $=g`
  :host {
    display: block;
    margin-bottom: 1rem;
    font-family: inherit;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .field__label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #5c452c;
  }

  .field__control {
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    border: 2px solid #b79a7a;
    background: #fffaf4;
    color: #3a2a18;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  }

  .field__control::placeholder {
    color: #b8a999;
  }

  .field__control:focus {
    border-color: #7a5f3e; /* mismo tono que el botón */
    box-shadow: 0 0 0 2px rgba(122, 95, 62, 0.25);
    background: #fff8ee;
  }

  .field__control:disabled {
    background: #f0e6da;
    border-color: #c9b9a4;
    color: #888;
    cursor: not-allowed;
  }

  .field__error {
    font-size: 0.8rem;
    color: #b44a3c;
  }
`;var x=Object.defineProperty,P=Object.getOwnPropertyDescriptor,p=(e,t,a,o)=>{for(var r=o>1?void 0:o?P(t,a):t,l=e.length-1,s;l>=0;l--)(s=e[l])&&(r=(o?s(t,a,r):s(r))||r);return o&&r&&x(t,a,r),r};let i=class extends d{constructor(){super(...arguments),this.label="",this.placeholder="",this.value="",this.error=null}_sanitize(e){return e.replace(/[^a-zA-Z0-9 ]/g,"")}_onInput(e){const t=e.target,a=this._sanitize(t.value);this.value=a,this.dispatchEvent(new CustomEvent("game-input",{detail:{value:this.value},bubbles:!0,composed:!0}))}render(){return n`
      <label class="field">
        ${this.label?n`<span class="field__label">${this.label}</span>`:null}

        <input
          class="field__control"
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this._onInput}
          required
        />

        ${this.error?n`<span class="field__error">${this.error}</span>`:null}
      </label>
    `}};i.styles=$;p([m({type:String})],i.prototype,"label",2);p([m({type:String})],i.prototype,"placeholder",2);p([m({type:String})],i.prototype,"value",2);p([m({type:String})],i.prototype,"error",2);i=p([h("game-input")],i);const w=g`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 280px;
    margin: auto;
  }
`;var O=Object.defineProperty,S=Object.getOwnPropertyDescriptor,f=(e,t,a,o)=>{for(var r=o>1?void 0:o?S(t,a):t,l=e.length-1,s;l>=0;l--)(s=e[l])&&(r=(o?s(t,a,r):s(r))||r);return o&&r&&O(t,a,r),r};let u=class extends d{constructor(){super(...arguments),this._value="",this._error=null}_onInput(e){this._value=e.detail.value,this._error&&this._value.trim().length>0&&(this._error=null)}_onSubmit(){const e=this._value.trim();if(!e){this._error="Por favor introduce un nombre válido.";return}this.dispatchEvent(new CustomEvent("form-submit",{detail:{value:e},bubbles:!0,composed:!0}))}_goToScore(){this.dispatchEvent(new CustomEvent("go-score",{bubbles:!0,composed:!0}))}render(){return n`
      <div class="form-container">
        <game-input
          label="Nombre del jugador"
          placeholder="Escribe tu nombre"
          .value=${this._value}
          .error=${this._error}
          @game-input=${this._onInput}
        ></game-input>

        <game-button text="Empezar juego" @game-click=${this._onSubmit}></game-button>
        <game-button text="Ver puntuaciones" @game-click=${this._goToScore}></game-button>
      </div>
    `}};u.styles=w;f([_()],u.prototype,"_value",2);f([_()],u.prototype,"_error",2);u=f([h("form-game")],u);var j=Object.defineProperty,E=Object.getOwnPropertyDescriptor,b=(e,t,a,o)=>{for(var r=o>1?void 0:o?E(t,a):t,l=e.length-1,s;l>=0;l--)(s=e[l])&&(r=(o?s(t,a,r):s(r))||r);return o&&r&&j(t,a,r),r};let c=class extends v(y(d)){constructor(){super(...arguments),this._layout=null,this._playerName="",this._error=null}firstUpdated(e){var t;(t=super.firstUpdated)==null||t.call(this,e),this._layout=this.renderRoot.querySelector("page-layout")}_startGame(e){const t=e.detail.value;localStorage.setItem("playerName",t),this.publish("player-name",t),this.navigate("game",{playerName:t})}render(){return n`
      <page-layout>
        <form-game @form-submit=${this._startGame} @go-score=${()=>this.navigate("score")}></form-game>
      </page-layout>
    `}onPageLeave(){var e;(e=this._layout)==null||e.resetScroll()}};b([_()],c.prototype,"_playerName",2);b([_()],c.prototype,"_error",2);c=b([h("home-page")],c);export{c as HomePage};
