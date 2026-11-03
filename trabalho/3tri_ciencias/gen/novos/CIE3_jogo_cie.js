/* ============================================================
   CIE3_jogo_cie.js — o que só existe em Motion Rangers (window.CIE3X):
     · figura do material no quadro da pergunta (it.img);
     · cabo de guerra (pull) na 2ª porta do estádio;
     · escorregador y (slide) e plataforma giratória z (spin), fase 6;
     · barco a vela (fase 4), pipa e tênis/corda nos suportes;
     · bichos da corrida (rivais) vistos de costas;
     · lata rolando (perigo da fase 6).
   GERADO: copiado de trabalho/3tri_ciencias/gen/novos/ por fork_jogo.py.
   ============================================================ */
window.CIE3X=(function(){
'use strict';
var A=window.ARTE, T=45, TAU=Math.PI*2;
/* ---------- figura da pergunta ---------- */
var IMG={};
function img(src){ if(!IMG[src]){ IMG[src]=new Image(); IMG[src].src=src; } return IMG[src]; }
function figura(c,src,x,y,w,h){ var im=img(src); c.save(); c.fillStyle='#fff'; A.rr(c,x,y,w,h,14); c.fill();
  if(im.complete&&im.naturalWidth){ var k=Math.min((w-12)/im.naturalWidth,(h-12)/im.naturalHeight), iw=im.naturalWidth*k, ih=im.naturalHeight*k; c.drawImage(im,x+(w-iw)/2,y+(h-ih)/2,iw,ih); }
  c.strokeStyle='#f59e0b'; c.lineWidth=4; A.rr(c,x,y,w,h,14); c.stroke(); c.restore(); }
/* ---------- cabo de guerra: acertar puxa o nó para o lado do herói ---------- */
function corda(c,t,q,F){ var x0=214, x1=624, y=316, q0=q.i+(q.fase==='resposta'?1:0), erros=q0-q.acertos, alvo=(x0+x1)/2+(erros-q.acertos)*48;
  q.nx=q.nx===undefined?(x0+x1)/2:q.nx+(alvo-q.nx)*.06;
  c.save(); c.fillStyle='rgba(13,11,30,.55)'; A.rr(c,x0-12,y-74,x1-x0+24,96,16); c.fill();
  c.strokeStyle='#a16207'; c.lineWidth=7; c.beginPath(); c.moveTo(x0+30,y-24); c.lineTo(x1-30,y-24); c.stroke();
  c.strokeStyle='#fff'; c.lineWidth=2; c.setLineDash([4,5]); c.beginPath(); c.moveTo((x0+x1)/2,y-56); c.lineTo((x0+x1)/2,y+8); c.stroke(); c.setLineDash([]);
  c.fillStyle='#ef4444'; A.circ(c,q.nx,y-24,11); c.fill();
  if(window.CENA){ c.save(); c.translate(x0+28,y+12); c.scale(.62,.62); CENA.heroi(c,0,0,'cheer',t,1,1,JOGO.J.prog.heroi); c.restore(); }
  if(A.morador){ c.save(); c.translate(x0+70,y+12); c.scale(.5,.5); A.morador(c,'max',0,0,t,1,false); c.restore(); }
  if(A.gust){ c.save(); c.translate(x1-34,y+4); c.scale(1.5,1.5); A.gust(c,{x:0,y:0},t); c.restore(); }
  c.fillStyle='#fde68a'; c.font=F(900,16); c.textAlign='center'; c.textBaseline='middle'; c.fillText('PULL! Right answer = pull',(x0+x1)/2,y-58);
  if(JOGO.J.tr){ c.font=F(700,12); c.fillText('PUXE! Resposta certa = puxar',(x0+x1)/2,y+14); }
  c.restore(); }
/* ---------- aparelhos novos ---------- */
function parse(ch,x,y,L){
  if(ch==='y'){ L.plats.push({x:x,y:y,w:T,h:18,desliza:true}); return true; }
  if(ch==='z'){ L.plats.push({x:x,y:y,w:2*T,h:18,giro:true,cx:x,cy:y,fase:x*.01}); return true; }
  return false; }
function atualiza(dt,J,G){ var M=J.mundo, u=J.urso; if(!M||!u) return;
  M.plats.forEach(function(p){ if(!p.giro) return; var a=J.t*TAU/5+p.fase, nx=p.cx+Math.cos(a)*62, ny=p.cy+Math.sin(a)*62, dx=nx-p.x, dy=ny-p.y; p.vyAnt=Math.max(0,dy); p.x=nx; p.y=ny; if(u.sobre===p&&u.noChao){ u.x+=dx; u.y=ny; } });
  if(u.sobre&&u.sobre.desliza&&u.noChao){ u.x+=280*dt; u.dir=1; } }
function plataforma(c,p,t){
  if(p.desliza){ c.save(); var g=c.createLinearGradient(0,p.y,0,p.y+18); g.addColorStop(0,'#c4b5fd'); g.addColorStop(1,'#7c3aed'); c.fillStyle=g; A.rr(c,p.x,p.y,p.w+1,18,4); c.fill(); c.fillStyle='rgba(255,255,255,.75)'; for(var i=0;i<2;i++){ var ax=p.x+8+i*20; c.beginPath(); c.moveTo(ax,p.y+4); c.lineTo(ax+8,p.y+9); c.lineTo(ax,p.y+14); c.fill(); } c.restore(); return true; }
  if(p.giro){ c.save(); c.strokeStyle='#f97316'; c.lineWidth=5; c.beginPath(); c.moveTo(p.cx+T,p.cy+9); c.lineTo(p.x+T,p.y+9); c.stroke(); c.fillStyle='#f97316'; A.circ(c,p.cx+T,p.cy+9,9); c.fill(); c.fillStyle='#fed7aa'; A.rr(c,p.x,p.y,p.w,18,9); c.fill(); c.strokeStyle='#c2410c'; c.lineWidth=3; A.rr(c,p.x,p.y,p.w,18,9); c.stroke(); c.restore(); return true; }
  return false; }
function barco(c,p,t){ c.save(); c.translate(p.x,p.y); c.fillStyle='#b45309'; c.beginPath(); c.moveTo(0,0); c.lineTo(p.w,0); c.lineTo(p.w-16,24); c.lineTo(16,24); c.closePath(); c.fill(); c.fillStyle='#fde68a'; c.fillRect(0,0,p.w,4);
  c.strokeStyle='#78350f'; c.lineWidth=4; c.beginPath(); c.moveTo(p.w/2,0); c.lineTo(p.w/2,-100); c.stroke(); c.fillStyle='#fff'; c.beginPath(); c.moveTo(p.w/2+3,-98); c.quadraticCurveTo(p.w/2+50+Math.sin(t*2)*5,-60,p.w/2+3,-16); c.closePath(); c.fill(); c.restore(); }
/* ---------- objetos da fase nos suportes ---------- */
function pipa(c,t){ c.save(); c.translate(0,-120+Math.sin(t*2)*5); c.rotate(.2); c.fillStyle='#ec4899'; c.beginPath(); c.moveTo(0,-30); c.lineTo(22,0); c.lineTo(0,34); c.lineTo(-22,0); c.closePath(); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2; c.beginPath(); c.moveTo(0,-30); c.lineTo(0,34); c.moveTo(-22,0); c.lineTo(22,0); c.stroke(); c.strokeStyle='#78350f'; c.beginPath(); c.moveTo(0,34); c.quadraticCurveTo(12,70,-4,110); c.stroke(); c.restore(); }
function tenis(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='#2563eb'; A.rr(c,-14,-14,28,14,6); c.fill(); c.fillStyle='#fff'; c.fillRect(-16,-3,34,4); c.fillStyle='#fde047'; c.fillRect(-6,-13,3,8); c.fillRect(0,-13,3,8); c.restore(); }
function rolo(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.strokeStyle='#a16207'; c.lineWidth=5; [14,9,4].forEach(function(r){ A.circ(c,0,-16,r); c.stroke(); }); c.restore(); }
function pipaNoHeroi(c,u,s,t){ var hh=88*s; c.save(); c.translate(u.x-u.dir*18,u.y-hh-70+Math.sin(t*2)*4); c.strokeStyle='#78350f'; c.lineWidth=1.5; c.beginPath(); c.moveTo(0,20); c.lineTo(u.dir*18,66); c.stroke(); c.rotate(.2); c.scale(.8,.8); c.fillStyle='#ec4899'; c.beginPath(); c.moveTo(0,-26); c.lineTo(20,0); c.lineTo(0,28); c.lineTo(-20,0); c.closePath(); c.fill(); c.restore(); }
function caixaLatas(c,x,y,tr){ c.save(); c.translate(x,y); c.fillStyle='#a16207'; A.rr(c,-14,-36,62,36,4); c.fill(); c.strokeStyle='#78350f'; c.lineWidth=3; A.rr(c,-14,-36,62,36,4); c.stroke(); [[0,-50],[28,-50],[14+tr,-74]].forEach(function(p){ c.fillStyle='#94a3b8'; A.rr(c,p[0]-11,p[1]-10,22,24,3); c.fill(); c.fillStyle='#ef4444'; c.fillRect(p[0]-11,p[1],22,5); }); c.restore(); }
function lata(c,b){ c.save(); c.translate(b.x,b.y); c.rotate(b.rot); c.fillStyle='#94a3b8'; A.circ(c,0,0,b.r); c.fill(); c.strokeStyle='#475569'; c.lineWidth=3; A.circ(c,0,0,b.r); c.stroke(); c.fillStyle='#e2e8f0'; A.circ(c,0,0,b.r*.6); c.fill(); c.fillStyle='#ef4444'; c.fillRect(-b.r*.6,-2,b.r*1.2,4); c.restore(); }
/* ---------- corrida: bichos e heróis de costas ---------- */
var BICHO={dragon:['#38bdf8','peixe'],knight:['#fbbf24','passaro'],fairy:['#92400e','macaco'],witch:['#d97706','cao'],frog:['#a16207','canguru'],wolf:['#22c55e','sapo'],red:['#65a30d','cobra'],princess:['#f9a8d4','coelho'],pig:['#a8a29e','gato'],count:['#94a3b8','giro']};
var HEROI={helmet:'#2563eb',pony:'#c026d3',yellow:'#eab308',fisher:'#16a34a'};
function corpoTras(c,id,o,t){ var cor=(BICHO[id]||[o.cor||HEROI[id]||'#2563eb'])[0]; if(!BICHO[id]&&!HEROI[id]) return undefined;
  if(HEROI[id]&&o.cor) cor=o.cor; c.fillStyle=cor; A.rr(c,-34,-44,68,40,12); c.fill(); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(-34,-18,68,6); c.fillStyle='#fff'; A.rr(c,-14,-40,28,14,6); c.fill(); return -46; }
function cabeca(c,id,o,t){ var b=BICHO[id];
  if(HEROI[id]){ c.fillStyle='#f2c9a0'; A.circ(c,0,-4,14); c.fill();
    if(id==='helmet'){ c.fillStyle='#2563eb'; c.beginPath(); c.arc(0,-6,16,Math.PI,0); c.fill(); }
    if(id==='pony'){ c.fillStyle='#78350f'; A.circ(c,0,-8,14); c.fill(); A.el(c,0,10,6,14); c.fill(); }
    if(id==='yellow'){ c.fillStyle='#1c1917'; c.beginPath(); c.arc(0,-6,15,Math.PI,0); c.fill(); }
    if(id==='fisher'){ c.fillStyle='#16a34a'; A.el(c,0,-12,20,5); c.fill(); A.rr(c,-11,-24,22,12,5); c.fill(); }
    return true; }
  if(!b) return false; c.fillStyle=b[0]; A.circ(c,0,-4,15); c.fill();
  switch(b[1]){
    case 'peixe': c.beginPath(); c.moveTo(-6,-16); c.lineTo(0,-30); c.lineTo(6,-16); c.fill(); break;
    case 'passaro': c.fillStyle='#f59e0b'; [-1,1].forEach(function(l){ A.el(c,l*18,-2+Math.sin(t*9)*3,9,4,l*.5); c.fill(); }); break;
    case 'macaco': [-1,1].forEach(function(l){ A.circ(c,l*15,-6,6); c.fill(); }); c.strokeStyle=b[0]; c.lineWidth=4; c.beginPath(); c.moveTo(0,8); c.quadraticCurveTo(24,14,20,-14); c.stroke(); break;
    case 'cao': [-1,1].forEach(function(l){ A.el(c,l*14,-2,5,11); c.fill(); }); break;
    case 'canguru': [-1,1].forEach(function(l){ A.el(c,l*7,-22,4,11); c.fill(); }); break;
    case 'sapo': [-1,1].forEach(function(l){ A.circ(c,l*9,-16,6); c.fill(); }); break;
    case 'cobra': c.strokeStyle=b[0]; c.lineWidth=7; c.beginPath(); c.moveTo(0,8); c.quadraticCurveTo(18,-2,0,-6); c.stroke(); break;
    case 'coelho': [-1,1].forEach(function(l){ A.el(c,l*6,-24,4,13); c.fill(); }); break;
    case 'gato': [-1,1].forEach(function(l){ c.beginPath(); c.moveTo(l*5,-16); c.lineTo(l*13,-26); c.lineTo(l*14,-11); c.fill(); }); break;
    case 'giro': c.fillStyle='#e2e8f0'; A.el(c,0,-16,20,6); c.fill(); break;
  }
  return true; }
return {figura:figura, corda:corda, parse:parse, atualiza:atualiza, plataforma:plataforma, barco:barco, pipa:pipa, tenis:tenis, rolo:rolo, pipaNoHeroi:pipaNoHeroi, lata:lata, caixaLatas:caixaLatas, corpoTras:corpoTras, cabeca:cabeca};
})();
