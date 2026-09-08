# AUDITORIA DE QUALIDADE — itens TR79 a TR104

Arquivo auditado: `ferramentas/OP_data.js`
Escopo: 26 itens (TR79–TR104) — 7 `alfabeto`, 7 `codigo`, 6 `placa`, 6 `ler`.
Método: cada item foi resolvido do zero antes de olhar o `ok:1`. Os 7 códigos foram
decodificados símbolo a símbolo contra a tabela do `quadro`. As 7 charadas/listas do
eixo `alfabeto` tiveram as quatro pistas testadas contra o gabarito **e** contra cada
distrator. Nenhum arquivo foi editado.

---

## 1. Tabela item a item

| id | eixo | o que decodifiquei / resolvi sozinho | bate com o `ok:1`? | veredito |
|---|---|---|---|---|
| TR79 | alfabeto | Lista L, M, **?**, O, P → falta **N** (única). Só NOZ começa com N. QUEIJO=Q (depois do P), MEL=M (já na lista), SUCO=S (depois do P) | Sim (NOZ) | OK |
| TR80 | alfabeto | MESA M→E volta; BOTA B<O<T→A volta; **FLOR** F<L<O<R sobe até o fim; SUCO S<U→C volta. Só FLOR | Sim (FLOR) | OK |
| TR81 | alfabeto | Lista P, Q, **?**, S, T → falta **R** (única). Só RÁDIO começa com R. VASO=V, PORTA=P (já na lista), JANELA=J | Sim (RÁDIO) | OK |
| TR82 | alfabeto | Pistas: RATO / PORTA / som RRRUM / entre Q e S. **R = 4/4**. O = 2/4 pela pista como escrita (RATO, PORTA; o O não faz RRRUM) — 3/4 se a 3ª pista for lida como "a palavra CARRO". T = 2/4 (RATO, PORTA). C = 1/4 (só CARRO) | Sim (R) | OK com **OBS 1** |
| TR83 | alfabeto | FACA / FADA / FESTA / depois do E. **F = 4/4**. A = 3/4 (morre na 4ª: é a 1ª letra). E = 1/4 (só FESTA). C = 1/4 (só FACA) | Sim (F) | OK |
| TR84 | alfabeto | BOLA / BOLO / BOLSA / entre A e C. **B = 4/4**. L = 3/4 (mora entre K e M). S = 1/4 (só BOLSA). C = 0/4 nas palavras e é ponta do "entre" | Sim (B) | OK |
| TR85 | alfabeto | risco em pé / PIPA / PIPOCA / depois do O. **P = 4/4**. I = 3/4 (morre na 4ª). A = 2/4 (PIPA, PIPOCA). O = 1/4 (só PIPOCA) | Sim (P) | OK |
| TR86 | codigo | ▲☼★▼♥◆■●★ = **QUEM · CAN · TA · SEUS · MA · LES · ES · PAN · TA** → QUEM CANTA SEUS MALES ESPANTA. 9 símbolos, todos na tabela; tabela embaralhada (linha de baixo = TA ES MA QUEM PAN LES CAN SEUS) | Sim | **2 FALHAS CRÍTICAS** (contagem e posição nos `no`) |
| TR87 | codigo | ▲■✦☼●◆★♥ = **DE · VA · GAR · SE · VAI · AO · LON · GE** → DEVAGAR SE VAI AO LONGE. 8 símbolos; 6º = ◆ = AO (confere com o `no` do distrator 1); tabela embaralhada (VAI LON DE GE AO VA SE GAR) | Sim | OK |
| TR88 | codigo | ▲♪■♥✦▼●☼★◆ = **HO · JE · TEM · BO · LO · DE · CHO · CO · LA · TE** → HOJE TEM BOLO DE CHOCOLATE. 10 símbolos; 6º = ▼ = DE ✓; último = ◆ = TE ✓; tabela embaralhada (LA TEM CHO HO DE TE BO CO JE LO) | Sim | OK com **OBS 9** |
| TR89 | codigo | ▲▲✦★■●☼▼♥◆ = **CAI · CAI · BA · LÃO · NA · RU · A · DO · SA · BÃO** → CAI CAI BALÃO NA RUA DO SABÃO. 10 símbolos; 8º = ▼ = DO ✓; ▲ repetido nas posições 1 e 2 ✓; tabela embaralhada (DO LÃO CAI SA NA A BÃO RU BA) | Sim | OK |
| TR90 | codigo | ★◆■■▼●♪▼ = **B · O · R · R · A · C · H · A** → BORRACHA. 8 símbolos, 8 letras; ■ repetido nas posições 3 e 4 = RR ✓; tabela embaralhada (C A B H R O); não existe L nem S na tabela ✓ | Sim | OK com **OBS 2** |
| TR91 | codigo | ★▲●☼✦▼■♥◆ = **MAIS · VA · LE · TAR · DE · DO · QUE · NUN · CA** → MAIS VALE TARDE DO QUE NUNCA. 9 símbolos; 6º = ▼ = DO ✓; 4º e 5º = TAR e DE ✓; NA e DA não existem na tabela ✓; tabela embaralhada | Sim | OK (borderline **OBS 12**) |
| TR92 | codigo | ▲◆♥✦●♪▼▲■☼★ = **A · MA · NHÃ · EU · VOU · PA · RA · A · ES · CO · LA** → AMANHÃ EU VOU PARA A ESCOLA. 11 símbolos; ▲ repetido nas posições 1 e 8 ✓; 3 últimos = ES CO LA ✓; tabela embaralhada | Sim | OK com **OBS 3** |
| TR93 | placa | Professora: a placa **MOSTRA** por onde sair → verde + homem correndo para porta aberta. O par clássico (mesma porta, com barra) é decidido por MOSTRA × PROÍBE, não por adivinhação | Sim | OK com **OBS 4** |
| TR94 | placa | Pilar: **NÃO PODE** (barra) + **PISAR NA GRAMA** (desenho) → círculo cortado + pé na grama. Única com as duas metades | Sim | OK |
| TR95 | placa | Clara: **NÃO PODE** + **COMER E BEBER** → círculo cortado + sanduíche e copo. Par clássico (mesmo desenho, com e sem barra) decidido pelo "não pode" | Sim | OK com **OBS 4, 10** |
| TR96 | placa | Mãe: a placa **AVISA** → triângulo amarelo + pessoa escorregando. Decidido por AVISA (triângulo) × PROÍBE (círculo cortado com crianças correndo) | Sim | OK com **OBS 4, 10, 11** |
| TR97 | placa | Nina: **NÃO PODE** + **JOGAR BOLA** → círculo cortado + bola. Par clássico (bola com e sem barra) decidido pelo "não pode" | Sim | OK com **OBS 10** |
| TR98 | placa | Pai: **NÃO PODE** + **CARRO** → círculo cortado + carro. A da moto tem a barra e o desenho errado; a azul tem o carro e não tem barra | Sim | OK com **OBS 4** |
| TR99 | ler | Poema do dente: balança → não solta → cai na maçã → buraco. Assunto do começo ao fim = **o dente**. `acende:[0,3,5]` bate com as linhas citadas. Rima ABCB (PARAR/SOLTAR, SEGUNDO/MUNDO) funciona em voz alta | Sim | **FALHA CRÍTICA de redação** + **OBS 6** |
| TR100 | ler | POR QUE a bota → linhas 3 e 4: "iam passar pela rua de terra" + "a rua ficou cheia de poças". `acende:[2,3]` aponta exatamente essas linhas | Sim | **FALHA CRÍTICA de redação** + **OBS 7** |
| TR101 | ler | COMO É a rua do mercado → CHEIA (×3) + FALA ALTO + GRITA (×2) = cheia e barulhenta. A última linha fala da OUTRA rua | Sim | **FALHA CRÍTICA de redação** + **OBS 8** |
| TR102 | ler | Fila do tempo: mês passado (receita) → anteontem (ovos) → hoje (bolo) → amanhã (prima). Mais antigo = **a carta da avó**. `acende:[0,1,2,3]` = as quatro linhas com marcador de tempo | Sim | **FALHA CRÍTICA de redação** |
| TR103 | ler | Em cima da cama = sapatilha; a regra diz sapatilha só na terça → **TERÇA-FEIRA, DIA DE DANÇAR**. `acende:[2,5]` aponta as duas linhas exatas. As quatro alternativas rimam e a `dica` avisa que a rima não decide — design honesto | Sim | **FALHA CRÍTICA de redação** |
| TR104 | ler | A lição está dita em voz alta pela professora (linha 5): quem empurra os amigos fica sem amigo na hora de precisar. `acende:[1,3,4]` bate | Sim | **FALHA CRÍTICA de redação** + **OBS 5** |

