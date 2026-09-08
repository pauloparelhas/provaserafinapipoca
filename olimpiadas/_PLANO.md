# PLANO — Olimpíada de Português (OP bê-á-bá) · Categoria G · 1ª fase · 10/09/2026

Material de véspera para a Mariana (7 anos, 2º ano). Escrito em 08/09/2026 à noite.
Este arquivo é um plano com decisões tomadas; não contém conteúdo final nem código.

Fontes lidas integralmente: as 6 provas em `_fontes_md/` (2023, 2024, 2025 × fase 1 e 2),
os gabaritos oficiais lidos nas páginas 1 dos PNG (`_fontes/png/OP_<ano>_catG_fase<n>_gabarito_p1.png`,
célula vermelha), `_fontes/DOSSIE_2025.md`, o `CLAUDE.md` do projeto, `ferramentas/serafina-core.js/.css`,
`ferramentas/MAT2_simulado.html`, `index.html` e `sw.js`.

Diagnóstico que orienta tudo: a mãe disse que a compreensão de texto "não é legal" e que a Mari
"pula linha o tempo todo". O pai pediu material objetivo, focado na idade, que ENSINE a cada erro,
sem metalinguagem e sem cansar, com meta de gabaritar. Prova em português, toda em CAIXA ALTA,
15 questões, 4 alternativas (A–D), 1h30.

---

## 1. Taxonomia de cobrança — o que a 1ª fase repete ano a ano

Classifiquei as 45 questões das três primeiras fases (2023, 2024, 2025), uma a uma
(tabela completa no Apêndice A). Nove famílias dão conta de todas as 45:

| # | Família (nome de criança, é o que ela vai ver) | 2023 F1 | 2024 F1 | 2025 F1 | Total | % |
|---|---|---|---|---|---|---|
| 1 | **Ler e entender** (texto, poema, fábula: achar a informação, o título, o sentimento, a causa, a lição, a ordem no tempo, o jeito de falar, a rima que encaixa) | Q3, Q14 | Q8, Q10, Q12, Q13, Q14 | Q13, Q14 | **9** | 20% |
| 2 | **Brincar com letras** (embaralhar letras, trocar as vogais de lugar, mudar/mover uma letra) | Q11, Q12 | Q3 | Q6, Q11, Q12 | **6** | 13% |
| 3 | **Contar com o dedo** (contar vogais, consoantes, uma letra repetida, espaços entre palavras coladas, palavras com letra trocada) | Q1, Q6, Q8, Q15 | Q4 | Q7 | **6** | 13% |
| 4 | **Sílabas** (juntar sílabas dadas, pegar a 1ª/2ª sílaba de figuras, desembaralhar sílabas trocadas) | Q7, Q10 | Q11, Q15 | Q3 | **5** | 11% |
| 5 | **Frase com buraco** (a palavrinha que combina: OS/UM; a palavra que faz sentido: SOPA/CHUVA; a continuação lógica) | Q2, Q5 | Q2, Q6 | Q2 | **5** | 11% |
| 6 | **Intruso e palavra que troca** (o que não pertence ao grupo; a palavra que pode entrar no lugar de outra; adivinhar por pistas) | Q13 | Q7, Q9 | Q8, Q10 | **5** | 11% |
| 7 | **Alfabeto e charada de letra** (ordem alfabética dentro da palavra ou numa lista; "quem sou eu?" sobre uma letra) | — | Q1, Q5 | Q1, Q5 | **4** | 9% |
| 8 | **Código, tabela e placa** (símbolo→letra/sílaba; ler uma placa) | Q9 | — | Q4, Q15 | **3** | 7% |
| 9 | **Som da letra** (que palavra começa com som diferente; que letra não muda de som) | Q4 | — | Q9 | **2** | 4% |

Observações que mudam o plano:

- **A prova não é "só interpretação de texto"**: leitura e entendimento é a maior família (20%),
  mas 80% da prova é jogo com letras, sílabas, contagem e lacuna. A boa notícia: essas famílias
  têm truque mecânico, ensinável em minutos, e é onde a criança que lê devagar pode
  compensar. A má notícia: são exatamente as questões em que quem "pula linha" erra por
  distração (perde um O de MACACO, esquece o segundo O de GOLFINHO). Portanto o dedo e a
  régua servem às 9 famílias, não só à leitura.
- **Tendência 2024→2025**: as duas provas com formato vigente (4 alternativas) têm mais
  charada e código (2025 Q1, Q5, Q8, Q15) e menos contagem bruta (2023 tinha 4 contagens).
  O simulado espelha 2024+2025, não 2023.
- **Padrão dos distratores**: a alternativa errada quase sempre é uma "quase-certa" que
  para cedo (LAÇO usa só duas das três sílabas; HIENA continua a lista em vez de preencher
  o buraco; GOTA é palavra real mas não é parte de camisa). O truque de toda família termina
  com o mesmo gesto: **"conferiu as quatro? só depois marca"**.

