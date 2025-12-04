import{i as b,n as _,a as u,x as p,t as g,r as h}from"./index-BtahMz_L.js";import{P as M}from"./game-button-Rn9eGfVE.js";import{P as $}from"./page-layout-Bim3VP8E.js";import{s as w}from"./score-config.config-DB4tY8vk.js";const I=b`
  :host {
    display: block;
    width: fit-content;
    margin: 2rem auto;
  }

  .grid {
    display: grid;
    gap: 0.5rem;
  }

  tic-button {
    width: 80px;
    height: 80px;
  }
`,x=b`
  :host {
    display: inline-block;
  }

  button {
    width: 5.6rem;
    height: 5.6rem;
    font-size: 2.5rem;
    border-radius: 0.63rem;

    border: 3px solid #333;
    background: #e6d5ad; 
    color: #000;

    cursor: pointer;
    transition: transform 0.1s, background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button[data-active="true"] {
    background: #ffe8a3; 
    transform: scale(1.05);
  }

  button:active {
    transform: scale(0.9);
  }
  .mole-img {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
    display: block;
    pointer-events: none;
  }
`,N="/assets/TopoMontySMP-5dMTKVNB.png";var O=Object.defineProperty,L=Object.getOwnPropertyDescriptor,P=(i,e,t,a)=>{for(var s=a>1?void 0:a?L(e,t):e,r=i.length-1,o;r>=0;r--)(o=i[r])&&(s=(a?o(e,t,s):o(s))||s);return a&&s&&O(e,t,s),s};let v=class extends u{constructor(){super(...arguments),this.active=!1}_onClick(){this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return p`
      <button @click=${this._onClick}>
        ${this.active?p`<img class='mole-img' src="${N}" alt="Mole" />`:""}
      </button>
    `}};v.styles=x;P([_({type:Boolean})],v.prototype,"active",2);v=P([g("mole-button")],v);const y={Low:{interval:1e3,points:10},Medium:{interval:750,points:20},High:{interval:500,points:30}},l=3;function f(i){return y[i]||y.Low}function C(){const i=l*l;return Math.floor(Math.random()*i)}function E(i){const e=l*l,t=new Array(e).fill(!1);return t[i]=!0,t}var S=Object.defineProperty,A=Object.getOwnPropertyDescriptor,d=(i,e,t,a)=>{for(var s=a>1?void 0:a?A(e,t):e,r=i.length-1,o;r>=0;r--)(o=i[r])&&(s=(a?o(e,t,s):o(s))||s);return a&&s&&S(e,t,s),s};let m=class extends u{constructor(){super(...arguments),this.size=l,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(i,e){var t;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:i,active:(t=e.detail)==null?void 0:t.active},bubbles:!0,composed:!0}))}render(){return p`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...Array(this._totalCells).keys()].map(i=>{var t;const e=((t=this.activeMoles)==null?void 0:t[i])??!1;return p`
            <mole-button
              .active=${e}
              @mole-hit=${a=>this._onMoleHit(i,a)}
            ></mole-button>
          `})}
      </div>
    `}};m.styles=I;d([_({type:Number})],m.prototype,"size",2);d([_({type:Array})],m.prototype,"activeMoles",2);m=d([g("mole-table")],m);var j=Object.defineProperty,z=Object.getOwnPropertyDescriptor,c=(i,e,t,a)=>{for(var s=a>1?void 0:a?z(e,t):e,r=i.length-1,o;r>=0;r--)(o=i[r])&&(s=(a?o(e,t,s):o(s))||s);return a&&s&&j(e,t,s),s};let n=class extends $(M(u)){constructor(){super(...arguments),this._playerName="",this._score=0,this._isPlaying=!1,this._activeMoles=Array(l*l).fill(!1),this._intervalId=null,this.level="High"}firstUpdated(i){var a,s;(a=super.firstUpdated)==null||a.call(this,i);const e=(s=this.params)==null?void 0:s.playerName,t=localStorage.getItem("playerName");e?this._playerName=e:t?this._playerName=t:this._playerName="Player",this.subscribe("player-name",r=>{this._playerName=r,localStorage.setItem("playerName",r)}),this.subscribe("game-level",r=>{this.level=r,this._isPlaying&&(this._stopLoop(),this._startLoop())})}disconnectedCallback(){this.unsubscribe("player-name"),this.unsubscribe("game-level"),super.disconnectedCallback()}_handleMoleHit(i){var e;if(this._isPlaying&&((e=i.detail)!=null&&e.active)){const{points:t}=f(this.level);this._score+=t}}_saveHighScore(){w(this._playerName,this._score)}_toggleGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._score=0,this._startLoop()):(this._saveHighScore(),this._stopLoop())}_startLoop(){const e=f(this.level).interval,t=e-100;this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const a=C();this._activeMoles=E(a),setTimeout(()=>{this._isPlaying&&(this._activeMoles=Array(9).fill(!1))},t)},e)}_stopLoop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._activeMoles=[]}_goBack(){this._isPlaying=!1,this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._score=0,this._activeMoles=Array(l*l).fill(!1),this.navigate("home")}render(){return p`
      <page-layout>
        <div class="game-container">
          <h3>Puntuación: ${this._score}</h3>
          <game-button variant="back" text="⬅" @game-click=${this._goBack}></game-button>
          <mole-table
            size=${l}
            .activeMoles=${this._activeMoles}
            @mole-hit=${this._handleMoleHit}
          ></mole-table>
          <game-button
            text="${this._isPlaying?"Parar partida":"Empezar partida"}"
            @game-click=${this._toggleGame}
          ></game-button>
        </div>
      </page-layout>
    `}};c([h()],n.prototype,"_playerName",2);c([h()],n.prototype,"_score",2);c([h()],n.prototype,"_isPlaying",2);c([h()],n.prototype,"_activeMoles",2);c([h()],n.prototype,"_intervalId",2);c([h()],n.prototype,"level",2);n=c([g("game-page")],n);export{n as GamePage};
