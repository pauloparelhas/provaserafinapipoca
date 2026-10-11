/* ============================================================
   LP3_jornada_arena.js — a ARENA DE PERGUNTAS: bater numa caixa "?"
   leva a uma subfase própria (palco temático do mundo, música tensa,
   contador regressivo). 5 perguntas em sequência (8 rápidas nas
   arenas grandes "M"); cada acerto = um peixe para o urso; combo dá
   bônus; meta de acertos (4/5 ou 6/8) = festa. SEM FRUSTRAÇÃO (3ª
   rodada): botão X (e Esc) sai da arena a qualquer hora; a arena conta
   como VISITADA (c.aberta) quando a criança responde a 1ª pergunta ou
   sai pelo X depois de vê-la — é isso que abre travas, mastro e cano 2.
   Abaixo da meta: placar amigável + "Seguir em frente" / "Tentar de
   novo". Caixa visitada continua abrindo para treinar mais (S.extra).
   No chefão, a caixa abre um DUELO de 2 perguntas rápidas no castelo.
   O banco é lido em tempo de execução (LP3.sorteia / LP3.ITENS) e as
   alternativas são embaralhadas pela UI.
   ============================================================ */
window.ARENA = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;
var S=null; /* estado da arena corrente */
/* ids já perguntados em TODO o jogo (11/10, Paulo: nada repetido nem entre fases).
   Fica salvo no aparelho; um tema só recomeça quando todas as perguntas dele já saíram. */
var USK='lp3_usadas_v1', usadas={};
try{ usadas=JSON.parse(localStorage.getItem(USK)||'{}')||{}; }catch(e){ usadas={}; }
function salvaUsadas(){ try{ localStorage.setItem(USK,JSON.stringify(usadas)); }catch(e){} }
var GEN=0; /* geração da arena: timeout de uma arena velha não mexe na nova */

function limite(item){ return 30; } /* 30 s para toda pergunta (pedido do pai) */
/* 11/10 (Paulo): parafrase/parodia so o necessario — no maximo 4 por fase quando ha outros temas */
var TETO={parodia:4};
var porFase={}; /* quantas de cada tema já saíram NESTA fase (para o teto) */
function contaTema(k){ return porFase[k]||0; }
function pool(temas,filtro){ var l=[]; var ts=temas.filter(function(k){ return !(TETO[k]&&temas.length>1&&contaTema(k)>=TETO[k]); }); if(!ts.length) ts=temas; ts.forEach(function(k){ LP3.doTema(k).forEach(function(i){ if(i.tema==='parodia'&&i.tipo==='rapida'&&(porFase.parodiaRap||0)>=3) return; /* "isso e parafrase ou parodia?": no maximo 3 por fase */ if(!filtro||filtro(i)) l.push(i); }); }); return l; }
/* 11/10 (Paulo): nunca repetir pergunta na mesma fase; só se o tema inteiro já saiu (treino extra) recomeça */
function sorteia(lista,n){ var a=lista.filter(function(i){ return !usadas[i.id]; }); if(!a.length){ lista.forEach(function(i){ delete usadas[i.id]; }); a=lista.slice(); } for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a.slice(0,n); }
/* composição: arena grande = só rápidas; arena comum = metade rápidas (se o tema tiver), metade conceito/leitura */
function compoe(temas,n,grande){
  var rap=pool(temas,function(i){ return i.tipo==='rapida'; }), outras=pool(temas,function(i){ return i.tipo!=='rapida'; });
  var lista=[];
  if(grande||!outras.length) lista=sorteia(rap.length?rap:pool(temas),n);
  else if(!rap.length) lista=sorteia(outras,n);
  else { var nr=Math.ceil(n/2); lista=sorteia(rap,nr).concat(sorteia(outras,n-nr)); }
  lista.forEach(function(it){ usadas[it.id]=1; });
  if(lista.length<n) lista=lista.concat(sorteia(pool(temas),n-lista.length));
  var vis={}; lista=lista.filter(function(it){ if(vis[it.id]) return false; vis[it.id]=1; return true; });
  lista.forEach(function(it){ usadas[it.id]=1; porFase[it.tema]=(porFase[it.tema]||0)+1; if(it.tema==='parodia'&&it.tipo==='rapida') porFase.parodiaRap=(porFase.parodiaRap||0)+1; }); salvaUsadas();
  for(var i=lista.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=lista[i]; lista[i]=lista[j]; lista[j]=t; }
  lista.forEach(function(it){ usadas[it.id]=1; });
  return lista;
}
function novaFase(){ porFase={}; /* usadas NÃO zera: as perguntas não se repetem entre fases */ }

