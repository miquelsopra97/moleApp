import{i as O,n as m,a as y,x as v,t as b,r as p}from"./index-CHk-AC9J.js";import{P as S}from"./game-button-6JjFM17g.js";import{P as I}from"./ElementController-DkYO4R2Y.js";import{s as H}from"./score-config.config-D_er6gHQ.js";const C=O`
  :host {
    display: block;
    width: fit-content;
    margin: 2rem auto;
  }

  .grid {
    display: grid;
    gap: 0.5rem;
  }
`,z=O`
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
`,D="/moleApp/assets/mole-B35n0To2.png";var j=Object.defineProperty,A=Object.getOwnPropertyDescriptor,N=(e,t,i,r)=>{for(var s=r>1?void 0:r?A(t,i):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&j(t,i,s),s};let $=class extends y{constructor(){super(...arguments),this.active=!1,this.hitSound=new Audio("/moleApp/sounds/hitmole.mp3")}_onClick(){var e;this.active&&((e=navigator.vibrate)==null||e.call(navigator,80),this.hitSound.currentTime=0,this.hitSound.play()),this.dispatchEvent(new CustomEvent("mole-hit",{detail:{active:this.active},bubbles:!0,composed:!0}))}render(){return v`
      <button @click=${this._onClick}>
        ${this.active?v`
              <img class="mole-img" src="${D}" alt="Mole" />
            `:void 0}
      </button>
    `}};$.styles=z;N([m({type:Boolean})],$.prototype,"active",2);$=N([b("mole-button")],$);var h=(e=>(e.LOW="Fácil",e.MEDIUM="Medio",e.HIGH="Difícil",e))(h||{}),d=(e=>(e[e.SHORT=30]="SHORT",e[e.MEDIUM=60]="MEDIUM",e[e.LONG=90]="LONG",e))(d||{}),L=(e=>(e.LEVEL="level",e.TIME="time",e))(L||{});const w={[h.LOW]:{interval:1e3,points:10},[h.MEDIUM]:{interval:750,points:20},[h.HIGH]:{interval:500,points:30}},l=3;function T(e){return e&&w[e]?w[e]:w[h.LOW]}function x(){const e=l*l;return Math.floor(Math.random()*e)}function G(e){const t=l*l,i=new Array(t).fill(!1);return e.forEach(r=>{r>=0&&r<t&&(i[r]=!0)}),i}var W=Object.defineProperty,R=Object.getOwnPropertyDescriptor,E=(e,t,i,r)=>{for(var s=r>1?void 0:r?R(t,i):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&W(t,i,s),s};let f=class extends y{constructor(){super(...arguments),this.size=l,this.activeMoles=[]}get _totalCells(){return this.size*this.size}_onMoleHit(e,t){var i;this.dispatchEvent(new CustomEvent("mole-hit",{detail:{index:e,active:(i=t.detail)==null?void 0:i.active},bubbles:!0,composed:!0}))}render(){return v`
      <div class="grid" style="grid-template-columns: repeat(${this.size}, 1fr);">
        ${[...new Array(this._totalCells).keys()].map(e=>{var i;const t=((i=this.activeMoles)==null?void 0:i[e])??!1;return v`
            <mole-button
              .active=${t}
              @mole-hit=${r=>this._onMoleHit(e,r)}
            ></mole-button>
          `})}
      </div>
    `}};f.styles=C;E([m({type:Number})],f.prototype,"size",2);E([m({type:Array})],f.prototype,"activeMoles",2);f=E([b("mole-table")],f);const U=O`
  :host {
    display: block;
    --header-bg: #7a5f3e;
    --header-text: #ffffff;
    --header-subtext: #f5e7d4;
  }

  header.header {
    height: 3.5rem;
    background-color: var(--header-bg);
    color: var(--header-text);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    box-sizing: border-box;
    position: relative;
    z-index: 4;
  }

  .header__left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #f0e0c5;
    color: #5a4025;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.95rem;
    flex-shrink: 0;
  }

  .player {
    font-size: 1rem;
    font-weight: 600;
  }

  .header__right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.9rem;
    color: var(--header-subtext);
  }

  .label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.8rem;
  }
`,B=O`
  :host {
    display: inline-block;
    pointer-events: auto;
  }

  select {
    pointer-events: auto;
    background: transparent;
    border: none;
    border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.6);
    color: white;
    font-size: 0.9rem;
    padding: 0.125rem 0.25rem;
    outline: none;
    cursor: pointer;
  }

  option {
    background: #f5e7d4;
    color: #3a2818;
  }
`;var V=Object.defineProperty,k=Object.getOwnPropertyDescriptor,M=(e,t,i,r)=>{for(var s=r>1?void 0:r?k(t,i):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&V(t,i,s),s};let u=class extends y{constructor(){super(...arguments),this.type=L.LEVEL,this.value="",this.options=[],this._onChange=e=>{const t=e.target.value;this.value=t;const i=this.type===L.LEVEL?"level-change":"time-change";this.dispatchEvent(new CustomEvent(i,{detail:{value:t},bubbles:!0,composed:!0}))}}render(){return v`
      <select .value=${this.value} @change=${this._onChange}>
        ${this.options.map(e=>v`
            <option value="${e}">${e}</option>
          `)}
      </select>
    `}};u.styles=B;M([m({type:String})],u.prototype,"type",2);M([m({type:String})],u.prototype,"value",2);M([m({type:Array})],u.prototype,"options",2);u=M([b("game-select")],u);var Z=Object.defineProperty,F=Object.getOwnPropertyDescriptor,P=(e,t,i,r)=>{for(var s=r>1?void 0:r?F(t,i):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&Z(t,i,s),s};let g=class extends y{constructor(){super(...arguments),this.playerName="Player",this.level=h.LOW,this.time=String(d.SHORT)}get _initial(){return(this.playerName||"P")[0].toUpperCase()}_onLevel(e){const t=e.detail.value;this.level=t,this.dispatchEvent(new CustomEvent("header-level",{detail:{value:t},bubbles:!0,composed:!0}))}_onTime(e){const t=e.detail.value;this.time=t,this.dispatchEvent(new CustomEvent("header-time",{detail:{value:t},bubbles:!0,composed:!0}))}render(){return v`
      <header class="header">
        <div class="header__left">
          <div class="avatar">${this._initial}</div>
          <span class="player">${this.playerName}</span>
        </div>

        <div class="header__right">
          <span class="label">Nivel</span>

          <game-select
            .value=${this.level}
            .options=${[h.LOW,h.MEDIUM,h.HIGH]}
            @level-change=${this._onLevel}
          ></game-select>

          <span class="label" style="margin-left:1rem;">Tiempo</span>

          <game-select
            type="time"
            .value=${this.time}
            .options=${[String(d.SHORT),String(d.MEDIUM),String(d.LONG)]}
            @time-change=${this._onTime}
          ></game-select>
        </div>
      </header>
    `}};g.styles=U;P([m({type:String})],g.prototype,"playerName",2);P([m({type:String})],g.prototype,"level",2);P([m({type:String})],g.prototype,"time",2);g=P([b("game-header")],g);var _=(e=>(e[e.ONE=1]="ONE",e[e.TWO=2]="TWO",e))(_||{}),q=Object.defineProperty,J=Object.getOwnPropertyDescriptor,c=(e,t,i,r)=>{for(var s=r>1?void 0:r?J(t,i):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(s=(r?o(t,i,s):o(s))||s);return r&&s&&q(t,i,s),s};let n=class extends I(S(y)){constructor(){super(...arguments),this._playerName="",this._level=h.LOW,this._time=String(d.SHORT),this._score=0,this._isPlaying=!1,this._activeMoles=new Array(l*l).fill(!1),this._molesMode=_.ONE,this._selectedTime=String(d.SHORT),this._timeLeft=d.SHORT,this._intervalId=null,this._timerId=null}firstUpdated(){var i;const e=(i=this.params)==null?void 0:i.playerName,t=localStorage.getItem("playerName");this._playerName=e||t||"Player",this._selectedTime=this._time,this._timeLeft=Number(this._time)}connectedCallback(){super.connectedCallback(),this.subscribe("player-name",e=>{this._playerName=e})}disconnectedCallback(){this.unsubscribe("player-name"),super.disconnectedCallback()}_handleMoleHit(e){var t;if(this._isPlaying&&((t=e.detail)!=null&&t.active)){const{points:i}=T(this._level);this._score+=i}}_clearTimer(){this._timerId&&clearInterval(this._timerId),this._timerId=null}_controlMolesMode(){this._molesMode=this._molesMode===_.ONE?_.TWO:_.ONE}_saveHighScore(){H(this._playerName,this._score,this._selectedTime)}_controllerGame(){this._isPlaying=!this._isPlaying,this._isPlaying?(this._startLoop(),this._startTimer()):(this._stopLoop(),this._clearTimer())}_startLoop(){const t=T(this._level).interval,i=Math.max(0,t-100);this._intervalId=window.setInterval(()=>{if(!this._isPlaying)return;const r=x(),s=[r];if(this._molesMode===_.TWO){let a;do a=x();while(a===r);s.push(a)}this._activeMoles=G(s),setTimeout(()=>{this._isPlaying&&(this._activeMoles=new Array(l*l).fill(!1))},i)},t)}_stopLoop(){this._intervalId&&clearInterval(this._intervalId),this._intervalId=null,this._activeMoles=[]}_startTimer(){this._clearTimer(),this._timerId=window.setInterval(()=>{this._timeLeft--,this._timeLeft<=0&&(this._isPlaying=!1,this._stopLoop(),this._saveHighScore(),this._clearTimer(),this._timeLeft=Number(this._selectedTime),this._score=0)},1e3)}_clearGame(){this._isPlaying=!1,this._stopLoop(),this._clearTimer(),this._score=0,this._timeLeft=Number(this._selectedTime),this._activeMoles=new Array(l*l).fill(!1),this._molesMode=_.ONE}_goBack(){this._clearGame(),this.navigate("home")}_getLevel(e){this._level=e.detail.value,this._isPlaying&&(this._stopLoop(),this._startLoop())}_getTime(e){this._time=e.detail.value,this._selectedTime=this._time,this._clearGame()}render(){return v`
      <game-header
        .playerName=${this._playerName}
        .level=${this._level}
        .time=${this._time}
        @header-level=${this._getLevel}
        @header-time=${this._getTime}
      ></game-header>
      <page-layout style="padding-top: 1.2rem;">
        <game-button variant="back" style="margin-bottom: 1rem;" @game-click=${this._goBack}>
          <svg
            slot="icon"
            fill="#fff"
            width="32"
            height="32"
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z"
            />
          </svg>
        </game-button>
        <h2>Puntuación: ${this._score}</h2>
        <h4>Tiempo restante: ${this._timeLeft}s</h4>
        <mole-table
          size=${l}
          .activeMoles=${this._activeMoles}
          @mole-hit=${this._handleMoleHit}
        ></mole-table>
        <game-button
          style="margin-top: 1rem;"
          text="${this._molesMode===_.ONE?"1 Topo":"2 Topos"}"
          @game-click=${this._controlMolesMode}
        ></game-button>
        <game-button
          style="margin-top: 0.8rem;"
          text="${this._isPlaying?"Parar partida":"Empezar partida"}"
          @game-click=${this._controllerGame}
        ></game-button>
      </page-layout>
    `}};c([p()],n.prototype,"_playerName",2);c([p()],n.prototype,"_level",2);c([p()],n.prototype,"_time",2);c([p()],n.prototype,"_score",2);c([p()],n.prototype,"_isPlaying",2);c([p()],n.prototype,"_activeMoles",2);c([p()],n.prototype,"_molesMode",2);c([p()],n.prototype,"_selectedTime",2);c([p()],n.prototype,"_timeLeft",2);n=c([b("game-page")],n);export{n as GamePage};
