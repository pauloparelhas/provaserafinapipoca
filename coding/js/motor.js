/* ============================================================
   motor.js — o MOTOR que roda o jogo da Mariana
   Plataforma 2D em pixel art. Casinha de 16 px; mapa de 12 a 48
   linhas (a janela mostra 12; em mapa alto a câmera sobe e desce).
   O motor sabe FÍSICA (chão, pulo, nuvem, gelo, água, inimigos);
   o que acontece quando o herói toca em algo vem das REGRAS dela.

   API
     FAB.motor.inicia(canvas, jogo, {fase, convidado, lupa,
        onHud(S), onLog(txt, idRegra, tipo), onFim(resumo),
        onPergunta(q, responde(certo)), onFase(nome)})
     FAB.motor.para() · pausa(bool) · tecla(nome, apertada) · lupa(bool)
     FAB.motor.botoesExtras(palco)  põe o botão ▼ na mesa de toques
   Mundo (v3): cipó/escada (▲ sobe, ▼ desce), cano em par (▼ em cima),
   água como casinha de grade, fôlego nas fases de nadar, poderes
   (pulo duplo, grudar na parede, pequenino de verdade) e o cavalo.
   ============================================================ */
(function () {
'use strict';
var TS = 16, LINHAS = 12, VH = LINHAS * TS;
var GRAV = 900, PULO = 330, SUPER = 480, VEL = 90, MAXQ = 420;

var M = {}, cv, cx, J, O, W, H, S, heroi, ents, parts, cam, raf, tAnt, pausado, rodando, LUPA;
var geracao = 0, teclas = {}, tPulo = 0, tChao = 0, relogios = {}, pontosDisp = {}, falaB = null, treme = 0;
var ALT = LINHAS;                 /* altura do mapa da fase (12 a 48 linhas) */
var aguaDentro = {}, canos = [], corpoPeq = false, topoOk = true, tCano = 0, folegoTrava = false, avisoAr = false;
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
function tipoEm(tx, ty) { if (ty < 0 || ty >= ALT) return null; var L = grade[ty]; if (!L || tx < 0 || tx >= L.length) return null; return letraTipo[L[tx]] || null; }
function solidoTile(tx, ty) {
  if (tx < 0 || tx >= W) return true;            /* paredes invisíveis nas pontas */
  if (ty < 0 || ty >= ALT) return false;
  var t = tipoEm(tx, ty); if (!t) return false; var T = FAB.TIPOS[t];
  if (T.classe !== 'solido') return false;
  return !(T.rato && corpoPeq);                  /* portinha de rato: só o herói pequenino passa */
}
function classeTile(tx, ty) { var t = tipoEm(tx, ty); return t ? FAB.TIPOS[t].classe : null; }
function aguaTile(tx, ty) { return classeTile(tx, ty) === 'agua'; }
function escadaTile(tx, ty) { return classeTile(tx, ty) === 'escada'; }
/* topo do cipó/escada: dá para ficar em pé em cima (como nuvem), menos quando está descendo */
function topoEscada(tx, ty) { return escadaTile(tx, ty) && !escadaTile(tx, ty - 1); }
function aguaNaCaixa(b) {
  var x0 = Math.floor(b.x / TS), x1 = Math.floor((b.x + b.w - .01) / TS), y0 = Math.floor(b.y / TS), y1 = Math.floor((b.y + b.h - .01) / TS);
  for (var ty = y0; ty <= y1; ty++) for (var tx = x0; tx <= x1; tx++) if (aguaTile(tx, ty)) return true;
  return false;
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
  if (T.mover === 'nada') { e.oy = 4; e.h = 9; }
  if (tipo === 'porta') e.solido = true;
  if (T.classe === 'montaria') { e.x0 = x; e.y0 = y; e.ox = 1; e.oy = 2; e.w = 14; e.h = 14; }
  return e;
}
/* fase de nadar: peça desenhada no meio da água fica dentro da água (a casinha dela vira água por trás) */
function molhaPecas(F) {
  if (!F.nada) return;
  for (var y = 1; y < ALT; y++) {
    var L = grade[y], nova = '';
    for (var x = 0; x < W; x++) {
      var ch = L[x] || '.', t = letraTipo[ch], cl = t && FAB.TIPOS[t].classe;
      var vira = t && cl !== 'solido' && cl !== 'nuvem' && cl !== 'agua' && cl !== 'escada' && cl !== 'inicio' &&
        (aguaTile(x, y - 1) || (aguaTile(x - 1, y) && aguaTile(x + 1, y)));
      nova += vira ? '~' : ch;
    }
    grade[y] = nova;
  }
}
function carregaFase(i) {
  var F = J.fases[i]; S.fase = i; S.faseMax = Math.max(S.faseMax, i + 1);
  grade = F.mapa.slice(); W = 0; grade.forEach(function (l) { W = Math.max(W, l.length); });
  ALT = Math.max(LINHAS, grade.length);
  for (var g = 0; g < ALT; g++) grade[g] = grade[g] || '';
  ents = []; parts = []; relogios = {}; pontosDisp = {}; aguaDentro = {}; canos = []; tCano = 0; folegoTrava = false; avisoAr = false;
  /* água e cipó/escada ficam na GRADE (como o chão); o resto vira peça viva */
  var orig = grade.slice();
  molhaPecas(F);
  var ini = null;
  for (var y = 0; y < ALT; y++) {
    var L = orig[y] || '', G = grade[y], nova = '';
    for (var x = 0; x < W; x++) {
      var ch = L[x] || '.', t = letraTipo[ch], cl = t && FAB.TIPOS[t].classe;
      if (t && cl !== 'solido' && cl !== 'nuvem' && cl !== 'agua' && cl !== 'escada') {
        if (t === 'inicio') ini = { x: x * TS, y: y * TS };
        else ents.push(novaEnt(t, x * TS, y * TS));
        nova += G[x] === '~' ? '~' : '.';
      } else nova += ch;
    }
    grade[y] = nova;
  }
  /* canos em par: a boca de cada cano (o de cima da pilha), na ordem de leitura; 1º com 2º, 3º com 4º */
  for (var cy = 0; cy < ALT; cy++) for (var cx2 = 0; cx2 < W; cx2++) {
    var tc = tipoEm(cx2, cy); if (!tc || !FAB.TIPOS[tc].cano) continue;
    var tc0 = tipoEm(cx2, cy - 1); if (tc0 && FAB.TIPOS[tc0].cano) continue;
    canos.push({ tx: cx2, ty: cy, par: null });
  }
  for (var k = 0; k + 1 < canos.length; k += 2) { canos[k].par = canos[k + 1]; canos[k + 1].par = canos[k]; }
  if (!ini) ini = { x: TS, y: 0 };
  heroi = { x: ini.x + 3, y: ini.y + 2, w: 10, h: 14, vx: 0, vy: 0, noChao: false, dir: 1, q: 0, tq: 0, inv: 0, rapido: 0, naAgua: false, pulaAlto: 0, tam: 1, tTam: 0,
    escada: false, pod: {}, mont: null, pulosAr: 0, lockX: 0, grudado: 0, peq: false };
  S.cenario = null;
  S.controle = { x: heroi.x, y: heroi.y };
  S.nada = !!F.nada; S.folegoMax = J.ajustes.folego || 30; S.folego = S.folegoMax;
  cam = { x: 0, y: 0 };
  encaixaY();
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
  if (se.t === 'tempoder') return !!(heroi.pod && heroi.pod[se.v]);
  if (se.t === 'montada') return !!heroi.mont;
  if (se.t === 'naomontada') return !heroi.mont;
  return true;
}
function nomeOpcao(v) { var N = FAB.NOME_OPCAO && FAB.NOME_OPCAO[v]; return N ? ' ' + FAB.tr(N) : ' "' + FAB.tr(v) + '"'; }
function nomeAcao(a) {
  var B = FAB.FACA[a.t]; if (!B) return a.t;
  var p = a.n !== undefined ? ((a.n > 0 ? '+' : '') + a.n + ' ') : '';
  var o = a.obj ? ' ' + FAB.tr(FAB.nomeTipo(a.obj)) : (a.v ? nomeOpcao(a.v) : '');
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
    if (!condicao(r.se)) { log(FAB.trf('Regra {0}: o cadeado não abriu ({1})', [i + 1, FAB.tr(FAB.SE[r.se.t].nome) + (r.se.obj ? ' ' + FAB.tr(FAB.nomeTipo(r.se.obj)) : (r.se.v ? nomeOpcao(r.se.v) : ''))]), r.id, 'cadeado'); return; }
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
    case 'some': if (e && e.vivo) { e.vivo = false; tiraDaGrade(e); poeira(e.x + 8, e.y + 8, '#fee761'); if (e.tipo === 'porta') S.portas++; if (e.tipo === 'moeda') S.moedas++; if (e.tipo === 'cristal') S.cristais++; } break;
    case 'guarda': if (e && e.vivo) { S.mochila[e.tipo] = (S.mochila[e.tipo] || 0) + 1; e.vivo = false; tiraDaGrade(e); poeira(e.x + 8, e.y + 8, '#2ce8f5'); if (e.tipo === 'moeda') S.moedas++; if (e.tipo === 'cristal') S.cristais++; } break;
    case 'gasta': if (S.mochila[a.obj]) S.mochila[a.obj]--; break;
    case 'pulo': heroi.vy = -SUPER; heroi.noChao = false; break;
    case 'volta': heroi.x = S.controle.x; heroi.y = S.controle.y; heroi.vx = heroi.vy = 0; heroi.escada = false; S.folego = S.folegoMax; folegoTrava = false; avisoAr = false; encaixaY(); break;
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
    /* mundo (v3) */
    case 'folego': S.folego = Math.min(S.folegoMax, S.folego + (a.n || 0)); if (S.folego > 0) folegoTrava = false; if (S.folego > S.folegoMax * .25) avisoAr = false; if (e) solta(e.x + 8, e.y, '+' + (a.n || 0)); break;
    case 'ligar': ligaPoder(a.v); break;
    case 'desligar': if (heroi.pod[a.v]) { delete heroi.pod[a.v]; acabouPoder(a.v); } break;
    case 'montar': if (e && e.vivo && e.classe === 'montaria' && !heroi.mont) { e.vivo = false; heroi.mont = { tipo: e.tipo, ent: e }; heroi.escada = false; poeira(heroi.x + 5, heroi.y + heroi.h, '#b86f50'); } break;
    case 'desmontar': desmonta(); break;
    case 'iraoutro': vaiPeloCano(a.v, ctx); break;
    case 'cenario': {
      var lista = Object.keys(FAB.CENARIOS), agora = S.cenario || J.fases[S.fase].cenario;
      S.cenario = lista[(lista.indexOf(agora) + 1) % lista.length]; break; }
  }
  hud();
}

/* casinha da grade (água) que a regra mandou sumir */
function tiraDaGrade(e) { if (!e.grade) return; var L = grade[e.grade[1]]; grade[e.grade[1]] = L.slice(0, e.grade[0]) + '.' + L.slice(e.grade[0] + 1); }

/* ---------------- poderes, cavalo e cano (mundo v3) ---------------- */
function ligaPoder(v) {
  var p = String(v || '').split(':'), nome = p[0]; if (!nome) return;
  heroi.pod[nome] = p[1] === 'fim' || !p[1] ? Infinity : (+p[1] || 10);
  poeira(heroi.x + heroi.w / 2, heroi.y + 4, '#8b5cf6');
}
function acabouPoder(nome) { dispara('poderacaba', { poder: nome }); }
function desmonta() {
  var m = heroi.mont; if (!m) return;
  heroi.mont = null; heroi.inv = Math.max(heroi.inv, 1.3);
  poeira(heroi.x + 5, heroi.y + heroi.h, '#b86f50');
  var e = m.ent; e.x = e.x0; e.y = e.y0; e.vivo = true; e.dentro = cruza(caixa(heroi), caixa(e));
  if (ents.indexOf(e) < 0) ents.push(e);
}
function encaixaY() {   /* câmera de cima a baixo encaixa no herói (nascer, voltar, cano) */
  if (!cam || !heroi) return;
  cam.y = ALT > LINHAS ? Math.max(0, Math.min(heroi.y + heroi.h / 2 - VH / 2, ALT * TS - VH)) : 0;
}
function vaiPeloCano(dest, ctx) {
  if (dest === 'proxima') { if (!S.ganhando) { S.ganhando = true; var g0 = geracao; setTimeout(function () { if (g0 === geracao) ganhaFase(); }, 0); } return; }
  var c = ctx.cano;
  if (!c || !c.par) { log('Este cano não tem par: ponha outro cano na fase', null, 'cadeado'); return; }
  var p = c.par, h = heroi;
  h.x = p.tx * TS + 8 - h.w / 2; h.y = p.ty * TS - h.h; h.vx = h.vy = 0; h.escada = false;
  for (var k = 0; k < 6 && bate(h.x, h.y, h.w, h.h); k++) h.y -= TS;   /* chegou embaixo de um teto: sobe até caber */
  tCano = .5; poeira(h.x + h.w / 2, h.y + h.h, '#63c74d');
  if (cv) cam.x = Math.max(0, Math.min(h.x + 5 - cv.width / 2, W * TS - cv.width));
  encaixaY();
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
    var tx = Math.floor((cam.x + 16 + Math.random() * (vw - 32)) / TS), ty = Math.floor(cam.y / TS) + 1 + Math.floor(Math.random() * 5);
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
      for (var tx = x0; tx <= x1; tx++) if ((nuvemTile(tx, ty) || (topoOk && topoEscada(tx, ty))) && pe0 <= ty * TS + .5) { o.y = ty * TS - o.h - by; o.vy = 0; r.chao = true; return r; }
    }
    o.y = ny;
  }
  return r;
}

