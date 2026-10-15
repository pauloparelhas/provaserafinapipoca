/* ============================================================
   ING3_jogo_chefao.js — Inkwell Castle: o Conde Rabisco (reino 9),
   v2 (Game Design B.9): o chefão é JOGO antes de ser pergunta.
   Três fases de plataforma; cada uma termina num DUELO (ambiente de
   questões, 3 perguntas: 1 fairy+realmb, 2 poem, 3 cause+circle).
   Cada acerto no duelo = uma página voa e acerta o Conde; erro = ele
   ri (não se cura). Antes de cada duelo:
     Fase 1 TINTEIROS: 3 tinteiros acendem um por vez; acertar uma
            ESTRELA no tinteiro aceso derruba (3 de 3 = duelo). O Conde
            joga gotas; a SOMBRA marca no chão onde cai, 0,8 s antes.
     Fase 2 ONDAS: manchas descem em ondas de 3 (pisar ou estrela);
            transformar 6 = duelo. As gotas continuam.
     Fase 3 LETRAS: o Conde escreve e as letras CAEM (sombra avisa);
            sobreviver 18 s = duelo final → ele desiste → FINAL.
   Estrelas: no começo de cada fase o herói recebe 3 (e mais 3 se
   ficar sem nenhuma). Sem game over: dano encolhe / volta ao início
   da sala, e a fase continua de onde estava.
   ============================================================ */
window.CHEFAO = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H, CHAO=450;
var RODADAS=[['fairy','realmb'],['poem'],['cause','circle']];
var C=null;

function falaC(en,pt){ C.fala={en:en,pt:pt,t:0}; try{ say(en); }catch(e){} }
function inicia(L){
  C={x:19.5*45, y:6*45, hp:9, max:9, estado:'idle', et:0, ronda:-1, fase:'fala', t:0, gotas:[], voando:[], letras:[], tinteiros:[], alvo:0, ondas:0, convertidas:0,
     m:{x:19.5*45, y:6*45, tipo:'conde', falando:0, i:0}};
  J.chefe=C; falaC('Ha! The stories are mine! Catch me if you can!','Rá! As histórias são minhas! Me pegue se puder!');
}
function daEstrelas(){ var u=J.urso; u.poderes.estrelas=Math.max(u.poderes.estrelas||0,3); if(window.UI) UI.acao(true,u.poderes.estrelas); }
function comecaFase(n){
  C.fase='p'+n; C.t=0; daEstrelas(); SOM.musica('chefao');
  if(n===1){ C.tinteiros=[{x:4*45,y:6*45},{x:11*45,y:6*45},{x:8*45,y:CHAO}].map(function(p){ return {x:p.x+22,y:p.y,caido:false}; }); C.alvo=0;
    falaC('My magic inkwells! Hit the glowing one with a star!','Meus tinteiros mágicos! Acerte o que brilha com uma estrela!'); }
  if(n===2){ C.convertidas=0; C.ondas=0; falaC('Ink blots, get them!','Manchas, peguem!'); }
  if(n===3){ C.letras=[]; falaC('I will write a BIG word on you!','Vou escrever uma palavra ENORME em você!'); }
}
function itensDa(r){ var ja=J.nivel.quizIds||(J.nivel.quizIds=[]), out=[];
  RODADAS[r].forEach(function(tema,k){ var n=k===0?(RODADAS[r].length>1?2:3):1; QUIZ.escolhe({tema:tema},n,ja).forEach(function(it){ ja.push(it.id); out.push(it); }); });
  return out; }
