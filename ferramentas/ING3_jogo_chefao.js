/* ============================================================
   ING3_jogo_chefao.js — Inkwell Castle: o Conde Rabisco (reino 9).
   v3 (17/10, crítica do Paulo: "o chefão está tão malfeito: não tem
   ambientação visual e sonora, já começa na fase, coisas caem sem
   razão, não há ação esperada do jogador, o chefão é estático, não
   cria expectativa nem tensão"). Agora:
     ABERTURA  cena antes da luta (só avança no Next ▶): castelo às
               escuras, trovão e relâmpago, a tinta borbulha na sacada,
               o Conde SURGE da poça, se apresenta, conta o que fez e
               desafia; o narrador diz o que fazer. Música só depois.
     O CONDE   anda de um lado a outro da sacada, reage a tudo (ri
               quando acerta, fica tonto quando perde um tinteiro,
               bravo a cada rodada) e tem barra de vida com o nome.
     TUDO TEM ORIGEM: cada gota SAI da pena dele (ele levanta a pena,
               a gota voa em arco e a sombra marca o chão antes);
               as manchas são DERRAMADAS do tinteiro dele na sacada;
               as letras saem da pena enquanto ele escreve.
     OBJETIVO SEMPRE NA TELA (faixa no alto + seta no alvo):
       Rodada 1  TINTEIROS: acertar a ESTRELA no tinteiro que brilha (3).
       Rodada 2  MANCHAS: pisar ou acertar a estrela em 6 manchas.
       Rodada 3  LETRAS: as letras que caem viram uma ESCADA; subir por
                 ela até a sacada do Conde. As outras letras são ataque.
     Cada rodada termina num DUELO (ambiente de questões, 3 perguntas:
     1 fairy+realmb, 2 poem, 3 cause+circle). Entre as rodadas, faixa
     "ROUND 2 / ROUND 3" com o Conde cada vez mais bravo (tensão que
     se resolve na derrota dele e no FINAL circular).
   Sem game over: dano encolhe / volta ao início da sala; a rodada
   continua de onde estava.
   ============================================================ */
window.CHEFAO = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H, T=45, CHAO=450;
var RODADAS=[['fairy','realmb'],['poem'],['cause','circle']];
var SACADA_X0=17*T, SACADA_Y=6*T;
var C=null;

/* 18/10 (Paulo: "5 frases grandes, difícil de ler"): 3 telas, frases curtas */
var ABERTURA=[
  {en:'Inkwell Castle. Count Scribble lives here!', pt:'Castelo do Tinteiro. Aqui mora o Conde Rabisco!', fx:'trovao'},
  {en:'"HA HA! The lost endings are MINE!"', pt:'"RÁ RÁ! Os finais perdidos são MEUS!"', fx:'conde'},
  {en:'Jump on the shelf. Throw a ★ at the glowing inkwell!', pt:'Pule na prateleira. Jogue uma ★ no tinteiro que brilha!', fx:'tinteiros', botao:'Fight! ▶'}
];

