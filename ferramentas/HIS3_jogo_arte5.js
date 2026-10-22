/* ============================================================
   HIS3_jogo_arte5.js — "The Lost Endings" (parte 5):
   1) o quarto herói, LEO (menino jogador de futebol, camisa 10),
      com todos os estados de A.heroi — no mesmo esqueleto,
      proporção e traço de Lia/Theo/Bia (HIS3_jogo_arte.js);
   2) A.capaLivro(c,t,sel): a capa dura do livro de histórias,
      vista de frente, ocupando a tela (960x540).
   Estende window.ARTE sem alterar os arquivos anteriores: guarda o
   A.heroi antigo e o embrulha (quem==='leo' desenha o novo).
   Carregar DEPOIS de HIS3_jogo_arte.js … arte4.js.
   Tudo por código: sem imagem externa, sem emoji.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE, W=A.W, H=A.H, PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin, hash=A.hash;
var I=A.ING, OL=I.OL, mix=I.mix, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, brilho=I.brilho, cintila=I.cintila, olho=I.olho, boca=I.boca;
var N=A.CN||{};

/* ============================================================
   LEO — paleta. Camisa amarela com friso verde e número 10,
   calção azul, meião branco, chuteira preta. look.cor troca a
   camisa (o friso vira branco para não sumir).
   ============================================================ */
var LEO={pele:'#cf9466',peleS:'#a76a3f',cab:'#3a2214',cabS:'#1a0d06',olho:'#3f2210',cor:'#facc15',cilio:false,friso:'#16a34a',calcao:'#1d4ed8'};
if(A.HEROIS) A.HEROIS.leo=LEO;

/* pose: o mesmo dicionário de HIS3_jogo_arte.js (mesmo ritmo e mesmos ângulos) */
function pose(e,t){
  var P={bob:0,rot:0,sx:1,sy:1,lean:0,aN:.12,aF:-.1,lN:[0,.05],lF:[0,.05],tilt:0,face:'normal',boca:'smile',capa:.4,sw:.2,corpo:0,sent:0};
  var s,k;
  switch(e){
    case 'walk': s=Math.sin(t*11); P.bob=-Math.abs(Math.cos(t*11))*2.4; P.lN=[s*.62,Math.max(0,-s)*.75+.1]; P.lF=[-s*.62,Math.max(0,s)*.75+.1];
      P.aN=-s*.75; P.aF=s*.75; P.lean=.06; P.sw=.45+Math.abs(s)*.15; P.capa=1.4+Math.abs(s); P.tilt=s*.03; break;
    case 'kick': P.lF=[1.45,.08]; P.lN=[-.18,.12]; P.aN=-.7; P.aF=1.0; P.lean=-.1; P.boca='open'; P.face='feliz'; P.sw=.3; P.capa=1.2; break; /* chute de futebol: perna da frente esticada */
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

/* capa longa do voo (a mesma dos outros heróis) */
function capaVoo(c,K,t){
  var cc=K.capa||'#7c3aed', w1=Math.sin(t*9)*3, w2=Math.sin(t*9+1.6)*3.5;
  c.beginPath(); c.moveTo(5,-45); c.quadraticCurveTo(-3,-49.5,-10,-43);
  c.bezierCurveTo(-17,-24,-14+w1,-4,-13+w2,24); c.quadraticCurveTo(-7+w1,18+w2*.5,-2+w2,27); c.quadraticCurveTo(2+w1*.4,6,4,-40);
  c.closePath(); fs(c,lin(c,0,-48,-14,20,cc,esc(cc,.4)));
  c.save(); c.clip(); c.fillStyle='rgba(255,255,255,.16)'; c.fillRect(-6,-50,3,80); c.restore();
}

/* número "10" desenhado (traço com contorno), centrado em (x,y), ~7.4 px de altura */
function dez(c,x,y,s,cor,borda){
  c.save(); c.translate(x,y); c.scale(s,s); c.lineCap='round'; c.lineJoin='round';
  /* herói virado para a esquerda (escala x negativa): desespelha o número */
  try{ var M=c.getTransform(); if(M.a*M.d-M.b*M.c<0) c.scale(-1,1); }catch(e){}
  function tr(){ c.beginPath(); c.moveTo(-4.6,-2.4); c.lineTo(-3,-3.7); c.lineTo(-3,3.7); c.moveTo(4.6,0); c.ellipse(2.2,0,2.4,3.7,0,0,TAU); }
  tr(); c.strokeStyle=borda||'rgba(255,255,255,.9)'; c.lineWidth=3.2; c.stroke();
  tr(); c.strokeStyle=cor; c.lineWidth=1.7; c.stroke();
  c.restore();
}

/* ---------- braço (pivô no ombro): manga curta da camisa ---------- */
function braco(c,K,a,sx,longe){
  var pele=longe?esc(K.pele,.12):K.pele, cor=longe?esc(K.cor,.18):K.cor, fr=longe?esc(K.friso,.18):K.friso;
  c.save(); c.translate(sx,-41); c.rotate(-a);
  if(K.mergulho){ rr(c,-3.6,-3,7.2,16.5,3.6); fs(c,lin(c,-3,0,3,0,longe?'#183052':'#2a4f82',longe?'#0f2038':'#16304f')); c.fillStyle=cor; c.fillRect(-3.6,4,7.2,2); circ(c,0,15.6,3.9); fs(c,pele); c.restore(); return; }
  rr(c,-3.3,-3,6.6,17.5,3.3); fs(c,lin(c,-3,0,3,0,cla(pele,.1),esc(pele,.06)));
  rr(c,-4.5,-4,9,10.6,4); fs(c,lin(c,-4,0,4,0,cla(cor,.18),esc(cor,.14)));
  c.save(); rr(c,-4.5,-4,9,10.6,4); c.clip(); c.fillStyle=fr; c.fillRect(-5,4.2,10,2.4); c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(-2.6,-4,1.6,8); c.restore();
  circ(c,0,15.6,3.8); fs(c,pele);
  c.restore();
}

/* ---------- perna: calção, joelho de fora, meião e chuteira com travas ---------- */
function perna(c,K,L,hxx,longe){
  var d=longe?.16:0, pele=esc(K.pele,d);
  if(K.mergulho){ c.save(); c.translate(hxx,-18); c.rotate(-L[0]); rr(c,-3.9,-3,7.8,13,3.9); fs(c,esc('#24466f',d)); c.translate(0,9); c.rotate(L[1]); rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,esc('#1f3b63',d));
    c.beginPath(); c.moveTo(-4.5,6); c.lineTo(4.5,6); c.quadraticCurveTo(15,9,19,13); c.quadraticCurveTo(8,15.5,-4,12.5); c.closePath(); fs(c,lin(c,0,6,0,14,esc(K.cor,d),esc(K.cor,d+.3))); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; c.beginPath(); c.moveTo(4,9); c.lineTo(15,12); c.stroke(); c.restore(); return; }
  var sh=esc(K.calcao,d), mei=esc('#f8fafc',d), fr=esc(K.friso,d);
  c.save(); c.translate(hxx,-18); c.rotate(-L[0]);
  rr(c,-3.9,-3,7.8,13,3.9); fs(c,pele);
  rr(c,-5,-4.5,10,10,3.6); fs(c,lin(c,-5,0,5,0,cla(sh,.1),esc(sh,.2)));
  c.fillStyle='rgba(255,255,255,'+(longe?.45:.8)+')'; c.fillRect(-5,3.6,10,1.1);
  c.translate(0,9); c.rotate(L[1]);
  rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,pele);
  rr(c,-4,.6,8,8.8,2.6); fs(c,lin(c,-4,0,4,0,mei,esc(mei,.14)));
  c.fillStyle=fr; c.fillRect(-4,1.2,8,1.5); c.fillStyle=esc(K.cor,d); c.fillRect(-4,2.7,8,1);
  /* chuteira */
  c.beginPath(); c.moveTo(-4.4,6.8); c.quadraticCurveTo(-5,12.1,.2,12.2); c.lineTo(8.6,12); c.quadraticCurveTo(11.6,11.2,10.6,8.4); c.quadraticCurveTo(7,8.6,3.6,6.6); c.closePath();
  fs(c,lin(c,0,6.6,0,12.2,esc('#3b4252',d),esc('#0f131c',d)),'rgba(10,10,20,.8)',1.2);
  c.strokeStyle=esc(K.cor,d); c.lineWidth=1.3; c.beginPath(); c.moveTo(-1.2,10); c.quadraticCurveTo(3,8.2,7.4,10.2); c.stroke();
  c.fillStyle=longe?'#9ca3af':'#e5e7eb'; [-2.6,1.4,5.6].forEach(function(px){ rr(c,px,12,1.9,1.7,.6); c.fill(); });
  c.fillStyle='rgba(255,255,255,.22)'; el(c,2.6,8.4,2.6,.8); c.fill();
  c.restore();
}

