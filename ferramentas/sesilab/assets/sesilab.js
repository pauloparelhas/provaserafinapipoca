/* ============================================================
   SESILAB ENGINE — enciclopédia prática gamificada
   Uso por página de capítulo:
     <link rel="stylesheet" href="assets/sesilab.css">
     <script type="module">import * as T from './assets/three.module.js';window.SESILAB_THREE=T;</script>
     <script src="assets/sesilab.js"></script>
     <script>SESILAB.boot(CHAPTER)</script>
   ============================================================ */
(function(){
const S = window.SESILAB = {};
const THREE = ()=>window.SESILAB_THREE||null;

/* Cor de TEXTO theme-aware: mapeia hexes da paleta escura para var(--token),
   que troca de cor no tema claro (evita texto claro sobre fundo claro).
   Usar só para COR DE TEXTO; preenchimentos de barra/arco/swatch mantêm o hex cheio. */
const _INK={'#4fd1ff':'var(--accent)','#7c8cff':'var(--accent2)','#ffce5a':'var(--gold)','#5fe39b':'var(--green)','#ff6b7d':'var(--red)','#b58cff':'var(--violet)','#ff9a5b':'var(--orange)','#fff':'var(--txt)','#ffffff':'var(--txt)'};
function varColor(c){return (c&&_INK[(''+c).trim().toLowerCase()])||c;}
/* Normalizador em runtime: remapeia QUALQUER cor de TEXTO inline da paleta escura
   (inclusive a injetada por concatenação JS no conteúdo do capítulo) para var(--token),
   que troca de cor por tema. Pega o que varColor() não vê (HTML autorado via innerHTML). */
const _INKRGB={'rgb(79, 209, 255)':'var(--accent)','rgb(124, 140, 255)':'var(--accent2)','rgb(255, 206, 90)':'var(--gold)','rgb(95, 227, 155)':'var(--green)','rgb(255, 107, 125)':'var(--red)','rgb(181, 140, 255)':'var(--violet)','rgb(255, 154, 91)':'var(--orange)'};
function _lum(c){const m=(''+c).match(/(\d+(?:\.\d+)?)/g);if(!m)return 1;const a=m.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});return .2126*a[0]+.7152*a[1]+.0722*a[2];}
function _bgLight(el){let e=el;for(let k=0;k<5&&e;k++){const cs=getComputedStyle(e);if(cs.backgroundImage&&cs.backgroundImage!=='none')return true;const m=(cs.backgroundColor||'').match(/[\d.]+/g);if(m&&(m[3]===undefined||+m[3]>0.6))return _lum(cs.backgroundColor)>0.5;e=e.parentElement;}return true;}
function _darken(c){const m=(''+c).match(/(\d+(?:\.\d+)?)/g);if(!m)return c;let r=+m[0]/255,g=+m[1]/255,b=+m[2]/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0;}else{const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6;}l=Math.min(l,.36);s=Math.max(s,.5);const hue=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;return 'rgb('+Math.round(hue(p,q,h+1/3)*255)+', '+Math.round(hue(p,q,h)*255)+', '+Math.round(hue(p,q,h-1/3)*255)+')';}
/* Conhece a paleta-marca -> var (auto-adapta). Cor clara desconhecida em tema claro
   sobre fundo claro -> escurece preservando o matiz (HSL). Restaura no tema escuro.
   data-ink-orig guarda a cor original p/ o toggle. */
function normalizeInk(root){try{if(!root||!root.querySelectorAll)return;const light=document.documentElement.getAttribute('data-theme')==='light';root.querySelectorAll('[style]').forEach(el=>{if(!el.style.color)return;let orig=el.dataset.inkOrig;if(orig===undefined){orig=el.style.color;el.dataset.inkOrig=orig;}const v=_INKRGB[orig];if(v){el.style.color=v;return;}if(light&&_lum(orig)>0.5&&_bgLight(el))el.style.color=_darken(orig);else el.style.color=orig;});}catch(e){}}

/* ---------- tiny DOM helper ---------- */
function el(tag, props, kids){
  const n=document.createElement(tag);
  if(props) for(const k in props){
    if(k==='class')n.className=props[k];
    else if(k==='html')n.innerHTML=props[k];
    else if(k==='text')n.textContent=props[k];
    else if(k==='style'&&typeof props[k]==='object')Object.assign(n.style,props[k]);
    else if(k.startsWith('on')&&typeof props[k]==='function')n.addEventListener(k.slice(2),props[k]);
    else if(props[k]!=null)n.setAttribute(k,props[k]);
  }
  if(kids!=null){(Array.isArray(kids)?kids:[kids]).forEach(c=>{if(c==null)return;n.appendChild(typeof c==='string'?document.createTextNode(c):c);});}
  return n;
}
S.el=el;

/* ---------- state ---------- */
let CH=null, curMod=0, ZOOM=1;
const FIGS={}; // id -> {src, caption}
function pkey(){return 'sesilab_'+(CH?CH.id:'x');}
function loadProg(){try{return JSON.parse(localStorage.getItem(pkey()))||{}}catch(e){return{}}}
function saveProg(p){try{localStorage.setItem(pkey(),JSON.stringify(p))}catch(e){}}

/* ============================================================
   BOOT
   ============================================================ */
S.boot=function(chapter){
  CH=chapter;
  document.title='SESILAB · '+chapter.title;
  (chapter.figures||[]).forEach(f=>FIGS[f.id]={src:f.src,caption:f.caption});
  buildShell();
  ZOOM=parseFloat(localStorage.getItem('sesilab_zoom')||'1')||1;
  applyZoom();
  setTheme(localStorage.getItem('sesilab_theme')||'dark');
  const start = location.hash? Math.max(0,chapter.modules.findIndex(m=>m.id===location.hash.slice(1))):0;
  goMod(start<0?0:start);
};

