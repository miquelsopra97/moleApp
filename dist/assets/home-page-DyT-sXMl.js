import{i as g,n as c,a as h,x as u,t as _,r as d}from"./index-BtahMz_L.js";import{P as v}from"./page-layout-Bim3VP8E.js";import{P as y}from"./game-button-Rn9eGfVE.js";const $=g`
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
`;var x=Object.defineProperty,P=Object.getOwnPropertyDescriptor,n=(e,t,a,o)=>{for(var r=o>1?void 0:o?P(t,a):t,l=e.length-1,s;l>=0;l--)(s=e[l])&&(r=(o?s(t,a,r):s(r))||r);return o&&r&&x(t,a,r),r};let i=class extends h{constructor(){super(...arguments),this.label="",this.placeholder="",this.value="",this.error=null,this.disabled=!1}_sanitize(e){return e.replace(/[^a-zA-Z0-9 ]/g,"")}_onInput(e){const t=e.target,a=this._sanitize(t.value);this.value=a,this.dispatchEvent(new CustomEvent("game-input",{detail:{value:this.value},bubbles:!0,composed:!0}))}render(){return u`
      <label class="field">
        ${this.label?u`<span class="field__label">${this.label}</span>`:null}

        <input
          class="field__control"
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._onInput}
        />

        ${this.error?u`<span class="field__error">${this.error}</span>`:null}
      </label>
    `}};i.styles=$;n([c({type:String})],i.prototype,"label",2);n([c({type:String})],i.prototype,"placeholder",2);n([c({type:String})],i.prototype,"value",2);n([c({type:String})],i.prototype,"error",2);n([c({type:Boolean})],i.prototype,"disabled",2);i=n([_("game-input")],i);const w=g`
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
`;var O=Object.defineProperty,S=Object.getOwnPropertyDescriptor,f=(e,t,a,o)=>{for(var r=o>1?void 0:o?S(t,a):t,l=e.length-1,s;l>=0;l--)(s=e[l])&&(r=(o?s(t,a,r):s(r))||r);return o&&r&&O(t,a,r),r};let p=class extends h{constructor(){super(...arguments),this._value="",this._error=null}_onInput(e){this._value=e.detail.value,this._error&&this._value.trim().length>0&&(this._error=null)}_onSubmit(){const e=this._value.trim();if(!e){this._error="Por favor introduce un nombre válido.";return}this.dispatchEvent(new CustomEvent("form-submit",{detail:{value:e},bubbles:!0,composed:!0}))}_goToScore(){this.dispatchEvent(new CustomEvent("go-score",{bubbles:!0,composed:!0}))}render(){return u`
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
    `}};p.styles=w;f([d()],p.prototype,"_value",2);f([d()],p.prototype,"_error",2);p=f([_("form-game")],p);var j=Object.defineProperty,E=Object.getOwnPropertyDescriptor,b=(e,t,a,o)=>{for(var r=o>1?void 0:o?E(t,a):t,l=e.length-1,s;l>=0;l--)(s=e[l])&&(r=(o?s(t,a,r):s(r))||r);return o&&r&&j(t,a,r),r};let m=class extends v(y(h)){constructor(){super(...arguments),this._layout=null,this._playerName="",this._error=null}firstUpdated(e){var t;(t=super.firstUpdated)==null||t.call(this,e),this._layout=this.renderRoot.querySelector("page-layout")}_startGame(e){const t=e.detail.value;localStorage.setItem("playerName",t),this.publish("player-name",t),this.navigate("game",{playerName:t})}render(){return u`
      <page-layout>
        <form-game @form-submit=${this._startGame} @go-score=${()=>this.navigate("score")}></form-game>
      </page-layout>
    `}onPageLeave(){var e;(e=this._layout)==null||e.resetScroll()}};b([d()],m.prototype,"_playerName",2);b([d()],m.prototype,"_error",2);m=b([_("home-page")],m);export{m as HomePage};
