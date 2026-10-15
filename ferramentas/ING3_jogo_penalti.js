/* ============================================================
   ING3_jogo_penalti.js — o AMBIENTE DE QUESTÕES do reino 7
   (Cause & Effect Stadium) vira uma cena de PÊNALTI de verdade.
   GAME_DESIGN_v2 B.7 "Ambientação = PÊNALTIS" + C.1.
   - câmera atrás do batedor (o herói escolhido, de lado, em primeiro
     plano), gol grande (x 150–810) com rede em malha e profundidade;
   - as alternativas = placas numeradas penduradas na rede, uma por
     zona do gol (q.cartoes[k] = a ZONA inteira, alvo grande de toque);
   - goleiro de verdade (camisa do time do Conde Rabisco, luvas,
     joelheiras), torcida em 3 fileiras com bandeiras, refletores,
     placar "PENALTY i/3", o juiz (A.morador 'referee') com o balão
     da pergunta e o relógio de 30 s como "shot clock".
   Ao responder (PENALTI.chute): corrida de 3 passos (0,5 s) → chute
   → bola com rotação, rastro e sombra (0,7 s; câmera lenta nos
   últimos 0,2 s). CERTA: goleiro mergulha para o outro lado, a rede
   ESTUFA onde a bola entra, "GOAL!", confete, torcida pula. ERRADA
   ou tempo: o goleiro mergulha e DEFENDE ("POW"), torcida "ohh", a
   zona certa acende verde com a trajetória-fantasma da bola. Depois
   o juiz fala o it.ex e aparece "Next ▶".
   O resultado didático é o do ING3_jogo_quiz.js (este arquivo só
   desenha). Tudo por código, sem imagem e sem emoji.
   ============================================================ */
window.PENALTI = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=960, H=540, PI=Math.PI, TAU=PI*2;
var rr=A.rr, el=A.el, circ=A.circ, lin=A.lin;
var I=A.ING||{}, OL=I.OL||'rgba(48,24,44,.62)';

/* ---------- geometria da cena ---------- */
var GOL={x0:150,x1:810,y0:185,y1:400};          /* boca do gol (plano da linha do gol) */
var FUN={x0:194,x1:766,y0:214,y1:372};          /* fundo da rede (mais longe) */
var SPOT={x:480,y:482}, RB=17, CHAO_BOLA=SPOT.y+RB-1;
var P0={x:330,y:526,s:1.62}, P1={x:444,y:500,s:1.5};    /* batedor: parado / no chute */
var KX=480, KPE=399, KS=.84;                     /* goleiro: x, pés, escala */
var REF={x:78,y:404,s:1.28};                     /* juiz */
var CORRE=.5, VOO=.7, BATE=CORRE+VOO;            /* linha do tempo (s) */
var FALA_T=1.45, NEXT_T=1.6;                     /* juiz fala / botão aparece */
var TEMPO=60;

function F(peso,px){ return peso+' '+px+'px "Nunito","Segoe UI",Arial'; }
function cl(v,a,b){ return v<a?a:(v>b?b:v); }
function lerp(a,b,k){ return a+(b-a)*k; }
function sstep(a,b,v){ var k=cl((v-a)/(b-a),0,1); return k*k*(3-2*k); }
function eOut(k){ k=cl(k,0,1); return 1-Math.pow(1-k,3); }
function hs(n){ var x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x); }
function quebra(c,txt,larg){ var pal=String(txt||'').split(' '), linhas=[], cur=''; pal.forEach(function(w){ var t=cur?cur+' '+w:w; if(c.measureText(t).width>larg&&cur){ linhas.push(cur); cur=w; } else cur=t; }); if(cur) linhas.push(cur); return linhas; }

function ativo(){ var f=J.faseAtual; return !!(f&&f.cena==='estadio'&&!f.chefao&&!J.chefe); }

/* ============================================================
   LAYOUT — cada cartão é uma ZONA do gol (o toque usa o retângulo
   inteiro); a placa desenhada fica pendurada no alto da zona.
   ============================================================ */
function layout(q){
  var n=q.cartoes.length, gap=8, x0=GOL.x0+12, larg=(GOL.x1-GOL.x0-24-gap*(n-1))/n;
  q.cartoes.forEach(function(cd,k){ cd.x=x0+k*(larg+gap); cd.y=GOL.y0+8; cd.w=larg; cd.h=GOL.y1-GOL.y0-12; cd.pl=null; });
  q.lay={tr:!!J.tr, pen:true, n:n}; return q.lay;
}
/* ponto onde a bola entra em cada zona (plano da boca do gol) */
function alvoZona(q,k){ var cd=q.cartoes[k]; return {x:cd.x+cd.w/2+(cd.x+cd.w/2<KX-40?-14:(cd.x+cd.w/2>KX+40?14:0)), y:350}; }
function noFundo(p){ return {x:KX+(p.x-KX)*(FUN.x1-FUN.x0)/(GOL.x1-GOL.x0), y:FUN.y0+(p.y-GOL.y0)*(FUN.y1-FUN.y0)/(GOL.y1-GOL.y0)}; }

/* ============================================================
   CHUTE — chamado pelo quiz em responde(k)
   ============================================================ */
var S=null;
function chute(q,k,ok,t0){
  var n=q.cartoes.length, kk=k;
  if(kk<0){ /* tempo esgotado: chute apressado numa zona errada, o goleiro pega */
    var op=[]; for(var i=0;i<n;i++) if(i!==q.certa) op.push(i);
    op.sort(function(a,b){ return Math.abs(alvoZona(q,a).x-KX)-Math.abs(alvoZona(q,b).x-KX); }); kk=op[0];
  }
  var T=alvoZona(q,kk), TC=alvoZona(q,q.certa), lado;
  /* para onde o goleiro mergulha: no gol, para o lado oposto; na defesa, na bola */
  var mao;
  if(ok){ if(Math.abs(T.x-KX)<60){ lado=hs(t0*7.3)<.5?-1:1; mao={x:KX+lado*230,y:T.y-24}; } else { mao={x:2*KX-T.x,y:T.y-30}; } }
  else mao={x:T.x,y:T.y};
  S={q:q, i:q.i, k:kk, esc:k, ok:ok, t0:t0, T:T, Tb:noFundo(T), TC:TC, mao:mao, sons:{}, conf:null};
  q.penRes=q.penRes||[]; q.penRes[q.i]=ok?1:-1;
  q.minT=NEXT_T;              /* "Next" só depois do lance */
  J.shake=0;                  /* o tremor vem na hora da defesa, não no toque */
}
function tempoDe(q,t){ if(!S||S.q!==q||S.i!==q.i) S=null; return S?Math.max(0,t-S.t0):-1; }

/* posição da bola no voo (u 0..1) */
function bolaVoo(u){
  var a=SPOT, b=S.T, cx=(a.x+b.x)/2, cy=Math.min(a.y,b.y)-46;
  var m=1-u, x=m*m*a.x+2*m*u*cx+u*u*b.x, y=m*m*a.y+2*m*u*cy+u*u*b.y;
  return {x:x, y:y, r:lerp(RB,9,u), sx:lerp(a.x,b.x,u), sy:lerp(CHAO_BOLA,GOL.y1-2,u)};
}
/* câmera lenta: 0,5 s cobrem 85 % do voo; os últimos 0,2 s, 15 % */
function uVoo(e){ var v=e-CORRE; if(v<=0) return 0; if(v<.5) return .85*v/.5; return Math.min(1,.85+.15*(v-.5)/.2); }

/* ============================================================
   FUNDO ESTÁTICO (cache): céu, estrutura, arquibancada, placas de
   publicidade, gramado com faixas, linhas da área, marca do pênalti
   ============================================================ */
