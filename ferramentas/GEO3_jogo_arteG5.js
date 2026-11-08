/* ============================================================
   GEO3_jogo_arteG5.js — Guardiões da Casa Maior. Arte nova 5/5: o MAPA do jogo.
   A.mapaLivro(c,t) agora desenha o CROQUI DO BAIRRO visto de cima pelo Bem-te-vi
   (U3 S18: casa da família -> padaria do José -> escola -> campinho -> avenida -> rodovia,
   com o rio no meio) que, quando a fase escolhida sai da cidade (J.sel >= 5), se
   transforma no MAPA DOS BIOMAS do Brasil (U4 S8) com as cores da escola e a legenda.
   Os nós (A.MAPA_NOS), o pontilhado e o herói continuam desenhados por cima pelo cena.js.
   Setas frente / atrás / direita / esquerda (U3 S3), sem rosa dos ventos (não está no material).
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING||!A.MAPA_NOS) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, cintila=I.cintila;
var FONTE='"Nunito","Segoe UI Black","Arial Rounded MT Bold","Arial Black",Arial,sans-serif';
var NOS=A.MAPA_NOS, CACHE={};
function cache(key,fn){ if(CACHE[key]) return CACHE[key]; var cv=document.createElement('canvas'); cv.width=W*2; cv.height=H*2; var x=cv.getContext('2d'); x.scale(2,2); x.lineJoin='round'; x.lineCap='round'; fn(x); CACHE[key]=cv; return cv; }
function fonteOk(){ try{ return !document.fonts || document.fonts.check('900 40px "Nunito"'); }catch(e){ return true; } }
function txt(c,s,x,y,px,cor,halo,peso){ c.font=(peso||900)+' '+px+'px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; if(halo){ c.lineJoin='round'; c.lineWidth=Math.max(2.5,px*.28); c.strokeStyle=halo; c.strokeText(s,x,y); } c.fillStyle=cor; c.fillText(s,x,y); }
function traca(p,P){ var n=P.length; p.moveTo((P[n-1][0]+P[0][0])/2,(P[n-1][1]+P[0][1])/2); for(var i=0;i<n;i++){ var a=P[i], b=P[(i+1)%n]; p.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2); } p.closePath(); }
function suave(c,P){ c.beginPath(); traca(c,P); }
function abre(c,P){ c.beginPath(); P.forEach(function(p,i){ if(i) c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); }
function poli(c,P){ c.beginPath(); P.forEach(function(p,i){ if(i) c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); c.closePath(); }
function trecho(c,a,b){ c.beginPath(); c.moveTo(a.x,a.y); c.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2-24,b.x,b.y); }
function qp(a,b,u){ var mx=(a.x+b.x)/2, my=(a.y+b.y)/2-24, v=1-u; return [v*v*a.x+2*v*u*mx+u*u*b.x, v*v*a.y+2*v*u*my+u*u*b.y]; }
var AMOS=[]; for(var ia=0;ia<8;ia++) for(var u=0;u<=1;u+=.05) AMOS.push(qp(NOS[ia],NOS[ia+1],u));
var SCR=null, P2={};
function dentro(nome,P,x,y){ if(!SCR) SCR=document.createElement('canvas').getContext('2d'); if(!P2[nome]){ P2[nome]=new Path2D(); traca(P2[nome],P); } return SCR.isPointInPath(P2[nome],x,y); }
function pertoNo(x,y,m){ for(var i=0;i<NOS.length;i++) if(Math.hypot(x-NOS[i].x,y-NOS[i].y)<34+m) return true; for(i=0;i<AMOS.length;i++) if(Math.hypot(x-AMOS[i][0],y-AMOS[i][1])<12+m) return true; return false; }

/* ============================================================
   GEOGRAFIA (lon,lat simplificados) e projeção do tabuleiro
   ============================================================ */
