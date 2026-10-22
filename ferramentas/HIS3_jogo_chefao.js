/* ============================================================
   HIS3_jogo_chefao.js — Inkwell Castle: o Conde Rabisco (reino 9).
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
   v6 (16/10, Paulo: "ajuste pra ficar razoável a qtde de estrelas gasta e
   recebida e o dano ao herói e ao chefão; dano considerável = tremida na tela
   + trilha de 'tá quase'"):
     cada estrela no Conde arranca um PEDAÇO da frase (3 golpes por rodada:
     YOU|ARE|A · SU|PE|R · PL|AY|ER) com tremida forte da tela;
     estrela que bate no ESCUDO volta para o herói (não se perde);
     a fada, a cada visita, também devolve os 3 corações;
     batida de coração grave a partir da rodada 2; no último golpe, "TÁ QUASE"
     (mais rápida) e o Conde e a fada falam disso. Conta: ~14 estrelas na luta
     toda, ~2–3 visitas da fada (6–9 perguntas).
   v7 (16/10, Paulo: "o herói joga estrelas nos inimigos de baixo e não no chefão; pouco destaque para a frase;
   antes do clímax o chefão muda de lado umas 3 vezes; na última volta mais confrontador, já abatido e cansado,
   mas tentando ser ameaçador; o letreiro esconde o cenário"):
     a estrela vai SEMPRE no Conde (com escudo ela volta); o escudo se quebra DERRUBANDO os tinteiros
     (encostar/pular neles) e PISANDO nas manchas; o Conde voa (vira tinta) para o outro lado da sala 3 vezes
     (rodada 1 depois do 2º golpe, rodada 2 depois do 1º e do 2º) e volta para a sacada no clímax, cansado e
     bravo (chapéu torto, estrelinhas de tontura, suor, aura escura); frase do alto maior, com brilho em cada pedaço;
     vitória com a frase gigante letra a letra; faixas do meio da tela mais finas e curtas.
   ============================================================ */