/* ---------- tronco: calção + camisa amarela com gola V e o 10 ---------- */
function torso(c,K){
  var cor=K.cor, fr=K.friso, sh=K.calcao;
  if(K.mergulho){ rr(c,-11,-47,22,32,10); fs(c,lin(c,-11,-47,11,-15,'#2f5a92','#14294a'));
    c.save(); rr(c,-11,-47,22,32,10); c.clip(); c.fillStyle=cor; c.beginPath(); c.moveTo(-12,-30); c.lineTo(12,-42); c.lineTo(12,-37); c.lineTo(-12,-25); c.fill(); c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(-7,-46,3,30); c.restore();
    c.strokeStyle='#cbd5e1'; c.lineWidth=1.2; c.beginPath(); c.moveTo(2,-46); c.lineTo(2,-33); c.stroke(); circ(c,2,-46,1.4); c.fillStyle='#e5e7eb'; c.fill(); return; }
  /* calção */
  c.beginPath(); c.moveTo(-10.6,-28); c.lineTo(10.6,-28); c.lineTo(12.8,-15.4); c.quadraticCurveTo(6,-13.6,1.2,-15.4); c.lineTo(0,-18.6); c.lineTo(-1.2,-15.4); c.quadraticCurveTo(-6,-13.6,-12.8,-15.4); c.closePath();
  fs(c,lin(c,0,-28,0,-14,cla(sh,.14),esc(sh,.26)));
  c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=1.3; c.beginPath(); c.moveTo(10.9,-26.5); c.lineTo(12.4,-16.6); c.stroke();
  /* camisa */
  rr(c,-10.8,-47.5,21.6,24.5,9); fs(c,lin(c,-11,-47,11,-23,cla(cor,.28),esc(cor,.12)));
  c.save(); rr(c,-10.8,-47.5,21.6,24.5,9); c.clip();
  c.fillStyle=esc(cor,.14); c.globalAlpha=.55; el(c,-11,-34,4.5,13); c.fill(); c.globalAlpha=1;
  c.fillStyle=fr; c.fillRect(-11.5,-25.6,23,2.6);
  c.fillStyle='rgba(255,255,255,.24)'; c.fillRect(-6.8,-47,2.8,21);
  c.restore();
  /* gola V */
  c.beginPath(); c.moveTo(-5.4,-47.2); c.lineTo(0,-41); c.lineTo(5.4,-47.2); c.closePath(); fs(c,esc(K.pele,.05),null);
  c.strokeStyle=fr; c.lineWidth=2.3; c.beginPath(); c.moveTo(-6.2,-47.2); c.lineTo(0,-40.4); c.lineTo(6.2,-47.2); c.stroke();
  /* número 10 */
  dez(c,5.4,-34.6,.86,fr);
}

/* ---------- cabeça: cabelo curto, franjinha espetada e redemoinho ---------- */
function cabeca(c,K,P,t){
  var cab=lin(c,-20,-22,20,10,cla(K.cab,.14),K.cabS), pisca=(t%3.9)<.11 && P.face==='normal';
  /* volume do cabelo atrás (curto, rente à cabeça) */
  c.beginPath(); c.ellipse(-1.6,-3.6,21.6,20.6,0,0,TAU); fs(c,cab);
  c.strokeStyle='rgba(0,0,0,.2)'; c.lineWidth=1; c.beginPath(); c.arc(-3,-2,16,PI*.85,PI*1.3); c.stroke();
  /* rosto */
  el(c,1,0,20,18.6); fs(c,rad(c,3,-1,21,cla(K.pele,.28),K.pele));
  c.save(); el(c,1,0,20,18.6); c.clip(); c.fillStyle=K.peleS; c.globalAlpha=.35; el(c,-17,4,10,20); c.fill(); c.restore();
  var ex1=-.5, ex2=12, ey=1.5;
  if(P.face==='feliz'){ c.strokeStyle='#2a1610'; c.lineWidth=2; c.beginPath(); c.arc(ex1,ey+2,3.6,1.12*PI,1.88*PI); c.stroke(); c.beginPath(); c.arc(ex2,ey+2,3.2,1.12*PI,1.88*PI); c.stroke(); }
  else if(P.face==='tonto'){ c.strokeStyle='#2a1610'; c.lineWidth=1.3; [ex1,ex2].forEach(function(x0,j){ c.beginPath(); for(var a=0;a<TAU*2.2;a+=.3){ var r=a*.6; c.lineTo(x0+Math.cos(a+t*6*(j?-1:1))*r,ey+Math.sin(a+t*6*(j?-1:1))*r); } c.stroke(); }); }
  else { var ryk=P.face==='susto'||P.face==='alto'?1.08:1; olho(c,ex1,ey,4.3,5.8*ryk,K.olho,pisca,false); olho(c,ex2,ey,3.8,5.5*ryk,K.olho,pisca,false); }
  c.fillStyle='rgba(244,114,128,.34)'; el(c,-6.5,9,4.2,2.6); c.fill(); el(c,16.5,8.5,3,2.4); c.fill();
  c.strokeStyle=esc(K.peleS,.15); c.lineWidth=1.2; c.beginPath(); c.moveTo(6.5,4.5); c.quadraticCurveTo(8,6.5,6.2,7.2); c.stroke();
  boca(c,P.boca,6.2,11.4,1);
  /* franja curta (recortada no rosto) */
  c.save(); el(c,1,0,20.6,19.2); c.clip();
  c.beginPath(); c.moveTo(-24,14); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-10.5);
  c.quadraticCurveTo(22.5,-13.5,20.5,-11.2); c.quadraticCurveTo(18.5,-15.2,15.5,-12); c.quadraticCurveTo(12.6,-16.4,9.5,-12.6);
  c.quadraticCurveTo(6.4,-16.6,3,-12.8); c.quadraticCurveTo(-.4,-16,-3.6,-12); c.quadraticCurveTo(-7,-13.2,-8.6,-7.5);
  c.lineTo(-9.6,-1); c.quadraticCurveTo(-10.4,4.5,-12.6,7.5); c.lineTo(-24,14); c.closePath(); fs(c,cab,K.cabS,1);
  c.strokeStyle='rgba(255,255,255,.13)'; c.lineWidth=1; for(var s=0;s<4;s++){ c.beginPath(); c.moveTo(16-s*6,-14+s*.6); c.quadraticCurveTo(8-s*5,-20,-4-s*2,-19.5); c.stroke(); }
  c.restore();
  el(c,1,0,20,18.6); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=2.6; c.beginPath(); c.arc(1,-2,15,1.18*PI,1.5*PI); c.stroke();
  /* redemoinho no alto */
  c.beginPath(); c.moveTo(-9,-19.6); c.quadraticCurveTo(-8,-26.4,-1.5,-27.4); c.quadraticCurveTo(-4.2,-24,-2.6,-21.6); c.quadraticCurveTo(.8,-26.6,6.4,-25.6); c.quadraticCurveTo(3,-22.4,3.4,-19.2); c.closePath(); fs(c,cab,K.cabS,1);
  /* orelha */
  el(c,-12.5,4,3.4,4.4); fs(c,K.pele); c.strokeStyle=K.peleS; c.lineWidth=1; c.beginPath(); c.arc(-12.3,4.3,1.8,-.5*PI,.6*PI); c.stroke();
  /* sobrancelhas */
  if(P.face!=='tonto'){ var by=P.face==='susto'||P.face==='alto'?-12.6:-10.8, inc=P.face==='susto'?-.25:0;
    c.strokeStyle=K.cabS; c.globalAlpha=.9; c.lineWidth=1.3; c.beginPath(); c.moveTo(ex1-3,by+.6-inc*4); c.quadraticCurveTo(ex1,by-1.2,ex1+3,by+.2+inc*4); c.stroke(); c.beginPath(); c.moveTo(ex2-2.6,by+.2+inc*4); c.quadraticCurveTo(ex2,by-1.2,ex2+2.6,by+.6-inc*4); c.stroke(); c.globalAlpha=1; }
  if(K.mergulho){
    c.strokeStyle='#0f172a'; c.lineWidth=3; c.beginPath(); c.ellipse(1,0,20.6,19.2,0,1.05*PI,1.62*PI); c.stroke();
    rr(c,-6.5,-6.5,24,14.5,6); fs(c,'rgba(186,230,253,.38)','#0f766e',2.6); c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.4; c.beginPath(); c.moveTo(-3,-3.5); c.lineTo(1,-3.5); c.stroke();
    c.strokeStyle='#f97316'; c.lineWidth=3.2; c.beginPath(); c.moveTo(-11,6); c.quadraticCurveTo(-16,-4,-15,-24); c.stroke(); c.fillStyle='#0f172a'; rr(c,-17.5,-28,5,5,2); c.fill(); }
}

