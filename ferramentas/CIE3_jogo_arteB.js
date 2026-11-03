/* ============================================================
   CIE3_jogo_arteB.js — "Motion Rangers" (cenários, parte 1):
   vila = The Messy Room (quarto de sala.jpg), bosque = The School
   Map (mapa.jpg), casa = Tower View (perspectiva.jpg) e recife =
   Wild River (agua-vento.jpg). Mesmo contrato do HIS3_jogo_arteB:
   embrulha A.ceu/longe/perto/chao/plataforma por chave interna.
   Exporta A.CB (camada, planta da escola, objetos) para o arteC.
   Tudo por código. Camadas em canvas offscreen; só a cena atual fica
   em memória. Nada aleatório por frame: sorteio por hash da posição.
   Carregar DEPOIS de arte…arte5.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.CN||!A.ING) return;
var W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var N=A.CN, grade=N.grade, ceuG=N.ceuG, nuvemF=N.nuvemF, sol=N.sol, linha=N.linha;
var OL='#2a2018', FONTE='"Nunito","Segoe UI",Arial,sans-serif';

/* ---------- utilitários ---------- */
function fs(c,f,lw,st){ c.fillStyle=f; c.fill(); c.strokeStyle=st||OL; c.lineWidth=lw==null?2:lw; c.stroke(); }
function poly(c,P){ c.beginPath(); P.forEach(function(p,i){ if(i) c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); c.closePath(); }
function box(c,x,y,w,h,f,r,lw){ rr(c,x,y,w,h,r||2); fs(c,f,lw); }
function txt(c,s,x,y,px,cor,peso,it){ c.font=(it?'italic ':'')+(peso||900)+' '+px+'px '+FONTE; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle=cor; c.fillText(s,x,y); }
function rot(c,x,y,a,fn){ c.save(); c.translate(x,y); c.rotate(a); fn(); c.restore(); }
function mod(a,b){ return ((a%b)+b)%b; }
function fonteK(){ try{ return !document.fonts||document.fonts.check('900 40px "Nunito"')?'n':'f'; }catch(e){ return 'n'; } }
var CACHE={}, GRUPO='';
/* camada offscreen; grupo = cena: ao trocar de cena as outras saem da memória */
function camada(grupo,key,w,h,esc,fn){
  if(grupo!==GRUPO&&grupo!=='fixo'){ Object.keys(CACHE).forEach(function(k){ if(k.indexOf('fixo:')) delete CACHE[k]; }); GRUPO=grupo; }
  var id=grupo+':'+key+fonteK(); if(CACHE[id]) return CACHE[id];
  var cv=document.createElement('canvas'); cv.width=Math.ceil(w*esc); cv.height=Math.ceil(h*esc); var x=cv.getContext('2d'); x.scale(esc,esc); x.lineJoin='round'; x.lineCap='round'; fn(x); cv.lw=w; cv.lh=h; CACHE[id]=cv; return cv;
}
function faixaP(c,cv,cam,y){ var P=cv.lw, o=-mod(cam,P); for(var x=o;x<W;x+=P) c.drawImage(cv,Math.round(x),y||0,P,cv.lh); }
function JJ(){ return window.JOGO&&window.JOGO.J||null; }
function altura(){ var j=JJ(); return j&&j.mundo&&j.mundo.h?Math.max(0,(j.mundo.h-H)-j.camY):0; }

/* ---------- objetos comuns dos slides ---------- */
function vaso(c,x,y,s,cor){ /* planta com folhas largas, vaso colorido */
  c.fillStyle='#3f8a3a'; c.strokeStyle=OL; c.lineWidth=1.6;
  [-2.3,-1.8,-1.35,-.9,-.5,-2.7,-.15].forEach(function(a,i){ var L=(70+i*7%26)*s; rot(c,x,y-34*s,a,function(){ c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(L*.5,-16*s,L,0); c.quadraticCurveTo(L*.5,16*s,0,0); c.fillStyle=i%2?'#4f9e45':'#3a8535'; c.fill(); c.stroke(); c.strokeStyle='rgba(20,60,20,.5)'; linha(c,4,0,L-6,0); c.strokeStyle=OL; }); });
  poly(c,[[x-26*s,y-44*s],[x+26*s,y-44*s],[x+20*s,y],[x-20*s,y]]); fs(c,lin(c,x-26*s,0,x+26*s,0,cor||'#6aa8e0','#3f79b6'));
}
function aquario(c,x,y,r){ /* bowl com peixes laranja */
  c.beginPath(); c.arc(x,y-r*.82,r,PI*-.2,PI*1.2); c.closePath(); fs(c,'rgba(190,232,250,.8)');
  c.fillStyle='rgba(85,180,230,.75)'; c.beginPath(); c.arc(x,y-r*.82,r-2,PI*.02,PI*.98); c.closePath(); c.fill();
  c.fillStyle='#e0c690'; el(c,x,y-5,r*.62,5); c.fill();
  [[-.3,.12,1],[.32,.34,-1]].forEach(function(f){ var fx=x+f[0]*r, fy=y-r*.82+f[1]*r; c.fillStyle='#f28a25'; el(c,fx,fy,r*.2,r*.13); fs(c,'#f28a25',1); poly(c,[[fx-f[2]*r*.18,fy],[fx-f[2]*r*.36,fy-r*.12],[fx-f[2]*r*.36,fy+r*.12]]); fs(c,'#f6a64a',1); });
  c.strokeStyle=OL; c.lineWidth=2.2; el(c,x,y-r*1.42,r*.56,r*.09); c.stroke();
}
function violao(c,x,y,s,a){ rot(c,x,y,a||0,function(){ c.scale(s,s);
  box(c,-5,-136,10,74,'#6b3e1c',1,1.5); box(c,-7,-158,14,24,'#4d2c12',3,1.5);
  c.beginPath(); c.arc(0,-48,20,0,TAU); c.arc(0,-18,28,0,TAU); c.fillStyle='#d99a4e'; c.fill(); c.strokeStyle=OL; c.lineWidth=2; c.beginPath(); c.moveTo(-18,-60); c.bezierCurveTo(-26,-44,-34,-40,-28,-18); c.bezierCurveTo(-24,14,24,14,28,-18); c.bezierCurveTo(34,-40,26,-44,18,-60); c.bezierCurveTo(10,-72,-10,-72,-18,-60); c.closePath(); fs(c,lin(c,0,-70,0,10,'#e6ad5e','#b9782e'));
  c.fillStyle='#2a1c10'; circ(c,0,-30,9); c.fill(); box(c,-12,-12,24,5,'#4d2c12',1,1); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=.8; [-2,0,2].forEach(function(d){ linha(c,d,-136,d,-12); }); }); }
function abajur(c,x,y,h,a){ /* abajur amarelo de pé */
  c.fillStyle='#8d6a3a'; el(c,x,y,28,6); fs(c,'#8d6a3a',1.6); c.strokeStyle='#6b5228'; c.lineWidth=5; linha(c,x,y,x,y-h+36); c.strokeStyle=OL;
  rot(c,x,y-h+36,a||0,function(){ poly(c,[[-24,-58],[24,-58],[42,0],[-42,0]]); fs(c,lin(c,0,-58,0,0,'#fff0a0','#f3cf52')); }); }
function coelho(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); [-9,9].forEach(function(d){ el(c,d,-52,6,20); fs(c,'#fafafa',1.6); }); circ(c,0,-26,17); fs(c,'#fafafa',1.6); c.fillStyle=OL; circ(c,-6,-28,2); c.fill(); circ(c,6,-28,2); c.fill(); c.fillStyle='#f29aa8'; circ(c,0,-22,2); c.fill(); c.restore(); }
function caixaP(c,x,y,w,h,aba){ /* caixa de papelão aberta */
  poly(c,[[x,y-h],[x+w,y-h],[x+w,y],[x,y]]); fs(c,lin(c,0,y-h,0,y,'#d9a766','#b98440'));
  if(aba){ poly(c,[[x,y-h],[x-w*.24,y-h-h*.28],[x+w*.28,y-h-h*.24],[x+w*.5,y-h]]); fs(c,'#e6bb7c'); poly(c,[[x+w,y-h],[x+w*1.24,y-h-h*.28],[x+w*.72,y-h-h*.24],[x+w*.5,y-h]]); fs(c,'#cf9a56'); }
  else { c.strokeStyle='rgba(70,40,10,.55)'; c.lineWidth=2; linha(c,x+w/2,y-h,x+w/2,y-h+h*.25); }
}
function raquete(c,x,y,s,a){ rot(c,x,y,a||0,function(){ c.scale(s,s); box(c,-3.5,-46,7,46,'#3a3a3a',2,1); c.lineWidth=5; c.strokeStyle='#c8322e'; el(c,0,-76,22,30); c.stroke(); c.strokeStyle='rgba(60,60,60,.6)'; c.lineWidth=1; for(var k=-18;k<=18;k+=6){ linha(c,k,-76-Math.sqrt(Math.max(0,1-k*k/484))*28,k,-76+Math.sqrt(Math.max(0,1-k*k/484))*28); } for(k=-24;k<=24;k+=6){ var q=Math.sqrt(Math.max(0,1-k*k/784))*20; linha(c,-q,-76+k,q,-76+k); } }); }
function mochila(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.strokeStyle=OL; c.lineWidth=2; c.beginPath(); c.arc(0,-74,12,PI,TAU); c.stroke(); rr(c,-32,-74,64,74,16); fs(c,lin(c,0,-74,0,0,'#a5d36a','#6fa63c')); rr(c,-22,-34,44,28,7); fs(c,'#8cc152'); c.strokeStyle='#3f6a1e'; linha(c,-22,-26,22,-26); c.strokeStyle=OL; [-16,16].forEach(function(d){ linha(c,d,-74,d,-44); }); c.restore(); }
function livro(c,x,y,w,h,cor,a){ rot(c,x,y,a||0,function(){ box(c,-w/2,-h,w,h,cor,1.5,1.6); c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(-w/2+3,-h+6,Math.max(2,w*.2),h-12); c.fillStyle='rgba(255,255,255,.75)'; c.fillRect(-w/2+2,-h*.3,w-4,3); }); }
function livroDeitado(c,x,y,w,cor,a){ rot(c,x,y,a||0,function(){ box(c,-w/2,-w*.26,w,w*.26,'#fdfaf0',2,1.6); box(c,-w/2,-w*.34,w+3,w*.09,cor,2,1.6); box(c,-w/2,-w*.03,w+3,w*.09,cor,2,1.6); box(c,-w/2-5,-w*.34,8,w*.4,cor,3,1.6); }); }
function trofeu(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.lineWidth=2.5; c.strokeStyle=OL; [-1,1].forEach(function(d){ c.beginPath(); c.arc(d*15,-34,8,d<0?PI*.5:PI*1.5,d<0?PI*1.5:PI*.5,false); c.stroke(); }); poly(c,[[-14,-46],[14,-46],[9,-22],[3,-16],[-3,-16],[-9,-22]]); fs(c,lin(c,-14,0,14,0,'#fde68a','#d29a1e')); box(c,-3,-16,6,8,'#d29a1e',1,1.4); box(c,-11,-8,22,8,'#6b4a26',1,1.4); c.restore(); }
function bolaFut(c,x,y,r){ circ(c,x,y,r); fs(c,'#fff',1.8); c.fillStyle='#16161a'; poly(c,[[x,y-r*.3],[x+r*.3,y-r*.08],[x+r*.18,y+r*.26],[x-r*.18,y+r*.26],[x-r*.3,y-r*.08]]); c.fill(); [[0,-.82],[.78,-.22],[.48,.66],[-.48,.66],[-.78,-.22]].forEach(function(p){ c.beginPath(); c.arc(x+p[0]*r,y+p[1]*r,r*.2,0,TAU); c.fill(); }); }
function placaTexto(c,x,y,s,px,cor,f){ c.font='900 '+px+'px '+FONTE; var w=c.measureText(s).width+18; box(c,x-w/2,y-px*.8,w,px*1.6,f||'#fff',5,2); txt(c,s,x,y,px,cor||'#222'); }

