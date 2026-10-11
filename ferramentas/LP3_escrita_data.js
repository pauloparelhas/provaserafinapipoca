/* ============================================================
   LP3_escrita_data.js — BANCO DA PARTE ESCRITA do simulado de Português
   (3º tri · Y2 · AF de 14/10/2026).  Criado em 11/10/2026.

   POR QUE EXISTE: a revisão de LP do 2º tri, das mesmas professoras, cobra
   produção — "complete as palavras", "com suas palavras, defina",
   "escreva", "crie uma frase". Marcar alternativa não treina isso. Aqui a
   criança ESCREVE (no caderno ou na caixa da tela), depois vê uma resposta
   modelo e se autoavalia: Acertei / Quase / Errei.

   Fonte: trabalho/3tri_portugues/_roteiro.md (v2). Nada fora do roteiro.

   Campos:
     id, tipo (nome curto na tela), grupo ('texto' | 'palavra' | 'conceito'
     — as cotas do sorteio), cmd (o comando, em CAIXA ALTA como na prova),
     quadro (opcional, HTML), linhas (altura da caixa), modelo (HTML),
     confere[] (o que olhar na própria resposta, em letra normal).
   ============================================================ */
window.LP3E_BANCO = [

/* ---------- texto: paráfrase e paródia ---------- */
{id:'E01', tipo:'Paráfrase', grupo:'texto', linhas:3,
 cmd:'REESCREVA A FRASE COM SUAS PALAVRAS, SEM MUDAR O SENTIDO (PARÁFRASE):',
 quadro:'A MENINA FOI À FLORESTA LEVAR DOCES PARA A VOVÓ.',
 modelo:'A GAROTA FOI À MATA LEVAR GULOSEIMAS PARA A AVÓ.',
 confere:['Trocou palavras por outras de mesmo sentido (menina → garota, floresta → mata, doces → guloseimas, vovó → avó).',
          'O que acontece continua igual: alguém leva doces para a avó.']},

{id:'E02', tipo:'Paráfrase', grupo:'texto', linhas:3,
 cmd:'REESCREVA A FRASE COM SUAS PALAVRAS, SEM MUDAR O SENTIDO (PARÁFRASE):',
 quadro:'O LOBO ERA GRANDE E ESTAVA BRAVO.',
 modelo:'O LOBO ERA ENORME E ESTAVA ZANGADO.',
 confere:['Usou sinônimos: grande → enorme, bravo → zangado.',
          'Continua falando do lobo, e o sentido não mudou.']},

{id:'E03', tipo:'Paráfrase', grupo:'texto', linhas:3,
 cmd:'REESCREVA A FRASE COM SUAS PALAVRAS, SEM MUDAR O SENTIDO (PARÁFRASE):',
 quadro:'JOÃO FICOU COM MEDO QUANDO O GIGANTE ACORDOU.',
 modelo:'QUANDO O GIGANTE ACORDOU, O MENINO FICOU ASSUSTADO.',
 confere:['Trocou palavras (com medo → assustado, João → o menino) ou mudou a ordem da frase.',
          'Continua sendo João com medo porque o Gigante acordou.']},

{id:'E04', tipo:'Paródia', grupo:'texto', linhas:3,
 cmd:'MUDE A FRASE DE PROPÓSITO PARA FAZER UMA PARÓDIA. TROQUE ALGUMA COISA E DEIXE O RESTO PARECIDO:',
 quadro:'CHAPEUZINHO VERMELHO LEVOU UMA CESTA DE DOCES PARA A VOVÓ.',
 modelo:'CHAPEUZINHO AMARELO LEVOU UMA CESTA DE PIZZAS PARA O VOVÔ.',
 confere:['Mudou alguma coisa de propósito (a cor, a comida, quem recebe a visita...).',
          'Ainda dá para reconhecer a história de Chapeuzinho Vermelho.']},

{id:'E05', tipo:'Paródia', grupo:'texto', linhas:3,
 cmd:'MUDE A FRASE DE PROPÓSITO PARA FAZER UMA PARÓDIA. TROQUE ALGUMA COISA E DEIXE O RESTO PARECIDO:',
 quadro:'OS TRÊS PORQUINHOS FIZERAM CASAS DE PALHA, DE MADEIRA E DE TIJOLOS.',
 modelo:'OS TRÊS PORQUINHOS FIZERAM CASAS DE GELATINA, DE PUDIM E DE CHOCOLATE.',
 confere:['Mudou de propósito alguma coisa (aqui, o material das casas).',
          'Ainda são os três porquinhos: dá para reconhecer o original.']},

{id:'E06', tipo:'Paródia', grupo:'texto', linhas:3,
 cmd:'MUDE A FRASE DE PROPÓSITO PARA FAZER UMA PARÓDIA. TROQUE ALGUMA COISA E DEIXE O RESTO PARECIDO:',
 quadro:'JOÃO TROCOU A VACA POR FEIJÕES MÁGICOS.',
 modelo:'JOÃO TROCOU A VACA POR SEMENTES DE PIPOCA MÁGICA.',
 confere:['Mudou alguma coisa de propósito (o que João ganhou na troca, por exemplo).',
          'Ainda dá para reconhecer a história de João e o pé de feijão.']},

{id:'E07', tipo:'Paródia de música', grupo:'texto', linhas:3,
 cmd:'FAÇA UMA PARÓDIA DA MÚSICA: MUDE A LETRA, MAS CANTE COM A MESMA MELODIA.',
 quadro:'ATIREI O PAU NO GATO.',
 modelo:'NÃO ATIRE O PAU NO GATO, PORQUE ISSO NÃO SE FAZ.',
 confere:['A letra mudou de propósito.',
          'Dá para cantar do mesmo jeito da música original.']},

/* ---------- palavra: ortografia, plural, dicionário ---------- */
{id:'E08', tipo:'Plural', grupo:'palavra', linhas:2,
 cmd:'ESCREVA O PLURAL DAS PALAVRAS:',
 quadro:'FLOR · AVIÃO · ANIMAL · HOMEM',
 modelo:'FLORES · AVIÕES · ANIMAIS · HOMENS',
 confere:['R ganha ES (flores); ÃO vira ÕES (aviões); L vira IS (animais); M vira NS (homens).',
          'Conte: 4 palavras, 4 acertos para valer "Acertei".']},

{id:'E09', tipo:'Plural', grupo:'palavra', linhas:2,
 cmd:'ESCREVA O PLURAL, SEM ESQUECER DO ARTIGO:',
 quadro:'O LOBO · A CASA · O BALÃO · A LUZ',
 modelo:'OS LOBOS · AS CASAS · OS BALÕES · AS LUZES',
 confere:['O artigo também foi para o plural: O → OS, A → AS.',
          'BALÃO → BALÕES e LUZ → LUZES.']},

{id:'E10', tipo:'Plural', grupo:'palavra', linhas:2,
 cmd:'ESCREVA O PLURAL DAS PALAVRAS:',
 quadro:'MAR · JORNAL · NUVEM · LIMÃO',
 modelo:'MARES · JORNAIS · NUVENS · LIMÕES',
 confere:['MAR termina em R: ganha ES. JORNAL: o L vira IS.',
          'NUVEM: o M vira NS. LIMÃO: ÃO vira ÕES.']},

{id:'E11', tipo:'Complete as palavras', grupo:'palavra', linhas:2,
 cmd:'COMPLETE AS PALAVRAS COM J OU G. DEPOIS, ESCREVA-AS INTEIRAS:',
 quadro:'<div class="lacs"><span class="lac"><span class="lb"></span>ANELA</span><span class="lac"><span class="lb"></span>ELO</span><span class="lac">CA<span class="lb"></span>U</span><span class="lac"><span class="lb"></span>IRAFA</span><span class="lac">LARAN<span class="lb"></span>A</span><span class="lac">MÁ<span class="lb"></span>ICO</span></div>',
 modelo:'JANELA · GELO · CAJU · GIRAFA · LARANJA · MÁGICO',
 confere:['JA, JO, JU: sempre J (janela, caju, laranja).',
          'Com E e I, lembre a palavra: gelo, girafa, mágico são com G.']},

{id:'E12', tipo:'Complete as palavras', grupo:'palavra', linhas:2,
 cmd:'COMPLETE AS PALAVRAS COM G OU GU. DEPOIS, ESCREVA-AS INTEIRAS:',
 quadro:'<div class="lacs"><span class="lac"><span class="lb"></span>ATO</span><span class="lac"><span class="lb"></span>ERRA</span><span class="lac">FO<span class="lb"></span>ETE</span><span class="lac">Á<span class="lb"></span>IA</span><span class="lac"><span class="lb"></span>ORILA</span><span class="lac"><span class="lb"></span>ITARRA</span></div>',
 modelo:'GATO · GUERRA · FOGUETE · ÁGUIA · GORILA · GUITARRA',
 confere:['GA, GO: só G (gato, gorila).',
          'Antes de E e I, para soar guê: GU (guerra, foguete, águia, guitarra).']},

{id:'E13', tipo:'Complete as palavras', grupo:'palavra', linhas:2,
 cmd:'COMPLETE AS PALAVRAS COM C OU QU. DEPOIS, ESCREVA-AS INTEIRAS:',
 quadro:'<div class="lacs"><span class="lac"><span class="lb"></span>ASA</span><span class="lac"><span class="lb"></span>EIJO</span><span class="lac">ES<span class="lb"></span>ILO</span><span class="lac"><span class="lb"></span>OPO</span><span class="lac">MÁ<span class="lb"></span>INA</span><span class="lac"><span class="lb"></span>UBO</span></div>',
 modelo:'CASA · QUEIJO · ESQUILO · COPO · MÁQUINA · CUBO',
 confere:['CA, CO, CU: só C (casa, copo, cubo).',
          'Antes de E e I: QU (queijo, esquilo, máquina).']},

{id:'E14', tipo:'Complete as palavras', grupo:'palavra', linhas:2,
 cmd:'COMPLETE AS PALAVRAS COM CH, NH OU LH. DEPOIS, ESCREVA-AS INTEIRAS:',
 quadro:'<div class="lacs"><span class="lac"><span class="lb"></span>AVE</span><span class="lac">GALI<span class="lb"></span>A</span><span class="lac">FO<span class="lb"></span>A</span><span class="lac">CA<span class="lb"></span>ORRO</span><span class="lac">ARA<span class="lb"></span>A</span><span class="lac">COE<span class="lb"></span>O</span></div>',
 modelo:'CHAVE · GALINHA · FOLHA · CACHORRO · ARANHA · COELHO',
 confere:['CH: chave, cachorro. NH: galinha, aranha. LH: folha, coelho.',
          'Leia em voz alta: com a dupla errada, a palavra não existe.']},

{id:'E15', tipo:'Complete as palavras', grupo:'palavra', linhas:2,
 cmd:'ESCREVA AS PALAVRAS, PONDO H SÓ NAS QUE PRECISAM:',
 quadro:'<div class="lacs"><span class="lac"><span class="lb"></span>OJE</span><span class="lac"><span class="lb"></span>OVO</span><span class="lac"><span class="lb"></span>OTEL</span><span class="lac"><span class="lb"></span>UVA</span><span class="lac"><span class="lb"></span>ISTÓRIA</span><span class="lac"><span class="lb"></span>ILHA</span></div>',
 modelo:'HOJE · OVO · HOTEL · UVA · HISTÓRIA · ILHA',
 confere:['Com H: hoje, hotel, história.',
          'Sem H: ovo, uva, ilha.']},

{id:'E16', tipo:'Ordem alfabética', grupo:'palavra', linhas:2,
 cmd:'ESCREVA AS PALAVRAS EM ORDEM ALFABÉTICA:',
 quadro:'GIRAFA · ABELHA · COELHO · BOLA',
 modelo:'ABELHA · BOLA · COELHO · GIRAFA',
 confere:['Olhe a primeira letra: A, B, C, G.']},

{id:'E17', tipo:'Ordem alfabética', grupo:'palavra', linhas:2,
 cmd:'ESCREVA AS PALAVRAS EM ORDEM ALFABÉTICA:',
 quadro:'CAVALO · COPO · CASA · CUBO · CAMA',
 modelo:'CAMA · CASA · CAVALO · COPO · CUBO',
 confere:['Todas começam com C: olhe a 2ª letra (A, O, U).',
          'CAMA, CASA, CAVALO empatam em CA: a 3ª letra decide (M, S, V).']},

{id:'E18', tipo:'Ordem alfabética', grupo:'palavra', linhas:2,
 cmd:'ESCREVA AS PALAVRAS EM ORDEM ALFABÉTICA:',
 quadro:'JANELA · FOGO · HOTEL · ÁGUIA · LOBO',
 modelo:'ÁGUIA · FOGO · HOTEL · JANELA · LOBO',
 confere:['Olhe a primeira letra: A, F, H, J, L.']},

{id:'E19', tipo:'Crie uma frase', grupo:'palavra', linhas:3,
 cmd:'CRIE UMA FRASE COM UMA PALAVRA QUE COMECE COM H.',
 modelo:'HOJE EU FUI AO HOSPITAL VISITAR O MEU AVÔ.',
 confere:['A palavra com H está escrita com H (hoje, homem, hotel, hospital, horta...).',
          'A frase começa com letra maiúscula e termina com ponto.']},

{id:'E20', tipo:'Crie uma frase', grupo:'palavra', linhas:3,
 cmd:'CRIE UMA FRASE QUE TENHA UMA PALAVRA COM NH E OUTRA COM LH.',
 modelo:'A GALINHA COMEU A FOLHA DA HORTA.',
 confere:['Tem uma palavra com NH (galinha, ninho, caminho...) e uma com LH (folha, coelho, abelha...).',
          'A frase faz sentido e termina com ponto.']},

/* ---------- conceito: com suas palavras ---------- */
{id:'E21', tipo:'Com suas palavras', grupo:'conceito', linhas:4,
 cmd:'COM SUAS PALAVRAS, O QUE É UM CONTO DE FADAS?',
 modelo:'É UMA HISTÓRIA INVENTADA E MUITO ANTIGA, QUE AS PESSOAS CONTAVAM UMAS PARA AS OUTRAS. COMEÇA COM "ERA UMA VEZ", TEM MAGIA E UM PROBLEMA, E NO FIM O PROBLEMA SE RESOLVE.',
 confere:['Disse que é uma história inventada (e antiga).',
          'Lembrou de pelo menos dois elementos: Era uma vez, magia, problema, final feliz.']},

{id:'E22', tipo:'Com suas palavras', grupo:'conceito', linhas:4,
 cmd:'COM SUAS PALAVRAS, QUAL É A DIFERENÇA ENTRE PARÁFRASE E PARÓDIA?',
 modelo:'NA PARÁFRASE, EU CONTO O MESMO TEXTO COM OUTRAS PALAVRAS, SEM MUDAR O SENTIDO. NA PARÓDIA, EU IMITO O TEXTO E MUDO ALGUMA COISA DE PROPÓSITO, MUITAS VEZES PARA FICAR ENGRAÇADO.',
 confere:['Paráfrase: outras palavras, mesmo sentido.',
          'Paródia: imita e muda de propósito.']},

{id:'E23', tipo:'Com suas palavras', grupo:'conceito', linhas:4,
 cmd:'COM SUAS PALAVRAS, QUAL É A DIFERENÇA ENTRE INVENÇÃO E DESCOBERTA? DÊ UM EXEMPLO DE CADA.',
 modelo:'INVENÇÃO É ALGO QUE AS PESSOAS CRIARAM E NÃO EXISTIA ANTES, COMO A LÂMPADA. DESCOBERTA É ENCONTRAR ALGO QUE JÁ EXISTIA, COMO O FOGO.',
 confere:['Invenção: criada, não existia antes (roda, lâmpada, telefone, avião...).',
          'Descoberta: já existia, alguém encontrou (o fogo, uma planta nova, um animal nunca visto).']},

{id:'E24', tipo:'Elementos do conto', grupo:'conceito', linhas:4,
 cmd:'ESCOLHA UM CONTO DE FADAS E ESCREVA: O LUGAR, A MAGIA, O PROBLEMA E A SOLUÇÃO.',
 modelo:'JOÃO E O PÉ DE FEIJÃO. LUGAR: A CASA DE JOÃO E O CASTELO NAS NUVENS. MAGIA: OS FEIJÕES MÁGICOS. PROBLEMA: JOÃO PRECISA FUGIR DO GIGANTE. SOLUÇÃO: JOÃO CORTA O PÉ DE FEIJÃO.',
 confere:['Escreveu os quatro: lugar, magia, problema e solução.',
          'A solução resolve o problema que você escreveu.']},

{id:'E25', tipo:'Elementos do conto', grupo:'conceito', linhas:4,
 cmd:'ESCREVA O COMEÇO DE UM CONTO DE FADAS: DIGA QUEM É O PERSONAGEM E ONDE ELE MORA.',
 modelo:'ERA UMA VEZ UMA PRINCESA QUE MORAVA NUM CASTELO, NO ALTO DE UMA MONTANHA.',
 confere:['Começou com "Era uma vez" (ou "Há muito tempo").',
          'Apresentou o personagem e o lugar.']}
];