function buildShell(){
  const app=el('div',{id:'app'});
  /* sidebar */
  const side=el('nav',{id:'side'});
  const brand=el('div',{class:'brand',onclick:()=>location.href='index.html'},
    el('div',{class:'logo',html:'<svg viewBox="0 0 24 24" fill="none"><path d="M9 3v5l-5 9a2 2 0 002 3h12a2 2 0 002-3l-5-9V3" stroke="#7fe0ff" stroke-width="1.6" stroke-linecap="round"/><circle cx="10.5" cy="15" r="1" fill="#b58cff"/><circle cx="13.5" cy="17.5" r="1.3" fill="#5fe39b"/></svg>'}));
  brand.appendChild(el('div',{},[el('b',{text:'SESILAB'}),el('small',{text:'Laboratório de Meteorologia'})]));
  side.appendChild(brand);
  side.appendChild(el('div',{class:'backlink',onclick:()=>location.href='index.html'},'‹ Voltar ao sumário'));
  side.appendChild(el('div',{class:'navlabel',text:'Capítulo '+CH.n}));
  const navWrap=el('div',{id:'navItems'});side.appendChild(navWrap);
  const prog=el('div',{class:'progwrap'},[el('div',{class:'progbar'},el('i',{id:'progFill'})),el('span',{id:'progTxt',text:'0% explorado'})]);
  side.appendChild(prog);

  /* main */
  const main=el('main',{id:'main'});
  const top=el('header',{id:'topbar'});
  top.appendChild(el('button',{id:'menuBtn',class:'menu-toggle',title:'Capítulos',html:'☰',onclick:toggleSide}));
  top.appendChild(el('div',{},[el('div',{class:'crumb',id:'crumb'}),el('h1',{id:'title',text:CH.title})]));
  const sp=el('div',{class:'spacer'});top.appendChild(sp);
  const zc=el('div',{class:'zoomctl'});
  zc.appendChild(el('button',{title:'Diminuir (Ctrl -)',text:'−',onclick:()=>setZoom(ZOOM-0.1)}));
  zc.appendChild(el('span',{id:'zoomLbl',text:'100%'}));
  zc.appendChild(el('button',{title:'Aumentar (Ctrl +)',text:'+',onclick:()=>setZoom(ZOOM+0.1)}));
  zc.appendChild(el('button',{title:'Restaurar',text:'⟳',style:{fontSize:'13px'},onclick:()=>setZoom(1)}));
  zc.appendChild(el('button',{id:'themeBtn',title:'Tema claro/escuro',text:'☾',onclick:toggleTheme}));
  top.appendChild(zc);
  const nb=el('div',{class:'navbtns'});
  nb.appendChild(el('button',{class:'nbtn sm',id:'prevBtn',text:'‹',onclick:()=>goMod(curMod-1)}));
  nb.appendChild(el('button',{class:'nbtn sm primary',id:'nextBtn',text:'›',onclick:()=>goMod(curMod+1)}));
  top.appendChild(nb);
  main.appendChild(top);
  const sw=el('div',{id:'stagewrap'});sw.appendChild(el('div',{id:'stage'}));main.appendChild(sw);

  app.appendChild(side);app.appendChild(main);
  document.body.innerHTML='';document.body.appendChild(app);
  document.body.appendChild(el('div',{id:'sideBackdrop',onclick:closeSide}));
  document.body.appendChild(el('div',{id:'modal',onclick:e=>{if(e.target.id==='modal')closeModal()}},
    el('div',{class:'modal-card'},[
      el('span',{class:'mx',html:'✕',onclick:closeModal}),
      el('div',{class:'mzoom'},[el('button',{text:'+',onclick:()=>mZoom(0.25)}),el('button',{text:'−',onclick:()=>mZoom(-0.25)})]),
      el('div',{class:'imgwrap'},el('img',{id:'modalImg'})),
      el('div',{class:'cap',id:'modalCap'})])));
  document.body.appendChild(el('div',{id:'tip'}));

  buildNav();
  /* zoom via ctrl+wheel */
  window.addEventListener('wheel',e=>{if(e.ctrlKey){e.preventDefault();setZoom(ZOOM+(e.deltaY<0?0.08:-0.08));}},{passive:false});
  window.addEventListener('keydown',e=>{
    if(e.ctrlKey&&(e.key==='='||e.key==='+')){e.preventDefault();setZoom(ZOOM+0.1);}
    if(e.ctrlKey&&e.key==='-'){e.preventDefault();setZoom(ZOOM-0.1);}
    if(e.ctrlKey&&e.key==='0'){e.preventDefault();setZoom(1);}
    if(e.key==='ArrowRight'&&!inField(e))goMod(curMod+1);
    if(e.key==='ArrowLeft'&&!inField(e))goMod(curMod-1);
  });
}
function inField(e){const t=e.target.tagName;return t==='INPUT'||t==='TEXTAREA';}

function buildNav(){
  const w=document.getElementById('navItems');w.innerHTML='';
  const prog=loadProg();
  CH.modules.forEach((m,i)=>{
    const it=el('div',{class:'navitem'+(m.sub?' sub':'')+(prog[m.id]?' done':'')+(i===curMod?' active':''),onclick:()=>goMod(i)});
    it.appendChild(el('span',{class:'ic',text:m.icon||'▹'}));
    it.appendChild(document.createTextNode(' '+m.nav+' '));
    if(!m.sub)it.appendChild(el('span',{class:'dot'}));
    it.dataset.i=i;w.appendChild(it);
  });
  updateProgress();
}
function updateProgress(){
  const prog=loadProg();const tot=CH.modules.length;
  const done=CH.modules.filter(m=>prog[m.id]).length;
  const pct=Math.round(done/tot*100);
  const f=document.getElementById('progFill'),t=document.getElementById('progTxt');
  if(f)f.style.width=pct+'%';if(t)t.textContent=pct+'% explorado';
}