var CACHE=null;
function fundo(){
  if(CACHE) return CACHE;
  var cv=document.createElement('canvas'); cv.width=W*2; cv.height=H*2; var c=cv.getContext('2d'); c.scale(2,2); c.lineJoin='round'; c.lineCap='round';
  var i,x,y;
  /* céu noturno */
  c.fillStyle=lin(c,0,0,0,200,'#070b24','#1b2a6b'); c.fillRect(0,0,W,220);
  for(i=0;i<40;i++){ c.fillStyle='rgba(255,255,255,'+(.25+hs(i)*.5)+')'; circ(c,hs(i+3)*W,hs(i+9)*40,.6+hs(i+5)*.9); c.fill(); }
  /* cobertura do estádio */
  c.fillStyle='#10163a'; c.beginPath(); c.moveTo(0,22); c.quadraticCurveTo(480,-4,960,22); c.lineTo(960,40); c.quadraticCurveTo(480,16,0,40); c.closePath(); c.fill();
  c.strokeStyle='rgba(148,163,184,.35)'; c.lineWidth=1.2; for(x=0;x<=W;x+=40){ c.beginPath(); c.moveTo(x,22-Math.sin(x/W*PI)*12); c.lineTo(x,40-Math.sin(x/W*PI)*12); c.stroke(); }
  /* arquibancada: 3 anéis */
  var aneis=[[38,118,'#1e2a63','#16204d'],[118,198,'#24317a','#1a2560'],[198,284,'#2b3a8f','#1f2c70']];
  aneis.forEach(function(a,k){
    c.fillStyle=lin(c,0,a[0],0,a[1],a[2],a[3]); c.fillRect(0,a[0]-Math.round(6*(2-k)),W,a[1]-a[0]+Math.round(6*(2-k)));
    for(y=a[0]+10;y<a[1];y+=14){ c.fillStyle='rgba(255,255,255,.05)'; c.fillRect(0,y,W,2); }
    c.fillStyle='rgba(0,0,0,.35)'; c.fillRect(0,a[1]-4,W,4);
    c.fillStyle='rgba(255,255,255,.08)'; c.fillRect(0,a[1]-6,W,2);
  });
  /* escadas */
  c.fillStyle='rgba(10,14,40,.55)'; [120,360,600,840].forEach(function(sx){ c.beginPath(); c.moveTo(sx-8,34); c.lineTo(sx+8,34); c.lineTo(sx+12,284); c.lineTo(sx-12,284); c.closePath(); c.fill(); });
  /* placas de publicidade (sem marcas reais) */
  c.fillStyle='#0b1030'; c.fillRect(0,284,W,10);
  var pubs=[['STORY CUP','#1d4ed8','#fde047'],['READ MORE!','#16a34a','#fff'],['IF... THEN!','#dc2626','#fff'],['LOST ENDINGS','#7c3aed','#fde68a'],['GO TEAM!','#ea580c','#fff']];
  for(i=0;i<6;i++){ var p=pubs[i%pubs.length], bx=i*172-40; c.fillStyle=lin(c,0,294,0,330,p[1],I.esc?I.esc(p[1],.35):p[1]); c.fillRect(bx,294,170,36); c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(bx,294,170,4); c.fillStyle=p[2]; c.font=F(900,17); c.textAlign='center'; c.textBaseline='middle'; c.fillText(p[0],bx+85,313); c.fillStyle='rgba(0,0,0,.4)'; c.fillRect(bx+168,294,2,36); }
  /* gramado em perspectiva */
  var y0=330, faixas=9, yy=y0;
  for(i=0;i<faixas;i++){ var hh=8+i*i*1.25+i*4; c.fillStyle=i%2?'#3f9d48':'#4cae54'; c.fillRect(0,yy,W,hh+1); yy+=hh; if(yy>H) break; }
  if(yy<H){ c.fillStyle='#4cae54'; c.fillRect(0,yy,W,H-yy); }
  var gg=c.createLinearGradient(0,330,0,H); gg.addColorStop(0,'rgba(10,30,20,.45)'); gg.addColorStop(.35,'rgba(10,30,20,0)'); c.fillStyle=gg; c.fillRect(0,330,W,H-330);
  /* linhas: linha do gol, pequena área, grande área, meia-lua, marca */
  c.strokeStyle='rgba(255,255,255,.88)'; c.lineWidth=3;
  c.beginPath(); c.moveTo(0,GOL.y1+1); c.lineTo(W,GOL.y1+1); c.stroke();
  c.lineWidth=3.4; c.beginPath(); c.moveTo(82,GOL.y1+1); c.lineTo(46,438); c.lineTo(914,438); c.lineTo(878,GOL.y1+1); c.stroke();
  c.lineWidth=4; c.beginPath(); c.moveTo(-40,520); c.lineTo(1000,520); c.stroke();
  c.lineWidth=4; c.beginPath(); c.ellipse(SPOT.x,520,150,26,0,0,PI); c.stroke();
  c.fillStyle='#fff'; el(c,SPOT.x,SPOT.y+RB-1,9,3.4); c.fill();
  /* luz dos refletores lavando o gramado */
  var gl=c.createRadialGradient(480,420,30,480,420,520); gl.addColorStop(0,'rgba(255,250,220,.18)'); gl.addColorStop(1,'rgba(255,250,220,0)'); c.fillStyle=gl; c.fillRect(0,300,W,240);
  CACHE=cv; return cv;
}

/* ---------- refletores (torres nos cantos, piscam de leve) ---------- */
function refletores(c,t){
  [[44,1],[916,-1]].forEach(function(r){
    var x=r[0];
    c.save();
    /* feixe */
    var g=c.createLinearGradient(x,20,x+r[1]*220,330); g.addColorStop(0,'rgba(255,248,214,.30)'); g.addColorStop(1,'rgba(255,248,214,0)');
    c.fillStyle=g; c.beginPath(); c.moveTo(x-30,24); c.lineTo(x+30,24); c.lineTo(x+r[1]*330+120,330); c.lineTo(x+r[1]*120-120,330); c.closePath(); c.fill();
    /* torre */
    c.fillStyle='#0f172a'; c.fillRect(x-4,40,8,250);
    c.strokeStyle='#1e293b'; c.lineWidth=2; for(var yy=50;yy<290;yy+=22){ c.beginPath(); c.moveTo(x-4,yy); c.lineTo(x+4,yy+11); c.stroke(); }
    /* painel de lâmpadas */
    c.translate(x,22); c.rotate(r[1]*.12);
    c.fillStyle='#1f2937'; rr(c,-36,-16,72,34,5); c.fill(); c.strokeStyle='#475569'; c.lineWidth=2; rr(c,-36,-16,72,34,5); c.stroke();
    for(var i=0;i<4;i++) for(var j=0;j<2;j++){ var px=-27+i*18, py=-7+j*15, fl=.85+.15*Math.sin(t*3+i*1.7+j+x);
      var b=c.createRadialGradient(px,py,0,px,py,12); b.addColorStop(0,'rgba(255,255,240,'+fl+')'); b.addColorStop(.45,'rgba(255,244,200,'+(fl*.5)+')'); b.addColorStop(1,'rgba(255,244,200,0)');
      c.fillStyle=b; circ(c,px,py,12); c.fill(); c.fillStyle='#fffbe8'; circ(c,px,py,4.4); c.fill(); }
    c.restore();
  });
}

/* ============================================================
   TORCIDA — 3 fileiras com bandeiras. modo: 'calma' | 'festa' | 'ohh'
   ============================================================ */