/* ---------- abaixado: agachado parado / rastejando DE BARRIGA (nunca de quatro) ---------- */
function agacha(c,K,t){
  var r=Math.sin(t*2.6), P={face:'normal',boca:'smile',sw:.35+r*.05,capa:.5,tilt:0};
  sombra(c,20);
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.85,2.85],4,true); c.restore();
  function quadro(){ c.translate(0,-7+r*.3); c.rotate(.22); c.scale(1.05,.64); c.translate(0,18); }
  c.save(); quadro(); braco(c,K,1.05,5,true); torso(c,K); c.restore();
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.75,2.8],-3,false); c.restore();
  c.save(); c.translate(6.5,-36+r*.6); c.rotate(-.04); c.scale(.93,.93); cabeca(c,K,P,t); c.restore();
  c.save(); quadro(); braco(c,K,1.2+r*.03,-4,false); c.restore();
}
function rasteja(c,K,t){
  var f=t*7, s=Math.sin(f), P={face:'normal',boca:'smile',sw:.9,capa:1.4,tilt:0,lN:[s*.12,.08],lF:[-s*.12,.08]};
  c.save(); c.translate(4,0); sombra(c,36,.2); c.restore();
  c.save(); c.translate(s*1.2,0);
  function quadro(){ c.translate(-8,-11); c.rotate(PI/2); c.translate(0,18); }
  c.save(); quadro(); braco(c,K,PI*.72-s*.38,5,true); perna(c,K,P.lF,3,true); perna(c,K,P.lN,-3,false); torso(c,K); c.restore();
  c.save(); c.translate(31,-26+Math.abs(s)*.8); c.rotate(-.06+s*.03); c.scale(.92,.92); cabeca(c,K,P,t); c.restore();
  c.save(); quadro(); braco(c,K,PI*.72+s*.38,-4,false); c.restore();
  c.restore();
}

function leo(c,x,y,estado,t,dir,escala,look){
  var K={q:'leo',pele:LEO.pele,peleS:LEO.peleS,cab:LEO.cab,cabS:LEO.cabS,olho:LEO.olho,cor:(look&&look.cor)||LEO.cor,
    friso:(look&&look.cor)?(claro(look.cor)?'#1e3a8a':'#ffffff'):LEO.friso,calcao:LEO.calcao,capa:(look&&look.capaNuvem)?'#7c3aed':(look&&look.capa),capaNuvem:!!(look&&look.capaNuvem),mergulho:estado==='swim'||!!(look&&look.mergulho)};
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
  if(estado==='fly'||K.capaNuvem) capaVoo(c,K,t);
  braco(c,K,P.aF,5,true);
  perna(c,K,P.lF,3,true);
  perna(c,K,P.lN,-3,false);
  torso(c,K);
  c.save(); c.translate(1,-62); c.rotate(P.tilt); cabeca(c,K,P,t); c.restore();
  braco(c,K,P.aN,-4,false);
  if(estado==='dizzy'){ for(var i=0;i<3;i++){ var a=t*5+i*TAU/3; A.estrela(c,1+Math.cos(a)*20,-90+Math.sin(a)*5,4.5,'#fde047',a); } }
  if(estado==='swim'){ for(var b=0;b<3;b++){ var fb=(t*.9+b/3)%1; c.save(); c.globalAlpha=.75*(1-fb); c.strokeStyle='#e0f2fe'; c.lineWidth=1.3; circ(c,14+Math.sin(fb*9+b)*2,-60-fb*26,2+b*.8+fb*2); c.stroke(); c.restore(); } }
  if(estado==='fly'){ c.save(); c.globalAlpha=.45; c.strokeStyle='#fff'; c.lineWidth=2; for(var v=0;v<3;v++){ var fv=(t*2.2+v/3)%1; c.beginPath(); c.moveTo(-14+v*12,10+fv*30); c.lineTo(-14+v*12,22+fv*30); c.stroke(); } c.restore(); }
  c.restore();
}

function claro(h){ var m=mix(h,h,0).match(/\d+/g); return (+m[0]*.299+(+m[1])*.587+(+m[2])*.114)>170; }
/* embrulho: guarda o A.heroi antigo; só o Leo passa pelo desenho novo */
var heroiAntigo=A.heroi;
A.heroi=function(c,x,y,estado,t,dir,escala,quem,look){
  if(quem==='leo') return leo(c,x,y,estado,t,dir,escala,look);
  return heroiAntigo.apply(this,arguments);
};

/* ============================================================
   CAPA DO LIVRO — A.capaLivro(c,t,sel)
   Capa dura vista de frente: mesa, contracapa e miolo na espessura,
   lombada com nervuras, tecido bordô com textura, moldura dourada
   gravada, cantoneiras de metal, ilustração em arco (castelo, o
   caminho dos reinos, Pip voando, os quatro heróis) e o título em
   letreiro. A faixa y>440 fica livre para o botão do DOM.
   sel (opcional): herói escolhido, que comemora de vez em quando.
   ============================================================ */
var FONTE='"Nunito","Segoe UI Black","Arial Rounded MT Bold","Arial Black",Arial,sans-serif';
var CACHE={};
function cache(key,w,h,fn){ if(CACHE[key]) return CACHE[key]; var cv=document.createElement('canvas'); cv.width=Math.ceil(w*2); cv.height=Math.ceil(h*2); var x=cv.getContext('2d'); x.scale(2,2); x.lineJoin='round'; x.lineCap='round'; fn(x); CACHE[key]=cv; return cv; }
function fonteOk(){ try{ return !document.fonts || document.fonts.check('900 40px "Nunito"'); }catch(e){ return true; } }
function linha(c,x0,y0,x1,y1){ c.beginPath(); c.moveTo(x0,y0); c.lineTo(x1,y1); c.stroke(); }

/* geometria */
var BK={x0:22,x1:890,y0:14,y1:522,lomb:74};          /* capa da frente (com lombada à esquerda) */
var PB={x:104,y:38,w:752,h:412};                       /* caixa do painel da ilustração (cache) */
function painelPath(c,ins){ var x0=118-ins, x1=842+ins, yb=432+ins, ys=104-ins, yt=58-ins, r=14+ins*.5;
  c.moveTo(x0+r,yb); c.quadraticCurveTo(x0,yb,x0,yb-r); c.lineTo(x0,ys); c.bezierCurveTo(x0+2,ys-40,322,yt,480,yt); c.bezierCurveTo(638,yt,x1-2,ys-40,x1,ys); c.lineTo(x1,yb-r); c.quadraticCurveTo(x1,yb,x1-r,yb); c.closePath(); }
