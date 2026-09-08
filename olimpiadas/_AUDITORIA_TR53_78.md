# AUDITORIA DE QUALIDADE — TR53 a TR78

Arquivo auditado: `ferramentas/OP_data.js`
Escopo: 26 itens (TR53–TR59 `contar`, TR60–TR66 `intruso`, TR67–TR78 `buraco`).
Método: cada item foi resolvido do zero antes de olhar o gabarito. Os sete itens de `contar`
foram contados à mão letra por letra e depois reconferidos por script independente
(os dois passes bateram em 100% dos casos). Nenhum arquivo foi editado.

---

## 1. Tabela item a item

| id | eixo | minha conta / minha resposta | bate? | veredito |
|---|---|---|---|---|
| TR53 | contar | LARANJA=só A · DENTE=só E · PORCO=só O ✓ / CAVALO=A,O · ESTRELA=E,A · CADERNO=A,E,O · TESOURA=E,O,U,A ✗ → **LARANJA, DENTE E PORCO** | SIM | 1 CRÍTICA (truque) + 2 obs |
| TR54 | contar | 16v/10c · **9v/16c** · 17v/10c · 22v/17c → **MARTA COMPROU PRATOS BRANCOS** | SIM | 1 CRÍTICA (encontro "TS" não existe) + 2 obs |
| TR55 | contar | 10 palavras → 10−1 = **9 espaços** | SIM | 1 CRÍTICA (truque leva ao distrator) + 2 obs |
| TR56 | contar | 1+1+2+2+2+1+1 = **10 letras O** | SIM | limpo |
| TR57 | contar | 2+2+2+1+2 = **9 letras S** | SIM | limpo |
| TR58 | contar | PENTE = só E ✓ / ESPELHO=E,O · ANEL=A,E · TAMBOR=A,O ✗ → **PENTE** | SIM | 1 CRÍTICA (truque) + 1 obs |
| TR59 | contar | S=s/z · **P=p/p** · X=ch/z · R=forte/fraco → **LETRA P** | SIM | 1 obs (eixo errado) |
| TR60 | intruso | mosca/morcego/mosquito = bichos → **MOCHILA** | SIM | limpo |
| TR61 | intruso | boca/barriga/braço = corpo → **BONECA** | SIM | 1 obs forte (sem `enun`) |
| TR62 | intruso | lápis/caneta/giz = escrevem → **CANECA** | SIM | limpo |
| TR63 | intruso | cantar/comer/conversar = boca → **CORRER** | SIM | limpo |
| TR64 | intruso | correu a tarde inteira + dormiu cedo → **CANSADO** | SIM | 1 obs (eixo) |
| TR65 | intruso | cruzou a chegada bem antes → **RÁPIDO** | SIM | 1 obs (eixo) |
| TR66 | intruso | 3 sílabas + C + bicho + não voa → **CAVALO** (CABRA cai na 1ª, CADEIRA na 3ª, CORUJA na 4ª) | SIM | limpo |
| TR67 | buraco | sol a tarde inteira + sem protetor + ardia → **VERMELHA** | SIM | 1 redação + 1 obs (2 x 3 pistas) |
| TR68 | buraco | do quintal + mais alta + escada grande → **ÁRVORE** | SIM | 2 redação |
| TR69 | buraco | pendurou + quintal + sol forte + secou → **VARAL** | SIM | 2 redação + 1 obs |
| TR70 | buraco | ventar forte + subiu no céu + fio de linha → **PIPA** | SIM | 3 redação |
| TR71 | buraco | o que IMPEDE de andar de patins → **UMA DAS RODINHAS TINHA CAÍDO** | SIM | 2 CRÍTICAS (fato falso + truque) |
| TR72 | buraco | o que IMPEDE de beber → **O COPO ESCORREGOU / SUCO CAIU NO CHÃO** | SIM | 2 CRÍTICAS (fato falso + truque) |
| TR73 | buraco | o que IMPEDE de entrar → **PERDEU A CHAVE** | SIM | 2 CRÍTICAS ("é verdade, mas" + truque) + 1 redação |
| TR74 | buraco | o que IMPEDE de pintar o céu → **O LÁPIS AZUL SUMIU** | SIM | 1 CRÍTICA (truque) + 1 redação |
| TR75 | buraco | várias + de menina → **ALGUMAS** | SIM | 1 redação + 1 obs (truque incompleto) |
| TR76 | buraco | vários + de menino → **ESSES** | SIM | 1 redação + 1 obs |
| TR77 | buraco | um só + de menino → **MEU** | SIM | 1 obs |
| TR78 | buraco | uma só + de menina → **SUA** | SIM | 1 redação + 1 obs |