/* ============================================================
   VILA = THE MESSY ROOM (sala.jpg em 960x450, depois o resto do quarto)
   ============================================================ */
A.CENAS.vila={ceu:['#f7e7b0','#f4dfa0','#ecd28e'], chaoTop:'#c9a278', chao:'#b48a60', chaoBase:'#8a6440', plat:'#9f7de0', platTop:'#c5acef', part:'polen', musica:'pradaria'};
function ceuVila(c){ ceuG(c,[[0,'#f7e8b4'],[.55,'#f4dfa0'],[1,'#efd594']]); }
function sofa(c,x,y,w,h){ /* sofá vermelho curvo de sala.jpg */
  var bk=lin(c,0,y-h,0,y,'#d94141','#a72525');
  c.beginPath(); c.moveTo(x+w*.1,y-h*.42); c.quadraticCurveTo(x+w*.13,y-h,x+w*.5,y-h); c.quadraticCurveTo(x+w*.87,y-h,x+w*.9,y-h*.42); c.closePath(); fs(c,bk);
  box(c,x+w*.13,y-h*.5,w*.74,h*.26,'#d23a3a',12); box(c,x+w*.13,y-h*.27,w*.74,h*.2,'#b92c2c',8);
  [0,1].forEach(function(i){ var ax=i?x+w*.86:x; el(c,ax+w*.07,y-h*.53,w*.08,h*.15); fs(c,'#d23a3a'); box(c,ax,y-h*.53,w*.14,h*.48,'#c73232',8); });
  c.fillStyle='#6b3a1e'; [.08,.9].forEach(function(p){ c.fillRect(x+w*p,y-h*.06,8,h*.08); });
}
function salaLonge(c){
  var i;
  /* parede e rodapé */
  c.fillStyle=lin(c,0,0,0,290,'#f8ecc0','#f2dfa2'); c.fillRect(0,0,1500,290);
  c.fillStyle=lin(c,0,288,0,450,'#dcb890','#c79d72'); c.fillRect(0,288,1500,180);
  c.fillStyle='#b98f62'; c.fillRect(0,284,1500,5); c.strokeStyle='rgba(120,80,40,.2)'; c.lineWidth=1.5; for(i=0;i<8;i++) linha(c,0,306+i*22,1500,306+i*22);
  /* janela com folhagem e pássaro */
  box(c,288,12,322,12,'#cfae62',2); box(c,310,28,270,160,'#fff8df',2,3);
  c.save(); rr(c,318,36,254,144,1); c.clip(); c.fillStyle=lin(c,0,36,0,180,'#9ad6f2','#d9f1fb'); c.fillRect(318,36,254,144);
  [[364,160,62],[426,146,74],[492,152,70],[548,166,50]].forEach(function(b){ circ(c,b[0],b[1],b[2]); fs(c,'#7cb648',1.5); });
  c.restore(); c.strokeStyle='#fff8df'; c.lineWidth=7; linha(c,445,30,445,186);
  c.save(); c.translate(452,56); el(c,0,0,17,12); fs(c,'#eef2f6',1.6); circ(c,16,-5,8); fs(c,'#eef2f6',1.6); poly(c,[[23,-6],[32,-3],[23,0]]); fs(c,'#f0a030',1); poly(c,[[-5,-6],[-26,-22],[-17,3]]); fs(c,'#dbe3ea',1.6); c.restore();
  /* cortinas lilás */
  [[284,1],[606,-1]].forEach(function(k){ var x=k[0],d=k[1]; c.beginPath(); c.moveTo(x,20); c.lineTo(x+d*62,20); c.quadraticCurveTo(x+d*48,100,x+d*74,196); c.lineTo(x+d*18,206); c.quadraticCurveTo(x+d*4,110,x,20); c.closePath(); fs(c,lin(c,x,0,x+d*70,0,'#7d50a8','#9c74c6')); c.strokeStyle='rgba(50,20,80,.45)'; c.lineWidth=2; [18,36,52].forEach(function(o){ linha(c,x+d*o,26,x+d*(o+6),196); }); });
  /* prateleira torta: livros, troféu (slide, canto superior esquerdo) */
  rot(c,140,88,-.035,function(){ box(c,-128,-2,258,12,'#c99a58',2);
    livro(c,-104,-2,24,62,'#4a78b4',.02); livro(c,-76,-2,22,66,'#c44440',0); trofeu(c,-22,-2,1.15); livro(c,38,-2,24,60,'#6ea04a',.04); livro(c,62,-2,20,56,'#e0c050',-.12); livro(c,90,-2,18,48,'#c44440',-.5); });
  /* quadro de praia, torto, canto superior direito */
  rot(c,748,62,.05,function(){ box(c,-84,-48,168,94,'#b98a4a',3,2.5); c.save(); rr(c,-76,-40,152,78,1); c.clip(); c.fillStyle=lin(c,0,-40,0,6,'#7fc8ee','#d7f0fa'); c.fillRect(-76,-40,152,50); c.fillStyle='#4aa8dc'; c.fillRect(-76,6,152,14); c.fillStyle='#ecd896'; c.fillRect(-76,18,152,22); sol(c,-40,-18,13,'#ffe45c','rgba(255,230,120,.4)'); c.restore(); });
  /* abajur amarelo, torto; violão encostado; planta azul */
  vaso(c,70,310,1.5,'#6fb0e6');
  violao(c,158,310,.98,.05);
  abajur(c,232,312,214,.13);
  /* sofá vermelho com gato e almofada */
  sofa(c,226,318,450,144);
  c.save(); c.translate(395,212); c.scale(1.05,1.05); el(c,0,0,36,17); fs(c,'#d8a06a',1.8); circ(c,-28,-8,15); fs(c,'#d8a06a',1.8); poly(c,[[-38,-18],[-34,-30],[-26,-21]]); fs(c,'#d8a06a',1.6); poly(c,[[-24,-21],[-18,-30],[-14,-16]]); fs(c,'#d8a06a',1.6); c.strokeStyle=OL; c.lineWidth=1.5; c.beginPath(); c.arc(-33,-9,3,PI,TAU); c.arc(-23,-9,3,PI,TAU); c.stroke(); c.restore();
  rot(c,572,212,-.2,function(){ rr(c,-42,-34,84,64,14); fs(c,lin(c,0,-34,0,30,'#c8b0e8','#9f85cf')); c.strokeStyle='rgba(70,40,110,.45)'; c.lineWidth=1.4; for(var k=-24;k<=24;k+=16){ linha(c,k,-28,k,24); linha(c,-36,k,36,k); } });
  /* mesinha amarela com aquário e planta (direita) */
  box(c,664,198,158,12,'#e6c34c',2); c.fillStyle='#d3ae38'; c.strokeStyle=OL; c.lineWidth=2; [674,804].forEach(function(x){ c.fillRect(x,210,9,94); c.strokeRect(x,210,9,94); });
  aquario(c,716,198,34); vaso(c,790,198,.68,'#b9733a');
  /* TV sem marca, inclinada, no móvel */
  poly(c,[[778,290],[950,290],[950,382],[778,382]]); fs(c,lin(c,0,290,0,382,'#d6a860','#b98a44')); c.strokeStyle=OL; linha(c,778,336,950,336); linha(c,864,290,864,382); [820,906].forEach(function(x){ c.fillStyle='#6b4a26'; circ(c,x,314,3); c.fill(); circ(c,x,358,3); c.fill(); });
  rot(c,880,232,.07,function(){ box(c,-64,-68,128,120,'#2a2a30',5,2.5); c.fillStyle=lin(c,-50,-58,50,40,'#5fa8d8','#23486f'); c.fillRect(-55,-60,110,102); c.fillStyle='rgba(255,255,255,.2)'; poly(c,[[-55,-60],[-5,-60],[-55,10]]); c.fill(); box(c,-20,50,40,12,'#3a3a40',2,2); });
  /* tapete lilás com borda creme */
  poly(c,[[300,340],[684,340],[780,440],[214,440]]); fs(c,'#f0dc9c'); poly(c,[[314,348],[670,348],[752,432],[242,432]]); fs(c,'#a785dd',1.5);
  /* mesa de centro com pizza, queijo, copo */
  box(c,352,308,298,14,'#b98446',3); c.fillStyle='#a06f35'; c.strokeStyle=OL; c.lineWidth=2; [376,612].forEach(function(x){ c.fillRect(x,322,14,104); c.strokeRect(x,322,14,104); });
  rot(c,420,306,-.06,function(){ box(c,-40,-10,80,10,'#f2d9b0',1); c.fillStyle='#e0a040'; poly(c,[[-30,-10],[22,-10],[28,-16],[-22,-16]]); c.fill(); });
  el(c,526,304,38,7); fs(c,'#fff',1.6); poly(c,[[510,300],[540,300],[534,284]]); fs(c,'#f2cc48',1.6);
  poly(c,[[590,306],[614,306],[618,272],[586,272]]); fs(c,'#f2a040',1.6);
  /* dois cachorros sob a mesa */
  [[458,'#c98a4e'],[526,'#f4f0ea']].forEach(function(d){ var x=d[0]; el(c,x,410,20,24); fs(c,d[1],1.8); circ(c,x,376,19); fs(c,d[1],1.8); poly(c,[[x-18,-0+366],[x-22,348],[x-7,360]]); fs(c,d[1],1.6); poly(c,[[x+18,366],[x+22,348],[x+7,360]]); fs(c,d[1],1.6); c.fillStyle=OL; circ(c,x-7,374,2.2); c.fill(); circ(c,x+7,374,2.2); c.fill(); c.fillStyle='#4a2a14'; circ(c,x,382,2.5); c.fill(); });
  /* caixa com coelho e raquete, mochila (primeiro plano do slide) */
  coelho(c,84,384,1.1); caixaP(c,26,444,116,66,true); poly(c,[[156,424],[186,394],[190,418],[172,442]]); fs(c,'#c8322e',1.6);
  raquete(c,846,442,.92,.2); mochila(c,908,446,1.15);
  /* ---- resto do quarto: as preposições do slide S4, tudo revirado ---- */
  /* prateleira com gato embaixo (below), maçã no livro (on), relógio ao lado do abajur (next to) */
  rot(c,1180,120,.03,function(){ box(c,-120,0,240,12,'#c99a58',2); livro(c,-90,0,20,60,'#c44440',0); livro(c,-66,0,20,66,'#c44440',0); livro(c,-42,0,18,60,'#e0c050',0); livro(c,-20,0,16,58,'#4f9e45',.18); poly(c,[[50,-40],[84,-40],[78,0],[56,0]]); fs(c,'#eab838'); });
  c.save(); c.translate(1180,226); el(c,0,18,28,30); fs(c,'#9098a8',1.8); circ(c,0,-22,22); fs(c,'#9098a8',1.8); poly(c,[[-20,-30],[-20,-52],[-6,-40]]); fs(c,'#9098a8',1.6); poly(c,[[20,-30],[20,-52],[6,-40]]); fs(c,'#9098a8',1.6); c.fillStyle=OL; circ(c,-8,-24,2.6); c.fill(); circ(c,8,-24,2.6); c.fill(); c.restore();
  /* mesa com bola embaixo (under) */
  box(c,1010,322,180,14,'#a8733a',3); [1024,1160].forEach(function(x){ c.fillStyle='#935f2c'; c.fillRect(x,336,14,92); c.strokeRect(x,336,14,92); }); bolaFut(c,1092,398,30);
  livroDeitado(c,1060,322,74,'#2f5fb0',-.03); circ(c,1062,284,18); fs(c,'#d9352e'); c.strokeStyle='#5a3a1a'; c.lineWidth=2.5; linha(c,1062,268,1066,258); el(c,1074,258,9,4.5); fs(c,'#4f9e45',1.2);
  /* urso na caixa (in) */
  caixaP(c,1290,430,120,84,true); circ(c,1350,334,26); fs(c,'#b9794a'); [-20,20].forEach(function(d){ circ(c,1350+d,312,9); fs(c,'#b9794a'); }); c.fillStyle=OL; circ(c,1341,332,2.5); c.fill(); circ(c,1359,332,2.5); c.fill(); el(c,1350,344,4,3); c.fill();
  /* livros e papéis espalhados */
  livroDeitado(c,980,440,70,'#c44440',.08); livroDeitado(c,1240,444,60,'#4f9e45',-.12); rot(c,1440,410,.5,function(){ box(c,-20,-28,40,56,'#fff',2,1.5); });
}
function salaPerto(c){ /* coisas soltas pelo tornado (começam depois da 1ª tela) */
  rot(c,1040,446,-.08,function(){ livroDeitado(c,0,0,120,'#2f5fb0',0); });
  rot(c,1340,430,.28,function(){ rr(c,-54,-40,108,80,18); fs(c,lin(c,0,-40,0,40,'#c8b0e8','#9f85cf'),2.5); });
  violao(c,1600,452,.8,1.25);
  caixaP(c,1800,450,110,70,false); bolaFut(c,1960,420,30);
}
function longeVila(c,cam){ faixaP(c,camada('vila','L',1500,470,1.25,salaLonge),cam,0); }
function pertoVila(c,cam,t){ var cv=camada('vila','P',2200,470,1,salaPerto); faixaP(c,cv,cam,0);
  /* peixes do aquário e papéis ainda no ar, devagar */
  c.fillStyle='#fff'; c.strokeStyle=OL; c.lineWidth=1.2; [0,1,2].forEach(function(i){ var x=mod(180+i*340-cam*.3+t*9,W+60)-30, y=70+i*64+Math.sin(t*.8+i*2)*14; rot(c,x,y,Math.sin(t*.7+i)*.6,function(){ c.beginPath(); c.rect(-9,-12,18,24); c.fill(); c.stroke(); }); }); }
