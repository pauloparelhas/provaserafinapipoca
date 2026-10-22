/* ============================================================
   HIS3_jogo_carrinhos.js — os CARRINHOS DE ROLIMÃ temáticos da
   corrida (18/10, Paulo: "carrinhos criativos tipo Red Bull Soapbox
   Race, beirando o ridículo de imaginação no bom sentido").
   Vista de cima, nariz para +x. O PIVÔ é o eixo traseiro (x=0):
   rodas de trás em x=0, da frente em x=30 (giram com o esterço).
   Corpo ~ de x=-10 a x=42, largura ~28. Tudo em canvas, sem imagem.
     CARRINHOS.desenha(c,id,o)  o = {cor, st (esterço rad), t, rol (inclinação),
                                    ar (0..1 no salto), turbo, eu (herói), cap (cor do capacete)}
     CARRINHOS.LISTA            nomes em inglês e cor de cada um
   Dragon=barco-dragão · Princess=carruagem de abóbora · Knight=torre de
   castelo · Witch=caldeirão · Wolf=cama da vovó · Fairy=margarida com asas ·
   Frog=vitória-régia · Red=cesta de piquenique · Pig=casinha de tijolos ·
   Lia=cavalinho de balanço · Theo=livro de feitiços · Bia=cama elástica ·
   Leo=bola gigante · Count=tinteiro sobre rodas.
   (Detetives do Tempo) Na VISTA DE TRÁS os ids viraram os pilotos da Corrida
   do Correio: dragon=Seu Francisco (carro do correio) · princess=Dona Lúcia
   (lousa ABC) · knight=Seu Pedro (caixote de tomates) · witch=Dra. Clio (baú
   com lupa) · wolf=Doutor João (maleta) · fairy=Vovó Lembrança (poltrona) ·
   frog=Engenheira (carrinho de obra) · red=Fotógrafo (câmera antiga) ·
   pig=Leiteiro (garrafas de leite) · count=Rainha Traça (livro roído).
   A vista de cima (desenha) não é usada pela corrida e ficou como estava.
   ============================================================ */
