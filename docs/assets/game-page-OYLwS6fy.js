import{i as b,n as u,a as _,x as p,t as g,D as P,r as h}from"./index-DAi4Xyat.js";import{P as w}from"./game-button-C2l3PFRC.js";import{P as $}from"./PageTransitionsMixin-C3JExxZE.js";import{s as L}from"./score-config.config-DB4tY8vk.js";const x=b`
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
`,I=b`
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
`,O="/moleApp/assets/TopoMontySMP-5dMTKVNB.png";var N=Object.defineProperty,A=Object.getOwnPropertyDescriptor,M=(t,e,i,a)=>{for(var s=a>1?void 0:a?A(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(s=(a?r(e,i,s):r(s))||s);return a&&s&&N(e,i,s),s};let v=class extends _{constructor(){super(...arguments),this.active=!1,this.hitSound=new Audio("/moleApp/sounds/hitmole.mp3")}_onClick(){var t;this.active&&((t=navigator.vibrate)==null||t.call(navigator,80),this.hitSound.currentTime=0,this.hitSound.play()),this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return p`
      <button @click=${this._onClick}>
        ${this.active?p`<img class="mole-img" src="${O}" alt="Mole" />`:""}
      </button>
    `}};v.styles=I;M([u({type:Boolean})],v.prototype,"active",2);v=M([g("mole-button")],v);const f={Low:{interval:1e3,points:10},Medium:{interval:750,points:20},High:{interval:500,points:30}},l=3;function y(t){return f[t]||f.Low}function S(){const t=l*l;return Math.floor(Math.random()*t)}function C(t){const e=l*l,i=new Array(e).fill(!1);return i[t]=!0,i}var E=Object.defineProperty,H=Object.getOwnPropertyDescriptor,d=(t,e,i,a)=>{for(var s=a>1?void 0:a?H(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(s=(a?r(e,i,s):r(s))||s);return a&&s&&E(e,i,s),s};let m=class extends _{constructor(){super(...arguments),this.size=l,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(t,e){var i;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:t,active:(i=e.detail)==null?void 0:i.active},bubbles:!0,composed:!0}))}render(){return p`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...new Array(this._totalCells).keys()].map(t=>{var i;const e=((i=this.activeMoles)==null?void 0:i[t])??!1;return p`
            <mole-button
              .active=${e}
              @mole-hit=${a=>this._onMoleHit(t,a)}
            ></mole-button>
          `})}
      </div>
    `}};m.styles=x;d([u({type:Number})],m.prototype,"size",2);d([u({type:Array})],m.prototype,"activeMoles",2);m=d([g("mole-table")],m);var j=Object.defineProperty,z=Object.getOwnPropertyDescriptor,c=(t,e,i,a)=>{for(var s=a>1?void 0:a?z(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(s=(a?r(e,i,s):r(s))||s);return a&&s&&j(e,i,s),s};let n=class extends $(w(_)){constructor(){super(...arguments),this._playerName="",this._score=0,this._isPlaying=!1,this._activeMoles=new Array(l*l).fill(!1),this._intervalId=null,this.level=P.LOW}firstUpdated(t){var a,s;(a=super.firstUpdated)==null||a.call(this,t);const e=(s=this.params)==null?void 0:s.playerName,i=localStorage.getItem("playerName");e?this._playerName=e:i?this._playerName=i:this._playerName="Player",this.subscribe("player-name",o=>{this._playerName=o,localStorage.setItem("playerName",o)}),this.subscribe("game-level",o=>{this.level=o,this._isPlaying&&(this._stopLoop(),this._startLoop())})}disconnectedCallback(){this.unsubscribe("player-name"),this.unsubscribe("game-level"),super.disconnectedCallback()}_handleMoleHit(t){var e;if(this._isPlaying&&((e=t.detail)!=null&&e.active)){const{points:i}=y(this.level);this._score+=i}}_saveHighScore(){L(this._playerName,this._score)}_toggleGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._score=0,this._startLoop()):(this._saveHighScore(),this._stopLoop())}_startLoop(){const e=y(this.level).interval,i=e-100;this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const a=S();this._activeMoles=C(a),setTimeout(()=>{this._isPlaying&&(this._activeMoles=new Array(9).fill(!1))},i)},e)}_stopLoop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._activeMoles=[]}_goBack(){this._isPlaying=!1,this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._score=0,this._activeMoles=new Array(l*l).fill(!1),this.navigate("home")}render(){return p`
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
