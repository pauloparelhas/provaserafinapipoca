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
var FALA_CARA = {   /* falado */ feliz: 'Ficou do jeito que eu queria', meio: 'Quase do jeito que eu queria', triste: 'Não ficou do jeito que eu queria' };
var MUDAR = ['o pulo', 'os inimigos', 'as moedas', 'o caminho', 'as regras', 'o desenho', 'nada, ficou ótimo'];
/* "Queria que tivesse…": 6 figuras, 1 toque cada (vai no .json para o papai e o robô) */
var DESEJOS = [['inimigos', 'Mais inimigos', 'spr:besouro'], ['pegar', 'Mais coisas para pegar', 'spr:estrela'], ['poder', 'Um poder', 'raio'],
               ['agua', 'Água para nadar', 'spr:agua'], ['montar', 'Um bicho para montar', 'spr:dino'], ['alto', 'Fases bem altas', 'spr:nuvem']];

function quando(t) {
  var d = new Date(t), L = FAB.lingua() === 'en' ? 'en-US' : 'pt-BR', h = d.toLocaleTimeString(L, { hour: '2-digit', minute: '2-digit' });
  var dia = function (x) { return new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime(); }, dif = Math.round((dia(new Date()) - dia(d)) / 864e5);
  return (dif === 0 ? FAB.tr('hoje') : dif === 1 ? FAB.tr('ontem') : d.toLocaleDateString(L)) + ' ' + h;   /* "hoje 16:40" lê melhor que a data */
}
function miniatura(cv, J) { try { FAB.desenhaMapa(cv, J.fases[0], 1, false); } catch (e) {} }
function comJogo(J, f) { var a = FAB.E.atual; FAB.E.atual = J.id; try { return f(); } finally { FAB.E.atual = a; } }