**Gabarito: 26/26 corretos.** Nenhum item tem resposta errada e nenhum tem duas respostas
defensáveis. Todos os 26 trazem `origem:'Treino no estilo da prova'`, sem ano nem número.
Nenhuma metalinguagem proibida (concordância, artigo, substantivo, sinônimo, campo semântico,
plural, gênero) aparece em nenhum dos 26.

---

## 2. As contas, escritas

### TR54 — vogais x consoantes (as quatro frases)

| frase | vogais | consoantes | total de letras | quem ganha |
|---|---|---|---|---|
| A MENINA VIU UMA ABELHA NA AREIA. | 1+3+2+2+3+1+4 = **16** | 0+3+1+1+3+1+1 = **10** | 26 | vogais |
| MARTA COMPROU PRATOS BRANCOS. | 2+3+2+2 = **9** | 3+4+4+5 = **16** | 25 | **consoantes** |
| O PAPAGAIO COMEU A GOIABA MADURA. | 1+5+3+1+4+3 = **17** | 0+3+2+0+2+3 = **10** | 27 | vogais |
| A MOEDA DOURADA CAIU DEBAIXO DA MESA DA COZINHA. | 1+3+4+3+4+1+2+1+3 = **22** | 0+2+3+1+3+1+2+1+4 = **17** | 39 | vogais |

Os quatro pares batem com o que o item alega (16/10, 9/16, 17/10, 22/17). "PAPAGAIO sozinha já
traz cinco vogais" — confere (A,A,A,I,O). O H foi contado como consoante em ABELHA, DEBAIXO e
COZINHA, como manda o item.

### TR55 — espaços
`OPASSARINHOPEQUENOPOUSOUEMCIMADOMURODACASA.` = O · PASSARINHO · PEQUENO · POUSOU · EM · CIMA ·
DO · MURO · DA · CASA = **10 palavras → 9 espaços**. A frase colada foi remontada a partir da
separação e bateu caractere por caractere com o `quadro`. As três contas alegadas nos distratores
também fecham: 9 palavras → 8; 10 palavras (não espaços) → 10; 10 palavras + 1 depois do ponto → 11.

### TR56 — letra O
O=1 · MENINO=1 · COMPROU=2 · OITO=2 · OVOS=2 · NO=1 · MERCADO=1 → **1+1+2+2+2+1+1 = 10**.
Segundo passe soletrando a frase inteira: O(1) MENIN**O**(2) C**O**(3)MPR**O**(4)U **O**(5)IT**O**(6)
**O**(7)V**O**(8)S N**O**(9) MERCAD**O**(10) = 10. Distratores conferidos: 7 é o nº de palavras
(a frase tem 7 palavras e **todas as 7** têm O — a alegação do `visual` "7 palavras com O" é
verdadeira); 8 = 10 menos os dois O das palavras curtas (O e NO); 9 = um O a menos.

### TR57 — letra S
PROFESSORA=2 · PASSOU=2 · SEIS=2 · LIVROS=1 · CLASSE=2; A, PARA e A = 0 → **2+2+2+1+2 = 9**.
Distratores conferidos: 5 é o nº de palavras com S (PROFESSORA, PASSOU, SEIS, LIVROS, CLASSE — e é
verdade que **quatro** delas têm dois S, como o comentário diz); 6 = ler cada SS como um só
(9−3, porque há três SS: PROFESSORA, PASSOU, CLASSE); 8 = um S a menos.

