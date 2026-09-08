/* ============================================================
   reserva_treino_H.js — 12 itens AUTORAIS de TREINO (TR93–TR104)
   6 do eixo `placa` (TR93–TR98) · 6 do eixo `ler` (TR99–TR104)

   ATENÇÃO: NÃO SÃO QUESTÕES DE PROVA. Nenhum item aqui saiu de
   prova oficial da Olimpíada de Português. São questões escritas
   para treinar, no estilo e no formato da prova (Categoria G,
   2º ano) — por isso todas trazem origem:'Treino no estilo da prova'.

   OS TEXTOS DO EIXO `ler` SÃO ORIGINAIS, escritos para este banco:
   nenhum verso, nenhuma historinha e nenhum nome de autor foram
   copiados de livro, poema ou prova de ninguém.

   Eixo `placa`: como não temos os desenhos, cada alternativa é a
   descrição em palavras de uma placa que uma criança brasileira de
   7 anos reconhece (forma, cor, se tem barra, o que está dentro).
   O item real 2025·F1·Q4 traz as placas desenhadas; aqui a
   adaptação vem declarada em `nota`, item por item.

   Eixo `ler`: todo item tem `texto` e, por isso, `acende` com as
   linhas (base zero) onde mora a resposta.

   REDAÇÃO DOS COMENTÁRIOS `no`: primeiro o que a pergunta pediu,
   depois o que a alternativa entregou no lugar. Nunca se diz que a
   alternativa errada "é verdade, mas...": para uma criança de 7 anos
   isso soa como permissão para marcá-la. Uma ideia por frase.

   Colar direto dentro de ITENS, em ferramentas/OP_data.js.
   ============================================================ */

{id:'TR93', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'NA ESCOLA DO TEO TEVE UM TREINO: QUANDO O ALARME TOCA, TODO MUNDO SAI DA SALA E VAI PARA O PÁTIO. A PROFESSORA PAROU NO CORREDOR, APONTOU PARA UMA PLACA E DISSE:',
 quadro:'&mdash; OLHEM BEM ESTA PLACA. &Eacute; ELA QUE MOSTRA POR ONDE A GENTE SAI.',
 nota:'Na prova as quatro placas são desenhadas, e o desenho é a própria alternativa. Aqui cada placa vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL PLACA A PROFESSORA APONTOU?',
 opts:[
  {t:'UMA PLACA VERMELHA COM UM EXTINTOR DE INCÊNDIO DESENHADO DENTRO.', no:'A professora pediu a placa que mostra por onde sair. Essa mostra onde fica o extintor, o aparelho de apagar fogo. Extintor não é caminho.'},
  {t:'UMA PLACA VERDE COM UM HOMEM CORRENDO PARA UMA PORTA ABERTA DESENHADO DENTRO.', ok:1},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UMA PESSOA ENTRANDO POR UMA PORTA DESENHADA DENTRO.', no:'Essa placa tem uma porta desenhada, igual à da placa certa. Ela tem também o círculo vermelho cortado, que quer dizer PROIBIDO. Então ela manda NÃO entrar por aquela porta.'},
  {t:'UM TRIÂNGULO AMARELO COM UM PONTO DE EXCLAMAÇÃO DESENHADO DENTRO.', no:'O triângulo amarelo só diz CUIDADO. Essa placa não tem porta nem gente andando. Ela não mostra caminho nenhum.'}
 ],
 dica:'Duas placas têm a mesma porta desenhada. O que muda de uma para a outra é o círculo vermelho cortado.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">placa verde</span><span class="arw">+</span><span class="pc hit">homem correndo para a porta</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">a sa&iacute;da &eacute; por aqui</span></div>'+
        '<div class="pcs"><span class="pc bad">c&iacute;rculo cortado</span><span class="arw">+</span><span class="pc hit">porta</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">proibido entrar por essa porta</span></div>'+
        '<p class="vx">A mesma porta nas duas placas, e elas dizem coisas <b>contr&aacute;rias</b>. Quem decide &eacute; a barra.</p>'+
        '<p class="vx"><span class="dm">Placa que mostra um lugar n&atilde;o tem barra vermelha. A barra serve para proibir.</span></p>',
 porque:'A professora pediu a placa que mostra por onde sair. A placa verde com o homem correndo para a porta aberta é a da saída. A do círculo cortado tem a mesma porta, e com a barra ela proíbe entrar.',
 proximo:'Faça as duas perguntas nas quatro placas: esta mostra ou proíbe? e mostra o quê? Marque só quando as duas fecharem.'},

