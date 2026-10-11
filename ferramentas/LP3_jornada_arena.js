/* ============================================================
   LP3_jornada_arena.js — a ARENA DE PERGUNTAS: bater numa caixa "?"
   leva a uma subfase própria (palco temático do mundo, música tensa,
   contador regressivo). 5 perguntas em sequência (8 rápidas nas
   arenas grandes "M"); cada acerto = um peixe para o urso; combo dá
   bônus; meta de acertos para sair (4/5 ou 6/8). Não bateu a meta:
   repete com outras perguntas. No chefão, a caixa abre um DUELO de
   2 perguntas rápidas no próprio castelo.
   O banco é lido em tempo de execução (LP3.sorteia / LP3.ITENS) e as
   alternativas são embaralhadas pela UI.
   ============================================================ */
window.ARENA = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;
var S=null; /* estado da arena corrente */
var usadas={}; /* ids já perguntados nesta fase (reseta a cada fase) */

function limite(item){ return item.tipo==='rapida'?12:(item.tipo==='leitura'?25:20); }
function pool(temas,filtro){ var l=[]; temas.forEach(function(k){ LP3.doTema(k).forEach(function(i){ if(!filtro||filtro(i)) l.push(i); }); }); return l; }
function sorteia(lista,n){ var a=lista.filter(function(i){ return !usadas[i.id]; }); if(a.length<n) a=lista.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a.slice(0,n); }
/* composição: arena grande = só rápidas; arena comum = metade rápidas (se o tema tiver), metade conceito/leitura */
function compoe(temas,n,grande){
  var rap=pool(temas,function(i){ return i.tipo==='rapida'; }), outras=pool(temas,function(i){ return i.tipo!=='rapida'; });
  var lista=[];
  if(grande||!outras.length) lista=sorteia(rap.length?rap:pool(temas),n);
  else if(!rap.length) lista=sorteia(outras,n);
  else { var nr=Math.ceil(n/2); lista=sorteia(rap,nr).concat(sorteia(outras,n-nr)); }
  if(lista.length<n) lista=lista.concat(sorteia(pool(temas),n-lista.length));
  for(var i=lista.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=lista[i]; lista[i]=lista[j]; lista[j]=t; }
  lista.forEach(function(it){ usadas[it.id]=1; });
  return lista;
}
function novaFase(){ usadas={}; }

/* ---------- entrar na arena ---------- */
function entra(c){
  var f=J.faseAtual, u=J.urso;
  J.estado='cano';
  G.iris(u.x-J.cam,u.y-40,function(){
    S={c:c, n:c.n, meta:c.meta, itens:compoe(f.temas,c.n,c.grande), i:0, acertos:0, combo:0, peixes:[], fase:'intro', t:0, timer:0, lim:0, item:null, voando:[], cena:J.mundo.cena, pontos:0};
    J.estado='arena'; J.arenaUrso={x:150,y:430,estado:'idle',anim:0};
    var m=/gelo|canal|aurora|castelo/.test(S.cena)?'arena_gelo':(/mar|montanha|floresta/.test(S.cena)&&f.id<=2?'arena_hist':'arena'); SOM.musica(m);
    if(window.UI){ UI.modoNivel(false); UI.hudArena(true); }
    setTimeout(proxima,900);
  });
}
function proxima(){
  if(!S||J.estado!=='arena') return;
  if(S.i>=S.n){ fim(); return; }
  S.item=S.itens[S.i]; S.lim=limite(S.item); S.timer=S.lim; S.fase='pergunta'; J.stats.perguntas++;
  UI.perguntaArena(S.item,{i:S.i+1,n:S.n,acertos:S.acertos,meta:S.meta,peixes:S.acertos,lim:S.lim},function(ok){ responde(ok); },function(){ /* ok/continuar */ if(S&&S.fase==='feedback') avanca(); });
}
function responde(ok){
  if(!S||S.fase!=='pergunta') return; S.fase='feedback'; S.t=0;
  if(ok){
    S.acertos++; S.combo++; J.stats.acertos++; var bonus=25*(S.combo-1), pts=100+bonus; S.pontos+=pts; G.pontua(pts);
    S.voando.push({t:0,dur:.7,x0:W/2,y0:H*.75,x1:J.arenaUrso.x+10,y1:J.arenaUrso.y-60}); SOM.fx('acerto');
    if(S.combo>=3) G.toast('Combo x'+S.combo+'! +'+bonus,1200);
    S.avancaEm=1.1;
  } else { S.combo=0; SOM.fx('erro'); J.shake=6; S.avancaEm=3.2; }
}
function avanca(){ if(!S) return; S.fase='entre'; S.i++; UI.fechaPergunta(); setTimeout(proxima,250); }
function atualiza(dt){
  if(!S) return; S.t+=dt; J.arenaUrso.anim+=dt;
  if(S.fase==='pergunta'){ S.timer-=dt; if(window.UI) UI.timer(Math.max(0,S.timer/S.lim),Math.ceil(Math.max(0,S.timer))); if(S.timer<=0){ UI.esgotou(); responde(false); } }
  else if(S.fase==='feedback'){ if(S.t>=S.avancaEm) avanca(); }
  for(var i=S.voando.length-1;i>=0;i--){ var v=S.voando[i]; v.t+=dt; var k=Math.min(1,v.t/v.dur); v.x=v.x0+(v.x1-v.x0)*k; v.y=v.y0+(v.y1-v.y0)*k-Math.sin(k*Math.PI)*160; if(k>=1){ S.voando.splice(i,1); S.peixes.push(1); J.arenaUrso.estado='eat'; J.arenaUrso.anim=0; J.arenaUrso.eatT=.9; SOM.fx('moeda'); G.brilho(v.x1,v.y1,8,'#fb923c'); } }
  if(J.arenaUrso.eatT>0){ J.arenaUrso.eatT-=dt; if(J.arenaUrso.eatT<=0) J.arenaUrso.estado='idle'; }
  if(S.fase==='pergunta'||S.fase==='entre') { if(J.arenaUrso.estado!=='eat') J.arenaUrso.estado='idle'; }
}
function fim(){
  var ok=S.acertos>=S.meta; S.fase='fim'; J.stats.arenas++;
  if(ok){ S.c.aberta=true; SOM.fx('destrava'); J.arenaUrso.estado='cheer'; J.arenaUrso.anim=0; } else { SOM.fx('tranca'); J.arenaUrso.estado='dizzy'; }
  var faltam=G.faltam().length;
  UI.fimArena(ok,S.acertos,S.n,S.meta,S.pontos,faltam,function(){
    if(ok){ UI.hudArena(false); sai(faltam===0); }
    else { S.itens=compoe(J.faseAtual.temas,S.n,S.c.grande); S.i=0; S.acertos=0; S.combo=0; S.peixes=[]; S.pontos=0; S.fase='intro'; J.arenaUrso.estado='idle'; setTimeout(proxima,500); }
  });
}
function sai(liberou){
  var u=J.urso; J.estado='cano';
  G.iris(W/2,H/2,function(){
    J.estado='nivel'; J.arenaUrso=null; S=null; u.cheerT=1.2; u.vy=0;
    SOM.musica(A.CENAS[J.mundo.cena].musica); G.hud();
    if(window.UI) UI.modoNivel(true);
    if(liberou){ G.toast('Todas as arenas feitas! A saída está liberada →',3200); SOM.fx('destrava'); } else G.toast('Arena vencida! Faltam '+G.faltam().length,2200);
  });
}

