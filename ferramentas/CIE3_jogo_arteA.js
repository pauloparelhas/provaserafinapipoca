/* ============================================================
   CIE3_jogo_arteA.js — elenco de "Motion Rangers: Find Everything!".
   Carrega DEPOIS dos módulos de arte herdados e substitui em window.ARTE:
   - A.heroi / A.HEROIS: helmet (Ben) · pony (Ana) · yellow (Kai) · fisher (Sam).
     Estados: idle walk jump fall cheer dizzy swim fly crawl crouch hang climb
     spin glide ride kick push pull. Estado desconhecido cai em idle (nunca vazio);
     quem desconhecido cai em helmet.
   - A.morador / A.MORADORES: pin gigi breezy drop boing paws max.
     Tipo desconhecido cai em pin (nunca sprite antigo).
   - A.conde: TWISTER, o tornado do slide. Estados idle write laugh hit sad.
   - A.INIMIGOS_CIE: gust puddle can ball top, (c,x,y,t,dir[,achatado]).
   OVERRIDES de inimigo herdado (mesma assinatura):
     A.traca, A.ganso            -> gust
     A.poeira, A.polar, A.gamba, A.carcaju -> puddle
     A.tronco(c,b,t)             -> can  (raio b.r, centro b.x,b.y)
     A.bolaRolando(c,b,t,cena)   -> ball (raio b.r, centro b.x,b.y)
     A.tracona(c,x,y,t,hp,max)   -> mini-Twister com hp em bolinhas
     A.inimigo(c,e,t)            -> e.tipo novo direto; tipo antigo cai em gust
                                    (ganso, traca ou e.voa) ou puddle (resto)
   Sem aleatório, sem pisca (toda oscilação <= 1,5 Hz, sem piscar de olho),
   sem imagem externa. Texto só "HA" no riso do Twister.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, olho=I.olho, boca=I.boca;
var W=9, W2=4.5; /* 9 rad/s = 1,43 Hz: teto de todo ciclo */

function fala(t,f){ return f?Math.abs(Math.sin(t*W2)):0; }
function bocaFala(c,x,y,m,w){ if(m<.12){ boca(c,'smile',x,y,1.1); return; }
  c.beginPath(); c.ellipse(x,y+1,w*(.75+m*.25),1.2+m*4,0,0,TAU); fs(c,'#8f2d2d','#5c1b1b',1.1); c.save(); c.clip(); c.fillStyle='#f58a9b'; el(c,x,y+2.5+m*3,w*.6,2.4); c.fill(); c.restore(); }
function olhoG(c,x,y,r,px,py){ el(c,x,y,r,r*1.15); fs(c,'#fff','#1f2937',1.3); olho(c,x+(px||0),y+(py||0),r*.56,r*.72,'#1f2937',false,false); }

/* ============================================================ HERÓIS */
var HEROIS={
  helmet:{nome:'Ben',en:'Ben, the cyclist',pele:'#f7cba6',peleS:'#dc9f78',cab:'#7c4a22',cabS:'#4d2c12',olho:'#3f2210',cor:'#f2662b',cilio:false,perna:'#2f6fd0',meia:'#ffffff',sap:'#2f80e8',sola:'#f8fafc'},
  pony:  {nome:'Ana',en:'Ana, the rope puller',pele:'#f9d2b4',peleS:'#e2a884',cab:'#7a4324',cabS:'#4a2612',olho:'#3f2210',cor:'#ec5f9c',cilio:true,perna:'#2f62c4',calca:true,meia:'#ffffff',sap:'#ec4899',sola:'#fdf2f8'},
  yellow:{nome:'Kai',en:'Kai, the kicker',pele:'#a56a3e',peleS:'#7c4a26',cab:'#2a170c',cabS:'#120904',olho:'#25130a',cor:'#f8c12d',cilio:false,perna:'#2563c8',meia:'#ffffff',sap:'#23252c',sola:'#e5e7eb'},
  fisher:{nome:'Sam',en:'Sam, the fisher',pele:'#f9d0ae',peleS:'#e0a27c',cab:'#d9622b',cabS:'#9a3d12',olho:'#3f2a12',cor:'#9fd49a',cilio:false,perna:'#2f73c4',meia:'#ffffff',sap:'#7a4a22',sola:'#3f2410',colete:'#5f7a33',bota:true}
};
A.HEROIS=HEROIS;
var MAX={q:'max',pele:'#f7cba6',peleS:'#dc9f78',cab:'#5d3518',cabS:'#361c0a',olho:'#3f2210',cor:'#2f9be0',cilio:false,perna:'#1e3f7a',meia:'#ffffff',sap:'#2f80e8',sola:'#f8fafc'};

