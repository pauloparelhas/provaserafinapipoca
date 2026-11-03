/* ============================================================
   CIE3_jogo_pele.js — REFEITURA 03/11 (CRITICA_JOGO.md): a PELE do material nas peças de jogo
   e a PALETA legível. Carrega por último (depois de arteA/B/C e de CIE3_jogo_cie.js).
     · o objeto do cenário É a peça: no quarto os blocos são sofá, cômoda, estante e pilha de livros;
       na escola, muro de tijolinho e armários; na torre, vigas de ferro rebitadas; no rio, a represa e
       pedras; no campo, fardos de feno; no parque, torres do parquinho e os aparelhos viram balanço,
       barras de macaco e cama elástica; no estádio, arquibancada;
     · chão e plataforma SATURADOS com topo claro e contorno escuro; o fundo leva um véu da cor do céu
       (fica para trás); inimigos com halo de contraste.
   Sem aleatório por frame (sorteio por hash da posição), sem pisca. GERADO: copiado de gen/novos/.
   ============================================================ */
window.CIE3P=(function(){
'use strict';
var A=window.ARTE; if(!A) return null;
var T=45, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, hash=A.hash, OL='#2a2018';
function lin(c,x0,y0,x1,y1,a,b){ var g=c.createLinearGradient(x0,y0,x1,y1); g.addColorStop(0,a); g.addColorStop(1,b); return g; }
function fs(c,f,lw,st){ c.fillStyle=f; c.fill(); c.strokeStyle=st||OL; c.lineWidth=lw==null?2.5:lw; c.stroke(); }
function box(c,x,y,w,h,f,r,lw){ rr(c,x,y,w,h,r||3); fs(c,f,lw); }
function JJ(){ return window.JOGO&&JOGO.J||null; }
function mundo(){ var j=JJ(); return j&&j.mundo; }
function ehChao(s){ var M=mundo(); return !!M&&s.y+s.h>=M.h-2&&s.w>=6*T; }
function topo(c,x,y,w,cor,h){ c.fillStyle=cor; c.fillRect(x,y,w,h||7); c.fillStyle='rgba(255,255,255,.55)'; c.fillRect(x,y,w,2); }

/* ---------- véu do fundo: puxa o cenário para trás ---------- */
var VEU={vila:['255,244,222',.42], bosque:['232,244,255',.34], casa:['225,242,254',.30], recife:['10,52,82',.18], nuvens:['230,244,255',.30], ginasio:['240,249,255',.34], estadio:['236,254,255',.46]};
function veu(c,cena,M){ var v=VEU[cena]; if(!v||/^sub_/.test(M.cena)) return; c.save(); c.fillStyle='rgba('+v[0]+','+v[1]+')'; c.fillRect(0,0,A.W||960,A.H||540); c.restore(); }

/* ---------- CHÃO (o piso de cada cena: saturado, topo claro) ---------- */
function piso(c,s,cor0,cor1,top,risca){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,cor0,cor1); c.fillRect(s.x,s.y,s.w,s.h); topo(c,s.x,s.y,s.w,top,9);
  c.fillStyle='rgba(0,0,0,.28)'; c.fillRect(s.x,s.y+9,s.w,3); if(risca) risca(); c.strokeStyle=OL; c.lineWidth=2.5; c.strokeRect(s.x,s.y,s.w,s.h); }
var CHAO={
  vila:function(c,s){ piso(c,s,'#d98a3d','#8f4f1f','#ffd08a',function(){ c.strokeStyle='rgba(90,40,10,.45)'; c.lineWidth=2; for(var y=s.y+34;y<s.y+s.h;y+=26){ c.beginPath(); c.moveTo(s.x,y); c.lineTo(s.x+s.w,y); c.stroke(); var o=(Math.round(y/26)%2)*45; for(var x=Math.ceil((s.x-o)/90)*90+o;x<s.x+s.w;x+=90){ c.beginPath(); c.moveTo(x,y-26); c.lineTo(x,y); c.stroke(); } } }); },
  recife:function(c,s){ piso(c,s,'#e8b04a','#9c6a25','#ffe08a',function(){ c.fillStyle='rgba(120,70,20,.35)'; for(var x=Math.ceil(s.x/31)*31;x<s.x+s.w;x+=31){ circ(c,x+hash(x)*18,s.y+22+hash(x+3)*Math.max(4,s.h-30),2+hash(x+1)*3); c.fill(); } }); },
  nuvens:function(c,s){ piso(c,s,'#9a5f2c','#5c3414','#5cc23a',function(){ c.fillStyle='#3f9a28'; c.fillRect(s.x,s.y+9,s.w,6); c.fillStyle='rgba(60,30,10,.35)'; for(var x=Math.ceil(s.x/37)*37;x<s.x+s.w;x+=37){ el(c,x+hash(x)*20,s.y+34+hash(x+2)*Math.max(4,s.h-44),5,3); c.fill(); } }); },
  ginasio:function(c,s){ piso(c,s,'#f0b45a','#a8682a','#6ed14a',function(){ c.fillStyle='#4caf2f'; c.fillRect(s.x,s.y+9,s.w,5); c.fillStyle='rgba(130,70,20,.3)'; for(var x=Math.ceil(s.x/23)*23;x<s.x+s.w;x+=23){ circ(c,x+hash(x)*12,s.y+26+hash(x+1)*Math.max(4,s.h-34),2); c.fill(); } }); },
  estadio:function(c,s){ piso(c,s,'#3fae3a','#1f6e22','#a3e635',function(){ for(var x=Math.floor(s.x/90)*90;x<s.x+s.w;x+=90){ if(Math.floor(x/90)%2){ c.fillStyle='rgba(255,255,255,.1)'; c.fillRect(Math.max(x,s.x),s.y+12,Math.min(90,s.x+s.w-Math.max(x,s.x)),s.h-12); } } c.fillStyle='#fff'; c.fillRect(s.x,s.y+12,s.w,3); }); }
};

/* ---------- BLOCOS: o móvel / a construção É a peça ---------- */
function sofa(c,s){ box(c,s.x,s.y+10,s.w,s.h-10,lin(c,0,s.y,0,s.y+s.h,'#ef4444','#991b1b'),12);
  rr(c,s.x+4,s.y,s.w-8,26,12); fs(c,lin(c,0,s.y,0,s.y+26,'#fca5a5','#dc2626'),2.5); c.fillStyle='rgba(255,255,255,.5)'; rr(c,s.x+12,s.y+4,s.w-24,4,2); c.fill();
  c.fillStyle='rgba(80,10,10,.4)'; for(var x=s.x+26;x<s.x+s.w-12;x+=34){ circ(c,x,s.y+s.h*.6,3); c.fill(); }
  if(s.h>70){ c.fillStyle='#7c2d12'; c.fillRect(s.x+8,s.y+s.h-8,10,8); c.fillRect(s.x+s.w-18,s.y+s.h-8,10,8); } }
function comoda(c,s){ box(c,s.x,s.y,s.w,s.h,lin(c,0,s.y,0,s.y+s.h,'#f59e0b','#b45309'),4); topo(c,s.x+2,s.y+2,s.w-4,'#fde68a',6);
  for(var y=s.y+14;y<s.y+s.h-10;y+=34){ box(c,s.x+7,y,s.w-14,26,lin(c,0,y,0,y+26,'#fbbf24','#d97706'),4,1.8); c.fillStyle='#78350f'; circ(c,s.x+s.w/2,y+13,4); c.fill(); } }
function livros(c,s){ var cores=['#2563eb','#16a34a','#dc2626','#9333ea','#ea580c','#0891b2'], y=s.y, i=0;
  while(y<s.y+s.h){ var h=Math.min(22+Math.floor(hash(s.x+y)*12),s.y+s.h-y), dx=Math.round((hash(y*1.7+s.x)-.5)*8); var x=s.x+Math.max(0,dx), w=s.w-Math.abs(dx);
    box(c,x,y,w,h,cores[(i+Math.floor(hash(s.x)*6))%6],3,2); c.fillStyle='#fefce8'; c.fillRect(x+w-7,y+3,4,h-6); c.fillStyle='rgba(255,255,255,.4)'; c.fillRect(x+5,y+3,w-16,3); y+=h; i++; } }
function estante(c,s){ box(c,s.x,s.y,s.w,s.h,lin(c,0,s.y,0,s.y+s.h,'#c2410c','#7c2d12'),3); topo(c,s.x+2,s.y+2,s.w-4,'#fdba74',6);
  for(var y=s.y+10;y+38<s.y+s.h;y+=45){ c.fillStyle='#431407'; c.fillRect(s.x+6,y,s.w-12,36); for(var x=s.x+8;x<s.x+s.w-12;x+=9){ c.fillStyle=['#3b82f6','#22c55e','#ef4444','#eab308','#a855f7'][Math.floor(hash(x+y)*5)]; c.fillRect(x,y+6+hash(x*3+y)*8,7,30-hash(x*3+y)*8); } } }
function tijolinho(c,s){ box(c,s.x,s.y,s.w,s.h,lin(c,0,s.y,0,s.y+s.h,'#e8553f','#a8321f'),2); c.strokeStyle='rgba(255,230,210,.6)'; c.lineWidth=2;
  for(var y=s.y+14,k=0;y<s.y+s.h;y+=15,k++){ c.beginPath(); c.moveTo(s.x,y); c.lineTo(s.x+s.w,y); c.stroke(); for(var x=s.x+(k%2?15:0);x<s.x+s.w;x+=30){ c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+15); c.stroke(); } }
  topo(c,s.x-2,s.y-4,s.w+4,'#e5e7eb',10); c.strokeStyle=OL; c.lineWidth=2.5; c.strokeRect(s.x-2,s.y-4,s.w+4,10); }
