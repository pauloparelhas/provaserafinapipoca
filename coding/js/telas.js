/* ============================================================
   telas.js — Início, Ideia, Testar, Diário, Robô, Missões, Mostrar
   + a janela da Placa ? + o link de compartilhar + a partida.
   ============================================================ */
(function () {
'use strict';
var $ = FAB.$, esc = FAB.esc, ui = FAB.ui;

/* carinhas do diário (SVG) */
var CARAS = {
  feliz: '<circle cx="12" cy="12" r="10" fill="#fee761" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="8.5" cy="10" r="1.4" fill="#1a1c2c"/><circle cx="15.5" cy="10" r="1.4" fill="#1a1c2c"/><path d="M7.5 14a5 5 0 0 0 9 0" stroke="#1a1c2c" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  meio:  '<circle cx="12" cy="12" r="10" fill="#feae34" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="8.5" cy="10" r="1.4" fill="#1a1c2c"/><circle cx="15.5" cy="10" r="1.4" fill="#1a1c2c"/><path d="M8 15h8" stroke="#1a1c2c" stroke-width="1.8" stroke-linecap="round"/>',
  triste:'<circle cx="12" cy="12" r="10" fill="#a7b0bd" stroke="#1a1c2c" stroke-width="1.6"/><circle cx="8.5" cy="10" r="1.4" fill="#1a1c2c"/><circle cx="15.5" cy="10" r="1.4" fill="#1a1c2c"/><path d="M8 16.5a5 5 0 0 1 8 0" stroke="#1a1c2c" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
};
Object.keys(CARAS).forEach(function (k) { FAB.ICONES['cara_' + k] = CARAS[k]; });
var FALA_CARA = { feliz: 'Ficou do jeito que eu queria', meio: 'Quase do jeito que eu queria', triste: 'Não ficou do jeito que eu queria' };
var MUDAR = ['o pulo', 'os inimigos', 'as moedas', 'o caminho', 'as regras', 'o desenho', 'nada, ficou ótimo'];

function quando(t) { var d = new Date(t); return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
function miniatura(cv, J) { try { FAB.desenhaMapa(cv, J.fases[0], 1, false); } catch (e) {} }
function comJogo(J, f) { var a = FAB.E.atual; FAB.E.atual = J.id; try { return f(); } finally { FAB.E.atual = a; } }

/* ============================ INÍCIO ============================ */
function abreModelo(id) {
  var J = FAB.E.jogos.filter(function (j) { return j.origem === id; })[0] || FAB.novoJogo(id);
  FAB.abreJogo(J.id); return J;
}
FAB.T.painel = { nome: 'Fábrica de Jogos', ajuda: 'Aqui você cria jogos. Aperte Continuar.', monta: function (C) {
  var J = FAB.jogo(), m = FAB.proximaMissao(), feitas = FAB.feitas(), tot = FAB.MISSOES.length;
  C.innerHTML =
    '<div class="pn-hero">' +
      '<div class="card pn-cont"><div class="tit">' + FAB.ico('spr:' + FAB.skinDe('heroi'), 36) + esc(J.nome) + '</div>' +
        '<canvas class="pn-thumb pix" id="pnThumb"></canvas>' +
        '<div class="linha"><button class="bt amarelo grande" id="pnCont">' + FAB.ico('play', 30) + 'Continuar</button>' +
        '<button class="bt verde grande" onclick="FAB.ui.vai(\'testar\')">' + FAB.ico('t_testar', 30) + 'Testar</button></div></div>' +
      '<div class="card pn-missao">' + (m ?
        '<div class="linha"><button class="falar" id="pnFala">' + FAB.ico('falar', 22) + '</button><b>Missão ' + (FAB.MISSOES.indexOf(m) + 1) + ' de ' + tot + '</b></div>' +
        '<div class="fr">' + esc(m.frase) + '</div>' : '<div class="fr">Você fez todas as missões! Agora invente o que quiser.</div>') +
        '<div class="barra"><i style="width:' + Math.round(feitas / tot * 100) + '%"></i></div>' +
        '<p class="mut" style="margin-top:6px">' + feitas + ' missões feitas · ' + FAB.xp() + ' XP · ' + FAB.nivel().nome + '</p>' +
        (m ? '<button class="bt amarelo" style="margin-top:10px" id="pnIr">Ir para a missão</button>' : '') + '</div>' +
    '</div>' +
    '<div class="tit" style="margin-top:22px">' + FAB.ico('t_jogar', 28) + 'Meus jogos</div><div class="grade jogos" id="pnJogos"></div>' +
    '<div class="linha" style="margin-top:24px"><button class="bt cinza" id="pnExp">' + FAB.ico('foto', 22) + 'Guardar no computador</button>' +
      '<label class="bt cinza">' + FAB.ico('desfazer', 22) + 'Abrir do computador<input type="file" accept=".json" id="pnImp" hidden></label>' +
      '<span class="mut">Para o papai: o arquivo guarda tudo e é o mesmo que vai para o robô.</span></div>';
  miniatura($('pnThumb'), J);
  function vaiMissao() { if (!m) { ui.vai('fases'); return; } if (m.abre) abreModelo(m.abre); FAB.fala(m.frase); ui.nav(); ui.vai(m.onde); }
  $('pnCont').onclick = vaiMissao; if ($('pnIr')) $('pnIr').onclick = vaiMissao;
  if ($('pnFala')) $('pnFala').onclick = function () { FAB.fala(m.frase); };
  var h = '';
  FAB.E.jogos.forEach(function (j) {
    h += '<div class="card jg' + (j.id === J.id ? ' on' : '') + '" data-j="' + j.id + '"><canvas class="pix"></canvas><b>' + esc(j.nome) + '</b><span class="mut">' + j.fases.length + ' fase(s) · ' + j.regras.length + ' regras</span>' +
      (j.id !== J.id ? '<button class="ib" data-apaga="' + j.id + '" title="Apagar jogo" style="align-self:flex-end">' + FAB.ico('lixo', 20) + '</button>' : '') + '</div>';
  });
  h += '<button class="card jg" id="pnNovo" style="align-items:center;justify-content:center;min-height:150px">' + FAB.ico('mais', 48) + '<b>Jogo novo</b></button>';
  $('pnJogos').innerHTML = h;
  $('pnJogos').querySelectorAll('[data-j]').forEach(function (el) {
    var j = FAB.E.jogos.filter(function (x) { return x.id === el.dataset.j; })[0];
    comJogo(j, function () { miniatura(el.querySelector('canvas'), j); });
    el.onclick = function (ev) {
      if (ev.target.closest('[data-apaga]')) {
        ui.abre('<h2>Apagar o jogo "' + esc(j.nome) + '"?</h2><p class="mut" style="margin-bottom:14px">Não dá para desfazer.</p><div class="linha"><button class="bt rosa" id="apSim">Apagar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
        $('apSim').onclick = function () { FAB.apagaJogo(j.id); ui.fecha(); ui.vai('painel'); };
        return;
      }
      FAB.abreJogo(j.id); ui.nav(); ui.vai('painel');
    };
  });
  $('pnNovo').onclick = function () {
    ui.escolhe('Começar de onde?', 'Escolha como o jogo novo começa', Object.keys(FAB.MODELOS).map(function (k) {
      return { id: k, nome: FAB.MODELOS[k].nome, sub: FAB.MODELOS[k].descricao, ico: FAB.ico(k === 'quebrado' ? 'lupa' : k === 'vazio' ? 'mais' : k === 'castelo' ? 'cadeado' : 'play', 40) };
    }), function (k) { FAB.novoJogo(k); ui.nav(); ui.vai(k === 'quebrado' ? 'testar' : 'painel'); });
  };
  $('pnExp').onclick = function () { FAB.exporta(); ui.toast('Arquivo guardado na pasta Downloads.'); };
  $('pnImp').onchange = function () { var f = this.files[0]; if (!f) return; FAB.importa(f, function (ok) { if (ok) location.reload(); else ui.toast('Esse arquivo não é da Fábrica.', true); }); };
} };

/* ============================ IDEIA ============================ */
function chips(id, ops, val) { return '<div class="escolhas" id="' + id + '">' + ops.map(function (o) { return '<button class="esc' + (val === o ? ' on' : '') + '" data-v="' + esc(o) + '">' + esc(o) + '</button>'; }).join('') + '</div>'; }
FAB.T.ideia = { nome: 'Ideia', ajuda: 'Conte como é o seu jogo antes de construir.', monta: function (C) {
  var J = FAB.jogo(), I = J.ideia = J.ideia || {};
  C.innerHTML = '<div class="grade" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">' +
    '<div class="card"><div class="tit">' + FAB.ico('t_ideia', 28) + 'Nome do jogo</div>' + ui.campo('idNome', 'Nome do jogo') + '</div>' +
    '<div class="card"><div class="tit">' + FAB.ico('spr:' + FAB.skinDe('heroi'), 34) + 'Herói: ' + esc(FAB.nomeTipo('heroi') === 'heroi' ? FAB.spr(FAB.skinDe('heroi')).nome : ((J.nomes || {}).heroi || FAB.spr(FAB.skinDe('heroi')).nome)) + '</div><button class="bt" onclick="FAB.pixelPapel(\'heroi\');FAB.ui.vai(\'pixel\')">' + FAB.ico('t_pixel', 22) + 'Desenhar o herói</button></div>' +
    '<div class="card"><div class="tit">' + FAB.ico('trofeu', 28) + 'Como ganha?</div>' + chips('idObj', ['chegar na bandeira', 'pegar as estrelas', 'fugir dos inimigos', 'acertar as perguntas'], I.objetivo) + '</div>' +
    '<div class="card"><div class="tit">' + FAB.ico('t_jogar', 28) + 'Para quem?</div>' + chips('idQuem', ['papai', 'mamãe', 'amigas', 'eu mesma', 'todo mundo'], I.paraQuem) + '</div>' +
    '<div class="card" style="grid-column:1/-1"><div class="tit">' + FAB.ico('t_diario', 28) + 'A história do jogo</div>' + ui.campo('idHist', 'Era uma vez…', true) + '<p class="mut" style="margin-top:6px">Aparece na capa quando alguém for jogar.</p></div>' +
  '</div>';
  ui.ligaMic(C);
  $('idNome').value = J.nome; $('idHist').value = I.historia || '';
  $('idNome').oninput = function () { J.nome = this.value.slice(0, 40) || 'Meu jogo'; FAB.mudou(); ui.topo(); };
  $('idHist').oninput = function () { I.historia = this.value.slice(0, 400); FAB.mudou(); };
  [['idObj', 'objetivo'], ['idQuem', 'paraQuem']].forEach(function (p) {
    $(p[0]).querySelectorAll('.esc').forEach(function (b) { b.onclick = function () { I[p[1]] = b.dataset.v; FAB.mudou(); FAB.T.ideia.monta(C); }; });
  });
} };

/* ============================ PLACA ? ============================ */
function abrePergunta(q, responde) {
  var ord = [0, 1, 2].slice(0, q.o.length).sort(function () { return Math.random() - .5; }), feito = false;
  var h = '<h2><button class="falar" id="pqFala">' + FAB.ico('falar', 22) + '</button>' + FAB.ico('pergunta', 30) + (q.fonte === 'minha' ? 'Minha pergunta' : 'Pergunta da prova') + '</h2>' +
    '<div class="perg">' + esc(q.p) + '</div><div class="alts">' +
    ord.map(function (i, k) { return '<button class="alt" data-i="' + i + '"><kbd>' + (k + 1) + '</kbd>' + esc(q.o[i]) + '</button>'; }).join('') + '</div>' +
    '<div class="expl" id="pqEx"></div><div style="margin-top:12px;display:none" id="pqSeg"><button class="bt verde grande" id="pqOk">Continuar o jogo</button></div>';
  ui.abre(h); ui._preso = true; var fx = document.querySelector('#mbox .fecha'); if (fx) fx.remove();
  function fala() { FAB.fala(q.p + '. ' + ord.map(function (i, k) { return (k + 1) + ': ' + q.o[i]; }).join('. ')); }
  $('pqFala').onclick = fala; fala();
  function escolhe(i) {
    if (feito) return; feito = true;
    var certo = i === (q.c || 0);
    document.querySelectorAll('#mbox .alt').forEach(function (b) { var bi = +b.dataset.i; if (bi === (q.c || 0)) b.classList.add('certa'); else if (bi === i) b.classList.add('errada'); });
    var ex = $('pqEx'); ex.style.display = 'block';
    ex.innerHTML = (certo ? '<b style="color:#8ff0a4">Acertou!</b> ' : '<b style="color:#ffb3b9">A certa é: ' + esc(q.o[q.c || 0]) + '.</b> ') + esc(q.ex || '');
    FAB.fala(certo ? 'Acertou! ' + (q.ex || '') : 'A certa é: ' + q.o[q.c || 0] + '. ' + (q.ex || ''));
    $('pqSeg').style.display = 'block';
    $('pqOk').onclick = function () { document.removeEventListener('keydown', tecla); ui._preso = false; ui.fecha(); responde(certo); };
  }
  function tecla(ev) { var n = +ev.key; if (n >= 1 && n <= ord.length) escolhe(ord[n - 1]); else if (feito && ev.key === 'Enter') $('pqOk').click(); }
  document.addEventListener('keydown', tecla);
  document.querySelectorAll('#mbox .alt').forEach(function (b) { b.onclick = function () { escolhe(+b.dataset.i); }; });
}

/* ============================ TESTAR ============================ */
var lupaOn = false, dicaN = 0;
var DICAS_QUEBRADO = [
  'Bichinho 1: olhe a regra da moeda. Quantos pontos ela dá?',
  'Bichinho 2: tem uma regra desligada. Qual é? O que ela faz?',
  'Bichinho 3: tem um buraco largo demais para pular. Ponha uma mola ou um chão.'
];
function rodaJogo(C, convidado) {
  var J = FAB.jogo(), cv = C.querySelector('canvas'), hud = C.querySelector('.hud'), log = $('tsLog'), sobre = C.querySelector('.sobre');
  sobre.classList.remove('on');
  if (log) log.innerHTML = '<div>Teste começou. Cada vez que uma regra acordar, aparece aqui.</div>';
  FAB.motor.inicia(cv, J, {
    convidado: convidado, lupa: lupaOn,
    onHud: function (S) {
      var h = '<span>' + FAB.ico('spr:' + FAB.skinDe('moeda'), 22) + S.pontos + '</span><span>' + FAB.ico('coracao', 22) + S.vidas + '</span>';
      Object.keys(S.mochila).forEach(function (k) { if (S.mochila[k] > 0) h += '<span>' + FAB.ico('mochila', 20) + FAB.icoTipo(k, 20) + S.mochila[k] + '</span>'; });
      if (S.tempo !== null) h += '<span>' + FAB.ico('ampulheta', 22) + S.tempo + '</span>';
      hud.innerHTML = h;
    },
    onLog: function (t, id, tipo) {
      if (!log) return;
      var d = document.createElement('div'); d.className = tipo || ''; d.textContent = t;
      if (id) { d.style.cursor = 'pointer'; d.title = 'Ver a regra'; d.onclick = function () { FAB.regrasPisca(id); ui.vai('regras'); }; }
      log.insertBefore(d, log.firstChild); while (log.children.length > 60) log.removeChild(log.lastChild);
    },
    onFase: function (nome) { ui.toast(nome, false); },
    onPergunta: abrePergunta,
    onFim: function (R) { fimTeste(C, R, convidado); }
  });
}
function fimTeste(C, R, convidado) {
  var J = FAB.jogo();
  if (!FAB.compartilhado) {
    J.ultimoTeste = R; J.testes = (J.testes || []).concat([{ data: R.data, pontos: R.pontos, venceu: R.venceu, segundos: R.segundos, vidasPerdidas: R.vidasPerdidas, convidado: R.convidado }]).slice(-30);
    FAB.E.stats.testes++; if (convidado) FAB.E.stats.convidado++;
    FAB.mudou();
  }
  var acordaram = Object.keys(R.disparos).length;
  var sobre = C.querySelector('.sobre');
  sobre.innerHTML = '<div class="res card"><h2>' + (R.venceu ? 'Ganhou!' : 'Fim do teste') + '</h2>' +
    '<div class="nums"><div>' + R.pontos + '<small>pontos</small></div><div>' + R.segundos + 's<small>tempo</small></div><div>' + R.vidasPerdidas + '<small>vidas perdidas</small></div></div>' +
    (convidado ? '<p class="mut">Mostre para a criadora onde foi difícil.</p>' :
      '<p class="mut">' + acordaram + ' regras acordaram. Ficou do jeito que você queria?</p><div class="caras">' +
      ['feliz', 'meio', 'triste'].map(function (k) { return '<button class="cara" data-c="' + k + '" title="' + FALA_CARA[k] + '">' + FAB.ico('cara_' + k, 56) + '</button>'; }).join('') + '</div><div id="tsMudar"></div>') +
    '<div class="linha" style="justify-content:center;margin-top:10px"><button class="bt verde grande" id="tsDeNovo">' + FAB.ico('play', 28) + 'De novo</button>' +
    (convidado ? '' : '<button class="bt" id="tsRegras">' + FAB.ico('t_regras', 22) + 'Regras</button><button class="bt" id="tsFases">' + FAB.ico('t_fases', 22) + 'Fases</button>') + '</div></div>';
  sobre.classList.add('on');
  FAB.fala(R.venceu ? 'Ganhou! ' + R.pontos + ' pontos.' : 'Fim do teste. ' + R.pontos + ' pontos.');
  $('tsDeNovo').onclick = function () { rodaJogo(C, convidado); };
  if ($('tsRegras')) { $('tsRegras').onclick = function () { ui.vai('regras'); }; $('tsFases').onclick = function () { ui.vai('fases'); }; }
  sobre.querySelectorAll('.cara').forEach(function (b) {
    b.onclick = function () {
      sobre.querySelectorAll('.cara').forEach(function (x) { x.classList.toggle('on', x === b); });
      var ent = { id: FAB.uid('d'), data: Date.now(), jogo: J.id, nomeJogo: J.nome, cara: b.dataset.c, pontos: R.pontos, venceu: R.venceu, segundos: R.segundos, vidasPerdidas: R.vidasPerdidas };
      FAB.E.diario.push(ent); FAB.fala(FALA_CARA[b.dataset.c] + '. O que você vai mudar?');
      $('tsMudar').innerHTML = '<p class="mut" style="margin:6px 0">O que você vai mudar?</p>' + chips('tsMudarC', MUDAR, null);
      $('tsMudarC').querySelectorAll('.esc').forEach(function (c) { c.onclick = function () { ent.mudar = c.dataset.v; FAB.mudou(); $('tsMudar').innerHTML = '<p class="mut">Anotado no diário: mudar ' + esc(c.dataset.v) + '.</p>'; }; });
      FAB.salva();   /* a medalha do diário espera ela responder o que vai mudar */
    };
  });
}
function palcoHTML() {
  return '<div class="palco"><canvas class="pix"></canvas><div class="hud"></div>' +
    '<div class="toques"><div class="gp"><button data-k="esq">◀</button><button data-k="dir">▶</button></div><div class="gp"><button data-k="X">X</button><button data-k="pulo">▲</button></div></div>' +
    '<div class="sobre"></div></div>';
}
function ligaToques(C) {
  C.querySelectorAll('.toques button').forEach(function (b) {
    var k = b.dataset.k;
    b.onpointerdown = function (e) { e.preventDefault(); FAB.motor.tecla(k, true); };
    b.onpointerup = b.onpointerleave = b.onpointercancel = function () { FAB.motor.tecla(k, false); };
  });
}
FAB.T.testar = { nome: 'Testar', ajuda: 'Jogue o seu jogo. Setas andam, espaço pula.', monta: function (C) {
  var J = FAB.jogo();
  C.innerHTML = '<div class="ts-wrap' + (lupaOn ? '' : ' sem-lupa') + '" id="tsWrap"><div>' + palcoHTML() +
    '<div class="linha" style="margin-top:10px"><button class="bt verde" id="tsRec">' + FAB.ico('volta', 22) + 'Recomeçar</button>' +
    '<button class="bt' + (lupaOn ? ' amarelo' : '') + '" id="tsLupa">' + FAB.ico('lupa', 22) + 'Lupa de bichinhos</button>' +
    '<button class="bt cinza" id="tsPara">Parar</button>' +
    (J.origem === 'quebrado' ? '<button class="bt rosa" id="tsDica">' + FAB.ico('lupa', 22) + 'Dica do detetive</button>' : '') +
    '<span class="mut">Setas ou A/D andam · espaço pula · X, C e V são teclas de regra</span></div></div>' +
    '<div class="log" id="tsLog"></div></div>';
  ligaToques(C);
  $('tsRec').onclick = function () { rodaJogo(C, false); };
  $('tsPara').onclick = function () { FAB.motor.termina(); };
  $('tsLupa').onclick = function () {
    lupaOn = !lupaOn; FAB.motor.lupa(lupaOn); $('tsWrap').classList.toggle('sem-lupa', !lupaOn); this.classList.toggle('amarelo', lupaOn);
    if (lupaOn) { FAB.E.stats.lupa++; FAB.salva(); FAB.fala('Lupa ligada. Veja as caixas e as regras que acordam.'); }
  };
  if ($('tsDica')) $('tsDica').onclick = function () { var d = DICAS_QUEBRADO[dicaN++ % 3]; ui.toast(d, true); };
  rodaJogo(C, false);
} };

/* ============================ DIÁRIO ============================ */
FAB.T.diario = { nome: 'Diário', ajuda: 'Veja como foram os testes e tire fotos do jogo.', monta: function (C) {
  var J = FAB.jogo();
  var h = '<div class="linha" style="margin-bottom:14px"><button class="bt amarelo" id="dgFoto">' + FAB.ico('foto', 24) + 'Tirar foto do jogo</button><span class="mut">A foto guarda o jogo como está agora. Dá para voltar depois.</span></div>';
  if (J.versoes.length) {
    h += '<div class="tit">' + FAB.ico('foto', 26) + 'Fotos do jogo</div><div class="grade fotos" style="margin-bottom:20px">';
    J.versoes.forEach(function (v, i) { h += '<div class="card jg"><canvas class="pix" data-v="' + i + '"></canvas><b>' + esc(v.nome) + '</b><span class="mut">' + quando(v.data) + '</span><button class="bt cinza" data-volta="' + i + '">Voltar para esta</button></div>'; });
    h += '</div>';
  }
  var ents = (FAB.E.diario || []).filter(function (d) { return d.jogo === J.id; }).reverse();
  h += '<div class="tit">' + FAB.ico('t_diario', 26) + 'Meus testes</div><div class="diario">';
  if (!ents.length) h += '<div class="card mut">Ainda vazio. Teste o jogo e escolha uma carinha no fim.</div>';
  ents.forEach(function (d) {
    h += '<div class="card dia">' + FAB.ico('cara_' + (d.cara || 'meio'), 44) + '<div class="q"><b>' + esc(FALA_CARA[d.cara] || '') + '</b>' +
      '<div class="mut">' + (d.venceu ? 'ganhou' : 'não chegou no fim') + ' · ' + d.pontos + ' pontos · ' + d.segundos + 's · ' + d.vidasPerdidas + ' vidas perdidas' + (d.mudar ? ' · vou mudar: ' + esc(d.mudar) : '') + '</div><time>' + quando(d.data) + '</time></div></div>';
  });
  C.innerHTML = h + '</div>';
  C.querySelectorAll('canvas[data-v]').forEach(function (cv) { var v = J.versoes[+cv.dataset.v]; FAB.desenhaMapa(cv, v.snap.fases[0], 1, false); });
  $('dgFoto').onclick = function () { FAB.tiraFoto('Foto ' + (J.versoes.length + 1)); FAB.motor.toca('magia'); ui.toast('Foto tirada!', true); FAB.T.diario.monta(C); };
  C.querySelectorAll('[data-volta]').forEach(function (b) {
    b.onclick = function () {
      ui.abre('<h2>Voltar o jogo para a ' + esc(J.versoes[+b.dataset.volta].nome) + '?</h2><p class="mut" style="margin-bottom:14px">Antes, eu tiro uma foto do jogo de agora. Nada se perde.</p><div class="linha"><button class="bt verde" id="vtSim">Voltar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
      $('vtSim').onclick = function () { FAB.voltaFoto(+b.dataset.volta); FAB.limpaCache(); ui.fecha(); ui.vai('diario'); ui.toast('Pronto! O jogo voltou.', true); };
    };
  });
} };

/* ============================ ROBÔ ============================ */
var TIPOS_PED = [['personagem', 'Personagem', 't_pixel'], ['inimigo', 'Inimigo', 'pisa'], ['coisa', 'Coisa para pegar', 'mochila'], ['peca', 'Peça da fase', 't_fases'], ['cenario', 'Cenário', 't_ideia'], ['som', 'Som', 'som'], ['regra', 'Regra nova', 't_regras']];
var rascunho = { tipo: null };
FAB.T.robo = { nome: 'Robô', ajuda: 'Peça uma peça nova ao robô: o que é, como é e o que faz.', monta: function (C) {
  var h = '<div class="grade robo-grid">' +
    '<div class="card"><h3>' + FAB.ico('t_robo', 30) + '1. O que é?</h3><div class="escolhas" id="rbTipo">' +
      TIPOS_PED.map(function (t) { return '<button class="esc' + (rascunho.tipo === t[0] ? ' on' : '') + '" data-v="' + t[0] + '">' + FAB.ico(t[2], 20) + ' ' + t[1] + '</button>'; }).join('') + '</div>' +
      ui.campo('rbNome', 'Nome dele (ex.: Dragão Bolha)') + '</div>' +
    '<div class="card"><h3>' + FAB.ico('t_pixel', 30) + '2. Como é?</h3>' + ui.campo('rbComo', 'Cores, tamanho, jeito', true) + '<p class="mut">Ex.: roxo, pequeno, com asas de borboleta.</p></div>' +
    '<div class="card"><h3>' + FAB.ico('t_regras', 30) + '3. O que faz?</h3>' + ui.campo('rbFaz', 'O que ele faz no jogo', true) + '<p class="mut">Ex.: voa em zigue-zague e solta bolhas.</p></div>' +
  '</div><div class="linha" style="margin:14px 0 24px"><button class="bt verde grande" id="rbEnvia" disabled>' + FAB.ico('t_robo', 30) + 'Mandar para o robô</button><span class="mut" id="rbFalta"></span></div>';
  var peds = (FAB.E.pedidos || []).slice().reverse();
  if (peds.length) {
    h += '<div class="tit">' + FAB.ico('t_robo', 26) + 'Meus pedidos</div><div class="grade">';
    peds.forEach(function (p) {
      var pronto = FAB.ENTREGAS && FAB.ENTREGAS[p.id];
      h += '<div class="card ped">' + FAB.ico((TIPOS_PED.filter(function (t) { return t[0] === p.tipo; })[0] || [0, 0, 't_robo'])[2], 34) +
        '<div><b>' + esc(p.nome || p.tipo) + '</b><div class="mut">' + esc(p.como) + ' · ' + esc(p.faz) + '</div>' + (pronto ? '<div style="color:#8ff0a4;font-weight:800">Robô: ' + esc(pronto) + '</div>' : '') + '</div>' +
        '<span class="st ' + (pronto ? 'pronto' : 'enviado') + '">' + (pronto ? 'Pronto!' : 'O robô vai fazer') + '</span></div>';
    });
    h += '</div>';
  }
  C.innerHTML = h; ui.ligaMic(C);
  ['rbNome', 'rbComo', 'rbFaz'].forEach(function (k) { $(k).value = rascunho[k] || ''; $(k).oninput = function () { rascunho[k] = this.value; confere(); }; });
  $('rbTipo').querySelectorAll('.esc').forEach(function (b) { b.onclick = function () { rascunho.tipo = b.dataset.v; $('rbTipo').querySelectorAll('.esc').forEach(function (x) { x.classList.toggle('on', x === b); }); confere(); }; });
  function palavras(s) { return (s || '').trim().split(/\s+/).filter(Boolean).length; }
  function confere() {
    var falta = !rascunho.tipo ? 'Falta: o que é.' : palavras(rascunho.rbComo) < 2 ? 'Falta: como é.' : palavras(rascunho.rbFaz) < 2 ? 'Falta: o que faz.' : '';
    $('rbEnvia').disabled = !!falta; $('rbFalta').textContent = falta;
  }
  confere();
  $('rbEnvia').onclick = function () {
    var p = { id: FAB.uid('ped'), data: Date.now(), jogo: FAB.jogo().id, nomeJogo: FAB.jogo().nome, tipo: rascunho.tipo, nome: (rascunho.rbNome || '').trim(), como: rascunho.rbComo.trim(), faz: rascunho.rbFaz.trim(), estado: 'enviado' };
    FAB.E.pedidos.push(p); rascunho = { tipo: null }; FAB.mudou(); FAB.exporta();
    ui.abre('<div class="medalha">' + FAB.ico('t_robo', 90) + '<h2 style="justify-content:center;padding:0">Pedido guardado!</h2><p class="perg" style="font-size:20px">Agora avise o papai: tem pedido para o robô.</p>' +
      '<p class="mut" style="margin-bottom:14px">(Papai: o arquivo fabrica_mariana_….json foi para a pasta Downloads.)</p><button class="bt verde grande" onclick="FAB.ui.fecha()">Ok!</button></div>', function () { ui.vai('robo'); });
    FAB.fala('Pedido guardado! Agora avise o papai: tem pedido para o robô.');
  };
} };

/* ============================ MISSÕES ============================ */
FAB.T.missoes = { nome: 'Missões', ajuda: 'Escolha uma missão. Pode fazer na ordem que quiser.', monta: function (C) {
  var prox = FAB.proximaMissao(), h = '<div class="trilha">';
  FAB.MISSOES.forEach(function (m, i) {
    var feita = !!FAB.E.missoes[m.id], Cc = FAB.CONCEITOS[m.conceito] || {};
    h += '<button class="card ms' + (feita ? ' feita' : '') + (prox === m ? ' prox' : '') + '" data-m="' + i + '"><span class="num">' + (feita ? '★' : i + 1) + '</span><span><span class="fr">' + esc(m.frase) + '</span><br><span class="mut">' + esc(Cc.nome || '') + ' · ' + m.xp + ' XP</span></span></button>';
  });
  h += '</div><div class="tit" style="margin-top:24px">' + FAB.ico('t_ideia', 28) + 'Cartas do saber</div><div class="grade cartas">';
  Object.keys(FAB.CONCEITOS).forEach(function (k) {
    var c = FAB.CONCEITOS[k], tem = FAB.MISSOES.some(function (m) { return m.conceito === k && FAB.E.missoes[m.id]; });
    h += '<div class="card carta" style="' + (tem ? '' : 'opacity:.55') + '">' + FAB.ico(c.icone, 40) + '<b>' + esc(c.nome) + '</b><span>' + esc(c.frase) + '</span><small>' + esc(c.exemplo) + '</small></div>';
  });
  C.innerHTML = h + '</div>';
  C.querySelectorAll('[data-m]').forEach(function (b) {
    b.onclick = function () {
      var m = FAB.MISSOES[+b.dataset.m]; FAB.fala(m.frase);
      ui.abre('<h2>' + FAB.ico('t_missoes', 32) + 'Missão ' + (+b.dataset.m + 1) + '</h2><p class="perg">' + esc(m.frase) + '</p><button class="bt amarelo grande" id="msIr">Ir</button>');
      $('msIr').onclick = function () { ui.fecha(); if (m.abre) { abreModelo(m.abre); ui.nav(); } ui.vai(m.onde); };
    };
  });
} };

/* ============================ MOSTRAR (convidado) ============================ */
FAB.T.jogar = { nome: 'Mostrar', ajuda: 'Chame alguém para jogar o seu jogo.', monta: function (C) {
  var J = FAB.jogo(), I = J.ideia || {};
  C.innerHTML = '<div class="card" style="text-align:center;max-width:860px;margin:0 auto" id="jgCapa">' +
    '<div>' + FAB.ico('spr:' + FAB.skinDe('heroi'), 120) + '</div><h1 style="font-size:36px;font-weight:900">' + esc(J.nome) + '</h1>' +
    '<p class="mut">um jogo criado por ' + esc(FAB.E.criadora.nome) + (I.paraQuem ? ' · para ' + esc(I.paraQuem) : '') + '</p>' +
    (I.historia ? '<p style="font-size:19px;font-weight:800;margin:12px auto;max-width:640px">' + esc(I.historia) + '</p>' : '') +
    (I.objetivo ? '<p class="mut">Para ganhar: ' + esc(I.objetivo) + '</p>' : '') +
    '<div class="linha" style="justify-content:center;margin-top:16px"><button class="bt verde grande" id="jgPlay">' + FAB.ico('play', 30) + 'Jogar</button>' +
    (FAB.compartilhado ? '' : '<button class="bt" id="jgLink">' + FAB.ico('mais', 22) + 'Copiar link para mandar</button>') + '</div></div>' +
    '<div id="jgPalco" style="display:none">' + palcoHTML() + '<div class="linha" style="margin-top:10px"><button class="bt cinza" id="jgSai">Voltar para a capa</button><span class="mut">Setas andam · espaço pula</span></div></div>';
  ligaToques(C);
  $('jgPlay').onclick = function () { $('jgCapa').style.display = 'none'; $('jgPalco').style.display = 'block'; rodaJogo($('jgPalco'), true); };
  $('jgSai').onclick = function () { FAB.motor.para(); FAB.T.jogar.monta(C); };
  if ($('jgLink')) $('jgLink').onclick = function () {
    FAB.linkDoJogo(J).then(function (url) {
      try { navigator.clipboard.writeText(url); ui.toast('Link copiado! Cole no WhatsApp.', true); } catch (e) { ui.abre('<h2>Link do jogo</h2><textarea style="width:100%;height:140px">' + esc(url) + '</textarea>'); }
    }).catch(function () { ui.toast('Este navegador não faz link. Use o Chrome.', true); });
  };
} };

/* ---------------- link de compartilhar (o jogo vai dentro do link) ---------------- */
function b64url(buf) { var s = '', b = new Uint8Array(buf); for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function deb64url(t) { t = t.replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; var s = atob(t), b = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i); return b; }
FAB.linkDoJogo = function (J) {
  var p = { j: { nome: J.nome, ideia: J.ideia, skins: J.skins, nomes: J.nomes, fases: J.fases, ajustes: J.ajustes, regras: J.regras }, s: {}, c: FAB.E.criadora.nome };
  Object.keys(J.skins).forEach(function (k) { var id = J.skins[k]; if (FAB.E.sprites[id]) p.s[id] = FAB.E.sprites[id]; });
  var dados = new Blob([JSON.stringify(p)]).stream().pipeThrough(new CompressionStream('deflate-raw'));
  return new Response(dados).arrayBuffer().then(function (buf) { return location.href.split('#')[0] + '#jogo=' + b64url(buf); });
};
function abreCompartilhado(t) {
  var dados = new Blob([deb64url(t)]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return new Response(dados).text().then(function (txt) {
    var p = JSON.parse(txt);
    FAB.salva = function () {};                      /* quem recebe o link não mexe na Fábrica de ninguém */
    FAB.compartilhado = true;
    var J = p.j; J.id = 'visita'; J.versoes = []; J.testes = []; J.origem = 'link';
    FAB.E = { v: 1, criadora: { nome: p.c || 'Mariana' }, missoes: {}, jogos: [J], atual: 'visita', sprites: p.s || {}, perguntas: [], pedidos: [], diario: [], stats: { testes: 0, convidado: 0, lupa: 0 } };
    document.body.classList.add('visita');
  });
}

/* ============================ PARTIDA ============================ */
function parte() {
  ui.nav(); FAB.confereMissoes(); ui.topo();
  if (FAB.compartilhado) { $('nav').style.display = 'none'; $('topo').style.display = 'none'; $('app').style.gridTemplateColumns = '1fr'; $('app').style.gridTemplateRows = '1fr'; ui.vai('jogar'); return; }
  var t = 'painel'; try { t = localStorage.getItem('fab_tela') || 'painel'; } catch (e) {}
  if (t === 'testar' || t === 'jogar') t = 'painel';
  ui.vai(FAB.T[t] ? t : 'painel');
}
var m = /#jogo=([\w-]+)/.exec(location.hash);
if (m) abreCompartilhado(m[1]).then(parte).catch(function () { parte(); ui.toast('Esse link de jogo não abriu.'); });
else parte();
})();