function falaC(en,pt,dur){ if(!C) return; C.fala={en:en,pt:pt,t:0,dur:dur||3.2}; try{ say(en); }catch(e){} }
function inicia(L){
  C={x:19*T, y:SACADA_Y, hp:9, max:9, estado:'idle', et:0, ronda:-1, fase:'abertura', t:0, passo:0, aparece:0, escuro:1, raio:0,
     gotas:[], voando:[], letras:[], blocos:[], tinteiros:[], alvo:0, ondas:0, convertidas:0, banner:null, tRaio:6, alt:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], tLetra:0, nLetra:0,
     m:{x:19*T, y:SACADA_Y, tipo:'conde', falando:0, i:0}};
  J.chefe=C; J.estado='chefeIntro'; SOM.musica('');
  C.tinteiros=[{x:5*T+22,y:7*T},{x:11*T+22,y:7*T},{x:8*T+22,y:CHAO}].map(function(p){ return {x:p.x,y:p.y,caido:false}; });
  if(window.UI){ UI.modoNivel(false); UI.acao(false,0); }
  mostraPasso();
}
function mostraPasso(){
  var p=ABERTURA[C.passo]; if(!p) return;
  if(p.fx==='trovao'){ C.raio=1; J.flash=.9; SOM.fx('quebra'); J.shake=6; }
  if(p.fx==='borbulha'){ SOM.fx('cano'); }
  if(p.fx==='conde'){ C.aparece=.001; C.estado='laugh'; C.et=0; SOM.fx('chefao'); J.shake=10; J.flash=.6; SOM.musica('chefao'); }
  if(p.fx==='risada'){ C.estado='laugh'; C.et=0; SOM.fx('risada'); }
  if(p.fx==='tinteiros'){ SOM.fx('destrava'); }
  if(window.UI) UI.legenda({en:p.en,pt:p.pt,botao:p.botao},{next:avancaIntro,pula:fimIntro});
}
function avancaIntro(){ if(!C||C.fase!=='abertura') return; C.passo++; if(C.passo>=ABERTURA.length){ fimIntro(); return; } mostraPasso(); }
function fimIntro(){ if(!C) return; if(window.UI){ UI.legenda(null); UI.modoNivel(true); } C.aparece=1; C.escuro=0; J.estado='nivel'; SOM.musica('chefao'); comecaFase(1); }

function daEstrelas(){ var u=J.urso; u.poderes.estrelas=Math.max(u.poderes.estrelas||0,3); if(window.UI) UI.acao(true,u.poderes.estrelas); }
function comecaFase(n){
  C.fase='p'+n; C.t=0; C.gotas=[]; C.letras=[]; daEstrelas(); SOM.musica('chefao');
  if(n===1){ C.alvo=0; C.tinteiros.forEach(function(q){ q.caido=false; }); falaC('My magic inkwells!','Meus tinteiros mágicos!'); }
  if(n===2){ C.convertidas=0; C.ondas=0; J.mundo.inimigos=J.mundo.inimigos.filter(function(e){ return !e.doConde; }); falaC('Ink blots, GO!','Manchas, VÃO!'); }
  if(n===3){ C.blocos=[]; C.alt=C.alt.map(function(){ return 0; }); C.nLetra=0; C.tLetra=1.2; falaC('GIANT letters!','Letras GIGANTES!'); }
}
function banner(en,pt){ C.banner={en:en,pt:pt,t:0}; SOM.fx('chefao'); J.shake=8; }
function itensDa(r){ var ja=J.nivel.quizIds||(J.nivel.quizIds=[]), out=[];
  RODADAS[r].forEach(function(tema,k){ var n=k===0?(RODADAS[r].length>1?2:3):1; QUIZ.escolhe({tema:tema},n,ja).forEach(function(it){ ja.push(it.id); out.push(it); }); });
  return out; }
