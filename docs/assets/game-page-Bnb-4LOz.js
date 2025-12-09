import{i as P,n as d,a as f,x as p,t as g,D as $,r as c}from"./index-C15ahnLg.js";import{P as O}from"./game-button-BzgRu70j.js";import{P as I}from"./PageTransitionsMixin-C3JExxZE.js";import{s as L}from"./score-config.config-DB4tY8vk.js";const N=P`
  :host {
    display: block;
    width: fit-content;
    margin: 2rem auto;
  }

  .grid {
    display: grid;
    gap: 0.5rem;
  }
`,x=P`
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
`,E="/moleApp/assets/mole-B35n0To2.png";var T=Object.defineProperty,A=Object.getOwnPropertyDescriptor,w=(t,e,s,o)=>{for(var i=o>1?void 0:o?A(e,s):e,a=t.length-1,l;a>=0;a--)(l=t[a])&&(i=(o?l(e,s,i):l(i))||i);return o&&i&&T(e,s,i),i};let u=class extends f{constructor(){super(...arguments),this.active=!1,this.hitSound=new Audio("/moleApp/sounds/hitmole.mp3")}_onClick(){var t;this.active&&((t=navigator.vibrate)==null||t.call(navigator,80),this.hitSound.currentTime=0,this.hitSound.play()),this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return p`
      <button @click=${this._onClick}>
        ${this.active?p`
              <img class="mole-img" src="${E}" alt="Mole" />
            `:""}
      </button>
    `}};u.styles=x;w([d({type:Boolean})],u.prototype,"active",2);u=w([g("mole-button")],u);const v={Low:{interval:1e3,points:10},Medium:{interval:750,points:20},High:{interval:500,points:30}},r=3;function b(t){return t&&v[t]?v[t]:v.Low}function M(){const t=r*r;return Math.floor(Math.random()*t)}function S(t){const e=r*r,s=new Array(e).fill(!1);return t.forEach(o=>{o>=0&&o<e&&(s[o]=!0)}),s}var C=Object.defineProperty,H=Object.getOwnPropertyDescriptor,y=(t,e,s,o)=>{for(var i=o>1?void 0:o?H(e,s):e,a=t.length-1,l;a>=0;a--)(l=t[a])&&(i=(o?l(e,s,i):l(i))||i);return o&&i&&C(e,s,i),i};let _=class extends f{constructor(){super(...arguments),this.size=r,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(t,e){var s;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:t,active:(s=e.detail)==null?void 0:s.active},bubbles:!0,composed:!0}))}render(){return p`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...new Array(this._totalCells).keys()].map(t=>{var s;const e=((s=this.activeMoles)==null?void 0:s[t])??!1;return p`
            <mole-button
              .active=${e}
              @mole-hit=${o=>this._onMoleHit(t,o)}
            ></mole-button>
          `})}
      </div>
    `}};_.styles=N;y([d({type:Number})],_.prototype,"size",2);y([d({type:Array})],_.prototype,"activeMoles",2);_=y([g("mole-table")],_);var m=(t=>(t[t.ONE=1]="ONE",t[t.TWO=2]="TWO",t))(m||{}),j=Object.defineProperty,z=Object.getOwnPropertyDescriptor,h=(t,e,s,o)=>{for(var i=o>1?void 0:o?z(e,s):e,a=t.length-1,l;a>=0;a--)(l=t[a])&&(i=(o?l(e,s,i):l(i))||i);return o&&i&&j(e,s,i),i};let n=class extends I(O(f)){constructor(){super(...arguments),this._playerName="",this._score=0,this._isPlaying=!1,this._activeMoles=new Array(r*r).fill(!1),this._intervalId=null,this.level=$.LOW,this._timeLeft=30,this._molesMode=m.ONE,this._timerId=null}firstUpdated(t){var o,i;(o=super.firstUpdated)==null||o.call(this,t);const e=(i=this.params)==null?void 0:i.playerName,s=localStorage.getItem("playerName");e?this._playerName=e:s?this._playerName=s:this._playerName="Player",this.subscribe("player-name",a=>{this._playerName=a,localStorage.setItem("playerName",a)}),this.subscribe("game-level",a=>{this.level=a,this._isPlaying&&(this._stopLoop(),this._startLoop())})}disconnectedCallback(){this.unsubscribe("player-name"),this.unsubscribe("game-level"),super.disconnectedCallback()}_handleMoleHit(t){var e;if(this._isPlaying&&((e=t.detail)!=null&&e.active)){const{points:s}=b(this.level);this._score+=s}}_clearTimer(){this._timerId&&(clearInterval(this._timerId),this._timerId=null)}_controlMolesMode(){this._molesMode=this._molesMode===m.ONE?m.TWO:m.ONE}_saveHighScore(){L(this._playerName,this._score)}_controllerGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._startLoop(),this._startTimer()):(this._stopLoop(),this._clearTimer())}_startLoop(){const e=b(this.level).interval,s=Math.max(0,e-100);this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const o=M();let i=[o];if(this._molesMode===m.TWO){let a;do a=M();while(a===o);i.push(a)}this._activeMoles=S(i),setTimeout(()=>{this._isPlaying&&(this._activeMoles=new Array(r*r).fill(!1))},s)},e)}_stopLoop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._activeMoles=[]}_startTimer(){this._clearTimer(),this._timerId=window.setInterval(()=>{this._timeLeft--,this._timeLeft<=0&&(this._isPlaying=!1,this._stopLoop(),this._saveHighScore(),this._clearTimer()),this.requestUpdate()},1e3)}_goBack(){this._isPlaying=!1,this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._score=0,this._activeMoles=new Array(r*r).fill(!1),this.navigate("home")}render(){return p`
      <page-layout>
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
          size=${r}
          .activeMoles=${this._activeMoles}
          @mole-hit=${this._handleMoleHit}
        ></mole-table>
        <game-button
          style="padding-bottom: 0.5rem"
          text="${this._molesMode===m.ONE?"Modo: 1 topo":"Modo: 2 topos"}"
          @game-click=${this._controlMolesMode}
        ></game-button>
        <game-button
          text="${this._isPlaying?"Parar partida":"Empezar partida"}"
          @game-click=${this._controllerGame}
        ></game-button>
      </page-layout>
    `}};h([c()],n.prototype,"_playerName",2);h([c()],n.prototype,"_score",2);h([c()],n.prototype,"_isPlaying",2);h([c()],n.prototype,"_activeMoles",2);h([c()],n.prototype,"_intervalId",2);h([c()],n.prototype,"level",2);h([c()],n.prototype,"_timeLeft",2);h([c()],n.prototype,"_molesMode",2);n=h([g("game-page")],n);export{n as GamePage};
