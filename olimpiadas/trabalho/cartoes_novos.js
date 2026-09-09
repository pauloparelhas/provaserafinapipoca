/* ============================================================
   cartoes_novos.js — o array CARTOES reescrito (09/09/2026).

   PRONTO PARA SUBSTITUIR o `var CARTOES = [...]` de
   ferramentas/OP_data.js. Nada mais deste arquivo entra lá.

   POR QUE FOI REESCRITO
   A versão anterior dava, por bloco, um parágrafo de introdução
   (`texto`) mais cinco ou seis linhas de `extras` mais um `apoio`.
   Aberto, cada bloco virava parede de prosa: 4.939 caracteres nos
   nove blocos. A criança não lê parede; o adulto lê e não sabe que
   gesto ensinar. O veredito do dono foi de conteúdo, não de layout.

   O QUE CADA BLOCO PASSA A TER — nesta ordem, e nada além:
     truque      a frase de sempre, IDÊNTICA à do comentário de erro
                 do simulado. É o que faz a criança reconhecer as duas
                 coisas como uma só.
     reconhece   UMA linha: a cara dessa questão no papel. Sem isso ela
                 não sabe QUANDO usar o truque — era o que mais faltava.
     passos      TRÊS no máximo, cada um começando por verbo, cada um
                 com até 60 caracteres. Instrução de mão, não explicação.
     armadilha   UMA linha: o erro que a questão arma para quem tem
                 pressa. Nunca começa validando a alternativa errada
                 ("é verdade, mas...") — aos 7 anos ela guarda a
                 primeira metade e larga a segunda.
     palavras    só no bloco mestre: as palavras de comando, em fichas.

   FORA, de propósito: o parágrafo de introdução, as listas de cinco
   ou seis itens, e toda frase que explica POR QUE o truque funciona.
   A justificativa é conversa de adulto; a criança precisa do gesto.

   TETO DURO: 320 caracteres somando tudo o que aparece na tela de um
   bloco (420 no mestre, que é ordem de leitura das quinze, não um tipo
   de questão). Se não coube, é porque tinha coisa que não interessa.

   METALINGUAGEM: zero. Só sobrevivem as palavras que a própria prova
   usa com ela: vogal, consoante, sílaba, letra, alfabeto, rima, frase,
   palavra, texto, tabela, placa, desenho.

   UMA MUDANÇA DE `truque` (obriga a olhar o banco):
   o bloco `silabas` estava com "Bata palma em cada pedaço, e leia
   direito o que a pergunta pede." — frase que NÃO existe em nenhum
   comentário de erro. Ele volta para a frase do banco e de FAMILIAS,
   "Bata palma em cada pedaço. Use TODAS as peças, uma vez cada."
   (11 itens do eixo a usam), e a ressalva que motivou a troca — nem
   toda variante usa todas as peças — passa a viver no passo 3, onde
   é gesto e não emenda: "Leia a pergunta: usa todas as peças ou não?".
   Nenhum item do banco precisa mudar por causa disto.
   ============================================================ */

