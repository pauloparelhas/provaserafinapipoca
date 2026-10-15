/* ============================================================
   ING3_jogo_arte.js — "The Lost Endings": os três heróis (Lia,
   Theo, Bia), o dragãozinho Pip, a placa de resposta pendurada e
   a página do livro (recompensa). Estende window.ARTE (LP3_jornada_
   arte.js + arte2.js carregados antes). Tudo desenhado por código,
   resolução lógica 960x540, sem imagem e sem emoji.
   Segunda parte (moradores, Conde, cenas, mapa): ING3_jogo_arte2.js
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;

/* ---------- utilitários de cor e traço (exportados em A.ING para a parte 2) ---------- */
var OL='rgba(48,24,44,.62)';
function hx(h){ if(h.charAt(0)!=='#'){ var m=h.match(/[\d.]+/g); return [+m[0],+m[1],+m[2]]; } h=h.slice(1); if(h.length===3) h=h.replace(/./g,'$&$&'); var n=parseInt(h,16); return [n>>16&255,n>>8&255,n&255]; }
function mix(a,b,k){ var x=hx(a), y=hx(b); return 'rgb('+Math.round(x[0]+(y[0]-x[0])*k)+','+Math.round(x[1]+(y[1]-x[1])*k)+','+Math.round(x[2]+(y[2]-x[2])*k)+')'; }
function esc(a,k){ return mix(a,'#000',k); }
function cla(a,k){ return mix(a,'#fff',k); }
function fs(c,f,s,lw){ c.fillStyle=f; c.fill(); if(s!==null){ c.strokeStyle=s||OL; c.lineWidth=lw||1.5; c.stroke(); } }
function rad(c,x,y,r,c0,c1){ var g=c.createRadialGradient(x-r*.35,y-r*.45,r*.08,x,y,r*1.08); g.addColorStop(0,c0); g.addColorStop(1,c1); return g; }
function sombra(c,rx,a){ c.save(); c.globalAlpha=a||.22; c.fillStyle='#000'; el(c,0,1.5,rx,rx*.24); c.fill(); c.restore(); }
function brilho(c,x,y,r,cor,a){ var g=c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,cor); g.addColorStop(1,'rgba(255,255,255,0)'); c.save(); c.globalAlpha=a==null?1:a; c.fillStyle=g; circ(c,x,y,r); c.fill(); c.restore(); }
function cintila(c,x,y,r,cor){ c.save(); c.translate(x,y); c.fillStyle=cor||'#fff'; c.beginPath(); c.moveTo(0,-r); c.quadraticCurveTo(0,0,r,0); c.quadraticCurveTo(0,0,0,r); c.quadraticCurveTo(0,0,-r,0); c.quadraticCurveTo(0,0,0,-r); c.fill(); c.restore(); }
/* olho chibi: oval escuro com íris, dois brilhos, cílio opcional */
function olho(c,x,y,rx,ry,cor,pisca,cilio){
  if(pisca){ c.strokeStyle='#2a1610'; c.lineWidth=1.6; c.beginPath(); c.arc(x,y-ry*.2,rx*1.05,.15*PI,.85*PI); c.stroke(); return; }
  var g=c.createLinearGradient(0,y-ry,0,y+ry); g.addColorStop(0,'#160c08'); g.addColorStop(.55,cor); g.addColorStop(1,cla(cor,.35));
  c.fillStyle=g; el(c,x,y,rx,ry); c.fill();
  c.fillStyle='#fff'; el(c,x-rx*.3,y-ry*.38,rx*.46,ry*.34); c.fill(); circ(c,x+rx*.38,y+ry*.42,rx*.2); c.fill();
  if(cilio){ c.strokeStyle='#1f110b'; c.lineWidth=1.5; c.beginPath(); c.ellipse(x,y,rx*1.06,ry*1.04,0,1.15*PI,1.85*PI); c.stroke(); c.lineWidth=1.2; c.beginPath(); c.moveTo(x+rx*.85,y-ry*.72); c.lineTo(x+rx*1.45,y-ry*1.05); c.stroke(); }
}
function boca(c,tipo,x,y,s){
  s=s||1; c.save(); c.translate(x,y); c.scale(s,s);
  c.strokeStyle='#7a2e26'; c.lineWidth=1.4;
  if(tipo==='open'){ c.beginPath(); c.moveTo(-4.4,-1); c.lineTo(4.4,-1); c.quadraticCurveTo(4,6.5,0,6.5); c.quadraticCurveTo(-4,6.5,-4.4,-1); c.closePath(); fs(c,'#8f2d2d','#5c1b1b',1.1); c.save(); c.clip(); c.fillStyle='#f58a9b'; el(c,0,5.5,3.2,2.4); c.fill(); c.restore(); }
  else if(tipo==='o'){ c.fillStyle='#7a2e26'; el(c,0,1,1.8,2.2); c.fill(); }
  else if(tipo==='O'){ c.fillStyle='#7a2e26'; el(c,0,1.6,2.8,3.4); c.fill(); c.fillStyle='#f58a9b'; el(c,0,3.4,1.8,1.2); c.fill(); }
  else if(tipo==='wavy'){ c.beginPath(); c.moveTo(-4,1); c.quadraticCurveTo(-2,-1.5,0,1); c.quadraticCurveTo(2,3.5,4,1); c.stroke(); }
  else if(tipo==='sad'){ c.beginPath(); c.arc(0,4,3.4,1.15*PI,1.85*PI); c.stroke(); }
  else { c.beginPath(); c.arc(0,-1.2,3.6,.18*PI,.82*PI); c.stroke(); }
  c.restore();
}
A.ING={OL:OL,mix:mix,esc:esc,cla:cla,fs:fs,rad:rad,sombra:sombra,brilho:brilho,cintila:cintila,olho:olho,boca:boca};

/* ============================================================
   HERÓIS — pés em (x,y), ~88 px com escala 1, olham para dir.
   quem: 'lia' | 'theo' | 'bia'.  look opcional {cor:'#hex', capa:'#hex'}
   estados: idle walk jump fall cheer dizzy crouch crawl swim fly ride
   (crouch = agachado parado ~60% da altura; crawl = rastejando de barriga)
   (swim/fly giram o corpo na horizontal em torno do quadril;
    ride: (x,y) é o ASSENTO — use pip.y - A.pip.SELA_Y*escala)
   ============================================================ */
var HEROIS={
  lia: {pele:'#fcdcc4',peleS:'#eab08f',cab:'#8d5530',cabS:'#5a3219',olho:'#6b3f1f',cor:'#dc2626',cilio:true},
  theo:{pele:'#b97a4e',peleS:'#93572f',cab:'#2c1a10',cabS:'#140a05',olho:'#3b2112',cor:'#2f55c8',cilio:false},
  bia: {pele:'#d9a072',peleS:'#b47b4c',cab:'#3d2416',cabS:'#1f1009',olho:'#3f2210',cor:'#ec4899',cilio:true}
};
A.HEROIS=HEROIS;