{id:'TR94', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'NO DOMINGO, O AVÔ LEVOU PILAR PARA BRINCAR NA PRAÇA. ELA IA CORTAR CAMINHO POR CIMA DO GRAMADO, MAS PAROU NA FRENTE DE UMA PLACA E DISSE:',
 quadro:'&mdash; VOV&Ocirc;, AQUI N&Atilde;O PODE PISAR NA GRAMA.',
 nota:'Na prova as quatro placas são desenhadas, e o desenho é a própria alternativa. Aqui cada placa vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL PLACA PILAR VIU?',
 opts:[
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UMA MÃO COLHENDO UMA FLOR DESENHADA DENTRO.', no:'Essa placa tem a barra, então ela proíbe. O desenho de dentro é uma mão colhendo flor. Ela proíbe colher flor, e Pilar falou de pisar na grama.'},
  {t:'UMA PLACA VERDE COM UMA ÁRVORE E UM BANCO DESENHADOS DENTRO, SEM BARRA NENHUMA.', no:'Essa placa mostra a praça, o lugar onde os dois estão. Ela não tem círculo vermelho nem barra. Sem a barra, nenhuma placa proíbe.'},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UM PÉ PISANDO EM CIMA DE UMAS FOLHINHAS DE GRAMA DESENHADO DENTRO.', ok:1},
  {t:'UM TRIÂNGULO AMARELO COM UMA ABELHA DESENHADA DENTRO.', no:'O triângulo amarelo avisa que tem abelha por perto. Essa placa não tem barra e não tem grama desenhada. Pilar disse NÃO PODE.'}
 ],
 dica:'Pilar disse duas coisas ao mesmo tempo: NÃO PODE e PISAR NA GRAMA. Procure a placa que tem as duas.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">c&iacute;rculo vermelho cortado</span><span class="arw">+</span><span class="pc hit">p&eacute; em cima da grama</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">proibido pisar na grama</span></div>'+
        '<div class="pcs"><span class="pc hit">c&iacute;rculo cortado</span><span class="arw">+</span><span class="pc bad">m&atilde;o colhendo flor</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">pro&iacute;be colher flor</span></div>'+
        '<div class="pcs"><span class="pc bad">&aacute;rvore e banco</span><span class="arw">+</span><span class="pc bad">sem barra</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">s&oacute; mostra a pra&ccedil;a</span></div>'+
        '<p class="vx">As duas metades t&ecirc;m de fechar juntas. Uma s&oacute; n&atilde;o serve.</p>',
 porque:'Pilar leu as duas metades da placa. O círculo vermelho cortado quer dizer PROIBIDO. O pé em cima da grama diz o que é proibido. Só uma placa tem as duas coisas.',
 proximo:'Passe pelas quatro placas duas vezes. Na primeira olhe só a barra. Na segunda olhe só o desenho de dentro.'},

{id:'TR95', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'A TURMA DE CLARA FOI PASSEAR NUM MUSEU. NA PORTA DA SALA DOS DINOSSAUROS, CLARA IA ENTRAR MORDENDO UM SANDUÍCHE. ELA OLHOU A PLACA DA PORTA E PAROU:',
 quadro:'&mdash; ESPERA! AQUI DENTRO N&Atilde;O PODE COMER NEM BEBER.',
 nota:'Na prova as quatro placas são desenhadas, e o desenho é a própria alternativa. Aqui cada placa vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL PLACA CLARA VIU NA PORTA?',
 opts:[
  {t:'UMA PLACA COM UM SANDUÍCHE E UM COPO DESENHADOS DENTRO, SEM BARRA NENHUMA.', no:'Essa placa tem o sanduíche e o copo, iguais aos da placa certa. Ela não tem círculo vermelho nem barra. Sem a barra, ela mostra o lugar de comer em vez de proibir.'},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UMA BOLA DESENHADA DENTRO.', no:'Essa placa tem a barra, então ela proíbe. O desenho de dentro é uma bola. Ela proíbe jogar bola, e Clara falou de comer e beber.'},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UM SANDUÍCHE E UM COPO DESENHADOS DENTRO.', ok:1},
  {t:'UMA PLACA COM UM DINOSSAURO DESENHADO DENTRO.', no:'Essa placa mostra qual é a sala do passeio. Ela não tem comida desenhada. Ela também não tem barra vermelha.'}
 ],
 dica:'Duas placas têm sanduíche e copo desenhados. O que muda de uma para a outra é o círculo vermelho cortado.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">c&iacute;rculo vermelho cortado</span><span class="arw">+</span><span class="pc hit">sandu&iacute;che e copo</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">proibido comer e beber</span></div>'+
        '<div class="pcs"><span class="pc bad">sem barra</span><span class="arw">+</span><span class="pc hit">sandu&iacute;che e copo</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">aqui &Eacute; o lugar de comer</span></div>'+
        '<p class="vx">O mesmo desenho dentro, e as duas placas dizem coisas <b>contr&aacute;rias</b>. Quem decide &eacute; a barra.</p>',
 porque:'Clara disse NÃO PODE, que é a barra vermelha. E disse COMER NEM BEBER, que é o sanduíche e o copo. Só uma placa junta as duas coisas.',
 proximo:'Antes de marcar, procure se tem outra placa com o mesmo desenho dentro. Se tiver, compare as duas pela barra.'},

