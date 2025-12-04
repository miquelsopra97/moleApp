import{i as b,n as _,a as u,x as h,t as g,r as p}from"./index-Dvlkh0a8.js";import{P}from"./game-button-B5pq8RCy.js";import{P as w}from"./page-layout-BlD1Vp_p.js";import{s as $}from"./score-config.config-DB4tY8vk.js";const x=b`
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
`,L="/moleApp/assets/TopoMontySMP-5dMTKVNB.png";var N=Object.defineProperty,O=Object.getOwnPropertyDescriptor,M=(i,e,t,a)=>{for(var s=a>1?void 0:a?O(e,t):e,r=i.length-1,o;r>=0;r--)(o=i[r])&&(s=(a?o(e,t,s):o(s))||s);return a&&s&&N(e,t,s),s};let v=class extends u{constructor(){super(...arguments),this.active=!1}_onClick(){this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return h`
      <button @click=${this._onClick}>
        ${this.active?h`<img class='mole-img' src="${L}" alt="Mole" />`:""}
      </button>
    `}};v.styles=I;M([_({type:Boolean})],v.prototype,"active",2);v=M([g("mole-button")],v);const f={Low:{interval:1e3,points:10},Medium:{interval:750,points:20},High:{interval:500,points:30}},l=3;function y(i){return f[i]||f.Low}function A(){const i=l*l;return Math.floor(Math.random()*i)}function C(i){const e=l*l,t=new Array(e).fill(!1);return t[i]=!0,t}var E=Object.defineProperty,H=Object.getOwnPropertyDescriptor,d=(i,e,t,a)=>{for(var s=a>1?void 0:a?H(e,t):e,r=i.length-1,o;r>=0;r--)(o=i[r])&&(s=(a?o(e,t,s):o(s))||s);return a&&s&&E(e,t,s),s};let m=class extends u{constructor(){super(...arguments),this.size=l,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(i,e){var t;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:i,active:(t=e.detail)==null?void 0:t.active},bubbles:!0,composed:!0}))}render(){return h`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...Array(this._totalCells).keys()].map(i=>{var t;const e=((t=this.activeMoles)==null?void 0:t[i])??!1;return h`
            <mole-button
              .active=${e}
              @mole-hit=${a=>this._onMoleHit(i,a)}
            ></mole-button>
          `})}
      </div>
    `}};m.styles=x;d([_({type:Number})],m.prototype,"size",2);d([_({type:Array})],m.prototype,"activeMoles",2);m=d([g("mole-table")],m);var S=Object.defineProperty,j=Object.getOwnPropertyDescriptor,c=(i,e,t,a)=>{for(var s=a>1?void 0:a?j(e,t):e,r=i.length-1,o;r>=0;r--)(o=i[r])&&(s=(a?o(e,t,s):o(s))||s);return a&&s&&S(e,t,s),s};let n=class extends w(P(u)){constructor(){super(...arguments),this._playerName="",this._score=0,this._isPlaying=!1,this._activeMoles=Array(l*l).fill(!1),this._intervalId=null,this.level="High"}firstUpdated(i){var a,s;(a=super.firstUpdated)==null||a.call(this,i);const e=(s=this.params)==null?void 0:s.playerName,t=localStorage.getItem("playerName");e?this._playerName=e:t?this._playerName=t:this._playerName="Player",this.subscribe("player-name",r=>{this._playerName=r,localStorage.setItem("playerName",r)}),this.subscribe("game-level",r=>{this.level=r,this._isPlaying&&(this._stopLoop(),this._startLoop())})}disconnectedCallback(){this.unsubscribe("player-name"),this.unsubscribe("game-level"),super.disconnectedCallback()}_handleMoleHit(i){var e;if(this._isPlaying&&((e=i.detail)!=null&&e.active)){const{points:t}=y(this.level);this._score+=t}}_saveHighScore(){$(this._playerName,this._score)}_toggleGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._score=0,this._startLoop()):(this._saveHighScore(),this._stopLoop())}_startLoop(){const e=y(this.level).interval,t=e-100;this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const a=A();this._activeMoles=C(a),setTimeout(()=>{this._isPlaying&&(this._activeMoles=Array(9).fill(!1))},t)},e)}_stopLoop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._activeMoles=[]}_goBack(){this._isPlaying=!1,this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._score=0,this._activeMoles=Array(l*l).fill(!1),this.navigate("home")}render(){return h`
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
    `}};c([p()],n.prototype,"_playerName",2);c([p()],n.prototype,"_score",2);c([p()],n.prototype,"_isPlaying",2);c([p()],n.prototype,"_activeMoles",2);c([p()],n.prototype,"_intervalId",2);c([p()],n.prototype,"level",2);n=c([g("game-page")],n);export{n as GamePage};