### TR53 / TR58 — vogal única
LARANJA {A} ✓ · DENTE {E} ✓ · PORCO {O} ✓ · CAVALO {A,O} ✗ · ESTRELA {A,E} ✗ · CADERNO {A,E,O} ✗ ·
TESOURA {A,E,O,U} ✗ · PENTE {E} ✓ · ESPELHO {E,O} ✗ · ANEL {A,E} ✗ · TAMBOR {A,O} ✗.
Todas as contagens citadas nos comentários dos dois itens estão certas, inclusive "TESOURA tem
E, O, U e A: quatro".

---

## 3. FALHAS CRÍTICAS (9)

### C1 — TR54: o encontro consonantal "TS" NÃO EXISTE na frase (fato falso, em dois lugares)

Em `MARTA COMPROU PRATOS BRANCOS` os encontros de consoantes são **RT** (MA**RT**A), **MPR**
(CO**MPR**OU), **PR** (**PR**ATOS), **BR** (**BR**ANCOS) e **NC** (BRA**NC**OS). Não existe TS:
em PRATOS o T e o S estão separados pelo O (P-R-A-**T**-O-**S**). A criança que for procurar o TS
não acha, e a frase que o item usa para provar a resposta desmente a si mesma.

Está lá (`visual`):
```
'<div class="pcs"><span class="pc hit">MPR</span><span class="pc hit">PR</span><span class="pc hit">TS</span><span class="pc hit">BR</span><span class="pc hit">NC</span></div>'+
```
Deveria estar:
```
'<div class="pcs"><span class="pc hit">RT</span><span class="pc hit">MPR</span><span class="pc hit">PR</span><span class="pc hit">BR</span><span class="pc hit">NC</span></div>'+
```

Está lá (`porque`):
```
porque:'MARTA COMPROU PRATOS BRANCOS tem 9 vogais e 16 consoantes. As consoantes vêm grudadas em MPR, PR, TS, BR e NC. Nas outras três frases as vogais é que vêm grudadas, e elas ganham em todas: 16 a 10, 17 a 10 e 22 a 17.',
```
Deveria estar:
```
porque:'MARTA COMPROU PRATOS BRANCOS tem 9 vogais e 16 consoantes. As consoantes vêm grudadas em RT, MPR, PR, BR e NC. Nas outras três frases as vogais é que vêm grudadas, e elas ganham em todas: 16 a 10, 17 a 10 e 22 a 17.',
```

### C2 — TR53: o truque não decide nada nesta questão

Está lá: `truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.'`

A questão não pergunta *quantas* vogais: pergunta se são todas **a mesma**. Contar os pontinhos é
comprovadamente inútil aqui — LARANJA tem 3 pontinhos e **entra**, ESTRELA tem 3 pontinhos e
**não entra**; DENTE tem 2 e entra, TAMBOR tem 2 e não entra. Quem seguir o truque não separa as
certas das erradas.

Deveria estar:
```
 truque:'Ponha um pontinho embaixo de cada vogal, do começo ao fim. Depois olhe se os pontinhos são todos da MESMA vogal.',
```

### C3 — TR58: mesmo truque, mesma incompatibilidade

Está lá: `truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.'`
Deveria estar: o mesmo texto de C2.

### C4 — TR55: o truque leva direto ao distrator

Está lá: `truque:'Pontinho embaixo de cada uma, uma por uma. Só no fim conte os pontinhos.'`

Aqui a criança põe um pontinho em cada palavra, conta os pontinhos e chega a **10** — que é
exatamente a alternativa C, o erro que o próprio item quer evitar. O truque ensina o erro.