**Alto rendimento para véspera** (truque replicável, 2–3 min para ensinar, ≥4 ocorrências):
famílias 1 a 8. A família 1 (ler e entender) é a mais pesada e a mais fraca da Mari, então
recebe a régua como função e o maior número de itens no simulado.

**Não compensa perseguir**: família 9 (som da letra: 2 ocorrências, exige falar em voz alta e
comparar sons — ensino de 1 minuto no cartão da família 3, sem questão própria no simulado);
"palavras iguais com sentidos diferentes" (2023 Q13, uma ocorrência, formato de 5 alternativas);
"jeito de falar da atendente" (2024 Q13, uma ocorrência, sutil demais). Esses três entram no
banco só como reserva, sem cartão de truque.

---

## 2. O material teórico — "Caixa de truques"

**Formato escolhido: 9 cartões de truque, um por família (mais o cartão zero, da régua),
numa única tela que se percorre de um em um.** Cada cartão tem sempre a mesma anatomia,
para a criança saber o que esperar:

1. **O truque em uma frase** (linguagem de criança, lida pelo TTS pt-BR com um toque).
2. **Uma questão real da prova, resolvida na tela passo a passo** — a criança toca
   "próximo passo" e vê o dedo/régua fazendo o truque (as letras se acendem, a vogal ganha
   um pontinho, a linha do texto se ilumina). Nada de explicação em bloco: cada passo é uma
   ação visível.
3. **"Agora você"**: uma questão real da MESMA família, com o comentário didático da seção 4
   se errar. Acertou: passa ao próximo cartão. Errou: vê o comentário e ganha uma "irmã"
   (outra questão da família), sem penalidade.

Tempo por cartão: 3 minutos (1 de truque, 1 de exemplo, 1 de "agora você"). Total: 25–30
minutos, feitos em DUAS sentadas (cartões 0–4 numa; 5–8 na outra). A régua (cartão 0) abre
as duas sentadas.

Por que essa forma e não uma apostila: criança de 7 anos não lê teoria; ela imita um gesto
que viu funcionar. O cartão mostra o gesto (dedo, risco, pontinho, régua), faz ela repetir
uma vez com resposta imediata, e para. Um resumo escrito seria lido pelo pai e esquecido
pela filha. Também não cabe vídeo, flashcard ou jogo de fases: o pai pediu foco, e o que
transfere para a prova de papel é o gesto com o dedo, não a mecânica do jogo.

### Os truques, família por família (texto voltado à criança)

Regra de escrita: nenhuma palavra de gramática. Não existe "anagrama", "sinônimo",
"substantivo", "consciência fonológica", "vogal" fica (a escola já usa, e a prova usa:
2023 Q1, 2024 Q4, 2025 Q7 escrevem VOGAIS/CONSOANTES no enunciado). "Sílaba" fica pelo
mesmo motivo (2025 Q3, Q8; 2024 Q11). Todo o resto vira palavra do dia a dia: "peça",
"buraco", "intruso", "régua", "acender".

**Cartão 0 — A régua (ler sem pular linha)**
Truque: "Uma linha acesa de cada vez. O dedo fica embaixo da linha; a linha acaba, o dedo
desce UMA só." Exemplo: o poema de 2025 F1 Q13 (Pedro Bandeira), 8 linhas, lidas com a
régua da tela. Na prova: "seu dedo ou a borracha é a régua."

**Cartão 1 — Ler e entender: "A resposta mora no texto"**
Truque: "Leia a pergunta primeiro. Se ela tem POR QUE, O QUE, QUANDO, QUEM: volte com a
régua e ache a frase que responde. Ela está no papel, não na sua cabeça."
Sub-truques (um passo cada, no exemplo):
- Título do poema = do que o poema INTEIRO fala, não a última linha (2024 F1 Q8: o poema fala
  de férias em todas as estrofes; a última fala de escola, e "VOLTA ÀS AULAS" é a armadilha).
- Lição da fábula = o que os bichos deviam ter feito e não fizeram (2023 F1 Q14: todos
  aprovaram a ideia do guizo, ninguém quis amarrar: "FALAR É FÁCIL, DIFÍCIL É FAZER").
- Ordem no tempo: "semana passada < ontem < hoje < semana que vem" (2024 F1 Q14).
- Leia as QUATRO respostas até o fim antes de marcar.
Exemplo resolvido: 2025 F1 Q13. "Agora você": 2024 F1 Q12 (a ruazinha).

**Cartão 2 — Brincar com letras: "Cada letra vale uma vez"**
Truque: "Escreva a palavra da resposta e risque uma letra da caixa para cada letra dela.
Sobrou letra na caixa, ou faltou? Está errada." (2025 F1 Q11: O-F-H-L-N-O-I-G só fecha com
GOLFINHO; GAFANHOTO pede A, que não existe.)
Sub-truques: "Trocar as vogais: só as vogais mudam de lugar; as outras letras ficam paradas"
(2025 F1 Q6: GALO → GOLA; 2024 F1 Q3: GELO → GOLE). "Mover uma letra: leia a frase, ache a
palavra esquisita, tire UMA letra dela e dê para a outra" (2025 F1 Q12: o H sai de GALHO e
entra em GALO).
Exemplo resolvido: 2025 F1 Q6. "Agora você": 2025 F1 Q11.