function viga(c,s){ box(c,s.x,s.y,s.w,s.h,lin(c,0,s.y,0,s.y+s.h,'#c2622b','#7a3412'),2); topo(c,s.x+2,s.y+2,s.w-4,'#fdba74',7);
  c.save(); rr(c,s.x+3,s.y+11,s.w-6,s.h-14,2); c.clip(); c.strokeStyle='rgba(60,20,5,.55)'; c.lineWidth=3; for(var x=Math.floor(s.x/36)*36;x<s.x+s.w+40;x+=36){ c.beginPath(); c.moveTo(x,s.y+11); c.lineTo(x+36,s.y+s.h); c.moveTo(x+36,s.y+11); c.lineTo(x,s.y+s.h); c.stroke(); } c.restore();
  c.fillStyle='#fde68a'; for(var r=s.x+10;r<s.x+s.w-4;r+=18){ circ(c,r,s.y+14,2.2); c.fill(); } }
function represa(c,s){ box(c,s.x,s.y,s.w,s.h,lin(c,s.x,0,s.x+s.w,0,'#cbd5e1','#64748b'),3); topo(c,s.x+2,s.y+2,s.w-4,'#f1f5f9',7);
  c.strokeStyle='rgba(51,65,85,.5)'; c.lineWidth=2; for(var y=s.y+24;y<s.y+s.h;y+=24){ c.beginPath(); c.moveTo(s.x,y); c.lineTo(s.x+s.w,y); c.stroke(); }
  c.fillStyle='rgba(125,211,252,.85)'; for(var x=s.x+10;x<s.x+s.w-8;x+=22){ rr(c,x,s.y+12,8,s.h-14,4); c.fill(); } }
