# -*- coding: utf-8 -*-
"""Frases do video LP3 — roteiro v2 (../_roteiro.md, secao "Roteiro do VIDEO v2 (VALE ESTE)").

Cada frase = (legenda, texto_tts). A legenda guarda a grafia correta; o texto_tts
so muda a GRAFIA para a Thalita pronunciar letra solta como letra
(ex.: "H" -> "agá", "J" -> "jota"). O texto e o do roteiro, so quebrado em frases.
Regra da cena 11: nenhuma silaba isolada e lida (so palavras inteiras e "C com A, O e U").
"""

TITULO = "Português — Contos de fadas, paráfrase, paródia e ortografia"

CENAS = [
  ("genero", "O que é conto de fadas", [
    ("Conto de fadas é uma história inventada, bem antiga.", "Conto de fadas é uma história inventada, bem antiga."),
    ("As pessoas contavam umas para as outras, de avó para neto, até que ela foi escrita nos livros.",
     "As pessoas contavam umas para as outras, de avó para neto, até que ela foi escrita nos livros."),
    ("Chapeuzinho Vermelho, João e o pé de feijão, Os Três Porquinhos, Cinderela e Branca de Neve são contos de fadas.",
     "Chapeuzinho Vermelho, João e o pé de feijão, Os Três Porquinhos, Cinderela e Branca de Neve são contos de fadas."),
  ]),
  ("cmf", "Começo, meio e fim", [
    ("Todo conto de fadas tem começo, meio e fim.", "Todo conto de fadas tem começo, meio e fim."),
    ("No começo: Era uma vez... e a gente conhece os personagens e o lugar.",
     "No começo: Era uma vez... e a gente conhece os personagens e o lugar."),
    ("No meio, aparece um problema.", "No meio, aparece um problema."),
    ("No fim, o problema é resolvido, e muitas vezes: viveram felizes para sempre.",
     "No fim, o problema é resolvido, e muitas vezes: viveram felizes para sempre."),
  ]),
  ("elem", "Os elementos", [
    ("Preste atenção nos elementos.", "Preste atenção nos elementos."),
    ("O tempo: era uma vez, há muito tempo.", "O tempo: era uma vez, há muito tempo."),
    ("O lugar: um reino, um castelo, uma floresta.", "O lugar: um reino, um castelo, uma floresta."),
    ("Os personagens: o herói, o vilão e os seres mágicos, como fadas, bruxas, gigantes e animais que falam.",
     "Os personagens: o herói, o vilão e os seres mágicos, como fadas, bruxas, gigantes e animais que falam."),
    ("E sempre tem magia.", "E sempre tem magia."),
  ]),
  ("tabela", "Os elementos nas duas histórias", [
    ("Em Chapeuzinho Vermelho, o lugar é a floresta, a magia é um lobo que fala,",
     "Em Chapeuzinho Vermelho, o lugar é a floresta, a magia é um lobo que fala,"),
    ("o problema é o lobo enganar a menina, e a solução é o caçador salvar a menina e a vovó.",
     "o problema é o lobo enganar a menina, e a solução é o caçador salvar a menina e a vovó."),
    ("Em João e o pé de feijão, a magia são os feijões mágicos, a galinha dos ovos de ouro e a harpa que canta.",
     "Em João e o pé de feijão, a magia são os feijões mágicos, a galinha dos ovos de ouro e a harpa que canta."),
    ("O problema é fugir do Gigante, e a solução é cortar o pé de feijão.",
     "O problema é fugir do Gigante, e a solução é cortar o pé de feijão."),
  ]),
  ("parafrase", "Paráfrase", [
    ("Paráfrase é contar com as suas palavras, sem mudar o sentido.",
     "Paráfrase é contar com as suas palavras, sem mudar o sentido."),
    ("O segredo são os sinônimos, palavras que querem dizer a mesma coisa:",
     "O segredo são os sinônimos, palavras que querem dizer a mesma coisa:"),
    ("menina e garota, vovó e avó, floresta e mata, doces e guloseimas.",
     "menina e garota, vovó e avó, floresta e mata, doces e guloseimas."),
    ("Chapeuzinho levou doces para a vovó.", "Chapeuzinho levou doces para a vovó."),
    ("Paráfrase: a garota levou guloseimas para a avó.", "Paráfrase: a garota levou guloseimas para a avó."),
    ("Mudaram as palavras.", "Mudaram as palavras."),
    ("O sentido ficou igual.", "O sentido ficou igual."),
  ]),
  ("parodia", "Paródia", [
    ("Paródia é imitar um texto conhecido e mudar alguma coisa de propósito, quase sempre para ficar engraçado:",
     "Paródia é imitar um texto conhecido e mudar alguma coisa de propósito, quase sempre para ficar engraçado:"),
    ("os três porquinhos fizeram casas de chocolate!", "os três porquinhos fizeram casas de chocolate!"),
    ("Dá para fazer paródia de música também: a mesma melodia, com a letra nova.",
     "Dá para fazer paródia de música também: a mesma melodia, com a letra nova."),
    ("“Ciranda, cirandinha, vamos todos cirandar” virou:", "Ciranda, cirandinha, vamos todos cirandar virou:"),
    ("“Ciranda, cirandinha, vamos todos estudar!”", "ciranda, cirandinha, vamos todos estudar!"),
  ]),
  ("pp", "Paráfrase ou paródia?", [
    ("Para saber, pergunte:", "Para saber, pergunte:"),
    ("o sentido ficou igual? É paráfrase.", "o sentido ficou igual? É paráfrase."),
    ("Mudou de propósito, imitando o original? É paródia.", "Mudou de propósito, imitando o original? É paródia."),
  ]),
  ("letraH", "Letra H", [
    ("Algumas palavras começam com H.", "Algumas palavras começam com agá."),
    ("O H no começo não faz som nenhum, mas é escrito:", "O agá no começo não faz som nenhum, mas é escrito:"),
    ("hoje, homem, hotel, hospital, hipopótamo, helicóptero, história, horta, herói.",
     "hoje, homem, hotel, hospital, hipopótamo, helicóptero, história, horta, herói."),
    ("Ovo, uva, ilha e escola não têm H.", "Ovo, uva, ilha e escola não têm agá."),
  ]),
  ("jg", "J ou G", [
    ("O som de jê pode ser escrito com J ou com G.", "O som de jê pode ser escrito com jota ou com gê."),
    ("Com A, O e U, é sempre J: janela, jacaré, joia, caju, laranja, feijão.",
     "Com á, ó e u, é sempre jota: janela, jacaré, joia, caju, laranja, feijão."),
    ("Com E e I, pode ser J ou G:", "Com é e i, pode ser jota ou gê:"),
    ("jeito, jiló e jipe têm J; gelo, gente, girafa, gigante e mágico têm G.",
     "jeito, jiló e jipe têm jota; gelo, gente, girafa, gigante e mágico têm gê."),
    ("Essas a gente aprende palavra por palavra.", "Essas a gente aprende palavra por palavra."),
  ]),
  ("ggu", "G ou GU", [
    ("Gato, galinha, gorila, fogo: G com A, O e U faz som de guê.",
     "Gato, galinha, gorila, fogo: gê com á, ó e u faz som de guê."),
    ("Antes do E e do I, para ter esse som, entra o U quietinho:",
     "Antes do é e do i, para ter esse som, entra o u quietinho:"),
    ("guerra, foguete, fogueira, guitarra, águia.", "guerra, foguete, fogueira, guitarra, águia."),
    ("Sem o U, GE e GI soam jê: gelo, girafa.", "Sem o u, gê e gi soam jê: gelo, girafa."),
    ("Gigante tem os dois sons!", "Gigante tem os dois sons!"),
  ]),
  ("caque", "C ou QU", [
    ("Casa, cavalo, copo, coelho, cubo: C com A, O e U.", "Casa, cavalo, copo, coelho, cubo: cê com á, ó e u."),
    ("Antes do E e do I, o mesmo som se escreve com QU:", "Antes do é e do i, o mesmo som se escreve com quê u:"),
    ("queijo, quente, quiabo, esquilo, máquina, mosquito.", "queijo, quente, quiabo, esquilo, máquina, mosquito."),
  ]),
  ("digrafo", "CH, NH, LH", [
    ("CH, NH e LH são duas letras que fazem um som só.", "cê agá, ene agá e éle agá são duas letras que fazem um som só."),
    ("CH: chave, chuva, chapéu, chocolate.", "cê agá: chave, chuva, chapéu, chocolate."),
    ("NH: ninho, galinha, banho, caminho.", "ene agá: ninho, galinha, banho, caminho."),
    ("LH: folha, coelho, abelha, olho.", "éle agá: folha, coelho, abelha, olho."),
    ("Uma letra muda tudo: mola e molha, fila e filha, sono e sonho.",
     "Uma letra muda tudo: mola e molha, fila e filha, sono e sonho."),
  ]),
  ("plural", "Plural", [
    ("Plural é mais de um.", "Plural é mais de um."),
    ("Termina em vogal, põe S: casa, casas; lobo, lobos.", "Termina em vogal, põe ésse: casa, casas; lobo, lobos."),
    ("Termina em R ou Z, põe ES: flor, flores; luz, luzes.", "Termina em érre ou zê, põe ê ésse: flor, flores; luz, luzes."),
    ("ÃO vira ÕES: avião, aviões; balão, balões.", "ão vira ões: avião, aviões; balão, balões."),
    ("AL vira AIS: animal, animais; jornal, jornais.", "á éle vira á i ésse: animal, animais; jornal, jornais."),
    ("M vira NS: homem, homens; nuvem, nuvens.", "ême vira ene ésse: homem, homens; nuvem, nuvens."),
    ("E o artigo também: o lobo, os lobos; a casa, as casas.", "E o artigo também: o lobo, os lobos; a casa, as casas."),
  ]),
  ("dicio", "Dicionário", [
    ("No dicionário, as palavras estão em ordem alfabética.", "No dicionário, as palavras estão em ordem alfabética."),
    ("Se a primeira letra é igual, olhe a segunda: bala, bola, bule.",
     "Se a primeira letra é igual, olhe a segunda: bala, bola, bule."),
    ("Se a segunda também é igual, olhe a terceira: cama, casa, cavalo.",
     "Se a segunda também é igual, olhe a terceira: cama, casa, cavalo."),
    ("Cada palavra explicada é um verbete.", "Cada palavra explicada é um verbete."),
    ("No alto da página, as palavras-guia mostram a primeira e a última palavra daquela página.",
     "No alto da página, as palavras-guia mostram a primeira e a última palavra daquela página."),
    ("E uma palavra pode ter mais de um significado: manga é fruta, e manga é parte da camisa.",
     "E uma palavra pode ter mais de um significado: manga é fruta, e manga é parte da camisa."),
  ]),
  ("invent", "Invenções e descobertas", [
    ("Invenção é algo que as pessoas criaram e que não existia antes:",
     "Invenção é algo que as pessoas criaram e que não existia antes:"),
    ("a roda, a lâmpada, o telefone, a bicicleta, o avião.", "a roda, a lâmpada, o telefone, a bicicleta, o avião."),
    ("Quem inventa é o inventor;", "Quem inventa é o inventor;"),
    ("o brasileiro Santos Dumont é conhecido como o pai da aviação.",
     "o brasileiro Santos Dumont é conhecido como o pai da aviação."),
    ("Descoberta é encontrar algo que já existia, como o fogo, uma planta nova ou um animal que ninguém conhecia.",
     "Descoberta é encontrar algo que já existia, como o fogo, uma planta nova ou um animal que ninguém conhecia."),
  ]),
]
