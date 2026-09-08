# AUDITORIA DE FIDELIDADE — `ferramentas/OP_data.js`

**Data:** 08/09/2026 · **Itens auditados:** 29 (14 de 2025·F1 + 15 de 2024·F1)
**Fontes da verdade usadas:** `_fontes_md/OP_2025_catG_fase1_prova.md`, `_fontes_md/OP_2024_catG_fase1_prova.md`, `_fontes/DOSSIE_2025.md`, `_fontes/DOSSIE_2024.md` e os dois gabaritos oficiais já confirmados.
**Nada foi editado.** Este documento só relata.

**Gabaritos de referência**
- 2025·F1: 1=A 2=C 3=D 4=A 5=B 6=A 7=C 8=D 9=B 10=C 11=B 12=B 13=B 14=A 15=D
- 2024·F1: 1=C 2=A 3=C 4=C 5=D 6=C 7=C 8=B 9=D 10=B 11=C 12=C 13=A 14=D 15=D

> **Cobertura.** 2025 entra com 14 itens (e não 15) porque só a **Q4 — aquela em que as quatro placas desenhadas SÃO as alternativas** — ficou de fora; a exclusão está declarada no cabeçalho do próprio arquivo. Legítima. 2024 entra completa, com as 15.

---

## TABELA ITEM A ITEM

| id | gabarito confere? | enunciado confere? | alternativas conferem? | comentários verdadeiros? | veredito |
|---|---|---|---|---|---|
| 25F1Q1 | SIM (A · LETRA J.) | SIM, verbatim | SIM (J/P/A/M) | SIM | **OK** |
| 25F1Q2 | SIM (C · CHUVA.) | SIM, verbatim | SIM | SIM | **OK** (1 obs. técnica: `ok:0`) |
| 25F1Q3 | SIM (D · UMA SACOLA.) | SIM, verbatim | SIM | **NÃO** — `no` de SALADA é falso | **FALHA CRÍTICA** |
| 25F1Q5 | SIM (B · FALCÃO.) | SIM | SIM | SIM | **OK** |
| 25F1Q6 | SIM (A · GALO.) | SIM, verbatim | SIM | SIM (GOTA/GOLE/GARI conferidos) | **OK** |
| 25F1Q7 | SIM (C) | corte decorativo (1 linha) | SIM | SIM (todas as vogais recontadas) | **OK** (obs.) |
| 25F1Q8 | SIM (D · MACARRÃO.) | 2 cortes decorativos | SIM | SIM (sílabas recontadas) | **OK** (obs.) |
| 25F1Q9 | SIM (B · LETRA B) | SIM, verbatim | SIM | SIM | **OK** |
| 25F1Q10 | SIM (C · ALICATE.) | SIM, verbatim | SIM | SIM nos `no`; **`dica` tem erro de contagem** | **OK com observação forte** |
| 25F1Q11 | SIM (B · GOLFINHO.) | SIM | SIM | **NÃO** — "GAFANHOTO precisa de três A" | **FALHA CRÍTICA** |
| 25F1Q12 | SIM (B · H.) | SIM, verbatim | **NÃO** — a alternativa (C) foi trocada | **FALHA CRÍTICA** |
| 25F1Q13 | SIM (B) | SIM, verbatim (8 linhas) | SIM | SIM; `acende:[0,2,3]` correto | **OK** |
| 25F1Q14 | SIM (A · ADOCICADO) | SIM, verbatim (12 linhas) | SIM | **NÃO** — "GELADO não rima com ERRADO" | **FALHA CRÍTICA** |
| 25F1Q15 | SIM (D) | **adaptação não declarada que muda o raciocínio** | SIM | SIM | **FALHA CRÍTICA (enunciado)** |
| 24F1Q1 | SIM (C · AMOR.) | SIM, verbatim | SIM | SIM (BATATA/ALMA/CINTO conferidos) | **OK** |
| 24F1Q2 | SIM (A · UM) | SIM, verbatim | SIM | SIM | **OK** |
| 24F1Q3 | SIM (C · GOLE) | adaptação de figura **com `nota`** | SIM | imprecisão no `no` de GOTA | **OK com observação** |
| 24F1Q4 | SIM (C) | SIM, verbatim | SIM | SIM (consoantes/vogais recontadas: 19×11) | **OK** (obs. no `visual`) |
| 24F1Q5 | SIM (D · A LETRA Z.) | `pede` acrescentado | SIM | SIM | **OK** (obs.) |
| 24F1Q6 | SIM (C · ÓCULOS) | SIM, verbatim | SIM | SIM | **OK** |
| 24F1Q7 | SIM (C · NADAR, MERGULHAR, MAR.) | **definição de verbo cortada, sem `nota`** | SIM | SIM | **OK com observação forte** |
| 24F1Q8 | SIM (B · LÁ VÊM AS FÉRIAS!) | SIM (falta o `[...]`) | SIM | SIM; `acende:[0,12,13]` correto | **OK** (obs.) |
| 24F1Q9 | SIM (D · TERMINOU.) | reescrita leve do comando | SIM | SIM | **OK** (obs.) |
| 24F1Q10 | SIM (B · JULIETA/CARETA) | atribuição remontada | SIM | SIM (rimas conferidas) | **OK** (obs.) |
| 24F1Q11 | SIM (C · CAFANGA) | adaptação de figura **com `nota`** | SIM | SIM (banco de sílabas confere) | **OK** |
| 24F1Q12 | SIM (C) | SIM, verbatim (12 linhas) | SIM | SIM nos `no`; "duas vezes" no `porque` é frouxo | **OK** (obs.) |
| 24F1Q13 | SIM (A · MOMENTINHO/PRONTINHO) | condensado + "DA CASA" cortado | SIM | SIM; `acende:[1,3,5]` correto | **OK** (obs.) |
| 24F1Q14 | SIM (D · JOELHO) | verbatim, quebrado em 5 linhas | SIM | SIM | **OK** (obs.) |
| 24F1Q15 | SIM (D) | condensado (decorativo) | SIM | SIM (decodificação inteira conferida) | **OK** (obs.) |