var CARTOES = [
 /* O TRUQUE MESTRE — vem antes de todos porque vale para as quinze
    questões, e não para um tipo só. O erro típico das seis provas
    analisadas não é ignorância: é responder à pergunta que a criança
    esperava, e não à que foi feita. Por isso ele é ordem de leitura,
    e as palavras de comando aparecem como fichas, não como lista de
    prosa: ela precisa RECONHECÊ-LAS no papel, não decorá-las. */
 {k:'comando', titulo:'Antes de tudo: o que a pergunta está pedindo', min:3, mestre:true,
  truque:'Leia a pergunta ANTES do texto. Ache a palavra que manda — e responda exatamente ela.',
  reconhece:'Vale para as quinze perguntas da prova.',
  palavras:['POR QUE','QUAL','QUANTOS','COMPLETE','MARQUE APENAS'],
  passos:['Leia a pergunta antes do texto.',
          'Passe o dedo na palavra que manda.',
          'Leia sua resposta junto com a pergunta.'],
  armadilha:'Se aparecer NÃO, a resposta é a diferente das outras.',
  /* Este bloco não tem eixo próprio no banco: o popup dele reúne questões
     REAIS em que ler o comando com atenção é o que decide a resposta. */
  itens:['25F1Q12','24F1Q8','25F1Q9','25F1Q7','24F1Q14','25F1Q5']},

 {k:'ler', titulo:'Ler e entender', min:4,
  truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
  reconhece:'A prova dá um texto e pergunta uma coisa sobre ele.',
  passos:['Leia a pergunta e guarde o que ela quer.',
          'Ache no texto a linha que responde.',
          'Leia as quatro respostas até o fim.'],
  armadilha:'A errada está no texto, mas não responde a pergunta.',
  exemplo:'25F1Q13', agora:'24F1Q8'},

 {k:'letras', titulo:'Brincar com letras', min:3,
  truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.',
  reconhece:'A prova dá letras soltas e pergunta que palavra dá para montar.',
  passos:['Escreva a palavra da resposta.',
          'Risque uma letra da lista a cada letra escrita.',
          'Confira: não pode sobrar nem faltar letra.'],
  armadilha:'A errada usa quase todas as letras e sobra uma.',
  exemplo:'25F1Q6', agora:'25F1Q11'},

 {k:'contar', titulo:'Contar com o dedo', min:3,
  truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.',
  reconhece:'A prova pergunta QUANTAS vogais, letras ou sílabas tem.',
  passos:['Ponha um pontinho embaixo de cada uma.',
          'Vá até o fim da palavra, sem pular.',
          'Conte os pontinhos só no fim.'],
  armadilha:'A vogal que você esquece está no último pedaço da palavra.',
  exemplo:'25F1Q7', agora:'24F1Q4'},

 {k:'silabas', titulo:'Sílabas', min:3,
  /* truque de volta à frase do banco (ver cabeçalho): a ressalva das
     variantes virou o passo 3, que é gesto e não emenda de frase. */
  truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.',
  reconhece:'A prova dá pedaços de palavra e pergunta o que dá para montar.',
  passos:['Bata palma em cada pedaço da resposta.',
          'Ache cada pedaço entre as peças da prova.',
          'Leia a pergunta: usa todas as peças ou não?'],
  armadilha:'Se um pedaço não está entre as peças, a palavra está errada.',
  exemplo:'25F1Q3', agora:'24F1Q11'},

 {k:'buraco', titulo:'Frase com buraco', min:3,
  truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.',
  reconhece:'A frase tem um espaço vazio e quatro palavras para escolher.',
  passos:['Ponha a primeira palavra no buraco.',
          'Leia a frase inteira, do começo até o fim.',
          'Faça isso com as quatro e escolha a que encaixa.'],
  armadilha:'A errada combina com o lado do buraco e briga com o resto.',
  exemplo:'25F1Q2', agora:'24F1Q6'},

 {k:'intruso', titulo:'Intruso e troca-troca', min:3,
  truque:'O que os outros três têm de igual? Quem não tem isso é o intruso.',
  reconhece:'A prova dá quatro palavras e pergunta qual não combina.',
  passos:['Olhe as quatro e ache o que três têm de igual.',
          'Marque a que não tem isso.',
          'Se a pergunta manda trocar, leia a frase nova.'],
  armadilha:'A errada passa em quase todas as pistas e cai na última.',
  exemplo:'24F1Q9', agora:'25F1Q10'},

 {k:'alfabeto', titulo:'Alfabeto e charada', min:3,
  truque:'Cante o alfabeto com o dedo andando: A B C D E F G. Onde o dedo pula, tem buraco.',
  reconhece:'A prova pede ordem do alfabeto, ou uma letra fala dela mesma.',
  passos:['Cante o alfabeto com o dedo andando.',
          'Veja se cada letra vem depois da anterior.',
          'Na charada, pense na forma e no som da letra.'],
  armadilha:'Uma letra passa nas primeiras pistas e cai na última.',
  exemplo:'25F1Q5', agora:'24F1Q1'},

 /* Bloco de dois eixos: a tabela de desenhos e as placas entram juntas
    porque o gesto é o mesmo — ler o desenho inteiro antes de decidir.
    A regra da placa não cabia em passo e armadilha ao mesmo tempo; ficou
    a regra no passo 3 (o que a placa quer dizer) e a pegadinha na
    armadilha (o que ela NÃO quer dizer sem a barra vermelha). */
 {k:'codigo', titulo:'Código, tabela e placa', min:3, eixos:['codigo','placa'],
  truque:'Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Junte só no fim.',
  reconhece:'Tabela de desenhos para ler, ou placas para escolher.',
  passos:['Ache cada desenho na tabela e escreva a peça.',
          'Junte as peças só no fim, sem pular nenhuma.',
          'Na placa, círculo cortado é PROIBIDO.'],
  armadilha:'Placa sem barra vermelha não proíbe: ela mostra.',
  exemplo:'25F1Q15'}
];