function pose(e,t){
  var P={bob:0,rot:0,sx:1,sy:1,lean:0,aN:.12,aF:-.1,lN:[0,.05],lF:[0,.05],tilt:0,face:'normal',boca:'smile',capa:.4,sw:.2,corpo:0,sent:0};
  var s,k;
  switch(e){
    case 'walk': s=Math.sin(t*11); P.bob=-Math.abs(Math.cos(t*11))*2.4; P.lN=[s*.62,Math.max(0,-s)*.75+.1]; P.lF=[-s*.62,Math.max(0,s)*.75+.1];
      P.aN=-s*.75; P.aF=s*.75; P.lean=.06; P.sw=.45+Math.abs(s)*.15; P.capa=1.4+Math.abs(s); P.tilt=s*.03; break;
    case 'jump': P.sx=.94; P.sy=1.07; P.lN=[1.05,1.4]; P.lF=[-.25,.75]; P.aN=-2.35; P.aF=2.15; P.boca='o'; P.face='alto'; P.sw=-.15; P.capa=2.2; break;
    case 'fall': s=Math.sin(t*16); P.sy=.98; P.lN=[.28,.4]; P.lF=[-.22,.55]; P.aN=-2.55+s*.25; P.aF=2.35-s*.25; P.boca='O'; P.face='susto'; P.sw=1.0; P.capa=-2.6; break;
    case 'cheer': s=Math.abs(Math.sin(t*7)); k=s<.22?(.22-s)/.22:0; P.bob=-s*12; P.sx=1+k*.08-s*.03; P.sy=1-k*.08+s*.05;
      P.aN=-2.6+Math.sin(t*14)*.15; P.aF=2.45-Math.sin(t*14)*.15; P.lN=[s*.5,s*.9]; P.lF=[s*.15,s*.7]; P.face='feliz'; P.boca='open'; P.tilt=Math.sin(t*7)*.07; P.sw=.2-s*.5; P.capa=.8-s*2; break;
    case 'dizzy': P.rot=Math.sin(t*3.5)*.07; P.tilt=Math.sin(t*4.5)*.2; P.aN=.5+Math.sin(t*4)*.2; P.aF=-.3; P.face='tonto'; P.boca='wavy'; P.lN=[.08,.1]; P.lF=[-.1,.15]; P.sw=Math.sin(t*4.5)*.4; break;
    case 'swim': s=Math.sin(t*6); P.corpo=PI/2*.8+Math.sin(t*3)*.05; P.aN=1.25+s*.65; P.aF=1.25-s*.65; P.tilt=-1.0; P.lN=[Math.sin(t*12)*.35,.25]; P.lF=[-Math.sin(t*12)*.35,.25]; P.boca='o'; P.sw=.25; P.capa=1; break;
    case 'fly': P.corpo=PI/2*.84+Math.sin(t*2)*.04; P.aN=1.05+Math.sin(t*3)*.08; P.aF=1.9+Math.sin(t*3)*.08; P.tilt=-1.05; P.lN=[-.06,.14+Math.sin(t*5)*.1]; P.lF=[.12,.28]; P.boca='open'; P.sw=.55; break;
    case 'ride': P.sent=1; P.lN=[1.45,1.5]; P.lF=[1.35,1.4]; P.aN=1.0+Math.sin(t*4)*.06; P.aF=.85; P.bob=Math.sin(t*5)*.8; P.sw=.3+Math.sin(t*5)*.1; break;
    default: s=Math.sin(t*2.6); P.sy=1+s*.012; P.sx=1-s*.008; P.aN=.12+s*.04; P.aF=-.1-s*.03; P.sw=.15+Math.sin(t*1.7)*.08; P.tilt=Math.sin(t*1.3)*.025;
  }
  return P;
}

/* ---------- capa (curta da Lia; longa no voo) ---------- */
function capa(c,K,P,t,longa){
  var cc=K.capa||(K.q==='lia'?K.cor:'#7c3aed'), w1=Math.sin(t*9)*3, w2=Math.sin(t*9+1.6)*3.5;
  c.beginPath(); c.moveTo(5,-45); c.quadraticCurveTo(-3,-49.5,-10,-43);
  if(longa){ c.bezierCurveTo(-17,-24,-14+w1,-4,-13+w2,24); c.quadraticCurveTo(-7+w1,18+w2*.5,-2+w2,27); c.quadraticCurveTo(2+w1*.4,6,4,-40); }
  else { var k=P.capa, hxx=-15-Math.abs(k)*2.2+Math.sin(t*8)*Math.min(2,Math.abs(k)*.6), hy=-17+Math.min(0,k)*4.5;
    c.quadraticCurveTo(-16-Math.abs(k),-31,hxx,hy); c.quadraticCurveTo(-9-Math.abs(k)*.5,hy+3,-3,-19); c.lineTo(3,-40); }
  c.closePath(); fs(c,lin(c,0,-48,-14,longa?20:-16,cc,esc(cc,.4)));
  c.save(); c.clip(); c.fillStyle='rgba(255,255,255,.16)'; c.fillRect(-6,-50,3,longa?80:36); c.restore();
}

/* ---------- braço (pivô no ombro) ---------- */
function braco(c,K,a,sx,longe,t,estado){
  var q=K.q, pele=longe?esc(K.pele,.12):K.pele, cor=longe?esc(K.cor,.18):K.cor;
  c.save(); c.translate(sx,-41); c.rotate(-a);
  if(K.mergulho){ rr(c,-3.6,-3,7.2,16.5,3.6); fs(c,lin(c,-3,0,3,0,longe?'#183052':'#2a4f82',longe?'#0f2038':'#16304f')); c.fillStyle=cor; c.fillRect(-3.6,4,7.2,2); circ(c,0,15.6,3.9); fs(c,pele); c.restore(); return; }
  if(q==='theo'){ c.beginPath(); c.moveTo(-3.4,-3); c.lineTo(3.4,-3); c.lineTo(5.4,12); c.quadraticCurveTo(0,14.6,-5.4,12); c.closePath(); fs(c,lin(c,-5,0,5,0,cla(cor,.12),esc(cor,.15)));
    c.strokeStyle='#f6c445'; c.lineWidth=1.8; c.beginPath(); c.moveTo(-5,11.6); c.quadraticCurveTo(0,14.2,5,11.6); c.stroke();
    circ(c,0,15.2,3.8); fs(c,pele);
    if(!longe){ /* varinha */ c.strokeStyle='#5b3418'; c.lineWidth=2.6; c.beginPath(); c.moveTo(-1,16); c.lineTo(11,8.5); c.stroke(); c.strokeStyle='#a0703f'; c.lineWidth=1; c.beginPath(); c.moveTo(-.5,15.2); c.lineTo(10,8.7); c.stroke();
      var pul=1+Math.sin(t*6)*.12; brilho(c,12.5,7.5,10*pul,'rgba(254,240,138,.9)',.8); A.estrela(c,12.5,7.5,4.6,'#fde047',t*1.5); c.save(); c.globalAlpha=.9; A.estrela(c,12.5,7.5,2,'#fff',t*1.5); c.restore();
      if(estado==='cheer'||estado==='fly'){ for(var i=0;i<3;i++){ var f=(t*1.6+i/3)%1; c.save(); c.globalAlpha=1-f; cintila(c,12-f*14+Math.sin(i*2+t*4)*3,7+f*10,2.6*(1-f)+.8,'#fef08a'); c.restore(); } } }
  } else if(q==='bia'){ rr(c,-3.3,-3,6.6,17.5,3.3); fs(c,lin(c,-3,0,3,0,cla(pele,.1),esc(pele,.06)));
    c.save(); rr(c,-3.3,-3,6.6,17.5,3.3); c.clip(); c.fillStyle=cor; c.fillRect(-4,-4,8,7.5); c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(-4,3,8,1.2); c.restore();
    circ(c,0,15.6,3.8); fs(c,pele);
  } else { rr(c,-3.7,-3,7.4,16.5,3.7); fs(c,lin(c,-3,0,3,0,cla(cor,.1),esc(cor,.12)));
    rr(c,-3.9,8,7.8,5.4,2.4); fs(c,longe?'#6b7280':lin(c,0,8,0,13,'#e5e7eb','#94a3b8'));
    circ(c,0,15.6,3.9); fs(c,pele);
    if(!longe){ c.beginPath(); c.ellipse(0,-.5,5.2,3.6,0,PI,TAU); c.quadraticCurveTo(0,3.6,-5.2,-.5); c.closePath(); fs(c,lin(c,0,-4,0,3,'#f1f5f9','#8b97a8'),'#5b6577',1.1); c.fillStyle='rgba(255,255,255,.7)'; el(c,-1.6,-2.4,2.2,.9); c.fill(); }
  }
  c.restore();
}

