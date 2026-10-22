/* ============================================================
   HIS3_jogo_alias.js — o motor do jogo (fork do de Inglês) decide
   comportamentos pelo NOME da cena (vila = barris, recife = nado e
   baús, estadio = pênalti, biscoito = objetos da trilha, tinta =
   chefão…). Para não mexer nessa lógica, as fases de História
   continuam com esses nomes por dentro, e aqui cada nome antigo é
   DESENHADO com a cena nova de História (HIS3_jogo_arteB*.js).
   Carregar depois de todos os arquivos de arte.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CENAS) return;
var MAPA={vila:'escola', bosque:'fazenda', recife:'rios', ginasio:'cidade', biscoito:'linha', tinta:'museu', nuvens:'casa', biblioteca:'museu', sub_caverna:'sub_arquivo'};
function nome(c){ var n=MAPA[c]; return (n&&A.CENAS[n])?n:c; }
['ceu','longe','perto','chao','plataforma','fundoSub'].forEach(function(f){
  var o=A[f]; if(typeof o!=='function') return;
  A[f]=function(c,x){ var a=[].slice.call(arguments); var i=(f==='chao'||f==='plataforma')?2:1; a[i]=nome(a[i]); return o.apply(this,a); };
});
/* cores, partículas e música da cena nova também valem para o nome antigo (sem trocar o nome) */
Object.keys(MAPA).forEach(function(k){ var n=MAPA[k]; if(A.CENAS[n]&&A.CENAS[k]){ var o=A.CENAS[n]; ['ceu','chaoTop','chao','chaoBase','plat','platTop','part'].forEach(function(p){ if(o[p]!==undefined) A.CENAS[k][p]=o[p]; }); } });
})();
