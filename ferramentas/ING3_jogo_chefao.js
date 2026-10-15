/* ============================================================
   ING3_jogo_chefao.js — Inkwell Castle: o Conde Rabisco (reino 9).
   v3 (17/10, crítica do Paulo: "o chefão está tão malfeito: não tem
   ambientação visual e sonora, já começa na fase, coisas caem sem
   razão, não há ação esperada do jogador, o chefão é estático, não
   cria expectativa nem tensão"). Agora:
     ABERTURA  cena antes da luta (só avança no Next ▶): castelo às
               escuras, trovão e relâmpago, a tinta borbulha na sacada,
               o Conde SURGE da poça, se apresenta, conta o que fez e
               desafia; o narrador diz o que fazer. Música só depois.
     O CONDE   anda de um lado a outro da sacada, reage a tudo (ri
               quando acerta, fica tonto quando perde um tinteiro,
               bravo a cada rodada) e tem barra de vida com o nome.
     TUDO TEM ORIGEM: cada gota SAI da pena dele (ele levanta a pena,
               a gota voa em arco e a sombra marca o chão antes);
               as manchas são DERRAMADAS do tinteiro dele na sacada;
               as letras saem da pena enquanto ele escreve.
     OBJETIVO SEMPRE NA TELA (faixa no alto + seta no alvo):
       Rodada 1  TINTEIROS: acertar a ESTRELA no tinteiro que brilha (3).
       Rodada 2  MANCHAS: pisar ou acertar a estrela em 6 manchas.
       Rodada 3  LETRAS: as letras que caem viram uma ESCADA; subir por
                 ela até a sacada do Conde. As outras letras são ataque.
     Cada rodada termina num DUELO (ambiente de questões, 3 perguntas:
     1 fairy+realmb, 2 poem, 3 cause+circle). Entre as rodadas, faixa
     "ROUND 2 / ROUND 3" com o Conde cada vez mais bravo (tensão que
     se resolve na derrota dele e no FINAL circular).
   Sem game over: dano encolhe / volta ao início da sala; a rodada
   continua de onde estava.
   v4 (15/10, Paulo: "as estrelas não acertam o chefão nem causam dano;
   tem que ser fácil perceber que ESPAÇO joga a estrela, pode ser ▼
   também; outros seres do jogo podem apresentar as questões; só o
   chefão recomeça se a criança cair MUITAS vezes"):
     A FADA MADRINHA fica no canto da sala: é ela que dá as estrelas
       (voam dela para o herói), explica "ESPAÇO ou ▼ = estrela" e
       apresenta as perguntas dos duelos.
     ESTRELA GUIADA: a estrela voa em arco até o alvo da rodada (o
       tinteiro que brilha, se o herói está virado para ele) ou até o
       CONDE, que pisca de dor, perde vida e reage.
     VIDA: 12. Estrela tira 1 (até o piso da rodada), resposta certa
       tira 1; na derrota a barra esvazia até o fim.
     RECOMEÇO: 7 quedas na luta = a fada recomeça da rodada 1.
   v5 (15/10, Paulo: "já começa com as estrelas, não faz sentido; a fada só
   na hora das perguntas, que geram estrelas; o final tem que ter lógica:
   cada estrela no Conde joga uma letra que preenche YOU ARE A SUPER
   PLAYER no alto; imersivo, tenso, dramático, mas a criança consegue"):
     começa SEM estrelas; a fada chega com 3 perguntas (certa = 3 ★; no
     mínimo 3 ★ por visita) e volta quando as estrelas acabam;
     cada rodada tem um ESCUDO (tinteiros / manchas / subir a escada);
     com escudo a estrela é rebatida; sem escudo arranca uma LETRA;
     rodada 1 = YOU ARE A (7), 2 = SUPER (5), 3 = PLAYER (6): 18 letras.
   ============================================================ */
window.CHEFAO = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H, T=45, CHAO=450;
var RODADAS=[['fairy','realmb'],['poem'],['cause','circle']];
var SACADA_X0=17*T, SACADA_Y=6*T;
var C=null;

/* 18/10 (Paulo: "5 frases grandes, difícil de ler"): 3 telas, frases curtas */
var ABERTURA=[
  {en:'Inkwell Castle. Count Scribble lives here!', pt:'Castelo do Tinteiro. Aqui mora o Conde Rabisco!', fx:'trovao'},
  {en:'"HA HA! The lost endings are MINE!"', pt:'"RÁ RÁ! Os finais perdidos são MEUS!"', fx:'conde'},
  {en:'Answer to win stars. Hit the Count to take his letters!', pt:'Responda para ganhar estrelas. Acerte o Conde para tirar as letras dele!', fx:'tinteiros', botao:"Let's go! ▶"}
];

