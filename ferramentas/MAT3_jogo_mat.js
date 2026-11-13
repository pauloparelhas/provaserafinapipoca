/* ============================================================
   MAT3_jogo_mat.js — o que só existe em Math Stars (window.MATM). Escrito à mão (o fork não toca).
   Carrega DEPOIS de MAT3_jogo_cie.js (MAT3X), arteM e arteN; embrulha as funções do MAT3X.
     · FIGURA: a pergunta do banco traz fig=[função de MAT3_figuras.js, ...args]; desenhamos o MESMO
       SVG do simulado no quadro da pergunta (lápis A/B, retângulo com os lados, sólido, gráfico de
       barras, grupos, Mike e Laura repartindo). Nada de figura inventada.
     · PORTÕES DE MATEMÁTICA ('|' no mapa, gen_mapas_mat3.py): coluna do chão ao teto. Ao encostar,
       abre UMA pergunta PRÁTICA do banco (com figura) do tema da fase — somar os lados, contar faces,
       ler a barra, escrever a sentença, repartir. Certa ou errada (a certa aparece e o Next segue),
       o portão desce e abre: incentiva, nunca trava (PREPROMPTS v4). "Leave" também abre.
     · CORRIDA: os rivais são os sólidos e os bichos do gráfico (vistos de costas).
     · PODERES: esferas (rolam), livro largo (plana), cubos (não rolam: param os cilindros), balão.
   Perguntas: SEMPRE do window.MAT3 em tempo de execução (o banco é revisado à parte). Sem rede.
   ============================================================ */