function pedra(c,s){ rr(c,s.x,s.y+4,s.w,s.h-4,16); fs(c,lin(c,0,s.y,0,s.y+s.h,'#94a3b8','#475569'),2.5); c.fillStyle='#65a30d'; rr(c,s.x+4,s.y,s.w-8,12,6); c.fill(); c.fillStyle='rgba(255,255,255,.35)'; rr(c,s.x+10,s.y+16,s.w*.3,5,3); c.fill(); }
function feno(c,s){ box(c,s.x,s.y,s.w,s.h,lin(c,0,s.y,0,s.y+s.h,'#facc15','#ca8a04'),8); topo(c,s.x+4,s.y+3,s.w-8,'#fef08a',6);
  c.strokeStyle='rgba(133,77,14,.55)'; c.lineWidth=1.6; for(var x=s.x+6;x<s.x+s.w-4;x+=7){ c.beginPath(); c.moveTo(x,s.y+12); c.lineTo(x+3,s.y+s.h-4); c.stroke(); }
  c.strokeStyle='#b91c1c'; c.lineWidth=3; [s.x+s.w*.3,s.x+s.w*.7].forEach(function(x){ c.beginPath(); c.moveTo(x,s.y); c.lineTo(x,s.y+s.h); c.stroke(); }); }