**Cartão 3 — Contar com o dedo: "Pontinho embaixo, depois conta"**
Truque: "Vogal é A, E, I, O, U. Ponha um pontinho embaixo de cada vogal, uma por uma. Só no
fim conte os pontinhos." (2025 F1 Q7: ARARA tem só A; MACACO parece só A, mas o O do fim
tem pontinho.) Para espaços entre palavras coladas: "leia devagar e faça um risquinho onde
uma palavra acaba e outra começa; conte os risquinhos" (2023 F1 Q6). Para letra repetida:
"o dedo passa letra por letra; cada R que ele pisa vale um" (2023 F1 Q8).
Mini-truque do som (família 9, sem cartão próprio): "Quando a pergunta fala de SOM, fale as
palavras em voz alta, baixinho. GELO e GUERRA começam com a mesma letra e com som diferente"
(2023 F1 Q4).
Exemplo resolvido: 2025 F1 Q7. "Agora você": 2024 F1 Q4.

**Cartão 4 — Sílabas: "Bata palma, use todas as peças"**
Truque: "Cada palma é uma peça. Use TODAS as peças que a prova deu, uma vez cada, em
qualquer ordem. Sobrou peça? Errado. Faltou? Errado." (2025 F1 Q3: LA+CO+SA só fecha com
SACOLA; LAÇO gasta duas peças e para.) Para figuras: "Fale o nome da figura batendo palma e
pegue a peça que a pergunta pediu (a primeira, a segunda)" (2023 F1 Q10; 2024 F1 Q11:
GA-LO, CA-VA-LO, E-LE-FAN-TE → CAFANGA).
Exemplo resolvido: 2025 F1 Q3. "Agora você": 2024 F1 Q15 (sílabas trocadas entre palavras).

**Cartão 5 — Frase com buraco: "Leia a frase inteira com a palavra dentro"**
Truque: "Coloque cada uma das quatro palavras no buraco e leia a frase toda, do começo. Só
uma deixa a frase certinha. A pista mora do lado do buraco." (2023 F1 Q2: "____ CACHORROS"
— CACHORROS é mais de um, então OS; 2025 F1 Q2: "NUVENS" + "CAIR" só combinam com CHUVA.)
Para continuação: "a segunda parte tem que explicar a primeira" (2024 F1 Q6: não conseguia
ler PORQUE esqueceu os óculos).
Exemplo resolvido: 2025 F1 Q2. "Agora você": 2024 F1 Q2.

**Cartão 6 — Intruso e palavra que troca**
Truque do intruso: "O que os outros três têm de igual? Quem não tem isso é o intruso."
(2025 F1 Q10: três são frutas; ALICATE é ferramenta. 2024 F1 Q7: NADAR e MERGULHAR são
coisas que se faz; MAR é um lugar.)
Truque da palavra que troca: "Tire a palavra velha, ponha a nova, leia a frase de novo. Continua
dizendo a mesma coisa?" (2024 F1 Q9: "A CHUVA CESSOU E SE FOI" → "A CHUVA TERMINOU E SE
FOI" combina; "COMEÇOU E SE FOI" briga.)
Truque das pistas (2025 F1 Q8): "Uma pista de cada vez; a cada pista, risque quem não passa.
Quem sobrar é a resposta."
Exemplo resolvido: 2024 F1 Q9. "Agora você": 2025 F1 Q10.

**Cartão 7 — Alfabeto e charada de letra**
Truque: "Cante o alfabeto com o dedo andando nas letras: A B C D E F G. Onde o dedo pula, tem
buraco." (2025 F1 Q5: A, B, C, D, E, _, G → falta F → FALCÃO; HIENA é a armadilha de quem
pensa "o que vem depois de G".) Para ordem dentro da palavra: "cante o alfabeto e veja se as
letras da palavra aparecem nessa ordem" (2024 F1 Q1: A-M-O-R sim; A-L-M-A não, o A volta).
Charada: "A letra fala dela mesma. Pense na FORMA dela e no SOM dela. 'Final do alfabeto' é Z"
(2024 F1 Q5). "Parecida com anzol e com som que confunde" é J (2025 F1 Q1).
Exemplo resolvido: 2025 F1 Q5. "Agora você": 2024 F1 Q1.

**Cartão 8 — Código, tabela e placa**
Truque: "Um símbolo de cada vez: dedo no símbolo, dedo na tabela, escreva a peça. Só junte
tudo no fim." (2025 F1 Q15: Ღ=AN, •=TES, ⁂=SÓ... → ANTES SÓ DO QUE MAL ACOMPANHADO.)
Placa: "Círculo vermelho cortado = PROIBIDO. O desenho de dentro diz o que é proibido"
(2025 F1 Q4).
Exemplo resolvido: 2025 F1 Q15 (a tabela de símbolos é texto, dá para renderizar).
"Agora você": 2024 F2 Q15 (código de letras de CARLITO, ESPORTE → POSTE; símbolos são
texto Unicode, renderizáveis).