/* ---------- zoom ---------- */
function setZoom(z){ZOOM=Math.max(0.6,Math.min(1.8,Math.round(z*100)/100));applyZoom();localStorage.setItem('sesilab_zoom',ZOOM);}
function applyZoom(){document.documentElement.style.setProperty('--ui-zoom',ZOOM);const l=document.getElementById('zoomLbl');if(l)l.textContent=Math.round(ZOOM*100)+'%';}
S.setTheme=setTheme;
function setTheme(t){var r=document.documentElement;if(t==='light')r.setAttribute('data-theme','light');else r.removeAttribute('data-theme');try{localStorage.setItem('sesilab_theme',t)}catch(e){}var b=document.getElementById('themeBtn');if(b)b.textContent=t==='light'?'☀':'☾';var sg=document.getElementById('stage');if(sg)normalizeInk(sg);}
function toggleTheme(){setTheme(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light');}
/* ---------- mobile drawer ---------- */
function toggleSide(){var s=document.getElementById('side'),b=document.getElementById('sideBackdrop');if(s)s.classList.toggle('open');if(b)b.classList.toggle('show');}
function closeSide(){var s=document.getElementById('side'),b=document.getElementById('sideBackdrop');if(s)s.classList.remove('open');if(b)b.classList.remove('show');}


/* ---------- navigate modules ---------- */
function goMod(i){
  if(i<0||i>=CH.modules.length)return;
  closeSide();
  curMod=i;const m=CH.modules[i];
  location.hash=m.id;
  document.getElementById('crumb').textContent=(m.crumb||('Módulo · '+CH.title));
  document.getElementById('title').textContent=m.title||m.nav;
  document.getElementById('prevBtn').disabled=i<=0;
  const nx=document.getElementById('nextBtn');nx.disabled=i>=CH.modules.length-1;
  document.querySelectorAll('#navItems .navitem').forEach((n,k)=>n.classList.toggle('active',k===i));
  const prog=loadProg();prog[m.id]=1;saveProg(prog);
  document.querySelectorAll('#navItems .navitem')[i].classList.add('done');
  updateProgress();
  const stage=document.getElementById('stage');stage.innerHTML='';
  const view=el('div',{class:'view'});stage.appendChild(view);
  if(m.lead)view.appendChild(el('p',{class:'lead',html:m.lead}));
  if(typeof m.mount==='function'){m.mount(view,S);}
  else renderBlocks(view,m.blocks||[]);
  document.getElementById('stagewrap').scrollTop=0;
  bindTerms(view);
  normalizeInk(view);setTimeout(()=>normalizeInk(view),60);
}
S.goMod=goMod;

/* ============================================================
   BLOCK RENDERER
   ============================================================ */
function renderBlocks(container,blocks){
  (blocks||[]).forEach(b=>{
    if(!b)return;
    if(typeof b==='string'){container.appendChild(el('p',{class:'prose',html:b}));return;}
    const fn=BLOCKS[b.type];
    if(!fn){container.appendChild(el('div',{class:'callout red',html:'bloco desconhecido: '+b.type}));return;}
    let r;try{r=fn(b);}catch(err){container.appendChild(el('div',{class:'callout red',html:'erro no bloco '+b.type+': '+(err&&err.message)}));return;}
    const node=r&&r.node?r.node:r;
    if(node){container.appendChild(node);if(r&&typeof r.mount==='function'){try{r.mount(node);}catch(err){node.appendChild(el('div',{class:'callout red',html:'erro ao montar '+b.type+': '+(err&&err.message)}));}}}
  });
  normalizeInk(container);
}
S.renderBlocks=renderBlocks;

const BLOCKS={};
S.block=(t,fn)=>BLOCKS[t]=fn;

/* --- layout --- */
BLOCKS.divider=b=>el('div',{class:'divtxt',text:b.text});
BLOCKS.grid=b=>{
  const g=el('div',{class:'grid2'+(b.variant?' '+b.variant:'')});
  (b.cols||[]).forEach(col=>{const c=el('div',{class:'col'});renderBlocks(c,col);g.appendChild(c);});
  return g;
};
BLOCKS.card=b=>{
  const c=el('div',{class:'card'});
  if(b.title){const h=el('h3',{},[b.icon?b.icon+' ':null,b.title]);if(b.tag)h.appendChild(el('span',{class:'tag',text:b.tag}));c.appendChild(h);}
  renderBlocks(c,b.blocks||[]);
  return c;
};
BLOCKS.text=b=>el('div',{class:'prose',html:b.html});
BLOCKS.prose=BLOCKS.text;
BLOCKS.callout=b=>el('div',{class:'callout '+(b.tone||'blue')},[
  el('span',{class:'ci',text:b.icon||'💡'}),
  el('div',{html:(b.label?'<span class="lbl">'+b.label+'</span>':'')+b.html})]);
BLOCKS.kpis=b=>{
  const k=el('div',{class:'kpi'});
  b.items.forEach(it=>k.appendChild(el('div',{class:'k '+(it.tone||'a')},[el('small',{text:it.label}),el('b',{text:it.value})])));
  return k;
};
BLOCKS.table=b=>{
  const t=el('table',{class:'gtab'});
  if(b.headers){const tr=el('tr');b.headers.forEach(h=>tr.appendChild(el('th',{html:h})));t.appendChild(el('thead',{},tr));}
  const tb=el('tbody');
  b.rows.forEach(r=>{const tr=el('tr',{class:r.hi?'hi':''});(r.cells||r).forEach(c=>tr.appendChild(el('td',{html:c})));tb.appendChild(tr);});
  t.appendChild(tb);return t;
};
BLOCKS.compare=b=>{
  const wrap=el('div',{class:'cmp',style:{gridTemplateColumns:'repeat('+b.cols.length+',1fr)'}});
  b.cols.forEach(col=>{
    const c=el('div',{class:'cmp-col'});
    c.appendChild(el('h4',{html:(col.icon?col.icon+' ':'')+col.title,style:col.color?{color:varColor(col.color)}:null}));
    const ul=el('ul');col.items.forEach(it=>ul.appendChild(el('li',{html:it})));c.appendChild(ul);
    wrap.appendChild(c);
  });
  return wrap;
};

/* --- figure with optional hotspots --- */
BLOCKS.figure=b=>{
  const fig=FIGS[b.id]||{src:b.src,caption:b.caption};
  const box=el('div',{class:'figbox'});
  const im=el('div',{class:'fimg',onclick:()=>openFig(fig.src,fig.caption)});
  const img=el('img',{src:fig.src,alt:b.id||''});im.appendChild(img);
  box.appendChild(im);
  if(b.caption||fig.caption)box.appendChild(el('div',{class:'fcap',html:b.caption||fig.caption}));
  const mount=()=>{
    (b.hotspots||[]).forEach(h=>{
      const hs=el('div',{class:'hotspot',text:h.k||'?',style:{left:h.x+'%',top:h.y+'%'},
        onclick:e=>{e.stopPropagation();openFig(fig.src,(fig.caption||'')+'<br><br><b>'+(h.k||'')+'.</b> '+h.txt);}});
      im.appendChild(hs);
    });
  };
  return {node:box,mount};
};

/* --- donut chart --- */
BLOCKS.donut=b=>{
  const box=el('div',{});
  const row=el('div',{style:{display:'flex',gap:'18px',alignItems:'center',flexWrap:'wrap',justifyContent:'center'}});
  const NS='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 220 220');svg.setAttribute('width','220');svg.setAttribute('height','220');
  const info=el('div',{class:'callout blue',style:{flex:'1',minWidth:'220px',marginTop:'0',minHeight:'120px'}});
  row.appendChild(svg);row.appendChild(info);box.appendChild(row);
  const mount=()=>{
    const data=b.data, tot=data.reduce((s,d)=>s+d.value,0);let ang=-90;const cx=110,cy=110,r=80,rin=46;
    const P=(a,rr)=>[cx+rr*Math.cos(a*Math.PI/180),cy+rr*Math.sin(a*Math.PI/180)];
    function arc(a0,a1){const[x0,y0]=P(a0,r),[x1,y1]=P(a1,r),[X0,Y0]=P(a1,rin),[X1,Y1]=P(a0,rin);const big=a1-a0>180?1:0;
      return `M${x0} ${y0} A${r} ${r} 0 ${big} 1 ${x1} ${y1} L${X0} ${Y0} A${rin} ${rin} 0 ${big} 0 ${X1} ${Y1} Z`;}
    function show(d,p){info.innerHTML=`<div><b style="font-size:15px">${d.label}</b> ${d.badge||''}<br><span style="font-size:19px;color:${varColor(d.color)};font-weight:800">${d.show||d.value+'%'}</span><br><span style="display:block;margin-top:6px;color:var(--txt-dim)">${d.desc||''}</span></div>`;
      svg.querySelectorAll('path').forEach(pp=>pp.setAttribute('opacity',p?(pp===p?'1':'.35'):'1'));}
    data.forEach((d)=>{const sweep=Math.max(d.value/tot*360,1.4);const path=document.createElementNS(NS,'path');
      path.setAttribute('d',arc(ang,ang+sweep));path.setAttribute('fill',d.color);path.setAttribute('stroke','#0a1426');path.setAttribute('stroke-width','2');
      path.style.cursor='pointer';path.style.transition='opacity .2s';
      path.onmouseenter=()=>show(d,path);path.onclick=()=>show(d,path);svg.appendChild(path);ang+=sweep;});
    const t1=document.createElementNS(NS,'text');t1.setAttribute('x',cx);t1.setAttribute('y',cy-3);t1.setAttribute('text-anchor','middle');t1.style.fill='var(--chart-ink)';t1.setAttribute('font-size','15');t1.setAttribute('font-weight','800');t1.textContent=b.center||'';svg.appendChild(t1);
    if(b.centerSub){const t2=document.createElementNS(NS,'text');t2.setAttribute('x',cx);t2.setAttribute('y',cy+13);t2.setAttribute('text-anchor','middle');t2.style.fill='var(--txt-faint)';t2.setAttribute('font-size','9');t2.textContent=b.centerSub;svg.appendChild(t2);}
    show(data[0]);
  };
  return {node:box,mount};
};

/* --- animated bars --- */
BLOCKS.bars=b=>{
  const box=el('div',{});
  const mount=()=>{
    box.innerHTML=b.data.map(d=>`<div style="margin:10px 0">
      <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px"><span>${d.label}</span><span style="color:${varColor(d.color)};font-weight:700">${d.value}%</span></div>
      <div style="height:14px;border-radius:8px;background:rgba(120,160,220,.12);overflow:hidden"><i style="display:block;height:100%;width:0;background:${d.color};border-radius:8px;transition:width .8s ease;box-shadow:0 0 10px ${d.color}66"></i></div></div>`).join('');
    requestAnimationFrame(()=>box.querySelectorAll('i').forEach((i,k)=>i.style.width=b.data[k].value+'%'));
  };
  return {node:box,mount};
};

/* --- timeline (scrub stages, animated comp bars) --- */
BLOCKS.timeline=b=>{
  const box=el('div',{class:'card'});
  box.appendChild(el('h3',{html:(b.icon||'🕰️')+' '+(b.title||'Linha do tempo')+(b.tag?'<span class="tag">'+b.tag+'</span>':'')}));
  const dots=el('div',{style:{display:'flex',justifyContent:'space-between',margin:'12px 4px 2px'}});box.appendChild(dots);
  const sl=el('input',{type:'range',min:'0',max:String(b.stages.length-1),value:'0',step:'1',class:'slider'});box.appendChild(sl);
  const ctr=el('div',{style:{display:'flex',gap:'8px',marginTop:'8px'}});
  const prev=el('button',{class:'nbtn sm',text:'‹'}),play=el('button',{class:'nbtn sm primary',style:{flex:'1'},text:'▶ Reproduzir'}),next=el('button',{class:'nbtn sm',text:'›'});
  ctr.appendChild(prev);ctr.appendChild(play);ctr.appendChild(next);box.appendChild(ctr);
  const title=el('h3',{style:{marginTop:'18px',fontSize:'17px'}});box.appendChild(title);
  const time=el('div',{class:'badge',style:{background:'rgba(79,209,255,.16)',color:'var(--accent)'}});box.appendChild(time);
  const txt=el('p',{style:{marginTop:'10px'}});box.appendChild(txt);
  const bars=el('div',{style:{marginTop:'14px'}});box.appendChild(bars);
  const extra=el('div',{});box.appendChild(extra);
  const mount=()=>{
    dots.innerHTML=b.stages.map((s,i)=>`<span style="font-size:10px;color:var(--txt-faint)">${i+1}</span>`).join('');
    let playing=null;
    function render(i){const s=b.stages[i];title.textContent=s.t;time.textContent=s.time||'';txt.innerHTML=s.txt;
      bars.innerHTML=s.comp.map(c=>`<div style="margin:9px 0"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>${c[0]}</span><span style="color:${varColor(c[2])};font-weight:700">${c[1]}%</span></div><div style="height:13px;border-radius:8px;background:rgba(120,160,220,.12);overflow:hidden"><i style="display:block;height:100%;width:0;background:${c[2]};border-radius:8px;transition:width .7s ease;box-shadow:0 0 10px ${c[2]}66"></i></div></div>`).join('');
      requestAnimationFrame(()=>bars.querySelectorAll('i').forEach((bi,k)=>bi.style.width=s.comp[k][1]+'%'));
      extra.innerHTML=s.extra?'<div class="callout green" style="margin-top:14px">'+s.extra+'</div>':'';}
    sl.oninput=()=>render(+sl.value);
    prev.onclick=()=>{sl.value=Math.max(0,+sl.value-1);render(+sl.value);};
    next.onclick=()=>{sl.value=Math.min(b.stages.length-1,+sl.value+1);render(+sl.value);};
    play.onclick=function(){if(playing){clearInterval(playing);playing=null;this.textContent='▶ Reproduzir';return;}this.textContent='⏸ Pausar';
      playing=setInterval(()=>{let n=+sl.value+1;if(n>=b.stages.length){clearInterval(playing);playing=null;play.textContent='▶ Reproduzir';return;}sl.value=n;render(n);},2300);};
    render(0);
  };
  return {node:box,mount};
};

/* --- tabs --- */
BLOCKS.tabs=b=>{
  const box=el('div',{});
  const bar=el('div',{style:{margin:'2px 0 14px'}});box.appendChild(bar);
  const body=el('div',{});box.appendChild(body);
  const mount=()=>{
    b.tabs.forEach((t,i)=>{const c=el('span',{class:'chip'+(i===0?' on':''),html:(t.icon?t.icon+' ':'')+t.label});
      c.onclick=()=>{bar.querySelectorAll('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');body.innerHTML='';renderBlocks(body,t.blocks);bindTerms(body);};
      bar.appendChild(c);});
    renderBlocks(body,b.tabs[0].blocks);bindTerms(body);
  };
  return {node:box,mount};
};

/* --- process stepper (passo a passo animado) --- */
BLOCKS.process=b=>{
  const box=el('div',{class:'card'});
  box.appendChild(el('h3',{html:(b.icon||'🎬')+' '+(b.title||'Passo a passo')+'<span class="tag">'+(b.tag||b.steps.length+' passos')+'</span>'}));
  if(b.lead)box.appendChild(el('p',{html:b.lead}));
  const nav=el('div',{class:'steps-nav'});box.appendChild(nav);
  const stageBox=el('div',{class:'stage-box',style:{minHeight:(b.height||260)+'px',padding:'0'}});box.appendChild(stageBox);
  const cv=el('canvas',{class:'dia',width:String(b.w||640),height:String(b.height||260)});stageBox.appendChild(cv);
  const desc=el('div',{class:'callout blue',style:{marginTop:'14px'}});box.appendChild(desc);
  const ctr=el('div',{style:{display:'flex',gap:'8px',marginTop:'10px'}});
  const prev=el('button',{class:'nbtn sm',text:'‹ Anterior'}),auto=el('button',{class:'nbtn sm primary',style:{flex:'1'},text:'▶ Animar sequência'}),next=el('button',{class:'nbtn sm',text:'Próximo ›'});
  ctr.appendChild(prev);ctr.appendChild(auto);ctr.appendChild(next);box.appendChild(ctr);
  const mount=()=>{
    const ctx=cv.getContext('2d');let cur=0,timer=null,t0=0,raf=null;
    b.steps.forEach((s,i)=>{const p=el('div',{class:'step-pill',html:(i+1)+'. '+s.tab});p.onclick=()=>set(i);nav.appendChild(p);});
    function paint(prog){ctx.clearRect(0,0,cv.width,cv.height);if(b.bg)b.bg(ctx,cv);b.steps[cur].draw&&b.steps[cur].draw(ctx,cv,prog==null?1:prog,S);}
    function animateStep(){cancelAnimationFrame(raf);t0=performance.now();
      (function loop(now){const p=Math.min(1,(now-t0)/(b.dur||900));paint(p);if(p<1)raf=requestAnimationFrame(loop);})(t0);}
    function set(i){cur=Math.max(0,Math.min(b.steps.length-1,i));
      nav.querySelectorAll('.step-pill').forEach((p,k)=>{p.classList.toggle('on',k===cur);if(k<cur)p.classList.add('done');});
      desc.innerHTML='<span class="ci">'+(b.steps[cur].icon||'▸')+'</span><div><span class="lbl">Passo '+(cur+1)+'</span>'+b.steps[cur].txt+'</div>';
      animateStep();prev.disabled=cur===0;next.disabled=cur===b.steps.length-1;}
    prev.onclick=()=>set(cur-1);next.onclick=()=>set(cur+1);
    auto.onclick=function(){if(timer){clearInterval(timer);timer=null;this.textContent='▶ Animar sequência';return;}this.textContent='⏸ Pausar';
      if(cur>=b.steps.length-1)set(0);timer=setInterval(()=>{if(cur>=b.steps.length-1){clearInterval(timer);timer=null;auto.textContent='▶ Animar sequência';return;}set(cur+1);},(b.dur||900)+900);};
    set(0);
  };
  return {node:box,mount};
};

/* --- reveal flip cards --- */
BLOCKS.reveal=b=>{
  const box=el('div',{});
  if(b.title)box.appendChild(el('h3',{class:'',style:{fontSize:'15px',marginBottom:'12px'},html:(b.icon||'🃏')+' '+b.title}));
  const grid=el('div',{class:'reveal-grid'});box.appendChild(grid);
  const mount=()=>{
    b.cards.forEach(c=>{
      const card=el('div',{class:'rcard'});
      card.innerHTML=`<div class="inner"><div class="face front"><b>${c.front}</b><small>${c.hint||'clique para revelar'}</small></div><div class="face back">${c.back}</div></div>`;
      card.onclick=()=>card.classList.toggle('flip');grid.appendChild(card);
    });
  };
  return {node:box,mount};
};

/* --- concept map (SVG) --- */
BLOCKS.conceptmap=b=>{
  const box=el('div',{class:'card'});
  box.appendChild(el('h3',{html:(b.icon||'🧭')+' '+(b.title||'Mapa do capítulo')+'<span class="tag">explore</span>'}));
  const NS='http://www.w3.org/2000/svg';
  const W=b.w||760,H=b.h||440;
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('class','cmap');
  box.appendChild(svg);
  const info=el('div',{class:'callout blue',style:{marginTop:'12px',minHeight:'56px'}});box.appendChild(info);
  const mount=()=>{
    (b.links||[]).forEach(([a,c])=>{const na=b.nodes[a],nc=b.nodes[c];const ln=document.createElementNS(NS,'line');
      ln.setAttribute('x1',na.x);ln.setAttribute('y1',na.y);ln.setAttribute('x2',nc.x);ln.setAttribute('y2',nc.y);
      ln.setAttribute('stroke','rgba(120,160,220,.3)');ln.setAttribute('stroke-width','1.5');svg.appendChild(ln);});
    b.nodes.forEach((n)=>{
      const g=document.createElementNS(NS,'g');g.style.cursor='pointer';
      const rw=n.w||(n.root?150:118),rh=n.root?44:34;
      const rect=document.createElementNS(NS,'rect');rect.setAttribute('x',n.x-rw/2);rect.setAttribute('y',n.y-rh/2);rect.setAttribute('width',rw);rect.setAttribute('height',rh);rect.setAttribute('rx',12);
      rect.style.fill=n.root?'var(--cmap-root)':'var(--cmap-node)';rect.setAttribute('stroke',n.color||(n.root?'#4fd1ff':'var(--stroke2)'));rect.setAttribute('stroke-width',n.root?'2':'1.3');
      const tx=document.createElementNS(NS,'text');tx.setAttribute('x',n.x);tx.setAttribute('y',n.y+4);tx.setAttribute('text-anchor','middle');tx.style.fill='var(--chart-ink)';tx.setAttribute('font-size',n.root?'14':'12');tx.setAttribute('font-weight',n.root?'800':'600');tx.textContent=n.label;
      g.appendChild(rect);g.appendChild(tx);
      g.onclick=()=>{info.innerHTML='<span class="ci">'+(n.icon||'•')+'</span><div><b>'+n.label+'</b><br>'+(n.desc||'')+'</div>';
        svg.querySelectorAll('rect').forEach(r=>r.setAttribute('opacity','1'));rect.setAttribute('opacity','1');};
      svg.appendChild(g);
    });
    info.innerHTML='<span class="ci">👆</span><div>Clique nos nós do mapa para revisar cada conceito do capítulo.</div>';
  };
  return {node:box,mount};
};

/* --- checklist (o que cai na prova) --- */
BLOCKS.checklist=b=>{
  const box=el('div',{class:'card'});
  box.appendChild(el('h3',{html:(b.icon||'✅')+' '+(b.title||'Checklist de prova')+'<span class="tag">marque</span>'}));
  const mount=()=>{
    b.items.forEach((it,i)=>{
      const row=el('label',{style:{display:'flex',gap:'10px',alignItems:'flex-start',padding:'9px 0',borderBottom:'1px dashed var(--stroke)',cursor:'pointer',fontSize:'13.5px',color:'var(--txt-dim)',lineHeight:'1.55'}});
      const cb=el('input',{type:'checkbox',style:{marginTop:'3px',accentColor:'#5fe39b',width:'17px',height:'17px',flex:'none'}});
      const span=el('span',{html:it});
      cb.onchange=()=>span.style.opacity=cb.checked?'.5':'1';
      row.appendChild(cb);row.appendChild(span);box.appendChild(row);
    });
  };
  return {node:box,mount};
};

/* --- range: sliders -> live KPIs (calculadora de fórmula) --- */
BLOCKS.range=b=>{
  const box=el('div',{class:'card'});
  if(b.title)box.appendChild(el('h3',{html:(b.icon||'🎚️')+' '+b.title+(b.tag?'<span class="tag">'+b.tag+'</span>':'')}));
  if(b.lead)box.appendChild(el('p',{html:b.lead}));
  const ctrls=el('div',{class:'sim-ctrls'});box.appendChild(ctrls);
  const out=el('div',{class:'kpi'});box.appendChild(out);
  const read=el('div',{});box.appendChild(read);
  const ins=el('div',{});box.appendChild(ins);
  const P={};(b.controls||[]).forEach(c=>P[c.id]=c.value);
  function fmtv(c,v){return (c.fmt?c.fmt(v):v)+(c.unit?' '+c.unit:'');}
  function render(){
    if(b.compute){out.innerHTML='';b.compute(P).forEach(k=>out.appendChild(el('div',{class:'k '+(k.tone||'a')},[el('small',{text:k.label}),el('b',{html:String(k.value)+(k.unit?' <span style="font-size:13px;font-weight:600">'+k.unit+'</span>':'')})])));}
    read.innerHTML=b.readout?'<div class="callout blue" style="margin-top:6px">'+b.readout(P)+'</div>':'';
    ins.innerHTML=b.insight?'<div class="callout green" style="margin-top:6px">'+b.insight(P)+'</div>':'';
  }
  const mount=()=>{
    (b.controls||[]).forEach(c=>{
      const row=el('div',{class:'sim-ctrl'});
      const lab=el('label',{html:c.label+' <b class="sim-val">'+fmtv(c,P[c.id])+'</b>'});
      const sl=el('input',{type:'range',min:String(c.min),max:String(c.max),value:String(c.value),step:String(c.step||1),class:'slider'});
      sl.oninput=()=>{P[c.id]=parseFloat(sl.value);lab.querySelector('.sim-val').innerHTML=fmtv(c,P[c.id]);render();};
      row.appendChild(lab);row.appendChild(sl);ctrls.appendChild(row);
    });
    render();
  };
  return {node:box,mount};
};

/* --- sim: canvas paramétrico contínuo + sliders (rAF) --- */
BLOCKS.sim=b=>{
  const box=el('div',{class:'card'});
  box.appendChild(el('h3',{html:(b.icon||'🧪')+' '+(b.title||'Simulação')+(b.tag?'<span class="tag">'+b.tag+'</span>':'')}));
  if(b.lead)box.appendChild(el('p',{html:b.lead}));
  const stageBox=el('div',{class:'stage-box',style:{padding:'0',minHeight:(b.height||300)+'px'}});
  const cv=el('canvas',{class:'dia',width:String(b.w||640),height:String(b.height||300)});stageBox.appendChild(cv);
  box.appendChild(stageBox);
  const ctrls=el('div',{class:'sim-ctrls'});box.appendChild(ctrls);
  const read=el('div',{});box.appendChild(read);
  const ins=el('div',{});box.appendChild(ins);
  const P={};(b.controls||[]).forEach(c=>P[c.id]=c.value);
  function fmtv(c,v){return (c.fmt?c.fmt(v):v)+(c.unit?' '+c.unit:'');}
  const mount=()=>{
    const ctx=cv.getContext('2d');let t0=null,raf=null,playing=!!b.animate;
    const baseH=b.height||300;let curH=baseH;
    function panels(){read.innerHTML=b.readout?'<div class="callout blue" style="margin-top:10px">'+b.readout(P)+'</div>':'';ins.innerHTML=b.insight?'<div class="callout green" style="margin-top:6px">'+b.insight(P)+'</div>':'';}
    function applyH(dh){curH=Math.max(200,Math.min(560,curH+dh));cv.height=curH;cv.style.height=curH+'px';stageBox.style.minHeight=curH+'px';if(!playing){P._t=P._t||0;try{b.draw(ctx,cv,P,S);}catch(e){}}}
    function frame(now){if(t0==null)t0=now;P._t=(now-t0)/1000;try{b.draw(ctx,cv,P,S);}catch(err){playing=false;console.warn('sim draw',err);}}
    function loop(){if(!cv.isConnected){playing=false;return;}frame(performance.now());if(playing)raf=requestAnimationFrame(loop);}
    (b.controls||[]).forEach(c=>{
      const row=el('div',{class:'sim-ctrl'});
      const lab=el('label',{html:c.label+' <b class="sim-val">'+fmtv(c,P[c.id])+'</b>'});
      const sl=el('input',{type:'range',min:String(c.min),max:String(c.max),value:String(c.value),step:String(c.step||1),class:'slider'});
      sl.oninput=()=>{P[c.id]=parseFloat(sl.value);lab.querySelector('.sim-val').innerHTML=fmtv(c,P[c.id]);panels();if(!playing){P._t=P._t||0;b.draw(ctx,cv,P,S);}};
      row.appendChild(lab);row.appendChild(sl);ctrls.appendChild(row);
    });
    const tools=el('div',{class:'sim-tools'});
    if(b.animate){
      const play=el('button',{class:'nbtn sm primary',text:'⏸ Pausar'});
      const rst=el('button',{class:'nbtn sm',text:'⟳ Reiniciar'});
      play.onclick=()=>{playing=!playing;play.textContent=playing?'⏸ Pausar':'▶ Reproduzir';if(playing){t0=null;loop();}};
      rst.onclick=()=>{t0=null;if(!playing){P._t=0;b.draw(ctx,cv,P,S);}};
      tools.appendChild(play);tools.appendChild(rst);
    }
    tools.appendChild(el('span',{class:'sztag',text:'tamanho'}));
    tools.appendChild(el('button',{class:'nbtn sm',text:'A−',title:'Diminuir visual',onclick:()=>applyH(-50)}));
    tools.appendChild(el('button',{class:'nbtn sm',text:'A+',title:'Aumentar visual',onclick:()=>applyH(50)}));
    ctrls.appendChild(tools);
    panels();
    if(b.animate)loop();else{P._t=0;b.draw(ctx,cv,P,S);}
  };
  return {node:box,mount};
};

/* --- predict: prever-e-revelar --- */
BLOCKS.predict=b=>{
  const box=el('div',{class:'card'});
  box.appendChild(el('h3',{html:(b.icon||'🔮')+' '+(b.title||'Preveja antes')+'<span class="tag">prever</span>'}));
  box.appendChild(el('div',{class:'prose',html:b.prompt}));
  const body=el('div',{style:{marginTop:'10px'}});box.appendChild(body);
  const rev=el('div',{});box.appendChild(rev);
  const mount=()=>{
    let done=false;
    function reveal(ok,msg){
      if(done)return;done=true;
      rev.innerHTML='<div class="callout '+(ok?'green':'red')+'" style="margin-top:12px"><span class="lbl">'+(ok?'✓ Você acertou':'✗ Reveja')+(msg?' — '+msg:'')+'</span>'+(b.reveal||'')+'</div>';
      if(b.onReveal){const slot=el('div',{style:{marginTop:'10px'}});rev.appendChild(slot);b.onReveal(slot,S);bindTerms(slot);}
    }
    if(b.numeric){
      const wrap=el('div',{style:{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}});
      const inp=el('input',{type:'number',step:'any',class:'num-in',placeholder:b.hint||'seu palpite'});
      const go=el('button',{class:'nbtn sm primary',text:'Conferir'});
      go.onclick=()=>{const v=parseFloat(inp.value);if(isNaN(v))return;const ok=Math.abs(v-b.answer)<=(b.tol||0);reveal(ok,'resposta ≈ <b>'+b.answer+(b.unit?' '+b.unit:'')+'</b>');};
      wrap.appendChild(inp);if(b.unit)wrap.appendChild(el('span',{class:'unit',text:b.unit}));wrap.appendChild(go);body.appendChild(wrap);
    }else{
      (b.options||[]).forEach(o=>{
        const opt=el('button',{class:'predict-opt',html:o.label});
        opt.onclick=()=>{if(done)return;body.querySelectorAll('.predict-opt').forEach(x=>x.disabled=true);opt.classList.add(o.correct?'ok':'no');reveal(!!o.correct,'');};
        body.appendChild(opt);
      });
    }
  };
  return {node:box,mount};
};

/* --- classify: atribuir itens a baldes + auto-correção --- */
BLOCKS.classify=b=>{
  const box=el('div',{class:'card'});
  box.appendChild(el('h3',{html:(b.icon||'🗂️')+' '+(b.title||'Classifique')+'<span class="tag">escolha</span>'}));
  if(b.prompt)box.appendChild(el('div',{class:'prose',html:b.prompt}));
  const list=el('div',{class:'classify-list'});box.appendChild(list);
  const ctr=el('div',{style:{display:'flex',gap:'10px',alignItems:'center',marginTop:'10px'}});
  const chk=el('button',{class:'nbtn sm primary',style:{flex:'1'},text:'Conferir'});
  const score=el('span',{class:'badge',style:{background:'rgba(79,209,255,.16)',color:'var(--accent)'}});
  ctr.appendChild(chk);ctr.appendChild(score);box.appendChild(ctr);
  const mount=()=>{
    const picks={};
    b.items.forEach((it,i)=>{
      const row=el('div',{class:'classify-item'});
      row.appendChild(el('span',{class:'ci-label',html:it.label}));
      const chips=el('div',{class:'classify-chips'});
      b.buckets.forEach(bk=>{
        const c=el('span',{class:'chip',html:(bk.color?'<span class="sw" style="background:'+bk.color+'"></span>':'')+bk.label});
        c.onclick=()=>{picks[i]=bk.id;chips.querySelectorAll('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');row.classList.remove('right','wrong');};
        chips.appendChild(c);
      });
      row.appendChild(chips);list.appendChild(row);
    });
    chk.onclick=()=>{let ok=0;b.items.forEach((it,i)=>{const row=list.children[i];const correct=picks[i]===it.bucket;if(picks[i]!=null){row.classList.toggle('right',correct);row.classList.toggle('wrong',!correct);}if(correct)ok++;});score.textContent=ok+'/'+b.items.length;};
  };
  return {node:box,mount};
};

/* ============================================================
   3D (three.js) — helpers reutilizáveis + bloco scene3d
   Política 3D liberal: usar onde há ganho espacial/imersivo.
   ============================================================ */
S.three={
  /* lat/lon (graus) -> Vector3 num raio r; lon=0 na frente (+z), +lon p/ leste */
  v(T,lat,lon,r){var la=lat*Math.PI/180,lo=lon*Math.PI/180;return new T.Vector3(r*Math.cos(la)*Math.sin(lo),r*Math.sin(la),r*Math.cos(la)*Math.cos(lo));},
  /* graticulado lat/lon como LineSegments */
  graticule(T,r,stepLat,stepLon,color,opacity){
    var pts=[],seg=72,lat,lon,i,A,B;
    for(lat=-80;lat<=80;lat+=(stepLat||20)){for(i=0;i<seg;i++){A=this.v(T,lat,i/seg*360,r);B=this.v(T,lat,(i+1)/seg*360,r);pts.push(A.x,A.y,A.z,B.x,B.y,B.z);}}
    for(lon=0;lon<360;lon+=(stepLon||30)){for(i=0;i<seg;i++){A=this.v(T,-90+i/seg*180,lon,r);B=this.v(T,-90+(i+1)/seg*180,lon,r);pts.push(A.x,A.y,A.z,B.x,B.y,B.z);}}
    var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pts,3));
    return new T.LineSegments(g,new T.LineBasicMaterial({color:color||0x6fb3e8,transparent:true,opacity:opacity==null?.32:opacity}));
  },
  /* círculo de latitude (Line) */
  latCircle(T,lat,r,color,opacity){var pts=[],i,V;for(i=0;i<=128;i++){V=this.v(T,lat,i/128*360,r);pts.push(V.x,V.y,V.z);}var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pts,3));return new T.Line(g,new T.LineBasicMaterial({color:color||0xffd27f,transparent:true,opacity:opacity==null?.75:opacity}));},
  /* globo pronto: esfera + graticulado + equador + trópicos. Retorna {group,radius,marker(),arc()} */
  globe(api,opts){
    opts=opts||{};var T=api.THREE,r=opts.radius||2,self=this;
    var grp=new T.Group();
    grp.add(new T.Mesh(new T.SphereGeometry(r,48,48),new T.MeshStandardMaterial({color:opts.color||0x16406e,roughness:.92,metalness:.04,emissive:0x06182e,emissiveIntensity:.32})));
    grp.add(self.graticule(T,r*1.002,opts.stepLat||20,opts.stepLon||30,opts.grid,.28));
    grp.add(self.latCircle(T,0,r*1.004,0xffd27f,.6));
    if(opts.tropics!==false){grp.add(self.latCircle(T,23.5,r*1.004,0x9fd0ff,.35));grp.add(self.latCircle(T,-23.5,r*1.004,0x9fd0ff,.35));}
    api.world.add(grp);
    return {group:grp,radius:r,
      marker:function(lat,lon,color,size){var m=new T.Mesh(new T.SphereGeometry(size||0.07,16,16),new T.MeshBasicMaterial({color:color==null?0xff6b6b:color}));m.position.copy(self.v(T,lat,lon,r*1.02));grp.add(m);return m;},
      arc:function(latlons,color,lift){var ps=latlons.map(function(p){return self.v(T,p[0],p[1],r*(lift||1.03));});var g=new T.BufferGeometry().setFromPoints(ps);var ln=new T.Line(g,new T.LineBasicMaterial({color:color==null?0x5fe39b:color,transparent:true,opacity:.9}));grp.add(ln);return ln;}
    };
  }
};