function falaC(en,pt,dur){ if(!C) return; C.fala={en:en,pt:pt,t:0,dur:dur||3.2}; try{ say(en); }catch(e){} }
function inicia(L){
  C={x:19*T, y:SACADA_Y, letrasOk:0, letraVoa:[], escudo:true, fadaOn:false, visitas:0, fadaDepois:0, esperaFada:0, fadaSai:0, mortes:0, tiros:[], dons:[], fada:{x:2.4*T,y:CHAO-150,fala:null} /* flutua no alto: os botões de toque não cobrem */, downAnt:false, estado:'idle', et:0, ronda:-1, fase:'abertura', t:0, passo:0, aparece:0, escuro:1, raio:0,
     gotas:[], voando:[], letras:[], blocos:[], tinteiros:[], alvo:0, ondas:0, convertidas:0, banner:null, tRaio:6, alt:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], tLetra:0, nLetra:0,
     m:{x:19*T, y:SACADA_Y, tipo:'godmother', falando:0, i:0}};
  J.chefe=C; J.estado='chefeIntro'; SOM.musica('');
  C.tinteiros=[{x:5*T+22,y:7*T},{x:11*T+22,y:7*T},{x:8*T+22,y:CHAO}].map(function(p){ return {x:p.x,y:p.y,caido:false}; });
  if(window.UI){ UI.modoNivel(false); UI.acao(false,0); }
  mostraPasso();
}
function mostraPasso(){
  var p=ABERTURA[C.passo]; if(!p) return;
  if(p.fx==='trovao'){ C.raio=1; J.flash=.4; SOM.fx('quebra'); J.shake=6; }
  if(p.fx==='borbulha'){ SOM.fx('cano'); }
  if(p.fx==='conde'){ C.aparece=.001; C.estado='laugh'; C.et=0; SOM.fx('chefao'); J.shake=6; J.flash=.35; SOM.musica('chefao'); }
  if(p.fx==='risada'){ C.estado='laugh'; C.et=0; SOM.fx('risada'); }
  if(p.fx==='tinteiros'){ SOM.fx('destrava'); }
  if(p.fx==='fada'){ SOM.fx('estrela'); }
  if(window.UI) UI.legenda({en:p.en,pt:p.pt,botao:p.botao},{next:avancaIntro,pula:fimIntro});
}
function avancaIntro(){ if(!C||C.fase!=='abertura') return; C.passo++; if(C.passo>=ABERTURA.length){ fimIntro(); return; } mostraPasso(); }
function fimIntro(){ if(!C) return; if(window.UI){ UI.legenda(null); UI.modoNivel(true); } C.aparece=1; C.escuro=0; J.estado='nivel'; SOM.musica('chefao'); J.urso.poderes.estrelas=0; comecaFase(1); estrelasHUD(); }

function falaF(en,pt,dur){ if(!C) return; C.fada.fala={en:en,pt:pt,t:0,dur:dur||3.4}; try{ say(en); }catch(e){} }
/* ---------- v5 (15/10, Paulo): as estrelas se CONQUISTAM. A fada só aparece na hora
   das perguntas; cada resposta certa vira estrelas. Cada estrela no Conde (sem escudo)
   arranca uma LETRA dele, que voa para a frase do alto: YOU ARE A SUPER PLAYER. ---------- */
