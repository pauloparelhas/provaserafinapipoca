# AUDITORIA DE QUALIDADE — TR25 a TR52

Arquivo auditado: `ferramentas/OP_data.js`
Escopo: 28 itens (TR25–TR38 `ler`, TR39–TR45 `letras`, TR46–TR52 `silabas`)
Método: cada item foi resolvido do zero, sem olhar o `ok:1`. Nos itens de `letras` e `silabas`, as
palavras foram escritas e as peças riscadas uma a uma, tanto na certa quanto nas três erradas.
Data: 08/09/2026

---

## 1. Tabela item a item

| id | eixo | resolvi e cheguei em | bate com o gabarito? | veredito |
|---|---|---|---|---|
| TR25 | ler | O GATO DORMINHOCO | sim | **1 falha crítica** (fato falso: "última linha") |
| TR26 | ler | Porque o irmão pequeno acabou de dormir | sim | 1 observação (o texto não diz que quem fala é menina) |
| TR27 | ler | Quem quer levar tudo de uma vez acaba ficando sem nada | sim | **1 falha crítica** (truque contradiz a própria dica) + 1 obs. |
| TR28 | ler | É um lugar animado e cheio de barulho | sim | limpo |
| TR29 | ler | A professora avisou que ia ter festa | sim | limpo |
| TR30 | ler | Tirou da mochila uma mamadeira | sim | 2 observações (rima quebrada no fecho; "verso") |
| TR31 | ler | A COELHA / DORMIU NA TELHA | sim | limpo (rima conferida em voz alta) |
| TR32 | ler | — AGORA VOU TIRAR UM SONÃO NA MINHA REDE! | sim | limpo |
| TR33 | ler | Pelas palmas da professora Marta | sim | limpo |
| TR34 | ler | O short azul | sim | limpo |
| TR35 | ler | A SOMBRA | sim | 1 observação (`acende` incompleto) |
| TR36 | ler | Pintar um desenho com a irmã rabiscando por cima | sim | limpo |
| TR37 | ler | QUANDO EU ERA PEQUENO | sim | **1 falha crítica** (truque incompatível) + 1 obs. |
| TR38 | ler | SEXTA-FEIRA | sim | limpo |
| TR39 | letras | SAPO → SOPA | sim | **1 falha crítica** (truque incompatível) + redação |
| TR40 | letras | CANTO → CONTA | sim | **1 falha crítica** (truque incompatível) + redação |
| TR41 | letras | TARTARUGA (9 letras exatas) | sim | redação |
| TR42 | letras | MORANGO (7 letras exatas) | sim | redação + 1 obs. (enunciado entrega) |
| TR43 | letras | R | sim | **1 falha crítica** (truque incompatível) + redação |
| TR44 | letras | BALA | sim | **1 falha crítica** (truque incompatível) + redação |
| TR45 | letras | BONECA (6 letras exatas) | sim | redação |
| TR46 | silabas | MOCHILA (MO-CHI-LA) | sim | redação |
| TR47 | silabas | CHOCOLATE (CHO-CO-LA-TE) | sim | redação |
| TR48 | silabas | PIPOCA (PI + PO + CA) | sim | **1 falha crítica** (truque elimina a resposta certa) |
| TR49 | silabas | PALITO (PA + LI + TO) | sim | **1 falha crítica** (truque elimina a resposta certa) |
| TR50 | silabas | SORVETE (SOR + VE + TE) | sim | **1 falha crítica** (fato falso: "RO") |
| TR51 | silabas | BANANA (BA + NA + NA) | sim | 1 observação (comentário de CANA confuso) |
| TR52 | silabas | UMA ABELHA POUSOU NO NARIZ DA MENINA | sim | 1 observação (truque vago) |

**Gabarito: 28/28 bateram.** Não encontrei nenhum item em que uma alternativa "errada" seja
defensável por uma criança de 7 anos. Não há item a REMOVER — todas as falhas são reparáveis
no lugar.

**`origem`:** os 28 itens trazem exatamente `origem:'Treino no estilo da prova'`. Nenhum cita ano
ou número de questão. Nada a corrigir.

**Contas refeitas (letras/silabas), item a item:**