{id:'TR96', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'NO MERCADO, UM MOÇO TINHA ACABADO DE LAVAR O CHÃO E DEIXOU UMA PLACA EM PÉ NO MEIO DO CORREDOR. A MÃE DE HUGO SEGUROU A MÃO DELE E DISSE:',
 quadro:'&mdash; DEVAGAR, HUGO. ESSA PLACA AVISA QUE O CH&Atilde;O EST&Aacute; ESCORREGADIO.',
 nota:'Na prova as quatro placas são desenhadas, e o desenho é a própria alternativa. Aqui cada placa vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL DESSAS PLACAS AVISA QUE O CHÃO ESTÁ ESCORREGADIO?',
 opts:[
  {t:'UM TRIÂNGULO AMARELO COM UMA PESSOA ESCORREGANDO NUM CHÃO MOLHADO DESENHADA DENTRO.', ok:1},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM DUAS CRIANÇAS CORRENDO DESENHADAS DENTRO.', no:'A pergunta é qual placa avisa. Essa tem o círculo vermelho cortado: ela manda NÃO correr. Placa com barra proíbe, ela não avisa.'},
  {t:'UM TRIÂNGULO AMARELO COM UM RAIO DESENHADO DENTRO.', no:'Essa placa é um triângulo amarelo, então ela avisa. O desenho de dentro é um raio. Ela avisa perigo de choque, e não chão escorregadio.'},
  {t:'UMA PLACA COM UM CARRINHO DE COMPRAS DESENHADO DENTRO E UMA SETA AO LADO.', no:'Essa placa mostra onde pegar o carrinho no mercado. Ela não tem ninguém escorregando. Ela não avisa perigo nenhum.'}
 ],
 dica:'Duas placas são triângulos amarelos, e as duas avisam alguma coisa. O que muda é o desenho de dentro.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">tri&acirc;ngulo amarelo</span><span class="arw">&rarr;</span><span class="pc hit">CUIDADO, avisa</span>'+
        '<span class="pc hit">pessoa escorregando</span><span class="arw">&rarr;</span><span class="pc hit">o ch&atilde;o escorrega</span></div>'+
        '<div class="pcs"><span class="pc hit">tri&acirc;ngulo amarelo</span><span class="arw">+</span><span class="pc bad">raio</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">avisa outra coisa: choque</span></div>'+
        '<div class="pcs"><span class="pc bad">c&iacute;rculo cortado</span><span class="arw">+</span><span class="pc bad">crian&ccedil;as correndo</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">pro&iacute;be correr</span></div>'+
        '<p class="vx">O formato manda primeiro: tri&acirc;ngulo amarelo <b>avisa</b>, c&iacute;rculo cortado <b>pro&iacute;be</b>. Depois o desenho diz do qu&ecirc; se trata.</p>',
 porque:'A mãe disse que a placa avisa. Quem avisa é o triângulo amarelo. E o desenho de dentro tem de ser a pessoa escorregando no chão molhado. A do círculo cortado proíbe correr.',
 proximo:'Comece pelo formato de cada placa. Só depois olhe o desenho de dentro. Duas perguntas, sempre nessa ordem.'},