var FAS=null;
function torcedores(){
  if(FAS) return FAS;
  FAS=[]; var CAM=['#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#ec4899','#facc15','#f8fafc','#14b8a6','#fb923c'], PEL=['#f1c6a0','#cf9466','#8d5a3b','#e8b48a','#5c3a24','#f6d3b3'];
  var FIL=[{y:116,s:.62,dx:22},{y:196,s:.78,dx:27},{y:282,s:.95,dx:33}];
  FIL.forEach(function(f,r){
    for(var x=-10+(r%2)*f.dx/2;x<W+20;x+=f.dx){ var n=FAS.length+r*91;
      FAS.push({x:x+(hs(n)-.5)*6, y:f.y, s:f.s*(.92+hs(n+1)*.16), cam:CAM[Math.floor(hs(n+2)*CAM.length)], pel:PEL[Math.floor(hs(n+3)*PEL.length)], cab:hs(n+4)<.5?'#2a1a10':(hs(n+4)<.75?'#7c4a1e':'#111'), fase:hs(n+5)*TAU, band:hs(n+6)<.11, bc:[CAM[Math.floor(hs(n+7)*CAM.length)],CAM[Math.floor(hs(n+8)*CAM.length)]], r:r, bone:hs(n+9)<.25}); }
  });
  return FAS;
}
function torcida(c,t,modo,k){
  var L=torcedores();
  for(var i=0;i<L.length;i++){
    var f=L[i], s=f.s, x=f.x, y=f.y, pulo=0, braco=0;
    if(modo==='festa'){ pulo=Math.abs(Math.sin(t*9+f.fase))*14*s*k; braco=1; }
    else if(modo==='ohh'){ braco=2; pulo=-2*s*k; }
    else { pulo=Math.max(0,Math.sin(t*2.2+f.fase))*2*s; braco=Math.sin(t*1.3+f.fase)>.92?1:0; }
    y-=pulo;
    c.save(); c.translate(x,y); c.scale(s,s);
    /* braços */
    c.strokeStyle=f.pel; c.lineWidth=4.2;
    if(braco===1){ var w=Math.sin(t*12+f.fase)*.25; c.beginPath(); c.moveTo(-7,-22); c.lineTo(-13+w*6,-42); c.moveTo(7,-22); c.lineTo(13-w*6,-42); c.stroke(); }
    else if(braco===2){ c.beginPath(); c.moveTo(-7,-22); c.lineTo(-12,-34); c.lineTo(-6,-41); c.moveTo(7,-22); c.lineTo(12,-34); c.lineTo(6,-41); c.stroke(); }
    /* corpo e cabeça */
    c.fillStyle=f.cam; rr(c,-10,-26,20,26,7); c.fill();
    c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(-10,-8,20,8);
    c.fillStyle=f.pel; circ(c,0,-33,8); c.fill();
    if(f.bone){ c.fillStyle=f.bc[0]; c.beginPath(); c.arc(0,-35,8.4,PI,TAU); c.fill(); c.fillRect(-1,-37,12,3); }
    else { c.fillStyle=f.cab; c.beginPath(); c.arc(0,-35,8.4,PI*1.05,PI*1.95); c.fill(); }
    c.fillStyle='#1f1208'; circ(c,-2.8,-33,1.2); c.fill(); circ(c,2.8,-33,1.2); c.fill();
    if(modo==='ohh'){ c.fillStyle='#5c1b1b'; el(c,0,-28.5,1.8,2.4); c.fill(); }
    else if(modo==='festa'){ c.fillStyle='#5c1b1b'; c.beginPath(); c.arc(0,-30,3,0,PI); c.fill(); }
    /* bandeira */
    if(f.band){ var wv=(modo==='festa'?2.2:1)*Math.sin(t*6+f.fase);
      c.strokeStyle='#e5e7eb'; c.lineWidth=2; c.beginPath(); c.moveTo(10,-20); c.lineTo(14,-64); c.stroke();
      c.beginPath(); c.moveTo(14,-64); c.quadraticCurveTo(24,-68+wv*3,36,-63+wv*2); c.lineTo(36,-47+wv*2); c.quadraticCurveTo(24,-52+wv*3,14,-48); c.closePath(); c.fillStyle=f.bc[0]; c.fill();
      c.save(); c.clip(); c.fillStyle=f.bc[1]; c.fillRect(14,-60+wv*2.4,24,5); c.restore(); }
    c.restore();
  }
}

/* ============================================================
   REDE — malha com profundidade; estufa no ponto do gol
   ============================================================ */
function estufa(e){ /* amplitude da rede estufada depois do impacto */
  if(e<0) return 0; if(e<.1) return e/.1;
  return Math.exp(-(e-.1)*1.6)*(.75+.25*Math.cos((e-.1)*10));
}
function rede(c,t,amp,Pb,ondaT){
  var nx=26, ny=9, sig=48, i,j; ondaT=ondaT||0;
  function P(u,v){ var x=lerp(FUN.x0,FUN.x1,u), y=lerp(FUN.y0,FUN.y1,v);
    if(amp>0){ /* a malha abre em volta da bola (células esticadas) e ondula a partir do ponto do gol */
      var dx=x-Pb.x, dy=y-Pb.y, d=Math.sqrt(dx*dx+dy*dy)||1, f=(d/sig)*Math.exp(-(d*d)/(2*sig*sig))*amp, onda=Math.sin(d*.09-ondaT*13)*Math.exp(-ondaT*1.8)*Math.exp(-d/220)*4;
      x+=dx/d*(f*46+onda); y+=dy/d*(f*46+onda)+f*12; }
    y+=Math.sin(t*1.4+u*7)*.6*v;
    return [x,y]; }
  /* fundo escurecido atrás da malha */
  c.fillStyle='rgba(8,14,40,.38)'; c.fillRect(FUN.x0,FUN.y0,FUN.x1-FUN.x0,FUN.y1-FUN.y0);
  /* laterais e teto */
  c.fillStyle='rgba(255,255,255,.05)';
  c.beginPath(); c.moveTo(GOL.x0,GOL.y0); c.lineTo(FUN.x0,FUN.y0); c.lineTo(FUN.x0,FUN.y1); c.lineTo(GOL.x0,GOL.y1); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(GOL.x1,GOL.y0); c.lineTo(FUN.x1,FUN.y0); c.lineTo(FUN.x1,FUN.y1); c.lineTo(GOL.x1,GOL.y1); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(GOL.x0,GOL.y0); c.lineTo(GOL.x1,GOL.y0); c.lineTo(FUN.x1,FUN.y0); c.lineTo(FUN.x0,FUN.y0); c.closePath(); c.fill();
  c.strokeStyle='rgba(235,240,255,.38)'; c.lineWidth=1;
  for(j=0;j<=8;j++){ var v=j/8; /* laterais: linhas horizontais e verticais */
    c.beginPath(); c.moveTo(GOL.x0,lerp(GOL.y0,GOL.y1,v)); c.lineTo(FUN.x0,lerp(FUN.y0,FUN.y1,v)); c.stroke();
    c.beginPath(); c.moveTo(GOL.x1,lerp(GOL.y0,GOL.y1,v)); c.lineTo(FUN.x1,lerp(FUN.y0,FUN.y1,v)); c.stroke(); }
  for(i=1;i<4;i++){ var w=i/4;
    c.beginPath(); c.moveTo(lerp(GOL.x0,FUN.x0,w),lerp(GOL.y0,FUN.y0,w)); c.lineTo(lerp(GOL.x0,FUN.x0,w),lerp(GOL.y1,FUN.y1,w)); c.stroke();
    c.beginPath(); c.moveTo(lerp(GOL.x1,FUN.x1,w),lerp(GOL.y0,FUN.y0,w)); c.lineTo(lerp(GOL.x1,FUN.x1,w),lerp(GOL.y1,FUN.y1,w)); c.stroke(); }
  for(i=0;i<=nx;i++){ var u=i/nx; c.beginPath(); c.moveTo(lerp(GOL.x0,GOL.x1,u),GOL.y0); c.lineTo(lerp(FUN.x0,FUN.x1,u),FUN.y0); c.stroke(); }
  /* bolsão escuro onde a bola estufou */
  if(amp>0&&isFinite(Pb.x)&&isFinite(Pb.y)&&isFinite(sig)&&sig>0){ var g=c.createRadialGradient(Pb.x,Pb.y+4,2,Pb.x,Pb.y+4,sig*1.2); g.addColorStop(0,'rgba(0,0,10,'+(.7*amp)+')'); g.addColorStop(.55,'rgba(0,0,10,'+(.35*amp)+')'); g.addColorStop(1,'rgba(0,0,10,0)'); c.fillStyle=g; circ(c,Pb.x,Pb.y+4,sig*1.6); c.fill(); }
  /* malha do fundo (losangos: diagonais) */
  c.strokeStyle='rgba(240,244,255,.62)'; c.lineWidth=1.15;
  for(i=0;i<=nx;i++){ c.beginPath(); for(j=0;j<=ny;j++){ var p=P(i/nx,j/ny); if(j) c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); } c.stroke(); }
  for(j=0;j<=ny;j++){ c.beginPath(); for(i=0;i<=nx;i++){ var p2=P(i/nx,j/ny); if(i) c.lineTo(p2[0],p2[1]); else c.moveTo(p2[0],p2[1]); } c.stroke(); }
  /* nós da malha mais claros perto do bolsão (a rede esticada brilha) */
  if(amp>.05){ c.fillStyle='rgba(255,255,255,'+(.85*amp)+')'; for(i=0;i<=nx;i++) for(j=0;j<=ny;j++){ var p3=P(i/nx,j/ny), dd=Math.hypot(p3[0]-Pb.x,p3[1]-Pb.y); if(dd<sig*2.4){ circ(c,p3[0],p3[1],1.8); c.fill(); } }
    c.strokeStyle='rgba(255,255,255,'+(.5*amp)+')'; c.lineWidth=2.5; c.beginPath(); c.ellipse(Pb.x,Pb.y+5,sig*1.25*amp+8,sig*.95*amp+6,0,0,TAU); c.stroke(); }
  /* tubos de trás */
  c.strokeStyle='rgba(203,213,225,.75)'; c.lineWidth=3;
  c.beginPath(); c.moveTo(GOL.x0+2,GOL.y0+2); c.lineTo(FUN.x0,FUN.y0); c.lineTo(FUN.x0,FUN.y1); c.lineTo(GOL.x0+2,GOL.y1); c.stroke();
  c.beginPath(); c.moveTo(GOL.x1-2,GOL.y0+2); c.lineTo(FUN.x1,FUN.y0); c.lineTo(FUN.x1,FUN.y1); c.lineTo(GOL.x1-2,GOL.y1); c.stroke();
  c.lineWidth=2.4; c.beginPath(); c.moveTo(FUN.x0,FUN.y1); c.lineTo(FUN.x1,FUN.y1); c.stroke();
}
function traves(c){
  /* sombra no gramado */
  c.fillStyle='rgba(0,0,0,.22)'; c.beginPath(); c.moveTo(GOL.x0-6,GOL.y1+2); c.lineTo(GOL.x1+6,GOL.y1+2); c.lineTo(GOL.x1+30,GOL.y1+12); c.lineTo(GOL.x0-30,GOL.y1+12); c.closePath(); c.fill();
  var g=c.createLinearGradient(0,0,12,0); g.addColorStop(0,'#cbd5e1'); g.addColorStop(.45,'#ffffff'); g.addColorStop(1,'#94a3b8');
  [GOL.x0-6,GOL.x1-6].forEach(function(x){ c.save(); c.translate(x,0); c.fillStyle=g; c.fillRect(0,GOL.y0-6,12,GOL.y1-GOL.y0+8); c.restore(); });
  var g2=c.createLinearGradient(0,GOL.y0-6,0,GOL.y0+6); g2.addColorStop(0,'#ffffff'); g2.addColorStop(1,'#94a3b8');
  c.fillStyle=g2; c.fillRect(GOL.x0-6,GOL.y0-6,GOL.x1-GOL.x0+12,12);
  c.strokeStyle='rgba(30,41,59,.35)'; c.lineWidth=1; c.strokeRect(GOL.x0-6,GOL.y0-6,GOL.x1-GOL.x0+12,12);
}

