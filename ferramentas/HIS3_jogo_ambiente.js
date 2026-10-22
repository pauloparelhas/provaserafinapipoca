/* ============================================================
   HIS3_jogo_ambiente.js — som de ambiente por reino (15/10, Paulo:
   "se é pra ficar sem música, tem que ter mais elementos sonoros
   imersivos que não encham a paciência"). Baixinho e esparso:
   brisa e passarinhos na vila/floresta, ondas no recife, vento no
   céu, tênis no ginásio, torcida no estádio e na corrida, tilintar
   na cozinha do biscoito, gotas no castelo. Fica sob o botão de
   efeitos (Sounds), não sob a música.
   ============================================================ */
(function(){
'use strict';
if(!window.SOM||!SOM.ambiente) return;
var G=window.JOGO, J=G&&G.J;
var POR_CENA={vila:'campo', bosque:'floresta', recife:'mar', nuvens:'vento', ginasio:'ginasio', estadio:'torcida', biscoito:'cozinha', tinta:'castelo', pista:'torcida'};
function escolhe(musica){
  if(musica==='arena'||musica==='vitoria'||musica==='final') return ''; /* perguntas e festas: silêncio de fundo */
  if(musica==='mapa') return 'campo';
  if(musica==='chefao'||musica==='') return J&&J.chefe?'castelo':(musica===''?'':'castelo');
  var L=J&&J.nivel, f=J&&J.faseAtual, cena=(L&&L.cena)||(f&&f.cena);
  return POR_CENA[cena]||'campo';
}
var orig=SOM.musica;
SOM.musica=function(m){ var r=orig.apply(this,arguments); try{ SOM.ambiente(escolhe(m||'')); }catch(e){} return r; };
/* o motor da corrida só ronca com a corrida rodando */
setInterval(function(){ try{ if(!J||J.pausado||J.estado!=='corrida') SOM.motor(-1); }catch(e){} },300);
})();