{id:'TR97', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'NO PÁTIO DO PRÉDIO ONDE NINA MORA TEM UMA PAREDE TODA DE VIDRO. NINA CHEGOU COM A BOLA DEBAIXO DO BRAÇO, LEU A PLACA DA PAREDE E GUARDOU A BOLA:',
 quadro:'&mdash; AQUI N&Atilde;O PODE JOGAR BOLA.',
 nota:'Na prova as quatro placas são desenhadas, e o desenho é a própria alternativa. Aqui cada placa vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL PLACA NINA LEU?',
 opts:[
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UMA BOLA DESENHADA DENTRO.', ok:1},
  {t:'UMA PLACA AZUL COM UMA BOLA DESENHADA DENTRO E SEM BARRA NENHUMA.', no:'Essa placa tem a bola, igual à da placa certa. Ela não tem círculo vermelho nem barra. Sem a barra, ela mostra a quadra, o lugar de jogar.'},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UM PATINETE DESENHADO DENTRO.', no:'Essa placa tem a barra, então ela proíbe. O desenho de dentro é um patinete. Ela proíbe o patinete, e Nina falou de bola.'},
  {t:'UMA PLACA COM UM ESCORREGADOR E UM BALANÇO DESENHADOS DENTRO.', no:'Essa placa mostra onde fica o parquinho. Ela não tem bola desenhada. Ela não tem barra vermelha.'}
 ],
 dica:'Duas placas têm bola desenhada. O que muda de uma para a outra é o círculo vermelho cortado.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">c&iacute;rculo vermelho cortado</span><span class="arw">+</span><span class="pc hit">bola</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">proibido jogar bola</span></div>'+
        '<div class="pcs"><span class="pc bad">placa azul, sem barra</span><span class="arw">+</span><span class="pc hit">bola</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">aqui &Eacute; o lugar de jogar</span></div>'+
        '<div class="pcs"><span class="pc hit">c&iacute;rculo cortado</span><span class="arw">+</span><span class="pc bad">patinete</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">pro&iacute;be o patinete</span></div>'+
        '<p class="vx">Uma metade certa n&atilde;o basta. A placa de Nina tem a barra <b>E</b> a bola.</p>',
 porque:'Nina disse NÃO PODE, que é a barra vermelha. E disse JOGAR BOLA, que é a bola desenhada. Só uma placa tem as duas coisas juntas.',
 proximo:'Não marque na primeira placa que tiver a barra. Vá até a quarta e compare os desenhos de dentro.'},

{id:'TR98', eixo:'placa', origem:'Treino no estilo da prova',
 enun:'NO DOMINGO DE MANHÃ, A RUA DO BAIRRO FICA SÓ PARA AS PESSOAS PASSEAREM. UM HOMEM COLOCOU UMA PLACA NA ENTRADA DA RUA. O PAI DE ALICE OLHOU A PLACA E DISSE:',
 quadro:'&mdash; HOJE AQUI N&Atilde;O PODE PASSAR CARRO.',
 nota:'Na prova as quatro placas são desenhadas, e o desenho é a própria alternativa. Aqui cada placa vem descrita em palavras: a forma, a cor, se tem barra e o que está desenhado dentro.',
 pede:'QUAL PLACA O PAI DE ALICE VIU?',
 opts:[
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UMA MOTO DESENHADA DENTRO.', no:'Essa placa tem a barra, então ela proíbe. O desenho de dentro é uma moto. O pai de Alice falou de carro.'},
  {t:'UMA PLACA AZUL COM UM CARRO DESENHADO DENTRO E SEM BARRA NENHUMA.', no:'Essa placa tem o carro, igual ao da placa certa. Ela não tem círculo vermelho nem barra. Sem a barra, ela mostra o caminho dos carros.'},
  {t:'UM TRIÂNGULO AMARELO COM UM SEMÁFORO DESENHADO DENTRO.', no:'O triângulo amarelo avisa que tem um semáforo logo à frente. Essa placa avisa, ela não proíbe. E não tem carro desenhado dentro.'},
  {t:'UM CÍRCULO VERMELHO CORTADO POR UMA BARRA, COM UM CARRO DESENHADO DENTRO.', ok:1}
 ],
 dica:'O pai falou de CARRO, e não de moto. Ache as placas que proíbem e olhe bem o que está desenhado dentro de cada uma.',
 truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
 visual:'<div class="pcs"><span class="pc hit">c&iacute;rculo vermelho cortado</span><span class="arw">+</span><span class="pc hit">carro</span>'+
        '<span class="arw">&rarr;</span><span class="pc hit">proibido passar carro</span></div>'+
        '<div class="pcs"><span class="pc hit">c&iacute;rculo cortado</span><span class="arw">+</span><span class="pc bad">moto</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">pro&iacute;be a moto</span></div>'+
        '<div class="pcs"><span class="pc bad">placa azul, sem barra</span><span class="arw">+</span><span class="pc hit">carro</span>'+
        '<span class="arw">&rarr;</span><span class="pc bad">caminho dos carros</span></div>'+
        '<p class="vx">Tr&ecirc;s placas passam em <b>uma</b> das duas perguntas. S&oacute; a certa passa nas duas.</p>',
 porque:'O pai disse NÃO PODE, que é a barra vermelha. E disse CARRO, que é o desenho de dentro. A da moto tem a barra com outro desenho. A azul tem o carro sem barra nenhuma.',
 proximo:'Leia a fala da história duas vezes e sublinhe as duas coisas que ela diz. Depois procure a placa que tem as duas.'},

