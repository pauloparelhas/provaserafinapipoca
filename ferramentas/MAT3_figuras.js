/* ============================================================
   MAT3_figuras.js — figuras SVG das questões discursivas de Math (3º tri)
   Criado em 13/11/2026. Usado por MAT3_discursivas.html (folha da criança)
   e MAT3_guia_responsavel.html (guia do pai/mãe). Figura é conteúdo:
   desenho limpo, traço preto, poucas cores, imprime bem em P&B.
   ============================================================ */
(function () {
  var K = '#222', F = 'font-family:Comic Sans MS,Comic Neue,Arial,sans-serif';
  function svg(w, h, body, cls) {
    return '<svg class="fig ' + (cls || '') + '" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h +
      '" xmlns="http://www.w3.org/2000/svg" role="img">' + body + '</svg>';
  }
  function t(x, y, s, size, extra) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 14) + '" text-anchor="middle" style="' + F + '" fill="' + K + '" ' +
      (extra || '') + '>' + s + '</text>';
  }

  /* ---- T1 medidas ---- */
  function lapis(x, y, len, label) {
    var h = 16, tip = 22;
    return '<rect x="' + x + '" y="' + y + '" width="12" height="' + h + '" rx="3" fill="#f4a7b9" stroke="' + K + '"/>' +
      '<rect x="' + (x + 12) + '" y="' + y + '" width="' + (len - 12 - tip) + '" height="' + h + '" fill="#ffd24d" stroke="' + K + '"/>' +
      '<polygon points="' + (x + len - tip) + ',' + y + ' ' + (x + len) + ',' + (y + h / 2) + ' ' + (x + len - tip) + ',' + (y + h) + '" fill="#f3e0c0" stroke="' + K + '"/>' +
      '<polygon points="' + (x + len - 7) + ',' + (y + h / 2 - 3) + ' ' + (x + len) + ',' + (y + h / 2) + ' ' + (x + len - 7) + ',' + (y + h / 2 + 3) + '" fill="' + K + '"/>' +
      (label ? t(x - 16, y + 13, label, 16, 'font-weight="bold"') : '');
  }
  function arvore(cx, base, alt, label) {
    var tr = Math.max(14, alt * 0.28);
    return '<rect x="' + (cx - 6) + '" y="' + (base - tr) + '" width="12" height="' + tr + '" fill="#a0703c" stroke="' + K + '"/>' +
      '<ellipse cx="' + cx + '" cy="' + (base - tr - (alt - tr) / 2) + '" rx="' + Math.max(22, alt * 0.3) + '" ry="' + ((alt - tr) / 2) + '" fill="#7cc576" stroke="' + K + '"/>' +
      t(cx, base + 20, label, 16, 'font-weight="bold"');
  }
  function livro(x, y, w, label) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="70" rx="4" fill="#9ec9f0" stroke="' + K + '"/>' +
      '<line x1="' + (x + 8) + '" y1="' + y + '" x2="' + (x + 8) + '" y2="' + (y + 70) + '" stroke="' + K + '"/>' +
      t(x + w / 2, y + 92, label, 16, 'font-weight="bold"');
  }

  /* ---- T2 perímetro ---- */
  function retangulo(w, h, a, b, cor) {
    var W = w + 120, H = h + 70, x = 60, y = 30;
    return svg(W, H,
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (cor || '#cfe8ff') + '" stroke="' + K + '" stroke-width="2"/>' +
      t(x + w / 2, y - 8, a + ' cm', 15) + t(x + w / 2, y + h + 22, a + ' cm', 15) +
      t(x - 28, y + h / 2 + 5, b + ' cm', 15) + t(x + w + 28, y + h / 2 + 5, b + ' cm', 15));
  }
  function triangulo(s) {
    return svg(220, 170,
      '<polygon points="110,20 200,150 20,150" fill="#e6d6ff" stroke="' + K + '" stroke-width="2"/>' +
      t(48, 84, s + ' cm', 15) + t(172, 84, s + ' cm', 15) + t(110, 168, s + ' cm', 15));
  }

  /* ---- T3 sólidos (traço isométrico simples) ---- */
  var S = {
    cube: function () {
      return '<polygon points="20,40 80,40 80,100 20,100" fill="#d9c9ff" stroke="' + K + '" stroke-width="2"/>' +
        '<polygon points="20,40 45,18 105,18 80,40" fill="#ebe1ff" stroke="' + K + '" stroke-width="2"/>' +
        '<polygon points="80,40 105,18 105,78 80,100" fill="#bfa8f5" stroke="' + K + '" stroke-width="2"/>' +
        '<g stroke="' + K + '" stroke-dasharray="4 4"><line x1="45" y1="18" x2="45" y2="78"/><line x1="45" y1="78" x2="20" y2="100"/><line x1="45" y1="78" x2="105" y2="78"/></g>';
    },
    cuboid: function () {
      return '<polygon points="10,45 100,45 100,95 10,95" fill="#ffe08a" stroke="' + K + '" stroke-width="2"/>' +
        '<polygon points="10,45 32,25 122,25 100,45" fill="#fff0bf" stroke="' + K + '" stroke-width="2"/>' +
        '<polygon points="100,45 122,25 122,75 100,95" fill="#f2c94c" stroke="' + K + '" stroke-width="2"/>' +
        '<g stroke="' + K + '" stroke-dasharray="4 4"><line x1="32" y1="25" x2="32" y2="75"/><line x1="32" y1="75" x2="10" y2="95"/><line x1="32" y1="75" x2="122" y2="75"/></g>';
    },
    pyramid: function () {
      return '<polygon points="15,95 85,95 65,20" fill="#ffc9a8" stroke="' + K + '" stroke-width="2"/>' +
        '<polygon points="85,95 110,75 65,20" fill="#f4a57a" stroke="' + K + '" stroke-width="2"/>' +
        '<g stroke="' + K + '" stroke-dasharray="4 4"><line x1="15" y1="95" x2="40" y2="75"/><line x1="40" y1="75" x2="110" y2="75"/><line x1="40" y1="75" x2="65" y2="20"/></g>';
    },
    cylinder: function () {
      return '<rect x="25" y="25" width="70" height="70" fill="#a8e0c0" stroke="none"/>' +
        '<line x1="25" y1="25" x2="25" y2="95" stroke="' + K + '" stroke-width="2"/><line x1="95" y1="25" x2="95" y2="95" stroke="' + K + '" stroke-width="2"/>' +
        '<path d="M25,95 A35,11 0 0 0 95,95" fill="#a8e0c0" stroke="' + K + '" stroke-width="2"/>' +
        '<path d="M25,95 A35,11 0 0 1 95,95" fill="none" stroke="' + K + '" stroke-dasharray="4 4"/>' +
        '<ellipse cx="60" cy="25" rx="35" ry="11" fill="#cdf0dc" stroke="' + K + '" stroke-width="2"/>';
    },
    cone: function () {
      return '<path d="M25,92 L60,15 L95,92 A35,11 0 0 1 25,92 Z" fill="#ffd6e7" stroke="' + K + '" stroke-width="2"/>' +
        '<path d="M25,92 A35,11 0 0 1 95,92" fill="none" stroke="' + K + '" stroke-dasharray="4 4"/>';
    },
    sphere: function () {
      return '<circle cx="60" cy="58" r="42" fill="#b9dcff" stroke="' + K + '" stroke-width="2"/>' +
        '<path d="M18,58 A42,12 0 0 0 102,58" fill="none" stroke="' + K + '"/>' +
        '<path d="M18,58 A42,12 0 0 1 102,58" fill="none" stroke="' + K + '" stroke-dasharray="4 4"/>';
    }
  };
  function solido(nome, letra) {
    return svg(130, 130, S[nome]() + (letra ? t(65, 124, letra, 17, 'font-weight="bold"') : ''), 'solido');
  }

  /* ---- T4 gráfico de barras ---- */
  function barras(cats, vals, max, titulo, vazio) {
    var cw = 70, x0 = 40, y0 = 30, hU = 26, W = x0 + cats.length * cw + 20, H = y0 + max * hU + 50, s = '';
    s += t(W / 2, 18, titulo, 15, 'font-weight="bold"');
    for (var i = 0; i <= max; i++) {
      var y = y0 + (max - i) * hU;
      s += '<line x1="' + x0 + '" y1="' + y + '" x2="' + (W - 14) + '" y2="' + y + '" stroke="#bbb" stroke-width="' + (i ? 0.8 : 0) + '"/>' +
        t(x0 - 12, y + 5, i, 13);
    }
    s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 + max * hU) + '" stroke="' + K + '" stroke-width="2"/>' +
      '<line x1="' + x0 + '" y1="' + (y0 + max * hU) + '" x2="' + (W - 14) + '" y2="' + (y0 + max * hU) + '" stroke="' + K + '" stroke-width="2"/>';
    var cores = ['#5aa9e6', '#f28fad', '#f7a64a', '#8bc34a', '#b48ce8'];
    cats.forEach(function (c, i) {
      var x = x0 + 14 + i * cw;
      if (!vazio) s += '<rect x="' + x + '" y="' + (y0 + (max - vals[i]) * hU) + '" width="' + (cw - 28) + '" height="' + (vals[i] * hU) + '" fill="' + cores[i % 5] + '" stroke="' + K + '"/>';
      s += t(x + (cw - 28) / 2, y0 + max * hU + 20, c, 13);
    });
    return svg(W, H, s, 'grafico');
  }

  /* ---- T6/T7 grupos de objetos ---- */
  var OBJ = {
    strawberry: function (x, y) { return '<path d="M' + x + ',' + (y - 9) + ' C' + (x + 11) + ',' + (y - 9) + ' ' + (x + 10) + ',' + (y + 4) + ' ' + x + ',' + (y + 11) + ' C' + (x - 10) + ',' + (y + 4) + ' ' + (x - 11) + ',' + (y - 9) + ' ' + x + ',' + (y - 9) + 'Z" fill="#ef5350" stroke="' + K + '"/><path d="M' + (x - 5) + ',' + (y - 9) + ' L' + x + ',' + (y - 14) + ' L' + (x + 5) + ',' + (y - 9) + '" fill="#66bb6a" stroke="' + K + '"/>'; },
    cookie: function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="10" fill="#d9a066" stroke="' + K + '"/><circle cx="' + (x - 3) + '" cy="' + (y - 3) + '" r="1.8" fill="#5d3a1a"/><circle cx="' + (x + 4) + '" cy="' + (y + 1) + '" r="1.8" fill="#5d3a1a"/><circle cx="' + (x - 1) + '" cy="' + (y + 5) + '" r="1.8" fill="#5d3a1a"/>'; },
    star: function (x, y) { var p = [], i, r; for (i = 0; i < 10; i++) { r = i % 2 ? 4.5 : 11; p.push((x + r * Math.sin(i * Math.PI / 5)).toFixed(1) + ',' + (y - r * Math.cos(i * Math.PI / 5)).toFixed(1)); } return '<polygon points="' + p.join(' ') + '" fill="#ffd54f" stroke="' + K + '"/>'; },
    ball: function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="10" fill="#4fc3f7" stroke="' + K + '"/><path d="M' + (x - 10) + ',' + y + ' Q' + x + ',' + (y + 6) + ' ' + (x + 10) + ',' + y + '" fill="none" stroke="' + K + '"/>'; },
    cherry: function (x, y) { return '<path d="M' + x + ',' + (y - 2) + ' Q' + (x + 1) + ',' + (y - 12) + ' ' + (x + 7) + ',' + (y - 15) + '" fill="none" stroke="#3e7d32" stroke-width="2"/><circle cx="' + x + '" cy="' + (y + 4) + '" r="8" fill="#d32f2f" stroke="' + K + '"/><circle cx="' + (x - 3) + '" cy="' + (y + 1) + '" r="2" fill="#fff" opacity=".7"/>'; },
    orange: function (x, y) { return '<circle cx="' + x + '" cy="' + (y + 1) + '" r="10" fill="#fb8c00" stroke="' + K + '"/><path d="M' + x + ',' + (y - 9) + ' q4,-5 8,-3" fill="#66bb6a" stroke="' + K + '"/>'; },
    apple: function (x, y) { return '<circle cx="' + x + '" cy="' + (y + 1) + '" r="10" fill="#e53935" stroke="' + K + '"/><line x1="' + x + '" y1="' + (y - 9) + '" x2="' + (x + 2) + '" y2="' + (y - 15) + '" stroke="' + K + '" stroke-width="2"/>'; }
  };
  /* grupos: n círculos com k objetos cada (k ≤ 6, 3 por linha) */
  function grupos(n, k, obj) {
    var gw = 104, W = n * (gw + 10) + 10, s = '';
    for (var g = 0; g < n; g++) {
      var cx = 10 + g * (gw + 10) + gw / 2;
      s += '<ellipse cx="' + cx + '" cy="52" rx="' + (gw / 2) + '" ry="44" fill="#fff" stroke="#4a7bd1" stroke-width="2"/>';
      var linhas = Math.ceil(k / 3);
      for (var i = 0; i < k; i++) {
        var row = Math.floor(i / 3), nr = Math.min(3, k - row * 3), col = i % 3;
        s += OBJ[obj](cx + (col - (nr - 1) / 2) * 28, 52 + (row - (linhas - 1) / 2) * 30);
      }
    }
    return svg(W, 104, s, 'grupos');
  }
  /* soltos: total objetos numa fileira (para repartir) */
  function soltos(total, obj) {
    var por = Math.min(total, 6), W = por * 30 + 20, H = Math.ceil(total / por) * 30 + 14, s = '';
    for (var i = 0; i < total; i++) s += OBJ[obj](25 + (i % por) * 30, 22 + Math.floor(i / por) * 30);
    return svg(W, H, s, 'soltos');
  }
  /* pratos/caixas vazios para desenhar a partilha */
  function vazios(n, rotulo) {
    var W = n * 130 + 10, s = '';
    for (var g = 0; g < n; g++) {
      var x = 10 + g * 130;
      s += '<rect x="' + x + '" y="8" width="118" height="84" rx="14" fill="#fff" stroke="' + K + '" stroke-width="2" stroke-dasharray="6 4"/>' +
        t(x + 59, 110, rotulo + ' ' + (g + 1), 13);
    }
    return svg(W, 118, s, 'vazios');
  }

  /* mãos abertas: n mãos com 5 dedos */
  function maos(n) {
    var s = '', W = n * 120 + 10;
    for (var g = 0; g < n; g++) {
      var x = 10 + g * 120 + 60, y = 112;
      /* 4 dedos bem separados (leque) + polegar de lado: os 5 contáveis sem sobreposição */
      [[-21, 36, -14], [-7, 46, -5], [7, 48, 5], [21, 38, 14]].forEach(function (f) {
        var bx = x + f[0] * 0.75, by = y - 46;
        s += '<rect x="' + (bx - 5) + '" y="' + (by - f[1]) + '" width="10" height="' + (f[1] + 6) + '" rx="5" fill="#ffd9b8" stroke="' + K + '" stroke-width="1.8" transform="rotate(' + f[2] + ' ' + bx + ' ' + by + ')"/>';
      });
      s += '<rect x="' + (x - 27) + '" y="' + (y - 54) + '" width="11" height="40" rx="5.5" fill="#ffd9b8" stroke="' + K + '" stroke-width="1.8" transform="rotate(-48 ' + (x - 21) + ' ' + (y - 16) + ')"/>';
      s += '<rect x="' + (x - 24) + '" y="' + (y - 50) + '" width="48" height="50" rx="16" fill="#ffd9b8" stroke="' + K + '" stroke-width="2"/>';
    }
    return svg(W, 122, s, 'maos');
  }

  /* escala com as 5 caixas vazias e "?" na caixa q (0 = topo): pergunta do banco sem entregar as palavras */
  function escalaVazia(q) {
    var s = '';
    for (var i = 0; i < 5; i++) {
      s += '<rect x="22" y="' + (12 + i * 34) + '" width="112" height="26" rx="6" fill="#fff" stroke="#701a75" stroke-width="2"/>';
      if (i === q) s += t(78, 31 + i * 34, '?', 20, 'font-weight="bold" fill="#701a75"');
    }
    s += '<rect x="160" y="34" width="12" height="150" fill="#a21caf"/><polygon points="150,36 182,36 166,8" fill="#a21caf"/>';
    return svg(200, 192, s, 'escala');
  }
  window.MAT3F = {
    maos: maos,
    escalaVazia: escalaVazia,
    svg: svg,
    lapis2: function () { return svg(330, 90, lapis(30, 14, 280, 'A') + lapis(30, 56, 150, 'B')); },
    arvores2: function () { return svg(260, 190, arvore(70, 160, 70, 'A') + arvore(190, 160, 140, 'B')); },
    livros2: function () { return svg(300, 110, livro(30, 6, 46, 'A') + livro(130, 6, 140, 'B')); },
    retangulo: retangulo, triangulo: triangulo,
    quadrado: function (s) { return retangulo(110, 110, s, s, '#ffd6e7'); },
    solido: solido,
    barras: barras,
    grupos: grupos, soltos: soltos, vazios: vazios
  };
})();