**Gabarito: 29 de 29 corretos.** Nenhum item marca `ok:1` numa alternativa diferente da do gabarito oficial.

---

## FALHAS CRÍTICAS (5)

### 1. `25F1Q11` — contagem de letra falsa no comentário de GAFANHOTO

**Está lá:**
> `no:'GAFANHOTO precisa de três A, e não tem nenhum A no caminho. Ele tem G, F e H iguais aos do caminho — é por isso que engana.'`

**Verificação:** G-A-F-A-N-H-O-T-O → 9 letras, **dois A** (posições 2 e 4), dois O, um G, um F, um N, um H, um T.

**Deveria estar:**
> `no:'GAFANHOTO precisa de dois A, e não tem nenhum A no caminho. Ele ainda pede um T, que também não foi dado. Tem G, F e H iguais aos do caminho — é por isso que engana.'`

Por que é crítico: a questão é justamente sobre contar letra por letra; o comentário conta errado exatamente onde ensina a contar.

---

### 2. `25F1Q12` — alternativa substituída (a prova tem **M**, o banco tem **C**)

**Prova oficial (e DOSSIE_2025):** `(A) B. (B) H. (C) M. (D) P.`
**Está no banco:** `B.` / `H.` (ok:1) / **`C.`** / `P.`

O terceiro distrator foi trocado: **M → C**. E o comentário foi reescrito sob medida para a alternativa inexistente:

**Está lá:**
> `{t:'C.', no:'Não é o C que está no lugar errado. Olhe só as duas palavras esquisitas da frase: GALHO e GALO.'}`

**Deveria estar:**
> `{t:'M.', no:'Não existe nenhum M nas duas palavras trocadas. Essa também dava para riscar de cara.'}`

Por que é crítico: o item se apresenta como "prova de verdade" e mostra uma alternativa que nunca existiu na prova. Note ainda que o comentário atual é o único dos três distratores que **não** usa o argumento de descarte ("não existe essa letra nas palavras") — que é exatamente o gesto que o item deveria treinar, e que vale igualmente para o M.

---

### 3. `25F1Q14` — afirmação de rima falsa

**Está lá:**
> `{t:'ESTAVA AZEDO E GELADO.', no:'Nada no poema fala de azedo nem de gelado, e o verso ainda não rima com ERRADO.'}`

**Verificação:** ERR-**ADO** / GEL-**ADO**. Rimam perfeitamente. E não é só essa: ADOCICADO, APIMENTADO, SALGADO e GELADO terminam todas em **-ADO**. Ou seja, **as quatro alternativas rimam com ERRADO** — a rima não decide nada nesta questão, e a (D) é errada só pelo sentido.

