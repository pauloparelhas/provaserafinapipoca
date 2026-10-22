/* ============================================================
   HIS3_jogo_poderes.js — o PODER DE CADA REINO e a ORIGEM de cada
   perigo (pedido do Paulo, 17/10: "nada surge do nada"; "a criança
   tem de perceber que pegou algo útil PARA ESTA FASE, no começo").
     · um poder por reino, num SUPORTE desenhado (barraca, ninho,
       cabide, pedestal, rack, mesa do café), pego com ▼ ou tocando
       nele; cartão (UI.aviso) diz o que é e como ajuda;
     · o botão de ação vira o poder do reino (faísca do Pip, bolha,
       vento, bola, leite) com recarga e sem contagem;
     · o guardanapo é PARAQUEDAS (não desenha capa);
     · fontes visíveis: telhado (telhas), galho (bolotas e cipós),
       pilha de toras, portão de barris, torneira, Chef de Tinta que
       joga pratos (com aviso), máquina de bolas, nuvem que sopra,
       luminária/lanterna dos bichos voadores, torradeira/feno/irrigador.
   Chamado por motor (pegaItem, perigos), motor2 (dicas, toque), perigos
   (tiros, rolantes), cena (desenho) e ui (ícone do botão).
   ============================================================ */
window.PODERES = (function(){
'use strict';
var G=window.JOGO, J=G.J, A=window.ARTE, W=G.W, T=45;
var rr=A.rr, circ=A.circ, el=A.el, lin=A.lin;

/* ---------- a tabela: um poder por reino (id da fase) ---------- */
var TAB={
  1:{id:'botas', tiro:null, suporte:'barraca', verbo:'Calce!', verboPt:'Calce!', nome:'tênis saltador', nomePt:'tênis saltador',
     tit:'Tênis saltador da educação física!', titPt:'Tênis saltador da educação física!',
     txt:'Pule e aperte PULAR de novo no ar. Um pulo bem alto!', txtPt:'Pule e aperte PULAR de novo no ar. Um pulo bem alto!'},
  2:{id:'botas', tiro:null, suporte:'barraca', verbo:'Calce!', verboPt:'Calce!', nome:'pantufas saltadoras', nomePt:'pantufas saltadoras',
     tit:'As pantufas saltadoras da Vovó!', titPt:'As pantufas saltadoras da Vovó!',
     txt:'Pule e aperte PULAR de novo no ar: pulo duplo! Assim você sobe do porão até o sótão.', txtPt:'Pule e aperte PULAR de novo no ar: pulo duplo! Assim você sobe do porão até o sótão.'},
  4:{id:'pip', tiro:'faisca', montado:true, nome:'Pangaré', nomePt:'Pangaré',
     tit:'Pangaré, o cavalo do Seu Pedro!', titPt:'Pangaré, o cavalo do Seu Pedro!',
     txt:'Antigamente os animais ajudavam no trabalho da fazenda! Monte no Pangaré e segure PULAR para saltar longe. Aperte ESPAÇO: ele relincha e espanta as traças.', txtPt:'Antigamente os animais ajudavam no trabalho da fazenda! Monte no Pangaré e segure PULAR para saltar longe. Aperte ESPAÇO: ele relincha e espanta as traças.'},
  5:{id:'traje', tiro:'bolha', suporte:'arara', verbo:'Vista!', verboPt:'Vista!', nome:'roupa de mergulho', nomePt:'roupa de mergulho',
     tit:'Uma roupa de mergulho!', titPt:'Uma roupa de mergulho!',
     txt:'Pule no rio. Toque PULAR para nadar para cima. Aperte ESPAÇO: as bolhas prendem as traças.', txtPt:'Pule no rio. Toque PULAR para nadar para cima. Aperte ESPAÇO: as bolhas prendem as traças.'},
  6:{desligado:true, id:'giz', tiro:null, suporte:'pedestal', verbo:'Pegue!', verboPt:'Pegue!', nome:'capacete', nomePt:'capacete',
     tit:'Capacete!', titPt:'Capacete!', txt:'Segure firme nos ganchos e nas vigas.', txtPt:'Segure firme nos ganchos e nas vigas.'},
  7:{id:'bolas', tiro:'bola', suporte:'rack', verbo:'Pegue!', verboPt:'Pegue!', nome:'bolas de futebol', nomePt:'bolas de futebol',
     tit:'Bolas de futebol!', titPt:'Bolas de futebol!',
     txt:'Aperte ESPAÇO (ou o botão da bola) para chutar. Chute a bola nas traças e na máquina de bolas!', txtPt:'Aperte ESPAÇO (ou o botão da bola) para chutar. Chute a bola nas traças e na máquina de bolas!'},
  8:{id:'biscoitos', tiro:'biscoito', nome:'biscoitos da Vovó', nomePt:'biscoitos da Vovó',
     tit:'Biscoitos da Vovó!', titPt:'Biscoitos da Vovó!',
     txt:'Aperte ESPAÇO (ou o botão do biscoito) para jogar um biscoito. As traças adoram biscoito: viram borboletas!', txtPt:'Aperte ESPAÇO (ou o botão do biscoito) para jogar um biscoito. As traças adoram biscoito: viram borboletas!'}
};
/* a história do ratinho: cada objeto no seu móvel, com o seu verbo */
var HIST={ /* HIS3: a Trilha da Linha do Tempo — os registros na ORDEM do material (jornal → carta → diário → álbum) */
  cookie:{verbo:'Pegue!',verboPt:'Pegue!',fala:'A ampulheta do Tic: o tempo começa a contar!',falaPt:'A ampulheta do Tic: o tempo começa a contar!'},
  milk:{verbo:'Pegue!',verboPt:'Pegue!',fala:'O jornal: um dos primeiros registros, de muito tempo atrás.',falaPt:'O jornal: um dos primeiros registros, de muito tempo atrás.'},
  napkin:{verbo:'Pegue!',verboPt:'Pegue!',fala:'A carta, escrita à mão. Abra o envelope: ele vira paraquedas!',falaPt:'A carta, escrita à mão. Abra o envelope: ele vira paraquedas!'},
  mirror:{verbo:'Pegue!',verboPt:'Pegue!',fala:'O diário: alguém escrevia o que vivia todo dia.',falaPt:'O diário: alguém escrevia o que vivia todo dia.'},
  scissors:{verbo:'Pegue!',verboPt:'Pegue!',fala:'O álbum de fotos, do tempo dos bisavós e dos avós.',falaPt:'O álbum de fotos, do tempo dos bisavós e dos avós.'},
  broom:{verbo:'Pegue!',verboPt:'Pegue!',fala:'O espanador! Espante a poeira das traças.',falaPt:'O espanador! Espante a poeira das traças.'},
  tape:{verbo:'Pegue!',verboPt:'Pegue!',fala:'A fita! Conserte a ponte de papel rasgada.',falaPt:'A fita! Conserte a ponte de papel rasgada.'},
  fim:{fala:'Depois vieram a foto digital e as redes sociais. A ampulheta vira de novo: o tempo não para!',falaPt:'Depois vieram a foto digital e as redes sociais. A ampulheta vira de novo: o tempo não para!'}
};
/* 16/10 (Paulo: "as perguntas respondidas certas podem dar ao herói o produto esperado,
   tipo tesoura, espelho, e não simplesmente encontrá-los"): cada objeto do meio da história
   fica no seu móvel com um "?"; ▼ abre UMA pergunta do ratinho cuja resposta É o objeto
   (c11 "o que ele pede depois do biscoito?" → leite …). Certa = ganha o objeto. Errada =
   vê a resposta e vem outra pergunta na hora; na 2ª errada o ratinho entrega assim mesmo (nada trava). */
var QUIZ_ITEM={milk:['t01'],napkin:['t02'],mirror:['t03'],scissors:['t04'],broom:['t05'],tape:['t06']}; /* a 2ª tentativa repete a pergunta cuja resposta É o objeto (a criança acabou de ver a resposta) */
var NOME_ITEM={milk:['o jornal','o jornal'],napkin:['a carta','a carta'],mirror:['o diário','o diário'],scissors:['o álbum de fotos','o álbum de fotos'],broom:['o espanador','o espanador'],tape:['a fita','a fita']};
function peloQuiz(it){ return it&&it.tipo==='historia'&&!it.fim&&!!QUIZ_ITEM[it.nome]; }
function pedeItem(it){
  if(J.quiz||!window.QUIZ||it.ganho) return; it.tent=(it.tent||0); var ids=QUIZ_ITEM[it.nome], id=ids[Math.min(it.tent,ids.length-1)];
  var q=(window.HIS3&&HIS3.ITENS||[]).filter(function(x){ return x.id===id; })[0]; if(!q){ entregaItem(it,true); return; }
  var m={x:it.x,y:it.y,tipo:'tic',falando:0}, ok0=false;
  log({ev:'pedeItem',nome:it.nome,id:id});
  QUIZ.inicia(m,{itens:[q], aoResponder:function(ok){ ok0=ok; },
    aoTerminar:function(){ it.cool=J.t+5; if(ok0) entregaItem(it,false); else { it.tent++; if(it.tent>=2) entregaItem(it,true); else setTimeout(function(){ if(!J.quiz&&J.estado==='nivel'&&!it.pego) pedeItem(it); },500); } }, /* errou: outra pergunta na hora (a criança não perde o lugar) */
    aoSair:function(){} });
}
function entregaItem(it,ajuda){ if(it.ganho) return; it.ganho=true; var n=NOME_ITEM[it.nome]||[it.nome,it.nome]; G.pegaItem(it); log({ev:'ganhaItem',nome:it.nome,ajuda:!!ajuda});
  setTimeout(function(){ G.toast(ajuda?'O Tic te ajuda: '+n[1]+'!':'Certo! Você ganhou '+n[1]+'!',2400); },50); }
var CARTAO_GUARDANAPO={tit:'A carta!',titPt:'A carta!',txt:'It is a parachute! Jump, then HOLD JUMP to float over the sink.',txtPt:'Vira paraquedas! Pule e SEGURE PULAR para flutuar por cima da pia.'};

function fase(){ return J.faseAtual?J.faseAtual.id:0; }
function poder(){ var P=TAB[fase()]; return P&&!P.desligado?P:null; }
function log(o){ J.log=J.log||[]; o.t=+J.t.toFixed(2); J.log.push(o); if(J.log.length>400) J.log.shift(); }
function cartao(id,c){ var i=J.in; i.left=i.right=i.jump=i.down=false; log({ev:'aviso',id:id}); if(window.UI&&UI.aviso) UI.aviso(id,c.tit,c.titPt,c.txt,c.txtPt,"Let's go! ▶",'Vamos!'); }

/* ---------- itens que se pegam com ▼ (num móvel) ---------- */
function interativo(it){ return it.tipo==='poder'||(it.tipo==='historia'&&it.nome==='milk')||peloQuiz(it)||it.tipo==='traje'||it.tipo==='capa'; } /* da história, só o leite se pega com ▼ ("Drink!"); o resto se pega andando */
function desenhavel(it){ return interativo(it)||it.tipo==='historia'; }
function verbo(it){ if(peloQuiz(it)&&!it.ganho) return ['Answer and win it!','Responda e ganhe!']; if(it.tipo==='historia'){ var h=HIST[it.nome]||HIST.cookie; return [h.verbo,h.verboPt]; } var P=poder(); return P&&P.verbo?[P.verbo,P.verboPt]:['Take!','Pegue!']; }
function perto(it){ var u=J.urso; return Math.abs(u.x-it.x)<62 && Math.abs((u.y-30)-it.y)<95; }
function itemPerto(){ var M=J.mundo; if(!M) return null; for(var i=0;i<M.itens.length;i++){ var it=M.itens[i]; if(!it.pego&&interativo(it)&&perto(it)) return it; } return null; }
function interage(){ /* ▼ na frente do móvel pega o objeto (o mesmo gesto da porta e do cano) */
  if(J.estado!=='nivel'||!J.in.down||!J.downSolto) return false; var it=itemPerto(); if(!it) return false;
  J.downSolto=false; G.pegaItem(it); return true;
}
function toca(wx,wy){ var M=J.mundo; if(!M) return false;
  for(var i=0;i<M.itens.length;i++){ var it=M.itens[i]; if(it.pego||!interativo(it)) continue; if(Math.abs(wx-it.x)<55&&wy>it.y-80&&wy<it.y+40){ if(perto(it)) G.pegaItem(it); else G.toast('Walk to it first!',1600,'Primeiro vá até lá!'); return true; } }
  return false; }
function dica(){ var it=itemPerto(); if(!it) return null; var v=verbo(it); return {x:it.x,y:it.y-(it.tipo==='historia'?62:150),txt:v[0]+' Press ▼',pt:v[1]+' Aperte ▼',botao:true}; }
function alvo(){ var M=J.mundo, u=J.urso; if(!M) return null; var r=null, trava=(M.modo==='voo'&&!u.poderes.capa)||(M.modo==='nado'&&!u.poderes.traje); /* barreira ativa: a seta volta para o item */
  M.itens.forEach(function(it){ if(!r&&!it.pego&&(it.tipo==='poder'||it.tipo==='traje'||it.tipo==='capa')&&(trava||it.x>u.x-300)) r={x:it.x,y:it.y-150,tipo:'poder',txt:verbo(it)[0],txtPt:verbo(it)[1]}; });
  M.ovos.forEach(function(o){ if(!r&&!o.chocado&&o.x>u.x-300) r={x:o.x,y:o.y-70,tipo:'poder',txt:'Touch the egg!',txtPt:'Toque no ovo!'}; });
  M.itens.forEach(function(it){ if(!r&&!it.pego&&peloQuiz(it)&&it.x>u.x-300&&it.x<u.x+700) r={x:it.x,y:it.y-110,tipo:'poder',txt:'Answer here!',txtPt:'Responda aqui!'}; }); /* a seta leva a criança ao objeto da história */
  return r; }

/* ---------- pegar ---------- */
function pega(it){
  var u=J.urso, P=poder(); log({ev:'pega',tipo:it.tipo,nome:it.nome||''});
  if(it.tipo==='poder'||it.tipo==='traje'||it.tipo==='capa'){
    SOM.fx('destrava'); G.brilho(it.x,it.y,14,'#fde047'); if(!P) return true;
    if(P.id==='botas'){ u.poderes.bota=true; u.puloExtra=true; }
    if(P.id==='giz'){ u.poderes.giz=true; u.puloExtra=true; G.emite(14,function(){ return {x:u.x+(Math.random()-.5)*30,y:u.y-60,vx:(Math.random()-.5)*120,vy:-60-Math.random()*80,vida:.9,max:.9,tipo:'nevoa',r:5+Math.random()*5}; }); }
    if(P.id==='traje') u.poderes.traje=true;
    if(P.id==='capa') u.poderes.capa=true;
    if(P.tiro) u.poderes.tiro=P.tiro;
    hudPoder(); cartao(P.id,P); return true;
  }
  if(peloQuiz(it)&&!it.ganho){ it.pego=false; pedeItem(it); return true; }
  if(it.tipo==='historia'){
    var h=it.fim?HIST.fim:(HIST[it.nome]||HIST.cookie); SOM.fx('moedaG'); G.pontua(80,it.x,it.y);
    J.historia=J.historia||[]; J.historia.push(it.fim?'fim':it.nome); if(it.nome==='milk') J.historia.push('straw');
    J.faixaHist={en:h.fala,pt:h.falaPt,t:0,fim:!!it.fim};
    switch(it.nome){
      case 'cookie': J.moedas+=5; if(it.fim){ u.cheerT=2; break; } u.poderes.tiro='biscoito'; hudPoder(); cartao('biscoitos',TAB[8]); break;
      case 'milk': if(u.tam<2){ u.tam++; u.sx=1.3; u.sy=1.3; } if(window.UI) UI.coracoes(u.tam+1); u.cheerT=.9; break; /* beber o leite: fica grande e forte (+1 coração) */
      case 'napkin': u.poderes.guardanapo=true; cartao('guardanapo',CARTAO_GUARDANAPO); break;
      case 'mirror': case 'scissors': u.cheerT=.8; break;
      case 'broom': u.cheerT=.8; J.varre={t:0}; break; /* varre o monte de migalhas logo ali, na hora */
      case 'tape': fazPonte(); break;
    }
    return true;
  }
  return false;
}
/* fita adesiva: a ponte quebrada (buraco 114-116) volta, feita de fita */
function fazPonte(){ var M=J.nivel; if(!M) return; var x0=null, x1=null;
  for(var c=100;c<M.cols;c++){ if(M.grade[10]&&M.grade[10].charAt(c)===' '){ if(x0===null) x0=c; x1=c; } else if(x0!==null) break; }
  if(x0===null) return; M.plats.push({x:x0*T-6,y:450,w:(x1-x0+1)*T+12,h:18,fita:true}); log({ev:'ponte',x0:x0,x1:x1}); }
/* vassoura: pegou, varreu — as migalhas da frente somem numa nuvem de pó (efeito imediato e visível) */
function varre(dt){ var M=J.mundo; if(!J.varre||!M.paredes) return; J.varre.t+=dt; var u=J.urso;
  if(J.varre.t<.7){ if(Math.random()<dt*30){ var p0=M.paredes.filter(function(p){ return p.viva; })[0]; if(p0) G.emite(2,function(){ return {x:p0.x+Math.random()*90,y:p0.y+Math.random()*90,vx:(Math.random()-.5)*140,vy:-60-Math.random()*90,vida:.7,max:.7,tipo:'nevoa',r:7}; }); } return; }
  var viva=M.paredes.filter(function(p){ return p.viva&&p.x>u.x-100&&p.x<u.x+500; })[0]; if(viva) PERIGOS.quebraParede(M,viva); J.varre=null; }

/* ---------- ação: o tiro do reino ---------- */
var VEL={faisca:{vx:430,vy:0,g:0,alc:200},bolha:{vx:220,vy:-18,g:0,alc:240},vento:{vx:520,vy:0,g:0,alc:200},bola:{vx:470,vy:-200,g:1200,alc:520},biscoito:{vx:430,vy:-240,g:700,alc:420}};
function tiroAtual(){ var u=J.urso; if(!u) return null; var P=poder(); if(fase()===8) return u.poderes.tiro||null; if(!P||!P.tiro||!u.poderes.tiro) return null; if(P.montado&&!u.montado) return null; return P.tiro; }
function atira(){
  var u=J.urso; if(fase()===9||!poder()) return false; if(J.estado!=='nivel'||!u) return true;
  var s=tiroAtual(); if(!s){ if(poder().montado&&u.poderes.tiro) G.toast('Ride Pip first!',1400,'Monte no Pip primeiro!'); return true; }
  if((J.recarga||0)>0) return true; J.recarga=.45;
  var v=VEL[s], s0=G.TAM[u.tam], n=s==='faisca'?3:1;
  if(s==='bola'){ u.chuteAte=J.t+.32; J.estrelas.push({x:u.x+u.dir*30*s0,y:u.y-12*s0,vx:u.dir*v.vx,vy:v.vy,g:v.g,alc:v.alc,dist:0,rot:0,skin:s,quiques:0}); SOM.fx('pisao'); log({ev:'tiro',skin:s}); return true; } /* sai do PÉ */
  for(var k=0;k<n;k++) J.estrelas.push({x:u.x+u.dir*24,y:u.y-46*s0+(k-1)*12,vx:u.dir*v.vx,vy:v.vy+(k-1)*(s==='faisca'?60:0),g:v.g,alc:v.alc,dist:0,rot:0,skin:s,quiques:0});
  SOM.fx(s==='bola'?'pisao':'pulo'); log({ev:'tiro',skin:s}); return true;
}
/* move o tiro; true = acabou */
function moveTiro(e,dt,M){
  e.rot+=dt*10; if(e.g) e.vy+=e.g*dt; var ox=e.x, oy=e.y; e.x+=e.vx*dt; e.y+=(e.vy||0)*dt; e.dist+=Math.hypot(e.x-ox,e.y-oy);
  var fim=e.dist>e.alc||e.x<0||e.x>M.w||e.y>M.h;
  G.solidos(M).forEach(function(s){ if(fim) return; if(e.x>s.x&&e.x<s.x+s.w&&e.y>s.y&&e.y<s.y+s.h){
    if(e.skin==='bola'&&oy<=s.y+2&&e.vy>0&&e.quiques<2){ e.y=s.y-1; e.vy=-e.vy*.6; e.quiques++; SOM.fx('aterra'); return; }
    if(e.skin==='biscoito'){ G.emite(6,function(){ return {x:e.x,y:s.y,vx:(Math.random()-.5)*160,vy:-60-Math.random()*90,vida:.5,max:.5,tipo:'nevoa',r:4}; }); }
    fim=true; if(s.parede&&e.skin==='faisca') PERIGOS.quebraParede(M,s.parede); } });
  if(e.skin==='bola'&&!fim) G.umaVia(M).forEach(function(p){ if(e.vy>0&&e.x>p.x&&e.x<p.x+p.w&&oy<=p.y&&e.y>=p.y&&e.quiques<2){ e.y=p.y-1; e.vy=-e.vy*.6; e.quiques++; } });
  return fim;
}
/* alvos que não são bichos: tempestade (vento acalma), máquina de bolas (bola desliga), Chef (leite) */
function acertaExtra(e,M){
  var hit=false;
  if(e.skin==='vento') (M.tempestades||[]).forEach(function(z){ if(!hit&&e.x>z.x-10&&e.x<z.x+z.w+10&&e.y<z.y+120){ z.calmaT=4; hit=true; G.brilho(z.x+z.w/2,z.y+30,8,'#e0f2fe'); G.toast('The storm calms down!',1400,'A tempestade se acalma!'); } });
  (M.canhoes||[]).forEach(function(g){ if(!hit&&!g.desligado&&Math.abs(e.x-g.x)<40&&Math.abs(e.y-g.y)<50){ desliga(g); hit=true; } });
  (M.chefs||[]).forEach(function(ch){ if(!hit&&!ch.desligado&&Math.abs(e.x-ch.x)<34&&e.y>ch.y-110&&e.y<ch.y){ desligaChef(ch); hit=true; } });
  (J.pratos||[]).forEach(function(p){ if(!hit&&!p.quebrou&&Math.hypot(e.x-p.x,e.y-p.y)<26){ quebraPrato(p); hit=true; } });
  return hit;
}
function desliga(g){ g.desligado=true; g.aviso=0; SOM.fx('tijolo'); J.shake=5; G.pontua(60,g.x,g.y-50); G.toast('The ball machine stops!',1600,'A máquina de bolas parou!'); }

/* ---------- Chef de Tinta (reino 8): espera, ERGUE o prato (aviso), joga em arco; o prato rola e quebra ---------- */
function naTela(x,m){ return x>J.cam-(m||0)&&x<J.cam+W+(m||0); }
function atualizaChefs(dt){
  var M=J.mundo, u=J.urso; if(!J.pratos||J.pratosM!==M){ J.pratos=[]; J.pratosM=M; } if(!M.chefs||!M.chefs.length) return;
  var R=G.ursoRet(), vivo=u.invT<=0&&u.tontoT<=0&&J.estado==='nivel';
  M.chefs.forEach(function(ch){
    if(ch.desligado){ ch.t+=dt; return; }
    ch.t-=dt; ch.dir=u.x<ch.x?-1:1;
    if(ch.estado==='espera'&&ch.t<=0&&naTela(ch.x,-40)&&u.x<ch.x-140){ ch.estado='ergue'; ch.t=.9; SOM.fx('clique'); } /* só joga de longe, com aviso de 0,9 s */
    else if(ch.estado==='ergue'&&ch.t<=0){ ch.estado='joga'; ch.t=.25; var dx=Math.max(-260,Math.min(-120,(u.x-ch.x)*.55)); J.pratos.push({x:ch.x-14,y:ch.y-96,vx:dx*.8,vy:-330,fase:'voo',vida:0,rot:0,r:15}); log({ev:'spawn',de:'chef',x:ch.x-14,y:ch.y-96,cam:J.cam,aviso:.7}); SOM.fx('pulo'); }
    else if(ch.estado==='joga'&&ch.t<=0){ ch.estado='espera'; ch.t=4.2; }
    if(!vivo) return;
    if(G.colideRet(R.x+4,R.y+4,R.w-8,R.h-4,ch.x-22,ch.y-70,44,70)){
      if(u.vy>20&&u.y<ch.y-25){ u.vy=-480; u.noChao=false; u.lancado=true; desligaChef(ch); } else G.machucado(); }
  });
  for(var i=J.pratos.length-1;i>=0;i--){ var p=J.pratos[i]; p.vida+=dt; p.rot+=dt*(p.fase==='voo'?8:6);
    if(p.quebrou){ J.pratos.splice(i,1); continue; }
    if(p.fase==='voo'){ p.vy+=900*dt; p.x+=p.vx*dt; p.y+=p.vy*dt; G.solidos(M).concat(G.umaVia(M)).forEach(function(s){ if(p.fase==='voo'&&p.vy>0&&p.x>s.x&&p.x<s.x+s.w&&p.y+p.r>=s.y&&p.y+p.r<s.y+30){ p.y=s.y-p.r; p.fase='rola'; p.vx=-150; p.vy=0; p.vida=0; SOM.fx('aterra'); } }); }
    else { p.x+=p.vx*dt; var piso=null; G.solidos(M).concat(G.umaVia(M)).forEach(function(s){ if(p.x>s.x&&p.x<s.x+s.w&&p.y+p.r>=s.y-4&&p.y+p.r<s.y+30) piso=s.y; }); if(piso===null){ p.vy=(p.vy||0)+900*dt; p.y+=p.vy*dt; } else p.y=piso-p.r;
      var bate=false; G.solidos(M).forEach(function(s){ if(p.x-p.r<s.x+s.w&&p.x+p.r>s.x&&p.y>s.y+4&&p.y<s.y+s.h) bate=true; }); if(bate||p.vida>.5) { quebraPrato(p); continue; } } /* o prato quebra logo depois de cair (não rola atrás da criança) */
    if(p.y>M.h+60){ J.pratos.splice(i,1); continue; }
    if(vivo&&G.colideRet(R.x+4,R.y,R.w-8,R.h,p.x-p.r,p.y-p.r*.6,p.r*2,p.r*1.2)){ if(p.fase==='rola'&&u.vy>50&&u.y<p.y){ u.vy=-420; u.noChao=false; SOM.fx('pisao'); quebraPrato(p); } else { G.machucado(); quebraPrato(p); } }
  }
}
function quebraPrato(p){ if(p.quebrou) return; p.quebrou=true; SOM.fx('quebra'); G.emite(7,function(){ return {x:p.x,y:p.y,vx:(Math.random()-.5)*200,vy:-100-Math.random()*160,vida:.6,max:.6,tipo:'confete',cor:'#e0f2fe',rot:Math.random()*6,g:1}; }); }
function desligaChef(ch){ ch.desligado=true; ch.t=0; SOM.fx('pisao'); G.pontua(60,ch.x,ch.y-90); PERIGOS.transforma({x:ch.x,y:ch.y,achatado:false}); G.toast('The Ink Chef is clean now!',1600,'O Chef de Tinta ficou limpinho!'); }

/* ---------- por quadro ---------- */
var tiroVisto=null, avisoCeu=0, montVisto=null;
function atualiza(dt){
  var M=J.mundo, u=J.urso; if(!M||!u) return;
  if(J.recarga>0) J.recarga-=dt;
  atualizaChefs(dt); varre(dt); porteiras(dt); if(J.faixaHist) J.faixaHist.t+=dt;
  (M.tempestades||[]).forEach(function(z){ if(z.calmaT>0) z.calmaT-=dt; });
  /* céu: sem a capa, não se sai do chão (cair no vazio sem saber voar não ensina nada) */
  if(M.modo==='voo'&&!u.poderes.capa){ var lim=26*T-G.URSO_W*G.TAM[u.tam]/2-4; if(u.x>lim){ u.x=lim; if(u.vx>0) u.vx=0; if(avisoCeu<=0){ avisoCeu=2; G.toast('Get the cape first!',1800,'Pegue a capa primeiro!'); } } }
  if(avisoCeu>0) avisoCeu-=dt;
  /* giz: a cambalhota transforma o bicho que encostar */
  if(u.poderes.giz&&u.flip>0){ var R=G.ursoRet(); M.inimigos.forEach(function(e){ if(!e.morto&&!e.achatado&&G.colideRet(R.x,R.y,R.w,R.h,e.x-18,e.y-30,36,30)) PERIGOS.transforma(e); }); }
  /* o botão de ação acompanha o poder (Pip: só montado) */
  if(fase()===2&&!!u.montado!==montVisto){ montVisto=!!u.montado; hudPoder(); }
  var s=tiroAtual(); if(fase()!==9&&s!==tiroVisto){ tiroVisto=s; if(window.UI) UI.acao(!!s,0,s?icone(s):null,s); }
}
/* segundo pulo do giz = cambalhota (chamado pelo motor) */
function segundoPulo(){ var u=J.urso; if(u.poderes.giz){ u.flip=1; u.invT=Math.max(u.invT,.6); G.emite(8,function(){ return {x:u.x,y:u.y-30,vx:(Math.random()-.5)*140,vy:-30-Math.random()*60,vida:.6,max:.6,tipo:'nevoa',r:5}; }); } }
function reinicia(){ document.body.classList.toggle('cozinha',fase()===8); tiroVisto=undefined; montVisto=null; J.recarga=0; J.pratos=[]; J.pratosM=null; J.historia=[]; J.faixaHist=null; J.varre=null; montaPorteiras(); hudPoder(); }

/* ---------- PORTEIRAS (18/10, Paulo: "a criança tem de ser desestimulada a seguir sem acessar as questões") ----------
   Uma cortina de tinta 5 tiles depois de cada entrada (porta, baú) — e depois do cano, para a entrada do submundo.
   Ela só some quando as 3 perguntas daquela entrada terminam (certas ou não: nunca prende a criança). */
function montaPorteiras(){
  J.porteiras=[]; return; /* 18/10 (Paulo): nada de barreira — a seta incentiva, não obriga. Código mantido só para referência. */
  var L=J.nivel; if(!L||!L.grade||J.faseAtual&&J.faseAtual.chefao) return;
  var g=L.grade, rc=g.length-2, trig=[];
  L.moradores.forEach(function(m){ trig.push({x:m.x,m:m}); });
  if(L.sub){ var ids=L.sub.canos.map(function(q){ return q.id; }), cs=L.canos.filter(function(p){ return ids.indexOf(p.id)>=0; });
    if(cs.length){ var xm=Math.max.apply(null,cs.map(function(p){ return p.x+p.w; })); L.sub.moradores.forEach(function(m){ trig.push({x:xm,m:m}); }); } }
  var livre=function(c){ if(c<1||c>=L.cols-2) return false; if(g[rc].charAt(c)!=='#') return false;
    for(var r=0;r<rc;r++){ for(var dc=-1;dc<=1;dc++){ var ch=g[r].charAt(c+dc); if(dc!==0&&'XRl'.indexOf(ch)<0) continue; if(ch!==' '&&'#B%DcF1234Q=fmnSVlRXtuLW'.indexOf(ch)>=0) return false; } } return true; };
  var usadas={}, ocupa=function(c){ return usadas[c]||usadas[c-1]||usadas[c+1]||usadas[c-2]||usadas[c+2]; };
  trig.sort(function(a,b){ return a.x-b.x; }).forEach(function(tr){ var c0=Math.floor(tr.x/T), c=-1;
    for(var k=4;k<=9&&c<0;k++) if(livre(c0+k)&&!ocupa(c0+k)) c=c0+k; /* logo depois da entrada, no chão */
    for(var k2=2;k2<4&&c<0;k2++) if(livre(c0+k2)&&!ocupa(c0+k2)) c=c0+k2;
    for(var k3=10;k3<=45&&c<0;k3++) if(livre(c0+k3)&&livre(c0+k3-1)&&livre(c0+k3-2)&&!ocupa(c0+k3)) c=c0+k3; /* depois de um vão (céu): com chão antes, nunca no ar */
    if(c>0){ usadas[c]=1; J.porteiras.push({x:c*T+8,w:30,m:tr.m,abre:0}); } });
}
function solidos(M,s){ if(M!==J.nivel||!J.porteiras||!J.urso) return; var u=J.urso; J.porteiras.forEach(function(p){ var cx=p.x+p.w/2; if(Math.abs(u.x-cx)>50) p.lado=u.x<cx?'esq':'dir'; if(!p.m.feito&&p.lado!=='dir') s.push({x:p.x,y:-3000,w:p.w,h:M.h+3000,porteira:p}); }); } /* mão única: o lado fica TRAVADO até o herói se afastar; quem chegou pela direita (saiu por um cano) volta livre */
function porteiras(dt){ var u=J.urso, M=J.mundo; if(!J.porteiras||M!==J.nivel) return;
  J.porteiras.forEach(function(p){ if(p.m.feito&&p.abre<1){ if(p.abre===0){ SOM.fx('destrava'); G.brilho(p.x+15,u.y-60,16,'#c4b5fd'); } p.abre=Math.min(1,p.abre+dt*1.5); }
    if(!p.m.feito&&Math.abs(u.x-p.x)<46&&J.estado==='nivel'&&!(J.avisoPort>0)){ J.avisoPort=2.5; SOM.fx('clique'); G.toast('Go back! Answer the ? first ◀',2200,'Volte! Responda o ? primeiro ◀'); } });
  if(J.avisoPort>0) J.avisoPort-=dt; }
function desenhaPorteiras(c,t){ var M=J.mundo; if(!J.porteiras||M!==J.nivel||J.quiz) return; var vx0=J.cam-80, vx1=J.cam+W+80;
  J.porteiras.forEach(function(p){ if(p.abre>=1||p.x<vx0||p.x>vx1) return; var a=1-p.abre, top=J.camY-20, bot=J.camY+560;
    c.save(); c.globalAlpha=a;
    var g=c.createLinearGradient(p.x,0,p.x+p.w,0); g.addColorStop(0,'rgba(49,46,129,.15)'); g.addColorStop(.5,'rgba(67,56,202,.85)'); g.addColorStop(1,'rgba(49,46,129,.15)'); c.fillStyle=g;
    c.beginPath(); c.moveTo(p.x,top); for(var y=top;y<=bot;y+=20) c.lineTo(p.x+Math.sin(y*.05+t*3)*5,y); c.lineTo(p.x+p.w+Math.sin(bot*.05+t*3)*5,bot); for(var y2=bot;y2>=top;y2-=20) c.lineTo(p.x+p.w+Math.sin(y2*.05+t*3+1)*5,y2); c.closePath(); c.fill();
    c.fillStyle='rgba(199,210,254,.8)'; for(var k=0;k<6;k++){ var fy=top+((t*60+k*97)%(bot-top)); circ(c,p.x+p.w/2+Math.sin(fy*.1)*6,fy,3); c.fill(); }
    var cy=J.camY+300; c.fillStyle='#fef3c7'; rr(c,p.x+p.w/2-42,cy-60,84,58,12); c.fill(); c.strokeStyle='#4338ca'; c.lineWidth=3; rr(c,p.x+p.w/2-42,cy-60,84,58,12); c.stroke();
    c.fillStyle='#4338ca'; c.font='900 26px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('◀ ?',p.x+p.w/2,cy-38); c.font='900 11px "Nunito",Arial'; c.fillText('ANSWER FIRST',p.x+p.w/2,cy-14);
    c.restore(); }); }

function hudPoder(){ if(!window.UI||!UI.poderHud) return; var u=J.urso, P=poder(); if(!u||!P){ UI.poderHud(null); return; }
  var tem= P.id==='botas'?u.poderes.bota:(P.id==='giz'?u.poderes.giz:(P.id==='pip'?!!u.montado:(P.id==='traje'?u.poderes.traje:(P.id==='capa'?u.poderes.capa:!!u.poderes.tiro))));
  if(fase()===8){ UI.poderHud(u.poderes.tiro?icone('biscoito'):null,'cookies','biscoitos'); return; }
  UI.poderHud(tem?icone(P.id):null,tem?P.nome:'',tem?P.nomePt:''); }

/* ---------- ícones (desenhados no canvas, iguais no botão e no HUD) ---------- */
var ICO={};
function icone(k){ if(ICO[k]) return ICO[k]; var cv=document.createElement('canvas'); cv.width=cv.height=96; var c=cv.getContext('2d'); c.translate(48,52); c.scale(2.2,2.2); c.lineJoin='round'; c.lineCap='round';
  switch(k){
    case 'faisca': c.fillStyle='#f97316'; for(var i=0;i<3;i++) A.estrela(c,-9+i*9,(i%2)*6-3,7,i===1?'#fde047':'#fb923c',i); break;
    case 'bolha': case 'traje': desBolha(c,0,0,13); break;
    case 'vento': case 'capa': desVento(c,0,0,1); break;
    case 'bola': case 'bolas': desBola(c,0,0,13,0); break;
    case 'biscoito': A.biscoito(c,0,0,13,0); break;
    case 'leite': case 'canudo': case 'straw': c.fillStyle='rgba(191,219,254,.6)'; c.beginPath(); c.moveTo(-9,-14); c.lineTo(9,-14); c.lineTo(7,14); c.lineTo(-7,14); c.closePath(); c.fill(); c.fillStyle='#fff'; c.beginPath(); c.moveTo(-8.4,-6); c.lineTo(8.4,-6); c.lineTo(7,14); c.lineTo(-7,14); c.closePath(); c.fill(); canudo(c,4,-4,1); break;
    case 'napkin': guardanapoIco(c); break;
    case 'broom': vassoura(c,0,10,.5); break;
    case 'botas': bota(c,-6,8,.8); bota(c,7,8,.8); break;
    case 'giz': c.fillStyle='#e5e7eb'; el(c,0,4,14,8); c.fill(); c.fillStyle='#fff'; el(c,0,0,11,4); c.fill(); c.fillStyle='rgba(255,255,255,.8)'; circ(c,-4,-8,4); c.fill(); circ(c,4,-11,3); c.fill(); break;
    default: A.estrela(c,0,0,13,'#fde047',0);
  }
  ICO[k]=cv.toDataURL(); return ICO[k]; }

/* ---------- desenho: peças pequenas ---------- */
function desBola(c,x,y,r,rot){ c.save(); c.translate(x,y); c.rotate(rot||0); c.fillStyle='#fff'; circ(c,0,0,r); c.fill(); c.strokeStyle='#111'; c.lineWidth=1.5; circ(c,0,0,r); c.stroke();
  c.fillStyle='#111'; c.beginPath(); for(var i=0;i<5;i++){ var a=i/5*Math.PI*2-Math.PI/2; c.lineTo(Math.cos(a)*r*.38,Math.sin(a)*r*.38); } c.fill();
  for(var j=0;j<5;j++){ var b=j/5*Math.PI*2-Math.PI/2; c.beginPath(); c.arc(Math.cos(b)*r*.95,Math.sin(b)*r*.95,r*.28,0,Math.PI*2); c.fill(); } c.restore(); }
function desBolha(c,x,y,r){ c.save(); c.fillStyle='rgba(186,230,253,.35)'; circ(c,x,y,r); c.fill(); c.strokeStyle='rgba(224,242,254,.95)'; c.lineWidth=2; circ(c,x,y,r); c.stroke(); c.fillStyle='rgba(255,255,255,.9)'; el(c,x-r*.35,y-r*.4,r*.28,r*.18); c.fill(); c.restore(); }
function desVento(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.strokeStyle='#e0f2fe'; c.lineWidth=3; c.beginPath(); c.moveTo(-14,-6); c.lineTo(6,-6); c.arc(6,-11,5,Math.PI/2,-Math.PI*.9,true); c.stroke(); c.beginPath(); c.moveTo(-14,2); c.lineTo(10,2); c.stroke(); c.beginPath(); c.moveTo(-10,9); c.lineTo(4,9); c.arc(4,14,5,-Math.PI/2,Math.PI*.9,false); c.stroke(); c.restore(); }
function canudo(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.rotate(.25); c.lineCap='round'; c.strokeStyle='#fff'; c.lineWidth=4; c.beginPath(); c.moveTo(0,18); c.lineTo(0,-10); c.quadraticCurveTo(0,-15,6,-17); c.stroke(); c.strokeStyle='#ef4444'; c.setLineDash([3,3]); c.beginPath(); c.moveTo(0,18); c.lineTo(0,-10); c.quadraticCurveTo(0,-15,6,-17); c.stroke(); c.setLineDash([]); c.restore(); }
function bota(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='#92400e'; rr(c,-6,-22,12,22,4); c.fill(); rr(c,-6,-6,18,8,4); c.fill(); c.fillStyle='#fbbf24'; rr(c,-7,-24,14,5,2); c.fill();
  c.fillStyle='#fff'; c.beginPath(); c.moveTo(-6,-16); c.quadraticCurveTo(-16,-24,-18,-14); c.quadraticCurveTo(-12,-14,-6,-11); c.fill(); c.restore(); }
function vassoura(c,x,y,s){ c.save(); c.translate(x,y); c.scale(s,s); c.strokeStyle='#92400e'; c.lineWidth=5; c.beginPath(); c.moveTo(8,-80); c.lineTo(0,-22); c.stroke();
  c.fillStyle='#facc15'; c.beginPath(); c.moveTo(-6,-24); c.lineTo(8,-22); c.lineTo(14,0); c.lineTo(-16,0); c.closePath(); c.fill(); c.strokeStyle='#ca8a04'; c.lineWidth=1.5; for(var k=0;k<5;k++){ c.beginPath(); c.moveTo(-3+k*2.5,-20); c.lineTo(-12+k*6,0); c.stroke(); } c.fillStyle='#dc2626'; rr(c,-6,-27,14,5,2); c.fill(); c.restore(); }
function guardanapoIco(c){ c.fillStyle='#fff'; rr(c,-13,-13,26,26,3); c.fill(); c.strokeStyle='#3b82f6'; c.lineWidth=2.5; rr(c,-13,-13,26,26,3); c.stroke(); c.strokeStyle='rgba(59,130,246,.5)'; c.lineWidth=1.5; for(var i=-6;i<=6;i+=6){ c.beginPath(); c.moveTo(i,-13); c.lineTo(i,13); c.moveTo(-13,i); c.lineTo(13,i); c.stroke(); } }
var PLACA_PT={'BOOTS':'Botas','BALLS':'Bolas','DIVING SUIT':'Roupa de mergulho','CAPE':'Capa','COOKIE':'Biscoito','MILK + STRAW':'Leite e canudo','NAPKINS':'Guardanapos','MIRROR':'Espelho','SCISSORS':'Tesoura','BROOM':'Vassoura','TAPE':'Fita adesiva','STRAWS':'Canudos','CHALK':'Giz'};
function placa(c,x,y,txt){ if(J.tr&&PLACA_PT[txt]){ c.save(); c.font='700 11px "Nunito",Arial'; var wp=c.measureText(PLACA_PT[txt]).width+10; c.fillStyle='rgba(13,11,30,.82)'; rr(c,x-wp/2,y+10,wp,16,5); c.fill(); c.fillStyle='#fde68a'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(PLACA_PT[txt],x,y+18.5); c.restore(); } c.save(); c.font='900 12px "Nunito",Arial'; var w=c.measureText(txt).width+12; c.fillStyle='#fef3c7'; rr(c,x-w/2,y-9,w,18,5); c.fill(); c.strokeStyle='#92400e'; c.lineWidth=2; rr(c,x-w/2,y-9,w,18,5); c.stroke(); c.fillStyle='#78350f'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(txt,x,y+1); c.restore(); }
function brilhoChao(c,x,y,t){ var a=.25+.15*Math.sin(t*4); var g=c.createRadialGradient(x,y,4,x,y,60); g.addColorStop(0,'rgba(253,224,71,'+a+')'); g.addColorStop(1,'rgba(253,224,71,0)'); c.fillStyle=g; el(c,x,y,60,18); c.fill(); }

/* ---------- desenho dos itens nos seus móveis ---------- */
function desenhaItem(c,it,t){
  if(!desenhavel(it)) return false;
  var base=it.y+T/2; c.save(); c.translate(it.x,base);
  if(!it.pego&&(it.tipo!=='historia'||it.nome==='milk'||it.nome==='napkin')) brilhoChao(c,0,0,t);
  if(it.tipo==='historia'){ c.scale(1.2,1.2); desenhaHist(c,it,t);
    if(peloQuiz(it)&&!it.pego){ var yb=-78+Math.sin(t*3)*3; c.fillStyle='rgba(253,224,71,.3)'; circ(c,0,yb,22); c.fill(); c.fillStyle='#fde047'; circ(c,0,yb,15); c.fill(); c.strokeStyle='#92400e'; c.lineWidth=2.5; circ(c,0,yb,15); c.stroke(); c.fillStyle='#78350f'; c.font='900 20px "Nunito",Arial'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('?',0,yb+1); } }
  else desenhaSuporte(c,it,t);
  c.restore(); return true;
}
function desenhaSuporte(c,it,t){
  var P=poder(), id=P?P.id:it.tipo;
  if(id==='botas'){ /* barraca do sapateiro (o toldo de cima é o telhado dela) */
    c.fillStyle='#78350f'; c.fillRect(-46,-120,6,120); c.fillRect(40,-120,6,120);
    c.fillStyle=lin(c,0,-44,0,0,'#b45309','#78350f'); rr(c,-50,-44,100,44,5); c.fill(); c.fillStyle='#fde68a'; c.fillRect(-50,-46,100,6);
    if(!it.pego){ bota(c,-12,-46,1.25); bota(c,14,-46,1.25); } placa(c,0,-96,'BOOTS'); return; }
  if(id==='giz'){ /* pedestal com a tigela de giz, como nas competições */
    c.fillStyle=lin(c,-14,0,14,0,'#cbd5e1','#64748b'); rr(c,-12,-56,24,56,4); c.fill(); c.fillStyle='#94a3b8'; rr(c,-24,-6,48,6,3); c.fill();
    c.fillStyle='#e2e8f0'; el(c,0,-58,28,9); c.fill(); c.fillStyle='#475569'; c.beginPath(); c.moveTo(-28,-58); c.quadraticCurveTo(0,-30,28,-58); c.fill(); c.fillStyle='#fff'; el(c,0,-60,24,6); c.fill();
    if(!it.pego) c.fillStyle='rgba(255,255,255,.7)'; else c.fillStyle='rgba(255,255,255,0)'; for(var k=0;k<4;k++){ var f=(t*.6+k/4)%1; circ(c,-12+k*8,-66-f*30,3+f*4); c.fill(); }
    placa(c,0,-108,'CHALK'); return; }
  if(id==='bolas'){ /* rack de bolas no vestiário */
    c.strokeStyle='#64748b'; c.lineWidth=4; c.beginPath(); c.moveTo(-40,0); c.lineTo(-40,-70); c.moveTo(40,0); c.lineTo(40,-70); c.moveTo(-40,-34); c.lineTo(40,-34); c.moveTo(-40,-68); c.lineTo(40,-68); c.stroke();
    desBola(c,-22,-48,13,0); desBola(c,4,-48,13,1); desBola(c,26,-48,12,2); desBola(c,-14,-14,13,3); desBola(c,14,-14,13,4); /* sobram bolas no rack: o herói leva um saco */ placa(c,0,-90,'BALLS'); return; }
  if(id==='traje'){ /* arara de praia com a roupa pendurada */
    c.fillStyle='#92400e'; c.fillRect(-3,-120,6,120); c.fillRect(-26,-4,52,6); c.fillRect(-30,-120,60,5);
    c.strokeStyle='#475569'; c.lineWidth=2; c.beginPath(); c.moveTo(0,-115); c.lineTo(0,-104); c.stroke();
    if(!it.pego){ c.save(); c.translate(0,-62); c.scale(1.6,1.6); c.fillStyle='#0e7490'; rr(c,-12,-22,24,30,8); c.fill(); c.fillStyle='#facc15'; c.fillRect(-12,-10,24,4);
    c.fillStyle='#1e293b'; rr(c,-11,-34,22,12,6); c.fill(); c.fillStyle='rgba(125,211,252,.9)'; rr(c,-8,-32,16,7,3); c.fill();
    c.strokeStyle='#f97316'; c.lineWidth=3; c.beginPath(); c.moveTo(11,-30); c.lineTo(13,-42); c.stroke();
    c.fillStyle='#f97316'; c.beginPath(); c.moveTo(-10,8); c.lineTo(-18,18); c.lineTo(-2,18); c.closePath(); c.fill(); c.beginPath(); c.moveTo(10,8); c.lineTo(18,18); c.lineTo(2,18); c.closePath(); c.fill(); c.restore(); }
    placa(c,52,-40,'DIVING SUIT'); return; } /* placa ao lado do poste: no alto, o HUD cobria */
  if(id==='capa'){ /* cabide de madeira com a capa das nuvens */
    c.fillStyle='#78350f'; c.fillRect(-3,-130,6,130); c.fillRect(-22,-4,44,6); c.strokeStyle='#78350f'; c.lineWidth=4; c.beginPath(); c.moveTo(0,-122); c.quadraticCurveTo(14,-128,16,-116); c.stroke();
    if(it.pego){ placa(c,0,-146,'CAPE'); return; }
    var w=Math.sin(t*3)*4; c.fillStyle=lin(c,0,-118,0,-40,'#8b5cf6','#4c1d95'); c.beginPath(); c.moveTo(4,-116); c.quadraticCurveTo(28,-114,30+w,-50); c.quadraticCurveTo(14,-40,-4+w*.5,-46); c.quadraticCurveTo(0,-90,4,-116); c.fill();
    c.fillStyle='#fde047'; circ(c,8,-114,4); c.fill(); c.fillStyle='rgba(255,255,255,.9)'; circ(c,18,-80,5); c.fill(); circ(c,24,-84,6); c.fill(); circ(c,30,-80,5); c.fill();
    placa(c,0,-146,'CAPE'); return; }
  /* reserva: estrela num pedestal */
  c.fillStyle='#78716c'; rr(c,-14,-40,28,40,4); c.fill(); A.estrela(c,0,-58,14,'#fde047',t);
}
function mesa(c,larg){ var h=46; c.fillStyle='#92400e'; c.fillRect(-larg/2+6,-h,7,h); c.fillRect(larg/2-13,-h,7,h);
  c.fillStyle='#fff'; rr(c,-larg/2,-h-6,larg,14,4); c.fill(); c.save(); c.beginPath(); rr(c,-larg/2,-h-6,larg,24,4); c.clip(); c.fillStyle='#dc2626'; for(var i=-larg/2;i<larg/2;i+=12){ for(var j=0;j<3;j++) if(((i/12|0)+j)%2===0) c.fillRect(i,-h-6+j*8,12,8); } c.restore();
  c.strokeStyle='rgba(0,0,0,.15)'; c.lineWidth=1; c.strokeRect(-larg/2,-h-6,larg,24); return -h-6; }
function desenhaHist(c,it,t){
  var n=it.nome, topo;
  switch(n){
    case 'cookie': topo=mesa(c,150); if(it.pego) return; c.fillStyle='#fff'; el(c,0,topo-2,30,8); c.fill(); c.strokeStyle='#cbd5e1'; c.lineWidth=2; el(c,0,topo-2,30,8); c.stroke(); A.biscoito(c,0,topo-14,17,0); placa(c,0,topo-50,'COOKIE'); return;
    case 'milk': topo=mesa(c,150); if(it.pego){ c.fillStyle='rgba(191,219,254,.5)'; c.beginPath(); c.moveTo(-14,topo-56); c.lineTo(14,topo-56); c.lineTo(11,topo); c.lineTo(-11,topo); c.closePath(); c.fill(); return; }
      c.save(); c.translate(0,topo); c.fillStyle='rgba(191,219,254,.55)'; c.beginPath(); c.moveTo(-15,-58); c.lineTo(15,-58); c.lineTo(12,0); c.lineTo(-12,0); c.closePath(); c.fill();
      c.fillStyle='#fff'; c.beginPath(); c.moveTo(-14.3,-44); c.lineTo(14.3,-44); c.lineTo(12,0); c.lineTo(-12,0); c.closePath(); c.fill(); c.fillStyle='#e2e8f0'; el(c,0,-44,14.3,3.5); c.fill();
      c.strokeStyle='#94a3b8'; c.lineWidth=2; c.beginPath(); c.moveTo(-15,-58); c.lineTo(-12,0); c.lineTo(12,0); c.lineTo(15,-58); c.stroke(); c.fillStyle='rgba(255,255,255,.95)'; c.fillRect(-10,-52,3,46);
      /* o canudo listrado, dobrado, dentro do copo */
      c.lineCap='round'; c.strokeStyle='#fff'; c.lineWidth=5; c.beginPath(); c.moveTo(4,-30); c.lineTo(8,-74); c.quadraticCurveTo(9,-82,18,-84); c.stroke(); c.strokeStyle='#ef4444'; c.setLineDash([4,4]); c.beginPath(); c.moveTo(4,-30); c.lineTo(8,-74); c.quadraticCurveTo(9,-82,18,-84); c.stroke(); c.setLineDash([]); c.restore();
      placa(c,0,topo-100,'MILK + STRAW'); return;
    case 'straw': topo=mesa(c,150); if(it.pego) return; c.save(); c.translate(0,topo); c.fillStyle='rgba(219,234,254,.7)'; rr(c,-12,-30,24,30,4); c.fill(); c.strokeStyle='#93c5fd'; c.lineWidth=2; rr(c,-12,-30,24,30,4); c.stroke(); canudo(c,-5,-36,1.3); canudo(c,4,-38,1.4); canudo(c,0,-34,1.2); c.restore(); placa(c,0,topo-74,'STRAWS'); return;
    case 'napkin': /* porta-guardanapos em cima do balcão */
      c.fillStyle='#94a3b8'; rr(c,-22,-6,44,6,2); c.fill(); c.fillRect(-20,-30,4,26); c.fillRect(16,-30,4,26); if(!it.pego){ c.fillStyle='#fff'; c.beginPath(); c.moveTo(-16,-4); c.lineTo(-10,-36); c.lineTo(10,-36); c.lineTo(16,-4); c.closePath(); c.fill(); c.strokeStyle='#60a5fa'; c.lineWidth=2; c.stroke(); } placa(c,0,-52,'NAPKINS'); return;
    case 'mirror': /* cômoda com o espelho de mão em cima */
      c.fillStyle=lin(c,0,-50,0,0,'#b45309','#78350f'); rr(c,-30,-50,60,50,5); c.fill(); c.strokeStyle='#fde68a'; c.lineWidth=2; c.strokeRect(-24,-42,48,18); c.strokeRect(-24,-20,48,16); c.fillStyle='#fde68a'; circ(c,0,-33,2.5); c.fill(); circ(c,0,-12,2.5); c.fill();
      if(!it.pego){ c.save(); c.translate(0,-66); c.fillStyle='#b45309'; rr(c,-3,6,6,14,2); c.fill(); c.fillStyle='#d97706'; el(c,0,-4,13,15); c.fill(); c.fillStyle='#bae6fd'; el(c,0,-4,10,12); c.fill(); c.fillStyle='rgba(255,255,255,.8)'; el(c,-4,-8,2.5,5); c.fill(); c.restore(); } placa(c,0,-100,'MIRROR'); return;
    case 'scissors': /* banqueta com a caneca das tesouras */
      c.fillStyle='#a16207'; c.fillRect(-18,-36,5,36); c.fillRect(13,-36,5,36); c.fillStyle='#ca8a04'; rr(c,-22,-40,44,8,3); c.fill();
      c.fillStyle='#2563eb'; rr(c,-11,-64,22,24,4); c.fill(); if(!it.pego){ c.strokeStyle='#94a3b8'; c.lineWidth=3; c.beginPath(); c.moveTo(-3,-60); c.lineTo(6,-84); c.moveTo(3,-60); c.lineTo(-6,-84); c.stroke(); c.strokeStyle='#ef4444'; circ(c,-5,-60,4); c.stroke(); circ(c,5,-60,4); c.stroke(); } placa(c,0,-100,'SCISSORS'); return;
    case 'broom': if(!it.pego){ c.save(); c.rotate(.12); vassoura(c,0,0,1.1); c.restore(); } placa(c,0,-104,'BROOM'); return;
    case 'tape': if(!it.pego){ c.fillStyle='#d6d3d1'; circ(c,0,-14,14); c.fill(); c.fillStyle='#78716c'; circ(c,0,-14,7); c.fill(); c.strokeStyle='#a8a29e'; c.lineWidth=2; circ(c,0,-14,14); c.stroke(); c.fillStyle='rgba(231,229,228,.95)'; c.fillRect(10,-6,16,6); } placa(c,0,-42,'TAPE'); return;
  }
}
/* plataforma de fita (a ponte consertada) */
function plataforma(c,p){ if(!p.fita) return false; c.fillStyle='rgba(231,229,228,.95)'; rr(c,p.x,p.y,p.w,p.h,4); c.fill(); c.strokeStyle='#a8a29e'; c.lineWidth=2; for(var x=p.x+10;x<p.x+p.w;x+=22){ c.beginPath(); c.moveTo(x,p.y+3); c.lineTo(x+8,p.y+p.h-3); c.stroke(); } return true; }
/* o ninho do Pip (debaixo do ovo) */
function ninho(c,x,y){ c.save(); c.translate(x,y); c.fillStyle='#78350f'; el(c,0,-4,34,10); c.fill(); c.strokeStyle='#a16207'; c.lineWidth=2; for(var i=0;i<7;i++){ c.beginPath(); c.moveTo(-32+i*9,-8); c.quadraticCurveTo(-26+i*9,-14,-20+i*9,-6); c.stroke(); } c.restore(); }

/* ---------- herói: paraquedas do guardanapo e botas aladas ---------- */
function antesHeroi(c,u,s,t){ if(J.poseHeroi!=='paraquedas') return; var hh=G.URSO_H*s;
  c.save(); c.translate(u.x,u.y-hh-34); var bal=Math.sin(t*4)*.06; c.rotate(bal);
  c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=1.5; c.beginPath(); c.moveTo(-34,0); c.lineTo(-8,30); c.moveTo(34,0); c.lineTo(8,30); c.moveTo(0,-4); c.lineTo(0,30); c.stroke();
  /* o guardanapo aberto, segurado pelas pontas: um quadrado branco de borda azul xadrez, inflado */
  c.beginPath(); c.moveTo(-44,6); c.quadraticCurveTo(0,-44,44,6); c.lineTo(38,16); c.quadraticCurveTo(0,-16,-38,16); c.closePath(); c.fillStyle='#fff'; c.fill(); c.strokeStyle='#2563eb'; c.lineWidth=3; c.stroke();
  c.save(); c.clip(); c.fillStyle='rgba(59,130,246,.35)'; for(var i=-44;i<=44;i+=11){ c.fillRect(i,-40,4,60); } for(var j=-30;j<=16;j+=11){ c.fillRect(-44,j,88,4); } c.restore(); c.restore(); }
function depoisHeroi(c,u,s,t){ if(!u.poderes.bota||fase()!==1||u.montado) return;
  c.save(); c.translate(u.x,u.y); c.scale(u.dir*s,s); var bat=Math.sin(t*14)*.25;
  [-7,7].forEach(function(dx){ c.save(); c.translate(dx-5,-6); c.rotate(-.3+bat); c.fillStyle='rgba(255,255,255,.95)'; c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-12,-12,-16,-2); c.quadraticCurveTo(-9,-3,0,3); c.fill(); c.strokeStyle='#fbbf24'; c.lineWidth=1.5; c.stroke(); c.restore(); });
  c.restore(); }

/* ---------- tiros ---------- */
function desenhaTiro(c,e,t){
  switch(e.skin){
    case 'faisca': c.save(); c.globalAlpha=.4; A.estrela(c,e.x-Math.sign(e.vx)*12,e.y,8,'#fdba74',e.rot); c.restore(); A.estrela(c,e.x,e.y,10,'#fb923c',e.rot); A.estrela(c,e.x,e.y,5,'#fde047',-e.rot); return true;
    case 'bolha': desBolha(c,e.x,e.y,14); return true;
    case 'vento': c.save(); c.globalAlpha=.9; c.translate(e.x,e.y); c.scale(Math.sign(e.vx)||1,1); desVento(c,0,0,1.2); c.restore(); return true;
    case 'bola': desBola(c,e.x,e.y,11,e.rot); return true;
    case 'biscoito': c.save(); c.translate(e.x,e.y); c.rotate(e.rot); A.biscoito(c,0,0,10,0); c.restore(); return true;
    case 'leite': c.save(); c.fillStyle='#fff'; c.strokeStyle='#cbd5e1'; c.lineWidth=1.5; c.beginPath(); el(c,e.x,e.y,10,7); c.fill(); c.stroke(); c.globalAlpha=.6; circ(c,e.x-Math.sign(e.vx)*12,e.y+2,5); c.fill(); circ(c,e.x-Math.sign(e.vx)*22,e.y+4,3); c.fill(); c.restore(); return true;
  }
  return false;
}
/* rolantes com pele: barril (vila), bola de futebol (estádio) */
function desenhaRolante(c,b,t){
  if(b.skin==='barril'){ c.save(); c.translate(b.x,b.y); c.rotate(b.rot); c.fillStyle=lin(c,-20,-20,20,20,'#b45309','#78350f'); circ(c,0,0,b.r); c.fill(); c.strokeStyle='#451a03'; c.lineWidth=3; circ(c,0,0,b.r); c.stroke(); circ(c,0,0,b.r*.55); c.stroke(); c.beginPath(); c.moveTo(-b.r,0); c.lineTo(b.r,0); c.moveTo(0,-b.r); c.lineTo(0,b.r); c.stroke(); c.restore(); return true; }
  if(b.skin==='futebol'){ desBola(c,b.x,b.y,b.r,b.rot); return true; }
  return false;
}

/* ---------- fontes dos perigos (desenhadas ATRÁS de tudo) ---------- */
function grupos(lst,dist){ var g=[]; lst.slice().sort(function(a,b){ return a.x-b.x; }).forEach(function(p){ var u=g[g.length-1]; if(u&&p.x-u.x1<dist){ u.x1=p.x; u.n.push(p); } else g.push({x0:p.x,x1:p.x,n:[p]}); }); return g; }
function desenhaFundo(c,t){
  var M=J.mundo; if(!M) return; var cena=M.cena, vx0=J.cam-200, vx1=J.cam+W+200;
  /* o que cai: telhado (vila), galho (floresta), torneira (cozinha) */
  grupos(M.pingentes.map(function(p){ return {x:p.x,y:p.y0}; }),160).forEach(function(gr){ if(gr.x1<vx0||gr.x0>vx1) return; var y=gr.n[0].y;
    if(cena==='vila') telhado(c,gr.x0-60,gr.x1+60,y);
    else if(cena==='bosque') galho(c,gr.x0-50,gr.x1+40,y,t);
    else if(cena==='biscoito') gr.n.forEach(function(p){ torneira(c,p.x,y); }); });
  /* cipós: presos em galhos de verdade */
  if(cena==='bosque') (M.pendulos||[]).forEach(function(p){ if(p.ax>vx0&&p.ax<vx1) galho(c,p.ax-70,p.ax+40,p.ay,t,true); });
  /* argolas e barras: viga do teto do ginásio */
  if(cena==='ginasio') (M.pendulos||[]).forEach(function(p){ if(p.ax>vx0&&p.ax<vx1){ c.fillStyle='#475569'; c.fillRect(p.ax-60,p.ay-10,120,12); c.fillStyle='#334155'; c.fillRect(p.ax-4,0,8,p.ay-8); } });
  /* rolantes: pilha de toras / portão com barris */
  M.troncos.forEach(function(g){ if(g.x<vx0||g.x>vx1) return; var tr=g.aviso>0?Math.sin(t*14)*1.5:0; if(cena==='bosque') pilhaToras(c,g.x,g.y,tr); else if(cena==='vila') portaoBarris(c,g.x,g.y,tr); else if(g.bola) maquina(c,g,t); });
  M.canhoes.forEach(function(g){ if(g.x>vx0&&g.x<vx1) maquina(c,g,t); });
  /* voadores da floresta e da cozinha moram numa luz */
  if(cena==='bosque'||cena==='biscoito') M.inimigos.forEach(function(e){ if(e.tipo==='corvo'&&e.x0>vx0&&e.x0<vx1) luz(c,e.x0,e.y0-200,cena,t); });
  /* vento do céu: a nuvem que sopra */
  (M.ventos||[]).forEach(function(v){ if(v.x+v.w>vx0&&v.x<vx1) nuvemSopra(c,v.x+v.w/2,v.y-14,t); });
  /* cozinha: o escorredor de pratos atrás do Chef */
  (M.chefs||[]).forEach(function(ch){ if(ch.x>vx0&&ch.x<vx1) escorredor(c,ch.x+46,ch.y); });
}
function telhado(c,x0,x1,y){ /* fachada de casa ao fundo + beiral de telhas de onde as telhas escorregam */
  c.save(); c.fillStyle='rgba(254,243,199,.85)'; c.fillRect(x0+10,y+6,x1-x0-20,450-y-6); c.strokeStyle='rgba(120,53,15,.35)'; c.lineWidth=3; c.strokeRect(x0+10,y+6,x1-x0-20,450-y-6);
  c.fillStyle='#bae6fd'; rr(c,(x0+x1)/2-22,y+60,44,40,4); c.fill(); c.strokeStyle='#78350f'; c.lineWidth=3; rr(c,(x0+x1)/2-22,y+60,44,40,4); c.stroke(); c.beginPath(); c.moveTo((x0+x1)/2,y+60); c.lineTo((x0+x1)/2,y+100); c.stroke();
  c.fillStyle='#7c2d12'; c.beginPath(); c.moveTo(x0-10,y+8); c.lineTo((x0+x1)/2,y-70); c.lineTo(x1+10,y+8); c.closePath(); c.fill();
  c.fillStyle='#c2410c'; for(var x=x0-6;x<x1+6;x+=18){ rr(c,x,y-2,16,12,3); c.fill(); } c.restore(); }
function galho(c,x0,x1,y,t,cipo){ c.save(); c.strokeStyle='#5b3a1e'; c.lineWidth=cipo?10:12; c.lineCap='round'; c.beginPath(); c.moveTo(x0,y-6); c.quadraticCurveTo((x0+x1)/2,y+4,x1,y-4); c.stroke();
  c.strokeStyle='#5b3a1e'; c.lineWidth=16; c.beginPath(); c.moveTo(x0,y-6); c.lineTo(x0-40,y-60); c.stroke();
  c.fillStyle='#166534'; for(var x=x0;x<x1;x+=26){ circ(c,x,y-16+Math.sin(x)*4,16); c.fill(); } c.fillStyle='#22c55e'; for(var x2=x0+12;x2<x1;x2+=34){ circ(c,x2,y-22,10); c.fill(); }
  if(!cipo){ c.fillStyle='#92400e'; for(var x3=x0+20;x3<x1;x3+=48){ el(c,x3,y+8,5,6); c.fill(); } } c.restore(); }
function torneira(c,x,y){ c.save(); c.fillStyle='#a7f3d0'; rr(c,x-46,y-74,92,46,6); c.fill(); c.strokeStyle='#6ee7b7'; c.lineWidth=3; rr(c,x-46,y-74,92,46,6); c.stroke(); c.fillStyle='#fbbf24'; circ(c,x+30,y-50,3); c.fill();
  c.fillStyle=lin(c,0,y-30,0,y,'#e5e7eb','#94a3b8'); rr(c,x-6,y-30,12,22,3); c.fill(); rr(c,x-14,y-14,28,10,4); c.fill(); c.fillStyle='#64748b'; rr(c,x-4,y-6,8,8,2); c.fill(); c.fillStyle='#ef4444'; circ(c,x,y-34,5); c.fill(); c.restore(); }
function pilhaToras(c,x,y,tr){ c.save(); c.translate(x+30,y); var tora=function(dx,dy){ c.fillStyle='#92400e'; rr(c,dx-26,dy-18,52,18,8); c.fill(); c.fillStyle='#d97706'; circ(c,dx-24,dy-9,9); c.fill(); c.strokeStyle='#78350f'; c.lineWidth=1.5; circ(c,dx-24,dy-9,5); c.stroke(); };
  tora(0,0); tora(40,0); tora(20,-18); c.translate(tr,0); tora(10,-36); c.restore(); }
function portaoBarris(c,x,y,tr){ c.save(); c.translate(x-14,y); /* o arco fica em cima de onde o barril nasce */ c.fillStyle='#57534e'; rr(c,-30,-150,90,150,6); c.fill(); c.fillStyle='#292524'; c.beginPath(); c.moveTo(-18,0); c.lineTo(-18,-90); c.quadraticCurveTo(14,-128,46,-90); c.lineTo(46,0); c.closePath(); c.fill();
  var barril=function(dx,dy){ c.fillStyle=lin(c,dx-14,dy-30,dx+14,dy,'#b45309','#78350f'); rr(c,dx-14,dy-30,28,30,6); c.fill(); c.strokeStyle='#451a03'; c.lineWidth=2.5; c.beginPath(); c.moveTo(dx-14,dy-22); c.lineTo(dx+14,dy-22); c.moveTo(dx-14,dy-8); c.lineTo(dx+14,dy-8); c.stroke(); };
  barril(-2,0); barril(28,0); c.save(); c.translate(tr,0); barril(13,-30); c.restore(); c.restore(); }
function maquina(c,g,t){ /* máquina de bolas de futebol: funil cheio, luz que fica vermelha antes de chutar */
  c.save(); c.translate(g.x,g.y+22); var tr=g.aviso>0?Math.sin(t*14)*1.5:0; c.translate(tr,0);
  c.fillStyle=g.desligado?'#9ca3af':'#facc15'; rr(c,-26,-50,52,50,8); c.fill(); c.strokeStyle='#a16207'; c.lineWidth=3; rr(c,-26,-50,52,50,8); c.stroke();
  c.fillStyle='#374151'; circ(c,-26,-20,13); c.fill(); c.fillStyle='#111'; circ(c,-28,-20,9); c.fill();
  c.fillStyle='rgba(203,213,225,.85)'; c.beginPath(); c.moveTo(-22,-50); c.lineTo(-34,-86); c.lineTo(34,-86); c.lineTo(22,-50); c.closePath(); c.fill();
  if(!g.desligado){ desBola(c,-12,-66,9,0); desBola(c,8,-68,9,1); desBola(c,-2,-80,8,2); }
  c.fillStyle=g.desligado?'#4b5563':(g.aviso>0?'#ef4444':'#22c55e'); circ(c,12,-30,6); c.fill();
  if(g.desligado){ c.fillStyle='rgba(148,163,184,.6)'; for(var k=0;k<3;k++){ var f=(t*.7+k/3)%1; circ(c,0+k*6,-90-f*40,6+f*8); c.fill(); } }
  c.restore(); }
function luz(c,x,y,cena,t){ c.save(); c.strokeStyle='#44403c'; c.lineWidth=2; c.beginPath(); c.moveTo(x,cena==='biscoito'?0:y-60); c.lineTo(x,y); c.stroke();
  if(cena==='bosque'){ galho(c,x-60,x+40,y-60,t,true); c.fillStyle='#1c1917'; rr(c,x-12,y,24,30,4); c.fill(); c.fillStyle='rgba(253,224,71,.85)'; rr(c,x-8,y+4,16,22,3); c.fill(); }
  else { c.fillStyle='#0f766e'; c.beginPath(); c.moveTo(x-30,y+26); c.lineTo(x-10,y); c.lineTo(x+10,y); c.lineTo(x+30,y+26); c.closePath(); c.fill(); c.fillStyle='#fef9c3'; el(c,x,y+28,14,6); c.fill(); }
  var g=c.createRadialGradient(x,y+20,4,x,y+20,110); g.addColorStop(0,'rgba(254,249,195,.35)'); g.addColorStop(1,'rgba(254,249,195,0)'); c.fillStyle=g; circ(c,x,y+20,110); c.fill(); c.restore(); }
function nuvemSopra(c,x,y,t){ c.save(); var inf=1+Math.sin(t*5)*.05; c.translate(x,y); c.scale(inf,1/inf); c.fillStyle='#f1f5f9'; circ(c,-30,0,24); c.fill(); circ(c,0,-10,30); c.fill(); circ(c,30,0,24); c.fill(); rr(c,-50,0,100,22,11); c.fill();
  c.fillStyle='#475569'; circ(c,-10,-4,3.5); c.fill(); circ(c,10,-4,3.5); c.fill(); c.fillStyle='#fda4af'; circ(c,-20,6,6); c.fill(); circ(c,20,6,6); c.fill(); c.fillStyle='#475569'; el(c,0,12,5,6); c.fill(); c.restore(); }
function escorredor(c,x,y){ c.save(); c.translate(x,y); c.strokeStyle='#94a3b8'; c.lineWidth=3; c.beginPath(); c.moveTo(-28,0); c.lineTo(-28,-50); c.moveTo(28,0); c.lineTo(28,-50); c.moveTo(-30,-8); c.lineTo(30,-8); c.stroke();
  for(var i=0;i<5;i++){ c.fillStyle='#f8fafc'; el(c,-18+i*9,-30,4,20); c.fill(); c.strokeStyle='#cbd5e1'; c.lineWidth=1.5; el(c,-18+i*9,-30,4,20); c.stroke(); } c.restore(); }

/* ---------- a roda da história (reino 8): os elos do livro em círculo; cada objeto pego acende o seu ---------- */
var ELOS=['cookie','milk','straw','napkin','mirror','scissors','broom','tape','fim'];
function desenhaTela(c,t){
  if(fase()!==8||!J.nivel||J.quiz) return; var tem=J.historia||[], x0=W/2-ELOS.length*17, y=72;
  c.save(); c.fillStyle='rgba(13,11,30,.55)'; rr(c,x0-12,y-18,ELOS.length*34+24,36,18); c.fill();
  ELOS.forEach(function(e,i){ var x=x0+i*34+17, on=tem.indexOf(e)>=0; c.save(); c.globalAlpha=on?1:.35; c.fillStyle=on?'#fef3c7':'rgba(255,255,255,.25)'; circ(c,x,y,14); c.fill(); c.translate(x,y); miniElo(c,e); c.restore();
    if(i<ELOS.length-1){ c.fillStyle='rgba(253,230,138,.7)'; c.beginPath(); c.moveTo(x+16,y-3); c.lineTo(x+20,y); c.lineTo(x+16,y+3); c.fill(); } });
  var f=J.faixaHist; if(f&&f.t<3.2){ var a=Math.min(1,f.t*5,(3.2-f.t)*3); c.globalAlpha=a; c.font='900 17px "Nunito",Arial'; var tw=c.measureText(f.en).width+28; c.fillStyle='rgba(255,251,235,.96)'; rr(c,W/2-tw/2,y+24,tw,J.tr?46:30,15); c.fill(); c.fillStyle='#78350f'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(f.en,W/2,y+39); if(J.tr){ c.font='700 13px "Nunito",Arial'; c.fillStyle='#a16207'; c.fillText(f.pt,W/2,y+59); } }
  c.restore(); }
function miniElo(c,e){ c.scale(.55,.55);
  if(e==='cookie'||e==='fim') A.biscoito(c,0,0,14,0);
  else if(e==='milk'){ c.fillStyle='#fff'; c.beginPath(); c.moveTo(-9,-12); c.lineTo(9,-12); c.lineTo(7,14); c.lineTo(-7,14); c.closePath(); c.fill(); c.strokeStyle='#94a3b8'; c.lineWidth=2; c.stroke(); }
  else if(e==='straw') canudo(c,0,0,1);
  else if(e==='napkin') guardanapoIco(c);
  else if(e==='mirror'){ c.fillStyle='#d97706'; el(c,0,-3,11,13); c.fill(); c.fillStyle='#bae6fd'; el(c,0,-3,8,10); c.fill(); c.fillStyle='#b45309'; c.fillRect(-2,8,4,10); }
  else if(e==='scissors'){ c.strokeStyle='#64748b'; c.lineWidth=3.5; c.beginPath(); c.moveTo(-3,4); c.lineTo(9,-14); c.moveTo(3,4); c.lineTo(-9,-14); c.stroke(); c.strokeStyle='#ef4444'; circ(c,-6,10,5); c.stroke(); circ(c,6,10,5); c.stroke(); }
  else if(e==='broom') vassoura(c,0,16,.42);
  else if(e==='tape'){ c.fillStyle='#d6d3d1'; circ(c,0,0,12); c.fill(); c.fillStyle='#78716c'; circ(c,0,0,6); c.fill(); } }
/* ---------- frente: o Chef e os pratos ---------- */
function desenhaFrente(c,t){
  var M=J.mundo; if(!M) return;
  (M.chefs||[]).forEach(function(ch){ if(ch.desligado){ if(ch.t<1.2){ c.save(); c.globalAlpha=1-ch.t/1.2; chef(c,ch,t); c.restore(); } return; } chef(c,ch,t); });
  (J.pratos||[]).forEach(function(p){ if(p.quebrou) return; c.save(); c.translate(p.x,p.y); c.rotate(p.fase==='voo'?p.rot:0); c.scale(1,p.fase==='voo'?1:.5+.5*Math.abs(Math.cos(p.rot)));
    c.fillStyle='#f8fafc'; el(c,0,0,p.r,p.r*.45); c.fill(); c.strokeStyle='#60a5fa'; c.lineWidth=2.5; el(c,0,0,p.r,p.r*.45); c.stroke(); c.strokeStyle='#bfdbfe'; c.lineWidth=1.5; el(c,0,0,p.r*.6,p.r*.25); c.stroke(); c.restore(); });
}
function chef(c,ch,t){ /* mancha de tinta de avental e chapéu de cozinheiro, emburrada; ERGUE o prato antes de jogar */
  c.save(); c.translate(ch.x,ch.y); c.scale(ch.dir||-1,1); var er=ch.estado==='ergue', bob=Math.sin(t*4)*2;
  c.fillStyle='rgba(0,0,0,.2)'; el(c,0,2,26,6); c.fill();
  var g=c.createRadialGradient(-6,-44,4,0,-34,40); g.addColorStop(0,'#6366f1'); g.addColorStop(1,'#1e1b4b'); c.fillStyle=g; c.beginPath(); c.moveTo(-26,0); c.quadraticCurveTo(-32,-50,0,-62+bob); c.quadraticCurveTo(32,-50,26,0); c.closePath(); c.fill();
  c.fillStyle='#fff'; c.beginPath(); c.moveTo(-16,-4); c.lineTo(-14,-36); c.lineTo(14,-36); c.lineTo(16,-4); c.closePath(); c.fill();
  c.fillStyle='#fff'; rr(c,-16,-80+bob,32,16,4); c.fill(); circ(c,-10,-84+bob,10); c.fill(); circ(c,0,-90+bob,11); c.fill(); circ(c,10,-84+bob,10); c.fill();
  c.fillStyle='#fff'; el(c,-6,-46,5,6); c.fill(); el(c,8,-46,5,6); c.fill(); c.fillStyle='#111'; circ(c,-4,-45,2.5); c.fill(); circ(c,10,-45,2.5); c.fill();
  c.strokeStyle='#c7d2fe'; c.lineWidth=3; c.beginPath(); c.moveTo(-12,-55); c.lineTo(-2,-51); c.moveTo(14,-55); c.lineTo(4,-51); c.stroke();
  c.strokeStyle='#312e81'; c.lineWidth=6; c.beginPath(); if(er){ c.moveTo(-20,-30); c.lineTo(-14,-96); c.moveTo(20,-30); c.lineTo(6,-96); } else { c.moveTo(-22,-28); c.lineTo(-30,-10); c.moveTo(22,-28); c.lineTo(30,-10); } c.stroke();
  if(er){ c.fillStyle='#f8fafc'; el(c,-4,-100,16,7); c.fill(); c.strokeStyle='#60a5fa'; c.lineWidth=2.5; el(c,-4,-100,16,7); c.stroke(); c.restore(); c.save(); c.fillStyle='#fde047'; c.strokeStyle='#78350f'; c.lineWidth=3; c.font='900 28px "Nunito",Arial'; c.textAlign='center'; c.strokeText('!',ch.x,ch.y-124); c.fillText('!',ch.x,ch.y-124); }
  c.restore(); }

/* ---------- molas com cara do reino: torradeira (cozinha), feno (vila), irrigador (estádio) ---------- */
function mola(c,m,t,cena){
  var k=m.t>0?.6:1; c.save(); c.translate(m.x+m.w/2,m.y+m.h);
  if(cena==='biscoito'){ c.fillStyle=lin(c,0,-40,0,0,'#e5e7eb','#94a3b8'); rr(c,-24,-38,48,38,9); c.fill(); c.fillStyle='#334155'; rr(c,-16,-40,12,5,2); c.fill(); rr(c,4,-40,12,5,2); c.fill(); c.fillStyle='#111'; rr(c,24,-28,6,12,2); c.fill();
    var sob=m.t>0?-34:0; c.fillStyle='#d97706'; rr(c,-15,-44+sob,10,12,3); c.fill(); rr(c,5,-44+sob,10,12,3); c.fill(); c.restore(); return true; }
  if(cena==='vila'){ c.fillStyle='#eab308'; rr(c,-22,-30*k,44,30*k,10); c.fill(); c.strokeStyle='#a16207'; c.lineWidth=2; for(var i=-18;i<20;i+=6){ c.beginPath(); c.moveTo(i,-2); c.lineTo(i+3,-28*k); c.stroke(); } c.restore(); return true; }
  if(cena==='estadio'){ c.fillStyle='#4b5563'; rr(c,-6,-16,12,16,3); c.fill(); c.fillStyle='#22c55e'; rr(c,-18,-20*k,36,8,4); c.fill(); if(m.t>0){ c.strokeStyle='rgba(125,211,252,.9)'; c.lineWidth=3; for(var j=-2;j<=2;j++){ c.beginPath(); c.moveTo(0,-22); c.quadraticCurveTo(j*18,-70,j*30,-40); c.stroke(); } } c.restore(); return true; }
  c.restore(); return false;
}
/* bicho voador com pele do reino: mariposa (floresta), mosca (cozinha) */
function inimigo(c,e,t){
  var cena=J.mundo&&J.mundo.cena; if(e.tipo!=='corvo'||(cena!=='bosque'&&cena!=='biscoito')) return false;
  c.save(); c.translate(e.x,e.y-20); c.scale(e.dir||-1,1); var bat=Math.abs(Math.sin(t*(cena==='biscoito'?30:10)));
  if(cena==='bosque'){ c.fillStyle='#4338ca'; c.save(); c.scale(1,.4+bat*.6); el(c,-10,-10,14,16); c.fill(); el(c,10,-10,14,16); c.fill(); c.restore(); c.fillStyle='#a5b4fc'; circ(c,-10,-12,4); c.fill(); circ(c,10,-12,4); c.fill(); c.fillStyle='#1e1b4b'; el(c,0,0,5,13); c.fill(); c.strokeStyle='#1e1b4b'; c.lineWidth=1.5; c.beginPath(); c.moveTo(2,-12); c.lineTo(8,-22); c.moveTo(-2,-12); c.lineTo(-6,-22); c.stroke(); }
  else { c.fillStyle='rgba(203,213,225,.7)'; c.save(); c.scale(1,.3+bat*.7); el(c,-6,-12,10,7); c.fill(); el(c,6,-12,10,7); c.fill(); c.restore(); c.fillStyle='#1e1b4b'; el(c,0,0,11,8); c.fill(); c.fillStyle='#ef4444'; circ(c,8,-3,4); c.fill(); c.strokeStyle='#1e1b4b'; c.lineWidth=1.5; for(var i=-1;i<=1;i++){ c.beginPath(); c.moveTo(i*4,6); c.lineTo(i*6,12); c.stroke(); } }
  c.restore(); return true; }

/* explicaçãozinha do poder (passar o mouse ou tocar na pílula/no botão) */
var DICA_PODER={1:['Tênis saltador: pule e aperte PULAR de novo no ar para um superpulo.','Tênis saltador: pule e aperte PULAR de novo no ar para um superpulo.'],
  2:['Pantufas saltadoras: pule e aperte PULAR de novo no ar. Suba até o sótão!','Pantufas saltadoras: pule e aperte PULAR de novo no ar. Suba até o sótão!'],
  4:['Pangaré: segure PULAR para saltar longe. Aperte ESPAÇO para ele relinchar e espantar as traças.','Pangaré: segure PULAR para saltar longe. Aperte ESPAÇO para ele relinchar e espantar as traças.'],
  5:['Roupa de mergulho: toque PULAR para nadar para cima. Aperte ESPAÇO para soprar bolhas.','Roupa de mergulho: toque PULAR para nadar para cima. Aperte ESPAÇO para soprar bolhas.'],
  7:['Bolas de futebol: aperte ESPAÇO para chutar uma bola nas traças e na máquina.','Bolas de futebol: aperte ESPAÇO para chutar uma bola nas traças e na máquina.'],
  8:['Biscoitos: aperte ESPAÇO para jogar um biscoito. As traças viram borboletas!','Biscoitos: aperte ESPAÇO para jogar um biscoito. As traças viram borboletas!']};
function dicaPoder(){ var d=DICA_PODER[fase()]; return d?{en:d[0],pt:d[1]}:null; }
return {peloQuiz:peloQuiz, dicaPoder:dicaPoder, solidos:solidos, desenhaPorteiras:desenhaPorteiras, desenhaTela:desenhaTela, TAB:TAB, poder:poder, pega:pega, interage:interage, toca:toca, dica:dica, alvo:alvo, atira:atira, moveTiro:moveTiro, acertaExtra:acertaExtra, atualiza:atualiza, reinicia:reinicia, segundoPulo:segundoPulo,
  desenhaItem:desenhaItem, plataforma:plataforma, ninho:ninho, antesHeroi:antesHeroi, depoisHeroi:depoisHeroi, desenhaTiro:desenhaTiro, desenhaRolante:desenhaRolante, desenhaFundo:desenhaFundo, desenhaFrente:desenhaFrente, mola:mola, inimigo:inimigo, icone:icone, hudPoder:hudPoder, tiroAtual:tiroAtual, cartao:cartao};
})();
