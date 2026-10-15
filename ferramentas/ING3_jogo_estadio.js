/* ============================================================
   ING3_jogo_estadio.js — Cause & Effect STADIUM (reino 7): pênaltis.
   O juiz mostra o "If…" (a causa) e o gol tem 2 ou 3 alvos com os
   "Then…" possíveis. Tocar no alvo (ou 1/2/3, ← ↑ →) = chutar ali.
   Alvo certo: o goleiro de tinta pula para o outro lado — GOL!
   Alvo errado: o goleiro defende, o alvo certo acende e o juiz
   explica (curto). 9 pênaltis = 3 páginas. Itens: tema 'cause'.
   ============================================================ */
window.ESTADIO = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H;
var GOL={x:230,y:196,w:500,h:170}, BOLA0={x:480,y:470}, N=9;
var S=null;

function inicia(f){
  S={f:f, itens:QUIZ.escolhe({tema:'cause'},N,[]), i:-1, fase:'entra', t:0, gols:0, paginas:0, fala:null, bola:{x:BOLA0.x,y:BOLA0.y,r:16}, goleiro:{x:480,alvo:480,pulo:0}, festa:0};
  J.estado='estadio'; J.stats={perguntas:0,acertos:0}; J.pontos=0; J.estadio=S;
  SOM.musica('estadio'); G.hud(); if(window.UI){ UI.modoNivel(false); UI.modoMapa(false); }
  proximo();
}
function fala(en,pt,cor){ S.fala={en:en,pt:pt,cor:cor||'#fff',t:0}; try{ say(en); }catch(e){} }
function proximo(){
  S.i++; if(S.i>=S.itens.length){ S.fase='fim'; S.t=0; return; }
  var it=S.itens[S.i], ordem=QUIZ.embaralha(it.o.map(function(_,k){ return k; })), n=ordem.length, w=GOL.w/n;
  S.q={it:it, ordem:ordem, alvos:ordem.map(function(oi,k){ return {x:GOL.x+k*w+8, y:GOL.y+12, w:w-16, h:GOL.h-24, txt:it.o[oi], pt:(it.o_pt||[])[oi]||'', certa:oi===it.c, estado:'normal'}; })};
  S.fase='mira'; S.t=0; S.bola={x:BOLA0.x,y:BOLA0.y,r:16}; S.goleiro={x:480,alvo:480,pulo:0};
  fala(it.p,it.p_pt);
}
function chuta(k){
  if(!S||S.fase!=='mira'||!S.q.alvos[k]) return;
  var a=S.q.alvos[k], ok=a.certa; S.fase='chute'; S.t=0; S.alvo=a; S.ok=ok; J.stats.perguntas++; QUIZ.marca(S.q.it.id);
  /* o goleiro vai para outro alvo quando é gol; para o alvo chutado quando defende */
  var outros=S.q.alvos.filter(function(x){ return x!==a; }); var g= ok?outros[Math.floor(Math.random()*outros.length)]:a;
  S.goleiro.alvo=g.x+g.w/2; SOM.fx('pulo');
}
function resultado(){
  var a=S.alvo, ok=S.ok; S.fase='resultado'; S.t=0;
  S.q.alvos.forEach(function(x){ x.estado= x.certa?'certa':(x===a?'errada':'apagada'); });
  if(ok){ S.gols++; J.stats.acertos++; G.pontua(100); SOM.fx('vitoria'); S.festa=1.6; }
  else { SOM.fx('erro'); J.shake=4; }
  var it=S.q.it; fala((ok?'GOAL! ':'Saved! ')+(it.ex||''),(ok?'GOL! ':'Defendeu! ')+(it.ex_pt||''),ok?'#dcfce7':'#fee2e2');
  if(S.i%3===2){ S.paginas++; setTimeout(function(){ if(S) G.toast('You found a lost page! ('+S.paginas+' of 3)',2400,'Você achou uma página perdida! ('+S.paginas+' de 3)'); },800); }
}
function atualiza(dt){
  if(!S) return; S.t+=dt; if(S.fala) S.fala.t+=dt; if(S.festa>0) S.festa-=dt;
  var g=S.goleiro; g.x+=(g.alvo-g.x)*Math.min(1,dt*(S.fase==='chute'?7:3)); if(S.fase==='mira') g.alvo=480+Math.sin(J.t*1.6)*60;
  if(S.fase==='chute'){ var k=Math.min(1,S.t/.6), a=S.alvo, tx=a.x+a.w/2, ty=a.y+a.h*.45; S.bola.x=BOLA0.x+(tx-BOLA0.x)*k; S.bola.y=BOLA0.y+(ty-BOLA0.y)*k-Math.sin(k*Math.PI)*60; S.bola.r=16-k*6; if(k>=1) resultado(); }
  else if(S.fase==='resultado'){ if(S.t>3.4) proximo(); }
  else if(S.fase==='fim'&&S.t>1.5&&!S.acabou){ S.acabou=true; termina(); }
}
function termina(){ var f=S.f; J.nivel={moradores:[1,2,3].map(function(k){ return {feito:S.paginas>=k}; })}; J.mundo=null; J.faseAtual=f; J.urso={estado:'cheer',anim:0}; G.fimDeFase(); S=null; J.estadio=null; }
function toque(lx,ly){ if(!S) return false; if(S.fase!=='mira') return true; for(var k=0;k<S.q.alvos.length;k++){ var a=S.q.alvos[k]; if(lx>a.x&&lx<a.x+a.w&&ly>a.y-30&&ly<a.y+a.h){ chuta(k); return true; } } return true; }
function tecla(k){ if(!S) return false; var n=S.q?S.q.alvos.length:0; var m={'1':0,'2':1,'3':2,ArrowLeft:0,ArrowUp:n===3?1:-1,ArrowRight:n-1}; if(m[k]!==undefined&&m[k]>=0){ chuta(m[k]); return true; } return false; }

