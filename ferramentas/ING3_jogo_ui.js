/* ============================================================
   ING3_jogo_ui.js — camada DOM do The Lost Endings: HUD, bandeira
   (tradução), legenda da intro, escolha do herói, cartão do reino no
   mapa, botões do quiz (Hint · Listen · Leave), menus (pausa, fim do
   reino, como jogar, história), teclado e toque, cadeado de tela cheia.
   A prova é TODA em inglês: a tela inteira fica em inglês e o
   português aparece menor, embaixo, quando a bandeira está ligada
   (<span class="tr">, body.show-tr) — no canvas, via JOGO.J.tr.
   ============================================================ */
window.UI = (function(){
'use strict';
var $=function(id){ return document.getElementById(id); };
var menuAberto=null, toastT=null, heroiEscolhido=null;
var SVG={
  casa:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" fill="currentColor"/></svg>',
  pausa:'<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1.5" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1.5" fill="currentColor"/></svg>',
  moeda:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#fbbf24" stroke="#b45309" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="#b45309" stroke-width="1.5"/></svg>',
  estrela:'<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="#fde047" stroke="#b45309" stroke-width="1.2"/></svg>',
  coracao:'<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="#f43f5e" stroke="#881337" stroke-width="1.4"/></svg>',
  pagina:'<svg viewBox="0 0 24 24"><path d="M5 3h10l4 4v14H5z" fill="#fffbeb" stroke="#92400e" stroke-width="1.6"/><path d="M15 3v4h4" fill="none" stroke="#92400e" stroke-width="1.6"/><path d="M8 11h8M8 14h8M8 17h5" stroke="#d97706" stroke-width="1.4"/></svg>',
  cadeado:'<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="3" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="15.5" r="1.6" fill="#0d0b1e"/></svg>',
  ajuda:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.3 9.5a2.7 2.7 0 1 1 3.9 2.4c-.8.4-1.2 1-1.2 1.9v.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.3" r="1.2" fill="currentColor"/></svg>',
  ouvir:'<svg viewBox="0 0 24 24"><path d="M4 10v4h3l4 4V6L7 10z" fill="currentColor"/><path d="M15 9a4 4 0 0 1 0 6m2.5-9a7.5 7.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  dica:'<svg viewBox="0 0 24 24"><path d="M9 21h6m-5-3h4m-2-15a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2.5h-6c0-1.3-.3-1.9-1-2.5A6 6 0 0 1 12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  bandeira:'<svg viewBox="0 0 28 20"><rect width="28" height="20" rx="3" fill="#009c3b"/><path d="M14 3 25 10 14 17 3 10z" fill="#ffdf00"/><circle cx="14" cy="10" r="4.2" fill="#002776"/></svg>'
};
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function bi(en,pt,tag){ tag=tag||'span'; return esc(en)+(pt?'<'+tag+' class="tr">'+esc(pt)+'</'+tag+'>':''); } /* inglês + tradução */

/* ---------- bandeira ---------- */
var TRK='ing3_tr';
function pintaTr(){ var on=document.body.classList.contains('show-tr'); JOGO.J.tr=on; var b=$('btnTr'); if(b) b.classList.toggle('on',on); }
function alternaTr(){ var on=!document.body.classList.contains('show-tr'); document.body.classList.toggle('show-tr',on); try{ localStorage.setItem(TRK,on?'1':'0'); }catch(e){} pintaTr(); }

/* ---------- HUD ---------- */
function hud(nome,pontos,moedas,feitas,tot,mostrar){ $('hudName').textContent=nome; $('hudPts').textContent=pontos; $('hudCoinN').textContent=moedas; $('hudArenaN').textContent=feitas+'/'+tot; $('hudArena').style.display=mostrar?'flex':'none'; }
function toast(txt,dur,pt){ var t=$('toast'); t.innerHTML=bi(txt,pt,'small'); t.classList.remove('show'); void t.offsetWidth; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){ t.classList.remove('show'); },dur||2200); }
function modoNivel(on){ $('touch').style.display=on?'block':'none'; }
function modoMapa(on){ var b=$('mapBtns'); if(b) b.style.display=on?'flex':'none'; document.body.classList.toggle('nomapa',!!on); }
function hudArena(on){ document.body.classList.toggle('naArena',!!on); }
/* capa: botão grande 'Open the book' */
function botaoCapa(on){ var b=$('btnCapa'); if(!b){ b=document.createElement('button'); b.id='btnCapa'; b.innerHTML=bi('Open the book ▶','Abrir o livro'); $('ui').appendChild(b); b.addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); JOGO.abreLivro(); }); } b.style.display=on?'block':'none'; document.body.classList.toggle('nacapa',!!on); }
/* botão de ação (estrela) com o número que sobra, e os corações = tamanho do herói */
/* reinos 1-8: o botão mostra o desenho do poder do reino (faísca, bolha, vento, bola, leite), sem contagem */
function acao(on,n,ico,id){ var b=$('tAct'); if(!b) return; b.classList.toggle('show',!!on); b.innerHTML= ico?'<img src="'+ico+'" alt="">':'★<small>'+(n||0)+'</small>'; b.dataset.poder=id||(on?'estrela':''); b.setAttribute('aria-label',id||'Throw a star'); var h=$('hudStar'); if(h){ h.style.display=on?'flex':'none'; h.querySelector('b').textContent=n||0; } }
/* o poder que o herói tem neste reino, ao lado dos corações */
function poderHud(ico,nome,pt){ var d=$('hudPoder'); if(!d) return; if(!ico){ d.style.display='none'; return; } d.style.display='flex'; d.innerHTML='<img src="'+ico+'" alt=""><span>'+bi(nome||'',pt||'','small')+'</span>'; }
/* explicaçãozinha do poder: passar o mouse ou tocar na pílula do HUD (e passar o mouse no botão de ação) */
var tipT=null;
function dicaPoder(alvo){ if(!window.PODERES) return; var d=PODERES.dicaPoder(); if(!d) return; var t=$('tipPoder'); if(!t){ t=document.createElement('div'); t.id='tipPoder'; $('ui').appendChild(t); }
  t.innerHTML=bi(d.en,d.pt,'small'); var r=alvo.getBoundingClientRect(), u=$('ui').getBoundingClientRect(), esc=u.width/960||1; t.style.left=Math.max(8,Math.min(960-328,(r.left-u.left)/esc-20))+'px'; t.style.top=((r.bottom-u.top)/esc+8)+'px'; if(alvo.id==='tAct'){ t.style.top=((r.top-u.top)/esc-110)+'px'; t.style.left=Math.max(8,(r.left-u.left)/esc-240)+'px'; }
  t.classList.add('show'); clearTimeout(tipT); tipT=setTimeout(function(){ t.classList.remove('show'); },4500); }