Deveria estar:
```
 truque:'Separe as palavras e conte quantas são. Depois tire um: o espaço mora ENTRE duas palavras.',
```

### C5 — TR71: o comentário do BONÉ afirma uma coisa que é falsa

Está lá:
```
{t:'NÃO ACHOU O SEU BONÉ EM LUGAR NENHUM.', no:'Essa engana porque também fala de não achar uma coisa, igual à certa. Mas boné é de pôr na cabeça: ficar sem boné não impede ninguém de andar de patins.'},
```
A alternativa certa é `UMA DAS RODINHAS DO PATINS TINHA CAÍDO` — ela **não fala de não achar
nada**. O "igual à certa" é falso, e ainda por cima entrega informação sobre o gabarito antes de
a criança pensar. Além disso, o comentário valida a errada antes de negá-la.

Deveria estar:
```
{t:'NÃO ACHOU O SEU BONÉ EM LUGAR NENHUM.', no:'Boné é de pôr na cabeça: ficar sem boné não impede ninguém de andar de patins. Depois do PORQUE tem de vir uma coisa que IMPEDE.'},
```

### C6 — TR72: mesmo defeito, mesmo tipo de mentira

Está lá:
```
{t:'ESQUECEU O CANUDINHO EM CIMA DA MESA.', no:'Essa fala de esquecer uma coisa, igual à certa, e é por isso que ela atrai. Mas dá para beber suco direto no copo: ficar sem canudinho não impede de beber.'},
```
A certa é `O COPO ESCORREGOU DA MÃO E O SUCO TODO CAIU NO CHÃO` — **ninguém esquece nada nela**.
"Igual à certa" é falso.

Deveria estar:
```
{t:'ESQUECEU O CANUDINHO EM CIMA DA MESA.', no:'Dá para beber suco direto no copo: ficar sem canudinho não impede ninguém de beber. Depois do PORQUE tem de vir uma coisa que IMPEDE.'},
```

### C7 — TR73: o padrão proibido, literal

Está lá:
```
{t:'O SOL NASCE TODO DIA BEM CEDINHO.', no:'O sol nascer cedo é verdade, mas não tem nada a ver com abrir uma porta. Não explica a primeira parte.'},
```
"**é verdade, mas**" é exatamente a construção que o dono proibiu.

Deveria estar:
```
{t:'O SOL NASCE TODO DIA BEM CEDINHO.', no:'O sol nascer cedo não tem nada a ver com abrir uma porta. Não explica por que a tia Marta ficou do lado de fora.'},
```

### C8 — TR71, TR72, TR73 e TR74: truque incompatível com o gesto da questão

Os quatro trazem `truque:'Ponha cada palavra no buraco e leia a frase inteira, do começo.'`