function pose(e,t){
  var P={bob:0,rot:0,sx:1,sy:1,lean:0,aN:.12,aF:-.1,lN:[0,.05],lF:[0,.05],tilt:0,face:'normal',boca:'smile',sw:.2,corpo:0,sent:0};
  var s,k;
  switch(e){
    case 'walk': s=Math.sin(t*W); P.bob=-(1+Math.cos(t*W))*1.1; P.lN=[s*.62,Math.max(0,-s)*.75+.1]; P.lF=[-s*.62,Math.max(0,s)*.75+.1]; P.aN=-s*.75; P.aF=s*.75; P.lean=.06; P.sw=.45+s*.12; P.tilt=s*.03; break;
    case 'kick': P.lF=[1.45,.08]; P.lN=[-.18,.12]; P.aN=-.7; P.aF=1.0; P.lean=-.1; P.boca='open'; P.face='feliz'; P.sw=.3; break;
    case 'push': s=Math.sin(t*W2); P.lean=.28; P.aN=1.45+s*.05; P.aF=1.3+s*.05; P.lN=[.55+s*.08,.5]; P.lF=[-.55-s*.08,.25]; P.boca='open'; P.sw=.6; P.tilt=-.2; break;
    case 'pull': s=Math.sin(t*W2); P.lean=-.2; P.aN=1.4+s*.04; P.aF=1.25+s*.04; P.lN=[.6,.15]; P.lF=[-.12+s*.06,.5]; P.boca='open'; P.face='feliz'; P.sw=-.2; P.tilt=.12; break;
    case 'jump': P.sx=.94; P.sy=1.07; P.lN=[1.05,1.4]; P.lF=[-.25,.75]; P.aN=-2.3; P.aF=2.2; P.arm=1.7; P.atras=1; P.boca='o'; P.face='alto'; P.sw=-.15; break;
    case 'glide': P.sy=1.03; P.lN=[.3,.5]; P.lF=[-.3,.5]; P.aN=1.6+Math.sin(t*3)*.08; P.aF=-1.6-Math.sin(t*3)*.08; P.boca='open'; P.face='feliz'; P.sw=.9; break;
    case 'fall': s=Math.sin(t*W); P.sy=.98; P.lN=[.28,.4]; P.lF=[-.22,.55]; P.aN=-2.3+s*.2; P.aF=2.2-s*.2; P.arm=1.7; P.atras=1; P.boca='O'; P.face='susto'; P.sw=1; break;
    case 'cheer': case 'spin': s=Math.abs(Math.sin(t*W2)); k=s<.22?(.22-s)/.22:0; P.bob=-s*12; P.sx=1+k*.08-s*.03; P.sy=1-k*.08+s*.05; P.aN=-2.3+Math.sin(t*W)*.12; P.aF=2.2-Math.sin(t*W)*.12; P.arm=1.7; P.atras=1; P.lN=[s*.5,s*.9]; P.lF=[s*.15,s*.7]; P.face='feliz'; P.boca='open'; P.tilt=Math.sin(t*W2)*.07; P.sw=.2-s*.5; break;
    case 'dizzy': P.rot=Math.sin(t*3.5)*.07; P.tilt=Math.sin(t*4.5)*.2; P.aN=.5+Math.sin(t*4)*.2; P.aF=-.3; P.face='tonto'; P.boca='wavy'; P.lN=[.08,.1]; P.lF=[-.1,.15]; P.sw=Math.sin(t*4.5)*.4; break;
    case 'swim': s=Math.sin(t*6); P.corpo=PI/2*.8+Math.sin(t*3)*.05; P.aN=1.25+s*.65; P.aF=1.25-s*.65; P.tilt=-1; P.lN=[Math.sin(t*W)*.35,.25]; P.lF=[-Math.sin(t*W)*.35,.25]; P.boca='o'; P.sw=.25; break;
    case 'fly': P.corpo=PI/2*.84+Math.sin(t*2)*.04; P.aN=1.05+Math.sin(t*3)*.08; P.aF=1.9+Math.sin(t*3)*.08; P.tilt=-1.05; P.lN=[-.06,.14+Math.sin(t*5)*.1]; P.lF=[.12,.28]; P.boca='open'; P.sw=.55; break;
    case 'ride': P.sent=1; P.lN=[1.45,1.5]; P.lF=[1.35,1.4]; P.aN=1+Math.sin(t*4)*.06; P.aF=.85; P.bob=Math.sin(t*5)*.8; P.sw=.3+Math.sin(t*5)*.1; break;
    case 'hang': s=Math.sin(t*2.4); P.aN=-2.85+s*.03; P.aF=2.85-s*.03; P.arm=3; P.atras=1; P.lN=[.12+s*.12,.2]; P.lF=[-.12+s*.12,.3]; P.rot=s*.03; P.sw=.1+s*.2; P.boca='smile'; P.face='alto'; break;
    case 'climb': s=Math.sin(t*W); P.aN=-2.85; P.aF=2.85; P.arm=2.5+s*.5; P.armF=2.5-s*.5; P.atras=1; P.lN=[.7+s*.45,1.0]; P.lF=[.7-s*.45,1.0]; P.face='alto'; P.sw=.3; break;
    default: s=Math.sin(t*2.6); P.sy=1+s*.012; P.sx=1-s*.008; P.aN=.12+s*.04; P.aF=-.1-s*.03; P.sw=.15+Math.sin(t*1.7)*.08; P.tilt=Math.sin(t*1.3)*.025;
  }
  return P;
}
function braco(c,K,a,sx,longe,e){
  e=e||1;
  var pele=longe?esc(K.pele,.12):K.pele, cor=longe?esc(K.cor,.18):K.cor;
  c.save(); c.translate(sx,-41); c.rotate(-a);
  rr(c,-3.3,-3,6.6,17.5*e,3.3); fs(c,lin(c,-3,0,3,0,cla(pele,.1),esc(pele,.06)));
  rr(c,-4.5,-4,9,10.6,4); fs(c,lin(c,-4,0,4,0,cla(cor,.18),esc(cor,.16)));
  circ(c,0,15.6*e,3.9); fs(c,pele); c.restore();
}
function perna(c,K,L,hx,longe){
  var d=longe?.16:0, pele=esc(K.pele,d), sh=esc(K.perna,d), mei=esc(K.meia,d), sp=esc(K.sap,d);
  c.save(); c.translate(hx,-18); c.rotate(-L[0]);
  rr(c,-3.9,-3,7.8,13,3.9); fs(c,K.calca?sh:pele);
  rr(c,-5,-4.5,10,K.calca?14:10.5,3.6); fs(c,lin(c,-5,0,5,0,cla(sh,.12),esc(sh,.2)));
  c.translate(0,9); c.rotate(L[1]);
  rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,K.calca?lin(c,-4,0,4,0,cla(sh,.1),esc(sh,.18)):pele);
  if(!K.calca){ rr(c,-4,K.bota?1.5:2.6,8,7,2.4); fs(c,lin(c,-4,0,4,0,mei,esc(mei,.14))); }
  else { c.fillStyle=cla(sh,.3); c.fillRect(-3.7,5,7.4,1.3); }
  if(K.bota){ c.beginPath(); c.moveTo(-5,4); c.lineTo(4.4,4); c.quadraticCurveTo(5,7.4,8,8.4); c.quadraticCurveTo(11.6,9.6,11,12.1); c.lineTo(-5,12.1); c.closePath(); fs(c,lin(c,0,4,0,12,cla(sp,.12),esc(sp,.2)));
    c.fillStyle=K.sola; c.fillRect(-5.2,11,16.6,1.9); c.strokeStyle='#e7d3a8'; c.lineWidth=.9; c.beginPath(); c.moveTo(.6,5.6); c.lineTo(4,6.6); c.moveTo(1.4,7.6); c.lineTo(5,8.6); c.stroke(); }
  else { c.beginPath(); c.moveTo(-4.4,6.8); c.quadraticCurveTo(-5,12,.2,12.2); c.lineTo(8.6,12); c.quadraticCurveTo(11.6,11.2,10.6,8.4); c.quadraticCurveTo(7,8.6,3.6,6.6); c.closePath(); fs(c,lin(c,0,6.6,0,12.2,cla(sp,.14),esc(sp,.18)),'rgba(10,10,20,.8)',1.2);
    c.fillStyle=K.sola; rr(c,-4.8,11,16,1.9,.9); c.fill(); c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=1.1; c.beginPath(); c.moveTo(1,8.2); c.lineTo(3.6,9.8); c.moveTo(3.2,7.6); c.lineTo(5.8,9.2); c.stroke(); }
  c.restore();
}
function torso(c,K){
  var cor=K.cor, sh=K.perna;
  c.beginPath(); c.moveTo(-10.6,-28); c.lineTo(10.6,-28); c.lineTo(12.4,-15.4); c.quadraticCurveTo(6,-13.6,1.2,-15.4); c.lineTo(0,-18.6); c.lineTo(-1.2,-15.4); c.quadraticCurveTo(-6,-13.6,-12.4,-15.4); c.closePath(); fs(c,lin(c,0,-28,0,-14,cla(sh,.14),esc(sh,.24)));
  rr(c,-10.8,-47.5,21.6,24.5,9); fs(c,lin(c,-11,-47,11,-23,cla(cor,.26),esc(cor,.1)));
  c.save(); rr(c,-10.8,-47.5,21.6,24.5,9); c.clip(); c.fillStyle=esc(cor,.2); c.globalAlpha=.5; el(c,-11,-34,4.5,13); c.fill(); c.globalAlpha=1; c.fillStyle='rgba(255,255,255,.22)'; c.fillRect(-6.8,-47,2.8,21); c.restore();
  c.beginPath(); c.moveTo(-5.2,-47.4); c.quadraticCurveTo(0,-41.5,5.2,-47.4); c.closePath(); fs(c,esc(K.pele,.05),esc(cor,.3),1.2);
  if(K.colete){ var v=K.colete;
    [[-1],[1]].forEach(function(p){ var s=p[0]; c.beginPath(); c.moveTo(s*11,-44); c.lineTo(s*3.6,-47.6); c.lineTo(s*1.8,-24); c.lineTo(s*11.4,-24); c.closePath(); fs(c,lin(c,-11,-47,11,-24,cla(v,.14),esc(v,.16)),esc(v,.45),1.1); });
    [-7,7].forEach(function(x){ rr(c,x-3.6,-34,7.2,6.6,1.2); fs(c,esc(v,.1),esc(v,.5),1); c.strokeStyle=esc(v,.5); c.lineWidth=1; c.beginPath(); c.moveTo(x-3.6,-31.6); c.lineTo(x+3.6,-31.6); c.stroke(); }); }
}
function cabelo(c,K){ return lin(c,-20,-22,20,10,cla(K.cab,.16),K.cabS); }
function atrasCabeca(c,K,P,t){
  if(K.q==='pony'){ var a=.42+P.sw*.45+Math.sin(t*1.8)*.05;
    c.save(); c.translate(-17,-13); c.rotate(a); c.beginPath(); c.moveTo(-5,0); c.bezierCurveTo(-15,8,-13,26,-5,35); c.quadraticCurveTo(-2,27,1,31); c.bezierCurveTo(6,18,6,8,5,0); c.closePath(); fs(c,lin(c,-10,0,5,32,cla(K.cab,.2),K.cabS)); c.strokeStyle='rgba(255,255,255,.18)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-2,4); c.quadraticCurveTo(-7,16,-3,28); c.stroke(); rr(c,-6,-3,12,6,3); fs(c,'#e11d74','#9d174d',1); c.restore();
    c.beginPath(); c.ellipse(-1.6,-3.6,21.4,20.6,0,0,TAU); fs(c,cabelo(c,K)); }
  else if(K.q==='helmet'){ c.beginPath(); c.moveTo(-20,-7); c.bezierCurveTo(-26,2,-20,12,-11,12); c.lineTo(-7,2); c.closePath(); fs(c,cabelo(c,K)); }
  else if(K.q==='yellow'){ for(var i=0;i<13;i++){ var u=.72+i/13*1.5, x=-2+Math.cos(u*PI)*20, y=-5+Math.sin(u*PI)*20; circ(c,x,y,7.6); fs(c,lin(c,x-7,y-7,x+7,y+7,cla(K.cab,.2),K.cabS),K.cabS,1); } }
  else if(K.q==='fisher'){ [[-17,-4,6.5],[-20,4,6],[-16,11,5.6],[-10,15,4.2]].forEach(function(p){ circ(c,p[0],p[1],p[2]); fs(c,lin(c,p[0]-6,p[1]-6,p[0]+6,p[1]+6,cla(K.cab,.25),K.cabS),K.cabS,1); }); }
  else { c.beginPath(); c.ellipse(-1.6,-3.6,21.6,20.6,0,0,TAU); fs(c,cabelo(c,K)); }
}
function cabeca(c,K,P,t){
  atrasCabeca(c,K,P,t);
  el(c,1,0,20,18.6); fs(c,rad(c,3,-1,21,cla(K.pele,.28),K.pele));
  c.save(); el(c,1,0,20,18.6); c.clip(); c.fillStyle=K.peleS; c.globalAlpha=.35; el(c,-17,4,10,20); c.fill(); c.restore();
  var ex1=-.5, ex2=12, ey=1.5;
  if(P.face==='feliz'){ c.strokeStyle='#2a1610'; c.lineWidth=2; c.beginPath(); c.arc(ex1,ey+2,3.6,1.12*PI,1.88*PI); c.stroke(); c.beginPath(); c.arc(ex2,ey+2,3.2,1.12*PI,1.88*PI); c.stroke(); }
  else if(P.face==='tonto'){ c.strokeStyle='#2a1610'; c.lineWidth=1.3; [ex1,ex2].forEach(function(x0,j){ c.beginPath(); for(var a=0;a<TAU*2.2;a+=.3){ var r=a*.6; c.lineTo(x0+Math.cos(a+t*6*(j?-1:1))*r,ey+Math.sin(a+t*6*(j?-1:1))*r); } c.stroke(); }); }
  else { var ryk=P.face==='susto'||P.face==='alto'?1.08:1; olho(c,ex1,ey,4.3,5.8*ryk,K.olho,false,K.cilio); olho(c,ex2,ey,3.8,5.5*ryk,K.olho,false,K.cilio); }
  c.fillStyle='rgba(244,114,128,.36)'; el(c,-6.5,9,4.2,2.6); c.fill(); el(c,16.5,8.5,3,2.4); c.fill();
  c.strokeStyle=esc(K.peleS,.15); c.lineWidth=1.2; c.beginPath(); c.moveTo(6.5,4.5); c.quadraticCurveTo(8,6.5,6.2,7.2); c.stroke();
  boca(c,P.boca,6.2,11.4,1);
  el(c,1,0,20,18.6); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  el(c,-12.5,4,3.4,4.4); fs(c,K.pele); c.strokeStyle=K.peleS; c.lineWidth=1; c.beginPath(); c.arc(-12.3,4.3,1.8,-.5*PI,.6*PI); c.stroke();
  if(P.face!=='tonto'&&K.q!=='fisher'&&K.q!=='helmet'){ var by=P.face==='susto'||P.face==='alto'?-11.5:-9.8; c.strokeStyle=K.cabS; c.lineWidth=1.3; c.beginPath(); c.moveTo(ex1-3,by+.6); c.quadraticCurveTo(ex1,by-1.2,ex1+3,by+.2); c.moveTo(ex2-2.6,by+.2); c.quadraticCurveTo(ex2,by-1.2,ex2+2.6,by+.6); c.stroke(); }
  /* por cima: cabelo ou chapéu de cada um */
  if(K.q==='helmet') capacete(c,K);
  else if(K.q==='fisher') chapeu(c,K);
  else if(K.q==='yellow'){ [[-13,-14,6],[-6,-18,6],[2,-19,6.2],[10,-17,5.6],[17,-12,4.8],[-16,-6,4.8]].forEach(function(p){ circ(c,p[0],p[1],p[2]); fs(c,lin(c,p[0]-6,p[1]-6,p[0]+6,p[1]+6,cla(K.cab,.22),K.cabS),K.cabS,1); c.strokeStyle='rgba(255,255,255,.14)'; c.lineWidth=1; c.beginPath(); c.arc(p[0],p[1],p[2]*.55,1.1*PI,1.8*PI); c.stroke(); }); }
  else franja(c,K);
  if(K.oculos){ rr(c,-6.5,-4.5,24,12,5.5); fs(c,'rgba(186,230,253,.35)','#0f766e',2.2); c.strokeStyle='#0f766e'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-6.5,1); c.lineTo(-19,0); c.stroke(); c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-3,-2.2); c.lineTo(1,-2.2); c.stroke(); }
}
function franja(c,K){ var f=cabelo(c,K);
  c.save(); el(c,1,0,20.6,19.2); c.clip(); c.beginPath(); c.moveTo(-24,14); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-7);
  if(K.q==='pony'){ c.quadraticCurveTo(14,-15,3,-13); c.quadraticCurveTo(-7,-9,-10,5); }
  else { c.quadraticCurveTo(21,-13,18,-10.5); c.quadraticCurveTo(15,-15,10.5,-11.5); c.quadraticCurveTo(7,-16,2,-12.5); c.quadraticCurveTo(-3,-15,-6,-9); c.quadraticCurveTo(-9,-3,-11,5); }
  c.lineTo(-24,14); c.closePath(); fs(c,f,K.cabS,1); c.strokeStyle='rgba(255,255,255,.2)'; c.lineWidth=2; c.beginPath(); c.arc(1,-3,14.5,1.2*PI,1.55*PI); c.stroke(); c.restore();
  if(K.q!=='pony'){ c.beginPath(); c.moveTo(-10,-19); c.quadraticCurveTo(-8,-26,-1,-27); c.quadraticCurveTo(-3,-23,-2,-21); c.quadraticCurveTo(2,-26,7,-24.6); c.quadraticCurveTo(4,-22,4,-19); c.closePath(); fs(c,f,K.cabS,1); }
}
function capacete(c,K){
  /* franjinha sob a aba, como no slide */
  c.beginPath(); c.moveTo(4,-12); c.quadraticCurveTo(-2,-7,-9,-5); c.quadraticCurveTo(-13,-6,-14,-9); c.closePath(); fs(c,cabelo(c,K),K.cabS,1);
  c.strokeStyle='#27272a'; c.lineWidth=1.8; c.beginPath(); c.moveTo(-9,-3); c.quadraticCurveTo(-11,9,-1,18); c.stroke();
  c.beginPath(); c.moveTo(-21,3); c.bezierCurveTo(-29,-27,5,-38,20,-22); c.quadraticCurveTo(25,-16,28,-10); c.quadraticCurveTo(24,-5,19,-8); c.quadraticCurveTo(3,-14,-9,-7); c.quadraticCurveTo(-14,-3,-21,3); c.closePath(); fs(c,lin(c,-16,-30,16,-4,'#62aef5','#1f5fc4'),'#123a80',1.6);
  c.strokeStyle='#123a80'; c.lineWidth=2.8; [[-13,-18,-5,-27],[-5,-13,4,-26],[4,-13,12,-23]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],p[1]); c.quadraticCurveTo((p[0]+p[2])/2-2,(p[1]+p[3])/2-2,p[2],p[3]); c.stroke(); });
  c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=2; c.beginPath(); c.arc(-1,-11,16,1.15*PI,1.42*PI); c.stroke();
}
function chapeu(c,K){
  var f=cabelo(c,K); [[8,-9,4.5],[14,-8,4],[1,-9,4.5],[-6,-8,4.6],[-12,-5,4.6]].forEach(function(p){ circ(c,p[0],p[1],p[2]); fs(c,f,K.cabS,.9); });
  c.save(); c.translate(1,-12); c.rotate(-.05);
  el(c,0,1,27,6.4); fs(c,lin(c,0,-5,0,7,'#7ea24a','#4a6a22'),'#2f4614',1.4);
  c.beginPath(); c.moveTo(-16,0); c.bezierCurveTo(-18,-22,16,-23,16,0); c.quadraticCurveTo(0,3,-16,0); c.closePath(); fs(c,lin(c,-12,-20,12,2,'#88ac52','#507326'),'#2f4614',1.4);
  c.beginPath(); c.moveTo(-16,-1); c.quadraticCurveTo(0,2,16,-1); c.lineTo(15.4,-5.4); c.quadraticCurveTo(0,-2.4,-15.4,-5.4); c.closePath(); fs(c,'#3f5a1a','#2a3d10',1);
  c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=1.6; c.beginPath(); c.arc(-1,-5,12,1.2*PI,1.5*PI); c.stroke(); c.restore();
}
function agacha(c,K,t){
  var r=Math.sin(t*2.6), P={face:'normal',boca:'smile',sw:.35+r*.05,tilt:0};
  sombra(c,20);
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.85,2.85],4,true); c.restore();
  function q(){ c.translate(0,-7+r*.3); c.rotate(.22); c.scale(1.05,.64); c.translate(0,18); }
  c.save(); q(); braco(c,K,1.05,5,true); torso(c,K); c.restore();
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.75,2.8],-3,false); c.restore();
  c.save(); c.translate(6.5,-36+r*.6); c.rotate(-.04); c.scale(.93,.93); cabeca(c,K,P,t); c.restore();
  c.save(); q(); braco(c,K,1.2+r*.03,-4,false); c.restore();
}
function rasteja(c,K,t){
  var s=Math.sin(t*W*.7), P={face:'normal',boca:'smile',sw:.9,tilt:0,lN:[s*.12,.08],lF:[-s*.12,.08]};
  c.save(); c.translate(4,0); sombra(c,36,.2); c.restore();
  c.save(); c.translate(s*1.2,0);
  function q(){ c.translate(-8,-11); c.rotate(PI/2); c.translate(0,18); }
  c.save(); q(); braco(c,K,PI*.72-s*.38,5,true); perna(c,K,P.lF,3,true); perna(c,K,P.lN,-3,false); torso(c,K); c.restore();
  c.save(); c.translate(31,-26+s*.5); c.rotate(-.06+s*.03); c.scale(.92,.92); cabeca(c,K,P,t); c.restore();
  c.save(); q(); braco(c,K,PI*.72+s*.38,-4,false); c.restore();
  c.restore();
}
function capaVoo(c,cc,t){ var w1=Math.sin(t*W)*3, w2=Math.sin(t*W+1.6)*3.5;
  c.beginPath(); c.moveTo(5,-45); c.quadraticCurveTo(-3,-49.5,-10,-43); c.bezierCurveTo(-17,-24,-14+w1,-4,-13+w2,24); c.quadraticCurveTo(-7+w1,18+w2*.5,-2+w2,27); c.quadraticCurveTo(2+w1*.4,6,4,-40); c.closePath(); fs(c,lin(c,0,-48,-14,20,cc,esc(cc,.4))); }