function painel(c,ins){ c.beginPath(); painelPath(c,ins||0); }
function cacheP(key,fn){ return cache(key,PB.w,PB.h,function(x){ x.translate(-PB.x,-PB.y); fn(x); }); }
function poeP(c,cv){ c.drawImage(cv,PB.x,PB.y,PB.w,PB.h); }

/* ---------- mesa + livro (estático) ---------- */
function baseLivro(x){
  var i;
  x.fillStyle=lin(x,0,0,0,H,'#3d2416','#1f120a'); x.fillRect(0,0,W,H);
  x.strokeStyle='rgba(255,215,160,.05)'; x.lineWidth=2; for(var y=6;y<H;y+=19){ x.beginPath(); for(var gx=0;gx<=W;gx+=30) x.lineTo(gx,y+Math.sin(gx*.012+y*.7)*3+Math.sin(gx*.05+y)*1); x.stroke(); }
  brilho(x,260,90,620,'rgba(255,214,150,.13)',1);
  /* sombra do livro na mesa */
  x.save(); x.shadowColor='rgba(0,0,0,.65)'; x.shadowBlur=36; x.shadowOffsetX=10; x.shadowOffsetY=16; x.fillStyle='#120a06'; rr(x,BK.x0+6,BK.y0+6,BK.x1-BK.x0+8,BK.y1-BK.y0+6,16); x.fill(); x.restore();
  /* contracapa (atrás, deslocada) e o miolo aparecendo na espessura */
  x.fillStyle=lin(x,0,BK.y0,0,BK.y1,'#5a1522','#3a0c15'); rr(x,BK.x0+8,BK.y0+7,BK.x1-BK.x0+8,BK.y1-BK.y0+4,16); x.fill();
  x.fillStyle=lin(x,BK.x1-20,0,BK.x1+8,0,'#fbf1d8','#d9c391'); rr(x,BK.lomb,BK.y0+3,BK.x1-BK.lomb+5,BK.y1-BK.y0+3,10); x.fill();
  x.strokeStyle='rgba(140,105,55,.35)'; x.lineWidth=.8; for(i=0;i<7;i++){ linha(x,BK.x1+1+i*.6,BK.y0+18,BK.x1+1+i*.6,BK.y1-6); linha(x,BK.lomb+30,BK.y1+1+i*.55,BK.x1-4,BK.y1+1+i*.55); }
  /* capa da frente */
  rr(x,BK.x0,BK.y0,BK.x1-BK.x0,BK.y1-BK.y0,16); x.fillStyle=lin(x,BK.x0,BK.y0,BK.x1,BK.y1,'#a53247','#5c1424'); x.fill();
  x.save(); rr(x,BK.x0,BK.y0,BK.x1-BK.x0,BK.y1-BK.y0,16); x.clip();
  /* trama do tecido */
  x.globalAlpha=1;
  for(y=BK.y0;y<BK.y1;y+=2){ x.fillStyle=(y/2)%2?'rgba(255,255,255,.035)':'rgba(0,0,0,.05)'; x.fillRect(BK.x0,y,BK.x1-BK.x0,1); }
  for(var tx=BK.x0;tx<BK.x1;tx+=2){ x.fillStyle=(tx/2)%2?'rgba(255,255,255,.025)':'rgba(0,0,0,.04)'; x.fillRect(tx,BK.y0,1,BK.y1-BK.y0); }
  for(i=0;i<5200;i++){ var px=BK.x0+hash(i*1.37)*(BK.x1-BK.x0), py=BK.y0+hash(i*2.91+7)*(BK.y1-BK.y0); x.fillStyle=i%3?'rgba(0,0,0,.09)':'rgba(255,220,220,.07)'; x.fillRect(px,py,1+hash(i)*1.6,.8); }
  /* luz da luminária + vinheta */
  brilho(x,300,120,560,'rgba(255,190,190,.16)',1);
  var vg=x.createRadialGradient(480,270,200,480,270,620); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(20,0,6,.45)'); x.fillStyle=vg; x.fillRect(0,0,W,H);
  /* lombada arredondada com nervuras */
  var lg=x.createLinearGradient(BK.x0,0,BK.lomb+12,0); lg.addColorStop(0,'rgba(0,0,0,.45)'); lg.addColorStop(.3,'rgba(255,200,200,.12)'); lg.addColorStop(.62,'rgba(0,0,0,.18)'); lg.addColorStop(.8,'rgba(0,0,0,.5)'); lg.addColorStop(.9,'rgba(255,210,210,.14)'); lg.addColorStop(1,'rgba(0,0,0,0)');
  x.fillStyle=lg; x.fillRect(BK.x0,BK.y0,BK.lomb+12-BK.x0,BK.y1-BK.y0);
  [64,118,404,458].forEach(function(ny){ x.fillStyle='rgba(0,0,0,.35)'; x.fillRect(BK.x0,ny+6,BK.lomb-BK.x0-4,3); x.fillStyle=lin(x,0,ny-5,0,ny+6,'rgba(255,200,200,.28)','rgba(80,10,20,.4)'); rr(x,BK.x0,ny-5,BK.lomb-BK.x0-4,11,5); x.fill();
    x.strokeStyle='rgba(232,190,90,.85)'; x.lineWidth=1.2; linha(x,BK.x0+4,ny-8,BK.lomb-8,ny-8); linha(x,BK.x0+4,ny+10,BK.lomb-8,ny+10); });
  x.save(); x.translate((BK.x0+BK.lomb)/2-2,262); x.rotate(PI/2); x.font='900 15px '+FONTE; x.textAlign='center'; x.textBaseline='middle';
  x.fillStyle='rgba(40,0,8,.6)'; x.fillText('THE  LOST  ENDINGS',1,1.2); x.fillStyle=lin(x,0,-8,0,8,'#fff1b8','#d79b2c'); x.fillText('THE  LOST  ENDINGS',0,0); x.restore();
  [[BK.x0+26,92],[BK.x0+26,432]].forEach(function(p){ A.estrela(x,p[0],p[1],6,'#e3b347',0); });
  x.restore();
  /* bordas da capa: chanfro claro em cima, escuro embaixo */
  x.strokeStyle='rgba(255,210,210,.22)'; x.lineWidth=1.5; rr(x,BK.x0+1,BK.y0+1,BK.x1-BK.x0-2,BK.y1-BK.y0-2,15); x.stroke();
  x.strokeStyle='rgba(30,0,8,.5)'; x.lineWidth=2; x.beginPath(); x.moveTo(BK.x0+16,BK.y1-1); x.lineTo(BK.x1-16,BK.y1-1); x.quadraticCurveTo(BK.x1-1,BK.y1-1,BK.x1-1,BK.y1-16); x.lineTo(BK.x1-1,BK.y0+16); x.stroke();
  /* moldura dourada gravada no tecido (duas linhas + cantos com volutas) */
  function ouro(fn,lw){ x.save(); x.translate(1,1.4); x.strokeStyle='rgba(35,0,8,.6)'; x.lineWidth=lw+.6; fn(); x.restore(); x.strokeStyle='#dcae4c'; x.lineWidth=lw; fn(); x.save(); x.translate(-.5,-.6); x.strokeStyle='rgba(255,236,170,.55)'; x.lineWidth=lw*.4; fn(); x.restore(); }
  ouro(function(){ rr(x,90,24,786,494,12); x.stroke(); },2.6);
  ouro(function(){ rr(x,98,32,770,478,8); x.stroke(); },1.2);
  [[98,32,1,1],[868,32,-1,1],[98,510,1,-1],[868,510,-1,-1]].forEach(function(o){
    ouro(function(){ x.save(); x.translate(o[0],o[1]); x.scale(o[2],o[3]); x.beginPath(); x.moveTo(8,40); x.bezierCurveTo(8,18,16,8,40,8); x.moveTo(14,30); x.bezierCurveTo(20,30,22,22,18,18); x.bezierCurveTo(14,14,8,20,12,24); x.moveTo(30,14); x.bezierCurveTo(30,20,22,22,18,18); x.stroke(); x.restore(); },1.6);
    x.save(); x.translate(o[0]+o[2]*18,o[1]+o[3]*18); A.estrela(x,0,0,3.6,'#f0c75e',0); x.restore(); });
  /* florões na faixa de baixo (laterais — o centro fica para o botão) */
  [[178,480,1],[782,480,-1]].forEach(function(f){ ouro(function(){ x.save(); x.translate(f[0],f[1]); x.scale(f[2],1); x.beginPath(); x.moveTo(-40,0); x.lineTo(16,0); x.moveTo(16,0); x.bezierCurveTo(26,-12,40,-6,34,2); x.bezierCurveTo(30,8,22,4,26,-1); x.moveTo(-20,0); x.bezierCurveTo(-14,-8,-6,-8,-2,0); x.bezierCurveTo(-6,8,-14,8,-20,0); x.stroke(); x.restore(); },1.5); });
  /* cantoneiras de metal nos cantos de fora */
  [[BK.x1,BK.y0,-1,1],[BK.x1,BK.y1,-1,-1]].forEach(function(o){ x.save(); x.translate(o[0],o[1]); x.scale(o[2],o[3]);
    x.save(); x.shadowColor='rgba(0,0,0,.5)'; x.shadowBlur=6; x.shadowOffsetY=2*o[3];
    x.beginPath(); x.moveTo(0,16); x.quadraticCurveTo(0,0,16,0); x.lineTo(54,0); x.quadraticCurveTo(46,8,40,10); x.lineTo(10,40); x.quadraticCurveTo(8,46,0,54); x.closePath();
    x.fillStyle=lin(x,0,0,40,40,'#fff0b0','#b07a22'); x.fill(); x.restore();
    x.strokeStyle='rgba(90,50,10,.7)'; x.lineWidth=1.2; x.beginPath(); x.moveTo(0,16); x.quadraticCurveTo(0,0,16,0); x.lineTo(54,0); x.quadraticCurveTo(46,8,40,10); x.lineTo(10,40); x.quadraticCurveTo(8,46,0,54); x.closePath(); x.stroke();
    x.strokeStyle='rgba(255,250,215,.7)'; x.lineWidth=1; x.beginPath(); x.moveTo(6,40); x.lineTo(6,16); x.quadraticCurveTo(6,6,16,6); x.lineTo(40,6); x.stroke();
    [[14,14],[30,9],[9,30]].forEach(function(p){ x.fillStyle='#8a5a16'; circ(x,p[0],p[1],2.6); x.fill(); x.fillStyle='#fff6cc'; circ(x,p[0]-.7,p[1]-.8,1); x.fill(); });
    x.restore(); });
  /* sulco da dobradiça (entre lombada e capa) */
  var dg=x.createLinearGradient(BK.lomb-2,0,BK.lomb+12,0); dg.addColorStop(0,'rgba(0,0,0,.0)'); dg.addColorStop(.4,'rgba(0,0,0,.45)'); dg.addColorStop(.7,'rgba(255,200,200,.15)'); dg.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=dg; x.fillRect(BK.lomb-2,BK.y0+2,14,BK.y1-BK.y0-4);
}