Nesses quatro itens as alternativas não são palavras, são **orações inteiras** — e as quatro
orações leem perfeitamente bem dentro da frase ("não conseguiu andar na calçada porque não achou
o seu boné em lugar nenhum" não tropeça em lugar nenhum). Ler a frase inteira **não separa** a
certa da errada. O gesto que essas questões exigem já está escrito na `dica` de cada uma
("isso IMPEDE?"), mas o `truque` — que é o que fica na memória — ensina outro.

Deveria estar, nos quatro:
```
 truque:'Depois do PORQUE, faça sempre a mesma pergunta: isso IMPEDE mesmo? Se não impede, não serve.',
```

### C9 — TR74: o "igual à certa" outra vez (limítrofe, mas leva o gabarito junto)

Está lá:
```
{t:'ESQUECEU A BORRACHA DENTRO DA MOCHILA.', no:'Essa fala de esquecer um material da escola, igual à certa, e é por isso que engana. Mas borracha serve para APAGAR: sem borracha ela pinta do mesmo jeito.'},
```
Aqui o "igual à certa" é factualmente sustentável (lápis também é material escolar), mas continua
sendo uma orientação que **só funciona depois de saber a resposta** — e valida a errada antes de negá-la.

Deveria estar:
```
{t:'ESQUECEU A BORRACHA DENTRO DA MOCHILA.', no:'Borracha serve para APAGAR: sem borracha ela pinta do mesmo jeito. Depois do PORQUE tem de vir uma coisa que IMPEDE de pintar.'},
```

---

## 4. VIOLAÇÕES DA REGRA DE REDAÇÃO (12 ocorrências sobreviventes, em 8 itens)

Regra: nenhum comentário pode validar a alternativa errada antes de negá-la. O modelo que **já
está certo** no acervo é o do TR65 ("Forte fala da força do corpo. […] Numa corrida a gente pensa
logo em força: é aí que ela atrai.") — nega primeiro, explica a isca depois. As doze abaixo fazem
o contrário. (As de TR71, TR72, TR73-guarda-chuva e TR74 já estão na seção 3.)

| # | id | está lá | deveria estar |
|---|---|---|---|
| R1 | TR68 · PISCINA | `'A piscina fica no quintal, e essa parte combina — é por isso que ela atrai. Mas ninguém sobe NA piscina, e não se chama bombeiro com escada para tirar um gato de dentro dela.'` | `'Ninguém sobe NA piscina, e não se chama bombeiro com escada para tirar um gato de dentro dela. A piscina só acerta a pista do quintal, e é essa pista sozinha que puxa o dedo para ela.'` |
| R2 | TR68 · CADEIRA | `'Gato sobe em cadeira o tempo todo, e é aí que essa engana. Mas cadeira é baixa: o gato desce sozinho num pulo, e não precisa de escada bem grande.'` | `'Cadeira é baixa: o gato desce sozinho num pulo e ninguém precisa de escada bem grande. Ela só acerta a pista do subir, e é essa pista sozinha que puxa o dedo para ela.'` |
| R3 | TR69 · ARMÁRIO | `'Roupa vai mesmo para o armário, e é por isso que essa atrai. Mas armário fica dentro de casa e é fechado: lá não bate o sol forte que a frase diz ter secado tudo.'` | `'Armário fica dentro de casa e é fechado: lá não bate o sol forte que a frase diz ter secado tudo. Ele só acerta a pista da roupa, e é essa pista sozinha que puxa o dedo para ele.'` |
| R4 | TR69 · TANQUE | `'O tanque fica no quintal e é onde a vovó lava a roupa, então ele passa na pista do quintal. Só que no tanque a roupa fica de molho, molhada — não é lá que ela seca.'` | `'No tanque a roupa fica de molho, molhada — não é lá que ela seca. O tanque só acerta a pista do quintal, e é essa pista sozinha que puxa o dedo para ele.'` |
| R5 | TR70 · BOLA | `'A bola sobe quando a gente chuta bem forte, e é nessa parte que ela engana. Mas bola não sobe por causa do vento, e ninguém prende bola num fio de linha.'` | `'Bola não sobe por causa do vento, e ninguém prende bola num fio de linha. Ela só acerta a pista do subir, e é essa pista sozinha que puxa o dedo para ela.'` |
| R6 | TR70 · BONECA | `'A boneca é de Sofia e vai junto para a praça, essa parte combina. Mas boneca não voa com o vento nem fica lá em cima presa por uma linha.'` | `'Boneca não voa com o vento nem fica lá em cima presa por uma linha. Ela só acerta a pista da praça, e é essa pista sozinha que puxa o dedo para ela.'` |
| R7 | TR70 · BICICLETA | `'Bicicleta a gente leva para a praça também. Só que bicicleta anda no chão, não sobe no céu — essa dava para riscar logo de cara.'` | `'Bicicleta anda no chão e não sobe no céu. A frase diz SUBIU BEM ALTO NO CÉU: essa dava para riscar logo de cara.'` |
| R8 | TR73 · GUARDA-CHUVA | `'Essa também fala de não achar uma coisa dentro da bolsa, e é aí que ela engana. Mas guarda-chuva serve para a chuva: sem ele a porta abre do mesmo jeito.'` | `'Guarda-chuva serve para a chuva: sem ele a porta abre do mesmo jeito. Depois do PORQUE tem de vir uma coisa que IMPEDE de entrar.'` |
| R9 | TR75 · ALGUNS | `'ALGUNS é de várias, e essa parte combina direitinho — é por isso que ele atrai. Mas leia baixinho: "alguns professoras dançaram" tropeça. Aqui a palavrinha seria ALGUMAS.'` | `'Leia baixinho: "ALGUNS PROFESSORAS DANÇARAM" tropeça. ALGUNS é palavra de menino, e PROFESSORAS é palavra de menina.'` |
| R10 | TR76 · ESSAS | `'ESSAS é de várias, e essa parte está certa — é a que mais engana. Mas ESSAS é de menina, e "guardei essas sapatos sujos" tropeça.'` | `'Leia baixinho: "GUARDEI ESSAS SAPATOS SUJOS" tropeça. ESSAS é palavra de menina, e SAPATOS e SUJOS são de menino.'` |
| R11 | TR78 · SUAS | `'SUAS combina com mochila, essa parte está certa. Mas SUAS é de várias, e a frase fala de uma mochila só, sem S no fim: "deixou suas mochila vermelha" tropeça.'` | `'Leia baixinho: "DEIXOU SUAS MOCHILA VERMELHA" tropeça. SUAS é de várias, e a frase fala de uma mochila só, sem S no fim.'` |
| R12 | TR67 · MOLHADA (limítrofe) | `'Um dia inteiro de sol lembra praia e piscina, e é por isso que MOLHADA dá vontade de marcar. Mas ele já CHEGOU EM CASA, e água nenhuma faz a pele arder.'` | `'Água nenhuma faz a pele arder, e a frase diz que a pele ARDIA. MOLHADA lembra praia e piscina, e é essa lembrança que puxa o dedo para ela.'` |

Observação de padrão: TR77 (`'MINHA erra só uma coisa, e é por isso que ela engana tanto: é de menina…'`)
e TR76 · ESSE já negam primeiro. São a régua a aplicar nos demais.

---

## 5. OBSERVAÇÕES (12)

1. **TR59 está no eixo errado.** É `eixo:'contar'`, mas não se conta nada: pergunta que letra não
   muda de **som**. Tem inclusive um `truque` próprio, diferente de todos os outros seis do bloco
   ("Quando a pergunta fala de SOM, fale as palavras em voz alta e escute"). Recomendo mover para
   um eixo de som/leitura, ou criar um. Conteúdo em si: correto e sem ambiguidade (S→z em ROSA,
   X→z em EXAME, R forte/fraco em RIO/PERA, P estável em PATO/COPO).
2. **O eixo `intruso` guarda três tarefas diferentes.** TR60–TR63 são "ache o intruso"; TR64 e TR65
   são "troque a palavra difícil"; TR66 é adivinha com quatro pistas. Cada grupo tem um `truque`
   distinto — o que confirma que são coisas distintas. Se a ferramenta treina por eixo, a menina
   troca de gesto no meio da série sem aviso.
3. **TR61 é o único item de `intruso` sem `enun` fixando o critério.** O `pede` é só "QUE PALAVRA
   NÃO FAZ PARTE DO GRUPO". O critério (parte do corpo) só aparece na `dica`. Enquanto ela resolve
   sozinha, BOCA também é isolável (é a única de 4 letras) e BRAÇO também (é a única que começa com
   duas consoantes coladas). O agrupamento semântico é muito mais forte e a resposta continua sendo
   BONECA, mas a brecha fecha de graça com um `enun` no molde dos vizinhos:
   `enun:'AS QUATRO PALAVRAS ABAIXO COMEÇAM COM B. TRÊS DELAS SÃO PARTES DO CORPO DA GENTE.',`
4. **TR67 conta pistas errado dentro de si mesmo.** A `dica` diz `'Duas pistas mandam: A TARDE
   INTEIRA NO SOL, SEM PROTETOR e ARDIA.'` e o `visual` diz `'As três pistas têm de fechar ao mesmo
   tempo.'` — e lista três. Trocar por `'Três pistas mandam: A TARDE INTEIRA NO SOL, SEM PROTETOR e
   ARDIA.'`
5. **TR69, mesmo tipo de descompasso.** A `dica` anuncia três pistas (PENDUROU, DO QUINTAL, AQUELE
   SOL FORTE) e o `visual` marca quatro (acrescenta TUDO SEQUINHO). Ajustar para quatro nos dois.
6. **TR75–TR78: o `truque` está incompleto.** `'Ponha cada palavra no buraco e leia a frase inteira,
   do começo.'` não diz o que escutar. A formulação pedida é a do tropeço, e ela já está usada nos
   comentários e no `porque` desses quatro itens — falta só subir para o truque:
   `truque:'Ponha cada palavrinha no buraco, leia a frase inteira do começo e escute se ela tropeça.',`
   (Nenhum dos quatro nomeia regra gramatical — isso está certo e deve continuar assim.)
7. **TR53 e TR58 usam "CUJO"** (`'…AS FIGURINHAS CUJO NOME USA UMA ÚNICA VOGAL…'`). É a palavra mais
   difícil dos 26 itens e não é o que se está treinando. Alternativa sem perda:
   `'— SÓ VOU COLAR AS FIGURINHAS QUE TÊM UMA ÚNICA VOGAL NO NOME, MESMO QUE ELA APAREÇA VÁRIAS VEZES!'`
8. **TR53 e TR58 são o mesmo item com roupa diferente** (mesma regra, mesma frase de enunciado,
   mesmo `porque`). Não é motivo para remover — os formatos de resposta são diferentes (trio de
   nomes x palavra única) — mas convém não colocá-los na mesma sessão.
9. **TR53 e TR55 têm `dica` com duas ordens numa frase só.** TR53: `'Ponha um pontinho embaixo de
   cada vogal do nome e vá até a ÚLTIMA letra da palavra.'` → `'Ponha um pontinho embaixo de cada
   vogal do nome. Vá até a ÚLTIMA letra da palavra.'` TR55: `'Primeiro separe a frase e escreva as
   palavras uma do lado da outra.'` → `'Primeiro separe a frase. Depois escreva as palavras uma do
   lado da outra.'`
10. **TR54 é o item mais caro do lote:** para responder com honestidade a menina conta 117 letras
    (26+25+27+39). O atalho existe e está bem ensinado no `visual`, mas a `dica`
    (`'procure os lugares em que duas consoantes estão coladas'`) é uma orientação que só se
    justifica depois de já se saber que a resposta é a frase cheia de encontros consonantais.
    Numa véspera, é o candidato natural a ficar de fora por tempo — não por defeito.
11. **TR55 depende de a criança saber que "EM CIMA" se escreve separado.** A resposta continua única
    e defensável (9), e o item trata a armadilha explicitamente no distrator "8". Fica registrado
    como o ponto de risco do item, não como falha.
12. **TR53, inconsistência menor no `visual`:** em CAVALO e ESTRELA só a vogal "que estraga" vem em
    negrito, enquanto em CADERNO e TESOURA vêm todas. A legenda logo abaixo explica, mas a marcação
    não é a mesma coisa nas duas linhas.

---

## 6. Itens a REMOVER

**Nenhum.** Os 26 têm gabarito correto e resposta única. Todas as 9 falhas críticas são de texto
auxiliar (`truque`, `visual`, `porque`, comentário de alternativa) e têm substituição pronta acima.
O único item que eu tiraria da série de véspera por economia de tempo — não por defeito — é o
**TR54**, e o único que eu reclassificaria antes de usar é o **TR59** (eixo errado).
