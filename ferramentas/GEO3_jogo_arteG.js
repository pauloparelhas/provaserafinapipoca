/* ============================================================
   GEO3_jogo_arteG.js — Guardiões da Casa Maior (Geografia 3º tri).
   Arte nova 1/5: os HERÓIS. Carrega depois de GEO3_jogo_arteC.js e
   antes de GEO3_jogo_alias.js; troca A.heroi por dentro, mantendo
   nome, assinatura, âncora (pés em x,y), ~95 px na escala 1 e todos os
   estados (idle walk jump fall cheer dizzy crouch crawl swim fly ride kick).
   Os 4 guardiões (ordem do Paulo, 08/11) são personagens de livros lidos no ano: 'lia' = SERAFINA,
   'bia' = CHAPEUZINHO VERMELHO, 'theo' = TISTU, 'leo' = MENINO DO BISCOITO. Traços: tabela HEROIS abaixo.
   No voo (poder "asas do Bem-te-vi") a mochila ganha asas amarelas e marrons.
   Óculos de nadar (U4 S14 Pantanal) no lugar da máscara. Sem imagem, sem emoji.
   ============================================================ */
(function(){
'use strict';
var A=window.ARTE; if(!A||!A.ING) return;
var PI=Math.PI, TAU=PI*2, rr=A.rr, el=A.el, circ=A.circ, lin=A.lin;
var I=A.ING, OL=I.OL, esc=I.esc, cla=I.cla, fs=I.fs, rad=I.rad, sombra=I.sombra, brilho=I.brilho, cintila=I.cintila, olho=I.olho, boca=I.boca;

/* ---------- os 4 guardiões (ordem do Paulo, 08/11): personagens de LIVROS lidos no ano, 2 meninas e 2 meninos;
   nenhum nome de criança real da turma. Chaves do motor entre parênteses (nomes internos não mudam).
   lia  = SERAFINA               menina de 8 anos, aventureira: pele morena, duas tranças, bandana na cor escolhida,
                                 sardas, camiseta na cor escolhida, colete cáqui de explorador, bermuda verde-oliva,
                                 botinhas, mochila verde-água.
   bia  = CHAPEUZINHO VERMELHO   (livro do ano): capa e capuz vermelhos (sempre vermelhos), cachinhos ruivos, blusa
                                 branca de manga bufante, corpete e saia na cor escolhida, sapatinhos, cestinha de vime
                                 na mão. Sem mochila (a capa fica no lugar; as asas do Bem-te-vi saem da capa).
   theo = TISTU                  ("O menino do dedo verde", indicado na U4 S5 "Indo além"): cabelo loiro, sardas,
                                 chapéu de palha de jardineiro, camisa na cor escolhida, jardineira verde com folhinha
                                 no bolso, botas de jardim; o polegar brilha verde e um brotinho nasce dele (só visual).
   leo  = MENINO DO BISCOITO     ("Se você der um biscoito a um rato", Laura Numeroff, lido no Inglês): cabelo
                                 castanho liso com franja, camiseta de listras na cor escolhida, bermuda azul-marinho,
                                 tênis; o ratinho de companhia vai sentado em cima da mochila, com o biscoito.      */
var HEROIS={
  lia: {pele:'#c98b60',peleS:'#a3683f',cab:'#4a2c17',cabS:'#2b170a',olho:'#3b2112',cor:'#f97316',cilio:true,  moch:'#0d9488', mochB:'#fbbf24'},
  bia: {pele:'#f5d0b5',peleS:'#e0a98a',cab:'#b5562b',cabS:'#7c3413',olho:'#4a2a12',cor:'#fde68a',cilio:true,  moch:'#dc2626', mochB:'#fde68a'},
  theo:{pele:'#fcdcc4',peleS:'#eab08f',cab:'#f2d16b',cabS:'#c59a2a',olho:'#2f6b2f',cor:'#f59e0b',cilio:false, moch:'#7c4a25', mochB:'#4ade80'},
  leo: {pele:'#f1c9a5',peleS:'#d4a079',cab:'#6b3e1e',cabS:'#3f2212',olho:'#3b2112',cor:'#2563eb',cilio:false, moch:'#16a34a', mochB:'#fde047'}
};
A.HEROIS=HEROIS;
A.HEROIS_ORDEM=['lia','bia','theo','leo'];

function pose(e,t){
  var P={bob:0,rot:0,sx:1,sy:1,lean:0,aN:.12,aF:-.1,lN:[0,.05],lF:[0,.05],tilt:0,face:'normal',boca:'smile',capa:.4,sw:.2,corpo:0,sent:0};
  var s,k;
  switch(e){
    case 'walk': s=Math.sin(t*11); P.bob=-Math.abs(Math.cos(t*11))*2.4; P.lN=[s*.62,Math.max(0,-s)*.75+.1]; P.lF=[-s*.62,Math.max(0,s)*.75+.1];
      P.aN=-s*.75; P.aF=s*.75; P.lean=.06; P.sw=.45+Math.abs(s)*.15; P.capa=1.4+Math.abs(s); P.tilt=s*.03; break;
    case 'kick': P.lF=[1.45,.08]; P.lN=[-.18,.12]; P.aN=-.7; P.aF=1.0; P.lean=-.1; P.boca='open'; P.face='feliz'; P.sw=.3; P.capa=1.2; break;
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

/* ---------- asa do Bem-te-vi (amarela com borda marrom), pivô na raiz ---------- */
function asaBem(c,ang,longe,s){
  c.save(); c.rotate(ang); c.scale(s||1,s||1);
  c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-8,-18,-18,-28); c.quadraticCurveTo(-24,-18,-30,-20); c.quadraticCurveTo(-28,-10,-34,-8); c.quadraticCurveTo(-24,-3,-26,3); c.quadraticCurveTo(-12,1,0,4); c.closePath();
  fs(c,lin(c,0,-28,-30,4,longe?'#d9b240':'#fde047',longe?'#7a5a1e':'#b7791f'),'#5b3a12',1.2);
  c.strokeStyle=longe?'#6b4a16':'#8a5a2b'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-2,1); c.lineTo(-18,-28); c.moveTo(-3,2); c.lineTo(-30,-20); c.moveTo(-4,3); c.lineTo(-34,-8); c.stroke();
  c.restore();
}
/* ---------- mochila (atrás das costas; o herói olha para +x). Chapeuzinho leva a CAPA vermelha no lugar;
   o Menino do Biscoito leva o ratinho sentado em cima da mochila ---------- */
function mochila(c,K,P,t,voa){
  var mc=K.moch, k=P.capa||0, sw=Math.sin(t*8)*Math.min(1.5,Math.abs(k)*.4), dy=Math.min(0,k)*1.2;
  c.save(); c.translate(-10+sw*.4,-34+dy);
  if(K.q==='bia'){ /* capa vermelha de Chapeuzinho: balança com o passo */
    var bal=Math.sin(t*6)*Math.min(6,Math.abs(k)*2.2)-Math.max(0,k)*3;
    c.beginPath(); c.moveTo(8,-12); c.quadraticCurveTo(-6-bal,-2,-9-bal*1.4,20); c.quadraticCurveTo(0,24,12,21); c.lineTo(13,-6); c.closePath(); fs(c,lin(c,-9,-12,12,20,'#ef4444','#991b1b'),'#7f1d1d',1.2);
    c.strokeStyle='rgba(255,255,255,.18)'; c.lineWidth=1.5; c.beginPath(); c.moveTo(4,-8); c.quadraticCurveTo(-2-bal*.5,4,-3-bal,17); c.stroke(); }
  if(voa||K.capaNuvem){ var flap=voa?Math.sin(t*12)*.55:Math.sin(t*3)*.12;
    c.save(); c.translate(-2,-9); asaBem(c,-.25-flap,true,1); c.restore();
    c.save(); c.translate(-6,-6); asaBem(c,-.05-flap*.9,false,1.08); c.restore(); }
  if(K.q!=='bia'){
    c.fillStyle='rgba(0,0,0,.14)'; rr(c,-7,-11,16,26,6); c.fill();
    rr(c,-9,-13,16,26,6); fs(c,lin(c,-9,-13,7,13,cla(mc,.15),esc(mc,.28)));
    c.beginPath(); c.moveTo(-9,-7); c.lineTo(7,-7); c.lineTo(7,-9); c.quadraticCurveTo(7,-14,2,-14); c.lineTo(-4,-14); c.quadraticCurveTo(-9,-14,-9,-9); c.closePath(); fs(c,lin(c,0,-14,0,-7,cla(K.mochB,.2),esc(K.mochB,.1)),esc(K.mochB,.45),1);
    rr(c,-6,0,10,9,3); fs(c,esc(mc,.35),esc(mc,.5),1); c.fillStyle='#fde047'; circ(c,-1,-5,1.8); c.fill(); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-6,-10); c.lineTo(-6,9); c.stroke();
    if(K.q==='leo') ratinho(c,-15,-19,t); }   /* o ratinho espia por trás do ombro, fora da cabeça */
  c.restore();
}
/* ratinho de companhia (do livro "Se você der um biscoito a um rato"): sentado em cima da mochila, com o biscoito */
function ratinho(c,x,y,t){
  c.save(); c.translate(x,y); var ob=Math.sin(t*2.2)*.6;
  c.strokeStyle='#9ca3af'; c.lineWidth=1.3; c.beginPath(); c.moveTo(-5,1); c.quadraticCurveTo(-11,3,-12,-4+ob); c.stroke();   /* rabo */
  el(c,0,-1,6.5,5); fs(c,lin(c,-6,-6,6,4,'#d1d5db','#9ca3af'),'#4b5563',1);                                                     /* corpo */
  [[-3,-6],[3,-6]].forEach(function(p){ circ(c,p[0],p[1]+ob*.4,2.6); fs(c,'#d1d5db','#4b5563',.9); circ(c,p[0],p[1]+ob*.4,1.4); fs(c,'#fda4af'); });   /* orelhas */
  el(c,2,-2.5+ob*.3,4.6,3.8); fs(c,'#e5e7eb','#4b5563',.9);                                                                      /* cabeça */
  c.fillStyle='#111827'; circ(c,1.2,-3.2+ob*.3,.8); c.fill(); circ(c,4,-3.2+ob*.3,.8); c.fill(); c.fillStyle='#f472b6'; circ(c,6.2,-1.8+ob*.3,1); c.fill();
  c.strokeStyle='#6b7280'; c.lineWidth=.6; c.beginPath(); c.moveTo(6,-1.5); c.lineTo(9,-2.5); c.moveTo(6,-1); c.lineTo(9,0); c.stroke();
  circ(c,-1,1.5,2.6); fs(c,'#d9a05b','#92400e',.8); c.fillStyle='#5b2d0e'; circ(c,-1.8,1,.6); c.fill(); circ(c,0,2.2,.6); c.fill();   /* o biscoito nas patinhas */
  c.restore();
}
function alca(c,K){ if(K.q==='bia') return; c.strokeStyle=esc(K.moch,.25); c.lineWidth=3.2; c.beginPath(); c.moveTo(-3,-45); c.quadraticCurveTo(3,-36,5,-27); c.stroke(); c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=1; c.beginPath(); c.moveTo(-3,-45); c.quadraticCurveTo(3,-36,5,-27); c.stroke(); }

/* ---------- braço (pivô no ombro): manga curta na cor escolhida + antebraço de pele.
   Chapeuzinho: a cestinha pendurada na mão de lá. Tistu: o dedo verde (brilho e brotinho) na mão de cá ---------- */
function braco(c,K,a,sx,longe,t,estado){
  var q=K.q, pele=longe?esc(K.pele,.12):K.pele, cor=longe?esc(K.cor,.18):K.cor;
  c.save(); c.translate(sx,-41); c.rotate(-a);
  if(K.mergulho){ rr(c,-3.6,-3,7.2,16.5,3.6); fs(c,lin(c,-3,0,3,0,longe?'#183052':'#2a4f82',longe?'#0f2038':'#16304f')); c.fillStyle=cor; c.fillRect(-3.6,4,7.2,2); circ(c,0,15.6,3.9); fs(c,pele); c.restore(); return; }
  if(q==='bia'){ rr(c,-3.7,-3,7.4,12,3.5); fs(c,lin(c,-3,0,3,0,'#ffffff','#d6d3d1')); c.fillStyle=cor; c.fillRect(-3.7,8,7.4,2.2); }   /* manga bufante branca com barra na cor do vestido */
  else { rr(c,-3.7,-3,7.4,9,3.5); fs(c,lin(c,-3,0,3,0,cla(cor,.12),esc(cor,.15))); }
  if(q==='leo'){ c.fillStyle='rgba(255,255,255,.85)'; c.fillRect(-3.7,1,7.4,2); }                /* listra da camiseta */
  if(q==='lia'){ c.fillStyle=longe?'#b9a46c':'#d6c08a'; rr(c,-4,-3.4,8,4.2,2); c.fill(); }      /* cava do colete */
  rr(c,-3.3,4,6.6,9,3.3); fs(c,lin(c,-3,0,3,0,cla(pele,.08),esc(pele,.08)));
  circ(c,0,15.4,3.9); fs(c,pele);
  if(q==='bia'&&longe&&estado!=='crawl'){ /* cestinha de vime pendurada na mão */
    c.save(); c.translate(0,15.4); c.rotate(a); c.strokeStyle='#92400e'; c.lineWidth=1.4; c.beginPath(); c.arc(0,9,5.5,PI,0); c.stroke();
    c.beginPath(); c.moveTo(-7,9); c.lineTo(7,9); c.lineTo(5.5,18); c.lineTo(-5.5,18); c.closePath(); fs(c,lin(c,0,9,0,18,'#e0b36a','#a16207'),'#7c4a12',1);
    c.strokeStyle='rgba(120,53,15,.5)'; c.lineWidth=.8; c.beginPath(); c.moveTo(-6,12); c.lineTo(6,12); c.moveTo(-5.5,15); c.lineTo(5.5,15); c.stroke();
    c.fillStyle='#f8fafc'; c.beginPath(); c.moveTo(-6,9); c.quadraticCurveTo(-2,5,2,9); c.quadraticCurveTo(5,5,7,9); c.closePath(); c.fill(); c.fillStyle='#dc2626'; circ(c,-2,7.5,1.1); c.fill(); circ(c,4,7.6,1.1); c.fill(); c.restore(); }
  if(q==='theo'&&!longe){ /* o dedo verde: o polegar brilha e um brotinho nasce dele */
    var g=.55+.45*Math.sin(t*3); c.save(); c.globalAlpha=.35+.25*g; c.fillStyle='#86efac'; circ(c,2,16.5,6+g*1.5); c.fill(); c.restore();
    c.fillStyle='#4ade80'; circ(c,2.4,16.8,1.6); c.fill();
    c.strokeStyle='#15803d'; c.lineWidth=1.1; c.beginPath(); c.moveTo(3,16); c.quadraticCurveTo(5,13,5,10-g); c.stroke(); c.fillStyle='#4ade80'; c.beginPath(); c.moveTo(5,10-g); c.quadraticCurveTo(9,8-g,8,12-g); c.quadraticCurveTo(6,12-g,5,10-g); c.fill(); c.beginPath(); c.moveTo(5,11-g); c.quadraticCurveTo(1,9-g,2,13-g); c.quadraticCurveTo(4,13-g,5,11-g); c.fill(); }
  c.restore();
}
/* ---------- perna (coxa + canela, pivô no quadril) ---------- */
function perna(c,K,L,hxx,longe){
  var q=K.q, d=longe?.16:0, pele=esc(K.pele,d);
  if(K.mergulho){ c.save(); c.translate(hxx,-18); c.rotate(-L[0]); rr(c,-3.9,-3,7.8,13,3.9); fs(c,esc('#24466f',d)); c.translate(0,9); c.rotate(L[1]); rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,esc('#1f3b63',d));
    c.beginPath(); c.moveTo(-4.5,6); c.lineTo(4.5,6); c.quadraticCurveTo(15,9,19,13); c.quadraticCurveTo(8,15.5,-4,12.5); c.closePath(); fs(c,lin(c,0,6,0,14,esc(K.cor,d),esc(K.cor,d+.3))); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; c.beginPath(); c.moveTo(4,9); c.lineTo(15,12); c.stroke(); c.restore(); return; }
  var coxa= q==='lia'?esc('#6b7a3a',d) : q==='bia'?esc(K.cor,d) : q==='theo'?esc('#3f7d2a',d) : esc('#1e3a8a',d);
  c.save(); c.translate(hxx,-18); c.rotate(-L[0]);
  rr(c,-3.9,-3,7.8,13,3.9); fs(c,coxa);
  if(q==='bia'){ c.fillStyle='rgba(255,255,255,.9)'; c.fillRect(-3.9,8.2,7.8,1.8); }           /* barra branca da saia */
  if(q==='leo'){ c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(-3.9,7,7.8,1.6); }
  if(q==='theo'){ c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=.9; c.beginPath(); c.moveTo(-3.9,7.5); c.lineTo(3.9,7.5); c.stroke(); }
  if(q==='lia'){ c.fillStyle='rgba(0,0,0,.14)'; rr(c,-2.2,3,4.4,4,1); c.fill(); }
  c.translate(0,9); c.rotate(L[1]);
  rr(c,-3.7,-2,7.4,11.5,3.7); fs(c,pele);
  rr(c,-4.1,5.2,8.2,3.6,1.6); fs(c,esc('#f8fafc',d));                                            /* meia */
  if(q==='lia'){ el(c,2.4,10.2,6.6,4.1); fs(c,esc('#7c4a25',d)); c.fillStyle=esc('#4a2a12',d); el(c,2.6,12.4,6.8,1.6); c.fill(); c.strokeStyle=esc('#f6c445',d); c.lineWidth=1; c.beginPath(); c.moveTo(-1,7.4); c.lineTo(3,7.4); c.moveTo(-1,9.2); c.lineTo(3.5,9.2); c.stroke(); }   /* botinha */
  else if(q==='bia'){ el(c,2.4,10.2,6.6,3.9); fs(c,esc('#7f1d1d',d)); c.fillStyle='rgba(255,255,255,.35)'; el(c,3.5,8.6,3,1); c.fill(); c.strokeStyle=esc('#7f1d1d',d); c.lineWidth=1.2; c.beginPath(); c.moveTo(-1,7.5); c.lineTo(6,7.5); c.stroke(); }   /* sapatinho vermelho-escuro */
  else if(q==='theo'){ el(c,2.4,10.2,6.8,4.1); fs(c,esc('#5b3a1a',d)); c.fillStyle=esc('#3b2512',d); el(c,2.6,12.4,7,1.6); c.fill(); c.fillStyle='rgba(255,255,255,.25)'; el(c,3.5,8.4,3,1); c.fill(); }   /* bota de jardim */
  else { el(c,2.4,10.2,6.6,3.9); fs(c,esc('#f8fafc',d)); c.fillStyle=esc(K.cor,d); rr(c,-4,11.6,13,2.4,1.1); c.fill(); c.strokeStyle=esc(K.cor,d+.1); c.lineWidth=1; c.beginPath(); c.moveTo(1,8.2); c.lineTo(4.5,7.6); c.stroke(); }   /* tênis */
  c.restore();
}
/* ---------- tronco ---------- */
function torso(c,K,P,t){
  var q=K.q, cor=K.cor;
  if(K.mergulho){ rr(c,-11,-47,22,32,10); fs(c,lin(c,-11,-47,11,-15,'#2f5a92','#14294a'));
    c.save(); rr(c,-11,-47,22,32,10); c.clip(); c.fillStyle=cor; c.beginPath(); c.moveTo(-12,-30); c.lineTo(12,-42); c.lineTo(12,-37); c.lineTo(-12,-25); c.fill(); c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(-7,-46,3,30); c.restore();
    c.strokeStyle='#cbd5e1'; c.lineWidth=1.2; c.beginPath(); c.moveTo(2,-46); c.lineTo(2,-33); c.stroke(); circ(c,2,-46,1.4); c.fillStyle='#e5e7eb'; c.fill(); return; }
  if(q==='bia'){ /* Chapeuzinho: blusa branca, corpete na cor do vestido com laçada, saia (nas pernas) */
    rr(c,-11,-47,22,27,8); fs(c,lin(c,-11,-47,11,-20,'#ffffff','#d6d3d1'));
    c.beginPath(); c.moveTo(-6,-47); c.quadraticCurveTo(0,-41,6,-47); c.closePath(); fs(c,cla(K.pele,.1),OL,1);
    rr(c,-9,-38,18,16,3); fs(c,lin(c,-9,-38,9,-22,cla(cor,.1),esc(cor,.2)),esc(cor,.4),1);
    c.strokeStyle='#ffffff'; c.lineWidth=1.1; c.beginPath(); c.moveTo(-5,-36); c.lineTo(5,-33); c.moveTo(-5,-32); c.lineTo(5,-29); c.moveTo(-5,-28); c.lineTo(5,-25); c.stroke();
    c.beginPath(); c.moveTo(-11,-27); c.lineTo(11,-27); c.lineTo(13.6,-13.5); c.quadraticCurveTo(0,-10.6,-13.6,-13.5); c.closePath(); fs(c,lin(c,0,-27,0,-12,esc(cor,.05),esc(cor,.3)));
    c.strokeStyle='rgba(255,255,255,.28)'; c.lineWidth=1; for(var i=-1;i<=1;i++){ c.beginPath(); c.moveTo(i*5,-25); c.lineTo(i*6.4,-13); c.stroke(); }
    c.strokeStyle='#b91c1c'; c.lineWidth=2.2; c.beginPath(); c.moveTo(-6,-46); c.quadraticCurveTo(0,-42,6,-46); c.stroke(); c.fillStyle='#dc2626'; circ(c,0,-43,2.2); c.fill();   /* o laço da capa no pescoço */
    return;
  }
  rr(c,-11,-47,22,27,8); fs(c,lin(c,-11,-47,11,-20,cla(cor,.15),esc(cor,.18)));
  if(q==='leo'){ /* Menino do Biscoito: camiseta de listras horizontais */
    c.save(); rr(c,-11,-47,22,27,8); c.clip(); c.fillStyle='rgba(255,255,255,.9)'; [-42,-35,-28].forEach(function(y){ c.fillRect(-12,y,24,3.2); }); c.restore();
    c.beginPath(); c.moveTo(-6,-47); c.quadraticCurveTo(0,-41,6,-47); c.closePath(); fs(c,cla(K.pele,.1),OL,1);
    rr(c,-11.5,-22.5,23,4,2); fs(c,'#1e3a8a'); rr(c,-2,-23,4,5,1); fs(c,'#fbbf24','#92400e',.8);
  } else if(q==='theo'){ /* Tistu: jardineira verde de jardineiro sobre a camisa, com um bolso de sementes */
    c.beginPath(); c.moveTo(-6,-47); c.quadraticCurveTo(0,-41,6,-47); c.closePath(); fs(c,cla(K.pele,.1),OL,1);
    rr(c,-8,-38,16,18,2.5); fs(c,lin(c,-8,-38,8,-20,'#65a30d','#3f7d2a'),'#2f5e1f',1);
    c.strokeStyle='#2f5e1f'; c.lineWidth=3; c.beginPath(); c.moveTo(-6,-37); c.lineTo(-9,-46); c.moveTo(6,-37); c.lineTo(9,-46); c.stroke();
    c.fillStyle='#fde047'; circ(c,-5.5,-36,1.6); c.fill(); circ(c,5.5,-36,1.6); c.fill();
    c.fillStyle='rgba(255,255,255,.2)'; rr(c,-4,-31,8,6,1.5); c.fill(); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=.8; rr(c,-4,-31,8,6,1.5); c.stroke();
    c.fillStyle='#4ade80'; c.beginPath(); c.moveTo(1,-31); c.quadraticCurveTo(4,-36,2,-38); c.quadraticCurveTo(-1,-35,1,-31); c.fill();   /* folhinha saindo do bolso */
    rr(c,-11.5,-22.5,23,4,2); fs(c,'#2f5e1f');
  } else { /* Serafina: colete cáqui de explorador aberto, com bolsos e a folhinha de guardiã */
    c.beginPath(); c.moveTo(-6,-47); c.quadraticCurveTo(0,-41,6,-47); c.closePath(); fs(c,cla(K.pele,.1),OL,1);
    [[-11,-10.5],[3.5,11]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],-46); c.lineTo(p[1],-46); c.lineTo(p[1],-22); c.lineTo(p[0],-22); c.closePath(); fs(c,lin(c,p[0],0,p[1],0,'#e2cf9a','#c6ae72'),'#8a7340',1); });
    c.fillStyle='#b89c5e'; rr(c,-9.5,-32,5.5,5,1); c.fill(); rr(c,5,-32,5,5,1); c.fill(); c.strokeStyle='#8a7340'; c.lineWidth=.8; rr(c,-9.5,-32,5.5,5,1); c.stroke(); rr(c,5,-32,5,5,1); c.stroke();
    c.save(); c.translate(7.6,-38.5); c.rotate(-.4); c.beginPath(); c.moveTo(0,3.4); c.quadraticCurveTo(-4.2,0,0,-3.8); c.quadraticCurveTo(4.2,0,0,3.4); c.closePath(); fs(c,'#4ade80','#166534',.9); c.strokeStyle='#166534'; c.lineWidth=.7; c.beginPath(); c.moveTo(0,2.6); c.lineTo(0,-3); c.stroke(); c.restore();
    rr(c,-11.5,-22.5,23,4,2); fs(c,'#7c4a25'); rr(c,-2,-23,4,5,1); fs(c,'#f6c445','#b7791f',.8);
  }
  alca(c,K);
}
/* ---------- trança (elos de cabelo empilhados, pivô no alto) ---------- */
function tranca(c,K,n,bal,cor){
  var cab=K.cab; c.save(); c.rotate(bal);
  for(var i=0;i<n;i++){ var r=3.8-i*.25; el(c,Math.sin(i*2.4)*.9,i*5.2+2,r+.6,r); fs(c,i%2?cab:cla(cab,.1),K.cabS,.9); }
  c.translate(0,n*5.2+3); c.fillStyle=cor; rr(c,-2.6,-1.5,5.2,3,1.2); c.fill(); c.strokeStyle=esc(cor,.3); c.lineWidth=.7; rr(c,-2.6,-1.5,5.2,3,1.2); c.stroke();
  c.fillStyle=K.cab; c.beginPath(); c.moveTo(-2,1.5); c.lineTo(0,6.5); c.lineTo(2,1.5); c.closePath(); c.fill();
  c.restore();
}
/* ---------- cabeça (origem no centro; olha para +x) ---------- */
function cabeca(c,K,P,t){
  var q=K.q, cab=lin(c,-20,-22,20,10,cla(K.cab,.12),K.cabS), pisca=(t%3.6)<.11 && P.face==='normal', bal=P.sw+Math.sin(t*3)*.05;
  /* cabelo de trás (e o capuz de Chapeuzinho, o chapéu de palha de Tistu) */
  if(q==='lia'){ el(c,-2,-3,21.6,20.6); fs(c,cab);
    c.save(); c.translate(-17,-6); tranca(c,K,4,.5+bal*.6,K.cor); c.restore(); c.save(); c.translate(-9,2); tranca(c,K,4,.12+bal*.4,K.cor); c.restore(); }
  else if(q==='bia'){ el(c,-3,-4,24,23); fs(c,lin(c,-20,-26,14,16,'#ef4444','#b91c1c'),'#7f1d1d',1.3);   /* capuz: roda o rosto */
    el(c,-2,-2,21,20); fs(c,cab); }
  else if(q==='theo'){ el(c,-2,-3,21.6,20.6); fs(c,cab); }
  else { el(c,-2,-3,21.6,20.6); fs(c,cab); }
  /* rosto */
  el(c,1,0,20,18.6); fs(c,rad(c,3,-1,21,cla(K.pele,.28),K.pele));
  c.save(); el(c,1,0,20,18.6); c.clip(); c.fillStyle=K.peleS; c.globalAlpha=.35; el(c,-17,4,10,20); c.fill(); c.restore();
  var ex1=-.5, ex2=12, ey=1.5;
  if(P.face==='feliz'){ c.strokeStyle='#2a1610'; c.lineWidth=2; c.beginPath(); c.arc(ex1,ey+2,3.6,1.12*PI,1.88*PI); c.stroke(); c.beginPath(); c.arc(ex2,ey+2,3.2,1.12*PI,1.88*PI); c.stroke(); }
  else if(P.face==='tonto'){ c.strokeStyle='#2a1610'; c.lineWidth=1.3; [ex1,ex2].forEach(function(x0,j){ c.beginPath(); for(var a=0;a<TAU*2.2;a+=.3){ var r=a*.6; c.lineTo(x0+Math.cos(a+t*6*(j?-1:1))*r,ey+Math.sin(a+t*6*(j?-1:1))*r); } c.stroke(); }); }
  else { var ryk=P.face==='susto'||P.face==='alto'?1.08:1; olho(c,ex1,ey,4.3,5.8*ryk,K.olho,pisca,K.cilio); olho(c,ex2,ey,3.8,5.5*ryk,K.olho,pisca,K.cilio); }
  c.fillStyle='rgba(244,114,128,.38)'; el(c,-6.5,9,4.2,2.6); c.fill(); el(c,16.5,8.5,3,2.4); c.fill();
  if(q==='lia'||q==='theo'){ c.fillStyle='rgba(90,50,20,.4)'; [[-8,8],[-5,10.5],[-2.5,8.3],[14,8],[17,10.2],[19.5,7.8]].forEach(function(p){ circ(c,p[0],p[1],.75); c.fill(); }); }   /* sardas */
  c.strokeStyle=esc(K.peleS,.15); c.lineWidth=1.2; c.beginPath(); c.moveTo(6.5,4.5); c.quadraticCurveTo(8,6.5,6.2,7.2); c.stroke();
  boca(c,P.boca,6.2,11.4,1);
  /* franja / cabelo da frente */
  c.save(); el(c,1,0,20.6,19.2); c.clip();
  if(q==='lia'){ c.beginPath(); c.moveTo(-24,16); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-3); c.quadraticCurveTo(21,-10,16,-4.5); c.quadraticCurveTo(12,-11.5,6,-6); c.quadraticCurveTo(1,-12.5,-4,-6.5); c.quadraticCurveTo(-9,-11,-11,-2); c.lineTo(-13,7); c.quadraticCurveTo(-16,13,-24,16); c.closePath(); fs(c,cab,K.cabS,1); }
  else if(q==='bia'){ c.beginPath(); c.moveTo(-24,16); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-9); c.quadraticCurveTo(18,-14,10,-9); c.quadraticCurveTo(4,-14,-2,-8); c.quadraticCurveTo(-8,-12,-11,-3); c.quadraticCurveTo(-13,8,-18,14); c.closePath(); fs(c,cab,K.cabS,1); }   /* cachinhos ruivos saindo do capuz */
  else if(q==='theo'){ c.beginPath(); c.moveTo(-24,16); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-6); c.lineTo(21,-10); c.lineTo(17,-4); c.lineTo(12,-11); c.lineTo(7,-5); c.lineTo(2,-12); c.lineTo(-3,-5); c.lineTo(-8,-11); c.lineTo(-11,-2); c.lineTo(-13,6); c.quadraticCurveTo(-16,13,-24,16); c.closePath(); fs(c,cab,K.cabS,1); }   /* franja loira repicada */
  else { c.beginPath(); c.moveTo(-24,16); c.lineTo(-24,-26); c.lineTo(26,-26); c.lineTo(26,-4); c.quadraticCurveTo(14,-9,4,-7); c.quadraticCurveTo(-6,-5,-11,-1); c.lineTo(-13,7); c.quadraticCurveTo(-16,13,-24,16); c.closePath(); fs(c,cab,K.cabS,1); }   /* franja lisa de lado */
  c.restore();
  el(c,1,0,20,18.6); c.strokeStyle=OL; c.lineWidth=1.5; c.stroke();
  c.strokeStyle='rgba(255,255,255,.32)'; c.lineWidth=2.6; c.beginPath(); c.arc(1,-2,15,1.18*PI,1.5*PI); c.stroke();
  /* enfeites por cima do cabelo */
  if(q==='lia'){ /* bandana na cor escolhida */
    c.save(); el(c,1,0,20.6,19.2); c.clip(); c.strokeStyle=K.cor; c.lineWidth=4.2; c.beginPath(); c.moveTo(-21,-9); c.quadraticCurveTo(1,-20,22,-11); c.stroke(); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1.2; c.beginPath(); c.moveTo(-19,-10.5); c.quadraticCurveTo(1,-21,20,-12.5); c.stroke(); c.restore();
    c.save(); c.translate(-17,-11); c.rotate(.2+bal*.3); c.fillStyle=K.cor; c.beginPath(); c.moveTo(0,0); c.lineTo(-7,-5); c.lineTo(-6,1); c.closePath(); c.fill(); c.beginPath(); c.moveTo(0,0); c.lineTo(-7,4); c.lineTo(-3,6); c.closePath(); c.fill(); c.restore(); }
  else if(q==='bia'){ /* a borda do capuz emoldura o rosto */
    c.strokeStyle='#dc2626'; c.lineWidth=5; c.beginPath(); c.ellipse(-1,-1,22.5,21.5,0,.62*PI,1.78*PI); c.stroke(); c.strokeStyle='#7f1d1d'; c.lineWidth=1.2; c.beginPath(); c.ellipse(-1,-1,25,24,0,.62*PI,1.78*PI); c.stroke();
    c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=1.4; c.beginPath(); c.ellipse(-1,-1,21,20,0,1.1*PI,1.5*PI); c.stroke(); }
  else if(q==='theo'){ /* chapéu de palha de jardineiro */
    c.save(); c.translate(0,-14); c.rotate(-.06);
    el(c,0,0,30,6.5); fs(c,lin(c,-30,0,30,0,'#fde68a','#d4a93a'),'#8a6a1c',1.1);
    c.beginPath(); c.moveTo(-15,0); c.quadraticCurveTo(-15,-14,-3,-15); c.quadraticCurveTo(15,-16,15,0); c.closePath(); fs(c,lin(c,0,-15,0,0,'#fef3c7','#e5b84a'),'#8a6a1c',1.1);
    c.fillStyle='#16a34a'; rr(c,-15,-5,30,3.5,1.5); c.fill(); c.strokeStyle='rgba(120,90,20,.35)'; c.lineWidth=.7; for(var h=-8;h<=8;h+=4){ c.beginPath(); c.moveTo(-12,h-8); c.lineTo(12,h-8); c.stroke(); }
    c.restore(); }
  el(c,-12.5,4,3.4,4.4); fs(c,K.pele); c.strokeStyle=K.peleS; c.lineWidth=1; c.beginPath(); c.arc(-12.3,4.3,1.8,-.5*PI,.6*PI); c.stroke();
  if(P.face!=='tonto'){ var by=P.face==='susto'||P.face==='alto'?-12.6:-10.8, inc=P.face==='susto'?-.25:0;
    c.strokeStyle=esc(K.cab,.15); c.globalAlpha=.9; c.lineWidth=1.15; c.beginPath(); c.moveTo(ex1-3,by+.6-inc*4); c.quadraticCurveTo(ex1,by-1.2,ex1+3,by+.2+inc*4); c.stroke(); c.beginPath(); c.moveTo(ex2-2.6,by+.2+inc*4); c.quadraticCurveTo(ex2,by-1.2,ex2+2.6,by+.6-inc*4); c.stroke(); c.globalAlpha=1; }
  if(K.mergulho){ /* óculos de nadar: duas lentes redondas e a tira */
    c.strokeStyle='#0f172a'; c.lineWidth=2.6; c.beginPath(); c.ellipse(1,0,20.6,19.2,0,1.08*PI,1.6*PI); c.stroke();
    [[-.5,1.5,6.4],[12,1.2,6]].forEach(function(l){ circ(c,l[0],l[1],l[2]); fs(c,'rgba(186,230,253,.38)','#0f766e',2.4); c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=1.2; c.beginPath(); c.arc(l[0],l[1],l[2]*.6,1.1*PI,1.45*PI); c.stroke(); });
    c.strokeStyle='#0f766e'; c.lineWidth=2; c.beginPath(); c.moveTo(5.9,1); c.lineTo(6.2,1); c.stroke(); }
}

