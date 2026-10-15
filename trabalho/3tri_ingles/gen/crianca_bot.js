/* ============================================================
   crianca_bot.js — a CRIANÇA DE 8 ANOS que testa o jogo (QA acelerado).
   18/10 (Paulo: "o teste é a criança sair andando e apertando os
   botões até o final, com imprecisões; se a fase se vence em 1 min,
   o teste não pode levar 30 min").
   Injetado pelo testa_criancas.py numa página MUDA. Só usa os CONTROLES
   (J.in.*, teclas do quiz, clique no botão do cartão) — o estado é lido
   só para "enxergar" a tela, como a criança vê. O jogo roda no relógio
   de teste (JOGO.passoFixo): 1 minuto de jogo em ~2 s.
   Imprecisão: atraso de reação, pulo cedo/tarde, segurar o pulo por um
   tempo aleatório, errar ~30% das perguntas, às vezes não usar o poder.
   ============================================================ */
window.CRIANCA = (function(){
  var I=window.__ing3, J=I.J, G=I.JOGO, T=45, DT=1/60;
  var s=1, op, st;
  function rnd(){ s=(s*16807)%2147483647; return (s-1)/2147483646; }
  function inicia(o){ op=o||{}; s=op.seed||7; st={t:0,pulo:0,reacao:0,baixo:0,ultX:-1,paradoT:0,travou:[],recua:0,acao:0,fim:false,quizT:0,solta:0}; J.teste={quedas:[],danos:[]}; }
  function solidos(){ return G.solidos(J.mundo); }
  function apoio(x,y0,y1){ /* existe chão (sólido ou plataforma) em x, entre as alturas y0..y1? */
    var M=J.mundo, ok=false;
    G.solidos(M).forEach(function(b){ if(!ok&&x>b.x&&x<b.x+b.w&&b.y>=y0&&b.y<=y1) ok=true; });
    if(!ok) G.umaVia(M).forEach(function(p){ if(!ok&&x>p.x&&x<p.x+p.w&&p.y>=y0&&p.y<=y1) ok=true; });
    return ok; }
  function parede(dir){ var u=J.urso, hh=G.URSO_H*G.TAM[u.tam], hw=G.URSO_W*G.TAM[u.tam]/2, x0=u.x+dir*(hw+2), x1=u.x+dir*(hw+38), a=Math.min(x0,x1), b=Math.max(x0,x1), hit=false;
    solidos().forEach(function(r){ if(!hit&&r.x<b&&r.x+r.w>a&&r.y<u.y-6&&r.y+r.h>u.y-hh) hit=true; }); return hit; }
  function bicho(dir){ var u=J.urso, M=J.mundo, perto=null;
    M.inimigos.forEach(function(e){ if(e.morto||e.achatado) return; var dx=(e.x-u.x)*dir; if(dx>20&&dx<130&&Math.abs(e.y-u.y)<90) perto=e; });
    (M.chefinhos||[]).forEach(function(c){ if(!c.vencido){ var dx=(c.x-u.x)*dir; if(dx>20&&dx<170&&Math.abs(c.y-u.y)<120) perto=c; } });
    (M.chefs||[]).forEach(function(c){ if(!c.desligado){ var dx=(c.x-u.x)*dir; if(dx>20&&dx<120) perto=c; } });
    (J.pratos||[]).forEach(function(p){ var dx=(p.x-u.x)*dir; if(dx>0&&dx<110&&Math.abs(p.y-u.y)<60) perto=p; });
    return perto; }
  function pula(seg){ st.pulo=Math.max(st.pulo,seg); }
  /* para onde ir: porta/baú pendente atrás e perto → volta (a criança segue a seta); senão, direita */
  function direcao(){ var u=J.urso, M=J.mundo, dir=1;
    M.moradores.forEach(function(m){ if(!m.feito&&m.x<u.x-50&&u.x-m.x<500) dir=-1; });
    M.itens.forEach(function(it){ if(!it.pego&&(it.tipo==='poder'||it.tipo==='traje'||it.tipo==='capa'||(it.tipo==='historia'&&it.nome==='milk'))&&it.x<u.x-40&&u.x-it.x<500) dir=-1; });
    if(st.recua>0) dir=-1;
    /* no submundo, depois da porta: vai até o cano de saída (a seta aponta para ele) e para em cima */
    if(M!==J.nivel&&!M.moradores.some(function(m){ return !m.feito; })){ var sai=null; M.canos.forEach(function(c){ if(!sai||c.x>sai.x) sai=c; }); if(sai){ var cx=sai.x+sai.w/2; if(Math.abs(u.x-cx)<14&&u.noChao) dir=0; else dir=u.x<cx?1:-1; } }
    return dir; }
  function decideNivel(dt){
    var u=J.urso, M=J.mundo, inp=J.in; if(!u||!M) return;
    if(J.chefe) return decideChefe(dt);
    var dir=direcao(); inp.left=dir<0; inp.right=dir>0; inp.down=false; if(dir===0){ dir=1; if(PERIGOS.canoSob()&&st.baixo<=0){ inp.down=true; J.downSolto=true; st.baixo=.8; } }
    /* entrar em porta/baú, pegar item com ▼, descer no cano (quase sempre: a criança segue a seta) */
    if(J.dica&&J.dica.botao&&st.baixo<=0){ if(rnd()<.9){ inp.down=true; J.downSolto=true; st.baixo=.6; } else st.baixo=1.5; }
    if(!J.dica&&window.PERIGOS&&I.J.nivel.sub&&PERIGOS.canoSob()){ var outro=J.mundo===J.nivel?J.nivel.sub:J.nivel, pend=outro&&outro.moradores.some(function(m){ return !m.feito; }); if((pend||J.mundo!==J.nivel)&&st.baixo<=0){ inp.down=true; J.downSolto=true; st.baixo=.8; } }
    if(st.baixo>0) st.baixo-=dt;
    /* modos: nadar (toca pulo para ficar no meio da água) e voar (segura para manter altura) */
    if(M.modo==='nado'&&u.poderes.traje&&u.y>(M.superficie||0)+60){ st.toque=(st.toque||0)-dt; if((u.y>M.h-4.6*T||parede(dir))&&st.toque<=0){ st.toque=.28; pula(.1); } } /* nadar = TOCAR o pulo (segurar não sobe) */
    else if(M.modo==='voo'&&u.poderes.capa){ var alvoY=5.5*T+Math.sin(st.t*.7)*40; M.moradores.forEach(function(m){ if(!m.feito&&Math.abs(m.x-u.x)<220) alvoY=m.y-10; }); if(M.mastro&&Math.abs(M.mastro.x-u.x)<300) alvoY=M.mastro.y-10; inp.jump=u.y>alvoY||parede(dir);
      (M.tempestades||[]).forEach(function(z){ var cx=z.x+z.w/2, k=((J.t+z.fase)%4.5)/4.5; if(cx-u.x>0&&cx-u.x<120&&k>=.5){ inp.right=false; inp.left=false; } }); } /* desce para a porta como a criança faz; nuvem escura = espera */
    /* cipó/barra: solta depois de um tempinho */
    if(J.agarrado){ st.solta-=dt; if(st.solta<=0){ inp.jump=true; J.jumpSolto=true; st.solta=.5+rnd()*.8; st.pulo=.15; } return; } else st.solta=.4+rnd()*.7;
    /* pular: buraco, parede ou bicho à frente — com atraso de reação e imprecisão */
    if(st.reacao>0){ st.reacao-=dt; if(st.reacao<=0) pula(st.tempoPulo); }
    else if(u.noChao&&!(M.modo==='voo'&&u.poderes.capa)){
      var hw=G.URSO_W*G.TAM[u.tam]/2, olho=u.x+dir*(hw+24+rnd()*18);
      var buraco=!apoio(olho,u.y-4,u.y+70), muro=parede(dir), b=bicho(dir);
      if(buraco||muro||b){ st.reacao=rnd()*.12; st.tempoPulo=muro?.45+rnd()*.15:(buraco?.3+rnd()*.2:.18+rnd()*.25); if(b&&u.poderes.tiro&&rnd()<.7){ st.acao=.1; } }
    }
    if((M.modo==='nado'||M.modo==='voo')&&u.poderes.tiro&&bicho(dir)&&st.acao<=0&&rnd()<.05) st.acao=.05; /* na água/no ar, a criança usa o poder no bicho da frente */
    if(st.acao>0){ st.acao-=dt; if(st.acao<=0&&window.PERIGOS){ PERIGOS.atira(); } }
    if(!(M.modo==='voo'&&u.poderes.capa)){ if(st.pulo>0){ inp.jump=true; st.pulo-=dt; if(st.pulo<=0){ inp.jump=false; } } else inp.jump=false; }
    /* travou? (não anda 3 s): pulo longo, ou recua um pouco e tenta de novo */
    if(Math.abs(u.x-st.ultX)>6){ st.ultX=u.x; st.paradoT=0; } else { st.paradoT+=dt; if(st.paradoT>3){ st.travou.push({x:Math.round(u.x/T),mundo:M.mundo}); st.paradoT=0; if(rnd()<.5){ pula(.5); } else st.recua=.6; } }
    if(st.recua>0) st.recua-=dt;
  }
  /* o chefão: tinteiro que brilha (sobe na prateleira e joga a ★), manchas (pisa), letras (sobe) */
  function decideChefe(dt){
    var u=J.urso, C=J.chefe, inp=J.in; inp.down=false; var alvoX=null;
    if(C.fase==='p1'){ var tq=C.tinteiros[C.alvo]; if(tq){ var naPrat=tq.y<450; alvoX=naPrat?tq.x-50:tq.x-80;
        if(naPrat&&u.y>420){ alvoX=tq.x-110; if(Math.abs(u.x-alvoX)<20&&u.noChao) pula(.5); }
        if(Math.abs(u.x-alvoX)<22&&(!naPrat||u.y<420)){ inp.left=false; inp.right=false; u.dir=1; if(st.acao<=0){ st.acao=.5; PERIGOS.atira(); } } } }
    else if(C.fase==='p2'){ var e=null; J.mundo.inimigos.forEach(function(x){ if(x.doConde&&!x.morto&&!x.achatado&&(!e||Math.abs(x.x-u.x)<Math.abs(e.x-u.x))) e=x; }); if(e){ alvoX=e.x; if(Math.abs(e.x-u.x)<90&&u.noChao) pula(.3); } }
    else if(C.fase==='p3'){ alvoX=19*T; if(u.noChao&&(parede(1)||rnd()<.02)) pula(.5); }
    if(alvoX!==null&&!(inp.left===false&&inp.right===false&&Math.abs(u.x-alvoX)<22)){ inp.right=u.x<alvoX-12; inp.left=u.x>alvoX+12; }
    if(st.acao>0) st.acao-=dt;
    if(st.pulo>0){ inp.jump=true; st.pulo-=dt; } else inp.jump=false;
  }
  /* corrida: troca de faixa para desviar, pega moedas, usa o turbo quando tem */
  function decideCorrida(dt){ var R=CORRIDA._R(), inp=J.in; if(!R) return; st.corr={pos:R.final||R.pos,pag:R.paginas,fase:R.fase};
    if(R.fase==='apresenta'){ if(R.t>1.5+rnd()) CORRIDA.largar(); return; }
    if(R.fase==='podio'){ if(R.podio&&R.podio.t>1) CORRIDA.toque(800,500); return; }
    var me=R.me, alvo=[-.55,0,.55].reduce(function(a,b){ return Math.abs(b-me.x)<Math.abs(a-me.x)?b:a; }), frente=null; /* fica na faixa em que está (toque curto), não segura a seta para sempre */ R.rivais.forEach(function(o){ var dz=o.z-me.z; if(dz>0&&dz<200*10&&Math.abs(o.x-me.x)<.5) frente=o; });
    if(frente) alvo=frente.x>0?-.55:.55; if(st.t%7<.02) st.ruido=(rnd()-.5)*.3; alvo+=st.ruido||0;
    inp.right=alvo>me.x+.1; inp.left=alvo<me.x-.1;
    var nS=Math.floor(me.z/200); CORRIDA._K.PITS().forEach(function(P,i){ if(!me.pitFeito[i]&&nS>P.ini-45&&nS<P.ini+6){ inp.right=true; inp.left=false; } }); /* a placa do box: a criança segue para a direita */
    if(R.latas>0&&rnd()<.01){ inp.jump=true; J.actSolto=true; } else inp.jump=false; }
  function decideQuiz(dt){ var q=J.quiz; if(!q) return; if(q.fase==='pergunta'){ st.quizT+=dt; if(st.quizT>1+rnd()*1.5){ st.quizT=0; I.responde(rnd()<(op.acerto||.7)); } }
    else if(q.fase==='resposta'){ st.quizT+=dt; if(st.quizT>1.5+rnd()){ st.quizT=0; QUIZ.segue(); } } } /* lê o comentário e toca no Next */
  function passo(n){
    for(var i=0;i<n;i++){
      if(st.fim) return st;
      st.t+=DT;
      if(I.menuAberto()){ if(J.estado==='fimFase'||(J.fimFase)){ st.fim=true; st.tempo=+st.t.toFixed(1); return st; } I.clicaPri(); continue; }
      if(J.estado==='fimFase'||J.estado==='final'||J.estado==='mapa'){ st.fim=true; st.tempo=+st.t.toFixed(1); return st; }
      if(J.estado==='chefeIntro'){ if(window.CHEFAO) CHEFAO.avancaIntro(); }
      else if(J.estado==='quiz') decideQuiz(DT);
      else if(J.estado==='corrida') decideCorrida(DT);
      else if(J.estado==='nivel') decideNivel(DT);
      G.passoFixo(DT,1);
      if(st.t>op.limite){ st.fim=true; st.tempo=+st.t.toFixed(1); st.esgotou=true; return st; }
    }
    return st; }
  function relatorio(){ var u=J.urso||{}; return {fim:st.fim, esgotou:!!st.esgotou, tempo:st.tempo||+st.t.toFixed(1), quedas:J.teste.quedas, danos:J.teste.danos.length, travou:st.travou.slice(0,8), x:Math.round((u.x||0)/T), estado:J.estado, paginas:J.nivel&&J.nivel.todasEntradas?J.nivel.todasEntradas.filter(function(m){ return m.feito; }).length:null, chefe:J.chefe?J.chefe.fase:null, corrida:st.corr||null}; }
  return {inicia:inicia, passo:passo, relatorio:relatorio};
})();