/* --- scene3d: cena WebGL paramétrica + drag-rotate; controles colados ao visual + tamanho ajustável; dispose do contexto no unmount --- */
BLOCKS.scene3d=b=>{
  const box=el('div',{class:'card'});
  box.appendChild(el('h3',{html:(b.icon||'🌐')+' '+(b.title||'Cena 3D')+(b.tag?'<span class="tag">'+b.tag+'</span>':'')}));
  if(b.lead)box.appendChild(el('p',{html:b.lead}));
  const stageBox=el('div',{class:'stage-box',style:{padding:'0',minHeight:(b.height||340)+'px',position:'relative',overflow:'hidden'}});
  const cv=el('canvas',{class:'dia',style:{width:'100%',height:(b.height||340)+'px',display:'block',cursor:'grab',touchAction:'none'}});
  stageBox.appendChild(cv);box.appendChild(stageBox);
  const hint=el('div',{style:{position:'absolute',right:'10px',bottom:'8px',font:'600 11px system-ui',color:'rgba(220,235,255,.55)',pointerEvents:'none'},text:'🖱️ arraste p/ girar'});stageBox.appendChild(hint);
  const ctrls=el('div',{class:'sim-ctrls'});box.appendChild(ctrls);
  const read=el('div',{});box.appendChild(read);
  const ins=el('div',{});box.appendChild(ins);
  const P={};(b.controls||[]).forEach(c=>P[c.id]=c.value);
  function fmtv(c,v){return (c.fmt?c.fmt(v):v)+(c.unit?' '+c.unit:'');}
  const mount=()=>{
    const T=THREE();
    if(!T){stageBox.innerHTML='';stageBox.appendChild(el('div',{class:'callout red',style:{margin:'12px'},html:'WebGL/three indisponível neste navegador.'}));return;}
    let rnd,sc,cam,world,api,inst,update,raf=null,disposed=false,userRot=false,t0=null;
    const baseH=b.height||340;let curH=baseH;
    function panels(){read.innerHTML=b.readout?'<div class="callout blue" style="margin-top:10px">'+b.readout(P)+'</div>':'';ins.innerHTML=b.insight?'<div class="callout green" style="margin-top:6px">'+b.insight(P)+'</div>':'';}
    function resize(){if(disposed||!cv.isConnected)return;var W=cv.clientWidth||640;if(W){rnd.setSize(W,curH,false);cam.aspect=W/curH;cam.updateProjectionMatrix();}}
    function applyH(dh){curH=Math.max(240,Math.min(640,curH+dh));cv.style.height=curH+'px';stageBox.style.minHeight=curH+'px';resize();}
    function cleanup(){if(disposed)return;disposed=true;try{inst&&inst.dispose&&inst.dispose();}catch(e){}try{sc&&sc.traverse(function(o){if(o.geometry&&o.geometry.dispose)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(function(m){m&&m.dispose&&m.dispose();});}});}catch(e){}try{rnd.dispose();rnd.forceContextLoss&&rnd.forceContextLoss();}catch(e){}}
    try{
      const w=cv.clientWidth||640;
      rnd=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true});rnd.setSize(w,curH,false);rnd.setPixelRatio(Math.min(devicePixelRatio,2));
      sc=new T.Scene();cam=new T.PerspectiveCamera(b.fov||45,w/curH,0.1,200);cam.position.set(0,b.camY||0,b.dist||7);cam.lookAt(0,0,0);
      world=new T.Group();sc.add(world);
      sc.add(new T.AmbientLight(0x6173a6,b.ambient==null?.7:b.ambient));
      const dl=new T.DirectionalLight(0xffffff,2.0);dl.position.set(5,3,5);sc.add(dl);
      api={THREE:T,scene:sc,world:world,camera:cam,renderer:rnd,light:dl,S:S,P:P,width:w,height:curH};
      inst=b.build?b.build(api):null;
      update=typeof inst==='function'?inst:(inst&&inst.update);
    }catch(err){stageBox.innerHTML='';stageBox.appendChild(el('div',{class:'callout red',style:{margin:'12px'},html:'erro ao montar cena 3D: '+(err&&err.message)}));return;}
    let drag=false,px=0,py=0;
    cv.addEventListener('pointerdown',function(e){drag=true;userRot=true;px=e.clientX;py=e.clientY;try{cv.setPointerCapture(e.pointerId);}catch(_){}cv.style.cursor='grabbing';hint.style.display='none';});
    cv.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;world.rotation.y+=dx*0.008;world.rotation.x=Math.max(-1.3,Math.min(1.3,world.rotation.x+dy*0.008));});
    const endDrag=function(){drag=false;cv.style.cursor='grab';};
    cv.addEventListener('pointerup',endDrag);cv.addEventListener('pointerleave',endDrag);
    (b.controls||[]).forEach(c=>{
      const row=el('div',{class:'sim-ctrl'});
      const lab=el('label',{html:c.label+' <b class="sim-val">'+fmtv(c,P[c.id])+'</b>'});
      const sl=el('input',{type:'range',min:String(c.min),max:String(c.max),value:String(c.value),step:String(c.step||1),class:'slider'});
      sl.oninput=()=>{P[c.id]=parseFloat(sl.value);lab.querySelector('.sim-val').innerHTML=fmtv(c,P[c.id]);panels();};
      row.appendChild(lab);row.appendChild(sl);ctrls.appendChild(row);
    });
    const tools=el('div',{class:'sim-tools'});
    tools.appendChild(el('span',{class:'sztag',text:'tamanho'}));
    tools.appendChild(el('button',{class:'nbtn sm',text:'A−',title:'Diminuir visual',onclick:()=>applyH(-60)}));
    tools.appendChild(el('button',{class:'nbtn sm',text:'A+',title:'Aumentar visual',onclick:()=>applyH(60)}));
    ctrls.appendChild(tools);
    addEventListener('resize',resize);
    function loop(now){
      if(!cv.isConnected){cleanup();return;}
      if(t0==null)t0=now;var t=(now-t0)/1000;P._t=t;
      if(b.autorotate!==false&&!userRot)world.rotation.y+=0.0016;
      if(update){try{update(P,t,api);}catch(err){console.warn('scene3d update',err);}}
      try{rnd.render(sc,cam);}catch(err){console.warn('scene3d render',err);}
      raf=requestAnimationFrame(loop);
    }
    panels();
    raf=requestAnimationFrame(loop);
  };
  return {node:box,mount};
};

