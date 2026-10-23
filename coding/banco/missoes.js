/* ============================================================
   missoes.js — a TRILHA de missões + as cartas do saber

   Missão = UMA frase, no imperativo, falando com ela. Nada trava:
   a trilha só SUGERE a próxima; ela pode fazer qualquer uma.
   `confere(E, J)` olha o estado e devolve true quando cumpriu.
     E = estado geral (criadora, sprites, perguntas, pedidos, stats)
     J = o jogo aberto (fases, regras, skins, versoes, ultimoTeste)
   ultimoTeste (gravado pelo motor ao fim de cada teste):
     { pontos, pulos, venceu, faseMax, certas, erradas, minhas,
       portas, disparos:{idRegra:n}, convidado:bool, origem }

   Revisada pelo agente pedagógico em 23/10/2026 (18 missões, nomes
   de criança, um conceito por missão). Missão nova entra no FIM.
   ============================================================ */
window.FAB = window.FAB || {};

(function () {
  function pecas(J, letra) {
    var n = 0;
    (J.fases || []).forEach(function (f) { f.mapa.forEach(function (l) { for (var i = 0; i < l.length; i++) if (l[i] === letra) n++; }); });
    return n;
  }
  function regras(J, f) { return (J.regras || []).filter(function (r) { return r.liga !== false && f(r); }); }
  function temAcao(r, t, f) { return (r.faca || []).some(function (a) { return a.t === t && (!f || f(a)); }); }
  function disparou(J, r, n) { var T = J.ultimoTeste; return !!(T && T.disparos && (T.disparos[r.id] || 0) >= (n || 1)); }
  function T(J) { return J.ultimoTeste || {}; }
  function meu(id) { return /^meu_/.test(id || ''); }
  FAB.util = { pecas: pecas, regras: regras, temAcao: temAcao, disparou: disparou };

  FAB.MISSOES = [
    { id: 'heroi', conceito: 'pixel', xp: 10,
      frase: 'Deixe o herói do seu jeito: troque uma cor dele.',
      onde: 'pixel',
      confere: function (E, J) { return meu(J.skins && J.skins.heroi); } },

    { id: 'pular', conceito: 'teste', xp: 10,
      frase: 'Aperte o botão verde e faça o herói pular.',
      onde: 'testar',
      confere: function (E, J) { return (T(J).pulos || 0) >= 1; } },

    { id: 'moedas', conceito: 'fase', xp: 10,
      frase: 'Espalhe moedas pela fase até ter 15.',
      onde: 'fases',
      confere: function (E, J) { return pecas(J, 'o') >= 15; } },

    { id: 'som', conceito: 'evento', xp: 10,
      frase: 'Troque o som que toca quando pega a moeda. Depois teste.',
      onde: 'regras',
      confere: function (E, J) {
        return regras(J, function (r) { return r.quando.t === 'toca' && r.quando.obj === 'moeda' && temAcao(r, 'som', function (a) { return a.v !== 'moeda'; }); })
          .some(function (r) { return disparou(J, r); });
      } },

    { id: 'pontos', conceito: 'variavel', xp: 10,
      frase: 'Faça cada moeda valer 5 pontos e faça 20 pontos jogando.',
      onde: 'regras',
      confere: function (E, J) {
        return regras(J, function (r) { return r.quando.t === 'toca' && r.quando.obj === 'moeda' && temAcao(r, 'ponto', function (a) { return a.n >= 5; }); }).length > 0
          && (T(J).pontos || 0) >= 20;
      } },

    { id: 'diario', conceito: 'teste', xp: 10,
      frase: 'Conte no diário como foi o seu teste.',
      onde: 'diario',
      confere: function (E) { return (E.diario || []).some(function (d) { return d.cara; }); } },

    { id: 'inimigo', conceito: 'pixel', xp: 15,
      frase: 'Desenhe o seu próprio inimigo e ponha ele na fase.',
      onde: 'pixel',
      confere: function (E, J) {
        var sk = J.skins || {};
        return ['gosma', 'besouro', 'abelha', 'fantasma', 'sapo'].some(function (t) { return meu(sk[t]) && pecas(J, FAB.TIPOS[t].letra) > 0; });
      } },

    { id: 'tecla', conceito: 'evento', xp: 15,
      frase: 'Crie uma regra: quando apertar X, dar um super pulo.',
      onde: 'regras',
      confere: function (E, J) {
        return regras(J, function (r) { return r.quando.t === 'tecla' && temAcao(r, 'pulo'); }).some(function (r) { return disparou(J, r); });
      } },

    { id: 'bug1', conceito: 'bug', xp: 20, abre: 'quebrado',
      frase: 'Abra o jogo quebrado e faça a moeda dar ponto.',
      onde: 'regras',
      confere: function (E) {
        return (E.jogos || []).some(function (J) {
          return J.origem === 'quebrado' && (J.ultimoTeste || {}).pontos >= 1 && (J.ultimoTeste || {}).moedas >= 1;
        });
      } },

    { id: 'bug2', conceito: 'depuracao', xp: 25, abre: 'quebrado',
      frase: 'Ache os outros bichinhos do jogo quebrado e chegue na bandeira.',
      onde: 'testar',
      confere: function (E) {
        return (E.jogos || []).some(function (J) { return J.origem === 'quebrado' && (J.ultimoTeste || {}).venceu; });
      } },

    { id: 'chaveporta', conceito: 'fase', xp: 10,
      frase: 'Ponha uma chave e uma porta na sua fase.',
      onde: 'fases',
      confere: function (E, J) { return pecas(J, 'k') >= 1 && pecas(J, 'D') >= 1; } },

    { id: 'condicao', conceito: 'condicao', xp: 20,
      frase: 'Faça a porta abrir SÓ SE tiver a chave. Passe por ela jogando.',
      onde: 'regras',
      confere: function (E, J) {
        return regras(J, function (r) { return r.quando.t === 'toca' && r.quando.obj === 'porta' && r.se && r.se.t === 'tem' && r.se.obj === 'chave'; }).length > 0
          && (T(J).portas || 0) >= 1;
      } },

    { id: 'laco', conceito: 'laco', xp: 20,
      frase: 'A cada 5 segundos, faça aparecer uma estrela.',
      onde: 'regras',
      confere: function (E, J) {
        return regras(J, function (r) { return r.quando.t === 'cada' && temAcao(r, 'cria', function (a) { return a.obj === 'estrela'; }); })
          .some(function (r) { return disparou(J, r, 2); });
      } },

    { id: 'fase2', conceito: 'sequencia', xp: 20,
      frase: 'Crie a fase 2 e chegue nela jogando.',
      onde: 'fases',
      confere: function (E, J) { return (J.fases || []).length >= 2 && (T(J).faseMax || 1) >= 2; } },

    { id: 'convidado', conceito: 'teste', xp: 25,
      frase: 'Chame alguém para jogar o seu jogo. Veja onde a pessoa errou.',
      onde: 'jogar',
      confere: function (E) { return (E.stats && E.stats.convidado || 0) >= 1; } },

    { id: 'versao', conceito: 'versao', xp: 15,
      frase: 'Melhore o que ficou difícil e tire a foto do jogo.',
      onde: 'diario',
      confere: function (E, J) { return (J.versoes || []).length >= 1; } },

    { id: 'prova', conceito: 'prova', xp: 20,
      frase: 'Ponha uma Placa ? no caminho e acerte a pergunta da prova.',
      onde: 'fases',
      confere: function (E, J) { return pecas(J, '?') >= 1 && (T(J).certasProva || 0) >= 1; } },

    { id: 'minhapergunta', conceito: 'prova', xp: 25,
      frase: 'Escreva a SUA pergunta e faça a placa perguntar ela.',
      onde: 'regras',
      confere: function (E, J) { return (E.perguntas || []).length >= 1 && (T(J).minhas || 0) >= 1; } },

    { id: 'robo', conceito: 'especificacao', xp: 20,
      frase: 'Peça uma peça nova ao robô: o que é, como é e o que faz.',
      onde: 'robo',
      confere: function (E) { return (E.pedidos || []).length >= 1; } }
  ];

  /* níveis da criadora (por missões cumpridas) */
  FAB.NIVEIS = [
    { min: 0,  nome: 'Aprendiz' },
    { min: 3,  nome: 'Construtora' },
    { min: 7,  nome: 'Programadora' },
    { min: 11, nome: 'Caçadora de bichinhos' },
    { min: 15, nome: 'Inventora' },
    { min: 19, nome: 'Mestra dos Jogos' }
  ];

  /* CARTAS DO SABER — o nome de criança de cada ideia de programação */
  FAB.CONCEITOS = {
    evento:    { nome: 'Acontecimento', icone: 'mao',      frase: 'Uma coisa acontece no jogo e a regra acorda.', exemplo: 'Quando tocar na moeda…', adulto: 'evento' },
    condicao:  { nome: 'Só se',         icone: 'cadeado',  frase: 'Um cadeado: a regra só funciona se a resposta for sim.', exemplo: 'Só se tiver a chave…', adulto: 'condição (if)' },
    variavel:  { nome: 'Caixinha de número', icone: 'caixinha', frase: 'Uma caixinha que guarda um número que muda.', exemplo: 'Pontos, vidas, relógio.', adulto: 'variável' },
    laco:      { nome: 'De novo e de novo', icone: 'relogio', frase: 'O relógio faz a mesma coisa várias vezes, sozinho.', exemplo: 'A cada 5 segundos, uma estrela.', adulto: 'laço (loop)' },
    sequencia: { nome: 'Um, dois, três', icone: 'mais',    frase: 'As ações acontecem na ordem da fila.', exemplo: 'Ganha ponto, a moeda some, toca o som.', adulto: 'sequência' },
    bug:       { nome: 'Bichinho do erro', icone: 'lupa',  frase: 'O jogo faz uma coisa que você não queria.', exemplo: 'A moeda não dá ponto.', adulto: 'bug' },
    depuracao: { nome: 'Caçar o bichinho', icone: 'lupa',  frase: 'Testar, olhar com a lupa, trocar uma coisa, testar de novo.', exemplo: 'Ligue a lupa e veja qual regra acordou.', adulto: 'depuração (debug)' },
    versao:    { nome: 'Foto do jogo',  icone: 'foto',     frase: 'Guarda o jogo como está. Dá para voltar depois.', exemplo: 'Foto antes de mudar a fase.', adulto: 'versão' },
    teste:     { nome: 'Testar',        icone: 't_testar', frase: 'Jogar para ver se ficou do jeito que você queria.', exemplo: 'Testei e o pulo ficou curto.', adulto: 'teste' },
    pixel:     { nome: 'Pixel',         icone: 't_pixel',  frase: 'Cada quadradinho é um pixel. Juntos, viram desenho.', exemplo: 'O urso tem 16 por 16 quadradinhos.', adulto: 'pixel art / sprite' },
    fase:      { nome: 'Fase',          icone: 't_fases',  frase: 'O caminho que o herói percorre, do começo à bandeira.', exemplo: 'Chão, moedas, perigos e a bandeira.', adulto: 'level design' },
    especificacao: { nome: 'Pedido claro', icone: 't_robo', frase: 'Dizer o que é, como é e o que faz, para alguém construir.', exemplo: 'Um dragão roxo que voa e solta bolhas.', adulto: 'especificação' },
    prova:     { nome: 'Pergunta',      icone: 'pergunta', frase: 'Quem cria a pergunta aprende duas vezes.', exemplo: 'Placa ? com pergunta da prova.', adulto: 'integração com o estudo' }
  };
})();