function coracoes(n,dano){ var d=$('hudVida'); if(!d) return; var h=''; for(var i=0;i<3;i++) h+='<span class="cor'+(i<n?' on':'')+'">'+SVG.coracao+'</span>'; d.innerHTML=h; if(dano){ d.classList.remove('dano'); void d.offsetWidth; d.classList.add('dano'); } }
function quizBotoes(on){ $('quizBtns').classList.toggle('show',!!on); }
/* corrida: ◀ ▶ somem (o carro anda sozinho); PULAR vira ▲ e o ▼ desce de faixa */
function modoCorrida(on){ document.body.classList.toggle('corrida',!!on); $('tJump').innerHTML=on?'&#9650;':'JUMP'; }

/* ---------- legenda da intro ---------- */
function legenda(cena,acoes){ var d=$('legenda'); if(!cena){ d.classList.remove('show'); return; } d.innerHTML='<p>'+bi(cena.en,cena.pt)+'</p><div class="lgrow"><button class="mini" id="lgPula">Skip</button><button class="lgnext" id="lgNext">'+(cena.botao||'Next ▶')+'</button></div>'; d.classList.add('show');
  $('lgPula').addEventListener('click',function(e){ e.stopPropagation(); SOM.init(); if(acoes&&acoes.pula){ acoes.pula(); return; } if(JOGO.J.estado==='final') JOGO.pulaFinal(); else JOGO.pulaIntro(); });
  $('lgNext').addEventListener('click',function(e){ e.stopPropagation(); SOM.init(); SOM.fx('clique'); if(acoes&&acoes.next){ acoes.next(); return; } JOGO.confirmar(); }); try{ say(cena.en); }catch(e){} }