function duelo(){
  C.ronda++; C.fase='quiz'; C.t=0; C.fala=null; C.gotas=[]; C.letras=[];
  QUIZ.inicia(C.m,{itens:itensDa(C.ronda),
    aoResponder:function(ok){ if(ok){ C.voando.push({x:J.urso.x,y:J.urso.y-60,t:0}); SOM.fx('folha'); } else { C.estado='laugh'; C.et=0; SOM.fx('risada'); } },
    aoTerminar:function(){ if(C.ronda>=2) derrota(); else transicao(C.ronda+2); },
    aoSair:function(){ C.ronda--; comecaFase(C.ronda+2); }});
}
function transicao(n){
  C.fase='transicao'; C.t=0; C.prox=n; C.estado='hit'; C.et=0;
  banner('ROUND '+n,'RODADA '+n);
  if(n===2) falaC('Grrr! My blots will stop you!','Grrr! Minhas manchas vão te parar!');
  else falaC('ENOUGH! Giant letters!','CHEGA! Letras gigantes!');
}
function derrota(){
  C.fase='derrota'; C.t=0; C.estado='sad'; C.gotas=[]; C.letras=[]; SOM.musica(''); SOM.fx('vitoria');
  falaC('Oh no… you found the endings.','Ah, não… você achou os finais.');
  C.t=0;
}
/* a pena do Conde: de onde sai tudo que ele joga */
function pena(){ return {x:C.x-46, y:C.y-170}; }
function novaGota(){ var u=J.urso, p=pena(), lado=Math.random()<.5?-1:1, alvo=Math.max(40,Math.min(16*T,u.x+(Math.random()<.35?0:lado*(70+Math.random()*90)))); C.gotas.push({x0:p.x,y0:p.y,alvo:alvo,t:0,dur:1.35,x:p.x,y:p.y,r:13}); /* 18/10: nem sempre na criança; 1,35 s de sombra para sair */ C.estado='write'; C.et=0; SOM.fx('arremesso'); }
/* letras: a cada duas, uma vira degrau da ESCADA (colunas 13, 14, 15 empilhando 1, 2, 3); a outra é ataque */
var ESCADA=[13,14,14,15,15,15];
function novaLetra(){
  var u=J.urso, p=pena(), deg=C.nLetra%2===1&&C.nLetra>>1<ESCADA.length, alvo;
  if(deg){ var col=ESCADA[C.nLetra>>1]; alvo=col*T+T/2; } else alvo=Math.max(40,Math.min(12*T,u.x+(Math.random()<.5?-1:1)*(80+Math.random()*80)));
  C.letras.push({x0:p.x,y0:p.y,alvo:alvo,t:0,dur:1.1,x:p.x,y:p.y,ch:'INKBLOT'.charAt(C.nLetra%7),degrau:deg,col:deg?ESCADA[C.nLetra>>1]:-1});
  C.nLetra++; C.estado='write'; C.et=0; SOM.fx('arremesso');
}
function solidos(s){ if(!C) return; C.blocos.forEach(function(b){ s.push({x:b.x,y:b.y,w:b.w,h:b.h,letra:b}); }); }

