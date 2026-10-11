/* ============================================================
   LP3_jornada_ui.js — camada DOM (parte 1): HUD, quadro da pergunta
   da arena (cronômetro, peixes, cartões A/B/C, dica, ouvir), painéis
   de fim de arena e de fim de fase, créditos, pausa, confirmações.
   Parte 2 (LP3_jornada_ui2.js): customização, botões do mapa,
   teclado e toque. Voz só pela Thalita (OP_voz.js → say()).
   ============================================================ */
window.UI = (function(){
'use strict';
var $=function(id){ return document.getElementById(id); };
var qAberta=null, menuAberto=null, toastT=null;
var SVG={
  casa:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" fill="currentColor"/></svg>',
  nota:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v11.5a2.5 2.5 0 1 1-2-2.45V7.3L11 8.5v10a2.5 2.5 0 1 1-2-2.45z" fill="currentColor"/></svg>',
  fx:'<svg viewBox="0 0 24 24"><path d="M4 10v4h3l4 4V6L7 10zM15 9a4 4 0 0 1 0 6m2.5-9a7.5 7.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 10v4h3l4 4V6L7 10z" fill="currentColor"/></svg>',
  voz:'<svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V6a3 3 0 0 1 3-3zm-6 9a6 6 0 0 0 12 0m-6 6v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  pausa:'<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1.5" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1.5" fill="currentColor"/></svg>',
  moeda:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#fbbf24" stroke="#b45309" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="#b45309" stroke-width="1.5"/></svg>',
  estrela:'<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="#fde047" stroke="#b45309" stroke-width="1.2"/></svg>',
  caixa:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="#fde68a" stroke="#92400e" stroke-width="2"/><text x="12" y="17" text-anchor="middle" font-size="13" font-weight="900" fill="#78350f">?</text></svg>',
  dica:'<svg viewBox="0 0 24 24"><path d="M9 21h6m-5-3h4m-2-15a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2.5h-6c0-1.3-.3-1.9-1-2.5A6 6 0 0 1 12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ouvir:'<svg viewBox="0 0 24 24"><path d="M4 10v4h3l4 4V6L7 10z" fill="currentColor"/><path d="M15 9a4 4 0 0 1 0 6m2.5-9a7.5 7.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  cadeado:'<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="3" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="15.5" r="1.6" fill="#0d0b1e"/></svg>',
  ajuda:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.3 9.5a2.7 2.7 0 1 1 3.9 2.4c-.8.4-1.2 1-1.2 1.9v.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.3" r="1.2" fill="currentColor"/></svg>',
  peixe:'<svg viewBox="0 0 24 24"><path d="M3 12c3-5 8-6 12-3 2 1.5 3 2 3 3s-1 1.5-3 3c-4 3-9 2-12-3zm15 0-3-4 1 4-1 4z" fill="#fb923c"/><circle cx="8" cy="11" r="1.2" fill="#111"/></svg>'
};
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function embaralha(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

/* ---------- HUD ---------- */
function hud(nome,pontos,moedas,feitas,tot,mostrarArenas){ $('hudName').textContent=nome; $('hudPts').textContent=pontos; $('hudCoinN').textContent=moedas; $('hudArenaN').textContent=feitas+'/'+tot; $('hudArena').style.display=mostrarArenas?'flex':'none'; }
function toast(txt,dur){ var t=$('toast'); t.textContent=txt; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){ t.classList.remove('show'); },dur||2200); }
function pintaBotoes(){ var b=$('btnLock'); if(b) b.classList.toggle('on',!!window.screenLocked); }
function modoNivel(on){ $('touch').style.display=on?'block':'none'; }
function modoMapa(on){ var b=$('mapBtns'); if(b) b.style.display=on?'flex':'none'; }
function hudArena(on){ $('hud').classList.toggle('arena',!!on); }
function acao(on){ $('tAct').classList.toggle('show',!!on); }

/* ---------- quadro da pergunta (arena e duelo do chefão) ---------- */
function perguntaArena(item,opts,aoResponder,aoContinuar){
  var tema=LP3.TEMAS[item.tema]||{nome:item.tema,cor:'#60a5fa'};
  var ordem=embaralha(item.o.map(function(_,i){ return i; })), certa=ordem.indexOf(item.c), letras='ABCD';
  var card=$('qcard'); card.style.setProperty('--tc',tema.cor);
  var h='<div class="qtimer"><div class="qtbar" id="qTbar"></div><span class="qtseg" id="qTseg">'+opts.lim+'</span></div>';
  h+='<div class="qtop"><span class="qtema">'+esc(tema.nome)+'</span><span class="qseq">'+(opts.chefao?'Duelo ':'Pergunta ')+opts.i+' de '+opts.n+'</span><span class="qpeixes" title="Peixes">'+SVG.peixe+'<b>'+opts.peixes+'</b><i>/ meta '+opts.meta+'</i></span><button class="qvoz" id="qVoz" aria-label="Ouvir a pergunta">'+SVG.ouvir+'</button></div>';
  h+='<div class="qp" id="qP">'+esc(item.p)+'</div>';
  h+='<div class="qops n'+ordem.length+'" id="qOps">';
  ordem.forEach(function(oi,k){ h+='<button class="qop" data-k="'+k+'"><span class="n">'+letras[k]+'</span><span class="tx">'+esc(item.o[oi])+'</span></button>'; });
  h+='</div><div class="qfoot"><button class="qdica" id="qDica">'+SVG.dica+' Dica</button><div class="qdicaTxt" id="qDicaTxt">'+esc(item.dica||'')+'</div><div class="qex" id="qEx"></div><button class="qgo" id="qGo">OK</button></div>';
  card.innerHTML=h; card.classList.remove('shake'); $('qbox').classList.add('show');
  var ops=[].slice.call(card.querySelectorAll('.qop')), sel=-1, respondido=false;
  function marca(i){ sel=i; ops.forEach(function(b,k){ b.classList.toggle('sel',k===i); }); }
  function responde(i){
    if(respondido) return; respondido=true; var ok=i===certa;
    ops.forEach(function(b,k){ b.disabled=true; if(k===certa) b.classList.add('ok'); else if(k===i) b.classList.add('err'); else b.classList.add('dim'); b.classList.remove('sel'); });
    $('qDica').style.display='none'; $('qDicaTxt').classList.remove('show');
    var ex=$('qEx'); ex.textContent=(ok?'Isso! ':(i<0?'Tempo esgotado! A certa é "'+item.o[item.c]+'". ':'A certa é "'+item.o[item.c]+'". '))+(ok?'':(item.ex||'')); ex.className='qex show '+(ok?'okc':'errc');
    if(!ok){ $('qGo').classList.add('show'); card.classList.add('shake'); }
    aoResponder(ok);
  }
  ops.forEach(function(b,k){ b.addEventListener('click',function(){ SOM.init(); if(!respondido){ marca(k); responde(k); } }); });
  $('qVoz').addEventListener('click',function(){ try{ say(item.p+'. '+ordem.map(function(oi,k){ return 'Opção '+letras[k]+': '+item.o[oi]; }).join('. ')); }catch(e){} });
  $('qDica').addEventListener('click',function(){ SOM.fx('clique'); $('qDicaTxt').classList.toggle('show'); try{ if($('qDicaTxt').classList.contains('show')) say(item.dica||''); }catch(e){} });
  $('qGo').addEventListener('click',function(){ aoContinuar(); });
  qAberta={
    tecla:function(k){
      if(k==='Escape') return;
      if(respondido){ if((k==='Enter'||k===' ')&&!menuAberto) aoContinuar(); return; }
      var n=parseInt(k,10); if(n>=1&&n<=ops.length){ marca(n-1); responde(n-1); return; }
      var L=k.toUpperCase(); var li=letras.indexOf(L); if(li>=0&&li<ops.length&&k.length===1){ marca(li); responde(li); return; }
      if(k==='ArrowRight'||k==='ArrowDown'){ marca((sel+1)%ops.length); SOM.fx('clique'); }
      if(k==='ArrowLeft'||k==='ArrowUp'){ marca((sel-1+ops.length)%ops.length); SOM.fx('clique'); }
      if((k==='Enter'||k===' ')&&sel>=0) responde(sel);
    },
    responderIdx:function(i){ marca(i); responde(i); }, certa:function(){ return certa; }, esgotou:function(){ responde(-1); }, respondido:function(){ return respondido; }
  };
}
function timer(frac,seg){ var b=$('qTbar'), s=$('qTseg'); if(!b) return; b.style.width=(frac*100)+'%'; b.classList.toggle('urgente',frac<.3); if(s) s.textContent=seg; }
function esgotou(){ if(qAberta&&!qAberta.respondido()) qAberta.esgotou(); }
function forcaErro(){ /* o duelo usa esgotou(); mantido por compatibilidade */ }
function fechaPergunta(){ $('qbox').classList.remove('show'); qAberta=null; try{ speechSynthesis.cancel(); }catch(e){} }

/* ---------- menus genéricos ---------- */
function menu(html,acoes,classe){
  var m=$('mcard'); m.innerHTML=html; m.className='mcard '+(classe||''); $('menu').classList.add('show'); menuAberto={acoes:acoes||{}};
  Object.keys(acoes||{}).forEach(function(id){ var b=$(id); if(b) b.addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); acoes[id](); }); });
}
function fechaMenu(){ $('menu').classList.remove('show'); menuAberto=null; }
function estrelasHtml(n){ var s='<div class="mstars">'; for(var i=0;i<3;i++) s+='<span class="'+(i<n?'on':'')+'" style="animation-delay:'+(i*.25)+'s">'+SVG.estrela+'</span>'; return s+'</div>'; }
function peixesHtml(n,tot){ var s='<div class="mfish">'; for(var i=0;i<tot;i++) s+='<span class="'+(i<n?'on':'')+'">'+SVG.peixe+'</span>'; return s+'</div>'; }

