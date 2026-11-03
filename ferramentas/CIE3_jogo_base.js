/* ============================================================
   CIE3_jogo_base.js — RESERVA da arte de Motion Rangers.
   Carrega DEPOIS da arte herdada e ANTES de CIE3_jogo_arteA/B/C.js.
   Define o contrato (quem, tipo, Twister, mapa da escola, capa)
   em cima da arte herdada, para o jogo rodar enquanto a arte nova não
   chega. Os módulos A/B/C simplesmente sobrescrevem estas funções.
   GERADO: copiado de trabalho/3tri_ciencias/gen/novos/ por fork_jogo.py.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, TAU=Math.PI*2; if(!A) return;
var QUEM={helmet:'lia',pony:'bia',yellow:'theo',fisher:'leo'};
var TIPO={pin:'crier',gigi:'godmother',breezy:'bard',drop:'octopus',boing:'coach',paws:'mouse',max:'referee'};
var heroi0=A.heroi, morador0=A.morador;
A.heroi=function(c,x,y,estado,t,dir,escala,quem,look){ return heroi0.call(this,c,x,y,estado,t,dir,escala,QUEM[quem]||quem,look); };
A.morador=function(c,tipo,x,y,t,dir,falando){ return morador0.call(this,c,TIPO[tipo]||tipo,x,y,t,dir,falando); };
/* Twister (assinatura do antigo vilão): funil cômico, sem susto */
A.conde=function(c,x,y,estado,t){
  c.save(); c.translate(x,y); var sd=estado==='sad'||estado==='hit'; c.rotate(Math.sin(t*2)*.05);
  for(var i=0;i<7;i++){ var k=i/6, w=18+k*70, yy=-8-i*24, dx=Math.sin(t*3+i*.9)*(6+i*1.6); c.fillStyle=i%2?'#94a3b8':'#cbd5e1'; A.el(c,dx,yy,w,13); c.fill(); }
  c.fillStyle='#fff'; A.circ(c,-16,-92,11); c.fill(); A.circ(c,16,-92,11); c.fill(); c.fillStyle='#1e293b'; A.circ(c,-14,-90,5); c.fill(); A.circ(c,18,-90,5); c.fill();
  c.strokeStyle='#1e293b'; c.lineWidth=4; c.beginPath(); if(sd) c.arc(0,-62,13,1.15*Math.PI,1.85*Math.PI); else c.arc(0,-74,13,.15*Math.PI,.85*Math.PI); c.stroke();
  c.restore(); };