function duelo(){
  C.ronda++; C.fase='quiz'; C.t=0; C.fala=null; C.gotas=[]; C.letras=[];
  QUIZ.inicia(C.m,{itens:itensDa(C.ronda),
    aoResponder:function(ok){ if(ok){ C.voando.push({x:J.urso.x,y:J.urso.y-60,t:0}); SOM.fx('folha'); } else { C.estado='laugh'; C.et=0; SOM.fx('risada'); } },
    aoTerminar:function(){ if(C.ronda>=2) derrota(); else comecaFase(C.ronda+2); },
    aoSair:function(){ C.ronda--; comecaFase(C.ronda+2); }});
}
function derrota(){
  C.fase='derrota'; C.t=0; C.estado='sad'; C.gotas=[]; C.letras=[]; SOM.musica(''); SOM.fx('vitoria');
  falaC('Oh no… you found the endings.','Ah, não… você achou os finais.');
  setTimeout(function(){ if(J.chefe===C) G.iniciaFinal(); },3200);
}
/* gota: escolhe o ponto do chão perto do herói; a sombra aparece 0,8 s antes */
function novaGota(){ var u=J.urso, alvo=Math.max(40,Math.min(16*45,u.x+(Math.random()-.5)*90)); C.gotas.push({alvo:alvo,t:0,x:alvo,y:-30,cai:false,r:13}); C.estado='write'; C.et=0; }
function novaLetra(){ var u=J.urso, alvo=Math.max(40,Math.min(16*45,u.x+(Math.random()-.5)*160)); C.letras.push({alvo:alvo,t:0,x:alvo,y:-60,ch:'INKBLOT'.charAt(Math.floor(Math.random()*7)),cai:false}); C.estado='write'; C.et=0; }
function atualiza(dt){
  if(!C) return; C.t+=dt; C.et+=dt; if(C.fala) C.fala.t+=dt;
  if(C.estado!=='idle'&&C.estado!=='sad'&&C.et>1) C.estado='idle';
  voa(dt);
  var u=J.urso, R=G.ursoRet(), vivo=J.estado==='nivel'&&u.invT<=0&&u.tontoT<=0;
  if((u.poderes.estrelas||0)<=0&&/^p/.test(C.fase)&&C.t>2) daEstrelas();
  if(C.fase==='fala'&&C.t>3) comecaFase(1);
  else if(C.fase==='p1'){
    if(Math.floor((C.t-dt)/2.2)!==Math.floor(C.t/2.2)) novaGota();
    (J.estrelas||[]).forEach(function(e){ var tq=C.tinteiros[C.alvo]; if(tq&&!tq.caido&&Math.abs(e.x-tq.x)<26&&Math.abs(e.y-(tq.y-24))<34){ tq.caido=true; e.dist=999; C.alvo++; SOM.fx('chefao'); J.shake=6; G.brilho(tq.x,tq.y-30,14,'#a78bfa'); C.estado='hit'; C.et=0; } });
    if(C.alvo>=3&&C.t>.5){ C.fase='espera'; C.t=0; falaC('My inkwells! Fine… answer THIS!','Meus tinteiros! Está bem… responda ISTO!'); setTimeout(function(){ if(C&&C.fase==='espera') duelo(); },1800); }
  }
  else if(C.fase==='p2'){
    if(Math.floor((C.t-dt)/1.9)!==Math.floor(C.t/1.9)) novaGota();
    if(Math.floor((C.t-dt)/3.5)!==Math.floor(C.t/3.5)&&C.ondas<4){ C.ondas++; var M=J.mundo; for(var k=0;k<3;k++) M.inimigos.push({tipo:'tinta',x:15*45-k*55,y:CHAO,x0:15*45-k*55,y0:CHAO,dir:-1,v:55+k*10,voa:false,doConde:true}); }
    var vencidas=J.mundo.inimigos.filter(function(e){ return e.doConde&&(e.morto||e.achatado); }).length;
    if(vencidas>=6||C.t>26){ J.mundo.inimigos.forEach(function(e){ if(e.doConde){ e.achatado=true; e.tAch=.3; } }); C.fase='espera'; C.t=0; falaC('Grr! My blots! Answer THIS!','Grr! Minhas manchas! Responda ISTO!'); setTimeout(function(){ if(C&&C.fase==='espera') duelo(); },1800); }
  }
  else if(C.fase==='p3'){
    if(Math.floor((C.t-dt)/1.4)!==Math.floor(C.t/1.4)&&C.t<17) novaLetra();
    if(C.t>18&&!C.letras.length){ C.fase='espera'; C.t=0; falaC('You are fast… last chance!','Você é rápido… última chance!'); setTimeout(function(){ if(C&&C.fase==='espera') duelo(); },1800); }
  }
  /* gotas e letras: sombra 0,8 s, depois caem retas no alvo */
  [C.gotas,C.letras].forEach(function(lista,ehLetra){
    for(var g=lista.length-1;g>=0;g--){ var d=lista[g]; d.t+=dt;
      if(d.t>.8){ d.cai=true; d.y+=(ehLetra?520:600)*dt; }
      var tam=ehLetra?28:d.r;
      if(d.y>=CHAO-tam){ lista.splice(g,1); J.shake=ehLetra?6:2; G.emite(8,function(){ return {x:d.x,y:CHAO-4,vx:(Math.random()-.5)*160,vy:-60-Math.random()*90,vida:.5,max:.5,tipo:'fogo',cor:ehLetra?'#7c3aed':'#312e81',r:3,g:1}; }); continue; }
      if(vivo&&d.cai&&G.colideRet(R.x+4,R.y,R.w-8,R.h,d.x-tam,d.y-tam,tam*2,tam*2)){ lista.splice(g,1); G.machucado(); } }
  });
}
function voa(dt){
  for(var i=C.voando.length-1;i>=0;i--){ var p=C.voando[i]; p.t+=dt; var k=Math.min(1,p.t/.8); p.cx=p.x+(C.x-p.x)*k; p.cy=p.y+(C.y-60-p.y)*k-Math.sin(k*Math.PI)*120; if(k>=1){ C.voando.splice(i,1); C.hp=Math.max(0,C.hp-1); C.estado='hit'; C.et=0; SOM.fx('chefao'); J.shake=8; G.brilho(C.x,C.y-60,14,'#fde047'); } }
}
function anima(dt){ if(!C) return; C.et+=dt; if(C.estado!=='idle'&&C.estado!=='sad'&&C.et>1) C.estado='idle'; voa(dt); }