/* ---------- perna (coxa + canela, pivô no quadril) ---------- */
function perna(c,K,L,hxx,longe){
  var q=K.q, d=longe?.16:0, pele=esc(K.pele,d);
  if(K.mergulho){ c.save(); c.translate(hxx,-18); c.rotate(-L[0]); rr(c,-3.9,-3,7.8,13,3.9); fs(c,esc('#24466f',d)); c.translate(0,9); c.rotate(L[1]); rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,esc('#1f3b63',d));
    c.beginPath(); c.moveTo(-4.5,6); c.lineTo(4.5,6); c.quadraticCurveTo(15,9,19,13); c.quadraticCurveTo(8,15.5,-4,12.5); c.closePath(); fs(c,lin(c,0,6,0,14,esc(K.cor,d),esc(K.cor,d+.3))); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; c.beginPath(); c.moveTo(4,9); c.lineTo(15,12); c.stroke(); c.restore(); return; }
  var coxa=q==='bia'?pele:(q==='theo'?esc('#3b3552',d):esc('#56607a',d));
  var can=q==='bia'?pele:(q==='theo'?esc('#3b3552',d):esc('#8b5a2b',d));
  c.save(); c.translate(hxx,-18); c.rotate(-L[0]);
  rr(c,-3.9,-3,7.8,13,3.9); fs(c,coxa);
  c.translate(0,9); c.rotate(L[1]);
  rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,can);
  if(q==='lia'){ rr(c,-4.3,-1.5,8.6,3.4,1.6); fs(c,esc('#b7834d',d)); }
  if(q==='bia'){ rr(c,-3.9,5.6,7.8,3.6,1.6); fs(c,esc('#f8fafc',d)); }
  /* sapato */
  if(q==='theo'){ c.beginPath(); c.moveTo(-4.2,7.2); c.quadraticCurveTo(-4.6,12.4,1,12.2); c.lineTo(8.5,11.8); c.quadraticCurveTo(11.5,10.6,10.2,8); c.quadraticCurveTo(7,9.8,3.5,7.4); c.closePath(); fs(c,esc('#7c4a25',d)); }
  else if(q==='bia'){ el(c,2.4,10.2,6.6,3.8); fs(c,esc('#ffffff',d)); c.fillStyle=esc('#f472b6',d); rr(c,-4.2,12,13.2,2.3,1.1); c.fill(); c.strokeStyle=esc('#f472b6',d); c.lineWidth=1; c.beginPath(); c.moveTo(1,8); c.lineTo(4.5,7.6); c.stroke(); }
  else { el(c,2.4,10.2,6.4,3.9); fs(c,esc('#6b3f1f',d)); c.fillStyle='rgba(255,255,255,.25)'; el(c,3.5,8.6,3,1); c.fill(); }
  c.restore();
}

/* ---------- tronco por herói ---------- */
function torso(c,K,P,t){
  var q=K.q, cor=K.cor;
  if(K.mergulho){ rr(c,-11,-47,22,32,10); fs(c,lin(c,-11,-47,11,-15,'#2f5a92','#14294a'));
    c.save(); rr(c,-11,-47,22,32,10); c.clip(); c.fillStyle=cor; c.beginPath(); c.moveTo(-12,-30); c.lineTo(12,-42); c.lineTo(12,-37); c.lineTo(-12,-25); c.fill(); c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(-7,-46,3,30); c.restore();
    c.strokeStyle='#cbd5e1'; c.lineWidth=1.2; c.beginPath(); c.moveTo(2,-46); c.lineTo(2,-33); c.stroke(); circ(c,2,-46,1.4); c.fillStyle='#e5e7eb'; c.fill(); return; }
  if(q==='lia'){
    c.beginPath(); c.moveTo(-11,-27); c.lineTo(11,-27); c.lineTo(13.6,-13.5); c.quadraticCurveTo(0,-10.6,-13.6,-13.5); c.closePath(); fs(c,lin(c,0,-27,0,-12,esc(cor,.05),esc(cor,.3)));
    c.strokeStyle='rgba(255,255,255,.28)'; c.lineWidth=1; for(var i=-1;i<=1;i++){ c.beginPath(); c.moveTo(i*5,-25); c.lineTo(i*6.4,-13); c.stroke(); }
    rr(c,-11,-47,22,24,9); fs(c,lin(c,-11,-47,11,-23,cla(cor,.15),esc(cor,.15)));
    c.beginPath(); c.moveTo(-10,-44); c.quadraticCurveTo(0,-48.5,10,-44); c.lineTo(10,-29); c.quadraticCurveTo(0,-25,-10,-29); c.closePath(); fs(c,lin(c,-10,-46,10,-26,'#f8fafc','#94a3b8'),'#5b6577',1.3);
    c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=1.6; c.beginPath(); c.moveTo(-5.5,-43); c.quadraticCurveTo(-7,-36,-5.5,-30.5); c.stroke();
    c.save(); c.translate(3,-37); c.fillStyle='#f6c445'; c.beginPath(); c.moveTo(0,4); c.bezierCurveTo(-6,-.5,-3.2,-5.2,0,-2.4); c.bezierCurveTo(3.2,-5.2,6,-.5,0,4); c.fill(); c.strokeStyle='#b7791f'; c.lineWidth=.8; c.stroke(); c.restore();
    rr(c,-11.5,-28.5,23,4.4,2); fs(c,'#7c4a25'); rr(c,1.5,-29.2,5.6,5.8,1.4); fs(c,'#f6c445','#b7791f',1);
  } else if(q==='theo'){
    var hw=Math.sin(t*5)*.8;
    c.beginPath(); c.moveTo(-9,-46); c.quadraticCurveTo(0,-49,9,-46); c.lineTo(14.5,-13+hw); c.quadraticCurveTo(0,-9.8,-14.5,-13-hw); c.closePath();
    fs(c,lin(c,-12,-46,12,-12,cla(cor,.12),esc(cor,.28)));
    c.save(); c.clip(); c.fillStyle='rgba(255,255,255,.12)'; c.beginPath(); c.moveTo(-3,-48); c.lineTo(2,-48); c.lineTo(-2,-8); c.lineTo(-8,-8); c.fill(); c.restore();
    c.strokeStyle='#f6c445'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-14,-13.6-hw); c.quadraticCurveTo(0,-10.6,14,-13.6+hw); c.stroke();
    A.estrela(c,4,-33,3.2,'#fde047',.2); A.estrela(c,-5.5,-21,2.4,'#fde68a',-.3); A.estrela(c,8,-19,2,'#fde68a',.5);
    c.fillStyle='#fde68a'; c.beginPath(); c.arc(-4,-38,3,0,TAU); c.fill(); c.fillStyle=cla(cor,.05); c.beginPath(); c.arc(-2.8,-39,2.6,0,TAU); c.fill();
    c.strokeStyle='#e8b23a'; c.lineWidth=1.8; c.beginPath(); c.moveTo(-10.5,-27.5); c.quadraticCurveTo(0,-25.5,10.5,-27.5); c.stroke(); c.beginPath(); c.moveTo(5,-26.6); c.lineTo(6,-20); c.stroke(); circ(c,6,-19.5,1.5); c.fillStyle='#e8b23a'; c.fill();
    c.beginPath(); c.moveTo(-6,-46.5); c.lineTo(0,-40); c.lineTo(6,-46.5); c.closePath(); fs(c,'#f8fafc',OL,1.1);
  } else {
    rr(c,-10,-47,20,30,9); fs(c,lin(c,-10,-47,10,-17,cla(cor,.18),esc(cor,.18)));
    c.save(); rr(c,-10,-47,20,30,9); c.clip();
    c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.moveTo(-12,-28); c.lineTo(12,-42); c.lineTo(12,-37); c.lineTo(-12,-23); c.fill();
    c.fillStyle='rgba(196,181,253,.8)'; c.beginPath(); c.moveTo(-12,-23); c.lineTo(12,-37); c.lineTo(12,-35); c.lineTo(-12,-21); c.fill();
    c.fillStyle=esc(cor,.2); c.beginPath(); c.moveTo(-11,-19); c.quadraticCurveTo(0,-23,11,-19); c.lineTo(11,-15); c.lineTo(-11,-15); c.fill();
    c.restore();
    var cin=.5+.5*Math.sin(t*4); c.save(); c.globalAlpha=.6+.4*cin; cintila(c,-4,-38,2.2,'#fff'); cintila(c,5,-26,1.8,'#fff'); c.restore();
  }
}

