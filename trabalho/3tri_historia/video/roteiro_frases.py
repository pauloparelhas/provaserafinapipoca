# -*- coding: utf-8 -*-
"""Frases do video HIS3 (Historia Y2, 3o tri, prova 27/10) — fonte: ../_roteiro.md.
Universo "Detetives do Tempo": o Tic (despertador) conduz; os personagens do jogo aparecem.

Cada frase = (legenda, texto_tts, legenda_pt).
- legenda: o que aparece na tela;
- texto_tts: o que a Thalita le (pt-BR);
- legenda_pt: a legenda do .vtt (igual a legenda: a materia e em portugues).
"""

TITULO = "Detetives do Tempo — História, 3º trimestre"

def F(t, tts=None):
    return (t, tts or t, t)

CENAS = [
  ("missao", "A missão", [
    F("No Museu da Memória ficam guardadas as pistas do passado."),
    F("Mas a Rainha Traça está roendo tudo: cartas, fotos, mapas e brinquedos!"),
    F("Trim! Eu sou o Tic. Vamos ser detetives do tempo?"),
  ]),
  ("fontes", "O que são fontes históricas?", [
    F("Fontes históricas são aquilo que a gente pode ver, ouvir, tocar ou ler para aprender sobre outras épocas."),
    F("São pistas do passado. Tudo ao nosso redor pode contar uma história."),
    F("O detetive observa, pergunta e compara as pistas."),
  ]),
  ("quatro", "As 4 cartas de fonte", [
    F("Fonte oral: alguém conta. Relatos e histórias contadas por pessoas."),
    F("Fonte escrita: alguém escreveu. Diários, leis, jornais e cartas."),
    F("Fonte visual: a gente vê uma imagem. Pinturas, fotografias e mapas."),
    F("Fonte material: a gente toca um objeto. Brinquedos, roupas, construções e utensílios."),
  ]),
  ("pegadinhas", "Cuidado com as pegadinhas!", [
    F("A foto de uma boneca é fonte visual. A boneca de verdade é fonte material."),
    F("Um vídeo de alguém contando uma história continua sendo fonte oral."),
    F("A vovó escreveu uma carta? Escrita. A vovó contou falando? Oral."),
  ]),
  ("escola", "A escola tem história", [
    F("A escola tem uma história cheia de acontecimentos, pessoas e mudanças."),
    F("Fotos antigas de turmas, cadernos, boletins, bilhetes, uniformes e troféus guardam pistas."),
    F("Os documentos da vida escolar mostram como era o ensino, as regras e o dia a dia da escola."),
    F("Guardar documentos preserva memórias."),
  ]),
  ("mudou", "Mudou ou continuou?", [
    F("Mudança é o que ficou diferente com o tempo. Permanência é o que continuou igual."),
    F("Na escola da Dona Lúcia, o quadro de giz deu lugar à lousa digital: mudança."),
    F("Mas conversar com os alunos e ensinar com alegria continuou: permanência."),
  ]),
  ("olhar", "Cada um vê de um jeito", [
    F("Toda fonte foi criada por alguém, num tempo e num lugar, com um objetivo."),
    F("O detetive pergunta: quem produziu? Para quem foi feita? Qual era o objetivo?"),
    F("O anúncio e a propaganda servem para vender."),
    F("Cada pessoa olha de um jeito. Por isso o historiador compara várias fontes."),
  ]),
  ("carteiro", "Seu Francisco, o carteiro", [
    F("Seu Francisco entregava cartas a pé, com uma bolsa de couro."),
    F("Depois veio a bicicleta, depois a moto."),
    F("Hoje os carteiros usam aparelhos com tela, e as mensagens chegam em segundos pelo celular."),
    F("A profissão de carteiro continua existindo, de um jeito diferente."),
  ]),
  ("joao", "Doutor João, o médico", [
    F("No começo, o Doutor João usava estetoscópio, termômetro de mercúrio, papel e caneta."),
    F("Os exames demoravam dias. Hoje chegam pelo celular, e tem até consulta por vídeo."),
    F("Mas o cuidado com cada paciente continua igual."),
  ]),
  ("fazenda", "Seu Pedro e a fazenda", [
    F("Antes, o Seu Pedro arava a terra com um arado puxado por bois."),
    F("Depois vieram os tratores. Hoje ele usa o celular para saber se vai chover."),
    F("Lá atrás, as pessoas eram nômades. Com a agricultura, surgiram as primeiras cidades."),
  ]),
  ("profissoes", "Profissões que sumiram e que nasceram", [
    F("O acendedor de lampião acendia os postes um a um. Com a energia elétrica, essa profissão desapareceu."),
    F("A tecnologia também criou profissões novas, como desenvolvedor de aplicativos."),
    F("Cada profissão tem suas ferramentas: a câmera de tripé era do fotógrafo; a marreta e a colher, do pedreiro."),
  ]),
  ("rios", "Rios antigos e patrimônio", [
    F("As cidades mais antigas cresceram perto dos rios: o Nilo, no Egito; o Tigre e o Eufrates, na Mesopotâmia; e o Rio Amarelo, na China."),
    F("Patrimônio é o que é importante para a memória de um povo."),
    F("Museus e estátuas são patrimônio material. Capoeira e festa junina são patrimônio imaterial."),
  ]),
  ("tempo", "A linha do tempo", [
    F("Os registros, na ordem: jornal, carta, diário, álbum de fotos, foto digital e redes sociais."),
    F("O relógio marca o tempo igual para todos, mas cada um sente o tempo de um jeito."),
  ]),
  ("final", "Você faz história", [
    F("O que você faz hoje será a fonte histórica de amanhã."),
    F("Para entender para onde vamos, precisamos descobrir de onde viemos. Boa prova, detetive!"),
  ]),
]
