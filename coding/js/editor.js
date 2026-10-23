/* ============================================================
   editor.js — o EDITOR DE FASES (tela "Fases")
   Ela escolhe a peça na esquerda e pinta no mapa (12 linhas).
   Botão direito ou a borracha apaga. Pode ter até 5 fases.
   ============================================================ */
(function () {
'use strict';
var fase = 0, peca = 'moeda', desfaz = [], arrastando = false, Z = 2, ultimo = null;
var MAXF = 5, MINW = 20, MAXW = 120;

function F() { var J = FAB.jogo(); if (fase >= J.fases.length) fase = 0; return J.fases[fase]; }
function letra(t) { return t === '__apaga' ? '.' : FAB.TIPOS[t].letra; }
function tipoDe(ch) { for (var k in FAB.TIPOS) if (FAB.TIPOS[k].letra === ch) return k; return null; }

/* desenha a fase inteira (usado também nas miniaturas do Início) */
FAB.desenhaMapa = function (cv, f, z, grade) {
  var w = f.mapa[0].length, x = cv.getContext('2d');
  cv.width = w * 16 * z; cv.height = 12 * 16 * z; x.imageSmoothingEnabled = false;
  var C = FAB.CENARIOS[f.cenario] || FAB.CENARIOS.dia, g = x.createLinearGradient(0, 0, 0, cv.height);
  g.addColorStop(0, C.ceu[0]); g.addColorStop(1, C.ceu[1]); x.fillStyle = g; x.fillRect(0, 0, cv.width, cv.height);
  for (var j = 0; j < 12; j++) for (var i = 0; i < w; i++) {
    var t = tipoDe(f.mapa[j][i]); if (!t) continue;
    var sk = t === 'inicio' ? FAB.skinDe('heroi') : FAB.skinDe(t);
    if (t === 'grama' && j > 0 && FAB.TIPOS[tipoDe(f.mapa[j - 1][i])] && FAB.TIPOS[tipoDe(f.mapa[j - 1][i])].classe === 'solido') sk = FAB.skinDe('terra');
    x.drawImage(FAB.sprCanvas(sk, 0), i * 16 * z, j * 16 * z, 16 * z, 16 * z);
    if (t === 'inicio' && grade) { x.strokeStyle = '#63c74d'; x.lineWidth = 2; x.strokeRect(i * 16 * z + 1, j * 16 * z + 1, 16 * z - 2, 16 * z - 2); }
  }
  if (grade) {
    x.strokeStyle = 'rgba(255,255,255,.13)'; x.lineWidth = 1; x.beginPath();
    for (i = 0; i <= w; i++) { x.moveTo(i * 16 * z + .5, 0); x.lineTo(i * 16 * z + .5, cv.height); }
    for (j = 0; j <= 12; j++) { x.moveTo(0, j * 16 * z + .5); x.lineTo(cv.width, j * 16 * z + .5); }
    x.stroke();
  }
};

function redesenha() { var cv = FAB.$('fzCanvas'); if (cv) FAB.desenhaMapa(cv, F(), Z, true); }
/* o mapa enche a altura que sobra (casinha com número inteiro de pixels); a lupa +/− dela ajusta */
function zAuto() {
  var sc = FAB.$('fzScroll'); if (!sc) return Z;
  var H = sc.clientHeight - 16, base = Math.max(1.5, H / (12 * 16)), z = base * (1 + .25 * (FAB.E.prefs.zoomFase || 0));
  return Math.max(16, Math.floor(16 * Math.min(6, z))) / 16;
}
function reZoom() { var z = zAuto(); if (z !== Z) { Z = z; redesenha(); } }
function poe(i, j, t) {
  var f = F(); if (j < 0 || j > 11 || i < 0 || i >= f.mapa[0].length) return;
  var ch = letra(t);
  if (t === 'inicio') f.mapa = f.mapa.map(function (l) { return l.replace(/@/g, '.'); });   /* só um começo */
  var L = f.mapa[j]; if (L[i] === ch) return;
  if ((L[i] === '@' || L[i] === 'F') && t !== 'inicio' && t !== 'bandeira') { FAB.ui.toast(L[i] === '@' ? 'O começo do herói não pode sumir. Ponha ele em outro lugar.' : 'Toda fase precisa de bandeira.', true); arrastando = false; return; }
  if (L[i] === 'F' && t === 'inicio' || L[i] === '@' && t === 'bandeira') return;
  if (t === 'bandeira' && (f.mapa.join('').match(/F/g) || []).length >= 3) { FAB.ui.toast('Já tem 3 bandeiras nesta fase.', true); return; }
  f.mapa[j] = L.slice(0, i) + ch + L.slice(i + 1);
  redesenha();
}
var donoDesfaz = '';
function snap() { var dono = FAB.E.atual + '|' + fase; if (dono !== donoDesfaz) { desfaz = []; donoDesfaz = dono; } desfaz.push(JSON.stringify(F().mapa)); if (desfaz.length > 60) desfaz.shift(); }
function celula(ev) { var r = FAB.$('fzCanvas').getBoundingClientRect(); return [Math.floor((ev.clientX - r.left) / r.width * F().mapa[0].length), Math.floor((ev.clientY - r.top) / r.height * 12)]; }

function pecas() {
  var h = '';
  FAB.GRUPOS_PECAS.forEach(function (G) {
    h += '<div><h4>' + G.nome + '</h4><div class="gp">';
    G.tipos.forEach(function (t) {
      if (!FAB.TIPOS[t]) return;
      h += '<button class="peca' + (peca === t ? ' on' : '') + '" data-t="' + t + '" title="' + FAB.esc(FAB.nomeTipo(t)) + '">' + FAB.icoTipo(t, 36) + (FAB.TIPOS[t].oficina ? '<span class="nov">novo</span>' : '') + '</button>';
    });
    h += '</div></div>';
  });
  h += '<div><h4>Apagar</h4><div class="gp"><button class="peca' + (peca === '__apaga' ? ' on' : '') + '" data-t="__apaga" title="Borracha">' + FAB.ico('lixo', 34) + '</button></div></div>';
  return h;
}
function nomePeca() {
  if (peca === '__apaga') /* falado */ return 'Borracha: apaga a casinha.';
  var T = FAB.TIPOS[peca], extra = {   /* falado */ inicio: ' Onde o herói começa.', bandeira: ' Onde a fase termina.', placa: ' Faz uma pergunta.', controle: ' Volta para cá se perder vida.', nuvem: ' Dá para subir por baixo.', gelo: ' Escorrega!', agua: ' Dá para nadar.', mola: ' Pula bem alto.' }[peca] || '';
  return FAB.nomeTipo(peca) + '.' + extra;
}

function monta(C) {
  var J = FAB.jogo(), f = F();
  var abas = J.fases.map(function (x, i) { return '<button class="aba' + (i === fase ? ' on' : '') + '" data-f="' + i + '">' + FAB.esc(x.nome || ('Fase ' + (i + 1))) + '</button>'; }).join('');
  C.innerHTML =
    '<div class="fz-barra">' + abas +
      (J.fases.length < MAXF ? '<button class="aba" id="fzNova">' + FAB.ico('mais', 20) + ' Fase nova</button>' : '') +
      '<span style="flex:1"></span>' +
      '<button class="bt cinza" id="fzZm" title="Mapa menor">' + FAB.ico('zoom_menos', 22) + '</button><button class="bt cinza" id="fzZp" title="Mapa maior">' + FAB.ico('zoom_mais', 22) + '</button>' +
      '<button class="bt cinza" id="fzEsq" title="Ver mais para trás">◀</button><button class="bt cinza" id="fzDir" title="Ver mais para frente">▶</button>' +
      '<button class="bt cinza" id="fzCen">' + FAB.ico('t_ideia', 22) + 'Cenário</button>' +
      '<button class="bt cinza" id="fzMenos" title="Fase mais curta">−</button><button class="bt cinza" id="fzMais" title="Fase mais comprida">+</button>' +
      '<button class="bt cinza" id="fzDesf">' + FAB.ico('desfazer', 22) + 'Desfazer</button>' +
      (J.fases.length > 1 ? '<button class="bt cinza" id="fzApaga" title="Apagar esta fase">' + FAB.ico('lixo', 22) + '</button>' : '') +
    '</div>' +
    '<div class="fz-wrap' + (FAB.E.prefs.pecasFechadas ? ' fechadas' : '') + '" id="fzWrap"><div class="pecas" id="fzPecas">' + pecas() + '</div>' +
      '<div class="fz-mapa"><div id="fzScroll"><canvas id="fzCanvas"></canvas></div>' +
      '<div class="dica-peca"><button class="bt cinza fz-gaveta" id="fzGaveta" title="Mostrar ou esconder as peças">' + FAB.ico(FAB.E.prefs.pecasFechadas ? 's_dir' : 's_esq', 18) + '<span id="fzAtual">' + (peca === '__apaga' ? FAB.ico('lixo', 26) : FAB.icoTipo(peca, 26)) + '</span>Peças</button><span id="fzDica">' + FAB.esc(nomePeca()) + '</span></div></div></div>';
  Z = zAuto(); redesenha();
  if (window.ResizeObserver) new ResizeObserver(reZoom).observe(FAB.$('fzScroll'));
  FAB.$('fzGaveta').onclick = function () { FAB.E.prefs.pecasFechadas = !FAB.E.prefs.pecasFechadas; FAB.salva(); FAB.$('fzWrap').classList.toggle('fechadas', FAB.E.prefs.pecasFechadas); this.querySelector('svg').outerHTML = FAB.ico(FAB.E.prefs.pecasFechadas ? 's_dir' : 's_esq', 18); };
  FAB.$('fzZm').onclick = function () { FAB.E.prefs.zoomFase = Math.max(-2, (FAB.E.prefs.zoomFase || 0) - 1); FAB.salva(); reZoom(); };
  FAB.$('fzZp').onclick = function () { FAB.E.prefs.zoomFase = Math.min(4, (FAB.E.prefs.zoomFase || 0) + 1); FAB.salva(); reZoom(); };
  C.querySelectorAll('[data-f]').forEach(function (b) { b.onclick = function () { fase = +b.dataset.f; desfaz = []; monta(C); }; });
  C.querySelectorAll('.peca').forEach(function (b) { b.onclick = function () { peca = b.dataset.t; C.querySelectorAll('.peca').forEach(function (x) { x.classList.toggle('on', x === b); }); FAB.$('fzDica').textContent = nomePeca(); FAB.$('fzAtual').innerHTML = peca === '__apaga' ? FAB.ico('lixo', 26) : FAB.icoTipo(peca, 26); FAB.fala(nomePeca()); }; });
  var nv = FAB.$('fzNova'); if (nv) nv.onclick = function () {
    var w = 40, rep = function (c, n) { return Array(n + 1).join(c); };
    var base = { nome: 'Fase ' + (J.fases.length + 1), cenario: ['dia', 'tarde', 'noite', 'caverna', 'mar', 'espaco', 'doce'][J.fases.length % 7], mapa: [] };
    for (var j = 0; j < 9; j++) base.mapa.push(rep('.', w));
    base.mapa.push('.@' + rep('.', w - 4) + 'F.', rep('#', w), rep('T', w));
    J.fases.push(base); fase = J.fases.length - 1; desfaz = []; FAB.mudou(); monta(C); FAB.ui.toast('Fase nova! Ligue as fases chegando na bandeira.', true);
  };
  var ap = FAB.$('fzApaga'); if (ap) ap.onclick = function () {
    FAB.ui.abre('<h2>' + FAB.trf('Apagar a {0}?', [FAB.esc(FAB.tr(f.nome))]) + '</h2><p class="mut" style="margin-bottom:14px">Dica: tire uma foto do jogo antes (no Diário).</p><div class="linha"><button class="bt rosa" id="apSim">Apagar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
    FAB.$('apSim').onclick = function () { J.fases.splice(fase, 1); fase = 0; desfaz = []; FAB.mudou(); FAB.ui.fecha(); monta(C); };
  };
  FAB.$('fzEsq').onclick = function () { FAB.$('fzScroll').scrollBy({ left: -320, behavior: 'smooth' }); };
  FAB.$('fzDir').onclick = function () { FAB.$('fzScroll').scrollBy({ left: 320, behavior: 'smooth' }); };
  FAB.$('fzCen').onclick = function () {
    FAB.ui.escolhe('Onde acontece esta fase?', 'Escolha o cenário', Object.keys(FAB.CENARIOS).map(function (k) {
      var c = FAB.CENARIOS[k]; return { id: k, nome: c.nome, ico: '<span style="width:90px;height:44px;border-radius:10px;border:2px solid #1a1c2c;background:linear-gradient(' + c.ceu[0] + ',' + c.ceu[1] + ')"></span>' };
    }), function (k) { f.cenario = k; FAB.mudou(); monta(C); });
  };
  FAB.$('fzMais').onclick = function () { snap(); var n = Math.min(MAXW, f.mapa[0].length + 10); f.mapa = f.mapa.map(function (l, j) { var ch = l.slice(-1) === 'F' || l.slice(-1) === '@' ? '.' : l.slice(-1); return l + Array(n - l.length + 1).join(j >= 10 ? ch : '.'); }); FAB.mudou(); redesenha(); };
  FAB.$('fzMenos').onclick = function () {
    var n = Math.max(MINW, f.mapa[0].length - 10); if (n === f.mapa[0].length) return;
    var corta = f.mapa.some(function (l) { return /[@F]/.test(l.slice(n)); });
    if (corta) { FAB.ui.toast('O começo ou a bandeira estão no pedaço que ia sumir.', true); return; }
    snap(); f.mapa = f.mapa.map(function (l) { return l.slice(0, n); }); FAB.mudou(); redesenha();
  };
  FAB.$('fzDesf').onclick = function () { if (!desfaz.length || donoDesfaz !== FAB.E.atual + '|' + fase) return; f.mapa = JSON.parse(desfaz.pop()); FAB.mudou(); redesenha(); };
  var cv = FAB.$('fzCanvas');
  cv.oncontextmenu = function (e) { e.preventDefault(); };
  cv.onpointerdown = function (ev) {
    ev.preventDefault(); cv.setPointerCapture(ev.pointerId); snap(); arrastando = ev.button === 2 ? '__apaga' : peca;
    var c = celula(ev); ultimo = c[0] + ',' + c[1]; poe(c[0], c[1], arrastando);
    if (arrastando === 'inicio' || arrastando === 'bandeira') arrastando = false;
  };
  cv.onpointermove = function (ev) { if (!arrastando) return; var c = celula(ev), k = c[0] + ',' + c[1]; if (k !== ultimo) { ultimo = k; poe(c[0], c[1], arrastando); } };
  cv.onpointerup = cv.onpointercancel = function () { if (arrastando !== null) { arrastando = false; FAB.mudou(); } };
}

FAB.T.fases = { nome: 'Fases', ajuda: 'Escolha uma peça e pinte o caminho do herói.', monta: monta };
FAB.faseEditor = function (i) { fase = i; };
})();