window.CHEFAO = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, H=G.H, T=45, CHAO=450;
var RODADAS=[['fontes','escola'],['profissoes','olhar'],['mundo','tempo','fontes']]; /* HIS3: rodada 1 = U3 (fontes e escola), 2 = U4 + pontos de vista, 3 = mundo antigo, base e fontes de novo */
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
var FRASE='VOCÊ FAZ HISTÓRIA', NLET=FRASE.replace(/ /g,'').length, METAS=[4,7,15]; /* YOU ARE A | SUPER | PLAYER */
var CORTES=[3,6,7,9,11,12,14,16,18]; /* cada golpe arranca um pedaço: YOU|ARE|A · SU|PE|R · PL|AY|ER */
function tensaoDa(){ if(!C||!/^p|transicao/.test(C.fase)) return 0; if(C.letrasOk>=CORTES[CORTES.length-2]) return 2; return C.ronda>=1||C.fase==='transicao'?1:0; }
function estrelasHUD(){ var u=J.urso, n=(u&&u.poderes.estrelas)||0; if(window.UI) UI.acao(n>0,n); }
/* a fada chega (brilho), faz 3 perguntas; certa = 2 estrelas; no fim ela joga as estrelas no herói */
function fadaVem(primeira){
  if(!C||C.fadaOn) return; try{ SOM.tensao(0); }catch(e){} C.fadaOn=true; C.fadaT=0; C.ganho=0; /* perguntas sem batida de coração: sem pressão de tempo */ C.visitas++; SOM.fx('estrela');
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
  if(u.tam<2){ u.tam=2; setTimeout(function(){ if(window.UI&&J.urso) UI.coracoes(3,false); },0); G.brilho(u.x,u.y-50,12,'#f472b6'); } /* a fada também devolve os corações */
}
/* a estrela que o herói joga vira ESTRELA GUIADA: vai ao alvo da rodada; com escudo, o Conde a rebate */
function guiaEstrelas(){
  var u=J.urso; (J.estrelas||[]).forEach(function(e){ if(e.skin||e.guiada) return; e.guiada=true; e.dist=999; estrelasHUD();
    var alvo=null;
    if(false&&C.escudo&&C.fase==='p1'){ var tq=null; C.tinteiros.forEach(function(q){ if(!q.caido&&(!tq||Math.abs(q.x-u.x)<Math.abs(tq.x-u.x))) tq=q; }); if(tq) alvo={x:tq.x,y:tq.y-24,tipo:'tinteiro',tq:tq}; }
    if(false&&!alvo&&C.escudo&&C.fase==='p2'){ var bl=null; J.mundo.inimigos.forEach(function(en){ if(en.doConde&&!en.morto&&!en.achatado&&(!bl||Math.abs(en.x-u.x)<Math.abs(bl.x-u.x))) bl=en; }); if(bl) alvo={x:bl.x,y:bl.y-20,tipo:'mancha',en:bl}; }
    if(!alvo) alvo={x:C.x,y:C.y-70,tipo:'conde'};
    C.tiros.push({x0:e.x,y0:e.y,x:e.x,y:e.y,alvo:alvo,t:0,dur:.5+Math.min(.35,Math.abs(alvo.x-e.x)/1400),rot:0}); });
}
function acertaConde(p){
  if(C.muda){ var u1=J.urso; u1.poderes.estrelas=(u1.poderes.estrelas||0)+1; setTimeout(estrelasHUD,300); return; } /* voando: a estrela volta */
  if(C.escudo){ /* rebate no escudo: ensina que primeiro se quebra o escudo */
    SOM.fx('pisao'); G.brilho(C.x,C.y-70,8,'#c4b5fd'); C.estado='laugh'; C.et=0; C.escudoBrilho=.5;
    var u0=J.urso; u0.poderes.estrelas=(u0.poderes.estrelas||0)+1; C.dons.push({x0:C.x,y0:C.y-90,t:0}); setTimeout(estrelasHUD,600); /* a estrela rebatida volta para o herói */
    if(!C.avisouEscudo||J.t-C.avisouEscudo>5){ C.avisouEscudo=J.t; var m=C.fase==='p1'?['HA! My shield! Knock over my inkwells first!','RÁ! Meu escudo! Derrube meus tinteiros primeiro!']:(C.fase==='p2'?['HA! My shield! Jump on my ink blots first!','RÁ! Meu escudo! Pule nas minhas manchas primeiro!']:['HA! Come up here if you can!','RÁ! Suba aqui se puder!']); falaC(m[0],m[1],2.6); }
    return; }
  C.estado='hit'; C.et=0; C.dor=.8; SOM.fx('chefao'); SOM.fx('quebra'); J.shake=10; G.brilho(C.x,C.y-70,22,'#fde047'); G.pontua(50,C.x,C.y-150);
  /* um PEDAÇO da frase sai do Conde e voa para o alto (golpe que se sente) */
  var ate=NLET; for(var c2=0;c2<CORTES.length;c2++) if(CORTES[c2]>C.letrasOk){ ate=CORTES[c2]; break; }
  for(var i=C.letrasOk,k=0;i<ate;i++,k++) C.letraVoa.push({i:i,x0:C.x-J.cam+(k-1)*26,y0:C.y-120-J.camY,t:-k*.08});
  C.letrasOk=ate; SOM.fx('faisca');
  var ultimo=C.letrasOk>=CORTES[CORTES.length-2]&&C.letrasOk<NLET;
  if(ultimo){ falaC('NO, NO, NO! One more and I lose!','NÃO, NÃO, NÃO! Mais uma e eu perco!',2.6); setTimeout(function(){ if(!C||C.fadaOn||!/^p/.test(C.fase)) return; C.fadaOn=true; C.fadaT=0; C.fadaSai=3; falaF('One more star! You can do it!','Só mais uma estrela! Você consegue!',2.6); },1400); }
  else { C.nAcertos=(C.nAcertos||0)+1; var r=[['OUCH! My hat!','AI! Meu chapéu!'],['Stop that, little hero!','Pare com isso, heroizinho!'],['Grr! My letters!','Grr! Minhas letras!']][C.nAcertos%3]; falaC(r[0],r[1],2.2); }
  if(C.letrasOk>=METAS[C.ronda]){ if(C.ronda>=2) vitoria(); else transicao(C.ronda+2); }
  else if(C.letrasOk===6||C.letrasOk===9||C.letrasOk===11) mudaLado((C.lado||1)>0?-1:1); /* 3 mudanças de lado antes do clímax */
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
  for(var q=C.letraVoa.length-1;q>=0;q--){ var L=C.letraVoa[q]; L.t+=dt; if(L.t>.9){ C.letraVoa.splice(q,1); C.brilhoFrase=1; SOM.fx('plim'); } }
  try{ SOM.tensao(tensaoDa()); }catch(e){}
}
function derrubaTinteiro(tq){ if(tq.caido||C.fase!=='p1') return; tq.caido=true; C.alvo++; SOM.fx('quebra'); J.shake=6; G.brilho(tq.x,tq.y-30,16,'#a78bfa'); C.estado='hit'; C.et=0;
  if(C.alvo<3) falaC(C.alvo===1?'NO! My inkwell!':'Not another one!',C.alvo===1?'NÃO! Meu tinteiro!':'Outro não!'); else quebraEscudo(); }