/* ---------- escolha do herói ---------- */
var HEROIS=[{k:'lia',en:'Lia, the knight',pt:'Lia, a cavaleira'},{k:'theo',en:'Theo, the wizard',pt:'Theo, o aprendiz de mago'},{k:'bia',en:'Bia, the gymnast',pt:'Bia, a ginasta'},{k:'leo',en:'Leo, the football player',pt:'Leo, o jogador de futebol'}];
var CORES=['#dc2626','#2563eb','#16a34a','#eab308','#9333ea','#ec4899','#f97316','#0d9488'];
/* escolha do herói: os quatro ficam INTEIROS no canvas, em cima; aqui embaixo, o nome de cada um bem
   embaixo do seu herói (mesmas colunas), as cores e o "Let's go!". Tocar no herói também escolhe. */
function selecionaHeroi(k){ if(!k) return; SOM.init(); SOM.fx('plim'); heroiEscolhido=k; var hs=$('mcard').querySelectorAll('.hbtn'); [].slice.call(hs).forEach(function(x){ x.classList.toggle('on',x.getAttribute('data-k')===k); }); try{ var H=HEROIS.filter(function(x){ return x.k===k; })[0]; if(H) say(H.en); }catch(e){} }
function escolhaHeroi(cb){
  heroiEscolhido=JOGO.J.prog.heroi||'lia';
  var h='<div class="hsel">';
  HEROIS.forEach(function(x){ h+='<button class="hbtn'+(x.k===heroiEscolhido?' on':'')+'" data-k="'+x.k+'">'+bi(x.en,x.pt)+'</button>'; });
  h+='</div><div class="hcores">'; CORES.forEach(function(cor){ h+='<button class="hcor'+(JOGO.J.prog.cor===cor?' on':'')+'" data-c="'+cor+'" style="background:'+cor+'" aria-label="color"></button>'; }); h+='</div>';
  h+='<button class="mbtn pri" id="mOk">'+bi("Let's go!",'Vamos!')+'</button>';
  menu(h,{mOk:function(){ JOGO.J.prog.heroi=heroiEscolhido; fechaMenu(); cb(); }},'escolha');
  [].slice.call($('mcard').querySelectorAll('.hbtn')).forEach(function(b){ b.addEventListener('click',function(){ selecionaHeroi(b.getAttribute('data-k')); }); });
  [].slice.call($('mcard').querySelectorAll('.hcor')).forEach(function(b){ b.addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); var cor=b.getAttribute('data-c'); JOGO.J.prog.cor= JOGO.J.prog.cor===cor?null:cor; [].slice.call(b.parentNode.children).forEach(function(x){ x.classList.toggle('on',JOGO.J.prog.cor&&x===b); }); }); });
}

/* ---------- aviso de PODER novo (capa no céu, roupa de mergulho no recife): pausa e explica ---------- */
function aviso(icone,tit,titPt,txt,txtPt,btn,btnPt){
  if(menuAberto) return; JOGO.pausa(true);
  var h='<h2>'+bi(tit,titPt,'small')+'</h2><p>'+bi(txt,txtPt)+'</p><button class="mbtn pri" id="mOk">'+bi(btn,btnPt)+'</button>';
  menu(h,{mOk:function(){ fechaMenu(); var i=JOGO.J.in; i.left=i.right=i.jump=i.down=false; JOGO.pausa(false); }},'festa');
  try{ say(tit+' '+txt); }catch(e){}
}
/* ---------- cartão do reino no mapa ---------- */
function cartaoMapa(f){
  var d=$('mapCard'); if(!d) return;
  if(!f){ d.classList.remove('show'); return; }
  var pronto=!!FASES.PRONTOS[f.id], pg=JOGO.paginas(f.id);
  var h='<div class="mcTop"><div class="mcNome"><b>'+f.id+'. '+bi(f.nome,f.nome_pt,'small')+'</b></div>'+(pronto?'<div class="mcN">'+pg+'/'+f.moradores.length+' pages</div><button class="mbtn pri" id="mcJogar">Play</button>':'<div class="mcN">Coming soon</div>')+'</div>';
  h+='<div class="mcRes">'+bi(f.resumo,f.resumo_pt,'small')+'</div>';
  d.innerHTML=h; d.classList.add('show');
  var b=$('mcJogar'); if(b) b.addEventListener('click',function(){ SOM.init(); JOGO.confirmar(); });
}