---

## 3. A leitura sem pular linha — a régua como FUNÇÃO do produto

Decisão: a régua não é um conselho; é o modo padrão de mostrar qualquer texto com 3 linhas
ou mais, nos dois produtos (truques e simulado).

**Mecanismo na tela (componente `leitura`):**

- Todo texto (poema, fábula, história, lista) é renderizado linha a linha, cada linha um
  elemento tocável, **em CAIXA ALTA como na prova**, fonte grande, entrelinha 1,6 (a prova
  tem entrelinha apertada; na tela damos folga para ela aprender o gesto, e o cartão 0 avisa
  que no papel a folga é o dedo).
- Ao abrir, **só a primeira linha está acesa**; as outras ficam esmaecidas (opacidade ~0,35),
  legíveis mas claramente "ainda não".
- A criança toca a linha acesa (ou o botão grande "Desce a régua", sempre no mesmo lugar,
  abaixo do texto — controle fora do texto, padrão do projeto): a linha atual ganha uma
  marca de "lida" e a régua desce UMA linha. Tocar uma linha lá embaixo não pula: a régua
  só anda uma por vez. Isso é o antídoto mecânico do pulo.
- Botão "Ouvir esta linha" lê a linha acesa com o TTS pt-BR (`say()`, nunca automático).
- Quando a última linha é lida, o texto inteiro acende e as alternativas aparecem. Antes
  disso as alternativas ficam ocultas: não há como responder sem ter descido a régua até o
  fim. (No simulado, o pai pode desligar isso no cadeado de configuração, mas o padrão é
  ligado: o objetivo é treinar o gesto, não medir velocidade.)
- **A régua volta no comentário de erro** (seção 4): quando a família é "Ler e entender", o
  comentário reacende só a linha onde mora a resposta e esmaece o resto. A criança vê que a
  resposta estava numa linha que ela passou.
- No enunciado curto (uma ou duas linhas) e nas alternativas não há régua; ali o apoio é a
  entrelinha folgada e o tamanho da fonte (A+/A- do topo).

**Onde aparece:** cartão 0 (a régua é ensinada com o poema de 2025 F1 Q13); em todos os
cartões de truque que têm texto; em toda questão do simulado com texto de 3+ linhas
(2023 Q3 e Q14; 2024 Q8, Q10, Q12, Q13, Q14; 2025 Q7, Q8, Q13, Q14); e no comentário de
erro da família 1.

**Transferência para o papel:** o cartão 0 termina com uma frase única, lida pelo TTS:
"Na prova não tem tela. Seu dedo é a régua: ele fica embaixo da linha e só desce quando a
linha acaba." Os pais reforçam a mesma frase na hora da prova.

---

## 4. O simulado

**Tamanho e formato:** 15 questões, 4 alternativas (A–D), uma tela por questão, barra de
progresso, setas voltar/avançar sempre visíveis, botão "refazer esta questão", resultado
final com "Refazer as que errei" — tudo herdado de `MAT2_simulado.html`. Sem escolha de
temas nem de tamanho na tela inicial: dois botões, "Aquecer (5 questões)" e "Simulado
(15 questões)". Sem relógio (1h30 para 15 questões é folga; o que ela precisa é ler duas
vezes, não correr).

**Distribuição das 15 (espelha 2024+2025):**

| Família | Questões no simulado |
|---|---|
| Ler e entender | 3 |
| Brincar com letras | 2 |
| Contar com o dedo | 2 |
| Sílabas | 2 |
| Frase com buraco | 2 |
| Intruso e palavra que troca | 2 |
| Alfabeto e charada de letra | 1 |
| Código, tabela e placa | 1 |

A ordem é embaralhada a cada rodada; dentro de cada família, o motor sorteia do banco sem
repetir enquanto houver item inédito.

**Banco (todos os itens são questões reais; nenhum enunciado inventado):**
- Prioridade 1: 2025 F1 (15) e 2024 F1 (15), verbatim. Adaptações só onde a questão
  depende de figura: 2024 Q3 passa a dizer "o objeto que gela bebidas é o GELO"; 2024 Q11
  escreve os nomes das sombras (GALO – CAVALO – ELEFANTE); 2025 Q4 (placas desenhadas) fica
  FORA do simulado e entra só no cartão 8 como regra verbal.
- Prioridade 2: 2023 F1 reduzida a 4 alternativas (cortar uma errada por questão, a mais
  fraca), com 2023 Q7 e Q10 nomeando as figuras (BORBOLETA; CORAÇÃO – CASTELO – BOCA – FACA)
  e 2023 Q9 (letra→desenho) fora.