**Nenhum gabarito caiu.** Os 26 `ok:1` estão corretos, as 7 tabelas de código estão
embaralhadas, todos os símbolos das 7 sequências existem nas tabelas, e nenhum
distrator do eixo `alfabeto` passa nas quatro pistas. Não encontrei ambiguidade em
nenhum dos 26 itens.

`origem` conferida nos 26: todas exatamente `'Treino no estilo da prova'`. Nenhuma cita
ano ou número.

---

## 2. FALHAS CRÍTICAS

### 2.1 Fato falso (2) — ambas no TR86

**FC-1 · TR86 · `no` da alternativa "QUEM CANTA MALES ESPANTA" — conta errada dos pedaços**

Decodificação: a fila tem 9 símbolos (▲☼★▼♥◆■●★). A alternativa pula o 4º (▼ = SEUS),
logo ela tem **8** pedaços: QUEM · CAN · TA · MA · LES · ES · PAN · TA. O comentário diz
sete. É justamente a conta que o material manda a criança fazer (o `proximo` do TR91:
"conte os símbolos e conte os pedaços da frase antes de marcar").

Está lá:
```
Essa pulou o quarto símbolo. No lugar onde ela não escreve nada, a tabela diz SEUS. São nove símbolos na fila e sete pedaços nessa frase.
```
Deve ser:
```
Essa pulou o quarto símbolo. No lugar onde ela não escreve nada, a tabela diz SEUS. São nove símbolos na fila e oito pedaços nessa frase.
```