window.MATM=(function(){
'use strict';
var A=window.ARTE, X=window.MAT3X, T=45, PI=Math.PI, TAU=PI*2; if(!A||!X) return null;
var rr=A.rr, circ=A.circ, el=A.el, OL='#2a2018';
function fs(c,f,st,lw){ c.fillStyle=f; c.fill(); c.strokeStyle=st||OL; c.lineWidth=lw==null?2:lw; c.stroke(); }
function J(){ return window.JOGO&&JOGO.J; }
var COR={measure:'#f59e0b',perimeter:'#ef4444',solids:'#8b5cf6',data:'#3b82f6',probability:'#ec4899',multiplication:'#10b981',division:'#14b8a6',todos:'#f59e0b'};

/* ---------------------------------------------------------- figura SVG do banco */
var CACHE={};
function figImg(fig){ var k=JSON.stringify(fig); if(!CACHE[k]){ var s='';
    try{ s=window.MAT3F[fig[0]].apply(null,fig.slice(1)); }catch(e){ s=''; }
    /* SVG como imagem é XML estrito: atributo repetido na mesma tag (o escalaVazia traz fill duas vezes no "?")
       faz a figura sumir (quadro branco). Fica o PRIMEIRO, como no HTML do simulado. (revisor-sentido, rodada 2) */
    s=s.replace(/<[a-zA-Z][^>]*>/g,function(tag){ var vis={}; return tag.replace(/\s([a-zA-Z:-]+)="[^"]*"/g,function(a,n){ if(vis[n]) return ''; vis[n]=1; return a; }); });
    var im=new Image(); if(s){ if(s.indexOf('xmlns=')<0) s=s.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '); im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s); } CACHE[k]=im; }
  return CACHE[k]; }
var fig0=X.figura;
X.figura=function(c,src,x,y,w,h){
  if(!Array.isArray(src)) return fig0(c,src,x,y,w,h);
  var im=figImg(src), j=J(), f=j&&j.faseAtual, cor=COR[(f&&f.tema)||'todos']||'#f59e0b';
  c.save(); c.fillStyle='#fff'; rr(c,x,y,w,h,14); c.fill();
  if(im.complete&&im.naturalWidth){ var k=Math.min((w-16)/im.naturalWidth,(h-16)/im.naturalHeight,2.2), iw=im.naturalWidth*k, ih=im.naturalHeight*k; c.drawImage(im,x+(w-iw)/2,y+(h-ih)/2,iw,ih); }
  c.strokeStyle=cor; c.lineWidth=4; rr(c,x,y,w,h,14); c.stroke(); c.restore(); };
function preCarrega(){ try{ (window.MAT3&&MAT3.ITENS||[]).forEach(function(it){ if(it.fig) figImg(it.fig); }); }catch(e){} }

/* ---------------------------------------------------------- portões de matemática */
var parse0=X.parse;
X.parse=function(ch,x,y,L){
  if(ch!=='|') return parse0(ch,x,y,L);
  var c=Math.round(x/T), r=Math.round(y/T), g=L.grade;
  if(r>0&&g[r-1].charAt(c)==='|') return true; /* parte de um portão já criado */
  var n=1; while(r+n<g.length&&g[r+n].charAt(c)==='|') n++;
  var p={x:x,y:y,w:T,h:n*T,portao:true,aberto:false,anim:0,i:(L.portoes||[]).length,feito:false,visto:false,falando:0};
  L.segs.push(p); (L.portoes=L.portoes||[]).push(p); return true; };
function escolheItem(f,L){
  var ja=L.quizIds||(L.quizIds=[]), it0=(window.MAT3&&MAT3.ITENS)||[];
  var ok=function(it){ return it.tema===f.tema&&!Array.isArray(it.c)&&!it.tabela&&ja.indexOf(it.id)<0; };
  var pool=it0.filter(function(it){ return ok(it)&&it.fig; }); if(!pool.length) pool=it0.filter(ok);
  if(!pool.length) return null; return pool[Math.floor(Math.random()*pool.length)]; } /* o QUIZ.inicia registra o id em L.quizIds */
function abre(p){ if(p.aberto) return; var j=J(), M=j&&j.mundo; p.aberto=true; p.anim=0;
  if(M){ var k=M.segs.indexOf(p); if(k>=0) M.segs.splice(k,1); }
  try{ JOGO.toast('The gate is open!',1800,'O portão abriu!'); SOM.fx('vitoria'); JOGO.pontua(80,p.x+T/2,p.y); }catch(e){} }
function pergunta(p){ var j=J(), f=j.faseAtual, L=j.nivel; if(!window.QUIZ||!f) return;
  var it=escolheItem(f,L); if(!it){ abre(p); return; }
  p.tipo=(f.moradores&&f.moradores[0])||'lapis'; if(f.rod){ p.rod=f.rod; p.i0=p.i; }
  QUIZ.inicia(p,{itens:[it], aoTerminar:function(){ abre(p); }, aoSair:function(){ abre(p); }}); }
var atu0=X.atualiza;
X.atualiza=function(dt,Jj,G){ if(atu0) atu0(dt,Jj,G); var M=Jj.mundo, u=Jj.urso; if(!M||!M.portoes||!u) return;
  M.portoes.forEach(function(p){
    if(p.aberto){ p.anim=Math.min(1,p.anim+dt/0.9); return; }
    if(Jj.estado!=='nivel'||Jj.quiz) return;
    if(p.esperaT>0){ p.esperaT-=dt; return; }
    var dx=Math.abs(u.x-(p.x+T/2)), topo=u.y-96;
    if(dx<T*1.15&&u.y>p.y&&topo<p.y+p.h) pergunta(p); }); };
/* o portão fechado é desenhado no lugar do bloco; o aberto desce para dentro do chão */
function desenhaPortao(c,p,t,anim){
  var j=J(), f=j&&j.faseAtual, cor=COR[(f&&f.tema)||'todos']||'#f59e0b', desce=(anim||0)*p.h;
  c.save(); c.beginPath(); c.rect(p.x-30,p.y-40,p.w+60,p.h+40); c.clip(); c.translate(0,desce);
  var x=p.x, y=p.y, w=p.w, h=p.h;
  rr(c,x+4,y,w-8,h,6); var g=c.createLinearGradient(x,0,x+w,0); g.addColorStop(0,cor); g.addColorStop(.5,'#ffffff'); g.addColorStop(1,cor); c.globalAlpha=.95; fs(c,g,'#1e1b3a',3); c.globalAlpha=1;
  c.strokeStyle='rgba(30,27,58,.35)'; c.lineWidth=2; for(var yy=y+T;yy<y+h;yy+=T){ c.beginPath(); c.moveTo(x+6,yy); c.lineTo(x+w-6,yy); c.stroke(); }
  var sy=y+h-T*2.2; rr(c,x-14,sy,w+28,52,12); fs(c,'#fffbeb','#1e1b3a',3);
  c.fillStyle='#1e1b3a'; c.font='900 30px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('?',x+w/2,sy+20);
  c.font='900 10px "Nunito",Arial'; c.fillText('MATH GATE',x+w/2,sy+42);
  if(!anim){ var k=.5+.5*Math.sin(t*2.4); c.globalAlpha=.25+.25*k; c.fillStyle='#fde047'; circ(c,x+w/2,sy+20,30); c.fill(); }
  c.restore(); }
var chao0=A.chao;
A.chao=function(c,s,cena){ if(s&&s.portao){ desenhaPortao(c,s,(J()&&J().t)||0,0); return; } return chao0.apply(this,arguments); };
function desenhaAbertos(c,t){ var j=J(), M=j&&j.mundo; if(!M||!M.portoes) return; M.portoes.forEach(function(p){ if(p.aberto&&p.anim<1) desenhaPortao(c,p,t,p.anim); }); }

/* ---------------------------------------------------------- corrida: sólidos e bichos de costas */
var SOL={dragon:'esfera',princess:'cilindro',knight:'cone',witch:'cubo',wolf:'piramide',fairy:'cuboide',frog:'hamster',red:'coelho',pig:'gato'};
var COR_R={dragon:'#38bdf8',princess:'#f472b6',knight:'#fbbf24',witch:'#ef4444',wolf:'#22c55e',fairy:'#8b5cf6',frog:'#d97706',red:'#ec4899',pig:'#a8a29e'};
var HER={yellow:1,pony:1,helmet:1,fisher:1};
var corpo0=X.corpoTras, cab0=X.cabeca;
X.corpoTras=function(c,id,o,t){ if(!SOL[id]&&!HER[id]) return corpo0(c,id,o,t);
  var cor=SOL[id]?COR_R[id]:(o&&o.cor)||'#e53935'; c.fillStyle=cor; rr(c,-34,-44,68,40,12); c.fill(); c.fillStyle='rgba(0,0,0,.18)'; c.fillRect(-34,-18,68,6); c.fillStyle='#fff'; rr(c,-14,-40,28,14,6); c.fill(); return -46; };
X.cabeca=function(c,id,o,t){
  if(HER[id]){ c.fillStyle='#f7cba6'; circ(c,0,-4,14); c.fill(); c.fillStyle='#7c4a22';
    if(id==='pony'){ circ(c,0,-8,14); c.fill(); el(c,0,8,9,14); c.fill(); c.fillStyle='#f472b6'; el(c,-7,-20,6,4); c.fill(); el(c,7,-20,6,4); c.fill(); }
    else { [[-11,-12],[-4,-16],[4,-16],[11,-12],[-13,-4],[13,-4]].forEach(function(q){ circ(c,q[0],q[1],6); c.fill(); }); }
    return true; }
  var s=SOL[id]; if(!s) return cab0(c,id,o,t); var cor=COR_R[id];
  c.save(); c.translate(0,-6);
  if(s==='esfera'){ circ(c,0,0,16); fs(c,cor); c.fillStyle='rgba(255,255,255,.55)'; circ(c,-5,-6,5); c.fill(); }
  else if(s==='cilindro'){ rr(c,-13,-14,26,28,2); fs(c,cor); el(c,0,-14,13,5); fs(c,'#fbcfe8'); }
  else if(s==='cone'){ c.beginPath(); c.moveTo(0,-22); c.lineTo(15,12); c.lineTo(-15,12); c.closePath(); fs(c,cor); el(c,0,12,15,4); fs(c,'#fde68a'); }
  else if(s==='cubo'){ rr(c,-13,-10,24,24,1); fs(c,cor); c.beginPath(); c.moveTo(-13,-10); c.lineTo(-6,-17); c.lineTo(18,-17); c.lineTo(11,-10); c.closePath(); fs(c,'#fca5a5'); c.beginPath(); c.moveTo(11,-10); c.lineTo(18,-17); c.lineTo(18,7); c.lineTo(11,14); c.closePath(); fs(c,'#b91c1c'); }
  else if(s==='piramide'){ c.beginPath(); c.moveTo(0,-22); c.lineTo(16,12); c.lineTo(-16,12); c.closePath(); fs(c,cor); c.beginPath(); c.moveTo(0,-22); c.lineTo(4,12); c.stroke(); }
  else if(s==='cuboide'){ rr(c,-17,-8,30,20,1); fs(c,cor); c.beginPath(); c.moveTo(-17,-8); c.lineTo(-11,-14); c.lineTo(19,-14); c.lineTo(13,-8); c.closePath(); fs(c,'#c4b5fd'); }
  else { circ(c,0,-2,14); fs(c,cor); c.fillStyle=cor;
    if(s==='coelho'){ el(c,-6,-22,4,11); fs(c,cor); el(c,6,-22,4,11); fs(c,cor); }
    else if(s==='gato'){ [-1,1].forEach(function(l){ c.beginPath(); c.moveTo(l*5,-12); c.lineTo(l*12,-24); c.lineTo(l*14,-8); c.closePath(); fs(c,cor); }); }
    else { circ(c,-10,-12,5); fs(c,cor); circ(c,10,-12,5); fs(c,cor); } }
  c.restore(); return true; };

/* ---------------------------------------------------------- poderes: esferas, livro largo, cubos, balão */
function esfera(c,x,y,r,rot){ c.save(); c.translate(x,y); circ(c,0,0,r); var g=c.createRadialGradient(-r*.35,-r*.35,r*.1,0,0,r); g.addColorStop(0,'#e0f2fe'); g.addColorStop(1,'#0284c7'); fs(c,g,'#0c4a6e',1.6); c.rotate(rot||0); c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=r*.14; c.beginPath(); c.arc(0,0,r*.62,-.6,.6); c.stroke(); c.restore(); }
function cubo(c,x,y,s,rot,cor){ c.save(); c.translate(x,y); c.rotate(rot||0); c.scale(s,s); cor=cor||'#ef4444';
  c.beginPath(); c.rect(-12,-8,20,20); fs(c,cor,'#7f1d1d',1.6); c.beginPath(); c.moveTo(-12,-8); c.lineTo(-6,-14); c.lineTo(14,-14); c.lineTo(8,-8); c.closePath(); fs(c,'#fca5a5','#7f1d1d',1.4); c.beginPath(); c.moveTo(8,-8); c.lineTo(14,-14); c.lineTo(14,6); c.lineTo(8,12); c.closePath(); fs(c,'#b91c1c','#7f1d1d',1.4); c.restore(); }
function cilindro(c,x,y,r,rot){ c.save(); c.translate(x,y); c.rotate(rot||0); circ(c,0,0,r); fs(c,'#f472b6','#831843',2); circ(c,0,0,r*.62); fs(c,'#fbcfe8','#831843',1.4); c.fillStyle='#831843'; circ(c,0,0,r*.15); c.fill(); c.restore(); }
function livro(c,x,y,s,aberto,t){ c.save(); c.translate(x,y); c.scale(s,s);
  if(aberto){ var b=Math.sin((t||0)*3)*.12; [-1,1].forEach(function(l){ c.save(); c.scale(l,1); c.rotate(-b); c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(22,-12,46,-6); c.lineTo(46,8); c.quadraticCurveTo(22,2,0,12); c.closePath(); fs(c,'#f59e0b','#78350f',1.8); c.beginPath(); c.moveTo(2,2); c.quadraticCurveTo(22,-8,42,-3); c.lineTo(42,4); c.quadraticCurveTo(22,0,2,9); c.closePath(); fs(c,'#fffbeb','#a16207',1); c.restore(); }); }
  else { rr(c,-34,-22,68,30,4); fs(c,'#f59e0b','#78350f',2); c.fillStyle='#fffbeb'; c.fillRect(-30,2,60,5); c.fillStyle='#92400e'; circ(c,0,-8,8); c.fill(); c.fillStyle='#fde68a'; circ(c,-4,-10,2); c.fill(); circ(c,4,-10,2); c.fill();
    c.strokeStyle='#dc2626'; c.lineWidth=2.4; c.beginPath(); c.moveTo(-26,-28); c.lineTo(26,-28); c.stroke(); [[-26,1],[26,-1]].forEach(function(p){ c.beginPath(); c.moveTo(p[0],-28); c.lineTo(p[0]+p[1]*6,-32); c.lineTo(p[0]+p[1]*6,-24); c.closePath(); c.fillStyle='#dc2626'; c.fill(); }); }
  c.restore(); }
function balao(c,x,y,s,t){ c.save(); c.translate(x,y+Math.sin((t||0)*2)*3); c.scale(s,s); c.strokeStyle='#475569'; c.lineWidth=1.5; c.beginPath(); c.moveTo(0,22); c.quadraticCurveTo(6,44,0,66); c.stroke();
  el(c,0,0,20,24); var g=c.createRadialGradient(-6,-8,2,0,0,24); g.addColorStop(0,'#fbcfe8'); g.addColorStop(1,'#db2777'); fs(c,g,'#831843',2); c.beginPath(); c.moveTo(-4,23); c.lineTo(4,23); c.lineTo(0,28); c.closePath(); fs(c,'#db2777','#831843',1.2); c.restore(); }
function mesa(c,placa,txt){ c.fillStyle='#64748b'; c.fillRect(-34,-46,5,46); c.fillRect(29,-46,5,46); rr(c,-44,-56,88,12,4); fs(c,'#f59e0b'); if(placa) placa(c,0,-120,txt); }
function caixa(c){ rr(c,-30,-34,60,34,4); fs(c,'#a16207','#78350f',2); }
var sup0=X.suporte, ico0=X.icone, tiro0=X.tiro;
X.suporte=function(c,id,it,t,placa){
  if(id==='raquete'){ mesa(c); c.save(); c.translate(0,-56); caixa(c); if(!it.pego){ esfera(c,-14,-42,11,0); esfera(c,10,-44,11,1); esfera(c,-2,-62,11,2); } c.restore(); if(placa) placa(c,0,-140,'SPHERES'); return true; }
  if(id==='aviao'){ mesa(c); if(!it.pego) livro(c,0,-74+Math.sin(t*2)*3,1,false,t); if(placa) placa(c,0,-122,'WIDE BOOK'); return true; }
  if(id==='piao'){ mesa(c); c.save(); c.translate(0,-56); caixa(c); if(!it.pego){ cubo(c,-14,-46,1,0); cubo(c,12,-46,1,0,'#3b82f6'); cubo(c,0,-68,1,0,'#22c55e'); } c.restore(); if(placa) placa(c,0,-140,'CUBES'); return true; }
  return sup0(c,id,it,t,placa); };
X.icone=function(c,k){
  if(k==='raquete'||k==='tenis'){ esfera(c,0,0,13,0); return true; }
  if(k==='aviao'){ livro(c,0,6,.42,false,0); return true; }
  if(k==='piao'){ cubo(c,-2,2,1,0); return true; }
  if(k==='capa'){ balao(c,0,-8,.6,0); return true; }
  return ico0(c,k); };
X.tiro=function(c,e,t){ if(e.skin==='tenis'){ esfera(c,e.x,e.y,10,e.rot); return true; } if(e.skin==='piao'){ cubo(c,e.x,e.y-4,.9,(e.rot||0)*.3); return true; } return tiro0(c,e,t); };
X.aviaoNoHeroi=function(c,u,s,t){ livro(c,u.x,u.y-88*s-10,1.05*s,true,t); };
X.pipaNoHeroi=function(c,u,s,t){ var hh=88*s; c.save(); c.strokeStyle='#475569'; c.lineWidth=1.5; c.beginPath(); c.moveTo(u.x+u.dir*6,u.y-hh*.6); c.lineTo(u.x-u.dir*10,u.y-hh-40); c.stroke(); c.restore(); balao(c,u.x-u.dir*10,u.y-hh-68,.9,t); };
X.pipa=function(c,t){ balao(c,0,-120,1,t); };
X.lata=function(c,b){ cilindro(c,b.x,b.y,b.r,b.rot); };
X.caixaLatas=function(c,x,y,tr){ c.save(); c.translate(x,y); rr(c,-14,-36,62,36,4); fs(c,'#a16207','#78350f',3); [[0,-50],[28,-50],[14+tr,-72]].forEach(function(p){ cilindro(c,p[0],p[1],11,0); }); c.restore(); };
X.nuvemChuva=function(c,x0,x1,y,t){ var cx=(x0+x1)/2; c.save(); c.translate(cx,y-10); rr(c,-46,-22,92,40,10); fs(c,'#f9a8d4','#831843',2.4); c.fillStyle='#60a5fa'; rr(c,-46,2,92,16,6); c.fill(); c.fillStyle='#831843'; circ(c,-12,-6,3); c.fill(); circ(c,12,-6,3); c.fill(); c.strokeStyle='#831843'; c.lineWidth=2; c.beginPath(); c.arc(0,4,6,1.15*PI,1.85*PI); c.stroke(); c.restore(); };

/* ---------------------------------------------------------- quem pergunta não disputa o referente com a figura
   (revisor-sentido, rodada 2): um cone falante não pergunta "What is the name of this solid?" ao lado de um cilindro,
   e o quadrado "5 cm" não pergunta o perímetro de um quadrado de 3 cm. Sólido: quem pergunta é o próprio sólido da
   figura (sem figura, o lápis). Perímetro: o lápis (o que mede). Gráfico: um bicho que não está na pergunta nem nas
   alternativas (o cão não pergunta "Which animal has the most? Dogs…"). A Borracha (chefão) continua sendo ela. */
var SOLMOR={cube:'cubo',cuboid:'cuboide',pyramid:'piramide',cylinder:'cilindro',cone:'cone',sphere:'esfera'};
var BICHO={hamster:'hamster',coelho:'rabbit',cao:'dog',gato:'cat'};
function quemPergunta(q){ var it=q&&q.item, m=q&&q.m; if(!it||!m) return null;
  var k=(m.i0||0)+(q.i||0), orig=m.rod?m.rod[k%m.rod.length]:(m.tipo||'pin'); if(orig==='conde') return null;
  if(it.tema==='perimeter') return 'lapis';
  if(it.tema==='solids'){ var f=it.fig; return (f&&f[0]==='solido'&&SOLMOR[f[1]])||'lapis'; }
  if(it.tema==='data'){ var tx=(it.p+' '+(it.o||[]).join(' ')).toLowerCase(), l=Object.keys(BICHO).filter(function(b){ return tx.indexOf(BICHO[b])<0; }); return l.length?l[k%l.length]:'lapis'; }
  return null; }
function instalaQuiz(){ if(!window.QUIZ||QUIZ.__mat) return; QUIZ.__mat=true; var dt0=QUIZ.desenhaTela;
  QUIZ.desenhaTela=function(c,t){ var j=J(), q=j&&j.quiz, ov=quemPergunta(q); if(!ov) return dt0.apply(this,arguments);
    var m=q.m, r=m.rod, tp=m.tipo; m.rod=null; m.tipo=ov; try{ return dt0.apply(this,arguments); } finally{ m.rod=r; m.tipo=tp; } }; }

/* ---------------------------------------------------------- instalação tardia (PODERES e CENA nascem depois) */
/* ---------------------------------------------------------- jogador D3: nada de futebol nem de ginásio
   · piquenique: o que rola é LARANJA (uma esfera) e o funil da máquina tem laranjas; nas outras fases, esferas;
   · jardim (cena ginasio): o balanço vira um botão gigante pendurado num arco de flores; a barra de pendurar é um
     arco de flores; a cama elástica é um botão vermelho grande (as peças são as mesmas do motor: só o desenho muda). */
function laranja(c,x,y,r,rot){ c.save(); c.translate(x,y); c.rotate(rot||0); circ(c,0,0,r); var g=c.createRadialGradient(-r*.35,-r*.35,r*.1,0,0,r); g.addColorStop(0,'#fed7aa'); g.addColorStop(1,'#ea580c'); fs(c,g,'#9a3412',1.6); c.fillStyle='#16a34a'; el(c,r*.25,-r*.9,r*.35,r*.17); c.fill(); c.fillStyle='rgba(154,52,18,.35)'; circ(c,r*.3,r*.2,r*.08); c.fill(); circ(c,-r*.3,r*.35,r*.08); c.fill(); c.restore(); }
function laranjaRola(c,b){ laranja(c,b.x,b.y,b.r,b.rot); }
function cheio(c,x,y,r,pq){ if(pq) laranja(c,x,y,r,0); else esfera(c,x,y,r,0); }
function botaoG(c,x,y,r){ circ(c,x,y,r); var g=c.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r); g.addColorStop(0,'#fca5a5'); g.addColorStop(1,'#dc2626'); fs(c,g,'#7f1d1d',2); c.fillStyle='#7f1d1d'; [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){ circ(c,x+q[0]*r*.28,y+q[1]*r*.28,r*.12); c.fill(); }); }
function arco(c,x,yTopo,larg){ c.save(); c.strokeStyle='#14532d'; c.lineWidth=9; c.beginPath(); c.moveTo(x-larg,450); c.lineTo(x-larg,yTopo+20); c.quadraticCurveTo(x,yTopo-30,x+larg,yTopo+20); c.lineTo(x+larg,450); c.stroke(); c.strokeStyle='#22c55e'; c.lineWidth=6; c.stroke();
  for(var i=0;i<7;i++){ var k=i/6, px=x-larg+k*2*larg, py=k<.15||k>.85?yTopo+40+((i*37)%60):yTopo-6+Math.abs(k-.5)*40; c.fillStyle='#f472b6'; for(var j=0;j<5;j++){ var a=j*TAU/5; circ(c,px+Math.cos(a)*5,py+Math.sin(a)*5,3.6); c.fill(); } c.fillStyle='#fde047'; circ(c,px,py,2.6); c.fill(); } c.restore(); }
function aparelhosJardim(c,M,t){
  (M.pendulos||[]).forEach(function(p){ var a=p.th, ex=p.ax+Math.sin(a)*p.len, ey=p.ay+Math.cos(a)*p.len; arco(c,p.ax,p.ay-8,58);
    c.save(); c.strokeStyle='#15803d'; c.lineWidth=3; c.beginPath(); c.moveTo(p.ax,p.ay-6); c.lineTo(ex,ey+4); c.stroke(); c.fillStyle='#22c55e'; for(var k=1;k<4;k++){ el(c,p.ax+(ex-p.ax)*k/4+5,p.ay+(ey-p.ay)*k/4,5,2.6); c.fill(); } c.restore();
    botaoG(c,ex,ey+12,15); });
  (M.barras||[]).forEach(function(b){ arco(c,b.x,b.y,34); var j=window.JOGO&&JOGO.J, ag=j&&j.agarrado; c.save(); c.strokeStyle='#7c4a1e'; c.lineWidth=7; c.beginPath(); c.moveTo(b.x-30,b.y); c.lineTo(b.x+30,b.y); c.stroke();
    if(!(ag&&ag.b===b)){ c.strokeStyle='rgba(253,224,71,'+(.35+.3*Math.sin(t*2.4))+')'; c.lineWidth=3; c.beginPath(); c.arc(b.x,b.y,22,0,TAU); c.stroke(); } c.restore(); });
  (M.saltos||[]).forEach(function(s){ var sq=s.t>0?.6:1; c.save(); c.translate(s.x+s.w/2,s.y+s.h); c.scale(1,sq); botaoG(c,0,-14,24); c.restore(); });
  return true; }
if(window.MAT3P&&MAT3P.aparelhos){ var ap0=MAT3P.aparelhos; MAT3P.aparelhos=function(c,M,t){ if(M&&M.cena==='ginasio') return aparelhosJardim(c,M,t); return ap0(c,M,t); }; }
/* jogador r2: o 'zagueiro' herdado (jogador de futebol que agacha) vira um FARELO grande de borracha (mesmo comportamento) */
function farelao(c,e,t){ if(e.tipo!=='zagueiro') return false; var ag=e.est==='agacha', dz=e.est==='desliza'; c.save(); c.translate(e.x,e.y); c.scale(dz?1.9:1.5,ag?1.05:(dz?.8:1.5));
  if(A.INIMIGOS_CIE&&A.INIMIGOS_CIE.puddle) A.INIMIGOS_CIE.puddle(c,0,0,t,e.dir||-1,false); c.restore();
  if(ag){ c.save(); c.fillStyle='#fde047'; c.font='900 22px "Nunito",Arial'; c.textAlign='center'; c.fillText('!',e.x,e.y-44); c.restore(); } return true; }
function instala(){
  instalaQuiz();
  if(window.APARELHOS&&!APARELHOS.__mat){ APARELHOS.__mat=true; var zg0=APARELHOS.zagueiro; APARELHOS.zagueiro=function(c,e,t){ return farelao(c,e,t)||zg0(c,e,t); }; }
  if(window.PODERES&&!PODERES.__mat){ PODERES.__mat=true; var df=PODERES.desenhaFundo; PODERES.desenhaFundo=function(c,t){ if(df) df.apply(this,arguments); desenhaAbertos(c,t); }; }
  preCarrega(); }
if(document.readyState==='complete') instala(); else window.addEventListener('load',instala);
return {laranjaRola:laranjaRola, cheio:cheio, figImg:figImg, abre:abre, quemPergunta:quemPergunta, desenhaPortao:desenhaPortao, esfera:esfera, cubo:cubo, cilindro:cilindro, livro:livro, balao:balao, COR:COR};
})();