/* corpo do herói: muda a caixa mantendo os pés e o meio no lugar; só se couber */
function setaCaixa(w, hh) {
  var h = heroi, nx = h.x + h.w / 2 - w / 2, ny = h.y + h.h - hh, antes = corpoPeq;
  corpoPeq = w < 10; var cabe = !bate(nx, ny, w, hh); corpoPeq = antes;
  if (!cabe) return false;
  h.x = nx; h.y = ny; h.w = w; h.h = hh; return true;
}
/* cipó e escada: ▲ segurado sobe, ▼ desce, seta para o lado sai; devolve true se o herói está nela */
function passoEscada(h, dt, esq, dir) {
  var cx0 = Math.floor((h.x + h.w / 2) / TS), cy0 = Math.floor((h.y + h.h / 2) / TS), pe = Math.floor((h.y + h.h - 1) / TS), sob = Math.floor((h.y + h.h + 1) / TS);
  var aqui = escadaTile(cx0, cy0) || escadaTile(cx0, pe);
  if (!h.escada) {
    if (h.mont) return false;
    var sobe = teclas.segura && aqui, desce = teclas.baixo && (aqui || (h.noChao && escadaTile(cx0, sob)));
    if (!sobe && !desce) return false;
    h.escada = true; tPulo = 0; h.vx = 0; h.vy = 0; h.pulosAr = 0; h.grudado = 0;
    var nx = cx0 * TS + 8 - h.w / 2; if (!bate(nx, h.y, h.w, h.h)) h.x = nx;   /* encaixa no meio do cipó */
  }
  if (tPulo > 0 && (esq || dir)) {   /* pular para fora, de lado */
    h.escada = false; h.vy = -PULO * .8; tPulo = 0; tChao = 0; S.pulos++; toca('pulo'); return false;
  }
  tPulo = 0;
  var vy = teclas.segura ? -60 : teclas.baixo ? 60 : 0;
  h.vy = vy; h.vx = (dir ? 1 : esq ? -1 : 0) * VEL * .4;
  if (dir) h.dir = 1; if (esq) h.dir = -1;
  topoOk = false; var r = move(h, dt, false); topoOk = true;
  h.noChao = r.chao;
  cx0 = Math.floor((h.x + h.w / 2) / TS); cy0 = Math.floor((h.y + h.h / 2) / TS); pe = Math.floor((h.y + h.h - 1) / TS);
  if (!(escadaTile(cx0, cy0) || escadaTile(cx0, pe))) { h.escada = false; if (vy < 0) h.vy = -80; }   /* saiu por cima (empurrãozinho) ou pelo lado */
  else if (r.chao && vy > 0) h.escada = false;                                                         /* desceu até o chão */
  if (vy) { h.tq += dt; if (h.tq > .16) { h.tq = 0; h.q = 1 - h.q; } }
  return true;
}
function passoHeroi(dt) {
  var h = heroi, esq = teclas.esq, dir = teclas.dir;
  if (h.lockX > 0) { h.lockX -= dt; esq = dir = false; }          /* logo depois de pular da parede */
  var cx0 = Math.floor((h.x + h.w / 2) / TS), cy0 = Math.floor((h.y + h.h / 2) / TS);
  h.naAgua = aguaNaCaixa(caixa(h));
  var MT = h.mont ? (FAB.MONTARIAS || {})[h.mont.tipo] || {} : null;
  var vel = VEL * (h.rapido > 0 ? 1.7 : 1) * (h.naAgua ? .6 : 1) * (MT ? MT.vel || 1 : 1);
  if (teclas.pulo) { tPulo = .13; teclas.pulo = false; }
  if (tPulo > 0) tPulo -= dt;
  if (tCano > 0) tCano -= dt;
  corpoPeq = h.peq;
  if (passoEscada(h, dt, esq, dir)) { corpoPeq = false; tChao = 0; fimPassoHeroi(h, dt); return; }
  /* cano: ▼ com os pés em cima da boca do cano */
  if (teclas.baixoNovo) {
    teclas.baixoNovo = false;
    var sobC = Math.floor((h.y + h.h + 1) / TS);
    if (h.noChao && tCano <= 0) for (var c = 0; c < canos.length; c++) if (canos[c].tx === cx0 && canos[c].ty === sobC) { tCano = .5; dispara('cano', { cano: canos[c] }); break; }
  }
  var gelo = h.noChao && geloTile(cx0, Math.floor((h.y + h.h + 1) / TS));
  var chaoT = h.noChao ? tipoEm(cx0, Math.floor((h.y + h.h + 1) / TS)) : null, CT = chaoT ? FAB.TIPOS[chaoT] : null;
  if (CT && CT.lento) vel *= CT.lento;                                  /* areia: anda mais devagar */
  var alvo = (dir ? vel : 0) - (esq ? vel : 0);
  var ac = gelo ? 2.2 : (CT && CT.atrito) || 14;                        /* neve: escorrega um pouquinho */
  h.vx += (alvo - h.vx) * Math.min(1, ac * dt);
  if (dir) h.dir = 1; if (esq) h.dir = -1;
  /* pulo com folga (coyote + buffer): perdoa a criança */
  if (h.noChao) { tChao = .1; h.pulosAr = 0; } else tChao -= dt;
  if (tPulo > 0 && (tChao > 0 || h.naAgua)) {
    h.vy = h.naAgua ? (S.nada ? -120 : -200) : -PULO * (h.pulaAlto > 0 ? 1.3 : 1) * (MT ? MT.pulo || 1 : 1); tPulo = 0; tChao = 0; S.pulos++; if (!h.naAgua) toca('pulo');
  } else if (tPulo > 0 && h.grudado && h.pod.grudar) {          /* pulo da parede: para o outro lado */
    h.vy = -PULO * .95; h.vx = -h.grudado * 110; h.dir = -h.grudado; h.lockX = .18; h.grudado = 0; tPulo = 0; S.pulos++; toca('pulo');
  } else if (tPulo > 0 && h.pod.duplo && h.pulosAr < 1 && tChao <= 0) {   /* pulo duplo, no ar */
    h.vy = -PULO * .9; h.pulosAr++; tPulo = 0; S.pulos++; toca('pulo'); poeira(h.x + h.w / 2, h.y + h.h, '#ffffff');
  }
  if (!teclas.segura && h.vy < -120 && !h.naAgua) h.vy *= Math.pow(.02, dt);   /* soltou cedo = pulo baixo */
  h.vy += (h.naAgua ? 300 : GRAV) * dt;
  if (S.nada && h.naAgua && teclas.segura && h.vy > -80) h.vy = Math.max(-80, h.vy - 900 * dt);   /* fase de nadar: ▲ segurado sobe */
  h.vy = Math.min(h.vy, h.naAgua ? 70 : MAXQ);
  var r = move(h, dt, true);
  h.noChao = r.chao;
  /* luva grudenta: encostado na parede, caindo e empurrando contra ela = escorrega devagar */
  h.grudado = 0;
  if (h.pod.grudar && r.parede && !r.chao && !h.naAgua && h.vy > 0 && (dir || esq)) { h.grudado = dir ? 1 : -1; h.vy = Math.min(h.vy, 30); }
  corpoPeq = false;
  fimPassoHeroi(h, dt);
}
function fimPassoHeroi(h, dt) {
  if (h.inv > 0) h.inv -= dt;
  if (h.rapido > 0) h.rapido -= dt;
  if (h.pulaAlto > 0) h.pulaAlto -= dt;
  if (h.tTam > 0) { h.tTam -= dt; if (h.tTam <= 0) h.tam = 1; }
  if (!h.escada) { if (Math.abs(h.vx) > 8 && h.noChao) { h.tq += dt; if (h.tq > .14) { h.tq = 0; h.q = 1 - h.q; } } else h.q = 0; }
  /* poderes com tempo: quando o relógio do poder chega no zero, a regra "o poder acabar" acorda */
  Object.keys(h.pod).forEach(function (k) {
    if (h.pod[k] === Infinity) return;
    h.pod[k] -= dt; if (h.pod[k] <= 0) { delete h.pod[k]; acabouPoder(k); }
  });
  /* pequenino de verdade: a caixa encolhe; volta a crescer só onde couber (no túnel fica pequenino) */
  if (h.pod.pequeno && !h.peq) { if (setaCaixa(6, 8)) h.peq = true; }
  else if (!h.pod.pequeno && h.peq) { if (setaCaixa(10, 14)) h.peq = false; }
  /* caiu no buraco */
  var fundo = ALT * TS + 24;
  if (h.y > fundo) {
    var ok = dispara('cai', {});
    if (h.y > fundo) { h.x = S.controle.x; h.y = S.controle.y; h.vx = h.vy = 0; encaixaY(); if (!ok) log('O herói caiu e não tem regra para isso: voltou para o começo', null, 'vida'); }
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
  } else if (m === 'nada') {   /* peixe: vai e volta dentro da água, balançando */
    e.vx = e.dir * (T.vel || 30); e.vy = 0;
    var r4 = move(e, dt, false), fx = e.dir > 0 ? e.x + e.ox + e.w + 1 : e.x + e.ox - 1;
    if (r4.parede || !aguaTile(Math.floor(fx / TS), Math.floor((e.y0 + 8) / TS)) || e.dir * (e.x - e.x0) > 40) e.dir *= -1;
    e.y = e.y0 + Math.sin(e.t * 2.2) * 3;
  }
  if (e.y > ALT * TS + 40) e.vivo = false;
}