{id:'TR99', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O POEMA ABAIXO:',
 texto:['MEU DENTE DA FRENTE BALANÇA,',
        'BALANÇA E NÃO QUER PARAR.',
        'EU EMPURRO COM A PONTA DA LÍNGUA,',
        'MAS ELE NÃO QUER SE SOLTAR.',
        'HOJE EU MORDI UMA MAÇÃ DURA',
        'E O DENTE SAIU NUM SEGUNDO!',
        'AGORA EU SORRIO NO ESPELHO',
        'COM O MAIOR BURACO DO MUNDO.'],
 pede:'QUAL TÍTULO MAIS COMBINA COM O POEMA INTEIRO?',
 opts:[
  {t:'A MAÇÃ DURA.', no:'O título é do poema inteiro. Essa fala da maçã, que aparece em uma linha só. Do começo ao fim, o poema fala do dente.'},
  {t:'O DENTE QUE CAIU.', ok:1},
  {t:'O MAIOR BURACO DO MUNDO.', no:'Essa frase saiu da última linha. O título não sai de uma linha: ele é do poema inteiro. E o poema inteiro fala do dente.'},
  {t:'A FADA DO DENTE.', no:'Fada do dente é coisa que a gente sabe de casa. No poema não tem fada nenhuma. O título tem de sair de dentro do poema.'}
 ],
 dica:'O título fala do poema INTEIRO, não de uma linha só. Desça a régua até o fim e depois pergunte: do que ele fala do começo ao fim?',
 truque:'O título é do poema inteiro, não de uma linha. Uma palavra solta não manda.',
 acende:[0,3,5],
 visual:'<p class="vx">O poema come&ccedil;a com <b class="mk">MEU DENTE DA FRENTE BALAN&Ccedil;A</b>, no meio diz que <b class="mk">ELE N&Atilde;O QUER SE SOLTAR</b> e depois que <b class="mk">O DENTE SAIU NUM SEGUNDO</b>.</p>'+
        '<p class="vx">Do come&ccedil;o ao fim o assunto &eacute; um s&oacute;: o <b>dente</b>.</p>'+
        '<div class="pcs"><span class="pc hit">balan&ccedil;a</span><span class="arw">&rarr;</span><span class="pc hit">n&atilde;o solta</span><span class="arw">&rarr;</span><span class="pc hit">caiu</span></div>',
 porque:'O poema conta a história do dente do começo ao fim. Ele balança, não solta e por fim cai quando o menino morde a maçã. A maçã e o buraco são pedaços dessa história.',
 proximo:'Leia o poema todo com a régua antes de olhar os títulos. Depois pergunte: do que ele fala do começo ao fim?'},

{id:'TR100', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['HOJE DE MANHÃ FAZIA SOL, MAS LARA SAIU DE CASA COM AS BOTAS DE BORRACHA NOS PÉS.',
        'A AMIGA DELA RIU E PERGUNTOU POR QUE ELA ESTAVA COM AQUELAS BOTAS.',
        'LARA EXPLICOU QUE, NA VOLTA DA ESCOLA, AS DUAS IAM PASSAR PELA RUA DE TERRA.',
        'ONTEM CHOVEU A NOITE INTEIRA E A RUA DE TERRA FICOU CHEIA DE POÇAS.',
        'NA VOLTA, A AMIGA CHEGOU EM CASA COM O TÊNIS TODO SUJO DE BARRO.',
        'AÍ ELA DISSE: — DA PRÓXIMA VEZ EU TAMBÉM VOU DE BOTA!'],
 pede:'POR QUE LARA SAIU DE CASA COM AS BOTAS DE BORRACHA?',
 opts:[
  {t:'PORQUE HOJE DE MANHÃ FAZIA SOL.', no:'A pergunta é o motivo da bota. Sol não é motivo para calçar bota. O texto fala do sol para mostrar que a bota não era por causa do tempo da manhã.'},
  {t:'PORQUE A RUA POR ONDE ELA IA VOLTAR ESTAVA CHEIA DE POÇAS.', ok:1},
  {t:'PORQUE ESTAVA CHOVENDO NA HORA DE IR PARA A ESCOLA.', no:'Essa resposta vem da vida lá fora: quando chove, a gente calça bota. No texto está escrito que de manhã fazia SOL.'},
  {t:'PORQUE A AMIGA DELA TAMBÉM IA DE BOTA.', no:'Essa frase saiu da última linha. A amiga falou em usar bota depois, na volta. Quando Lara calçou a bota, isso ainda não tinha acontecido.'}
 ],
 dica:'A pergunta tem POR QUE. Volte com a régua e ache a linha em que Lara explica. A resposta dela vem logo em seguida.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[2,3],
 visual:'<p class="vx"><span class="mk">NA VOLTA DA ESCOLA, AS DUAS IAM PASSAR PELA RUA DE TERRA</span></p>'+
        '<p class="vx"><span class="mk">ONTEM CHOVEU A NOITE INTEIRA E A RUA DE TERRA FICOU CHEIA DE PO&Ccedil;AS</span></p>'+
        '<div class="pcs"><span class="pc hit">rua de terra com po&ccedil;a</span><span class="arw">&rarr;</span><span class="pc hit">bota de borracha</span></div>'+
        '<p class="vx"><span class="dm">O sol da manh&atilde; est&aacute; no texto para mostrar que a bota n&atilde;o era por causa do tempo de agora.</span></p>',
 porque:'Lara explica ela mesma. Na volta as duas iam passar pela rua de terra. Essa rua ficou cheia de poças por causa da chuva de ontem. A bota era para a volta.',
 proximo:'Quando a pergunta começa com POR QUE, procure a linha em que alguém explica. Marque só depois de achar essa linha.'},

