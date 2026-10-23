/* ============================================================
   motor.js — o MOTOR que roda o jogo da Mariana
   Plataforma 2D em pixel art. Mapa de 12 linhas, casinha de 16 px.
   O motor sabe FÍSICA (chão, pulo, nuvem, gelo, água, inimigos);
   o que acontece quando o herói toca em algo vem das REGRAS dela.

   API
     FAB.motor.inicia(canvas, jogo, {fase, convidado, lupa,
        onHud(S), onLog(txt, idRegra, tipo), onFim(resumo),
        onPergunta(q, responde(certo)), onFase(nome)})
     FAB.motor.para() · pausa(bool) · tecla(nome, apertada) · lupa(bool)
   ============================================================ */
(function () {
'use strict';
var TS = 16, LINHAS = 12, VH = LINHAS * TS;
var GRAV = 900, PULO = 330, SUPER = 480, VEL = 90, MAXQ = 420;

var M = {}, cv, cx, J, O, W, H, S, heroi, ents, parts, cam, raf, tAnt, pausado, rodando, LUPA;
var geracao = 0, teclas = {}, tPulo = 0, tChao = 0, relogios = {}, pontosDisp = {}, falaB = null, treme = 0;
var letraTipo = {};
function montaLetras() { letraTipo = {}; Object.keys(FAB.TIPOS).forEach(function (t) { letraTipo[FAB.TIPOS[t].letra] = t; }); }

/* ---------------- som (sintetizado, sem arquivo) ---------------- */
var AC = null;
function audio() { if (AC) return AC; try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { AC = false; } return AC; }
var SONS = {
  moeda:   { onda: 'square',   notas: [[988, .06], [1319, .12]] },
  pulo:    { onda: 'square',   notas: [[392, .05], [523, .05], [659, .08]] },
  magia:   { onda: 'triangle', notas: [[523, .07], [659, .07], [784, .07], [1047, .14]] },
  ai:      { onda: 'sawtooth', notas: [[330, .08], [220, .16]] },
  vitoria: { onda: 'square',   notas: [[523, .1], [659, .1], [784, .1], [1047, .25]] },
  bum:     { onda: 'sawtooth', notas: [[110, .1], [70, .2]] },
  certo:   { onda: 'triangle', notas: [[659, .08], [988, .16]] },
  errado:  { onda: 'triangle', notas: [[300, .12], [250, .18]] }
};
function toca(nome) {
  if (FAB.mudo) return;
  var s = SONS[nome] || (FAB.SONS_EXTRA && FAB.SONS_EXTRA[nome]); if (!s) return;
  var a = audio(); if (!a) return;
  try {
    var t = a.currentTime;
    s.notas.forEach(function (n) {
      var o = a.createOscillator(), g = a.createGain();
      o.type = s.onda || 'square'; o.frequency.value = n[0];
      g.gain.setValueAtTime(.08, t); g.gain.exponentialRampToValueAtTime(.001, t + n[1]);
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + n[1] + .02); t += n[1] * .8;
    });
  } catch (e) {}
}
M.toca = toca;

/* ---------------- montar a fase ---------------- */
var grade;
function tipoEm(tx, ty) { if (ty < 0 || ty >= LINHAS) return null; var L = grade[ty]; if (!L || tx < 0 || tx >= L.length) return null; return letraTipo[L[tx]] || null; }
function solidoTile(tx, ty) {
  if (tx < 0 || tx >= W) return true;            /* paredes invisíveis nas pontas */
  if (ty < 0 || ty >= LINHAS) return false;
  var t = tipoEm(tx, ty); return !!(t && FAB.TIPOS[t].classe === 'solido');
}
function nuvemTile(tx, ty) { var t = tipoEm(tx, ty); return !!(t && FAB.TIPOS[t].classe === 'nuvem'); }
function geloTile(tx, ty) { var t = tipoEm(tx, ty); return !!(t && FAB.TIPOS[t].escorrega); }

function novaEnt(tipo, x, y) {
  var T = FAB.TIPOS[tipo], e = { tipo: tipo, classe: T.classe, x: x, y: y, w: 16, h: 16, ox: 0, oy: 0, vx: 0, vy: 0, vivo: true, q: 0, t: Math.random() * 3 };
  if (tipo === 'espinho') { e.oy = 7; e.h = 9; }
  if (tipo === 'moeda' || tipo === 'coracao' || tipo === 'estrela' || tipo === 'chave') { e.ox = 3; e.oy = 3; e.w = 10; e.h = 10; }
  if (tipo === 'cristal' || tipo === 'relogio' || tipo === 'cogumelo') { e.ox = 2; e.oy = 2; e.w = 12; e.h = 12; }
  if (tipo === 'mola') { e.oy = 5; e.h = 11; }
  if (T.classe === 'inimigo') {
    e.ox = 2; e.oy = 5; e.w = 12; e.h = 11; e.dir = -1; e.x0 = x; e.y0 = y;
    if (T.mover === 'voa' || T.mover === 'flutua') { e.oy = 2; e.h = 11; }
    if (tipo === 'fantasma') { e.oy = 1; e.h = 14; }
  }
  if (tipo === 'porta') e.solido = true;
  return e;
}
function carregaFase(i) {
  var F = J.fases[i]; S.fase = i; S.faseMax = Math.max(S.faseMax, i + 1);
  grade = F.mapa.slice(); W = 0; grade.forEach(function (l) { W = Math.max(W, l.length); });
  ents = []; parts = []; relogios = {}; pontosDisp = {};
  var ini = null;
  for (var y = 0; y < LINHAS; y++) {
    var L = grade[y] || '', nova = '';
    for (var x = 0; x < W; x++) {
      var ch = L[x] || '.', t = letraTipo[ch];
      if (t && FAB.TIPOS[t].classe !== 'solido' && FAB.TIPOS[t].classe !== 'nuvem') {
        if (t === 'inicio') ini = { x: x * TS, y: y * TS };
        else ents.push(novaEnt(t, x * TS, y * TS));
        nova += '.';
      } else nova += ch;
    }
    grade[y] = nova;
  }
  if (!ini) ini = { x: TS, y: 0 };
  heroi = { x: ini.x + 3, y: ini.y + 2, w: 10, h: 14, vx: 0, vy: 0, noChao: false, dir: 1, q: 0, tq: 0, inv: 0, rapido: 0, naAgua: false, pulaAlto: 0, tam: 1, tTam: 0 };
  S.cenario = null;
  S.controle = { x: heroi.x, y: heroi.y };
  cam = { x: 0, y: 0 };
  S.tempoFase = J.ajustes.tempo || 0; S.tempoRest = S.tempoFase;
  O.onFase && O.onFase(F.nome || ('Fase ' + (i + 1)), i);
  dispara('comeca', {});
  hud();
}

/* ---------------- regras ---------------- */
function casaObj(qObj, ent) {
  if (!ent) return false;
  return qObj === ent.tipo || (qObj === 'inimigo' && ent.classe === 'inimigo');
}
function condicao(se) {
  if (!se) return true;
  if (se.t === 'tem') return (S.mochila[se.obj] || 0) > 0;
  if (se.t === 'naotem') return !(S.mochila[se.obj] || 0);
  if (se.t === 'pontosMin') return S.pontos >= (se.n || 0);
  if (se.t === 'sorte') return Math.random() < .5;
  return true;
}
function nomeAcao(a) {
  var B = FAB.FACA[a.t]; if (!B) return a.t;
  var p = a.n !== undefined ? ((a.n > 0 ? '+' : '') + a.n + ' ') : '';
  var o = a.obj ? ' ' + FAB.tr(FAB.nomeTipo(a.obj)) : (a.v ? ' "' + FAB.tr(a.v) + '"' : '');
  return p + FAB.tr(B.nome) + o;
}
function dispara(ev, ctx) {
  var algum = false;
  J.regras.forEach(function (r, i) {
    if (r.liga === false) return;
    var q = r.quando; if (q.t !== ev) return;
    if ((ev === 'toca' || ev === 'pisa') && !casaObj(q.obj, ctx.ent)) return;
    if (ev === 'tecla' && q.tecla !== ctx.tecla) return;
    if (ev === 'cada' && r.id !== ctx.id) return;
    if (ev === 'pontos' && r.id !== ctx.id) return;
    if (!condicao(r.se)) { log(FAB.trf('Regra {0}: o cadeado não abriu ({1})', [i + 1, FAB.tr(FAB.SE[r.se.t].nome) + (r.se.obj ? ' ' + FAB.tr(FAB.nomeTipo(r.se.obj)) : '')]), r.id, 'cadeado'); return; }
    algum = true;
    S.disparos[r.id] = (S.disparos[r.id] || 0) + 1;
    log(FAB.trf('Regra {0} acordou → {1}', [i + 1, r.faca.map(nomeAcao).join(', ')]), r.id, 'ok');
    r.faca.forEach(function (a) { faz(a, ctx); });
  });
  return algum;
}
function log(t, id, tipo) { if (O.onLog) O.onLog(t, id, tipo); }

function faz(a, ctx) {
  var e = ctx.ent;
  switch (a.t) {
    case 'ponto': {
      var antes = S.pontos; S.pontos += (a.n || 0);
      J.regras.forEach(function (r) {
        if (r.liga !== false && r.quando.t === 'pontos' && !pontosDisp[r.id] && antes < r.quando.n && S.pontos >= r.quando.n) {
          pontosDisp[r.id] = 1; setTimeout(function () { dispara('pontos', { id: r.id }); }, 0);
        }
      });
      if (e) solta(e.x + 8, e.y, (a.n >= 0 ? '+' : '') + a.n);
      break; }
    case 'vida':
      if (a.n < 0) {
        if (heroi.inv > 0) break;
        heroi.inv = 1.3; heroi.vy = -170; heroi.vx = -heroi.dir * 60; treme = .25;
        S.vidasPerdidas++; S.mortes.push({ x: heroi.x, y: heroi.y, f: S.fase });
        log('O herói perdeu vida aqui', null, 'vida');
      }
      S.vidas += a.n;
      if (S.vidas > 0) S.semVidas = false;
      if (S.vidas <= 0 && !S.semVidas) { S.semVidas = true; S.vidas = 0; (function (g0) { setTimeout(function () { if (g0 === geracao && !dispara('vidas0', {})) fim(false); }, 0); })(geracao); }
      break;
    case 'some': if (e && e.vivo) { e.vivo = false; poeira(e.x + 8, e.y + 8, '#fee761'); if (e.tipo === 'porta') S.portas++; if (e.tipo === 'moeda') S.moedas++; if (e.tipo === 'cristal') S.cristais++; } break;
    case 'guarda': if (e && e.vivo) { S.mochila[e.tipo] = (S.mochila[e.tipo] || 0) + 1; e.vivo = false; poeira(e.x + 8, e.y + 8, '#2ce8f5'); if (e.tipo === 'moeda') S.moedas++; if (e.tipo === 'cristal') S.cristais++; } break;
    case 'gasta': if (S.mochila[a.obj]) S.mochila[a.obj]--; break;
    case 'pulo': heroi.vy = -SUPER; heroi.noChao = false; break;
    case 'volta': heroi.x = S.controle.x; heroi.y = S.controle.y; heroi.vx = heroi.vy = 0; break;
    case 'marca': if (e) { S.controle = { x: e.x + 3, y: e.y + 2 }; e.ativo = true; } else S.controle = { x: heroi.x, y: heroi.y }; break;
    case 'ganha': if (!S.ganhando) { S.ganhando = true; var g0 = geracao; setTimeout(function () { if (g0 === geracao) ganhaFase(); }, 0); } break;
    case 'perde': (function (g0) { setTimeout(function () { if (g0 === geracao) fim(false); }, 0); })(geracao); break;
    case 'pergunta': if (e && !e.usada) { e.usada = true; pergunta(); } else if (!e) pergunta(); break;
    case 'fala': falaB = { txt: FAB.tr(a.v || 'Oba!'), t: 2.2 }; break;   /* texto do balão no idioma da Fábrica */
    case 'som': toca(a.v); break;
    case 'rapido': heroi.rapido = 5; break;
    case 'cria': cria(a.obj); break;
    case 'tempo': S.tempoRest += (a.n || 0); break;
    case 'treme': treme = .45; break;
    case 'confete': confete(); break;
    case 'pulaalto': heroi.pulaAlto = 8; poeira(heroi.x + 5, heroi.y + heroi.h, '#63c74d'); break;
    case 'gigante': heroi.tam = 1.6; heroi.tTam = 6; poeira(heroi.x + 5, heroi.y + 4, '#fee761'); break;
    case 'pequeno': heroi.tam = .6; heroi.tTam = 6; poeira(heroi.x + 5, heroi.y + 8, '#ff9ad5'); break;
    case 'cenario': {
      var lista = Object.keys(FAB.CENARIOS), agora = S.cenario || J.fases[S.fase].cenario;
      S.cenario = lista[(lista.indexOf(agora) + 1) % lista.length]; break; }
  }
  hud();
}

/* ---------------- Placa ? ---------------- */
function pergunta() {
  var modo = J.ajustes.perguntas || 'prova', pool = [];
  if (modo !== 'minhas') pool = pool.concat(FAB.perguntasDaProva ? FAB.perguntasDaProva() : []);
  if (modo !== 'prova') pool = pool.concat((FAB.E.perguntas || []).map(function (p) { return { id: p.id, p: p.p, o: p.o.slice(), c: 0, dica: '', ex: '', fonte: 'minha' }; }));
  pool = pool.filter(function (q) { return S.usadas.indexOf(q.id) < 0; });
  if (!pool.length) { falaB = { txt: FAB.tr('Acabaram as perguntas!'), t: 2 }; return; }
  var q = pool[Math.floor(Math.random() * pool.length)]; S.usadas.push(q.id);
  pausado = true;
  O.onPergunta(q, function (certo) {
    if (certo) { S.certas++; if (q.fonte === 'minha') S.minhas++; else S.certasProva++; toca('certo'); }
    else { S.erradas++; if (q.fonte === 'minha') S.minhas++; toca('errado'); }
    pausado = false; tAnt = performance.now();
    dispara(certo ? 'acerta' : 'erra', {});
  });
}

/* ---------------- criar peça (laço "a cada") ---------------- */
function cria(tipo) {
  if (!FAB.TIPOS[tipo] || ents.filter(function (e) { return e.criada && e.vivo; }).length > 25) return;
  var vw = cv.width;
  for (var k = 0; k < 20; k++) {
    var tx = Math.floor((cam.x + 16 + Math.random() * (vw - 32)) / TS), ty = 1 + Math.floor(Math.random() * 5);
    if (!solidoTile(tx, ty)) { var e = novaEnt(tipo, tx * TS, ty * TS); e.criada = true; ents.push(e); poeira(tx * TS + 8, ty * TS + 8, '#ffffff'); return; }
  }
}

/* ---------------- fim de fase / de jogo ---------------- */
function ganhaFase() {
  if (!rodando) return;
  toca('vitoria'); confete();
  var g0 = geracao;
  if (S.fase + 1 < J.fases.length) { pausado = true; setTimeout(function () { if (g0 !== geracao || !rodando) return; pausado = false; S.ganhando = false; carregaFase(S.fase + 1); tAnt = performance.now(); }, 1100); }
  else { S.venceu = true; setTimeout(function () { if (g0 === geracao) fim(true); }, 900); }
}
function fim(venceu) {
  if (!rodando) return; rodando = false; cancelAnimationFrame(raf);
  S.venceu = !!venceu; S.segundos = Math.round((performance.now() - S.t0) / 1000);
  var R = { data: Date.now(), pontos: S.pontos, pulos: S.pulos, venceu: S.venceu, faseMax: S.faseMax, certas: S.certas, erradas: S.erradas,
    certasProva: S.certasProva, minhas: S.minhas, portas: S.portas, moedas: S.moedas, vidasPerdidas: S.vidasPerdidas, segundos: S.segundos,
    disparos: S.disparos, mortes: S.mortes.slice(0, 20), convidado: !!O.convidado, origem: J.origem, cristais: S.cristais, pontosVolta: S.pontosVolta };
  O.onFim && O.onFim(R);
}

/* ---------------- física ---------------- */
function caixa(o) { return { x: o.x + (o.ox || 0), y: o.y + (o.oy || 0), w: o.w, h: o.h }; }
function cruza(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
function solidoEnt(x, y, w, h) {
  for (var i = 0; i < ents.length; i++) { var e = ents[i]; if (e.vivo && e.solido && cruza({ x: x, y: y, w: w, h: h }, e)) return e; }
  return null;
}
function bate(x, y, w, h) {
  var x0 = Math.floor(x / TS), x1 = Math.floor((x + w - .01) / TS), y0 = Math.floor(y / TS), y1 = Math.floor((y + h - .01) / TS);
  for (var ty = y0; ty <= y1; ty++) for (var tx = x0; tx <= x1; tx++) if (solidoTile(tx, ty)) return true;
  return !!solidoEnt(x, y, w, h);
}
/* move um corpo (herói ou inimigo) com colisão; devolve {chao, parede} */
function move(o, dt, nuvens) {
  var r = { chao: false, parede: false, teto: false };
  var nx = o.x + o.vx * dt, bx = (o.ox || 0), by = (o.oy || 0);
  if (bate(nx + bx, o.y + by, o.w, o.h)) {
    var passo = o.vx > 0 ? 1 : -1, g = 0;
    while (g++ < 20 && !bate(o.x + passo * .5 + bx, o.y + by, o.w, o.h)) o.x += passo * .5;
    o.vx = 0; r.parede = true;
  } else o.x = nx;
  var ny = o.y + o.vy * dt;
  if (bate(o.x + bx, ny + by, o.w, o.h)) {
    if (o.vy > 0) { r.chao = true; o.y = Math.floor((ny + by + o.h) / TS) * TS - o.h - by; if (bate(o.x + bx, o.y + by, o.w, o.h)) o.y = Math.round(o.y - 1); }
    else { r.teto = true; o.y = (Math.floor((ny + by) / TS) + 1) * TS - by; }
    o.vy = 0;
  } else {
    /* nuvem: só segura quem está caindo e vinha de cima */
    if (nuvens && o.vy > 0) {
      var pe0 = o.y + by + o.h, pe1 = ny + by + o.h, ty = Math.floor(pe1 / TS);
      var x0 = Math.floor((o.x + bx) / TS), x1 = Math.floor((o.x + bx + o.w - .01) / TS);
      for (var tx = x0; tx <= x1; tx++) if (nuvemTile(tx, ty) && pe0 <= ty * TS + .5) { o.y = ty * TS - o.h - by; o.vy = 0; r.chao = true; return r; }
    }
    o.y = ny;
  }
  return r;
}

function passoHeroi(dt) {
  var h = heroi, esq = teclas.esq, dir = teclas.dir;
  var cx0 = Math.floor((h.x + h.w / 2) / TS), cy0 = Math.floor((h.y + h.h / 2) / TS);
  h.naAgua = ents.some(function (e) { return e.vivo && e.tipo === 'agua' && cruza(caixa(h), e); });
  var vel = VEL * (h.rapido > 0 ? 1.7 : 1) * (h.naAgua ? .6 : 1);
  var gelo = h.noChao && geloTile(cx0, Math.floor((h.y + h.h + 1) / TS));
  var chaoT = h.noChao ? tipoEm(cx0, Math.floor((h.y + h.h + 1) / TS)) : null, CT = chaoT ? FAB.TIPOS[chaoT] : null;
  if (CT && CT.lento) vel *= CT.lento;                                  /* areia: anda mais devagar */
  var alvo = (dir ? vel : 0) - (esq ? vel : 0);
  var ac = gelo ? 2.2 : (CT && CT.atrito) || 14;                        /* neve: escorrega um pouquinho */
  h.vx += (alvo - h.vx) * Math.min(1, ac * dt);
  if (dir) h.dir = 1; if (esq) h.dir = -1;
  /* pulo com folga (coyote + buffer): perdoa a criança */
  if (teclas.pulo) { tPulo = .13; teclas.pulo = false; }
  if (tPulo > 0) tPulo -= dt;
  if (h.noChao) tChao = .1; else tChao -= dt;
  if (tPulo > 0 && (tChao > 0 || h.naAgua)) {
    h.vy = h.naAgua ? -200 : -PULO * (h.pulaAlto > 0 ? 1.3 : 1); tPulo = 0; tChao = 0; S.pulos++; if (!h.naAgua) toca('pulo');
  }
  if (!teclas.segura && h.vy < -120 && !h.naAgua) h.vy *= Math.pow(.02, dt);   /* soltou cedo = pulo baixo */
  h.vy += (h.naAgua ? 300 : GRAV) * dt;
  h.vy = Math.min(h.vy, h.naAgua ? 70 : MAXQ);
  var r = move(h, dt, true);
  h.noChao = r.chao;
  if (h.inv > 0) h.inv -= dt;
  if (h.rapido > 0) h.rapido -= dt;
  if (h.pulaAlto > 0) h.pulaAlto -= dt;
  if (h.tTam > 0) { h.tTam -= dt; if (h.tTam <= 0) h.tam = 1; }
  if (Math.abs(h.vx) > 8 && h.noChao) { h.tq += dt; if (h.tq > .14) { h.tq = 0; h.q = 1 - h.q; } } else h.q = 0;
  /* caiu no buraco */
  if (h.y > VH + 24) {
    var ok = dispara('cai', {});
    if (h.y > VH + 24) { h.x = S.controle.x; h.y = S.controle.y; h.vx = h.vy = 0; if (!ok) log('O herói caiu e não tem regra para isso: voltou para o começo', null, 'vida'); }
  }
}

function passoInimigo(e, dt) {
  var T = FAB.TIPOS[e.tipo], m = T.mover || 'anda';
  e.t += dt; e.tq = (e.tq || 0) + dt; if (e.tq > .25) { e.tq = 0; e.q = 1 - e.q; }
  if (m === 'anda') {
    e.vx = e.dir * (T.vel || (T.rapido ? 55 : 28)); e.vy = Math.min(e.vy + GRAV * dt, MAXQ);
    var r = move(e, dt, true);
    if (r.parede) e.dir *= -1;
    else if (r.chao) {
      var frente = e.dir > 0 ? e.x + e.ox + e.w + 1 : e.x + e.ox - 1;
      var tx = Math.floor(frente / TS), ty = Math.floor((e.y + e.oy + e.h + 2) / TS);
      if (!solidoTile(tx, ty) && !nuvemTile(tx, ty)) e.dir *= -1;
    }
  } else if (m === 'voa') {
    e.vx = e.dir * (T.vel || 32); e.vy = 0;
    var r2 = move(e, dt, false); if (r2.parede || Math.abs(e.x - e.x0) > 56) e.dir *= -1;
    e.y = e.y0 + Math.sin(e.t * 3) * 10;
  } else if (m === 'flutua') {
    var dx = heroi.x - e.x, dy = heroi.y - e.y, d = Math.sqrt(dx * dx + dy * dy);
    if (d < 110 && d > 2) { e.x += dx / d * 20 * dt; e.y += dy / d * 20 * dt; e.dir = dx > 0 ? 1 : -1; }
    else e.y = e.y0 + Math.sin(e.t * 2) * 6;
  } else if (m === 'pula') {
    e.vy = Math.min(e.vy + GRAV * dt, MAXQ);
    var r3 = move(e, dt, true);
    if (r3.chao) { e.vx = 0; e.cd = (e.cd || 1.4) - dt; if (e.cd <= 0) { e.cd = 1.6; e.vy = -260; e.dir = heroi.x > e.x ? 1 : -1; e.vx = e.dir * 30; } }
    if (r3.parede) e.dir *= -1;
    e.q = r3.chao ? 0 : 1;
  }
  if (e.y > VH + 40) e.vivo = false;
}

/* contato herói × peças: dispara "toca" ao ENTRAR em contato (não a cada quadro) */
function contatos() {
  var hb = caixa(heroi), largo = { x: hb.x - 1, y: hb.y - 1, w: hb.w + 2, h: hb.h + 2 };
  ents.forEach(function (e) {
    if (!e.vivo || e.tipo === 'agua') { if (e.tipo === 'agua') { var dentro = cruza(hb, caixa(e)); if (dentro && !e.dentro) dispara('toca', { ent: e }); e.dentro = dentro; } return; }
    var c = caixa(e), enc = cruza(e.solido ? largo : hb, c);
    if (enc && !e.dentro) {
      e.dentro = true;
      if (e.tipo === 'pontovolta' && !e.ativo) {   /* ponto de volta: ao tocar, vira o lugar de voltar */
        e.ativo = true; S.controle = { x: e.x + 3, y: e.y + 2 }; S.pontosVolta++; poeira(e.x + 8, e.y + 4, '#63c74d');
        dispara('passavolta', { ent: e });
      }
      if (e.classe === 'inimigo' && heroi.vy > 40 && hb.y + hb.h - heroi.vy * (1 / 60) <= c.y + 6) {
        heroi.vy = -200;                                   /* quica sempre, para não ficar grudado */
        if (!dispara('pisa', { ent: e })) dispara('toca', { ent: e });
      } else dispara('toca', { ent: e });
    } else if (!enc) e.dentro = false;
  });
  ents = ents.filter(function (e) { return e.vivo; });
}

/* ---------------- partículas ---------------- */
function poeira(x, y, cor) { for (var i = 0; i < 10; i++) parts.push({ x: x, y: y, vx: (Math.random() - .5) * 120, vy: (Math.random() - .8) * 120, t: .5, cor: cor }); }
function confete() { var cores = ['#e43b44', '#fee761', '#63c74d', '#3b9bff', '#ff9ad5', '#8b5cf6'];
  for (var i = 0; i < 60; i++) parts.push({ x: cam.x + Math.random() * cv.width, y: -5, vx: (Math.random() - .5) * 60, vy: 40 + Math.random() * 80, t: 2.2, cor: cores[i % 6], conf: true }); }
function solta(x, y, txt) { parts.push({ x: x, y: y, vx: 0, vy: -40, t: .8, txt: FAB.tr(String(txt)) }); }

/* ---------------- desenho ---------------- */
function fundo() {
  var C = FAB.CENARIOS[S.cenario || J.fases[S.fase].cenario] || FAB.CENARIOS.dia, w = cv.width;
  var g = cx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, C.ceu[0]); g.addColorStop(1, C.ceu[1]);
  cx.fillStyle = g; cx.fillRect(0, 0, w, VH);
  var t = performance.now() / 1000;
  if (C.estrelas) { cx.fillStyle = '#fff'; for (var i = 0; i < 40; i++) { var sx = ((i * 97 - cam.x * .1) % (w + 10) + w + 10) % (w + 10), sy = (i * 53) % 110; if ((i + Math.floor(t * 2)) % 7) cx.fillRect(Math.round(sx), sy, 1, 1); } }
  if (C.planeta) { cx.fillStyle = '#8b5cf6'; cx.beginPath(); cx.arc(w * .75 - cam.x * .05, 50, 22, 0, 7); cx.fill(); cx.strokeStyle = '#fee761'; cx.lineWidth = 2; cx.beginPath(); cx.ellipse(w * .75 - cam.x * .05, 50, 34, 7, -.3, 0, 7); cx.stroke(); }
  if (C.nuvens) { cx.fillStyle = 'rgba(255,255,255,.85)'; for (var n = 0; n < 5; n++) { var nx = ((n * 140 - cam.x * .2 + t * 4) % (w + 80) + w + 80) % (w + 80) - 40, ny = 18 + (n * 31) % 50; cx.fillRect(nx, ny, 34, 8); cx.fillRect(nx + 8, ny - 6, 18, 8); } }
  if (C.bolhas) { cx.strokeStyle = 'rgba(255,255,255,.6)'; for (var b = 0; b < 14; b++) { var bx = (b * 71) % w, by = VH - ((t * 20 + b * 37) % VH); cx.beginPath(); cx.arc(bx, by, 2 + b % 3, 0, 7); cx.stroke(); } }
  if (C.cristais) { for (var k = 0; k < 8; k++) { var kx = ((k * 120 - cam.x * .3) % (w + 60) + w + 60) % (w + 60) - 30; cx.fillStyle = k % 2 ? '#8b5cf6' : '#2ce8f5'; cx.beginPath(); cx.moveTo(kx, 0); cx.lineTo(kx + 6, 22 + k % 3 * 8); cx.lineTo(kx + 12, 0); cx.fill(); } }
  if (C.vulcao) {
    var vx0 = w * .62 - cam.x * .04;
    cx.fillStyle = '#2b1714'; cx.beginPath(); cx.moveTo(vx0 - 110, VH); cx.lineTo(vx0 - 18, 70); cx.lineTo(vx0 + 18, 70); cx.lineTo(vx0 + 110, VH); cx.fill();
    cx.fillStyle = '#f77622'; cx.fillRect(vx0 - 18, 68, 36, 4);
    cx.fillStyle = 'rgba(254,174,52,' + (.35 + Math.sin(t * 3) * .15) + ')'; cx.beginPath(); cx.arc(vx0, 66, 26, Math.PI, 0); cx.fill();
  }
  function morro(m) {
    if (!m[0]) return; cx.fillStyle = m[0]; cx.beginPath(); cx.moveTo(0, VH);
    for (var x = 0; x <= w; x += 4) cx.lineTo(x, VH - m[2] - Math.sin((x + cam.x * m[1]) / 40) * m[3] * .5 - Math.sin((x + cam.x * m[1]) / 17) * 4);
    cx.lineTo(w, VH); cx.fill();
  }
  morro([C.morros2, .25, 70, 30]);
  /* camada do meio (cenários novos): prédios e árvores ficam atrás do morro da frente */
  if (C.predios) {
    for (var p = 0; p < 12; p++) {
      var pw = 26 + (p * 13) % 18, ph = 50 + (p * 37) % 70, px = ((p * 58 - cam.x * .35) % (w + 80) + w + 80) % (w + 80) - 40;
      cx.fillStyle = p % 2 ? '#5a6f8f' : '#46597a'; cx.fillRect(px, VH - 30 - ph, pw, ph + 30);
      cx.fillStyle = '#fee761';
      for (var jy = VH - 24 - ph; jy < VH - 34; jy += 10) for (var jx = px + 4; jx < px + pw - 5; jx += 8) if ((Math.round(jx) * 7 + jy * 3 + p) % 5) cx.fillRect(Math.round(jx), jy, 3, 4);
    }
  }
  if (C.arvores) {
    for (var a = 0; a < 11; a++) {
      var ax = ((a * 47 - cam.x * .4) % (w + 60) + w + 60) % (w + 60) - 30, ah = 40 + (a * 29) % 30, ab = VH - 40;
      cx.fillStyle = '#6b3a2e'; cx.fillRect(ax - 2, ab - 8, 4, 12);
      cx.fillStyle = a % 2 ? '#2f8a4a' : '#256e3b';
      for (var s = 0; s < 3; s++) { var sy = ab - 8 - s * ah / 4, sw = 16 - s * 4; cx.beginPath(); cx.moveTo(ax - sw, sy); cx.lineTo(ax, sy - ah / 2.2); cx.lineTo(ax + sw, sy); cx.fill(); }
    }
  }
  morro([C.morros, .5, 48, 22]);
  if (C.flocos) { cx.fillStyle = '#ffffff'; for (var fl = 0; fl < 45; fl++) { var fx = ((fl * 67 - cam.x * .3 + Math.sin(t + fl) * 8) % (w + 10) + w + 10) % (w + 10), fy = (t * (14 + fl % 4 * 5) + fl * 41) % VH; cx.fillRect(Math.round(fx), Math.round(fy), fl % 3 ? 1 : 2, fl % 3 ? 1 : 2); } }
  if (C.brasas) { for (var br = 0; br < 26; br++) { var bx2 = ((br * 83 - cam.x * .2) % (w + 10) + w + 10) % (w + 10), by2 = VH - ((t * (18 + br % 5 * 6) + br * 29) % VH); cx.fillStyle = br % 3 ? '#f77622' : '#fee761'; cx.fillRect(Math.round(bx2 + Math.sin(t * 2 + br) * 3), Math.round(by2), 2, 2); } }
}
function desenha() {
  var w = cv.width, sx = 0;
  if (treme > 0) sx = (Math.random() - .5) * 4;
  cx.setTransform(1, 0, 0, 1, 0, 0);
  fundo();
  cx.setTransform(1, 0, 0, 1, Math.round(-cam.x + sx), 0);
  var t0 = Math.max(0, Math.floor(cam.x / TS) - 1), t1 = Math.min(W, Math.ceil((cam.x + w) / TS) + 1);
  var fq = Math.floor(performance.now() / 300) % 2;
  for (var ty = 0; ty < LINHAS; ty++) for (var tx = t0; tx < t1; tx++) {
    var tp = tipoEm(tx, ty); if (!tp) continue;
    var sk = FAB.skinDe(tp);
    if (tp === 'grama' && solidoTile(tx, ty - 1)) sk = FAB.skinDe('terra');
    cx.drawImage(FAB.sprCanvas(sk, fq), tx * TS, ty * TS);
  }
  ents.forEach(function (e) {
    if (e.x + 16 < cam.x - 16 || e.x > cam.x + w + 16) return;
    var im = FAB.sprCanvas(FAB.skinDe(e.tipo), e.classe === 'inimigo' ? e.q : (e.tipo === 'agua' || e.tipo === 'lava' || e.tipo === 'moeda' ? fq : 0));
    var by = (e.classe === 'item' ? Math.sin(performance.now() / 250 + e.x) * 1.5 : 0);
    cx.save();
    if (e.usada) cx.globalAlpha = .35;
    if (e.tipo === 'controle' && e.ativo) { cx.fillStyle = 'rgba(254,231,97,.35)'; cx.fillRect(e.x, e.y, 16, 16); }
    if (e.tipo === 'pontovolta') im = FAB.sprCanvas(FAB.skinDe(e.tipo), e.ativo ? 1 : 0);   /* bandeirinha sobe quando passa */
    if (e.classe === 'inimigo' && e.dir > 0) { cx.translate(e.x + 16, e.y); cx.scale(-1, 1); cx.drawImage(im, 0, 0); }
    else cx.drawImage(im, Math.round(e.x), Math.round(e.y + by));
    cx.restore();
  });
  /* herói */
  if (!(heroi.inv > 0 && Math.floor(heroi.inv * 12) % 2)) {
    var hi = FAB.sprCanvas(FAB.skinDe('heroi'), heroi.q);
    cx.save();
    if (heroi.tam && heroi.tam !== 1) {   /* gigante / pequeno: só o desenho muda; os pés ficam no mesmo lugar */
      cx.translate(Math.round(heroi.x + 5), Math.round(heroi.y + heroi.h)); cx.scale(heroi.dir < 0 ? -heroi.tam : heroi.tam, heroi.tam); cx.drawImage(hi, -8, -16);
    } else if (heroi.dir < 0) { cx.translate(Math.round(heroi.x - 3) + 16, Math.round(heroi.y - 2)); cx.scale(-1, 1); cx.drawImage(hi, 0, 0); }
    else cx.drawImage(hi, Math.round(heroi.x - 3), Math.round(heroi.y - 2));
    cx.restore();
  }
  if (heroi.pulaAlto > 0 && Math.floor(performance.now() / 120) % 2) { cx.fillStyle = '#63c74d'; cx.fillRect(heroi.x - 1, heroi.y + heroi.h - 1, 2, 2); cx.fillRect(heroi.x + 9, heroi.y + heroi.h - 3, 2, 2); }
  if (heroi.rapido > 0) { cx.fillStyle = 'rgba(254,231,97,.7)'; cx.fillRect(heroi.x - heroi.dir * 8, heroi.y + 4, 4, 1); cx.fillRect(heroi.x - heroi.dir * 10, heroi.y + 9, 5, 1); }
  /* balão */
  if (falaB) {
    cx.font = 'bold 8px Nunito, sans-serif'; var tw = cx.measureText(falaB.txt).width + 8, bx = Math.round(heroi.x + 5 - tw / 2), byy = Math.round(heroi.y - 18);
    cx.fillStyle = '#fff'; cx.strokeStyle = '#1a1c2c'; cx.lineWidth = 1; cx.fillRect(bx, byy, tw, 12); cx.strokeRect(bx + .5, byy + .5, tw - 1, 11);
    cx.fillStyle = '#1a1c2c'; cx.fillText(falaB.txt, bx + 4, byy + 9);
  }
  /* partículas */
  parts.forEach(function (p) {
    if (p.txt) { cx.font = 'bold 8px Nunito, sans-serif'; cx.fillStyle = '#1a1c2c'; cx.fillText(p.txt, p.x - 3, p.y + 1); cx.fillStyle = '#fee761'; cx.fillText(p.txt, p.x - 4, p.y); }
    else { cx.fillStyle = p.cor; cx.fillRect(Math.round(p.x), Math.round(p.y), p.conf ? 2 : 1.5, p.conf ? 3 : 1.5); }
  });
  /* LUPA (detetive de bichinhos): caixas de colisão + onde perdeu vida */
  if (LUPA) {
    cx.lineWidth = 1;
    ents.forEach(function (e) { var c = caixa(e); cx.strokeStyle = e.classe === 'inimigo' ? '#e43b44' : e.classe === 'perigo' ? '#f77622' : '#2ce8f5'; cx.strokeRect(c.x + .5, c.y + .5, c.w - 1, c.h - 1); });
    var hb = caixa(heroi); cx.strokeStyle = '#63c74d'; cx.strokeRect(hb.x + .5, hb.y + .5, hb.w - 1, hb.h - 1);
    cx.strokeStyle = '#e43b44'; S.mortes.forEach(function (m) { if (m.f !== S.fase) return; cx.beginPath(); cx.moveTo(m.x, m.y); cx.lineTo(m.x + 8, m.y + 8); cx.moveTo(m.x + 8, m.y); cx.lineTo(m.x, m.y + 8); cx.stroke(); });
    /* alcance do pulo: até onde o herói chega */
    cx.strokeStyle = 'rgba(255,255,255,.5)'; cx.setLineDash([2, 2]); cx.beginPath();
    var px = heroi.x + 5, py = heroi.y + heroi.h, vx = VEL * heroi.dir, vy = -PULO;
    cx.moveTo(px, py); for (var s = 0; s < 40; s++) { px += vx / 60; vy += GRAV / 60; py += vy / 60; cx.lineTo(px, py); if (py > heroi.y + heroi.h + 30) break; }
    cx.stroke(); cx.setLineDash([]);
  }
}

/* ---------------- laço principal ---------------- */
function quadro(t) {
  if (!rodando) return;
  raf = requestAnimationFrame(quadro);
  var dt = Math.min(1 / 30, (t - tAnt) / 1000 || 0); tAnt = t;
  if (pausado) { desenha(); return; }
  var n = 2, d = dt / n;
  for (var i = 0; i < n; i++) { passoHeroi(d); ents.forEach(function (e) { if (e.vivo && e.classe === 'inimigo') passoInimigo(e, d); }); }
  contatos();
  /* relógios dos laços "a cada" */
  J.regras.forEach(function (r) {
    if (r.liga === false || r.quando.t !== 'cada') return;
    relogios[r.id] = (relogios[r.id] || 0) + dt;
    if (relogios[r.id] >= (r.quando.n || 3)) { relogios[r.id] = 0; dispara('cada', { id: r.id }); }
  });
  if (S.tempoFase > 0) { S.tempoRest -= dt; if (S.tempoRest <= 0) { S.tempoRest = 0; var deu = dispara('tempo0', {}); if (S.tempoRest <= 0) { S.tempoFase = 0; hud(); if (!deu) fim(false); } } if (Math.floor(S.tempoRest) !== S.ultTempo) { S.ultTempo = Math.floor(S.tempoRest); hud(); } }
  parts.forEach(function (p) { p.x += p.vx * dt; p.y += p.vy * dt; if (!p.conf && !p.txt) p.vy += 300 * dt; p.t -= dt; }); parts = parts.filter(function (p) { return p.t > 0; });
  if (falaB) { falaB.t -= dt; if (falaB.t <= 0) falaB = null; }
  if (treme > 0) treme -= dt;
  /* câmera */
  var alvo = heroi.x + 5 - cv.width / 2 + heroi.dir * 20;
  cam.x += (alvo - cam.x) * Math.min(1, 6 * dt);
  cam.x = Math.max(0, Math.min(cam.x, W * TS - cv.width));
  desenha();
}

function hud() {
  if (!O.onHud) return;
  O.onHud({ pontos: S.pontos, vidas: S.vidas, mochila: S.mochila, tempo: S.tempoFase > 0 ? Math.ceil(S.tempoRest) : null, fase: S.fase });
}

/* ---------------- API ---------------- */
M.inicia = function (canvas, jogo, opts) {
  M.para(); geracao++; montaLetras();
  cv = canvas; cx = cv.getContext('2d'); J = jogo; O = opts || {}; LUPA = !!O.lupa;
  var r = cv.getBoundingClientRect(), asp = r.width && r.height ? r.width / r.height : 16 / 9;
  cv.height = VH; cv.width = Math.max(200, Math.min(420, Math.round(VH * asp)));
  cx.imageSmoothingEnabled = false;
  S = { pontos: 0, vidas: J.ajustes.vidas || 3, mochila: {}, disparos: {}, pulos: 0, certas: 0, erradas: 0, certasProva: 0, minhas: 0, portas: 0, moedas: 0,
    vidasPerdidas: 0, mortes: [], usadas: [], faseMax: 1, fase: 0, t0: performance.now(), venceu: false, cristais: 0, pontosVolta: 0 };
  teclas = {}; pausado = false; rodando = true; treme = 0; falaB = null;
  carregaFase(O.fase || 0);
  tAnt = performance.now(); raf = requestAnimationFrame(quadro);
};
M.para = function () { if (rodando) { rodando = false; cancelAnimationFrame(raf); } };
M.termina = function () { if (rodando) fim(false); };
M.pausa = function (p) { pausado = p; tAnt = performance.now(); };
M.lupa = function (on) { LUPA = on; };
M.rodando = function () { return rodando; };
M.tecla = function (k, apertada) {
  if (k === 'pulo') { if (apertada && !teclas.segura) teclas.pulo = true; teclas.segura = apertada; return; }
  if (k === 'X' || k === 'C' || k === 'V') { if (apertada && rodando && !pausado) dispara('tecla', { tecla: k }); return; }
  teclas[k] = apertada;
};
/* só LEITURA, para o jogador-robô do gate enxergar a tela como a criança enxerga */
M.olha = function () {
  if (!rodando) return null;
  var h = heroi, pe = Math.floor((h.y + h.h + 2) / TS), frente = Math.floor((h.x + h.w + 14) / TS);
  return { x: h.x, y: h.y, noChao: h.noChao, buraco: !solidoTile(frente, pe) && !nuvemTile(frente, pe) && !solidoTile(frente, pe + 1),
    parede: solidoTile(Math.floor((h.x + h.w + 6) / TS), Math.floor((h.y + 8) / TS)),
    perigo: ents.some(function (e) { return e.vivo && (e.classe === 'inimigo' || e.classe === 'perigo') && e.x - h.x > -4 && e.x - h.x < 26 && Math.abs(e.y - h.y) < 30; }) };
};
M.TS = TS; M.LINHAS = LINHAS; M.SONS = SONS;
/* todo texto fixo que o motor desenha no canvas ou escreve no registro da lupa (o portão do inglês confere) */
M.textos = function () {
  return ['Oba!', 'Acabaram as perguntas!', 'O herói perdeu vida aqui', 'O herói caiu e não tem regra para isso: voltou para o começo',
    'Regra {0} acordou → {1}', 'Regra {0}: o cadeado não abriu ({1})'].concat(FAB.OPCOES.falas || []);
};

var MAPA_TECLAS = { ArrowLeft: 'esq', a: 'esq', A: 'esq', ArrowRight: 'dir', d: 'dir', D: 'dir', ArrowUp: 'pulo', w: 'pulo', W: 'pulo', ' ': 'pulo', x: 'X', X: 'X', c: 'C', C: 'C', v: 'V', V: 'V' };
window.addEventListener('keydown', function (ev) {
  if (!rodando || /INPUT|TEXTAREA/.test((ev.target || {}).tagName)) return;
  var k = MAPA_TECLAS[ev.key]; if (!k) return;
  if (ev.ctrlKey || ev.metaKey) return;
  ev.preventDefault(); if (ev.repeat) return; M.tecla(k, true);
});
window.addEventListener('keyup', function (ev) { var k = MAPA_TECLAS[ev.key]; if (k && k !== 'X' && k !== 'C' && k !== 'V') M.tecla(k, false); });

FAB.motor = M;
})();
