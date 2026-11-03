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
  if(ch==='}'){ L.ventos=L.ventos||[]; L.ventos.push({x:x-2*T,y:y-3*T,w:5*T,h:6*T,vy:-260}); return true; } /* vento que AJUDA: corrente que sobe */
  return false; }
function atualiza(dt,J,G){ var M=J.mundo, u=J.urso; if(!M||!u) return;
  M.plats.forEach(function(p){ if(!p.giro) return; var a=J.t*TAU/5+p.fase, nx=p.cx+Math.cos(a)*62, ny=p.cy+Math.sin(a)*62, dx=nx-p.x, dy=ny-p.y; p.vyAnt=Math.max(0,dy); p.x=nx; p.y=ny; if(u.sobre===p&&u.noChao){ u.x+=dx; u.y=ny; } });
  if(u.sobre&&u.sobre.desliza&&u.noChao){ u.x+=280*dt; u.dir=1; }
  /* o pião (fase 6) derruba as latas que rolam */
  (J.estrelas||[]).forEach(function(e){ if(e.skin!=='piao') return; var L=J.troncosVivos||[]; for(var i=L.length-1;i>=0;i--){ var b=L[i]; if(Math.abs(e.x-b.x)<b.r+18&&Math.abs(e.y-b.y)<b.r+26){ L.splice(i,1); G.brilho(b.x,b.y,8,'#fde047'); if(G.pontua) G.pontua(40,b.x,b.y-30); if(!J.avisoPiao){ J.avisoPiao=1; G.toast('The top knocked the can over!',1600,'O pião derrubou a lata!'); } } } }); }
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

/* ============================================================ REFEITURA 03/11: os poderes da fase
   1 raquete (bola de tênis que QUICA) · 2 avião de papel (plana) · 3 tênis de escalada (pulo duplo)
   4 roupa de banho · 5 pipa · 6 pião (gira e derruba latas) · 8 bicicleta (montaria: andar de bike é empurrar) */
var OL='#2a2018';
function fsk(c,f,lw){ c.fillStyle=f; c.fill(); c.strokeStyle=OL; c.lineWidth=lw||2; c.stroke(); }
function bolaTenis(c,x,y,r,rot){ c.save(); c.translate(x,y); c.rotate(rot||0); A.circ(c,0,0,r); fsk(c,'#d9f24a',1.6); c.strokeStyle='#fff'; c.lineWidth=r*.16; c.beginPath(); c.arc(-r*1.05,0,r*.8,-.9,.9); c.stroke(); c.beginPath(); c.arc(r*1.05,0,r*.8,Math.PI-.9,Math.PI+.9); c.stroke(); c.restore(); }
function raquete(c,x,y,s,a){ c.save(); c.translate(x,y); c.rotate(a||0); c.scale(s,s); A.rr(c,-3.5,-44,7,44,2); fsk(c,'#334155',1.4); A.el(c,0,-72,20,27); c.lineWidth=5; c.strokeStyle='#dc2626'; c.stroke(); c.save(); A.el(c,0,-72,18,25); c.clip(); c.strokeStyle='rgba(51,65,85,.55)'; c.lineWidth=1; for(var k=-18;k<=18;k+=6){ c.beginPath(); c.moveTo(k,-100); c.lineTo(k,-44); c.stroke(); c.beginPath(); c.moveTo(-20,-72+k); c.lineTo(20,-72+k); c.stroke(); } c.restore(); c.restore(); }
function aviao(c,x,y,s,a){ c.save(); c.translate(x,y); c.rotate(a||0); c.scale(s,s);
  c.beginPath(); c.moveTo(34,0); c.lineTo(-30,-16); c.lineTo(-14,0); c.closePath(); fsk(c,'#ffffff',1.8);
  c.beginPath(); c.moveTo(34,0); c.lineTo(-30,14); c.lineTo(-14,0); c.closePath(); fsk(c,'#dbeafe',1.8);
  c.beginPath(); c.moveTo(34,0); c.lineTo(-20,4); c.lineTo(-14,0); c.closePath(); fsk(c,'#93c5fd',1.4); c.restore(); }
function piao(c,x,y,s,rot){ c.save(); c.translate(x,y); c.scale(s,s); c.rotate(Math.sin(rot||0)*.08);
  c.beginPath(); c.moveTo(0,0); c.lineTo(-22,-24); c.quadraticCurveTo(0,-44,22,-24); c.closePath(); fsk(c,'#ef4444',2);
  c.save(); c.clip(); var off=((rot||0)*14)%24; ['#3b82f6','#facc15','#22c55e','#3b82f6','#facc15'].forEach(function(col,i){ c.fillStyle=col; c.fillRect(-30+i*12-off,-46,6,48); }); c.restore();
  c.beginPath(); c.moveTo(0,0); c.lineTo(-22,-24); c.quadraticCurveTo(0,-44,22,-24); c.closePath(); c.strokeStyle=OL; c.lineWidth=2; c.stroke();
  A.rr(c,-3,-48,6,12,2); fsk(c,'#7c2d12',1.4); c.restore(); }