/* ---------- menus ---------- */
function menu(html,acoes,classe){
  var m=$('mcard'); m.innerHTML=html; m.className='mcard '+(classe||''); $('menu').classList.add('show'); menuAberto={acoes:acoes||{}};
  Object.keys(acoes||{}).forEach(function(id){ var b=$(id); if(b) b.addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); acoes[id](); }); });
}
function fechaMenu(){ $('menu').classList.remove('show'); menuAberto=null; }
function estrelasHtml(n){ var s='<div class="mstars">'; for(var i=0;i<3;i++) s+='<span class="'+(i<n?'on':'')+'" style="animation-delay:'+(i*.25)+'s">'+SVG.estrela+'</span>'; return s+'</div>'; }
function fimFase(f,estrelas,acertos,total,pontos,moedas,pags,totPags){
  var h='<h2>'+bi(f.nome,f.nome_pt,'small')+'</h2>'+estrelasHtml(estrelas);
  if(f.fim) h+='<div class="fimHist"><b>'+bi('The lost ending is back in the book!','O final perdido voltou para o livro!','small')+'</b><p>'+bi(f.fim,f.fim_pt,'small')+'</p></div>'; /* 18/10: o fio da história da jornada */
  h+='<div class="placar"><div><span>'+SVG.pagina+'</span><b>'+pags+'/'+totPags+'</b><i>'+bi('pages','páginas')+'</i></div><div><span>'+SVG.estrela+'</span><b>'+acertos+'/'+total+'</b><i>'+bi('right answers','respostas certas')+'</i></div><div><span>'+SVG.moeda+'</span><b>'+moedas+'</b><i>'+bi('coins','moedas')+'</i></div></div>';
  if(pags<totPags) h+='<p class="sub">'+bi('Some pages are still lost here. Play again to find them!','Ainda há páginas perdidas aqui. Jogue de novo para achá-las!')+'</p>';
  h+='<button class="mbtn pri" id="mMapa">'+bi('Back to the map','Voltar ao mapa')+'</button><button class="mbtn" id="mDeNovo">'+bi('Play this kingdom again','Jogar este reino de novo')+'</button>';
  menu(h,{mMapa:function(){ fechaMenu(); JOGO.voltaMapa(); }, mDeNovo:function(){ fechaMenu(); JOGO.jogarDeNovo(); }},'festa');
}
function pausa(){
  if(menuAberto) return; var J2=JOGO.J; if(['nivel','quiz','corrida','estadio'].indexOf(J2.estado)<0) return;
  JOGO.pausa(true);
  var h='<h2>'+bi('Paused','Pausa')+'</h2><button class="mbtn pri" id="mCont">'+bi('Continue','Continuar')+'</button><div class="mrow"><button class="mbtn" id="mSfx">Sounds: '+(SOM.sfx?'on':'off')+'</button><button class="mbtn" id="mMus">Music: '+(SOM.mus?'on':'off')+'</button></div>';
  if(!document.body.classList.contains('sem-voz')) h+='<button class="mbtn" id="mVoz">Voice: '+(window.somLigado?'on':'off')+'</button>';
  h+='<button class="mbtn" id="mMapa">'+bi('Leave to the map','Sair para o mapa')+'</button>';
  menu(h,{mCont:function(){ fechaMenu(); JOGO.pausa(false); }, mSfx:function(){ SOM.setSfx(!SOM.sfx); $('mSfx').textContent='Sounds: '+(SOM.sfx?'on':'off'); }, mMus:function(){ try{ localStorage.setItem('ing3_mus_escolheu','1'); }catch(e){} SOM.setMus(!SOM.mus); $('mMus').textContent='Music: '+(SOM.mus?'on':'off'); },
    mVoz:function(){ try{ toggleSom(); }catch(e){} $('mVoz').textContent='Voice: '+(window.somLigado?'on':'off'); },
    mMapa:function(){ fechaMenu(); saiParaMapa(); }});
}
function comoJogar(cb){
  var h='<h2>'+bi('How to play','Como jogar')+'</h2><div class="como">';
  [['<b>Walk</b> ← → or A D · buttons ◀ ▶','Andar: setas ou A D · botões ◀ ▶'],['<b>Jump</b> ↑ W or SPACE · JUMP button (hold to jump higher)','Pular: ↑ W ou ESPAÇO · botão PULAR (segure para pular mais alto)'],
   ['<b>Questions</b> walk to a friend with a <b>!</b> · jump and hit the right sign (or tap it, or press 1 2 3)','Perguntas: vá até o personagem com <b>!</b> · pule e bata a cabeça na placa certa (ou toque nela, ou aperte 1 2 3)'],
   ['<b>Pages</b> each friend asks 3 questions and gives you a lost page','Páginas: cada personagem faz 3 perguntas e dá uma página perdida'],
   ['<b>Pip</b> touch the egg to ride Pip · hold JUMP to float','Pip: encoste no ovo para montar no Pip · segure PULAR para planar'],
   ['<b>Checkpoint</b> the green flag saves your place','Ponto de controle: a bandeira verde guarda o seu lugar'],
   ['<b>Flag</b> the Brazilian flag shows Portuguese','Bandeira: a bandeira do Brasil mostra o português']].forEach(function(x){ h+='<div>'+x[0]+'<span class="tr">'+x[1]+'</span></div>'; });
  h+='</div><button class="mbtn pri" id="mOk">'+bi('Got it!','Entendi!')+'</button>';
  menu(h,{mOk:function(){ fechaMenu(); if(cb) cb(); }});
}
function historia(){
  var h='<h2>'+bi('The story','A história')+'</h2><div class="como">';
  JOGO.CENAS_INTRO.forEach(function(c2){ h+='<div>'+bi(c2.en,c2.pt)+'</div>'; });
  h+='</div><div class="mrow"><button class="mbtn" id="mVer">'+bi('Watch again','Ver de novo')+'</button><button class="mbtn pri" id="mOk">OK</button></div>';
  menu(h,{mOk:fechaMenu, mVer:function(){ fechaMenu(); modoMapa(false); cartaoMapa(null); JOGO.iniciaIntro(); }});
}
function creditos(){
  var P=JOGO.J.prog, h='<h2>'+bi('The End','Fim')+'</h2><p>'+bi('You found the lost endings! Every story has its ending back.','Você achou os finais perdidos! Toda história tem o seu final de volta.')+'</p><div class="lista">';
  FASES.LISTA.forEach(function(f){ var p=P.fases[f.id]||{}; h+='<div><span>'+esc(f.nome)+'</span><span class="st">'+'★'.repeat(p.estrelas||0)+'</span></div>'; });
  h+='</div><button class="mbtn pri" id="mMapa">'+bi('Back to the map','Voltar ao mapa')+'</button>';
  menu(h,{mMapa:function(){ fechaMenu(); JOGO.irMapa(); }},'festa');
}
function saiParaMapa(){ JOGO.pausa(false); if(JOGO.J.quiz&&window.QUIZ) QUIZ.sai(); quizBotoes(false); legenda(null); if(window.CHEFAO&&CHEFAO.ativo()) CHEFAO.limpa(); JOGO.irMapa(); try{ speechSynthesis.cancel(); }catch(e){} }
function confirmaCasa(){
  if(menuAberto) return; var estava=JOGO.J.pausado, st=JOGO.J.estado;
  if(['nivel','quiz','corrida','estadio','cano','fimFase','chefeIntro'].indexOf(st)>=0){
    JOGO.pausa(true);
    menu('<h2>'+bi('Back to the map?','Voltar ao mapa?')+'</h2><p>'+bi('You can come back to this kingdom any time.','Você pode voltar a este reino quando quiser.')+'</p><div class="mrow"><button class="mbtn" id="mNao">'+bi('Stay','Ficar')+'</button><button class="mbtn pri" id="mSim">'+bi('Go to the map','Ir para o mapa')+'</button></div>',
      {mNao:function(){ fechaMenu(); JOGO.pausa(estava); }, mSim:function(){ fechaMenu(); saiParaMapa(); }});
    return;
  }
  JOGO.pausa(true);
  menu('<h2>'+bi('Leave the game?','Sair do jogo?')+'</h2><p>'+bi('Your progress is saved.','Seu progresso fica salvo.')+'</p><div class="mrow"><button class="mbtn" id="mNao">'+bi('Stay','Ficar')+'</button><button class="mbtn danger" id="mSim">'+bi('Leave','Sair')+'</button></div>',
    {mNao:function(){ fechaMenu(); JOGO.pausa(estava); }, mSim:function(){ goHome(); }});
}
function confirmaRecomecar(){
  if(menuAberto) return;
  menu('<h2>'+bi('Start again?','Recomeçar?')+'</h2><p>'+bi('All pages and stars will be lost. Your hero stays.','Todas as páginas e estrelas somem. O herói continua.')+'</p><div class="mrow"><button class="mbtn" id="mNao">'+bi('No','Não')+'</button><button class="mbtn danger" id="mSim">'+bi('Yes, start again','Sim, recomeçar')+'</button></div>',
    {mNao:fechaMenu, mSim:function(){ fechaMenu(); JOGO.recomecar(); }});
}