var BR_LL=[[-60.5,5.2],[-56,2],[-54,2.3],[-51.5,4.3],[-50,1.8],[-50.3,0],[-48.5,-1],[-44,-2.5],[-41,-2.9],[-38.5,-3.7],[-35.2,-5.4],[-34.8,-7.1],[-35,-9],[-37,-11],[-38.5,-13],[-39,-17.5],[-40,-20],[-41,-22],[-43.2,-23],[-45,-23.8],[-47.5,-25],[-48.5,-27],[-48.8,-28.5],[-50,-30.5],[-52,-32.5],[-53.4,-33.7],[-53.5,-32],[-55.5,-30.5],[-57.6,-30.2],[-56,-28],[-54.6,-25.6],[-54.3,-24],[-55.5,-22.5],[-57.8,-22],[-58,-20],[-57.5,-17.5],[-60.2,-16.2],[-60.5,-13.5],[-62.5,-13],[-65.3,-11],[-66.8,-9.8],[-70.5,-11],[-72.5,-10],[-73.8,-7.5],[-73,-5],[-70,-4.2],[-69.5,-1],[-70,1.5],[-67,2],[-64,1.8],[-63.5,3.8]];
var SA_LL=[[-77.5,8.5],[-75,11],[-72,12],[-71,10.5],[-68,10.5],[-64,10.6],[-61.5,10.5],[-60,8.5],[-58,7],[-55,6],[-52.5,5.2]].concat(BR_LL.slice(3,26),[[-55,-34.9],[-57,-34.5],[-58.5,-34.4],[-57.5,-36.5],[-62,-39],[-65,-41],[-65,-45],[-67.5,-46.5],[-66,-48],[-69,-51],[-68.5,-52.3],[-70,-54],[-73,-53],[-74.5,-50],[-75.5,-46],[-73.5,-42],[-73.5,-37],[-71.5,-32],[-71.3,-27],[-70.3,-18.5],[-75.5,-15],[-77,-12],[-79,-8],[-81.2,-5],[-80.2,-2.5],[-80,.5],[-78.8,2],[-77.5,4],[-77.5,7]]);
function M(p){ return [30+(p[0]+74)*13, 58+(5.3-p[1])*12]; }
var BR=BR_LL.map(M), SA=SA_LL.map(M);
/* biomas (polígonos grosseiros em lon/lat, recortados pelo Brasil); cores do mapa da escola (U4 S8) */
var BIO=[
  ['cerr','#f06fae',[[-44,-2],[-46,-5],[-50,-9],[-52,-13],[-57,-16],[-58,-22],[-52,-25],[-48,-25],[-44,-23],[-42,-19],[-42,-14],[-43,-10],[-44,-6]]],
  ['caat','#f2e27a',[[-44,-2],[-40,-2],[-36,-4],[-34,-6],[-35,-9],[-38,-12],[-41,-14],[-42,-14],[-43,-10],[-44,-6]]],
  ['mata','#9fd0ef',[[-35,-8.5],[-34,-7],[-33,-10],[-37,-12.5],[-40.5,-15],[-41,-19],[-43,-22],[-47,-25],[-51,-25.5],[-54,-27],[-55,-29.5],[-52,-30.3],[-49.5,-29.5],[-48,-27],[-45,-23.6],[-40.5,-20.5],[-38.6,-17],[-38,-13],[-36.5,-10.5]]],
  ['pamp','#f58b4c',[[-58,-29.8],[-55,-30],[-52,-30.3],[-49.5,-29.5],[-50,-31],[-53.4,-34],[-56,-32],[-58,-31]]],
  ['pant','#e9c6e6',[[-58.5,-16],[-55.5,-16.5],[-55,-19],[-56,-22],[-58.5,-22],[-58.8,-19]]]
];
var AMAZ=[[-73.5,-4.4],[-70,-3.6],[-67,-3.1],[-64,-3.6],[-60,-3.2],[-57,-2.6],[-54.5,-2.2],[-52,-1.5],[-50.2,-.6]].map(M);
var SFRA=[[-46.3,-20.2],[-45,-17.5],[-44,-15],[-43.2,-12],[-41.5,-9.5],[-39.5,-9.2],[-37,-10.5]].map(M);

/* ============================================================
   peças do croqui (3/4, origem = base, centro)
   ============================================================ */
function sombraChao(c,rx){ c.fillStyle='rgba(60,30,0,.18)'; el(c,0,1,rx,rx*.22); c.fill(); }
function casa(c,w,h,cor,tel){ sombraChao(c,w*.7); rr(c,-w/2,-h,w,h,2); fs(c,lin(c,0,-h,0,0,cla(cor,.2),cor),OL,1.1); c.beginPath(); c.moveTo(-w/2-3,-h); c.lineTo(0,-h-w*.42); c.lineTo(w/2+3,-h); c.closePath(); fs(c,tel||'#dc2626',OL,1.1);
  c.fillStyle='#7dd3fc'; rr(c,-w*.36,-h*.72,w*.26,h*.3,1); c.fill(); c.fillStyle='#7c4a1e'; rr(c,w*.08,-h*.55,w*.24,h*.55,1.5); c.fill(); }
