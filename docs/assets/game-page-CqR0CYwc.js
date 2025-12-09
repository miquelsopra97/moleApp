import{i as I,n as f,a as g,x as p,t as y,D as _,T as M,r as c}from"./index-CvD2QKtG.js";import{P as w}from"./game-button-B_Pf1vqO.js";import{P as L}from"./PageTransitionsMixin-C3JExxZE.js";import{s as $}from"./score-config.config-D_er6gHQ.js";const N=I`
  :host {
    display: block;
    width: fit-content;
    margin: 2rem auto;
  }

  .grid {
    display: grid;
    gap: 0.5rem;
  }
`,E=I`
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
`,x="/moleApp/assets/mole-B35n0To2.png";var S=Object.defineProperty,A=Object.getOwnPropertyDescriptor,O=(e,t,s,r)=>{for(var i=r>1?void 0:r?A(t,s):t,a=e.length-1,l;a>=0;a--)(l=e[a])&&(i=(r?l(t,s,i):l(i))||i);return r&&i&&S(t,s,i),i};let d=class extends g{constructor(){super(...arguments),this.active=!1,this.hitSound=new Audio("/moleApp/sounds/hitmole.mp3")}_onClick(){var e;this.active&&((e=navigator.vibrate)==null||e.call(navigator,80),this.hitSound.currentTime=0,this.hitSound.play()),this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return p`
      <button @click=${this._onClick}>
        ${this.active?p`
              <img class="mole-img" src="${x}" alt="Mole" />
            `:""}
      </button>
    `}};d.styles=E;O([f({type:Boolean})],d.prototype,"active",2);d=O([y("mole-button")],d);const v={[_.LOW]:{interval:1e3,points:10},[_.MEDIUM]:{interval:750,points:20},[_.HIGH]:{interval:500,points:30}},o=3;function P(e){return e&&v[e]?v[e]:v[_.LOW]}function T(){const e=o*o;return Math.floor(Math.random()*e)}function H(e){const t=o*o,s=new Array(t).fill(!1);return e.forEach(r=>{r>=0&&r<t&&(s[r]=!0)}),s}var C=Object.defineProperty,D=Object.getOwnPropertyDescriptor,b=(e,t,s,r)=>{for(var i=r>1?void 0:r?D(t,s):t,a=e.length-1,l;a>=0;a--)(l=e[a])&&(i=(r?l(t,s,i):l(i))||i);return r&&i&&C(t,s,i),i};let u=class extends g{constructor(){super(...arguments),this.size=o,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(e,t){var s;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:e,active:(s=t.detail)==null?void 0:s.active},bubbles:!0,composed:!0}))}render(){return p`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...new Array(this._totalCells).keys()].map(e=>{var s;const t=((s=this.activeMoles)==null?void 0:s[e])??!1;return p`
            <mole-button
              .active=${t}
              @mole-hit=${r=>this._onMoleHit(e,r)}
            ></mole-button>
          `})}
      </div>
    `}};u.styles=N;b([f({type:Number})],u.prototype,"size",2);b([f({type:Array})],u.prototype,"activeMoles",2);u=b([y("mole-table")],u);var m=(e=>(e[e.ONE=1]="ONE",e[e.TWO=2]="TWO",e))(m||{}),j=Object.defineProperty,z=Object.getOwnPropertyDescriptor,h=(e,t,s,r)=>{for(var i=r>1?void 0:r?z(t,s):t,a=e.length-1,l;a>=0;a--)(l=e[a])&&(i=(r?l(t,s,i):l(i))||i);return r&&i&&j(t,s,i),i};let n=class extends L(w(g)){constructor(){super(...arguments),this._playerName="",this._score=0,this._isPlaying=!1,this._activeMoles=new Array(o*o).fill(!1),this._intervalId=null,this.level=_.LOW,this._timeLeft=M.SHORT,this._selectedTime=String(M.SHORT),this._molesMode=m.ONE,this._timerId=null}firstUpdated(e){var r,i;(r=super.firstUpdated)==null||r.call(this,e);const t=(i=this.params)==null?void 0:i.playerName,s=localStorage.getItem("playerName");t?this._playerName=t:s?this._playerName=s:this._playerName="Player",this.subscribe("player-name",a=>{this._playerName=a,localStorage.setItem("playerName",a)}),this.subscribe("game-level",a=>{this.level=a,this._isPlaying&&(this._stopLoop(),this._startLoop())}),this.subscribe("game-time",a=>{this._selectedTime=a,this._timeLeft=Number(a),this._clearGame()})}disconnectedCallback(){this.unsubscribe("player-name"),this.unsubscribe("game-level"),this.unsubscribe("game-time"),super.disconnectedCallback()}_handleMoleHit(e){var t;if(this._isPlaying&&((t=e.detail)!=null&&t.active)){const{points:s}=P(this.level);this._score+=s}}_clearTimer(){this._timerId&&(clearInterval(this._timerId),this._timerId=null)}_controlMolesMode(){this._molesMode=this._molesMode===m.ONE?m.TWO:m.ONE}_saveHighScore(){$(this._playerName,this._score,this._selectedTime)}_controllerGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._startLoop(),this._startTimer()):(this._stopLoop(),this._clearTimer())}_startLoop(){const t=P(this.level).interval,s=Math.max(0,t-100);this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const r=T();let i=[r];if(this._molesMode===m.TWO){let a;do a=T();while(a===r);i.push(a)}this._activeMoles=H(i),setTimeout(()=>{this._isPlaying&&(this._activeMoles=new Array(o*o).fill(!1))},s)},t)}_stopLoop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._activeMoles=[]}_startTimer(){this._clearTimer(),this._timerId=window.setInterval(()=>{this._timeLeft--,this._timeLeft<=0&&(this._isPlaying=!1,this._stopLoop(),this._saveHighScore(),this._clearTimer(),this._timeLeft=Number(this._selectedTime),this._score=0),this.requestUpdate()},1e3)}_clearGame(){this._isPlaying=!1,this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._timerId&&(clearInterval(this._timerId),this._timerId=null),this._score=0,this._timeLeft=Number(this._selectedTime),this._activeMoles=new Array(o*o).fill(!1),this._molesMode=m.ONE}_goBack(){this._clearGame(),this._selectedTime=this._timeLeft.toString(),this.navigate("home")}render(){return p`
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
        <h4>Tiempo Restante: ${this._timeLeft}s</h4>
        <mole-table
          size=${o}
          .activeMoles=${this._activeMoles}
          @mole-hit=${this._handleMoleHit}
        ></mole-table>
        <game-button
          style="padding-bottom: 0.5rem"
          text="${this._molesMode===m.ONE?"1 Topo":"2 Topos"}"
          @game-click=${this._controlMolesMode}
        ></game-button>
        <game-button
          text="${this._isPlaying?"Parar partida":"Empezar partida"}"
          @game-click=${this._controllerGame}
        ></game-button>
      </page-layout>
    `}};h([c()],n.prototype,"_playerName",2);h([c()],n.prototype,"_score",2);h([c()],n.prototype,"_isPlaying",2);h([c()],n.prototype,"_activeMoles",2);h([c()],n.prototype,"_intervalId",2);h([c()],n.prototype,"level",2);h([c()],n.prototype,"_timeLeft",2);h([c()],n.prototype,"_selectedTime",2);h([c()],n.prototype,"_molesMode",2);n=h([y("game-page")],n);export{n as GamePage};