function torrinha(c,s){ var cor=['#ef4444','#3b82f6','#f59e0b','#22c55e'][Math.floor(hash(s.x*.37)*4)];
  box(c,s.x,s.y,s.w,s.h,lin(c,0,s.y,0,s.y+s.h,cor,'#1e293b'),6); topo(c,s.x+3,s.y+3,s.w-6,'#fef9c3',7);
  c.fillStyle='rgba(255,255,255,.75)'; for(var y=s.y+22;y<s.y+s.h-16;y+=40){ circ(c,s.x+s.w/2,y+8,9); c.fill(); } }
function arquibancada(c,s){ box(c,s.x,s.y,s.w,s.h,lin(c,0,s.y,0,s.y+s.h,'#94a3b8','#475569'),3); topo(c,s.x+2,s.y+2,s.w-4,'#e2e8f0',7);
  for(var y=s.y+14,k=0;y<s.y+s.h-8;y+=24,k++){ for(var x=s.x+6;x<s.x+s.w-14;x+=18){ c.fillStyle=['#2563eb','#facc15','#dc2626'][(k+Math.floor(x/18))%3]; rr(c,x,y,13,10,3); c.fill(); } } }
var BLOCO={
  vila:function(c,s){ var h=hash(s.x*.71+s.w); if(s.w>=4*T&&s.h<=3*T) sofa(c,s); else if(s.w<=2*T&&s.h>=3*T) estante(c,s); else if(h<.5) comoda(c,s); else livros(c,s); },
  bosque:tijolinho, casa:viga,
  recife:function(c,s){ if(s.x<10) CHAO.recife(c,s); else if(s.h>=3*T) represa(c,s); else pedra(c,s); },
  nuvens:feno, ginasio:torrinha, estadio:arquibancada
};

/* ---------- PLATAFORMAS (=): saturadas com topo claro ---------- */
function prancha(c,p,a,b,top){ box(c,p.x,p.y,p.w,p.h,lin(c,0,p.y,0,p.y+p.h,a,b),5); topo(c,p.x+3,p.y+2,p.w-6,top,5); }
var PLAT={
  vila:function(c,p){ var h=hash(p.x*.13+p.y); if(h<.45){ /* prateleira com livros em pé */ prancha(c,p,'#f59e0b','#b45309','#fde68a'); [p.x+16,p.x+p.w-22].forEach(function(x){ c.beginPath(); c.moveTo(x,p.y+p.h); c.lineTo(x+7,p.y+p.h); c.lineTo(x+7,p.y+p.h+12); c.closePath(); fs(c,'#92400e',1.5); }); }
    else if(h<.75){ /* almofada roxa do sofá */ rr(c,p.x+1,p.y-2,p.w-2,p.h+4,10); fs(c,lin(c,0,p.y,0,p.y+p.h,'#c084fc','#7e22ce')); c.fillStyle='rgba(255,255,255,.55)'; rr(c,p.x+8,p.y+1,p.w-16,4,2); c.fill(); }
    else { /* livro grande deitado */ box(c,p.x,p.y,p.w,p.h,'#2563eb',3); c.fillStyle='#fefce8'; c.fillRect(p.x+4,p.y+4,p.w-8,p.h-9); c.fillStyle='#1d4ed8'; c.fillRect(p.x,p.y+p.h-5,p.w,5); } },
  bosque:function(c,p){ prancha(c,p,'#fb923c','#c2410c','#fed7aa'); c.strokeStyle='rgba(124,45,18,.5)'; c.lineWidth=2; for(var x=p.x+45;x<p.x+p.w;x+=45){ c.beginPath(); c.moveTo(x,p.y+3); c.lineTo(x,p.y+p.h-2); c.stroke(); } },
  casa:function(c,p){ viga(c,{x:p.x,y:p.y,w:p.w,h:Math.max(p.h,18)}); },
  recife:function(c,p){ prancha(c,p,'#b45309','#78350f','#fbbf24'); c.fillStyle='#78350f'; el(c,p.x+4,p.y+p.h/2,5,p.h/2-1); c.fill(); el(c,p.x+p.w-4,p.y+p.h/2,5,p.h/2-1); c.fill(); },
  nuvens:function(c,p){ prancha(c,p,'#d97706','#92400e','#fde68a'); },
  ginasio:function(c,p){ var cor=['#ef4444','#3b82f6','#22c55e'][Math.floor(hash(p.x*.2)*3)]; prancha(c,p,cor,'#1e293b','#fef9c3'); },
  estadio:function(c,p){ prancha(c,p,'#60a5fa','#1d4ed8','#dbeafe'); }
};