function predio(c,w,h,cor){ sombraChao(c,w*.6); rr(c,-w/2,-h,w,h,1.5); fs(c,lin(c,-w/2,0,w/2,0,cla(cor,.2),esc(cor,.15)),OL,1.1); c.fillStyle='#bae6fd'; for(var y=-h+5;y<-6;y+=8) for(var x=-w/2+3;x<w/2-5;x+=7) c.fillRect(x,y,4,4.5); c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(-w/2+1,-h+1,2,h-2); }
function arvore(c,x,y,r,k){ c.fillStyle='#6b3f1d'; c.fillRect(x-.9,y-1,1.8,r*.7); c.fillStyle=k?'#2f9e44':'#1f7a33'; circ(c,x,y-r*.35,r); c.fill(); c.fillStyle='rgba(190,242,100,.4)'; circ(c,x-r*.3,y-r*.65,r*.45); c.fill(); }
function placa(c,s,x,y,cor){ c.font='900 10px '+FONTE; var w=c.measureText(s).width+14, h=17;
  c.fillStyle='#7c4a1e'; c.fillRect(x-1.5,y+h/2-2,3,10); c.fillStyle='rgba(0,0,0,.25)'; rr(c,x-w/2+1.5,y-h/2+2,w,h,6); c.fill();
  rr(c,x-w/2,y-h/2,w,h,6); c.fillStyle=lin(c,0,y-h/2,0,y+h/2,cla(cor,.2),esc(cor,.1)); c.fill(); c.strokeStyle=esc(cor,.5); c.lineWidth=1.3; c.stroke();
  txt(c,s,x,y+.5,10,'#fff',null); }