function desenha(c,t){
  if(!C) return;
  if(A.conde) A.conde(c,C.x,C.y,C.estado,t);
  /* tinteiros */
  C.tinteiros.forEach(function(tq,i){ c.save(); c.translate(tq.x,tq.y); if(tq.caido) c.rotate(1.3);
    var aceso=!tq.caido&&i===C.alvo&&C.fase==='p1';
    if(aceso){ var g=c.createRadialGradient(0,-24,4,0,-24,46); g.addColorStop(0,'rgba(253,224,71,'+(.5+.3*Math.sin(t*6))+')'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; A.circ(c,0,-24,46); c.fill(); }
    c.fillStyle='#1e1b4b'; A.rr(c,-16,-40,32,40,8); c.fill(); c.fillStyle='#4c1d95'; A.rr(c,-10,-48,20,10,4); c.fill();
    c.strokeStyle='#e9d5ff'; c.lineWidth=3; c.beginPath(); c.moveTo(6,-48); c.quadraticCurveTo(22,-78,30,-92); c.stroke();
    if(tq.caido){ c.fillStyle='#312e81'; A.el(c,8,4,26,6); c.fill(); }
    c.restore(); });
  /* sombras de aviso, gotas e letras */
  [C.gotas,C.letras].forEach(function(lista,ehLetra){ lista.forEach(function(d){
    var k=Math.min(1,d.t/.8); c.fillStyle='rgba(30,27,75,'+(.15+.35*k)+')'; A.el(c,d.alvo,CHAO-2,(ehLetra?30:16)*(.5+.5*k),6); c.fill();
    if(!d.cai) return;
    if(ehLetra){ c.save(); c.fillStyle='#7c3aed'; c.strokeStyle='#2e1065'; c.lineWidth=5; c.font='900 54px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.strokeText(d.ch,d.x,d.y); c.fillText(d.ch,d.x,d.y); c.restore(); }
    else { c.fillStyle='#312e81'; c.beginPath(); c.moveTo(d.x,d.y-d.r*1.6); c.quadraticCurveTo(d.x+d.r,d.y-d.r*.2,d.x,d.y+d.r); c.quadraticCurveTo(d.x-d.r,d.y-d.r*.2,d.x,d.y-d.r*1.6); c.fill(); }
  }); });
  C.voando.forEach(function(p){ if(p.cx===undefined) return; if(A.paginaVoando) A.paginaVoando(c,p.cx,p.cy,p.t*8); });
}
function desenhaTela(c,t){
  if(!C) return;
  var x=W/2-150, y=60; c.fillStyle='rgba(0,0,0,.5)'; A.rr(c,x-6,y-4,312,30,10); c.fill();
  for(var i=0;i<C.max;i++){ var w=(300-(C.max-1)*4)/C.max; c.fillStyle=i<C.hp?A.lin(c,0,y,0,y+22,'#a78bfa','#5b21b6'):'rgba(255,255,255,.15)'; A.rr(c,x+i*(w+4),y,w,22,6); c.fill(); }
  /* objetivo da fase, discreto, embaixo da barra */
  var obj=C.fase==='p1'?['Inkwells: '+C.alvo+' / 3','Tinteiros: '+C.alvo+' / 3']:(C.fase==='p2'?['Blots: '+Math.min(6,J.mundo.inimigos.filter(function(e){ return e.doConde&&(e.morto||e.achatado); }).length)+' / 6','Manchas: …']:(C.fase==='p3'?['Dodge the letters! '+Math.max(0,Math.ceil(18-C.t))+' s','Desvie das letras!']:null));
  if(obj){ c.font='900 16px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='top'; c.fillStyle='#fde68a'; c.strokeStyle='rgba(0,0,0,.6)'; c.lineWidth=4; c.strokeText(obj[0],W/2,y+30); c.fillText(obj[0],W/2,y+30); }
  if(C.fala&&!J.quiz&&C.fala.t<3.5){ c.font='900 19px "Nunito",Arial'; var tw=Math.min(600,c.measureText(C.fala.en).width)+36, bx=Math.max(20,C.x-tw-20), by=C.y-190; c.fillStyle='#ede9fe'; A.rr(c,bx,by,tw,J.tr?62:44,16); c.fill(); c.fillStyle='#2e1065'; c.textAlign='left'; c.textBaseline='top'; c.fillText(C.fala.en,bx+18,by+12); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#6d28d9'; c.fillText(C.fala.pt,bx+18,by+38); } }
}
return {inicia:inicia, atualiza:atualiza, anima:anima, desenha:desenha, desenhaTela:desenhaTela, ativo:function(){ return !!C; }, limpa:function(){ C=null; J.chefe=null; }};
})();