- Prioridade 3 (reserva por família, para as "irmãs" e para a 2ª rodada): itens das
  2ªs fases que caem nas mesmas famílias — 2025 F2 Q1 (FELIZ→ALEGRE), Q4 (GALOPE esconde
  GALO), Q7 (sílabas que sobram), Q8 (pipoqueiro), Q9 (CANELA–JANELA–PANELA), Q13
  (ordem alfabética dos bichinhos), Q14 (dia da semana), Q15 (balão furado); 2024 F2 Q1
  (mais sílabas), Q2 (PERTO=PRÓXIMO), Q3 (INVERNO), Q4 (letras diferentes), Q5
  (COLOSSAL=GIGANTE), Q6 (GRIPADA), Q10 (veterinário), Q15 (código); 2023 F2 Q6 (FRESCO),
  Q10 (sílabas → A VIDA É BELA), Q13 (título de Helena Kolody).
  Gabaritos de todas as 90 questões no Apêndice B.
- Cada item do banco carrega: `eixo`, `origem` (ano/fase/questão), enunciado, texto (linhas),
  4 alternativas com a certa marcada, `dica` (o que a bandeira mostra ANTES de responder:
  só o nome do truque e um empurrão, nunca a resposta) e `erro` (o comentário abaixo).

**O comentário didático de erro — o ponto central**

O que a criança vê ao errar, sempre na mesma ordem e no mesmo lugar (abaixo das
alternativas, empurrando o botão "Próxima" para depois dele):

1. A alternativa dela fica vermelha e a certa fica verde (herdado). Sem "errou", sem X grande;
   o texto de cabeçalho é "Olha o truque".
2. **O nome do truque** — a mesma frase do cartão, palavra por palavra, para ela reconhecer
   ("Cada letra vale uma vez"). Reconhecer é o que faz a próxima do mesmo estilo dar certo.
3. **O truque aplicado NESTA questão, visualmente** — não em prosa: as letras como peças que
   se acendem/riscam, os pontinhos embaixo das vogais, a linha do texto reacesa pela régua,
   a frase com a palavra dentro do buraco marcada com certo/errado. Dois renderizadores dão
   conta de todas as famílias: `pecas` (fichas de letra ou sílaba com estado: usada, sobrou,
   faltou, trocou) e `marcar` (texto com trechos acesos/esmaecidos, que cobre régua, frase,
   vogais e tabela).
4. **Por que a dela não serve** — uma linha só, sobre a alternativa que ela marcou
   (o banco tem uma frase por distrator; o motor mostra só a do escolhido).
5. **"Na próxima, faça assim:"** — uma frase imperativa, o gesto.
6. Botão "Ouvir" (TTS lê 2, 4 e 5). Botão "Próxima".

Depois de um erro, o motor **insere na sequência uma questão-irmã** da mesma família (badge
"de novo, igualzinha"), sorteada da reserva. A irmã não entra na nota das 15; aparece no
resultado como "as que você aprendeu: N". É o mecanismo que atende ao pedido literal do pai:
errou, entendeu, acertou uma do mesmo estilo em seguida, enquanto o truque está fresco.
"Refazer as que errei" no fim continua existindo para a segunda passada.

A DICA da bandeira (antes de responder) é diferente do comentário: mostra só o item 2 e um
empurrão sem resposta ("Vogal é A E I O U. Pontinho embaixo de cada uma.").

### Exemplo 1 — família "Brincar com letras" · 2025 · Fase 1 · Q6 (gabarito A)

Enunciado (verbatim): OLGA DECIDIU BRINCAR COM AS LETRAS DO SEU NOME, TROCANDO A POSIÇÃO
DAS VOGAIS. ASSIM, "OLGA" VIROU "ALGO". SE TROCARMOS AS VOGAIS DE LUGAR, QUAL DAS PALAVRAS
ABAIXO SE TRANSFORMARÁ EM UMA PARTE DE UMA CAMISA? (A) GALO (B) GATO (C) GELO (D) GIRA.

Suponha que a Mari marcou (B) GATO. Ela vê:

> **Olha o truque: só as vogais mudam de lugar. As outras letras ficam paradas.**
>
> [peças] O L G A → A L G O — o O e o A trocaram; L e G não saíram do lugar.
> [peças] G **A** L **O** → G **O** L **A** — GOLA. Gola é a parte da camisa que fica no pescoço.
>
> Você marcou GATO. Trocando as vogais: G **A** T **O** → G **O** T **A**. GOTA é de água,
> não é parte de camisa. Formou palavra de verdade, mas não a que a pergunta pediu.
>
> **Na próxima, faça assim:** troque as duas vogais de lugar em CADA uma das quatro palavras
> e leia o que saiu. Só depois pergunte: "é o que a pergunta pediu?"

Questão-irmã que entra em seguida: 2024 F1 Q3 (GELO → GOLE, gabarito C), mesma operação.

### Exemplo 2 — família "Ler e entender" · 2025 · Fase 1 · Q13 (gabarito B)