/* ---------- moldura dourada do painel (estático) ---------- */
function molduraPainel(x){
  /* sombra interna sobre a ilustração */
  x.save(); painel(x,0); x.clip(); x.strokeStyle='rgba(40,10,0,.35)'; x.lineWidth=16; painel(x,0); x.stroke(); x.strokeStyle='rgba(40,10,0,.25)'; x.lineWidth=6; painel(x,0); x.stroke(); x.restore();
  /* sombra do aro sobre o tecido */
  x.save(); x.shadowColor='rgba(20,0,5,.6)'; x.shadowBlur=10; x.shadowOffsetY=3; x.beginPath(); painelPath(x,11); painelPath(x,0); x.fillStyle='#b8862e'; x.fill('evenodd'); x.restore();
  /* aro com degradê metálico */
  x.beginPath(); painelPath(x,11); painelPath(x,0); var g=x.createLinearGradient(0,40,0,450); g.addColorStop(0,'#fff0b0'); g.addColorStop(.25,'#e2b04e'); g.addColorStop(.5,'#b37c22'); g.addColorStop(.75,'#e8bd5c'); g.addColorStop(1,'#8f5e16'); x.fillStyle=g; x.fill('evenodd');
  x.strokeStyle='rgba(80,40,5,.85)'; x.lineWidth=1.4; painel(x,11); x.stroke(); painel(x,0); x.stroke();
  x.strokeStyle='rgba(255,246,205,.8)'; x.lineWidth=1; painel(x,9.6); x.stroke();
  /* fio de contas no meio do aro */
  x.save(); x.setLineDash([.1,5]); x.lineCap='round'; x.strokeStyle='rgba(120,70,10,.75)'; x.lineWidth=2.6; painel(x,5.5); x.stroke(); x.strokeStyle='rgba(255,245,200,.9)'; x.lineWidth=1.1; x.translate(-.4,-.5); painel(x,5.5); x.stroke(); x.restore();
  /* fecho da ogiva (topo) e medalhões dos cantos de baixo */
  x.save(); x.translate(480,52); x.fillStyle=lin(x,0,-12,0,12,'#fff3c0','#a8741c'); x.beginPath(); x.moveTo(0,-13); x.lineTo(13,0); x.lineTo(0,13); x.lineTo(-13,0); x.closePath(); x.fill(); x.strokeStyle='rgba(80,40,5,.85)'; x.lineWidth=1.2; x.stroke(); A.estrela(x,0,0,6,'#fffbe6',0); x.restore();
  [[118-5,432+5],[842+5,432+5]].forEach(function(p){ x.fillStyle=rad(x,p[0],p[1],9,'#fff6c8','#9c6a18'); circ(x,p[0],p[1],9); x.fill(); x.strokeStyle='rgba(80,40,5,.85)'; x.lineWidth=1.2; x.stroke(); x.fillStyle='#7f1d2d'; circ(x,p[0],p[1],3.4); x.fill(); });
}

/* ---------- ilustração: céu, montanhas, colinas, aldeia, caminho ---------- */
function ceuPainel(x){
  var g=x.createLinearGradient(0,PB.y,0,340); g.addColorStop(0,'#4a68c4'); g.addColorStop(.38,'#8fb2ea'); g.addColorStop(.7,'#ffd9ad'); g.addColorStop(1,'#ffbf94'); x.fillStyle=g; x.fillRect(PB.x,PB.y,PB.w,PB.h);
  x.fillStyle='#fff'; for(var i=0;i<26;i++){ x.globalAlpha=.25+hash(i+4)*.4; circ(x,PB.x+hash(i*3.1)*PB.w,PB.y+20+hash(i*7.3)*90,hash(i)*1.1+.4); x.fill(); } x.globalAlpha=1;
}
function longePainel(x){
  /* serra distante */
  x.fillStyle=lin(x,0,230,0,330,'#a6a3dd','#c9bfe6'); x.beginPath(); x.moveTo(PB.x,330);
  [[104,286],[150,262],[196,282],[238,250],[292,290],[340,276],[380,296],[580,296],[620,272],[668,288],[716,248],[768,280],[812,258],[856,284],[856,330]].forEach(function(p){ x.lineTo(p[0],p[1]); }); x.closePath(); x.fill();
  x.fillStyle='rgba(255,255,255,.55)'; [[238,250],[716,248]].forEach(function(p){ x.beginPath(); x.moveTo(p[0]-12,p[1]+12); x.lineTo(p[0],p[1]); x.lineTo(p[0]+13,p[1]+13); x.lineTo(p[0]+5,p[1]+9); x.lineTo(p[0]-2,p[1]+14); x.closePath(); x.fill(); });
  /* mar à direita (o reino do recife) */
  x.fillStyle=lin(x,0,300,0,336,'#5fb8e8','#2f86c6'); x.beginPath(); x.moveTo(612,336); x.quadraticCurveTo(640,304,700,302); x.lineTo(856,300); x.lineTo(856,336); x.closePath(); x.fill();
  x.strokeStyle='rgba(255,255,255,.7)'; x.lineWidth=1.2; for(var i=0;i<7;i++){ var wx=660+i*26+(i%2)*9, wy=309+(i%3)*7; x.beginPath(); x.arc(wx,wy,5,PI*1.1,PI*1.9); x.stroke(); }
  x.fillStyle='#f5f1e8'; x.beginPath(); x.moveTo(790,304); x.lineTo(790,284); x.lineTo(804,302); x.closePath(); x.fill(); x.fillStyle='#7c4a25'; x.fillRect(782,304,24,3);
  /* bruma */
  var b=x.createLinearGradient(0,250,0,340); b.addColorStop(0,'rgba(255,240,225,0)'); b.addColorStop(1,'rgba(255,240,225,.45)'); x.fillStyle=b; x.fillRect(PB.x,250,PB.w,90);
  /* colina do castelo */
  x.fillStyle=lin(x,0,322,0,360,'#a9d38c','#86bd70'); x.beginPath(); x.moveTo(340,370); x.bezierCurveTo(380,330,430,326,480,326); x.bezierCurveTo(530,326,580,330,620,370); x.closePath(); x.fill();
}
/* caminho dos reinos: spline com largura crescente (do portão do castelo ao primeiro plano) */
var CAM=[[480,329],[522,344],[500,358],[420,374],[402,396],[458,420],[488,454]];
function camPonto(u){ var n=CAM.length-1, f=Math.min(n-1e-6,u*n), i=Math.floor(f), s=f-i;
  var p0=CAM[Math.max(0,i-1)], p1=CAM[i], p2=CAM[i+1], p3=CAM[Math.min(n,i+2)];
  function cr(a,b,cc,d){ return .5*((2*b)+(-a+cc)*s+(2*a-5*b+4*cc-d)*s*s+(-a+3*b-3*cc+d)*s*s*s); }
  return [cr(p0[0],p1[0],p2[0],p3[0]),cr(p0[1],p1[1],p2[1],p3[1])]; }