/* ---------- botões do mapa ---------- */
function montaMapBtns(){
  var d=document.createElement('div'); d.id='mapBtns';
  d.innerHTML='<button class="mb" id="mbHist">Story</button><button class="mb" id="mbComo">How to play</button><button class="mb" id="mbHer">Hero</button><button class="mb sec" id="mbRec">Start again</button>';
  $('ui').appendChild(d);
  $('mbHist').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); historia(); });
  $('mbComo').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); comoJogar(); });
  $('mbHer').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); modoMapa(false); cartaoMapa(null); JOGO.iniciaEscolha(); });
  $('mbRec').addEventListener('click',function(){ SOM.init(); confirmaRecomecar(); });
}

/* ---------- teclado ---------- */
var mapaTeclas={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'jump',w:'jump',W:'jump',' ':'jump',ArrowDown:'down',s:'down',S:'down',x:'act',X:'act',Enter:'act'};
function keydown(e){
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  SOM.init(); document.body.classList.add('kbd');
  var k=e.key, J2=JOGO.J, m=menuAberto;
  if(k==='Escape'){ e.preventDefault(); if(J2.estado==='quiz'&&!m){ QUIZ.sai(); return; } if(m){ if(J2.estado==='nivel'||J2.estado==='quiz'){ fechaMenu(); JOGO.pausa(false); } } else pausa(); return; }
  if(m){ if(k==='Enter'){ var pri=$('mcard').querySelector('.mbtn.pri'); if(pri){ e.preventDefault(); pri.click(); } } return; }
  if(J2.estado==='intro'||J2.estado==='mapa'||J2.estado==='final'||J2.estado==='capa'||J2.estado==='chefeIntro'){
    if(k==='Enter'||k===' '){ e.preventDefault(); JOGO.confirmar(); return; }
    if(J2.estado==='mapa'){ if(k==='ArrowRight'||k==='d'||k==='D') JOGO.mapaMove(1); if(k==='ArrowLeft'||k==='a'||k==='A') JOGO.mapaMove(-1); }
    return;
  }
  if(J2.estado==='quiz'&&QUIZ.tecla(k)){ e.preventDefault(); return; }
  if(J2.estado==='corrida'&&CORRIDA.tecla(k)){ e.preventDefault(); return; }
  if(J2.estado==='estadio'&&ESTADIO.tecla(k)){ e.preventDefault(); return; }
  if(k===' '&&J2.estado==='nivel'&&window.PODERES&&(PODERES.tiroAtual()||(J2.faseAtual&&J2.faseAtual.chefao&&J2.urso&&J2.urso.poderes.estrelas>0))){ e.preventDefault(); if(!e.repeat&&window.PERIGOS) PERIGOS.atira(); return; } /* 18/10: ESPAÇO = usar o poder; pular fica no ↑ / W */
  var ac=mapaTeclas[k]; if(ac){ e.preventDefault(); if(ac==='act'&&!e.repeat&&window.PERIGOS){ PERIGOS.atira(); return; } J2.in[ac]=true; }
}
function keyup(e){ if(e.key===' '&&JOGO.J.estado==='corrida') return; /* na corrida ESPAÇO é turbo: soltar não pode tirar o pé do ▲ */ var ac=mapaTeclas[e.key]; if(ac) JOGO.J.in[ac]=false; }