Poema PONTINHO DE VISTA, de Pedro Bandeira (8 linhas, lidas com a régua). Pergunta: POR QUE O
MENINO DO POEMA PRECISA OLHAR TODO MUNDO COM O QUEIXO LEVANTADO? (A) PORQUE ELE QUER
PARECER AINDA MAIOR DO QUE É. (B) PORQUE AS PESSOAS SÃO MAIS ALTAS DO QUE ELE; ENTÃO,
PRECISA OLHAR PARA CIMA PARA VÊ-LAS. (C) PORQUE ELE GOSTA DE ERGUER A CABEÇA. (D) PORQUE
ELE ESTÁ COM MEDO DA FORMIGA, QUE É MUITO GRANDE.

Suponha que a Mari marcou (D). Ela vê:

> **Olha o truque: a resposta mora no texto. A pergunta tem POR QUE — volte com a régua e
> ache a frase que explica.**
>
> [régua] O poema reaparece com tudo esmaecido, menos duas linhas acesas:
> **EU SOU PEQUENO, ME DIZEM,** ... **TENHO DE OLHAR TODO MUNDO / COM O QUEIXO LEVANTADO.**
> Quem é pequeno olha para cima para ver os outros. É isso que a resposta certa diz.
>
> Você marcou a formiga. A formiga aparece só no fim, e ela não dá medo: é ela que acha o
> menino GRANDÃO. A resposta do POR QUE estava lá em cima, na primeira linha.
>
> **Na próxima, faça assim:** pergunta com POR QUE, volte para o começo do texto com a régua
> e desça linha por linha até achar a frase que explica. Marque só depois de achar.

Questão-irmã que entra em seguida: 2025 F1 Q14 (feijão adocicado, gabarito A) — outra
pergunta cuja resposta é uma linha do poema (NO SALEIRO PÔS AÇÚCAR), reacesa pela régua.

### Exemplo 3 (curto) — família "Intruso e palavra que troca" · 2024 · Fase 1 · Q9 (gabarito D)

Se ela marcou (A) COMEÇOU:

> **Olha o truque: tire a palavra velha, ponha a nova, leia a frase de novo.**
> [marcar] A CHUVA **CESSOU** E SE FOI → A CHUVA **TERMINOU** E SE FOI — combina.
> A CHUVA **COMEÇOU** E SE FOI — briga: uma coisa que começou não "se foi".
> A pista mora do lado: **E SE FOI**.
> **Na próxima:** ponha cada palavra no lugar e leia a frase inteira; a que deixa a frase
> fazendo sentido é a certa.

---

## 5. Arquitetura de arquivos

Três arquivos novos em `ferramentas/`, mais duas edições. Padrão de nome do projeto é
`<MAT><tri>_<produto>`; aqui a matéria é o evento, então o prefixo é `OP_`:

| Arquivo | O que é | Base |
|---|---|---|
| `ferramentas/OP_data.js` | Banco ÚNICO: famílias (nome, cor, truque em uma frase), itens (questão real + origem + dica + erro), exemplos passo a passo dos cartões. Compartilhado por truques e simulado — nunca dois bancos. | `MAT2_data.js` (papel de banco único) |
| `ferramentas/OP_truques.html` | A Caixa de truques: 9 cartões, componente `leitura` (régua), passo a passo, "agora você" com comentário. | casca de `MAT2_simulado.html` (topbar, card, opts, feedback, qnav) |
| `ferramentas/OP_simulado.html` | O simulado: só tipo múltipla escolha; régua nos textos; comentário de erro; questão-irmã; resultado com "refazer as que errei". | `MAT2_simulado.html` (clonar e podar: sair VF, completar, ligar, ordenar, aberta, chips de tema, tamanhos) |
| `index.html` (editar) | Vira a home da Olimpíada (abaixo). | — |
| `sw.js` (editar) | `CACHE` sobe para `serafina-v28`; `OP_data.js` entra em `BASE_FILES`. Os `MAT2_*` ficam no repo (política: HTML leve fica como modelo), só saem da home. | — |

**O que reusa de `serafina-core`** (sem tocar no core): starfield, `say()` com
`lang:'pt-BR'` e a lista `voicePrefs` já embutida (Thalita/Antonio/Google), `toggleTr()` como
botão DICA (o `.tr` carrega a dica, padrão "prova em português" do CLAUDE.md), `fs()` A+/A-,
`goHome()`, cadeado/tela cheia, `somKey`. Config no fim do body:
`window.SERA_CFG={trKey:'op_tr',lang:'pt-BR',rate:.85,home:'../index.html',somKey:'op_som'}`
→ `serafina-core.js` → `OP_data.js` → motor inline → `SERA_ACCENT` → `sera_theme.js`.

**O que muda na casca herdada do MAT2:** todas as strings passam para português
("Pergunta 3 de 15", "Próxima", "Voltar", "Ver minha nota") via tabela de substituições
exatas que imprime o que não encontrou (modelo `_processo/geracao/gen_mat2_textos.py`); o
botão da bandeira vira um botão com o texto "DICA" e um ícone de lâmpada em SVG (a bandeira
significa tradução no site, e aqui não há tradução); título "Olimpíada de Português — 1ª fase";
cor da matéria `SERA_ACCENT` nova (verde da OP), e cor por família nos badges.