**Deveria estar:**
> `{t:'ESTAVA AZEDO E GELADO.', no:'Rimar com ERRADO ela rima, mas nada no poema fala de azedo nem de gelado. Aqui a rima não decide: as quatro rimam. Quem decide é o que estava no pote.'}`

Por que é crítico: ensina à criança um critério de rima falso e, pior, sugere que a rima resolve a questão quando ela não resolve.

---

### 4. `25F1Q3` — comentário falso sobre SALADA

**Está lá:**
> `{t:'UMA SALADA.', no:'SALADA usa o SA e o LA, mas esquece o CO e ainda repete o LA. Cada peça vale uma vez só.'}`

**Verificação:** SALADA = **SA-LA-DA**. O LA aparece **uma vez só**. Não há repetição. O que há é uma sílaba **DA** que ninguém deu.

**Deveria estar:**
> `{t:'UMA SALADA.', no:'SALADA usa o SA e o LA, mas esquece o CO e ainda pede um DA que ninguém te deu. Cada peça vale uma vez, e só valem as peças que você recebeu.'}`

---

### 5. `25F1Q15` — a tabela do código foi reordenada; a adaptação não está declarada e mata o raciocínio da questão

**Na prova (confirmado no DOSSIE_2025):** a tabela está **embaralhada** —
`☀=NHA · ⁂=SÓ · ▲=MAL · ⇝=DO · •=TES · ▶=A · ●=PA · ∞=QUE · ▢=AN · ◀=COM`
e a sequência salta entre as colunas: `▢ • ⁂ ⇝ ∞ ▲ ▶ ◀ ● ☀ ⇝` (colunas 9,5,2,4,8,3,6,10,7,1,4).

**No banco:** a tabela está **em ordem de resposta** —
`■=AN · ●=TES · ▲=SÓ · ▼=DO · ◆=QUE · ★=MAL · ♥=A · ☼=COM · ♪=PA · ✦=NHA`
e a sequência é `■ ● ▲ ▼ ◆ ★ ♥ ☼ ♪ ✦ ▼` (colunas 1,2,3,4,5,6,7,8,9,10,4).

Consequência: **basta ler a linha de baixo da tabela da esquerda para a direita** para obter "ANTES SÓ DO QUE MAL ACOMPANHADO", sem olhar um único símbolo. A questão deixa de treinar exatamente o que o `truque` do item promete ("dedo no símbolo, dedo na tabela, escreva a peça") e o que o `porque` afirma ("decodificando símbolo por símbolo, sem pular nenhum").

A `nota` atual declara só a troca dos desenhos:
> `nota:'Na prova os símbolos são outros desenhinhos, e a última sílaba (DO) se repete no fim — igual a esta aqui.'`

**Correção devida (a preferível):** reembaralhar a tabela para que a ordem das colunas não seja a ordem da frase — p.ex. manter os símbolos atuais e reordenar as colunas para `NHA · SÓ · MAL · DO · TES · A · PA · QUE · AN · COM` (a ordem da prova), ajustando a sequência aos símbolos correspondentes. Aí a `nota` atual passa a ser suficiente e verdadeira.
**Correção mínima (se a ordem for mantida):** a `nota` tem de declarar em português claro:
> `nota:'Na prova os símbolos são outros desenhinhos e a tabela está embaralhada, então lá é preciso caçar cada símbolo. Aqui a tabela está na ordem, para você treinar a leitura símbolo por símbolo sem se perder. A última sílaba (DO) se repete no fim, igual à prova.'`

---

## OBSERVAÇÕES (16)

1. **`25F1Q10` · `dica` com contagem errada.** Está lá: *"As quatro começam com A e têm o mesmo tamanho: o som não ajuda."* — ABACAXI, ACEROLA e ALICATE têm 7 letras e 4 sílabas; **AMEIXA tem 6 letras e 3 sílabas**. Deveria estar: *"As quatro começam com A e três delas têm o mesmo tamanho: o som não ajuda."* (Não é `no` nem `porque`, por isso não entra como crítica — mas é afirmação factualmente falsa.)

2. **`25F1Q3` · `no` de LAÇO trata ÇO como se fosse a peça CO.** Está lá: *"LAÇO gasta só duas peças e para. Sobrou o SA na mesa."* — LAÇO = LA + **ÇO**, e a peça dada é **CO**. Sobram, na verdade, **CO e SA**. Sugestão: *"LAÇO usa o LA e para. O ÇO nem é a peça CO que te deram. Sobraram duas peças na mesa — quando sobra peça, a palavra está errada."* O mesmo vale para o último bloco do `visual`, que marca CO como peça usada.