function chaoVila(c,s){ /* assoalho bege com rodapé do tapete */
  c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#c79f75','#8a6440'); c.fillRect(s.x,s.y,s.w,s.h);
  c.fillStyle='#e6c79c'; c.fillRect(s.x,s.y,s.w,6); c.fillStyle='rgba(60,30,10,.55)'; c.fillRect(s.x,s.y+6,s.w,2);
  c.strokeStyle='rgba(70,40,15,.3)'; c.lineWidth=1.5; for(var yy=s.y+30;yy<s.y+s.h;yy+=24){ linha(c,s.x,yy,s.x+s.w,yy); for(var x=grade(s.x+(yy%48?60:0),120)+(yy%48?60:0);x<s.x+s.w;x+=120) if(x>s.x) linha(c,x,yy,x,yy+24); }
  c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h);
}
function almofada(c,p,cor,cor2){ rr(c,p.x+1,p.y,p.w-2,p.h,Math.min(14,p.h*.45)); fs(c,lin(c,0,p.y,0,p.y+p.h,cor,cor2),2.5); c.fillStyle='rgba(255,255,255,.35)'; rr(c,p.x+8,p.y+3,p.w-16,4,2); c.fill(); c.fillStyle='rgba(50,20,70,.45)'; for(var x=p.x+24;x<p.x+p.w-10;x+=38){ circ(c,x,p.y+p.h*.58,2.4); c.fill(); } }
function prateleira(c,p){ box(c,p.x,p.y,p.w,Math.min(p.h,14),lin(c,0,p.y,0,p.y+14,'#d9ae6c','#ab7d42'),2,2.5); c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(p.x+3,p.y+2,p.w-6,2);
  [p.x+14,p.x+p.w-20].forEach(function(x){ poly(c,[[x,p.y+14],[x+6,p.y+14],[x+6,p.y+28],[x,p.y+20]]); fs(c,'#8a6030',1.5); }); }
function platVila(c,p){ var h=hash(p.x*.13+p.y); if(h<.5) almofada(c,p,'#c7aeef','#8f6fd0'); else if(h<.72) almofada(c,p,'#e65050','#a82828'); else prateleira(c,p); }

/* ============================================================
   BOSQUE = THE SCHOOL MAP — planta redesenhada (mesmas posições do
   slide). `planta` usa coordenadas do slide (990…1585, 258…880).
   ============================================================ */
