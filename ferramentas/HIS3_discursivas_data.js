/* ============================================================
   HIS3_discursivas_data.js — FONTE ÚNICA das duas provas de treino de História
   (Y2 · 3º tri). Alimenta HIS3_discursivas.html (folha da criança) e
   HIS3_guia_responsavel.html (guia do pai/mãe).
   Conteúdo: trabalho/3tri_historia/_roteiro.md (nada fora dele).
   Campos: n, pts, pede (enunciado), tipo, dados do tipo, curta (gabarito),
   modelo, aceitar, observar, conversa (só no guia). pag = página da folha.
   ============================================================ */
(function () {
  var M = 'media/his3/';
  var F = function (k) { return M + 'fonte-' + k + '.jpg'; };
  var par = function (k) { return [[M + k + '-antes.jpg', 'Antes'], [M + k + '-hoje.jpg', 'Hoje']]; };
  window.HIS3D = { provas: [
    { id: 'A', nome: 'Prova de treino 1', questoes: [
      { n: 1, pts: '0,8', pag: 1, tipo: 'marca', pede: 'As fontes históricas podem ser de tipos diferentes. <b>Assinale</b> com um <b>X</b> a alternativa que explica o que é uma fonte <b>oral</b>.',
        ops: ['Um texto escrito, como uma carta.', 'Um relato contado por uma pessoa, como uma entrevista.', 'Um objeto antigo, como um brinquedo.', 'Uma imagem, como uma pintura.'], certas: [1],
        curta: 'b', modelo: 'b) Um relato contado por uma pessoa, como uma entrevista.', aceitar: 'Só a alternativa b.',
        observar: 'Confundir oral (alguém CONTA) com escrita (alguém ESCREVEU).', conversa: 'Se a vovó escrever a história numa carta, a carta é fonte oral ou escrita? (escrita)' },
      { n: 2, pts: '0,7', pag: 1, tipo: 'marca', pede: '<b>Observe</b> as imagens. <b>Assinale</b> com um <b>X</b> as alternativas que apresentam exemplos de fontes históricas <b>orais e visuais</b>.',
        figs: [F('entrevista'), F('album'), F('sofa'), F('certidao')],
        ops: ['Um sofá antigo.', 'As fotos de um álbum.', 'Uma entrevista.', 'Uma certidão de nascimento.'], certas: [1, 2],
        curta: 'b, c', modelo: 'b) As fotos de um álbum (visual). c) Uma entrevista (oral).', aceitar: 'As duas, b e c. Uma só marcada vale metade.',
        observar: 'Marcar uma só: a pergunta fala no plural, “as alternativas”. Peça para sublinhar os dois tipos pedidos.', conversa: 'Que tipo de fonte é o sofá? E a certidão? (material; escrita)' },
      { n: 3, pts: '0,9', pag: 2, tipo: 'classifica', pede: '<b>Classifique</b> as fontes históricas. <b>Escreva</b> abaixo de cada imagem: <b>oral, material, visual ou escrita</b>.',
        itens: [[F('castelo'), 'o castelo', 'material'], [F('carta'), 'a carta', 'escrita'], [F('roda'), 'a cantiga de roda', 'oral'], [F('bonecas'), 'as bonecas', 'material'], [F('quadros'), 'as fotos da parede', 'visual'], [F('certidao'), 'a certidão de nascimento', 'escrita'], [F('entrevista'), 'a entrevista', 'oral'], [F('album'), 'as fotos do álbum', 'visual'], [F('chapeu'), 'o chapéu', 'material']],
        modelo: 'Castelo: material. Carta: escrita. Cantiga de roda: oral. Bonecas: material. Fotos da parede: visual. Certidão: escrita. Entrevista: oral. Fotos do álbum: visual. Chapéu: material.',
        aceitar: 'Cada acerto vale 0,1.', observar: 'Ortografia de “visual” e “escrita”; copiar as quatro palavras do enunciado resolve.', conversa: 'Como você decidiu? (alguém conta? alguém escreveu? a gente vê uma imagem? a gente toca um objeto?)' },
      { n: 4, pts: '1,2', pag: 2, tipo: 'ce', pede: 'Sobre a história da escola, <b>escreva</b> (C) para as alternativas <u>corretas</u> e (E) para as alternativas <u>erradas</u>.',
        ops: ['Os cadernos e boletins antigos mostram como era o ensino.', 'A foto antiga de uma turma é uma fonte escrita.', 'Estudantes e professores podem ter memórias diferentes da mesma escola.', 'Os documentos da escola mostram somente o que não mudou com o tempo.'], gab: ['C', 'E', 'C', 'E'],
        modelo: 'a) C · b) E (a foto é visual) · c) C · d) E (mostram o que mudou e o que continuou igual).', aceitar: 'Cada item vale 0,3.',
        observar: 'Ler até o fim: uma palavra como “somente” pode mudar a frase toda.', conversa: 'Como a frase d ficaria certa? (mostram o que mudou e o que continuou igual)' },
      { n: 5, pts: '0,8', pag: 3, tipo: 'linhas', linhas: 4, pede: 'Por que é importante <b>guardar os documentos</b> antigos da escola?',
        curta: 'Para preservar a memória e contar a história da escola.', modelo: 'É importante guardar os documentos antigos da escola porque eles preservam a memória e contam a história da escola.',
        aceitar: 'Mostram como era o ensino, as regras ou o dia a dia; ajudam a ver o que mudou; contam a vida dos estudantes.',
        observar: 'Resposta sem dizer de quem se fala (“para saber como eles estudavam”): eles quem? O ponto se perde aí.', conversa: 'O que um boletim antigo da família pode contar?' },
      { n: 6, pts: '1,2', pag: 3, tipo: 'desenho', pede: 'Algumas profissões antigas desapareceram ou ficaram raras por causa das novas tecnologias. <b>Desenhe</b> e <b>escreva</b> o nome de <b>três</b> dessas profissões.',
        curta: 'acendedor de lampião, leiteiro, datilógrafa', modelo: 'Acendedor de lampião (poste e chama), leiteiro (garrafas na porta), datilógrafa (máquina de escrever).',
        aceitar: 'Vendedor de rua com cestos de frutas ou de vassouras, que está nas fotos da aula. Desenho simples, com o objeto da profissão.',
        observar: 'Desenhar três pessoas iguais. O objeto (lampião, garrafa, máquina) é o que mostra a profissão. Não vale carteiro: ele continua existindo.', conversa: 'Por que o acendedor de lampião não é mais necessário? (chegou a energia elétrica)' },
      { n: 7, pts: '1,2', pag: 3, tipo: 'ce', figs2: par('entrega'), pede: '<b>Observe</b> as imagens da entrega em duas épocas. <b>Escreva</b> (C) para as alternativas <u>corretas</u> e (E) para as <u>erradas</u>.',
        ops: ['Antes, as entregas eram feitas com um carrinho de mão.', 'As duas imagens mostram a mesma ferramenta de trabalho.', 'A tecnologia trouxe novos jeitos de entregar.', 'Hoje existe entrega feita com drone.'], gab: ['C', 'E', 'C', 'C'],
        modelo: 'a) C · b) E (carrinho de mão e drone são ferramentas diferentes) · c) C · d) C.', aceitar: 'Cada item vale 0,3.',
        observar: 'Responder de memória sem olhar as duas imagens.', conversa: 'O que o drone faz que o carrinho de mão não fazia?' },
      { n: 8, pts: '0,8', pag: 4, tipo: 'linhas', linhas: 2, figs2: par('cirurgia'), pede: '<b>Observe</b> as imagens. <b>Escreva</b> uma frase sobre a diferença entre as duas cirurgias.',
        curta: 'Antigamente, a cirurgia não tinha robô. Hoje, há robô que ajuda.', modelo: 'Antigamente, a cirurgia não tinha robô. Hoje, há robô que ajuda.',
        aceitar: 'Antes havia muitas pessoas em volta; hoje há equipamentos novos, máquinas ou robô.', observar: 'Falar só de uma época. A frase pede a diferença: Antigamente… Hoje…', conversa: 'O que continua igual no trabalho do médico? (o cuidado com o paciente)' },
      { n: 9, pts: '1,2', pag: 4, tipo: 'texto', pede: '<b>Leia</b> o texto e <b>responda</b>.', tit: 'A história de Dona Lúcia, a professora',
        texto: 'Quando era criança, Dona Lúcia brincava de dar aula para as bonecas. Ao se tornar professora, ela escrevia no quadro de giz e usava livros grandes e pesados. Os alunos pesquisavam na biblioteca. Com o tempo, chegaram novos recursos à escola. Hoje, Dona Lúcia usa o computador e mostra vídeos para a turma. Mesmo com as mudanças, ela continua conversando com os alunos e ouvindo as ideias deles.',
        subs: [['Qual é a profissão de Dona Lúcia?', 1], ['Onde os alunos pesquisavam antigamente?', 1], ['Que recursos a tecnologia trouxe para as aulas de Dona Lúcia?', 1]],
        curta: 'a) Professora. b) Na biblioteca. c) O computador e os vídeos.', modelo: 'a) Dona Lúcia é professora. b) Antigamente, os alunos pesquisavam na biblioteca. c) A tecnologia trouxe o computador e os vídeos.',
        aceitar: 'Resposta de uma palavra em a e b (“Professora.”, “Biblioteca.”).', observar: 'Responder de memória em vez de voltar ao texto. Em c, quadro de giz e livros são de antes.', conversa: 'O que continuou igual? Mostre no texto.' },
      { n: 10, pts: '1,2', pag: 4, tipo: 'campos', pede: '<b>Escolha</b> uma profissão que continua existindo. <b>Escreva</b> o nome dela, o que mudou e o que continuou igual.',
        campos: [['Profissão:', 1], ['O que mudou:', 1], ['O que continuou igual:', 1]],
        curta: 'Exemplo: médico · antes, papel e caneta; hoje, computador · o cuidado com o paciente.', modelo: 'Profissão: médico. O que mudou: antes, o médico usava papel e caneta; hoje, usa computador. O que continuou igual: o cuidado com cada paciente.',
        aceitar: 'Carteiro, professora, fazendeiro, fotógrafo. A mudança precisa ser daquela profissão. O que continuou: o cuidado (médico), ouvir os alunos (professora), cuidar da natureza (fazendeiro), entregar (carteiro), fotografar (fotógrafo).',
        observar: 'Escolher profissão que desapareceu, como acendedor de lampião. Escolher antes a profissão que sabe explicar melhor.', conversa: 'Qual profissão você escolheria? Conte o antes e o hoje em voz alta.' }
    ] },
    { id: 'B', nome: 'Prova de treino 2', questoes: [
      { n: 1, pts: '0,8', pag: 1, tipo: 'marca', pede: 'Permanência é aquilo que continuou igual com o passar do tempo. <b>Assinale</b> com um <b>X</b> a alternativa que mostra uma <b>permanência</b> na história da professora Dona Lúcia.',
        ops: ['Ela trocou o quadro de giz pelo computador.', 'Os alunos passaram a pesquisar na internet.', 'Ela conversa com os alunos e ouve as ideias deles.', 'Ela passou a mostrar vídeos para a turma.'], certas: [2],
        curta: 'c', modelo: 'c) Ela conversa com os alunos e ouve as ideias deles. Isso continuou igual.', aceitar: 'Só a alternativa c.', observar: 'Trocar permanência por mudança. Nas outras três alternativas, algo ficou diferente.', conversa: 'Diga uma mudança e uma permanência na sua escola.' },
      { n: 2, pts: '0,7', pag: 1, tipo: 'marca', pede: '<b>Observe</b> as imagens. <b>Assinale</b> com um <b>X</b> as alternativas que apresentam exemplos de fontes históricas <b>materiais e orais</b>.',
        figs: [F('carta'), F('bonecas'), F('entrevista'), F('quadros')],
        ops: ['Uma carta antiga.', 'Bonecas antigas.', 'Uma entrevista.', 'As fotos da parede.'], certas: [1, 2],
        curta: 'b, c', modelo: 'b) Bonecas antigas (material). c) Uma entrevista (oral).', aceitar: 'As duas, b e c. Uma só marcada vale metade.', observar: 'Marcar uma só.', conversa: 'Que tipo de fonte é a carta? E as fotos? (escrita; visual)' },
      { n: 3, pts: '0,9', pag: 2, tipo: 'classifica', pede: '<b>Classifique</b> as fontes históricas. <b>Escreva</b> abaixo de cada imagem: <b>oral, material, visual ou escrita</b>.',
        itens: [[F('livros'), 'os livros fechados, objetos', 'material'], [F('mapa'), 'o desenho do mapa', 'visual'], [F('sofa'), 'o sofá', 'material'], [F('carta'), 'a carta', 'escrita'], [F('entrevista'), 'a entrevista', 'oral'], [F('album'), 'as fotos do álbum', 'visual'], [F('certidao'), 'a certidão de nascimento', 'escrita'], [F('castelo'), 'o castelo', 'material'], [F('roda'), 'a cantiga de roda', 'oral']],
        modelo: 'Livros fechados: material. Desenho do mapa: visual. Sofá: material. Carta: escrita. Entrevista: oral. Fotos do álbum: visual. Certidão: escrita. Castelo: material. Cantiga de roda: oral.',
        aceitar: 'Cada acerto vale 0,1. Nos livros, “escrita” só se a criança explicar que fala do texto de dentro.', observar: 'O livro tem dois lados: o objeto é material; o texto que está dentro é escrita. Com a foto de livros fechados, sem outra indicação, a resposta é material.', conversa: 'E se a pergunta falasse do que está escrito no livro? (escrita)' },
      { n: 4, pts: '1,2', pag: 2, tipo: 'ce', pede: 'Sobre as fontes históricas, <b>escreva</b> (C) para as alternativas <u>corretas</u> e (E) para as alternativas <u>erradas</u>.',
        ops: ['Duas pessoas podem contar histórias diferentes sobre a mesma fotografia.', 'Uma suposição está sempre certa.', 'O historiador compara várias fontes.', 'Uma carta antiga mostra como as pessoas se comunicavam.'], gab: ['C', 'E', 'C', 'C'],
        modelo: 'a) C · b) E (suposição é o que a gente imagina; nem sempre está certa) · c) C · d) C.', aceitar: 'Cada item vale 0,3.', observar: 'Ler até o fim: uma palavra como “sempre” pode mudar a frase toda.', conversa: 'O que é uma suposição? (é imaginar o que falta quando não temos todas as informações)' },
      { n: 5, pts: '0,8', pag: 3, tipo: 'linhas', linhas: 4, pede: 'O que são <b>fontes históricas</b>? Escreva também <b>um exemplo</b>.',
        curta: 'São pistas do passado. Exemplo: uma carta antiga.', modelo: 'Fontes históricas são pistas que ajudam a conhecer o passado. Um exemplo é uma carta antiga.',
        aceitar: '“Aquilo que a gente pode ver, ouvir, tocar ou ler para aprender sobre outras épocas.” Qualquer exemplo: foto, objeto, relato, documento.',
        observar: 'Esquecer o exemplo: a pergunta pede duas coisas.', conversa: 'Dê um exemplo de cada tipo: oral, escrita, visual e material.' },
      { n: 6, pts: '1,2', pag: 3, tipo: 'desenho', pede: 'Nas aulas, vimos ferramentas antigas de várias profissões. <b>Desenhe</b> e <b>escreva</b> o nome de <b>três</b> ferramentas do <b>médico</b> de antigamente.',
        curta: 'estetoscópio, termômetro de mercúrio, maleta', modelo: 'Estetoscópio, termômetro de mercúrio e maleta.',
        aceitar: 'Seringa antiga; papel e caneta.', observar: 'Desenhar computador ou celular, que são do médico de hoje. Conferir a ortografia de “estetoscópio”.', conversa: 'O que o Doutor João usa hoje? (computador, exames pelo celular, consulta por vídeo)' },
      { n: 7, pts: '1,2', pag: 3, tipo: 'ce', figs2: par('campo'), pede: '<b>Observe</b> as imagens do trabalho no campo em duas épocas. <b>Escreva</b> (C) para as alternativas <u>corretas</u> e (E) para as <u>erradas</u>.',
        ops: ['Na imagem de antes, os animais ajudam no trabalho.', 'A ferramenta de trabalho é a mesma nas duas imagens.', 'Com as máquinas, o trabalho ficou mais rápido.', 'O fazendeiro deixou de cuidar da terra por causa das máquinas.'], gab: ['C', 'E', 'C', 'E'],
        modelo: 'a) C · b) E (antes, bois e arado; hoje, máquina) · c) C · d) E (ele continua cuidando da terra).', aceitar: 'Cada item vale 0,3.', observar: 'Achar que tudo mudou: o jeito de trabalhar mudou, o cuidado com a terra continua.', conversa: 'O que Seu Pedro faz hoje com o celular? (vê se vai chover)' },
      { n: 8, pts: '0,8', pag: 4, tipo: 'linhas', linhas: 2, figs2: par('engenharia'), pede: '<b>Observe</b> as imagens da engenharia (criar e construir máquinas). <b>Escreva</b> uma frase sobre a diferença entre o trabalho de antes e o de hoje.',
        curta: 'Antigamente, usavam desenhos no papel. Hoje, usam também computador e robô.', modelo: 'Antigamente, os engenheiros usavam desenhos no papel. Hoje, os engenheiros usam também computador e robô.',
        aceitar: 'Qualquer frase que diga como era e como é.', observar: 'Falar só de uma época; escrever “eles” sem dizer quem (os engenheiros).', conversa: 'O que as máquinas novas mudaram no trabalho? (ficou mais rápido ou mais confortável)' },
      { n: 9, pts: '1,2', pag: 4, tipo: 'texto', pede: '<b>Leia</b> o texto e <b>responda</b>.', tit: 'A história do Doutor João, o médico',
        texto: 'No começo da carreira, Doutor João trabalhava num consultório simples. Ele usava estetoscópio, papel e caneta. Os exames demoravam dias para ficar prontos, e as fichas dos pacientes ficavam em grandes arquivos de papel. Com o tempo, tudo foi mudando. Hoje, Doutor João usa o computador e recebe os exames pelo celular. Ele também faz consultas por vídeo com pessoas que moram longe. Mesmo com tanta tecnologia, o cuidado com cada paciente não mudou.',
        subs: [['Qual é a profissão do Doutor João?', 1], ['Onde ficavam as fichas dos pacientes antigamente?', 1], ['Como a tecnologia ajuda o Doutor João hoje?', 1]],
        curta: 'a) Médico. b) Em grandes arquivos de papel. c) Exames pelo celular, consultas por vídeo ou computador.', modelo: 'a) O Doutor João é médico. b) As fichas ficavam em grandes arquivos de papel. c) Hoje, o Doutor João recebe os exames pelo celular e faz consultas por vídeo.',
        aceitar: 'Uma só tecnologia em c já responde. Respostas curtas em a e b.', observar: 'Em c, escrever só “com a tecnologia”: precisa dizer qual.', conversa: 'O que não mudou no trabalho dele?' },
      { n: 10, pts: '1,2', pag: 4, tipo: 'campos', pede: '<b>Escolha</b> uma profissão nova, criada por causa da tecnologia. <b>Escreva</b> o nome dela e <b>explique</b> por que ela não existia no tempo dos nossos avós.',
        campos: [['Profissão nova:', 1], ['Por que não existia:', 2]],
        curta: 'Exemplo: desenvolvedor de aplicativos, porque a tecnologia dos aplicativos ainda não existia.', modelo: 'Profissão nova: desenvolvedor de aplicativos. Ela não existia no tempo dos nossos avós porque a tecnologia dos aplicativos ainda não existia.',
        aceitar: 'Designer gráfico, cientista de dados ou outra profissão com computador, internet e redes sociais, com explicação ligada à tecnologia.',
        observar: 'Escrever só “porque não existia”: precisa dizer que faltava a tecnologia (aplicativos, computador, internet).', conversa: 'Conte três profissões novas da aula. (designer gráfico, desenvolvedor de aplicativos, cientista de dados)' }
    ] }
  ] };
})();