/* --- viewswitch: alterna vistas do MESMO elemento (ex.: 2D | 3D), uma por vez (a 3D só monta WebGL quando aberta) --- */
BLOCKS.viewswitch=b=>{
  const box=el('div',{});
  if(b.title)box.appendChild(el('div',{class:'divtxt',text:b.title}));
  const seg=el('div',{class:'viewseg'});box.appendChild(seg);
  const body=el('div',{});box.appendChild(body);
  const mount=()=>{
    let cur=-1;
    function show(i){if(i===cur)return;cur=i;seg.querySelectorAll('button').forEach((x,k)=>x.classList.toggle('on',k===i));body.innerHTML='';renderBlocks(body,(b.views[i]&&b.views[i].blocks)||[]);bindTerms(body);}
    (b.views||[]).forEach((v,i)=>{const btn=el('button',{class:'viewseg-btn',html:(v.icon?v.icon+' ':'')+v.label});btn.onclick=()=>show(i);seg.appendChild(btn);});
    show(b.start||0);
  };
  return {node:box,mount};
};

/* --- custom escape hatch --- */
BLOCKS.custom=b=>{const node=el('div',{});return {node,mount:()=>b.mount(node,S)};};
BLOCKS.hero=b=>{
  const h=el('div',{class:'hero'});
  const cv=el('canvas',{});h.appendChild(cv);
  const tx=el('div',{class:'hero-txt'});
  tx.innerHTML=`<div class="eyebrow">${b.eyebrow||''}</div><h2>${b.title}</h2><p>${b.text||''}</p>`;
  if(b.cta)tx.appendChild(el('button',{class:'nbtn primary',html:b.cta.label,onclick:()=>goMod(CH.modules.findIndex(m=>m.id===b.cta.to))}));
  h.appendChild(tx);
  return {node:h,mount:()=>{if(b.scene)b.scene(cv,S);else S.util.heroGlobe(cv);}};
};
BLOCKS.modcards=b=>{
  const g=el('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px',marginTop:'4px'}});
  b.cards.forEach(c=>{
    const card=el('div',{class:'card',style:{cursor:'pointer'},onclick:()=>goMod(CH.modules.findIndex(m=>m.id===c.to))});
    card.style.transition='.2s';card.onmouseenter=()=>{card.style.transform='translateY(-4px)';card.style.borderColor='var(--accent)';};
    card.onmouseleave=()=>{card.style.transform='';card.style.borderColor='';};
    card.innerHTML=`<div style="font-size:12px;font-weight:800;color:var(--accent);letter-spacing:1px">${c.kicker||''}</div><div style="font-size:30px;margin:6px 0 8px">${c.icon}</div><h4 style="font-size:16px;margin-bottom:6px">${c.title}</h4><p style="font-size:12.5px;color:var(--txt-dim);line-height:1.55">${c.text}</p><div style="margin-top:12px;font-size:12px;color:var(--accent);font-weight:600">Explorar ›</div>`;
    g.appendChild(card);
  });
  return g;
};