/* ---------- cabeça (origem no centro da cabeça; olha para +x) ---------- */
function cabeca(c,K,P,t){
  var q=K.q, cab=lin(c,-20,-22,20,10,cla(K.cab,.12),K.cabS), pisca=(t%3.6)<.11 && P.face==='normal';
  /* atrás da cabeça */
  if(q==='lia'){ el(c,-2,-3,21.6,20.6); fs(c,cab);
    c.save(); c.translate(-15,-11); c.rotate(.25+P.sw+Math.sin(t*3)*.05);
    c.beginPath(); c.moveTo(1,-4); c.bezierCurveTo(-13,-7,-21,9,-13,24); c.bezierCurveTo(-11,17,-3,10,4,3); c.closePath(); fs(c,cab);
    c.strokeStyle='rgba(0,0,0,.18)'; c.lineWidth=1; c.beginPath(); c.moveTo(-3,-1); c.quadraticCurveTo(-12,6,-12,18); c.stroke();
    c.restore(); c.save(); c.translate(-15,-11); circ(c,0,0,3.6); fs(c,K.cor); c.restore(); }
  else if(q==='bia'){ circ(c,-7,-20,9.6); fs(c,cab); c.save(); c.translate(-6,-12.5); c.rotate(-.35); el(c,0,0,7.6,3.4); fs(c,lin(c,0,-3,0,3,'#f9a8d4','#db2777'),'#9d174d',1); c.strokeStyle='rgba(255,255,255,.45)'; c.lineWidth=.9; for(var rz=-5;rz<=5;rz+=2.5){ c.beginPath(); c.moveTo(rz,-2.6); c.lineTo(rz+.6,2.4); c.stroke(); } c.restore(); c.strokeStyle='rgba(0,0,0,.2)'; c.lineWidth=1; c.beginPath(); c.arc(-7,-19,5.5,PI*.9,PI*1.9); c.stroke();
    c.fillStyle='rgba(255,255,255,.22)'; el(c,-9,-23,3.5,2); c.fill(); }
  else { c.fillStyle=K.cabS; c.beginPath(); [[-15,2,7],[-12,-7,7],[-17,-3,6],[-11,9,5]].forEach(function(p){ c.moveTo(p[0]+p[2],p[1]); c.arc(p[0],p[1],p[2],0,TAU); }); c.fill(); }
  /* rosto */
  el(c,1,0,20,18.6); fs(c,rad(c,3,-1,21,cla(K.pele,.28),K.pele));
  c.save(); el(c,1,0,20,18.6); c.clip(); c.fillStyle=K.peleS; c.globalAlpha=.35; el(c,-17,4,10,20); c.fill(); c.restore();
  /* olhos */
  var ex1=-.5, ex2=12, ey=1.5;
  if(P.face==='feliz'){ c.strokeStyle='#2a1610'; c.lineWidth=2; c.beginPath(); c.arc(ex1,ey+2,3.6,1.12*PI,1.88*PI); c.stroke(); c.beginPath(); c.arc(ex2,ey+2,3.2,1.12*PI,1.88*PI); c.stroke(); }
  else if(P.face==='tonto'){ c.strokeStyle='#2a1610'; c.lineWidth=1.3; [ex1,ex2].forEach(function(x0,j){ c.beginPath(); for(var a=0;a<TAU*2.2;a+=.3){ var r=a*.6; c.lineTo(x0+Math.cos(a+t*6*(j?-1:1))*r,ey+Math.sin(a+t*6*(j?-1:1))*r); } c.stroke(); }); }
  else { var ryk=P.face==='susto'||P.face==='alto'?1.08:1; olho(c,ex1,ey,4.3,5.8*ryk,K.olho,pisca,K.cilio); olho(c,ex2,ey,3.8,5.5*ryk,K.olho,pisca,K.cilio); }
  /* bochechas, nariz, boca */
  c.fillStyle='rgba(244,114,128,.38)'; el(c,-6.5,9,4.2,2.6); c.fill(); el(c,16.5,8.5,3,2.4); c.fill();
  c.strokeStyle=esc(K.peleS,.15); c.lineWidth=1.2; c.beginPath(); c.moveTo(6.5,4.5); c.quadraticCurveTo(8,6.5,6.2,7.2); c.stroke();
  boca(c,P.boca,6.2,11.4,1);
  /* cabelo da frente (recortado na cabeça) */
  c.save(); el(c,1,0,20.6,19.2); c.clip();
  if(q==='lia'){ c.beginPath(); c.moveTo(-24,16); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-1); c.quadraticCurveTo(20,-9,15.5,-3.5); c.quadraticCurveTo(12,-11,6,-5.5); c.quadraticCurveTo(1.5,-12,-4,-6.5); c.quadraticCurveTo(-8.5,-10,-10.5,-1); c.lineTo(-12.5,7); c.quadraticCurveTo(-16,13,-24,16); c.closePath(); fs(c,cab,K.cabS,1); }
  else if(q==='bia'){ c.beginPath(); c.moveTo(-24,16); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-8.5); c.quadraticCurveTo(14,-15.5,2,-11); c.quadraticCurveTo(-8,-7,-11,2); c.quadraticCurveTo(-12.5,9,-17,14); c.closePath(); fs(c,cab,K.cabS,1);
    c.strokeStyle='rgba(255,255,255,.14)'; c.lineWidth=1; for(var s=0;s<4;s++){ c.beginPath(); c.moveTo(14-s*6,-12+s*1.5); c.quadraticCurveTo(4-s*5,-18,-6,-19); c.stroke(); } }
  else { c.fillStyle=K.cab; [[-9,-11,4.6],[-3,-12,4.4],[3,-12.5,4],[9,-11.5,3.6],[14,-10,3.2],[-13,-6,4]].forEach(function(p){ circ(c,p[0],p[1],p[2]); fs(c,cab,K.cabS,.8); }); }
  c.restore();
  el(c,1,0,20,18.6); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  if(q!=='theo'){ c.strokeStyle='rgba(255,255,255,.32)'; c.lineWidth=2.6; c.beginPath(); c.arc(1,-2,15,1.18*PI,1.5*PI); c.stroke(); }
  /* orelha */
  el(c,-12.5,4,3.4,4.4); fs(c,K.pele); c.strokeStyle=K.peleS; c.lineWidth=1; c.beginPath(); c.arc(-12.3,4.3,1.8,-.5*PI,.6*PI); c.stroke();
  if(q==='bia'){ c.fillStyle='#fcd34d'; circ(c,-12.5,8.8,1.3); c.fill(); }
  /* sobrancelhas */
  if(P.face!=='tonto'){ var by=P.face==='susto'||P.face==='alto'?-12.6:-10.8, inc=P.face==='susto'?-.25:0;
    c.strokeStyle=K.q==='theo'?K.cabS:esc(K.cab,.15); c.globalAlpha=.9; c.lineWidth=1.15; c.beginPath(); c.moveTo(ex1-3,by+.6-inc*4); c.quadraticCurveTo(ex1,by-1.2,ex1+3,by+.2+inc*4); c.stroke(); c.beginPath(); c.moveTo(ex2-2.6,by+.2+inc*4); c.quadraticCurveTo(ex2,by-1.2,ex2+2.6,by+.6-inc*4); c.stroke(); c.globalAlpha=1; }
  if(K.mergulho){ /* máscara de mergulho + snorkel */
    c.strokeStyle='#0f172a'; c.lineWidth=3; c.beginPath(); c.ellipse(1,0,20.6,19.2,0,1.05*PI,1.62*PI); c.stroke();
    rr(c,-6.5,-6.5,24,14.5,6); fs(c,'rgba(186,230,253,.38)','#0f766e',2.6); c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.4; c.beginPath(); c.moveTo(-3,-3.5); c.lineTo(1,-3.5); c.stroke();
    c.strokeStyle='#f97316'; c.lineWidth=3.2; c.beginPath(); c.moveTo(-11,6); c.quadraticCurveTo(-16,-4,-15,-24); c.stroke(); c.fillStyle='#0f172a'; rr(c,-17.5,-28,5,5,2); c.fill(); }
  /* chapéu do Theo */
  if(q==='theo'&&!K.mergulho){ var wob=Math.sin(t*3)*.06+(P.sw-.2)*.25, hc=K.cor;
    el(c,0,-13,26,6.2); fs(c,lin(c,0,-19,0,-7,cla(hc,.1),esc(hc,.35)));
    c.save(); c.translate(0,-15); c.rotate(-wob);
    c.beginPath(); c.moveTo(-15,1); c.bezierCurveTo(-13,-14,-6,-24,-9,-36); c.quadraticCurveTo(-11,-41,-16,-40); c.quadraticCurveTo(-8,-46,-3,-36); c.bezierCurveTo(2,-26,10,-14,15,1); c.closePath();
    fs(c,lin(c,-14,-40,14,0,cla(hc,.15),esc(hc,.3)));
    c.save(); c.clip(); c.fillStyle='rgba(255,255,255,.14)'; c.beginPath(); c.moveTo(-6,2); c.lineTo(-1,2); c.lineTo(-6,-34); c.fill(); c.restore();
    rr(c,-14.6,-4.5,29.2,5,2); fs(c,'#f6c445','#b7791f',1);
    A.estrela(c,4,-12,3.4,'#fde047',.3); A.estrela(c,-4,-22,2.4,'#fde68a',-.2); c.fillStyle='#fde68a'; circ(c,-15.5,-40,2.2); c.fill();
    c.restore(); }
}

