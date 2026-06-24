/* ============================================================
   CIE2_THEME.JS — Seletor de tema compartilhado (todas as guias)
   - Temas: Noite, Dia, Castelo, Praia, Natureza (contraste calibrado).
   - Cobre as DUAS convencoes de variaveis usadas no projeto:
       ela-style (--ink/--card/--soft/--line/--accent...) e
       base.css  (--text/--card-bg/--text-soft/--card-border/--surface).
   - Substitui o "BR PT" por uma BANDEIRA DO BRASIL em SVG de verdade.
   - Auto-deteta o botao de tema (#themeBtn ou title Theme/Tema) e o
     botao de bandeira (.flagbtn / #flag / #btnFlag) e religa os cliques.
   - Persiste a escolha em localStorage 'cie2_theme' (igual em todas).
   Drop-in: basta <script src="cie2_theme.js"></script> em cada guia.
   ============================================================ */
(function(){
  var KEY='cie2_theme';

  /* paleta por tema — valores explicitos para garantir contraste */
  var THEMES=[
    { k:'night', name:'Noite', en:'Night', emo:'\u{1F319}', light:false, p:{
        bg:'#0d0b1e', bg2:'#102a3a', ink:'#f0f9ff', soft:'rgba(255,255,255,.62)', dim:'rgba(255,255,255,.42)',
        card:'#13243a', cardSoft:'rgba(255,255,255,.07)', line:'rgba(255,255,255,.14)', surf:'rgba(255,255,255,.05)',
        accent:'#38bdf8', accent2:'#fbbf24', tr:'#fcd34d', ok:'#34d399', no:'#f87171' } },
    { k:'day', name:'Dia', en:'Day', emo:'\u{2600}\u{FE0F}', light:true, p:{
        bg:'#eaf2fb', bg2:'#d6e8fa', ink:'#0c1e33', soft:'rgba(12,30,55,.66)', dim:'rgba(12,30,55,.45)',
        card:'#ffffff', cardSoft:'#ffffff', line:'rgba(12,30,55,.20)', surf:'rgba(12,30,55,.05)',
        accent:'#0e7fc0', accent2:'#b9710a', tr:'#b45309', ok:'#0f9d6b', no:'#dc2626' } },
    { k:'castle', name:'Castelo', en:'Castle', emo:'\u{1F3F0}', light:false, p:{
        bg:'#1a1226', bg2:'#33214d', ink:'#f6ecff', soft:'rgba(246,236,255,.64)', dim:'rgba(246,236,255,.44)',
        card:'#251a3a', cardSoft:'rgba(255,255,255,.08)', line:'rgba(214,188,250,.20)', surf:'rgba(255,255,255,.05)',
        accent:'#c084fc', accent2:'#fbbf24', tr:'#fcd34d', ok:'#34d399', no:'#fb7185' } },
    { k:'beach', name:'Praia', en:'Beach', emo:'\u{1F3D6}\u{FE0F}', light:true, p:{
        bg:'#e8faff', bg2:'#fff3d4', ink:'#0a3a4a', soft:'rgba(10,58,74,.66)', dim:'rgba(10,58,74,.45)',
        card:'#ffffff', cardSoft:'#ffffff', line:'rgba(10,58,74,.20)', surf:'rgba(10,58,74,.05)',
        accent:'#0891b2', accent2:'#e07a14', tr:'#b45309', ok:'#0f9d6b', no:'#dc2626' } },
    { k:'nature', name:'Natureza', en:'Nature', emo:'\u{1F33F}', light:true, p:{
        bg:'#eef8e6', bg2:'#dff0d6', ink:'#143318', soft:'rgba(20,51,24,.66)', dim:'rgba(20,51,24,.45)',
        card:'#ffffff', cardSoft:'#ffffff', line:'rgba(20,51,24,.20)', surf:'rgba(20,51,24,.05)',
        accent:'#2e8b3d', accent2:'#b9710a', tr:'#8a5a12', ok:'#0f9d6b', no:'#dc2626' } }
  ];
  function find(k){ for(var i=0;i<THEMES.length;i++) if(THEMES[i].k===k) return THEMES[i]; return THEMES[0]; }

  /* bandeira do Brasil de verdade (SVG inline) */
  var FLAG='<svg class="brflag" viewBox="0 0 28 20" width="26" height="18" aria-label="Português" role="img">'
    +'<rect width="28" height="20" rx="2.5" fill="#009b3a"/>'
    +'<path d="M14 2.4 L25.4 10 L14 17.6 L2.6 10 Z" fill="#ffdf00"/>'
    +'<circle cx="14" cy="10" r="4.3" fill="#002776"/>'
    +'<path d="M10.1 9.2 A6 6 0 0 1 17.9 9.0" stroke="#fff" stroke-width="1.1" fill="none"/>'
    +'</svg>';

  function apply(k){
    var t=find(k); var p=t.p; var b=document.body, st=b.style;
    /* convencao ela */
    st.setProperty('--bg',p.bg); st.setProperty('--bg2',p.bg2);
    st.setProperty('--ink',p.ink); st.setProperty('--soft',p.soft);
    st.setProperty('--card',p.card); st.setProperty('--line',p.line);
    st.setProperty('--accent',p.accent); st.setProperty('--accent2',p.accent2);
    st.setProperty('--tr',p.tr); st.setProperty('--ok',p.ok); st.setProperty('--no',p.no);
    st.setProperty('--mid',p.accent2);
    /* convencao base.css (mindmap) */
    st.setProperty('--text',p.ink); st.setProperty('--text-soft',p.soft); st.setProperty('--text-dim',p.dim);
    st.setProperty('--card-bg',p.cardSoft); st.setProperty('--card-border',p.line); st.setProperty('--surface',p.surf);
    /* classes de tema claro (cada guia usa uma convencao; ambas sao inofensivas) */
    b.classList.toggle('light',!!t.light);
    b.classList.toggle('theme-light',!!t.light);
    try{localStorage.setItem(KEY,k);}catch(e){}
    var cur=document.getElementById('ctMenu'); if(cur){ cur.querySelectorAll('.ct-chip').forEach(function(c){ c.classList.toggle('on',c.dataset.k===k); }); }
  }

  function buildMenu(){
    if(document.getElementById('ctMenu')) return;
    var ov=document.createElement('div'); ov.className='ct-ov'; ov.id='ctMenu';
    ov.onclick=function(e){ if(e.target===ov) close(); };
    var cur=getCur();
    var chips=THEMES.map(function(t){
      return '<button class="ct-chip'+(t.k===cur?' on':'')+'" data-k="'+t.k+'" onclick="cieTheme.set(\''+t.k+'\')">'
        +'<span class="ct-emo">'+t.emo+'</span><span class="ct-nm">'+t.name+'<small>'+t.en+'</small></span></button>';
    }).join('');
    ov.innerHTML='<div class="ct-panel"><div class="ct-h">\u{1F3A8} Tema / Theme</div>'
      +'<div class="ct-grid">'+chips+'</div>'
      +'<button class="ct-close" onclick="cieTheme.close()">\u{2713} Pronto / Done</button></div>';
    document.body.appendChild(ov);
  }
  function open(){ buildMenu(); document.getElementById('ctMenu').classList.add('show'); }
  function close(){ var m=document.getElementById('ctMenu'); if(m)m.classList.remove('show'); }
  function getCur(){ try{return localStorage.getItem(KEY)||'night';}catch(e){return 'night';} }

  function injectCSS(){
    if(document.getElementById('ct-css')) return;
    var s=document.createElement('style'); s.id='ct-css';
    s.textContent=
     '.brflag{display:block;border-radius:2.5px;box-shadow:0 1px 3px rgba(0,0,0,.35)}'
    +'.flagbtn{padding:0 7px!important}'
    +'.ct-ov{position:fixed;inset:0;z-index:120;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(5,7,18,.72);backdrop-filter:blur(4px)}'
    +'.ct-ov.show{display:flex}'
    +'.ct-panel{width:100%;max-width:380px;background:var(--card,#13243a);border:1px solid var(--line,rgba(255,255,255,.14));border-radius:22px;padding:18px 16px 16px;box-shadow:0 20px 60px rgba(0,0,0,.5)}'
    +'.ct-h{font-weight:900;font-size:1.1rem;text-align:center;margin-bottom:14px;color:var(--ink,var(--text,#f0f9ff))}'
    +'.ct-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}'
    +'.ct-chip{display:flex;align-items:center;gap:10px;padding:12px 12px;border:2px solid var(--line,rgba(255,255,255,.14));border-radius:16px;background:var(--surface,rgba(255,255,255,.05));color:var(--ink,var(--text,#f0f9ff));font-family:inherit;font-weight:900;cursor:pointer;text-align:left;min-height:56px}'
    +'.ct-chip:active{transform:scale(.97)}'
    +'.ct-chip.on{border-color:var(--accent,#38bdf8);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent,#38bdf8) 35%,transparent)}'
    +'.ct-emo{font-size:1.7rem;flex-shrink:0}'
    +'.ct-nm{display:flex;flex-direction:column;line-height:1.05;font-size:.95rem}'
    +'.ct-nm small{font-weight:700;opacity:.6;font-size:.7rem}'
    +'.ct-close{margin-top:14px;width:100%;height:48px;border:none;border-radius:15px;background:linear-gradient(90deg,var(--accent,#38bdf8),var(--accent2,#fbbf24));color:#08263a;font-weight:900;font-size:1rem;cursor:pointer;font-family:inherit}'
    +'.ct-close:active{transform:scale(.98)}';
    document.head.appendChild(s);
  }

  function wire(){
    /* botao de tema: #themeBtn ou qualquer iconbtn com title Theme/Tema */
    var btns=[];
    var t1=document.getElementById('themeBtn'); if(t1) btns.push(t1);
    document.querySelectorAll('button[title]').forEach(function(b){
      var t=(b.getAttribute('title')||'').toLowerCase();
      if((t.indexOf('theme')>-1||t.indexOf('tema')>-1) && btns.indexOf(b)<0) btns.push(b);
    });
    btns.forEach(function(b){ b.onclick=open; b.setAttribute('title','Tema / Theme'); b.innerHTML='\u{1F3A8}'; });
    /* bandeira: troca o conteudo por SVG real, preserva o toggleTr existente */
    document.querySelectorAll('.flagbtn, #flag, #btnFlag').forEach(function(f){
      f.innerHTML=FLAG; f.setAttribute('title','Tradução em português');
    });
  }

  function init(){ injectCSS(); apply(getCur()); wire(); }

  window.cieTheme={ set:function(k){ apply(k); }, open:open, close:close, init:init, apply:apply };
  if(document.readyState!=='loading') init();
  else document.addEventListener('DOMContentLoaded',init);
})();