function semaforo(c,x,y){ c.fillStyle='#374151'; c.fillRect(x-1,y-22,2,22); rr(c,x-3.5,y-32,7,12,2); fs(c,'#1f2937',OL,.8); c.fillStyle='#ef4444'; circ(c,x,y-29,1.6); c.fill(); c.fillStyle='#facc15'; circ(c,x,y-26,1.6); c.fill(); c.fillStyle='#22c55e'; circ(c,x,y-23,1.6); c.fill(); }
function poste(c,x,y){ c.fillStyle='#6b7280'; c.fillRect(x-1,y-24,2,24); c.fillStyle='#fde047'; circ(c,x+3,y-24,2.4); c.fill(); c.strokeStyle='#6b7280'; c.lineWidth=1.5; c.beginPath(); c.moveTo(x,y-24); c.lineTo(x+3,y-26); c.stroke(); }
function faixa(c,x,y,w,vert){ c.fillStyle='#fff'; for(var k=0;k<5;k++){ if(vert) c.fillRect(x-w/2,y-12+k*5.5,w,3); else c.fillRect(x-12+k*5.5,y-w/2,3,w); } }
function rua(c,P,w,cor,tracejado){ abre(c,P); c.strokeStyle='rgba(120,80,30,.35)'; c.lineWidth=w+4; c.stroke(); c.strokeStyle=cor; c.lineWidth=w; c.stroke(); if(tracejado){ c.save(); c.setLineDash([6,6]); c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.5; abre(c,P); c.stroke(); c.restore(); } }
function setas(c,x,y){ c.save(); c.translate(x,y); c.fillStyle='rgba(0,0,0,.2)'; el(c,2,52,22,5); c.fill(); c.fillStyle='#7c4a1e'; c.fillRect(-2.5,-4,5,56);
  [['FRENTE',0,-1,-PI/2],['ATRÁS',0,1,PI/2],['DIREITA',1,0,0],['ESQUERDA',-1,0,PI]].forEach(function(s){ c.save(); c.translate(s[1]*22,s[2]*22); c.rotate(s[3]);
    c.beginPath(); c.moveTo(-24,-8); c.lineTo(14,-8); c.lineTo(24,0); c.lineTo(14,8); c.lineTo(-24,8); c.closePath(); fs(c,lin(c,0,-8,0,8,'#fde68a','#f59e0b'),'#92400e',1.3);
    c.rotate(-s[3]); var vert=s[2]!==0; c.fillStyle='#78350f'; c.font='900 7px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.save(); if(vert) c.rotate(-PI/2); c.fillText(s[0],vert?0:-5*s[1],vert?-2*s[2]:0); c.restore(); c.restore(); });
  c.fillStyle='#fde047'; circ(c,0,0,4); c.fill(); c.strokeStyle='#92400e'; c.lineWidth=1.2; circ(c,0,0,4); c.stroke(); c.restore(); }
function moldura(c){ c.save(); c.beginPath(); c.rect(0,0,W,H); c.moveTo(26,11); c.arcTo(W-11,11,W-11,H-11,15); c.arcTo(W-11,H-11,11,H-11,15); c.arcTo(11,H-11,11,11,15); c.arcTo(11,11,W-11,11,15); c.closePath();
  c.fillStyle=lin(c,0,0,W,H,'#9a6233','#5a3417'); c.fill('evenodd'); c.restore(); c.strokeStyle='#e0b04a'; c.lineWidth=2.5; rr(c,11,11,W-22,H-22,15); c.stroke(); c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=1; rr(c,14,14,W-28,H-28,13); c.stroke();
  [[6,6],[W-6,6],[6,H-6],[W-6,H-6]].forEach(function(p){ c.fillStyle='#e0b04a'; circ(c,p[0],p[1],4); c.fill(); }); }
var CAMPO=[[0,250],[180,245],[300,268],[420,335],[520,365],[600,540],[0,540]];
var RIO=[[330,30],[322,120],[300,222],[286,320],[262,430],[242,540]];
var ROD=[[NOS[3].x,NOS[3].y]].concat([NOS[4],NOS[5],NOS[6],NOS[7]].map(function(n){ return [n.x,n.y]; }));
function emCampo(x,y){ if(!P2.campo){ P2.campo=new Path2D(); CAMPO.forEach(function(p,i){ if(i) P2.campo.lineTo(p[0],p[1]); else P2.campo.moveTo(p[0],p[1]); }); P2.campo.closePath(); } if(!SCR) SCR=document.createElement('canvas').getContext('2d'); return SCR.isPointInPath(P2.campo,x,y); }
function pertoRio(x,y){ for(var i=0;i<RIO.length-1;i++){ var a=RIO[i], b=RIO[i+1]; for(var u=0;u<=1;u+=.1){ if(Math.hypot(x-(a[0]+(b[0]-a[0])*u),y-(a[1]+(b[1]-a[1])*u))<26) return true; } } return false; }

/* ============================================================
   CROQUI DO BAIRRO (visto de cima pelo Bem-te-vi, U3 S18)
   ============================================================ */
function croquiBase(c){
  var i, x, y;
  c.fillStyle='#f6ead0'; c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(120,90,40,.09)'; c.lineWidth=1; for(x=20;x<W;x+=40){ c.beginPath(); c.moveTo(x,0); c.lineTo(x,H); c.stroke(); } for(y=20;y<H;y+=40){ c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke(); }
  /* quarteirões da cidade (laranja, como o mapa de localização da escola) */
  c.fillStyle='#f6c48c'; c.fillRect(0,0,W,H);
  c.save(); c.beginPath(); c.rect(0,0,W,H); c.clip();
  c.strokeStyle='#fdf0c8'; c.lineWidth=11; [70,160,250,420,560,650,740,830].forEach(function(vx){ c.beginPath(); c.moveTo(vx,0); c.lineTo(vx,H); c.stroke(); }); [95,190,270,350].forEach(function(hy){ c.beginPath(); c.moveTo(0,hy); c.lineTo(W,hy); c.stroke(); });
  c.restore();
  /* o campo fora da cidade (para onde a rodovia vai) */
  poli(c,CAMPO); c.fillStyle=lin(c,0,250,0,540,'#b7e08a','#79b857'); c.fill(); c.strokeStyle='#5f9a3f'; c.lineWidth=2; c.stroke();
  c.save(); poli(c,CAMPO); c.clip(); c.fillStyle='rgba(255,255,255,.22)'; el(c,120,420,120,34); c.fill(); el(c,330,470,150,40); c.fill(); c.fillStyle='rgba(40,90,20,.12)'; el(c,60,520,100,26); c.fill();
  /* lagoa do Pantanal e capim do Pampa (dicas do que vem) */
  el(c,250,318,30,13); fs(c,'#7cc4ea','#3b82b8',1.2); c.fillStyle='#4ade80'; [[232,316],[262,324],[248,310]].forEach(function(p){ circ(c,p[0],p[1],3.2); c.fill(); });
  c.strokeStyle='#8a9a2b'; c.lineWidth=1.4; for(i=0;i<16;i++){ x=320+hash(i*2.1)*80; y=325+hash(i*3.7)*40; if(pertoNo(x,y,0)) continue; c.beginPath(); c.moveTo(x,y); c.lineTo(x-3,y-8); c.moveTo(x,y); c.lineTo(x+1,y-9); c.moveTo(x,y); c.lineTo(x+4,y-7); c.stroke(); }
  c.restore();
  /* rio (de cima para baixo, passando pela margem do chefão) */
  abre(c,RIO); c.strokeStyle='#3b82b8'; c.lineWidth=32; c.stroke(); c.strokeStyle='#7cc4ea'; c.lineWidth=26; c.stroke(); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=6; c.stroke();
  /* ruas do caminho (casa -> padaria -> escola -> campinho -> avenida) e a rodovia */
  c.save(); c.beginPath(); c.rect(0,0,W,H); poli(c,CAMPO); c.clip('evenodd');
  for(i=0;i<3;i++){ trecho(c,NOS[i],NOS[i+1]); c.strokeStyle='rgba(120,80,30,.35)'; c.lineWidth=20; c.stroke(); c.strokeStyle='#fde68a'; c.lineWidth=16; c.stroke(); }
  trecho(c,NOS[7],NOS[8]); c.strokeStyle='rgba(120,80,30,.35)'; c.lineWidth=20; c.stroke(); c.strokeStyle='#fde68a'; c.lineWidth=16; c.stroke();
  /* a avenida: larga, com canteiro e várias faixas */
  c.strokeStyle='rgba(60,60,70,.4)'; c.lineWidth=50; c.beginPath(); c.moveTo(490,70); c.lineTo(490,312); c.stroke(); c.strokeStyle='#6b7280'; c.lineWidth=46; c.stroke();
  c.save(); c.setLineDash([8,8]); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=1.5; [-16,16].forEach(function(d){ c.beginPath(); c.moveTo(490+d,70); c.lineTo(490+d,312); c.stroke(); }); c.restore(); c.strokeStyle='#4ade80'; c.lineWidth=5; c.beginPath(); c.moveTo(490,70); c.lineTo(490,312); c.stroke();
  faixa(c,490,120,44,true); faixa(c,490,290,44,true);
  c.restore();
  rua(c,ROD,22,'#6b7280',true);
  /* viaduto da rodovia sobre o rio */
  c.save(); c.translate(292,292); c.rotate(-.18); rr(c,-30,-9,60,18,4); fs(c,lin(c,0,-9,0,9,'#9ca3af','#4b5563'),'#1f2937',1.2); c.strokeStyle='#e5e7eb'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-28,-6); c.lineTo(28,-6); c.moveTo(-28,6); c.lineTo(28,6); c.stroke(); c.restore();
  c.save(); c.setLineDash([6,6]); c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.5; abre(c,ROD); c.stroke(); c.restore();
  /* faixa dos patinhos na rua do bairro e semáforos */
  faixa(c,130,258,16,false); semaforo(c,146,252); semaforo(c,114,252);
  /* casas pelos quarteirões (fora das ruas, dos nós, do rio e do campo) */
  var cores=['#fde68a','#fecaca','#bfdbfe','#d9f99d','#fed7aa','#e9d5ff'];
  for(i=0;i<260;i++){ x=24+hash(i*3.3+1)*920; y=74+hash(i*5.1+2)*380; var gx=Math.abs(((x+45)%90)-45), gy=Math.abs(((y+47.5)%95)-47.5);
    if(gx<12||gy<12) continue; if(emCampo(x,y+4)||pertoRio(x,y)||pertoNo(x,y,10)||Math.abs(x-490)<34||(x>790&&y<270)) continue;
    var ok=true; for(var j=0;j<PRONTAS.length;j++){ if(Math.abs(x-PRONTAS[j][0])<30&&Math.abs(y-PRONTAS[j][1])<30){ ok=false; break; } } if(!ok) continue;
    PRONTAS.push([x,y]); c.save(); c.translate(x,y); var s=.55+hash(i*7.7)*.35; c.scale(s,s); if(hash(i*1.9)<.25) predio(c,22,34+hash(i)*20,['#93c5fd','#cbd5e1','#fca5a5'][i%3]); else casa(c,22,15,cores[i%6],['#dc2626','#b45309','#1d4ed8'][i%3]); c.restore(); }
  for(i=0;i<140;i++){ x=20+hash(i*4.3)*560; y=240+hash(i*6.1)*300; if(!emCampo(x,y+4)||pertoNo(x,y,8)||pertoRio(x,y)) continue; var perto=false; for(var k=0;k<ROD.length-1;k++){ for(var u=0;u<=1;u+=.1){ var px=ROD[k][0]+(ROD[k+1][0]-ROD[k][0])*u, py=ROD[k][1]+(ROD[k+1][1]-ROD[k][1])*u; if(Math.hypot(x-px,y-py)<18) perto=true; } } if(perto) continue; arvore(c,x,y,x<220?4.5+hash(i)*3:2.6+hash(i)*1.5,i%2); }
  /* marcos do croqui */
  c.save(); c.translate(62,112); casa(c,30,22,'#fde68a','#b91c1c'); c.fillStyle='#7c3aed'; rr(c,2,-18,6,6,1); c.fill(); c.restore(); placa(c,'Casa da família',70,140,'#7c3aed');
  c.save(); c.translate(268,100); casa(c,30,20,'#fecaca','#b45309'); c.fillStyle='#fff'; rr(c,-13,-24,26,6,2); c.fill(); c.fillStyle='#c2762a'; [[-7,-21],[0,-21],[7,-21]].forEach(function(p){ el(c,p[0],p[1],3,1.8); c.fill(); }); c.restore(); placa(c,'Padaria do José',268,122,'#f97316');
  c.save(); c.translate(400,112); rr(c,-22,-24,44,24,2); fs(c,lin(c,0,-24,0,0,'#fef3c7','#fcd34d'),OL,1.1); c.beginPath(); c.moveTo(-26,-24); c.lineTo(0,-38); c.lineTo(26,-24); c.closePath(); fs(c,'#dc2626',OL,1.1); c.fillStyle='#7dd3fc'; [-15,-5,5].forEach(function(wx){ c.fillRect(wx,-19,6,6); }); c.fillStyle='#7c4a1e'; c.fillRect(13,-13,7,13); c.strokeStyle='#4b5563'; c.lineWidth=1.3; c.beginPath(); c.moveTo(30,-26); c.lineTo(30,-46); c.stroke(); c.fillStyle='#16a34a'; c.fillRect(30,-46,11,7); c.fillStyle='#facc15'; circ(c,35.5,-42.5,2.2); c.fill(); c.restore(); placa(c,'Escola',400,134,'#2563eb');
  c.save(); c.translate(348,160); rr(c,-30,-16,60,32,3); fs(c,'#86efac','#15803d',1.3); c.strokeStyle='#fff'; c.lineWidth=1.3; c.strokeRect(-26,-12,52,24); c.beginPath(); c.moveTo(0,-12); c.lineTo(0,12); c.stroke(); circ(c,0,0,5); c.stroke(); c.strokeStyle='#e5e7eb'; c.lineWidth=2; [[-30,-6,-30,6],[30,-6,30,6]].forEach(function(g){ c.beginPath(); c.moveTo(g[0],g[1]); c.lineTo(g[2],g[3]); c.stroke(); }); c.restore(); placa(c,'Campinho',352,190,'#16a34a');
  [[462,110,44,'#93c5fd'],[520,130,56,'#cbd5e1'],[462,190,36,'#fca5a5'],[520,250,48,'#93c5fd'],[462,275,40,'#e9d5ff']].forEach(function(p){ c.save(); c.translate(p[0],p[1]); predio(c,22,p[2],p[3]); c.restore(); });
  semaforo(c,470,128); semaforo(c,512,300); placa(c,'Avenida',540,78,'#0ea5e9');
  c.save(); c.translate(640,200); rr(c,-34,-30,68,30,2); fs(c,lin(c,0,-30,0,0,'#fecaca','#f87171'),OL,1.2); c.fillStyle='#fff'; rr(c,-30,-26,60,8,2); c.fill(); c.fillStyle='#bae6fd'; c.fillRect(-30,-14,60,10); c.fillStyle='#7c4a1e'; c.fillRect(-6,-10,12,10); c.restore(); placa(c,'Supermercado',640,222,'#dc2626');
  c.save(); c.translate(720,110); casa(c,28,20,'#d9f99d','#1d4ed8'); c.restore(); placa(c,'Trabalho da Antônia',720,134,'#a855f7');
  /* placa de rodovia e lixo na margem do rio */
  c.save(); c.translate(506,356); c.fillStyle='#6b7280'; c.fillRect(-1.5,-22,3,22); rr(c,-22,-34,44,14,2); fs(c,'#15803d','#fff',1.5); txt(c,'RODOVIA',0,-27,8,'#fff',null); c.restore();
  [[270,250,-.3],[332,238,.2],[318,196,.4],[282,190,-.2]].forEach(function(p){ c.save(); c.translate(p[0],p[1]); c.rotate(p[2]); c.beginPath(); c.moveTo(-7,0); c.quadraticCurveTo(-8,-10,-3,-12); c.lineTo(-2,-15); c.lineTo(2,-15); c.lineTo(3,-12); c.quadraticCurveTo(8,-10,7,0); c.closePath(); fs(c,lin(c,-7,-15,7,0,'#9ca3af','#374151'),'#1f2937',1); c.restore(); });
  placa(c,'Rio',300,262,'#0ea5e9');
  setas(c,690,372);
  txt(c,'O MEU BAIRRO',700,300,22,'rgba(120,53,15,.85)','rgba(255,255,255,.6)'); txt(c,'visto de cima pelo Bem-te-vi',700,322,11,'rgba(120,53,15,.8)',null,800);
  moldura(c);
}
var PRONTAS=[];

/* ============================================================
   MAPA DOS BIOMAS (U4 S8), com as cores da escola e a legenda
   ============================================================ */
function biomasBase(c){
  var g=c.createLinearGradient(0,0,W,H), i, x, y; g.addColorStop(0,'#3ba3e2'); g.addColorStop(.5,'#2186d2'); g.addColorStop(1,'#1665a8'); c.fillStyle=g; c.fillRect(0,0,W,H);
  c.strokeStyle='rgba(255,255,255,.08)'; c.lineWidth=1; for(x=30;x<W;x+=65){ c.beginPath(); c.moveTo(x,0); c.quadraticCurveTo(x+(x-480)*.08,H/2,x,H); c.stroke(); } for(y=58;y<H;y+=60){ c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke(); }
  c.save(); c.shadowColor='rgba(0,25,60,.35)'; c.shadowBlur=14; c.shadowOffsetY=6; suave(c,SA); c.fillStyle='#e8d9a8'; c.fill(); c.restore(); suave(c,SA); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=7; c.stroke(); c.fillStyle=lin(c,0,0,0,H,'#f1e3b4','#dcc58c'); c.fill(); c.strokeStyle='rgba(140,110,60,.55)'; c.lineWidth=1.2; c.stroke();
  /* o Brasil: Amazônia por baixo, os outros biomas por cima, tudo recortado */
  c.save(); c.shadowColor='rgba(0,25,60,.4)'; c.shadowBlur=12; c.shadowOffsetY=8; suave(c,BR); c.fillStyle='#9ccc3c'; c.fill(); c.restore();
  c.save(); suave(c,BR); c.clip(); c.fillStyle='#9ccc3c'; c.fillRect(0,0,W,H);
  BIO.forEach(function(b){ suave(c,b[2].map(M)); c.fillStyle=b[1]; c.fill(); c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=1.5; c.stroke(); });
  for(i=0;i<500;i++){ x=30+hash(i*1.7)*520; y=55+hash(i*2.9)*480; c.fillStyle=i%2?'rgba(255,255,255,.12)':'rgba(0,0,0,.06)'; c.fillRect(x,y,2,2); }
  abre(c,AMAZ); c.strokeStyle='#38bdf8'; c.lineWidth=3.5; c.stroke(); abre(c,SFRA); c.lineWidth=2.5; c.stroke();
  c.restore();
  suave(c,BR); c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=5; c.stroke(); c.strokeStyle='#2d6a2e'; c.lineWidth=2; c.stroke();
  /* nomes dos biomas, longe dos nós */
  [['AMAZÔNIA',110,108,'#4d7c0f'],['CERRADO',405,255,'#be185d'],['CAATINGA',482,168,'#a16207'],['PANTANAL',250,352,'#7e22ce'],['MATA ATLÂNTICA',470,372,'#1d4ed8'],['PAMPA',236,448,'#c2410c']].forEach(function(n){ txt(c,n[0],n[1],n[2],11,'#fff',n[3]); });
  /* legenda (cores da escola) no espaço livre da direita */
  rr(c,606,150,186,150,10); c.fillStyle='rgba(255,251,235,.92)'; c.fill(); c.strokeStyle='#92400e'; c.lineWidth=1.5; c.stroke();
  txt(c,'Biomas do Brasil',699,166,12,'#78350f',null);
  [['Amazônia','#9ccc3c'],['Cerrado','#f06fae'],['Caatinga','#f2e27a'],['Pampa','#f58b4c'],['Pantanal','#e9c6e6'],['Mata Atlântica','#9fd0ef']].forEach(function(b,k){ var ly=186+k*19; circ(c,626,ly,7); fs(c,b[1],'rgba(0,0,0,.35)',1); c.font='700 11px '+FONTE; c.textAlign='left'; c.textBaseline='middle'; c.fillStyle='#3f2412'; c.fillText(b[0],640,ly); });
  txt(c,'BRASIL',700,118,24,'rgba(20,83,45,.9)','rgba(255,255,255,.6)');
  txt(c,'OCEANO',660,420,12,'rgba(255,255,255,.6)',null,800); txt(c,'ATLÂNTICO',660,435,12,'rgba(255,255,255,.6)',null,800);
  txt(c,'AMÉRICA DO SUL',120,500,11,'rgba(110,80,30,.75)','rgba(255,255,255,.5)');
  setas(c,690,372);
  moldura(c);
}

/* ============================================================
   A.mapaLivro: o croqui que vira o mapa dos biomas (k 0 -> 1)
   ============================================================ */
var K=0, ULT=null, ONDAS=null;
function alvoK(){ try{ var J=window.JOGO&&JOGO.J; if(!J) return 0; if(J.sel>=5) return 1; if(J.mapaAnim&&J.mapaAnim.para>=5) return 1; var F=window.FASES; if(F&&J.sel<0){ for(var i=0;i<5;i++){ if(!JOGO.faseFeita(F.LISTA[i].id)) return 0; } return 1; } }catch(e){} return 0; }
function passarinho(c,x,y,t,dir){ var fl=Math.sin(t*14)*.7; c.save(); c.translate(x,y); c.scale(dir,1);
  c.fillStyle='rgba(0,0,0,.18)'; el(c,0,26,10,3); c.fill();
  [[-.9,'#8a6a2b',true],[-.1,'#b48a3c',false]].forEach(function(w){ c.save(); c.translate(-3,-3); c.rotate(w[0]-fl*(w[2]?.9:1.1)); c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-8,-8,-16,-6); c.quadraticCurveTo(-10,0,-2,3); c.closePath(); fs(c,w[1],'#3f2c12',1); c.restore(); });
  el(c,0,0,10,6.5); fs(c,lin(c,0,-6,0,6,'#fde68a','#f59e0b'),'#7a5a1e',1); c.fillStyle='#8a6a2b'; el(c,-3,-3,7,2.6); c.fill();
  c.beginPath(); c.moveTo(-8,-1); c.lineTo(-16,-4); c.lineTo(-15,2); c.closePath(); fs(c,'#6b4f1e','#3f2c12',1);
  circ(c,9,-4,5.5); fs(c,'#2b2320','#120d0a',1); c.fillStyle='#fff'; c.beginPath(); c.moveTo(4,-5); c.quadraticCurveTo(9,-9,14,-5); c.lineTo(13,-3.5); c.quadraticCurveTo(9,-6,4,-3.5); c.closePath(); c.fill(); c.fillStyle='#fff'; circ(c,9.5,-3.5,1.6); c.fill(); c.fillStyle='#111'; circ(c,10,-3.5,.9); c.fill();
  c.beginPath(); c.moveTo(13,-3); c.lineTo(19,-2); c.lineTo(13,-1); c.closePath(); fs(c,'#1f2937',null); c.restore(); }