/* ---------- abaixado: 'crouch' = agachado parado; 'crawl' = rastejando DE BARRIGA ----------
   (nunca de quatro apoios: humano agacha ou se arrasta deitado, cotovelos puxando) */
function agacha(c,K,t){
  var r=Math.sin(t*2.6), P={face:'normal',boca:'smile',sw:.35+r*.05,capa:.5,tilt:0};
  sombra(c,20);
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.85,2.85],4,true); c.restore();
  function quadro(){ c.translate(0,-7+r*.3); c.rotate(.22); c.scale(1.05,.64); c.translate(0,18); }
  c.save(); quadro(); if(K.q==='lia') capa(c,K,P,t,false); braco(c,K,1.05,5,true,t,'crouch'); torso(c,K,P,t); c.restore();
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.75,2.8],-3,false); c.restore();
  c.save(); c.translate(6.5,-36+r*.6); c.rotate(-.04); c.scale(.93,.93); cabeca(c,K,P,t); c.restore();
  c.save(); quadro(); braco(c,K,1.2+r*.03,-4,false,t,'crouch'); c.restore();
}
function rasteja(c,K,t){
  var f=t*7, s=Math.sin(f), P={face:'normal',boca:'smile',sw:.9,capa:1.4,tilt:0,lN:[s*.12,.08],lF:[-s*.12,.08]};
  c.save(); c.translate(4,0); sombra(c,36,.2); c.restore();
  c.save(); c.translate(s*1.2,0);
  function quadro(){ c.translate(-8,-11); c.rotate(PI/2); c.translate(0,18); }
  c.save(); quadro(); if(K.q==='lia') capa(c,K,P,t,false); braco(c,K,PI*.72-s*.38,5,true,t,'crawl'); perna(c,K,P.lF,3,true); perna(c,K,P.lN,-3,false); torso(c,K,P,t); c.restore();
  c.save(); c.translate(31,-26+Math.abs(s)*.8); c.rotate(-.06+s*.03); c.scale(.92,.92); cabeca(c,K,P,t); c.restore();
  c.save(); quadro(); braco(c,K,PI*.72+s*.38,-4,false,t,'crawl'); c.restore();
  c.restore();
}