function tiro(c,e,t){ if(e.skin==='tenis'){ bolaTenis(c,e.x,e.y,10,e.rot); return true; }
  if(e.skin==='piao'){ c.save(); c.globalAlpha=.35; c.strokeStyle='#fff'; c.lineWidth=2; [0,1].forEach(function(k){ c.beginPath(); c.ellipse(e.x,e.y-2,16+k*6,4+k*2,0,0,Math.PI*2); c.stroke(); }); c.restore(); piao(c,e.x,e.y,.75,e.rot); return true; }
  return false; }
function placaS(placa,c,y,txt){ if(placa) placa(c,0,y,txt); }
function suporte(c,id,it,t,placa){
  if(id==='raquete'){ /* a mochila verde da sala (S3) com a raquete vermelha (racket next to the bag) */
    c.save(); c.translate(-6,0); A.rr(c,-30,-66,60,66,16); fsk(c,'#7fbf4a',2.2); A.rr(c,-20,-30,40,24,7); fsk(c,'#8cc152',1.6); c.strokeStyle=OL; c.lineWidth=2; c.beginPath(); c.arc(0,-66,11,Math.PI,0); c.stroke(); c.restore();
    if(!it.pego){ raquete(c,30,-4,1.05,.25); bolaTenis(c,-30,-10,9,0); bolaTenis(c,-14,-74,9,1); }
    placaS(placa,c,-128,'RACKET'); return true; }
  if(id==='aviao'){ /* carteira da escola com o avião de papel */
    c.fillStyle='#64748b'; c.fillRect(-34,-46,5,46); c.fillRect(29,-46,5,46); A.rr(c,-44,-56,88,12,4); fsk(c,'#f59e0b',2);
    if(!it.pego){ var b=Math.sin(t*2)*3; aviao(c,0,-76+b,1.15,-.12); } else { c.fillStyle='#fff'; A.rr(c,-14,-62,28,6,2); c.fill(); }
    placaS(placa,c,-112,'PAPER PLANE'); return true; }
  if(id==='piao'){ /* banco do parque com o pião */
    c.fillStyle='#78350f'; c.fillRect(-40,-34,6,34); c.fillRect(34,-34,6,34); A.rr(c,-48,-40,96,10,3); fsk(c,'#b45309',2); A.rr(c,-48,-70,96,10,3); fsk(c,'#b45309',2); c.fillStyle='#78350f'; c.fillRect(-40,-62,6,24); c.fillRect(34,-62,6,24);
    if(!it.pego) piao(c,0,-42,1.1,t*3);
    placaS(placa,c,-110,'TOP'); return true; }
  return false; }
function icone(c,k){
  if(k==='raquete'||k==='tenis'){ raquete(c,6,16,.4,.4); bolaTenis(c,-7,-4,8,0); return true; }
  if(k==='aviao'){ aviao(c,0,0,.62,-.15); return true; }
  if(k==='piao'){ piao(c,0,14,.75,0); return true; }
  if(k==='capa'){ c.save(); c.translate(0,4); c.beginPath(); c.moveTo(0,-15); c.lineTo(11,0); c.lineTo(0,15); c.lineTo(-11,0); c.closePath(); fsk(c,'#ec4899',1.4); c.restore(); return true; }
  if(k==='botas'){ tenis(c,-7,10,.6); tenis(c,8,12,.6); return true; }
  if(k==='pip'){ c.save(); c.scale(.36,.36); c.translate(0,34); bike(c,0,0,'idle',0); c.restore(); return true; }
  return false; }
function aviaoNoHeroi(c,u,s,t){ var hh=88*s; aviao(c,u.x,u.y-hh-14+Math.sin(t*3)*2,1.5*s,u.dir>0?-.06:Math.PI+.06); }
/* ---------- a bicicleta (montaria da fase 8; usa o contrato A.pip) ---------- */
function roda(c,x,y,r,a){ A.circ(c,x,y,r); c.strokeStyle='#1f2937'; c.lineWidth=5; c.stroke(); c.strokeStyle='#9ca3af'; c.lineWidth=1.4; for(var i=0;i<4;i++){ var k=a+i*Math.PI/4; c.beginPath(); c.moveTo(x+Math.cos(k)*r,y+Math.sin(k)*r); c.lineTo(x-Math.cos(k)*r,y-Math.sin(k)*r); c.stroke(); } c.fillStyle='#374151'; A.circ(c,x,y,3); c.fill(); }
function bike(c,x,y,estado,t){ var a=estado==='walk'||estado==='fly'?t*9:0; c.save(); c.translate(x,y);
  c.fillStyle='rgba(0,0,0,.2)'; A.el(c,0,2,44,5); c.fill();
  roda(c,-28,-21,20,a); roda(c,30,-21,20,a);
  c.strokeStyle='#dc2626'; c.lineWidth=5; c.lineJoin='round'; c.beginPath(); c.moveTo(-28,-21); c.lineTo(-6,-21); c.lineTo(-12,-46); c.lineTo(20,-46); c.lineTo(30,-21); c.moveTo(-6,-21); c.lineTo(20,-46); c.moveTo(-12,-46); c.lineTo(-28,-21); c.stroke();
  c.strokeStyle='#374151'; c.lineWidth=4; c.beginPath(); c.moveTo(20,-46); c.lineTo(24,-58); c.lineTo(32,-60); c.stroke();
  c.fillStyle='#111827'; A.rr(c,-22,-52,22,7,3); c.fill();
  c.fillStyle='#fbbf24'; A.circ(c,-6,-21,4); c.fill();
  if(estado==='egg'){ c.strokeStyle='#374151'; c.lineWidth=3; c.beginPath(); c.moveTo(-8,-21); c.lineTo(-16,-1); c.stroke(); }
  c.restore(); }