function camLarg(u){ return 8+Math.pow(u,1.5)*118; }
function caminho(x){
  /* desenhado como faixa de traços arredondados num plano achatado (perspectiva do chão): sem auto-cruzamento nas curvas */
  var M=96, P=[], K=.5, i, L=[], R=[];
  for(i=0;i<=M;i++) P.push(camPonto(i/M));
  function tira(extra,cor,dy,fat){ x.save(); x.translate(0,dy||0); x.scale(1,K); x.strokeStyle=cor; x.lineCap='round';
    for(var i=0;i<M;i++){ x.lineWidth=camLarg((i+.5)/M)*(fat||1)+extra; x.beginPath(); x.moveTo(P[i][0],P[i][1]/K); x.lineTo(P[i+1][0],P[i+1][1]/K); x.stroke(); } x.restore(); }
  tira(5,'rgba(60,90,30,.28)',3); tira(3.4,'#b98a4c'); tira(0,'#efd096'); tira(-2,'#f5dda8',-.6,.8); tira(0,'rgba(255,248,225,.55)',-.8,.32);
  for(i=0;i<=M;i++){ var a=P[Math.max(0,i-1)], b=P[Math.min(M,i+1)], tx=b[0]-a[0], ty=(b[1]-a[1])/K, d=Math.hypot(tx,ty)||1, nx=-ty/d, ny=tx/d, w=camLarg(i/M)/2+1;
    L.push([P[i][0]+nx*w,P[i][1]+ny*w*K]); R.push([P[i][0]-nx*w,P[i][1]-ny*w*K]); }
  for(i=0;i<80;i++){ var u2=.06+hash(i*3.7)*.94, p2=camPonto(u2), w2=camLarg(u2), sx=p2[0]+(hash(i*1.9)-.5)*w2*.62, sy=p2[1]+(hash(i*5.3)-.5)*w2*.2, rs=.9+u2*4.2;
    x.fillStyle='rgba(150,110,60,.35)'; el(x,sx+.6,sy+.8,rs,rs*.55); x.fill(); x.fillStyle=hash(i)>.5?'#fbf0d2':'#e2c891'; el(x,sx,sy,rs,rs*.55); x.fill(); }
  /* tufos na beira do caminho */
  for(i=3;i<=M;i+=4){ [L[i],R[i]].forEach(function(p,k){ var hh=2+i/M*5, sx=p[0]+(hash(i+k*31)-.5)*3; x.strokeStyle=hash(i*3+k)>.5?'#4f9a40':'#6cb556'; x.lineWidth=.8+i/M*.9;
    [-1,0,1].forEach(function(j){ x.beginPath(); x.moveTo(sx+j*hh*.25,p[1]+1); x.quadraticCurveTo(sx+j*hh*.3,p[1]-hh*.5,sx+j*hh*.6,p[1]-hh*(j?0.8:1.05)); x.stroke(); }); }); }
}
function estadioMini(x,cx,cy,s){
  x.save(); x.translate(cx,cy); x.scale(s,s);
  x.fillStyle='#64748b'; el(x,0,4,40,15); x.fill(); x.fillStyle='#ef4444'; el(x,0,0,38,13); x.fill(); x.fillStyle='#2563eb'; x.beginPath(); x.ellipse(0,0,38,13,0,0,PI); x.fill();
  x.fillStyle='#4caf50'; el(x,0,0,27,8); x.fill(); x.strokeStyle='#fff'; x.lineWidth=1; el(x,0,0,24,6.5); x.stroke(); linha(x,0,-6.5,0,6.5);
  [-34,34].forEach(function(d){ x.strokeStyle='#475569'; x.lineWidth=1.6; linha(x,d,0,d,-26); x.fillStyle='#fffbe6'; rr(x,d-5,-31,10,6,2); x.fill(); brilho(x,d,-28,12,'rgba(255,250,200,.85)',.8); });
  x.restore();
}
function pertoPainel(x){
  /* colina da esquerda (aldeia + floresta) */
  x.fillStyle=lin(x,0,330,0,420,'#93cf74','#6cb055'); x.beginPath(); x.moveTo(PB.x,350); x.bezierCurveTo(170,330,260,334,320,350); x.bezierCurveTo(370,364,400,380,420,420); x.lineTo(PB.x,420); x.closePath(); x.fill();
  /* colina da direita (estádio) */
  x.fillStyle=lin(x,0,334,0,420,'#8ccb70','#66aa52'); x.beginPath(); x.moveTo(560,420); x.bezierCurveTo(600,370,660,346,740,344); x.bezierCurveTo(800,343,840,350,PB.x+PB.w,356); x.lineTo(PB.x+PB.w,420); x.closePath(); x.fill();
  /* floresta (borda esquerda) */
  if(N.arvoreR){ N.arvoreR(x,132,356,74,'#2f6b4a','#3f8a5a','#5a3a2a'); N.arvoreR(x,166,350,58,'#255a40','#357a50','#5a3a2a'); N.arvoreR(x,300,356,40,'#2f6b4a','#4b9a5e','#5a3a2a'); }
  /* aldeia */
  if(N.casa){ x.save(); x.translate(196,354); x.scale(.3,.3); N.casa(x,-90,0,150,104,62,{teto:'#c4553b',jan:'#3f8f5a'},0); N.casa(x,80,10,128,128,66,{teto:'#4f6fae',jan:'#c2410c'},0); x.restore(); }
  if(N.cogumelo){ N.cogumelo(x,334,372,.42,'#d9433b','#fff7ed',null,0); N.cogumelo(x,350,376,.28,'#4cc3dd','#e0fbff',null,0); }
  /* estádio + biscoito gigante na colina da direita */
  estadioMini(x,770,350,1.15);
  if(N.biscoitoG){ x.fillStyle='rgba(60,90,30,.3)'; el(x,830,384,15,3); x.fill(); N.biscoitoG(x,828,370,14,.3,7); }
  if(N.arvoreR){ N.arvoreR(x,640,372,38,'#2f6b4a','#4b9a5e','#5a3a2a'); }
  /* primeiro plano */
  x.fillStyle=lin(x,0,392,0,452,'#74c25e','#4f9b44'); x.beginPath(); x.moveTo(PB.x,412); x.bezierCurveTo(260,394,380,392,480,396); x.bezierCurveTo(600,392,720,396,PB.x+PB.w,410); x.lineTo(PB.x+PB.w,PB.y+PB.h); x.lineTo(PB.x,PB.y+PB.h); x.closePath(); x.fill();
  x.fillStyle='rgba(255,255,255,.12)'; x.beginPath(); x.moveTo(PB.x,412); x.bezierCurveTo(260,394,380,392,480,396); x.bezierCurveTo(600,392,720,396,PB.x+PB.w,410); x.lineTo(PB.x+PB.w,414); x.bezierCurveTo(720,400,600,396,480,400); x.bezierCurveTo(380,396,260,398,PB.x,416); x.closePath(); x.fill();
  caminho(x);
  /* grama e flores do primeiro plano (fora do caminho) */
  for(var i=0;i<140;i++){ var gx=PB.x+hash(i*2.3)*PB.w, gy=402+hash(i*4.1)*34; if(Math.abs(gx-470)<70+(gy-400)) continue; var hh=3+hash(i)*5; x.fillStyle=hash(i+9)>.5?'#5aa64a':'#89cf6c'; x.beginPath(); x.moveTo(gx-2,gy); x.lineTo(gx+(hash(i+1)-.5)*3,gy-hh); x.lineTo(gx+2,gy); x.fill(); }
  var FL=['#f472b6','#fde047','#ffffff','#f87171','#a78bfa'];
  if(N.flor) for(i=0;i<26;i++){ var fx=PB.x+16+hash(i*7.7)*(PB.w-32), fy=406+hash(i*3.3)*26; if(Math.abs(fx-470)<80+(fy-400)) continue; N.flor(x,fx,fy,1.8+hash(i)*.8,FL[i%5]); }
}