function fimArena(ok,acertos,n,meta,pontos,faltam,cb){
  var h='<h2>'+(ok?'Arena vencida!':'Quase lá!')+'</h2>'+peixesHtml(acertos,n);
  h+='<p><b>'+acertos+' de '+n+'</b> peixes · meta '+meta+(ok?' · <b>+'+pontos+' pontos</b>':'')+'</p>';
  if(ok) h+='<p class="sub">'+(faltam===0?'Todas as arenas desta fase prontas: a saída está liberada!':'Falta'+(faltam>1?'m '+faltam+' arenas':' 1 arena')+' nesta fase.')+'</p>';
  else h+='<p class="sub">Precisa de '+meta+' peixes para sair. Vamos de novo, com outras perguntas!</p>';
  h+='<button class="mbtn pri" id="mOk">'+(ok?'Voltar à fase':'Tentar de novo')+'</button>';
  menu(h,{mOk:function(){ fechaMenu(); cb(); }},'festa');
}
function fimFase(f,estrelas,acertos,total,pontos,moedas){
  var h='<h2>'+esc(f.nome)+'</h2>'+estrelasHtml(estrelas);
  h+='<div class="placar"><div><span>'+SVG.caixa+'</span><b>'+acertos+'/'+total+'</b><i>perguntas certas</i></div><div><span>'+SVG.moeda+'</span><b>'+moedas+'</b><i>moedas</i></div><div><span>'+SVG.estrela+'</span><b>'+pontos+'</b><i>pontos</i></div></div>';
  if(f.treino) h+='<p class="sub">Agora você já sabe jogar. Boa jornada!</p>'; else if(window.REGRAS){ var lr=REGRAS.linhaResumo(f); if(lr) h+='<p class="sub recap">'+REGRAS.marca(lr)+'</p>'; }
  h+='<button class="mbtn pri" id="mMapa">Voltar ao mapa</button>';
  if(!f.treino) h+='<button class="mbtn" id="mDeNovo">Jogar esta fase de novo</button>';
  menu(h,{mMapa:function(){ fechaMenu(); JOGO.voltaMapa(); }, mDeNovo:function(){ fechaMenu(); JOGO.jogarDeNovo(); }},'festa');
}
function creditos(){
  var h='<h2>Jornada completa!</h2><p>Você recuperou a Folha de Bordo Dourada e atravessou o Canadá inteiro, do Pacífico ao Ártico.</p>';
  h+='<div class="lista">'; FASES.LISTA.forEach(function(f){ var p=JOGO.J.prog.fases[f.id]||{}; h+='<div><span>'+esc(f.nome)+'</span><span class="st">'+'★'.repeat(p.estrelas||0)+'</span></div>'; }); h+='</div>';
  h+='<p class="sub">Total: <b>'+JOGO.J.prog.pontos+'</b> pontos</p><button class="mbtn pri" id="mMapa">Voltar ao mapa</button>';
  menu(h,{mMapa:function(){ fechaMenu(); JOGO.irMapa(); }});
}
function pausa(){
  if(menuAberto||qAberta) return; var J2=JOGO.J; if(J2.estado!=='nivel'&&J2.estado!=='arena'&&J2.estado!=='cano') return;
  JOGO.pausa(true);
  var h='<h2>Pausa</h2><button class="mbtn pri" id="mCont">Continuar</button><div class="mrow"><button class="mbtn" id="mSfx">Efeitos: '+(SOM.sfx?'ligados':'desligados')+'</button><button class="mbtn" id="mMus">Música: '+(SOM.mus?'ligada':'desligada')+'</button></div>';
  if(!document.body.classList.contains('sem-voz')) h+='<button class="mbtn" id="mVoz">Voz da Thalita: '+(window.somLigado?'ligada':'desligada')+'</button>';
  h+='<div class="mrow"><button class="mbtn" id="mMapa">Sair para o mapa</button><button class="mbtn" id="mGlobo">Menu inicial</button></div>';
  menu(h,{mCont:function(){ fechaMenu(); JOGO.pausa(false); }, mSfx:function(){ SOM.setSfx(!SOM.sfx); $('mSfx').textContent='Efeitos: '+(SOM.sfx?'ligados':'desligados'); }, mMus:function(){ SOM.setMus(!SOM.mus); $('mMus').textContent='Música: '+(SOM.mus?'ligada':'desligada'); },
    mVoz:function(){ try{ toggleSom(); }catch(e){} $('mVoz').textContent='Voz da Thalita: '+(window.somLigado?'ligada':'desligada'); },
    mMapa:function(){ confirmaSair('mapa'); }, mGlobo:function(){ confirmaSair('globo'); }});
}
function confirmaSair(onde){
  menu('<h2>Sair da fase?</h2><p>O que você já terminou fica salvo. Esta fase recomeça do início na próxima vez.</p><div class="mrow"><button class="mbtn" id="mNao">Ficar</button><button class="mbtn danger" id="mSim">'+(onde==='mapa'?'Ir para o mapa':'Menu inicial')+'</button></div>',
    {mNao:function(){ fechaMenu(); JOGO.pausa(false); }, mSim:function(){ fechaMenu(); JOGO.pausa(false); fechaPergunta(); hudArena(false); if(onde==='mapa') JOGO.irMapa(); else JOGO.irGlobo(); }});
}
function comoJogar(cb){
  var h='<h2>Como jogar</h2><div class="como"><div><b>Andar</b> ← → ou A D · botões ◀ ▶</div><div><b>Pular</b> ↑ W ou ESPAÇO · botão PULAR (segure para pular mais alto)</div><div><b>Cano</b> ↓ ou S em cima do cano · botão ↓</div><div><b>Arremessar pinha</b> X ou ENTER · botão de ação</div><div><b>Arena</b> bata a cabeça na caixa <b>?</b> e responda rápido: cada acerto é um peixe. Bata a meta para sair!</div><div><b>Saída</b> a bandeira só abre com todas as arenas vencidas. Cair ou encostar sendo bebê = volta ao checkpoint.</div><div><b>Mel</b> faz o urso crescer · bicho encosta = encolhe</div></div>';
  h+='<div class="mrow"><button class="mbtn" id="mTreino">Fazer o Treino</button><button class="mbtn pri" id="mOk">Entendi</button></div>';
  menu(h,{mOk:function(){ fechaMenu(); if(cb) cb(); }, mTreino:function(){ fechaMenu(); if(cb) cb(); fechaPergunta(); hudArena(false); JOGO.iniciaTutorial(); }});
}
function historia(){
  var h='<h2>A história</h2><div class="como"><div><b>Era uma vez</b>, no Canadá, a Folha de Bordo Dourada, que brilhava no alto do Ártico.</div><div>Até que <b>o Gigante</b> — o mesmo do pé de feijão — desceu das nuvens e levou a folha para o seu Castelo de Gelo.</div><div>Um <b>urso corajoso</b> vai cruzar o país inteiro, do Pacífico ao Ártico, vencendo arenas de perguntas para pegá-la de volta. Esse urso é você!</div></div><button class="mbtn pri" id="mOk">Vamos!</button>';
  menu(h,{mOk:fechaMenu});
}
function confirmaCasa(){
  if(menuAberto) return; var estava=JOGO.J.pausado; JOGO.pausa(true);
  menu('<h2>Sair do jogo?</h2><p>Seu progresso fica salvo.</p><div class="mrow"><button class="mbtn" id="mNao">Ficar</button><button class="mbtn danger" id="mSim">Sair</button></div>',
    {mNao:function(){ fechaMenu(); JOGO.pausa(estava); }, mSim:function(){ goHome(); }});
}
function confirmaRecomecar(){
  if(menuAberto) return;
  menu('<h2>Recomeçar a jornada?</h2><p>Todas as fases voltam a ficar trancadas e as estrelas somem. O visual do urso fica.</p><div class="mrow"><button class="mbtn" id="mNao">Não</button><button class="mbtn danger" id="mSim">Sim, recomeçar</button></div>',
    {mNao:fechaMenu, mSim:function(){ fechaMenu(); JOGO.recomecar(); }});
}

return {SVG:SVG, esc:esc, hud:hud, toast:toast, pintaBotoes:pintaBotoes, modoNivel:modoNivel, modoMapa:modoMapa, hudArena:hudArena, acao:acao, perguntaArena:perguntaArena, timer:timer, esgotou:esgotou, forcaErro:forcaErro, fechaPergunta:fechaPergunta,
  menu:menu, fechaMenu:fechaMenu, fimArena:fimArena, fimFase:fimFase, creditos:creditos, pausa:pausa, confirmaSair:confirmaSair, comoJogar:comoJogar, historia:historia, confirmaCasa:confirmaCasa, confirmaRecomecar:confirmaRecomecar,
  qAberta:function(){ return qAberta; }, menuAberto:function(){ return menuAberto; }};
})();