function octo(c,cx,cy,rx,ry){ var P=[]; for(var i=0;i<8;i++){ var a=PI/8+i*PI/4; P.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]); } poly(c,P); return P; }
function quadraPl(c,x,y,w,h,rot1){ box(c,x,y,w,h,'#f7f7f2',1,1.4); c.strokeStyle='#333'; c.lineWidth=.9; c.strokeRect(x+5,y+5,w-10,h-10); linha(c,x+w/2,y+5,x+w/2,y+h-5); circ(c,x+w/2,y+h/2,h*.18); c.stroke(); [0,1].forEach(function(i){ c.beginPath(); if(i) c.arc(x+w-5,y+h/2,h*.32,PI*.5,PI*1.5); else c.arc(x+5,y+h/2,h*.32,-PI*.5,PI*.5); c.stroke(); }); }
function arvPl(c,x,y,r){ c.strokeStyle='#444'; c.lineWidth=1; c.beginPath(); for(var i=0;i<7;i++){ var a=i*TAU/7; c.moveTo(x+Math.cos(a)*r*1.0,y+Math.sin(a)*r); c.arc(x+Math.cos(a)*r*.7,y+Math.sin(a)*r*.7,r*.42,a-.3,a+TAU-.3); } c.stroke(); }
function salaCunha(c,P,txts){ poly(c,P); fs(c,'#a2a6a4',1.2,'#222'); }
function casaArvore(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); box(c,-7,-30,14,30,'#8a5428',1,1.2); [[0,-56,20],[-18,-44,16],[18,-44,16],[0,-38,16]].forEach(function(b){ circ(c,b[0],b[1],b[2]); fs(c,'#3d9440',1.2); }); box(c,-10,-48,20,16,'#a8672e',1,1.2); poly(c,[[-13,-48],[0,-58],[13,-48]]); fs(c,'#7a3a1c',1.2); c.fillStyle='#ffe59a'; c.fillRect(-4,-44,8,7); c.restore(); }
function sanduiche(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.beginPath(); c.moveTo(-18,-3); c.quadraticCurveTo(0,-20,18,-3); c.closePath(); fs(c,'#e4a03c',1.2); c.fillStyle='#5cae3a'; c.fillRect(-19,-3,38,4); c.fillStyle='#d63d2f'; c.fillRect(-17,1,34,3); c.fillStyle='#f5d24a'; c.fillRect(-18,4,36,3); rr(c,-18,7,36,6,3); fs(c,'#e4a03c',1.2); c.restore(); }
function pinoV(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='rgba(240,190,50,.9)'; el(c,0,1,9,3.5); fs(c,'#f0be32',1.2); c.beginPath(); c.moveTo(0,0); c.bezierCurveTo(-8,-9,-14,-15,-14,-25); c.arc(0,-25,14,PI,0); c.bezierCurveTo(14,-15,8,-9,0,0); c.closePath(); fs(c,'#e21f26',2,'#111'); c.fillStyle='#fff'; circ(c,0,-25,6.5); fs(c,'#fff',1.6,'#111'); c.restore(); }
function bandeira(c,x,y,canada){ c.save(); c.translate(x,y); if(canada){ c.fillStyle='#fff'; c.fillRect(-6,-4,12,8); c.fillStyle='#d62a2a'; c.fillRect(-6,-4,3,8); c.fillRect(3,-4,3,8); circ(c,0,0,1.8); c.fill(); } else { c.fillStyle='#229a3b'; c.fillRect(-6,-4,12,8); c.fillStyle='#f4d21f'; poly(c,[[-5,0],[0,-3.5],[5,0],[0,3.5]]); c.fill(); c.fillStyle='#1d4a9a'; circ(c,0,0,1.6); c.fill(); } c.restore(); }
function planta(c,comPino){
  var ROT='#a99636';
  c.fillStyle='#fbfbf6'; c.fillRect(992,258,595,622);
  c.strokeStyle='rgba(50,50,50,.6)'; c.lineWidth=.8; poly(c,[[1006,382],[1570,382],[1570,780],[1006,780]]); c.stroke();
  /* quadras e C section */
  quadraPl(c,1112,310,146,74); quadraPl(c,1392,272,162,108); poly(c,[[1205,322],[1368,322],[1368,384],[1205,384]]); fs(c,'#aeb2b0',1,'#555');
  txt(c,'Gym / Court',1158,328,12,ROT); txt(c,'2',1152,347,12,ROT); txt(c,'Gym / Court',1516,290,12,ROT); txt(c,'1',1516,308,12,ROT); txt(c,'C section',1287,353,13,ROT,800);
  /* árvores do pátio, Treehouse, Trix, Patio */
  [[1066,442],[1224,430],[1336,455],[1022,410],[1100,405]].forEach(function(a){ arvPl(c,a[0],a[1],11); });
  casaArvore(c,1130,468,.72); txt(c,'Treehouse',1108,456,7,'#222',700);
  sanduiche(c,1288,428,.82); txt(c,'Trix',1287,443,12,'#b08a1e'); box(c,1268,446,40,44,'#f2f2ec',1,.9); c.strokeStyle='#444'; c.lineWidth=.7; for(var k=0;k<6;k++) linha(c,1270,450+k*6,1306,450+k*6);
  rot(c,1213,470,.32,function(){ txt(c,'Patio',0,0,10,'#222',700); });
  /* A section */
  octo(c,1160,596,132,132); fs(c,'#fdfdf9',1.6,'#222');
  var A0=[[1042,500,1114,448,1148,490,1076,540],[1170,470,1228,500,1198,548,1140,516],[1028,560,1056,560,1056,652,1028,652],[1056,664,1088,664,1148,720,1120,748],[1190,696,1244,668,1212,760,1160,740]];
  A0.forEach(function(q){ poly(c,[[q[0],q[1]],[q[2],q[3]],[q[4],q[5]],[q[6],q[7]]]); fs(c,'#a2a6a4',1,'#222'); });
  octo(c,1158,606,28,28); c.strokeStyle='#666'; c.lineWidth=1; c.stroke(); octo(c,1158,606,20,20); c.stroke();
  rot(c,1162,570,.06,function(){ txt(c,'A section',0,0,14,ROT,800); });
  c.strokeStyle='#222'; c.lineWidth=1; [0,1,2,3].forEach(function(i){ linha(c,1086,566+i*5,1106,566+i*5); });
  /* B section com as salas Year */
  octo(c,1422,596,130,132); fs(c,'#fdfdf9',1.6,'#222');
  var B=[[[1312,512,1372,482,1392,530,1336,552],'Year 1',1342,520,true],[[1362,478,1420,470,1412,520,1382,528],'Year 1',1378,497,false],[[1428,494,1472,492,1490,534,1432,532],'Year 2',1452,508,true],[[1476,492,1524,520,1502,558,1486,530],'Year 2',1490,522,false],[[1500,568,1548,568,1548,612,1500,612],'Extra',1524,582,false],[[1500,616,1548,616,1548,660,1500,660],'Year 3G',1524,628,false],[[1466,686,1522,682,1496,730,1450,724],'Year 3E',1490,692,false],[[1320,682,1372,672,1398,720,1344,726],'Year 5A',1344,692,false],[[1362,708,1412,690,1430,746,1380,750],'Year 4A',1382,716,false]];
  B.forEach(function(q){ var p=q[0]; poly(c,[[p[0],p[1]],[p[2],p[3]],[p[4],p[5]],[p[6],p[7]]]); fs(c,'#a2a6a4',1,'#222'); txt(c,q[1],q[2],q[3],7,'#111',700); txt(c,'Classroom',q[2],q[3]+8,6,'#111',700); });
  bandeira(c,1378,510,false); bandeira(c,1341,538,true); bandeira(c,1452,522,true); bandeira(c,1488,538,false);
  octo(c,1420,612,28,28); c.strokeStyle='#666'; c.lineWidth=1; c.stroke(); octo(c,1420,612,20,20); c.stroke();
  rot(c,1425,570,.06,function(){ txt(c,'B section',0,0,14,ROT,800); });
  /* Auditorium */
  poly(c,[[1248,548],[1300,510],[1330,548],[1330,660],[1300,678],[1248,660]]); fs(c,'#f8f8f4',1.6,'#222');
  c.strokeStyle='#555'; c.lineWidth=.9; for(k=0;k<9;k++) linha(c,1258,552+k*6,1322,552+k*6); rot(c,1290,600,.05,function(){ txt(c,'Auditorium',0,0,14,ROT); });
  box(c,1270,650,40,18,'#fff',1,1); c.strokeStyle='#e23232'; c.lineWidth=4; linha(c,1238,664,1244,654); linha(c,1326,658,1336,666);
  txt(c,'Entrance',1285,716,8,'#222',700); c.strokeStyle='#222'; c.lineWidth=1; c.strokeRect(1266,700,40,30);
  /* Drive */
  c.strokeStyle='#555'; c.lineWidth=1; linha(c,996,772,1584,772); linha(c,996,812,1584,812);
  [1085,1170,1254,1340,1424,1498].forEach(function(x,i){ rot(c,x,792,-.1,function(){ txt(c,'Drive',0,0,13,'#222',800); }); });
  if(comPino) pinoV(c,1447,486,.72);
}
A.CENAS.bosque={ceu:['#2f8fe6','#9fd6f7','#eaf7ff'], chaoTop:'#7cc548', chao:'#5c6670', chaoBase:'#343a42', plat:'#f0a93b', platTop:'#ffd166', part:'polen', musica:'floresta'};
/* A escola de verdade, vista de frente (os lugares do slide mapa.jpg: Gym / Court 1 e 2, A/B/C section, Year 1 e Year 2,
   Auditorium, Entrance, Treehouse, Trix, Patio, Drive), colorida e alegre. Nada de planta. */