function vara(c){ c.strokeStyle='#5b3418'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-9,-14); c.quadraticCurveTo(-14,-60,-30,-96); c.stroke(); circ(c,-10,-20,3.2); fs(c,'#9ca3af','#374151',1); }
function corpo(c,K,estado,t){
  if(estado==='crawl'){ rasteja(c,K,t); return; }
  if(estado==='crouch'){ agacha(c,K,t); return; }
  var P=pose(estado,t);
  if(!P.corpo&&!P.sent&&estado!=='hang'&&estado!=='climb') sombra(c,17);
  if(P.sent) c.translate(0,18);
  c.translate(0,P.bob);
  if(P.corpo){ c.translate(0,-30); c.rotate(P.corpo); c.translate(0,30); }
  c.rotate(P.rot+P.lean); c.scale(P.sx,P.sy);
  if(K.capa) capaVoo(c,K.capa,t);
  if(K.colete&&!P.corpo) vara(c);
  braco(c,K,P.aF,5,true,P.armF||P.arm);
  perna(c,K,P.lF,3,true); perna(c,K,P.lN,-3,false);
  torso(c,K);
  if(P.atras) braco(c,K,P.aN,-4,false,P.arm);
  c.save(); c.translate(1,-62); c.rotate(P.tilt); cabeca(c,K,P,t); c.restore();
  if(!P.atras) braco(c,K,P.aN,-4,false);
  if(estado==='dizzy'&&A.estrela) for(var i=0;i<3;i++){ var a=t*5+i*TAU/3; A.estrela(c,1+Math.cos(a)*20,-90+Math.sin(a)*5,4.5,'#fde047',a); }
  if(estado==='swim') for(var b=0;b<3;b++){ var fb=(t*.9+b/3)%1; c.save(); c.globalAlpha=.75*(1-fb); c.strokeStyle='#e0f2fe'; c.lineWidth=1.3; circ(c,14+Math.sin(fb*9+b)*2,-60-fb*26,2+b*.8+fb*2); c.stroke(); c.restore(); }
  if(estado==='fly'){ c.save(); c.globalAlpha=.45; c.strokeStyle='#fff'; c.lineWidth=2; for(var v=0;v<3;v++){ var fv=(t*1.4+v/3)%1; c.beginPath(); c.moveTo(-14+v*12,10+fv*30); c.lineTo(-14+v*12,22+fv*30); c.stroke(); } c.restore(); }
}
A.heroi=function(c,x,y,estado,t,dir,escala,quem,look){
  var H0=HEROIS[quem]?quem:'helmet', B=HEROIS[H0], K={}, k; for(k in B) K[k]=B[k]; K.q=H0;
  if(look){ if(look.cor) K.cor=look.cor; if(look.capaNuvem) K.capa='#0ea5e9'; else if(look.capa) K.capa=look.capa; if(look.mergulho) K.oculos=true; }
  escala=escala||1; dir=dir||1; t=t||0;
  c.save(); c.translate(x,y); c.scale(dir*escala,escala); c.lineJoin='round'; c.lineCap='round';
  corpo(c,K,estado,t); c.restore();
};

