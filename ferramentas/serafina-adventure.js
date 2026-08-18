/* ============================================================
   SERAFINA ADVENTURE — motor genérico de jogo de fases (05/07)
   Mastery loop: micro-lição → obstáculos (retrieval) → avanço →
   boss de revisão → celebração com resumo por emblemas + karaokê.

   O motor NÃO conhece a matéria: lê window.ADVENTURE (dados 100%
   derivados do _roteiro.md da matéria) e window.SERA_CFG (idioma).
   Requer serafina-core.js carregado ANTES (say, lock, tr, fs...).

   USO:
     <script src="serafina-core.js"></script>
     <script src="serafina-adventure.js"></script>
     <script> SERA_ADV.boot(ADVENTURE); </script>

   ADVENTURE = {
     storageKey:'cie2_adv',
     title, titlePt, hero:'🧪',
     phases:[
       { id, icon, color, name, namePt,
         anchor, anchorPt,            // frase-âncora (karaokê do final)
         lesson:{ lines:[[emoji,en,pt],...], custom:fn(container)? },
         bank:[ item, ... ],          // >=6 itens; sorteia PICK por rodada
         pick:3 },                    // qtos obstáculos por rodada (padrão 3)
       { id, boss:true, final?:true, icon, name, namePt, from:[ids], count:4 },
     ]
   }
   TIPOS DE ITEM (todos com opções embaralhadas a cada exibição):
     {t:'mc',    q,qpt, opts:[{en,pt,ok}] }        // 1 correta
     {t:'multi', q,qpt, opts:[{en,pt,ok}] }        // "pode ser mais de 1"
     {t:'sort',  q,qpt, buckets:[{id,en,pt,color}],
                 items:[{en,pt,b}], pick:4 }       // toca no balde certo

   TRAVAS PEDAGÓGICAS EMBUTIDAS (inegociáveis — ver pedagogico 05/07):
   - a lição SOME antes do obstáculo (retrieval real, não cópia);
   - erro 1: verdade revelada + retry reembaralhado (sem punição);
   - erro 2: re-mostra a lição, LIBERA a passagem e o item entra na
     fila do boss (nunca trava a criança);
   - estrela só no acerto de 1ª tentativa (retry vale a passagem);
   - boss só cobra o já ensinado, priorizando a fila de erros, e
     converte sort→MC (formato trocado);
   - navegação nunca bloqueia: Map sempre visível, fases feitas
     podem ser rejogadas, progresso salvo (localStorage).
   ============================================================ */