/* mapa da escola visto de cima: reserva simples (a arte nova sobrescreve) */
A.MAPA_NOS=[{x:150,y:440},{x:300,y:380},{x:470,y:440},{x:640,y:390},{x:810,y:430},{x:800,y:260},{x:620,y:210},{x:430,y:240},{x:230,y:190}];
A.mapaLivro=function(c,t){ c.fillStyle='#bbf7d0'; c.fillRect(0,0,960,540); c.fillStyle='#e7e5e4'; A.rr(c,60,120,840,370,26); c.fill(); c.strokeStyle='#38bdf8'; c.lineWidth=4; c.setLineDash([10,8]); c.beginPath(); c.moveTo(150,440); c.lineTo(810,430); c.lineTo(230,190); c.stroke(); c.setLineDash([]); };
A.capaLivro=function(c,t,sel){ var g=c.createLinearGradient(0,0,0,540); g.addColorStop(0,'#38bdf8'); g.addColorStop(1,'#bbf7d0'); c.fillStyle=g; c.fillRect(0,0,960,540); c.fillStyle='#fde68a'; c.strokeStyle='#4c1d95'; c.lineWidth=8; c.lineJoin='round'; c.font='900 64px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.strokeText('Motion Rangers',480,130); c.fillText('Motion Rangers',480,130); c.font='900 28px "Nunito",Arial'; c.lineWidth=5; c.strokeText('Find Everything!',480,190); c.fillText('Find Everything!',480,190); ['helmet','pony','yellow','fisher'].forEach(function(q,i){ A.heroi(c,240+i*160,420,'idle',t+i,1,1.2,q); }); };
/* perigos da Bíblia (reservas; as chaves internas do motor continuam) */
A.poeira=function(c,x,y,t,dir,achatado){ var cena=window.JOGO&&JOGO.J.mundo&&JOGO.J.mundo.cena; c.save(); c.translate(x,y); if(achatado) c.scale(1.2,.3);
  if(cena==='recife'||cena==='nuvens'){ if(cena==='recife') lagoa(c,t); else rajada(c,t); }
  else { c.rotate(t*2*(dir||-1)); c.translate(0,-18); c.fillStyle='#94a3b8'; A.circ(c,0,0,18); c.fill(); c.fillStyle='#e2e8f0'; A.circ(c,0,0,12); c.fill(); c.fillStyle='#64748b'; c.fillRect(-14,-2,28,4); }
  c.restore(); };
function lagoa(c,t){ c.fillStyle='#38bdf8'; A.el(c,0,-10,24,12+Math.sin(t*3)*2); c.fill(); c.fillStyle='#fff'; A.circ(c,-8,-14,4); c.fill(); A.circ(c,8,-14,4); c.fill(); c.fillStyle='#0c4a6e'; A.circ(c,-7,-13,2); c.fill(); A.circ(c,9,-13,2); c.fill(); }
function rajada(c,t){ c.strokeStyle='#e0f2fe'; c.lineWidth=5; c.lineCap='round'; for(var i=0;i<3;i++){ c.beginPath(); c.moveTo(-22,-30+i*11); c.quadraticCurveTo(0,-38+i*11+Math.sin(t*5+i)*4,20,-30+i*11); c.stroke(); } c.fillStyle='#0369a1'; A.circ(c,-5,-22,2.5); c.fill(); A.circ(c,6,-22,2.5); c.fill(); }
A.gust=function(c,e,t){ c.save(); c.translate(e.x,e.y); rajada(c,t); c.restore(); };
A.puddle=function(c,e,t){ if(e.tipo!=='agua_viva'&&e.tipo!=='baiacu') return false; c.save(); c.translate(e.x,e.y-14); var s=e.inchado?1.4:1; c.scale(s,s); lagoa(c,t); c.restore(); return true; };
A.piao=function(c,e,t){ c.save(); c.translate(e.x,e.y); var a=Math.sin(t*12)*.15; c.rotate(a); c.fillStyle='#f97316'; c.beginPath(); c.moveTo(0,0); c.lineTo(-20,-22); c.quadraticCurveTo(0,-40,20,-22); c.closePath(); c.fill(); c.fillStyle='#fde047'; c.fillRect(-16,-24,32,5); c.fillStyle='#7c2d12'; c.fillRect(-2,-44,4,10); c.restore(); };
A.tracona=function(c,x,y,t,hp,max){ c.save(); c.translate(x,y); c.scale(1.4,1.4); for(var i=0;i<5;i++){ c.fillStyle=i%2?'#7dd3fc':'#bae6fd'; A.el(c,Math.sin(t*4+i)*5,-8-i*13,12+i*7,8); c.fill(); } c.fillStyle='#fff'; A.circ(c,-9,-44,6); c.fill(); A.circ(c,9,-44,6); c.fill(); c.fillStyle='#0c4a6e'; A.circ(c,-8,-43,3); c.fill(); A.circ(c,10,-43,3); c.fill(); c.restore(); };
if(A.CENAS&&!A.CENAS.casa) A.CENAS.casa={ceu:['#7dd3fc','#bae6fd','#e0f2fe'], chaoTop:'#a8a29e', chao:'#78716c', chaoBase:'#44403c', plat:'#a16207', platTop:'#ca8a04', part:'nuvem', musica:'mapa'};
})();
