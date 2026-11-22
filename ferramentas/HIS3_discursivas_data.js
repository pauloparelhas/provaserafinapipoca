/* ============================================================
   HIS3_discursivas_data.js — FONTE ÚNICA das duas provas de treino de História
   (Y2 · 3º tri). Alimenta HIS3_discursivas.html (folha da criança) e
   HIS3_guia_responsavel.html (guia do pai/mãe).
   Conteúdo: trabalho/3tri_historia/_roteiro.md (nada fora dele).
   Campos: n, pts, pede (enunciado), tipo, dados do tipo, pag (página da folha),
   curta (resposta, só no guia de 1 página).
   ============================================================ */
(function () {
  var M = 'media/his3/';
  var F = function (k) { return M + 'pb/fonte-' + k + '.jpg'; };
  var par = function (k) { return [[M + 'pb/' + k + '-antes.jpg', 'Antes'], [M + 'pb/' + k + '-hoje.jpg', 'Hoje']]; };
  window.HIS3D = { provas: [
    { id: 'A', nome: 'Prova de treino 1', questoes: [
      { n: 1, pts: '0,8', pag: 1, tipo: 'marca', pede: 'As fontes históricas podem ser de tipos diferentes. <b>Assinale</b> com um <b>X</b> a alternativa que explica o que é uma fonte <b>oral</b>.',
        ops: ['Um texto escrito, como uma carta.', 'Um relato contado por uma pessoa, como uma entrevista.', 'Um objeto antigo, como um brinquedo.', 'Uma imagem, como uma pintura.'], certas: [1],
        curta: 'b' },
      { n: 2, pts: '0,7', pag: 1, tipo: 'marca', pede: '<b>Observe</b> as imagens. <b>Assinale</b> com um <b>X</b> as alternativas que apresentam exemplos de fontes históricas <b>orais e visuais</b>.',
        figs: [F('entrevista'), F('album'), F('sofa'), F('certidao')],
        ops: ['Um sofá antigo.', 'As fotos de um álbum.', 'Uma entrevista.', 'Uma certidão de nascimento.'], certas: [1, 2],
        curta: 'b, c' },
      { n: 3, pts: '0,9', pag: 2, tipo: 'classifica', pede: '<b>Classifique</b> as fontes históricas. <b>Escreva</b> abaixo de cada imagem: <b>oral, material, visual ou escrita</b>.',
        itens: [[F('castelo'), 'o castelo', 'material'], [F('carta'), 'a carta', 'escrita'], [F('roda'), 'a cantiga de roda', 'oral'], [F('bonecas'), 'as bonecas', 'material'], [F('quadros'), 'as fotos da parede', 'visual'], [F('certidao'), 'a certidão de nascimento', 'escrita'], [F('entrevista'), 'a entrevista', 'oral'], [F('album'), 'as fotos do álbum', 'visual'], [F('chapeu'), 'o chapéu', 'material']] },
      { n: 4, pts: '1,2', pag: 2, tipo: 'ce', pede: 'Sobre a história da escola, <b>escreva</b> (C) para as alternativas <u>corretas</u> e (E) para as alternativas <u>erradas</u>.',
        ops: ['Os cadernos e boletins antigos mostram como era o ensino.', 'A foto antiga de uma turma é uma fonte escrita.', 'Estudantes e professores podem ter memórias diferentes da mesma escola.', 'Os documentos da escola mostram somente o que não mudou com o tempo.'], gab: ['C', 'E', 'C', 'E'] },
      { n: 5, pts: '0,8', pag: 3, tipo: 'linhas', linhas: 4, pede: 'Por que é importante <b>guardar os documentos</b> antigos da escola?',
        curta: 'Porque os documentos preservam a memória e contam a história da escola. Vale também: mostram o ensino, as regras, o dia a dia ou o que mudou.' },
      { n: 6, pts: '1,2', pag: 3, tipo: 'desenho', pede: 'Algumas profissões antigas desapareceram ou ficaram raras por causa das novas tecnologias. <b>Desenhe</b> e <b>escreva</b> o nome de <b>três</b> dessas profissões.',
        curta: 'Acendedor de lampião, leiteiro, datilógrafa. Vale também vendedor com cestos. Não vale carteiro, que continua existindo.' },
      { n: 7, pts: '1,2', pag: 3, tipo: 'ce', figs2: par('entrega'), pede: '<b>Observe</b> as imagens da entrega em duas épocas. <b>Escreva</b> (C) para as alternativas <u>corretas</u> e (E) para as <u>erradas</u>.',
        ops: ['Antes, as entregas eram feitas com um carrinho de mão.', 'As duas imagens mostram a mesma ferramenta de trabalho.', 'A tecnologia trouxe novos jeitos de entregar.', 'Hoje existe entrega feita com drone.'], gab: ['C', 'E', 'C', 'C'] },
      { n: 8, pts: '0,8', pag: 4, tipo: 'linhas', linhas: 2, figs2: par('cirurgia'), pede: '<b>Observe</b> as imagens. <b>Escreva</b> uma frase sobre a diferença entre as duas cirurgias.',
        curta: 'Antigamente, a cirurgia não tinha robô. Hoje, há robô que ajuda. A frase precisa dos dois tempos.' },
      { n: 9, pts: '1,2', pag: 4, tipo: 'texto', pede: '<b>Leia</b> o texto e <b>responda</b>.', tit: 'A história de Dona Lúcia, a professora',
        texto: 'Quando era criança, Dona Lúcia brincava de dar aula para as bonecas. Ao se tornar professora, ela escrevia no quadro de giz e usava livros grandes e pesados. Os alunos pesquisavam na biblioteca. Com o tempo, chegaram novos recursos à escola. Hoje, Dona Lúcia usa o computador e mostra vídeos para a turma. Mesmo com as mudanças, ela continua conversando com os alunos e ouvindo as ideias deles.',
        subs: [['Qual é a profissão de Dona Lúcia?', 1], ['Onde os alunos pesquisavam antigamente?', 1], ['Que recursos a tecnologia trouxe para as aulas de Dona Lúcia?', 1]],
        curta: 'a) Professora. b) Na biblioteca. c) O computador e os vídeos.' },
      { n: 10, pts: '1,2', pag: 4, tipo: 'campos', pede: 'Pense numa profissão que você conhece. <b>Escreva</b> o nome dela e <b>conte</b> como era esse trabalho antigamente.',
        campos: [['Profissão:', 1], ['Antigamente:', 2]],
        curta: 'Exemplo: médico, anotava tudo no papel. Vale qualquer profissão das aulas, com uma coisa de antigamente.' }
    ] },
    { id: 'B', nome: 'Prova de treino 2', questoes: [
      { n: 1, pts: '0,8', pag: 1, tipo: 'marca', pede: 'Permanência é aquilo que continuou igual com o passar do tempo. <b>Assinale</b> com um <b>X</b> a alternativa que mostra uma <b>permanência</b> na história da professora Dona Lúcia.',
        ops: ['Ela trocou o quadro de giz pelo computador.', 'Os alunos passaram a pesquisar na internet.', 'Ela conversa com os alunos e ouve as ideias deles.', 'Ela passou a mostrar vídeos para a turma.'], certas: [2],
        curta: 'c' },
      { n: 2, pts: '0,7', pag: 1, tipo: 'marca', pede: '<b>Observe</b> as imagens. <b>Assinale</b> com um <b>X</b> as alternativas que apresentam exemplos de fontes históricas <b>materiais e orais</b>.',
        figs: [F('carta'), F('bonecas'), F('entrevista'), F('quadros')],
        ops: ['Uma carta antiga.', 'Bonecas antigas.', 'Uma entrevista.', 'As fotos da parede.'], certas: [1, 2],
        curta: 'b, c' },
      { n: 3, pts: '0,9', pag: 2, tipo: 'classifica', pede: '<b>Classifique</b> as fontes históricas. <b>Escreva</b> abaixo de cada imagem: <b>oral, material, visual ou escrita</b>.',
        itens: [[F('livros'), 'os livros fechados, objetos', 'material'], [F('mapa'), 'o desenho do mapa', 'visual'], [F('sofa'), 'o sofá', 'material'], [F('carta'), 'a carta', 'escrita'], [F('entrevista'), 'a entrevista', 'oral'], [F('album'), 'as fotos do álbum', 'visual'], [F('certidao'), 'a certidão de nascimento', 'escrita'], [F('castelo'), 'o castelo', 'material'], [F('roda'), 'a cantiga de roda', 'oral']] },
      { n: 4, pts: '1,2', pag: 2, tipo: 'ce', pede: 'Sobre as fontes históricas, <b>escreva</b> (C) para as alternativas <u>corretas</u> e (E) para as alternativas <u>erradas</u>.',
        ops: ['Duas pessoas podem contar histórias diferentes sobre a mesma fotografia.', 'Uma suposição está sempre certa.', 'O historiador compara várias fontes.', 'Uma carta antiga mostra como as pessoas se comunicavam.'], gab: ['C', 'E', 'C', 'C'] },
      { n: 5, pts: '0,8', pag: 3, tipo: 'linhas', linhas: 4, pede: 'O que são <b>fontes históricas</b>? Escreva também <b>um exemplo</b>.',
        curta: 'São pistas que ajudam a conhecer o passado. Exemplo: uma carta antiga. São dois pedidos: o que são e um exemplo.' },
      { n: 6, pts: '1,2', pag: 3, tipo: 'desenho', pede: 'Objetos antigos podem ser fontes históricas. <b>Desenhe</b> e <b>escreva</b> o nome de <b>três</b> objetos antigos.',
        curta: 'Resposta livre: brinquedo, roupa, chapéu, móvel, panela, livro, relógio, câmera. O nome pode ter erro de escrita se o desenho estiver claro.' },
      { n: 7, pts: '1,2', pag: 3, tipo: 'ce', figs2: par('campo'), pede: '<b>Observe</b> as imagens do trabalho no campo em duas épocas. <b>Escreva</b> (C) para as alternativas <u>corretas</u> e (E) para as <u>erradas</u>.',
        ops: ['Na imagem de antes, os animais ajudam no trabalho.', 'A ferramenta de trabalho é a mesma nas duas imagens.', 'Com as máquinas, o trabalho ficou mais rápido.', 'O fazendeiro deixou de cuidar da terra por causa das máquinas.'], gab: ['C', 'E', 'C', 'E'] },
      { n: 8, pts: '0,8', pag: 4, tipo: 'linhas', linhas: 2, figs2: par('engenharia'), pede: '<b>Observe</b> as imagens da engenharia (criar e construir máquinas). <b>Escreva</b> uma frase sobre a diferença entre o trabalho de antes e o de hoje.',
        curta: 'Antigamente, os engenheiros usavam desenhos no papel. Hoje, usam também computador e robô. Vale citar só o computador.' },
      { n: 9, pts: '1,2', pag: 4, tipo: 'texto', pede: '<b>Leia</b> o texto e <b>responda</b>.', tit: 'A história do Doutor João, o médico',
        texto: 'No começo da carreira, Doutor João trabalhava num consultório simples. Ele usava estetoscópio, papel e caneta. Os exames demoravam dias para ficar prontos, e as fichas dos pacientes ficavam em grandes arquivos de papel. Com o tempo, tudo foi mudando. Hoje, Doutor João usa o computador e recebe os exames pelo celular. Ele também faz consultas por vídeo com pessoas que moram longe. Mesmo com tanta tecnologia, o cuidado com cada paciente não mudou.',
        subs: [['Qual é a profissão do Doutor João?', 1], ['Onde ficavam as fichas dos pacientes antigamente?', 1], ['Como a tecnologia ajuda o Doutor João hoje?', 1]],
        curta: 'a) Médico. b) Em grandes arquivos de papel. c) Exames pelo celular, consultas por vídeo ou computador.' },
      { n: 10, pts: '1,2', pag: 4, tipo: 'campos', pede: '<b>Escolha</b> uma profissão antiga que desapareceu ou ficou rara. <b>Escreva</b> o nome dela e <b>conte</b> o que essa pessoa fazia.',
        campos: [['Profissão antiga:', 1], ['O que fazia:', 2]],
        curta: 'Exemplo: leiteiro, entregava leite na porta das casas. Vale acendedor de lampião, datilógrafa, vendedor com cestos.' }
    ] }
  ] };
})();
