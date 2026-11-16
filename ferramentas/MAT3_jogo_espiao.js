/* ============================================================
   MAT3_jogo_espiao.js — o OCTÁVIO FIGURANTE (16/11, pedido do Paulo).
   "Ele fica só na fase do chefão; nas outras, coadjuvante meio escondido,
   como o Corujito da She-Ra ou o Wally": em ALGUNS reinos, a cabeça dele
   espia atrás de uma moita/coral NO CENÁRIO DE FUNDO (camada "perto",
   paralaxe 0,45), atrás de tudo o que é jogável; quando o herói passa na
   frente dele, ele se abaixa e some. Não para o jogo, não fala, não machuca,
   não conta ponto: é só para a criança o reconhecer de leve.
   16/11 (jogador BLOQUEOU a 1ª versão, no chão da fase): enterrado sob o bloco
   do portão (fase 6), colado no cano (fase 8), ao lado de inimigo (fase 2).
   O chão das fases não tem folga; no FUNDO ele nunca se confunde com coisa
   interativa. Desenho: A.octavioEspia (MAT3_jogo_arteM.js). Chamado por
   desenhaNivel (MAT3_jogo_cena.js) logo depois de A.perto, antes do véu.
   ============================================================ */
window.ESPIAO = (function(){
'use strict';
var G=window.JOGO, J=G&&G.J, A=window.ARTE, PAR=.45, Y_FUNDO=462, ESC=.62;
/* reinos com o figurante (nem todos: "alguns cenários"), onde (fração da fase) e o que o esconde */
var ONDE={2:{f:.42,fundo:'moita'}, 4:{f:.55,fundo:'coral'}, 6:{f:.38,fundo:'moita'}, 8:{f:.62,fundo:'moita'}};
function lugar(M){
  if(M.__espiao!==undefined) return M.__espiao;
  var F=J.faseAtual, cfg=F&&ONDE[F.id]; M.__espiao=null;
  if(!cfg||!M.w||/^sub_/.test(M.cena||'')) return null;
  /* posição no fundo: aparece na tela quando o herói está perto da fração f da fase */
  var xMundo=M.w*cfg.f; M.__espiao={bx:xMundo*PAR+380*(1-PAR), xMundo:xMundo, fundo:cfg.fundo, sobe:0};
  return M.__espiao;
}
function desenhaFundo(c,t){
  var M=J.mundo; if(!M||J.chefe||!A||!A.octavioEspia) return; var E=lugar(M); if(!E) return;
  var sx=E.bx-J.cam*PAR; if(sx<-120||sx>G.W+120) return;
  var u=J.urso, hx=u?u.x-J.cam:-999, d=Math.abs(hx-sx);
  /* longe: espia; o herói passa na frente: abaixa e some (suave, sem pisca) */
  var alvo=d<170?0:1, dt=1/60;
  E.sobe+=(alvo-E.sobe)*Math.min(1,dt*(alvo<E.sobe?6:1.4));
  c.save(); c.translate(sx,Y_FUNDO); c.scale(ESC,ESC); A.octavioEspia(c,0,0,t,E.sobe,E.fundo,false); c.restore();
}
return {desenhaFundo:desenhaFundo, desenha:function(){}, _lugar:lugar, ONDE:ONDE};
})();