/* ============================================================
   PLACAS (as respostas) penduradas na rede
   ============================================================ */
function placa(c,q,cd,t,rev,escolhida,balanco){
  var est=rev?cd.estado:(escolhida?'mira':'normal');
  var cores={normal:['#fffbeb','#f59e0b','#1e1b3a','#7c4a1e'],mira:['#fef9c3','#eab308','#1e1b3a','#7c4a1e'],certa:['#dcfce7','#16a34a','#14532d','#166534'],errada:['#fee2e2','#dc2626','#7f1d1d','#991b1b'],apagada:['rgba(255,251,235,.55)','rgba(245,158,11,.4)','rgba(30,27,58,.55)','rgba(124,74,30,.5)']}[est];
  var pw=Math.min(cd.w-14,232), px=cd.x+(cd.w-pw)/2, py=GOL.y0+21;
  /* texto */
  /* texto: encolhe a fonte até caber na placa (altura máx. 112: a rede de baixo fica livre para a bola) */
  var PHMAX=112, tams=[[19,12],[17,11.5],[16,11],[14.5,10.5],[13,10]], fs, pf, l1, l2, th, ti=0, temPt=J.tr&&cd.pt&&cd.pt!==cd.txt;
  do{ fs=tams[ti][0]; pf=tams[ti][1]; c.font=F(900,fs); l1=quebra(c,cd.txt,pw-20); c.font=F(700,pf); l2=temPt?quebra(c,cd.pt,pw-18):[];
    th=l1.length*fs*1.12+(l2.length?4+l2.length*pf*1.15:0); ti++; } while(th+34>PHMAX&&ti<tams.length);
  var ph=Math.max(84,Math.min(PHMAX,th+34));
  cd.pl={x:px,y:py,w:pw,h:ph};
  c.save();
  var cx=px+pw/2; c.translate(cx,GOL.y0+4); c.rotate(balanco||0); c.translate(-cx,-(GOL.y0+4));
  /* cordinhas presas na rede */
  c.strokeStyle='rgba(226,232,240,.9)'; c.lineWidth=2; c.beginPath(); c.moveTo(px+18,GOL.y0+4); c.lineTo(px+22,py+3); c.moveTo(px+pw-18,GOL.y0+4); c.lineTo(px+pw-22,py+3); c.stroke();
  if(est==='certa'){ c.shadowColor='rgba(74,222,128,.95)'; c.shadowBlur=26; }
  else if(est==='mira'){ c.shadowColor='rgba(253,224,71,.9)'; c.shadowBlur=18; }
  c.fillStyle=cores[0]; rr(c,px,py,pw,ph,14); c.fill(); c.shadowBlur=0;
  c.fillStyle='rgba(0,0,0,.06)'; rr(c,px,py+ph-10,pw,10,6); c.fill();
  c.strokeStyle=cores[1]; c.lineWidth=4; rr(c,px,py,pw,ph,14); c.stroke();
  /* número (medalha no alto) */
  c.fillStyle=cores[1]; circ(c,cx,py+1,16); c.fill(); c.strokeStyle='#fff'; c.lineWidth=2.5; circ(c,cx,py+1,16); c.stroke();
  c.fillStyle='#fff'; c.font=F(900,19); c.textAlign='center'; c.textBaseline='middle'; c.fillText(String(cd.k+1),cx,py+2);
  /* texto centralizado */
  var ty=py+20+(ph-28-th)/2;
  c.fillStyle=cores[2]; c.textBaseline='top'; c.font=F(900,fs); l1.forEach(function(l,k){ c.fillText(l,cx,ty+k*fs*1.12); });
  if(l2.length){ c.fillStyle=cores[3]; c.font=F(700,pf); l2.forEach(function(l,k){ c.fillText(l,cx,ty+l1.length*fs*1.12+4+k*pf*1.15); }); }
  if(rev&&est==='certa'){ c.fillStyle='#16a34a'; circ(c,px+pw-12,py+12,11); c.fill(); c.strokeStyle='#fff'; c.lineWidth=3.2; c.beginPath(); c.moveTo(px+pw-17,py+12); c.lineTo(px+pw-13,py+16); c.lineTo(px+pw-6,py+7); c.stroke(); }
  c.restore();
}

/* ============================================================
   GOLEIRO — do time do Conde Rabisco (roxo-tinta, luvas verde-limão),
   amigável. Quadril em (hx,hy); th = rotação do corpo; reach 0..1
   (braços para cima); crouch 0..1 (joelhos dobrados); humor.
   ============================================================ */