A.heroi=function(c,x,y,estado,t,dir,escala,quem,look){
  var H0=HEROIS[quem]||HEROIS.lia; quem=HEROIS[quem]?quem:'lia';
  var K={q:quem,pele:H0.pele,peleS:H0.peleS,cab:H0.cab,cabS:H0.cabS,olho:H0.olho,cilio:H0.cilio,cor:(look&&look.cor)||H0.cor,capa:look&&look.capa,mergulho:estado==='swim'||!!(look&&look.mergulho)}; /* 18/10: com a roupa pega, ela fica vestida também fora d'água e parada */
  escala=escala||1; dir=dir||1; t=t||0;
  c.save(); c.translate(x,y); c.scale(dir*escala,escala); c.lineJoin='round'; c.lineCap='round';
  if(estado==='crawl'){ rasteja(c,K,t); c.restore(); return; }
  if(estado==='crouch'){ agacha(c,K,t); c.restore(); return; }
  var P=pose(estado,t);
  if(!P.corpo && !P.sent) sombra(c,17);
  if(P.sent) c.translate(0,18);
  c.translate(0,P.bob);
  if(P.corpo){ c.translate(0,-30); c.rotate(P.corpo); c.translate(0,30); }
  c.rotate(P.rot+P.lean); c.scale(P.sx,P.sy);
  if((quem==='lia'&&!K.mergulho)||estado==='fly') capa(c,K,P,t,estado==='fly');
  braco(c,K,P.aF,5,true,t,estado);
  perna(c,K,P.lF,3,true);
  perna(c,K,P.lN,-3,false);
  torso(c,K,P,t);
  c.save(); c.translate(1,-62); c.rotate(P.tilt); cabeca(c,K,P,t); c.restore();
  braco(c,K,P.aN,-4,false,t,estado);
  if(estado==='dizzy'){ for(var i=0;i<3;i++){ var a=t*5+i*TAU/3; A.estrela(c,1+Math.cos(a)*20,-90+Math.sin(a)*5,4.5,'#fde047',a); } }
  if(estado==='swim'){ for(var b=0;b<3;b++){ var fb=(t*.9+b/3)%1; c.save(); c.globalAlpha=.75*(1-fb); c.strokeStyle='#e0f2fe'; c.lineWidth=1.3; circ(c,14+Math.sin(fb*9+b)*2,-60-fb*26,2+b*.8+fb*2); c.stroke(); c.restore(); } }
  if(estado==='fly'){ c.save(); c.globalAlpha=.45; c.strokeStyle='#fff'; c.lineWidth=2; for(var v=0;v<3;v++){ var fv=(t*2.2+v/3)%1; c.beginPath(); c.moveTo(-14+v*12,10+fv*30); c.lineTo(-14+v*12,22+fv*30); c.stroke(); } c.restore(); }
  c.restore();
};

/* ============================================================
   PIP — dragãozinho verde bebê, pés em (x,y), olha para dir.
   estados: idle walk fly ride egg.  A.pip.SELA_Y = altura do assento.
   ============================================================ */
