/* ============================================================
   panorama.js — ver a fase inteira no editor de fases.
   FAB.panorama.liga(scroll, fase, op) põe, embaixo do mapa:
   - MINIMAPA-RÉGUA: a fase inteira pequenininha, com a janela do
     pedaço que está na tela. Tocar ou arrastar leva a cena para lá
     (para os lados e, na fase alta, para cima e para baixo).
   - VER A FASE: a câmera passeia do começo até a bandeira pelo
     caminho provável (FAB.caminhoFase), com tocar/pausar, mais
     devagar/mais rápido, voltar ao começo e barra de progresso.
   - AVISOS: selos pequenos sobre o mapa (FAB.diagnostico) e um
     contador; tocar no contador leva até o próximo aviso. "Mais"
     abre a lista e deixa esconder os selos.
   scroll = o elemento que rola (#fzScroll), com o canvas do mapa
   dentro. op.depoisDe = depois de qual elemento entra a régua
   (padrão: o pai do scroll). Devolve { atualiza(fase), vista(),
   desliga(), ver() }. Só uma régua viva por vez.
   ============================================================ */
(function () {
'use strict';
var FAB = window.FAB = window.FAB || {};

var CSS = [
'.pn-tira{display:flex;gap:6px;align-items:center;margin-top:6px;flex:none;min-width:0}',
'.pn-mini{position:relative;flex:1;min-width:0;height:var(--pn-h,64px);border-radius:10px;background:#0e0c24;border:2px solid #1a1c2c;touch-action:none;cursor:pointer;overflow:hidden}',
'.pn-mini canvas{position:absolute;image-rendering:pixelated}',
'.pn-vista{position:absolute;border:2px solid #ffd84a;border-radius:3px;box-shadow:0 0 0 999px rgba(8,6,24,.45);pointer-events:none}',
'.pn-pt{position:absolute;width:7px;height:7px;margin:-3px 0 0 -3px;border-radius:50%;border:1px solid #1a1c2c;pointer-events:none}',
'.pn-bt{min-width:48px;min-height:44px;padding:0 10px;gap:4px;flex:none}',
'.pn-bt .pn-n{font-size:16px;font-weight:900}',
'.pn-bt.tem{background:linear-gradient(180deg,#ff8a6b,#e0503f);box-shadow:0 4px 0 #8f2a20}',
'.pn-ver{display:none;flex-wrap:wrap;gap:6px;align-items:center;margin-top:6px;flex:none}',
'.pn-tira.vendo+.pn-ver{display:flex}',
'.pn-ver input{flex:1 1 140px;min-width:120px;min-height:44px;accent-color:#ffd84a}',
'.pn-vel{font-weight:900;min-width:34px;text-align:center;color:var(--txt2,#d9d4ff)}',
'.pn-camada{position:absolute;left:0;top:0;pointer-events:none;z-index:1}',
'.pn-camada.pn-vendo{pointer-events:auto;cursor:pointer}',
'.pn-camada.pn-sem .pn-selo,.pn-camada.pn-sem .pn-recado{display:none}',
'.pn-selo{position:absolute;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;border:2px solid #1a1c2c;box-shadow:0 2px 0 rgba(0,0,0,.45)}',
'.pn-selo.trava{background:#ff5a64}.pn-selo.inutil{background:#ff9a3c}.pn-selo.excesso{background:#ffd84a}',
'.pn-selo.foco{animation:pnPulsa .8s ease-in-out 3;z-index:2}',
'@keyframes pnPulsa{50%{transform:scale(1.5)}}',
'.pn-recado{position:absolute;display:flex;align-items:center;gap:4px;white-space:nowrap;background:#1a1c2c;color:#fff;font-weight:900;font-size:15px;padding:0 0 0 10px;border-radius:12px;pointer-events:auto;z-index:3;box-shadow:0 3px 0 rgba(0,0,0,.4)}',
'.pn-recado button{min-width:44px;min-height:44px;display:grid;place-items:center;border-radius:12px;color:#fff}',
'.pn-heroi{position:absolute;pointer-events:none;image-rendering:pixelated;filter:drop-shadow(0 0 4px #fff)}',
'.pn-lista{display:flex;flex-direction:column;gap:6px;margin:10px 0 14px;max-height:50vh;overflow:auto}',
'.pn-lista .linha{display:flex;align-items:center;gap:10px;justify-content:space-between;background:var(--bg2,#1b1740);border-radius:12px;padding:4px 4px 4px 10px;font-weight:900}',
'.pn-lista .pn-selo{position:static;flex:none}',
'@media (max-width:640px){.pn-tira{--pn-h:48px}.pn-bt{min-width:44px;padding:0 6px}}'
].join('\n');
function css() { if (document.getElementById('pnCss')) return; var s = document.createElement('style'); s.id = 'pnCss'; s.textContent = CSS; document.head.appendChild(s); }

Object.assign(FAB.ICONES = FAB.ICONES || {}, {
  pn_ver:     '<rect x="2" y="6" width="20" height="12" rx="2" fill="#5ec8ff" stroke="#1a1c2c" stroke-width="1.4"/><rect x="2" y="14" width="20" height="4" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.4"/><path d="M9 8.5v5l4.5-2.5z" fill="#fff" stroke="#1a1c2c" stroke-width="1.2" stroke-linejoin="round"/>',
  pn_play:    '<path d="M7 4.5v15l12-7.5z" fill="#fff" stroke="#1a1c2c" stroke-width="1.4" stroke-linejoin="round"/>',
  pn_pausa:   '<rect x="6" y="5" width="4.5" height="14" rx="1" fill="#fff" stroke="#1a1c2c" stroke-width="1.4"/><rect x="13.5" y="5" width="4.5" height="14" rx="1" fill="#fff" stroke="#1a1c2c" stroke-width="1.4"/>',
  pn_inicio:  '<rect x="4" y="5" width="3" height="14" rx="1" fill="#fff" stroke="#1a1c2c" stroke-width="1.2"/><path d="M19 5v14L8.5 12z" fill="#fff" stroke="#1a1c2c" stroke-width="1.4" stroke-linejoin="round"/>',
  pn_devagar: '<path d="M4 17c0-5 3.5-8 7.5-8S19 12 19 17z" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.4"/><circle cx="20" cy="13.5" r="2.2" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.2"/><path d="M7 17v2.5M16 17v2.5" stroke="#1a1c2c" stroke-width="2" stroke-linecap="round"/><path d="M8 13l3-2.5 3 2.5" stroke="#2a7a3a" stroke-width="1.3" fill="none"/>',
  pn_depressa:'<ellipse cx="11" cy="15" rx="7" ry="4.5" fill="#fff" stroke="#1a1c2c" stroke-width="1.4"/><circle cx="18" cy="10.5" r="3" fill="#fff" stroke="#1a1c2c" stroke-width="1.4"/><path d="M17 8c-.5-3 0-5 1-6M19.5 8c.5-3 1.5-4.5 2.5-5" stroke="#1a1c2c" stroke-width="1.4" fill="#fff" stroke-linecap="round"/><circle cx="19" cy="10.2" r=".9" fill="#1a1c2c"/><path d="M2 12h3M1.5 15.5h3" stroke="#ffd84a" stroke-width="1.6" stroke-linecap="round"/>',
  pn_fechar:  '<path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
  pn_alerta:  '<path d="M12 3l10 17H2z" fill="#ffd84a" stroke="#1a1c2c" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v5" stroke="#1a1c2c" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17" r="1.4" fill="#1a1c2c"/>',
  pn_ok:      '<circle cx="12" cy="12" r="9" fill="#63c74d" stroke="#1a1c2c" stroke-width="1.4"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  pn_selo:    '<path d="M12 5v9" stroke="#1a1c2c" stroke-width="3.4" stroke-linecap="round"/><circle cx="12" cy="19" r="2" fill="#1a1c2c"/>',
  pn_mais:    '<path d="M8 6l7 6-7 6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
});

/* cor média de cada peça (o minimapa pinta uma cor por casinha) */
var cores = {};
function corDe(t) {
  var sk = t === 'inicio' ? FAB.skinDe('heroi') : FAB.skinDe(t);
  if (cores[sk]) return cores[sk];
  var r = 0, g = 0, b = 0, n = 0;
  try {
    var c = FAB.sprCanvas(sk, 0), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    for (var k = 0; k < d.length; k += 4) if (d[k + 3] > 100) { r += d[k]; g += d[k + 1]; b += d[k + 2]; n++; }
  } catch (e) {}
  return (cores[sk] = n ? 'rgb(' + Math.round(r / n) + ',' + Math.round(g / n) + ',' + Math.round(b / n) + ')' : '#888');
}
function letras() { var T = {}; Object.keys(FAB.TIPOS).forEach(function (t) { T[FAB.TIPOS[t].letra] = t; }); return T; }
function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

var vivo = null;
var VELS = [.5, 1, 2, 4], CASAS_POR_SEG = 6;

function liga(sc, fase, op) {
  op = op || {}; css();
  if (vivo) vivo.desliga();
  cores = {};
  var f = fase, cv = sc.querySelector('canvas'), jan = op.depoisDe || sc.parentNode;
  if (getComputedStyle(sc).position === 'static') sc.style.position = 'relative';
  var J = FAB.jogo ? FAB.jogo() : {};
  var semSelos = !!(FAB.E && FAB.E.prefs && FAB.E.prefs.semAvisos) || J.origem === 'quebrado';   /* o jogo quebrado: ela acha os bugs; os selos só aparecem se pedir */
  var camada = el('div', 'pn-camada' + (semSelos ? ' pn-sem' : '')); sc.appendChild(camada);
  var tira = el('div', 'pn-tira',
    '<div class="pn-mini" title="Arraste para ver a fase"><canvas></canvas><i class="pn-vista"></i></div>' +
    '<button class="bt cinza pn-bt" data-pn="ver" title="Ver a fase">' + FAB.ico('pn_ver', 26) + '</button>' +
    '<button class="bt cinza pn-bt" data-pn="avisos" title="Avisos da fase"></button>');
  var linhaVer = el('div', 'pn-ver',
    '<button class="bt cinza pn-bt" data-pn="inicio" title="Voltar ao começo">' + FAB.ico('pn_inicio', 22) + '</button>' +
    '<button class="bt verde pn-bt" data-pn="play" title="Pausar">' + FAB.ico('pn_pausa', 22) + '</button>' +
    '<button class="bt cinza pn-bt" data-pn="devagar" title="Mais devagar">' + FAB.ico('pn_devagar', 24) + '</button>' +
    '<span class="pn-vel">1×</span>' +
    '<button class="bt cinza pn-bt" data-pn="depressa" title="Mais rápido">' + FAB.ico('pn_depressa', 24) + '</button>' +
    '<input type="range" min="0" max="1000" value="0" aria-label="Onde a câmera está">' +
    '<button class="bt cinza pn-bt" data-pn="fecha" title="Fechar">' + FAB.ico('pn_fechar', 20) + '</button>');
  jan.parentNode.insertBefore(linhaVer, jan.nextSibling);
  jan.parentNode.insertBefore(tira, jan.nextSibling);
  var mini = tira.querySelector('.pn-mini'), mcv = mini.querySelector('canvas'), vistaEl = mini.querySelector('.pn-vista');
  var btAv = tira.querySelector('[data-pn=avisos]'), range = linhaVer.querySelector('input');
  var diag = [], foco = -1, tDiag = 0, vivoEste = true;

  function W() { return f.mapa[0].length; }
  function H() { return f.mapa.length; }
  function casa() { return (cv.offsetWidth || 1) / W(); }

  /* ---------- minimapa ---------- */
  function desenhaMini() {
    var w = W(), h = H(), k = 2, L = letras(), x = mcv.getContext('2d');
    mcv.width = w * k; mcv.height = h * k;
    var C = (FAB.CENARIOS && FAB.CENARIOS[f.cenario]) || { ceu: ['#5ec8ff', '#bdf0ff'] }, g = x.createLinearGradient(0, 0, 0, mcv.height);
    g.addColorStop(0, C.ceu[0]); g.addColorStop(1, C.ceu[1]); x.fillStyle = g; x.fillRect(0, 0, mcv.width, mcv.height);
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) { var t = L[f.mapa[j][i]]; if (!t) continue; x.fillStyle = corDe(t); x.fillRect(i * k, j * k, k, k); }
    medeMini(); pontos();
  }
  function medeMini() {
    var w = W(), h = H(), ww = Math.max(40, mini.clientWidth), maxH = (window.innerWidth <= 640 || window.innerHeight < 520) ? 48 : 80;
    var hh = Math.max(44, Math.min(maxH, h * ww / w)); mini.style.height = hh + 'px';
    var s = Math.min(ww / w, (hh - 4) / h), cw = w * s, ch = h * s;
    mcv.style.width = cw + 'px'; mcv.style.height = ch + 'px';
    mcv.style.left = ((ww - cw) / 2) + 'px'; mcv.style.top = ((hh - ch) / 2) + 'px';
  }
  function pontos() {
    mini.querySelectorAll('.pn-pt').forEach(function (p) { p.remove(); });
    var cw = mcv.offsetWidth, ch = mcv.offsetHeight, l0 = mcv.offsetLeft, t0 = mcv.offsetTop;
    diag.forEach(function (d) {
      var p = el('i', 'pn-pt'); p.style.background = d.grupo === 'trava' ? '#ff5a64' : d.grupo === 'inutil' ? '#ff9a3c' : '#ffd84a';
      p.style.left = (l0 + (d.i + .5) / W() * cw) + 'px'; p.style.top = (t0 + (d.j + .5) / H() * ch) + 'px'; mini.appendChild(p);
    });
  }
  var pedeVista = 0;
  function vista() {
    pedeVista = 0; if (!vivoEste) return;
    camada.style.width = cv.offsetWidth + 'px'; camada.style.height = cv.offsetHeight + 'px';
    var tw = cv.offsetWidth || 1, th = cv.offsetHeight || 1, cw = mcv.offsetWidth, ch = mcv.offsetHeight;
    var fx0 = Math.max(0, sc.scrollLeft / tw), fx1 = Math.min(1, (sc.scrollLeft + sc.clientWidth) / tw);
    var fy0 = Math.max(0, sc.scrollTop / th), fy1 = Math.min(1, (sc.scrollTop + sc.clientHeight) / th);
    vistaEl.style.left = (mcv.offsetLeft + fx0 * cw - 2) + 'px'; vistaEl.style.width = Math.max(6, (fx1 - fx0) * cw + 4) + 'px';
    vistaEl.style.top = (mcv.offsetTop + fy0 * ch - 2) + 'px'; vistaEl.style.height = Math.max(6, (fy1 - fy0) * ch + 4) + 'px';
  }
  function vistaJa() { if (!pedeVista) pedeVista = requestAnimationFrame(vista); }
  sc.addEventListener('scroll', vistaJa, { passive: true });
  var ro = window.ResizeObserver ? new ResizeObserver(function () { medeMini(); pontos(); vistaJa(); }) : null;
  if (ro) { ro.observe(cv); ro.observe(mini); }

  function fracDe(ev) {
    var r = mcv.getBoundingClientRect();
    return [Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (ev.clientY - r.top) / r.height))];
  }
  function leva(fr) {
    if (ver.on) { ver.vai(ver.perto(fr[0] * W(), fr[1] * H())); return; }
    sc.scrollLeft = fr[0] * cv.offsetWidth - sc.clientWidth / 2;
    sc.scrollTop = fr[1] * cv.offsetHeight - sc.clientHeight / 2;
  }
  var arrasta = false;
  mini.addEventListener('pointerdown', function (ev) { ev.preventDefault(); arrasta = true; try { mini.setPointerCapture(ev.pointerId); } catch (e) {} if (ver.on) ver.pausa(); leva(fracDe(ev)); });
  mini.addEventListener('pointermove', function (ev) { if (arrasta) leva(fracDe(ev)); });
  mini.addEventListener('pointerup', function () { arrasta = false; });
  mini.addEventListener('pointercancel', function () { arrasta = false; });

  /* ---------- avisos ---------- */
  function contador() {
    var n = diag.length;
    btAv.classList.toggle('tem', n > 0 && !semSelosAtivo());
    btAv.innerHTML = n ? FAB.ico('pn_alerta', 22) + '<span class="pn-n">' + n + '</span>' : FAB.ico('pn_ok', 24);
    btAv.title = n ? 'Avisos da fase' : 'Nada grave';
  }
  function semSelosAtivo() { return camada.classList.contains('pn-sem'); }
  function selos() {
    camada.querySelectorAll('.pn-selo,.pn-recado').forEach(function (s) { s.remove(); });
    diag.forEach(function (d, n) {
      var s = el('i', 'pn-selo ' + d.grupo + (n === foco ? ' foco' : ''), FAB.ico('pn_selo', 16));
      s.title = d.curto; s.dataset.n = n;
      s.style.left = 'calc(' + ((d.i + 1) / W() * 100) + '% - 14px)'; s.style.top = 'max(0px, calc(' + (d.j / H() * 100) + '% - 8px))';
      camada.appendChild(s);
    });
  }
  function recado(d) {
    camada.querySelectorAll('.pn-recado').forEach(function (s) { s.remove(); });
    if (!d) return;
    var r = el('div', 'pn-recado', '<span>' + FAB.esc(d.curto) + '</span><button title="Mais">' + FAB.ico('pn_mais', 18) + '</button>');
    var esq = (d.i + 1) / W() > .6;
    r.style[esq ? 'right' : 'left'] = esq ? 'calc(' + ((1 - d.i / W()) * 100) + '% + 4px)' : 'calc(' + ((d.i + 1) / W() * 100) + '% + 12px)';
    r.style.top = 'max(0px, calc(' + (d.j / H() * 100) + '% - 14px))';
    r.querySelector('button').onclick = function (ev) { ev.stopPropagation(); lista(); };
    camada.appendChild(r);
    clearTimeout(recado.t); recado.t = setTimeout(function () { if (r.parentNode) r.remove(); }, 6000);
  }
  function mostra(n) {
    var d = diag[n]; if (!d) return; foco = n;
    camada.classList.remove('pn-sem');
    var c = casa();
    sc.scrollTo({ left: (d.i + .5) * c - sc.clientWidth / 2, top: (d.j + .5) * c - sc.clientHeight / 2, behavior: 'smooth' });
    selos(); recado(d); contador();
    if (FAB.fala) FAB.fala(d.curto);
  }
  btAv.onclick = function () {
    if (ver.on) ver.fecha();
    if (!diag.length) { if (FAB.fala) FAB.fala('Nada grave'); return; }
    mostra((foco + 1) % diag.length);
  };
  function lista() {
    if (!FAB.ui || !FAB.ui.abre) return;
    var sem = semSelosAtivo() && !!(FAB.E && FAB.E.prefs && FAB.E.prefs.semAvisos);
    FAB.ui.abre('<h2>Avisos da fase</h2><div class="pn-lista">' + diag.map(function (d, n) {
      return '<div class="linha"><span style="display:flex;align-items:center;gap:10px"><i class="pn-selo ' + d.grupo + '">' + FAB.ico('pn_selo', 16) + '</i>' + FAB.esc(d.curto) + '</span><button class="bt cinza pn-bt" data-pnv="' + n + '">Ver</button></div>';
    }).join('') + '</div><div class="linha"><button class="bt cinza" id="pnEsconde">' + (sem ? 'Mostrar os avisos' : 'Esconder os avisos') + '</button><button class="bt" id="pnFecha">Fechar</button></div>');
    document.querySelectorAll('[data-pnv]').forEach(function (b) { b.onclick = function () { FAB.ui.fecha(); mostra(+b.dataset.pnv); }; });
    var e = document.getElementById('pnEsconde'); if (e) e.onclick = function () {
      FAB.E.prefs.semAvisos = !sem; if (FAB.salva) FAB.salva(); camada.classList.toggle('pn-sem', !sem); contador(); FAB.ui.fecha();
    };
    var fc = document.getElementById('pnFecha'); if (fc) fc.onclick = function () { FAB.ui.fecha(); };
  }

  function atualiza(nova) {
    if (nova) f = nova;
    clearTimeout(tDiag);
    tDiag = setTimeout(function () {
      if (!vivoEste) return;
      try { diag = FAB.diagnostico ? FAB.diagnostico(f) : []; } catch (e) { diag = []; }
      if (foco >= diag.length) foco = -1;
      desenhaMini(); selos(); contador(); vista();
      if (ver.on) ver.refaz();
    }, 120);
  }

  /* ---------- ver a fase (sobrevoo da câmera) ---------- */
  var ver = { on: false, tocando: false, s: 0, v: 1, pts: [], acc: [], tot: 1, raf: 0, cx: null, cy: null, heroi: null, t0: 0 };
  ver.refaz = function () {
    var p = FAB.caminhoFase ? FAB.caminhoFase(f) : [[0, H() - 3], [W() - 1, H() - 3]];
    if (p.length < 2) p = [p[0] || [0, 0], p[0] || [0, 0]];
    ver.pts = p; ver.acc = [0];
    for (var i = 1; i < p.length; i++) ver.acc.push(ver.acc[i - 1] + Math.max(.0001, Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1])));
    ver.tot = ver.acc[ver.acc.length - 1] || 1; if (ver.s > ver.tot) ver.s = ver.tot;
  };
  ver.pos = function (s) {
    var a = ver.acc, p = ver.pts, i = 1; while (i < a.length - 1 && a[i] < s) i++;
    var u = Math.max(0, Math.min(1, (s - a[i - 1]) / ((a[i] - a[i - 1]) || 1))), A = p[i - 1], B = p[i];
    var x = A[0] + (B[0] - A[0]) * u, y = A[1] + (B[1] - A[1]) * u;
    if (Math.abs(B[0] - A[0]) > 1 || B[1] < A[1]) y -= Math.sin(Math.PI * u) * Math.min(2.5, .5 + Math.abs(B[0] - A[0]) * .3 + Math.max(0, A[1] - B[1]) * .4);   /* pulo em arco */
    return [x, y];
  };
  ver.perto = function (x, y) {
    var melhor = 0, md = Infinity;
    for (var s = 0; s <= ver.tot; s += .25) { var q = ver.pos(s), d = Math.hypot(q[0] - x, (q[1] - y) * 1.5); if (d < md) { md = d; melhor = s; } }
    return melhor;
  };
  ver.botaPlay = function () {
    var b = linhaVer.querySelector('[data-pn=play]');
    b.innerHTML = FAB.ico(ver.tocando ? 'pn_pausa' : 'pn_play', 22); b.title = ver.tocando ? 'Pausar' : 'Tocar';
  };
  ver.pausa = function () { ver.tocando = false; ver.botaPlay(); };
  ver.toca = function () { if (ver.s >= ver.tot) ver.s = 0; ver.tocando = true; ver.botaPlay(); };
  ver.vai = function (s) { ver.s = Math.max(0, Math.min(ver.tot, s)); ver.cx = null; ver.quadro(0); };
  ver.quadro = function (dt) {
    if (ver.tocando) { ver.s += dt * CASAS_POR_SEG * VELS[ver.v]; if (ver.s >= ver.tot) { ver.s = ver.tot; ver.pausa(); } }
    var p = ver.pos(ver.s), c = casa();
    ver.heroi.style.width = ver.heroi.style.height = c + 'px';
    ver.heroi.style.left = (p[0] * c) + 'px'; ver.heroi.style.top = (p[1] * c) + 'px';
    var tx = (p[0] + .5) * c - sc.clientWidth / 2, ty = (p[1] + .5) * c - sc.clientHeight / 2;
    if (ver.cx === null) { ver.cx = tx; ver.cy = ty; }
    var k = dt ? Math.min(1, dt * 5) : 1; ver.cx += (tx - ver.cx) * k; ver.cy += (ty - ver.cy) * k;
    sc.scrollLeft = ver.cx; sc.scrollTop = ver.cy;
    range.value = Math.round(ver.s / ver.tot * 1000);
  };
  ver.laco = function (t) {
    if (!ver.on || !vivoEste) return;
    if (!document.body.contains(sc)) { C.desliga(); return; }   /* saiu da tela de fases */
    var dt = ver.t0 ? Math.min(.1, (t - ver.t0) / 1000) : 0; ver.t0 = t;
    ver.quadro(dt); ver.raf = requestAnimationFrame(ver.laco);
  };
  ver.abre = function () {
    if (ver.on) return;
    ver.refaz(); ver.on = true; ver.s = 0; ver.cx = null; ver.t0 = 0;
    ver.heroi = el('img', 'pn-heroi'); ver.heroi.alt = '';
    try { ver.heroi.src = FAB.sprURL(FAB.skinDe('heroi')); } catch (e) {}
    camada.appendChild(ver.heroi); camada.classList.add('pn-vendo');
    recado(null); tira.classList.add('vendo'); ver.toca(); vel();
    ver.raf = requestAnimationFrame(ver.laco);
  };
  ver.fecha = function () {
    if (!ver.on) return;
    ver.on = false; ver.tocando = false; cancelAnimationFrame(ver.raf);
    if (ver.heroi) ver.heroi.remove(); ver.heroi = null;
    camada.classList.remove('pn-vendo'); tira.classList.remove('vendo');
  };
  function vel() { linhaVer.querySelector('.pn-vel').textContent = VELS[ver.v] + '×'; }
  tira.querySelector('[data-pn=ver]').onclick = function () { if (ver.on) ver.fecha(); else ver.abre(); };
  linhaVer.querySelector('[data-pn=inicio]').onclick = function () { ver.vai(0); };
  linhaVer.querySelector('[data-pn=play]').onclick = function () { if (ver.tocando) ver.pausa(); else ver.toca(); };
  linhaVer.querySelector('[data-pn=devagar]').onclick = function () { ver.v = Math.max(0, ver.v - 1); vel(); };
  linhaVer.querySelector('[data-pn=depressa]').onclick = function () { ver.v = Math.min(VELS.length - 1, ver.v + 1); vel(); };
  linhaVer.querySelector('[data-pn=fecha]').onclick = function () { ver.fecha(); };
  range.addEventListener('input', function () { ver.pausa(); ver.vai(range.value / 1000 * ver.tot); });
  camada.addEventListener('click', function () { if (ver.on) { if (ver.tocando) ver.pausa(); else ver.toca(); } });

  var C = {
    atualiza: atualiza, vista: vistaJa, ver: function () { ver.abre(); }, fechaVer: function () { ver.fecha(); },
    diagnostico: function () { return diag.slice(); }, mostra: mostra, estado: function () { return { vendo: ver.on, tocando: ver.tocando, s: ver.s, tot: ver.tot, vel: VELS[ver.v] }; },
    desliga: function () {
      vivoEste = false; ver.fecha(); clearTimeout(tDiag); clearTimeout(recado.t); if (ro) ro.disconnect();
      sc.removeEventListener('scroll', vistaJa); [tira, linhaVer, camada].forEach(function (e) { if (e.parentNode) e.remove(); });
      if (vivo === C) vivo = null;
    }
  };
  vivo = C;
  try { diag = FAB.diagnostico ? FAB.diagnostico(f) : []; } catch (e) { diag = []; }
  desenhaMini(); selos(); contador(); vista();
  return C;
}

FAB.panorama = { liga: liga, atual: function () { return vivo; } };
})();