- TR39 SAPO→S**O**P**A** ✓ · SALTO→SOLTA ✓ · COLA→CALO ✓ · VELA→VALE ✓ (as quatro formam palavra, como o `proximo` diz)
- TR40 CANTO→CONTA ✓ · MANTO→MONTA ✓ · CARRO→CORRA ✓ · BANHO→BONHA (não é palavra) ✓
- TR41 quadro = A,R,T,U,A,G,R,T,A → 9 letras (A×3, R×2, T×2, U, G). TARTARUGA = T,A,R,T,A,R,U,G,A → A×3, R×2, T×2, U, G. **Fecha exato.** GARRAFA pede F ✓ e sobra T,T,U ✓ · GUITARRA pede I e tem 8 ✓ · GARRA gasta 5 e sobra T,T,A,U ✓
- TR42 quadro = O,N,M,A,G,R,O → 7 (O×2). MORANGO = M,O,R,A,N,G,O. **Fecha exato.** MORCEGO pede C e E ✓ · AMOR sobra N,G,O ✓ · MARROM pede 2 M e 2 R ✓
- TR43 O R sai de PRATO e entra em PATO ✓ · T: PRAO / PATTO ✓ · B e M não estão nas duas palavras ✓
- TR44 MALA→BALA (só a 1ª) ✓ · MULA muda a do meio ✓ · MALHA tem 5 ✓ · BOLA muda duas ✓
- TR45 quadro = N,E,B,O,C,A → 6, uma de cada. BONECA fecha exato ✓ · BONECO pede 2º O e sobra A ✓ · BOCA sobra N,E ✓ · CANOA pede 2º A e sobra B,E ✓
- TR46 LA+MO+CHI → MO-CHI-LA ✓ · CHA-MA ✗ · CHI-NE-LO ✗ · MO-LA sobra CHI ✓
- TR47 TE+LA+CHO+CO → CHO-CO-LA-TE ✓ · CHO-CA-LHO ✗ · CO-LE-TE ✗ · CO-LA sobra 2 ✓
- TR48 PI-RU-LI-TO / PO-TE / CA-DER-NO → PI+PO+CA ✓ · PI-RA-TA ✗ · PI-CO-LÉ ✗ · TO-MA-DA ✗ (TO existe, MA e DA não)
- TR49 PA-TO / LI-MÃO / DE-DO → PA+LI+TO ✓ · PA-LHA-ÇO ✗ · LI-MO-NA-DA ✗ · DE-DÃO ✗
- TR50 primeiras: SOR, VE, TE → SOR-VE-TE ✓ · SO-FÁ ✗ · TE-SOU-RO ✗ · VER-DE ✗
- TR51 últimas: BA, NA, NA → BA-NA-NA ✓ · NA-BO ✗ · CA-NA ✗ · BA-NHO ✗
- TR52 ciclo: BE→POUSOU, SOU→MENINA, NI→ABELHA. Fecha sem sobra e sem invenção ✓

---

## 2. FALHAS CRÍTICAS (10)

### 2.1 — TR25 · fato falso: a comida NÃO está na última linha

O poema tem 6 linhas. "SÓ ACORDA NA HORA DA COMIDA" é a **quinta** (penúltima); a última é
"DEPOIS VOLTA PRA SUA DORMIDA". Dois lugares afirmam o contrário. A criança que voltar com a
régua para conferir vai achar outra coisa e desconfiar do comentário.

**Está lá** (comentário da alternativa A):
> Essa sai da última linha do poema. A comida aparece uma vez só, e aparece para o gato acordar e voltar a dormir.

**Deveria estar:**
> Essa sai da penúltima linha do poema. A comida aparece uma vez só, e aparece para o gato acordar e voltar a dormir.

**Está lá** (no `visual`):
> `<span class="pc bad">s&oacute; a &uacute;ltima linha</span>`

**Deveria estar:**
> `<span class="pc bad">s&oacute; uma linha, l&aacute; no fim</span>`

---

### 2.2 — TR50 · fato falso: RO não é pedaço de TESOURA

TESOURA se bate em TE-SOU-**RA**. O comentário afirma que SOU **e RO** são pedaços da tesoura.
RO não é: é pedaço de TESOUR**O**, que é a palavra da alternativa. A criança que bater palma em
TE-SOU-RA para conferir vai achar RA e concluir que o comentário está errado — e, pior, pode
gravar que "tesoura tem RO". Além disso, a frase usa a fórmula proibida ("está certo, sim, mas").

**Está lá:**
> TESOURO engana porque é quase a tesoura inteira. O TE está certo, sim, mas SOU e RO são os OUTROS pedaços da tesoura — e a pergunta manda pegar só o PRIMEIRO de cada palavra.

**Deveria estar:**
> TESOURO não serve: a pergunta manda pegar só o PRIMEIRO pedaço de cada palavra, e SOU é o SEGUNDO pedaço da tesoura. E RO nem existe nela: bata palma, TE-SOU-RA termina em RA. A armadilha é TESOURO ser quase a tesoura inteira.

---

### 2.3 — TR48 · truque incompatível: manda usar TODAS as peças e derruba a resposta certa