var PV='#5ccf6f', PVS='#1f8f4a', PVL='#b9f5b0', BEG='#fff1c7';
function asa(c,ang,longe){
  c.save(); c.rotate(ang);
  c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-6,-20,-14,-30); c.quadraticCurveTo(-18,-20,-24,-22); c.quadraticCurveTo(-22,-12,-28,-10); c.quadraticCurveTo(-20,-4,-22,2); c.quadraticCurveTo(-10,0,0,4); c.closePath();
  fs(c,lin(c,0,-30,-24,4,longe?'#8fd99a':PVL,longe?'#3f9f5a':'#6fd28a'));
  c.strokeStyle=longe?'#2f7d46':'#2c9a55'; c.lineWidth=1.3; c.beginPath(); c.moveTo(0,1); c.lineTo(-14,-30); c.moveTo(-2,1); c.lineTo(-24,-22); c.moveTo(-3,2); c.lineTo(-28,-10); c.stroke();
  c.restore();
}
A.pip=function(c,x,y,estado,t,dir,escala){
  escala=escala||1; dir=dir||1; t=t||0;
  c.save(); c.translate(x,y); c.scale(dir*escala,escala); c.lineJoin='round'; c.lineCap='round';
  if(estado==='egg'){ ovo(c,t); c.restore(); return; }
  var voa=estado==='fly', anda=estado==='walk', mont=estado==='ride';
  var bob=voa?Math.sin(t*5)*4-6:(anda?-Math.abs(Math.cos(t*10))*2:Math.sin(t*2.6)*.8), flap=voa?Math.sin(t*12)*.75:(mont?Math.sin(t*4)*.35-.2:Math.sin(t*2)*.08), inc=voa?-.12:0;
  if(!voa) sombra(c,30,.22); else { c.save(); c.globalAlpha=.12; c.fillStyle='#000'; el(c,0,1.5,24,5); c.fill(); c.restore(); }
  c.translate(0,bob); c.rotate(inc);
  var resp=1+Math.sin(t*2.6)*.015;
  /* cauda */
  var ts=Math.sin(t*(anda?10:3))*.18+(voa?.3:0);
  c.save(); c.translate(-20,-19); c.rotate(ts);
  c.beginPath(); c.moveTo(2,-7); c.quadraticCurveTo(-16,-10,-26,-22); c.quadraticCurveTo(-18,-6,0,6); c.closePath(); fs(c,lin(c,0,-10,-26,-20,PV,PVS));
  c.beginPath(); c.moveTo(-24,-20); c.lineTo(-33,-27); c.lineTo(-27,-16); c.lineTo(-34,-14); c.lineTo(-24,-16); c.closePath(); fs(c,'#fbbf24','#b7791f',1.1);
  c.restore();
  /* asa de trás */
  c.save(); c.translate(-3,-37); asa(c,-.3-flap,true); c.restore();
  /* patas de trás (longe) */
  function pata(px,fase,longe){ var lev=anda?Math.max(0,Math.sin(fase))*4:0, av=anda?Math.cos(fase)*4:0, dob=voa?.9:0;
    c.save(); c.translate(px,-8); c.rotate(dob); rr(c,-4.8+av,-4-lev,9.6,12.5,4.8); fs(c,longe?esc(PV,.22):lin(c,0,-4,0,9,PV,PVS));
    c.fillStyle=longe?'#d9c99a':BEG; for(var k=0;k<3;k++){ circ(c,av-2.6+k*2.6,7.4-lev,1.5); c.fill(); } c.restore(); }
  var fp=t*10; pata(-12,fp+PI,true); pata(13,fp,true);
  /* corpo */
  c.save(); c.scale(resp,1/resp);
  el(c,0,-25,25,19.5); fs(c,rad(c,2,-30,26,cla(PV,.25),PVS));
  c.save(); el(c,0,-25,25,19.5); c.clip(); c.fillStyle=BEG; el(c,9,-15,15,12.5); c.fill(); c.strokeStyle='rgba(214,180,100,.55)'; c.lineWidth=1.2; for(var i=0;i<4;i++){ c.beginPath(); c.arc(9,-32+i*5.5,13,.25*PI,.75*PI); c.stroke(); } c.restore();
  /* espinhos das costas */
  [[-17,-37,-.8],[-8,-43,-.3],[2,-44.5,.1]].forEach(function(s){ c.save(); c.translate(s[0],s[1]); c.rotate(s[2]); c.beginPath(); c.moveTo(-4.5,2); c.quadraticCurveTo(-1,-7,0,-7.5); c.quadraticCurveTo(1,-7,4.5,2); c.closePath(); fs(c,lin(c,0,-7,0,2,'#fde68a','#f59e0b'),'#b7791f',1); c.restore(); });
  c.restore();
  if(mont){ c.beginPath(); c.moveTo(-15,-40); c.quadraticCurveTo(0,-47,13,-40); c.lineTo(14,-33); c.quadraticCurveTo(0,-38,-16,-33); c.closePath(); fs(c,lin(c,0,-46,0,-33,'#f87171','#b91c1c'));
    c.strokeStyle='#fde68a'; c.lineWidth=1.4; c.beginPath(); c.moveTo(-14,-34.5); c.quadraticCurveTo(0,-39.5,13,-34.5); c.stroke(); c.strokeStyle='#7c2d12'; c.lineWidth=2; c.beginPath(); c.moveTo(-1,-38); c.lineTo(0,-18); c.stroke(); }
  /* patas da frente */
  pata(-8,fp,false); pata(17,fp+PI,false);
  /* cachecol (pontas) */
  var cw=Math.sin(t*(voa?14:5))*(voa?4:2);
  c.beginPath(); c.moveTo(13,-42); c.quadraticCurveTo(6,-44+cw*.3,-2,-41+cw); c.lineTo(0,-36.5+cw); c.quadraticCurveTo(6,-39,13,-37); c.closePath(); fs(c,lin(c,0,-44,0,-36,'#ef4444','#b91c1c'));
  c.beginPath(); c.moveTo(13,-40); c.quadraticCurveTo(7,-36+cw*.2,2,-31+cw*.8); c.lineTo(5.5,-29.5+cw*.8); c.quadraticCurveTo(9,-34,14,-37); c.closePath(); fs(c,lin(c,0,-40,0,-29,'#f87171','#c81e1e'));
  /* asa da frente */
  c.save(); c.translate(-1,-38); asa(c,-.15-flap*.9,false); c.restore();
  /* cachecol (volta no pescoço, por cima) */
  c.save(); c.translate(16.5,-37); c.rotate(.8); rr(c,-4.2,-10,8.4,20,4.2); fs(c,lin(c,0,-4,0,4,'#f87171','#c81e1e')); c.strokeStyle='rgba(255,255,255,.45)'; c.lineWidth=1; c.beginPath(); c.moveTo(-1.6,-8); c.lineTo(-1.6,8); c.stroke(); c.restore();
  /* cabeça */
  c.save(); c.translate(25,-45); c.rotate(anda?Math.sin(t*10)*.04:Math.sin(t*1.6)*.05);
  [[-10,-11,-.5],[-3,-14,-.15]].forEach(function(h){ c.save(); c.translate(h[0],h[1]); c.rotate(h[2]); c.beginPath(); c.moveTo(-3.2,2); c.quadraticCurveTo(-1,-7,0,-8); c.quadraticCurveTo(1.2,-7,3.2,2); c.closePath(); fs(c,lin(c,0,-8,0,2,'#fffbeb','#e9c46a'),'#b7791f',1); c.restore(); });
  el(c,0,0,16.5,14.5); fs(c,rad(c,0,-2,17,cla(PV,.3),PV));
  el(c,11,4,9.5,7.5); fs(c,rad(c,11,4,9,cla(PV,.45),cla(PV,.1)));
  c.fillStyle=PVS; el(c,16.5,1.5,1.3,1); c.fill(); el(c,12.5,1,1.2,.9); c.fill();
  var pis=(t%4.1)<.12; olho(c,-1.5,-2.5,4.4,5.6,'#3b2112',pis,false); olho(c,8.5,-3.2,3.6,5.2,'#3b2112',pis,false);
  c.fillStyle='rgba(244,114,128,.42)'; el(c,-5,6,3.6,2.2); c.fill();
  if(voa){ c.beginPath(); c.moveTo(9,8.5); c.quadraticCurveTo(14,13,19,8.3); c.closePath(); fs(c,'#8f2d2d','#5c1b1b',1); }
  else { c.strokeStyle='#145c32'; c.lineWidth=1.3; c.beginPath(); c.moveTo(9,8.6); c.quadraticCurveTo(13.5,11.6,18.5,8.4); c.stroke(); c.fillStyle='#fff'; c.beginPath(); c.moveTo(14,10.1); c.lineTo(15.4,10); c.lineTo(14.8,11.8); c.fill(); }
  c.restore();
  c.restore();
};
A.pip.SELA_Y=40; A.pip.SELA_X=-1;
function ovo(c,t){
  var amp=.05+.13*Math.max(0,Math.sin(t*1.4)), r=Math.sin(t*9)*amp;
  sombra(c,15,.25);
  c.save(); c.rotate(r);
  c.beginPath(); c.moveTo(0,-40); c.bezierCurveTo(13,-40,17,-14,15,-8); c.bezierCurveTo(13,-1,6,1,0,1); c.bezierCurveTo(-6,1,-13,-1,-15,-8); c.bezierCurveTo(-17,-14,-13,-40,0,-40); c.closePath();
  fs(c,rad(c,-2,-22,22,'#ffffff','#f2dfb3'));
  c.save(); c.clip();
  c.fillStyle='#7dd88c'; [[-7,-30,4],[6,-34,3],[9,-19,4.5],[-9,-12,3.5],[2,-6,3]].forEach(function(p){ circ(c,p[0],p[1],p[2]); c.fill(); });
  c.strokeStyle='#f472b6'; c.lineWidth=2.6; c.beginPath(); for(var x=-18;x<=18;x+=6){ c.lineTo(x,-22+((x/6)%2?-4:3)); } c.stroke();
  c.strokeStyle='#60a5fa'; c.lineWidth=1.6; c.beginPath(); for(x=-18;x<=18;x+=6){ c.lineTo(x,-16+((x/6)%2?-3:2)); } c.stroke();
  c.fillStyle='rgba(255,255,255,.7)'; el(c,-6,-30,3.4,6); c.fill();
  c.restore();
  if(amp>.15){ c.strokeStyle='#8a6d3b'; c.lineWidth=1.1; c.beginPath(); c.moveTo(4,-37); c.lineTo(2,-33); c.lineTo(5,-30); c.lineTo(3,-27); c.stroke(); }
  c.restore();
  if(amp>.14){ c.save(); c.globalAlpha=(amp-.14)*14; cintila(c,-18,-38,3.5,'#fde047'); cintila(c,19,-30,2.6,'#fde047'); c.restore(); }
}

/* ============================================================
   PLACA de resposta pendurada por duas correntes.
   (x,y) = CENTRO da tábua; w,h = tamanho da tábua.
   estado: 'normal' | 'certa' | 'errada' | 'apagada' | 'bump'
   O motor escreve o texto por cima (cor sugerida #3b2412) dentro
   da etiqueta clara do meio.
   ============================================================ */