/* ---------- toque ---------- */
function botaoToque(id,ac){
  var b=$(id);
  function on(e){ e.preventDefault(); SOM.init(); document.body.classList.remove('kbd'); b.classList.add('on'); if(ac==='act'){ if(JOGO.J.estado==='corrida'&&window.CORRIDA){ CORRIDA.tecla(' '); return; } if(window.PERIGOS) PERIGOS.atira(); return; } JOGO.J.in[ac]=true; try{ b.setPointerCapture(e.pointerId); }catch(x){} }
  function off(e){ e.preventDefault(); b.classList.remove('on'); JOGO.J.in[ac]=false; }
  b.addEventListener('pointerdown',on); b.addEventListener('pointerup',off); b.addEventListener('pointercancel',off); b.addEventListener('pointerleave',off);
  b.addEventListener('contextmenu',function(e){ e.preventDefault(); });
}

/* ---------- cadeado / tela cheia (segurar 2 s para destravar) ---------- */
var segurando=null;
function pintaLock(){ var b=$('btnLock'); if(!b) return; b.classList.toggle('on',!!window.screenLocked); document.body.classList.toggle('locked',!!window.screenLocked); }
function initLock(){
  var b=$('btnLock'); if(!b) return;
  b.addEventListener('click',function(){ SOM.init(); if(!window.screenLocked){ try{ doLock(); }catch(e){} SOM.fx('tranca'); toast('Screen locked. Hold the lock for 2 seconds to unlock.',3000,'Tela travada. Segure o cadeado por 2 segundos para destravar.'); pintaLock(); } });
  function comeca(e){ if(!window.screenLocked) return; e.preventDefault(); b.classList.add('hold'); segurando=setTimeout(function(){ b.classList.remove('hold'); try{ $('unlockov').classList.add('show'); }catch(x){} },2000); }
  function solta(){ clearTimeout(segurando); b.classList.remove('hold'); }
  b.addEventListener('pointerdown',comeca); b.addEventListener('pointerup',solta); b.addEventListener('pointerleave',solta); b.addEventListener('pointercancel',solta);
  document.addEventListener('pointerdown',function(){ if(window.screenLocked && !document.fullscreenElement){ var el=document.documentElement; if(el.requestFullscreen){ try{ el.requestFullscreen().catch(function(){}); }catch(e){} } } },true);
  document.addEventListener('fullscreenchange',pintaLock);
  var ov=$('unlockov'); if(ov){ ov.addEventListener('click',function(){ setTimeout(pintaLock,50); }); }
  pintaLock();
}