O item pede uma palavra "FORMADA APENAS COM SÍLABAS DOS NOMES ACIMA". Os três nomes dão
**nove** peças (PI-RU-LI-TO, PO-TE, CA-DER-NO) e a resposta certa, PIPOCA, usa **três**. O truque
manda "usar TODAS as peças, uma vez cada" — aplicado ao pé da letra, ele **elimina PIPOCA** e
não sobra nenhuma alternativa. É o caso mais grave do lote: a regra herdada faz a criança
descartar o gabarito com confiança.

**Está lá:**
> truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.'

**Deveria estar:**
> truque:'Bata palma em cada nome e escreva os pedaços. A palavra certa só pode usar pedaços dessa lista.'

---

### 2.4 — TR49 · truque incompatível (mesmo defeito de TR48)

PATO, LIMÃO e DEDO dão seis peças; PALITO usa três (PA, LI, TO). "Use TODAS as peças, uma vez
cada" derruba a resposta certa.

**Está lá:**
> truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.'

**Deveria estar:**
> truque:'Bata palma em cada nome e escreva os pedaços. A palavra certa só pode usar pedaços dessa lista.'

---

### 2.5 — TR27 · truque incompatível, e contradiz a própria dica do item

A `dica` diz, corretamente: *"A lição não está escrita em nenhuma linha."* O `truque` manda
exatamente o contrário: procurar a linha que responde. A criança vai varrer a fábula com a régua
atrás de uma linha que não existe.

**Está lá:**
> truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.'

**Deveria estar:**
> truque:'Na fábula, a lição não está escrita em nenhuma linha. Compare o que o bicho quis levar com o que sobrou para ele no fim.'

---

### 2.6 — TR37 · truque incompatível (pergunta de título)