/* ============================================================
   MODAL (figura com zoom/pan)
   ============================================================ */
let mScale=1,mImg=null;
function openFig(src,cap){
  document.getElementById('modalImg').src=src;
  document.getElementById('modalCap').innerHTML=cap||'';
  mScale=1;mImg=document.getElementById('modalImg');mImg.style.transform='scale(1)';
  document.getElementById('modal').classList.add('show');
}
function mZoom(d){mScale=Math.max(1,Math.min(4,mScale+d));mImg.style.transform='scale('+mScale+')';}
function closeModal(){document.getElementById('modal').classList.remove('show');}
S.openFig=openFig;
window.openFig=openFig;

/* ============================================================
   TERM TOOLTIPS  <span class="term" data-tip="...">x</span>
   ============================================================ */
function bindTerms(root){
  const tip=document.getElementById('tip');
  root.querySelectorAll('.term[data-tip]').forEach(t=>{
    t.onmouseenter=e=>{tip.innerHTML=t.dataset.tip;tip.style.display='block';move(e);};
    t.onmousemove=move;t.onmouseleave=()=>tip.style.display='none';
  });
  function move(e){const tip=document.getElementById('tip');tip.style.left=Math.min(e.clientX+14,innerWidth-300)+'px';tip.style.top=(e.clientY+16)+'px';}
}