{id:'TR101', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O POEMA ABAIXO:',
 texto:['A RUA DO MERCADO ACORDA CEDO,',
        'CHEIA DE CAIXA E DE CAMINHÃO.',
        'CHEIA DE GENTE QUE FALA ALTO,',
        'CHEIA DE PRESSA E DE CONFUSÃO.',
        'O MOÇO DAS BANANAS GRITA O PREÇO,',
        'A MOÇA DO PEIXE GRITA MAIS ALTO.',
        'LÁ NA MINHA RUA, DE TARDINHA,',
        'SÓ SE OUVE O SINO DA IGREJINHA.'],
 pede:'SEGUNDO O POEMA, COMO É A RUA DO MERCADO?',
 opts:[
  {t:'É UM LUGAR CHEIO E BARULHENTO.', ok:1},
  {t:'É UMA RUA QUE FICA VAZIA DE MANHÃ CEDO.', no:'Rua vazia de manhã cedo é o que a gente imagina sozinho. O poema diz o contrário. Essa rua acorda cedo e já está cheia.'},
  {t:'É UMA RUA ONDE SE VENDE BANANA E PEIXE.', no:'A pergunta é COMO É a rua. Essa fala do que se vende nela. Dizer o que se vende não diz como o lugar é.'},
  {t:'É UM LUGAR CALADO, ONDE SÓ SE OUVE UM SINO.', no:'Essa frase saiu da última linha. A última linha fala da outra rua, a rua de quem escreve o poema. A pergunta é sobre a rua do mercado.'}
 ],
 dica:'Junte as palavras que o poema usa para falar dessa rua. Uma delas se repete três vezes: procure com a régua.',
 truque:'Quando a pergunta é sobre como é um lugar, junte as palavras que o texto usa para descrever ele.',
 acende:[1,2,3,5],
 visual:'<div class="pcs"><span class="pc hit">CHEIA de caixa</span><span class="pc hit">CHEIA de gente</span><span class="pc hit">CHEIA de pressa</span></div>'+
        '<div class="pcs"><span class="pc hit">FALA ALTO</span><span class="pc hit">GRITA O PRE&Ccedil;O</span><span class="pc hit">GRITA MAIS ALTO</span></div>'+
        '<p class="vx">Somando as palavras que o poema repete: <b>cheia</b> tr&ecirc;s vezes e <b>grita</b> duas. Isso &eacute; um lugar cheio e barulhento.</p>'+
        '<p class="vx"><span class="dm">A &uacute;ltima linha fala do sino da OUTRA rua, a rua de quem escreve o poema.</span></p>',
 porque:'O poema diz três vezes que a rua está CHEIA. E mostra gente que FALA ALTO e que GRITA duas vezes. Juntando essas palavras, a rua do mercado é um lugar cheio e barulhento.',
 proximo:'Passe a régua no texto e circule a palavra que se repete. Junte as palavras circuladas antes de marcar.'},