function atualiza(dt){
  if(!C) return; C.t+=dt; C.et+=dt; if(C.fala) C.fala.t+=dt; if(C.banner) C.banner.t+=dt;
  if(C.estado!=='idle'&&C.estado!=='sad'&&C.et>1) C.estado='idle';
  if(C.aparece>0&&C.aparece<1) C.aparece=Math.min(1,C.aparece+dt*1.2);
  if(C.raio>0) C.raio=Math.max(0,C.raio-dt*1.5);
  if(C.fase!=='abertura'&&C.escuro>0) C.escuro=Math.max(0,C.escuro-dt);
  /* relâmpago de vez em quando nas janelas (clima) */
  C.tRaio-=dt; if(C.tRaio<=0){ C.tRaio=9+Math.random()*5; C.raio=.6; J.flash=Math.max(J.flash,.12); SOM.fx('quebra'); }
  /* o Conde anda pela sacada (não fica parado) */
  if(C.fase!=='abertura'&&C.fase!=='derrota'&&C.fase!=='quiz') C.x=19.2*T+Math.sin(C.t*.7)*1.3*T;
  voa(dt);
  if(J.estado!=='nivel') return;
  var u=J.urso, R=G.ursoRet(), vivo=u.invT<=0&&u.tontoT<=0;
  if((u.poderes.estrelas||0)<=0&&/^p/.test(C.fase)&&C.t>2) daEstrelas();
  if(C.fase==='espera'){ if(C.t>2) duelo(); }
  else if(C.fase==='derrota'){ if(C.t>3.2) G.iniciaFinal(); }
  else if(C.fase==='transicao'){ if(C.t>2.8){ C.banner=null; comecaFase(C.prox); } }
  else if(C.fase==='p1'){
    var ritmo=3.4-C.alvo*.3;
    if(Math.floor((C.t-dt)/ritmo)!==Math.floor(C.t/ritmo)) novaGota();
    (J.estrelas||[]).forEach(function(e){ var tq=C.tinteiros[C.alvo]; if(tq&&!tq.caido&&Math.abs(e.x-tq.x)<36&&Math.abs(e.y-(tq.y-24))<70){ tq.caido=true; e.dist=999; C.alvo++; SOM.fx('chefao'); J.shake=8; G.brilho(tq.x,tq.y-30,16,'#a78bfa'); C.estado='hit'; C.et=0;
      if(C.alvo<3) falaC(C.alvo===1?'NO! My inkwell!':'Not another one!',C.alvo===1?'NÃO! Meu tinteiro!':'Outro não!'); } });
    if(C.alvo>=3&&C.t>.5){ C.fase='espera'; C.t=0; C.estado='hit'; falaC('Answer THIS!','Responda ISTO!'); C.t=0; }
  }
  else if(C.fase==='p2'){
    if(Math.floor((C.t-dt)/3.4)!==Math.floor(C.t/3.4)) novaGota();
    if(Math.floor((C.t-dt)/3.6)!==Math.floor(C.t/3.6)&&C.ondas<5){ C.ondas++; C.estado='write'; C.et=0; SOM.fx('cano');
      /* derrama do tinteiro da sacada: caem pela borda e saem andando */
      for(var k=0;k<2;k++) C.gotas.push({x0:SACADA_X0+20,y0:SACADA_Y-10,alvo:SACADA_X0-40-k*70,t:-k*.3,dur:.7,x:SACADA_X0,y:SACADA_Y,r:15,vira:true}); }
    var vencidas=J.mundo.inimigos.filter(function(e){ return e.doConde&&(e.morto||e.achatado); }).length; C.convertidas=vencidas;
    if(vencidas>=6){ J.mundo.inimigos.forEach(function(e){ if(e.doConde){ e.achatado=true; e.tAch=.3; } }); C.fase='espera'; C.t=0; C.estado='hit'; falaC('Grr! Answer THIS!','Grr! Responda ISTO!'); C.t=0; }
  }
  else if(C.fase==='p3'){
    C.tLetra-=dt; if(C.tLetra<=0){ C.tLetra=1.4; novaLetra(); }
    /* chegou na sacada pela escada de letras: o duelo final */
    if(u.noChao&&u.x>SACADA_X0+10&&u.y<=SACADA_Y+6){ C.fase='espera'; C.t=0; C.estado='hit'; C.letras=[]; falaC('WHAT?! Last chance!','O QUÊ?! Última chance!'); C.t=0; }
  }
  /* gotas e letras voam em ARCO da pena até o alvo; a sombra no chão avisa */
  [C.gotas,C.letras].forEach(function(lista,ehLetra){
    for(var g=lista.length-1;g>=0;g--){ var d=lista[g]; d.t+=dt; if(d.t<0) continue; var k=Math.min(1,d.t/d.dur);
      var chao=ehLetra&&d.degrau?CHAO-C.alt[d.col]*T:CHAO;
      d.x=d.x0+(d.alvo-d.x0)*k; d.y=d.y0+(chao-d.y0)*k*k-Math.sin(k*Math.PI)*(ehLetra?60:110);
      var tam=(ehLetra?24:d.r)*.75; /* acerta só se cair mesmo em cima */
      if(vivo&&k>.55&&G.colideRet(R.x+4,R.y,R.w-8,R.h,d.x-tam,d.y-tam,tam*2,tam*2)){ lista.splice(g,1); G.machucado(); SOM.fx('risada'); C.estado='laugh'; C.et=0; continue; }
      if(k>=1){ lista.splice(g,1); J.shake=ehLetra?6:2;
        G.emite(8,function(){ return {x:d.alvo,y:chao-4,vx:(Math.random()-.5)*160,vy:-60-Math.random()*90,vida:.5,max:.5,tipo:'fogo',cor:ehLetra?'#7c3aed':'#312e81',r:3,g:1}; });
        if(d.vira){ J.mundo.inimigos.push({tipo:'tinta',x:d.alvo,y:CHAO,x0:d.alvo,y0:CHAO,dir:-1,v:55+Math.random()*20,voa:false,doConde:true}); }
        if(ehLetra&&d.degrau){ var bx=d.col*T, by=chao-T; C.blocos.push({x:bx,y:by,w:T,h:T,ch:d.ch}); C.alt[d.col]++; SOM.fx('tijolo');
          if(u.x>bx-12&&u.x<bx+T+12&&u.y>by){ u.x=bx-20; G.machucado(); } }
      } }
  });
}
function voa(dt){
  for(var i=C.voando.length-1;i>=0;i--){ var p=C.voando[i]; p.t+=dt; var k=Math.min(1,p.t/.8); p.cx=p.x+(C.x-p.x)*k; p.cy=p.y+(C.y-60-p.y)*k-Math.sin(k*Math.PI)*120; if(k>=1){ C.voando.splice(i,1); C.hp=Math.max(0,C.hp-1); C.estado='hit'; C.et=0; SOM.fx('chefao'); J.shake=8; G.brilho(C.x,C.y-60,14,'#fde047'); } }
}
function anima(dt){ if(!C) return; C.et+=dt; if(C.estado!=='idle'&&C.estado!=='sad'&&C.et>1) C.estado='idle'; voa(dt); }