var KP={pele:'#e8b48a', peleS:'#c48c62', cab:'#2b1a10', cam:'#5b21b6', camE:'#3b0f86', tinta:'#111827', luva:'#a3e635', luvaE:'#4d7c0f', calcao:'#1e1b4b', meiao:'#6d28d9'};
function goleiro(c,hx,hy,th,reach,crouch,t,humor,olhaX){
  c.save(); c.translate(hx,hy); c.scale(KS,KS); c.rotate(th); c.lineJoin='round'; c.lineCap='round';
  var cr=crouch, rc=reach;
  /* pernas: coxa, joelheira, meião, chuteira */
  [-1,1].forEach(function(sd){
    var hip=[sd*9,2], knee=[sd*lerp(8,16,cr), lerp(26,20,cr)], foot=[sd*lerp(7,19,cr), lerp(50,44,cr)];
    if(rc>.3){ knee=[sd*lerp(knee[0]*sd,5,rc),lerp(knee[1],27,rc)]; foot=[sd*lerp(foot[0]*sd,4+(sd>0?3:0),rc),lerp(foot[1],53,rc)]; }
    c.strokeStyle=KP.peleS; c.lineWidth=11; c.beginPath(); c.moveTo(hip[0],hip[1]); c.lineTo(knee[0],knee[1]); c.stroke();
    c.strokeStyle=KP.meiao; c.lineWidth=10; c.beginPath(); c.moveTo(knee[0],knee[1]); c.lineTo(foot[0],foot[1]-4); c.stroke();
    c.strokeStyle='#fff'; c.lineWidth=10; c.beginPath(); c.moveTo(lerp(knee[0],foot[0],.25),lerp(knee[1],foot[1],.25)); c.lineTo(lerp(knee[0],foot[0],.32),lerp(knee[1],foot[1],.32)); c.stroke();
    /* joelheira */
    c.fillStyle='#94a3b8'; el(c,knee[0],knee[1]+1,7.4,6.4); c.fill(); c.strokeStyle='#475569'; c.lineWidth=1.4; el(c,knee[0],knee[1]+1,7.4,6.4); c.stroke();
    c.fillStyle='rgba(255,255,255,.5)'; el(c,knee[0]-2,knee[1]-1.5,3,2); c.fill();
    /* chuteira */
    c.fillStyle='#111827'; el(c,foot[0]+sd*2,foot[1],9,5.2); c.fill(); c.fillStyle=KP.luva; c.fillRect(foot[0]+sd*2-6,foot[1]-1.2,12,1.6);
  });
  /* calção */
  c.fillStyle=KP.calcao; c.beginPath(); c.moveTo(-18,-6); c.lineTo(18,-6); c.lineTo(20,13); c.lineTo(2,15); c.lineTo(0,9); c.lineTo(-2,15); c.lineTo(-20,13); c.closePath(); c.fill();
  c.fillStyle=KP.luva; c.fillRect(-20,10,7,2.4); c.fillRect(13,10,7,2.4);
  /* braços (manga comprida) — ombro → cotovelo → luva */
  var maos=[];
  [-1,1].forEach(function(sd){
    var sh=[sd*17,-40];
    var elR=[sd*31,-24], hR=[sd*41,-12];                 /* pronto: braços abertos, maos baixas */
    var elU=[sd*11,-70], hU=[sd*9,-90];                  /* alcance: braços para cima */
    var e=[lerp(elR[0],elU[0],rc),lerp(elR[1],elU[1],rc)], h=[lerp(hR[0],hU[0],rc),lerp(hR[1],hU[1],rc)];
    var wob=rc<.2?Math.sin(t*5+sd)*2:0; h[1]+=wob;
    c.strokeStyle=KP.camE; c.lineWidth=10; c.beginPath(); c.moveTo(sh[0],sh[1]); c.lineTo(e[0],e[1]); c.lineTo(h[0],h[1]); c.stroke();
    c.strokeStyle=KP.tinta; c.lineWidth=10; c.beginPath(); c.moveTo(lerp(e[0],h[0],.55),lerp(e[1],h[1],.55)); c.lineTo(lerp(e[0],h[0],.62),lerp(e[1],h[1],.62)); c.stroke();
    maos.push(h);
  });
  /* camisa */
  c.fillStyle=lin(c,-20,-48,20,-2,KP.cam,KP.camE); rr(c,-20,-48,40,46,12); c.fill();
  c.save(); rr(c,-20,-48,40,46,12); c.clip();
  c.fillStyle='rgba(0,0,0,.28)'; [[-12,-30,6],[13,-18,5],[-6,-10,4],[10,-40,3.5]].forEach(function(s){ circ(c,s[0],s[1],s[2]); c.fill(); circ(c,s[0]+s[2]*1.2,s[1]+s[2]*.8,s[2]*.35); c.fill(); });
  c.fillStyle='rgba(255,255,255,.14)'; c.fillRect(-18,-48,6,46);
  c.restore();
  c.strokeStyle=OL; c.lineWidth=1.6; rr(c,-20,-48,40,46,12); c.stroke();
  /* gola e escudo: gota de tinta com pena */
  c.fillStyle=KP.luva; c.beginPath(); c.moveTo(-8,-48); c.quadraticCurveTo(0,-40,8,-48); c.lineTo(5,-48); c.quadraticCurveTo(0,-43,-5,-48); c.closePath(); c.fill();
  c.save(); c.translate(0,-26);
  c.fillStyle='#fff'; c.beginPath(); c.moveTo(0,-11); c.quadraticCurveTo(9,1,6.5,6); c.quadraticCurveTo(0,11,-6.5,6); c.quadraticCurveTo(-9,1,0,-11); c.closePath(); c.fill();
  c.fillStyle=KP.tinta; c.beginPath(); c.moveTo(0,-7); c.quadraticCurveTo(6,1,4.5,4.5); c.quadraticCurveTo(0,8,-4.5,4.5); c.quadraticCurveTo(-6,1,0,-7); c.closePath(); c.fill();
  c.strokeStyle='#fde68a'; c.lineWidth=1.4; c.beginPath(); c.moveTo(-1,5); c.lineTo(4,-4); c.stroke();
  c.restore();
  /* cabeça */
  c.save(); c.translate(0,-63);
  c.fillStyle=KP.peleS; c.fillRect(-5,6,10,9);
  c.fillStyle=KP.pele; circ(c,0,0,15); c.fill();
  c.fillStyle=KP.peleS; el(c,-15,2,3.5,5); c.fill(); el(c,15,2,3.5,5); c.fill();
  /* cabelo espetado */
  c.fillStyle=KP.cab; c.beginPath(); c.moveTo(-15,-1); c.quadraticCurveTo(-16,-14,-8,-17); c.lineTo(-6,-22); c.lineTo(-1,-17); c.lineTo(3,-23); c.lineTo(6,-17); c.lineTo(11,-20); c.quadraticCurveTo(17,-12,15,-1); c.quadraticCurveTo(10,-10,0,-9); c.quadraticCurveTo(-9,-10,-15,-1); c.closePath(); c.fill();
  /* olhos (seguem a bola) */
  var ox=cl(olhaX||0,-1,1)*1.8;
  if(humor==='feliz'||humor==='orgulho'){ c.strokeStyle='#1f1208'; c.lineWidth=2; c.beginPath(); c.arc(-5.5,-1,3,PI*1.15,PI*1.85); c.stroke(); if(humor==='orgulho'){ c.fillStyle='#1f1208'; circ(c,5.5,-1,2.3); c.fill(); } else { c.beginPath(); c.arc(5.5,-1,3,PI*1.15,PI*1.85); c.stroke(); } }
  else { c.fillStyle='#fff'; el(c,-5.5,-1,3.6,4.2); c.fill(); el(c,5.5,-1,3.6,4.2); c.fill(); c.fillStyle='#1f1208'; circ(c,-5.5+ox,-.6,2.2); c.fill(); circ(c,5.5+ox,-.6,2.2); c.fill(); c.fillStyle='#fff'; circ(c,-6+ox,-1.6,.8); c.fill(); circ(c,5+ox,-1.6,.8); c.fill(); }
  c.fillStyle='rgba(244,114,128,.45)'; el(c,-9,5,3,1.8); c.fill(); el(c,9,5,3,1.8); c.fill();
  /* boca */
  if(humor==='susto'){ c.fillStyle='#7a2e26'; el(c,0,7,3,3.6); c.fill(); }
  else if(humor==='feliz'||humor==='orgulho'){ c.fillStyle='#8f2d2d'; c.beginPath(); c.moveTo(-6,5); c.lineTo(6,5); c.quadraticCurveTo(5,12,0,12); c.quadraticCurveTo(-5,12,-6,5); c.closePath(); c.fill(); c.fillStyle='#fff'; c.fillRect(-4,5,8,2); }
  else { c.strokeStyle='#7a2e26'; c.lineWidth=1.6; c.beginPath(); c.arc(0,4,4.6,.15*PI,.85*PI); c.stroke(); }
  c.restore();
  /* luvas (grandes, por cima de tudo) */
  maos.forEach(function(h,k){ var sd=k?1:-1;
    c.save(); c.translate(h[0],h[1]); c.rotate(rc*sd*-.2);
    c.fillStyle=KP.luvaE; rr(c,-6,3,12,6,2); c.fill();
    c.fillStyle=KP.luva; rr(c,-8.5,-10,17,15,6); c.fill();
    c.fillStyle=KP.luva; for(var f=0;f<4;f++){ rr(c,-8+f*4.3,-15,4.2,8,2); c.fill(); }
    c.fillStyle=KP.luva; el(c,sd*-9,-3,3.4,5); c.fill();
    c.strokeStyle=KP.luvaE; c.lineWidth=1.3; rr(c,-8.5,-10,17,15,6); c.stroke();
    c.fillStyle='rgba(255,255,255,.35)'; rr(c,-6,-8,5,8,2); c.fill();
    c.restore(); });
  c.restore();
}
/* pose do goleiro em função do tempo do lance */
function poseGoleiro(q,t,e){
  var base={hx:KX, hy:KPE-46*KS, th:0, reach:0, crouch:1, humor:'normal', olha:0};
  if(e<0||!S){ var sw=q.fase==='pergunta'?Math.sin(t*1.9)*16:0; base.hx+=sw; base.hy+=Math.abs(Math.sin(t*3.8))*-2; base.olha=sw/16*-.5; return base; }
  var hip0={x:KX,y:base.hy}, M=S.mao, Lb=86*KS;
  var dx=M.x-hip0.x, dy=M.y-hip0.y, thf=Math.atan2(dx,-dy);
  var hf={x:M.x-Lb*Math.sin(thf), y:M.y+Lb*Math.cos(thf)};
  var p=eOut((e-.62)/(BATE-.62));
  if(e<.62){ base.olha=e<CORRE?-.6:0; base.crouch=1+.15*sstep(.3,.62,e); return base; }
  var lift=Math.sin(cl(p,0,1)*PI)*-22*(Math.abs(thf)>.5?1:.3);
  var r={hx:lerp(hip0.x,hf.x,p), hy:lerp(hip0.y,hf.y,p)+lift, th:thf*p, reach:p, crouch:1-p, humor:'susto', olha:dx>0?1:-1};
  /* depois do lance: cai no gramado (mergulho) ou aterrissa em pé (pulo no meio) */
  var fq=sstep(BATE+.12,BATE+.5,e);
  if(fq>0){
    if(Math.abs(thf)>.5){ var sd=thf>0?1:-1; r.th=lerp(thf,sd*1.52,fq); r.hx=hf.x+sd*14*fq; r.hy=lerp(hf.y,KPE-12,fq); r.reach=lerp(1,.85,fq); }
    else { r.th=lerp(thf,0,fq); r.hx=lerp(hf.x,hip0.x,fq); r.hy=lerp(hf.y,hip0.y,fq); r.reach=1-fq*.3; r.crouch=fq*.6; }
  }
  if(e>BATE+.25) r.humor=S.ok?'feliz':'orgulho';
  return r;
}