var FRASE='YOU ARE A SUPER PLAYER', NLET=FRASE.replace(/ /g,'').length, METAS=[7,12,18]; /* YOU ARE A | SUPER | PLAYER */
function estrelasHUD(){ var u=J.urso, n=(u&&u.poderes.estrelas)||0; if(window.UI) UI.acao(n>0,n); }
/* a fada chega (brilho), faz 3 perguntas; certa = 2 estrelas; no fim ela joga as estrelas no herói */
function fadaVem(primeira){
  if(!C||C.fadaOn) return; C.fadaOn=true; C.fadaT=0; C.ganho=0; C.visitas++; SOM.fx('estrela');
  falaF(primeira?'I am the Fairy Godmother! Answer and win STARS!':'Need stars? Answer my questions!',primeira?'Sou a Fada Madrinha! Responda e ganhe ESTRELAS!':'Precisa de estrelas? Responda às minhas perguntas!',2.6);
  C.esperaFada=1.6;
}
function abreDuelo(){
  C.faseAntes=C.fase; C.fase='quiz'; C.fala=null;
  var itens=itensDa(Math.min(2,C.ronda)); if(!itens.length){ J.nivel.quizIds=[]; itens=itensDa(Math.min(2,C.ronda)); }
  QUIZ.inicia(C.m,{itens:itens,
    aoResponder:function(ok){ if(ok){ C.ganho+=3; SOM.fx('estrela'); } else { C.estado='laugh'; C.et=0; SOM.fx('risada'); } },
    aoTerminar:function(){ fimDuelo(); }, aoSair:function(){ fimDuelo(); }});
  if(J.estado!=='quiz') fimDuelo();
}
function fimDuelo(){
  if(!C) return; C.fase=C.faseAntes||'p1'; C.t=Math.max(C.t,1); var n=C.ganho;
  if(n<3){ n=3; falaF('Here are 3 stars. You can do it!','Tome 3 estrelas. Você consegue!',2.6); } else falaF(n+' stars for you! SPACE or ▼ to throw!',n+' estrelas para você! ESPAÇO ou ▼ para jogar!',2.6);
  var u=J.urso, f=C.fada; for(var k=0;k<Math.min(n,9);k++) C.dons.push({x0:f.x+20,y0:f.y-40,t:-k*.12});
  u.poderes.estrelas=(u.poderes.estrelas||0)+n; estrelasHUD(); C.fadaSai=1.8;
}
/* a estrela que o herói joga vira ESTRELA GUIADA: vai ao alvo da rodada; com escudo, o Conde a rebate */
function guiaEstrelas(){
  var u=J.urso; (J.estrelas||[]).forEach(function(e){ if(e.skin||e.guiada) return; e.guiada=true; e.dist=999; estrelasHUD();
    var alvo=null;
    if(C.escudo&&C.fase==='p1'){ var tq=null; C.tinteiros.forEach(function(q){ if(!q.caido&&(!tq||Math.abs(q.x-u.x)<Math.abs(tq.x-u.x))) tq=q; }); if(tq) alvo={x:tq.x,y:tq.y-24,tipo:'tinteiro',tq:tq}; }
    if(!alvo&&C.escudo&&C.fase==='p2'){ var bl=null; J.mundo.inimigos.forEach(function(en){ if(en.doConde&&!en.morto&&!en.achatado&&(!bl||Math.abs(en.x-u.x)<Math.abs(bl.x-u.x))) bl=en; }); if(bl) alvo={x:bl.x,y:bl.y-20,tipo:'mancha',en:bl}; }
    if(!alvo) alvo={x:C.x,y:C.y-70,tipo:'conde'};
    C.tiros.push({x0:e.x,y0:e.y,x:e.x,y:e.y,alvo:alvo,t:0,dur:.5+Math.min(.35,Math.abs(alvo.x-e.x)/1400),rot:0}); });
}
function acertaConde(p){
  if(C.escudo){ /* rebate no escudo: ensina que primeiro se quebra o escudo */
    SOM.fx('pisao'); G.brilho(C.x,C.y-70,8,'#c4b5fd'); C.estado='laugh'; C.et=0; C.escudoBrilho=.5;
    if(!C.avisouEscudo||C.t-C.avisouEscudo>5){ C.avisouEscudo=C.t; var m=C.fase==='p1'?['HA! My shield! Break my inkwells first!','RÁ! Meu escudo! Quebre meus tinteiros primeiro!']:(C.fase==='p2'?['HA! My shield! Stop my ink blots first!','RÁ! Meu escudo! Pare minhas manchas primeiro!']:['HA! Come up here if you can!','RÁ! Suba aqui se puder!']); falaC(m[0],m[1],2.6); }
    return; }
  C.estado='hit'; C.et=0; C.dor=.5; SOM.fx('chefao'); J.shake=5; G.brilho(C.x,C.y-70,14,'#fde047'); G.pontua(25,C.x,C.y-150);
  /* uma letra sai do Conde e voa para a frase do alto */
  var i=C.letrasOk; if(i<NLET){ C.letraVoa.push({i:i,x0:C.x-J.cam,y0:C.y-120-J.camY,t:0}); C.letrasOk++; SOM.fx('faisca'); }
  C.nAcertos=(C.nAcertos||0)+1; if(C.nAcertos%3===1){ var r=[['OUCH! My hat!','AI! Meu chapéu!'],['Stop that, little hero!','Pare com isso, heroizinho!'],['Grr! My letters!','Grr! Minhas letras!']][(C.nAcertos>>1)%3]; falaC(r[0],r[1],2.2); }
  if(C.letrasOk>=METAS[C.ronda]){ if(C.ronda>=2) vitoria(); else transicao(C.ronda+2); }
}
function voaTiros(dt){
  for(var i=C.tiros.length-1;i>=0;i--){ var p=C.tiros[i]; p.t+=dt; p.rot+=dt*12; var k=Math.min(1,p.t/p.dur), a=p.alvo, ax=a.tipo==='conde'?C.x:a.x;
    p.x=p.x0+(ax-p.x0)*k; p.y=p.y0+(a.y-p.y0)*k-Math.sin(k*Math.PI)*90;
    if(k>=1){ C.tiros.splice(i,1); G.brilho(p.x,p.y,10,'#fde047');
      if(a.tipo==='conde'){ if(/^p/.test(C.fase)) acertaConde(p); }
      else if(a.tipo==='mancha'){ if(!a.en.morto&&!a.en.achatado&&window.PERIGOS) PERIGOS.transforma(a.en); }
      else if(a.tipo==='tinteiro'&&!a.tq.caido&&C.fase==='p1'){ a.tq.caido=true; C.alvo++; SOM.fx('quebra'); J.shake=6; G.brilho(a.tq.x,a.tq.y-30,16,'#a78bfa'); C.estado='hit'; C.et=0;
        if(C.alvo<3) falaC(C.alvo===1?'NO! My inkwell!':'Not another one!',C.alvo===1?'NÃO! Meu tinteiro!':'Outro não!'); else quebraEscudo(); } } }
  for(var j=C.dons.length-1;j>=0;j--){ var d=C.dons[j]; d.t+=dt; if(d.t>.7) C.dons.splice(j,1); }
  for(var q=C.letraVoa.length-1;q>=0;q--){ var L=C.letraVoa[q]; L.t+=dt; if(L.t>.9) C.letraVoa.splice(q,1); }
}
function quebraEscudo(){ if(!C.escudo) return; C.escudo=false; SOM.fx('quebra'); J.shake=8; G.brilho(C.x,C.y-80,24,'#c4b5fd'); banner('SHIELD DOWN!','ESCUDO QUEBRADO!');
  falaC('NO! My shield!','NÃO! Meu escudo!',2.4); }
/* quedas na luta: só depois de MUITAS (7 na mesma rodada) tudo recomeça do começo */
function morreu(){ if(!C||C.fase==='abertura'||C.fase==='derrota') return; C.mortes++;
  if(C.mortes===4) falaC('HA HA! Is that all, little hero?','RÁ RÁ! Só isso, heroizinho?',2.6); C.animaF=1;
  if(C.mortes>=7){ C.mortes=0; C.letrasOk=0; C.ronda=0; C.blocos=[]; C.alt=C.alt.map(function(){ return 0; }); J.mundo.inimigos=J.mundo.inimigos.filter(function(e){ return !e.doConde; });
    J.urso.poderes.estrelas=0; estrelasHUD(); banner('TRY AGAIN!','TENTE DE NOVO!'); comecaFase(1); } }
