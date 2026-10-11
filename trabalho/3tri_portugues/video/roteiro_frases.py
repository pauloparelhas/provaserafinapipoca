# -*- coding: utf-8 -*-
"""Frases do video LP3 (roteiro em ../_roteiro.md, secao "Roteiro do VIDEO").

Cada frase = (legenda, texto_tts). A legenda guarda a grafia correta; o texto_tts
so muda a GRAFIA para a Thalita pronunciar letra/silaba solta como letra/silaba
(ex.: "H" -> "agá", "GA, GO, GU" -> "gá, gô, gu"). O sentido e o do roteiro.
"""

TITULO = "Português — Era uma vez e Invenções"

CENAS = [
  ("conto", "Contos de fadas", [
    ("Era uma vez...", "Era uma vez..."),
    ("É assim que começam os contos de fadas.", "É assim que começam os contos de fadas."),
    ("Neles tem mocinho, tem vilão, tem um lugar como a floresta ou o castelo,",
     "Neles tem mocinho, tem vilão, tem um lugar como a floresta ou o castelo,"),
    ("tem magia, um problema para resolver, e um final feliz:",
     "tem magia, um problema para resolver, e um final feliz:"),
    ("e viveram felizes para sempre.", "e viveram felizes para sempre."),
  ]),
  ("chapeu", "Chapeuzinho Vermelho", [
    ("Chapeuzinho Vermelho levava uma cesta de doces para a vovó doente.",
     "Chapeuzinho Vermelho levava uma cesta de doces para a vovó doente."),
    ("A mãe avisou: não saia do caminho!", "A mãe avisou: não saia do caminho!"),
    ("Mas na floresta apareceu o Lobo Mau.", "Mas na floresta apareceu o Lobo Mau."),
    ("Ele correu pelo atalho e chegou antes.", "Ele correu pelo atalho e chegou antes."),
    ("Deitou na cama, vestido de vovó.", "Deitou na cama, vestido de vovó."),
    ("— Vovó, que olhos grandes você tem!", "Vovó, que olhos grandes você tem!"),
    ("— É para te ver melhor!", "É para te ver melhor!"),
    ("— Que boca grande!", "Que boca grande!"),
    ("— É para te comer!", "É para te comer!"),
    ("Ainda bem que o caçador ouviu e salvou as duas.", "Ainda bem que o caçador ouviu e salvou as duas."),
  ]),
  ("joao", "João e o pé de feijão", [
    ("João trocou a vaca da família por feijões mágicos.", "João trocou a vaca da família por feijões mágicos."),
    ("A mãe ficou brava e jogou os feijões pela janela.", "A mãe ficou brava e jogou os feijões pela janela."),
    ("De noite, nasceu um pé de feijão gigante, até as nuvens.", "De noite, nasceu um pé de feijão gigante, até as nuvens."),
    ("Lá em cima, João achou o castelo do Gigante, e levou a galinha dos ovos de ouro.",
     "Lá em cima, João achou o castelo do Gigante, e levou a galinha dos ovos de ouro."),
    ("O Gigante desceu atrás dele, mas João cortou o pé de feijão com o machado.",
     "O Gigante desceu atrás dele, mas João cortou o pé de feijão com o machado."),
    ("E o Gigante caiu.", "E o Gigante caiu."),
  ]),
  ("parodia", "Paráfrase e paródia", [
    ("Contar a mesma história com outras palavras, sem mudar nada do que acontece, é fazer uma paráfrase.",
     "Contar a mesma história com outras palavras, sem mudar nada do que acontece, é fazer uma paráfrase."),
    ("A menina da capa vermelha foi levar guloseimas para a avó: é a mesma história.",
     "A menina da capa vermelha foi levar guloseimas para a avó: é a mesma história."),
    ("Agora, se a gente muda a história de propósito, para ficar diferente ou engraçada, é uma paródia.",
     "Agora, se a gente muda a história de propósito, para ficar diferente ou engraçada, é uma paródia."),
    ("Chapeuzinho Verde foi de bicicleta levar pizza para o vovô!",
     "Chapeuzinho Verde foi de bicicleta levar pizza para o vovô!"),
    ("Mudou a história? É paródia.", "Mudou a história? É paródia."),
    ("Não mudou? É paráfrase.", "Não mudou? É paráfrase."),
  ]),
  ("letraH", "Letra H", [
    ("Algumas palavras começam com H.", "Algumas palavras começam com agá."),
    ("O H no começo não faz som nenhum.", "O agá no começo não faz som nenhum."),
    ("Hoje, hora, homem, hipopótamo, helicóptero, hospital, história.",
     "Hoje, hora, homem, hipopótamo, helicóptero, hospital, história."),
    ("A gente fala “oje”, mas escreve com H: hoje.", "A gente fala ôje, mas escreve com agá: hoje."),
  ]),
  ("jg", "J ou G (som de jê)", [
    ("O som de jê pode ser escrito com J ou com G.", "O som de jê pode ser escrito com jota ou com gê."),
    ("Com A, O e U, é sempre J: jacaré, jogo, caju.", "Com á, ó e u, é sempre jota: jacaré, jogo, caju."),
    ("Com E e I, pode ser J ou G:", "Com é e i, pode ser jota ou gê:"),
    ("jeito e jipe têm J; gelo e girafa têm G.", "jeito e jipe têm jota; gelo e girafa têm gê."),
    ("Essas, a gente aprende palavra por palavra.", "Essas, a gente aprende palavra por palavra."),
  ]),
  ("ggu", "G ou GU (som de guê)", [
    ("Gato, gorila, agulha: GA, GO, GU.", "Gato, gorila, agulha: gá, gô, gu."),
    ("Mas para fazer esse som antes do E e do I, precisa de um U que fica quietinho:",
     "Mas para fazer esse som antes do é e do i, precisa de um u que fica quietinho:"),
    ("guerra, foguete, guitarra, águia.", "guerra, foguete, guitarra, águia."),
    ("Sem o U, GE e GI fazem som de jê: gelo, girafa.", "Sem o u, gê e gi fazem som de jê: gelo, girafa."),
    ("Gigante tem os dois: GI, com som de jê, e GAN, com som de guê.",
     "Gigante tem os dois: gi, com som de jê, e gã, com som de guê."),
  ]),
  ("dicio", "Dicionário", [
    ("No dicionário, as palavras estão em ordem alfabética.", "No dicionário, as palavras estão em ordem alfabética."),
    ("Se duas palavras começam com a mesma letra, olhe a segunda: bala, bola, bule.",
     "Se duas palavras começam com a mesma letra, olhe a segunda: bala, bola, bule."),
    ("O dicionário mostra o significado da palavra e como ela se escreve.",
     "O dicionário mostra o significado da palavra e como ela se escreve."),
    ("Cada palavra explicada é um verbete.", "Cada palavra explicada é um verbete."),
    ("No alto da página, as palavras-guia mostram a primeira e a última palavra daquela página.",
     "No alto da página, as palavras-guia mostram a primeira e a última palavra daquela página."),
  ]),
  ("invent", "Invenções e descobertas", [
    ("Invenção é algo que as pessoas criaram e que não existia antes:",
     "Invenção é algo que as pessoas criaram e que não existia antes:"),
    ("a roda, a lâmpada, o telefone, o avião.", "a roda, a lâmpada, o telefone, o avião."),
    ("Quem inventa é o inventor.", "Quem inventa é o inventor."),
    ("O brasileiro Santos Dumont é conhecido como o pai da aviação.",
     "O brasileiro Santos Dumont é conhecido como o pai da aviação."),
    ("Descoberta é diferente: é encontrar algo que já existia, como o fogo.",
     "Descoberta é diferente: é encontrar algo que já existia, como o fogo."),
  ]),
  ("caque", "CA, CO, CU · QUE, QUI", [
    ("Casa, copo, cubo: CA, CO, CU.", "Casa, copo, cubo: cá, cô, cu."),
    ("Para fazer esse mesmo som antes do E e do I, usamos QU, com o U quietinho:",
     "Para fazer esse mesmo som antes do é e do i, usamos quê u, com o u quietinho:"),
    ("queijo, quiabo, esquilo, máquina.", "queijo, quiabo, esquilo, máquina."),
  ]),
  ("digrafo", "CH, NH, LH", [
    ("Algumas duplas de letras fazem um som só.", "Algumas duplas de letras fazem um som só."),
    ("CH: chave, chuva, chapéu.", "cê agá: chave, chuva, chapéu."),
    ("NH: ninho, galinha, caminho.", "ene agá: ninho, galinha, caminho."),
    ("LH: folha, coelho, olho.", "éle agá: folha, coelho, olho."),
    ("Uma letrinha muda tudo: mola e molha, fila e filha, sono e sonho.",
     "Uma letrinha muda tudo: mola e molha, fila e filha, sono e sonho."),
  ]),
  ("plural", "Plural", [
    ("Uma casa, duas casas: plural é quando tem mais de um.", "Uma casa, duas casas: plural é quando tem mais de um."),
    ("Quase sempre, é só pôr S: lobo, lobos.", "Quase sempre, é só pôr ésse: lobo, lobos."),
    ("Termina em R ou Z, põe ES: flor, flores; luz, luzes.", "Termina em érre ou zê, põe ês: flor, flores; luz, luzes."),
    ("Termina em ÃO, vira ÕES: avião, aviões; balão, balões.", "Termina em ão, vira ões: avião, aviões; balão, balões."),
    ("Termina em L, vira IS: animal, animais.", "Termina em éle, vira ís: animal, animais."),
    ("Termina em M, vira NS: homem, homens.", "Termina em ême, vira ene ésse: homem, homens."),
    ("E o artigo também vai para o plural: o lobo, os lobos.", "E o artigo também vai para o plural: o lobo, os lobos."),
  ]),
  ("fecho", "Tudo junto", [
    ("Era uma vez, H que não faz som, J e G, G e GU,", "Era uma vez, agá que não faz som, jota e gê, gê e gê u,"),
    ("dicionário, invenções, CA e QUE, CH, NH, LH, e o plural.",
     "dicionário, invenções, cá e quê, cê agá, ene agá, éle agá, e o plural."),
    ("E viveram felizes para sempre.", "E viveram felizes para sempre."),
  ]),
]