A.pip=function(c,x,y,estado,t,dir,escala){ c.save(); c.translate(x,y); c.scale((dir||1)*(escala||1),escala||1); bike(c,0,0,estado,t||0); c.restore(); };
A.pip.SELA_Y=50; A.pip.SELA_X=-10; A.pip.fixo=true;

/* ---------- o que cai e de onde cai (nada de gelo: Bíblia) ---------- */
function estanteQueda(c,x0,x1,y){ c.save(); A.rr(c,x0,y-14,x1-x0,12,3); fsk(c,'#d97706',2); c.fillStyle='#fde68a'; c.fillRect(x0+3,y-13,x1-x0-6,3);
  for(var x=x0+8;x<x1-14;x+=16){ var h=26+((x*7)%14); c.fillStyle=['#2563eb','#16a34a','#dc2626','#9333ea'][Math.floor(x/16)%4]; A.rr(c,x,y-14-h,12,h,2); c.fill(); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke(); }
  [x0+12,x1-20].forEach(function(x){ c.beginPath(); c.moveTo(x,y-2); c.lineTo(x+8,y-2); c.lineTo(x+8,y+10); c.closePath(); fsk(c,'#92400e',1.4); }); c.restore(); }
function livroCai(c){ c.save(); c.rotate(.15); A.rr(c,-15,4,30,24,3); fsk(c,'#2563eb',2); c.fillStyle='#fefce8'; c.fillRect(-11,8,22,4); c.fillRect(-11,16,22,3); c.restore(); }
function nuvemChuva(c,x0,x1,y,t){ c.save(); var cx=(x0+x1)/2, w=Math.max(70,(x1-x0)/2);
  c.fillStyle='#64748b'; [[-w*.6,0,26],[-w*.15,-10,32],[w*.35,-2,28],[w*.7,4,20]].forEach(function(q){ A.circ(c,cx+q[0],y-6+q[1],q[2]); c.fill(); });
  c.fillStyle='#94a3b8'; [[-w*.5,-6,18],[-w*.1,-16,22],[w*.35,-8,18]].forEach(function(q){ A.circ(c,cx+q[0],y-6+q[1],q[2]); c.fill(); });
  c.fillStyle='#1e293b'; A.circ(c,cx-12,y-8,3); c.fill(); A.circ(c,cx+10,y-8,3); c.fill(); c.strokeStyle='#1e293b'; c.lineWidth=2; c.beginPath(); c.arc(cx-1,y+4,6,1.15*Math.PI,1.85*Math.PI); c.stroke(); c.restore(); }

/* ---------- parede de 2 tiles (%): a pilha de livros que o Twister jogou (pula-se; nada depende de poder) ---------- */
function parede(c,p,cena,t){ c.save(); c.translate(p.x,p.y); var cores=['#2563eb','#16a34a','#dc2626','#9333ea','#ea580c'];
  for(var i=0;i<4;i++){ var dx=((p.x*3+p.y+i*7)%7)-3, y=i*11+1, k=Math.floor((p.x/45+p.y/45+i))%5; A.rr(c,2+dx,y,41,10,2); fsk(c,cores[k],1.6); c.fillStyle='#fefce8'; c.fillRect(36+dx,y+2,4,6); }
  c.restore(); return true; }
return {parede:parede, estanteQueda:estanteQueda, livroCai:livroCai, nuvemChuva:nuvemChuva, tiro:tiro, suporte:suporte, icone:icone, aviaoNoHeroi:aviaoNoHeroi, bike:bike, figura:figura, corda:corda, parse:parse, atualiza:atualiza, plataforma:plataforma, barco:barco, pipa:pipa, tenis:tenis, rolo:rolo, pipaNoHeroi:pipaNoHeroi, lata:lata, caixaLatas:caixaLatas, corpoTras:corpoTras, cabeca:cabeca};
})();