/* ============================================================
   BOLA
   ============================================================ */
function bola(c,x,y,r,rot){
  c.save(); c.translate(x,y);
  var g=c.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r*1.05); g.addColorStop(0,'#ffffff'); g.addColorStop(.7,'#e5e7eb'); g.addColorStop(1,'#9ca3af');
  c.fillStyle=g; circ(c,0,0,r); c.fill();
  c.save(); circ(c,0,0,r); c.clip(); c.rotate(rot||0);
  c.fillStyle='#1f2937';
  function pent(px,py,s){ c.beginPath(); for(var i=0;i<5;i++){ var a=-PI/2+i*TAU/5; c.lineTo(px+Math.cos(a)*s,py+Math.sin(a)*s); } c.closePath(); c.fill(); }
  pent(0,0,r*.36);
  for(var i=0;i<5;i++){ var a=-PI/2+i*TAU/5+PI/5; pent(Math.cos(a)*r*.95,Math.sin(a)*r*.95,r*.3); }
  c.strokeStyle='rgba(31,41,55,.55)'; c.lineWidth=Math.max(.8,r*.07);
  for(var j=0;j<5;j++){ var b=-PI/2+j*TAU/5; c.beginPath(); c.moveTo(Math.cos(b)*r*.36,Math.sin(b)*r*.36); c.lineTo(Math.cos(b)*r*.7,Math.sin(b)*r*.7); c.stroke(); }
  c.restore();
  c.fillStyle='rgba(255,255,255,.55)'; el(c,-r*.38,-r*.45,r*.3,r*.18); c.fill();
  c.strokeStyle='rgba(15,23,42,.45)'; c.lineWidth=1.2; circ(c,0,0,r); c.stroke();
  c.restore();
}
function sombraBola(c,x,y,r,a){ c.save(); c.globalAlpha=a; c.fillStyle='#000'; el(c,x,y,r*1.1,r*.36); c.fill(); c.restore(); }

/* ============================================================
   HUD da cena: placar, shot clock, juiz e balão, dica, Next
   ============================================================ */
function placar(c,q){
  var x=824, y=116, w=126, h=78;
  c.fillStyle='#0b1022'; rr(c,x,y,w,h,10); c.fill(); c.strokeStyle='#334155'; c.lineWidth=3; rr(c,x,y,w,h,10); c.stroke();
  c.fillStyle='#020617'; rr(c,x+7,y+7,w-14,h-14,6); c.fill();
  c.fillStyle='#fbbf24'; c.font=F(900,15); c.textAlign='center'; c.textBaseline='middle'; c.fillText('PENALTY',x+w/2,y+20);
  c.fillStyle='#fde68a'; c.font=F(900,26); c.fillText((q.i+1)+'/'+q.itens.length,x+w/2,y+44);
  var n=q.itens.length, res=q.penRes||[];
  for(var k=0;k<n;k++){ var cx=x+w/2+(k-(n-1)/2)*20, cy=y+64, v=res[k];
    if(v===1){ c.fillStyle='#22c55e'; circ(c,cx,cy,6); c.fill(); }
    else if(v===-1){ c.strokeStyle='#ef4444'; c.lineWidth=2.6; c.beginPath(); c.moveTo(cx-5,cy-5); c.lineTo(cx+5,cy+5); c.moveTo(cx+5,cy-5); c.lineTo(cx-5,cy+5); c.stroke(); }
    else { c.strokeStyle='rgba(148,163,184,.7)'; c.lineWidth=2; circ(c,cx,cy,5.5); c.stroke(); } }
}
function shotClock(c,q,t){
  var x=887, y=262, frac=q.fase==='entra'?1:q.tempo/TEMPO, seg=Math.ceil(q.fase==='entra'?TEMPO:q.tempo), urg=q.fase==='pergunta'&&seg<=10, mt=q.fase==='pergunta'&&seg<=5;
  var cor=mt?'#ef4444':(urg?'#f97316':'#fde047');
  c.save(); c.translate(x,y); if(mt){ var s=1+.05*Math.sin(t*12); c.scale(s,s); }
  c.fillStyle='#0b1022'; rr(c,-58,-56,116,112,14); c.fill(); c.strokeStyle='#334155'; c.lineWidth=3; rr(c,-58,-56,116,112,14); c.stroke();
  c.fillStyle='#94a3b8'; c.font=F(900,12); c.textAlign='center'; c.textBaseline='middle'; c.fillText('SHOT CLOCK',0,-42);
  c.strokeStyle='rgba(255,255,255,.12)'; c.lineWidth=8; circ(c,0,8,32); c.stroke();
  c.strokeStyle=cor; c.lineCap='round'; c.beginPath(); c.arc(0,8,32,-PI/2,-PI/2+TAU*frac); c.stroke();
  c.fillStyle=mt?'#fecaca':'#fff'; c.font=F(900,28); c.fillText(String(seg),0,10);
  c.restore();
}
function juiz(c,t,fala,apito){
  c.save(); c.translate(REF.x,REF.y); c.scale(REF.s,REF.s);
  if(A.morador) A.morador(c,'referee',0,0,t,1,fala);
  c.restore();
  if(apito){ c.save(); c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=3; for(var i=0;i<3;i++){ var a=-.9+i*.45, r0=22+((t*40)%14); c.beginPath(); c.arc(REF.x+18,REF.y-122,r0,a-.25,a+.25); c.stroke(); } c.restore(); }
}
function balao(c,q,it,e){
  var resp=q.fase==='resposta'&&(e<0||e>=FALA_T), ok=q.escolha===q.certa;
  var en=resp?((ok?'Goal! ':(q.escolha<0?'Time is up! ':'Saved! '))+(it.ex||'')):it.p;
  var pt=resp?((ok?'Gol! ':(q.escolha<0?'Acabou o tempo! ':'Defendeu! '))+(it.ex_pt||'')):(it.p_pt||'');
  var bx=18, bw=590, by=60, fs=21, maxH=GOL.y0+14-by;
  var hist=!resp&&it.texto?String(it.texto).replace(/\n+/g,' '):'';
  function mede(){ c.font='italic 800 '+Math.round(fs*.82)+'px "Nunito",Arial'; var h0=hist?quebra(c,hist,bw-60):[]; c.font=F(900,fs); var a=quebra(c,en,bw-36); c.font=F(700,Math.round(fs*.64)); var b=J.tr&&pt?quebra(c,pt,bw-36):[];
    var hh=16+(h0.length?h0.length*fs*1.02+8:0)+a.length*fs*1.2+(b.length?4+b.length*fs*.8:0)+10; return {h0:h0,a:a,b:b,h:hh}; }
  var m=mede(); if(m.h>maxH){ fs=18; m=mede(); } if(m.h>maxH){ fs=16; m=mede(); }
  var bh=m.h;
  c.save();
  c.fillStyle=resp?(ok?'#dcfce7':'#fee2e2'):'#ffffff';
  c.shadowColor='rgba(0,0,0,.35)'; c.shadowBlur=10; c.shadowOffsetY=3;
  rr(c,bx,by,bw,bh,18); c.fill();
  c.beginPath(); c.moveTo(bx+52,by+bh-2); c.quadraticCurveTo(bx+62,by+bh+40,REF.x+16,REF.y-REF.s*112); c.quadraticCurveTo(bx+76,by+bh+30,bx+84,by+bh-2); c.closePath(); c.fill();
  c.shadowBlur=0; c.shadowOffsetY=0;
  var y=by+12; c.textAlign='left'; c.textBaseline='top';
  if(m.h0.length){ c.fillStyle='#fef3c7'; rr(c,bx+12,y-4,bw-24,m.h0.length*fs*1.02+8,8); c.fill(); c.fillStyle='#7c2d12'; c.font='italic 800 '+Math.round(fs*.82)+'px "Nunito",Arial'; m.h0.forEach(function(l,k){ c.fillText(l,bx+24,y+k*fs*1.02); }); y+=m.h0.length*fs*1.02+10; }
  c.fillStyle='#1e1b3a'; c.font=F(900,fs); m.a.forEach(function(l,k){ c.fillText(l,bx+18,y+k*fs*1.2); }); y+=m.a.length*fs*1.2+4;
  if(m.b.length){ c.fillStyle='#6b5d4f'; c.font=F(700,Math.round(fs*.64)); m.b.forEach(function(l,k){ c.fillText(l,bx+18,y+k*fs*.8); }); }
  c.textAlign='right'; c.fillStyle='rgba(30,27,58,.45)'; c.font=F(900,13); c.fillText((q.i+1)+' / '+q.itens.length,bx+bw-12,by+5);
  c.restore();
}
function dica(c,q,it){
  if(!q.dica||q.fase!=='pergunta') return; var d=it.dica_en||it.dica; if(!d) return;
  var x=556, w=388, y=444; c.font=F(800,16); var dl=quebra(c,'Hint: '+d,w-28); var h=dl.length*20+14+(J.tr&&it.dica?18:0);
  y=Math.min(y,H-8-h);
  c.fillStyle='rgba(254,243,199,.97)'; rr(c,x,y,w,h,12); c.fill(); c.strokeStyle='#f59e0b'; c.lineWidth=2.5; rr(c,x,y,w,h,12); c.stroke();
  c.fillStyle='#78350f'; c.textAlign='left'; c.textBaseline='top'; dl.forEach(function(l,k){ c.fillText(l,x+14,y+7+k*20); });
  if(J.tr&&it.dica){ c.font=F(700,12); c.fillStyle='#a16207'; c.fillText(it.dica,x+14,y+9+dl.length*20); }
}
function botaoNext(c,q,t){
  var bx=W-150, by=470, a=.82+.18*Math.sin(t*5);
  c.save(); c.globalAlpha*=a; c.fillStyle='#b45309'; rr(c,bx,by+5,128,52,24); c.fill(); c.fillStyle=lin(c,0,by,0,by+52,'#fde68a','#f59e0b'); rr(c,bx,by,128,52,24); c.fill();
  c.fillStyle='#1e1b3a'; c.font=F(900,22); c.textAlign='center'; c.textBaseline='middle'; c.fillText(q.i<q.itens.length-1?'Next ▶':'Done ▶',bx+64,by+27); c.restore();
}