{id:'TR102', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O TEXTO ABAIXO:',
 texto:['HOJE É SÁBADO, E MATEUS ESTÁ FAZENDO UM BOLO COM A MÃE.',
        'ANTEONTEM ELE FOI AO MERCADO COM O PAI E ESCOLHEU OS OVOS.',
        'AMANHÃ A PRIMA DELE VEM ALMOÇAR E VAI COMER UM PEDAÇO.',
        'NO MÊS PASSADO A AVÓ MANDOU A RECEITA DENTRO DE UMA CARTA.',
        'MATEUS DIZ QUE O BOLO DA AVÓ É O MELHOR DO MUNDO.'],
 pede:'COM BASE NO TEXTO, O QUE ACONTECEU ANTES DE TUDO?',
 opts:[
  {t:'MATEUS COMEÇOU A FAZER O BOLO COM A MÃE.', no:'Essa é a primeira coisa contada no texto. Mas ela é de HOJE. A ordem em que o texto conta não é a ordem em que aconteceu.'},
  {t:'A AVÓ MANDOU A RECEITA DENTRO DE UMA CARTA.', ok:1},
  {t:'A PRIMA DELE COMEU UM PEDAÇO DO BOLO.', no:'Bolo de almoço a gente já imagina comido. O texto marca AMANHÃ. O que ainda não aconteceu não pode ser o mais antigo.'},
  {t:'MATEUS DISSE QUE O BOLO DA AVÓ É O MELHOR DO MUNDO.', no:'Essa frase saiu da última linha. Ela não tem hora marcada: não diz ontem, nem mês passado, nem amanhã. Sem tempo, ela não entra na fila.'}
 ],
 dica:'Procure as palavrinhas de tempo: HOJE, ANTEONTEM, AMANHÃ, NO MÊS PASSADO. Ponha-as em fila antes de responder.',
 truque:'Monte a fila do tempo: semana passada, ontem, hoje, semana que vem. Só então responda.',
 acende:[0,1,2,3],
 visual:'<div class="pcs"><span class="pc hit">M&Ecirc;S PASSADO<br>a receita</span><span class="arw">&rarr;</span><span class="pc">ANTEONTEM<br>os ovos</span>'+
        '<span class="arw">&rarr;</span><span class="pc">HOJE<br>o bolo</span><span class="arw">&rarr;</span><span class="pc bad">AMANH&Atilde;<br>a prima</span></div>'+
        '<p class="vx">O texto conta fora de ordem. Na fila do tempo, a receita &eacute; a mais antiga. E o almo&ccedil;o da prima ainda nem aconteceu.</p>',
 porque:'O texto conta os fatos fora de ordem. Na fila do tempo: mês passado a receita, anteontem os ovos, hoje o bolo, amanhã a prima. O mais antigo é a carta da avó.',
 proximo:'Sublinhe as palavrinhas de tempo e monte a fila antes de olhar as respostas.'},

{id:'TR103', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA O POEMA ABAIXO. A ÚLTIMA LINHA ESTÁ FALTANDO:',
 texto:['HOJE DE MANHÃ, EM CIMA DA CAMA,',
        'MINHA MÃE DEIXOU SEPARADA',
        'A MINHA SAPATILHA COR-DE-ROSA.',
        'NA MINHA SEMANA TEM UMA REGRA:',
        'MAIÔ E TOUCA SÓ NA QUINTA, PRA NADAR,',
        'SAPATILHA SÓ NA TERÇA, PRA DANÇAR,',
        'BOLA E CHUTEIRA NA SEXTA, PRA JOGAR.',
        'ENTÃO EU JÁ SEI QUE HOJE É',
        '_______________________'],
 pede:'MARQUE O VERSO QUE COMPLETA O POEMA.',
 opts:[
  {t:'QUINTA-FEIRA, DIA DE NADAR.', no:'Em cima da cama estava a sapatilha. A quinta é o dia do maiô e da touca. A regra do poema dá a quinta para outra coisa.'},
  {t:'TERÇA-FEIRA, DIA DE DANÇAR.', ok:1},
  {t:'SEXTA-FEIRA, DIA DE JOGAR.', no:'Essa frase saiu da última linha da regra. A sexta é o dia da bola e da chuteira. Em cima da cama não tinha bola nenhuma.'},
  {t:'SEGUNDA-FEIRA, DIA DE COMEÇAR.', no:'Segunda é o dia em que a semana começa, e ela vem à cabeça sozinha. A regra do poema não fala em segunda.'}
 ],
 dica:'As quatro respostas rimam, então a rima não decide nada aqui. Ache na regra a linha que fala da sapatilha.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[2,5],
 visual:'<p class="vx">Em cima da cama estava <b class="mk">A MINHA SAPATILHA COR-DE-ROSA</b>.</p>'+
        '<p class="vx">E a regra diz: <b class="mk">SAPATILHA S&Oacute; NA TER&Ccedil;A, PRA DAN&Ccedil;AR</b>.</p>'+
        '<div class="pcs"><span class="pc hit">sapatilha</span><span class="arw">&rarr;</span><span class="pc hit">ter&ccedil;a</span>'+
        '<span class="pc bad">mai&ocirc; e touca</span><span class="arw">&rarr;</span><span class="pc bad">quinta</span>'+
        '<span class="pc bad">bola e chuteira</span><span class="arw">&rarr;</span><span class="pc bad">sexta</span></div>'+
        '<p class="vx"><span class="dm">NADAR, DAN&Ccedil;AR, JOGAR e COME&Ccedil;AR rimam todas. Quem decide n&atilde;o &eacute; a rima: &eacute; o que estava em cima da cama.</span></p>',
 porque:'A regra do poema diz que sapatilha é só na terça. Em cima da cama a mãe deixou a sapatilha cor-de-rosa. Então hoje é terça-feira, o dia de dançar.',
 proximo:'Quando as quatro respostas rimarem, deixe a rima de lado. Procure a regra no texto e aplique ela na cena de hoje.'},