function comecaFase(n){
  C.fase='p'+n; C.ronda=n-1; C.t=0; C.gotas=[]; C.letras=[]; C.escudo=true; C.mortes=0; C.fadaOn=false; SOM.musica('chefao');
  C.letrasOk=Math.min(C.letrasOk,n>1?METAS[n-2]:0);
  if(n===1){ C.alvo=0; C.tinteiros.forEach(function(q){ q.caido=false; }); falaC('My magic inkwells make my SHIELD!','Meus tinteiros mágicos fazem o meu ESCUDO!'); }
  if(n===2){ C.convertidas=0; C.ondas=0; J.mundo.inimigos=J.mundo.inimigos.filter(function(e){ return !e.doConde; }); falaC('New shield! Ink blots, GO!','Escudo novo! Manchas, VÃO!'); }
  if(n===3){ C.blocos=[]; C.alt=C.alt.map(function(){ return 0; }); C.nLetra=0; C.tLetra=1.2; falaC('You will NEVER reach me!','Você NUNCA vai me alcançar!'); }
  C.fadaDepois=n===1?2.6:3.0; /* a fada chega logo depois da fala do Conde */
}
function banner(en,pt){ C.banner={en:en,pt:pt,t:0}; SOM.fx('chefao'); J.shake=6; }
function itensDa(r){ var ja=J.nivel.quizIds||(J.nivel.quizIds=[]), out=[];
  RODADAS[r].forEach(function(tema,k){ var n=k===0?(RODADAS[r].length>1?2:3):1; QUIZ.escolhe({tema:tema},n,ja).forEach(function(it){ ja.push(it.id); out.push(it); }); });
  return out; }
function transicao(n){
  C.fase='transicao'; C.t=0; C.prox=n; C.estado='hit'; C.et=0; C.tiros=[]; C.gotas=[]; C.letras=[];
  banner('ROUND '+n,'RODADA '+n);
  if(n===2) falaC('Grrr! You took my letters! Now my blots!','Grrr! Você pegou minhas letras! Agora, as manchas!');
  else falaC('ENOUGH! My GIANT letters!','CHEGA! Minhas letras GIGANTES!');
}
function vitoria(){ derrota(); C.vitoria={t:0}; try{ say('You are a super player!'); }catch(e){} }
function derrota(){
  C.fase='derrota'; C.t=0; C.estado='sad'; C.gotas=[]; C.letras=[]; C.tiros=[]; SOM.musica(''); SOM.fx('vitoria');
  falaC('Oh no… you won! The lost endings are free!','Ah, não… você venceu! Os finais perdidos estão livres!',4);
}
/* a pena do Conde: de onde sai tudo que ele joga */
function pena(){ return {x:C.x-46, y:C.y-170}; }
function novaGota(){ var u=J.urso, p=pena(), lado=Math.random()<.5?-1:1, alvo=Math.max(40,Math.min(16*T,u.x+(Math.random()<.35?0:lado*(70+Math.random()*90)))); C.gotas.push({x0:p.x,y0:p.y,alvo:alvo,t:0,dur:1.35,x:p.x,y:p.y,r:13}); /* 18/10: nem sempre na criança; 1,35 s de sombra para sair */ C.estado='write'; C.et=0; SOM.fx('arremesso'); }
/* letras: a cada duas, uma vira degrau da ESCADA (colunas 13, 14, 15 empilhando 1, 2, 3); a outra é ataque */
var ESCADA=[14,15,15,16,16,16]; /* 18/10: o último degrau encosta na sacada (col 17): sobe sem pulo de fé */
function novaLetra(){
  var u=J.urso, p=pena(), deg=C.nLetra%2===1&&C.nLetra>>1<ESCADA.length, alvo;
  if(deg){ var col=ESCADA[C.nLetra>>1]; alvo=col*T+T/2; } else alvo=Math.max(40,Math.min(12*T,u.x+(Math.random()<.5?-1:1)*(80+Math.random()*80)));
  C.letras.push({x0:p.x,y0:p.y,alvo:alvo,t:0,dur:1.1,x:p.x,y:p.y,ch:'INKBLOT'.charAt(C.nLetra%7),degrau:deg,col:deg?ESCADA[C.nLetra>>1]:-1});
  C.nLetra++; C.estado='write'; C.et=0; SOM.fx('arremesso');
}
function solidos(s){ if(!C) return; C.blocos.forEach(function(b){ s.push({x:b.x,y:b.y,w:b.w,h:b.h,letra:b}); }); }