function ceuBosque(c,t){ ceuG(c,[[0,'#2b8ae6'],[.55,'#8fcdf4'],[1,'#eaf7ff']]); sol(c,820,84,30,'#fff3b0','rgba(255,240,170,.35)'); [[80,70,1.1],[400,124,.8],[650,60,1]].forEach(function(n,i){ nuvemF(c,mod(n[0]+t*(3+i),W+240)-120,n[1],n[2],'#fff','#dcebf7',.95); }); }
function janela(c,x,y,w,h){ box(c,x-3,y-3,w+6,h+6,'#fff',3,2); box(c,x,y,w,h,lin(c,0,y,0,y+h,'#c4ecfc','#5fb6ea'),2,1.5); c.fillStyle='rgba(255,255,255,.6)'; c.fillRect(x+3,y+3,w*.32,h*.42); c.strokeStyle='#fff'; c.lineWidth=2; linha(c,x+w/2,y+1,x+w/2,y+h-1); linha(c,x+1,y+h/2,x+w-1,y+h/2); }
function telhado(c,x0,x1,y,alt,cor,cor2){ poly(c,[[x0-16,y],[x1+16,y],[x1,y-alt],[x0,y-alt]]); fs(c,lin(c,0,y-alt,0,y,cor,cor2),2.5); c.strokeStyle='rgba(0,0,0,.16)'; c.lineWidth=1.5; for(var k=1;k<6;k++){ var u=k/6; linha(c,x0-16+(x1-x0+32)*u,y,x0+(x1-x0)*u,y-alt); } }
function bloco(c,x,y,w,h,cor,cor2){ box(c,x,y-h,w,h,lin(c,0,y-h,0,y,cor,cor2),3,2.5); c.fillStyle='rgba(255,255,255,.28)'; c.fillRect(x+4,y-h+4,w-8,7); c.fillStyle='rgba(0,0,0,.08)'; c.fillRect(x+4,y-10,w-8,8); }
function portaDupla(c,x,y,w,h,cor){ box(c,x-8,y-h-8,w+16,h+8,'#fff',3,2.5); box(c,x,y-h,w,h,lin(c,0,y-h,0,y,cor,'#8a3a2a'),2,2); c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=2; linha(c,x+w/2,y-h+4,x+w/2,y-4); box(c,x+6,y-h+8,w/2-12,h*.4,'#c4ecfc',2,1.5); box(c,x+w/2+6,y-h+8,w/2-12,h*.4,'#c4ecfc',2,1.5); c.fillStyle='#f2c23a'; circ(c,x+w/2-6,y-h*.45,2.5); c.fill(); circ(c,x+w/2+6,y-h*.45,2.5); c.fill(); }
function arbustoF(c,x,y,r,cor){ [[-r*.6,0,r*.75],[r*.6,0,r*.75],[0,-r*.3,r]].forEach(function(b){ circ(c,x+b[0],y+b[1],b[2]); fs(c,cor||'#4f9e45',1.6,'rgba(20,70,20,.6)'); }); c.fillStyle='#ff6fa3'; [[-r*.5,-r*.2],[r*.3,-r*.6],[r*.7,0]].forEach(function(p){ circ(c,x+p[0],y+p[1],r*.14); c.fill(); }); c.fillStyle='#fde047'; circ(c,x-r*.1,y-r*.9,r*.14); c.fill(); }
function arvoreG(c,x,y,h,cor){ box(c,x-h*.06,y-h*.5,h*.12,h*.5,'#8a5a30',3,2); [[0,-h*.78,h*.3],[-h*.22,-h*.6,h*.24],[h*.22,-h*.6,h*.24],[0,-h*.5,h*.22]].forEach(function(b){ circ(c,x+b[0],y+b[1],b[2]); fs(c,cor||'#4f9e45',2,'rgba(20,70,20,.6)'); }); c.fillStyle='rgba(255,255,255,.18)'; circ(c,x-h*.1,y-h*.86,h*.12); c.fill(); }
function escolaLonge(c){
  var P=1800, x, i;
  /* colinas ao fundo */
  c.fillStyle='#a9e06e'; c.beginPath(); c.moveTo(0,470); for(x=0;x<=P;x+=20) c.lineTo(x,330+Math.sin(x*TAU/900)*26+Math.sin(x*TAU/380)*8); c.lineTo(P,470); c.fill();
  c.fillStyle='#84cc54'; c.beginPath(); c.moveTo(0,470); for(x=0;x<=P;x+=20) c.lineTo(x,386+Math.sin(x*TAU/700+2)*12); c.lineTo(P,470); c.fill();
  for(i=0;i<18;i++){ x=hash(i*4.3)*P; var r=14+hash(i)*8; c.fillStyle='#8a5a30'; c.fillRect(x-3,418,6,32); circ(c,x,404,r); fs(c,i%2?'#4f9e45':'#3f8f3a',1.5,'rgba(20,70,20,.5)'); }
  /* GYM / COURT 1: galpão azul de teto curvo */
  c.beginPath(); c.moveTo(50,450); c.lineTo(50,300); c.quadraticCurveTo(170,196,290,300); c.lineTo(290,450); c.closePath(); fs(c,lin(c,0,230,0,450,'#a8d8f6','#4f9ad8'),2.5);
  c.beginPath(); c.moveTo(50,300); c.quadraticCurveTo(170,196,290,300); c.lineTo(290,320); c.quadraticCurveTo(170,218,50,320); c.closePath(); fs(c,'#f05a45',2);
  [64,118,206,260].forEach(function(xx){ janela(c,xx,336,36,30); }); portaDupla(c,140,450,60,66,'#2f4bb0');
  circ(c,170,352,20); fs(c,'#f08a2a',2); c.strokeStyle='#222'; c.lineWidth=1.6; linha(c,150,352,190,352); linha(c,170,332,170,372); c.beginPath(); c.arc(156,352,14,-1,1); c.stroke(); c.beginPath(); c.arc(184,352,14,PI-1,PI+1); c.stroke();
  placaTexto(c,170,282,'Gym / Court 1',16,'#2a2018','#fff7d8');
  arvoreG(c,318,450,120); arvoreG(c,22,450,96,'#3f8f3a');
  /* PRÉDIO PRINCIPAL: ala A (coral), bloco central (amarelo) com a C section em cima, ala B (azul) */
  telhado(c,340,600,282,30,'#f26a52','#c8362a'); bloco(c,340,450,262,168,'#ffb59a','#f28a6a');
  telhado(c,900,1160,282,30,'#f26a52','#c8362a'); bloco(c,898,450,262,168,'#a9dcf8','#6fbcee');
  telhado(c,600,900,160,32,'#f26a52','#c8362a'); bloco(c,600,220,300,60,'#b9efc9','#7fd49c'); bloco(c,600,450,300,230,'#ffd34d','#f2a93b');
  /* torre do sino e o pino no topo do centro */
  box(c,724,96,52,36,'#fff7d8',3,2.5); poly(c,[[716,96],[750,70],[784,96]]); fs(c,'#c8362a',2.5); c.beginPath(); c.arc(750,120,9,PI,0); c.fillStyle='#f2c23a'; c.fill(); c.strokeStyle=OL; c.lineWidth=1.6; c.stroke(); box(c,740,120,20,4,'#d9a21e',1,1.4);
  c.strokeStyle='#555'; c.lineWidth=2; linha(c,884,130,884,80); poly(c,[[884,80],[912,88],[884,96]]); fs(c,'#3fb04a',1.2);
  /* janelas e portas das alas; Year 1 à esquerda, Year 2 à direita (como no slide) */
  [362,416,470,524].forEach(function(xx){ janela(c,xx,310,42,34); janela(c,xx,380,42,34); }); placaTexto(c,470,262,'A section',16,'#2a2018','#fff7d8'); placaTexto(c,392,352,'Year 1',12,'#2a2018','#fff7d8');
  [920,974,1028,1082].forEach(function(xx){ janela(c,xx,310,42,34); janela(c,xx,380,42,34); }); placaTexto(c,1030,262,'B section',16,'#2a2018','#fff7d8'); placaTexto(c,1108,352,'Year 2',12,'#2a2018','#fff7d8');
  [614,668,800,854].forEach(function(xx){ janela(c,xx,176,36,28); }); placaTexto(c,750,190,'C section',16,'#2a2018','#fff7d8');
  [624,678,828,882].forEach(function(xx){ janela(c,xx,262,36,30); });
  /* relógio, entrada com escada e toldo */
  circ(c,750,296,24); fs(c,'#fff',2.5); c.strokeStyle='#222'; c.lineWidth=2.5; linha(c,750,296,750,280); linha(c,750,296,762,302); c.fillStyle='#222'; circ(c,750,296,2); c.fill();
  portaDupla(c,712,450,76,84,'#d64545'); placaTexto(c,750,348,'Entrance',14,'#2a2018','#fff7d8');
  c.fillStyle='#f26a52'; for(i=0;i<7;i++){ poly(c,[[684+i*19,362],[703+i*19,362],[703+i*19,376],[684+i*19,376]]); c.fillStyle=i%2?'#fff':'#f26a52'; c.fill(); c.strokeStyle=OL; c.lineWidth=1.4; c.stroke(); }
  box(c,690,436,120,7,'#d9c6a0',2,1.5); box(c,700,443,100,7,'#cdb892',2,1.5);
  arbustoF(c,652,448,16); arbustoF(c,848,448,16); arbustoF(c,420,448,14,'#5fae3a'); arbustoF(c,1080,448,14,'#5fae3a');
  pinoV(c,1136,250,1.6);
  /* AUDITORIUM: cúpula roxa com marquise */
  box(c,1200,300,240,150,lin(c,0,300,0,450,'#c9a8f0','#8a62c4'),4,2.5); c.beginPath(); c.arc(1320,300,120,PI,0); c.closePath(); fs(c,lin(c,1200,0,1440,0,'#e0cbfa','#a884dd'),2.5);
  c.strokeStyle='rgba(255,255,255,.4)'; c.lineWidth=2; [-70,-35,0,35,70].forEach(function(d){ c.beginPath(); c.moveTo(1320+d,300); c.quadraticCurveTo(1320+d*.6,230,1320,182); c.stroke(); });
  box(c,1314,160,12,24,'#f2c23a',2,1.5); A.estrela&&A.estrela(c,1320,156,10,'#fde047',0);
  portaDupla(c,1290,450,60,70,'#5a3a8a'); [1222,1392].forEach(function(xx){ circ(c,xx+12,346,16); fs(c,'#c4ecfc',2); c.strokeStyle='#fff'; c.lineWidth=2; linha(c,xx+12,330,xx+12,362); });
  box(c,1246,318,148,30,'#fff',4,2.5); txt(c,'Auditorium',1320,333,17,'#6b3ab0'); c.fillStyle='#fde047'; for(i=0;i<8;i++){ circ(c,1252+i*20,314,3); c.fill(); }
  arvoreG(c,1178,450,110,'#3f8f3a'); arvoreG(c,1458,450,104);
  /* GYM / COURT 2: quadra aberta com alambrado e tabela */
  c.strokeStyle='#8c96a4'; c.lineWidth=1; for(i=0;i<30;i++){ linha(c,1490+i*10,306,1490+i*10,392); } for(i=0;i<9;i++){ linha(c,1490,306+i*10,1780,306+i*10); } c.strokeStyle='#5c6670'; c.lineWidth=4; [1490,1635,1780].forEach(function(xx){ linha(c,xx,300,xx,394); }); linha(c,1488,304,1782,304);
  poly(c,[[1470,450],[1800,450],[1760,386],[1510,386]]); fs(c,lin(c,0,386,0,450,'#6fc24e','#4f9e45'),2); c.strokeStyle='#fff'; c.lineWidth=2.5; c.beginPath(); c.moveTo(1520,392); c.lineTo(1490,440); c.moveTo(1750,392); c.lineTo(1780,440); c.stroke(); c.beginPath(); c.ellipse(1635,418,34,12,0,0,TAU); c.stroke(); linha(c,1635,386,1635,450);
  box(c,1632,330,8,120,'#6a7078',1,2); box(c,1606,300,60,42,'#fff',2,2.5); c.strokeStyle='#d94141'; c.lineWidth=2; c.strokeRect(1626,316,20,16); c.strokeStyle='#ef6a1a'; c.lineWidth=4; el(c,1636,344,14,4); c.stroke();
  placaTexto(c,1636,270,'Gym / Court 2',16,'#2a2018','#fff7d8');
}
function ttPlaca(c,x,y,txtP,dir){ /* placa de direção em inglês */
  box(c,x-5,y-94,10,94,'#8a6230',1,2);
  var d=dir||1, w=118, h=42, x0=x-w/2, y0=y-132;
  poly(c,d>0?[[x0,y0],[x0+w-18,y0],[x0+w,y0+h/2],[x0+w-18,y0+h],[x0,y0+h]]:[[x0+18,y0],[x0+w,y0],[x0+w,y0+h],[x0+18,y0+h],[x0,y0+h/2]]);
  fs(c,d>0?'#2f8fd8':'#f0713a',2.5); txt(c,txtP,x+(d>0?-6:6),y0+h/2+1,22,'#fff');
}
function escolaPerto(c){
  /* Treehouse grande */
  c.save(); c.translate(205,450); c.scale(.68,.68); c.translate(-225,-450);
  box(c,200,250,50,200,lin(c,200,0,250,0,'#a06a34','#7a4a20'),4); [[225,150,92],[150,190,70],[300,190,70],[225,220,70]].forEach(function(b){ circ(c,b[0],b[1],b[2]); fs(c,'#3d9440'); }); [[200,120,30],[270,140,24]].forEach(function(b){ c.fillStyle='rgba(255,255,255,.14)'; circ(c,b[0],b[1],b[2]); c.fill(); });
  box(c,172,178,106,76,'#b8743a',2,2.5); poly(c,[[160,180],[225,132],[290,180]]); fs(c,'#7a3a1c',2.5); box(c,214,206,24,48,'#6a3a1a',2); c.fillStyle='#ffe59a'; c.fillRect(186,200,20,20); c.fillRect(246,200,20,20);
  c.strokeStyle='#7a4a20'; c.lineWidth=4; linha(c,186,256,186,450); linha(c,208,256,208,450); for(var i=0;i<8;i++) linha(c,186,272+i*24,208,272+i*24); placaTexto(c,225,146,'Treehouse',22,'#2a2018','#fff7d8'); c.restore();
  /* placas LEFT/RIGHT, Patio */
  ttPlaca(c,70,450,'LEFT',-1); ttPlaca(c,1150,450,'RIGHT',1); ttPlaca(c,1720,450,'LEFT',-1); ttPlaca(c,2120,450,'RIGHT',1);
  /* Trix: quiosque com sanduíche */
  c.save(); c.translate(900,450); c.scale(.72,.72); c.translate(-800,-450);
  box(c,690,330,220,120,lin(c,0,330,0,450,'#fff4cf','#efd98e'),3,2.5); box(c,716,364,168,44,'#3f2c1a',2); c.fillStyle='#d94141'; for(i=0;i<8;i++){ poly(c,[[676+i*31,300],[707+i*31,300],[707+i*31,332],[676+i*31,332]]); c.fillStyle=i%2?'#fff':'#d94141'; c.fill(); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke(); }
  box(c,740,230,120,68,'#ffe9a0',8,2.5); sanduiche(c,800,262,2); box(c,780,298,40,6,'#8a6230',1,1.5); placaTexto(c,800,216,'Trix',24,'#b0641e','#fff7d8'); c.restore();
  /* canteiros de flores e o banco do Patio */
  arbustoF(c,420,448,22); arbustoF(c,560,448,18,'#5fae3a'); arbustoF(c,1290,448,20); arbustoF(c,1860,448,22,'#5fae3a'); arbustoF(c,2290,448,18);
  box(c,1480,410,150,12,'#b9884a',3); [1494,1608].forEach(function(x){ box(c,x,422,10,28,'#8a6230',1,1.5); }); placaTexto(c,1555,394,'Patio',16,'#2a2018','#fff7d8');
  /* cerquinha branca e árvores do pátio */
  for(i=0;i<9;i++){ var fx=1980+i*26; poly(c,[[fx,450],[fx,414],[fx+7,406],[fx+14,414],[fx+14,450]]); fs(c,'#fff',1.5); } box(c,1976,426,236,6,'#fff',1,1.5);
  [1910,2330].forEach(function(x){ box(c,x-12,300,24,150,'#8a5428',3); [[0,-30,62],[-44,10,46],[44,10,46]].forEach(function(b){ circ(c,x+b[0],300+b[1],b[2]); fs(c,'#59a845'); }); });
}
function longeBosque(c,cam){ faixaP(c,camada('bosque','L',1800,470,1.25,escolaLonge),cam,0); }
function pertoBosque(c,cam){ faixaP(c,camada('bosque','P',2500,470,1,escolaPerto),cam,0); }
function chaoBosque(c,s){ /* chão = a rua "Drive" do slide (asfalto, faixa amarela, meio-fio, grama); bloco alto = muro de tijolinhos da escola com grama em cima */
  var x; if(s.y<440){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#f2c98a','#d9a05a'); c.fillRect(s.x,s.y,s.w,s.h); c.strokeStyle='rgba(120,70,20,.35)'; c.lineWidth=1.4; var k=0; for(var yy=s.y+22;yy<s.y+s.h-2;yy+=16,k++){ linha(c,s.x+2,yy,s.x+s.w-2,yy); for(x=grade(s.x,32)+(k%2)*16;x<s.x+s.w;x+=32){ if(x>s.x+2&&x<s.x+s.w-2) linha(c,x,yy,x,Math.min(yy+16,s.y+s.h-2)); } }
    c.fillStyle='#7cc548'; c.fillRect(s.x,s.y,s.w,9); c.fillStyle='#b9e07a'; c.fillRect(s.x,s.y,s.w,3); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(s.x,s.y+9,s.w,2); c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); return; }
  c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#6b7682','#3a424c'); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#7cc548'; c.fillRect(s.x,s.y,s.w,9); c.fillStyle='#b9e07a'; c.fillRect(s.x,s.y,s.w,3); c.fillStyle='#dfe3e8'; c.fillRect(s.x,s.y+9,s.w,6); c.fillStyle='rgba(0,0,0,.25)'; c.fillRect(s.x,s.y+15,s.w,2);
  if(s.h>40){ c.fillStyle='#ffd23a'; for(x=grade(s.x,64);x<s.x+s.w;x+=64){ if(x>=s.x&&x+32<=s.x+s.w) c.fillRect(x,s.y+Math.min(s.h-8,52),32,5); } }
  for(x=grade(s.x,480)+240;x<s.x+s.w;x+=480){ if(s.h>60) txt(c,'Drive',x,s.y+34,18,'rgba(255,255,255,.85)',800); }
  c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); }