{id:'TR104', eixo:'ler', origem:'Treino no estilo da prova',
 enun:'LEIA A HISTORINHA ABAIXO:',
 texto:['TODO DIA, DEPOIS DA AULA, MIGUEL CORRIA PARA SER O PRIMEIRO DA FILA DO LANCHE.',
        'ELE EMPURRAVA OS COLEGAS, PASSAVA NA FRENTE E ÀS VEZES DERRUBAVA A MOCHILA DOS OUTROS.',
        'UM DIA MIGUEL TROPEÇOU NA PORTA E O SUCO DELE CAIU TODO NO CHÃO.',
        'ELE PEDIU AJUDA, MAS NINGUÉM QUIS DIVIDIR O LANCHE COM ELE.',
        'A PROFESSORA DISSE: — QUEM EMPURRA OS AMIGOS FICA SEM AMIGO NA HORA DE PRECISAR.',
        'NO DIA SEGUINTE, MIGUEL ENTROU NA FILA CALADO E ESPEROU A SUA VEZ.',
        'AÍ CLARA CHEGOU E DIVIDIU O BOLO DELA COM ELE.'],
 pede:'QUE LIÇÃO ESSA HISTORINHA ENSINA?',
 opts:[
  {t:'QUE MIGUEL DERRUBOU O SUCO NO CHÃO.', no:'A pergunta é qual é a lição. Essa conta uma coisa que aconteceu na historinha. Contar o que aconteceu não ensina nada.'},
  {t:'QUE É PRECISO CORRER PARA CHEGAR NA FRENTE DA FILA.', no:'Essa resposta vem da vida lá fora: quem corre chega primeiro. Na historinha, Miguel correu, empurrou e ficou sozinho. A historinha ensina o contrário.'},
  {t:'QUEM TRATA MAL OS AMIGOS FICA SOZINHO NA HORA QUE PRECISA DE AJUDA.', ok:1},
  {t:'QUE BOLO É MELHOR DE DIVIDIR DO QUE SUCO.', no:'Essa frase saiu da última linha, onde aparece o bolo de Clara. A historinha não compara bolo com suco. Ela fala do jeito de Miguel tratar os colegas.'}
 ],
 dica:'Tem uma linha em que alguém DIZ a lição com todas as letras. Volte com a régua e procure a fala da professora.',
 truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.',
 acende:[1,3,4],
 visual:'<p class="vx"><span class="mk">ELE EMPURRAVA OS COLEGAS</span> <span class="dm">&mdash; o jeito dele antes</span></p>'+
        '<p class="vx"><span class="mk">NINGU&Eacute;M QUIS DIVIDIR O LANCHE COM ELE</span> <span class="dm">&mdash; o que aconteceu por causa disso</span></p>'+
        '<p class="vx"><span class="mk">QUEM EMPURRA OS AMIGOS FICA SEM AMIGO NA HORA DE PRECISAR</span> <span class="dm">&mdash; a professora diz a li&ccedil;&atilde;o</span></p>'+
        '<div class="pcs"><span class="pc bad">empurrou</span><span class="arw">&rarr;</span><span class="pc bad">ficou sozinho</span>'+
        '<span class="pc hit">esperou a vez</span><span class="arw">&rarr;</span><span class="pc hit">ganhou bolo</span></div>',
 porque:'A própria professora diz a lição: quem empurra os amigos fica sem amigo na hora de precisar. A historinha mostra isso duas vezes. Miguel empurrou e ficou sozinho; depois esperou a vez e foi ajudado.',
 proximo:'Procure primeiro se alguém do texto disse a lição em voz alta. Se ninguém disse, junte o que o personagem fez e o que aconteceu com ele.'},