3. **`24F1Q3` · `no` de GOTA impreciso.** Está lá: *"Repare: GOTA nem usa as letras de GELO."* — GOTA e GELO compartilham **G** e **O**; o que GOTA pede a mais são **T** e **A**, que GELO não tem. Sugestão: *"Repare: GOTA precisa de um T e de um A, e GELO não tem nem um nem outro."*

4. **`24F1Q4` · `visual` inventa o grupo "BLH".** A peça `<span class="pc hit">BLH</span>` não corresponde a nada: em TRABALHA (T-R-A-B-A-L-H-A) o grupo grudado é **LH**, com o B separado por um A. O `porque` do mesmo item já diz LH corretamente. Trocar a peça `BLH` por `LH`.

5. **`24F1Q12` · `porque` frouxo.** Está lá: *"O poema chama a rua de PERDIDA, de QUIETA e de TRISTONHA, duas vezes."* — PERDIDA e TRISTONHA se repetem; **QUIETA aparece uma vez só**. Sugestão: *"...de PERDIDA, de QUIETA e de TRISTONHA — e repete PERDIDA e TRISTONHA duas vezes."*

6. **`24F1Q7` · a definição de verbo foi cortada, sem `nota`.** A prova diz: *"VERBOS SÃO PALAVRAS QUE SIGNIFICAM AÇÕES, ESTADOS, MUDANÇAS DE ESTADO E FENÔMENOS DA NATUREZA."* O banco traz só *"...QUE SIGNIFICAM AÇÕES."* Não altera o raciocínio **desta** questão (as 12 palavras corretas são todas de ação), mas ensina uma definição incompleta de verbo e é adaptação não declarada. Ou restaurar o texto integral, ou acrescentar `nota`.

7. **`24F1Q5` · `pede` acrescentado.** A prova tem só *"QUEM SOU EU?"*; o banco criou *"QUAL É A LETRA?"*. Necessário pela estrutura `enun`/`pede` do motor, e não muda o raciocínio. Adaptação legítima, sem `nota`.

8. **`25F1Q7` · corte decorativo.** Sumiu *"VEJA OS NOMES DOS ANIMAIS QUE ESTAVAM NA FILA:"* (a lista foi absorvida pelo `quadro`). Permitido.

9. **`25F1Q8` · dois cortes decorativos.** Sumiram *"LONGE DA ALGAZARRA"* e *"FAMOSO POR SER MUITO ESTUDIOSO"*. Permitido.

10. **`25F1Q15` · `pede` condensado.** Prova: *"...PARA DESCOBRI-LA, CONSULTE A TABELA ACIMA E JUNTE AS SÍLABAS NA ORDEM CORRETA. ASSINALE A FRASE FORMADA."* Banco: *"...JUNTE AS SÍLABAS NA ORDEM CORRETA E ASSINALE A FRASE FORMADA."* Sem mudança de sentido — mas some justamente a instrução "CONSULTE A TABELA", que é o gesto atacado pela falha crítica nº 5.

11. **`24F1Q8` · o `[...]` da prova não foi reproduzido.** O poema oficial traz a marca de trecho omitido entre *"VOU BRINCAR LÁ FORA..."* e *"VOU LER O QUE EU QUERO,"*. Inócuo para a resposta.

12. **`24F1Q9` · comando reescrito.** Prova: *"MARQUE A ALTERNATIVA COM A PALAVRA QUE PODERIA ENTRAR NO LUGAR DE CESSOU"*; banco: *"MARQUE A PALAVRA QUE..."*. Sem mudança de sentido. (Confirmado: o "APARECEM AS FLORES **NA FEIRA**" do `quadro` está certo — é assim na prova oficial, e não deve ser "corrigido".)

13. **`24F1Q10` · atribuição remontada.** Na prova, "DE CECÍLIA MEIRELES" vem no comando da questão; no banco subiu para o cabeçalho (*"LEIA A POESIA DE CECÍLIA MEIRELES:"*). Sem mudança de sentido.

14. **`24F1Q13` · enunciado condensado.** Sumiram *"UM BELO SÁBADO À TARDE... DECIDE LANCHAR FORA DE CASA"* e o *"DA CASA"* de "HAMBÚRGUER DA CASA". Decorativos, permitidos.

