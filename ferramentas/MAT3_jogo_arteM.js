/* ============================================================
   MAT3_jogo_arteM.js — elenco de "Math Stars" (escrito à mão; o fork não toca).
   Carrega DEPOIS de MAT3_jogo_pele.js. Os heróis Mike (chave interna 'yellow') e Laura ('pony')
   vêm do arteA herdado, recoloridos pelo fork (cachos castanhos e camisa vermelha; laço rosa).
   Aqui: QUEM PERGUNTA (A.morador), a VILÃ (A.conde = a Grande Borracha) e os PERIGOS.
   Origem no material (fontes/3tri/MATH): lápis (u08 words), quadrado 5 cm (u08 perimeter), os sólidos
   que falam (vídeo faces/edges: cube, cone, sphere, cylinder, pyramid, cuboid), hamster/coelho/cão/gato
   (gráfico u05), pinguim ("a penguin in the desert", u05 likely), botão vermelho (u10 multiplication),
   Mike e Laura (u10 division). A Borracha é a ponta rosa do lápis do slide; os Farelos e as Manchinhas
   são o que ela deixa. Sem aleatório por quadro, sem pisca (oscilação <= 1,5 Hz), nada assustador.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, OL='#2a2018';
function fs(c,f,st,lw){ c.fillStyle=f; c.fill(); c.strokeStyle=st||OL; c.lineWidth=lw==null?2.2:lw; c.stroke(); }
function lin(c,x0,y0,x1,y1,a,b){ var g=c.createLinearGradient(x0,y0,x1,y1); g.addColorStop(0,a); g.addColorStop(1,b); return g; }
function sombra(c,w){ c.save(); c.globalAlpha=.22; c.fillStyle='#000'; el(c,0,1,w,5); c.fill(); c.restore(); }
function olhos(c,x,y,d,r,t){ [-1,1].forEach(function(l){ circ(c,x+l*d,y,r); fs(c,'#fff','#1f2937',1.4); c.fillStyle='#1f2937'; circ(c,x+l*d+r*.15,y+r*.1,r*.55); c.fill(); c.fillStyle='#fff'; circ(c,x+l*d+r*.35,y-r*.25,r*.2); c.fill(); }); }
function boca(c,x,y,w,ab){ c.strokeStyle='#1f2937'; c.lineWidth=2; if(ab>.15){ el(c,x,y+2,w*.55,2+ab*5); fs(c,'#7f1d1d','#1f2937',1.6); } else { c.beginPath(); c.arc(x,y-2,w*.6,.15*PI,.85*PI); c.stroke(); } }
function bochecha(c,x,y,d){ c.fillStyle='rgba(244,114,128,.45)'; el(c,x-d,y,4,2.4); c.fill(); el(c,x+d,y,4,2.4); c.fill(); }
function pernas(c,w,cor,t){ c.strokeStyle=cor||'#1f2937'; c.lineWidth=4; c.lineCap='round'; var b=Math.sin(t*2.4)*2; c.beginPath(); c.moveTo(-w,-14); c.lineTo(-w-1,0+b*0); c.moveTo(w,-14); c.lineTo(w+1,0); c.stroke(); c.fillStyle=cor||'#1f2937'; el(c,-w-3,0,6,3); c.fill(); el(c,w+3,0,6,3); c.fill(); }
function bracos(c,y,w,t,cor){ var b=Math.sin(t*2.2)*6; c.strokeStyle=cor||'#1f2937'; c.lineWidth=3.5; c.lineCap='round'; c.beginPath(); c.moveTo(-w,y); c.lineTo(-w-14,y+10+b); c.moveTo(w,y); c.lineTo(w+14,y-8-b); c.stroke(); }
function ab(m){ return typeof m==='number'?m:(m?.6:0); }

/* ---------------- quem pergunta ---------------- */
var MOR={
  lapis:function(c,t,m){ sombra(c,18); pernas(c,7,'#1f2937',t); c.save(); c.translate(0,-14);
    rr(c,-14,-92,28,70,2); fs(c,lin(c,-14,0,14,0,'#ffe066','#f5b800'),'#7a5a00',2); c.fillStyle='rgba(122,90,0,.25)'; c.fillRect(-5,-92,3,70); c.fillRect(4,-92,3,70);
    rr(c,-14,-104,28,14,3); fs(c,'#cbd5e1','#475569',1.6); rr(c,-14,-122,28,20,8); fs(c,'#f4a7b9','#9d174d',1.8);
    c.beginPath(); c.moveTo(-14,-22); c.lineTo(14,-22); c.lineTo(0,4); c.closePath(); fs(c,'#f3e0c0','#7a5a00',1.6); c.beginPath(); c.moveTo(-5,-6); c.lineTo(5,-6); c.lineTo(0,4); c.closePath(); c.fillStyle='#1f2937'; c.fill();
    olhos(c,0,-66,6,4.4,t); boca(c,0,-52,10,ab(m)); bracos(c,-50,14,t,'#7a5a00'); c.restore(); },
  quadrado:function(c,t,m){ sombra(c,28); pernas(c,12,'#1f2937',t); c.save(); c.translate(0,-14);
    rr(c,-34,-74,68,68,4); fs(c,lin(c,0,-74,0,-6,'#ffd6e7','#f472b6'),'#9d174d',2.6);
    c.fillStyle='#9d174d'; c.font='900 11px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('5 cm',0,-80); c.save(); c.translate(42,-40); c.rotate(PI/2); c.fillText('5 cm',0,0); c.restore();
    olhos(c,0,-48,10,5,t); boca(c,0,-30,12,ab(m)); bochecha(c,0,-34,20); bracos(c,-40,34,t,'#9d174d'); c.restore(); },
  cubo:function(c,t,m){ sombra(c,30); pernas(c,12,'#1f2937',t); c.save(); c.translate(0,-14);
    c.beginPath(); c.rect(-34,-62,56,56); fs(c,'#ef4444','#7f1d1d',2.4); c.beginPath(); c.moveTo(-34,-62); c.lineTo(-20,-76); c.lineTo(36,-76); c.lineTo(22,-62); c.closePath(); fs(c,'#fca5a5','#7f1d1d',2); c.beginPath(); c.moveTo(22,-62); c.lineTo(36,-76); c.lineTo(36,-20); c.lineTo(22,-6); c.closePath(); fs(c,'#b91c1c','#7f1d1d',2);
    olhos(c,-6,-40,9,5,t); boca(c,-6,-22,12,ab(m)); bracos(c,-34,34,t,'#7f1d1d'); c.restore(); },
  cuboide:function(c,t,m){ sombra(c,36); pernas(c,16,'#1f2937',t); c.save(); c.translate(0,-14);
    c.beginPath(); c.rect(-44,-50,74,44); fs(c,'#8b5cf6','#4c1d95',2.4); c.beginPath(); c.moveTo(-44,-50); c.lineTo(-32,-62); c.lineTo(42,-62); c.lineTo(30,-50); c.closePath(); fs(c,'#c4b5fd','#4c1d95',2); c.beginPath(); c.moveTo(30,-50); c.lineTo(42,-62); c.lineTo(42,-18); c.lineTo(30,-6); c.closePath(); fs(c,'#6d28d9','#4c1d95',2);
    olhos(c,-8,-32,10,5,t); boca(c,-8,-16,12,ab(m)); bracos(c,-28,44,t,'#4c1d95'); c.restore(); },
  cone:function(c,t,m){ sombra(c,30); pernas(c,12,'#1f2937',t); c.save(); c.translate(0,-14);
    c.beginPath(); c.moveTo(0,-104); c.lineTo(32,-10); c.lineTo(-32,-10); c.closePath(); fs(c,lin(c,-30,0,30,0,'#fde68a','#f59e0b'),'#92400e',2.4); el(c,0,-10,32,8); fs(c,'#fbbf24','#92400e',2);
    olhos(c,0,-46,8,4.6,t); boca(c,0,-30,11,ab(m)); bracos(c,-40,20,t,'#92400e'); c.restore(); },
  esfera:function(c,t,m){ sombra(c,30); pernas(c,11,'#1f2937',t); c.save(); c.translate(0,-14);
    circ(c,0,-40,36); var g=c.createRadialGradient(-12,-54,4,0,-40,36); g.addColorStop(0,'#e0f2fe'); g.addColorStop(1,'#0284c7'); fs(c,g,'#0c4a6e',2.4);
    olhos(c,0,-46,10,5.2,t); boca(c,0,-28,12,ab(m)); bochecha(c,0,-32,20); bracos(c,-40,34,t,'#0c4a6e'); c.restore(); },
  cilindro:function(c,t,m){ sombra(c,28); pernas(c,12,'#1f2937',t); c.save(); c.translate(0,-14);
    rr(c,-28,-86,56,80,2); fs(c,lin(c,-28,0,28,0,'#fbcfe8','#ec4899'),'#831843',2.4); el(c,0,-6,28,8); fs(c,'#ec4899','#831843',2); el(c,0,-86,28,8); fs(c,'#fce7f3','#831843',2);
    olhos(c,0,-54,9,5,t); boca(c,0,-36,12,ab(m)); bracos(c,-50,28,t,'#831843'); c.restore(); },
  piramide:function(c,t,m){ sombra(c,34); pernas(c,13,'#1f2937',t); c.save(); c.translate(0,-14);
    c.beginPath(); c.moveTo(4,-100); c.lineTo(38,-8); c.lineTo(-30,-8); c.closePath(); fs(c,'#4ade80','#14532d',2.4); c.beginPath(); c.moveTo(4,-100); c.lineTo(38,-8); c.lineTo(48,-22); c.closePath(); fs(c,'#16a34a','#14532d',2);
    olhos(c,2,-40,8,4.6,t); boca(c,2,-24,11,ab(m)); bracos(c,-36,22,t,'#14532d'); c.restore(); },
  hamster:function(c,t,m){ sombra(c,26); c.save(); el(c,0,-28,30,26); fs(c,lin(c,0,-54,0,0,'#fcd9a8','#d97706'),'#7c2d12',2.2); el(c,0,-20,18,14); fs(c,'#fff7ed','#7c2d12',1.2); circ(c,-18,-50,8); fs(c,'#fdba74','#7c2d12',1.6); circ(c,18,-50,8); fs(c,'#fdba74','#7c2d12',1.6);
    olhos(c,0,-36,10,4.4,t); c.fillStyle='#be185d'; circ(c,0,-27,2.6); c.fill(); boca(c,0,-20,9,ab(m)); bochecha(c,0,-26,18); c.restore(); },
  coelho:function(c,t,m){ sombra(c,24); c.save(); var b=Math.sin(t*1.4)*.06; [-1,1].forEach(function(l){ c.save(); c.translate(l*9,-60); c.rotate(l*(.12+b)); el(c,0,-20,7,22); fs(c,'#fdf2f8','#9d174d',2); el(c,0,-20,3.4,15); c.fillStyle='#f9a8d4'; c.fill(); c.restore(); });
    el(c,0,-34,26,30); fs(c,lin(c,0,-64,0,0,'#ffffff','#fbcfe8'),'#9d174d',2.2); olhos(c,0,-42,9,4.4,t); c.fillStyle='#be185d'; circ(c,0,-32,2.6); c.fill(); boca(c,0,-24,9,ab(m)); bochecha(c,0,-30,17); c.restore(); },
  cao:function(c,t,m){ sombra(c,30); c.save(); el(c,0,-34,30,30); fs(c,lin(c,0,-64,0,0,'#fdba74','#ea580c'),'#7c2d12',2.2); var b=Math.sin(t*1.6)*.1; [-1,1].forEach(function(l){ c.save(); c.translate(l*26,-50); c.rotate(l*(.3+b)); el(c,0,10,8,16); fs(c,'#9a3412','#7c2d12',1.6); c.restore(); });
    el(c,0,-24,15,11); fs(c,'#fed7aa','#7c2d12',1.2); olhos(c,0,-42,10,4.6,t); c.fillStyle='#1f2937'; el(c,0,-28,4.4,3.2); c.fill(); boca(c,0,-20,9,ab(m)); c.restore(); },
  gato:function(c,t,m){ sombra(c,26); c.save(); [-1,1].forEach(function(l){ c.beginPath(); c.moveTo(l*8,-58); c.lineTo(l*22,-74); c.lineTo(l*26,-50); c.closePath(); fs(c,'#86efac','#14532d',2); });
    el(c,0,-34,28,28); fs(c,lin(c,0,-62,0,0,'#bbf7d0','#22c55e'),'#14532d',2.2); olhos(c,0,-40,10,4.6,t); c.fillStyle='#be185d'; c.beginPath(); c.moveTo(-3,-31); c.lineTo(3,-31); c.lineTo(0,-28); c.closePath(); c.fill(); boca(c,0,-22,9,ab(m));
    c.strokeStyle='#14532d'; c.lineWidth=1.2; [-1,1].forEach(function(l){ c.beginPath(); c.moveTo(l*8,-29); c.lineTo(l*24,-32); c.moveTo(l*8,-27); c.lineTo(l*24,-25); c.stroke(); }); c.restore(); },
  pinguim:function(c,t,m){ sombra(c,24); c.save(); var w=Math.sin(t*1.5)*.08; c.rotate(w*.4);
    el(c,0,-44,28,42); fs(c,'#1e293b','#0f172a',2.2); el(c,0,-38,19,32); fs(c,'#f8fafc','#334155',1.2);
    [-1,1].forEach(function(l){ c.save(); c.translate(l*27,-46); c.rotate(l*(.35+w)); el(c,0,10,6,18); fs(c,'#1e293b','#0f172a',1.6); c.restore(); });
    el(c,-9,-2,9,4); fs(c,'#f59e0b','#92400e',1.4); el(c,9,-2,9,4); fs(c,'#f59e0b','#92400e',1.4);
    olhos(c,0,-62,8,4.4,t); c.beginPath(); c.moveTo(-6,-54); c.lineTo(6,-54); c.lineTo(0,-46); c.closePath(); fs(c,'#f59e0b','#92400e',1.2); if(ab(m)>.15){ c.fillStyle='#92400e'; el(c,0,-51,3,1.6); c.fill(); } bochecha(c,0,-52,14); c.restore(); },
  botao:function(c,t,m){ sombra(c,28); pernas(c,11,'#1f2937',t); c.save(); c.translate(0,-14);
    circ(c,0,-42,36); var g=c.createRadialGradient(-12,-56,4,0,-42,36); g.addColorStop(0,'#fca5a5'); g.addColorStop(1,'#dc2626'); fs(c,g,'#7f1d1d',2.6); circ(c,0,-42,27); c.strokeStyle='rgba(127,29,29,.55)'; c.lineWidth=2; c.stroke();
    [[-8,-30],[8,-30]].forEach(function(p){ c.fillStyle='#7f1d1d'; circ(c,p[0],p[1],2.6); c.fill(); }); olhos(c,0,-50,10,5,t); boca(c,0,-36,10,ab(m)); bracos(c,-40,36,t,'#7f1d1d'); c.restore(); }
};
/* os tipos herdados caem num tipo do universo (o chefão e a torcida da corrida usam a lista antiga) */
var VELHO={pin:'lapis',gigi:'quadrado',breezy:'pinguim',drop:'hamster',boing:'botao',paws:'cao',max:'cubo'};
var morador0=A.morador;
A.morador=function(c,tipo,x,y,t,dir,falando){ t=t||0; tipo=VELHO[tipo]||tipo;
  if(tipo==='amigo'){ var J=window.JOGO&&JOGO.J, eu=J&&J.prog&&J.prog.heroi||'yellow', outro=eu==='pony'?'yellow':'pony'; if(A.heroi) A.heroi(c,x,y,'idle',t,dir||1,.95,outro); return; }
  var f=MOR[tipo]||MOR.lapis; c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round'; f(c,t,falando?(.5+.5*Math.sin(t*9)):0); c.restore(); };
A.MORADORES=Object.keys(MOR).concat(['amigo']);
A.MAT_MOR=MOR;

/* ---------------- a Grande Borracha ---------------- */
function borracha(c,estado,t,alt){ var s=alt/150, sd=estado==='sad'||estado==='hit', ri=estado==='laugh', bal=Math.sin(t*1.3)*.04;
  c.save(); c.scale(s,s); c.rotate(bal); sombra(c,60);
  /* bracinhos */ var bw=Math.sin(t*2)*8; c.strokeStyle='#831843'; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(-52,-78); c.lineTo(-84,-60-bw); c.moveTo(52,-78); c.lineTo(84,-96+bw); c.stroke(); c.fillStyle='#f9a8d4'; circ(c,-86,-58-bw,9); c.fill(); circ(c,86,-98+bw,9); c.fill();
  /* pernas */ c.strokeStyle='#1f2937'; c.lineWidth=7; c.beginPath(); c.moveTo(-22,-10); c.lineTo(-24,0); c.moveTo(22,-10); c.lineTo(24,0); c.stroke(); c.fillStyle='#1f2937'; el(c,-28,0,11,5); c.fill(); el(c,28,0,11,5); c.fill();
  /* bloco: metade rosa, metade azul, com a capinha de papel */
  rr(c,-56,-150,112,142,16); fs(c,lin(c,0,-150,0,-8,'#fbcfe8','#f472b6'),'#831843',3.4);
  c.save(); rr(c,-56,-150,112,142,16); c.clip(); c.fillStyle=lin(c,0,-70,0,-8,'#93c5fd','#2563eb'); c.fillRect(-56,-60,112,60);
  c.fillStyle='rgba(255,255,255,.92)'; c.fillRect(-56,-104,112,36); c.fillStyle='#2563eb'; c.font='900 15px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; var mt=c.getTransform?c.getTransform():null; if(mt&&mt.a<0){ c.save(); c.translate(0,-86); c.scale(-1,1); c.fillText(ri?'HA HA':'ERASER',0,0); c.restore(); } else c.fillText(ri?'HA HA':'ERASER',0,-86); /* jogador D5: o rótulo nunca sai espelhado quando o chefão vira */ c.restore();
  rr(c,-56,-150,112,142,16); c.strokeStyle='#831843'; c.lineWidth=3.4; c.stroke();
  /* rosto */ olhos(c,0,-126,16,8,t); c.strokeStyle='#831843'; c.lineWidth=3.4; c.beginPath(); if(sd){ c.moveTo(-26,-142); c.lineTo(-8,-138); c.moveTo(26,-142); c.lineTo(8,-138); } else { c.moveTo(-26,-138); c.lineTo(-8,-142); c.moveTo(26,-138); c.lineTo(8,-142); } c.stroke();
  c.strokeStyle='#1f2937'; c.lineWidth=3; c.beginPath(); if(sd) c.arc(0,-104,10,1.15*PI,1.85*PI); else c.arc(0,-116,12,.15*PI,.85*PI); c.stroke();
  if(estado==='hit'){ c.fillStyle='#fde047'; [[-70,-150],[70,-160],[0,-178]].forEach(function(p){ c.beginPath(); for(var i=0;i<10;i++){ var a=i*PI/5, r=i%2?5:11; c.lineTo(p[0]+Math.cos(a)*r,p[1]+Math.sin(a)*r); } c.closePath(); c.fill(); }); }
  /* farelinhos que caem (posição fixa, só balançam) */ c.fillStyle='#f472b6'; [[-40,-2],[38,-4],[-8,-1]].forEach(function(p,i){ el(c,p[0],p[1]+Math.sin(t*1.2+i)*1.5,5,3); c.fill(); });
  c.restore(); }
A.conde=function(c,x,y,estado,t){ t=t||0; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round'; borracha(c,estado||'idle',t,156); c.restore(); };
A.tracona=function(c,x,y,t,hp,max2){ t=t||0; max2=max2||3; hp=hp==null?max2:hp; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round';
  borracha(c,hp<=1&&hp<max2?'hit':'idle',t,98); for(var h=0;h<max2;h++){ var hx=(h-(max2-1)/2)*14; circ(c,hx,-118,5); fs(c,h<hp?'#f472b6':'rgba(255,255,255,.3)','#334155',1.2); } c.restore(); };

/* ---------------- perigos (mesmas chaves do motor) ---------------- */
var INI=A.INIMIGOS_CIE||{};
function ini(c,x,y,dir,fn){ c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round'; fn(); c.restore(); }
function bravo(c,x,y,r,w){ olhos(c,x+w/2,y,w/2,r,0); c.strokeStyle='#1f2937'; c.lineWidth=2; c.beginPath(); c.moveTo(x-r,y-r*1.4); c.lineTo(x+r,y-r*.9); c.moveTo(x+w+r,y-r*1.4); c.lineTo(x+w-r,y-r*.9); c.stroke(); }
/* Manchinha: rabisco de lápis que flutua (no lugar da rajada) */
INI.gust=function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ var b=Math.sin(t*2.4)*3; c.save(); c.globalAlpha=.14; c.fillStyle='#000'; el(c,0,1,16,3); c.fill(); c.restore(); c.translate(0,-28+b); if(ach) c.scale(1.1,.45);
  c.beginPath(); for(var i=0;i<=16;i++){ var a=i/16*TAU, r=17+Math.sin(a*5+t*1.2)*3; c.lineTo(Math.cos(a)*r,Math.sin(a)*r*.85); } c.closePath(); fs(c,'#94a3b8','#334155',2);
  c.strokeStyle='rgba(51,65,85,.55)'; c.lineWidth=1.6; c.beginPath(); c.moveTo(-12,8); c.quadraticCurveTo(-4,-10,4,6); c.quadraticCurveTo(10,-8,14,4); c.stroke(); bravo(c,-8,-4,3.8,14); }); };