window.SERA_ADV=(function(){
'use strict';
/* --- i18n da CASCA (aditivo, 2026-08-09) -------------------------------
   Os defaults abaixo sao exatamente as strings historicas (EN + .tr PT),
   entao produto que NAO define window.SERA_CFG.advUI renderiza igual ao
   que sempre renderizou. Produto PT (Geografia) passa advUI e a casca
   inteira fala portugues, sem duplicar o motor. */
var UI=Object.assign({
  again:'\u21bb play again',
  listen:'\ud83d\udd0a Listen to the lesson<span class="tr">Ouvir a li\u00e7\u00e3o</span>',
  ready:'\u2694\ufe0f I\u2019m ready!<span class="tr">Estou pronta!</span>',
  mapShort:'\ud83d\uddfa\ufe0f Map',
  map:'\ud83d\uddfa\ufe0f Map<span class="tr">Mapa</span>',
  retry:'\ud83d\udd01 Try again!<span class="tr">Tentar de novo!</span>',
  battle:'\u2694\ufe0f Battle!<span class="tr">Batalhar!</span>',
  bossIntro:'Answer the questions to win!',
  bossIntroPt:'Responda para vencer!',
  win:'\ud83c\udfc6 You did it!<span class="tr">Voc\u00ea conseguiu!</span>',
  badges1:'Show my badges!', badges1Pt:'Mostrar emblemas!',
  badgesN:'Next badge',      badgesNPt:'Pr\u00f3ximo emblema',
  backMap:'\ud83d\uddfa\ufe0f Back to the map<span class="tr">Voltar ao mapa</span>',
  listenTitle:'Listen',
  yes:'\ud83c\udf89 Yes! <span class="tr">Isso!</span>',
  next:'\u27a1\ufe0f Next<span class="tr">Pr\u00f3ximo</span>',
  notYet:'\ud83d\udca1 Not yet\u2026 the answer is:<span class="tr">Ainda n\u00e3o\u2026 a resposta \u00e9:</span>',
  remember:'Remember: <span class="tr">Lembre:</span>',
  keepGoing:'\u27a1\ufe0f Keep going!<span class="tr">Seguir em frente!</span>',
  goesIn:' goes in\u2026', goesInPt:' vai em\u2026',
  phaseDone:'Phase complete!<span class="tr">Fase conclu\u00edda!</span>',
  nextPhase:'\u27a1\ufe0f Next phase<span class="tr">Pr\u00f3xima fase</span>'
}, (window.SERA_CFG||{}).advUI||{});

var A=null, S=null;            // ADVENTURE, estado salvo
var cur={ph:null,items:[],idx:0,misses:0,perfect:0};

function $id(i){return document.getElementById(i);}
/* NAO escapa '<': o conteudo das fases usa <b> de proposito para destacar
   palavras (e' dado de autor, nao entrada de usuario). So aspas, por
   seguranca dentro de atributos. */
function esc(s){return String(s).replace(/"/g,'&quot;');}
function escJs(s){return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;');}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function tr(en,pt){return esc(en)+(pt?'<span class="tr">'+esc(pt)+'</span>':'');}
/* say como <span role=button>: button-dentro-de-button é HTML inválido (QA ti 05/07) */
function sayBtn(t){return '<span class="adv-say" role="button" tabindex="0" onclick="say(\''+escJs(t)+'\');event.stopPropagation()" title="'+UI.listenTitle+'">🔊</span>';}
var advTimer=null;
function clearAdvTimer(){if(advTimer){clearTimeout(advTimer);advTimer=null;}}
function itemKey(it){return it.__origQ||it.q||'';}

/* ---------- estado ---------- */
function load(){
  S={stars:{},done:{},errQ:[]};
  try{var raw=localStorage.getItem(A.storageKey); if(raw)S=JSON.parse(raw);}catch(e){}
  if(!S||typeof S!=='object'||Array.isArray(S))S={};   /* 'null'/número no storage não pode derrubar o boot */
  S.stars=S.stars||{}; S.done=S.done||{}; S.errQ=Array.isArray(S.errQ)?S.errQ:[];
}
function save(){try{localStorage.setItem(A.storageKey,JSON.stringify(S));}catch(e){}}
function phaseById(id){for(var i=0;i<A.phases.length;i++)if(A.phases[i].id===id)return A.phases[i];return null;}
function phaseIndex(id){for(var i=0;i<A.phases.length;i++)if(A.phases[i].id===id)return i;return -1;}
function unlocked(i){ if(i===0)return true; return !!S.done[A.phases[i-1].id]; }
function starTotal(ph){ return ph.boss?(ph.count||4):(ph.pick||3); }

/* ---------- mapa (trilha) ---------- */
function showMap(){
  stopKaraoke(); clearAdvTimer();
  var h='<div class="adv-map"><div class="adv-maptitle">'+tr(A.title,A.titlePt)+' '+A.hero+'</div><div class="adv-trail">';
  A.phases.forEach(function(ph,i){
    var un=unlocked(i), done=!!S.done[ph.id];
    var st=S.stars[ph.id]||0, tot=starTotal(ph);
    h+='<div class="adv-node-row '+(i%2?'right':'left')+'">'
      +'<button class="adv-node'+(done?' done':un?' open':' locked')+(ph.boss?' boss':'')+'" '
      +(un?('onclick="SERA_ADV.enter(\''+ph.id+'\')"'):'disabled')+' style="--pc:'+(ph.color||'#38bdf8')+'">'
      +'<span class="adv-nicon">'+(un?ph.icon:'🔒')+'</span>'
      +'<span class="adv-nname">'+tr(ph.name,ph.namePt)+'</span>'
      +(done?'<span class="adv-nstars">'+'⭐'.repeat(st)+(st<tot?'<span class="adv-starghost">'+'☆'.repeat(tot-st)+'</span>':'')+'</span>':'')
      +(done?'<span class="adv-redo">'+UI.again+'</span>':'')
      +'</button></div>';
  });
  h+='</div></div>';
  $id('stage').innerHTML=h;
}

/* ---------- lição ---------- */
function enter(id){
  var ph=phaseById(id); if(!ph)return;
  if(ph.boss){bossIntro(ph);return;}
  cur={ph:ph,items:[],idx:0,misses:0,perfect:0};
  var L=ph.lesson,h='<div class="adv-lesson" style="--pc:'+(ph.color||'#38bdf8')+'">'
   +mapBtn()
   +'<div class="adv-lhead"><span class="adv-licon">'+ph.icon+'</span><span class="adv-ltitle">'+tr(ph.name,ph.namePt)+'</span></div>'
   +'<div class="adv-lcard">';
  L.lines.forEach(function(ln){
    h+='<div class="adv-lline"><span class="adv-lemo">'+ln[0]+'</span><span class="adv-ltxt">'+tr(ln[1],ln[2])+'</span>'+sayBtn(ln[1])+'</div>';
  });
  h+='<div id="advCustom"></div>'
   +'<button class="adv-listen" onclick="say(\''+escJs(L.lines.map(function(l){return l[1];}).join(' '))+'\')">'+UI.listen+'</button>'
   +'</div>'
   +'<button class="adv-go" onclick="SERA_ADV.startChallenges()">'+UI.ready+'</button>'
   +'</div>';
  $id('stage').innerHTML=h;
  if(L.custom){try{L.custom($id('advCustom'));}catch(e){}}
}

/* ---------- desafios ---------- */
function startChallenges(){
  var ph=cur.ph, pick=ph.pick||3;
  cur.items=shuffle(ph.bank).slice(0,Math.min(pick,ph.bank.length))
    .map(function(it,i){return {src:it, tries:0};});
  cur.idx=0; cur.perfect=0;
  renderChallenge();
}
function mapBtn(){return '<button class="adv-mapbtn" onclick="SERA_ADV.showMap()">'+UI.mapShort+'</button>';}

function renderChallenge(){
  clearAdvTimer();
  var ph=cur.ph, ent=cur.items[cur.idx], it=ent.src;
  var h='<div class="adv-ch" style="--pc:'+(ph.color||'#38bdf8')+'">'
   +mapBtn()
   +'<div class="adv-prog">'+ph.icon+' '+(cur.idx+1)+' / '+cur.items.length+'</div>'
   +'<div class="adv-q">'+tr(it.q,it.qpt)+' '+sayBtn(it.q)+'</div>'
   +(it.t==='multi'?'<div class="adv-hint">⚠️ Can be more than one! <span class="tr">Pode ser mais de uma!</span></div>':'')
   +'<div class="adv-opts" id="advOpts">';
  if(it.t==='mc'||it.t==='multi'){
    ent.view=shuffle(it.opts.map(function(o,oi){return {o:o,oi:oi};}));
    ent.view.forEach(function(v,vi){
      h+='<button class="adv-opt" data-vi="'+vi+'" onclick="SERA_ADV.tapOpt('+vi+')">'
        +'<span class="adv-otxt">'+tr(v.o.en,v.o.pt)+'</span>'+sayBtn(v.o.en)+'</button>';
    });
    if(it.t==='multi') h+='</div><button class="adv-check" id="advCheck" onclick="SERA_ADV.checkMulti()" disabled>✔️ Check!<span class="tr">Conferir</span></button>';
    else h+='</div>';
  }else if(it.t==='sort'){
    if(!ent.subs){ ent.subs=shuffle(it.items).slice(0,Math.min(it.pick||4,it.items.length)); ent.sub=0; }
    var s=ent.subs[ent.sub];
    h+='<div class="adv-sortitem">'+tr(s.en,s.pt)+' '+sayBtn(s.en)+'</div>'
      +'<div class="adv-sortsub">'+(ent.sub+1)+' / '+ent.subs.length+'</div>'
      +'<div class="adv-buckets">';
    /* buckets ordinais (1st/2nd/3rd) não embaralham — noShuffle:true */
    (it.noShuffle?it.buckets.map(function(b,bi){return bi;}):shuffle(it.buckets.map(function(b,bi){return bi;}))).forEach(function(bi){
      var b=it.buckets[bi];
      h+='<button class="adv-bucket" data-b="'+b.id+'" style="--bc:'+(b.color||'#38bdf8')+'" onclick="SERA_ADV.tapBucket(\''+b.id+'\')">'+tr(b.en,b.pt)+'</button>';
    });
    h+='</div></div>';
  }
  h+='<div class="adv-feed" id="advFeed"></div></div>';
  $id('stage').innerHTML=h;
}

/* feedback + fluxo de erro (trava: 1º erro revela; 2º erro re-ensina e libera) */
function correct(){
  var ent=cur.items[cur.idx];
  if(ent.tries===0)cur.perfect++;
  /* nunca avança sozinho — sempre botão (checklist Serafina) */
  var f=$id('advFeed'); if(!f)return;
  f.innerHTML='<div class="adv-good">'+UI.yes+'</div>'
    +'<button class="adv-go" onclick="SERA_ADV.nextChallenge()">'+UI.next+'</button>';
  f.scrollIntoView({behavior:'smooth',block:'end'});
}
function wrong(revealHtml){
  var ent=cur.items[cur.idx];
  ent.tries++; cur.misses++;
  if(ent.tries>=2){
    queueForBoss(ent.src);
    feed(false,revealHtml,true);
  }else{
    feed(false,revealHtml,false);
  }
}
function feed(ok,revealHtml,teach){
  var f=$id('advFeed'); if(!f)return;
  if(ok){ f.innerHTML='<div class="adv-good">'+UI.yes+'</div>'; return; }
  var ph=cur.ph;
  var h='<div class="adv-bad"><div class="adv-badt">'+UI.notYet+'</div>'
    +'<div class="adv-truth">'+revealHtml+'</div>';
  if(teach){
    /* boss não tem lesson — guard obrigatório (QA ti: crash travava a criança) */
    if(ph.lesson){
      h+='<div class="adv-reteach"><div class="adv-rtt">'+ph.icon+' '+UI.remember+'</div>';
      ph.lesson.lines.forEach(function(ln){h+='<div class="adv-lline small"><span>'+ln[0]+'</span><span>'+tr(ln[1],ln[2])+'</span></div>';});
      h+='</div>';
    }
    h+='<button class="adv-go" onclick="SERA_ADV.nextChallenge()">'+UI.keepGoing+'</button>';
  }else{
    h+='<button class="adv-go" onclick="SERA_ADV.retry()">'+UI.retry+'</button>';
  }
  f.innerHTML=h+'</div>';
  f.scrollIntoView({behavior:'smooth',block:'end'});
}
function retry(){ renderChallenge(); }         /* re-render = opções reembaralhadas */

/* ---- mc ---- */
function tapOpt(vi){
  var ent=cur.items[cur.idx], it=ent.src, v=ent.view[vi];
  var btns=document.querySelectorAll('.adv-opt');
  if(it.t==='multi'){
    btns[vi].classList.toggle('sel');
    var cb=$id('advCheck'); if(cb)cb.disabled=!document.querySelector('.adv-opt.sel');
    return;
  }
  if(v.o.ok){ btns[vi].classList.add('good'); disableOpts(); correct(); }
  else{
    btns[vi].classList.add('bad'); disableOpts();
    var right=it.opts.filter(function(o){return o.ok;})[0];
    ent.view.forEach(function(w,wi){ if(w.o.ok)btns[wi].classList.add('good'); });
    wrong(tr(right.en,right.pt));
  }
}
function disableOpts(){document.querySelectorAll('.adv-opt').forEach(function(b){b.onclick=null;});}

/* ---- multi ---- */
function checkMulti(){
  var ent=cur.items[cur.idx], it=ent.src;
  var btns=document.querySelectorAll('.adv-opt'), allRight=true;
  ent.view.forEach(function(v,vi){
    var sel=btns[vi].classList.contains('sel');
    if(v.o.ok)btns[vi].classList.add('good');
    if(sel!==!!v.o.ok)allRight=false;
    if(sel&&!v.o.ok)btns[vi].classList.add('bad');
  });
  disableOpts(); var cb=$id('advCheck'); if(cb)cb.disabled=true;
  if(allRight)correct();
  else{
    var rights=it.opts.filter(function(o){return o.ok;}).map(function(o){return tr(o.en,o.pt);}).join(' + ');
    wrong(rights);
  }
}

/* ---- sort (toca no balde) ---- */
function tapBucket(bid){
  var ent=cur.items[cur.idx], it=ent.src, s=ent.subs[ent.sub];
  var btns=document.querySelectorAll('.adv-bucket');
  if(bid===s.b){
    btns.forEach(function(b){if(b.getAttribute('data-b')===bid)b.classList.add('good');b.onclick=null;});
    ent.sub++;
    if(ent.sub>=ent.subs.length){ correct(); }
    else{ $id('advFeed').innerHTML='<div class="adv-good">'+UI.yes+'</div>'; advTimer=setTimeout(renderChallenge,650); }
  }else{
    btns.forEach(function(b){
      if(b.getAttribute('data-b')===bid)b.classList.add('bad');
      if(b.getAttribute('data-b')===s.b)b.classList.add('good');
      b.onclick=null;
    });
    var right=it.buckets.filter(function(b){return b.id===s.b;})[0];
    ent.sub++;                            /* revela e segue p/ o próximo sub-item */
    var ended=ent.sub>=ent.subs.length;
    var entRef=ent;
    var again=function(){ ended?finishSortAfterMiss(entRef):renderChallenge(); };
    var f=$id('advFeed');
    f.innerHTML='<div class="adv-bad"><div class="adv-badt">💡 '+esc(s.en)+UI.goesIn+'<span class="tr">'+esc(s.pt||s.en)+UI.goesInPt+'</span></div>'
      +'<div class="adv-truth">'+tr(right.en,right.pt)+'</div>'
      +'<button class="adv-go" id="advSortGo">'+UI.next+'</button></div>';
    $id('advSortGo').onclick=again;
    entRef.tries++; cur.misses++;
    if(entRef.tries>=2)queueForBoss(entRef.src);
  }
}
function finishSortAfterMiss(ent){
  if(ent.tries===0)cur.perfect++;          /* nunca chega aqui com 0, defensivo */
  nextChallenge();
}

/* ---- avanço ---- */
function nextChallenge(){
  cur.idx++;
  if(cur.idx<cur.items.length){ renderChallenge(); return; }
  if(cur.ph.boss)phaseCompleteBoss(); else phaseComplete();
}
function phaseComplete(){
  var ph=cur.ph, got=cur.perfect, tot=cur.items.length;
  S.done[ph.id]=true;
  S.stars[ph.id]=Math.max(S.stars[ph.id]||0,got);
  save();
  confetti(28);
  var i=phaseIndex(ph.id), nxt=A.phases[i+1];
  var h='<div class="adv-done" style="--pc:'+(ph.color||'#38bdf8')+'">'
   +'<div class="adv-bigicon">'+ph.icon+'</div>'
   +'<div class="adv-donet">'+UI.phaseDone+'</div>'
   +'<div class="adv-starrow">'+'⭐'.repeat(got)+'☆'.repeat(Math.max(0,tot-got))+'</div>'
   +(ph.anchor?'<button class="adv-anchor" onclick="say(\''+escJs(ph.anchor)+'\')">🔊 '+tr(ph.anchor,ph.anchorPt)+'</button>':'')
   +'<div class="adv-donebtns">'
   +(nxt?'<button class="adv-go" onclick="SERA_ADV.enter(\''+nxt.id+'\')">'+UI.nextPhase+'</button>':'')
   +'<button class="adv-go ghost" onclick="SERA_ADV.showMap()">'+UI.map+'</button>'
   +'</div></div>';
  $id('stage').innerHTML=h;
}

/* ---------- boss ---------- */
function queueForBoss(item){
  var k=itemKey(item);
  if(!S.errQ.some(function(e){return itemKey(e)===k;})) S.errQ.push(item);
  save();
}
function bossPool(ph){
  var pool=[];
  S.errQ.forEach(function(it){pool.push(it);});                     /* fila de erros 1º */
  (ph.from||[]).forEach(function(pid){
    var p=phaseById(pid); if(!p||p.boss)return;
    p.bank.forEach(function(it){pool.push(it);});
  });
  /* dedup por pergunta (chave do item ORIGINAL), mantém ordem (erros na frente) */
  var seen={},out=[];
  pool.forEach(function(it){var k=itemKey(it);if(!seen[k]){seen[k]=1;out.push(it);}});
  var errN=Math.min(S.errQ.length,out.length);
  return out.slice(0,errN).concat(shuffle(out.slice(errN))).slice(0,ph.count||4)
    .map(function(it){return bossVariant(it);});
}
/* formato trocado: sort vira MC ("onde entra X?"); __origQ liga o variante ao
   item original para a fila de erros limpar certo (QA ti 05/07) */
function bossVariant(it){
  if(it.t!=='sort')return it;
  var s=shuffle(it.items)[0];
  return {t:'mc', __origQ:itemKey(it),
    q:'Where does "'+s.en+'" go?', qpt:'Onde entra "'+(s.pt||s.en)+'"?',
    opts:it.buckets.map(function(b){return {en:b.en,pt:b.pt,ok:b.id===s.b};})};
}
function bossIntro(ph){
  cur={ph:ph,items:[],idx:0,misses:0,perfect:0};
  var h='<div class="adv-lesson boss" style="--pc:'+(ph.color||'#f472b6')+'">'
   +mapBtn()
   +'<div class="adv-bigicon">'+ph.icon+'</div>'
   +'<div class="adv-ltitle center">'+tr(ph.name,ph.namePt)+'</div>'
   +'<div class="adv-lline center"><span class="adv-ltxt">'+tr(ph.intro||UI.bossIntro,ph.introPt||UI.bossIntroPt)+'</span></div>'
   +'<button class="adv-go" onclick="SERA_ADV.startBoss()">'+UI.battle+'</button>'
   +'</div>';
  $id('stage').innerHTML=h;
}
function startBoss(){
  var ph=cur.ph;
  cur.items=bossPool(ph).map(function(it){return {src:it,tries:0};});
  cur.idx=0; cur.perfect=0;
  if(!cur.items.length){ phaseCompleteBoss(); return; }
  renderChallenge();
}
function phaseCompleteBoss(){
  var ph=cur.ph;
  S.done[ph.id]=true;
  S.stars[ph.id]=Math.max(S.stars[ph.id]||0,cur.perfect);
  /* itens vencidos saem da fila de erros (compara pela chave do item original) */
  cur.items.forEach(function(ent){
    if(ent.tries===0) S.errQ=S.errQ.filter(function(e){return itemKey(e)!==itemKey(ent.src);});
  });
  save();
  if(ph.final){ celebration(); return; }
  phaseComplete();
}

/* ---------- celebração final (desfile de emblemas + karaokê) ---------- */
var celebIdx=0;
function celebration(){
  confetti(60);
  celebIdx=0;
  renderCeleb();
}
function renderCeleb(){
  var badges=A.phases.filter(function(p){return !p.boss&&p.anchor;});
  var h='<div class="adv-celeb">'
   +'<div class="adv-celebtitle">'+UI.win+'</div>'
   +'<div class="adv-badges">';
  badges.forEach(function(p,i){
    h+='<div class="adv-badge'+(i<celebIdx?' in':i===celebIdx?' now':'')+'" style="--pc:'+(p.color||'#38bdf8')+'" '
      +'onclick="SERA_ADV.celebSay('+i+')">'
      +'<span class="adv-bicon">'+p.icon+'</span><span class="adv-bname">'+tr(p.name,p.namePt)+'</span></div>';
  });
  h+='</div><div class="adv-karaoke" id="advKar"></div>'
   +'<div class="adv-donebtns">'
   +(celebIdx<badges.length
      ?'<button class="adv-go" onclick="SERA_ADV.celebNext()">✨ '+(celebIdx===0?UI.badges1:UI.badgesN)+'<span class="tr">'+(celebIdx===0?UI.badges1Pt:UI.badgesNPt)+'</span></button>'
      :'<button class="adv-go" onclick="SERA_ADV.showMap()">'+UI.backMap+'</button>')
   +'</div></div>';
  $id('stage').innerHTML=h;
}
function celebNext(){
  var badges=A.phases.filter(function(p){return !p.boss&&p.anchor;});
  if(celebIdx<badges.length){
    var p=badges[celebIdx];
    celebIdx++;
    confetti(16);
    renderCeleb();
    karaoke(p.anchor,p.anchorPt);
  }
}
function celebSay(i){
  var badges=A.phases.filter(function(p){return !p.boss&&p.anchor;});
  if(i<celebIdx&&badges[i])karaoke(badges[i].anchor,badges[i].anchorPt);
}

/* karaokê: destaca palavra a palavra via u.onboundary; barra fica
   2500ms após o fim (tempo de ler a última palavra — regra Serafina) */
var karTimer=null;
function karaoke(text,pt){
  stopKaraoke();
  var k=$id('advKar'); if(!k)return;
  var words=text.split(/\s+/);
  k.innerHTML='<div class="adv-karwords">'+words.map(function(w,i){return '<span id="kw'+i+'">'+esc(w)+'</span>';}).join(' ')+'</div>'
    +(pt?'<div class="adv-karpt tr">'+esc(pt)+'</div>':'');
  k.classList.add('show');
  if(!('speechSynthesis' in window))return;
  try{
    speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text);
    u.lang=(window.SERA_CFG_LANG||((window.SERA_CFG||{}).lang)||'en-US'); u.rate=.8;
    u.onboundary=function(ev){
      if(ev.name&&ev.name!=='word')return;
      var upto=text.slice(0,ev.charIndex), wi=upto.trim()?upto.trim().split(/\s+/).length:0;
      for(var i=0;i<words.length;i++){var el=$id('kw'+i);if(el)el.className=i<wi?'don':(i===wi?'hot':'');}
    };
    u.onend=function(){
      for(var i=0;i<words.length;i++){var el=$id('kw'+i);if(el)el.className='don';}
      karTimer=setTimeout(function(){var kk=$id('advKar');if(kk)kk.classList.remove('show');},2500);
    };
    speechSynthesis.speak(u);
  }catch(e){}
}
function stopKaraoke(){
  if(karTimer){clearTimeout(karTimer);karTimer=null;}
  try{if('speechSynthesis' in window)speechSynthesis.cancel();}catch(e){}
}

/* ---------- confetti ---------- */
function confetti(n){
  var cols=['#38bdf8','#fbbf24','#34d399','#f472b6','#a78bfa'];
  for(var i=0;i<(n||30);i++){(function(i){
    var d=document.createElement('div');d.className='adv-confetti';
    d.style.left=(Math.random()*100)+'vw';d.style.background=cols[i%cols.length];
    document.body.appendChild(d);
    var dur=1200+Math.random()*1400,x=(Math.random()-.5)*180;
    if(d.animate)d.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+x+'px,'+(innerHeight+40)+'px) rotate(720deg)',opacity:.9}],{duration:dur,easing:'cubic-bezier(.3,.6,.7,1)'});
    setTimeout(function(){d.remove();},dur);
  })(i);}
}

/* ---------- boot ---------- */
function boot(adv){
  A=adv; load();
  showMap();
}
return {boot:boot,showMap:showMap,enter:enter,startChallenges:startChallenges,
  tapOpt:tapOpt,checkMulti:checkMulti,tapBucket:tapBucket,retry:retry,
  nextChallenge:nextChallenge,startBoss:startBoss,
  celebNext:celebNext,celebSay:celebSay,
  _complete:phaseCompleteBoss};
})();