/* ---------- embrulhos ---------- */
var chao0=A.chao, plat0=A.plataforma, mov0=A.platMovel, cai0=A.platCaindo;
A.chao=function(c,s,cena){ var M=mundo(); var real=M&&M.cena||cena; if(cena==='casa'&&BLOCO.casa){ c.save(); viga(c,s); c.restore(); return; }
  if(!/^sub_/.test(real)){ if(ehChao(s)&&CHAO[cena]){ c.save(); CHAO[cena](c,s); c.restore(); return; } if(!ehChao(s)&&BLOCO[cena]){ c.save(); BLOCO[cena](c,s); c.restore(); return; } }
  chao0(c,s,cena); };
A.plataforma=function(c,p,cena){ if(PLAT[cena]){ c.save(); PLAT[cena](c,p); c.restore(); return; } plat0(c,p,cena); };
A.platMovel=function(c,p,cena,t){ if(PLAT[cena]){ c.save(); PLAT[cena](c,p); c.fillStyle='rgba(255,255,255,.8)'; var mx=p.x+p.w/2; c.beginPath(); c.moveTo(mx-14,p.y+p.h/2); c.lineTo(mx-6,p.y+p.h/2-5); c.lineTo(mx-6,p.y+p.h/2+5); c.fill(); c.beginPath(); c.moveTo(mx+14,p.y+p.h/2); c.lineTo(mx+6,p.y+p.h/2-5); c.lineTo(mx+6,p.y+p.h/2+5); c.fill(); c.restore(); return; } mov0(c,p,cena,t); };
A.platCaindo=function(c,p,cena,t){ if(PLAT[cena]){ c.save(); var tr=p.estado==='treme'?Math.sin((t||0)*8)*2:0; c.translate(tr,0); PLAT[cena](c,p); c.strokeStyle='rgba(42,32,24,.6)'; c.lineWidth=2; c.beginPath(); c.moveTo(p.x+p.w*.35,p.y+2); c.lineTo(p.x+p.w*.42,p.y+p.h-2); c.lineTo(p.x+p.w*.5,p.y+4); c.stroke(); c.restore(); return; } cai0(c,p,cena,t); };

/* ---------- inimigos: a pele certa e halo de contraste ---------- */
var I=A.INIMIGOS_CIE||{};
function halo(c,fn){ var M=mundo(), sub=M&&/^sub_/.test(M.cena); c.save(); c.shadowColor=sub?'rgba(255,255,255,.55)':'rgba(15,23,42,.6)'; c.shadowBlur=7; fn(); c.restore(); }
if(I.gust) A.gust=function(c,e,t){ halo(c,function(){ I.gust(c,e.x,e.y,t||0,e.dir,!!e.achatado); }); };
if(I.top) A.piao=function(c,e,t){ halo(c,function(){ I.top(c,e.x,e.y,t||0,e.dir,!!e.achatado); }); };
if(I.puddle) A.puddle=function(c,e,t){ if(e.tipo!=='agua_viva'&&e.tipo!=='baiacu') return false; halo(c,function(){ c.save(); c.translate(e.x,e.y-14); var s=e.inchado?1.35:1; c.scale(s,s); I.puddle(c,0,14,t||0,e.dir,false); c.restore(); }); return true; };
['inimigo','poeira','ganso','traca'].forEach(function(k){ var f=A[k]; if(f) A[k]=function(){ var a=arguments, c=a[0], self=this, r; halo(c,function(){ r=f.apply(self,a); }); return r; }; });

