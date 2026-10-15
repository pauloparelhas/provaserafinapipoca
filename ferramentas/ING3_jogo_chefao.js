/* ============================================================
   ING3_jogo_chefao.js — Inkwell Castle: o Conde Rabisco (reino 9).
   Uma sala só. O Conde, na sacada, faz 3 RODADAS de 3 perguntas
   (1: contos de fadas + real/make-believe; 2: poemas; 3: causa e
   efeito + circle story), nas mesmas placas do quiz. Cada acerto vira
   uma página que voa e acerta o Conde; erro = ele ri (não se cura).
   Entre as rodadas, ele joga gotas de tinta devagar: pular e desviar.
   Depois da 3ª rodada ele desiste e vem o FINAL (motor2: 'final'),
   que termina na biblioteca, com o mesmo biscoito do começo.
   ============================================================ */
window.CHEFAO = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;
var RODADAS=[['fairy','realmb'],['poem'],['cause','circle']], LUTA=6;
var C=null;

function inicia(L){
  C={x:19.5*45, y:6*45, hp:9, max:9, estado:'idle', et:0, ronda:-1, fase:'fala', t:0, gotas:[], voando:[], m:{x:19.5*45, y:6*45, tipo:'conde', falando:0, i:0}, fala:{en:'Ha! The stories are mine! Can you answer my questions?', pt:'Rá! As histórias são minhas! Você consegue responder às minhas perguntas?', t:0}};
  J.chefe=C; try{ say(C.fala.en); }catch(e){}
}
function itensDa(r){ var ja=J.nivel.quizIds||(J.nivel.quizIds=[]), out=[];
  RODADAS[r].forEach(function(tema,k){ var n=k===0?(RODADAS[r].length>1?2:3):1; QUIZ.escolhe({tema:tema},n,ja).forEach(function(it){ ja.push(it.id); out.push(it); }); });
  return out; }