function platBosque(c,p){ /* armários da escola: caixas coloridas com divisórias */
  var h=hash(p.x*.17+p.y), cs=h<.33?['#ffd166','#f0a93b']:(h<.66?['#a9dcf8','#4f9ad8']:['#ffb59a','#e8663f']);
  box(c,p.x,p.y,p.w,p.h,lin(c,0,p.y,0,p.y+p.h,cs[0],cs[1]),4,2.5); c.fillStyle='rgba(255,255,255,.5)'; c.fillRect(p.x+5,p.y+2,p.w-10,3); c.strokeStyle='rgba(0,0,0,.2)'; c.lineWidth=1.3; for(var x=p.x+22;x<p.x+p.w-6;x+=22) linha(c,x,p.y+6,x,p.y+p.h-2); }

/* ============================================================
   CASA = TOWER VIEW — treliça marrom, Paris e o Sena ao longe
   ============================================================ */
A.CENAS.casa={ceu:['#3f9fe6','#8fcdf3','#dff2fb'], chaoTop:'#7cb648', chao:'#6a9c3c', chaoBase:'#456c28', plat:'#a4662c', platTop:'#d08a44', part:'', musica:'mapa'};
function ceuCasa(c,t){ ceuG(c,[[0,'#2f96e2'],[.65,'#8fcff4'],[1,'#e6f4f8']]); var al=altura()*.08; [[120,70,1.3],[420,110,.9],[700,56,1.1],[880,150,.8]].forEach(function(n,i){ nuvemF(c,mod(n[0]+t*(3+i),W+240)-120,n[1]+al%200,n[2],'#fff','#dce9f4',.92); }); }
function parisLonge(c){
  /* o slide "seen from the side": a cidade até o horizonte com o Sena em curva, depois gramado "from the front" */
  var P=1800, x, y, i;
  c.fillStyle=lin(c,0,250,0,470,'#cfd9d6','#a6b294'); c.fillRect(0,250,P,220);
  for(i=0;i<170;i++){ x=hash(i*3.1)*P; y=255+hash(i*5.3)*95; var s=.5+(y-255)/95; c.fillStyle=['#efe6d6','#e5dac6','#d8ccb6','#f3ecdf'][i%4]; c.fillRect(x,y,16*s,10*s); c.fillStyle='#7f8a94'; c.fillRect(x-1,y-3*s,18*s,3.5*s); }
  for(i=0;i<60;i++){ x=hash(i*7.7)*P; y=300+hash(i*2.9)*110; c.fillStyle='#5f9a48'; circ(c,x,y,7+hash(i)*9); c.fill(); }
  c.lineCap='butt'; c.strokeStyle='#3e9cc8'; c.lineWidth=52; c.beginPath(); c.moveTo(-40,330); c.bezierCurveTo(300,250,420,430,760,380); c.bezierCurveTo(1100,330,1200,280,1500,350); c.bezierCurveTo(1640,380,1780,350,P+40,330); c.stroke();
  c.strokeStyle='rgba(180,230,245,.5)'; c.lineWidth=5; c.beginPath(); c.moveTo(-40,322); c.bezierCurveTo(300,242,420,422,760,372); c.bezierCurveTo(1100,322,1200,272,1500,342); c.bezierCurveTo(1640,372,1780,342,P+40,322); c.stroke(); c.lineCap='round';
  [[260,322,.5],[620,398,-.1],[1160,306,-.15],[1560,352,.1]].forEach(function(b){ rot(c,b[0],b[1],b[2],function(){ box(c,-12,-46,24,92,'#d8d0bc',1,1.5); c.strokeStyle='#8a8272'; c.lineWidth=1; [-22,0,22].forEach(function(d){ c.beginPath(); c.arc(0,d,10,PI*.5,PI*1.5); c.stroke(); }); }); });
  /* quadra vermelha do slide */
  rot(c,1090,420,.1,function(){ box(c,-40,-26,80,52,'#b73a2c',2,1); box(c,-30,-18,60,36,'#3a9a48',1,1); });
  c.fillStyle='rgba(235,245,250,.55)'; c.fillRect(0,250,P,16);
  c.fillStyle=lin(c,0,405,0,470,'#a8cc5a','#7fb040'); c.fillRect(0,408,P,62); c.fillStyle='#3f8038'; for(i=0;i<3;i++){ var hx=i*600; poly(c,[[hx+10,412],[hx+10,372],[hx+230,396],[hx+230,412]]); c.fill(); poly(c,[[hx+590,412],[hx+590,372],[hx+370,396],[hx+370,412]]); c.fill(); }
}
function trelica(c,x0,x1,y0,y1,n,cor){ c.strokeStyle=cor; c.lineWidth=2; c.beginPath(); for(var i=0;i<n;i++){ var u0=i/n,u1=(i+1)/n; c.moveTo(x0+(x1-x0)*u0,y0); c.lineTo(x0+(x1-x0)*u1,y1); c.moveTo(x0+(x1-x0)*u1,y0); c.lineTo(x0+(x1-x0)*u0,y1); } c.stroke(); }
var TOR_H=1900, TOR_W=1000;
function meia(h){ return 30+400*Math.exp(-h/330); } /* meia-largura da torre na altura h */
function torre(c){ var cx=TOR_W/2, y0=TOR_H-90, h;
  /* gramado "from the front": alameda e árvores recortadas */
  function perna(s){ for(h=0;h<300;h+=30){ var a=meia(h),b=meia(h+30),wa=Math.max(44,a*.34),wb=Math.max(40,b*.34); var xa=cx+s*a, xb=cx+s*b; poly(c,[[xa-s*wa,y0-h],[xa,y0-h],[xb,y0-h-30],[xb-s*wb,y0-h-30]]); c.fillStyle='rgba(138,84,38,.2)'; c.fill(); c.strokeStyle='#6a3e1a'; c.lineWidth=5; linha(c,xa,y0-h,xb,y0-h-30); linha(c,xa-s*wa,y0-h,xb-s*wb,y0-h-30); c.strokeStyle='#b0702f'; c.lineWidth=2.5; linha(c,xa,y0-h,xb-s*wb,y0-h-30); linha(c,xa-s*wa,y0-h,xb,y0-h-30); linha(c,xa,y0-h,xa-s*wa,y0-h); } }
  perna(-1); perna(1);
  /* arco entre as pernas */
  c.strokeStyle='#7a4a20'; c.lineWidth=11; c.beginPath(); c.arc(cx,y0-120,190,PI*1.1,PI*1.9); c.stroke(); c.strokeStyle='#c8843c'; c.lineWidth=4; c.beginPath(); c.arc(cx,y0-126,190,PI*1.1,PI*1.9); c.stroke();
  /* corpo: lanterna de treliça */
  for(h=300;h<TOR_H-180;h+=46){ var w0=meia(h),w1=meia(h+46); c.strokeStyle='#744620'; c.lineWidth=h<760?5:3.6; linha(c,cx-w0,y0-h,cx-w1,y0-h-46); linha(c,cx+w0,y0-h,cx+w1,y0-h-46); c.lineWidth=2; c.strokeStyle='#b4762f'; linha(c,cx-w0,y0-h,cx+w1,y0-h-46); linha(c,cx+w0,y0-h,cx-w1,y0-h-46); linha(c,cx-w0,y0-h,cx+w0,y0-h); if(w0>70){ linha(c,cx,y0-h,cx,y0-h-46); } }
  /* patamares */
  [[300,500],[760,270],[1400,120]].forEach(function(k){ var hh=k[0], w=k[1]/2+12; box(c,cx-w,y0-hh-20,2*w,22,lin(c,0,y0-hh-20,0,y0-hh+2,'#9a6028','#6a3e1a'),2,2.5); c.fillStyle='#d09a4a'; for(var x=cx-w+8;x<cx+w-6;x+=14){ circ(c,x,y0-hh-10,2.2); c.fill(); } });
  /* topo e antena */
  box(c,cx-24,y0-TOR_H+150,48,40,'#744620',4,2.5); c.strokeStyle='#744620'; c.lineWidth=6; linha(c,cx,y0-TOR_H+150,cx,y0-TOR_H+60);
  /* cavalete e a pintora do slide */
  var gx=cx-150, gy=y0;
  c.strokeStyle='#a6682a'; c.lineWidth=7; linha(c,gx-52,gy,gx-18,gy-188); linha(c,gx+48,gy,gx+6,gy-188); linha(c,gx-4,gy,gx-4,gy-190); box(c,gx-58,gy-180,104,124,'#fbf6e8',3,2.5); circ(c,gx-6,gy-120,38); fs(c,'#e2552a',2); circ(c,gx-6,gy-120,14); fs(c,'#f28a45',1.5);
  /* girafa curvada sobre o quadro */
  c.save(); c.translate(gx+95,gy); el(c,0,-58,50,42); fs(c,'#eab04a',2.2); c.lineWidth=26; c.strokeStyle=OL; c.lineCap='round'; c.beginPath(); c.moveTo(20,-85); c.bezierCurveTo(50,-240,-30,-340,-96,-318); c.stroke(); c.lineWidth=22; c.strokeStyle='#eab04a'; c.stroke();
  c.fillStyle='#a8682a'; [[18,-60,10],[-16,-72,9],[-30,-40,8],[24,-120,8],[26,-180,7],[6,-246,7],[-30,-298,6]].forEach(function(p){ circ(c,p[0],p[1],p[2]); c.fill(); });
  [[-22,0],[28,0]].forEach(function(p){ box(c,p[0]-6,-28,14,28,'#eab04a',3,2); });
  el(c,-112,-318,24,13); fs(c,'#eab04a',2); c.strokeStyle=OL; c.lineWidth=3; linha(c,-100,-332,-96,-350); linha(c,-110,-332,-112,-350); c.fillStyle=OL; circ(c,-116,-322,2.5); c.fill(); c.strokeStyle='#8a5428'; c.lineWidth=4; linha(c,-58,-40,-76,-116); c.restore();
  /* senhora de chapéu laranja */
  c.save(); c.translate(gx-110,gy); poly(c,[[-13,-102],[13,-102],[30,0],[-30,0]]); fs(c,'#e58a22',2); circ(c,0,-114,11); fs(c,'#f1c79c',1.6); el(c,0,-124,28,8); fs(c,'#e04a24',1.8); c.restore();
}
function longeCasa(c,cam){ var a=altura(); faixaP(c,camada('casa','L',1800,470,1,parisLonge),cam,Math.min(250,a*.3)); }
function pertoCasa(c,cam,t){ var cv=camada('casa','P',TOR_W,TOR_H,1,torre), a=altura(), P=TOR_W+1000, o=-mod(cam+20,P), y=Math.round(450-(TOR_H-90)+a);
  for(var x=o-P;x<W;x+=P) if(x+TOR_W>0) c.drawImage(cv,Math.round(x),y); }