/* ============================================================
   EFEITOS: rastro, POW, GOAL!, confete, "Ohh!", trajetória-fantasma
   ============================================================ */
function confete(c,e){
  if(!S.conf){ S.conf=[]; var CC=['#f43f5e','#fde047','#22c55e','#38bdf8','#a855f7','#fb923c','#fff'];
    for(var i=0;i<90;i++){ var de=i%3, ox=de===0?GOL.x0:(de===1?GOL.x1:480), oy=de===2?120:GOL.y0;
      S.conf.push({ox:ox, oy:oy, vx:(hs(i)-.5)*(de===2?520:300)+(de===0?110:(de===1?-110:0)), vy:-180-hs(i+40)*260, cor:CC[i%CC.length], w:5+hs(i+7)*5, rot:hs(i+9)*TAU, vr:(hs(i+11)-.5)*14}); } }
  var g=300, dr=.6;
  S.conf.forEach(function(p){ var x=p.ox+p.vx*e*Math.exp(-e*dr*.3), y=p.oy+p.vy*e+g*e*e*.5; if(y>H+10) return; c.save(); c.translate(x,y); c.rotate(p.rot+p.vr*e); c.scale(1,Math.abs(Math.cos(e*8+p.rot))*.8+.2); c.fillStyle=p.cor; c.fillRect(-p.w/2,-p.w*.3,p.w,p.w*.6); c.restore(); });
}
function textoGrande(c,txt,x,y,k,cor,borda,px){
  c.save(); c.translate(x,y); var s=k<.25?(.3+2.9*k):(1+.08*Math.sin(k*10)*Math.exp(-k*3)); c.scale(s,s);
  c.font=F(900,px); c.textAlign='center'; c.textBaseline='middle'; c.lineJoin='round';
  c.lineWidth=14; c.strokeStyle=borda; c.strokeText(txt,0,0); c.fillStyle=lin(c,0,-px/2,0,px/2,'#fff7c2',cor); c.fillText(txt,0,0);
  c.lineWidth=2; c.strokeStyle='rgba(255,255,255,.6)'; c.strokeText(txt,0,-2);
  c.restore();
}
function pow(c,x,y,k){
  c.save(); c.translate(x,y); var s=k<.15?k/.15:1+.05*Math.sin(k*20); c.scale(s,s); c.globalAlpha*=cl(1.6-k*1.6,0,1);
  c.beginPath(); for(var i=0;i<16;i++){ var a=i*TAU/16, r=i%2?20:42; c.lineTo(Math.cos(a)*r,Math.sin(a)*r); } c.closePath();
  c.fillStyle='#fde047'; c.fill(); c.strokeStyle='#b45309'; c.lineWidth=3; c.stroke();
  c.font=F(900,22); c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=5; c.strokeStyle='#7c2d12'; c.strokeText('POW!',0,1); c.fillStyle='#fff'; c.fillText('POW!',0,1);
  c.restore();
}
function ohh(c,e){
  var B=[[668,136],[778,170]];
  B.forEach(function(b,k){ var kk=cl((e-k*.08)/.3,0,1), a=cl(2.2-e*.7,0,1)*kk; if(a<=0) return;
    c.save(); c.globalAlpha*=a; c.translate(b[0],b[1]-kk*10); c.fillStyle='rgba(255,255,255,.92)'; rr(c,-40,-18,80,34,16); c.fill();
    c.beginPath(); c.moveTo(-6,15); c.lineTo(0,26); c.lineTo(8,15); c.closePath(); c.fill();
    c.fillStyle='#1e1b3a'; c.font=F(900,20); c.textAlign='center'; c.textBaseline='middle'; c.fillText('Ohh!',0,0); c.restore(); });
}
function fantasma(c,k){
  var a=SPOT, b=S.TC, cx=(a.x+b.x)/2, cy=Math.min(a.y,b.y)-46;
  c.save(); c.globalAlpha*=k;
  c.setLineDash([10,9]); c.lineDashOffset=-k*40; c.strokeStyle='rgba(134,239,172,.95)'; c.lineWidth=5;
  c.beginPath(); c.moveTo(a.x,a.y); c.quadraticCurveTo(cx,cy,b.x,b.y); c.stroke(); c.setLineDash([]);
  var u=Math.min(1,k*1.2); var m=1-u, x=m*m*a.x+2*m*u*cx+u*u*b.x, y=m*m*a.y+2*m*u*cy+u*u*b.y;
  c.globalAlpha*=.55; bola(c,x,y,lerp(RB,10,u),u*8);
  c.globalAlpha=k; c.strokeStyle='#4ade80'; c.lineWidth=4; circ(c,b.x,b.y,16+4*Math.sin(k*12)); c.stroke();
  c.restore();
}

/* ============================================================
   DESENHO PRINCIPAL
   ============================================================ */