**FC-2 · TR86 · `no` da alternativa "QUEM CANTA SEUS MALES AFASTA" — posição errada dos símbolos**

Os dois últimos símbolos da fila são ● (8º = PAN) e ★ (9º = TA). ES e PAN são o **7º e o
8º**. Se a criança fizer o que o material manda — dedo no símbolo, dedo na tabela — o
comentário não fecha.

Está lá:
```
Essa troca o fim da frase. Os dois últimos símbolos valem ES e PAN, e AFAS não existe na tabela. Quem reconhece o ditado no meio do caminho completa de memória e cai aqui.
```
Deve ser:
```
Essa troca o fim da frase. O sétimo e o oitavo símbolos valem ES e PAN, e AFAS não existe na tabela. Quem reconhece o ditado no meio do caminho completa de memória e cai aqui.
```

> Conferi a mesma alegação nos outros seis itens de `codigo` (TR87 "os dois últimos =
> LON e GE" ✓; TR88 "os quatro últimos = CHO CO LA TE" ✓ e "a fila acaba no losango =
> TE" ✓; TR89 "os dois últimos = SA e BÃO" ✓; TR90 "o terceiro e o quarto são o mesmo
> quadrado = R" ✓ e "a fila acaba no triângulo de ponta para baixo = A" ✓; TR91 "o
> quarto e o quinto = TAR e DE" ✓ e "os dois últimos = NUN e CA" ✓; TR92 "os três
> últimos = ES, CO e LA" ✓ e "a fila acaba na estrela = LA" ✓). **Só o TR86 erra** —
> não é convenção da casa, é defeito.

### 2.2 Redação proibida: validar a alternativa errada antes de negá-la (6)

Classifico como crítica porque a regra do dono é categórica ("NENHUM comentário pode")
e porque o próprio arquivo já declara essa doutrina, no comentário do cartão-mestre
`comando`: *"para a criança, NUNCA se diz que a errada 'é verdadeira' — isso soa como
permissão para marcar."* As seis ocorrências estão **todas no eixo `ler`** — o bloco
inteiro TR99–TR104 foi escrito com a fórmula banida, uma por item, sempre no primeiro
distrator.

**FC-3 · TR99 · opção "A MAÇÃ DURA."**
Está lá:
```
A maçã aparece mesmo no poema, e é verdade que ele mordeu uma. Mas ela é só o que fez o dente cair: o poema inteiro não fala de maçã, fala do dente.
```
Deve ser (já resolve também a OBS 6):
```
A maçã aparece numa linha só, e ali ela é o que faz o dente cair. O poema inteiro, do começo ao fim, fala do dente.
```

**FC-4 · TR100 · opção "PORQUE HOJE DE MANHÃ FAZIA SOL."**
Está lá:
```
É verdade que fazia sol, o texto diz isso na primeira linha. Mas sol não é motivo para calçar bota: essa parte da frase está ali justamente para mostrar que a bota não era por causa do tempo de agora.
```
Deve ser (já resolve também a OBS 7):
```
Sol não é motivo para calçar bota. Quem explica a bota é a própria Lara, e ela fala da rua de terra da volta, não do tempo da manhã.
```

**FC-5 · TR101 · opção "É UMA RUA ONDE SE VENDE BANANA E PEIXE."**
Está lá:
```
Isso é verdade, está escrito no poema. Só que a pergunta é COMO É a rua, e não o que vendem nela. Dizer o que se vende não diz como o lugar é.
```
Deve ser:
```
A pergunta é COMO É a rua, e não o que vendem nela. Dizer o que se vende não responde como o lugar é.
```

**FC-6 · TR102 · opção "MATEUS COMEÇOU A FAZER O BOLO COM A MÃE."**
Está lá:
```
É verdade que ele está fazendo o bolo, e é a primeira coisa CONTADA. Mas ela é de HOJE: a ordem em que o texto conta não é a ordem em que aconteceu.
```
Deve ser:
```
O bolo é de HOJE, e a pergunta é o que aconteceu ANTES DE TUDO. A ordem em que o texto conta não é a ordem em que aconteceu.
```

**FC-7 · TR103 · opção "QUINTA-FEIRA, DIA DE NADAR."**
Está lá:
```
A quinta está na regra do poema, isso é verdade. Mas a quinta é o dia do maiô e da touca, e em cima da cama a mãe deixou a sapatilha.
```
Deve ser:
```
Na regra do poema, a quinta é o dia do maiô e da touca. Em cima da cama a mãe deixou a sapatilha, e sapatilha é de outro dia.
```

**FC-8 · TR104 · opção "QUE MIGUEL DERRUBOU O SUCO NO CHÃO."**
Está lá:
```
Isso aconteceu mesmo, está escrito na historinha. Mas a pergunta é qual é a LIÇÃO, e contar uma coisa que aconteceu não é ensinar nada.
```
Deve ser:
```
A pergunta é qual é a LIÇÃO. Contar uma coisa que aconteceu na historinha não é ensinar nada.
```

---

## 3. OBSERVAÇÕES

**OBS 1 · TR82 · a 3ª pista fala de SOM, mas os comentários a tratam como PALAVRA.**
A pista é "SOU O SOM DO CARRO QUE ACELERA: RRRUM". O `no` do O diz que ele "aparece em
RATO, em PORTA e em CARRO: passa em três pistas" — mas o O não faz o som RRRUM; pela
pista como escrita ele passa em duas. O `no` do T diz "O T não está em CARRO", quando o
teste devia ser o som. O `visual` reforça a leitura errada marcando `CARR<b>O</b>` como
acerto. Não gera ambiguidade (o O morre na 4ª pista de qualquer jeito), mas ensina a
conferir a pista errada. O conserto de uma linha só é no `texto`, e ele deixa os quatro
comentários literalmente verdadeiros (R, O e C estão em CARRO; T não está):

Está lá:
```
'SOU O SOM DO CARRO QUE ACELERA: RRRUM,',
```
Deve ser:
```
'ESTOU NO CARRO QUE ACELERA: RRRUM,',
```

**OBS 2 · TR90 · a `dica` resolve o item sem decodificar nada.**
"São oito símbolos, então a palavra tem oito letras": BOLACHA = 7, BARRACA = 7,
BORRACHAS = 9, BORRACHA = **8**. Basta contar as letras das alternativas. Contar
símbolos é heurística legítima de prova (e o `proximo` a ensina de propósito), mas aqui
ela dispensa a tabela inteira, que é o que o item treina.

Está lá:
```
São oito símbolos, então a palavra tem oito letras. Escreva uma letra embaixo de cada símbolo antes de olhar as alternativas.
```
Deve ser:
```
Escreva uma letra embaixo de cada símbolo, um por um, antes de olhar as alternativas. Repare se algum símbolo aparece duas vezes seguidas.
```

**OBS 3 · TR92 · "NHA não existe na tabela" — mas NHÃ existe.**
A tabela tem NHÃ. Para uma criança de 7 anos, NHÃ e NHA passam quase igual. O argumento
que se sustenta sozinho é o outro (a fila acaba na estrela).

Está lá:
```
Essa põe dois pedaços que a fila não tem. A fila acaba na estrela, e a estrela vale LA. LI e NHA não existem na tabela.
```
Deve ser:
```
Essa põe dois pedaços que a fila não tem. A fila acaba na estrela, e a estrela vale LA. Não sobra símbolo nenhum para LI nem para NHA.
```

**OBS 4 · eixo `placa` · "a placa certa" — orientação que só funciona depois de saber a resposta.**
Quatro ocorrências. A criança está lendo o comentário justamente para descobrir qual é a
certa; comparar o distrator com "a placa certa" é metalinguagem circular. Em dois casos
vem acompanhada de "essa é a pegadinha forte" / "é aí que essa pega".

- TR93, opção do círculo cortado com a porta — está lá:
```
A porta está lá, igualzinha à da placa certa, e por isso essa é a pegadinha forte. Mas o círculo vermelho cortado quer dizer PROIBIDO: essa manda NÃO entrar por aquela porta. Ela proíbe em vez de mostrar o caminho.
```
  deve ser:
```
A porta está lá, e é ela que puxa o olho. Mas o círculo vermelho cortado quer dizer PROIBIDO: essa manda NÃO entrar por aquela porta. Ela proíbe em vez de mostrar o caminho.
```

- TR95, opção do sanduíche e copo sem barra — está lá:
```
O sanduíche e o copo estão lá, igualzinhos aos da placa certa, e quem procura só o desenho para aqui. Mas não tem círculo vermelho nem barra: sem a barra ela não proíbe nada — essa mostra o lugar de comer.
```
  deve ser:
```
O sanduíche e o copo estão lá, e quem procura só o desenho para aqui. Mas não tem círculo vermelho nem barra: sem a barra ela não proíbe nada — essa mostra o lugar de comer.
```

- TR96, opção do triângulo com raio — está lá:
```
O triângulo amarelo é o mesmo da placa certa, e é aí que essa pega. Mas o desenho de dentro é um raio: ela avisa perigo de choque, não chão escorregadio.
```
  deve ser:
```
O triângulo amarelo avisa mesmo, e é aí que essa engana. Mas o desenho de dentro é um raio: ela avisa perigo de choque, não chão escorregadio.
```

- TR98, opção da placa azul com carro — está lá:
```
O carro está lá, igualzinho ao da placa certa, e quem procura só o carro para aqui. Mas não tem círculo vermelho nem barra: sem a barra a placa não proíbe nada — essa mostra o caminho dos carros.
```
  deve ser:
```
O carro está lá, e quem procura só o carro para aqui. Mas não tem círculo vermelho nem barra: sem a barra a placa não proíbe nada — essa mostra o caminho dos carros.
```

**OBS 5 · TR104 · quebra de paralelismo entrega a alternativa certa pela forma.**
Três alternativas começam com "QUE" e a correta começa com "QUEM". Criança treinada em
marcar "a diferente" acerta sem ler o texto. Conserto: tirar o "QUE" das quatro (a
pergunta "QUE LIÇÃO ESSA HISTORINHA ENSINA?" continua fechando).

Está lá:
```
{t:'QUE MIGUEL DERRUBOU O SUCO NO CHÃO.', ...
{t:'QUE É PRECISO CORRER PARA CHEGAR NA FRENTE DA FILA.', ...
{t:'QUEM TRATA MAL OS AMIGOS FICA SOZINHO NA HORA QUE PRECISA DE AJUDA.', ok:1},
{t:'QUE BOLO É MELHOR DE DIVIDIR DO QUE SUCO.', ...
```
Deve ser:
```
{t:'MIGUEL DERRUBOU O SUCO NO CHÃO.', ...
{t:'É PRECISO CORRER PARA CHEGAR NA FRENTE DA FILA.', ...
{t:'QUEM TRATA MAL OS AMIGOS FICA SOZINHO NA HORA QUE PRECISA DE AJUDA.', ok:1},
{t:'BOLO É MELHOR DE DIVIDIR DO QUE SUCO.', ...
```

**OBS 6 · TR99 · o `porque` inventa o sexo de quem fala.**
O poema é em 1ª pessoa ("MEU DENTE", "EU MORDI") e não diz se é menino ou menina. O
`porque` — campo que deve modelar leitura só-do-texto — diz "o menino". Além de ser
inferência de fora, a leitora é menina.

Está lá:
```
...e por fim cai quando o menino morde a maçã.
```
Deve ser:
```
...e por fim cai quando quem fala morde a maçã.
```

**OBS 7 · TR100 · metalinguagem de intenção do autor no `visual`.**
Dizer que uma frase "está no texto só para mostrar" é conversa sobre a construção da
questão, não sobre o texto. (A ocorrência gêmea, no `no`, já some com a FC-4.)

Está lá:
```
O sol de hoje de manhã está no texto só para mostrar que a bota não era por causa do tempo de agora.
```
Deve ser:
```
No texto está escrito que de manhã fazia SOL. Quem explica a bota é Lara, e ela fala da rua de terra da volta.
```

**OBS 8 · TR101 · `acende` não cobre uma linha usada como prova no `visual`.**
`acende:[1,2,3,5]` deixa apagada a linha 4 ("O MOÇO DAS BANANAS GRITA O PREÇO"), mas o
`visual` usa "GRITA O PREÇO" como uma das duas provas de barulho e o `porque` diz "GRITA
duas vezes". A criança acende o guia e não acha metade do argumento.

Está lá:
```
acende:[1,2,3,5],
```
Deve ser:
```
acende:[1,2,3,4,5],
```

**OBS 9 · TR88 · metalinguagem dentro do enunciado.**
A `nota` termina com "É a parte em que todo mundo se perde" — comentário sobre os outros
respondentes, dentro do enunciado. A `nota` gêmea do TR92 já está limpa e é o modelo.

Está lá:
```
Repare no fim da fila: os quatro últimos símbolos não formam quatro palavrinhas, formam UMA palavra só. É a parte em que todo mundo se perde.
```
Deve ser:
```
Repare no fim da fila: os quatro últimos símbolos não formam quatro palavrinhas, formam UMA palavra só.
```

**OBS 10 · eixo `placa` · quatro descrições não cumprem o que a própria `nota` promete.**
A `nota` de todos os seis itens diz: "cada placa vem descrita em palavras: **a forma, a
cor**, se tem barra e o que está desenhado dentro". Quatro alternativas não dão forma
nem cor: TR95 opção do sanduíche sem barra, TR95 opção do dinossauro, TR96 opção do
carrinho de compras, TR97 opção do escorregador e balanço. Não gera ambiguidade (nenhuma
delas depende da cor), mas quebra o contrato do enunciado — e o item ensina exatamente a
ler forma e cor primeiro. Conserto mínimo, dar cor às quatro; ex. TR95:

Está lá:
```
UMA PLACA COM UM SANDUÍCHE E UM COPO DESENHADOS DENTRO, SEM BARRA NENHUMA.
```
Deve ser:
```
UMA PLACA AZUL COM UM SANDUÍCHE E UM COPO DESENHADOS DENTRO, SEM BARRA NENHUMA.
```

**OBS 11 · TR96 · o `truque` do item aponta para o critério errado.**
O item se decide pelo triângulo amarelo que AVISA, mas o `truque` só fala da barra
vermelha ("Círculo vermelho cortado quer dizer PROIBIDO..."). O `visual` já traz a frase
certa; basta promovê-la a `truque` deste item.

Está lá:
```
truque:'Círculo vermelho cortado quer dizer PROIBIDO. O desenho de dentro diz o que é proibido.',
```
Deve ser:
```
truque:'O formato manda primeiro: triângulo amarelo AVISA, círculo vermelho cortado PROÍBE. Depois o desenho de dentro diz do quê.',
```

**OBS 12 · TR91 · borderline, registrado sem exigir troca.**
"Muita gente fala o ditado assim, e é por isso que ela atrai" beira a validação do
distrator. Não valida a alternativa como resposta à pergunta (que é de decodificação), e
o resto do comentário é a conta de símbolos. Fica só registrado.

---

## 4. Coisas que testei e NÃO são defeito

- **Mesma placa como distrator num item e gabarito em outro** (círculo cortado + bola: distrator no TR95, gabarito no TR97). Verifiquei: reforça exatamente a lição do bloco — a barra diz que proíbe, o desenho de dentro diz o quê. Deliberado e seguro.
- **TR89, "CAI CAI BALÃO NA RUA DO SABÃO"** é versão real e corrente da cantiga; "NA MINHA MÃO" é a outra versão real, e por isso é um distrator forte e honesto. Nenhum fato falso.
- **TR103**: as quatro alternativas rimam de propósito e a `dica` avisa em voz alta que a rima não decide. Lido em voz alta, NADAR / DANÇAR / JOGAR fecham a regra do poema. Design honesto, não pegadinha.
- **TR85, pista "COMEÇO COM UM RISCO EM PÉ"**: verdadeira para P (risco + barriga) e também para I — é a armadilha planejada, e ela é resolvida pela 4ª pista. Não é ambiguidade.
- **`nota` dos seis itens de `placa`** (avisando que na prova as placas são desenhadas): é metalinguagem, mas necessária e honesta — sem ela o item não seria resolvível em texto. Mantida.

---

## 5. Itens a REMOVER

**Nenhum.** Os 26 gabaritos se sustentam e nenhum item é irrecuperável. Tudo que
encontrei se conserta trocando texto — duas correções numéricas no TR86, seis reescritas
de comentário no eixo `ler`, e doze ajustes menores.