function quebraEscudo(){ if(!C.escudo) return; C.escudo=false; SOM.fx('quebra'); J.shake=8; G.brilho(C.x,C.y-80,24,'#c4b5fd'); banner('SHIELD DOWN!','ESCUDO QUEBRADO!');
  falaC('NO! My shield!','NÃO! Meu escudo!',2.4); }
/* quedas na luta: só depois de MUITAS (7 na mesma rodada) tudo recomeça do começo */
function morreu(){ if(!C||C.fase==='abertura'||C.fase==='derrota') return; C.mortes++;
  J.respawn.x=(C.lado<0)?12*T:2*T; /* 16/10 (jogador): renasce LONGE do Conde (do lado esquerdo ele derrama manchas no canto do início) */
  J.mundo.inimigos.forEach(function(e){ if(e.doConde&&!e.morto&&!e.achatado&&Math.abs(e.x-J.respawn.x)<140) e.x+=e.x<J.respawn.x?-140:140; }); /* tira as manchas de cima do ponto de volta */
  if(C.mortes===4) falaC('HA HA! Is that all, little hero?','RÁ RÁ! Só isso, heroizinho?',2.6); C.animaF=1;
  if(C.mortes>=7){ C.mortes=0; C.letrasOk=0; C.ronda=0; C.blocos=[]; C.alt=C.alt.map(function(){ return 0; }); J.mundo.inimigos=J.mundo.inimigos.filter(function(e){ return !e.doConde; });
    J.urso.poderes.estrelas=0; estrelasHUD(); banner('TRY AGAIN!','TENTE DE NOVO!'); comecaFase(1); } }
function comecaFase(n){
  C.ultProg=undefined; C.fase='p'+n; C.ronda=n-1; C.t=0; C.gotas=[]; C.letras=[]; C.escudo=true; C.mortes=0; C.fadaOn=false; SOM.musica('chefao');
  C.letrasOk=Math.min(C.letrasOk,n>1?METAS[n-2]:0);
  if(n===1){ C.lado=1; C.cansado=false; C.muda=null; C.yOff=0; C.alvo=0; C.tinteiros.forEach(function(q){ q.caido=false; }); falaC('My magic inkwells make my SHIELD!','Meus tinteiros mágicos fazem o meu ESCUDO!'); }
  if(n===2){ C.convertidas=0; C.ondas=0; J.mundo.inimigos=J.mundo.inimigos.filter(function(e){ return !e.doConde; }); falaC('New shield! Ink blots, GO!','Escudo novo! Manchas, VÃO!'); }
  if(n===3){ C.blocos=[]; C.alt=C.alt.map(function(){ return 0; }); C.nLetra=0; C.tLetra=2.6; if((C.lado||1)<0) mudaLado(1,true); else { C.cansado=true; falaC('Huff… puff… I am TIRED… but I am still SCARY! GRRR!','Arf… arf… estou CANSADO… mas ainda sou ASSUSTADOR! GRRR!',3.2); } }
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
  try{ SOM.tensao(0); }catch(e){}
  C.fase='derrota'; C.t=0; C.estado='sad'; C.gotas=[]; C.letras=[]; C.tiros=[]; SOM.musica(''); SOM.fx('vitoria');
  falaC('Oh no… you won! The lost endings are free!','Ah, não… você venceu! Os finais perdidos estão livres!',4);
}
/* a pena do Conde: de onde sai tudo que ele joga */
function pena(){ return {x:C.x-46*(C.lado||1), y:C.y-170}; }
/* o Conde vira TINTA e voa para o outro lado da sala (nenhum golpe pega nesse instante) */
var LADO_X={'1':19.2*T,'-1':3.4*T};
function mudaLado(novo,cansado){ if(!C||C.muda) return; C.muda={t:0,de:C.x,para:LADO_X[String(novo)],novo:novo,cansado:!!cansado}; C.gotas=[]; C.letras=[]; SOM.fx('cano'); SOM.fx('risada');
  if(cansado) falaC('Huff… puff… I am TIRED… but I am still SCARY! GRRR!','Arf… arf… estou CANSADO… mas ainda sou ASSUSTADOR! GRRR!',3.2);
  else falaC(novo<0?'You can\'t catch me! Over here!':'HA! Now I am over HERE!',novo<0?'Você não me pega! Aqui!':'RÁ! Agora estou AQUI!',2.4); }
