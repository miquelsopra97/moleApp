import{i as b,n as c,a as f,x as n,t as _,r as h}from"./index-BTfGXNU7.js";import{P as v}from"./PageTransitionsMixin-C3JExxZE.js";import{P as y}from"./game-button-uXSfKE2Y.js";const $=b`
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
    border-radius: 0.5rem;
    border: 0.125rem solid #b79a7a;
    background: #fffaf4;
    color: #3a2a18;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    transition:
      border-color 0.15s,
      box-shadow 0.15s,
      background 0.15s;
  }

  .field__control::placeholder {
    color: #b8a999;
  }

  .field__control:focus {
    border-color: #7a5f3e;
    box-shadow: 0 0 0 2px rgba(122, 95, 62, 0.25);
    background: #fff8ee;
  }

  .field__error {
    font-size: 0.8rem;
    color: #b44a3c;
  }
`;var x=Object.defineProperty,P=Object.getOwnPropertyDescriptor,p=(t,e,a,o)=>{for(var r=o>1?void 0:o?P(e,a):e,l=t.length-1,s;l>=0;l--)(s=t[l])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&x(e,a,r),r};let i=class extends f{constructor(){super(...arguments),this.label="",this.placeholder="",this.value="",this.error=null}_sanitize(t){return t.replaceAll(/[^a-zA-Z0-9 ]/g,"")}_onInput(t){const e=t.target,a=this._sanitize(e.value);this.value=a,this.dispatchEvent(new CustomEvent("game-input",{detail:{value:this.value},bubbles:!0,composed:!0}))}render(){return n`
      <label class="field">
        ${this.label?n`
              <span class="field__label">${this.label}</span>
            `:null}

        <input
          class="field__control"
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this._onInput}
          required
        />

        ${this.error?n`
              <span class="field__error">${this.error}</span>
            `:null}
      </label>
    `}};i.styles=$;p([c({type:String})],i.prototype,"label",2);p([c({type:String})],i.prototype,"placeholder",2);p([c({type:String})],i.prototype,"value",2);p([c({type:String})],i.prototype,"error",2);i=p([_("game-input")],i);const w=b`
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
    width: 17.5rem;
    margin: auto;
  }
`;var O=Object.defineProperty,S=Object.getOwnPropertyDescriptor,d=(t,e,a,o)=>{for(var r=o>1?void 0:o?S(e,a):e,l=t.length-1,s;l>=0;l--)(s=t[l])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&O(e,a,r),r};let u=class extends f{constructor(){super(...arguments),this._value="",this._error=null}_onInput(t){this._value=t.detail.value,this._error&&this._value.trim().length>0&&(this._error=null)}_onSubmit(){const t=this._value.trim();if(!t){this._error="Por favor introduce un nombre válido.";return}this.dispatchEvent(new CustomEvent("form-submit",{detail:{value:t},bubbles:!0,composed:!0}))}_goToScore(){this.dispatchEvent(new CustomEvent("go-score",{bubbles:!0,composed:!0}))}render(){return n`
      <div class="form-container">
        <game-input
          label="Nombre del jugador"
          placeholder="Escribe tu nombre"
          .value=${this._value}
          .error=${this._error}
          @game-input=${this._onInput}
        ></game-input>

        <game-button text="Empezar Juego" @game-click=${this._onSubmit}></game-button>

        <game-button text="Ver Resultados" @game-click=${this._goToScore}></game-button>
      </div>
    `}};u.styles=w;d([h()],u.prototype,"_value",2);d([h()],u.prototype,"_error",2);u=d([_("form-game")],u);var j=Object.defineProperty,E=Object.getOwnPropertyDescriptor,g=(t,e,a,o)=>{for(var r=o>1?void 0:o?E(e,a):e,l=t.length-1,s;l>=0;l--)(s=t[l])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&j(e,a,r),r};let m=class extends v(y(f)){constructor(){super(...arguments),this._playerName="",this._error=null}firstUpdated(t){var e;(e=super.firstUpdated)==null||e.call(this,t),this._layout=this.renderRoot.querySelector("page-layout")}_startGame(t){const e=t.detail.value;localStorage.setItem("playerName",e),this.publish("player-name",e),this.navigate("game",{playerName:e})}render(){return n`
      <page-layout>
        <form-game
          style="padding-top:2rem"
          @form-submit=${this._startGame}
          @go-score=${()=>this.navigate("score")}
        ></form-game>
      </page-layout>
    `}};g([h()],m.prototype,"_playerName",2);g([h()],m.prototype,"_error",2);m=g([_("home-page")],m);export{m as HomePage};