/* ============================================================ MORADORES */
function pin(c,t,m){
  var s=Math.abs(Math.sin(t*2.25)), j=s*16, q=s<.2?(.2-s)/.2:0;
  c.save(); c.globalAlpha=.25-.1*s; c.fillStyle='#000'; el(c,0,1,24-s*6,5); c.fill(); c.restore();
  el(c,0,-2,20,6.5); fs(c,lin(c,0,-8,0,5,'#fde047','#eab308'),'#1f2937',2.2);
  c.translate(0,-j); c.translate(0,-2); c.scale(1+q*.08,1-q*.08); c.translate(0,2);
  c.beginPath(); c.moveTo(0,-2); c.bezierCurveTo(-10,-22,-40,-48,-40,-76); c.bezierCurveTo(-40,-98,-22,-114,0,-114); c.bezierCurveTo(22,-114,40,-98,40,-76); c.bezierCurveTo(40,-48,10,-22,0,-2); c.closePath(); fs(c,lin(c,-34,-110,30,-20,'#f8585a','#d6151c'),'#17171c',3);
  c.strokeStyle='rgba(255,255,255,.4)'; c.lineWidth=3.4; c.beginPath(); c.arc(0,-76,33,1.12*PI,1.45*PI); c.stroke();
  circ(c,0,-76,23); fs(c,rad(c,0,-76,24,'#ffffff','#e8edf3'),'#17171c',2.6);
  olho(c,-8,-80,4.3,5.8,'#1f2937',false,false); olho(c,8,-80,4.3,5.8,'#1f2937',false,false);
  c.fillStyle='rgba(244,114,128,.5)'; el(c,-14,-71,4,2.4); c.fill(); el(c,14,-71,4,2.4); c.fill();
  bocaFala(c,0,-68,m,4.2);
}
var SP_C=[[-24,-28,7],[-10,-16,6],[-36,-14,5.5],[-12,-34,5],[-30,-40,4.5],[-40,-28,4]];
var SP_P=[[-26,-52,4.5],[-20,-64,4],[-13,-75,3.6],[-6,-85,3.2],[-1,-95,2.6],[-18,-48,3]];
function gigi(c,t,m){
  sombra(c,46,.2); var pn=Math.sin(t*2)*.05;
  /* cavalete com o quadro */
  c.save(); c.translate(52,0); c.strokeStyle='#8a5a2b'; c.lineWidth=3.4; c.beginPath(); c.moveTo(-3,-78); c.lineTo(-17,0); c.moveTo(3,-78); c.lineTo(17,0); c.moveTo(0,-74); c.lineTo(2,-6); c.moveTo(-20,-28); c.lineTo(20,-28); c.stroke(); c.strokeStyle='#c08a4e'; c.lineWidth=1; c.stroke();
  c.save(); c.rotate(.02); rr(c,-19,-70,38,42,1.5); fs(c,lin(c,0,-70,0,-28,'#fffdf5','#ece3cf'),'#8a7a5c',1.4); circ(c,0,-49,13); fs(c,rad(c,0,-49,13,'#fb7a4d','#e8491f'),'#b5340f',1); c.strokeStyle='rgba(120,30,5,.45)'; c.lineWidth=1; circ(c,0,-49,8); c.stroke(); circ(c,0,-49,3.4); c.stroke(); c.restore(); c.restore();
  /* cauda e patas de trás */
  c.strokeStyle='#b77c2a'; c.lineWidth=3; c.beginPath(); c.moveTo(-44,-22); c.quadraticCurveTo(-56,-14+Math.sin(t*2)*3,-52,-3); c.stroke(); el(c,-52,-3,3.4,4.6); fs(c,'#5b3418');
  el(c,-22,-5,22,5); fs(c,lin(c,0,-10,0,0,'#f2c14e','#c9962e')); rr(c,-3,-8,8,8,2); fs(c,'#4a2e14');
  /* corpo sentado */
  el(c,-24,-24,24,22); fs(c,rad(c,-22,-34,28,'#fbd568','#dca534'),'#7a5216',1.5);
  c.save(); el(c,-24,-24,24,22); c.clip(); c.fillStyle='#c9822b'; SP_C.forEach(function(p){ el(c,p[0],p[1],p[2],p[2]*.8); c.fill(); }); c.restore();
  /* pescoço longo e curvo */
  c.save(); c.translate(-24,-36); c.rotate(Math.sin(t*1.2)*.018); c.translate(24,36);
  function pesc(){ c.beginPath(); c.moveTo(-34,-40); c.bezierCurveTo(-32,-70,-14,-94,1,-108); c.lineTo(9,-101); c.bezierCurveTo(-4,-84,-8,-62,-6,-34); c.closePath(); }
  c.strokeStyle='#6b3f1f'; c.lineWidth=4; c.beginPath(); c.moveTo(-36,-42); c.bezierCurveTo(-34,-71,-16,-95,-1,-110); c.stroke();
  pesc(); fs(c,lin(c,-30,-70,-2,-70,'#fbd568','#e5ae3c'),'#7a5216',1.4);
  c.save(); pesc(); c.clip(); c.fillStyle='#c9822b'; SP_P.forEach(function(p){ el(c,p[0],p[1],p[2]*1.2,p[2]); c.fill(); }); c.restore();
  /* cabeça */
  c.save(); c.translate(8,-110); c.rotate(.22);
  c.strokeStyle='#7a5216'; c.lineWidth=2.4; c.beginPath(); c.moveTo(-3,-6); c.lineTo(-5,-15); c.moveTo(3,-7); c.lineTo(2,-16); c.stroke(); circ(c,-5,-16,2.4); fs(c,'#5b3418'); circ(c,2,-17,2.4); fs(c,'#5b3418');
  c.beginPath(); c.moveTo(-8,-5); c.quadraticCurveTo(-18,-11,-19,-3); c.quadraticCurveTo(-14,0,-8,-1); c.closePath(); fs(c,'#e5ae3c','#7a5216',1.1);
  c.beginPath(); c.moveTo(-10,-5); c.bezierCurveTo(-4,-11,8,-8,20,-1); c.quadraticCurveTo(25,3,20,6); c.quadraticCurveTo(6,9,-6,6); c.quadraticCurveTo(-13,2,-10,-5); c.closePath(); fs(c,lin(c,0,-9,0,8,'#fbd568','#e5ae3c'),'#7a5216',1.4);
  el(c,16,2.4,7,4); fs(c,'#f3dcae',null); olho(c,1,-2,2.8,3.4,'#2a1610',false,true); c.fillStyle='#5b3418'; el(c,20,.8,1.2,.8); c.fill();
  c.fillStyle='rgba(244,114,128,.4)'; el(c,4,3.2,3,1.6); c.fill();
  if(m>.12){ c.beginPath(); c.ellipse(15,5.6,4,.8+m*2.2,0,0,TAU); fs(c,'#8f2d2d','#5c1b1b',1); } else { c.strokeStyle='#7a2e26'; c.lineWidth=1.2; c.beginPath(); c.moveTo(10,5); c.quadraticCurveTo(15,7.2,20,4.6); c.stroke(); }
  c.restore(); c.restore();
  /* pata da frente segura o pincel */
  var hx=23+pn*20, hy=-40+pn*50;
  c.strokeStyle='#7a5216'; c.lineWidth=9; c.beginPath(); c.moveTo(-8,-22); c.quadraticCurveTo(4,-30,hx-4,hy); c.stroke(); c.strokeStyle='#ecb946'; c.lineWidth=6.6; c.stroke();
  circ(c,hx-3,hy,5); fs(c,'#4a2e14','#2a1608',1);
  c.save(); c.translate(hx,hy); c.rotate(-.5+pn*2); c.strokeStyle='#8a5a2b'; c.lineWidth=2.4; c.beginPath(); c.moveTo(-5,0); c.lineTo(11,0); c.stroke(); rr(c,10,-1.8,3,3.6,.6); fs(c,'#cbd5e1',null); c.beginPath(); c.moveTo(13,-2); c.quadraticCurveTo(18,-1.5,20,0); c.quadraticCurveTo(18,1.5,13,2); c.closePath(); fs(c,'#e8491f','#7a2108',.8); c.restore();
}
function espiral(c,cx,cy,r0,r1,voltas,ph,cor,lw){
  c.beginPath(); for(var i=0;i<=44;i++){ var u=i/44, a=ph+u*voltas*TAU, r=r0+(r1-r0)*u; c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r*.8); }
  c.strokeStyle='#0369a1'; c.lineWidth=lw+2.2; c.stroke(); c.strokeStyle=cor; c.lineWidth=lw; c.stroke();
}
function breezy(c,t,m){
  var b=Math.sin(t*2)*4; c.save(); c.globalAlpha=.16; c.fillStyle='#000'; el(c,0,1,30,5); c.fill(); c.restore();
  c.translate(0,b);
  espiral(c,0,-60,26,50,1.05,t*1.2+2,'#bae6fd',5.5); espiral(c,0,-60,24,44,.8,t*1.2,'#7dd3fc',5);
  [[-40,-14,.6],[28,-10,-.4]].forEach(function(p,i){ c.strokeStyle='#38bdf8'; c.lineWidth=3; c.beginPath(); c.moveTo(p[0],p[1]-Math.sin(t*2+i)*2); c.bezierCurveTo(p[0]+10,p[1]-10,p[0]+16,p[1]+6,p[0]+26,p[1]-4); c.stroke(); });
  circ(c,0,-60,27); fs(c,rad(c,0,-60,28,'#e0f7ff','#5cc3f2'),'#0369a1',2);
  olho(c,-9,-64,4.2,5.6,'#0c4a6e',false,false); olho(c,9,-64,4.2,5.6,'#0c4a6e',false,false);
  c.fillStyle='rgba(244,114,128,.45)'; el(c,-16,-54,4,2.4); c.fill(); el(c,16,-54,4,2.4); c.fill();
  bocaFala(c,0,-52,m,4);
  c.beginPath(); c.moveTo(-8,-86); c.bezierCurveTo(-14,-104,12,-112,16,-98); c.bezierCurveTo(18,-90,6,-90,8,-97); c.strokeStyle='#0369a1'; c.lineWidth=6; c.stroke(); c.strokeStyle='#bae6fd'; c.lineWidth=3.6; c.stroke();
}
function gota(c,cx,by,r,tip){ c.beginPath(); c.moveTo(cx,by-r*2-tip); c.bezierCurveTo(cx+r*.25,by-r*2+tip*.05,cx+r,by-r*1.5,cx+r,by-r); c.arc(cx,by-r,r,0,PI); c.bezierCurveTo(cx-r,by-r*1.5,cx-r*.25,by-r*2+tip*.05,cx,by-r*2-tip); c.closePath(); }
function drop(c,t,m){
  var r=Math.sin(t*2.4); sombra(c,28,.2);
  [[-14,1],[14,-1]].forEach(function(p){ el(c,p[0],-3,8,4); fs(c,'#0ea5e9','#0369a1',1.3); });
  c.scale(1+r*.015,1-r*.015);
  c.strokeStyle='#0369a1'; c.lineWidth=6; c.beginPath(); c.moveTo(-30,-34); c.quadraticCurveTo(-42,-30,-40,-22+r*2); c.moveTo(30,-34); c.quadraticCurveTo(44,-38-(m?m*8:0),42,-48-(m?m*8:0)); c.stroke(); c.strokeStyle='#7dd3fc'; c.lineWidth=3.6; c.stroke();
  gota(c,0,-2,35,40); fs(c,rad(c,-4,-50,52,'#d6f3ff','#1f9fe5'),'#075985',2.2);
  c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=4; c.beginPath(); c.moveTo(-8,-82); c.quadraticCurveTo(-22,-62,-24,-42); c.stroke();
  olho(c,-10,-44,5,6.6,'#0c4a6e',false,false); olho(c,10,-44,5,6.6,'#0c4a6e',false,false);
  c.fillStyle='rgba(244,114,128,.5)'; el(c,-18,-32,4.4,2.6); c.fill(); el(c,18,-32,4.4,2.6); c.fill();
  bocaFala(c,0,-30,m,4.4);
}
var PENT=[[0,0],[1.7,-.55],[1.05,1.42],[-1.05,1.42],[-1.7,-.55],[0,-1.8]];
function bolaFut(c,r,a){
  circ(c,0,0,r); fs(c,rad(c,-r*.1,-r*.2,r,'#ffffff','#cdd3da'),'#111827',Math.max(1.2,r*.05));
  c.save(); circ(c,0,0,r-.5); c.clip(); c.rotate(a); c.fillStyle='#1b1e26'; c.strokeStyle='#1b1e26'; c.lineWidth=Math.max(.8,r*.03);
  PENT.forEach(function(p,n){ c.beginPath(); var q=r*(n?.25:.27); for(var i=0;i<5;i++){ var an=-PI/2+i*TAU/5+(n?PI:0); c.lineTo(p[0]*r*.5+Math.cos(an)*q,p[1]*r*.5+Math.sin(an)*q); } c.closePath(); c.fill();
    if(!n) for(var k=0;k<5;k++){ var b=-PI/2+k*TAU/5; c.beginPath(); c.moveTo(Math.cos(b)*q,Math.sin(b)*q); c.lineTo(Math.cos(b)*r*.68,Math.sin(b)*r*.68); c.stroke(); } });
  c.restore(); c.fillStyle='rgba(255,255,255,.55)'; el(c,-r*.36,-r*.5,r*.28,r*.14); c.fill();
}
function boing(c,t,m){
  var s=Math.abs(Math.sin(t*2.25)), h=s*44, q=s<.25?(.25-s)/.25:0, R=33;
  c.save(); c.globalAlpha=.3-.16*s; c.fillStyle='#000'; el(c,0,1,32-s*12,5.5); c.fill(); c.restore();
  if(s<.55){ c.save(); c.globalAlpha=1-s*1.6; c.strokeStyle='#111827'; c.lineWidth=2.6; [[-34,-22,-20,-2],[-1,-14,-5,-1],[34,-22,18,-2]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],p[1]); c.quadraticCurveTo((p[0]+p[2])/2+(p[0]<0?4:-4),p[1],p[2],p[3]); c.stroke(); }); c.restore(); }
  c.translate(0,-R*(1-q*.14)-h); c.scale(1+q*.16,1-q*.14);
  bolaFut(c,R,.25+s*.3);
  olhoG(c,-10,-3,7.6,1,1); olhoG(c,11,-3,7.2,1,1);
  el(c,.5,14,11,7); fs(c,'#fff','#111827',1); bocaFala(c,.5,13,m,4);
}
function paws(c,t,m){
  sombra(c,26); var w=Math.sin(t*6)*.3, TAN='#d4965e', TS='#a56a35';
  c.save(); c.translate(-22,-20); c.rotate(-.5+w); rr(c,-3,-16,6,18,3); fs(c,lin(c,0,-16,0,2,TAN,TS)); c.restore();
  el(c,-16,-9,10,8.5); fs(c,lin(c,0,-18,0,0,TAN,TS)); el(c,14,-9,10,8.5); fs(c,lin(c,0,-18,0,0,TAN,TS));
  c.beginPath(); c.moveTo(-17,-48); c.quadraticCurveTo(-24,-22,-20,-5); c.lineTo(20,-5); c.quadraticCurveTo(24,-22,17,-48); c.closePath(); fs(c,lin(c,-20,-48,20,-4,cla(TAN,.15),TS));
  c.beginPath(); c.moveTo(-9,-42); c.quadraticCurveTo(0,-34,9,-42); c.quadraticCurveTo(12,-20,0,-13); c.quadraticCurveTo(-12,-20,-9,-42); c.closePath(); fs(c,'#f6e7d4',null);
  [[-7],[7]].forEach(function(p){ rr(c,p[0]-5,-24,10,24,5); fs(c,lin(c,-5,0,5,0,cla(TAN,.1),esc(TAN,.1))); el(c,p[0],-3,6.5,3.6); fs(c,'#f6e7d4'); });
  rr(c,-15,-48,30,6,3); fs(c,'#dc2626','#7f1d1d',1); circ(c,0,-41,3); fs(c,'#fde047','#a16207',1);
  c.save(); c.translate(0,-70); c.rotate(Math.sin(t*1.6)*.04);
  [[-1],[1]].forEach(function(p){ var s=p[0]; c.beginPath(); c.moveTo(s*9,-16); c.quadraticCurveTo(s*12,-44,s*26,-38); c.quadraticCurveTo(s*30,-22,s*23,-9); c.closePath(); fs(c,lin(c,0,-40,0,-10,TS,TAN)); c.beginPath(); c.moveTo(s*13,-17); c.quadraticCurveTo(s*15,-34,s*23,-31); c.quadraticCurveTo(s*25,-22,s*20,-13); c.closePath(); fs(c,'#f4b8a8',null); });
  c.beginPath(); c.ellipse(0,0,29,24,0,0,TAU); fs(c,rad(c,-2,-6,30,cla(TAN,.25),TAN));
  c.fillStyle=esc(TS,.2); c.globalAlpha=.65; el(c,-11,-4,9,9); c.fill(); el(c,11,-4,9,9); c.fill(); c.globalAlpha=1;
  olho(c,-11,-4,5,6.4,'#1c0f08',false,false); olho(c,11,-4,5,6.4,'#1c0f08',false,false);
  el(c,0,9,13,10); fs(c,'#f6e7d4','rgba(90,50,20,.4)',1); c.fillStyle='#1c1208'; c.beginPath(); c.moveTo(-5,3); c.quadraticCurveTo(0,1,5,3); c.quadraticCurveTo(3,8,0,8); c.quadraticCurveTo(-3,8,-5,3); c.fill(); c.fillStyle='rgba(255,255,255,.7)'; el(c,-1.5,3.6,1.6,.9); c.fill();
  if(m>.12){ c.beginPath(); c.ellipse(0,13,4.6,1+m*4,0,0,TAU); fs(c,'#8f2d2d','#5c1b1b',1); c.fillStyle='#f58a9b'; el(c,0,14+m*2.4,3,2); c.fill(); } else { c.strokeStyle='#5b3418'; c.lineWidth=1.3; c.beginPath(); c.moveTo(0,8); c.lineTo(0,11); c.moveTo(-5,11); c.quadraticCurveTo(-2,14,0,11); c.quadraticCurveTo(2,14,5,11); c.stroke(); }
  c.restore();
}
function max(c,t,m){
  var o=Math.sin(t*2.25)*2;
  function corda(){ c.beginPath(); c.moveTo(-60,-2); c.quadraticCurveTo(-34,-6,-16,-30); c.quadraticCurveTo(-2,-44,6,-40); c.quadraticCurveTo(30,-44+o,62,-36+o); }
  c.save(); c.scale(1.2,1.2); c.lineJoin='round';
  corpo(c,MAX,'pull',t); c.restore();
  corda(); c.strokeStyle='#7a5228'; c.lineWidth=6.2; c.stroke(); c.strokeStyle='#d6a765'; c.lineWidth=4.2; c.stroke(); c.save(); c.setLineDash([3,3.4]); c.strokeStyle='#8f6532'; c.lineWidth=4.2; c.stroke(); c.restore();
  circ(c,13,-41.5,5); fs(c,MAX.pele); circ(c,5,-40.5,5); fs(c,esc(MAX.pele,.08));
  if(m>.12){ c.save(); c.globalAlpha=.8; c.strokeStyle='#1f2937'; c.lineWidth=2; [[32,-66],[40,-62],[46,-54]].forEach(function(p,i){ c.beginPath(); c.moveTo(p[0],p[1]); c.lineTo(p[0]+4+i,p[1]-5+i*2); c.stroke(); }); c.restore(); }
}
var MOR={pin:pin,gigi:gigi,breezy:breezy,drop:drop,boing:boing,paws:paws,max:max};
A.morador=function(c,tipo,x,y,t,dir,falando){
  var f=MOR[tipo]||pin; t=t||0; c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round'; f(c,t,fala(t,falando)); c.restore();
};
A.MORADORES=Object.keys(MOR);
A.bolaFut=bolaFut;