/* ---------- desenho ---------- */
function quebra(c,txt,larg){ var pal=String(txt).split(' '), linhas=[], cur=''; pal.forEach(function(w){ var t=cur?cur+' '+w:w; if(c.measureText(t).width>larg&&cur){ linhas.push(cur); cur=w; } else cur=t; }); if(cur) linhas.push(cur); return linhas; }
function desenha(c){
  if(!S) return; var t=J.t;
  /* noite de jogo: céu, refletores, torcida */
  var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#0f172a'); g.addColorStop(.4,'#1e3a8a'); g.addColorStop(1,'#1e3a8a'); c.fillStyle=g; c.fillRect(0,0,W,H);
  [[60,40],[900,40]].forEach(function(p){ c.fillStyle='#94a3b8'; c.fillRect(p[0]-3,p[1],6,150); c.fillStyle='#fef9c3'; A.rr(c,p[0]-26,p[1]-14,52,22,5); c.fill(); var rg=c.createRadialGradient(p[0],p[1],4,p[0],p[1],160); rg.addColorStop(0,'rgba(254,249,195,.45)'); rg.addColorStop(1,'rgba(254,249,195,0)'); c.fillStyle=rg; A.circ(c,p[0],p[1],160); c.fill(); });
  c.fillStyle='#334155'; c.fillRect(0,150,W,70);
  for(var k=0;k<120;k++){ var px=(k*8.3)%W, py=158+(k%5)*11; c.fillStyle=['#f87171','#fbbf24','#60a5fa','#4ade80','#f472b6','#fff'][k%6]; A.circ(c,px,py+(S.festa>0?Math.sin(t*8+k)*4:Math.sin(t*3+k)*1.5),4.5); c.fill(); }
  /* gramado listrado em perspectiva */
  for(var i=0;i<8;i++){ c.fillStyle=i%2?'#15803d':'#16a34a'; c.fillRect(0,220+i*40,W,40); }
  c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=3; c.beginPath(); c.moveTo(150,366); c.lineTo(810,366); c.lineTo(870,520); c.moveTo(150,366); c.lineTo(90,520); c.stroke(); A.circ(c,480,470,4); c.fillStyle='#fff'; c.fill();
  /* o gol e os alvos */
  c.fillStyle='rgba(255,255,255,.12)'; c.fillRect(GOL.x,GOL.y,GOL.w,GOL.h);
  c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; for(var x=GOL.x;x<=GOL.x+GOL.w;x+=20){ c.beginPath(); c.moveTo(x,GOL.y); c.lineTo(x,GOL.y+GOL.h); c.stroke(); } for(var y=GOL.y;y<=GOL.y+GOL.h;y+=20){ c.beginPath(); c.moveTo(GOL.x,y); c.lineTo(GOL.x+GOL.w,y); c.stroke(); }
  if(S.q) S.q.alvos.forEach(function(a){ alvo(c,a,t); });
  c.fillStyle='#f8fafc'; c.fillRect(GOL.x-10,GOL.y-10,10,GOL.h+10); c.fillRect(GOL.x+GOL.w,GOL.y-10,10,GOL.h+10); c.fillRect(GOL.x-10,GOL.y-10,GOL.w+20,10);
  goleiro(c,t);
  /* o herói ao lado da bola */
  if(window.CENA) CENA.heroi(c,410,500,S.fase==='chute'&&S.t<.25?'walk':(S.festa>0?'cheer':'idle'),t,1,1.05,J.prog.heroi);
  c.fillStyle='rgba(0,0,0,.25)'; A.el(c,S.bola.x,S.fase==='chute'?S.bola.y+12:BOLA0.y+12,S.bola.r,4); c.fill();
  bola(c,S.bola.x,S.bola.y,S.bola.r,t);
  /* placar */
  c.fillStyle='rgba(13,11,30,.8)'; A.rr(c,W-170,470,150,48,12); c.fill(); c.fillStyle='#fde68a'; c.font='900 22px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('GOALS '+S.gols+'/'+N,W-95,494);
  juiz(c,t);
}
function alvo(c,a,t){
  var cor= a.estado==='certa'?['rgba(34,197,94,.9)','#dcfce7']:(a.estado==='errada'?['rgba(239,68,68,.9)','#fee2e2']:(a.estado==='apagada'?['rgba(168,162,158,.6)','rgba(245,245,244,.5)']:['rgba(253,224,71,.95)','#fffbeb']));
  c.save(); c.fillStyle=cor[1]; A.rr(c,a.x,a.y+a.h*.18,a.w,a.h*.64,14); c.fill(); c.strokeStyle=cor[0]; c.lineWidth=5; c.setLineDash(a.estado==='normal'?[10,6]:[]); A.rr(c,a.x,a.y+a.h*.18,a.w,a.h*.64,14); c.stroke(); c.setLineDash([]);
  c.fillStyle=a.estado==='apagada'?'rgba(30,27,58,.45)':'#1e1b3a'; c.textAlign='center'; c.textBaseline='middle'; var fs=17; c.font='900 '+fs+'px "Nunito",Arial'; var linhas=quebra(c,a.txt,a.w-20); if(linhas.length>3){ fs=14; c.font='900 14px "Nunito",Arial'; linhas=quebra(c,a.txt,a.w-16); }
  var lh=fs*1.15, extra=J.tr&&a.pt?14:0, y0=a.y+a.h/2-(linhas.length-1)*lh/2-extra/2; linhas.forEach(function(l,k){ c.fillText(l,a.x+a.w/2,y0+k*lh); });
  if(extra){ c.font='700 12px "Nunito",Arial'; c.fillStyle='#6b5d4f'; c.fillText(a.pt,a.x+a.w/2,y0+linhas.length*lh); }
  c.restore();
}
function goleiro(c,t){ /* mancha de tinta de luvas: cômica */
  var g=S.goleiro, y=GOL.y+GOL.h-6, salto=S.fase==='chute'?Math.sin(Math.min(1,S.t/.6)*Math.PI)*40:0;
  c.save(); c.translate(g.x,y-salto); var inc=(g.alvo-g.x)*.004; c.rotate(Math.max(-.6,Math.min(.6,inc)));
  var gr=c.createRadialGradient(-6,-34,3,0,-26,34); gr.addColorStop(0,'#6366f1'); gr.addColorStop(1,'#1e1b4b'); c.fillStyle=gr; A.el(c,0,-28,28,30); c.fill();
  c.fillStyle='#fde047'; A.circ(c,-30,-38,9); c.fill(); A.circ(c,30,-38,9); c.fill();
  c.fillStyle='#fff'; A.el(c,-8,-34,6,7); c.fill(); A.el(c,8,-34,6,7); c.fill(); c.fillStyle='#111'; A.circ(c,-7,-33,3); c.fill(); A.circ(c,9,-33,3); c.fill();
  c.restore();
}
function bola(c,x,y,r,t){ c.save(); c.translate(x,y); c.fillStyle='#fff'; A.circ(c,0,0,r); c.fill(); c.strokeStyle='#111'; c.lineWidth=1.5; c.stroke(); c.fillStyle='#111'; c.rotate(t*(S.fase==='chute'?12:0)); for(var i=0;i<5;i++){ var a=i*1.2566; A.circ(c,Math.cos(a)*r*.55,Math.sin(a)*r*.55,r*.2); c.fill(); } A.circ(c,0,0,r*.25); c.fill(); c.restore(); }
function juiz(c,t){
  var f=S.fala; if(A.morador) A.morador(c,'referee',62,150,t,1,f&&f.t<2); if(!f) return;
  c.font='900 20px "Nunito",Arial'; var linhas=quebra(c,f.en,720); c.font='700 14px "Nunito",Arial'; var lpt=J.tr&&f.pt?quebra(c,f.pt,720):[];
  var h=18+linhas.length*25+(lpt.length?4+lpt.length*18:0), bx=128, by=58, bw=744;
  c.save(); c.shadowColor='rgba(0,0,0,.35)'; c.shadowBlur=10; c.fillStyle=f.cor; A.rr(c,bx,by,bw,h,18); c.fill(); c.restore();
  c.fillStyle=f.cor; c.beginPath(); c.moveTo(bx+4,by+22); c.lineTo(bx-14,by+34); c.lineTo(bx+4,by+38); c.fill();
  c.fillStyle='#1e1b3a'; c.textAlign='left'; c.textBaseline='top'; c.font='900 20px "Nunito",Arial'; linhas.forEach(function(l,k){ c.fillText(l,bx+16,by+11+k*25); });
  if(lpt.length){ c.fillStyle='#6b5d4f'; c.font='700 14px "Nunito",Arial'; lpt.forEach(function(l,k){ c.fillText(l,bx+16,by+13+linhas.length*25+k*18); }); }
  if(S.fase==='mira'&&!J.prog.estadioVisto){ c.save(); c.globalAlpha=.75+.25*Math.sin(t*4); c.fillStyle='rgba(13,11,30,.8)'; A.rr(c,W/2-170,GOL.y+GOL.h+12,340,32,16); c.fill(); c.fillStyle='#fde68a'; c.textAlign='center'; c.textBaseline='middle'; c.font='900 17px "Nunito",Arial'; c.fillText('Tap where you want to kick!',W/2,GOL.y+GOL.h+28); c.restore(); }
  if(S.fase==='resultado') J.prog.estadioVisto=true;
}

return {inicia:inicia, atualiza:atualiza, desenha:desenha, toque:toque, tecla:tecla};
})();