Nenhuma linha do poema contém o título. O truque genérico manda achar "a linha que responde".
Compare com TR25, que é a mesma tarefa e tem o truque certo ("O título é do poema inteiro, não
de uma linha").

**Está lá:**
> truque:'A resposta mora no texto. Volte com a régua e ache a linha que responde.'

**Deveria estar:**
> truque:'O título é do poema inteiro, não de uma linha. Pergunte o que mudou do começo ao fim.'

---

### 2.7 — TR39 · truque incompatível (troca de vogais herdou o truque de anagrama)

Na troca de vogais o número de letras **nunca** muda: "sobrou ou faltou letra" não separa
nenhuma alternativa. A criança que aplicar o truque fica sem método e sem saber por que as
quatro passam.

**Está lá:**
> truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.'

**Deveria estar:**
> truque:'Troque as vogais de lugar e deixe as outras letras paradas. Leia o que saiu antes de escolher.'

---

### 2.8 — TR40 · truque incompatível (idem TR39)

**Está lá:**
> truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.'

**Deveria estar:**
> truque:'Troque as vogais de lugar e deixe as outras letras paradas. Leia o que saiu antes de escolher.'

---

### 2.9 — TR43 · truque incompatível (a pergunta é "qual letra", não "que palavra cabe")

Não há quadro de letras para riscar; a pergunta escolhe entre B, T, R e M. "Sobrou ou faltou
letra" não decide nada aqui.

**Está lá:**
> truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.'

**Deveria estar:**
> truque:'Ache as duas palavras trocadas e olhe só para elas. A letra que anda tem de estar numa das duas.'

---

### 2.10 — TR44 · truque incompatível, e deixa três candidatas de pé

"Sobrou ou faltou letra" derruba MALHA (5 letras contra 4), mas **não** derruba MULA nem BOLA,
que também têm 4 letras. A criança que seguir o truque fica com três candidatas e boa chance de
marcar MULA.

**Está lá:**
> truque:'Cada letra vale uma vez. Escreva e vá riscando: sobrou ou faltou letra, está errada.'

**Deveria estar:**
> truque:'Escreva as duas palavras uma embaixo da outra. Só a primeira letra pode mudar; o resto tem de ficar igualzinho.'

---

## 3. OBSERVAÇÕES

### 3.1 — TR26 · o poema não diz que quem fala é menina

Não há nenhuma marca de gênero no poema (só "O MEU IRMÃO PEQUENO"). O `pede` e o distrator A
afirmam "a menina" / "ela". Não muda a resposta, mas fura a doutrina do produto ("a resposta mora
no texto") num item que é justamente sobre voltar ao texto.

**Está lá:** `pede:'POR QUE A MENINA DO POEMA ANDA NA PONTA DO PÉ?'`
**Deveria estar:** `pede:'POR QUE QUEM FALA NO POEMA ANDA NA PONTA DO PÉ?'`

(Se o `pede` mudar, os comentários das alternativas A e D podem ficar como estão — "ela" passa a
ser genérico —, mas o mais limpo é trocar `PORQUE ELA ESTÁ APRENDENDO A DANÇAR.` por
`PORQUE ESTÁ APRENDENDO A DANÇAR.` e `PORQUE ELA FALA BEM BAIXINHO E NÃO CANTA NO CAMINHO.` por
`PORQUE FALA BEM BAIXINHO E NÃO CANTA NO CAMINHO.`)

### 3.2 — TR27 · o distrator C pode ser lido como lição

`PARA DESCER DA ÁRVORE É PRECISO SEGURAR NO GALHO.` está escrito na forma de regra ("é preciso"),
e uma criança pode argumentar que aprendeu isso na história. O comentário já ataca a leitura, mas
o distrator ficaria indefensável se fosse um fato puro.

**Está lá:** `{t:'PARA DESCER DA ÁRVORE É PRECISO SEGURAR NO GALHO.', no:'Essa conta uma coisa que aconteceu na história. A pergunta é qual LIÇÃO a história ensina.'}`
**Deveria estar:** `{t:'O MACACO ACHOU AS BANANAS NO ALTO DA ÁRVORE.', no:'Essa conta uma coisa que aconteceu na história. A pergunta é qual LIÇÃO a história ensina.'}`

### 3.3 — TR30 · a rima do poema quebra justamente no fecho, e o item usa "verso"

O poema rima 2–4 (LAPISEIRA/MAMADEIRA), mas a segunda metade fica sem par: ATRAPALHARAM,
MOCHILAS, JOÃO e a lacuna não rimam com nada. As quatro alternativas terminam em -EIRA e rimariam
com a linha 4, não com a linha 6 — por isso o `visual` teve de avisar que "a rima não ajuda". Num
item que pede para completar um verso, o poema deveria sustentar a rima.

**Está lá:**
> `'HOJE OS DOIS SE ATRAPALHARAM',`
> `'E TROCARAM AS MOCHILAS.',`

**Deveria estar:**
> `'HOJE OS DOIS SE ATRAPALHARAM',`
> `'E TROCARAM A MOCHILA INTEIRA.',`

(Com isso a lacuna rima com INTEIRA e o `visual` pode manter o aviso de que a rima sozinha não
decide, já que as quatro alternativas continuam rimando.)

Metalinguagem: **Está lá** `pede:'MARQUE O VERSO QUE MELHOR COMBINA COM O FINAL DA HISTÓRIA.'` —
**deveria estar** `pede:'MARQUE A LINHA QUE MELHOR COMBINA COM O FINAL DA HISTÓRIA.'`

### 3.4 — TR35 · `acende` deixa de fora meia pista

`acende:[0,2,4,5]` acende "QUANDO O SOL VAI EMBORA," (linha 2) sem a linha que a completa,
"EU TAMBÉM VOU DESCANSAR" (3); e não acende "MAS NÃO POSSO TE TOCAR" (1), que o `porque` usa
como pista ("não dá para pegar nela").

**Está lá:** `acende:[0,2,4,5],`
**Deveria estar:** `acende:[0,1,2,3,4,5],`

### 3.5 — TR37 · "que nome o AUTOR deu" pressupõe um título que não existe

O poema não tem título; a criança escolhe o que melhor combina. TR25 e TR35 já usam a formulação
certa. "Autor" também é metalinguagem evitável.

**Está lá:** `pede:'PENSE SOBRE O PEQUENO POEMA ACIMA E RESPONDA: QUE NOME O AUTOR DEU A ELE?'`
**Deveria estar:** `pede:'PENSE SOBRE O PEQUENO POEMA ACIMA E RESPONDA: QUE NOME MAIS COMBINA COM ELE?'`

### 3.6 — TR42 · o enunciado entrega a resposta

"BRUNO RECORTOU AS LETRAS DE UMA **FRUTA**" com as opções MORCEGO, AMOR, MORANGO e MARROM: só
uma é fruta. Dá para acertar sem contar uma letra sequer — o item deixa de treinar o que se propõe.
(TR45 acerta ao dizer "um brinquedo" tendo BONECO **e** BONECA entre as opções: a pista não resolve.)

**Está lá:** `enun:'BRUNO RECORTOU AS LETRAS DE UMA FRUTA E ELAS SE ESPALHARAM PELA MESA:'`
**Deveria estar:** `enun:'BRUNO RECORTOU AS LETRAS DE UMA PALAVRA E ELAS SE ESPALHARAM PELA MESA:'`

### 3.7 — TR51 · o comentário de CANA conta as peças errado

CANA usa **uma** peça de verdade (NA) e inventa CA; o comentário diz que "gasta só duas peças".
Não é fato falso sobre a palavra, é imprecisão sobre a contagem, no item que ensina a contar peças.

**Está lá:**
> CANA usa o NA, que existe, e por isso engana. Mas CA não é o fim de nenhuma das três palavras, e a CANA gasta só duas peças: sobram o BA e um NA.

**Deveria estar:**
> CANA não serve: CA não é o fim de nenhuma das três palavras. E CANA tem dois pedaços só, então o BA e um NA ficariam sobrando. A armadilha é o NA, que existe mesmo.

### 3.8 — TR52 · truque vago (não chega a ser incompatível)

"Use TODAS as peças, uma vez cada" é verdade aqui (as três sílabas que andaram são usadas uma vez
cada), mas não descreve o gesto: desembaraçar palavra por palavra. Não induz erro; só não ajuda.

**Está lá:** `truque:'Bata palma em cada pedaço. Use TODAS as peças, uma vez cada.'`
**Deveria estar:** `truque:'Bata palma em cada palavra esquisita e ache o pedaço que não é dela. Esse pedaço foi parar em outra palavra da frase.'`

### 3.9 — TR39 e TR40 · três ordens numa `dica` só

**TR39 está lá:** `dica:'Vogal é A, E, I, O, U. Marque as duas vogais da palavra, troque só elas de lugar e leia o que saiu.'`
**Deveria estar:** `dica:'Vogal é A, E, I, O, U. Marque as duas vogais da palavra. Agora troque só elas de lugar e leia o que saiu.'`

**TR40 está lá:** `dica:'Vogal é A, E, I, O, U. Troque só as duas vogais de cada palavra, leia o que saiu e depois pergunte: isso é coisa de aula de matemática?'`
**Deveria estar:** `dica:'Vogal é A, E, I, O, U. Troque só as duas vogais de cada palavra e leia o que saiu. Depois pergunte: isso é coisa de aula de matemática?'`

---

## 4. Redação: o padrão "valida a errada antes de negá-la" (26 ocorrências)

A regra nova sobreviveu inteira nos eixos `letras` e `silabas` — os 14 itens de `ler` estão limpos.
A forma recorrente é abrir o comentário dizendo o que a alternativa errada tem de certo ("é palavra
de verdade", "usa duas peças de verdade", "está certo, sim", "começa certinho") e só depois virar
com "Mas" / "Só que". Abaixo, cada ocorrência com o substituto pronto para colar. A forma do
substituto é sempre: **nega primeiro, refaz a conta, e só no fim nomeia a armadilha.**

### TR39
| alt | está lá | deveria estar |
|---|---|---|
| SALTO | `SALTO com as vogais trocadas vira SOLTA — a corda ficou solta. É palavra de verdade, e é por isso que engana. Mas ninguém toma uma solta de colher.` | `SALTO não serve: trocando as vogais, ela vira SOLTA, e ninguém toma uma solta de colher. A armadilha é que SOLTA existe como palavra.` |
| COLA | `COLA com as vogais trocadas vira CALO, aquele calo que nasce no pé de tanto andar. Também formou palavra de verdade, e também não é comida.` | `COLA não serve: trocando as vogais, ela vira CALO, aquele calo que nasce no pé de tanto andar, e calo não é comida. A armadilha é que CALO existe como palavra.` |
| VELA | `VELA com as vogais trocadas vira VALE. Formou palavra, só que vale não é quente, não é comida e ninguém come de colher.` | `VELA não serve: trocando as vogais, ela vira VALE, e vale não é quente, não é comida e ninguém come de colher. A armadilha é que VALE existe como palavra.` |

### TR40
| alt | está lá | deveria estar |
|---|---|---|
| MANTO | `MANTO com as vogais trocadas vira MONTA — ele monta no cavalo. É palavra de verdade, mas montar não é coisa de aula de matemática.` | `MANTO não serve: trocando as vogais, ela vira MONTA — ele monta no cavalo —, e montar não é coisa de aula de matemática. A armadilha é que MONTA existe como palavra.` |
| CARRO | `CARRO com as vogais trocadas vira CORRA — corra, que o ônibus está saindo! Formou palavra, só que correr é na educação física, não na matemática.` | `CARRO não serve: trocando as vogais, ela vira CORRA — corra, que o ônibus está saindo! —, e correr é na educação física, não na matemática. A armadilha é que CORRA existe como palavra.` |

(A alternativa BANHO já está no formato certo: nega e pronto.)

### TR41
| alt | está lá | deveria estar |
|---|---|---|
| GARRAFA | `GARRAFA engana porque tem GA, RRA e um monte de A, igualzinho ao que está no chão. Mas ela precisa de um F, e não existe nenhum F entre as letras de Caio. Ela ainda deixaria os dois T e o U sobrando.` | `GARRAFA não serve: ela precisa de um F, e não existe nenhum F entre as letras de Caio. Ainda deixaria os dois T e o U sobrando. A armadilha é o GA, o RRA e o monte de A, que estão lá mesmo.` |
| GUITARRA | `GUITARRA é a mais perigosa: tem G, T, A e os dois R, tudo parecido. Mas ela pede um I, e não foi dado nenhum I. Conte também: GUITARRA tem 8 letras, e no chão há 9.` | `GUITARRA não serve: ela pede um I, e não foi dado nenhum I. Conte também: GUITARRA tem 8 letras e no chão há 9. A armadilha é o G, o T, o A e os dois R, que estão todos lá.` |
| GARRA | `GARRA usa só letras que estão mesmo no chão: G, A, R, R, A. O problema é que ela gasta 5 e para. Sobram os dois T, um A e o U — quando sobra letra, a palavra está errada.` | `GARRA não serve: ela gasta 5 letras e para, deixando os dois T, um A e o U no chão — quando sobra letra, a palavra está errada. A armadilha é que todas as letras de GARRA estão mesmo no chão.` |

### TR42
| alt | está lá | deveria estar |
|---|---|---|
| MORCEGO | `MORCEGO é a mais perigosa: tem 7 letras, igualzinho ao monte da mesa, e começa com MOR. Mas ela pede um C e um E, e não existe nem C nem E entre as letras recortadas.` | `MORCEGO não serve: ela pede um C e um E, e não existe nem C nem E entre as letras recortadas. A armadilha são as 7 letras e o começo MOR, iguaizinhos ao monte da mesa.` |
| AMOR | `AMOR só usa letras que estão mesmo na mesa: A, M, O, R. Mas ela gasta 4 e para. Sobram o N, o G e o segundo O — quando sobra letra, a palavra está errada.` | `AMOR não serve: ela gasta 4 letras e para, deixando o N, o G e o segundo O na mesa — quando sobra letra, a palavra está errada. A armadilha é que A, M, O e R estão mesmo lá.` |
| MARROM | `MARROM engana porque é fácil de lembrar e usa M, A, R e O, que estão lá. Mas ela pede DOIS M e DOIS R, e Bruno recortou um M só e um R só.` | `MARROM não serve: ela pede DOIS M e DOIS R, e Bruno recortou um M só e um R só. A armadilha é ser fácil de lembrar e usar M, A, R e O, que estão lá.` |

### TR43
| alt | está lá | deveria estar |
|---|---|---|
| T | `O T existe, sim — está nas duas palavras. Por isso ele atrai. Mas experimente: tirando o T de PRATO sobra PRAO, e PATO com dois T fica PATTO. Não conserta nada.` | `O T não conserta nada: tirando o T de PRATO sobra PRAO, e PATO com dois T fica PATTO. A armadilha é o T estar nas duas palavras.` |
| M | `O M aparece em MESA, e é por isso que ele parece candidato. Mas as palavras esquisitas são PRATO e PATO, e nenhuma das duas tem M.` | `O M não serve: as palavras esquisitas são PRATO e PATO, e nenhuma das duas tem M. A armadilha é o M que aparece em MESA.` |

### TR44
| alt | está lá | deveria estar |
|---|---|---|
| MULA | `MULA é palavra de verdade e é bem parecida com MALA, e é por isso que engana. Mas escreva uma embaixo da outra: a primeira letra continua sendo o M. Quem mudou foi a letra do meio.` | `MULA não serve: escreva uma embaixo da outra e veja que a primeira letra continua sendo o M — quem mudou foi a letra do meio. A armadilha é MULA ser palavra de verdade e bem parecida com MALA.` |
| MALHA | `MALHA também é palavra de verdade, e começa igualzinho. Mas conte as letras: MALA tem 4 e MALHA tem 5. Entrou um H no meio — e a brincadeira não deixa entrar letra nova.` | `MALHA não serve: conte as letras, MALA tem 4 e MALHA tem 5. Entrou um H no meio, e a brincadeira não deixa entrar letra nova. A armadilha é MALHA começar igualzinho.` |
| BOLA | `BOLA começa com B, e é isso que faz parecer certa. Só que mudaram DUAS letras: o M virou B e o A virou O. A brincadeira troca uma letra só, a primeira.` | `BOLA não serve: mudaram DUAS letras, o M virou B e o A virou O. A brincadeira troca uma letra só, a primeira. A armadilha é BOLA começar com B.` |

### TR45
| alt | está lá | deveria estar |
|---|---|---|
| BOCA | `BOCA usa só letras que estão mesmo no embaralhado: B, O, C, A. Mas gasta 4 e para, deixando o N e o E sobrando. Quando sobra letra, a palavra está errada.` | `BOCA não serve: gasta 4 letras e para, deixando o N e o E sobrando. Quando sobra letra, a palavra está errada. A armadilha é que B, O, C e A estão mesmo no embaralhado.` |
| CANOA | `CANOA parece caber, e é por isso que atrai. Mas ela pede DOIS A, e só foi dado um. E ainda deixaria o B e o E sem uso.` | `CANOA não serve: ela pede DOIS A, e só foi dado um. Ainda deixaria o B e o E sem uso. A armadilha é ela parecer caber.` |

### TR46
| alt | está lá | deveria estar |
|---|---|---|
| CHINELO | `CHINELO começa certinho, com o CHI, e por isso engana quem confere só o começo. Mas bata palma até o fim: CHI-NE-LO. NE e LO ninguém deu, e sobrariam o MO e o LA.` | `CHINELO não serve: bata palma até o fim, CHI-NE-LO. NE e LO ninguém deu, e sobrariam o MO e o LA. A armadilha é o começo CHI, que está certo.` |
| MOLA | `MOLA usa duas peças de verdade, o MO e o LA. Mas gasta só duas e para: o CHI fica parado na mesa. Tem de usar as três.` | `MOLA não serve: gasta só duas peças e para, e o CHI fica parado na mesa. Tem de usar as três. A armadilha é que MO e LA são peças de verdade.` |

### TR47
| alt | está lá | deveria estar |
|---|---|---|
| COLA | `COLA usa duas peças de verdade, o CO e o LA, e por isso parece certa. Mas gasta só duas e para: o CHO e o TE ficam parados na mesa.` | `COLA não serve: gasta só duas peças e para, e o CHO e o TE ficam parados na mesa. A armadilha é que CO e LA são peças de verdade.` |
| CHOCALHO | `CHOCALHO começa com CHO, igualzinho à peça, e é essa a isca. Mas bata palma: CHO-CA-LHO. CA e LHO ninguém deu — as peças são CO e LA. Uma letra de diferença em cada uma.` | `CHOCALHO não serve: bata palma, CHO-CA-LHO. CA e LHO ninguém deu — as peças são CO e LA, uma letra de diferença em cada uma. A armadilha é o CHO do começo, igualzinho à peça.` |
| COLETE | `COLETE quase fecha: CO está lá e TE está lá. Mas o pedaço do meio é LE, e a peça que você tem é LA. Uma letra de diferença — e o CHO ainda sobraria.` | `COLETE não serve: o pedaço do meio é LE, e a peça que você tem é LA — uma letra de diferença. E o CHO ainda sobraria. A armadilha é o CO e o TE, que estão lá.` |

### TR48
| alt | está lá | deveria estar |
|---|---|---|
| PIRATA | `PIRATA começa com o PI do pirulito, e quem confere só o começo marca esta. Mas o pirulito dá PI-RU-LI-TO: ele tem RU, não RA. E TA não sai de nome nenhum.` | `PIRATA não serve: o pirulito dá PI-RU-LI-TO, ou seja, tem RU e não RA. E TA não sai de nome nenhum. A armadilha é o PI do começo.` |
| PICOLÉ | `PICOLÉ atrai porque parece irmão do pirulito e começa com PI, que existe mesmo. Só que o segundo pedaço é CO, e o caderno dá CA — uma letra de diferença. E LÉ ninguém tem.` | `PICOLÉ não serve: o segundo pedaço é CO, e o caderno dá CA — uma letra de diferença. E LÉ ninguém tem. A armadilha é PICOLÉ parecer irmão do pirulito e começar com PI.` |
| TOMADA | `TOMADA começa com o TO, que é o último pedaço do pirulito, e por isso engana. Mas MA e DA não saem de nenhum dos três nomes.` | `TOMADA não serve: MA e DA não saem de nenhum dos três nomes. A armadilha é o TO do começo, que é o último pedaço do pirulito.` |

### TR49
| alt | está lá | deveria estar |
|---|---|---|
| LIMONADA | `LIMONADA é a mais perigosa: o LI do limão está lá mesmo. Mas o segundo pedaço é MO, e o limão dá LI-MÃO — a peça é MÃO, com M e til. E NA e DA ninguém tem.` | `LIMONADA não serve: o segundo pedaço é MO, e o limão dá LI-MÃO — a peça é MÃO, com M e til. E NA e DA ninguém tem. A armadilha é o LI, que está lá mesmo.` |
| DEDÃO | `DEDÃO pega o DE do dedo, e o resto parece caber. Mas DÃO não existe nos nomes: o limão termina em MÃO, com M. Uma letra de diferença derruba a palavra inteira.` | `DEDÃO não serve: DÃO não existe nos nomes, porque o limão termina em MÃO, com M. Uma letra de diferença derruba a palavra inteira. A armadilha é o DE do dedo.` |

### TR51
| alt | está lá | deveria estar |
|---|---|---|
| NABO | `NABO começa com o NA, que é peça de verdade. Mas o segundo pedaço é BO, e nenhuma das três palavras termina em BO: o samba termina em BA. E ainda sobrariam duas peças.` | `NABO não serve: o segundo pedaço é BO, e nenhuma das três palavras termina em BO — o samba termina em BA. E ainda sobrariam duas peças. A armadilha é o NA do começo, que é peça de verdade.` |
| CANA | (ver 3.7) | (ver 3.7) |

### TR52
| alt | está lá | deveria estar |
|---|---|---|
| A | `Abelha pica, e por isso essa parece a história certa. Mas PICOU pede as peças PI e COU, e as peças que andaram foram BE, SOU e NI. Nenhuma delas forma PICOU.` | `Aqui a abelha não picou ninguém: PICOU pede as peças PI e COU, e as peças que andaram foram BE, SOU e NI. Nenhuma delas forma PICOU. A armadilha é que abelha pica de verdade.` |
| B | `Aqui a abelha e a menina estão certas, e é isso que engana. Mas ESPANTOU e CHAPÉU não saem de peça nenhuma: nenhuma sílaba da frase embaralhada vira essas palavras.` | `ESPANTOU e CHAPÉU não saem de peça nenhuma: nenhuma sílaba da frase embaralhada vira essas palavras. A armadilha é a abelha e a menina estarem certas.` |
| C | `POUSOU e MENINA estão certos — quem desembaraça duas palavras e inventa a terceira cai aqui. Mas ANILHA não vira PASSARINHO: devolvendo o BE no lugar do NI, ela vira ABELHA.` | `ANILHA não vira PASSARINHO: devolvendo o BE no lugar do NI, ela vira ABELHA. A armadilha é POUSOU e MENINA estarem certos — quem desembaraça duas palavras e inventa a terceira cai aqui.` |

---

## 5. O que passou no crivo

- **Ambiguidade: zero.** Nas 28, a alternativa marcada é a única defensável. Ataquei cada distrator
  procurando a leitura alternativa (título tirado da linha isolada em TR25/TR37; "lição" lida como
  fato em TR27; "descansar na rede" como fecho natural em TR32; rima repetida em TR30) e nenhuma
  se sustenta contra o gabarito.
- **Contas de letra e sílaba: todas fecham.** Em TR41, TR42 e TR45 a resposta certa consome o
  quadro exatamente, e cada errada falha pelo motivo que o comentário alega — conferido letra a letra.
- **Rimas lidas em voz alta:** TR25 (cadeira/geladeira, escada/guardada, comida/dormida), TR28
  (sossegado/lado, fogão/violão), TR31 (galinha/cadeirinha, pato/sapato, arara/cara, coelha/telha)
  e TR26 (baixinho/caminho, adormecer/amanhecer) funcionam. A única que não fecha é a de TR30 (3.3).
- **`acende`:** aponta as linhas certas em 13 dos 14 itens de `ler`; só TR35 fica curto (3.4).
- **Vocabulário:** nenhuma resposta certa depende de palavra improvável para 7 anos (dorminhoco,
  sombra, animado, sopa, conta, tartaruga, morango, boneca, mochila, chocolate, pipoca, palito,
  sorvete, banana). Palavras mais difíceis (manto, calo, vale, anilha) estão só em distrator ou na
  frase embaralhada, como manda a regra.
- **Metalinguagem:** "sufixo", "anagrama", "substantivo", "campo semântico", "estrofe" e
  "personagem" não aparecem em nenhum dos 28. TR32 explica -ÃO e -INHO sem nomear sufixo — é o
  melhor exemplo do lote. Sobraram só "verso" (TR30) e "autor" (TR37), tratados acima.
- **`origem`:** 28/28 exatamente `'Treino no estilo da prova'`.

## 6. Itens a REMOVER

Nenhum. As 10 falhas críticas são de comentário e de `truque` — todas se resolvem colando o texto
proposto, sem tocar em enunciado, alternativas ou gabarito.