/* ============================ INÍCIO ============================ */
/* "você parou em…" falado: uma frase gravada por tela */
var FALA_PAROU = {   /* falado */
  pixel: 'Você parou no Desenhar.', fases: 'Você parou nas Fases.', regras: 'Você parou nas Regras.', testar: 'Você parou no Testar.',
  jogar: 'Você parou no Mostrar.', ideia: 'Você parou na Ideia.', diario: 'Você parou no Diário.', robo: 'Você parou no Robô.', missoes: 'Você parou nas Missões.'
};
/* Continuar de onde parei: mesma tela, mesmo jogo, mesma fase/aba/desenho (inclusive o Testar) */
FAB.continuar = function () {
  var o = FAB.E.onde;
  if (!o || !FAB.T[o.tela]) { var m = FAB.proximaMissao(); if (m && FAB.guia) FAB.guia.vaiMissao(m); else ui.vai('pixel'); return; }
  if (o.jogo && FAB.E.jogos.some(function (j) { return j.id === o.jogo; })) FAB.abreJogo(o.jogo);
  if (o.fase != null && FAB.faseEditor) FAB.faseEditor(Math.min(o.fase, FAB.jogo().fases.length - 1));
  if (o.aba && FAB.regrasAba) FAB.regrasAba(o.aba);
  if (o.papel && FAB.pixelPapel) FAB.pixelPapel(o.papel);
  ui.nav(); ui.vai(o.tela);
};
function pedidosProntos() {
  return (FAB.E.pedidos || []).filter(function (p) { return (p.estado === 'pronto' || (FAB.ENTREGAS && FAB.ENTREGAS[p.id])) && !p.visto; });
}
FAB.T.painel = { nome: 'Fábrica de Jogos', ajuda: 'Aqui você cria jogos. Aperte Continuar.', monta: function (C) {
  var J = FAB.jogo(), m = FAB.proximaMissao(), feitas = FAB.feitas(), tot = FAB.MISSOES.length, o = FAB.E.onde;
  var Jo = o && FAB.E.jogos.filter(function (j) { return j.id === o.jogo; })[0] || J;
  var temOnde = !!(o && FAB.T[o.tela]);
  var tm = FAB.guia ? FAB.guia.telaDa(m) : null;
  var detalhe = temOnde ? ['<span data-sem-traducao>' + esc(FAB.tr(Jo.nome)) + '</span>'] : [];
  if (temOnde && o.tela === 'fases' && o.fase != null) detalhe.unshift(FAB.trf('Fase {0}', [o.fase + 1]));
  if (temOnde) detalhe.push(quando(o.quando));
  var h = '<div class="card pn-volta">' +
      '<div class="pn-onde"><button class="falar" id="pnFalaOnde" title="Ouvir">' + FAB.ico('falar', 22) + '</button><div>' +
        (temOnde ? '<div class="pn-onde-tx">' + FAB.tr('Você parou em:') + ' <b>' + FAB.tr(FAB.NOME_TELA[o.tela]) + '</b></div><div class="mut">' + detalhe.join(' · ') + '</div>'
                 : '<div class="pn-onde-tx">Vamos começar? Aperte o botão amarelo.</div>') +
      '</div></div>' +
      '<div class="pn-cont-linha"><canvas class="pn-thumb pix" id="pnThumb"></canvas>' +
        '<button class="bt amarelo grande pn-continuar" id="pnCont">' + FAB.ico('play', 34) + '<span>' + (temOnde ? 'Continuar de onde parei' : 'Começar meu primeiro jogo') + '</span></button></div>' +
    '</div>' +
    '<div class="tit pn-tit">' + FAB.ico('bandeirinha', 26) + 'Seu caminho</div><div class="passos" id="pnPassos">' +
      FAB.PASSOS.map(function (p, i) {
        var feito = FAB.MISSOES.some(function (x) { return FAB.E.missoes[x.id] && (FAB.guia ? FAB.guia.telaDa(x) : x.onde) === p[0]; });
        var parou = temOnde && o.tela === p[0];
        return (i ? '<span class="passo-seta">' + FAB.ico('s_dir', 16) + '</span>' : '') +
          '<button class="passo' + (p[0] === tm ? ' missao' : '') + (parou ? ' parou' : '') + '" data-passo="' + p[0] + '">' +
          '<span class="pnum">' + (i + 1) + '</span>' + FAB.ico(p[2], 34) + '<b>' + p[1] + '</b>' +
          (feito ? '<span class="marca">' + FAB.ico('estrelinha', 20) + '</span>' : '') +
          (parou ? '<span class="marca band" title="Você parou aqui">' + FAB.ico('bandeirinha', 20) + '</span>' : '') + '</button>';
      }).join('') + '</div>' +
    '<div class="card pn-missao-mini">' + (m ?
        '<button class="falar" id="pnFala" title="Ouvir">' + FAB.ico('falar', 22) + '</button><div class="pn-mm"><b>' + FAB.trf('Missão {0} de {1}', [FAB.MISSOES.indexOf(m) + 1, tot]) + '</b><div class="fr">' + esc(m.frase) + '</div>' :
        '<div class="pn-mm"><div class="fr">Você fez todas as missões! Agora invente o que quiser.</div>') +
        '<div class="barra"><i style="width:' + Math.round(feitas / tot * 100) + '%"></i></div>' +
        '<p class="mut" style="margin-top:4px">' + FAB.trf('{0} missões feitas · {1} XP · {2}', [feitas, FAB.xp(), FAB.tr(FAB.nivel().nome)]) + '</p></div></div>';
  pedidosProntos().slice(0, 2).forEach(function (p) {
    var ent = FAB.ENTREGAS && FAB.ENTREGAS[p.id];
    h += '<div class="card pn-robo" data-ped="' + p.id + '">' + FAB.ico('t_robo', 52) + '<div class="pn-mm"><b>Você pediu, o robô fez!</b>' +
      '<div data-sem-traducao class="fr">' + esc(p.nome || p.como || '') + '</div>' + (ent ? '<div class="mut" data-sem-traducao>' + esc(ent) + '</div>' : '') + '</div>' +
      '<div class="linha"><button class="bt verde" data-verped="' + p.id + '">' + FAB.ico('t_robo', 22) + 'Ver no Robô</button><button class="bt cinza" data-okped="' + p.id + '">Oba!</button></div></div>';
  });
  h += '<div class="tit pn-tit">' + FAB.ico('t_jogar', 28) + 'Meus jogos</div><div class="grade jogos" id="pnJogos"></div>' +
    '<div class="linha" style="margin-top:12px"><button class="bt" id="pnGuardar">' + FAB.ico('foto', 24) + 'Guardar este jogo</button></div>';
  var G = FAB.guardados();
  if (G.length) {
    h += '<div class="tit pn-tit">' + FAB.ico('foto', 26) + 'Jogos guardados</div><div class="grade jogos" id="pnGuard">';
    G.slice(0, 12).forEach(function (g, k) {
      h += '<div class="card jg gd" data-g="' + k + '"><canvas class="pix"></canvas><b data-sem-traducao>' + esc(FAB.tr(g.v.nome)) + '</b><span class="mut"><span data-sem-traducao>' + esc(FAB.tr(g.jogo.nome)) + '</span> · ' + quando(g.v.data) + '</span>' +
        '<button class="bt cinza" data-abreg="' + k + '">' + FAB.ico('desfazer', 20) + 'Abrir</button></div>';
    });
    h += '</div>';
  }
  h += '<div class="pn-papai"><button class="link-papai" id="pnOpcoes">' + FAB.ico('engrenagem', 20) + 'Para o papai: Opções</button></div>';
  C.innerHTML = h;
  miniatura($('pnThumb'), Jo === J ? J : Jo);
  $('pnCont').onclick = function () { FAB.continuar(); };
  $('pnFalaOnde').onclick = function () { if (temOnde) FAB.fala([FALA_PAROU[o.tela] || 'Aperte Continuar.', 'Aperte Continuar.']); else FAB.fala('Vamos começar? Aperte o botão amarelo.'); };
  if ($('pnFala')) $('pnFala').onclick = function () { FAB.fala(m.frase); };
  $('pnPassos').querySelectorAll('[data-passo]').forEach(function (b) { b.onclick = function () { ui.vai(b.dataset.passo); }; });
  C.querySelectorAll('[data-verped]').forEach(function (b) { b.onclick = function () { var p = FAB.E.pedidos.filter(function (x) { return x.id === b.dataset.verped; })[0]; if (p) { p.visto = true; FAB.salva(); } ui.vai('robo'); }; });
  C.querySelectorAll('[data-okped]').forEach(function (b) { b.onclick = function () { var p = FAB.E.pedidos.filter(function (x) { return x.id === b.dataset.okped; })[0]; if (p) { p.visto = true; FAB.salva(); } FAB.fala('Oba!'); FAB.T.painel.monta(C); }; });
  if (pedidosProntos().length && !FAB.T.painel._robo) { FAB.T.painel._robo = true; FAB.fala('Você pediu, o robô fez!'); }
  var hj = '';
  FAB.E.jogos.forEach(function (j) {
    hj += '<div class="card jg' + (j.id === J.id ? ' on' : '') + '" data-j="' + j.id + '"><canvas class="pix"></canvas><b data-sem-traducao>' + esc(FAB.tr(j.nome)) + '</b><span class="mut">' + FAB.trf('{0} fase(s) · {1} regras', [j.fases.length, j.regras.length]) + '</span>' +
      (j.id !== J.id ? '<button class="ib" data-apaga="' + j.id + '" title="Apagar jogo" style="align-self:flex-end">' + FAB.ico('lixo', 20) + '</button>' : '') + '</div>';
  });
  hj += '<button class="card jg" id="pnNovo" style="align-items:center;justify-content:center;min-height:150px">' + FAB.ico('mais', 48) + '<b>Jogo novo</b></button>';
  $('pnJogos').innerHTML = hj;
  $('pnJogos').querySelectorAll('[data-j]').forEach(function (el) {
    var j = FAB.E.jogos.filter(function (x) { return x.id === el.dataset.j; })[0];
    comJogo(j, function () { miniatura(el.querySelector('canvas'), j); });
    el.onclick = function (ev) {
      if (ev.target.closest('[data-apaga]')) {
        ui.abre('<h2>' + FAB.tr('Apagar o jogo') + ' "<span data-sem-traducao>' + esc(FAB.tr(j.nome)) + '</span>"?</h2><p class="mut" style="margin-bottom:14px">Não dá para desfazer.</p><div class="linha"><button class="bt rosa" id="apSim">Apagar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
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
  $('pnGuardar').onclick = function () { abreGuardar(C); };
  if ($('pnGuard')) $('pnGuard').querySelectorAll('[data-g]').forEach(function (el) {
    var g = G[+el.dataset.g];
    try { FAB.desenhaMapa(el.querySelector('canvas'), g.v.snap.fases[0], 1, false); } catch (e) {}
    el.querySelector('[data-abreg]').onclick = function () {
      ui.abre('<h2>' + FAB.ico('foto', 30) + FAB.tr('Abrir o jogo guardado') + ' "<span data-sem-traducao>' + esc(FAB.tr(g.v.nome)) + '</span>"?</h2><p class="mut" style="margin-bottom:14px">Antes, eu tiro uma foto do jogo de agora. Nada se perde.</p>' +
        '<div class="linha"><button class="bt verde grande" id="gdAbre">' + FAB.ico('desfazer', 26) + 'Abrir</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
      $('gdAbre').onclick = function () {
        FAB.abreJogo(g.jogo.id); var i = g.jogo.versoes.indexOf(g.v); if (i >= 0) FAB.voltaFoto(i);
        FAB.limpaCache(); ui.fecha(); ui.nav(); ui.vai('painel'); ui.toast('Pronto! O jogo voltou.', true);
      };
    };
  });
  $('pnOpcoes').onclick = function () { ui.vai('jeito'); setTimeout(function () { var a = $('jtPapai'); if (a) a.scrollIntoView({ block: 'start' }); }, 80); };
} };
/* "Guardar este jogo": uma foto com o nome que ela escolhe */
function abreGuardar(C) {
  var J = FAB.jogo();
  ui.abre('<h2><button class="falar" id="gdFala">' + FAB.ico('falar', 22) + '</button>' + FAB.ico('foto', 30) + 'Guardar este jogo</h2>' +
    '<p class="mut" style="margin-bottom:10px">Dê um nome para lembrar depois.</p>' + ui.campo('gdNome', 'Nome do jogo guardado') +
    '<div class="linha" style="margin-top:14px"><button class="bt verde grande" id="gdOk">' + FAB.ico('foto', 28) + 'Guardar</button><button class="bt" onclick="FAB.ui.fecha()">Agora não</button></div>');
  ui.ligaMic($('mbox'));
  $('gdNome').value = FAB.tr(J.nome);
  $('gdFala').onclick = function () { FAB.fala('Dê um nome para lembrar depois.'); };
  $('gdOk').onclick = function () {
    FAB.guardaJogo($('gdNome').value); FAB.motor.toca('magia'); ui.fecha();
    ui.toast('Jogo guardado!', true); if (C) FAB.T.painel.monta(C);
  };
}
FAB.abreGuardar = abreGuardar;

/* ============================ IDEIA ============================ */
function chips(id, ops, val) { return '<div class="escolhas" id="' + id + '">' + ops.map(function (o) { return '<button class="esc' + (val === o ? ' on' : '') + '" data-v="' + esc(o) + '">' + esc(o) + '</button>'; }).join('') + '</div>'; }
FAB.T.ideia = { nome: 'Ideia', ajuda: 'Conte como é o seu jogo antes de construir.', monta: function (C) {
  var J = FAB.jogo(), I = J.ideia = J.ideia || {};
  C.innerHTML = '<div class="grade" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">' +
    '<div class="card"><div class="tit">' + FAB.ico('t_ideia', 28) + 'Nome do jogo</div>' + ui.campo('idNome', 'Nome do jogo') + '</div>' +
    '<div class="card"><div class="tit">' + FAB.ico('spr:' + FAB.skinDe('heroi'), 34) + FAB.tr('Herói:') + ' <span data-sem-traducao>' + esc(FAB.tr(FAB.nomeTipo('heroi') === 'heroi' ? FAB.spr(FAB.skinDe('heroi')).nome : ((J.nomes || {}).heroi || FAB.spr(FAB.skinDe('heroi')).nome))) + '</span></div><button class="bt" onclick="FAB.pixelPapel(\'heroi\');FAB.ui.vai(\'pixel\')">' + FAB.ico('t_pixel', 22) + 'Desenhar o herói</button></div>' +
    '<div class="card"><div class="tit">' + FAB.ico('trofeu', 28) + 'Como ganha?</div>' + chips('idObj', ['chegar na bandeira', 'pegar as estrelas', 'fugir dos inimigos', 'acertar as perguntas'], I.objetivo) + '</div>' +
    '<div class="card"><div class="tit">' + FAB.ico('t_jogar', 28) + 'Para quem?</div>' + chips('idQuem', ['papai', 'mamãe', 'amigas', 'eu mesma', 'todo mundo'], I.paraQuem) + '</div>' +
    '<div class="card" style="grid-column:1/-1"><div class="tit">' + FAB.ico('t_diario', 28) + 'A história do jogo</div>' + ui.campo('idHist', 'Era uma vez…', true) + '<p class="mut" style="margin-top:6px">Aparece na capa quando alguém for jogar.</p></div>' +
  '</div>';
  ui.ligaMic(C);
  $('idNome').value = FAB.tr(J.nome); $('idHist').value = I.historia || '';
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
    '<div class="perg" data-sem-traducao>' + esc(q.p) + '</div><div class="alts">' +
    ord.map(function (i, k) { return '<button class="alt" data-i="' + i + '"><kbd>' + (k + 1) + '</kbd><span data-sem-traducao>' + esc(q.o[i]) + '</span></button>'; }).join('') + '</div>' +
    '<div class="expl" id="pqEx"></div><div style="margin-top:12px;display:none" id="pqSeg"><button class="bt verde grande" id="pqOk">Continuar o jogo</button></div>';
  ui.abre(h); ui._preso = true; var fx = document.querySelector('#mbox .fecha'); if (fx) fx.remove();
  function fala() { var L = [q.p]; ord.forEach(function (i, k) { L.push(FAB.NUMEROS_FALA[k], q.o[i]); }); FAB.fala(L); }
  $('pqFala').onclick = fala; fala();
  function escolhe(i) {
    if (feito) return; feito = true;
    var certo = i === (q.c || 0);
    document.querySelectorAll('#mbox .alt').forEach(function (b) { var bi = +b.dataset.i; if (bi === (q.c || 0)) b.classList.add('certa'); else if (bi === i) b.classList.add('errada'); });
    var ex = $('pqEx'); ex.style.display = 'block';
    ex.innerHTML = (certo ? '<b style="color:#8ff0a4">Acertou!</b> ' : '<b style="color:#ffb3b9">' + FAB.tr('A certa é:') + ' <span data-sem-traducao>' + esc(q.o[q.c || 0]) + '</span>.</b> ') + '<span data-sem-traducao>' + esc(q.ex || '') + '</span>';   /* a pergunta da prova fica na língua da prova */
    FAB.fala(certo ? ['Acertou!', q.ex || ''] : ['A certa é:', q.o[q.c || 0], q.ex || '']);
    $('pqSeg').style.display = 'block';
    $('pqOk').onclick = function () { document.removeEventListener('keydown', tecla); ui._preso = false; ui.fecha(); responde(certo); };
  }
  function tecla(ev) { var n = +ev.key; if (n >= 1 && n <= ord.length) escolhe(ord[n - 1]); else if (feito && ev.key === 'Enter') $('pqOk').click(); }
  document.addEventListener('keydown', tecla);
  document.querySelectorAll('#mbox .alt').forEach(function (b) { b.onclick = function () { escolhe(+b.dataset.i); }; });
}

FAB.abrePergunta = abrePergunta;   /* o portão do inglês abre a janela da Placa ? sem jogar */

/* ============================ TESTAR ============================ */
var lupaOn = false, dicaN = 0;
var DICAS_QUEBRADO = [   /* falado */
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
      '<p class="mut">' + FAB.trf('{0} regras acordaram. Ficou do jeito que você queria?', [acordaram]) + '</p><div class="caras">' +
      ['feliz', 'meio', 'triste'].map(function (k) { return '<button class="cara" data-c="' + k + '" title="' + FALA_CARA[k] + '">' + FAB.ico('cara_' + k, 56) + '</button>'; }).join('') + '</div><div id="tsMudar"></div>' +
      '<div class="desejos"><p class="mut"><button class="falar mini" id="tsDesFala" title="Ouvir">' + FAB.ico('falar', 18) + '</button>Queria que tivesse…</p><div class="dsj" id="tsDesejos">' +
      DESEJOS.map(function (d) { return '<button class="dsj-b" data-d="' + d[0] + '" title="' + d[1] + '">' + FAB.ico(d[2], 34) + '<span>' + d[1] + '</span></button>'; }).join('') + '</div></div>') +
    '<div class="linha" style="justify-content:center;margin-top:10px"><button class="bt verde grande" id="tsDeNovo">' + FAB.ico('play', 28) + 'De novo</button>' +
    (convidado ? '' : '<button class="bt" id="tsRegras">' + FAB.ico('t_regras', 22) + 'Regras</button><button class="bt" id="tsFases">' + FAB.ico('t_fases', 22) + 'Fases</button>') + '</div></div>';
  sobre.classList.add('on');
  FAB.fala([R.venceu ? 'Ganhou!' : 'Fim do teste.', R.pontos === 1 ? 'Um ponto.' : R.pontos + ' pontos.']);
  $('tsDeNovo').onclick = function () { rodaJogo(C, convidado); };
  if ($('tsDesejos')) {
    $('tsDesFala').onclick = function () { FAB.fala('Queria que tivesse… Toque numa figura.'); };
    $('tsDesejos').querySelectorAll('[data-d]').forEach(function (b) {
      b.onclick = function () { if (b.classList.contains('on')) return; b.classList.add('on'); FAB.desejo(b.dataset.d); FAB.fala('Anotado! O papai vai ver.'); };
    });
  }
  if ($('tsRegras')) { $('tsRegras').onclick = function () { ui.vai('regras'); }; $('tsFases').onclick = function () { ui.vai('fases'); }; }
  sobre.querySelectorAll('.cara').forEach(function (b) {
    b.onclick = function () {
      sobre.querySelectorAll('.cara').forEach(function (x) { x.classList.toggle('on', x === b); });
      var ent = { id: FAB.uid('d'), data: Date.now(), jogo: J.id, nomeJogo: J.nome, cara: b.dataset.c, pontos: R.pontos, venceu: R.venceu, segundos: R.segundos, vidasPerdidas: R.vidasPerdidas };
      FAB.E.diario.push(ent); FAB.fala(FALA_CARA[b.dataset.c] + '. O que você vai mudar?');
      $('tsMudar').innerHTML = '<p class="mut" style="margin:6px 0">O que você vai mudar?</p>' + chips('tsMudarC', MUDAR, null);
      $('tsMudarC').querySelectorAll('.esc').forEach(function (c) { c.onclick = function () { ent.mudar = c.dataset.v; FAB.mudou(); $('tsMudar').innerHTML = '<p class="mut">' + FAB.trf('Anotado no diário: mudar {0}.', [esc(FAB.tr(c.dataset.v))]) + '</p>'; }; });
      FAB.salva();   /* a medalha do diário espera ela responder o que vai mudar */
    };
  });
}
function palcoHTML() {
  return '<div class="ts-area"><div class="palco"><canvas class="pix"></canvas><div class="hud"></div>' +
    '<div class="toques"><div class="gp"><button data-k="esq">◀</button><button data-k="dir">▶</button></div><div class="gp"><button data-k="X">X</button><button data-k="C">C</button><button data-k="V">V</button><button data-k="pulo">▲</button></div></div>' +
    '<div class="sobre"></div></div></div>';
}
/* o palco cresce até onde dá, sem entortar: proporção entre 1,05 e 2,18 (a câmera do motor acompanha) */
function encaixaPalco(area) {
  var pc = area.querySelector('.palco'), W = area.clientWidth, H = area.clientHeight; if (!W || !H) return;
  var asp = Math.max(1.05, Math.min(2.18, W / H)), w = W, h = W / asp; if (h > H) { h = H; w = H * asp; }
  pc.style.width = (w / W * 100) + '%'; pc.style.height = (h / H * 100) + '%';
}
function vigiaPalco(C) {
  var area = C.querySelector('.ts-area'); if (!area) return;
  encaixaPalco(area);
  if (window.ResizeObserver) new ResizeObserver(function () { encaixaPalco(area); }).observe(area);
}
function ligaToques(C) {
  C.querySelectorAll('.toques button').forEach(function (b) {
    var k = b.dataset.k;
    b.onpointerdown = function (e) { e.preventDefault(); FAB.motor.tecla(k, true); };
    b.onpointerup = b.onpointerleave = b.onpointercancel = function () { FAB.motor.tecla(k, false); };
  });
}
FAB.T.testar = { nome: 'Testar', ajuda: 'Jogue o seu jogo. Setas andam, espaço pula.', monta: function (C) {
  var J = FAB.jogo(), gr = ui.ehImersivo();
  C.innerHTML = '<div class="ts-wrap' + (lupaOn ? ' log-on' : '') + '" id="tsWrap">' + palcoHTML() +
    '<div class="ts-barra"><button class="bt verde" id="tsRec">' + FAB.ico('volta', 22) + '<span>Recomeçar</span></button>' +
    '<button class="bt' + (lupaOn ? ' amarelo' : '') + '" id="tsLupa">' + FAB.ico('lupa', 22) + '<span>Lupa de bichinhos</span></button>' +
    '<button class="bt cinza" id="tsPara">' + FAB.ico('errado', 22) + '<span>Parar</span></button>' +
    (J.origem === 'quebrado' ? '<button class="bt rosa" id="tsDica">' + FAB.ico('lupa', 22) + '<span>Dica do detetive</span></button>' : '') +
    '<span class="mut ts-teclas">Setas andam · espaço pula · X, C e V são teclas de regra</span>' +
    '<button class="bt cinza" id="tsGrande" title="Esconder ou mostrar os menus">' + FAB.ico(gr ? 's_baixo' : 'telacheia', 22) + '<span>' + (gr ? 'Mostrar menus' : 'Tela grande') + '</span></button>' +
    '<button class="bt cinza" id="tsCheia" title="Tela cheia de verdade">' + FAB.ico('telacheia', 22) + '</button></div>' +
    '<aside class="log" id="tsLog"></aside>' +
    '<button class="aba-log" id="tsAbaLog" title="Regras que acordaram">' + FAB.ico('s_esq', 18) + '<span>Regras</span></button></div>';
  ligaToques(C); vigiaPalco(C);
  $('tsRec').onclick = function () { rodaJogo(C, false); };
  $('tsPara').onclick = function () { FAB.motor.termina(); };
  $('tsLupa').onclick = function () {
    lupaOn = !lupaOn; FAB.motor.lupa(lupaOn); $('tsWrap').classList.toggle('log-on', lupaOn); this.classList.toggle('amarelo', lupaOn);
    if (lupaOn) { FAB.E.stats.lupa++; FAB.salva(); FAB.fala('Lupa ligada. Veja as caixas e as regras que acordam.'); }
  };
  $('tsAbaLog').onclick = function () { $('tsWrap').classList.toggle('log-on'); };
  $('tsGrande').onclick = function () { ui.imersivo(!ui.ehImersivo()); var g = ui.ehImersivo(); this.innerHTML = FAB.ico(g ? 's_baixo' : 'telacheia', 22) + '<span>' + (g ? 'Mostrar menus' : 'Tela grande') + '</span>'; };
  $('tsCheia').onclick = telaCheia;
  if ($('tsDica')) $('tsDica').onclick = function () { var d = DICAS_QUEBRADO[dicaN++ % 3]; ui.toast(d, true); };
  rodaJogo(C, false);
} };
function telaCheia() {
  try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (e) {}
}

/* ============================ DIÁRIO ============================ */
FAB.T.diario = { nome: 'Diário', ajuda: 'Veja como foram os testes e tire fotos do jogo.', monta: function (C) {
  var J = FAB.jogo();
  var h = '<div class="linha" style="margin-bottom:14px"><button class="bt verde" id="dgFoto">' + FAB.ico('foto', 24) + 'Tirar foto do jogo</button><span class="mut">A foto guarda o jogo como está agora. Dá para voltar depois.</span></div>';
  if (J.versoes.length) {
    h += '<div class="tit">' + FAB.ico('foto', 26) + 'Fotos do jogo</div><div class="grade fotos" style="margin-bottom:20px">';
    J.versoes.forEach(function (v, i) { h += '<div class="card jg"><canvas class="pix" data-v="' + i + '"></canvas><b>' + esc(FAB.tr(v.nome)) + '</b><span class="mut">' + quando(v.data) + '</span><button class="bt cinza" data-volta="' + i + '">Voltar para esta</button></div>'; });
    h += '</div>';
  }
  var ents = (FAB.E.diario || []).filter(function (d) { return d.jogo === J.id; }).reverse();
  h += '<div class="tit">' + FAB.ico('t_diario', 26) + 'Meus testes</div><div class="diario">';
  if (!ents.length) h += '<div class="card mut">Ainda vazio. Teste o jogo e escolha uma carinha no fim.</div>';
  ents.forEach(function (d) {
    h += '<div class="card dia">' + FAB.ico('cara_' + (d.cara || 'meio'), 44) + '<div class="q"><b>' + esc(FALA_CARA[d.cara] || '') + '</b>' +
      '<div class="mut">' + FAB.tr(d.venceu ? 'ganhou' : 'não chegou no fim') + ' · ' + FAB.trf('{0} pontos', [d.pontos]) + ' · ' + d.segundos + 's · ' + FAB.trf('{0} vidas perdidas', [d.vidasPerdidas]) + (d.mudar ? ' · ' + FAB.tr('vou mudar:') + ' ' + esc(FAB.tr(d.mudar)) : '') + '</div><time>' + quando(d.data) + '</time></div></div>';
  });
  C.innerHTML = h + '</div>';
  C.querySelectorAll('canvas[data-v]').forEach(function (cv) { var v = J.versoes[+cv.dataset.v]; FAB.desenhaMapa(cv, v.snap.fases[0], 1, false); });
  $('dgFoto').onclick = function () { FAB.tiraFoto('Foto ' + (J.versoes.length + 1)); FAB.motor.toca('magia'); ui.toast('Foto tirada!', true); FAB.T.diario.monta(C); };
  C.querySelectorAll('[data-volta]').forEach(function (b) {
    b.onclick = function () {
      ui.abre('<h2>' + FAB.trf('Voltar o jogo para a {0}?', [esc(FAB.tr(J.versoes[+b.dataset.volta].nome))]) + '</h2><p class="mut" style="margin-bottom:14px">Antes, eu tiro uma foto do jogo de agora. Nada se perde.</p><div class="linha"><button class="bt verde" id="vtSim">Voltar</button><button class="bt" onclick="FAB.ui.fecha()">Não</button></div>');
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
        '<div><b data-sem-traducao>' + esc(p.nome || FAB.tr((TIPOS_PED.filter(function (t) { return t[0] === p.tipo; })[0] || [0, p.tipo])[1])) + '</b><div class="mut" data-sem-traducao>' + esc(p.como) + ' · ' + esc(p.faz) + '</div>' + (pronto ? '<div style="color:#8ff0a4;font-weight:800">' + FAB.tr('Robô:') + ' <span data-sem-traducao>' + esc(pronto) + '</span></div>' : '') + '</div>' +
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
FAB.T.missoes = { nome: 'Missões', ajuda: 'Faça a missão de agora. As outras esperam.', monta: function (C) {
  var prox = FAB.proximaMissao(), resto = FAB.MISSOES.filter(function (m) { return !FAB.E.missoes[m.id] && m !== prox; });
  function card(m, cls) {
    var i = FAB.MISSOES.indexOf(m), Cc = FAB.CONCEITOS[m.conceito] || {}, feita = !!FAB.E.missoes[m.id];
    return '<button class="card ms' + (feita ? ' feita' : '') + (cls ? ' ' + cls : '') + '" data-m="' + i + '"><span class="num">' + (feita ? FAB.ico('estrelinha', 24) : i + 1) + '</span><span><span class="fr">' + esc(m.frase) + '</span><br><span class="mut">' + esc(FAB.tr(Cc.nome || '')) + ' · ' + m.xp + ' XP</span></span></button>';
  }
  var h = '';
  if (prox) {
    var c = FAB.guia ? FAB.guia.progresso(prox) : null;
    h += '<div class="ms-agora-wrap"><div><div class="tit">' + FAB.ico('t_missoes', 28) + 'Agora</div>' +
      '<div class="card ms-agora" data-m="' + FAB.MISSOES.indexOf(prox) + '"><div class="linha"><button class="falar" id="msFala" title="Ouvir">' + FAB.ico('falar', 22) + '</button><b>' + FAB.trf('Missão {0} de {1}', [FAB.MISSOES.indexOf(prox) + 1, FAB.MISSOES.length]) + '</b></div>' +
      '<p class="fr">' + esc(prox.frase) + '</p>' + (c ? '<p class="tr-cont">' + FAB.trf('{0} de {1}', [c[0], c[1]]) + '</p>' : '') +
      '<button class="bt verde grande" id="msAgora">' + FAB.ico('play', 28) + 'Ir</button></div></div>' +
      '<div><div class="tit">' + FAB.ico('relogio', 26) + 'Depois</div><div class="ms-depois">' + resto.slice(0, 2).map(function (m) { return card(m, 'peq'); }).join('') + '</div></div></div>';
  } else h += '<div class="card"><div class="fr">Você fez todas as missões! Agora invente o que quiser.</div></div>';
  h += '<details class="ms-todas"><summary>' + FAB.ico('s_baixo', 20) + 'Ver todas as missões</summary><div class="trilha">' + FAB.MISSOES.map(function (m) { return card(m, prox === m ? 'prox' : ''); }).join('') + '</div>' +
    '<div class="tit" style="margin-top:24px">' + FAB.ico('t_ideia', 28) + 'Cartas do saber</div><div class="grade cartas">';
  Object.keys(FAB.CONCEITOS).forEach(function (k) {
    var cc = FAB.CONCEITOS[k], tem = FAB.MISSOES.some(function (m) { return m.conceito === k && FAB.E.missoes[m.id]; });
    h += '<div class="card carta" style="' + (tem ? '' : 'opacity:.55') + '">' + FAB.ico(cc.icone, 40) + '<b>' + esc(cc.nome) + '</b><span>' + esc(cc.frase) + '</span><small>' + esc(cc.exemplo) + '</small></div>';
  });
  C.innerHTML = h + '</div></details>';
  if (prox) {
    $('msFala').onclick = function (ev) { ev.stopPropagation(); FAB.fala(prox.frase); };
    $('msAgora').onclick = function (ev) { ev.stopPropagation(); FAB.fala(prox.frase); FAB.guia.vaiMissao(prox); };
  }
  C.querySelectorAll('button[data-m]').forEach(function (b) {
    b.onclick = function () {
      var m = FAB.MISSOES[+b.dataset.m]; FAB.fala(m.frase);
      ui.abre('<h2>' + FAB.ico('t_missoes', 32) + FAB.trf('Missão {0}', [+b.dataset.m + 1]) + '</h2><p class="perg">' + esc(m.frase) + '</p><button class="bt verde grande" id="msIr">' + FAB.ico('play', 28) + 'Ir</button>');
      $('msIr').onclick = function () { ui.fecha(); FAB.guia.vaiMissao(m); };
    };
  });
} };

/* ============================ MOSTRAR (convidado) ============================ */
FAB.T.jogar = { nome: 'Mostrar', ajuda: 'Chame alguém para jogar o seu jogo.', monta: function (C) {
  var J = FAB.jogo(), I = J.ideia || {};
  C.innerHTML = '<div class="card" style="text-align:center;max-width:860px;margin:0 auto" id="jgCapa">' +
    '<div>' + FAB.ico('spr:' + FAB.skinDe('heroi'), 120) + '</div><h1 style="font-size:36px;font-weight:900" data-sem-traducao>' + esc(FAB.tr(J.nome)) + '</h1>' +
    (FAB.compartilhado ? '<p class="mut">Jogo feito na Fábrica de Jogos por outra pessoa.</p>' : '<p class="mut">' + FAB.tr('um jogo criado por') + ' <span data-sem-traducao>' + esc(FAB.E.criadora.nome) + '</span>' + (I.paraQuem ? ' · ' + FAB.tr('para') + ' ' + esc(FAB.tr(I.paraQuem)) : '') + '</p>') +
    (I.historia ? '<p style="font-size:19px;font-weight:800;margin:12px auto;max-width:640px" data-sem-traducao>' + esc(I.historia) + '</p>' : '') +
    (I.objetivo ? '<p class="mut">' + FAB.tr('Para ganhar:') + ' ' + esc(FAB.tr(I.objetivo)) + '</p>' : '') +
    '<div class="linha" style="justify-content:center;margin-top:16px"><button class="bt verde grande" id="jgPlay">' + FAB.ico('play', 30) + 'Jogar</button>' +
    (FAB.compartilhado ? '' : '<button class="bt" id="jgLink">' + FAB.ico('mais', 22) + 'Copiar link para mandar</button>') + '</div></div>' +
    '<div id="jgPalco" class="ts-wrap" style="display:none">' + palcoHTML() + '<div class="ts-barra"><button class="bt cinza" id="jgSai">Voltar para a capa</button><span class="mut ts-teclas">Setas andam · espaço pula</span>' +
    '<button class="bt cinza" id="jgCheia" title="Tela cheia">' + FAB.ico('telacheia', 22) + '</button></div></div>';
  ligaToques(C);
  $('jgCheia').onclick = telaCheia;
  $('jgPlay').onclick = function () { $('jgCapa').style.display = 'none'; $('jgPalco').style.display = 'flex'; vigiaPalco($('jgPalco')); rodaJogo($('jgPalco'), true); };
  $('jgSai').onclick = function () { FAB.motor.para(); FAB.T.jogar.monta(C); };
  if ($('jgLink')) $('jgLink').onclick = function () {
    FAB.linkDoJogo(J).then(function (url) {
      try { navigator.clipboard.writeText(url); ui.toast('Link copiado! Ele leva o nome e a história do jogo.', true); } catch (e) { ui.abre('<h2>Link do jogo</h2><textarea style="width:100%;height:140px">' + esc(url) + '</textarea>'); }
    }).catch(function () { ui.toast('Este navegador não faz link. Use o Chrome.', true); });
  };
} };

/* ---------------- link de compartilhar (o jogo vai dentro do link) ---------------- */
function b64url(buf) { var s = '', b = new Uint8Array(buf); for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function deb64url(t) { t = t.replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; var s = atob(t), b = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i); return b; }
FAB.linkDoJogo = function (J) {
  var I = J.ideia || {};
  var p = { j: { nome: J.nome, ideia: { objetivo: I.objetivo, historia: I.historia }, skins: J.skins, nomes: J.nomes, fases: J.fases, ajustes: J.ajustes, regras: J.regras }, s: {} };   /* sem nome da criança nem 'para quem' (guardião) */
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
    var J = p.j; J.id = 'visita';
    J.nome = String(J.nome || 'Jogo').slice(0, 40); J.ideia = { objetivo: String((J.ideia || {}).objetivo || '').slice(0, 40), historia: String((J.ideia || {}).historia || '').slice(0, 200) }; J.nomes = {};
    if (!Array.isArray(J.fases) || !Array.isArray(J.regras)) throw new Error('link inválido'); J.versoes = []; J.testes = []; J.origem = 'link';
    var pr = FAB.prefsPadrao(); pr.navFechada = pr.topoFechado = true; pr.ajuda = false;
    FAB.E = { v: 1, criadora: { nome: '' }, missoes: {}, jogos: [J], atual: 'visita', sprites: p.s || {}, perguntas: [], pedidos: [], diario: [], stats: { testes: 0, convidado: 0, lupa: 0 }, prefs: pr };
    document.body.classList.add('visita');
  });
}

/* ============================ PARTIDA ============================ */
function parte() {
  FAB.ligaIdioma();
  ui.nav(); FAB.confereMissoes(); ui.topo();
  if (FAB.compartilhado) { $('nav').style.display = 'none'; $('topo').style.display = 'none'; $('app').style.gridTemplateColumns = '1fr'; $('app').style.gridTemplateRows = '1fr'; ui.vai('jogar'); return; }
  /* nuvem da família: trouxe trabalho de outro computador? / olha se tem coisa mais nova */
  try { if (localStorage.getItem('fab_veio_da_nuvem')) { localStorage.removeItem('fab_veio_da_nuvem'); setTimeout(function () { ui.toast('Trouxe o trabalho da nuvem da família.'); }, 600); } } catch (e) {}
  if (FAB.nuvem) FAB.nuvem.puxa();
  /* abrir a Fábrica = Início ("Você parou em…" + Continuar). Recarregar (trocar idioma, nuvem) volta à mesma tela */
  var t = 'painel', recarga = false;
  try { recarga = performance.getEntriesByType('navigation')[0].type === 'reload'; } catch (e) {}
  if (recarga) { try { t = localStorage.getItem('fab_tela') || 'painel'; } catch (e) {} }
  if (t === 'testar' || t === 'jogar') t = 'painel';
  ui.vai(FAB.T[t] ? t : 'painel');
}
var m = /#jogo=([\w-]+)/.exec(location.hash);
if (m) abreCompartilhado(m[1]).then(parte).catch(function () { parte(); ui.toast('Esse link de jogo não abriu.'); });
else parte();
})();