/* ---------- duelo do chefão (2 perguntas rápidas, no castelo) ---------- */
var D=null;
function duelo(c){
  var f=J.faseAtual; D={c:c,itens:compoe(f.temas,2,false),i:0,timer:0,lim:0,fase:'pergunta'};
  J.estado='pergunta'; proximaDuelo();
}
function proximaDuelo(){
  if(D.i>=2){ D.c.aberta=true; D.c.respawn=1.6; D.c.cooldown=1.6; J.estado='nivel'; J.caixaAtual=null; D=null; UI.hudArena(false); return; }
  var item=D.itens[D.i]; D.lim=limite(item); D.timer=D.lim; D.fase='pergunta'; J.stats.perguntas++; UI.hudArena(true);
  UI.perguntaArena(item,{i:D.i+1,n:2,acertos:0,meta:2,peixes:0,lim:D.lim,chefao:true},function(ok){
    D.fase='feedback'; D.t=0; if(ok){ J.stats.acertos++; G.pontua(100); SOM.fx('acerto'); J.urso.cheerT=1.2; G.acertoChefao(D.c); D.avancaEm=1.1; } else { SOM.fx('erro'); G.erroChefao(); D.avancaEm=3; }
  },function(){ if(D&&D.fase==='feedback') avancaDuelo(); });
}
function avancaDuelo(){ D.fase='entre'; D.i++; UI.fechaPergunta(); setTimeout(proximaDuelo,250); }
function atualizaDuelo(dt){ if(!D) return; if(D.fase==='pergunta'){ D.timer-=dt; UI.timer(Math.max(0,D.timer/D.lim),Math.ceil(Math.max(0,D.timer))); if(D.timer<=0){ UI.esgotou(); UI.forcaErro(); } } else if(D.fase==='feedback'){ D.t+=dt; if(D.t>=D.avancaEm) avancaDuelo(); } }

/* ---------- desenho da arena ---------- */
function desenha(c){
  if(!S) return; var t=J.t;
  A.arenaFundo(c,S.cena,t);
  /* placar de peixes */
  c.fillStyle='rgba(13,11,30,.55)'; A.rr(c,W/2-150,62,300,40,14); c.fill();
  for(var i=0;i<S.n;i++){ var x=W/2-150+22+i*(256/Math.max(1,S.n-1)); if(i<S.peixes.length) A.peixe(c,x,82,11,t,'#fb923c'); else { c.fillStyle='rgba(255,255,255,.18)'; A.el(c,x,82,10,6); c.fill(); } }
  c.fillStyle='#fff'; c.font='900 15px "Nunito","Segoe UI",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('Meta: '+S.meta+' de '+S.n,W/2,118);
  /* urso no palco */
  var u=J.arenaUrso; A.urso(c,u.x,u.y,u.estado,u.anim,1,1.15);
  if(u.estado==='eat'){ c.fillStyle='#fff'; c.font='900 18px "Nunito",Arial'; c.fillText('nhac!',u.x+60,u.y-110+Math.sin(u.anim*12)*4); }
  S.voando.forEach(function(v){ if(v.x!==undefined) A.peixe(c,v.x,v.y,16,t,'#fb923c'); });
  if(S.fase==='intro'){ c.fillStyle='#fde68a'; c.font='900 44px "Nunito","Segoe UI",Arial'; c.strokeStyle='rgba(0,0,0,.6)'; c.lineWidth=8; c.strokeText('ARENA!',W/2,250); c.fillText('ARENA!',W/2,250); c.fillStyle='#fff'; c.font='800 20px "Nunito",Arial'; c.strokeText(S.n+' perguntas · acerte '+S.meta+' para passar',W/2,300); c.fillText(S.n+' perguntas · acerte '+S.meta+' para passar',W/2,300); }
}

return {entra:entra, atualiza:function(dt){ atualiza(dt); }, atualizaDuelo:atualizaDuelo, duelo:duelo, desenha:desenha, novaFase:novaFase, get S(){ return S; }, get D(){ return D; }};
})();