/* raios do sol atrás do castelo */
function sol(c,t){
  brilho(c,480,292,300,'rgba(255,236,180,.95)',.75);
  c.save(); c.translate(480,292); c.rotate(t*.025);
  for(var i=0;i<16;i++){ var a=i*TAU/16, al=.07+.04*Math.sin(t*.9+i*1.7); c.fillStyle='rgba(255,248,220,'+al.toFixed(3)+')'; c.beginPath(); c.moveTo(0,0); c.arc(0,0,520,a,a+TAU/40); c.closePath(); c.fill(); }
  c.restore();
  brilho(c,480,292,90,'rgba(255,252,235,.95)',.8);
}

/* ---------- título em letreiro ---------- */
var TIT={txt:'The Lost Endings', cx:480, by:136, R:1500, maxW:640, S:82};
function letras(x){
  var arr=[], tot=0, track=1.2, i, S=TIT.S;
  function med(S){ arr=[]; tot=0; for(i=0;i<TIT.txt.length;i++){ var ch=TIT.txt[i], s=i<4?S*.68:S; x.font='900 '+s+'px '+FONTE; var w=x.measureText(ch).width; arr.push({ch:ch,s:s,w:w}); tot+=w+track; } tot-=track; }
  med(S); if(tot>TIT.maxW){ med(S*TIT.maxW/tot); }
  var acc=0, a0=-tot/2/TIT.R;
  arr.forEach(function(L){ var a=a0+(acc+L.w/2)/TIT.R; L.a=a; L.x=TIT.cx+TIT.R*Math.sin(a); L.y=TIT.by+TIT.R-TIT.R*Math.cos(a); acc+=L.w+track; });
  return arr;
}
function cada(x,arr,fn){ arr.forEach(function(L){ if(L.ch===' ') return; x.save(); x.translate(L.x,L.y); x.rotate(L.a); x.font='900 '+L.s+'px '+FONTE; x.textAlign='center'; x.textBaseline='alphabetic'; fn(L); x.restore(); }); }
function faceTitulo(f,arr){
  cada(f,arr,function(L){ var g=f.createLinearGradient(0,-L.s*.74,0,L.s*.06); g.addColorStop(0,'#fffbe2'); g.addColorStop(.36,'#ffd84f'); g.addColorStop(.7,'#f6a019'); g.addColorStop(1,'#de5a12'); f.fillStyle=g; f.fillText(L.ch,0,0); });
  f.globalCompositeOperation='source-atop';
  cada(f,arr,function(L){ f.fillStyle='rgba(255,255,255,.5)'; f.beginPath(); f.moveTo(-L.w*.6,-L.s*.5); f.quadraticCurveTo(0,-L.s*.6,L.w*.6,-L.s*.52); f.lineTo(L.w*.6,-L.s*.42); f.quadraticCurveTo(0,-L.s*.5,-L.w*.6,-L.s*.4); f.closePath(); f.fill();
    f.fillStyle='rgba(170,50,0,.22)'; f.fillRect(-L.w,-L.s*.1,L.w*2,L.s*.2); });
  f.globalCompositeOperation='source-over';
}
/* fita com o subtítulo, no mesmo arco do título */
function fita(x){
  var cx=TIT.cx, cy=TIT.by+TIT.R, Rt=TIT.R-34, Rb=Rt-32, th=176/Rt, dt=12/Rt, to=50/Rt;
  function P(a,r){ return [cx+r*Math.sin(a), cy-r*Math.cos(a)]; }
  function poly(pts){ x.beginPath(); pts.forEach(function(p,k){ if(k) x.lineTo(p[0],p[1]); else x.moveTo(p[0],p[1]); }); x.closePath(); }
  [-1,1].forEach(function(s){
    var ai=s*(th-dt), ao=s*(th+to), an=s*(th+to-14/Rt);
    poly([P(ai,Rt-10),P(ao,Rt-10),P(an,(Rt+Rb)/2-10),P(ao,Rb-10),P(ai,Rb-10)]); x.fillStyle=lin(x,0,cy-Rt,0,cy-Rb+10,'#e6cf98','#b8955a'); x.fill(); x.strokeStyle='#5a2a0e'; x.lineWidth=1.8; x.stroke();
    poly([P(s*th,Rb),P(ai,Rb-10),P(s*th,Rb-10)]); x.fillStyle='#7d5a2a'; x.fill(); x.stroke();
  });
  x.save(); x.shadowColor='rgba(40,10,0,.45)'; x.shadowBlur=8; x.shadowOffsetY=4;
  x.beginPath(); x.arc(cx,cy,Rt,-PI/2-th,-PI/2+th); x.arc(cx,cy,Rb,-PI/2+th,-PI/2-th,true); x.closePath();
  var g=x.createLinearGradient(0,cy-Rt,0,cy-Rb); g.addColorStop(0,'#fffaf0'); g.addColorStop(.55,'#f6e7c4'); g.addColorStop(1,'#e2c890'); x.fillStyle=g; x.fill(); x.restore();
  x.strokeStyle='#5a2a0e'; x.lineWidth=1.8; x.beginPath(); x.arc(cx,cy,Rt,-PI/2-th,-PI/2+th); x.arc(cx,cy,Rb,-PI/2+th,-PI/2-th,true); x.closePath(); x.stroke();
  x.strokeStyle='#c9952f'; x.lineWidth=1.3; x.beginPath(); x.arc(cx,cy,Rt-4,-PI/2-th+.002,-PI/2+th-.002); x.stroke(); x.beginPath(); x.arc(cx,cy,Rb+4,-PI/2-th+.002,-PI/2+th-.002); x.stroke();
  /* subtítulo em arco */
  var txt='An English adventure', sz=21, tr=1.1, ws=[], tot=0, i;
  x.font='800 '+sz+'px '+FONTE; for(i=0;i<txt.length;i++){ var w=x.measureText(txt[i]).width; ws.push(w); tot+=w+tr; } tot-=tr;
  var rb=(Rt+Rb)/2-7, acc=0, a0=-tot/2/rb;
  for(i=0;i<txt.length;i++){ var a=a0+(acc+ws[i]/2)/rb, p=P(a,rb); acc+=ws[i]+tr; if(txt[i]===' ') continue; x.save(); x.translate(p[0],p[1]); x.rotate(a); x.font='800 '+sz+'px '+FONTE; x.textAlign='center'; x.textBaseline='alphabetic'; x.fillStyle='#7a1f2b'; x.fillText(txt[i],0,0); x.restore(); }
  [-1,1].forEach(function(s){ var p=P(s*(th-22/Rt),(Rt+Rb)/2); A.estrela(x,p[0],p[1],5.2,'#c9952f',0); });
}
function titulo(x,face){
  var arr=letras(x), k, OUT='#2a0c06';
  fita(x);
  /* sombra projetada */
  x.save(); x.shadowColor='rgba(25,5,10,.6)'; x.shadowBlur=22; x.shadowOffsetX=6; x.shadowOffsetY=16;
  cada(x,arr,function(L){ x.lineWidth=11; x.strokeStyle=OUT; x.strokeText(L.ch,2,11); x.fillStyle=OUT; x.fillText(L.ch,2,11); }); x.restore();
  /* profundidade (letras em relevo) */
  for(k=11;k>=1;k--) cada(x,arr,function(L){ x.lineWidth=11; x.strokeStyle=OUT; x.strokeText(L.ch,k*.18,k); });
  for(k=10;k>=1;k--) cada(x,arr,function(L){ x.fillStyle=mix('#c2621c','#6a2a0a',k/10); x.fillText(L.ch,k*.18,k); });
  /* contorno + aro creme */
  cada(x,arr,function(L){ x.lineWidth=10; x.strokeStyle=OUT; x.strokeText(L.ch,0,0); });
  cada(x,arr,function(L){ x.lineWidth=4.4; x.strokeStyle='#fff1c2'; x.strokeText(L.ch,0,0); });
  x.drawImage(face,0,0,W,260);
  /* ornamentos: estrelinhas nas pontas do arco */
  var e=arr[0], z=arr[arr.length-1];
  [[e.x-38,e.y-46,7],[e.x-24,e.y-74,4.5],[z.x+34,z.y-50,7],[z.x+20,z.y-78,4.5]].forEach(function(s){ A.estrela(x,s[0],s[1],s[2]+1.6,'#5a2a0e',0); A.estrela(x,s[0],s[1],s[2],'#ffd84f',0); });
  return arr;
}
var ARR=null;
function cacheTitulo(fk){
  var face=cache('capaFace'+fk,W,260,function(f){ faceTitulo(f,letras(f)); });
  return cache('capaTitulo'+fk,W,260,function(x){ ARR=titulo(x,face); });
}
/* reflexo que atravessa o título de tempos em tempos */
var SH=null;
function reflexo(c,face,t){
  var ciclo=6, f=(t%ciclo)/1.4; if(f>1) return;
  if(!SH){ SH=document.createElement('canvas'); SH.width=face.width; SH.height=face.height; }
  var x=SH.getContext('2d'); x.setTransform(1,0,0,1,0,0); x.clearRect(0,0,SH.width,SH.height); x.drawImage(face,0,0);
  x.globalCompositeOperation='source-atop'; x.setTransform(2,0,0,2,0,0);
  var bx=60+f*860, g=x.createLinearGradient(bx-60,0,bx+60,0); g.addColorStop(0,'rgba(255,255,255,0)'); g.addColorStop(.5,'rgba(255,255,255,.85)'); g.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=g; x.beginPath(); x.moveTo(bx-40,0); x.lineTo(bx+60,0); x.lineTo(bx+20,260); x.lineTo(bx-80,260); x.closePath(); x.fill();
  x.globalCompositeOperation='source-over';
  c.drawImage(SH,0,0,W,260);
}