window.CARRINHOS = (function(){
'use strict';
var A=window.ARTE, TAU=Math.PI*2, PI=Math.PI;
function circ(c,x,y,r){ c.beginPath(); c.arc(x,y,r,0,TAU); }
function el(c,x,y,rx,ry,rot){ c.beginPath(); c.ellipse(x,y,rx,ry,rot||0,0,TAU); }
function rr(c,x,y,w,h,r){ A.rr(c,x,y,w,h,r); }
function esc(h,k){ var m=/^#?([0-9a-f]{6})$/i.exec(h||''); if(!m) return h; var n=parseInt(m[1],16), r=n>>16, g=n>>8&255, b=n&255; k=1-k; return 'rgb('+Math.round(r*k)+','+Math.round(g*k)+','+Math.round(b*k)+')'; }
function cla(h,k){ var m=/^#?([0-9a-f]{6})$/i.exec(h||''); if(!m) return h; var n=parseInt(m[1],16), r=n>>16, g=n>>8&255, b=n&255; return 'rgb('+Math.round(r+(255-r)*k)+','+Math.round(g+(255-g)*k)+','+Math.round(b+(255-b)*k)+')'; }

var LISTA={
  dragon:{nome:'Seu Francisco',cor:'#eab308'}, princess:{nome:'Dona Lúcia',cor:'#16a34a'}, knight:{nome:'Seu Pedro',cor:'#dc2626'},
  witch:{nome:'Dra. Clio',cor:'#a16207'}, wolf:{nome:'Doutor João',cor:'#0ea5e9'}, fairy:{nome:'Vovó Lembrança',cor:'#ec4899'},
  frog:{nome:'Engenheira',cor:'#f97316'}, red:{nome:'Fotógrafo',cor:'#b91c1c'}, pig:{nome:'Leiteiro',cor:'#3b82f6'},
  lia:{nome:'Lia',cor:'#e11d48'}, theo:{nome:'Theo',cor:'#2563eb'}, bia:{nome:'Bia',cor:'#9333ea'}, leo:{nome:'Leo',cor:'#facc15'},
  count:{nome:'Rainha Traça',cor:'#6d28d9'}
};

/* rodinhas: traseiras fixas, dianteiras giram com o esterço */
function rodas(c,st,larg,giro){
  var w=larg||14;
  [[0,-w],[0,w],[30,-w+1],[30,w-1]].forEach(function(p,k){ c.save(); c.translate(p[0],p[1]); if(k>1) c.rotate(st||0);
    c.fillStyle='#111827'; rr(c,-6,-3.5,12,7,3); c.fill(); c.fillStyle='#4b5563'; c.fillRect(-4+((giro||0)%4),-3.5,1.5,7); c.restore(); });
}
/* capacete do piloto visto de cima (com a cor do time e um enfeite) */
function capacete(c,x,cor,enfeite,t){
  c.fillStyle='rgba(0,0,0,.25)'; circ(c,x+1.5,1.5,7.5); c.fill();
  var g=c.createRadialGradient(x-2,-2,1,x,0,8); g.addColorStop(0,cla(cor,.45)); g.addColorStop(1,cor); c.fillStyle=g; circ(c,x,0,7.5); c.fill();
  c.strokeStyle=esc(cor,.4); c.lineWidth=1.2; circ(c,x,0,7.5); c.stroke();
  c.fillStyle='rgba(15,23,42,.85)'; c.beginPath(); c.arc(x,0,7.5,-.9,.9); c.arc(x,0,4,.9,-.9,true); c.closePath(); c.fill(); /* viseira para a frente */
  if(enfeite==='coroa'){ c.fillStyle='#fbbf24'; c.beginPath(); for(var i=0;i<10;i++){ var a=i/10*TAU, r=i%2?2.4:5; c.lineTo(x-1+Math.cos(a)*r,Math.sin(a)*r); } c.closePath(); c.fill(); }
  if(enfeite==='chapeu'){ c.fillStyle='#1c1917'; circ(c,x-1,0,6); c.fill(); c.fillStyle='#a855f7'; circ(c,x-1,0,3); c.fill(); }
  if(enfeite==='estrela') A.estrela(c,x-1,0,4,'#fde047',t||0);
  if(enfeite==='orelhas'){ c.fillStyle='#57534e'; c.beginPath(); c.moveTo(x-4,-5); c.lineTo(x-9,-10); c.lineTo(x-1,-7); c.fill(); c.beginPath(); c.moveTo(x-4,5); c.lineTo(x-9,10); c.lineTo(x-1,7); c.fill(); }
}

var DES={
  dragon:function(c,o,t){ var bat=Math.sin(t*9)*.35;
    c.fillStyle='#b91c1c'; [-1,1].forEach(function(l){ c.save(); c.translate(14,l*8); c.rotate(l*(.5+bat)); c.beginPath(); c.moveTo(0,0); c.lineTo(-14,l*20); c.lineTo(4,l*16); c.closePath(); c.fill(); c.restore(); });
    c.strokeStyle='#ea580c'; c.lineWidth=5; c.lineCap='round'; c.beginPath(); c.moveTo(-6,0); c.quadraticCurveTo(-16,Math.sin(t*6)*8,-24,Math.sin(t*6+1)*10); c.stroke();
    c.fillStyle=A.lin(c,0,-10,0,10,'#fb923c','#c2410c'); el(c,14,0,24,10); c.fill();
    c.fillStyle='#fde047'; for(var k=0;k<5;k++){ c.beginPath(); c.moveTo(2+k*7,-2); c.lineTo(5+k*7,0); c.lineTo(2+k*7,2); c.fill(); }
    c.fillStyle='#ea580c'; c.beginPath(); c.moveTo(34,-7); c.lineTo(48,0); c.lineTo(34,7); c.closePath(); c.fill(); c.fillStyle='#111'; circ(c,44,-2,1.3); c.fill(); circ(c,44,2,1.3); c.fill();
    c.fillStyle='#fff'; circ(c,38,-4,2); c.fill(); circ(c,38,4,2); c.fill(); return 'nenhum'; },
  princess:function(c,o,t){
    c.strokeStyle='#15803d'; c.lineWidth=2.5; c.beginPath(); c.moveTo(-4,0); c.quadraticCurveTo(-12,-6,-10,-12); c.stroke(); c.fillStyle='#16a34a'; rr(c,-8,-2,6,4,2); c.fill();
    var g=c.createRadialGradient(10,-5,3,14,0,20); g.addColorStop(0,'#fdba74'); g.addColorStop(1,'#ea580c'); c.fillStyle=g; el(c,14,0,20,17); c.fill();
    c.strokeStyle='rgba(154,52,18,.55)'; c.lineWidth=1.6; [-9,-3,3,9].forEach(function(y){ c.beginPath(); c.ellipse(14,y*.4,20,Math.abs(y)+2,0,-PI/2,PI/2); c.stroke(); });
    c.fillStyle='#fde047'; c.fillRect(30,-8,3,16); return 'coroa'; },
  knight:function(c,o,t){
    c.fillStyle=A.lin(c,0,-14,0,14,'#cbd5e1','#64748b'); rr(c,-4,-14,40,28,3); c.fill();
    c.fillStyle='#94a3b8'; for(var k=0;k<5;k++){ c.fillRect(-4+k*9,-17,5,4); c.fillRect(-4+k*9,13,5,4); }
    c.strokeStyle='rgba(51,65,85,.5)'; c.lineWidth=1; for(var y=-10;y<14;y+=6){ c.beginPath(); c.moveTo(-4,y); c.lineTo(36,y); c.stroke(); }
    c.strokeStyle='#78350f'; c.lineWidth=2; c.beginPath(); c.moveTo(20,0); c.lineTo(20,0); c.stroke();
    var w=Math.sin(t*10)*4; c.fillStyle='#dc2626'; c.beginPath(); c.moveTo(22,-2); c.lineTo(6,-12+w); c.lineTo(10,-2); c.closePath(); c.fill(); c.fillStyle='#1f2937'; circ(c,22,-2,2); c.fill(); return 'nenhum'; },
  witch:function(c,o,t){
    c.strokeStyle='#92400e'; c.lineWidth=3; c.beginPath(); c.moveTo(-20,0); c.lineTo(0,0); c.stroke(); c.fillStyle='#facc15'; c.beginPath(); c.moveTo(-18,0); c.lineTo(-28,-7); c.lineTo(-28,7); c.closePath(); c.fill();
    c.fillStyle='#111827'; circ(c,14,0,18); c.fill(); c.strokeStyle='#7c3aed'; c.lineWidth=3.5; circ(c,14,0,16); c.stroke();
    c.fillStyle='#22c55e'; circ(c,14,0,12); c.fill(); for(var k=0;k<3;k++){ var f=(t*.8+k/3)%1; c.globalAlpha=1-f; c.fillStyle='#86efac'; circ(c,10+k*5,-4+k*3,2+f*4); c.fill(); } c.globalAlpha=1; return 'chapeu'; },
  wolf:function(c,o,t){
    c.fillStyle='#78350f'; rr(c,-8,-15,52,30,4); c.fill();
    c.save(); c.beginPath(); rr(c,-4,-13,34,26,3); c.clip(); for(var i=0;i<6;i++) for(var j=0;j<5;j++){ c.fillStyle=(i+j)%2?'#f9a8d4':'#fdf2f8'; c.fillRect(-4+i*6,-13+j*6,6,6); } c.restore();
    c.fillStyle='#fff'; rr(c,30,-11,10,22,5); c.fill(); c.fillStyle='rgba(148,163,184,.6)'; c.fillRect(34,-9,1,18);
    var z=(t*.7)%1; c.globalAlpha=1-z; c.fillStyle='#fff'; c.font='900 9px Arial'; c.fillText('z',14+z*6,-18-z*10); c.globalAlpha=1; return 'orelhas'; },
  fairy:function(c,o,t){ var bat=Math.abs(Math.sin(t*14));
    c.fillStyle='rgba(224,231,255,.6)'; [-1,1].forEach(function(l){ el(c,6,l*(16+bat*4),10,5+bat*3,l*.4); c.fill(); el(c,22,l*(15+bat*4),8,4+bat*2,-l*.4); c.fill(); });
    for(var k=0;k<8;k++){ var a=k/8*TAU; c.fillStyle=k%2?'#fff':'#fdf4ff'; el(c,14+Math.cos(a)*11,Math.sin(a)*11,8,4.5,a); c.fill(); }
    c.fillStyle='#facc15'; circ(c,14,0,8); c.fill(); c.fillStyle='rgba(161,98,7,.4)'; for(var d=0;d<6;d++){ circ(c,14+Math.cos(d)*4,Math.sin(d)*4,1); c.fill(); } return 'estrela'; },
  frog:function(c,o,t){
    c.fillStyle='#15803d'; c.beginPath(); c.arc(14,0,20,.35,TAU-.35); c.lineTo(14,0); c.closePath(); c.fill(); c.strokeStyle='#166534'; c.lineWidth=1.2; for(var k=0;k<6;k++){ var a=.5+k*.95; c.beginPath(); c.moveTo(14,0); c.lineTo(14+Math.cos(a)*18,Math.sin(a)*18); c.stroke(); }
    [-1,1].forEach(function(l){ c.fillStyle='#4ade80'; circ(c,30,l*7,6); c.fill(); c.fillStyle='#fff'; circ(c,31,l*7,4); c.fill(); c.fillStyle='#111'; circ(c,32,l*7,2); c.fill(); });
    c.fillStyle='#f472b6'; circ(c,0,-12,4); c.fill(); return 'coroa'; },
  red:function(c,o,t){
    c.fillStyle='#a16207'; rr(c,-6,-14,46,28,6); c.fill(); c.strokeStyle='rgba(120,53,15,.6)'; c.lineWidth=1.4; for(var x=-6;x<40;x+=6){ c.beginPath(); c.moveTo(x,-14); c.lineTo(x+6,14); c.moveTo(x+6,-14); c.lineTo(x,14); c.stroke(); }
    c.save(); c.beginPath(); rr(c,18,-12,20,24,3); c.clip(); for(var i=0;i<5;i++) for(var j=0;j<6;j++){ c.fillStyle=(i+j)%2?'#dc2626':'#fff'; c.fillRect(18+i*4,-12+j*4,4,4); } c.restore();
    c.strokeStyle='#78350f'; c.lineWidth=3; c.beginPath(); c.moveTo(4,-14); c.quadraticCurveTo(10,0,4,14); c.stroke(); return 'nenhum'; },
  pig:function(c,o,t){
    c.fillStyle='#b91c1c'; rr(c,-6,-15,46,30,3); c.fill(); c.strokeStyle='rgba(254,226,226,.55)'; c.lineWidth=1; for(var y=-12;y<15;y+=5){ c.beginPath(); c.moveTo(-6,y); c.lineTo(40,y); c.stroke(); for(var x=-6+((y+12)/5%2)*5;x<40;x+=10){ c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+5); c.stroke(); } }
    c.fillStyle='#7c2d12'; c.beginPath(); c.moveTo(16,-17); c.lineTo(44,0); c.lineTo(16,0); c.closePath(); c.fill(); c.fillStyle='#9a3412'; c.beginPath(); c.moveTo(16,17); c.lineTo(44,0); c.lineTo(16,0); c.closePath(); c.fill();
    c.fillStyle='#57534e'; c.fillRect(24,-12,6,6); var f=(t*.6)%1; c.globalAlpha=.6*(1-f); c.fillStyle='#e5e7eb'; circ(c,22-f*14,-12-f*6,3+f*5); c.fill(); c.globalAlpha=1; return 'nenhum'; },
  lia:function(c,o,t){
    c.strokeStyle='#92400e'; c.lineWidth=3.5; [-1,1].forEach(function(l){ c.beginPath(); c.moveTo(-8,l*15); c.quadraticCurveTo(14,l*19,38,l*15); c.stroke(); });
    c.fillStyle=A.lin(c,0,-10,0,10,'#fde68a','#d97706'); el(c,14,0,20,10); c.fill();
    c.fillStyle='#fef3c7'; el(c,38,0,9,6); c.fill(); c.fillStyle='#111'; circ(c,42,-3,1.3); c.fill(); circ(c,42,3,1.3); c.fill();
    c.strokeStyle='#7c2d12'; c.lineWidth=2; for(var k=0;k<5;k++){ c.beginPath(); c.moveTo(30-k*3,0); c.lineTo(26-k*3,Math.sin(t*8+k)*5); c.stroke(); }
    c.fillStyle=o.cor||'#e11d48'; el(c,8,0,6,9); c.fill(); return 'nenhum'; },
  theo:function(c,o,t){ var fl=Math.sin(t*5)*.08;
    c.fillStyle='#1e3a8a'; rr(c,-6,-17,48,34,4); c.fill();
    c.fillStyle='#fffbeb'; c.save(); c.translate(18,0); c.rotate(fl); rr(c,-22,-15,22,13,2); c.fill(); rr(c,-22,2,22,13,2); c.fill(); c.restore(); c.fillStyle='#fffbeb'; rr(c,18,-15,22,13,2); c.fill(); rr(c,18,2,22,13,2); c.fill();
    c.strokeStyle='rgba(120,113,108,.6)'; c.lineWidth=1; for(var k=0;k<3;k++){ c.beginPath(); c.moveTo(22,-12+k*4); c.lineTo(36,-12+k*4); c.moveTo(22,5+k*4); c.lineTo(36,5+k*4); c.stroke(); }
    c.fillStyle='#2563eb'; c.beginPath(); c.moveTo(-12,-12); c.lineTo(-2,0); c.lineTo(-12,12); c.closePath(); c.fill(); A.estrela(c,-8,0,3,'#fde047',t); return 'estrela'; },
  bia:function(c,o,t){
    c.strokeStyle='#ec4899'; c.lineWidth=3; c.beginPath(); for(var x=0;x<30;x+=2) c.lineTo(-8-x,Math.sin(x*.3+t*8)*6); c.stroke();
    c.fillStyle='#1f2937'; circ(c,14,0,19); c.fill(); c.strokeStyle='#cbd5e1'; c.lineWidth=1.5; for(var k=0;k<16;k++){ var a=k/16*TAU; c.beginPath(); c.moveTo(14+Math.cos(a)*14,Math.sin(a)*14); c.lineTo(14+Math.cos(a)*19,Math.sin(a)*19); c.stroke(); }
    c.fillStyle='#38bdf8'; circ(c,14,0,13); c.fill(); c.strokeStyle='#f472b6'; c.lineWidth=2.5; circ(c,8,0,10); c.stroke(); return 'nenhum'; },
  leo:function(c,o,t){
    c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=1; for(var y=-12;y<=12;y+=4){ c.beginPath(); c.moveTo(-16,y); c.lineTo(-4,y); c.stroke(); } for(var x=-16;x<=-4;x+=4){ c.beginPath(); c.moveTo(x,-12); c.lineTo(x,12); c.stroke(); } c.strokeStyle='#e5e7eb'; c.lineWidth=2.5; c.strokeRect(-16,-12,12,24);
    c.fillStyle='#fff'; circ(c,16,0,19); c.fill(); c.strokeStyle='#111'; c.lineWidth=1.5; circ(c,16,0,19); c.stroke();
    c.fillStyle='#111'; c.beginPath(); for(var i=0;i<5;i++){ var a=i/5*TAU+t*.5; c.lineTo(16+Math.cos(a)*6,Math.sin(a)*6); } c.fill(); for(var j=0;j<5;j++){ var b=j/5*TAU+t*.5+.6; circ(c,16+Math.cos(b)*15,Math.sin(b)*15,4); c.fill(); } return 'nenhum'; },
  count:function(c,o,t){
    c.fillStyle='#0f0a2e'; rr(c,-6,-16,48,32,10); c.fill(); c.fillStyle='#312e81'; rr(c,30,-7,14,14,3); c.fill();
    c.fillStyle='rgba(129,140,248,.5)'; el(c,6,-6,8,4); c.fill();
    c.strokeStyle='#e0e7ff'; c.lineWidth=2; c.beginPath(); c.moveTo(38,0); c.quadraticCurveTo(30,-18,10,-22); c.stroke(); c.fillStyle='#e0e7ff'; c.beginPath(); c.moveTo(10,-22); c.quadraticCurveTo(18,-28,26,-20); c.quadraticCurveTo(18,-22,10,-22); c.fill(); return 'chapeu'; }
};
var ENFEITE_CAP={princess:'coroa',frog:'coroa',witch:'chapeu',fairy:'estrela',wolf:'orelhas',theo:'estrela',count:'chapeu'};

/* desenha o carrinho com sombra, rodas, corpo temático e capacete; a carroceria inclina na curva (rol) e cresce no salto */
function desenha(c,id,o){
  o=o||{}; var t=o.t||0, f=DES[id]||DES.lia, ar=o.ar||0, s=1+ar*.28;
  c.save();
  /* sombra (se afasta no salto) */
  c.save(); c.translate(4+ar*18,5+ar*18); c.fillStyle='rgba(0,0,0,'+(.28-ar*.12)+')'; el(c,16,0,30,17); c.fill(); c.restore();
  c.scale(s,s);
  if(o.turbo){ for(var k=0;k<2;k++){ var fl=10+Math.random()*12; c.fillStyle='rgba(249,115,22,.9)'; c.beginPath(); c.moveTo(-8,k?6:-6); c.lineTo(-8-fl,(k?6:-6)); c.lineTo(-8,k?10:-2); c.fill(); c.fillStyle='rgba(254,240,138,.95)'; c.beginPath(); c.moveTo(-8,k?7:-5); c.lineTo(-8-fl*.6,(k?7:-5)); c.lineTo(-8,k?9:-3); c.fill(); } }
  rodas(c,o.st||0,id==='wolf'||id==='pig'||id==='red'?16:14,o.giro);
  c.save(); c.translate(14,0); c.rotate((o.rol||0)*.08); c.scale(1,1-Math.abs(o.rol||0)*.05); c.translate(-14,0);
  var enf=f(c,o,t); if(enf==='nenhum') enf=ENFEITE_CAP[id]||null;
  capacete(c,id==='lia'?6:(id==='fairy'||id==='bia'||id==='witch'||id==='princess'||id==='frog'||id==='leo'?12:10),o.cap||o.cor||LISTA[id].cor,enf,t);
  c.restore();
  if(o.eu){ c.strokeStyle='rgba(253,224,71,.9)'; c.lineWidth=2.5; c.setLineDash([5,4]); el(c,16,0,30,22); c.stroke(); c.setLineDash([]); }
  c.restore();
}

/* ============================================================
   VISTA DE TRÁS (corrida 2,5D, estilo Enduro): o carrinho e o piloto
   vistos de costas, centrados em (0,0) = chão entre as rodas;
   ~120 px de largura na escala 1. O piloto aparece com o que o
   identifica de costas: coroa, chapéu de bruxa, orelhas, capuz…
   o = {cor, t, inc (inclinação -1..1 na curva), giro (0..1 rodando), eu}
   ============================================================ */
/* ---------- Corrida do Correio (Detetives do Tempo): pilotos entregadores e profissões
   do material, vistos de COSTAS. Cada um tem cabeça+ombros (PIL) e carrinho temático (CAR). ---------- */
function borda(c,cor,lw){ c.strokeStyle=cor||'rgba(48,24,44,.55)'; c.lineWidth=lw||2; c.stroke(); }
function ombros(c,cor,cor2){ rr(c,-17,7,34,17,7); c.fillStyle=A.lin(c,-17,0,17,0,cla(cor,.15),cor2||esc(cor,.2)); c.fill(); borda(c,null,1.5); }
function nuca(c,pele,cab,curto){ c.fillStyle=pele; el(c,-15,-2,3.6,5); c.fill(); el(c,15,-2,3.6,5); c.fill(); circ(c,0,-4,15.5); c.fillStyle=A.lin(c,0,-20,0,12,cla(cab,.12),esc(cab,.1)); c.fill(); borda(c,null,1.5);
  if(curto){ c.fillStyle=pele; c.beginPath(); c.moveTo(-8,9); c.quadraticCurveTo(0,4,8,9); c.lineTo(6,12); c.lineTo(-6,12); c.closePath(); c.fill(); } }
function antenaT(c,s,t){ c.strokeStyle='#4c3d6b'; c.lineWidth=2; var ex=s*(18+Math.sin(t*2)*2); c.beginPath(); c.moveTo(s*5,-17); c.quadraticCurveTo(s*8,-34,ex,-38); c.stroke(); c.lineWidth=1.1; for(var k=1;k<6;k++){ var u=k/6, px=s*5+(ex-s*5)*u, py=-17-21*u; c.beginPath(); c.moveTo(px-3,py-2); c.lineTo(px+3,py+2); c.stroke(); } c.fillStyle='#c4b5fd'; circ(c,ex,-38,2.6); c.fill(); }
var PIL={
  dragon:function(c,o,t){ ombros(c,'#facc15','#ca8a04'); c.strokeStyle='#7c4a1e'; c.lineWidth=4; c.beginPath(); c.moveTo(-15,9); c.lineTo(12,22); c.stroke();
    nuca(c,'#c68b59','#2c1a10',true); c.beginPath(); c.arc(0,-6,16.5,Math.PI,0); c.closePath(); c.fillStyle=A.lin(c,0,-22,0,-6,'#fef08a','#eab308'); c.fill(); borda(c,null,1.5);
    rr(c,-17,-9,34,5,2.5); c.fillStyle='#2563eb'; c.fill(); c.fillStyle='#1e3a8a'; rr(c,-5,-9,10,4,2); c.fill(); c.fillStyle='#2563eb'; circ(c,0,-22,2.4); c.fill(); },
  princess:function(c,o,t){ ombros(c,'#facc15','#ca8a04'); c.fillStyle='#fff'; c.beginPath(); c.moveTo(-8,7); c.lineTo(0,12); c.lineTo(8,7); c.closePath(); c.fill();
    c.fillStyle='#f3c9a8'; el(c,-16,0,3.4,4.6); c.fill(); el(c,16,0,3.4,4.6); c.fill();
    c.beginPath(); c.arc(0,-4,16.5,Math.PI*1.02,-.02); c.lineTo(17,6); c.quadraticCurveTo(0,13,-17,6); c.closePath(); c.fillStyle=A.lin(c,0,-21,0,10,'#b3a496','#6f6155'); c.fill(); borda(c,null,1.5);
    c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=2; c.beginPath(); c.arc(0,-4,11,1.2*Math.PI,1.6*Math.PI); c.stroke(); },
  knight:function(c,o,t){ ombros(c,'#dc2626'); c.save(); rr(c,-17,7,34,17,7); c.clip(); c.fillStyle='rgba(60,10,10,.35)'; for(var x=-16;x<18;x+=6) c.fillRect(x,7,2.4,18); for(var y=9;y<24;y+=6) c.fillRect(-17,y,34,2.4); c.restore();
    c.strokeStyle='#3359a8'; c.lineWidth=3.5; c.beginPath(); c.moveTo(-9,8); c.lineTo(-9,24); c.moveTo(9,8); c.lineTo(9,24); c.stroke();
    nuca(c,'#e8b48a','#8a7a6a',true); el(c,0,-10,29,7.5); c.fillStyle=A.lin(c,0,-17,0,-3,'#fde68a','#c9963f'); c.fill(); borda(c,'#8a6420',1.4);
    c.beginPath(); c.arc(0,-11,13,Math.PI,0); c.closePath(); c.fillStyle=A.lin(c,0,-24,0,-11,'#fef3c7','#e0b45e'); c.fill(); borda(c,'#8a6420',1.4); c.fillStyle='#dc2626'; c.fillRect(-13,-15,26,4);
    c.strokeStyle='rgba(138,100,32,.45)'; c.lineWidth=1; for(var k=-24;k<=24;k+=6){ c.beginPath(); c.moveTo(k,-13); c.lineTo(k+2,-6); c.stroke(); } },
  witch:function(c,o,t){ ombros(c,'#a16207','#713f12'); c.fillStyle='#fff'; c.fillRect(-3,7,6,17);
    nuca(c,'#d9a072','#3d2416',false); var sw=Math.sin(t*3)*3; c.beginPath(); c.moveTo(-4,-6); c.quadraticCurveTo(-7+sw,10,sw,20); c.quadraticCurveTo(7+sw,10,4,-6); c.closePath(); c.fillStyle='#2a160b'; c.fill(); c.fillStyle='#f472b6'; rr(c,-5,-9,10,5,2.5); c.fill();
    c.strokeStyle='#7c2d12'; c.lineWidth=1.6; c.beginPath(); c.moveTo(-17,-5); c.lineTo(-13,-3); c.moveTo(17,-5); c.lineTo(13,-3); c.stroke(); },
  wolf:function(c,o,t){ ombros(c,'#f8fafc','#cbd5e1'); c.strokeStyle='#cbd5e1'; c.lineWidth=1.5; c.beginPath(); c.moveTo(0,8); c.lineTo(0,24); c.stroke(); c.strokeStyle='#334155'; c.lineWidth=2; c.beginPath(); c.arc(0,6,12,.15*Math.PI,.85*Math.PI); c.stroke();
    nuca(c,'#8d5a3b','#1c1008',true); c.fillStyle='#1c1008'; for(var q=0;q<7;q++){ circ(c,-12+q*4,-16-Math.abs(q-3)*.8,4.6); c.fill(); } },
  fairy:function(c,o,t){ c.beginPath(); c.moveTo(-19,8); c.quadraticCurveTo(0,4,19,8); c.lineTo(15,24); c.lineTo(-15,24); c.closePath(); c.fillStyle=A.lin(c,0,6,0,24,'#ddd6fe','#8b5cf6'); c.fill(); borda(c,null,1.5);
    nuca(c,'#f6d3bc','#e5e7eb',true); c.strokeStyle='rgba(148,163,184,.8)'; c.lineWidth=1; for(var w=0;w<3;w++){ c.beginPath(); c.arc(0,-4,12-w*3,1.1*Math.PI,1.9*Math.PI); c.stroke(); }
    circ(c,0,-19,8); c.fillStyle=A.lin(c,0,-27,0,-11,'#ffffff','#cbd5e1'); c.fill(); borda(c,'#94a3b8',1.4); c.strokeStyle='#ec4899'; c.lineWidth=2; c.beginPath(); c.moveTo(-9,-22); c.lineTo(9,-16); c.stroke(); },
  frog:function(c,o,t){ ombros(c,'#f97316','#c2410c'); c.fillStyle='#e5e7eb'; c.fillRect(-17,14,34,3); c.fillStyle='#3b82f6'; c.fillRect(-3,7,6,17);
    nuca(c,'#b97a4e','#2c1a10',true); c.fillStyle='#2c1a10'; for(var k=0;k<3;k++){ el(c,0,8+k*5,3.6,3.2); c.fill(); }
    c.beginPath(); c.arc(0,-6,17,Math.PI,0); c.closePath(); c.fillStyle=A.lin(c,0,-23,0,-6,'#ffffff','#d1d5db'); c.fill(); borda(c,'#6b7280',1.4); el(c,0,-6,20,3.4); c.fillStyle='#f3f4f6'; c.fill(); borda(c,'#6b7280',1.2); c.fillStyle='#e5e7eb'; rr(c,-3,-23,6,17,3); c.fill(); },
  red:function(c,o,t){ ombros(c,'#8b5a2b','#5b3418'); c.fillStyle='#fff'; c.fillRect(-4,7,8,17); c.fillStyle='#3b82f6'; for(var y=9;y<24;y+=5) c.fillRect(-4,y,8,2);
    nuca(c,'#f0c39a','#3a2416',true); c.save(); c.translate(2,-15); c.rotate(-.18); el(c,0,0,18,7); c.fillStyle=A.lin(c,0,-7,0,7,'#ef4444','#991b1b'); c.fill(); borda(c,'#7f1d1d',1.4); c.fillStyle='#7f1d1d'; rr(c,-2,-11,4,5,2); c.fill(); c.restore(); },
  pig:function(c,o,t){ ombros(c,'#f8fafc','#cbd5e1'); c.strokeStyle='#1e3a8a'; c.lineWidth=3; c.beginPath(); c.moveTo(-9,8); c.lineTo(-9,24); c.moveTo(9,8); c.lineTo(9,24); c.stroke();
    nuca(c,'#e0a77a','#7c4a25',true); c.beginPath(); c.arc(0,-7,16,Math.PI,0); c.closePath(); c.fillStyle=A.lin(c,0,-23,0,-7,'#ffffff','#e2e8f0'); c.fill(); borda(c,'#94a3b8',1.4); c.fillStyle='#1e3a8a'; rr(c,-16.5,-10,33,4.5,2); c.fill();
    c.save(); c.translate(19,10); c.rotate(.3); rr(c,-3.5,-6,7,13,3); c.fillStyle='#fff'; c.fill(); borda(c,'#94a3b8',1); c.fillStyle='#93c5fd'; rr(c,-3.5,-8,7,3,1); c.fill(); c.restore(); },
  count:function(c,o,t){ var bat=Math.sin(t*4)*.15; [-1,1].forEach(function(s){ c.save(); c.translate(s*10,8); c.rotate(s*(-.5-bat)); el(c,s*16,-6,17,11); c.fillStyle=A.lin(c,0,-16,s*30,4,'#c3b3df','#fff6e3'); c.fill(); borda(c,'#5b4a80',1.2); c.fillStyle='rgba(92,60,70,.35)'; for(var l=0;l<3;l++) c.fillRect(s*16-9,-10+l*4,18,1.4); c.restore(); });
    for(var g=0;g<6;g++){ circ(c,-14+g*5.6,10,5); c.fillStyle='#fff'; c.fill(); borda(c,'#cbd5e1',1); }
    antenaT(c,-1,t); antenaT(c,1,t); circ(c,0,-4,15.5); c.fillStyle=A.lin(c,0,-20,0,12,'#e2dcef','#9a8dbb'); c.fill(); borda(c,'#4c3d6b',1.6);
    c.save(); c.translate(4,-19); c.rotate(.25); c.beginPath(); c.moveTo(-9,0); c.lineTo(-10,-10); c.lineTo(-4,-5); c.lineTo(0,-12); c.lineTo(4,-5); c.lineTo(10,-10); c.lineTo(9,0); c.closePath(); c.fillStyle=A.lin(c,0,-12,0,0,'#fef08a','#d97706'); c.fill(); borda(c,'#92400e',1.2); c.restore(); }
};
var CAR={
  dragon:function(c,o,t){ [[-18,-.25],[2,.1],[20,-.08]].forEach(function(p){ c.save(); c.translate(p[0],-66); c.rotate(p[1]); rr(c,-10,-8,20,14,2); c.fillStyle='#fffdf5'; c.fill(); borda(c,'#94a3b8',1.2); c.strokeStyle='#cbd5e1'; c.lineWidth=1; c.beginPath(); c.moveTo(-10,-8); c.lineTo(0,0); c.lineTo(10,-8); c.stroke(); c.fillStyle='#ef4444'; c.fillRect(4,-6,4,4); c.restore(); });
    rr(c,-46,-64,92,60,8); c.fillStyle=A.lin(c,0,-64,0,-4,'#fde047','#ca8a04'); c.fill(); borda(c,'#854d0e',2); c.fillStyle='#1d4ed8'; c.fillRect(-46,-40,92,10); c.fillStyle='#fde047'; c.font='900 9px Arial'; c.textAlign='center'; c.fillText('CORREIO',0,-32);
    c.fillStyle='#713f12'; rr(c,-26,-56,52,6,3); c.fill(); return -60; },
  princess:function(c,o,t){ rr(c,-46,-66,92,62,6); c.fillStyle=A.lin(c,0,-66,0,-4,'#c08040','#7c4a1e'); c.fill(); borda(c,'#4a2810',2); rr(c,-38,-58,76,44,3); c.fillStyle='#166534'; c.fill();
    c.fillStyle='rgba(255,255,255,.9)'; c.font='900 18px Arial'; c.textAlign='center'; c.fillText('A B C',0,-34); c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=2; c.beginPath(); c.moveTo(-24,-24); c.lineTo(20,-24); c.stroke();
    c.fillStyle='#ef4444'; circ(c,34,-68,7); c.fill(); borda(c,'#7f1d1d',1.2); c.fillStyle='#16a34a'; el(c,37,-76,4,2); c.fill(); return -62; },
  knight:function(c,o,t){ for(var k=0;k<8;k++){ var x=-38+k*11, y=-60+(k%2)*3; circ(c,x,y,7); c.fillStyle=A.lin(c,x-5,y-5,x+5,y+5,'#fca5a5','#dc2626'); c.fill(); borda(c,'#7f1d1d',1); c.fillStyle='#16a34a'; el(c,x,y-6,3,1.5); c.fill(); }
    rr(c,-46,-58,92,54,4); c.fillStyle=A.lin(c,0,-58,0,-4,'#d6a265','#9a6a3a'); c.fill(); borda(c,'#5b3a1e',2); c.strokeStyle='#7a5028'; c.lineWidth=2; [-40,-24].forEach(function(y){ c.beginPath(); c.moveTo(-46,y); c.lineTo(46,y); c.stroke(); }); [-22,22].forEach(function(x){ c.beginPath(); c.moveTo(x,-58); c.lineTo(x,-4); c.stroke(); }); return -58; },
  witch:function(c,o,t){ rr(c,-46,-62,92,58,10); c.fillStyle=A.lin(c,0,-62,0,-4,'#a16207','#5b2a0e'); c.fill(); borda(c,'#3f1d06',2); c.fillStyle='#fbbf24'; c.fillRect(-32,-62,7,58); c.fillRect(25,-62,7,58);
    [['#38bdf8',-14,-46,.2],['#f472b6',8,-26,-.15],['#4ade80',-8,-22,.1]].forEach(function(s){ c.save(); c.translate(s[1],s[2]); c.rotate(s[3]); rr(c,-8,-5,16,10,4); c.fillStyle=s[0]; c.fill(); c.restore(); });
    c.save(); c.translate(36,-58); c.rotate(.5); c.strokeStyle='#b45309'; c.lineWidth=4; circ(c,0,-10,10); c.stroke(); c.fillStyle='rgba(186,230,253,.6)'; c.fill(); c.fillStyle='#7c2d12'; rr(c,-2.5,0,5,14,2); c.fill(); c.restore(); return -60; },
  wolf:function(c,o,t){ rr(c,-46,-58,92,54,16); c.fillStyle=A.lin(c,0,-58,0,-4,'#92400e','#451a03'); c.fill(); borda(c,'#2a1003',2); c.fillStyle='#d1d5db'; rr(c,-44,-60,88,7,3); c.fill(); c.fillStyle='#fbbf24'; rr(c,-6,-58,12,8,2); c.fill();
    circ(c,0,-30,12); c.fillStyle='#fff'; c.fill(); c.fillStyle='#16a34a'; c.fillRect(-2.5,-38,5,16); c.fillRect(-8,-32.5,16,5);
    c.strokeStyle='#475569'; c.lineWidth=3; c.beginPath(); c.moveTo(-40,-56); c.quadraticCurveTo(-46,-24,-30,-16); c.stroke(); c.fillStyle='#cbd5e1'; circ(c,-30,-16,4); c.fill(); return -60; },
  fairy:function(c,o,t){ rr(c,-50,-46,18,40,7); c.fillStyle='#be185d'; c.fill(); rr(c,32,-46,18,40,7); c.fill();
    rr(c,-38,-80,76,76,24); c.fillStyle=A.lin(c,0,-80,0,-4,'#f9a8d4','#db2777'); c.fill(); borda(c,'#831843',2); c.fillStyle='rgba(255,255,255,.75)'; for(var i=0;i<9;i++){ var x=-26+(i%3)*26, y=-66+Math.floor(i/3)*20; for(var p=0;p<5;p++){ circ(c,x+Math.cos(p*1.26)*3.4,y+Math.sin(p*1.26)*3.4,2.2); c.fill(); } }
    [['#a78bfa',-40,-10],['#4ade80',42,-8]].forEach(function(b){ circ(c,b[1],b[2],7); c.fillStyle=b[0]; c.fill(); c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=1; c.beginPath(); c.arc(b[1],b[2],4,0,3); c.stroke(); }); return -76; },
  frog:function(c,o,t){ rr(c,-46,-58,92,54,6); c.fillStyle=A.lin(c,0,-58,0,-4,'#fde047','#eab308'); c.fill(); borda(c,'#854d0e',2);
    c.save(); c.beginPath(); c.rect(-46,-26,92,14); c.clip(); c.fillStyle='#1c1917'; for(var x=-60;x<60;x+=14){ c.beginPath(); c.moveTo(x,-12); c.lineTo(x+7,-12); c.lineTo(x+21,-26); c.lineTo(x+14,-26); c.closePath(); c.fill(); } c.restore();
    c.beginPath(); c.moveTo(38,-58); c.lineTo(44,-80); c.lineTo(50,-58); c.closePath(); c.fillStyle='#f97316'; c.fill(); c.fillStyle='#fff'; c.fillRect(40,-70,8,4); return -58; },
  red:function(c,o,t){ rr(c,-44,-64,88,60,6); c.fillStyle=A.lin(c,0,-64,0,-4,'#b9774a','#6b3f1f'); c.fill(); borda(c,'#3f2412',2); rr(c,-26,-54,52,36,3); c.fillStyle='#64748b'; c.fill(); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; for(var g=1;g<3;g++){ c.beginPath(); c.moveTo(-26+g*17,-54); c.lineTo(-26+g*17,-18); c.moveTo(-26,-54+g*12); c.lineTo(26,-54+g*12); c.stroke(); }
    c.strokeStyle='#374151'; c.lineWidth=2.5; c.beginPath(); c.moveTo(38,-60); c.lineTo(38,-84); c.stroke(); c.fillStyle='#e5e7eb'; rr(c,28,-90,20,6,2); c.fill(); return -62; },
  pig:function(c,o,t){ for(var b=0;b<5;b++){ var x=-36+b*18; rr(c,x-6,-74,12,28,5); c.fillStyle='#fff'; c.fill(); borda(c,'#94a3b8',1.2); rr(c,x-3,-80,6,7,2); c.fillStyle='#cbd5e1'; c.fill(); c.fillStyle='#93c5fd'; rr(c,x-4,-80,8,3,1.5); c.fill(); }
    rr(c,-46,-50,92,46,4); c.fillStyle=A.lin(c,0,-50,0,-4,'#60a5fa','#1d4ed8'); c.fill(); borda(c,'#1e3a8a',2); c.fillStyle='rgba(30,58,138,.55)'; for(var h=0;h<6;h++){ rr(c,-38+h*13,-40,9,14,4); c.fill(); }
    c.fillStyle='#fff'; c.font='900 9px Arial'; c.textAlign='center'; c.fillText('LEITE',0,-12); return -64; },
  count:function(c,o,t){ c.beginPath(); c.moveTo(-42,-71); for(var k=0;k<6;k++){ c.arc(-35+k*14,-71,7,Math.PI,0,k%2===0); } c.lineTo(42,-71); c.lineTo(42,-60); c.lineTo(-42,-60); c.closePath(); c.fillStyle='#fffbeb'; c.fill(); borda(c,'#a0763f',1.2); c.strokeStyle='rgba(160,118,63,.5)'; c.lineWidth=1; c.beginPath(); c.moveTo(-40,-66); c.lineTo(40,-66); c.stroke();
    rr(c,-46,-62,92,58,6); c.fillStyle=A.lin(c,0,-62,0,-4,'#7c3aed','#3b0764'); c.fill(); borda(c,'#2e1065',2); c.fillStyle='#fbbf24'; c.fillRect(-30,-46,60,4); c.fillRect(-20,-38,40,3); c.fillStyle='#fffbeb'; circ(c,30,-16,6); c.fill(); circ(c,-34,-22,4); c.fill(); return -64; }
};
function cabeca(c,id,o,t){
  if(PIL[id]){ PIL[id](c,o,t); return; }
  function cabelo(cor,longo){ c.fillStyle=cor; circ(c,0,-4,15); c.fill(); if(longo){ rr(c,-14,-6,28,24,10); c.fill(); } }
  switch(id){
    case 'lia': cabelo('#8d5530',true); c.fillStyle=o.cor||'#e11d48'; rr(c,-16,10,32,14,4); c.fill(); return;
    case 'theo': cabelo('#2c1a10',false); c.fillStyle='#1d4ed8'; c.beginPath(); c.moveTo(-15,-10); c.lineTo(4,-46); c.lineTo(15,-10); c.closePath(); c.fill(); A.estrela(c,2,-24,4,'#fde047',0); return;
    case 'bia': cabelo('#3d2416',false); c.fillStyle='#3d2416'; circ(c,0,-22,8); c.fill(); c.fillStyle='#ec4899'; el(c,0,-15,8,3); c.fill(); return;
    case 'leo': c.fillStyle='#2a160b'; circ(c,0,-4,15); c.fill(); for(var q=0;q<7;q++){ circ(c,-12+q*4,-15-Math.abs(q-3),5); c.fill(); } c.fillStyle=o.cor||'#facc15'; rr(c,-16,10,32,14,4); c.fill(); c.fillStyle='#111'; c.font='900 11px Arial'; c.textAlign='center'; c.fillText('10',0,21); return;
  }
}
function corpoTras(c,id,o,t){
  if(CAR[id]) return CAR[id](c,o,t);
  var cor=o.cor||LISTA[id].cor, k, i, x, y;
  switch(id){
    case 'lia': c.strokeStyle='#92400e'; c.lineWidth=6; c.beginPath(); c.moveTo(-50,-8); c.quadraticCurveTo(0,6,50,-8); c.stroke(); c.fillStyle=A.lin(c,0,-60,0,-10,'#fde68a','#d97706'); el(c,0,-36,38,22); c.fill(); c.strokeStyle='#7c2d12'; c.lineWidth=3; for(k=0;k<6;k++){ c.beginPath(); c.moveTo(-6+k*2,-24); c.quadraticCurveTo(-8+k*3+Math.sin(t*8+k)*4,-6,-10+k*4,4); c.stroke(); } return -52;
    case 'theo': c.fillStyle='#1e3a8a'; rr(c,-50,-60,100,56,6); c.fill(); c.fillStyle='#fffbeb'; c.beginPath(); c.moveTo(-46,-56); c.lineTo(0,-46); c.lineTo(46,-56); c.lineTo(46,-12); c.lineTo(0,-6); c.lineTo(-46,-12); c.closePath(); c.fill(); c.strokeStyle='rgba(120,113,108,.6)'; c.lineWidth=1.5; for(var l2=0;l2<4;l2++){ c.beginPath(); c.moveTo(-40,-48+l2*9); c.lineTo(-6,-42+l2*9); c.moveTo(6,-42+l2*9); c.lineTo(40,-48+l2*9); c.stroke(); } return -54;
    case 'bia': c.fillStyle='#1f2937'; el(c,0,-30,50,26); c.fill(); c.strokeStyle='#cbd5e1'; c.lineWidth=2; for(k=0;k<20;k++){ var a2=k/20*Math.PI*2; c.beginPath(); c.moveTo(Math.cos(a2)*42,-30+Math.sin(a2)*20); c.lineTo(Math.cos(a2)*50,-30+Math.sin(a2)*26); c.stroke(); } c.fillStyle='#38bdf8'; el(c,0,-30,40,19); c.fill(); c.strokeStyle='#ec4899'; c.lineWidth=4; c.beginPath(); for(x=0;x<60;x+=3) c.lineTo(-30+x,-4+Math.sin(x*.2+t*8)*6); c.stroke(); return -50;
    case 'leo': c.fillStyle='#fff'; circ(c,0,-42,40); c.fill(); c.strokeStyle='#111'; c.lineWidth=2; circ(c,0,-42,40); c.stroke(); c.fillStyle='#111'; c.beginPath(); for(i=0;i<5;i++){ var b=i/5*Math.PI*2+t; c.lineTo(Math.cos(b)*12,-42+Math.sin(b)*12); } c.fill(); for(var j2=0;j2<5;j2++){ var b2=j2/5*Math.PI*2+t+.6; circ(c,Math.cos(b2)*32,-42+Math.sin(b2)*32,8); c.fill(); } return -78;
  }
  c.fillStyle=cor; rr(c,-44,-56,88,52,10); c.fill(); return -56;
}
/* desenha de costas: sombra, rodas, corpo temático, piloto */
function desenhaTras(c,id,o){
  o=o||{}; var t=o.t||0; c.save();
  c.fillStyle='rgba(0,0,0,.28)'; el(c,0,2,60,10); c.fill();
  if(o.giro) c.rotate(Math.sin(o.giro*Math.PI*2)*.5);
  c.rotate((o.inc||0)*.12);
  if(o.turbo){ for(var k=0;k<2;k++){ var fl=14+((t*37+k*13)%1)*10; c.fillStyle='rgba(249,115,22,.9)'; c.beginPath(); c.moveTo(-26+k*52-6,-12); c.lineTo(-26+k*52,-12+fl); c.lineTo(-26+k*52+6,-12); c.fill(); } }
  [-1,1].forEach(function(l){ c.fillStyle='#111827'; rr(c,l*46-11,-30,22,30,6); c.fill(); c.fillStyle='#374151'; c.fillRect(l*46-8,-26+((t*30)%6),16,2); });
  var topo=corpoTras(c,id,o,t);
  c.save(); c.translate(0,topo-6); cabeca(c,id,o,t); c.restore();
  c.restore();
}

return {desenha:desenha, desenhaTras:desenhaTras, LISTA:LISTA};
})();
