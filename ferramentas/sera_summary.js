/* ============================================================
   SERA_SUMMARY.JS — "Ver resumo / gabarito" estruturado
   Compartilhado por CIE2_popit e CIE2_dragdrop (mesmo formato GAMES).
   cieSummary.show(game) onde game = {emo,en,pt,tip,tippt,
     cols:[{id,en,pt,emo,co}], cards:[{en,pt,col}]}.
   Mostra cada categoria com seus itens, organizado e legivel.
   Respeita a bandeira BR (body.show-tr) e o tema (variaveis CSS).
   ============================================================ */
(function(){
  function injectCSS(){
    if(document.getElementById('cs-css'))return;
    var s=document.createElement('style');s.id='cs-css';
    s.textContent=
     '.cs-ov{position:fixed;inset:0;z-index:115;display:none;align-items:flex-start;justify-content:center;padding:18px 12px;overflow:auto;background:rgba(5,7,18,.74);backdrop-filter:blur(4px)}'
    +'.cs-ov.show{display:flex}'
    +'.cs-panel{width:100%;max-width:560px;background:var(--card,#13243a);border:1px solid var(--line,rgba(255,255,255,.14));border-radius:22px;padding:18px 15px 16px;box-shadow:0 20px 60px rgba(0,0,0,.5);margin:auto}'
    +'.cs-top{display:flex;align-items:center;gap:10px;margin-bottom:12px}'
    +'.cs-top .cs-te{font-size:1.8rem}'
    +'.cs-top .cs-tt{flex:1;font-weight:900;font-size:1.12rem;line-height:1.1;color:var(--ink,var(--text,#f0f9ff))}'
    +'.cs-top .cs-tt small{display:block;font-weight:800;font-style:italic;font-size:.78rem;color:var(--tr,#fcd34d)}'
    +'.cs-x{min-width:40px;height:40px;border:none;border-radius:12px;background:var(--line,rgba(255,255,255,.14));color:var(--ink,var(--text,#fff));font-size:1.2rem;font-weight:900;cursor:pointer}'
    +'.cs-col{border:2px solid var(--cc,#38bdf8);border-radius:16px;padding:10px 11px 12px;margin-bottom:11px;background:color-mix(in srgb,var(--cc,#38bdf8) 12%,transparent)}'
    +'.cs-h{display:flex;align-items:center;gap:9px;margin-bottom:8px}'
    +'.cs-h .cs-e{font-size:1.5rem}'
    +'.cs-h .cs-n{font-weight:900;font-size:1.02rem;color:var(--cc,#38bdf8);line-height:1.05}'
    +'.cs-h .cs-n small{display:block;font-weight:800;font-style:italic;font-size:.74rem;opacity:.85;color:var(--tr,#fcd34d)}'
    +'.cs-items{display:flex;flex-direction:column;gap:6px}'
    +'.cs-it{background:var(--surface,rgba(255,255,255,.06));border:1px solid var(--line,rgba(255,255,255,.12));border-radius:11px;padding:8px 11px;font-weight:800;font-size:.92rem;color:var(--ink,var(--text,#f0f9ff));line-height:1.25}'
    +'.cs-it .cs-ptr{display:none;font-style:italic;font-weight:700;font-size:.78rem;color:var(--tr,#fcd34d);margin-top:2px}'
    +'body.show-tr .cs-it .cs-ptr{display:block}'
    +'.cs-tip{margin-top:4px;padding:10px 12px;border-radius:13px;background:color-mix(in srgb,var(--accent,#38bdf8) 12%,transparent);border:1px solid var(--accent,#38bdf8);font-weight:800;font-size:.9rem;line-height:1.35;color:var(--ink,var(--text,#f0f9ff))}'
    +'.cs-tip .lab{display:block;font-size:.62rem;letter-spacing:1px;text-transform:uppercase;color:var(--accent,#38bdf8);margin-bottom:3px}'
    +'.cs-tip .cs-ptr{display:none;font-style:italic;font-weight:700;font-size:.8rem;color:var(--tr,#fcd34d);margin-top:4px}'
    +'body.show-tr .cs-tip .cs-ptr{display:block}';
    document.head.appendChild(s);
  }
  function esc(s){return String(s).replace(/</g,'&lt;');}
  function show(game){
    if(!game)return; injectCSS();
    var ov=document.getElementById('cs-ov');
    if(!ov){ ov=document.createElement('div');ov.className='cs-ov';ov.id='cs-ov';
      ov.onclick=function(e){ if(e.target===ov) hide(); };
      document.body.appendChild(ov); }
    var html='<div class="cs-panel"><div class="cs-top"><span class="cs-te">'+(game.emo||'\u{1F4CB}')+'</span>'
      +'<span class="cs-tt">'+esc(game.en||'Summary')+'<small>'+esc(game.pt||'')+'</small></span>'
      +'<button class="cs-x" onclick="cieSummary.hide()" aria-label="Fechar">\u{2715}</button></div>';
    (game.cols||[]).forEach(function(c){
      var items=(game.cards||[]).filter(function(card){return card.col===c.id;});
      html+='<div class="cs-col" style="--cc:'+(c.co||'#38bdf8')+'">'
        +'<div class="cs-h"><span class="cs-e">'+(c.emo||'')+'</span>'
        +'<span class="cs-n">'+esc(c.en)+'<small>'+esc(c.pt||'')+'</small></span></div>'
        +'<div class="cs-items">'
        +items.map(function(it){return '<div class="cs-it">'+esc(it.en)+'<div class="cs-ptr">'+esc(it.pt||'')+'</div></div>';}).join('')
        +'</div></div>';
    });
    if(game.tip){ html+='<div class="cs-tip"><span class="lab">\u{1F4A1} Remember</span>'+game.tip
      +(game.tippt?'<div class="cs-ptr">'+game.tippt+'</div>':'')+'</div>'; }
    html+='</div>';
    ov.innerHTML=html; ov.classList.add('show');
  }
  function hide(){ var ov=document.getElementById('cs-ov'); if(ov)ov.classList.remove('show'); }
  window.cieSummary={ show:show, hide:hide };
})();