function sons(e){
  if(!S||!window.SOM) return; var s=S.sons;
  function uma(nome,quando,fx){ if(e>=quando&&!s[nome]){ s[nome]=1; try{ SOM.fx(fx); }catch(er){} } }
  uma('p1',.12,'aterra'); uma('p2',.29,'aterra'); uma('p3',.45,'aterra');
  uma('chute',CORRE,'pisao');
  if(S.ok){ uma('rede',BATE,'mola'); uma('festa',BATE+.15,'vitoria'); }
  else { uma('pow',BATE,'tijolo'); if(e>=BATE&&!s.tremeu){ s.tremeu=1; J.shake=5; } }
}
function desenha(c,t,q){
  if(!q) return; var it=q.item;
  if(!q.lay||!q.lay.pen||q.lay.tr!==!!J.tr||q.lay.n!==q.cartoes.length) layout(q);
  var e=q.fase==='resposta'?tempoDe(q,t):(S=null,-1);
  if(e>=0) sons(e);
  var ent=q.fase==='entra'?Math.min(1,q.t/.7):(q.fase==='pagina'?Math.max(0,1-q.t/1.2):1);
  c.save(); c.globalAlpha=ent;

  /* ---- mundo (com o zoom da câmera lenta) ---- */
  var zoom=1, zx=480, zy=300;
  if(e>=0&&S){ zoom=1+.07*sstep(CORRE+.42,BATE,e)-.07*sstep(BATE+.15,BATE+.65,e); zx=S.T.x; zy=S.T.y; }
  c.save(); if(zoom!==1){ c.translate(zx,zy); c.scale(zoom,zoom); c.translate(-zx,-zy); }
  c.drawImage(fundo(),0,0,W,H);
  var modoT='calma', kT=1;
  if(e>=BATE&&S){ if(S.ok){ modoT='festa'; kT=cl(1-(e-BATE-2.2)/1.2,0,1); if(kT<=0) modoT='calma'; } else { modoT=e<BATE+2.2?'ohh':'calma'; } }
  torcida(c,t,modoT,kT);
  refletores(c,t);

  /* rede (estufa no gol) */
  var amp=0; if(e>=0&&S&&S.ok) amp=estufa(e-BATE);
  rede(c,t,amp,S?S.Tb:{x:0,y:0},e>=BATE?e-BATE:0);
  /* bola dentro da rede (atrás das placas) */
  var u=e>=0&&S?uVoo(e):0, bolaNaRede=S&&S.ok&&e>=BATE;
  if(bolaNaRede){ var e2=e-BATE, kk=cl(e2/.12,0,1), dropK=sstep(.5,1.1,e2), bx2=lerp(S.T.x,S.Tb.x,kk), by2=lerp(S.T.y,S.Tb.y,kk); by2=lerp(by2,FUN.y1-7,dropK); bola(c,bx2,by2,lerp(9,7,kk),e*6*(1-dropK)+8); }
  traves(c);
  /* placas */
  var rev=q.fase==='resposta'&&(e<0||e>=BATE);
  q.cartoes.forEach(function(cd,k){
    var bal=Math.sin(t*1.3+k*1.9)*.012;
    if(S&&S.ok&&e>=BATE&&k===S.k){ var e3=e-BATE; bal+= -.22*Math.exp(-e3*2.4)*Math.sin(e3*11)*(S.T.x<KX?-1:1); }
    if(S&&!S.ok&&e>=BATE&&k===S.k){ var e4=e-BATE; bal+=.06*Math.exp(-e4*3)*Math.sin(e4*16); }
    placa(c,q,cd,t,rev,S&&k===S.k&&q.fase==='resposta',bal);
  });
  /* trajetória-fantasma da resposta certa (depois da defesa) */
  if(S&&!S.ok&&e>=BATE+.35) fantasma(c,cl((e-BATE-.35)/.8,0,1));
  /* goleiro */
  var gp=poseGoleiro(q,t,e);
  c.fillStyle='rgba(0,0,0,.25)'; el(c,gp.hx,KPE+1,30*KS+Math.abs(gp.th)*20,6); c.fill();
  goleiro(c,gp.hx,gp.hy,gp.th,gp.reach,gp.crouch,t,gp.humor,gp.olha);
  /* bola: parada, voando ou rebatida */
  if(!S||e<CORRE){ sombraBola(c,SPOT.x+2,CHAO_BOLA,RB,.35); bola(c,SPOT.x,SPOT.y,RB,0); }
  else if(e<BATE){ var b=bolaVoo(u);
    sombraBola(c,b.sx,b.sy,b.r,.32*(1-.5*u));
    for(var r=7;r>=1;r--){ var uu=Math.max(0,u-r*.035), bb=bolaVoo(uu); c.save(); c.globalAlpha*=(1-r/8)*.38; c.fillStyle='#fff'; circ(c,bb.x,bb.y,bb.r*(1-r*.06)); c.fill(); c.restore(); }
    if(u>.85){ c.save(); c.globalAlpha*=.5; c.strokeStyle='#fff'; c.lineWidth=2; for(var sl=0;sl<4;sl++){ var ang=Math.atan2(S.T.y-SPOT.y,S.T.x-SPOT.x)+PI+(sl-1.5)*.35; c.beginPath(); c.moveTo(b.x+Math.cos(ang)*(b.r+6),b.y+Math.sin(ang)*(b.r+6)); c.lineTo(b.x+Math.cos(ang)*(b.r+26),b.y+Math.sin(ang)*(b.r+26)); c.stroke(); } c.restore(); }
    bola(c,b.x,b.y,b.r,u*16); }
  else if(!S.ok){ /* rebatida pela luva: volta para o gramado, quica e rola */
    var e5=e-BATE, sd=S.T.x>=KX?1:-1, kr=cl(e5/.55,0,1), D={x:S.T.x+sd*110,y:448};
    var rx=lerp(S.T.x,D.x,kr)+sd*Math.max(0,e5-.55)*30*Math.exp(-(e5-.55)), ry=lerp(S.T.y,D.y,kr)-Math.sin(kr*PI)*40, rr2=lerp(9,13,kr);
    if(kr>=1) ry=D.y-Math.abs(Math.sin((e5-.55)*9))*10*Math.exp(-(e5-.55)*3);
    sombraBola(c,lerp(S.T.x,D.x,kr),lerp(GOL.y1-4,D.y+rr2,kr),rr2,.3);
    bola(c,rx,ry,rr2,e5*9*Math.exp(-e5));
    if(e5<.9) pow(c,S.mao.x,S.mao.y-4,e5);
  }
  /* batedor (herói escolhido) em primeiro plano */
  batedor(c,t,e);
  c.restore(); /* fim do zoom */

  /* ---- comemoração ---- */
  if(S&&S.ok&&e>=BATE){ var eg=e-BATE; confete(c,eg); if(eg<2.4){ c.save(); c.globalAlpha*=cl((2.4-eg)/.4,0,1); textoGrande(c,'GOAL!',480,236,eg,'#facc15','#7c2d12',104); c.restore(); } }
  if(S&&!S.ok&&e>=BATE) ohh(c,e-BATE);
  /* câmera lenta: faixas de cinema discretas */
  if(e>=0&&S){ var cine=sstep(CORRE+.4,CORRE+.5,e)-sstep(BATE,BATE+.25,e); if(cine>0){ c.fillStyle='rgba(0,0,0,'+(.55*cine)+')'; c.fillRect(0,0,W,24*cine); c.fillRect(0,H-24*cine,W,24*cine); } }

  /* ---- HUD da cena ---- */
  if(q.fase==='pagina'){ c.restore(); if(A.paginaVoando&&!q.op){ var k2=Math.min(1,q.t/1.2); A.paginaVoando(c,W/2+(W/2-80)*k2,H/2-(H/2-30)*k2,q.t*6); } return; }
  var fala=(q.fase==='pergunta'&&q.t<2.5)||(q.fase==='resposta'&&e>=FALA_T&&e<FALA_T+2.5)||(q.fase==='resposta'&&e<0);
  juiz(c,t,fala,q.fase==='resposta'&&e>=BATE&&e<BATE+.6);
  balao(c,q,it,e);
  placar(c,q);
  shotClock(c,q,t);
  dica(c,q,it);
  if(q.fase==='resposta'&&(e<0||e>=NEXT_T)) botaoNext(c,q,t);
  c.restore();
}
function batedor(c,t,e){
  var quem=J.prog.heroi||'lia', look=J.prog.cor?{cor:J.prog.cor}:null, x,y,s,est,at,rot=0;
  if(e<0||!S){ x=P0.x; y=P0.y; s=P0.s; est='idle'; at=t; }
  else if(e<CORRE){ var k=e/CORRE, kk=k*k*(3-2*k)*.35+k*.65; x=lerp(P0.x,P1.x,kk); y=lerp(P0.y,P1.y,kk); s=lerp(P0.s,P1.s,kk); est='walk'; at=e*1.714; }
  else if(e<CORRE+.32){ x=P1.x; y=P1.y; s=P1.s; est='walk'; at=PI/22; rot=-.1*Math.sin(cl((e-CORRE)/.32,0,1)*PI); }
  else { x=P1.x; y=P1.y; s=P1.s; est=(e>=BATE&&S.ok)?'cheer':'idle'; at=t; }
  c.save(); c.fillStyle='rgba(0,0,0,.28)'; el(c,x,y+1,24*s,6*s); c.fill(); c.restore();
  c.save(); c.translate(x,y); c.rotate(rot);
  if(A.heroi) A.heroi(c,0,0,est,at,1,s,quem,look);
  c.restore();
  /* arco do chute */
  if(e>=CORRE-.04&&e<CORRE+.22&&S){ var a=cl((e-CORRE+.04)/.26,0,1); c.save(); c.globalAlpha*=1-a; c.strokeStyle='#fff'; c.lineWidth=5; c.beginPath(); c.arc(x+8*s,y-14*s,28*s,PI*.2,PI*.2+a*1.2); c.stroke(); c.restore(); }
}

return {desenha:desenha, layout:layout, chute:chute, ativo:ativo};
})();