/* ---------- agachado / rastejando (nunca de quatro: humano agacha ou se arrasta de barriga) ---------- */
function agacha(c,K,t){
  var r=Math.sin(t*2.6), P={face:'normal',boca:'smile',sw:.35+r*.05,capa:.5,tilt:0};
  sombra(c,20);
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.85,2.85],4,true); c.restore();
  function quadro(){ c.translate(0,-7+r*.3); c.rotate(.22); c.scale(1.05,.64); c.translate(0,18); }
  c.save(); quadro(); if(!K.mergulho) mochila(c,K,P,t,false); braco(c,K,1.05,5,true,t,'crouch'); torso(c,K,P,t); c.restore();
  c.save(); c.translate(0,11+r*.3); perna(c,K,[1.75,2.8],-3,false); c.restore();
  c.save(); c.translate(6.5,-36+r*.6); c.rotate(-.04); c.scale(.93,.93); cabeca(c,K,P,t); c.restore();
  c.save(); quadro(); braco(c,K,1.2+r*.03,-4,false,t,'crouch'); c.restore();
}
function rasteja(c,K,t){
  var f=t*7, s=Math.sin(f), P={face:'normal',boca:'smile',sw:.9,capa:1.4,tilt:0,lN:[s*.12,.08],lF:[-s*.12,.08]};
  c.save(); c.translate(4,0); sombra(c,36,.2); c.restore();
  c.save(); c.translate(s*1.2,0);
  function quadro(){ c.translate(-8,-11); c.rotate(PI/2); c.translate(0,18); }
  c.save(); quadro(); if(!K.mergulho) mochila(c,K,P,t,false); braco(c,K,PI*.72-s*.38,5,true,t,'crawl'); perna(c,K,P.lF,3,true); perna(c,K,P.lN,-3,false); torso(c,K,P,t); c.restore();
  c.save(); c.translate(31,-26+Math.abs(s)*.8); c.rotate(-.06+s*.03); c.scale(.92,.92); cabeca(c,K,P,t); c.restore();
  c.save(); quadro(); braco(c,K,PI*.72+s*.38,-4,false,t,'crawl'); c.restore();
  c.restore();
}

