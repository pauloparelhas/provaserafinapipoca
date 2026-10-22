/* ============================================================
   HIS3_jogo_motor2.js — The Lost Endings, parte 2: bichos de tinta,
   moradores que perguntam (abrem o quiz no mundo), checkpoints,
   fim de reino, mapa-livro, a INTRO (biblioteca → livro) e a escolha
   do herói, transições em íris e o laço principal.
   Estende window.JOGO (HIS3_jogo_motor.js).
   CHECKPOINT (bug do WiseBear corrigido): só acende quando o herói
   passa por ele NA MESMA ALTURA; reaparece sempre no último aceso.
   ============================================================ */
(function(G){
'use strict';
var J=G.J, W=G.W, H=G.H, A=window.ARTE, F=window.FASES, TAM=G.TAM;

/* ---------- bichos (manchas de tinta do Conde) ---------- */
function inimigos(dt){
  var u=J.urso, M=J.mundo, R=G.ursoRet();
  M.inimigos.forEach(function(e){
    if(e.morto) return;
    if(e.achatado){ e.tAch-=dt; if(e.tAch<=0) e.morto=true; return; }
    e.t=(e.t||0)+dt;
    if(e.fixo){ /* água-viva/baiacu: o movimento vem do HIS3_jogo_marceu.js */ }
    else if(e.voa){ e.x=e.x0+Math.sin(e.t*.9)*150; e.dir=Math.cos(e.t*.9)>=0?1:-1; e.y=e.y0-110+Math.sin(e.t*2.3)*e.amp; }
    else {
    var px=e.x+e.dir*e.v*dt, apoio=false, parede=false;
    G.solidos(M).forEach(function(s){ if(px+e.dir*14>s.x && px+e.dir*14<s.x+s.w && e.y>=s.y-2 && e.y<=s.y+6) apoio=true; if(G.colideRet(px-14,e.y-30,28,26,s.x,s.y,s.w,s.h)) parede=true; });
    M.plats.forEach(function(s){ if(px+e.dir*14>s.x && px+e.dir*14<s.x+s.w && Math.abs(e.y-s.y)<4) apoio=true; });
    if(!apoio||parede||px<16||px>M.w-16) e.dir=-e.dir; else e.x=px;
    }
    if(u.invT>0||u.tontoT>0||J.estado!=='nivel') return;
    if(G.colideRet(R.x+6,R.y+6,R.w-12,R.h-6,e.x-18,e.y-30,36,30)){
      if(e.doConde&&!(u.vy>0&&u.y<e.y-6)){ var lado=u.x<e.x?-1:1; u.vx=lado*230; u.vy=-260; u.noChao=false; u.invT=Math.max(u.invT,.45); e.dir=-lado; SOM.fx('pisao'); return; } /* 16/10 (jogador): mancha do Conde encostada de lado só EMPURRA (sem tirar coração); de cima, vence */
      if((u.vy>50 && u.y<e.y-14 || e.doConde) && !e.espinho){ e.achatado=true; e.tAch=.7; u.vy=-400; u.noChao=false; u.sx=1.3; u.sy=.7; SOM.fx('pisao'); G.pontua(20,e.x,e.y-40); if(window.PERIGOS&&PERIGOS.transforma) PERIGOS.transforma(e); else G.emite(10,function(){ return {x:e.x,y:e.y-10,vx:(Math.random()-.5)*240,vy:-100-Math.random()*200,vida:.9,max:.9,tipo:'estrela',cor:'#f9a8d4',r:4,g:.3}; }); }
      else G.machucado();
    }
  });
}

/* ---------- moradores: chegar perto abre a pergunta ---------- */
/* ---------- entradas do ambiente de questões (porta, baú…): ▼ na frente, ou tocar nela ---------- */
function pertoDe(m){ var u=J.urso, L=J.mundo; return Math.abs(u.x-m.x)<60 && Math.abs(u.y-m.y)<(L.modo?140:30); }
function moradores(dt){
  var u=J.urso, L=J.mundo, entrou=false;
  L.moradores.forEach(function(m){
    if(m.esperaT>0) m.esperaT-=dt;
    m.perto=pertoDe(m);
    if(entrou||J.estado!=='nivel'||!window.QUIZ||m.esperaT>0) return;
    if(m.perto && J.in.down && J.downSolto){ J.downSolto=false; entrou=true; SOM.fx('cano'); QUIZ.inicia(m); }
  });
  /* ▼ em cima de um cano: submundo */
  if(!entrou&&J.estado==='nivel'&&J.in.down&&J.downSolto&&window.PERIGOS){ var p=PERIGOS.canoSob(); if(p){ J.downSolto=false; PERIGOS.entraCano(p); } }
  if(!J.in.down) J.downSolto=true;
}
function tocaEntrada(lx,ly){ /* toque no tablet: tocar na porta/baú quando o herói está na frente dela */
  var L=J.mundo; if(!L) return false; var wx=lx+J.cam, wy=ly+J.camY;
  if(window.PODERES&&PODERES.toca(wx,wy)) return true;
  for(var i=0;i<L.moradores.length;i++){ var m=L.moradores[i]; if(wx>m.x-50&&wx<m.x+50&&wy>m.y-130&&wy<m.y+10){ if(m.perto&&window.QUIZ){ SOM.fx('cano'); QUIZ.inicia(m); } else G.toast('Walk to the door first!',1600,'Primeiro vá até a porta!'); return true; } }
  return false;
}

/* ---------- checkpoints e dicas ---------- */
function atualizaNivel(dt){
  var L=J.nivel, M=J.mundo, u=J.urso;
  if(u.cheerT>0){ u.cheerT-=dt; u.estado='cheer'; u.anim+=dt; }
  M.checkpoints.forEach(function(cp){ if(!cp.acesa&&u.x>cp.x&&u.x<cp.x+160&&Math.abs(u.y-cp.y)<180){ cp.acesa=true; J.respawn={x:cp.x,y:cp.y,mundo:M.mundo}; SOM.fx('checkpoint'); G.brilho(cp.x,cp.y-80,12); } });
  inimigos(dt); G.perigos(dt); if(window.PODERES) PODERES.interage(); moradores(dt); if(window.CHEFINHO) CHEFINHO.atualiza(dt); if(J.chefe&&window.CHEFAO) CHEFAO.atualiza(dt);
  if(M.mastro && Math.abs(u.x-M.mastro.x)<30 && Math.abs(u.y-M.mastro.y)<(M.modo?400:70) && J.estado==='nivel') fimDeFase(); /* nadando/voando, passar por cima do livro também vale */
  if(J.tut) atualizaTutorial(dt);
  dicas();
}
function dicas(){ /* só o indispensável: o ovo do Pip, na primeira vez */
  var u=J.urso, M=J.mundo, d=window.PODERES?PODERES.dica():null;
  if(!d&&!J.prog.pipVisto) M.ovos.forEach(function(o){ if(!o.chocado && Math.abs(o.x-u.x)<160) d={x:o.x,y:o.y-80,txt:'Monte no Pangaré!',pt:'Monte no Pangaré!'}; });
  if(!d&&J.mundo) J.mundo.moradores.forEach(function(m){ if(m.perto&&!J.chefe) d={x:m.x,y:m.y-198,txt:m.feito?'Play again? Press ▼':'Press ▼ to go in',pt:m.feito?'Jogar de novo? Aperte ▼':'Aperte ▼ para entrar',botao:true}; });
  if(!d&&J.mundo&&window.PERIGOS&&J.nivel&&J.nivel.sub){ var cn=PERIGOS.canoSob(); if(cn) d={x:u.x,y:u.y-G.URSO_H*TAM[u.tam]-30,txt:'Press ▼ to go down the pipe',pt:'Aperte ▼ para entrar no cano',botao:true}; }
  J.dica=d;
}
function atualizaTutorial(dt){ var Tt=J.tut, L=J.nivel; Tt.t+=dt; var p=L.passos[Tt.i]; if(!p) return; if(p.ate(J)){ Tt.i++; Tt.t=0; SOM.fx('moeda'); if(Tt.i>=L.passos.length) J.tut=null; } }

/* ---------- fim do reino ---------- */
function fimDeFase(){
  var f=J.faseAtual, s=J.stats, total=Math.max(1,s.perguntas), razao=s.perguntas?s.acertos/total:0;
  var pags=(J.nivel.todasEntradas||J.nivel.moradores).filter(function(m){ return m.feito; }).length;
  var estrelas= s.perguntas===0?1:(razao>=.9?3:(razao>=.7?2:1));
  J.fimFase={t:0,estrelas:estrelas}; J.estado='fimFase'; SOM.musica('vitoria'); SOM.fx('vitoria'); J.urso.estado='cheer'; J.urso.anim=0;
  var ant=J.prog.fases[f.id]||{}; J.prog.fases[f.id]={estrelas:Math.max(ant.estrelas||0,estrelas),pontos:Math.max(ant.pontos||0,J.pontos),acertos:s.acertos,total:s.perguntas,paginas:Math.max(ant.paginas||0,pags),novo:!ant.estrelas};
  J.prog.pontos=Object.keys(J.prog.fases).reduce(function(a,k){ return a+(J.prog.fases[k].pontos||0); },0);
  G.salva(); if(window.UI) UI.modoNivel(false);
  var totPags=(J.nivel.todasEntradas||J.nivel.moradores).length; /* calculado já: em 1,5 s o reino pode ter sido fechado */
  setTimeout(function(){ if(window.UI&&J.estado==='fimFase') UI.fimFase(f,estrelas,s.acertos,s.perguntas,J.pontos,J.moedas,pags,totPags); },1500);
}
function voltaMapa(){ var f=J.faseAtual, novo=f&&J.prog.fases[f.id]&&J.prog.fases[f.id].novo; if(novo){ J.prog.fases[f.id].novo=false; G.salva(); } var i=F.LISTA.indexOf(f); irMapa(novo&&i<F.LISTA.length-1?i+1:false); }
function irMapa(animaPara){
  if(window.CHEFAO&&CHEFAO.ativo()) CHEFAO.limpa(); /* nada do castelo vaza para o mapa (batida de coração) */
  if(window.UI&&UI.modoCorrida) UI.modoCorrida(false); if(window.UI&&UI.botaoCapa) UI.botaoCapa(false);
  J.estado='mapa'; document.body.classList.remove('cozinha'); J.agarrado=null; if(window.UI&&UI.poderHud) UI.poderHud(null); J.soltouT=0; if(window.UI) UI.acao(false,0); J.nivel=null; J.mundo=null; J.tut=null; J.part=[]; J.clima=[]; J.faseAtual=null; J.t=0; J.dica=null; J.quiz=null; J.pip=null;
  F.posiciona();
  J.sel=animaPara?animaPara-1:G.proximaFase(); J.mapaAnim= animaPara?{de:animaPara-1,para:animaPara,t:0,dur:2.2}:null;
  SOM.musica('mapa'); G.hud();
  if(window.UI){ UI.modoNivel(false); UI.modoMapa(true); UI.hudArena(false); UI.cartaoMapa(J.mapaAnim?null:F.LISTA[J.sel]); }
}
function entraFase(idx){
  var f=F.LISTA[idx];
  if(!F.PRONTOS[f.id]){ SOM.fx('clique'); G.toast('Coming soon! This kingdom is still being built.',2400,'Em breve! Este reino ainda está sendo construído.'); return; }
  if(window.UI){ UI.modoMapa(false); UI.cartaoMapa(null); } J.sel=idx; SOM.fx('iris');
  iris(f.mx,f.my,function(){ G.iniciaFase(f); });
}

/* ---------- transição em íris ---------- */
function iris(x,y,meio){ J.trans={t:0,dur:.55,x:x,y:y,fase:'fecha',meio:meio}; }
function atualizaTrans(dt){ var tr=J.trans; if(!tr) return; tr.t+=dt; if(tr.fase==='fecha'&&tr.t>=tr.dur){ tr.fase='abre'; tr.t=0; if(tr.meio) tr.meio(); var u=J.urso; if(u&&J.estado==='nivel'){ tr.x=u.x-J.cam; tr.y=u.y-40-J.camY; } else { tr.x=W/2; tr.y=H/2; } } else if(tr.fase==='abre'&&tr.t>=tr.dur) J.trans=null; }
function raioIris(){ var tr=J.trans; if(!tr) return 1e9; var k=Math.min(1,tr.t/tr.dur); return tr.fase==='fecha'? 1100*(1-k)*(1-k) : 1100*k*k; }

/* ---------- partículas e clima ---------- */
var CORES_FESTA=['#f87171','#fbbf24','#4ade80','#60a5fa','#c084fc','#f472b6'];
function atualizaParticulas(dt){
  for(var i=J.part.length-1;i>=0;i--){ var p=J.part[i]; p.vida-=dt; if(p.vida<=0){ J.part.splice(i,1); continue; } if(p.g) p.vy+=900*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; if(p.rot!==undefined) p.rot+=dt*4; }
  var cena=J.mundo?J.mundo.cena:''; var tipo=cena&&A.CENAS[cena]?A.CENAS[cena].part:'';
  if(J.estado==='fimFase'){
    if(Math.random()<.08){ var fx=100+Math.random()*760, fy=80+Math.random()*200, cor=CORES_FESTA[Math.floor(Math.random()*6)]; for(var k=0;k<22;k++){ var a=k/22*6.283; J.clima.push({x:fx,y:fy,vx:Math.cos(a)*(120+Math.random()*60),vy:Math.sin(a)*(120+Math.random()*60),vida:1.1,max:1.1,tipo:'fogo',cor:cor,r:3,g:1}); } }
    if(Math.random()<.5) J.clima.push({x:Math.random()*W,y:-10,vx:(Math.random()-.5)*40,vy:120+Math.random()*100,vida:4,max:4,tipo:'confete',cor:CORES_FESTA[Math.floor(Math.random()*6)],rot:Math.random()*6});
  }
  if(tipo && J.clima.length<80){
    var n=tipo==='vagalume'?.1:(tipo==='nuvem'?.01:(tipo==='polen'?.3:.4));
    if(Math.random()<n){
      var p2={x:Math.random()*W,y:-20,vx:0,vy:0,vida:9,max:9,tipo:tipo,rot:Math.random()*6,alpha:1};
      if(tipo==='folha'){ p2.vx=-40-Math.random()*40; p2.vy=50+Math.random()*50; p2.r=5+Math.random()*4; p2.cor=['#16a34a','#65a30d','#f59e0b'][Math.floor(Math.random()*3)]; }
      else if(tipo==='polen'){ p2.y=Math.random()*H; p2.vx=-30; p2.vy=-10+Math.random()*20; p2.r=1.5+Math.random(); p2.vida=p2.max=6; }
      else if(tipo==='vagalume'){ p2.y=150+Math.random()*250; p2.vx=(Math.random()-.5)*30; p2.vy=(Math.random()-.5)*20; p2.r=5+Math.random()*4; p2.vida=p2.max=3+Math.random()*3; }
      else if(tipo==='nuvem'){ p2.x=W+80; p2.y=40+Math.random()*120; p2.vx=-12-Math.random()*10; p2.r=.8+Math.random()*.8; p2.vida=p2.max=90; }
      else if(tipo==='neve'){ p2.vx=-20+Math.random()*10; p2.vy=40+Math.random()*50; p2.r=1.5+Math.random()*2.5; }
      J.clima.push(p2);
    }
  }
  for(var j=J.clima.length-1;j>=0;j--){ var q=J.clima[j]; q.vida-=dt; if(q.g) q.vy+=400*dt; q.x+=q.vx*dt; q.y+=q.vy*dt; if(q.rot!==undefined) q.rot+=dt*2; if(q.tipo==='folha') q.x+=Math.sin(J.t*3+q.rot)*1.2; if(q.tipo==='vagalume') q.alpha=.4+.6*Math.abs(Math.sin(J.t*3+q.rot)); if(q.vida<=0||q.y>H+40||q.x<-120) J.clima.splice(j,1); }
}
function atualizaCamera(dt){
  var M=J.mundo, u=J.urso, alvo;
  if(J.quiz&&J.quiz.camX!==undefined) alvo=J.quiz.camX; else alvo=u.x-W*.42+u.dir*30;
  alvo=Math.max(0,Math.min(M.w-W,alvo)); J.cam+=(alvo-J.cam)*Math.min(1,dt*(J.quiz?3:5));
  var ay=Math.max(-120,Math.min(M.h-H,u.y-H*.62)); J.camY+=(ay-J.camY)*Math.min(1,dt*4); /* 18/10: folga em cima — o pulo alto e a praia do recife não somem atrás do HUD */
}

/* ---------- mapa ---------- */
function atualizaMapa(dt){ if(J.mapaAnim){ var m=J.mapaAnim; m.t+=dt; if(m.t>=m.dur){ J.mapaAnim=null; J.sel=-2; seleciona(m.para); SOM.fx('destrava'); } } }
function mapaMove(d){ if(J.mapaAnim) return; var n=F.LISTA.length, s=J.sel<0?0:J.sel; s=(s+d+n)%n; seleciona(s); SOM.fx('clique'); }
function noEm(lx,ly){ for(var i=0;i<F.LISTA.length;i++){ var f=F.LISTA[i]; if(Math.hypot(lx-f.mx,ly-f.my)<34) return i; } return null; }
function seleciona(i){ if(i===J.sel) return; J.sel=i; if(window.UI) UI.cartaoMapa(F.LISTA[i]); }
/* mapa: um toque só SELECIONA (mostra o cartão); para entrar é toque DUPLO no mesmo reino ou o botão Play do cartão (Paulo: toque acidental não pode levar a outra fase) */
var ultimoToque={i:null,t:0};
function mapaToque(lx,ly){ if(J.mapaAnim) return; var i=noEm(lx,ly); if(i===null) return; var agora=Date.now();
  if(i===J.sel&&ultimoToque.i===i&&agora-ultimoToque.t<450){ entraFase(i); ultimoToque={i:null,t:0}; return; }
  ultimoToque={i:i,t:agora}; if(i!==J.sel){ seleciona(i); SOM.fx('clique'); } }
function mapaHover(lx,ly){ if(J.estado!=='mapa'||J.mapaAnim) return; var i=noEm(lx,ly); if(i!==null) seleciona(i); }

/* ---------- intro: biblioteca → o livro abre → Conde → herói entra ---------- */
var CENAS_INTRO=[
  {en:'', pt:'No Museu da Memória ficam guardadas as pistas do passado: cartas, fotos, mapas, brinquedos e histórias contadas.', dur:5},
  {en:'', pt:'Mas a Rainha Traça e as tracinhas começaram a roer tudo! Sem pistas, todo mundo esquece de onde veio.', dur:5.5},
  {en:'', pt:'"Trim! Socorro!", gritou o Tic, o despertador do museu. "Precisamos de detetives do tempo!"', dur:4.5},
  {en:'', pt:'Pegue a sua lupa! Viaje pelo tabuleiro do mapa e recupere as cartas de fonte histórica.', dur:5}
];
function iniciaIntro(){ J.estado='intro'; J.t=0; J.intro={i:0,t:0}; SOM.musica('mapa'); if(window.UI){ UI.modoNivel(false); UI.modoMapa(false); UI.cartaoMapa(null); UI.legenda(CENAS_INTRO[0]); } }
function atualizaIntro(dt){ J.intro.t+=dt; } /* nunca avança sozinha (Paulo): só Next ▶ ou ENTER */
function avancaIntro(){ var it=J.intro; if(!it) return; it.i++; it.t=0; if(it.i>=CENAS_INTRO.length){ fimIntro(); return; } SOM.fx('clique'); if(window.UI) UI.legenda(CENAS_INTRO[it.i]); }
function fimIntro(){ J.intro=null; if(window.UI) UI.legenda(null); J.prog.introVista=true; G.salva(); if(!J.prog.heroi) iniciaEscolha(); else iniciaCapa(); }
/* ---------- final: o Conde, o final feliz e a volta à biblioteca (circle story) ---------- */
var CENAS_FINAL=[
  {en:'', pt:'A Rainha Traça se sentou no chão do museu. "Eu só roía porque ninguém me contava as histórias", ela disse.', dur:5.5, cena:'tinta'},
  {en:'', pt:'Então os detetives contaram tudo o que descobriram. Cada pista voltou para o seu lugar no museu!', dur:5.5, cena:'tinta'},
  {en:'', pt:'Oral, escrita, visual e material: as fontes estão a salvo. E o passado pode ser estudado de novo.', dur:4.5, cena:'vila'},
  {en:'', pt:'E lembre: o que você faz hoje será a fonte histórica de amanhã. Para entender para onde vamos, precisamos descobrir de onde viemos!', dur:6.5, cena:'tinta'}
];
function iniciaFinal(){
  var f=J.faseAtual, s=J.stats; if(window.CHEFAO) CHEFAO.limpa(); J.quiz=null;
  var ant=J.prog.fases[f.id]||{}; var est=s.perguntas?(s.acertos/s.perguntas>=.9?3:(s.acertos/s.perguntas>=.7?2:1)):1;
  J.prog.fases[f.id]={estrelas:Math.max(ant.estrelas||0,est),pontos:Math.max(ant.pontos||0,J.pontos),acertos:s.acertos,total:s.perguntas,paginas:3,novo:!ant.estrelas}; J.prog.zerado=true; G.salva();
  J.estado='final'; J.t=0; J.final={i:0,t:0}; SOM.musica('final'); if(window.UI){ UI.modoNivel(false); UI.quizBotoes(false); UI.legenda(CENAS_FINAL[0]); }
}
function atualizaFinal(dt){ var it=J.final; if(!it||it.fim) return; it.t+=dt; }
function avancaFinal(){ var it=J.final; if(!it||it.fim) return; it.i++; it.t=0; if(it.i>=CENAS_FINAL.length){ it.i=CENAS_FINAL.length-1; it.fim=true; if(window.UI){ UI.legenda(null); UI.creditos(); } return; } if(window.UI) UI.legenda(CENAS_FINAL[it.i]); }
/* ---------- capa do livro: antes do mapa (o livro aberto) ---------- */
function iniciaCapa(){ J.estado='capa'; J.t=0; J.nivel=null; J.mundo=null; J.faseAtual=null; SOM.musica('mapa'); if(window.UI){ UI.modoNivel(false); UI.modoMapa(false); UI.cartaoMapa(null); UI.botaoCapa(true); } G.hud(); }
function abreLivro(){ if(window.UI) UI.botaoCapa(false); SOM.fx('iris'); iris(W/2,H/2,function(){ irMapa(false); }); }
function iniciaEscolha(){ J.estado='escolha'; J.t=0; document.body.classList.add('nacapa'); if(window.UI){ UI.modoMapa(false); UI.cartaoMapa(null); UI.escolhaHeroi(function(){ G.salva(); iniciaCapa(); }); } }

/* ---------- laço principal ---------- */
var ultimo=0;
function passo(ts){
  requestAnimationFrame(passo);
  var dt=Math.min(.033,(ts-ultimo)/1000||0); ultimo=ts;
  if(J.pausado||J.relogioTeste){ if(window.CENA) CENA.desenha(); return; }
  logica(dt);
  if(window.CENA) CENA.desenha();
}
/* um passo da LÓGICA (sem desenhar): o laço do jogo e o teste acelerado usam a mesma função */
function logica(dt){
  J.t+=dt; J.tFase+=dt;
  if(J.shake>0) J.shake=Math.max(0,J.shake-dt*30); if(J.flash>0) J.flash=Math.max(0,J.flash-dt*2);
  atualizaTrans(dt);
  switch(J.estado){
    case 'nivel': if(J.mundo&&J.urso&&(!J.trans||J.trans.fase==='abre')){ G.fisica(dt); if(J.estado==='nivel') atualizaNivel(dt); if(J.mundo&&J.estado!=='mapa') atualizaCamera(dt); } break;
    case 'cano': break;
    case 'chefeIntro': if(window.CHEFAO) CHEFAO.atualiza(dt); break;
    case 'quiz': if(window.QUIZ) QUIZ.atualiza(dt); if(J.chefe&&window.CHEFAO) CHEFAO.anima(dt); break;
    case 'final': atualizaFinal(dt); break;
    case 'corrida': if(window.CORRIDA) CORRIDA.atualiza(dt); break;
    case 'estadio': if(window.ESTADIO) ESTADIO.atualiza(dt); break;
    case 'fimFase': J.fimFase.t+=dt; J.urso.anim+=dt; break;
    case 'mapa': atualizaMapa(dt); break;
    case 'intro': atualizaIntro(dt); break;
  }
  atualizaParticulas(dt);
}
/* TESTE ACELERADO (QA): o relógio real para e o teste avança a lógica em passos fixos, rápido, sem desenhar */
G.relogioTeste=function(on){ J.relogioTeste=!!on; };
G.passoFixo=function(dt,n){ for(var i=0;i<(n||1);i++){ if(J.pausado) return; logica(dt); } };

/* ---------- init / API ---------- */
function init(){
  var cv=document.getElementById('game'); G.setCanvas(cv);
  G.carrega(); G.redimensiona(); window.addEventListener('resize',G.redimensiona);
  if(!J.prog.introVista) iniciaIntro(); else if(!J.prog.heroi) iniciaEscolha(); else iniciaCapa();
  requestAnimationFrame(passo);
}
function toque(cx,cy){ var p=G.paraLogico(cx,cy);
  if(J.estado==='intro'||J.estado==='final') return true; /* só o botão Next avança */
  if(J.estado==='escolha'&&window.CENA&&CENA.HX&&window.UI){ for(var hi=0;hi<CENA.HX.length;hi++){ if(Math.abs(p.x-CENA.HX[hi])<95&&p.y>110&&p.y<CENA.HY+10){ UI.selecionaHeroi(CENA.HEROIS[hi]); return true; } } return true; }
  if(J.estado==='mapa'&&p.y>60&&!J.trans){ mapaToque(p.x,p.y); return true; }
  if(J.estado==='quiz'&&window.QUIZ) return QUIZ.toque(p.x,p.y);
  if(J.estado==='nivel'&&tocaEntrada(p.x,p.y)) return true;
  if(J.estado==='corrida'&&window.CORRIDA) return CORRIDA.toque(p.x,p.y);
  if(J.estado==='estadio'&&window.ESTADIO) return ESTADIO.toque(p.x,p.y);
  return false; }
function confirmar(){ if(J.estado==='capa'){ abreLivro(); return true; } if(J.estado==='chefeIntro'&&window.CHEFAO){ CHEFAO.avancaIntro(); return true; } if(J.estado==='intro'){ avancaIntro(); return true; } if(J.estado==='final'){ avancaFinal(); return true; } if(J.estado==='mapa'&&!J.trans){ entraFase(J.sel); return true; } return false; }
function pausa(v){ J.pausado=!!v; }

G.init=init; G.toque=toque; G.mapaHover=mapaHover; G.seleciona=seleciona; G.confirmar=confirmar; G.mapaMove=mapaMove; G.pausa=pausa; G.irMapa=function(){ irMapa(false); }; G.voltaMapa=voltaMapa; G.entraFase=entraFase;
G.iniciaCapa=iniciaCapa; G.abreLivro=abreLivro; G.iniciaFinal=iniciaFinal; G.CENAS_FINAL=CENAS_FINAL; G.pulaFinal=function(){ if(J.final&&!J.final.fim){ J.final.i=CENAS_FINAL.length-1; avancaFinal(); } };
G.raioIris=raioIris; G.iris=iris; G.fimDeFase=fimDeFase; G.iniciaIntro=iniciaIntro; G.pulaIntro=fimIntro; G.iniciaEscolha=iniciaEscolha; G.CENAS_INTRO=CENAS_INTRO;
G.jogarDeNovo=function(){ if(J.faseAtual) G.iniciaFase(J.faseAtual); };
})(window.JOGO);