function rodada(){
  C.ronda++; C.fase='quiz'; C.t=0; C.fala=null;
  QUIZ.inicia(C.m,{itens:itensDa(C.ronda), baseX:60, camX:0, chao:450,
    aoResponder:function(ok){ if(ok){ C.voando.push({x:J.urso.x,y:J.urso.y-60,t:0}); SOM.fx('folha'); } else { C.estado='laugh'; C.et=0; SOM.fx('risada'); } },
    aoTerminar:function(){ fimRodada(); }, aoSair:function(){ C.fase='luta'; C.t=0; C.ronda--; }});
}
function fimRodada(){
  if(C.ronda>=RODADAS.length-1){ derrota(); return; }
  C.fase='luta'; C.t=0; C.fala={en:['Watch out for my ink!','Ink, ink, everywhere!'][C.ronda%2], pt:['Cuidado com a minha tinta!','Tinta, tinta, para todo lado!'][C.ronda%2], t:0};
}
function derrota(){
  C.fase='derrota'; C.t=0; C.estado='sad'; C.gotas=[]; SOM.musica(''); SOM.fx('vitoria');
  C.fala={en:'Oh no… you found the endings.', pt:'Ah, não… você achou os finais.', t:0};
  setTimeout(function(){ if(J.chefe===C) G.iniciaFinal(); },3200);
}
function atualiza(dt){
  if(!C) return; C.t+=dt; C.et+=dt; if(C.fala) C.fala.t+=dt; if(C.m.falando>0) C.m.falando-=dt;
  if(C.estado!=='idle'&&C.estado!=='sad'&&C.et>1) C.estado='idle';
  /* páginas voando até o Conde */
  for(var i=C.voando.length-1;i>=0;i--){ var p=C.voando[i]; p.t+=dt; var k=Math.min(1,p.t/.8); p.cx=p.x+(C.x-p.x)*k; p.cy=p.y+(C.y-60-p.y)*k-Math.sin(k*Math.PI)*120; if(k>=1){ C.voando.splice(i,1); C.hp=Math.max(0,C.hp-1); C.estado='hit'; C.et=0; SOM.fx('chefao'); J.shake=8; G.brilho(C.x,C.y-60,14,'#fde047'); } }
  if(C.fase==='fala'&&C.t>3) rodada();
  else if(C.fase==='luta'){
    if(Math.floor((C.t-dt)/1.7)!==Math.floor(C.t/1.7)&&C.t<LUTA-1){ var u=J.urso, dx=u.x-C.x; C.gotas.push({x:C.x-30,y:C.y-70,vx:dx/1.4,vy:-260,r:12}); C.estado='write'; C.et=0; SOM.fx('clique'); }
    if(C.t>LUTA&&!C.gotas.length) rodada();
  }
  var u=J.urso, R=G.ursoRet();
  for(var g=C.gotas.length-1;g>=0;g--){ var d=C.gotas[g]; d.vy+=420*dt; d.x+=d.vx*dt; d.y+=d.vy*dt;
    if(d.y>=450-d.r){ C.gotas.splice(g,1); G.emite(8,function(){ return {x:d.x,y:448,vx:(Math.random()-.5)*160,vy:-60-Math.random()*90,vida:.5,max:.5,tipo:'fogo',cor:'#312e81',r:3,g:1}; }); continue; }
    if(J.estado==='nivel'&&u.invT<=0&&G.colideRet(R.x+4,R.y,R.w-8,R.h,d.x-d.r,d.y-d.r,d.r*2,d.r*2)){ C.gotas.splice(g,1); G.machucado(); } }
}
function desenha(c,t){
  if(!C) return;
  if(A.conde) A.conde(c,C.x,C.y,C.estado,t); else { c.fillStyle='#4c1d95'; A.rr(c,C.x-30,C.y-120,60,120,20); c.fill(); }
  C.gotas.forEach(function(d){ c.fillStyle='#312e81'; c.beginPath(); c.moveTo(d.x,d.y-d.r*1.6); c.quadraticCurveTo(d.x+d.r,d.y-d.r*.2,d.x,d.y+d.r); c.quadraticCurveTo(d.x-d.r,d.y-d.r*.2,d.x,d.y-d.r*1.6); c.fill(); c.fillStyle='rgba(199,210,254,.6)'; A.circ(c,d.x-3,d.y-2,3); c.fill(); });
  C.voando.forEach(function(p){ if(p.cx===undefined) return; if(A.paginaVoando) A.paginaVoando(c,p.cx,p.cy,p.t*8); else { c.fillStyle='#fffbeb'; A.rr(c,p.cx-12,p.cy-16,24,32,4); c.fill(); } });
}
function desenhaTela(c,t){
  if(!C) return;
  /* barra do Conde */
  var x=W/2-150, y=60; c.fillStyle='rgba(0,0,0,.5)'; A.rr(c,x-6,y-4,312,30,10); c.fill();
  for(var i=0;i<C.max;i++){ var w=(300-(C.max-1)*4)/C.max; c.fillStyle=i<C.hp?A.lin(c,0,y,0,y+22,'#a78bfa','#5b21b6'):'rgba(255,255,255,.15)'; A.rr(c,x+i*(w+4),y,w,22,6); c.fill(); }
  /* fala do Conde fora do quiz */
  if(C.fala&&!J.quiz&&C.fala.t<4){ c.font='900 20px "Nunito",Arial'; var tw=Math.min(560,c.measureText(C.fala.en).width)+36, bx=C.x-tw-20, by=C.y-190; c.fillStyle='#ede9fe'; A.rr(c,bx,by,tw,J.tr?62:44,16); c.fill(); c.fillStyle='#2e1065'; c.textAlign='left'; c.textBaseline='top'; c.fillText(C.fala.en,bx+18,by+11); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#6d28d9'; c.fillText(C.fala.pt,bx+18,by+38); } }
}
/* durante o ambiente de questões: só as animações (páginas voando, expressão do Conde) */
function anima(dt){ if(!C) return; C.et+=dt; if(C.estado!=='idle'&&C.estado!=='sad'&&C.et>1) C.estado='idle';
  for(var i=C.voando.length-1;i>=0;i--){ var p=C.voando[i]; p.t+=dt; if(p.t>=.8){ C.voando.splice(i,1); C.hp=Math.max(0,C.hp-1); C.estado='hit'; C.et=0; SOM.fx('chefao'); } } }
return {inicia:inicia, atualiza:atualiza, anima:anima, desenha:desenha, desenhaTela:desenhaTela, ativo:function(){ return !!C; }, limpa:function(){ C=null; J.chefe=null; }};
})();
