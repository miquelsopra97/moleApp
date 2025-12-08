import{a as g,x as o,r as u,t as l}from"./index-BiXHD5Nd.js";import{P as m}from"./game-button-BZub3XUQ.js";import{P as _}from"./PageTransitionsMixin-C3JExxZE.js";import{g as h}from"./score-config.config-DB4tY8vk.js";var f=Object.defineProperty,v=Object.getOwnPropertyDescriptor,c=(e,s,a,t)=>{for(var r=t>1?void 0:t?v(s,a):s,i=e.length-1,n;i>=0;i--)(n=e[i])&&(r=(t?n(s,a,r):n(r))||r);return t&&r&&f(s,a,r),r};let p=class extends _(m(g)){constructor(){super(...arguments),this._scores=[]}firstUpdated(){var e;(e=super.firstUpdated)==null||e.call(this,null),this._scores=h()}_goBackHome(){this.navigate("home")}render(){return o`
      <page-layout>
        <div class="score-container">
          <h2>Ranking de puntuaciones</h2>

          ${this._scores.length?o`
                <ul>
                  ${this._scores.map((e,s)=>o`
                      <li>
                        <strong>${s+1}. ${e.name}</strong>
                        — ${e.score} pts
                      </li>
                    `)}
                </ul>
              `:o`
                <p>No hay puntuaciones todavía.</p>
              `}

          <game-button text="Volver" @game-click=${this._goBackHome}></game-button>
        </div>
      </page-layout>
    `}};c([u()],p.prototype,"_scores",2);p=c([l("score-page")],p);export{p as ScorePage};
