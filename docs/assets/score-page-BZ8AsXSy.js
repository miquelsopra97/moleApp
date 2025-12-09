import{a as g,x as o,r as u,t as l}from"./index-CvD2QKtG.js";import{P as m}from"./game-button-B_Pf1vqO.js";import{P as _}from"./PageTransitionsMixin-C3JExxZE.js";import{g as h}from"./score-config.config-D_er6gHQ.js";var f=Object.defineProperty,v=Object.getOwnPropertyDescriptor,c=(e,r,a,t)=>{for(var s=t>1?void 0:t?v(r,a):r,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(t?i(r,a,s):i(s))||s);return t&&s&&f(r,a,s),s};let p=class extends _(m(g)){constructor(){super(...arguments),this._scores=[]}firstUpdated(){var e;(e=super.firstUpdated)==null||e.call(this,null),this._scores=h()}_goBackHome(){this.navigate("home")}render(){return o`
      <page-layout>
        <h2>Ranking de puntuaciones</h2>
        ${this._scores.length?o`
              <ul>
                ${this._scores.map((e,r)=>o`
                    <li>
                      <strong>${r+1}. ${e.name}</strong>
                      | ${e.score} pts | ${e.time} segundos
                    </li>
                  `)}
              </ul>
            `:o`
              <p>No hay puntuaciones todavía.</p>
            `}
        <game-button text="Volver" @game-click=${this._goBackHome}></game-button>
      </page-layout>
    `}};c([u()],p.prototype,"_scores",2);p=c([l("score-page")],p);export{p as ScorePage};