/* ---------- entrar na arena ---------- */
function entra(c){
  var f=J.faseAtual, u=J.urso;
  J.estado='cano';
  G.iris(u.x-J.cam,u.y-40,function(){
    var g=++GEN;
    var its=compoe(f.temas,c.n,c.grande);
    S={c:c, n:its.length, meta:Math.min(c.meta,its.length), itens:its, i:0, acertos:0, combo:0, peixes:[], fase:'intro', t:0, timer:0, lim:0, item:null, voando:[], cena:J.mundo.cena, pontos:0, extra:!!c.aberta, gen:g};
    J.estado='arena'; J.arenaUrso={x:150,y:430,estado:'idle',anim:0};
    var m=/gelo|canal|aurora|castelo/.test(S.cena)?'arena_gelo':(/mar|montanha|floresta/.test(S.cena)&&f.id<=2?'arena_hist':'arena'); SOM.musica(m);
    if(window.UI){ UI.modoNivel(false); UI.hudArena(true); UI.botaoSair(true); }
    setTimeout(function(){ if(S&&S.gen===g) proxima(); },900);
  });
}
function proxima(){
  if(!S||J.estado!=='arena'||S.fase==='saindo') return;
  if(S.i>=S.n){ fim(); return; }
  S.item=S.itens[S.i]; S.lim=limite(S.item); S.timer=S.lim; S.fase='pergunta'; /* conta na resposta: sair pelo X não pesa nas estrelas */
  UI.perguntaArena(S.item,{i:S.i+1,n:S.n,acertos:S.acertos,meta:S.meta,peixes:S.acertos,lim:S.lim},function(ok){ responde(ok); },function(){ /* ok/continuar */ if(S&&S.fase==='feedback'&&!UI.menuAberto()) avanca(); });
}
function responde(ok){
  if(!S||S.fase!=='pergunta') return; S.fase='feedback'; S.t=0;
  J.stats.perguntas++; if(!S.c.aberta){ S.c.aberta=true; G.hud(); } /* respondeu 1 = arena visitada (trava, mastro e HUD já contam) */
  if(ok){
    S.acertos++; S.combo++; J.stats.acertos++; var bonus=25*(S.combo-1), pts=100+bonus; S.pontos+=pts; G.pontua(pts);
    S.voando.push({t:0,dur:.7,x0:W/2,y0:H*.75,x1:J.arenaUrso.x+10,y1:J.arenaUrso.y-60}); SOM.fx('acerto');
    if(S.combo>=3) G.toast('Combo x'+S.combo+'! +'+bonus,1200);
    S.avancaEm=1.1;
  } else { S.combo=0; SOM.fx('erro'); J.shake=6; S.avancaEm=1e9; setTimeout(function(){ if(S&&S.fase==='feedback') UI.teoria(S.item,function(){ if(S&&S.fase==='feedback') avanca(); }); },700); }
}
function avanca(){ if(!S||S.fase==='saindo') return; var g=S.gen; S.fase='entre'; S.i++; UI.fechaPergunta(); setTimeout(function(){ if(S&&S.gen===g) proxima(); },250); }
function atualiza(dt){
  if(!S) return; S.t+=dt; J.arenaUrso.anim+=dt;
  if(S.fase==='pergunta'){ S.timer-=dt; if(window.UI) UI.timer(Math.max(0,S.timer/S.lim),Math.ceil(Math.max(0,S.timer))); if(S.timer<=0){ UI.esgotou(); responde(false); } }
  else if(S.fase==='feedback'){ if(S.t>=S.avancaEm) avanca(); else if(S.avancaEm>1e8&&S.t>2.5&&window.UI&&!UI.menuAberto()&&!UI.teoriaAberta) avanca(); /* rede de segurança: nunca travar no feedback */ }
  for(var i=S.voando.length-1;i>=0;i--){ var v=S.voando[i]; v.t+=dt; var k=Math.min(1,v.t/v.dur); v.x=v.x0+(v.x1-v.x0)*k; v.y=v.y0+(v.y1-v.y0)*k-Math.sin(k*Math.PI)*160; if(k>=1){ S.voando.splice(i,1); S.peixes.push(1); J.arenaUrso.estado='eat'; J.arenaUrso.anim=0; J.arenaUrso.eatT=.9; SOM.fx('moeda'); G.brilho(v.x1,v.y1,8,'#fb923c'); } }
  if(J.arenaUrso.eatT>0){ J.arenaUrso.eatT-=dt; if(J.arenaUrso.eatT<=0) J.arenaUrso.estado='idle'; }
  if(S.fase==='pergunta'||S.fase==='entre') { if(J.arenaUrso.estado!=='eat') J.arenaUrso.estado='idle'; }
}
function fim(){
  var ok=S.acertos>=S.meta; S.fase='fim'; J.stats.arenas++; S.c.aberta=true; if(ok) S.c.vencida=true;
  /* abaixo da meta NÃO é fracasso: placar amigável, som alegre, urso contente */
  if(ok){ SOM.fx('destrava'); J.arenaUrso.estado='cheer'; J.arenaUrso.anim=0; } else { SOM.fx('plim'); J.arenaUrso.estado='idle'; }
  var faltam=G.faltam().length;
  UI.fimArena(ok,S.acertos,S.n,S.meta,S.pontos,faltam,function(){ sai(); },function(){ /* tentar de novo: outras perguntas */
    var g=S.gen; S.itens=compoe(J.faseAtual.temas,S.c.n,S.c.grande); S.n=S.itens.length; S.meta=Math.min(S.c.meta,S.n); S.i=0; S.acertos=0; S.combo=0; S.peixes=[]; S.pontos=0; S.fase='intro'; S.item=null; S.extra=true; J.arenaUrso.estado='idle'; setTimeout(function(){ if(S&&S.gen===g) proxima(); },500);
  });
}
/* botão X / Esc: sai na hora, sem confirmação (é reversível: a caixa continua abrindo) */
function sairX(){
  if(D){ sairDuelo(); return; }
  if(!S||J.estado!=='arena'||S.fase==='saindo') return;
  if(S.item&&!S.c.aberta) S.c.aberta=true; /* já viu a 1ª pergunta: conta como visitada */
  try{ if(UI.menuAberto()) UI.fechaMenu(); }catch(e){} UI.fechaPergunta(); J.pausado=false; SOM.fx('clique');
  sai();
}
function sai(){
  if(!S||S.fase==='saindo') return;
  var u=J.urso, c=S.c, extra=S.extra, visitou=!!c.aberta; S.fase='saindo'; J.estado='cano';
  if(window.UI){ UI.botaoSair(false); UI.hudArena(false); }
  G.iris(W/2,H/2,function(){
    J.estado='nivel'; J.arenaUrso=null; S=null; u.cheerT=visitou?1.2:0; u.vy=0; c.cooldown=1.2; J.in.left=J.in.right=J.in.jump=J.in.down=false;
    SOM.musica(A.CENAS[J.mundo.cena].musica); G.hud();
    if(window.UI) UI.modoNivel(true);
    var n=G.faltam().length;
    if(!visitou) G.toast('Tudo bem! A caixa ? fica esperando você',2200);
    else if(n===0&&!extra){ G.toast('Todas as arenas feitas! A saída está liberada →',3200); SOM.fx('destrava'); }
    else if(n===0) G.toast('Treino feito! Siga em frente →',2200);
    else G.toast('Boa! Falta'+(n>1?'m '+n+' arenas':' 1 arena')+' ? nesta fase',2200);
  });
}