A.capaLivro=function(c,t,sel){
  t=t||0; var fk=fonteOk()?'n':'f', i;
  c.save(); c.lineJoin='round'; c.lineCap='round';
  c.drawImage(cache('capaBase',W,H,baseLivro),0,0,W,H);
  /* ---- ilustração ---- */
  c.save(); painel(c,0); c.clip();
  poeP(c,cacheP('capaCeu',ceuPainel));
  sol(c,t);
  if(N.nuvemF){ N.nuvemF(c,170+Math.sin(t*.25)*10,214,.62,'#ffffff','#dbe5f6',.85); N.nuvemF(c,610+Math.sin(t*.2+1)*12,232,.48,'#ffffff','#e3d9f2',.75);
    /* o reino das nuvens: ilha de nuvem com balão */
    N.nuvemF(c,742,262,.8,'#ffffff','#d3def3',.95); if(N.balao) N.balao(c,792,226,.36,['#f87171','#fde68a'],t); }
  poeP(c,cacheP('capaLonge',longePainel));
  if(N.castelo) N.castelo(c,480,330,.6,t);
  poeP(c,cacheP('capaPerto',pertoPainel));
  /* poeira mágica no caminho */
  for(i=0;i<9;i++){ var u=((t*.05+i/9)%1), p=camPonto(u), a=Math.sin(t*3+i*2.1); if(a>0){ c.save(); c.globalAlpha=a*.85; cintila(c,p[0]+Math.sin(i*5)*camLarg(u)*.3,p[1]-4-u*6,2+u*4.5,'#fffbe0'); c.restore(); } }
  /* páginas perdidas voando */
  if(A.paginaVoando){ [[318,250,0],[650,206,2.2]].forEach(function(q,k){ c.save(); c.translate(q[0]+Math.sin(t*.7+k)*8,q[1]+Math.sin(t*1.1+k*2)*6); c.scale(.55,.55); A.paginaVoando(c,0,0,t*.9+q[2]); c.restore(); }); }
  /* Pip voando, com rastro de brilho */
  var px=214+Math.sin(t*.6)*10, py=268+Math.sin(t*1.2)*5;
  for(i=0;i<6;i++){ var fr=(t*.8+i/6)%1; c.save(); c.globalAlpha=(1-fr)*.8; cintila(c,px-30-fr*70,py-28+Math.sin(fr*6+i)*8+fr*10,(1-fr)*4+1,'#fff3b0'); c.restore(); }
  /* (recorte logo acima dos pés: a sombra de chão do Pip não aparece no céu) */
  if(A.pip){ c.save(); c.beginPath(); c.rect(px-120,py-160,240,159); c.clip(); A.pip(c,px,py,'fly',t,1,.9); c.restore(); }
  /* os quatro heróis no primeiro plano, olhando para o caminho */
  var HS=[['lia',272,1],['theo',362,1],['bia',598,-1],['leo',688,-1]];
  if(A.CN&&A.CN.bola){ c.fillStyle='rgba(0,0,0,.22)'; el(c,658,425,8,2); c.fill(); A.CN.bola(c,658,417,7.5); }
  HS.forEach(function(h,k){ var est=(sel&&sel===h[0]&&(t%3.2)<1.25)?'cheer':'idle'; if(sel===h[0]){ brilho(c,h[1],424,46,'rgba(255,236,150,.8)',.55+.2*Math.sin(t*3)); } A.heroi(c,h[1],425,est,t+k*.7,h[2],1.15,h[0]); });
  /* luz quente de fim de tarde */
  var lg=c.createLinearGradient(0,PB.y,0,PB.y+PB.h); lg.addColorStop(0,'rgba(255,255,255,0)'); lg.addColorStop(.75,'rgba(255,200,140,0)'); lg.addColorStop(1,'rgba(120,60,20,.18)'); c.fillStyle=lg; c.fillRect(PB.x,PB.y,PB.w,PB.h);
  c.restore();
  c.drawImage(cache('capaMoldura',W,H,molduraPainel),0,0,W,H);
  /* ---- título ---- */
  var tc=cacheTitulo(fk); c.drawImage(tc,0,0,W,260);
  reflexo(c,CACHE['capaFace'+fk],t);
  if(ARR){ for(i=0;i<5;i++){ var L=ARR[[1,5,8,11,14][i]], tw=Math.sin(t*2.2+i*1.9); if(L&&tw>.3){ c.save(); c.globalAlpha=(tw-.3)/.7; c.translate(L.x,L.y); c.rotate(L.a); cintila(c,L.w*.25,-L.s*.66,3+5*(tw-.3),'#fffdf0'); c.restore(); } } }
  c.restore();
};
A.capaLivro.LIVRE_Y=440;
})();