function chaoCasa(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#83bb4a','#3f6a24'); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#eadfb4'; c.fillRect(s.x,s.y,s.w,8); c.fillStyle='rgba(0,0,0,.3)'; c.fillRect(s.x,s.y+8,s.w,2); c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h);
  c.fillStyle='rgba(30,70,20,.3)'; for(var x=grade(s.x,70)+70;x<s.x+s.w;x+=70) if(s.h>40){ el(c,x+hash(x)*30,s.y+30+hash(x+2)*(s.h-40),13,3); c.fill(); } }
function vigaP(c,p,cor,cl){ box(c,p.x,p.y,p.w,p.h,lin(c,0,p.y,0,p.y+p.h,cor,'#5e3616'),2,2.5); var n=Math.max(1,Math.round(p.w/26)); c.save(); rr(c,p.x+1,p.y+4,p.w-2,p.h-6,1); c.clip(); c.fillStyle='rgba(120,190,240,.5)'; c.fillRect(p.x,p.y+4,p.w,p.h); trelica(c,p.x,p.x+p.w,p.y+4,p.y+p.h-2,n,cl); c.restore(); c.fillStyle='#e8ad62'; c.fillRect(p.x+2,p.y+1,p.w-4,3); c.fillStyle='#6a3e1a'; for(var x=p.x+8;x<p.x+p.w-4;x+=13){ circ(c,x,p.y+2.6,1.3); c.fill(); } c.strokeStyle='#5e3616'; c.lineWidth=2.5; c.strokeRect(p.x+1,p.y+1,p.w-2,p.h-2); }
function platCasa(c,p){ vigaP(c,p,'#b0702f','#744620'); }

/* ============================================================
   RECIFE = WILD RIVER — acima d'água (A.ceuDoRio) e rio por dentro
   ============================================================ */