function init(){
  var hp=$('hudPoder'); if(hp){ hp.addEventListener('mouseenter',function(){ dicaPoder(hp); }); hp.addEventListener('click',function(e){ e.stopPropagation(); dicaPoder(hp); }); }
  var ta=$('tAct'); if(ta){ ta.addEventListener('mouseenter',function(){ dicaPoder(ta); }); }
  try{ if(localStorage.getItem('ing3_mus_escolheu')!=='1'){ SOM.setMus(false); } }catch(e){} /* 18/10 (Paulo): trilha desligada por padrão; efeitos continuam */
  montaMapBtns();
  $('btnHome').innerHTML=SVG.casa; $('btnLock').innerHTML=SVG.cadeado; $('btnHelp').innerHTML=SVG.ajuda; $('btnPause').innerHTML=SVG.pausa; $('btnTr').innerHTML=SVG.bandeira;
  $('hudCoinIco').innerHTML=SVG.moeda; $('hudArenaIco').innerHTML=SVG.pagina; $('hudPtsIco').innerHTML=SVG.estrela;
  $('qDica').innerHTML=SVG.dica+'<span>Hint</span>'; $('qOuvir').innerHTML=SVG.ouvir+'<span>Listen</span>';
  try{ if(localStorage.getItem(TRK)==='1') document.body.classList.add('show-tr'); }catch(e){}
  pintaTr();
  $('btnTr').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); alternaTr(); });
  $('btnHome').addEventListener('click',function(){ SOM.init(); if(window.screenLocked) return; confirmaCasa(); });
  $('btnHelp').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); if(menuAberto) return; var J=JOGO.J, p=(J.estado==='nivel'||J.estado==='quiz'); if(p) JOGO.pausa(true); comoJogar(function(){ if(p) JOGO.pausa(false); }); });
  $('btnPause').addEventListener('click',function(){ SOM.init(); if(menuAberto){ if(JOGO.J.estado==='fimFase') return; fechaMenu(); JOGO.pausa(false); } else pausa(); });
  $('qSair').addEventListener('click',function(){ SOM.init(); QUIZ.sai(); });
  $('qDica').addEventListener('click',function(){ SOM.init(); SOM.fx('clique'); QUIZ.alternaDica(); });
  $('qOuvir').addEventListener('click',function(){ SOM.init(); QUIZ.ouvir(); });
  initLock();
  botaoToque('tLeft','left'); botaoToque('tRight','right'); botaoToque('tJump','jump'); botaoToque('tDown','down'); botaoToque('tAct','act');
  var cv=$('game');
  cv.addEventListener('pointerdown',function(e){ SOM.init(); if(e.pointerType==='touch') document.body.classList.remove('kbd'); if(menuAberto&&JOGO.J.estado!=='escolha') return; JOGO.toque(e.clientX,e.clientY); });
  cv.addEventListener('pointermove',function(e){ if(e.pointerType==='mouse'&&!menuAberto){ var p=JOGO.paraLogico(e.clientX,e.clientY); JOGO.mapaHover(p.x,p.y); } });
  window.addEventListener('keydown',keydown); window.addEventListener('keyup',keyup);
  window.addEventListener('blur',function(){ var i=JOGO.J.in; i.left=i.right=i.jump=i.down=false; });
  document.addEventListener('touchmove',function(e){ e.preventDefault(); },{passive:false});
  modoNivel(false); modoMapa(false);
  JOGO.init();
  /* gancho de QA (automatizado, MUDO) */
  window.__ing3={J:JOGO.J, JOGO:JOGO, QUIZ:QUIZ, FASES:FASES, UI:window.UI,
    responde:function(certa){ var q=JOGO.J.quiz; if(!q||q.fase!=='pergunta') return false; QUIZ.tecla(String((certa?q.certa:(q.certa+1)%q.cartoes.length)+1)); return true; },
    segue:function(){ QUIZ.tecla('Enter'); }, menuAberto:function(){ return !!menuAberto; },
    clicaPri:function(){ var p=$('mcard').querySelector('.mbtn.pri'); if(p) p.click(); }};
}
document.addEventListener('DOMContentLoaded',init);

return {aviso:aviso, selecionaHeroi:selecionaHeroi, saiParaMapa:saiParaMapa, SVG:SVG, esc:esc, bi:bi, hud:hud, toast:toast, modoNivel:modoNivel, modoMapa:modoMapa, hudArena:hudArena, quizBotoes:quizBotoes, acao:acao, poderHud:poderHud, coracoes:coracoes, botaoCapa:botaoCapa, modoCorrida:modoCorrida, legenda:legenda, escolhaHeroi:escolhaHeroi, heroiSel:function(){ return heroiEscolhido; }, cartaoMapa:cartaoMapa,
  creditos:creditos, menu:menu, fechaMenu:fechaMenu, fimFase:fimFase, pausa:pausa, comoJogar:comoJogar, historia:historia, confirmaCasa:confirmaCasa, confirmaRecomecar:confirmaRecomecar, alternaTr:alternaTr,
  menuAberto:function(){ return menuAberto; }};
})();