/* ============================================================
   UTILITIES (para blocos custom dos capítulos)
   ============================================================ */
S.util={
  /* campo de moléculas que rarefaz */
  molecules(container,count){
    const mols=[];container.innerHTML='';
    for(let i=0;i<count;i++){const m=el('div',{class:'mol'});const sz=4+Math.random()*4;
      m.style.width=sz+'px';m.style.height=sz+'px';m.dataset.x=Math.random();m.dataset.y=Math.random();
      container.appendChild(m);mols.push(m);}
    return {place(frac){const keep=Math.max(2,Math.round(count*frac));const W=container.clientWidth,H=container.clientHeight;
      mols.forEach((m,i)=>{if(i<keep){m.style.display='block';m.style.left=(+m.dataset.x*(W-10))+'px';m.style.top=(+m.dataset.y*(H-10))+'px';}else m.style.display='none';});}};
  },
  /* three.js globo do herói (com fallback) */
  heroGlobe(cv){
    const T=THREE();if(!T){cv.parentElement.style.background='radial-gradient(circle at 70% 40%,#1c4f7e 0%,#0a1730 45%,#070c16 100%)';return;}
    try{
      const w=cv.clientWidth||900,h=cv.clientHeight||380;
      const rnd=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true});rnd.setSize(w,h,false);rnd.setPixelRatio(Math.min(devicePixelRatio,2));
      const sc=new T.Scene();const cam=new T.PerspectiveCamera(45,w/h,0.1,100);cam.position.set(0,0,7.2);
      const earth=new T.Mesh(new T.SphereGeometry(2,64,64),new T.MeshStandardMaterial({color:0x1b4a7a,roughness:.85,metalness:.1,emissive:0x07203a,emissiveIntensity:.4}));sc.add(earth);
      const cont=new T.Mesh(new T.SphereGeometry(2.01,40,40),new T.MeshStandardMaterial({color:0x2e7d5b,roughness:1,transparent:true,opacity:.5,wireframe:true}));sc.add(cont);
      const cols=[0x7ec8ff,0x9d8bff,0x5f9bff,0xff8a6b];const shells=[];
      cols.forEach((c,i)=>{const m=new T.Mesh(new T.SphereGeometry(2.18+i*.26,40,40),new T.MeshBasicMaterial({color:c,transparent:true,opacity:.1-i*0.012,side:T.BackSide}));sc.add(m);shells.push(m);});
      sc.add(new T.Mesh(new T.SphereGeometry(2.12,64,64),new T.MeshBasicMaterial({color:0x4fd1ff,transparent:true,opacity:.16,side:T.BackSide})));
      const sg=new T.BufferGeometry();const sp=[];for(let i=0;i<500;i++){const r=20+Math.random()*30,th=Math.random()*6.28,ph=Math.acos(2*Math.random()-1);sp.push(r*Math.sin(ph)*Math.cos(th),r*Math.sin(ph)*Math.sin(th),r*Math.cos(ph));}
      sg.setAttribute('position',new T.Float32BufferAttribute(sp,3));sc.add(new T.Points(sg,new T.PointsMaterial({color:0x9fc0ff,size:.12,transparent:true,opacity:.8})));
      const l=new T.DirectionalLight(0xffffff,2.2);l.position.set(5,3,5);sc.add(l);sc.add(new T.AmbientLight(0x4060a0,.7));
      let t=0;(function loop(){t+=.0035;earth.rotation.y+=.0018;cont.rotation.y+=.0018;shells.forEach((s,i)=>s.rotation.y-=.0006*(i+1));cam.position.x=Math.sin(t*.3)*.6;cam.lookAt(0,0,0);rnd.render(sc,cam);requestAnimationFrame(loop);})();
      addEventListener('resize',()=>{const W=cv.clientWidth,H=cv.clientHeight;if(W&&H){rnd.setSize(W,H,false);cam.aspect=W/H;cam.updateProjectionMatrix();}});
    }catch(e){console.warn('three fallback',e);cv.parentElement.style.background='radial-gradient(circle at 70% 40%,#1c4f7e 0%,#0a1730 45%,#070c16 100%)';}
  }
};
})();