/* contato herói × peças: dispara "toca" ao ENTRAR em contato (não a cada quadro) */
function contatos() {
  var hb = caixa(heroi), largo = { x: hb.x - 1, y: hb.y - 1, w: hb.w + 2, h: hb.h + 2 };
  /* água (casinha da grade): "tocar em água" acorda ao ENTRAR em cada casinha, como quando era peça */
  var agora = {}, ax0 = Math.floor(hb.x / TS), ax1 = Math.floor((hb.x + hb.w - .01) / TS), ay0 = Math.floor(hb.y / TS), ay1 = Math.floor((hb.y + hb.h - .01) / TS);
  for (var ay = ay0; ay <= ay1; ay++) for (var ax = ax0; ax <= ax1; ax++) if (aguaTile(ax, ay)) {
    var ka = ax + ',' + ay; agora[ka] = 1;
    if (!aguaDentro[ka]) dispara('toca', { ent: { tipo: 'agua', classe: 'agua', x: ax * TS, y: ay * TS, w: TS, h: TS, ox: 0, oy: 0, vivo: true, grade: [ax, ay] } });
  }
  aguaDentro = agora;
  ents.forEach(function (e) {
    if (!e.vivo) return;
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
  for (var i = 0; i < 60; i++) parts.push({ x: cam.x + Math.random() * cv.width, y: cam.y - 5, vx: (Math.random() - .5) * 60, vy: 40 + Math.random() * 80, t: 2.2, cor: cores[i % 6], conf: true }); }
function solta(x, y, txt) { parts.push({ x: x, y: y, vx: 0, vy: -40, t: .8, txt: FAB.tr(String(txt)) }); }

/* ---------------- desenho ---------------- */
function fundo() {
  var C = FAB.CENARIOS[S.cenario || J.fases[S.fase].cenario] || FAB.CENARIOS.dia, w = cv.width;
  var g = cx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, C.ceu[0]); g.addColorStop(1, C.ceu[1]);
  cx.fillStyle = g; cx.fillRect(0, 0, w, VH);
  if (ALT > LINHAS) cx.translate(0, Math.round((ALT * TS - VH - cam.y) * .3));   /* mapa alto: lá em cima, os morros ficam lá embaixo */
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
  cx.setTransform(1, 0, 0, 1, Math.round(-cam.x + sx), Math.round(-cam.y));
  var t0 = Math.max(0, Math.floor(cam.x / TS) - 1), t1 = Math.min(W, Math.ceil((cam.x + w) / TS) + 1);
  var r0 = Math.max(0, Math.floor(cam.y / TS) - 1), r1 = Math.min(ALT, Math.ceil((cam.y + VH) / TS) + 1);
  var fq = Math.floor(performance.now() / 300) % 2;
  for (var ty = r0; ty < r1; ty++) for (var tx = t0; tx < t1; tx++) {
    var tp = tipoEm(tx, ty); if (!tp) continue;
    var sk = FAB.skinDe(tp);
    if (tp === 'grama' && solidoTile(tx, ty - 1)) sk = FAB.skinDe('terra');
    if (FAB.TIPOS[tp].cano) { var tc = tipoEm(tx, ty - 1); if (tc && FAB.TIPOS[tc].cano) sk = 'canocorpo'; }
    if (tp === 'agua' && sk === 'agua' && aguaTile(tx, ty - 1)) sk = 'aguafundo';   /* água de baixo: sem a espuma de cima */
    cx.drawImage(FAB.sprCanvas(sk, fq), tx * TS, ty * TS);
  }
  ents.forEach(function (e) {
    if (e.x + 16 < cam.x - 16 || e.x > cam.x + w + 16 || e.y + 16 < cam.y - 16 || e.y > cam.y + VH + 16) return;
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
  /* herói (meio e pés: com a caixa normal de 10x14 é o mesmo lugar de sempre) */
  var hmx = heroi.x + heroi.w / 2, hpe = heroi.y + heroi.h, sobe = 0;
  if (heroi.mont) { sobe = 8; hmx -= heroi.dir < 0 ? -1.5 : 1.5; }   /* montado: o herói (menorzinho) sentado na sela */
  if (!(heroi.inv > 0 && Math.floor(heroi.inv * 12) % 2)) {
    var hi = FAB.sprCanvas(FAB.skinDe('heroi'), heroi.mont ? 0 : heroi.q), tam = heroi.peq ? .6 : heroi.mont ? .75 * (heroi.tam || 1) : heroi.tam;
    cx.save();
    if (tam && tam !== 1) {   /* gigante / pequeno: os pés ficam no mesmo lugar */
      cx.translate(Math.round(hmx), Math.round(hpe - sobe)); cx.scale(heroi.dir < 0 ? -tam : tam, tam); cx.drawImage(hi, -8, -16);
    } else if (heroi.dir < 0) { cx.translate(Math.round(hmx - 8) + 16, Math.round(hpe - 16 - sobe)); cx.scale(-1, 1); cx.drawImage(hi, 0, 0); }
    else cx.drawImage(hi, Math.round(hmx - 8), Math.round(hpe - 16 - sobe));
    cx.restore();
  }
  if (heroi.mont) {   /* o cavalo na frente das pernas do herói */
    var cav = FAB.sprCanvas(FAB.skinDe(heroi.mont.tipo), Math.abs(heroi.vx) > 8 && heroi.noChao ? Math.floor(performance.now() / 140) % 2 : 0);
    cx.save(); cx.translate(Math.round(heroi.x + heroi.w / 2), Math.round(hpe)); cx.scale(heroi.dir < 0 ? -1 : 1, 1); cx.drawImage(cav, -8, -16); cx.restore();
  }
  if (heroi.grudado) { cx.fillStyle = '#8b5cf6'; cx.fillRect(Math.round(heroi.grudado > 0 ? heroi.x + heroi.w : heroi.x - 2), Math.round(heroi.y + 4), 2, 3); }
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
  hudTela();
}
/* barras no canto do palco (desenhadas, sem texto): fôlego nas fases de nadar e os poderes ligados */
function hudTela() {
  var w = cv.width, x = w - 6;
  cx.setTransform(1, 0, 0, 1, 0, 0);
  if (S.nada) {
    var f = Math.max(0, S.folego / S.folegoMax), pisca = f < .25 && Math.floor(performance.now() / 250) % 2;
    var bw = 46, bx = x - bw, by = 6;
    cx.fillStyle = 'rgba(14,12,36,.7)'; cx.fillRect(bx - 14, by - 2, bw + 16, 10);
    cx.strokeStyle = '#1a1c2c'; cx.fillStyle = '#bdf0ff'; cx.lineWidth = 1;
    cx.beginPath(); cx.arc(bx - 7, by + 3, 3.5, 0, 7); cx.fill(); cx.stroke();
    cx.beginPath(); cx.arc(bx - 3, by, 1.6, 0, 7); cx.fill();
    cx.fillStyle = '#1e4fa8'; cx.fillRect(bx, by, bw, 6);
    cx.fillStyle = pisca ? '#e43b44' : f < .25 ? '#feae34' : '#2ce8f5'; cx.fillRect(bx, by, Math.round(bw * f), 6);
    cx.strokeStyle = '#ffffff'; cx.strokeRect(bx + .5, by + .5, bw - 1, 5);
    x = bx - 20;
  }
  var y = S.nada ? 18 : 6;
  var lista = Object.keys(heroi.pod).map(function (k) { return { k: k, t: heroi.pod[k] }; });
  if (heroi.mont) lista.push({ k: 'cavalo', t: Infinity });
  var px = w - 6;
  lista.forEach(function (p) {
    var pc = { duplo: 'pena', grudar: 'luva', pequeno: 'cogroxo', cavalo: 'cavalo' }[p.k] || 'pena';
    px -= 16;
    cx.fillStyle = 'rgba(14,12,36,.7)'; cx.fillRect(px - 1, y - 1, 15, 15);
    cx.drawImage(FAB.sprCanvas(FAB.skinDe(pc), 0), px, y, 13, 13);
    if (p.t !== Infinity) { cx.fillStyle = '#fee761'; cx.fillRect(px, y + 13, Math.max(1, Math.round(13 * Math.min(1, p.t / 10))), 1); }
    px -= 2;
  });
}

/* ---------------- laço principal ---------------- */
function quadro(t) {
  if (!rodando) return;
  raf = requestAnimationFrame(quadro);
  var dt = Math.max(0, Math.min(1 / 30, (t - tAnt) / 1000 || 0)); tAnt = t;   /* o 1º quadro pode vir com hora de antes do começo: nunca tempo negativo (o herói atravessava o chão) */
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
  /* fôlego (só nas fases de nadar): gasta com a cabeça embaixo da água, enche fora dela */
  if (S.nada) {
    var cab = aguaTile(Math.floor((heroi.x + heroi.w / 2) / TS), Math.floor((heroi.y + 2) / TS));
    S.folego = cab ? Math.max(0, S.folego - dt) : Math.min(S.folegoMax, S.folego + 8 * dt);
    if (S.folego > 0) folegoTrava = false;
    if (cab && !avisoAr && S.folego < S.folegoMax * .25 && S.folego > 0) { avisoAr = true; falaB = { txt: FAB.tr('Pegue uma bolha!'), t: 2.2 }; }
    if (S.folego > S.folegoMax * .3) avisoAr = false;
    if (S.folego <= 0 && !folegoTrava) { folegoTrava = true; dispara('folego0', {}); }
  }
  /* câmera */
  var alvo = heroi.x + 5 - cv.width / 2 + heroi.dir * 20;
  cam.x += (alvo - cam.x) * Math.min(1, 6 * dt);
  cam.x = Math.max(0, Math.min(cam.x, W * TS - cv.width));
  if (ALT > LINHAS) {   /* mapa alto: sobe e desce com folga (zona morta), olhando um pouco para baixo ao cair */
    var ay = heroi.y + heroi.h / 2 - VH / 2 + (heroi.vy > 150 && !heroi.naAgua ? 24 : 0), dy = ay - cam.y;
    if (Math.abs(dy) > 24) cam.y += (dy - (dy > 0 ? 24 : -24)) * Math.min(1, 8 * dt);
    cam.y = Math.max(0, Math.min(cam.y, ALT * TS - VH));
  } else cam.y = 0;
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
  if (FAB.pacoteNasce) FAB.pacoteNasce(J);   /* peça de poder posta à mão no jogo antigo: a regra dela nasce aqui */
  M.botoesExtras(cv.parentNode);
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
  if (k === 'baixo' && apertada && !teclas.baixo) teclas.baixoNovo = true;   /* entrar no cano: só na hora que aperta */
  teclas[k] = apertada;
};
/* só LEITURA, para o jogador-robô do gate enxergar a tela como a criança enxerga
   (olha para o lado em que o herói está virado; o resto é o que a tela mostra: escada, água, fôlego, poderes) */
M.olha = function () {
  if (!rodando) return null;
  var h = heroi, d = h.dir < 0 ? -1 : 1, pe = Math.floor((h.y + h.h + 2) / TS);
  var frente = d > 0 ? Math.floor((h.x + h.w + 14) / TS) : Math.floor((h.x - 14) / TS), px = d > 0 ? Math.floor((h.x + h.w + 6) / TS) : Math.floor((h.x - 6) / TS);
  return { x: h.x, y: h.y, w: h.w, h: h.h, vx: h.vx, vy: h.vy, dir: d, noChao: h.noChao,
    buraco: !solidoTile(frente, pe) && !nuvemTile(frente, pe) && !topoEscada(frente, pe) && !solidoTile(frente, pe + 1),
    parede: solidoTile(px, Math.floor((h.y + 8) / TS)),
    perigo: ents.some(function (e) { var dx = (e.x - h.x) * d; return e.vivo && (e.classe === 'inimigo' || e.classe === 'perigo') && dx > -4 && dx < 26 && Math.abs(e.y - h.y) < 30; }),
    escada: !!h.escada, naAgua: !!h.naAgua, nada: !!S.nada, folego: S.folego, folegoMax: S.folegoMax,
    poderes: Object.keys(h.pod), montada: !!h.mont, pequeno: !!h.peq, fase: S.fase, ts: TS };
};
M.TS = TS; M.LINHAS = LINHAS; M.SONS = SONS;
M.altura = function () { return ALT; };
/* todo texto fixo que o motor desenha no canvas ou escreve no registro da lupa (o portão do inglês confere) */
M.textos = function () {
  return ['Oba!', 'Acabaram as perguntas!', 'O herói perdeu vida aqui', 'O herói caiu e não tem regra para isso: voltou para o começo',
    'Regra {0} acordou → {1}', 'Regra {0}: o cadeado não abriu ({1})', 'Pegue uma bolha!', 'Este cano não tem par: ponha outro cano na fase']
    .concat(FAB.OPCOES.falas || []).concat(Object.keys(FAB.NOME_OPCAO || {}).map(function (k) { return FAB.NOME_OPCAO[k]; }));
};
/* botão ▼ (descer do cipó, entrar no cano) na mesa de toques do palco: só aparece se o jogo tem cipó, escada ou cano.
   Pode ser chamado de fora (telas.js) a qualquer hora; não duplica. */
M.botoesExtras = function (palco) {
  var t = palco && palco.querySelector ? palco.querySelector('.toques') : null; if (!t) return;
  var precisa = J && J.fases && J.fases.some(function (f) { return f.mapa.some(function (l) { return /[YHU]/.test(l); }); });
  var b = t.querySelector('[data-k="baixo"]');
  if (!precisa) { if (b) b.remove(); return; }
  if (b) return;
  var gp = t.querySelector('.gp'); if (!gp) return;
  b = document.createElement('button'); b.dataset.k = 'baixo'; b.textContent = '▼'; b.title = 'Descer';
  var dir = gp.querySelector('[data-k="dir"]'); gp.insertBefore(b, dir || null);
  b.onpointerdown = function (e) { e.preventDefault(); M.tecla('baixo', true); };
  b.onpointerup = b.onpointerleave = b.onpointercancel = function () { M.tecla('baixo', false); };
};

var MAPA_TECLAS = { ArrowLeft: 'esq', a: 'esq', A: 'esq', ArrowRight: 'dir', d: 'dir', D: 'dir', ArrowUp: 'pulo', w: 'pulo', W: 'pulo', ' ': 'pulo', x: 'X', X: 'X', c: 'C', C: 'C', v: 'V', V: 'V',
  ArrowDown: 'baixo', s: 'baixo', S: 'baixo' };
window.addEventListener('keydown', function (ev) {
  if (!rodando || /INPUT|TEXTAREA/.test((ev.target || {}).tagName)) return;
  var k = MAPA_TECLAS[ev.key]; if (!k) return;
  if (ev.ctrlKey || ev.metaKey) return;
  ev.preventDefault(); if (ev.repeat) return; M.tecla(k, true);
});
window.addEventListener('keyup', function (ev) { var k = MAPA_TECLAS[ev.key]; if (k && k !== 'X' && k !== 'C' && k !== 'V') M.tecla(k, false); });

FAB.motor = M;
})();