/* Farelo: montinho de farelo rosa de borracha (no lugar da poça) */
INI.puddle=function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ var w=Math.sin(t*2.6), sq=ach?.35:1; c.save(); c.scale(1,sq);
  [[-16,-8,10],[0,-14,13],[16,-8,10],[-8,-3,8],[9,-3,8]].forEach(function(p,i){ el(c,p[0],p[1]+(i%2?w:-w),p[2],p[2]*.8); fs(c,i%2?'#f9a8d4':'#f472b6','#9d174d',1.6); }); c.restore();
  if(!ach){ bravo(c,-8,-15,3.8,14); c.strokeStyle='#831843'; c.lineWidth=1.5; c.beginPath(); c.arc(-1,-7,3,.15*PI,.85*PI); c.stroke(); } }); };
/* cilindro que ROLA (superfície curva) */
INI.can=function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ sombra(c,22); c.translate(0,-17); if(ach) c.scale(1.1,.55); circ(c,0,0,17); fs(c,'#f472b6','#831843',2.2); circ(c,0,0,10.5); fs(c,'#fbcfe8','#831843',1.4); c.save(); c.rotate(t*3); c.strokeStyle='#831843'; c.lineWidth=2; c.beginPath(); c.moveTo(-9,0); c.lineTo(9,0); c.stroke(); c.restore(); bravo(c,-7,-3,3,10); }); };
/* esfera que ROLA */
INI.ball=function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ sombra(c,19); c.translate(0,-18); if(ach) c.scale(1.12,.6); circ(c,0,0,18); var g=c.createRadialGradient(-6,-6,2,0,0,18); g.addColorStop(0,'#e0f2fe'); g.addColorStop(1,'#0284c7'); fs(c,g,'#0c4a6e',2); bravo(c,-6,-3,4,12); c.strokeStyle='#0c4a6e'; c.lineWidth=1.4; c.beginPath(); c.arc(0,6,3.2,.15*PI,.85*PI); c.stroke(); }); };
/* cone (o escudo da Borracha: derrube os cones) */
INI.top=function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ var a=Math.sin(t*1.4)*.06; c.rotate(a); if(ach) c.scale(1.05,.6); c.beginPath(); c.moveTo(0,-46); c.lineTo(20,-4); c.lineTo(-20,-4); c.closePath(); fs(c,lin(c,-20,0,20,0,'#fde68a','#f59e0b'),'#92400e',2); el(c,0,-4,20,5); fs(c,'#fbbf24','#92400e',1.6); bravo(c,-6,-22,3.4,12); }); };
A.bolaRolando=function(c,b,t){ c.save(); c.translate(b.x,b.y+(b.r||18)); var s=(b.r||18)/18; c.scale(s,s); INI.ball(c,0,0,t||0,b.vx<0?-1:1); c.restore(); };
A.piao=function(c,e,t){ INI.top(c,e.x,e.y,t||0,e.dir||1,e.achatado); };
A.gust=function(c,e,t){ INI.gust(c,e.x,e.y,t||0,e.dir||1,false); };
A.puddle=function(c,e,t){ if(e.tipo!=='agua_viva'&&e.tipo!=='baiacu') return false; INI.puddle(c,e.x,e.y,t||0,e.dir||1,!!e.inchado); return true; };
A.INIMIGOS_CIE=INI;
})();
