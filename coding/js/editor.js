/* ============================================================
   editor.js — o EDITOR DE FASES (tela "Fases")
   Ela escolhe a peça na esquerda e pinta no mapa (12 a 48 linhas;
   a fase alta rola para cima e para baixo). Botão direito ou a
   borracha apaga. Pode ter até 5 fases. "Fase nova" escolhe o
   formato: Reta, Torre que sobe, Poço que desce, Lago aquático.
   ============================================================ */
(function () {
'use strict';
var fase = 0, peca = 'moeda', desfaz = [], arrastando = false, Z = 2, ultimo = null;
var MAXF = 5, MINW = 20, MAXW = 120, MINH = 12, MAXH = 48, PASSOH = 6;

function F() { var J = FAB.jogo(); if (fase >= J.fases.length) fase = 0; return J.fases[fase]; }
function letra(t) { return t === '__apaga' ? '.' : FAB.TIPOS[t].letra; }
function tipoDe(ch) { for (var k in FAB.TIPOS) if (FAB.TIPOS[k].letra === ch) return k; return null; }

/* fase de nadar: peça desenhada no meio da água fica com água por trás (o motor faz o mesmo) */
function molhadas(f) {
  var M = {}, m = f.mapa; if (!f.nada) return M;
  function agua(i, j) { return tipoDe((m[j] || '')[i]) === 'agua' || !!M[i + ',' + j]; }
  for (var j = 1; j < m.length; j++) for (var i = 0; i < m[j].length; i++) {
    var t = tipoDe(m[j][i]); if (!t) continue; var cl = FAB.TIPOS[t].classe;
    if (cl === 'solido' || cl === 'nuvem' || cl === 'agua' || cl === 'escada' || cl === 'inicio') continue;
    if (agua(i, j - 1) || (tipoDe(m[j][i - 1]) === 'agua' && tipoDe(m[j][i + 1]) === 'agua')) M[i + ',' + j] = 1;
  }
  return M;
}
/* a imagem de uma casinha (grama embaixo de chão vira terra; cano empilhado vira corpo; água funda sem espuma) */
function skinCasa(m, i, j, t) {
  if (t === 'inicio') return FAB.skinDe('heroi');
  var sk = FAB.skinDe(t), cima = j > 0 ? tipoDe(m[j - 1][i]) : null, C = cima && FAB.TIPOS[cima];
  if (t === 'grama' && C && C.classe === 'solido') sk = FAB.skinDe('terra');
  if (FAB.TIPOS[t].cano && C && C.cano) sk = 'canocorpo';
  if (t === 'agua' && sk === 'agua' && cima === 'agua') sk = 'aguafundo';
  return sk;
}
function casa(x, m, i, j, jy, z, grade, M) {
  var t = tipoDe(m[j][i]); if (!t) return;
  var s = 16 * z;
  if (M && M[i + ',' + j]) x.drawImage(FAB.sprCanvas(FAB.skinDe('agua') === 'agua' ? 'aguafundo' : FAB.skinDe('agua'), 0), i * s, jy * s, s, s);
  x.drawImage(FAB.sprCanvas(skinCasa(m, i, j, t), 0), i * s, jy * s, s, s);
  if (t === 'inicio' && grade) { x.strokeStyle = '#63c74d'; x.lineWidth = 2; x.strokeRect(i * s + 1, jy * s + 1, s - 2, s - 2); }
}
function linhaDoComeco(f) { var a = f.mapa.length - 3; f.mapa.forEach(function (l, j) { if (l.indexOf('@') >= 0) a = j; }); return a; }

/* desenha a fase inteira (usado também nas miniaturas do Início).
   Miniatura (sem grade) de fase alta mostra 12 linhas em volta do começo; inteiro = true mostra tudo. */
FAB.desenhaMapa = function (cv, f, z, grade, inteiro) {
  var m = f.mapa, w = m[0].length, H = m.length, r0 = 0, nr = H;
  if (!grade && !inteiro && H > 12) { r0 = Math.max(0, Math.min(H - 12, linhaDoComeco(f) - 8)); nr = 12; }
  var x = cv.getContext('2d');
  cv.width = w * 16 * z; cv.height = nr * 16 * z; x.imageSmoothingEnabled = false;
  var C = FAB.CENARIOS[f.cenario] || FAB.CENARIOS.dia, g = x.createLinearGradient(0, 0, 0, cv.height);
  g.addColorStop(0, C.ceu[0]); g.addColorStop(1, C.ceu[1]); x.fillStyle = g; x.fillRect(0, 0, cv.width, cv.height);
  var M = molhadas(f);
  for (var j = r0; j < r0 + nr; j++) for (var i = 0; i < w; i++) casa(x, m, i, j, j - r0, z, grade, M);
  if (grade) {
    x.strokeStyle = 'rgba(255,255,255,.13)'; x.lineWidth = 1; x.beginPath();
    for (i = 0; i <= w; i++) { x.moveTo(i * 16 * z + .5, 0); x.lineTo(i * 16 * z + .5, cv.height); }
    for (j = 0; j <= nr; j++) { x.moveTo(0, j * 16 * z + .5); x.lineTo(cv.width, j * 16 * z + .5); }
    x.stroke();
  }
};

function redesenha() { var cv = FAB.$('fzCanvas'); if (cv) FAB.desenhaMapa(cv, F(), Z, true); }
/* repinta só a casinha (e a de baixo, que pode virar terra ou corpo de cano): mapa alto fica leve */
function pinta(i, j) {
  var cv = FAB.$('fzCanvas'), f = F(); if (!cv) return;
  var s = 16 * Z, x = cv.getContext('2d');
  if (f.nada || cv.width !== f.mapa[0].length * s || cv.height !== f.mapa.length * s) { redesenha(); return; }
  var C = FAB.CENARIOS[f.cenario] || FAB.CENARIOS.dia, g = x.createLinearGradient(0, 0, 0, cv.height);
  g.addColorStop(0, C.ceu[0]); g.addColorStop(1, C.ceu[1]);
  [j, j + 1].forEach(function (jj) {
    if (jj >= f.mapa.length) return;
    x.fillStyle = g; x.fillRect(i * s, jj * s, s, s);
    casa(x, f.mapa, i, jj, jj, Z, true, null);
    x.strokeStyle = 'rgba(255,255,255,.13)'; x.lineWidth = 1; x.beginPath();
    x.moveTo(i * s + .5, jj * s); x.lineTo(i * s + .5, jj * s + s); x.moveTo(i * s, jj * s + .5); x.lineTo(i * s + s, jj * s + .5); x.stroke();
  });
}
/* o mapa enche a altura que sobra (casinha com número inteiro de pixels); a lupa +/− dela ajusta.
   A janela é de 12 linhas, como no jogo; fase alta rola. Teto do canvas: lado 4096 e 8 milhões de pixels (tablet). */
function zAuto() {
  var sc = FAB.$('fzScroll'); if (!sc) return Z;
  var H = sc.clientHeight - 16, base = Math.max(1.5, H / (12 * 16)), z = base * (1 + .25 * (FAB.E.prefs.zoomFase || 0));
  z = Math.max(16, Math.floor(16 * Math.min(6, z))) / 16;
  var f = F(), wp = f.mapa[0].length * 16, hp = f.mapa.length * 16, zmax = Math.min(4096 / wp, 4096 / hp, Math.sqrt(8e6 / (wp * hp)));
  if (z > zmax) z = Math.max(1, Math.floor(16 * zmax) / 16);
  return z;
}
function reZoom() { var z = zAuto(); if (z !== Z) { Z = z; redesenha(); } }
function poe(i, j, t) {
  var f = F(); if (j < 0 || j >= f.mapa.length || i < 0 || i >= f.mapa[0].length) return;
  var ch = letra(t), todo = false;
  if (t === 'inicio') { f.mapa = f.mapa.map(function (l) { return l.replace(/@/g, '.'); }); todo = true; }   /* só um começo */
  var L = f.mapa[j]; if (L[i] === ch) return;
  if ((L[i] === '@' || L[i] === 'F') && t !== 'inicio' && t !== 'bandeira') { FAB.ui.toast(L[i] === '@' ? 'O começo do herói não pode sumir. Ponha ele em outro lugar.' : 'Toda fase precisa de bandeira.', true); arrastando = false; return; }
  if (L[i] === 'F' && t === 'inicio' || L[i] === '@' && t === 'bandeira') return;
  if (t === 'bandeira' && (f.mapa.join('').match(/F/g) || []).length >= 3) { FAB.ui.toast('Já tem 3 bandeiras nesta fase.', true); return; }
  f.mapa[j] = L.slice(0, i) + ch + L.slice(i + 1);
  if (todo) redesenha(); else pinta(i, j);
  /* peça de poder (pena, luva, cavalo, bolha, cano…) entrou pela primeira vez: as regras dela nascem abertas */
  if (FAB.PACOTES && FAB.PACOTES[t] && FAB.pacoteNasce && FAB.pacoteNasce(FAB.jogo())) {
    arrastando = false; FAB.mudou(); FAB.ui.toast('Peça nova com regra! Veja em Regras e mude o que quiser.', true);
  }
}
var donoDesfaz = '';
function snap() { var dono = FAB.E.atual + '|' + fase; if (dono !== donoDesfaz) { desfaz = []; donoDesfaz = dono; } desfaz.push(JSON.stringify(F().mapa)); if (desfaz.length > 60) desfaz.shift(); }
function celula(ev) { var r = FAB.$('fzCanvas').getBoundingClientRect(), f = F(); return [Math.floor((ev.clientX - r.left) / r.width * f.mapa[0].length), Math.floor((ev.clientY - r.top) / r.height * f.mapa.length)]; }
/* fase alta: mostra o começo do herói */
function rolaParaComeco() {
  var sc = FAB.$('fzScroll'), f = F(); if (!sc || f.mapa.length <= 12) return;
  sc.scrollTop = Math.max(0, linhaDoComeco(f) * 16 * Z - sc.clientHeight / 2);
}

/* jeito da tela (banco/fase_recheio.js): quantas peças e botões aparecem; peça que já está no mapa aparece sempre */
function jeito() { var id = FAB.E.prefs.telaFase || 'pouca'; return FAB.JEITOS_TELA.filter(function (j) { return j.id === id; })[0] || FAB.JEITOS_TELA[0]; }
function temBotao(b) { var J = jeito(); return !J.pecas || J.botoes.indexOf(b) >= 0; }
function pecas() {
  var J = jeito(), noMapa = {}, h = '<div class="jeito-tela">' + FAB.JEITOS_TELA.map(function (x) {
    return '<button class="bt' + (x.id === J.id ? ' on' : ' cinza') + '" data-jt="' + x.id + '" title="' + FAB.esc(x.fala) + '">' + x.nome + '</button>';
  }).join('') + '</div>';
  F().mapa.join('').split('').forEach(function (ch) { var t = tipoDe(ch); if (t) noMapa[t] = 1; });
  FAB.GRUPOS_PECAS.forEach(function (G) {
    var vis = G.tipos.filter(function (t) { return FAB.TIPOS[t] && (!J.pecas || J.pecas.indexOf(t) >= 0 || noMapa[t] || peca === t || FAB.TIPOS[t].oficina); });
    if (!vis.length) return;
    h += '<div><h4>' + G.nome + '</h4><div class="gp">';
    vis.forEach(function (t) {
      h += '<button class="peca' + (peca === t ? ' on' : '') + '" data-t="' + t + '" title="' + FAB.esc(FAB.nomeTipo(t)) + '">' + FAB.icoTipo(t, 36) + (FAB.TIPOS[t].oficina ? '<span class="nov">novo</span>' : '') + '</button>';
    });
    h += '</div></div>';
  });
  h += '<div><h4>Apagar</h4><div class="gp"><button class="peca' + (peca === '__apaga' ? ' on' : '') + '" data-t="__apaga" title="Borracha">' + FAB.ico('lixo', 34) + '</button></div></div>';
  return h;
}
function nomePeca() {
  if (peca === '__apaga') /* falado */ return 'Borracha: apaga a casinha.';
  var T = FAB.TIPOS[peca], extra = {   /* falado */ inicio: ' Onde o herói começa.', bandeira: ' Onde a fase termina.', placa: ' Faz uma pergunta.', controle: ' Volta para cá se perder vida.', nuvem: ' Dá para subir por baixo.', gelo: ' Escorrega!', agua: ' Dá para nadar.', mola: ' Pula bem alto.',
    cipo: ' Segure a seta para cima para subir.', escada: ' Segure a seta para cima para subir.', cano: ' Ponha dois. Em cima de um, aperte a seta para baixo.', portinha: ' Só o herói pequenino passa.',
    bolha: ' Enche o fôlego.', peixe: ' Nada para lá e para cá.', pena: ' Dá o pulo duplo.', luva: ' Gruda na parede.', cogroxo: ' Deixa o herói pequenino.', cavalo: ' Monte nele!' }[peca] || '';
  return FAB.nomeTipo(peca) + '.' + extra;
}

/* "Fase nova": cartões com a miniatura de cada formato */
function escolheFormato(cb) {
  var J = FAB.jogo();
  FAB.ui.escolhe('Que fase você quer?', 'Escolha o formato da fase nova', FAB.FORMATOS.map(function (fo) {
    var f = FAB.faseDoFormato(fo.id, J.fases.length + 1), cv = document.createElement('canvas');
    FAB.desenhaMapa(cv, f, .25, false, true);
    return { id: fo.id, nome: fo.nome, sub: fo.fala, ico: '<img class="pix" alt="" src="' + cv.toDataURL() + '" style="width:120px;height:72px;object-fit:contain;border-radius:8px;background:#0e0c24">' };
  }), cb);
}

/* Fase Reta nova: começa vazia, com algumas coisas ou cheia de ideias */
function escolheRecheio(base, cb) {
  setTimeout(function () {
    FAB.ui.escolhe('Como a fase começa?', 'Escolha como a fase começa', FAB.RECHEIOS.map(function (r) {
      var f = { cenario: base.cenario, mapa: r.mapa }, cv = document.createElement('canvas');
      FAB.desenhaMapa(cv, f, .25, false, true);
      return { id: r.id, nome: r.nome, sub: r.fala, ico: '<img class="pix" alt="" src="' + cv.toDataURL() + '" style="width:120px;height:72px;object-fit:contain;border-radius:8px;background:#0e0c24">' };
    }), cb);
  }, 60);
}

function monta(C) {
  var J = FAB.jogo(), f = F();
  if (FAB.pacoteNasce && FAB.pacoteNasce(J)) FAB.mudou();
  var alta = f.mapa.length > 12;
  var abas = J.fases.map(function (x, i) { return '<button class="aba' + (i === fase ? ' on' : '') + '" data-f="' + i + '">' + FAB.esc(x.nome || ('Fase ' + (i + 1))) + '</button>'; }).join('');
  C.innerHTML =
    '<div class="fz-barra">' + abas +
      (J.fases.length < MAXF ? '<button class="aba" id="fzNova">' + FAB.ico('mais', 20) + ' Fase nova</button>' : '') +
      '<span style="flex:1"></span>' +
      (temBotao('zoom') ? '<button class="bt cinza" id="fzZm" title="Mapa menor">' + FAB.ico('zoom_menos', 22) + '</button><button class="bt cinza" id="fzZp" title="Mapa maior">' + FAB.ico('zoom_mais', 22) + '</button>' : '') +
      '<button class="bt cinza" id="fzEsq" title="Ver mais para trás">◀</button><button class="bt cinza" id="fzDir" title="Ver mais para frente">▶</button>' +
      (alta ? '<button class="bt cinza" id="fzCima" title="Ver mais para cima">▲</button><button class="bt cinza" id="fzBaixo" title="Ver mais para baixo">▼</button>' : '') +
      '<button class="bt cinza" id="fzCen">' + FAB.ico('t_ideia', 22) + 'Cenário</button>' +
      (temBotao('tamanho') ? '<button class="bt cinza" id="fzMenos" title="Fase mais curta">−</button><button class="bt cinza" id="fzMais" title="Fase mais comprida">+</button>' : '') +
      (temBotao('alto') ? (alta ? '<button class="bt cinza" id="fzBaixa" title="Fase mais baixa">− alto</button>' : '') + '<button class="bt cinza" id="fzAlta" title="Fase mais alta">+ alto</button>' : '') +
      '<button class="bt cinza" id="fzDesf">' + FAB.ico('desfazer', 22) + 'Desfazer</button>' +
      (J.fases.length > 1 && temBotao('apaga') ? '<button class="bt cinza" id="fzApaga" title="Apagar esta fase">' + FAB.ico('lixo', 22) + '</button>' : '') +
    '</div>' +
    '<div class="fz-wrap' + (FAB.E.prefs.pecasFechadas ? ' fechadas' : '') + '" id="fzWrap"><div class="pecas" id="fzPecas">' + pecas() + '</div>' +
      '<div class="fz-mapa"><div id="fzScroll"><canvas id="fzCanvas"></canvas></div>' +
      '<div class="dica-peca"><button class="bt cinza fz-gaveta" id="fzGaveta" title="Mostrar ou esconder as peças">' + FAB.ico(FAB.E.prefs.pecasFechadas ? 's_dir' : 's_esq', 18) + '<span id="fzAtual">' + (peca === '__apaga' ? FAB.ico('lixo', 26) : FAB.icoTipo(peca, 26)) + '</span>Peças</button><span id="fzDica">' + FAB.esc(nomePeca()) + '</span></div></div></div>';
  Z = zAuto(); redesenha(); rolaParaComeco();
  if (window.ResizeObserver) new ResizeObserver(reZoom).observe(FAB.$('fzScroll'));
  FAB.$('fzGaveta').onclick = function () { FAB.E.prefs.pecasFechadas = !FAB.E.prefs.pecasFechadas; FAB.salva(); FAB.$('fzWrap').classList.toggle('fechadas', FAB.E.prefs.pecasFechadas); this.querySelector('svg').outerHTML = FAB.ico(FAB.E.prefs.pecasFechadas ? 's_dir' : 's_esq', 18); };
  if (FAB.$('fzZm')) FAB.$('fzZm').onclick = function () { FAB.E.prefs.zoomFase = Math.max(-2, (FAB.E.prefs.zoomFase || 0) - 1); FAB.salva(); reZoom(); };
  if (FAB.$('fzZp')) FAB.$('fzZp').onclick = function () { FAB.E.prefs.zoomFase = Math.min(4, (FAB.E.prefs.zoomFase || 0) + 1); FAB.salva(); reZoom(); };
  C.querySelectorAll('[data-jt]').forEach(function (b) { b.onclick = function () { var x = FAB.JEITOS_TELA.filter(function (j) { return j.id === b.dataset.jt; })[0]; FAB.E.prefs.telaFase = x.id; FAB.salva(); FAB.fala(x.fala); monta(C); }; });
  C.querySelectorAll('[data-f]').forEach(function (b) { b.onclick = function () { fase = +b.dataset.f; desfaz = []; monta(C); }; });
  C.querySelectorAll('.peca').forEach(function (b) { b.onclick = function () { peca = b.dataset.t; C.querySelectorAll('.peca').forEach(function (x) { x.classList.toggle('on', x === b); }); FAB.$('fzDica').textContent = nomePeca(); FAB.$('fzAtual').innerHTML = peca === '__apaga' ? FAB.ico('lixo', 26) : FAB.icoTipo(peca, 26); FAB.fala(nomePeca()); }; });
  var nv = FAB.$('fzNova'); if (nv) nv.onclick = function () {
    escolheFormato(function (id) {
      var nova = FAB.faseDoFormato(id, J.fases.length + 1);
      function poe(f) {
        J.fases.push(f); fase = J.fases.length - 1; desfaz = [];
        FAB.pacoteNasce && FAB.pacoteNasce(J);
        FAB.mudou(); monta(C); FAB.ui.toast('Fase nova! Ligue as fases chegando na bandeira.', true);
      }
      if (id !== 'reta') return poe(nova);
      escolheRecheio(nova, function (r) { nova.mapa = FAB.RECHEIOS.filter(function (x) { return x.id === r; })[0].mapa.slice(); if (r !== 'vazia') nova.recheio = r; poe(nova); });
    });
  };
  var ap = FAB.$('fzApaga'); if (ap) ap.onclick = function () {
    FAB.ui.abre('<h2>' + FAB.trf('Apagar a {0}?', [FAB.esc(FAB.tr(f.nome))]) + '</h2><p class="mut" style="margin-bottom:14px">Dica: tire uma foto do jogo antes (no Diário).</p><div class="linha"><button class="bt rosa" id="apSim">Apagar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
    FAB.$('apSim').onclick = function () { J.fases.splice(fase, 1); fase = 0; desfaz = []; FAB.mudou(); FAB.ui.fecha(); monta(C); };
  };
  FAB.$('fzEsq').onclick = function () { FAB.$('fzScroll').scrollBy({ left: -320, behavior: 'smooth' }); };
  FAB.$('fzDir').onclick = function () { FAB.$('fzScroll').scrollBy({ left: 320, behavior: 'smooth' }); };
  if (alta) {
    FAB.$('fzCima').onclick = function () { FAB.$('fzScroll').scrollBy({ top: -240, behavior: 'smooth' }); };
    FAB.$('fzBaixo').onclick = function () { FAB.$('fzScroll').scrollBy({ top: 240, behavior: 'smooth' }); };
  }
  FAB.$('fzCen').onclick = function () {
    FAB.ui.escolhe('Onde acontece esta fase?', 'Escolha o cenário', Object.keys(FAB.CENARIOS).map(function (k) {
      var c = FAB.CENARIOS[k]; return { id: k, nome: c.nome, ico: '<span style="width:90px;height:44px;border-radius:10px;border:2px solid #1a1c2c;background:linear-gradient(' + c.ceu[0] + ',' + c.ceu[1] + ')"></span>' };
    }), function (k) { f.cenario = k; FAB.mudou(); monta(C); });
  };
  if (FAB.$('fzMais')) FAB.$('fzMais').onclick = function () { snap(); var n = Math.min(MAXW, f.mapa[0].length + 10), H = f.mapa.length; f.mapa = f.mapa.map(function (l, j) { var ch = l.slice(-1) === 'F' || l.slice(-1) === '@' ? '.' : l.slice(-1); return l + Array(n - l.length + 1).join(j >= H - 2 ? ch : '.'); }); FAB.mudou(); redesenha(); };
  if (FAB.$('fzMenos')) FAB.$('fzMenos').onclick = function () {
    var n = Math.max(MINW, f.mapa[0].length - 10); if (n === f.mapa[0].length) return;
    var corta = f.mapa.some(function (l) { return /[@F]/.test(l.slice(n)); });
    if (corta) { FAB.ui.toast('O começo ou a bandeira estão no pedaço que ia sumir.', true); return; }
    snap(); f.mapa = f.mapa.map(function (l) { return l.slice(0, n); }); FAB.mudou(); redesenha();
  };
  /* mais alta: linhas vazias entram EM CIMA (o chão continua embaixo, nada do que ela pintou sai do lugar) */
  if (FAB.$('fzAlta')) FAB.$('fzAlta').onclick = function () {
    if (f.mapa.length >= MAXH) { FAB.ui.toast('A fase já está no tamanho mais alto.', true); return; }
    snap(); var w = f.mapa[0].length, n = Math.min(PASSOH, MAXH - f.mapa.length), novas = [];
    for (var k = 0; k < n; k++) novas.push(Array(w + 1).join('.'));
    f.mapa = novas.concat(f.mapa); FAB.mudou(); monta(C);
    FAB.$('fzScroll').scrollTop = 0;
  };
  var bx = FAB.$('fzBaixa'); if (bx) bx.onclick = function () {
    var n = Math.min(PASSOH, f.mapa.length - MINH); if (n <= 0) return;
    if (f.mapa.slice(0, n).some(function (l) { return /[@F]/.test(l); })) { FAB.ui.toast('O começo ou a bandeira estão no pedaço que ia sumir.', true); return; }
    snap(); f.mapa = f.mapa.slice(n); FAB.mudou(); monta(C);
  };
  FAB.$('fzDesf').onclick = function () { if (!desfaz.length || donoDesfaz !== FAB.E.atual + '|' + fase) return; var antes = f.mapa.length; f.mapa = JSON.parse(desfaz.pop()); FAB.mudou(); if (f.mapa.length !== antes) monta(C); else redesenha(); };
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