/* ---------- desenho (no mundo) ---------- */
function desenha(c,t){
  if(!C) return;
  /* janelas do castelo com relâmpago */
  if(C.raio>0){ c.save(); c.globalAlpha=C.raio*.7; c.fillStyle='#e0e7ff'; [[3*T,90],[9*T,70],[14*T,90]].forEach(function(w){ A.rr(c,w[0],w[1],60,110,30); c.fill(); }); c.restore(); }
  /* tochas nas paredes */
  [[1.5*T,5*T],[8*T,4*T],[15*T,5*T]].forEach(function(p,i){ c.fillStyle='#57534e'; c.fillRect(p[0]-4,p[1],8,30); var f=Math.sin(t*14+i*2)*3; c.fillStyle='rgba(251,146,60,.35)'; A.circ(c,p[0],p[1]-8,26+f); c.fill(); c.fillStyle='#f97316'; c.beginPath(); c.moveTo(p[0]-8,p[1]); c.quadraticCurveTo(p[0],p[1]-30-f,p[0]+8,p[1]); c.fill(); c.fillStyle='#fde047'; c.beginPath(); c.moveTo(p[0]-4,p[1]); c.quadraticCurveTo(p[0],p[1]-16-f,p[0]+4,p[1]); c.fill(); });
  /* a poça que borbulha na sacada (abertura) e o Conde surgindo dela */
  if(C.fase==='abertura'&&C.passo>=1){ var bb=Math.sin(t*6); c.fillStyle='#1e1b4b'; A.el(c,C.x,C.y-4,70,12); c.fill(); c.fillStyle='#4338ca'; for(var q=0;q<5;q++){ var ph=(t*1.6+q*.37)%1; A.circ(c,C.x-50+q*25,C.y-8-ph*40,6*(1-ph)+2); c.fill(); } }
  if(A.conde&&(C.fase!=='abertura'||C.aparece>0)){ var k=C.fase==='abertura'?C.aparece:1;
    c.save(); c.translate(C.x,C.y); c.scale(.6+.4*k,k); c.globalAlpha=Math.min(1,k*1.5); A.conde(c,0,0,C.estado,t); c.restore(); }
  /* tinteiros (rodada 1) com seta no que brilha */
  C.tinteiros.forEach(function(tq,i){ c.save(); c.translate(tq.x,tq.y); if(tq.caido) c.rotate(1.3);
    var aceso=!tq.caido&&i===C.alvo&&(C.fase==='p1'||(C.fase==='abertura'&&C.passo>=2));
    if(aceso){ var g=c.createRadialGradient(0,-24,4,0,-24,62); g.addColorStop(0,'rgba(253,224,71,'+(.75+.25*Math.sin(t*6))+')'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; A.circ(c,0,-24,62); c.fill(); }
    c.fillStyle=aceso?A.lin(c,-16,-40,16,0,'#fde68a','#d97706'):'#1e1b4b'; A.rr(c,-16,-40,32,40,8); c.fill(); if(aceso){ c.strokeStyle='#fff'; c.lineWidth=3; A.rr(c,-16,-40,32,40,8); c.stroke(); } c.fillStyle='#4c1d95'; A.rr(c,-10,-48,20,10,4); c.fill();
    c.strokeStyle='#e9d5ff'; c.lineWidth=3; c.beginPath(); c.moveTo(6,-48); c.quadraticCurveTo(22,-78,30,-92); c.stroke();
    if(tq.caido){ c.fillStyle='#312e81'; A.el(c,8,4,26,6); c.fill(); }
    c.restore();
    if(aceso){ var b=Math.abs(Math.sin(t*4))*10; c.save(); c.translate(tq.x,tq.y-110-b); c.fillStyle='#fde047'; c.strokeStyle='#78350f'; c.lineWidth=3; c.beginPath(); c.moveTo(-12,-22); c.lineTo(12,-22); c.lineTo(12,-8); c.lineTo(22,-8); c.lineTo(0,14); c.lineTo(-22,-8); c.lineTo(-12,-8); c.closePath(); c.fill(); c.stroke(); A.estrela(c,0,-36,10,'#fde047',t*2); c.restore(); } });
  /* letras caídas: a ESCADA */
  C.blocos.forEach(function(b){ c.fillStyle=A.lin(c,b.x,b.y,b.x,b.y+b.h,'#8b5cf6','#4c1d95'); A.rr(c,b.x+1,b.y+1,b.w-2,b.h-2,8); c.fill(); c.strokeStyle='#2e1065'; c.lineWidth=2; A.rr(c,b.x+1,b.y+1,b.w-2,b.h-2,8); c.stroke();
    c.fillStyle='#f5f3ff'; c.font='900 30px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(b.ch,b.x+b.w/2,b.y+b.h/2+1); });
  if(C.fase==='p3'){ /* setas mostrando a subida */ var b2=Math.abs(Math.sin(t*3))*6; c.save(); c.globalAlpha=.85; c.fillStyle='#fde047'; [[13,1],[14,2],[15,3],[16.6,4]].forEach(function(p,i){ var yy=CHAO-p[1]*T-22-b2; if(p[0]<16&&C.alt[p[0]]<p[1]) return; c.beginPath(); c.moveTo(p[0]*T+10,yy); c.lineTo(p[0]*T+34,yy-10); c.lineTo(p[0]*T+34,yy+10); c.closePath(); c.fill(); }); c.restore(); }
  /* sombras de aviso, gotas e letras em voo */
  [C.gotas,C.letras].forEach(function(lista,ehLetra){ lista.forEach(function(d){ if(d.t<0) return;
    var k=Math.min(1,d.t/d.dur), chao=ehLetra&&d.degrau?CHAO-C.alt[d.col]*T:CHAO; c.fillStyle='rgba(30,27,75,'+(.15+.45*k)+')'; A.el(c,d.alvo,chao-2,(ehLetra?28:16)*(.5+.6*k),6); c.fill();
    if(!d.vira){ c.strokeStyle='rgba(239,68,68,'+(.3+.5*Math.abs(Math.sin(t*12)))+')'; c.lineWidth=2; A.el(c,d.alvo,chao-2,(ehLetra?32:22),8); c.stroke(); }
    if(ehLetra){ c.save(); c.translate(d.x,d.y); c.rotate(Math.sin(k*6)*.2); c.fillStyle=d.degrau?'#8b5cf6':'#7c3aed'; c.strokeStyle='#2e1065'; c.lineWidth=5; c.font='900 50px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.strokeText(d.ch,0,0); c.fillText(d.ch,0,0); c.restore(); }
    else { c.fillStyle='#312e81'; c.beginPath(); c.moveTo(d.x,d.y-d.r*1.6); c.quadraticCurveTo(d.x+d.r,d.y-d.r*.2,d.x,d.y+d.r); c.quadraticCurveTo(d.x-d.r,d.y-d.r*.2,d.x,d.y-d.r*1.6); c.fill(); c.fillStyle='rgba(196,181,253,.7)'; A.circ(c,d.x-d.r*.3,d.y,d.r*.3); c.fill(); }
  }); });
  C.voando.forEach(function(p){ if(p.cx===undefined) return; if(A.paginaVoando) A.paginaVoando(c,p.cx,p.cy,p.t*8); });
}
/* ---------- na tela: escuridão da abertura, barra do Conde, objetivo, fala, faixa da rodada ---------- */
function desenhaTela(c,t){
  if(!C) return;
  if(C.escuro>0){ c.fillStyle='rgba(8,6,20,'+(C.escuro*(.55-C.raio*.2))+')'; c.fillRect(0,0,W,H); }
  if(C.fase!=='abertura'){
    var x=W/2-160, y=58; c.fillStyle='rgba(0,0,0,.55)'; A.rr(c,x-8,y-6,336,48,12); c.fill();
    c.fillStyle='#e9d5ff'; c.font='900 13px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='top'; c.fillText('COUNT SCRIBBLE',W/2,y-3);
    for(var i=0;i<C.max;i++){ var w=(320-(C.max-1)*4)/C.max; c.fillStyle=i<C.hp?A.lin(c,0,y+14,0,y+34,'#a78bfa','#5b21b6'):'rgba(255,255,255,.15)'; A.rr(c,x+i*(w+4),y+14,w,20,6); c.fill(); }
    var vencidas=C.convertidas||0;
    var obj=C.fase==='p1'?['★ the glowing inkwell!  '+C.alvo+' / 3','★ no tinteiro que brilha!']:(C.fase==='p2'?['Stomp the ink blots!  '+Math.min(6,vencidas)+' / 6','Pise nas manchas!']:(C.fase==='p3'?['Climb the letters!','Suba nas letras!']:null));
    if(obj){ c.font='900 18px "Nunito",Arial'; var tw=c.measureText(obj[0]).width+30; c.fillStyle='rgba(76,29,149,.85)'; A.rr(c,W/2-tw/2,y+46,tw,J.tr?46:30,15); c.fill(); c.fillStyle='#fde68a'; c.textBaseline='top'; c.fillText(obj[0],W/2,y+51); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#fff'; c.fillText(obj[1],W/2,y+73); } }
  }
  if(C.fala&&!J.quiz&&C.fala.t<C.fala.dur&&C.fase!=='abertura'){ c.font='900 19px "Nunito",Arial'; var tw2=Math.min(560,c.measureText(C.fala.en).width)+36, bx=Math.max(20,Math.min(W-tw2-20,C.x-J.cam-tw2-30)), by=150;
    c.fillStyle='#ede9fe'; A.rr(c,bx,by,tw2,J.tr?62:44,16); c.fill(); c.beginPath(); c.moveTo(bx+tw2-30,by+(J.tr?60:42)); c.lineTo(bx+tw2,by+(J.tr?78:60)); c.lineTo(bx+tw2-60,by+(J.tr?60:42)); c.fill();
    c.fillStyle='#2e1065'; c.textAlign='left'; c.textBaseline='top'; c.fillText(C.fala.en,bx+18,by+12); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#6d28d9'; c.fillText(C.fala.pt,bx+18,by+38); } }
  if(C.banner&&C.banner.t<2.6){ var k=Math.min(1,C.banner.t/.3), sai=Math.max(0,(C.banner.t-2.1)/.5); c.save(); c.globalAlpha=1-sai; c.fillStyle='rgba(13,11,30,.6)'; c.fillRect(0,H/2-70,W,140);
    c.translate(W/2,H/2); c.scale(.6+.4*k,.6+.4*k); c.font='900 72px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='#2e1065'; c.strokeText(C.banner.en,0,0); c.fillStyle='#fde047'; c.fillText(C.banner.en,0,0);
    if(J.tr){ c.font='700 20px "Nunito",Arial'; c.fillStyle='#fff'; c.fillText(C.banner.pt,0,46); } c.restore(); }
}
return {inicia:inicia, atualiza:atualiza, anima:anima, desenha:desenha, desenhaTela:desenhaTela, solidos:solidos, avancaIntro:avancaIntro, ativo:function(){ return !!C; }, limpa:function(){ C=null; J.chefe=null; if(window.UI) UI.legenda(null); }};
})();
