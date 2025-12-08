import{i as b,n as u,a as d,x as p,t as f,D as M,r as h}from"./index-DKk74GeC.js";import{P as w}from"./game-button-fx7PSbEU.js";import{P as L}from"./PageTransitionsMixin-C3JExxZE.js";import{s as $}from"./score-config.config-DB4tY8vk.js";const I=b`
  :host {
    display: block;
    width: fit-content;
    margin: 2rem auto;
  }

  .grid {
    display: grid;
    gap: 0.5rem;
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
    transition:
      transform 0.1s,
      background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button[data-active='true'] {
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
`,O="/moleApp/assets/TopoMontySMP-5dMTKVNB.png";var N=Object.defineProperty,S=Object.getOwnPropertyDescriptor,P=(t,e,i,a)=>{for(var s=a>1?void 0:a?S(e,i):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(s=(a?o(e,i,s):o(s))||s);return a&&s&&N(e,i,s),s};let _=class extends d{constructor(){super(...arguments),this.active=!1,this.hitSound=new Audio("/moleApp/sounds/hitmole.mp3")}_onClick(){var t;this.active&&((t=navigator.vibrate)==null||t.call(navigator,80),this.hitSound.currentTime=0,this.hitSound.play()),this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return p`
      <button @click=${this._onClick}>
        ${this.active?p`
              <img class="mole-img" src="${O}" alt="Mole" />
            `:""}
      </button>
    `}};_.styles=T;P([u({type:Boolean})],_.prototype,"active",2);_=P([f("mole-button")],_);const v={Low:{interval:1e3,points:10},Medium:{interval:750,points:20},High:{interval:500,points:30}},l=3;function y(t){return t&&v[t]?v[t]:v.Low}function x(){const t=l*l;return Math.floor(Math.random()*t)}function A(t){const e=l*l,i=new Array(e).fill(!1);return t>=0&&t<e&&(i[t]=!0),i}var C=Object.defineProperty,E=Object.getOwnPropertyDescriptor,g=(t,e,i,a)=>{for(var s=a>1?void 0:a?E(e,i):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(s=(a?o(e,i,s):o(s))||s);return a&&s&&C(e,i,s),s};let m=class extends d{constructor(){super(...arguments),this.size=l,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(t,e){var i;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:t,active:(i=e.detail)==null?void 0:i.active},bubbles:!0,composed:!0}))}render(){return p`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...new Array(this._totalCells).keys()].map(t=>{var i;const e=((i=this.activeMoles)==null?void 0:i[t])??!1;return p`
            <mole-button
              .active=${e}
              @mole-hit=${a=>this._onMoleHit(t,a)}
            ></mole-button>
          `})}
      </div>
    `}};m.styles=I;g([u({type:Number})],m.prototype,"size",2);g([u({type:Array})],m.prototype,"activeMoles",2);m=g([f("mole-table")],m);var H=Object.defineProperty,j=Object.getOwnPropertyDescriptor,c=(t,e,i,a)=>{for(var s=a>1?void 0:a?j(e,i):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(s=(a?o(e,i,s):o(s))||s);return a&&s&&H(e,i,s),s};let n=class extends L(w(d)){constructor(){super(...arguments),this._playerName="",this._score=0,this._isPlaying=!1,this._activeMoles=new Array(l*l).fill(!1),this._intervalId=null,this.level=M.LOW,this._timeLeft=60,this._timerId=null}firstUpdated(t){var a,s;(a=super.firstUpdated)==null||a.call(this,t);const e=(s=this.params)==null?void 0:s.playerName,i=localStorage.getItem("playerName");e?this._playerName=e:i?this._playerName=i:this._playerName="Player",this.subscribe("player-name",r=>{this._playerName=r,localStorage.setItem("playerName",r)}),this.subscribe("game-level",r=>{this.level=r,this._isPlaying&&(this._stopLoop(),this._startLoop())})}disconnectedCallback(){this.unsubscribe("player-name"),this.unsubscribe("game-level"),super.disconnectedCallback()}_handleMoleHit(t){var e;if(this._isPlaying&&((e=t.detail)!=null&&e.active)){const{points:i}=y(this.level);this._score+=i}}_clearTimer(){this._timerId&&(clearInterval(this._timerId),this._timerId=null)}_saveHighScore(){$(this._playerName,this._score)}_controllerGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._score=0,this._timeLeft=60,this._clearTimer(),this._startLoop(),this._startTimer()):(this._saveHighScore(),this._stopLoop(),this._clearTimer())}_startLoop(){const e=y(this.level).interval,i=e-100;this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const a=x();this._activeMoles=A(a),setTimeout(()=>{this._isPlaying&&(this._activeMoles=new Array(9).fill(!1))},i)},e)}_stopLoop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._activeMoles=[]}_startTimer(){this._clearTimer(),this._timerId=window.setInterval(()=>{this._timeLeft--,this._timeLeft<=0&&(this._isPlaying=!1,this._stopLoop(),this._saveHighScore(),this._clearTimer()),this.requestUpdate()},1e3)}_goBack(){this._isPlaying=!1,this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._score=0,this._activeMoles=new Array(l*l).fill(!1),this.navigate("home")}render(){return p`
      <page-layout>
        <div class="game-container">
          <game-button variant="back" @game-click=${this._goBack}>
            <svg
              slot="icon"
              fill="#ffff"
              width="800px"
              height="800px"
              viewBox="0 0 52 52"
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
            size=${l}
            .activeMoles=${this._activeMoles}
            @mole-hit=${this._handleMoleHit}
          ></mole-table>
          <game-button
            text="${this._isPlaying?"Parar partida":"Empezar partida"}"
            @game-click=${this._controllerGame}
          ></game-button>
        </div>
      </page-layout>
    `}};c([h()],n.prototype,"_playerName",2);c([h()],n.prototype,"_score",2);c([h()],n.prototype,"_isPlaying",2);c([h()],n.prototype,"_activeMoles",2);c([h()],n.prototype,"_intervalId",2);c([h()],n.prototype,"level",2);c([h()],n.prototype,"_timeLeft",2);n=c([f("game-page")],n);export{n as GamePage};