A.mapaLivro=function(c,t){
  t=t||0; var fk=fonteOk()?'n':'f', i;
  if(ULT==null) ULT=t; var dt=Math.max(0,Math.min(.1,t-ULT)); ULT=t; var alvo=alvoK(); K+=(alvo-K)*Math.min(1,dt*3); if(Math.abs(K-alvo)<.01) K=alvo;
  if(K<1) c.drawImage(cache('croqui'+fk,croquiBase),0,0,W,H);
  if(K>0){ c.save(); c.globalAlpha=K; c.drawImage(cache('biomas'+fk,biomasBase),0,0,W,H); c.restore(); }
  if(!ONDAS){ ONDAS=[]; for(i=0;i<400&&ONDAS.length<40;i++){ var ox=24+hash(i*9.1)*912, oy=24+hash(i*3.7)*490; if(!dentro('sa',SA,ox,oy)&&!dentro('sa',SA,ox+8,oy)&&!dentro('sa',SA,ox-8,oy)&&!(ox>596&&oy>140&&oy<310)&&!(ox>640&&oy>320&&oy<420)&&oy>70) ONDAS.push([ox,oy]); } }
  if(K>0){ c.save(); c.lineCap='round'; c.strokeStyle='#fff'; c.lineWidth=1.5; ONDAS.forEach(function(o,k){ var a=K*(.32+.22*Math.sin(t*1.1+k*1.7)), dx=Math.sin(t*.6+k)*4; c.globalAlpha=a; c.beginPath(); c.moveTo(o[0]+dx-7,o[1]); c.quadraticCurveTo(o[0]+dx-3.5,o[1]-4,o[0]+dx,o[1]); c.quadraticCurveTo(o[0]+dx+3.5,o[1]-4,o[0]+dx+7,o[1]); c.stroke(); }); c.restore(); }
  if(K<1){ c.save(); c.globalAlpha=1-K;
    /* os patinhos atravessam a faixa da rua do bairro; o rio brilha */
    var pu=(t*.12)%2, px=pu<1?100+pu*60:160-(pu-1)*60, pd=pu<1?1:-1; for(i=0;i<3;i++) A.patinho(c,px-i*11*pd,262+Math.sin(t*6+i)*.6,t+i*.5,pd,.55);
    for(i=0;i<5;i++){ var f=(t*.5+i/5)%1, rp=RIO[Math.floor(f*(RIO.length-1))], rq=RIO[Math.min(RIO.length-1,Math.floor(f*(RIO.length-1))+1)], ff=f*(RIO.length-1)%1; var rx=rp[0]+(rq[0]-rp[0])*ff, ry=rp[1]+(rq[1]-rp[1])*ff; if(Math.hypot(rx-300,ry-222)>34) cintila(c,rx+Math.sin(i*3)*7,ry,2.5,'rgba(255,255,255,.8)'); }
    c.restore(); }
  /* uma Sacolinha ronda a margem do rio (o chefão) e o Bem-te-vi sobrevoa o mapa */
  if(A.traca){ c.save(); c.translate(NOS[8].x+34+Math.sin(t*1.3)*14,NOS[8].y-22+Math.sin(t*2.6)*5); c.scale(.6,.6); A.traca(c,0,0,t,Math.cos(t*1.3)>0?1:-1,true); c.restore(); }
  var bx=470+Math.cos(t*.22)*300, by=215+Math.sin(t*.44)*95, dir=-Math.sin(t*.22)>=0?1:-1; passarinho(c,bx,by+Math.sin(t*3)*3,t,dir);
};
})();