**O que muda na `index.html`:** sai a escolha AP1/AP2 e os dois painéis de Matemática
(inclusive a lógica `ap_choice`); entra um painel único, todo em português:
- Cabeçalho: "Olimpíada de Português · 1ª fase · quinta 10/09". Caixa calma: "A prova é em
  português, com letras GRANDES. 15 perguntas, tempo de sobra. Seu dedo é a régua."
- Herói 1 "Comece aqui": **Caixa de truques** ("9 truques, 3 minutos cada").
- Herói 2: **Simulado** ("15 perguntas iguais às da prova; errou, aprende na hora").
- Some tudo o mais (vídeo, flashcards, galeria, jogo, lab). Sai o botão da bandeira da home
  (não há o que traduzir); fica o tema claro/escuro e o "Atualizar o site".
- Rodapé: "3º trimestre 2026".

**Gate antes de publicar (`_processo/geracao/qa_op.py`, 30 linhas):** cada item do banco
tem 4 alternativas e exatamente 1 certa; `origem` preenchida e existente no Apêndice B;
`eixo` em uma das 9 famílias; `dica` e `erro` presentes; cada família com itens suficientes
para cumprir a cota do simulado duas vezes sem repetir; nenhum texto de 3+ linhas sem o
componente `leitura`. QA de layout em 360×640, 740×360 e 1280×800 com a fala silenciada
(regra zero do CLAUDE.md). Agentes do projeto: `pedagogico` sobre este plano antes de codar
(rápido: o desenho pedagógico está aqui), `ti` antes de declarar pronto; `auditor-cobertura`
substituído pelo gate acima (o insumo aqui são as provas, e a cobertura é por família).

---

## 6. Ordem de execução e o que cabe no tempo

Hoje é 08/09 à noite. A prova é quinta, 10/09. A Mari precisa usar o material na tarde e na
noite de 09/09. Logo, tudo tem de estar no ar até o meio-dia de 09/09.

**Noite de 08/09 (produção, ~3h):**
1. `OP_data.js` — banco com as 30 questões prioritárias (2025 F1 + 2024 F1, adaptadas onde
   há figura), cada uma com `dica` e `erro` completos; famílias com truque em uma frase;
   os 9 exemplos passo a passo dos cartões. É o arquivo que mais vale: sem ele nada existe.
   Commit.
2. `OP_simulado.html` — clone podado do MAT2, strings em português, régua, comentário de
   erro com os dois renderizadores, irmã. Testar 5 questões no navegador com a fala muda.
   Commit + push (já dá para a Mari usar de manhã, se necessário).

**Manhã de 09/09 (~2h30):**
3. `OP_truques.html` — reusa o motor do simulado; adiciona o passo a passo. Commit.
4. `index.html` + `sw.js`. Commit + push. Conferir no celular.
5. Reserva (2023 F1 a 4 alternativas + itens de 2ª fase) no `OP_data.js`, só se sobrar tempo.
6. Gate `qa_op.py`, QA de layout, agente `ti`. Push final antes do meio-dia.

**Uso pela Mari (roteiro para os pais):**
- 09/09 tarde: cartões 0–4 (15 min). Pausa. Cartões 5–8 (12 min).
- 09/09 noite: Simulado de 15 (25–35 min com os comentários). "Refazer as que errei".
- 10/09 manhã, antes de sair: "Aquecer (5 questões)" — 5 minutos, só para acordar o dedo.
  Frase de despedida: "Seu dedo é a régua. Leia as quatro respostas até o fim."

**O que corta se faltar tempo, nesta ordem:**
1. A questão-irmã automática (fica o "Refazer as que errei", que já existe no motor).
2. O "Agora você" dos cartões (fica truque + exemplo passo a passo; a prática vai toda para
   o simulado).
3. O passo a passo animado dos cartões (vira: truque em uma frase + o exemplo já resolvido,
   com as peças/régua na posição final).
4. A reserva de 2023 e das 2ªs fases (banco fica em 30; a 2ª rodada repete).
5. Por último, e só em emergência: os cartões viram uma tela de rolagem única, 9 blocos, sem
   interação — mas ainda com a régua no cartão 0.

**O que não se corta nunca:** a régua como função; o comentário de erro no formato da
seção 4 (nome do truque + aplicação visual + por que a dela não serve + "na próxima");
o banco com origem citada; a home trocada.

---

## Apêndice A — Classificação das 45 questões da 1ª fase