function atualiza(dt){
  if(!C) return; C.t+=dt; C.et+=dt; if(C.fala) C.fala.t+=dt; if(C.banner) C.banner.t+=dt;
  if(C.estado!=='idle'&&C.estado!=='sad'&&C.et>1) C.estado='idle';
  if(C.aparece>0&&C.aparece<1) C.aparece=Math.min(1,C.aparece+dt*1.2);
  if(C.raio>0) C.raio=Math.max(0,C.raio-dt*1.5);
  if(C.fase!=='abertura'&&C.escuro>0) C.escuro=Math.max(0,C.escuro-dt);
  /* relâmpago de vez em quando nas janelas (clima) */
  C.tRaio-=dt; if(C.tRaio<=0){ C.tRaio=9+Math.random()*5; C.raio=.6; J.flash=Math.max(J.flash,.12); SOM.fx('quebra'); }
  /* o Conde anda pela sacada (não fica parado) */
  if(C.fase!=='abertura'&&C.fase!=='derrota'&&C.fase!=='quiz') C.x=19.2*T+Math.sin(C.t*.7)*1.3*T;
  voa(dt); voaTiros(dt); if(C.dor>0) C.dor-=dt; if(C.fada.fala) C.fada.fala.t+=dt; if(C.escudoBrilho>0) C.escudoBrilho-=dt; if(C.vitoria) C.vitoria.t+=dt; if(C.fadaOn) C.fadaT+=dt;
  if(J.estado!=='nivel') return;
  var u=J.urso, R=G.ursoRet(), vivo=u.invT<=0&&u.tontoT<=0;
  /* a fada: chega depois da fala do Conde, pergunta, entrega as estrelas e vai embora */
  if(C.animaF){ C.animaF=0; C.fadaOn=true; C.fadaT=0; C.fadaSai=3; falaF("Don't give up! You can do it!",'Não desista! Você consegue!',2.8); }
  if(C.fadaDepois>0){ C.fadaDepois-=dt; if(C.fadaDepois<=0) fadaVem(C.visitas===0); }
  if(C.esperaFada>0){ C.esperaFada-=dt; if(C.esperaFada<=0){ abreDuelo(); return; } }
  if(C.fadaSai>0){ C.fadaSai-=dt; if(C.fadaSai<=0){ C.fadaOn=false; C.ultVisita=C.t; } }
  if(/^p/.test(C.fase)&&!C.fadaOn&&C.fadaDepois<=0&&(u.poderes.estrelas||0)<=0&&!C.tiros.length&&!C.dons.length&&(C.t-(C.ultVisita||-99))>4){ C.semT=(C.semT||0)+dt; if(C.semT>1.2){ C.semT=0; fadaVem(false); } } else C.semT=0;
  /* ▼ também joga a estrela (Paulo: "pode ser pra baixo também") */
  if(J.in.down&&!C.downAnt&&/^p/.test(C.fase)&&window.PERIGOS) PERIGOS.atira(); C.downAnt=!!J.in.down;
  guiaEstrelas();
  if(C.fase==='derrota'){ if(C.t>5){ G.iniciaFinal(); return; } } /* o final limpa o Conde: não seguir usando C */
  else if(C.fase==='transicao'){ if(C.t>2.8){ C.banner=null; comecaFase(C.prox); } }
  else if(C.fase==='p1'){
    var ritmo=3.4-C.alvo*.3;
    if(Math.floor((C.t-dt)/ritmo)!==Math.floor(C.t/ritmo)) novaGota();
  }
  else if(C.fase==='p2'){
    if(Math.floor((C.t-dt)/3.0)!==Math.floor(C.t/3.0)) novaGota();
    if(C.escudo&&Math.floor((C.t-dt)/3.6)!==Math.floor(C.t/3.6)&&C.ondas<5){ C.ondas++; C.estado='write'; C.et=0; SOM.fx('cano');
      /* derrama do tinteiro da sacada: caem pela borda e saem andando */
      for(var k=0;k<2;k++) C.gotas.push({x0:SACADA_X0+20,y0:SACADA_Y-10,alvo:SACADA_X0-40-k*70,t:-k*.3,dur:.7,x:SACADA_X0,y:SACADA_Y,r:15,vira:true}); }
    var vencidas=J.mundo.inimigos.filter(function(e){ return e.doConde&&(e.morto||e.achatado); }).length; C.convertidas=vencidas;
    if(vencidas>=4&&C.escudo){ J.mundo.inimigos.forEach(function(e){ if(e.doConde){ e.achatado=true; e.tAch=.3; } }); quebraEscudo(); }
  }
  else if(C.fase==='p3'){
    C.tLetra-=dt; if(C.tLetra<=0){ C.tLetra=C.escudo?1.4:2.6; if(C.escudo) novaLetra(); else novaGota(); }
    /* chegou na sacada pela escada de letras: o duelo final */
    if(C.escudo&&u.noChao&&u.x>SACADA_X0+10&&u.y<=SACADA_Y+6){ C.letras=[]; quebraEscudo(); falaC('WHAT?! You climbed up here?!','O QUÊ?! Você subiu aqui?!',2.6); }
  }
  /* gotas e letras voam em ARCO da pena até o alvo; a sombra no chão avisa */
  [C.gotas,C.letras].forEach(function(lista,ehLetra){
    for(var g=lista.length-1;g>=0;g--){ var d=lista[g]; d.t+=dt; if(d.t<0) continue; var k=Math.min(1,d.t/d.dur);
      var chao=ehLetra&&d.degrau?CHAO-C.alt[d.col]*T:CHAO;
      d.x=d.x0+(d.alvo-d.x0)*k; d.y=d.y0+(chao-d.y0)*k*k-Math.sin(k*Math.PI)*(ehLetra?60:110);
      var tam=(ehLetra?24:d.r)*.75; /* acerta só se cair mesmo em cima */
      if(vivo&&k>.55&&G.colideRet(R.x+4,R.y,R.w-8,R.h,d.x-tam,d.y-tam,tam*2,tam*2)){ lista.splice(g,1); G.machucado(); SOM.fx('risada'); C.estado='laugh'; C.et=0; continue; }
      if(k>=1){ lista.splice(g,1); J.shake=ehLetra?6:2;
        G.emite(8,function(){ return {x:d.alvo,y:chao-4,vx:(Math.random()-.5)*160,vy:-60-Math.random()*90,vida:.5,max:.5,tipo:'fogo',cor:ehLetra?'#7c3aed':'#312e81',r:3,g:1}; });
        if(d.vira){ J.mundo.inimigos.push({tipo:'tinta',x:d.alvo,y:CHAO,x0:d.alvo,y0:CHAO,dir:-1,v:55+Math.random()*20,voa:false,doConde:true}); }
        if(ehLetra&&d.degrau){ var bx=d.col*T, by=chao-T; C.blocos.push({x:bx,y:by,w:T,h:T,ch:d.ch}); C.alt[d.col]++; SOM.fx('tijolo');
          if(u.x>bx-12&&u.x<bx+T+12&&u.y>by){ u.x=bx-20; G.machucado(); } }
      } }
  });
}
function voa(dt){
  for(var i=C.voando.length-1;i>=0;i--){ var p=C.voando[i]; p.t+=dt; var k=Math.min(1,p.t/.8); p.cx=p.x+(C.x-p.x)*k; p.cy=p.y+(C.y-60-p.y)*k-Math.sin(k*Math.PI)*120; if(k>=1){ C.voando.splice(i,1); C.hp=Math.max(1,C.hp-1); C.dor=.5; C.estado='hit'; C.et=0; SOM.fx('chefao'); J.shake=8; G.brilho(C.x,C.y-60,14,'#fde047'); } }
}
function anima(dt){ if(!C) return; C.et+=dt; if(C.estado!=='idle'&&C.estado!=='sad'&&C.et>1) C.estado='idle'; voa(dt); if(C.dor>0) C.dor-=dt; }