/* ---------- parque: os aparelhos são brinquedos (balanço, barras de macaco, cama elástica) ---------- */
function aparelhos(c,M,t){
  if(M.cena==='bosque'){ /* escola: corda de balançar presa no galho do pátio (swing = back and forth) */
    (M.pendulos||[]).forEach(function(p){ var ex=p.ax+Math.sin(p.th)*p.len, ey=p.ay+Math.cos(p.th)*p.len; c.save();
      c.strokeStyle='#78350f'; c.lineWidth=7; c.beginPath(); c.moveTo(p.ax,p.ay); c.lineTo(ex,ey); c.stroke(); c.strokeStyle='#d6a35c'; c.lineWidth=4; c.setLineDash([6,4]); c.stroke(); c.setLineDash([]);
      c.fillStyle='#b45309'; circ(c,ex,ey+6,9); c.fill(); c.strokeStyle=OL; c.lineWidth=2; c.stroke(); c.restore(); });
    return !(M.barras&&M.barras.length)&&!(M.saltos&&M.saltos.length); }
  if(M.cena!=='ginasio') return false;
  (M.pendulos||[]).forEach(function(p){ var a=p.th, ex=p.ax+Math.sin(a)*p.len, ey=p.ay+Math.cos(a)*p.len;
    c.save(); c.strokeStyle='#1e3a8a'; c.lineWidth=7; c.beginPath(); c.moveTo(p.ax-58,p.ay+150); c.lineTo(p.ax-30,p.ay-8); c.lineTo(p.ax+30,p.ay-8); c.lineTo(p.ax+58,p.ay+150); c.stroke();
    c.strokeStyle='#3b82f6'; c.lineWidth=4; c.stroke();
    c.strokeStyle='#475569'; c.lineWidth=2.5; c.setLineDash([5,3]); c.beginPath(); c.moveTo(p.ax-12,p.ay-6); c.lineTo(ex-14,ey+8); c.moveTo(p.ax+12,p.ay-6); c.lineTo(ex+14,ey+8); c.stroke(); c.setLineDash([]);
    c.translate(ex,ey+10); c.rotate(-a*.6); rr(c,-20,-3,40,9,4); fs(c,'#f97316',2); c.restore(); });
  (M.barras||[]).forEach(function(b){ c.save(); var h=450-b.y;
    [[-30,'#dc2626'],[30,'#dc2626']].forEach(function(q){ c.strokeStyle=OL; c.lineWidth=9; c.beginPath(); c.moveTo(b.x+q[0],b.y); c.lineTo(b.x+q[0],b.y+h); c.stroke(); c.strokeStyle=q[1]; c.lineWidth=6; c.stroke(); });
    c.strokeStyle=OL; c.lineWidth=10; c.beginPath(); c.moveTo(b.x-36,b.y); c.lineTo(b.x+36,b.y); c.stroke(); c.strokeStyle='#facc15'; c.lineWidth=7; c.stroke();
    var a=JJ().agarrado; if(!(a&&a.b===b)){ c.strokeStyle='rgba(253,224,71,'+(.35+.3*Math.sin(t*5))+')'; c.lineWidth=3; c.beginPath(); c.arc(b.x,b.y,22,0,TAU); c.stroke(); }
    c.restore(); });
  (M.saltos||[]).forEach(function(s){ var sq=s.t>0?.55:1; c.save(); c.translate(s.x+s.w/2,s.y+s.h);
    c.strokeStyle='#1e293b'; c.lineWidth=4; c.beginPath(); c.moveTo(-20,0); c.lineTo(-16,-16); c.moveTo(20,0); c.lineTo(16,-16); c.stroke();
    el(c,0,-16*sq,26,7*sq+2); fs(c,'#2563eb',2.5); el(c,0,-18*sq,20,4*sq+1); c.fillStyle='#93c5fd'; c.fill(); c.restore(); });
  return true; }
/* trave do parque = tronco deitado; blocos do ritmo = pedras de pular coloridas */
function plataforma(c,p,t){ var M=mundo(); if(!M||M.cena!=='ginasio') return false;
  if(p.trave){ rr(c,p.x,p.y-2,p.w+1,p.h+4,7); fs(c,lin(c,0,p.y,0,p.y+p.h,'#b45309','#78350f'),2); c.fillStyle='#fbbf24'; c.fillRect(p.x+2,p.y,p.w-3,3); if(Math.round(p.x/45)%6===0){ c.fillStyle='#78350f'; c.fillRect(p.x+18,p.y+p.h,7,450-p.y-p.h); } return true; }
  return false; }

return {veu:veu, aparelhos:aparelhos, plataforma:plataforma, ehChao:ehChao};
})();