A.heroi=function(c,x,y,estado,t,dir,escala,quem,look){
  var H0=HEROIS[quem]||HEROIS.lia; quem=HEROIS[quem]?quem:'lia';
  var K={q:quem,pele:H0.pele,peleS:H0.peleS,cab:H0.cab,cabS:H0.cabS,olho:H0.olho,cilio:H0.cilio,cor:(look&&look.cor)||H0.cor,moch:H0.moch,mochB:H0.mochB,capaNuvem:!!(look&&look.capaNuvem),mergulho:estado==='swim'||!!(look&&look.mergulho)};
  escala=escala||1; dir=dir||1; t=t||0; if(estado==='glide') estado='fly'; /* planando com as asas do Bem-te-vi: mesma pose do voo */
  c.save(); c.translate(x,y); c.scale(dir*escala,escala); c.lineJoin='round'; c.lineCap='round';
  if(estado==='crawl'){ rasteja(c,K,t); c.restore(); return; }
  if(estado==='crouch'){ agacha(c,K,t); c.restore(); return; }
  var P=pose(estado,t);
  if(!P.corpo && !P.sent) sombra(c,17);
  if(P.sent) c.translate(0,18);
  c.translate(0,P.bob);
  if(P.corpo){ c.translate(0,-30); c.rotate(P.corpo); c.translate(0,30); }
  c.rotate(P.rot+P.lean); c.scale(P.sx,P.sy);
  if(!K.mergulho) mochila(c,K,P,t,estado==='fly');
  braco(c,K,P.aF,5,true,t,estado);
  perna(c,K,P.lF,3,true);
  perna(c,K,P.lN,-3,false);
  torso(c,K,P,t);
  c.save(); c.translate(1,-62); c.rotate(P.tilt); cabeca(c,K,P,t); c.restore();
  braco(c,K,P.aN,-4,false,t,estado);
  if(estado==='dizzy'){ for(var i=0;i<3;i++){ var a=t*5+i*TAU/3; A.estrela(c,1+Math.cos(a)*20,-90+Math.sin(a)*5,4.5,'#fde047',a); } }
  if(estado==='swim'){ for(var b=0;b<3;b++){ var fb=(t*.9+b/3)%1; c.save(); c.globalAlpha=.75*(1-fb); c.strokeStyle='#e0f2fe'; c.lineWidth=1.3; circ(c,14+Math.sin(fb*9+b)*2,-60-fb*26,2+b*.8+fb*2); c.stroke(); c.restore(); } }
  if(estado==='fly'){ for(var p=0;p<4;p++){ var fp=(t*1.4+p/4)%1; c.save(); c.globalAlpha=.7*(1-fp); c.translate(-24-fp*22,-20+Math.sin(p*2.1+t*3)*8+fp*6); c.rotate(fp*4+p); c.beginPath(); c.moveTo(0,-4); c.quadraticCurveTo(3,0,0,4); c.quadraticCurveTo(-3,0,0,-4); c.closePath(); fs(c,p%2?'#fde047':'#b7791f',null); c.restore(); } }
  if(estado==='cheer'){ for(var s=0;s<3;s++){ var fs2=(t*1.2+s/3)%1; c.save(); c.globalAlpha=1-fs2; cintila(c,-20+s*20+Math.sin(s*3+t*4)*4,-100-fs2*18,2.5+(1-fs2)*2,'#fef08a'); c.restore(); } }
  c.restore();
};
})();