function moveConde(dt){ var M=C.muda; if(!M) return false; M.t+=dt; var k=Math.min(1,M.t/1.5);
  C.x=M.de+(M.para-M.de)*suaveK(k); C.yOff=-Math.sin(k*Math.PI)*150;
  if(k>=1){ C.lado=M.novo; C.yOff=0; if(M.cansado) C.cansado=true; C.muda=null; G.brilho(C.x,C.y-80,18,'#a78bfa'); SOM.fx('aterra'); J.shake=6; } return true; }
function suaveK(k){ return k*k*(3-2*k); }
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
  if(C.fase!=='abertura'&&C.fase!=='derrota'&&C.fase!=='quiz'&&!moveConde(dt)) C.x=LADO_X[String(C.lado||1)]+Math.sin(C.t*.7)*(C.lado<0?.8:1.3)*T;
  C.fada.x=(C.lado<0)?18.6*T:2.4*T; /* a fada fica do lado oposto ao do Conde */
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
  if(C.fase==='derrota'){ if(C.t>(C.vitoria?7:5)){ G.iniciaFinal(); return; } } /* o final limpa o Conde: não seguir usando C */
  else if(C.fase==='transicao'){ if(C.t>2.8){ C.banner=null; comecaFase(C.prox); } }
  else if(C.fase==='p1'){
    C.tinteiros.forEach(function(tq){ if(tq.caido) return; if(G.colideRet(R.x,R.y,R.w,R.h,tq.x-22,tq.y-52,44,56)) derrubaTinteiro(tq); }); /* encostou/pulou no tinteiro: derruba */
    var ritmo=3.4-C.alvo*.3;
    if(!C.muda&&Math.floor((C.t-dt)/ritmo)!==Math.floor(C.t/ritmo)) novaGota();
  }
  else if(C.fase==='p2'){
    if(!C.muda&&Math.floor((C.t-dt)/3.8)!==Math.floor(C.t/3.8)) novaGota();
    var vivasC=J.mundo.inimigos.filter(function(e){ return e.doConde&&!e.morto&&!e.achatado; }).length; /* 16/10 (jogador): no máximo 3 manchas vivas no chão */
    if(C.escudo&&!C.muda&&Math.floor((C.t-dt)/3.6)!==Math.floor(C.t/3.6)&&vivasC<3){ C.ondas++; C.estado='write'; C.et=0; SOM.fx('cano');
      /* derrama do tinteiro da sacada: caem pela borda e saem andando */
      var lx=(C.lado<0)?C.x+60:SACADA_X0, dl=(C.lado<0)?1:-1; if(C.lado<0&&C.ondas>3) { C.ondas=5; } /* do lado esquerdo, menos ondas */ for(var k=0;k<Math.min(2,3-vivasC);k++) C.gotas.push({x0:lx,y0:C.y-10,alvo:(C.lado<0)?(7+k*2)*T:lx+dl*(40+k*70),t:-k*.3,dur:(C.lado<0)?1.0:.7,x:lx,y:C.y,r:15,vira:true}); }
    var vencidas=J.mundo.inimigos.filter(function(e){ return e.doConde&&(e.morto||e.achatado); }).length; if(vencidas!==C.convertidas||C.ultProg===undefined) C.ultProg=C.t; C.convertidas=vencidas;
    if(C.escudo&&C.t-C.ultProg>40&&!C.fadaOn){ C.ultProg=C.t; C.fadaOn=true; C.fadaT=0; C.fadaSai=3.5; falaF('Jump ON the blots, from above!','Pule EM CIMA das manchas!',3.2); } /* jogador: dica da fada depois de 40 s sem progresso */
    if(vencidas>=3&&C.escudo){ J.mundo.inimigos.forEach(function(e){ if(e.doConde){ e.achatado=true; e.tAch=.3; } }); quebraEscudo(); }
  }
  else if(C.fase==='p3'){
    if(!C.muda) C.tLetra-=dt; if(C.tLetra<=0){ C.tLetra=C.escudo?1.4:2.6; if(C.escudo) novaLetra(); else novaGota(); }
    /* chegou na sacada pela escada de letras: o duelo final */
    if(C.escudo&&u.noChao&&u.x>SACADA_X0-10&&u.y<=SACADA_Y+6){ C.letras=[]; quebraEscudo(); falaC('WHAT?! You climbed up here?!','O QUÊ?! Você subiu aqui?!',2.6); }
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
        if(d.vira){ J.mundo.inimigos.push({tipo:'tinta',x:d.alvo,y:CHAO,x0:d.alvo,y0:CHAO,dir:-1,v:38+Math.random()*12,voa:false,doConde:true}); }
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
    var dor=C.dor>0?C.dor/.5:0, Mv=C.muda, km=Mv?Math.min(1,Mv.t/1.5):0, enc=Mv?Math.max(.15,Math.abs(km-.5)*2):1;
    if(C.lado<0&&!Mv&&C.fase!=='abertura'&&C.fase!=='derrota'){ c.save(); c.fillStyle='rgba(30,27,75,.85)'; A.el(c,C.x,C.y+4,90,16); c.fill(); c.fillStyle='rgba(67,56,202,.7)'; for(var nb=0;nb<4;nb++){ A.circ(c,C.x-60+nb*40,C.y+2+Math.sin(t*2+nb)*3,18); c.fill(); } c.restore(); } /* a nuvem de tinta em que ele flutua do lado de lá */
    if(Mv){ c.save(); c.fillStyle='rgba(49,46,129,.55)'; for(var tr2=0;tr2<6;tr2++){ var kk=Math.max(0,km-tr2*.04); A.circ(c,Mv.de+(Mv.para-Mv.de)*suaveK(kk),C.y-60-Math.sin(kk*Math.PI)*150,22-tr2*3); c.fill(); } c.restore(); } /* rastro de tinta do voo */
    c.save(); c.translate(C.x+(dor?Math.sin((1-dor)*Math.PI*3)*6:0),C.y+(C.yOff||0)); c.scale((.6+.4*k)*enc*((C.lado||1)<0?-1:1),k*enc); if(C.cansado&&!Mv) c.rotate(Math.sin(t*1.3)*.04-.05); c.globalAlpha=Math.min(1,k*1.5)*(Mv?.85:1);
    if(C.cansado&&C.fase!=='derrota'){ var au=.18+.06*Math.sin(t*1.5); var gA=c.createRadialGradient(0,-110,20,0,-110,150); gA.addColorStop(0,'rgba(88,28,135,'+au+')'); gA.addColorStop(1,'rgba(88,28,135,0)'); c.fillStyle=gA; A.circ(c,0,-110,150); c.fill(); } /* aura escura, pulsando devagar */
    A.conde(c,0,0,C.estado,t);
    if(C.cansado){ /* abatido mas bravo: sobrancelhas franzidas, curativo, suor, manchas na capa, bufando */
      c.strokeStyle='#1e1b4b'; c.lineWidth=4; c.lineCap='round'; c.beginPath(); c.moveTo(-20,-131); c.lineTo(-5,-125); c.moveTo(20,-131); c.lineTo(5,-125); c.stroke(); /* sobrancelhas bravas */
      c.fillStyle='#3b0764'; A.rr(c,-9,-104,18,8,4); c.fill(); c.fillStyle='#fff'; c.fillRect(-6,-102,12,3); /* dentes cerrados (no lugar do sorriso) */
      for(var tz=0;tz<3;tz++){ var at=t*1.6+tz*2.1; A.estrela(c,Math.cos(at)*34,-176+Math.sin(at)*8,5,'#fde047',at); } /* estrelinhas de tontura em volta do chapéu (abatido, não ferido) */
      for(var sw=0;sw<2;sw++){ var fy=((t*.8+sw*.5)%1); c.fillStyle='rgba(147,197,253,'+(.9-fy*.6)+')'; A.el(c,-28+sw*56,-128+fy*26,3.5,5.5); c.fill(); } /* suor */
      c.fillStyle='#4338ca'; [[-18,-40,9],[14,-22,7],[-4,-60,6]].forEach(function(p){ c.beginPath(); for(var a5=0;a5<8;a5++){ var rr5=p[2]*(a5%2?.6:1.1); c.lineTo(p[0]+Math.cos(a5*.785)*rr5,p[1]+Math.sin(a5*.785)*rr5); } c.closePath(); c.fill(); }); /* respingos de tinta na capa */
      var pf=(t*1.1)%1; c.fillStyle='rgba(255,255,255,'+(.5-pf*.5)+')'; A.circ(c,-40-pf*20,-120-pf*10,6+pf*8); c.fill(); }
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
  if(C.fase==='p3'&&C.escudo){ /* setas mostrando a subida (somem quando ele chega lá em cima) */ var b2=Math.abs(Math.sin(t*3))*6; c.save(); c.globalAlpha=.85; c.fillStyle='#fde047'; [[14,1],[15,2],[16,3],[17.4,4]].forEach(function(p,i){ var yy=CHAO-p[1]*T-22-b2; if(p[0]<17&&C.alt[p[0]]<p[1]) return; c.beginPath(); c.moveTo(p[0]*T+38,yy-8); c.lineTo(p[0]*T+14,yy-14); c.lineTo(p[0]*T+22,yy+6); /* seta para a direita e para cima: sobe a escada */ c.closePath(); c.fill(); }); c.restore(); }
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
var SL=29, FY=80;
function slot(i){ var n=-1; for(var k=0;k<FRASE.length;k++){ if(FRASE[k]===' ') continue; n++; if(n===i){ var x0=W/2-FRASE.length*SL/2; return {x:x0+k*SL+SL/2, y:FY, ch:FRASE[k]}; } } return {x:W/2,y:FY,ch:''}; }
function frase(c,t){
  var x0=W/2-FRASE.length*SL/2-14, ww=FRASE.length*SL+28; if(C.brilhoFrase>0) C.brilhoFrase-=1/60;
  var gF=c.createLinearGradient(0,52,0,108); gF.addColorStop(0,'rgba(76,29,149,.92)'); gF.addColorStop(1,'rgba(30,27,75,.92)'); c.fillStyle=gF; A.rr(c,x0,54,ww,52,14); c.fill();
  c.strokeStyle='rgba(253,224,71,'+(.7+.3*Math.max(0,C.brilhoFrase||0))+')'; c.lineWidth=3; A.rr(c,x0,54,ww,52,14); c.stroke();
  var voando={}; C.letraVoa.forEach(function(L){ voando[L.i]=1; });
  for(var i=0;i<NLET;i++){ var s0=slot(i), ok=i<C.letrasOk&&!voando[i], meta=i<METAS[Math.min(2,Math.max(0,C.ronda))];
    c.fillStyle=ok?'rgba(253,224,71,.28)':(meta?'rgba(255,255,255,.16)':'rgba(255,255,255,.07)'); A.rr(c,s0.x-12,62,24,36,6); c.fill();
    if(ok){ c.font='900 26px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=4; c.strokeStyle='#78350f'; c.strokeText(s0.ch,s0.x,FY+1); c.fillStyle='#fde047'; c.fillText(s0.ch,s0.x,FY+1); } }
}
function desenhaTela(c,t){
  if(!C) return;
  if(C.escuro>0){ c.fillStyle='rgba(8,6,20,'+(C.escuro*(.55-C.raio*.2))+')'; c.fillRect(0,0,W,H); }
  if(C.fase!=='abertura'){
    var y=58;
    frase(c,t);
    var vencidas=C.convertidas||0;
    var obj=!/^p/.test(C.fase)?null:(!C.escudo?['★ the Count! Take his letters!','Jogue ★ no Conde! Tire as letras dele!']:(C.fase==='p1'?['Break his shield: knock over the inkwells!  '+C.alvo+' / 3','Quebre o escudo: derrube os tinteiros!']:(C.fase==='p2'?['Break his shield: jump on the blots!  '+Math.min(3,vencidas)+' / 3','Quebre o escudo: pule nas manchas!']:['Climb the letters to the Count!','Suba nas letras até o Conde!'])));
    if(obj){ c.font='900 17px "Nunito",Arial'; var tw=c.measureText(obj[0]).width+30; c.fillStyle='rgba(76,29,149,.8)'; A.rr(c,W/2-tw/2,y+54,tw,J.tr?44:28,14); c.fill(); c.fillStyle='#fde68a'; c.textAlign='center'; c.textBaseline='top'; c.fillText(obj[0],W/2,y+59); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#fff'; c.fillText(obj[1],W/2,y+79); }
      /* como jogar a estrela: sempre à vista, no canto de baixo */
      var dica=J.tr?'★ = ESPAÇO ou ▼':'★ = SPACE or ▼'; c.font='900 16px "Nunito",Arial'; var tw4=c.measureText(dica).width+28; c.fillStyle='rgba(13,11,30,.75)'; A.rr(c,W/2-tw4/2,H-44,tw4,32,16); c.fill(); c.fillStyle='#fde047'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(dica,W/2,H-28); }
  }
  if(C.fala&&!J.quiz&&!C.vitoria&&C.fala.t<C.fala.dur&&C.fase!=='abertura'){ c.font='900 19px "Nunito",Arial'; var tw2=Math.min(560,c.measureText(C.fala.en).width)+36, bx=Math.max(20,Math.min(W-tw2-20,(C.x-J.cam<W/2)?C.x-J.cam+80:C.x-J.cam-tw2-30)), by=150;
    by=C.cansado?168:158; c.fillStyle='#ede9fe'; A.rr(c,bx,by,tw2,J.tr?62:44,16); c.fill(); var esqC=C.x-J.cam<W/2, bt=by+(J.tr?60:42); c.beginPath(); if(esqC){ c.moveTo(bx+30,bt); c.lineTo(bx,bt+18); c.lineTo(bx+60,bt); } else { c.moveTo(bx+tw2-30,bt); c.lineTo(bx+tw2,bt+18); c.lineTo(bx+tw2-60,bt); } c.fill(); /* o rabinho aponta para o Conde, do lado em que ele está */
    c.fillStyle='#2e1065'; c.textAlign='left'; c.textBaseline='top'; c.fillText(C.fala.en,bx+18,by+12); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#6d28d9'; c.fillText(C.fala.pt,bx+18,by+38); } }
  var ff=C.fada.fala; if(ff&&!J.quiz&&ff.t<ff.dur){ c.font='900 17px "Nunito",Arial'; var tw5=Math.min(440,c.measureText(ff.en).width)+30, bx5=Math.max(12,Math.min(W-tw5-12,(C.lado<0)?C.fada.x-J.cam-tw5-48:C.fada.x-J.cam+48)), by5=236; /* ao lado da fada, abaixo da fala do Conde e longe dos botões de toque */
    c.fillStyle='#fef9c3'; A.rr(c,bx5,by5,tw5,J.tr?58:40,14); c.fill(); c.fillStyle='#713f12'; c.textAlign='left'; c.textBaseline='top'; c.fillText(ff.en,bx5+15,by5+10,440); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#a16207'; c.fillText(ff.pt,bx5+15,by5+34,440); } }
  /* letras voando do Conde para a frase */
  C.letraVoa.forEach(function(L){ if(L.t<0) return; var k=Math.min(1,L.t/.9), dst=slot(L.i), x=L.x0+(dst.x-L.x0)*k, yy=L.y0+(dst.y-L.y0)*k-Math.sin(k*Math.PI)*120; c.save(); c.translate(x,yy); var sc=1.6-.6*k; c.scale(sc,sc); c.font='900 26px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=5; c.strokeStyle='#2e1065'; c.strokeText(dst.ch,0,0); c.fillStyle='#fde047'; c.fillText(dst.ch,0,0); c.restore(); });
  if(C.vitoria){ var tv=C.vitoria.t, kv=Math.min(1,tv/.5); c.save(); c.globalAlpha=kv*.6; c.fillStyle='#0d0b1e'; c.fillRect(0,0,W,H); c.globalAlpha=1;
    var L1=['VOCÊ','FAZ'], L2=['HISTÓRIA!'], ix=0; c.textAlign='center'; c.textBaseline='middle';
    [[L1.join(' '),H/2-60,64],[L2.join(' '),H/2+30,88]].forEach(function(lin){ c.font='900 '+lin[2]+'px "Nunito",Arial'; var tot=c.measureText(lin[0]).width, xx=W/2-tot/2;
      for(var q4=0;q4<lin[0].length;q4++){ var ch=lin[0][q4], wch=c.measureText(ch).width, ap=Math.max(0,Math.min(1,(tv-.3-ix*.07)/.25)); ix++;
        if(ap>0&&ch!==' '){ c.save(); c.translate(xx+wch/2,lin[1]-(1-ap)*40+Math.sin(tv*3+ix)*3); c.scale(.5+.5*ap,.5+.5*ap); c.globalAlpha=ap; c.lineWidth=12; c.strokeStyle='#4c1d95'; c.strokeText(ch,0,0); var gL=c.createLinearGradient(0,-lin[2]/2,0,lin[2]/2); gL.addColorStop(0,'#fef08a'); gL.addColorStop(1,'#f59e0b'); c.fillStyle=gL; c.fillText(ch,0,0); c.restore(); }
        xx+=wch; } });
    for(var cf=0;cf<26;cf++){ var hx2=(cf*97)%W, yy2=((tv*120+cf*53)%(H+40))-20; c.fillStyle=['#fde047','#f472b6','#60a5fa','#4ade80'][cf%4]; c.save(); c.translate(hx2+Math.sin(tv*2+cf)*20,yy2); c.rotate(tv*2+cf); c.fillRect(-5,-3,10,6); c.restore(); }
    if(J.tr&&tv>1.8){ c.font='700 22px "Nunito",Arial'; c.fillStyle='#fff'; c.fillText('VOCÊ É UM SUPER JOGADOR!',W/2,H/2+100); } c.restore(); }
  if(C.banner&&C.banner.t<1.8&&!C.vitoria){ var k=Math.min(1,C.banner.t/.3), sai=Math.max(0,(C.banner.t-1.3)/.5); c.save(); c.globalAlpha=1-sai;
    c.translate(W/2,H/2+60); c.scale(.6+.4*k,.6+.4*k); c.font='900 60px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.lineWidth=10; c.strokeStyle='#2e1065'; c.strokeText(C.banner.en,0,0); c.fillStyle='#fde047'; c.fillText(C.banner.en,0,0);
    if(J.tr){ c.font='700 20px "Nunito",Arial'; c.fillStyle='#fff'; c.fillText(C.banner.pt,0,46); } c.restore(); }
}
return {morreu:morreu, inicia:inicia, atualiza:atualiza, anima:anima, desenha:desenha, desenhaTela:desenhaTela, solidos:solidos, avancaIntro:avancaIntro, ativo:function(){ return !!C; }, limpa:function(){ try{ SOM.tensao(0); }catch(e){} C=null; J.chefe=null; if(window.UI) UI.legenda(null); }};
})();