| Ano | Q | Gabarito | Família | Nota |
|---|---|---|---|---|
| 2023 | 1 | A | Contar com o dedo | frase com mais vogais |
| 2023 | 2 | D | Frase com buraco | OS cachorros |
| 2023 | 3 | A | Ler e entender | o que Augusto comeu (achar no texto) |
| 2023 | 4 | D | Som da letra | GUERRA não começa com o som de GELO |
| 2023 | 5 | C | Frase com buraco | SOPA |
| 2023 | 6 | E | Contar com o dedo | 14 palavras coladas → 13 espaços |
| 2023 | 7 | E | Sílabas | sílabas de BORBOLETA (figura) |
| 2023 | 8 | B | Contar com o dedo | R/RR, 8 letras R |
| 2023 | 9 | D | Código, tabela e placa | letra → desenho (só figura; fora do banco) |
| 2023 | 10 | C | Sílabas | 2ª sílaba de CORAÇÃO, CASTELO, BOCA, FACA → CARATECA |
| 2023 | 11 | A | Brincar com letras | letras de TERNO |
| 2023 | 12 | C | Brincar com letras | FRÁGIL não muda a 1ª letra |
| 2023 | 13 | E | Intruso e palavra que troca | palavras iguais, sentidos (só reserva) |
| 2023 | 14 | D | Ler e entender | lição da fábula |
| 2023 | 15 | A | Contar com o dedo | 15 palavras com letra trocada |
| 2024 | 1 | C | Alfabeto e charada de letra | AMOR em ordem alfabética |
| 2024 | 2 | A | Frase com buraco | UM ciclista |
| 2024 | 3 | C | Brincar com letras | GELO → GOLE (figura nomeável) |
| 2024 | 4 | C | Contar com o dedo | mais consoantes que vogais |
| 2024 | 5 | D | Alfabeto e charada de letra | charada da letra Z |
| 2024 | 6 | C | Frase com buraco | continuação: esqueceu os óculos |
| 2024 | 7 | C | Intruso e palavra que troca | MAR não é ação |
| 2024 | 8 | B | Ler e entender | título do poema (LÁ VÊM AS FÉRIAS!) |
| 2024 | 9 | D | Intruso e palavra que troca | CESSOU = TERMINOU |
| 2024 | 10 | B | Ler e entender | rima que encaixa (JULIETA / CARETA) |
| 2024 | 11 | C | Sílabas | GALO, CAVALO, ELEFANTE → CAFANGA (figura nomeável) |
| 2024 | 12 | C | Ler e entender | ruazinha silenciosa e desanimada |
| 2024 | 13 | A | Ler e entender | jeito de falar da atendente (só reserva) |
| 2024 | 14 | D | Ler e entender | o que aconteceu antes (joelho) |
| 2024 | 15 | D | Sílabas | sílabas trocadas entre palavras |
| 2025 | 1 | A | Alfabeto e charada de letra | charada da letra J |
| 2025 | 2 | C | Frase com buraco | CHUVA |
| 2025 | 3 | D | Sílabas | LA+CO+SA → SACOLA |
| 2025 | 4 | A | Código, tabela e placa | placa proibido animal (só figura; fora do simulado) |
| 2025 | 5 | B | Alfabeto e charada de letra | falta o F → FALCÃO |
| 2025 | 6 | A | Brincar com letras | GALO → GOLA |
| 2025 | 7 | C | Contar com o dedo | uma única vogal: ARARA, LAGARTA, URUBU |
| 2025 | 8 | D | Intruso e palavra que troca | pistas em cadeia → MACARRÃO |
| 2025 | 9 | B | Som da letra | B não muda de som |
| 2025 | 10 | C | Intruso e palavra que troca | ALICATE na frutaria |
| 2025 | 11 | B | Brincar com letras | O-F-H-L-N-O-I-G → GOLFINHO |
| 2025 | 12 | B | Brincar com letras | move o H (GALHO/GALO) |
| 2025 | 13 | B | Ler e entender | por que o queixo levantado |
| 2025 | 14 | A | Ler e entender | o feijão adocicado |
| 2025 | 15 | D | Código, tabela e placa | símbolos → ANTES SÓ DO QUE MAL ACOMPANHADO |

## Apêndice B — Gabaritos oficiais (lidos na célula vermelha da página 1 de cada gabarito)

| Prova | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2023 F1 (A–E) | A | D | A | D | C | E | E | B | D | C | A | C | E | D | A |
| 2023 F2 (A–E) | E | B | D | D | B | E | C | A | C | E | E | D | A | D | D |
| 2024 F1 | C | A | C | C | D | C | C | B | D | B | C | C | A | D | D |
| 2024 F2 | B | B | C | D | B | A | C | B | D | D | D | B | C | B | B |
| 2025 F1 | A | C | D | A | B | A | C | D | B | C | B | B | B | A | D |
| 2025 F2 | C | C | A | B | B | B | D | C | C | B | B | A | B | D | C |

Conferência de sanidade feita em amostra: 2023 F1 Q6 (contei 14 palavras → 13 espaços = E),
Q8 (8 R = B), Q15 (15 palavras trocadas = A); 2025 F2 Q13 (ordem alfabética BALEIA, COELHO,
ESQUILO, GATO, URSO: o do meio, ESQUILO = B), Q14 (ontem domingo → amanhã terça = D). Todas
bateram com a folha.