/* ---------- desenho (no mundo) ---------- */
function desenha(c,t){
  if(!C) return;
  /* janelas do castelo com relâmpago */
  if(C.raio>0){ c.save(); c.globalAlpha=C.raio*.7; c.fillStyle='#e0e7ff'; [[3*T,90],[9*T,70],[14*T,90]].forEach(function(w){ A.rr(c,w[0],w[1],60,110,30); c.fill(); }); c.restore(); }
  /* tochas nas paredes */
  [[1.5*T,5*T],[8*T,4*T],[15*T,5*T]].forEach(function(p,i){ c.fillStyle='#57534e'; c.fillRect(p[0]-4,p[1],8,30); var f=Math.sin(t*14+i*2)*3; c.fillStyle='rgba(251,146,60,.35)'; A.circ(c,p[0],p[1]-8,26+f); c.fill(); c.fillStyle='#f97316'; c.beginPath(); c.moveTo(p[0]-8,p[1]); c.quadraticCurveTo(p[0],p[1]-30-f,p[0]+8,p[1]); c.fill(); c.fillStyle='#fde047'; c.beginPath(); c.moveTo(p[0]-4,p[1]); c.quadraticCurveTo(p[0],p[1]-16-f,p[0]+4,p[1]); c.fill(); });
  /* a poça que borbulha na sacada (abertura) e o Conde surgindo dela */
  if(C.fase==='abertura'&&C.passo>=1){ var bb=Math.sin(t*6); c.fillStyle='#1e1b4b'; A.el(c,C.x,C.y-4,70,12); c.fill(); c.fillStyle='#4338ca'; for(var q=0;q<5;q++){ var ph=(t*1.6+q*.37)%1; A.circ(c,C.x-50+q*25,C.y-8-ph*40,6*(1-ph)+2); c.fill(); } }
  if(A.conde&&(C.fase!=='abertura'||C.aparece>0)){ var k=C.fase==='abertura'?C.aparece:1;
    var dor=C.dor>0?C.dor/.5:0; c.save(); c.translate(C.x+(dor?Math.sin((1-dor)*Math.PI*3)*6:0),C.y); c.scale(.6+.4*k,k); c.globalAlpha=Math.min(1,k*1.5); A.conde(c,0,0,C.estado,t);
    if(dor){ c.globalAlpha=dor*.45; c.fillStyle='#fde047'; A.circ(c,0,-80,60); c.fill(); }
    if(C.escudo&&C.fase!=='abertura'&&C.fase!=='derrota'){ c.globalAlpha=1; var eb=C.escudoBrilho>0?C.escudoBrilho/.5:0; c.fillStyle='rgba(167,139,250,'+(.16+.3*eb)+')'; A.circ(c,0,-95,105); c.fill(); c.strokeStyle='rgba(221,214,254,'+(.7+.3*eb)+')'; c.lineWidth=4; A.circ(c,0,-95,105); c.stroke(); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=2; c.beginPath(); c.arc(0,-95,92,3.6+Math.sin(t*.8)*.2,4.4+Math.sin(t*.8)*.2); c.stroke(); }
    c.restore(); }
  /* a Fada Madrinha no canto da sala (dá as estrelas e faz as perguntas) */
  if(A.morador&&C.fadaOn&&C.fase!=='quiz'){ var f=C.fada, fy=f.y+Math.sin(t*1.6)*6-Math.max(0,1-C.fadaT*2)*120; /* chega descendo do alto, só na hora das perguntas */ c.save(); c.globalAlpha=.35; c.fillStyle='#fde68a'; A.circ(c,f.x,fy-50,54); c.fill(); c.restore(); A.morador(c,'godmother',f.x,fy,t,1,!!(f.fala&&f.fala.t<f.fala.dur));
    for(var s3=0;s3<4;s3++){ var a3=t*1.2+s3*1.57; A.estrela(c,f.x+Math.cos(a3)*46,fy-56+Math.sin(a3)*20,4,'#fde047',a3); } }
  C.dons.forEach(function(d){ if(d.t<0) return; var u=J.urso, k2=Math.min(1,d.t/.6), x=d.x0+(u.x-d.x0)*k2, y=d.y0+(u.y-50-d.y0)*k2-Math.sin(k2*Math.PI)*80; A.estrela(c,x,y,10,'#fde047',d.t*8); });
  C.tiros.forEach(function(p){ c.save(); c.globalAlpha=.35; A.estrela(c,p.x-(p.alvo.x>p.x0?14:-14),p.y+4,9,'#fde68a',p.rot); c.restore(); A.estrela(c,p.x,p.y,13,'#fde047',p.rot); });
  /* tinteiros (rodada 1) com seta no que brilha */
  C.tinteiros.forEach(function(tq,i){ c.save(); c.translate(tq.x,tq.y); if(tq.caido) c.rotate(1.3);
    var aceso=!tq.caido&&(C.fase==='p1'||(C.fase==='abertura'&&C.passo>=2));
    if(aceso){ var g=c.createRadialGradient(0,-24,4,0,-24,62); g.addColorStop(0,'rgba(253,224,71,'+(.75+.25*Math.sin(t*6))+')'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; A.circ(c,0,-24,62); c.fill(); }
    c.fillStyle=aceso?A.lin(c,-16,-40,16,0,'#fde68a','#d97706'):'#1e1b4b'; A.rr(c,-16,-40,32,40,8); c.fill(); if(aceso){ c.strokeStyle='#fff'; c.lineWidth=3; A.rr(c,-16,-40,32,40,8); c.stroke(); } c.fillStyle='#4c1d95'; A.rr(c,-10,-48,20,10,4); c.fill();
    c.strokeStyle='#e9d5ff'; c.lineWidth=3; c.beginPath(); c.moveTo(6,-48); c.quadraticCurveTo(22,-78,30,-92); c.stroke();
    if(tq.caido){ c.fillStyle='#312e81'; A.el(c,8,4,26,6); c.fill(); }
    c.restore();
    if(aceso){ var b=Math.abs(Math.sin(t*4))*10; c.save(); c.translate(tq.x,tq.y-110-b); c.fillStyle='#fde047'; c.strokeStyle='#78350f'; c.lineWidth=3; c.beginPath(); c.moveTo(-12,-22); c.lineTo(12,-22); c.lineTo(12,-8); c.lineTo(22,-8); c.lineTo(0,14); c.lineTo(-22,-8); c.lineTo(-12,-8); c.closePath(); c.fill(); c.stroke(); A.estrela(c,0,-36,10,'#fde047',t*2); c.restore(); } });
  /* letras caídas: a ESCADA */
  C.blocos.forEach(function(b){ c.fillStyle=A.lin(c,b.x,b.y,b.x,b.y+b.h,'#8b5cf6','#4c1d95'); A.rr(c,b.x+1,b.y+1,b.w-2,b.h-2,8); c.fill(); c.strokeStyle='#2e1065'; c.lineWidth=2; A.rr(c,b.x+1,b.y+1,b.w-2,b.h-2,8); c.stroke();
    c.fillStyle='#f5f3ff'; c.font='900 30px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(b.ch,b.x+b.w/2,b.y+b.h/2+1); });
  if(C.fase==='p3'){ /* setas mostrando a subida */ var b2=Math.abs(Math.sin(t*3))*6; c.save(); c.globalAlpha=.85; c.fillStyle='#fde047'; [[14,1],[15,2],[16,3],[17.4,4]].forEach(function(p,i){ var yy=CHAO-p[1]*T-22-b2; if(p[0]<17&&C.alt[p[0]]<p[1]) return; c.beginPath(); c.moveTo(p[0]*T+10,yy); c.lineTo(p[0]*T+34,yy-10); c.lineTo(p[0]*T+34,yy+10); c.closePath(); c.fill(); }); c.restore(); }
  /* sombras de aviso, gotas e letras em voo */
  [C.gotas,C.letras].forEach(function(lista,ehLetra){ lista.forEach(function(d){ if(d.t<0) return;
    var k=Math.min(1,d.t/d.dur), chao=ehLetra&&d.degrau?CHAO-C.alt[d.col]*T:CHAO; c.fillStyle='rgba(30,27,75,'+(.15+.45*k)+')'; A.el(c,d.alvo,chao-2,(ehLetra?28:16)*(.5+.6*k),6); c.fill();
    if(!d.vira){ c.strokeStyle='rgba(239,68,68,.6)'; c.lineWidth=2; A.el(c,d.alvo,chao-2,(ehLetra?32:22),8); c.stroke(); }
    if(ehLetra){ c.save(); c.translate(d.x,d.y); c.rotate(Math.sin(k*6)*.2); c.fillStyle=d.degrau?'#8b5cf6':'#7c3aed'; c.strokeStyle='#2e1065'; c.lineWidth=5; c.font='900 50px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.strokeText(d.ch,0,0); c.fillText(d.ch,0,0); c.restore(); }
    else { c.fillStyle='#312e81'; c.beginPath(); c.moveTo(d.x,d.y-d.r*1.6); c.quadraticCurveTo(d.x+d.r,d.y-d.r*.2,d.x,d.y+d.r); c.quadraticCurveTo(d.x-d.r,d.y-d.r*.2,d.x,d.y-d.r*1.6); c.fill(); c.fillStyle='rgba(196,181,253,.7)'; A.circ(c,d.x-d.r*.3,d.y,d.r*.3); c.fill(); }
  }); });
  C.voando.forEach(function(p){ if(p.cx===undefined) return; if(A.paginaVoando) A.paginaVoando(c,p.cx,p.cy,p.t*8); });
}
/* ---------- na tela: escuridão da abertura, barra do Conde, objetivo, fala, faixa da rodada ---------- */
/* a frase do alto: YOU ARE A SUPER PLAYER, uma casinha por letra */
var SL=21;
function slot(i){ var n=-1; for(var k=0;k<FRASE.length;k++){ if(FRASE[k]===' ') continue; n++; if(n===i){ var x0=W/2-FRASE.length*SL/2; return {x:x0+k*SL+SL/2, y:74, ch:FRASE[k]}; } } return {x:W/2,y:74,ch:''}; }
function frase(c,t){
  var x0=W/2-FRASE.length*SL/2-12; c.fillStyle='rgba(13,11,30,.72)'; A.rr(c,x0,52,FRASE.length*SL+24,40,12); c.fill(); c.strokeStyle='rgba(253,224,71,.55)'; c.lineWidth=2; A.rr(c,x0,52,FRASE.length*SL+24,40,12); c.stroke();
  var voando={}; C.letraVoa.forEach(function(L){ voando[L.i]=1; });
  for(var i=0;i<NLET;i++){ var s0=slot(i), ok=i<C.letrasOk&&!voando[i], meta=i<METAS[Math.min(2,Math.max(0,C.ronda))];
    c.fillStyle=ok?'rgba(253,224,71,.2)':(meta?'rgba(255,255,255,.14)':'rgba(255,255,255,.06)'); A.rr(c,s0.x-9,60,18,26,5); c.fill();
    if(ok){ c.font='900 19px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillStyle='#fde047'; c.fillText(s0.ch,s0.x,74); } }
}
function desenhaTela(c,t){
  if(!C) return;
  if(C.escuro>0){ c.fillStyle='rgba(8,6,20,'+(C.escuro*(.55-C.raio*.2))+')'; c.fillRect(0,0,W,H); }
  if(C.fase!=='abertura'){
    var y=58;
    frase(c,t);
    var vencidas=C.convertidas||0;
    var obj=!/^p/.test(C.fase)?null:(!C.escudo?['★ the Count! Take his letters!','Jogue ★ no Conde! Tire as letras dele!']:(C.fase==='p1'?['Break his shield: ★ the inkwells!  '+C.alvo+' / 3','Quebre o escudo: ★ nos tinteiros!']:(C.fase==='p2'?['Break his shield: stop the blots!  '+Math.min(4,vencidas)+' / 4','Quebre o escudo: pare as manchas!']:['Climb the letters to the Count!','Suba nas letras até o Conde!'])));
    if(obj){ c.font='900 18px "Nunito",Arial'; var tw=c.measureText(obj[0]).width+30; c.fillStyle='rgba(76,29,149,.85)'; A.rr(c,W/2-tw/2,y+42,tw,J.tr?46:30,15); c.fill(); c.fillStyle='#fde68a'; c.textAlign='center'; c.textBaseline='top'; c.fillText(obj[0],W/2,y+47); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#fff'; c.fillText(obj[1],W/2,y+69); }
      /* como jogar a estrela: sempre à vista, no canto de baixo */
      var dica=J.tr?'★ = ESPAÇO ou ▼':'★ = SPACE or ▼'; c.font='900 16px "Nunito",Arial'; var tw4=c.measureText(dica).width+28; c.fillStyle='rgba(13,11,30,.75)'; A.rr(c,W/2-tw4/2,H-44,tw4,32,16); c.fill(); c.fillStyle='#fde047'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(dica,W/2,H-28); }
  }
  if(C.fala&&!J.quiz&&C.fala.t<C.fala.dur&&C.fase!=='abertura'){ c.font='900 19px "Nunito",Arial'; var tw2=Math.min(560,c.measureText(C.fala.en).width)+36, bx=Math.max(20,Math.min(W-tw2-20,C.x-J.cam-tw2-30)), by=150;
    c.fillStyle='#ede9fe'; A.rr(c,bx,by,tw2,J.tr?62:44,16); c.fill(); c.beginPath(); c.moveTo(bx+tw2-30,by+(J.tr?60:42)); c.lineTo(bx+tw2,by+(J.tr?78:60)); c.lineTo(bx+tw2-60,by+(J.tr?60:42)); c.fill();
    c.fillStyle='#2e1065'; c.textAlign='left'; c.textBaseline='top'; c.fillText(C.fala.en,bx+18,by+12); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#6d28d9'; c.fillText(C.fala.pt,bx+18,by+38); } }
  var ff=C.fada.fala; if(ff&&!J.quiz&&ff.t<ff.dur){ c.font='900 17px "Nunito",Arial'; var tw5=Math.min(440,c.measureText(ff.en).width)+30, bx5=Math.max(12,C.fada.x-J.cam+48), by5=236; /* ao lado da fada, abaixo da fala do Conde e longe dos botões de toque */
    c.fillStyle='#fef9c3'; A.rr(c,bx5,by5,tw5,J.tr?58:40,14); c.fill(); c.fillStyle='#713f12'; c.textAlign='left'; c.textBaseline='top'; c.fillText(ff.en,bx5+15,by5+10,440); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#a16207'; c.fillText(ff.pt,bx5+15,by5+34,440); } }
  /* letras voando do Conde para a frase */
  C.letraVoa.forEach(function(L){ var k=Math.min(1,L.t/.9), dst=slot(L.i), x=L.x0+(dst.x-L.x0)*k, yy=L.y0+(dst.y-L.y0)*k-Math.sin(k*Math.PI)*120; c.save(); c.translate(x,yy); var sc=1.6-.6*k; c.scale(sc,sc); c.font='900 26px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=5; c.strokeStyle='#2e1065'; c.strokeText(dst.ch,0,0); c.fillStyle='#fde047'; c.fillText(dst.ch,0,0); c.restore(); });
  if(C.vitoria){ var kv=Math.min(1,C.vitoria.t/.6); c.save(); c.globalAlpha=kv; c.fillStyle='rgba(13,11,30,.55)'; c.fillRect(0,H/2-80,W,160); c.translate(W/2,H/2); c.scale(.7+.3*kv,.7+.3*kv); c.font='900 54px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='#2e1065'; c.strokeText('YOU ARE A SUPER PLAYER!',0,-6); c.fillStyle='#fde047'; c.fillText('YOU ARE A SUPER PLAYER!',0,-6); if(J.tr){ c.font='700 20px "Nunito",Arial'; c.fillStyle='#fff'; c.fillText('VOCÊ É UM SUPER JOGADOR!',0,44); } c.restore(); }
  if(C.banner&&C.banner.t<2.6&&!C.vitoria){ var k=Math.min(1,C.banner.t/.3), sai=Math.max(0,(C.banner.t-2.1)/.5); c.save(); c.globalAlpha=1-sai; c.fillStyle='rgba(13,11,30,.6)'; c.fillRect(0,H/2-70,W,140);
    c.translate(W/2,H/2); c.scale(.6+.4*k,.6+.4*k); c.font='900 72px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='#2e1065'; c.strokeText(C.banner.en,0,0); c.fillStyle='#fde047'; c.fillText(C.banner.en,0,0);
    if(J.tr){ c.font='700 20px "Nunito",Arial'; c.fillStyle='#fff'; c.fillText(C.banner.pt,0,46); } c.restore(); }
}
return {morreu:morreu, inicia:inicia, atualiza:atualiza, anima:anima, desenha:desenha, desenhaTela:desenhaTela, solidos:solidos, avancaIntro:avancaIntro, ativo:function(){ return !!C; }, limpa:function(){ C=null; J.chefe=null; if(window.UI) UI.legenda(null); }};
})();