A.placa=function(c,x,y,w,h,estado,t){
  t=t||0; var dx=0, dy=0, lift=0;
  if(estado==='errada') dx=Math.sin(t*42)*3*Math.max(0,Math.cos(t*2));
  if(estado==='bump') dy=-7;
  var pal={normal:['#d79a5a','#94602f','#fdf3dc','#6b3f1f'], bump:['#e3a868','#9b6532','#fff7e6','#6b3f1f'], certa:['#6fd38a','#1f8a4c','#e9fbe9','#145c32'], errada:['#f08a7c','#b3362b','#feeceb','#7f1d1d'], apagada:['#b9b3ac','#857d75','#eeebe7','#5c5650']}[estado]||null;
  if(!pal) pal=['#d79a5a','#94602f','#fdf3dc','#6b3f1f'];
  c.save(); if(estado==='apagada') c.globalAlpha=.55;
  c.translate(x+dx,y+dy); c.lineJoin='round';
  var x0=-w/2, y0=-h/2, top=-h/2-70-dy;
  /* correntes */
  [x0+w*.18,-x0-w*.18].forEach(function(cx,j){
    c.strokeStyle='#4b5563'; c.lineWidth=2.2;
    for(var yy=y0-3;yy>top;yy-=9){ var vert=Math.round((yy-y0)/9)%2===0; c.beginPath(); if(vert) c.ellipse(cx,yy,2.4,4.8,0,0,TAU); else c.ellipse(cx,yy,1.1,4.8,0,0,TAU); c.strokeStyle=vert?'#6b7280':'#9ca3af'; c.stroke(); }
    c.fillStyle='#374151'; circ(c,cx,y0+4,3.2); c.fill(); c.fillStyle='#9ca3af'; circ(c,cx-.8,y0+3.2,1.1); c.fill();
  });
  /* brilho de acerto */
  if(estado==='certa'){ var p=.5+.5*Math.sin(t*6); c.save(); c.globalAlpha=.35+.25*p; c.fillStyle='#fde047'; rr(c,x0-8,y0-8,w+16,h+16,18); c.fill(); c.restore(); }
  /* sombra + tábua */
  c.fillStyle='rgba(0,0,0,.25)'; rr(c,x0+3,y0+5,w,h,12); c.fill();
  rr(c,x0,y0,w,h,12); c.fillStyle=lin(c,0,y0,0,y0+h,pal[0],pal[1]); c.fill();
  c.save(); rr(c,x0,y0,w,h,12); c.clip();
  c.strokeStyle='rgba(0,0,0,.14)'; c.lineWidth=1.2;
  for(var g=0;g<7;g++){ var gy=y0+6+g*(h-10)/6; c.beginPath(); c.moveTo(x0,gy); for(var gx=x0;gx<=-x0;gx+=16) c.lineTo(gx,gy+Math.sin(gx*.07+g*1.7)*1.6); c.stroke(); }
  c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=2; c.beginPath(); c.moveTo(x0,0); c.lineTo(-x0,0); c.stroke();
  c.fillStyle='rgba(0,0,0,.12)'; el(c,x0+w*.8,y0+h*.3,5,2.4); c.fill();
  c.fillStyle='rgba(255,255,255,.2)'; c.fillRect(x0,y0,w,4);
  c.restore();
  rr(c,x0,y0,w,h,12); c.strokeStyle=pal[3]; c.lineWidth=3; c.stroke();
  /* etiqueta do texto */
  var mx=Math.min(16,w*.08), my=Math.min(11,h*.16);
  rr(c,x0+mx,y0+my,w-2*mx,h-2*my,8); c.fillStyle=pal[2]; c.fill(); c.strokeStyle='rgba(0,0,0,.18)'; c.lineWidth=1.4; c.stroke();
  c.fillStyle='rgba(255,255,255,.5)'; rr(c,x0+mx+4,y0+my+3,w-2*mx-8,3,1.5); c.fill();
  /* pregos */
  [[x0+7,y0+7],[-x0-7,y0+7],[x0+7,-y0-7],[-x0-7,-y0-7]].forEach(function(p){ c.fillStyle=pal[3]; circ(c,p[0],p[1],2.4); c.fill(); c.fillStyle='rgba(255,255,255,.55)'; circ(c,p[0]-.7,p[1]-.7,.9); c.fill(); });
  if(estado==='certa'){ for(var s=0;s<4;s++){ var a=t*2+s*TAU/4; c.save(); c.globalAlpha=.6+.4*Math.sin(t*5+s); cintila(c,Math.cos(a)*(w/2+10),Math.sin(a)*(h/2+8),4+s%2*2,'#fffbe0'); c.restore(); } }
  if(estado==='bump'){ c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=2.4; [-1,1].forEach(function(sg){ c.beginPath(); c.moveTo(sg*(w/2-10),-y0+8); c.lineTo(sg*(w/2-2),-y0+15); c.stroke(); c.beginPath(); c.moveTo(sg*w*.2,-y0+9); c.lineTo(sg*w*.22,-y0+17); c.stroke(); }); }
  c.restore();
};

/* ============================================================
   PÁGINA do livro (recompensa): ícone do HUD e página voando
   ============================================================ */
function pagina(c,w,h,curva){
  curva=curva||0;
  c.beginPath(); c.moveTo(-w/2,-h/2); c.lineTo(w/2-7,-h/2); c.lineTo(w/2,-h/2+7); c.quadraticCurveTo(w/2+curva,0,w/2,h/2); c.lineTo(-w/2,h/2); c.quadraticCurveTo(-w/2+curva,0,-w/2,-h/2); c.closePath();
  fs(c,lin(c,-w/2,-h/2,w/2,h/2,'#fffaf0','#efdfbf'),'#a0763f',1.3);
  c.save(); c.clip(); c.strokeStyle='rgba(120,90,50,.35)'; c.lineWidth=1; for(var i=0;i<5;i++){ var ly=-h/2+9+i*(h-16)/4.4; c.beginPath(); c.moveTo(-w/2+4,ly); c.lineTo(w/2-(i===4?w*.4:5),ly); c.stroke(); }
  c.fillStyle='rgba(220,38,38,.75)'; c.fillRect(-w/2+3,-h/2+3,4,4); c.restore();
  c.beginPath(); c.moveTo(w/2-7,-h/2); c.lineTo(w/2-7,-h/2+7); c.lineTo(w/2,-h/2+7); c.closePath(); fs(c,'#e2cfa6','#a0763f',1);
}
A.paginaHud=function(c,x,y,n,t){
  t=t||0; c.save(); c.translate(x,y); c.lineJoin='round';
  brilho(c,0,0,26,'rgba(253,224,71,.55)',.55+.25*Math.sin(t*3));
  c.save(); c.rotate(-.12+Math.sin(t*2)*.03); pagina(c,24,30,0);
  c.fillStyle='#d97706'; c.beginPath(); c.moveTo(4,-15); c.lineTo(9,-15); c.lineTo(9,-4); c.lineTo(6.5,-6.5); c.lineTo(4,-4); c.closePath(); c.fill();
  c.restore();
  if(n!=null){ c.font='900 18px "Nunito","Segoe UI",Arial,sans-serif'; c.textAlign='left'; c.textBaseline='middle'; c.lineWidth=4; c.strokeStyle='rgba(40,20,10,.75)'; c.strokeText('x'+n,18,2); c.fillStyle='#fff7d6'; c.fillText('x'+n,18,2); }
  c.restore();
};
A.paginaVoando=function(c,x,y,rot){
  rot=rot||0; var fl=Math.sin(rot*3);
  c.save(); c.translate(x,y); c.lineJoin='round';
  brilho(c,0,0,40,'rgba(254,240,138,.75)',.7);
  for(var i=0;i<5;i++){ var a=rot*1.5+i*TAU/5; c.save(); c.globalAlpha=.55+.45*Math.sin(rot*4+i); cintila(c,Math.cos(a)*30,Math.sin(a)*26,3+(i%2)*2,'#fffbe0'); c.restore(); }
  c.rotate(rot*.25); c.scale(1,.92+.08*Math.abs(fl)); pagina(c,34,44,fl*6);
  c.fillStyle='rgba(124,58,237,.6)'; A.estrela(c,0,-2,5.5,'rgba(217,119,6,.8)',0);
  c.restore();
};
})();