/* ============================================================ TWISTER */
function latinha(c,w,h,k){ /* lata vermelha do slide: corpo com cilindro claro/escuro e tampas prateadas; k = fase das faixas */
  c.save(); rr(c,-w/2,-h/2,w,h,h*.2); fs(c,lin(c,0,-h/2,0,h/2,'#ff5a55','#a8101a'),'#5f0a10',1.3);
  c.save(); rr(c,-w/2,-h/2,w,h,h*.2); c.clip(); c.fillStyle='rgba(255,255,255,.42)'; c.fillRect(-w/2,-h*.34,w,h*.12); c.fillStyle='rgba(120,0,10,.35)'; c.fillRect(-w/2,h*.2,w,h*.16);
  if(k!=null){ c.fillStyle='rgba(255,255,255,.2)'; for(var i=0;i<3;i++){ var u=((k+i/3)%1), bx=-w/2+u*w; c.fillRect(bx,-h/2,w*.1,h); } } c.restore();
  el(c,-w/2,0,h*.17,h*.46); fs(c,'#c7ccd3','#4b5563',1); el(c,w/2,0,h*.26,h*.5); fs(c,rad(c,w/2,0,h*.4,'#f1f5f9','#8f98a5'),'#4b5563',1.2); el(c,w/2,0,h*.15,h*.32); c.strokeStyle='#6b7280'; c.lineWidth=.9; c.stroke(); c.restore();
}
function livro(c){ rr(c,-11,-8,22,16,1.5); fs(c,lin(c,0,-8,0,8,'#60a5fa','#1d4ed8'),'#1e3a8a',1.2); c.fillStyle='#fff'; c.fillRect(-8,-5,1.6,10); c.fillStyle='rgba(255,255,255,.75)'; c.fillRect(-4,-4,11,2); c.fillRect(-4,0,8,1.4); }
function twister(c,estado,t,H){
  var sp=1,bob=Math.sin(t*2)*2,sx=1,sy=1,olhos='normal',bc='sorri',k;
  if(estado==='laugh'){ k=Math.abs(Math.sin(t*W2)); bob=-k*7; sx=1+k*.03; olhos='riso'; bc='riso'; sp=1.6; }
  else if(estado==='hit'){ k=Math.max(0,Math.sin(t*W)); sx=1.12+k*.04; sy=.84-k*.03; olhos='tonto'; bc='O'; sp=.5; }
  else if(estado==='sad'){ bob=0; sx=.9; sy=.84; olhos='triste'; bc='triste'; sp=.35; }
  else if(estado==='write'){ olhos='foco'; bc='sopra'; sp=2.2; }
  var R=74, N=26;
  function cx(v){ return Math.sin(t*1.5-v*3)*(4+v*11); }
  function rx(v){ return 8+R*Math.pow(v,1.25); }
  c.save(); c.globalAlpha=.25; c.fillStyle='#000'; el(c,0,1,36,7); c.fill(); c.restore();
  /* poeira em volta da ponta */
  for(var d=0;d<7;d++){ var da=d/7*TAU+t*.8*sp, dx=Math.cos(da)*(19+d%3*5), dy=Math.sin(da)*4-4; circ(c,dx,dy,5+d%3*1.6); fs(c,'#b8bdc6','rgba(80,88,100,.5)',1); }
  c.translate(0,bob); c.scale(sx,sy);
  function objeto(i,atras){ var ph=i/3*TAU, a=t*1.5*sp+ph, sn=Math.sin(a), fr=sn>=0; if(fr===atras) return;
    var v=[.27,.42,.15][i], ox=cx(v)+Math.cos(a)*rx(v)*.72, oy=-v*H+sn*rx(v)*.13, e=.8+sn*.14;
    c.save(); c.translate(ox,oy); c.rotate(a*.6+i); c.scale(e,e); c.globalAlpha=atras?.8:1;
    if(i===0) bolaFut(c,11,a); else if(i===1) livro(c); else latinha(c,20,13); c.restore(); }
  function silueta(){ c.beginPath(); var i; for(i=0;i<=N;i++){ var v=i/N; c.lineTo(cx(v)-rx(v),-v*H+Math.sin(v*22+t*2)*1.2); } for(i=N;i>=0;i--){ var v2=i/N; c.lineTo(cx(v2)+rx(v2),-v2*H+Math.sin(v2*22+t*2)*1.2); } c.closePath(); }
  silueta(); var g=c.createLinearGradient(-R,0,R,0); g.addColorStop(0,'#7a8392'); g.addColorStop(.38,'#e5e8ed'); g.addColorStop(.62,'#c3c9d2'); g.addColorStop(1,'#68717f'); fs(c,g,'#3f4754',2);
  objeto(0,true); objeto(1,true); objeto(2,true);
  c.save(); silueta(); c.clip();
  for(var b=0;b<12;b++){ var v0=((b/12+t*.14*sp)%1), al=Math.sin(v0*PI); c.save(); c.globalAlpha=.65*al; c.strokeStyle=b%2?'rgba(255,255,255,.95)':'rgba(70,80,96,.9)'; c.lineWidth=2.5+v0*5; var xc=cx(v0), rr0=rx(v0), y0=-v0*H; c.beginPath(); c.moveTo(xc-rr0-3,y0-5); c.quadraticCurveTo(xc,y0+rr0*.3,xc+rr0+3,y0-11); c.stroke(); c.restore(); }
  c.restore();
  /* boca do funil, com nuvem no topo */
  var xt=cx(1), rt=rx(1);
  el(c,xt,-H,rt,rt*.15); fs(c,lin(c,0,-H-10,0,-H+10,'#59616e','#a7aeb9'),'#3f4754',1.8);
  [[-.82,-2,13],[-.48,-9,15],[0,-11,16],[.48,-9,15],[.82,-2,13]].forEach(function(p){ circ(c,xt+p[0]*rt,-H+p[1],p[2]); fs(c,rad(c,xt+p[0]*rt,-H+p[1]-3,p[2],'#f1f3f6','#a7aeb9'),'#5a6371',1.3); });
  /* cara */
  var fy=-H*.7, fx=cx(.7); c.save(); c.translate(fx,fy);
  c.fillStyle='rgba(244,114,182,.42)'; el(c,-29,14,8,4.6); c.fill(); el(c,29,14,8,4.6); c.fill();
  [[-15,1],[15,-1]].forEach(function(e){ var ex=e[0];
    if(olhos==='riso'){ c.strokeStyle='#1f2937'; c.lineWidth=3.6; c.beginPath(); c.arc(ex,4,9,1.1*PI,1.9*PI); c.stroke(); return; }
    if(olhos==='tonto'){ el(c,ex,0,13,14.5); fs(c,'#fff','#1f2937',1.6); c.strokeStyle='#1f2937'; c.lineWidth=2; c.beginPath(); for(var q=0;q<22;q++){ var qa=q*.62+t*4*e[1], qr=q*.5; c.lineTo(ex+Math.cos(qa)*qr,Math.sin(qa)*qr); } c.stroke(); return; }
    var px=olhos==='foco'?3:2, py=olhos==='triste'?4:1; el(c,ex,0,13,14.5); fs(c,'#fff','#1f2937',1.8); olho(c,ex+px,py,7.2,9,'#312e81',false,false);
    if(olhos==='triste'){ c.save(); el(c,ex,0,13.6,15); c.clip(); c.fillStyle='#b8bfc9'; c.save(); c.translate(ex,-13); c.rotate(e[1]*-.32); c.fillRect(-18,-8,36,11); c.restore(); c.restore(); }
    c.fillStyle='#232a36'; c.save(); c.translate(ex,-20); c.rotate(olhos==='foco'?e[1]*.34:(olhos==='triste'?e[1]*-.38:e[1]*.1)); rr(c,-13,-3,26,6,3); c.fill(); c.restore(); });
  if(bc==='riso'){ c.beginPath(); c.moveTo(-14,18); c.quadraticCurveTo(0,44,14,18); c.closePath(); fs(c,'#7f1d1d','#450a0a',1.4); c.save(); c.clip(); c.fillStyle='#f87171'; el(c,0,33,8,5); c.fill(); c.fillStyle='#fff'; c.fillRect(-8,18,16,5); c.restore(); }
  else if(bc==='O'){ el(c,0,27,7,8.6); fs(c,'#450a0a','#1f2937',1); }
  else if(bc==='sopra'){ el(c,0,24,5,4.6); fs(c,'#450a0a','#1f2937',1.2); }
  else if(bc==='triste'){ c.strokeStyle='#450a0a'; c.lineWidth=2.8; c.beginPath(); c.arc(0,34,10,1.2*PI,1.8*PI); c.stroke(); var lg=(t*.5)%1; c.save(); c.globalAlpha=Math.sin(lg*PI); c.fillStyle='#60a5fa'; c.beginPath(); c.moveTo(-22,12+lg*20); c.quadraticCurveTo(-26,20+lg*20,-22,22+lg*20); c.quadraticCurveTo(-18,20+lg*20,-22,12+lg*20); c.fill(); c.restore(); }
  else { c.beginPath(); c.moveTo(-13,20); c.quadraticCurveTo(0,32,14,18); c.quadraticCurveTo(0,26,-13,20); c.closePath(); fs(c,'#7f1d1d','#450a0a',1.3); c.fillStyle='#fff'; rr(c,-4,23,8,5,1.5); c.fill(); c.strokeStyle='#1f2937'; c.lineWidth=1; c.stroke(); }
  c.restore();
  objeto(0,false); objeto(1,false); objeto(2,false);
  if(estado==='hit'&&A.estrela) for(var s=0;s<5;s++){ var sa=s/5*TAU+t*2.5; A.estrela(c,fx+Math.cos(sa)*46,fy-34+Math.sin(sa)*10,6,s%2?'#fde047':'#fff',sa); }
  if(estado==='laugh'){ c.font='900 18px Arial'; c.textAlign='center'; c.fillStyle='#334155'; [[-76,-H*.8],[80,-H*.62],[-66,-H*.46]].forEach(function(q,i){ c.save(); c.globalAlpha=.9; c.fillText('HA',q[0],q[1]-Math.abs(Math.sin(t*W2+i))*5); c.restore(); }); }
}
A.conde=function(c,x,y,estado,t){ t=t||0; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round'; twister(c,estado||'idle',t,168); c.restore(); };
A.tracona=function(c,x,y,t,hp,max2){
  t=t||0; max2=max2||3; hp=hp==null?max2:hp; c.save(); c.translate(x,y); c.lineJoin='round'; c.lineCap='round';
  c.save(); c.scale(.66,.66); twister(c,hp<=1&&hp<max2?'hit':'idle',t,168); c.restore();
  for(var h=0;h<max2;h++){ var hx=(h-(max2-1)/2)*14; circ(c,hx,-132,5); fs(c,h<hp?'#38bdf8':'rgba(255,255,255,.3)','#334155',1.2); }
  c.restore();
};

/* ============================================================ INIMIGOS */
function ini(c,x,y,dir,fn){ c.save(); c.translate(x,y); c.scale(dir||1,1); c.lineJoin='round'; c.lineCap='round'; fn(); c.restore(); }
function bravo(c,x,y,r,w){ /* par de olhos pequenos, sobrancelha travessa */
  olhoG(c,x,y,r,r*.2,r*.1); olhoG(c,x+w,y,r*.92,r*.2,r*.1);
  c.strokeStyle='#1f2937'; c.lineWidth=2; c.beginPath(); c.moveTo(x-r,y-r*1.25); c.lineTo(x+r,y-r*.8); c.moveTo(x+w+r,y-r*1.25); c.lineTo(x+w-r,y-r*.8); c.stroke();
}
var INI={
  gust:function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ var b=Math.sin(t*3)*3; c.save(); c.globalAlpha=.14; c.fillStyle='#000'; el(c,0,1,16,3); c.fill(); c.restore(); c.translate(0,-26+b); if(ach) c.scale(1.1,.45);
    [[-14,-14,16,.7,'#b6e4f5'],[-16,6,18,.6,'#8fd3ee']].forEach(function(p,i){ var w=Math.sin(t*4+i)*2; c.beginPath(); c.moveTo(p[0]-20,p[1]+w); c.bezierCurveTo(p[0]-6,p[1]-8,p[0]+4,p[1]+6,p[0]+12,p[1]-w); c.strokeStyle='#2f7d9c'; c.lineWidth=6.4; c.stroke(); c.strokeStyle=p[4]; c.lineWidth=4; c.stroke(); });
    espiral2(c,8,-1,15,t); circ(c,8,-1,13.5); fs(c,rad(c,8,-1,14,'#e8f8fe','#7fcdea'),'#2f7d9c',1.8);
    bravo(c,3,-3,3.8,10); c.strokeStyle='#1f2937'; c.lineWidth=1.5; c.beginPath(); c.arc(9,5,3,.15*PI,.85*PI); c.stroke(); }); },
  puddle:function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ var w=Math.sin(t*3.2), sq=ach?.32:1;
    c.save(); c.scale(1,sq); c.beginPath(); c.moveTo(-28,0); c.bezierCurveTo(-32-w,-9,-20,-13+w,-12,-16); c.bezierCurveTo(-8,-23-w*1.5,10,-23+w*1.5,14,-15); c.bezierCurveTo(24,-14-w,32+w,-8,28,0); c.closePath(); fs(c,lin(c,0,-22,0,0,'#7dd3fc','#1e73c0'),'#0c4a78',1.8);
    c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=2; c.beginPath(); c.moveTo(-17,-9); c.quadraticCurveTo(-10,-15,-3,-16); c.stroke(); c.restore();
    c.save(); c.globalAlpha=.55; c.strokeStyle='#38bdf8'; c.lineWidth=1.2; el(c,-23-w,-1,6,1.6); c.stroke(); el(c,23+w,-1,5,1.4); c.stroke(); c.restore();
    if(ach){ c.strokeStyle='#0c2f4a'; c.lineWidth=2; c.beginPath(); c.moveTo(-1,-6); c.lineTo(4,-4); c.lineTo(-1,-2); c.moveTo(13,-6); c.lineTo(8,-4); c.lineTo(13,-2); c.stroke(); }
    else { bravo(c,-1,-14,4,12); c.strokeStyle='#0c2f4a'; c.lineWidth=1.5; c.beginPath(); c.arc(5,-6,3,.15*PI,.85*PI); c.stroke(); } }); },
  can:function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ var k=(t*.9)%1;
    sombra(c,24,.22); c.save(); c.globalAlpha=.7; c.strokeStyle='#1f2937'; c.lineWidth=2; c.beginPath(); c.arc(-22,-17,14,.72*PI,1.22*PI); c.stroke(); c.beginPath(); c.arc(-27,-17,20,.8*PI,1.16*PI); c.stroke(); c.restore();
    c.translate(0,-17); c.rotate(-.1+Math.sin(t*W*.7)*.04); if(ach) c.scale(1.1,.55); latinha(c,44,32,k);
    bravo(c,-9,-3,4.4,14); c.strokeStyle='#450a0a'; c.lineWidth=1.6; c.beginPath(); c.arc(-2,5,3.4,.15*PI,.85*PI); c.stroke(); }); },
  ball:function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ sombra(c,19,.24); c.translate(0,-18); if(ach) c.scale(1.12,.6); bolaFut(c,18,t*4);
    bravo(c,-5,-3,5,12); el(c,1,9,7,4.4); fs(c,'#fff','#111827',1); c.strokeStyle='#111827'; c.lineWidth=1.3; c.beginPath(); c.arc(1,7.4,3.2,.15*PI,.85*PI); c.stroke(); }); },
  top:function(c,x,y,t,dir,ach){ ini(c,x,y,dir,function(){ var a=Math.sin(t*5)*.08, ph=(t*1.2)%1;
    c.strokeStyle='#1f2937'; c.lineWidth=2; el(c,0,-3,22,4.8); c.save(); c.setLineDash([26,10]); c.lineDashOffset=-t*26; c.stroke(); c.restore();
    c.translate(0,-2); c.rotate(a); if(ach) c.scale(1.05,.6);
    function casco(){ c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-6,-6,-22,-25); c.bezierCurveTo(-23,-37,23,-37,22,-25); c.quadraticCurveTo(6,-6,0,0); c.closePath(); }
    rr(c,-4,-47,8,14,2); fs(c,lin(c,-4,0,4,0,'#f87171','#b91c1c'),'#7f1d1d',1.2); el(c,0,-48,5.6,4); fs(c,'#ef4444','#7f1d1d',1.2);
    casco(); fs(c,'#fff',null); c.save(); casco(); c.clip();
    [['#dc2626',-36,6],['#f8fafc',-30,4],['#2563eb',-26,5],['#22c55e',-21,4],['#facc15',-17,4],['#dc2626',-13,4],['#2563eb',-9,9]].forEach(function(b){ c.fillStyle=b[0]; c.fillRect(-26,b[1],52,b[2]); });
    c.fillStyle='rgba(255,255,255,.3)'; var bx=-26+ph*52; c.fillRect(bx-3,-40,6,40); c.fillStyle='rgba(0,0,0,.14)'; c.fillRect(10,-40,16,40); c.restore();
    casco(); c.strokeStyle='#17171c'; c.lineWidth=1.6; c.stroke();
    c.save(); c.translate(0,-29); bravo(c,-7,0,4.6,14); c.restore(); c.strokeStyle='#111827'; c.lineWidth=1.5; c.beginPath(); c.arc(0,-22,2.6,.15*PI,.85*PI); c.stroke(); }); }
};
function espiral2(c,x,y,r,t){ c.beginPath(); for(var i=0;i<=26;i++){ var u=i/26, a=t*2.2+u*TAU*1.25, q=r*(.72+u*.5); c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q*.9); } c.strokeStyle='#2f7d9c'; c.lineWidth=5; c.stroke(); c.strokeStyle='#b6e4f5'; c.lineWidth=3; c.stroke(); }
A.INIMIGOS_CIE=INI;
function por(n){ return function(c,x,y,t,dir,ach){ INI[n](c,x,y,t||0,dir,ach); }; }
A.traca=function(c,x,y,t,dir,voando){ INI.gust(c,x,y,t||0,dir,voando===false); };
A.ganso=por('gust'); A.poeira=por('puddle'); A.polar=por('puddle'); A.gamba=por('puddle'); A.carcaju=por('puddle');
A.tronco=function(c,b,t){ c.save(); c.translate(b.x,b.y+b.r); var s=(b.r||18)/17; c.scale(s,s); INI.can(c,0,0,t||0,b.vx<0?-1:1); c.restore(); };
A.bolaRolando=function(c,b,t){ c.save(); c.translate(b.x,b.y); bolaFut(c,b.r||18,b.rot||0); c.restore(); };
A.inimigo=function(c,e,t){ var f=INI[e.tipo]; t=t||0; if(f) return f(c,e.x,e.y,t,e.dir,e.achatado);
  if(e.tipo==='ganso'||e.tipo==='traca'||e.voa) return INI.gust(c,e.x,e.y,t,e.dir,e.achatado);
  return INI.puddle(c,e.x,e.y,t,e.dir,e.achatado); };
})();