/* ---------- duelo do chefão (2 perguntas rápidas, no castelo) ---------- */
var D=null;
function duelo(c){
  var f=J.faseAtual; D={c:c,itens:compoe(f.temas,2,false),i:0,timer:0,lim:0,fase:'pergunta'};
  J.estado='pergunta'; proximaDuelo();
}
function proximaDuelo(){
  if(!D) return;
  if(D.i>=2){ D.c.aberta=true; D.c.respawn=1.6; D.c.cooldown=1.6; J.estado='nivel'; J.caixaAtual=null; D=null; UI.hudArena(false); UI.botaoSair(false); return; }
  var item=D.itens[D.i]; D.lim=limite(item); D.timer=D.lim; D.fase='pergunta'; UI.hudArena(true); UI.botaoSair(true);
  UI.perguntaArena(item,{i:D.i+1,n:2,acertos:0,meta:2,peixes:0,lim:D.lim,chefao:true},function(ok){
    D.fase='feedback'; D.t=0; J.stats.perguntas++; if(ok){ J.stats.acertos++; G.pontua(100); SOM.fx('acerto'); J.urso.cheerT=1.2; G.acertoChefao(D.c); D.avancaEm=1.1; } else { SOM.fx('erro'); G.erroChefao(); D.avancaEm=1e9; setTimeout(function(){ if(D&&D.fase==='feedback') UI.teoria(item,function(){ if(D&&D.fase==='feedback'&&!UI.menuAberto()) avancaDuelo(); }); },700); }
  },function(){ if(D&&D.fase==='feedback') avancaDuelo(); });
}
function avancaDuelo(){ if(!D) return; var d0=D; D.fase='entre'; D.i++; UI.fechaPergunta(); setTimeout(function(){ if(D===d0) proximaDuelo(); },250); }
/* X no duelo do chefão: volta ao castelo na hora; a caixa continua lá */
function sairDuelo(){ if(!D) return; var c=D.c; D=null; try{ if(UI.menuAberto()) UI.fechaMenu(); }catch(e){} UI.fechaPergunta(); UI.hudArena(false); UI.botaoSair(false); J.pausado=false; c.cooldown=1.2; J.estado='nivel'; J.caixaAtual=null; SOM.fx('clique'); G.toast('Quando quiser, bata numa caixa ? de novo',2000); }
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
  if(S.fase==='intro'){ var t1=S.extra?'TREINO EXTRA!':'ARENA!', t2=S.n+' perguntas · meta: '+S.meta+' peixes', t3='Responda quantas quiser · para sair, toque no X'; c.fillStyle='#fde68a'; c.font='900 44px "Nunito","Segoe UI",Arial'; c.strokeStyle='rgba(0,0,0,.6)'; c.lineWidth=8; c.strokeText(t1,W/2,250); c.fillText(t1,W/2,250); c.fillStyle='#fff'; c.font='800 20px "Nunito",Arial'; c.strokeText(t2,W/2,300); c.fillText(t2,W/2,300); c.font='800 17px "Nunito",Arial'; c.lineWidth=6; c.fillStyle='#e9e6ff'; c.strokeText(t3,W/2,334); c.fillText(t3,W/2,334); }
}

return {entra:entra, sairX:sairX, atualiza:function(dt){ atualiza(dt); }, atualizaDuelo:atualizaDuelo, duelo:duelo, desenha:desenha, novaFase:novaFase, get S(){ return S; }, get D(){ return D; }};
})();
