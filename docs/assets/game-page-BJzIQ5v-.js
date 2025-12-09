import{i as P,n as v,a as f,x as p,t as g,D as T,T as $,r as c}from"./index-C6D7TcyR.js";import{P as I}from"./game-button-Cvju09-w.js";import{P as L}from"./PageTransitionsMixin-C3JExxZE.js";import{s as O}from"./score-config.config-DB4tY8vk.js";const N=P`
  :host {
    display: block;
    width: fit-content;
    margin: 2rem auto;
  }

  .grid {
    display: grid;
    gap: 0.5rem;
  }
`,E=P`
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
`,x="/moleApp/assets/mole-B35n0To2.png";var S=Object.defineProperty,A=Object.getOwnPropertyDescriptor,w=(e,t,s,a)=>{for(var i=a>1?void 0:a?A(t,s):t,o=e.length-1,l;o>=0;o--)(l=e[o])&&(i=(a?l(t,s,i):l(i))||i);return a&&i&&S(t,s,i),i};let d=class extends f{constructor(){super(...arguments),this.active=!1,this.hitSound=new Audio("/moleApp/sounds/hitmole.mp3")}_onClick(){var e;this.active&&((e=navigator.vibrate)==null||e.call(navigator,80),this.hitSound.currentTime=0,this.hitSound.play()),this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return p`
      <button @click=${this._onClick}>
        ${this.active?p`
              <img class="mole-img" src="${x}" alt="Mole" />
            `:""}
      </button>
    `}};d.styles=E;w([v({type:Boolean})],d.prototype,"active",2);d=w([g("mole-button")],d);const u={Low:{interval:1e3,points:10},Medium:{interval:750,points:20},High:{interval:500,points:30}},r=3;function b(e){return e&&u[e]?u[e]:u.Low}function M(){const e=r*r;return Math.floor(Math.random()*e)}function C(e){const t=r*r,s=new Array(t).fill(!1);return e.forEach(a=>{a>=0&&a<t&&(s[a]=!0)}),s}var H=Object.defineProperty,j=Object.getOwnPropertyDescriptor,y=(e,t,s,a)=>{for(var i=a>1?void 0:a?j(t,s):t,o=e.length-1,l;o>=0;o--)(l=e[o])&&(i=(a?l(t,s,i):l(i))||i);return a&&i&&H(t,s,i),i};let _=class extends f{constructor(){super(...arguments),this.size=r,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(e,t){var s;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:e,active:(s=t.detail)==null?void 0:s.active},bubbles:!0,composed:!0}))}render(){return p`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...new Array(this._totalCells).keys()].map(e=>{var s;const t=((s=this.activeMoles)==null?void 0:s[e])??!1;return p`
            <mole-button
              .active=${t}
              @mole-hit=${a=>this._onMoleHit(e,a)}
            ></mole-button>
          `})}
      </div>
    `}};_.styles=N;y([v({type:Number})],_.prototype,"size",2);y([v({type:Array})],_.prototype,"activeMoles",2);_=y([g("mole-table")],_);var m=(e=>(e[e.ONE=1]="ONE",e[e.TWO=2]="TWO",e))(m||{}),z=Object.defineProperty,D=Object.getOwnPropertyDescriptor,h=(e,t,s,a)=>{for(var i=a>1?void 0:a?D(t,s):t,o=e.length-1,l;o>=0;o--)(l=e[o])&&(i=(a?l(t,s,i):l(i))||i);return a&&i&&z(t,s,i),i};let n=class extends L(I(f)){constructor(){super(...arguments),this._playerName="",this._score=0,this._isPlaying=!1,this._activeMoles=new Array(r*r).fill(!1),this._intervalId=null,this.level=T.LOW,this._timeLeft=$.SHORT,this._selectedTime="30",this._molesMode=m.ONE,this._timerId=null,this.onTimeChange=e=>{const t=Number(e.detail.value);this._selectedTime=t.toString(),this._clearGame(),this._timeLeft=t}}firstUpdated(e){var a,i;(a=super.firstUpdated)==null||a.call(this,e);const t=(i=this.params)==null?void 0:i.playerName,s=localStorage.getItem("playerName");t?this._playerName=t:s?this._playerName=s:this._playerName="Player",this.subscribe("player-name",o=>{this._playerName=o,localStorage.setItem("playerName",o)}),this.subscribe("game-level",o=>{this.level=o,this._isPlaying&&(this._stopLoop(),this._startLoop())})}disconnectedCallback(){this.unsubscribe("player-name"),this.unsubscribe("game-level"),super.disconnectedCallback()}_handleMoleHit(e){var t;if(this._isPlaying&&((t=e.detail)!=null&&t.active)){const{points:s}=b(this.level);this._score+=s}}_clearTimer(){this._timerId&&(clearInterval(this._timerId),this._timerId=null)}_controlMolesMode(){this._molesMode=this._molesMode===m.ONE?m.TWO:m.ONE}_saveHighScore(){O(this._playerName,this._score)}_controllerGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._startLoop(),this._startTimer()):(this._stopLoop(),this._clearTimer())}_startLoop(){const t=b(this.level).interval,s=Math.max(0,t-100);this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const a=M();let i=[a];if(this._molesMode===m.TWO){let o;do o=M();while(o===a);i.push(o)}this._activeMoles=C(i),setTimeout(()=>{this._isPlaying&&(this._activeMoles=new Array(r*r).fill(!1))},s)},t)}_stopLoop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._activeMoles=[]}_startTimer(){this._clearTimer(),this._timerId=window.setInterval(()=>{this._timeLeft--,this._timeLeft<=0&&(this._isPlaying=!1,this._stopLoop(),this._saveHighScore(),this._clearTimer(),this._timeLeft=30,this._score=0),this.requestUpdate()},1e3)}_clearGame(){this._isPlaying=!1,this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._timerId&&(clearInterval(this._timerId),this._timerId=null),this._score=0,this._timeLeft=30,this._activeMoles=new Array(r*r).fill(!1),this._molesMode=m.ONE}_goBack(){this._clearGame(),this._selectedTime=this._timeLeft.toString(),this.navigate("home")}render(){return p`
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
        <h2>Puntuación: ${this._score}</h2>

        <div>
          <span>Seleccione tiempo:</span>
          <game-select
            type="time"
            .value=${this._selectedTime}
            .options=${["30","60","90"]}
            @time-change=${this.onTimeChange}
          ></game-select>
        </div>
        <h4>Tiempo Restante: ${this._timeLeft}s</h4>
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
    `}};h([c()],n.prototype,"_playerName",2);h([c()],n.prototype,"_score",2);h([c()],n.prototype,"_isPlaying",2);h([c()],n.prototype,"_activeMoles",2);h([c()],n.prototype,"_intervalId",2);h([c()],n.prototype,"level",2);h([c()],n.prototype,"_timeLeft",2);h([c()],n.prototype,"_selectedTime",2);h([c()],n.prototype,"_molesMode",2);n=h([g("game-page")],n);export{n as GamePage};