15. **`24F1Q14` e `24F1Q15` · reformatação.** Em Q14 o parágrafo único da prova foi quebrado em 5 linhas (verbatim) para ativar a régua; em Q15 o enunciado longo foi condensado. Permitidos.

16. **`25F1Q2` · `ok:0` explícito em LUA.** As demais alternativas erradas simplesmente omitem `ok`. Inócuo (os dois motores fazem `ok:!!o.ok`), mas é a única inconsistência de esquema no arquivo.

---

## O QUE FOI CONFERIDO POR CONTAGEM DE VERDADE (não por plausibilidade)

- **25F1Q6:** GATO→GOTA, GELO→GOLE, GIRA→GARI, GALO→GOLA — as quatro trocas de vogal executadas letra a letra. Todas corretas.
- **25F1Q7:** vogais de JACARÉ (A,E), LAGARTA (só A), MACACO (A,O), TAMANDUÁ (A,U), CAPIVARA (A,I), URUBU (só U), ARARA (só A). Confere.
- **25F1Q8:** BO-LO (2), A-BA-CA-TE (4), CAR-NE (2), MA-CAR-RÃO (3), e a presença/ausência de C em cada. Confere.
- **25F1Q11:** as 8 letras do caminho (O,F,H,L,N,O,I,G) contra GOLFINHO (8, dois O — fecha exato), GAFANHOTO (9, dois A), FLAMINGO (8, precisa de A e M), GALINHO (7, precisa de A). Só a contagem de A de GAFANHOTO estava errada.
- **24F1Q1:** ordem alfabética de BATATA, ALMA, AMOR, CINTO — inclusive que o O vem antes do T (CINTO). Confere.
- **24F1Q4:** consoantes × vogais nas quatro frases, letra a letra: (A) 10×13 · (B) 10×13 · **(C) 19×11** · (D) 13×18. Gabarito (C) confirmado por contagem independente. E (D) é de fato a frase mais comprida (31 letras contra 30 de C).
- **24F1Q10:** rimas ARABELA/JANELA, CAROLINA/CORTINA, MARIA/SORRIA, JULIETA/CARETA, e as não-rimas JOANA/BRIGADEIRO, LUÍZA/ROUPA, AMANDA/ÁGUA. Confere.
- **24F1Q11:** banco de sílabas GA·LO·CA·VA·LO·E·LE·FAN·TE conferido contra CAFANGA (CA+FAN+GA, todas do banco), COELHO (CO e LHO fora), ELEVADOR (DOR fora), GALOPANTE (PAN fora — o elefante dá FAN). Confere; o `visual` está certo.
- **24F1Q13:** os seis diminutivos citados (MINUTINHO, OLHADINHA, SUQUINHO, BATATINHA, PROBLEMINHA, MAQUININHA) existem todos no diálogo. Confere.
- **24F1Q15:** a permutação silábica inteira refeita — PALDERA→PALMEIRA, ECAUME→ENORME, MEISABOU→DESABOU, VENSA→CAUSA, NORTO→VENTO — e é uma permutação fechada e coerente (MEI↔DE; NOR→NORTO, CAU→ECAUME, VEN→VENSA). Confere.
- **25F1Q15:** a decodificação do código do banco dá exatamente "ANTES SÓ DO QUE MAL ACOMPANHADO", com os 11 símbolos e o DO repetido no fim, igual à prova. O gabarito está certo; o problema é só a **ordem da tabela** (falha crítica nº 5).
- **Campos `acende`** de 25F1Q13, 25F1Q14, 24F1Q8, 24F1Q10, 24F1Q12, 24F1Q13 e 24F1Q14: todos os índices apontam para as linhas certas do `texto`.
- **Campo `origem`** dos 29 itens: ano, fase e número da questão conferem com a prova em todos.

---

## VEREDITO

| | |
|---|---|
| Itens auditados | **29** |
| Gabaritos corretos | **29 / 29** |
| Falhas críticas | **5** — `25F1Q3`, `25F1Q11`, `25F1Q12`, `25F1Q14`, `25F1Q15` |
| Observações | **16** |

Todas as 5 falhas críticas estão na prova de **2025**; os 15 itens de 2024 passaram sem falha crítica. Nenhuma falha atinge o gabarito: o banco nunca marca a alternativa errada como certa. Quatro das cinco são de **texto que ensina errado** (uma contagem de letra, uma contagem de sílaba, uma afirmação de rima, uma alternativa que não existia na prova) e a quinta é uma **adaptação não declarada que desmonta o raciocínio** da questão de código.
