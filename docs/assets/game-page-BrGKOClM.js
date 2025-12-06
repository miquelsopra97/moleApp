import{i as b,n as v,a as u,x as p,t as d,D as M,r as c}from"./index-CiA9MfzI.js";import{P as w}from"./game-button-C7aBPxxH.js";import{P as L}from"./PageTransitionsMixin-C3JExxZE.js";import{s as $}from"./score-config.config-DB4tY8vk.js";const I=b`
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
`,T=b`
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
`,x="/moleApp/assets/TopoMontySMP-5dMTKVNB.png";var O=Object.defineProperty,N=Object.getOwnPropertyDescriptor,P=(e,t,i,a)=>{for(var s=a>1?void 0:a?N(t,i):t,r=e.length-1,l;r>=0;r--)(l=e[r])&&(s=(a?l(t,i,s):l(s))||s);return a&&s&&O(t,i,s),s};let _=class extends u{constructor(){super(...arguments),this.active=!1,this.hitSound=new Audio("/moleApp/sounds/hitmole.mp3")}_onClick(){var e;this.active&&((e=navigator.vibrate)==null||e.call(navigator,80),this.hitSound.currentTime=0,this.hitSound.play()),this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return p`
      <button @click=${this._onClick}>
        ${this.active?p`<img class="mole-img" src="${x}" alt="Mole" />`:""}
      </button>
    `}};_.styles=T;P([v({type:Boolean})],_.prototype,"active",2);_=P([d("mole-button")],_);const g={Low:{interval:1e3,points:10},Medium:{interval:750,points:20},High:{interval:500,points:30}},o=3;function y(e){return g[e]||g.Low}function S(){const e=o*o;return Math.floor(Math.random()*e)}function A(e){const t=o*o,i=new Array(t).fill(!1);return e>=0&&e<t&&(i[e]=!0),i}var C=Object.defineProperty,E=Object.getOwnPropertyDescriptor,f=(e,t,i,a)=>{for(var s=a>1?void 0:a?E(t,i):t,r=e.length-1,l;r>=0;r--)(l=e[r])&&(s=(a?l(t,i,s):l(s))||s);return a&&s&&C(t,i,s),s};let m=class extends u{constructor(){super(...arguments),this.size=o,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(e,t){var i;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:e,active:(i=t.detail)==null?void 0:i.active},bubbles:!0,composed:!0}))}render(){return p`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...new Array(this._totalCells).keys()].map(e=>{var i;const t=((i=this.activeMoles)==null?void 0:i[e])??!1;return p`
            <mole-button
              .active=${t}
              @mole-hit=${a=>this._onMoleHit(e,a)}
            ></mole-button>
          `})}
      </div>
    `}};m.styles=I;f([v({type:Number})],m.prototype,"size",2);f([v({type:Array})],m.prototype,"activeMoles",2);m=f([d("mole-table")],m);var H=Object.defineProperty,j=Object.getOwnPropertyDescriptor,h=(e,t,i,a)=>{for(var s=a>1?void 0:a?j(t,i):t,r=e.length-1,l;r>=0;r--)(l=e[r])&&(s=(a?l(t,i,s):l(s))||s);return a&&s&&H(t,i,s),s};let n=class extends L(w(u)){constructor(){super(...arguments),this._playerName="",this._score=0,this._isPlaying=!1,this._activeMoles=new Array(o*o).fill(!1),this._intervalId=null,this.level=M.LOW,this._timeLeft=60,this._timerId=null}firstUpdated(e){var a,s;(a=super.firstUpdated)==null||a.call(this,e);const t=(s=this.params)==null?void 0:s.playerName,i=localStorage.getItem("playerName");t?this._playerName=t:i?this._playerName=i:this._playerName="Player",this.subscribe("player-name",r=>{this._playerName=r,localStorage.setItem("playerName",r)}),this.subscribe("game-level",r=>{this.level=r,this._isPlaying&&(this._stopLoop(),this._startLoop())})}disconnectedCallback(){this.unsubscribe("player-name"),this.unsubscribe("game-level"),super.disconnectedCallback()}_handleMoleHit(e){var t;if(this._isPlaying&&((t=e.detail)!=null&&t.active)){const{points:i}=y(this.level);this._score+=i}}_clearTimer(){this._timerId&&(clearInterval(this._timerId),this._timerId=null)}_saveHighScore(){$(this._playerName,this._score)}_controllerGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._score=0,this._timeLeft=60,this._clearTimer(),this._startLoop(),this._startTimer()):(this._saveHighScore(),this._stopLoop(),this._clearTimer())}_startLoop(){const t=y(this.level).interval,i=t-100;this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const a=S();this._activeMoles=A(a),setTimeout(()=>{this._isPlaying&&(this._activeMoles=new Array(9).fill(!1))},i)},t)}_stopLoop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._activeMoles=[]}_startTimer(){this._clearTimer(),this._timerId=window.setInterval(()=>{this._timeLeft--,this._timeLeft<=0&&(this._isPlaying=!1,this._stopLoop(),this._saveHighScore(),this._clearTimer()),this.requestUpdate()},1e3)}_goBack(){this._isPlaying=!1,this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._score=0,this._activeMoles=new Array(o*o).fill(!1),this.navigate("home")}render(){return p`
      <page-layout>
        <div class="game-container">
          <game-button variant="back" @game-click=${this._goBack}>
            <svg
              slot="icon"
              fill="#ffff"
              width="800px"
              height="800px"
              viewBox="0 0 52 52"
              data-name="Layer 1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z"
              />
            </svg>
          </game-button>
          <h3>Puntuación: ${this._score}</h3>
          <h4>Tiempo: ${this._timeLeft}s</h4>
          <mole-table
            size=${o}
            .activeMoles=${this._activeMoles}
            @mole-hit=${this._handleMoleHit}
          ></mole-table>
          <game-button
            text="${this._isPlaying?"Parar partida":"Empezar partida"}"
            @game-click=${this._controllerGame}
          ></game-button>
        </div>
      </page-layout>
    `}};h([c()],n.prototype,"_playerName",2);h([c()],n.prototype,"_score",2);h([c()],n.prototype,"_isPlaying",2);h([c()],n.prototype,"_activeMoles",2);h([c()],n.prototype,"_intervalId",2);h([c()],n.prototype,"level",2);h([c()],n.prototype,"_timeLeft",2);n=h([d("game-page")],n);export{n as GamePage};