A.CENAS.recife={ceu:['#58bfe0','#2b8ec2','#14507f'], chaoTop:'#d3c07f', chao:'#a4905c', chaoBase:'#655436', plat:'#8a5c30', platTop:'#b08048', part:'', musica:'agua'};
function ceuRecife(c){ ceuG(c,[[0,'#6fcce8'],[.4,'#2f97c8'],[1,'#134f7e']]); }
function represa(c,x,y,w,h){ /* a represa do slide: cimento claro, comportas, cascatas brancas, floresta */
  [[x-120,y-h*.6,70],[x-30,y-h*.86,80],[x+90,y-h*.9,90],[x+220,y-h,90],[x+w+40,y-h*.62,80],[x+w+150,y-h*.5,66]].forEach(function(b){ circ(c,b[0],b[1],b[2]); c.fillStyle=lin(c,0,b[1]-b[2],0,b[1]+b[2],'#59a648','#2f7534'); c.fill(); });
  box(c,x,y-h,w,14,'#d9d7c6',1,1.6); c.fillStyle='#9e9a86'; for(var i=0;i<14;i++) c.fillRect(x+i*w/14,y-h-12,3,12); c.fillRect(x,y-h-14,w,3);
  var n=6; for(i=0;i<n;i++){ var bx=x+i*w/n; box(c,bx,y-h+14,w/n-6,h-14,lin(c,0,y-h,0,y,'#cdc8b2','#8f8a74'),1,1.4); box(c,bx+3,y-h+6,w/n-12,12,'#6a7a80',1,1); poly(c,[[bx+4,y-h+18],[bx+w/n-10,y-h+18],[bx+w/n+6,y],[bx-8,y]]); c.fillStyle=lin(c,0,y-h,0,y,'#d8f4fb','#ffffff'); c.fill(); c.strokeStyle='rgba(120,190,220,.8)'; c.lineWidth=1.5; for(var k=0;k<4;k++) linha(c,bx+8+k*(w/n-20)/3,y-h+22,bx+2+k*(w/n-6)/3,y-4); }
  box(c,x+w,y-h-34,80,h+34,'#c6c2ad',1,1.6); c.fillStyle='#55606a'; [0,1,2].forEach(function(i){ c.fillRect(x+w+12+i*22,y-h-20,12,28); });
}
function regador(c,x,y,s){ /* o regador prateado do slide */
  c.save(); c.translate(x,y); c.scale(s,s); c.strokeStyle='#7f8a94'; c.lineWidth=7; c.beginPath(); c.arc(20,-92,34,PI,TAU*.97); c.stroke();
  poly(c,[[-40,-74],[62,-92],[80,0],[-30,18]]); fs(c,lin(c,-40,0,80,0,'#d6dde4','#808b96'),2.5); el(c,10,-82,52,13); fs(c,'#aeb8c2',2.5); poly(c,[[-36,-22],[-98,-68],[-110,-58],[-40,8]]); fs(c,'#9aa4ae',2.5); poly(c,[[-96,-74],[-122,-50],[-108,-40],[-90,-62]]); fs(c,'#7f8a94',2.5); c.restore();
}
function brotos(c,x,y,n,s){ for(var i=0;i<n;i++){ var bx=x+i*62*s, k=.9+hash(i+x)*.3; c.strokeStyle='#3f8a2e'; c.lineWidth=3.5*s; linha(c,bx,y,bx,y-34*s*k); [-1,1].forEach(function(d){ c.beginPath(); c.moveTo(bx,y-22*s*k); c.quadraticCurveTo(bx+d*28*s,y-48*s*k,bx+d*30*s,y-20*s*k); c.quadraticCurveTo(bx+d*14*s,y-16*s*k,bx,y-22*s*k); fs(c,'#79c24a',1.3); }); } }
function ondaGrande(c,x,y,s){ /* o tsunami do slide */
  c.save(); c.translate(x,y); c.scale(s,s); c.beginPath(); c.moveTo(-130,0); c.bezierCurveTo(-120,-80,-60,-150,30,-150); c.bezierCurveTo(80,-150,110,-126,114,-100); c.bezierCurveTo(70,-122,20,-110,18,-70); c.bezierCurveTo(16,-34,60,-18,110,0); c.closePath(); fs(c,lin(c,-120,-150,60,0,'#2b78b8','#0f4a88'),2);
  c.strokeStyle='#6ec4e8'; c.lineWidth=5; [34,58,82].forEach(function(r,i){ c.beginPath(); c.arc(40,-70,r,PI*.65,PI*1.5); c.stroke(); });
  c.fillStyle='#fff'; [[34,-154,17],[58,-150,15],[84,-134,14],[106,-110,12],[10,-146,13],[-20,-128,11],[120,-92,8],[132,-120,5],[110,-142,6]].forEach(function(b){ circ(c,b[0],b[1],b[2]); c.fill(); }); c.restore();
}
function acimaRio(c){ /* faixa de 1500x200; a linha d'água fica em y=200 */
  c.fillStyle=lin(c,0,0,0,200,'#6fc4f0','#d8f2fb'); c.fillRect(0,0,1600,200);
  [[120,44,1],[660,30,.8],[1280,48,1]].forEach(function(n){ nuvemF(c,n[0],n[1],n[2],'#fff','#dcecf4',.95); });
  represa(c,120,200,380,118);
  /* margem com brotos e o regador regando */
  c.fillStyle=lin(c,0,160,0,200,'#6b4326','#47301c'); c.beginPath(); c.moveTo(640,200); c.quadraticCurveTo(700,160,780,162); c.lineTo(1000,162); c.quadraticCurveTo(1080,160,1130,200); c.closePath(); c.fill(); c.strokeStyle=OL; c.lineWidth=2; c.stroke();
  c.fillStyle='#74bc4a'; c.fillRect(740,158,300,5);
  brotos(c,760,162,4,1.05); regador(c,1010,142,.62);
  c.strokeStyle='rgba(120,200,240,.95)'; c.lineWidth=3; c.setLineDash([6,5]); for(var i=0;i<6;i++){ c.beginPath(); c.moveTo(938,106+i); c.quadraticCurveTo(910-i*8,118,880-i*14,158); c.stroke(); } c.setLineDash([]);
  ondaGrande(c,1380,200,.72);
}
function fundoRio(c){ /* embaixo d'água: pé da represa, casa e carros da enchente, plantas */
  var P=1600, i, x;
  /* pé da represa */
  box(c,120,0,380,420,lin(c,0,0,0,420,'#6e9aaa','#3f6a7c'),1,1.5); for(i=0;i<6;i++){ c.fillStyle='rgba(20,50,70,.55)'; rr(c,132+i*62,40,44,90,20); c.fill(); }
  c.fillStyle='rgba(255,255,255,.22)'; for(i=0;i<6;i++){ c.beginPath(); c.moveTo(138+i*62,130); c.lineTo(170+i*62,130); c.lineTo(190+i*62,270); c.lineTo(118+i*62,270); c.fill(); }
  /* casa inundada (telhado laranja, slide "floods") */
  c.save(); c.translate(760,420); c.globalAlpha=.92; box(c,-90,-100,180,100,lin(c,0,-100,0,0,'#eedcb8','#b8a888'),1); poly(c,[[-110,-96],[0,-180],[110,-96]]); fs(c,lin(c,0,-180,0,-96,'#d9682c','#a84820')); box(c,-16,-64,36,64,'#8a5428',2); [-58,44].forEach(function(d){ box(c,d,-78,32,30,'#a8d8ee',1); }); c.restore();
  /* carros azuis */
  [[1040,424,1],[1220,432,.86]].forEach(function(k){ c.save(); c.translate(k[0],k[1]); c.scale(k[2],k[2]); c.beginPath(); c.moveTo(-66,0); c.lineTo(-68,-22); c.quadraticCurveTo(-42,-30,-30,-32); c.quadraticCurveTo(-14,-52,18,-50); c.quadraticCurveTo(34,-48,46,-30); c.quadraticCurveTo(66,-28,68,-14); c.lineTo(66,0); c.closePath(); fs(c,lin(c,0,-50,0,0,'#6a8ec2','#2f4f86')); poly(c,[[-22,-32],[-8,-44],[12,-44],[12,-32]]); fs(c,'#bfe0ee',1.5); [-38,40].forEach(function(d){ circ(c,d,0,12); fs(c,'#222'); }); c.restore(); });
  /* algas e pedras */
  for(i=0;i<36;i++){ x=hash(i*1.7)*P; var yb=440; c.strokeStyle=i%3?'#2a8f58':'#3fa86a'; c.lineWidth=4; c.beginPath(); c.moveTo(x,yb); c.quadraticCurveTo(x+10,yb-30,x-3,yb-46-hash(i)*40); c.stroke(); }
  for(i=0;i<16;i++){ x=hash(i*4.3)*P; el(c,x,446,22+hash(i)*24,12+hash(i+3)*10); fs(c,'#587284',1.5,'#26404f'); }
  c.fillStyle=lin(c,0,430,0,470,'#a79560','#6c5c3a'); c.fillRect(0,442,P,30);
}
function peixeR(c,x,y,s,d,cor){ c.save(); c.translate(x,y); c.scale(s*d,s); poly(c,[[-13,0],[-26,-9],[-26,9]]); fs(c,cor,1.4); el(c,0,0,17,10); fs(c,cor,1.4); c.fillStyle='#fff'; circ(c,9,-2,3); c.fill(); c.fillStyle=OL; circ(c,10,-2,1.5); c.fill(); c.restore(); }
function regadorFundo(c){ regador(c,600,430,1.5); brotos(c,180,446,3,1.5); brotos(c,1100,446,3,1.3); }
function longeRecife(c,cam,t){ var cv=camada('recife','L',1600,472,1,fundoRio), j=JJ(), sup=(j&&j.mundo&&j.mundo.superficie>40)?j.mundo.superficie-j.camY:135; faixaP(c,cv,cam,0); A.ceuDoRio(c,sup,cam,t); }
function pertoRecife(c,cam,t){ faixaP(c,camada('recife','P',1700,472,1,regadorFundo),cam,0);
  [[0,180,1],[1,260,-1],[2,340,1],[3,230,-1]].forEach(function(f){ var x=mod(f[1]*3+f[2]*t*18-cam*.2,W+80)-40; peixeR(c,x,f[1]+Math.sin(t*.9+f[0])*9,.95,f[2],['#f6a23a','#f2dd5e','#e8695a','#7fd0a0'][f[0]]); }); }
/* sobre a linha d'água: represa, regador e onda; `ys` = linha d'água na tela. O cena.js usa no lugar de ceuDoMar. */
A.ceuDoRio=function(c,ys,cam,t){ if(ys<=0) return; ys=Math.min(ys,300); var cv=camada('recife','A',1600,200,1,acimaRio), x, cx=(cam||0)*.6;
  c.save(); c.beginPath(); c.rect(0,0,W,ys+6); c.clip(); if(ys>200){ c.fillStyle='#6fc4f0'; c.fillRect(0,0,W,ys); } faixaP(c,cv,cx,ys-200); c.restore();
  c.fillStyle='rgba(20,110,150,.5)'; c.beginPath(); c.moveTo(0,ys); for(x=0;x<=W;x+=12) c.lineTo(x,ys+Math.sin((x+cx)*.04+t*2)*4); c.lineTo(W,ys+14); c.lineTo(0,ys+14); c.closePath(); c.fill();
  c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=3; c.beginPath(); for(x=0;x<=W;x+=12){ var yy=ys+Math.sin((x+cx)*.04+t*2)*4; if(x) c.lineTo(x,yy); else c.moveTo(x,yy); } c.stroke();
};
function chaoRecife(c,s){ c.fillStyle=lin(c,0,s.y,0,s.y+s.h,'#b8a670','#5e4e30'); c.fillRect(s.x,s.y,s.w,s.h); c.fillStyle='#dcc88c'; c.fillRect(s.x,s.y,s.w,6); c.fillStyle='rgba(60,40,20,.3)'; for(var x=grade(s.x,26);x<s.x+s.w;x+=26){ if(x>=s.x){ circ(c,x+hash(x)*20,s.y+16+hash(x+1)*Math.max(4,s.h-24),2+hash(x+2)*3); c.fill(); } } c.strokeStyle=OL; c.lineWidth=2; c.strokeRect(s.x,s.y,s.w,s.h); }
function tronco(c,p,cor,cor2){ box(c,p.x+4,p.y,p.w-8,p.h,lin(c,0,p.y,0,p.y+p.h,cor,cor2),Math.min(10,p.h*.48),2.5); c.strokeStyle='rgba(50,25,8,.45)'; c.lineWidth=1.5; for(var y=p.y+6;y<p.y+p.h-3;y+=6) linha(c,p.x+12,y,p.x+p.w-14,y); el(c,p.x+p.w-6,p.y+p.h/2,7,p.h/2-1); fs(c,'#e0c08a',2); c.strokeStyle='#8a5c30'; c.lineWidth=1; el(c,p.x+p.w-6,p.y+p.h/2,3,p.h/4); c.stroke(); }
function platRecife(c,p){ tronco(c,p,'#a87444','#6a4424'); }

/* ---------- exporta para o arteC ---------- */
A.CB={OL:OL,FONTE:FONTE,fs:fs,poly:poly,box:box,txt:txt,rot:rot,mod:mod,fonteK:fonteK,camada:camada,faixaP:faixaP,JJ:JJ,altura:altura,vaso:vaso,bolaFut:bolaFut,caixaP:caixaP,livro:livro,livroDeitado:livroDeitado,planta:planta,pinoV:pinoV,casaArvore:casaArvore,sanduiche:sanduiche,octo:octo,placaTexto:placaTexto,tronco:tronco,almofada:almofada,prateleira:prateleira,vigaP:vigaP,regador:regador,trelica:trelica};

/* ---------- embrulho ---------- */
var F={
  vila:{ceu:ceuVila,longe:longeVila,perto:pertoVila,chao:chaoVila,plat:platVila},
  bosque:{ceu:ceuBosque,longe:longeBosque,perto:pertoBosque,chao:chaoBosque,plat:platBosque},
  casa:{ceu:ceuCasa,longe:longeCasa,perto:pertoCasa,chao:chaoCasa,plat:platCasa},
  recife:{ceu:ceuRecife,longe:longeRecife,perto:pertoRecife,chao:chaoRecife,plat:platRecife}
};
var ceu0=A.ceu, longe0=A.longe, perto0=A.perto, chao0=A.chao, plat0=A.plataforma;
A.ceu=function(c,cena,t){ var f=F[cena]; if(f){ c.save(); f.ceu(c,t||0); c.restore(); return; } ceu0(c,cena,t); };
A.longe=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.longe(c,cam||0,t||0); c.restore(); return; } longe0(c,cena,cam,t); };
A.perto=function(c,cena,cam,t){ var f=F[cena]; if(f){ c.save(); f.perto(c,cam||0,t||0); c.restore(); return; } perto0(c,cena,cam,t); };
A.chao=function(c,s,cena){ var f=F[cena]; if(f){ c.save(); f.chao(c,s); c.restore(); return; } chao0(c,s,cena); };
A.plataforma=function(c,p,cena){ var f=F[cena]; if(f){ c.save(); f.plat(c,p); c.restore(); return; } plat0(c,p,cena); };
})();
