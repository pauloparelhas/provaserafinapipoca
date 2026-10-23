# Fábrica de Jogos: navegação e jornada (painel, 23/10/2026)

Base: capturas 1280x800 e 390x800 (painel, fases, missões, regras), `js/telas.js`, `js/ui.js`, `1_designer.md`.
Queixa do pai: "difícil percorrer as fases pra criança saber o que fazer; tem que ser tipo comece por aqui,
caminhos sugeridos em cada lugar, salvar progresso, saber de onde parou."

## 1. O que hoje confunde (tela por tela)

**Casca (todas as telas)**
- A barra tem 11 portas do mesmo peso (`ORDEM` em ui.js): 5 grandes + 6 pequenas. Nada diz "comece aqui" nem a ordem.
  A única pista é uma bolinha amarela de 8 px sobre o ícone da tela da missão (`tem-missao`); uma criança de 7 anos que lê devagar não a vê.
- O topo junta 6 controles: nome do jogo, chip de missão (texto cortado com "co..."), XP, voz, som, engrenagem, seta.
  O chip da missão é a única instrução de "o que fazer" e está truncado e pequeno.
- Cada tela abre com título + frase de ajuda ("Aqui você cria jogos. Aperte Continuar."): descreve a tela, não diz o próximo passo.
- Não existe indicação de "salvo". O autosave é invisível; ela não sabe se perde o trabalho.
- Não existe "onde parei": `fab_tela` é lembrado, mas `parte()` troca Testar por Início e nunca diz nada.

**Início (painel)**
- Quatro botões coloridos disputam o clique: Continuar (amarelo), Testar (verde), Ir para a missão (amarelo) e, na barra, outro Testar (verde, o único colorido da barra).
- "Continuar" NÃO continua: executa `vaiMissao` (leva à tela da missão, abrindo modelo se preciso). Ela espera voltar ao ponto onde estava e é levada a outro lugar. É a maior fonte de confusão.
- A missão fica ao lado no desktop e abaixo da dobra no celular (390x800: aparece cortada, com "Ir para a missão" pela metade).
- Botões "Guardar no computador", "Abrir do computador" e "Ligar o microfone" ficam na mesma altura dos dela; o texto "Para o papai" é longo e ela não lê.
- No celular o nome do jogo no topo vira "M" cortado.

**Desenhar / Fases / Regras**
- Fases: paleta de 5 grupos com ~40 peças, botão "Fase nova", seis botões de ferramenta (zoom, setas, Cenário, - +, Desfazer). Nenhum diz "o que fazer agora" nem "terminei, e agora?". A missão só aparece no chip do topo.
- Regras: 4 abas (Regras, Ajustes, Minhas perguntas, Regra nova) e uma lista de 21 regras já prontas; no celular a primeira dobra é só botões. Não há sequência "primeiro isto".
- Em nenhuma das duas há botão de saída "pronto, vou testar". Ela precisa lembrar de achar o botão verde na barra.

**Testar**
- Barra com 6 a 8 controles (Recomeçar, Lupa, Parar, Dica, Tela grande, Tela cheia) mais texto longo de teclas. No fim: três carinhas, "o que vou mudar", De novo, Regras, Fases. Bom fim de teste, mas sem "Próximo: mostrar para alguém / tirar foto".

**Missões**
- 25 cartões do mesmo tamanho em grade (4 colunas). O "próximo" só difere por uma borda amarela; o 2 aparece com estrela (feito) e o 1 sem. Ela vê 25 coisas para escolher, quando precisa de 1.
- Cartas do saber logo abaixo: leitura densa, fora do caminho dela.

**Diário, Robô, Ideia, Mostrar**: telas "laterais" boas, mas sem conexão com o fluxo (ninguém manda ela para lá).

Diagnóstico: o produto tem boas peças e nenhum fio entre elas. O fio existe só na cabeça do adulto (Desenhar, Fases, Regras, Testar, Mostrar).

## 2. Proposta de jornada

Princípio: a criança nunca decide "para onde ir" sozinha; decide só "continuo ou mudo". Tudo o que existe continua clicável (nada trava), mas há **um caminho dourado** sempre aceso.

### 2.1 Início: uma pergunta, um botão

```
DESKTOP 1280x800 (barra esquerda recolhível continua igual)
+------------------------------------------------------------------+
| [urso] Meu primeiro jogo            [Salvo v]   XP  voz  som  eng |
+------------------------------------------------------------------+
|  [fala]  Oi! Você parou em FASES.                                 |
|                                                                   |
|   +----------------------------------------------------------+    |
|   | [miniatura da fase]   [play] CONTINUAR DE ONDE PAREI      |    |
|   |                       Fases - Fase 1 - ontem 16:40        |    |
|   +----------------------------------------------------------+    |
|        (amarelo, ocupa 60% da largura, único botão grande)       |
|                                                                   |
|   Seu caminho:                                                    |
|   (1)Desenhar --> (2)Fases --> (3)Regras --> (4)Testar --> (5)Mostrar
|     [estrela]      [VOCÊ ESTÁ AQUI]                               |
|                                                                   |
|   Meus jogos: [Primeiro jogo] [+ Jogo novo]                       |
|   ------------------------------------------------------------   |
|   Para o papai (pequeno, cinza): arquivo - microfone              |
+------------------------------------------------------------------+

CELULAR 390x800 (uma coluna, tudo na primeira dobra)
+---------------------------+
| Meu primeiro jogo  [Salvo]|
+---------------------------+
| [fala] Você parou em      |
| FASES.                    |
| [miniatura]               |
| +-----------------------+ |
| | [play] CONTINUAR      | |   <- 56 px de altura, largura total
| | de onde parei         | |
| +-----------------------+ |
| Seu caminho:              |
| (1)>(2)>(3)>(4)>(5)       |
|     ^ você está aqui      |
| Próximo passo: ...        |
| [mais jogos] [papai]      |
+---------------------------+
| barra inferior de telas   |
+---------------------------+
```

- **Continuar de onde parei** passa a levar à tela, ao jogo e à fase exatos. Primeira abertura de todas: o mesmo botão diz "Começar meu primeiro jogo" e leva a Desenhar.
- "Testar" sai do Início (já tem lugar na barra e no trilho). "Ir para a missão" some: a missão vira o **Próximo passo** (2.3), uma frase, não um cartão.
- Grava `ultimaTela`, `ultimaFase`, `ultimaAba`, `quando` (hoje só `fab_tela`). Regra de `parte()` ajustada: se parou em Testar, Continuar reabre o Testar (hoje manda para Início).
- Fala automática curta ao abrir, uma vez por sessão: "Você parou nas Fases. Quer continuar?". Em inglês via dicionário.

### 2.2 Mapa de caminhos (cinco ilhas)

Faixa fina de 5 passos, **sempre** no Início e em formato mínimo (pontinhos) no trilho de todas as telas. É o mesmo desenho, em dois tamanhos:

```
GRANDE (Início)         (1) Desenhar  >  (2) Fases  >  (3) Regras  >  (4) Testar  >  (5) Mostrar
                          [estrela]      [QUER AQUI]     [ ]           [ ]            [ ]
PEQUENO (trilho)        o---o---(O)---o---o         (pontos, o atual maior e amarelo)
```

- Cada ilha: ícone da barra + uma palavra + alto-falante. Ícone + palavra, nunca só um.
- Feita = estrela; atual = pulsa; resto = apagado. Clicar em qualquer uma vai (nada trava).
- **Discordo de criar tela nova "Caminho"** (proposta do designer): o mapa vive no Início e no trilho, sem tela extra e sem mexer na barra.
- Diário, Robô, Ideia, Missões, Opções ficam fora do caminho dourado (são "extras"), acessíveis pela barra e por convites pontuais (2.4).

### 2.3 Trilho de próximo passo (rodapé em todas as telas)

```
DESKTOP (rodapé da área de conteúdo, 64 px)
+------------------------------------------------------------------+
| [<] Desenhar    o---(O)---o---o---o   Falta: 4 moedas   [ Regras  > ] |
+------------------------------------------------------------------+
CELULAR (acima da barra de telas)
+---------------------------+
| Espalhe moedas: faltam 4  |
| [<]  o-(O)-o-o-o  [REGRAS >]|
+---------------------------+
```

- Esquerda: voltar um passo (cinza). Direita: **próximo passo do caminho** (amarelo, o botão principal da tela). Centro: pontinhos do mapa.
- Se há missão sugerida *para esta tela*, a frase dela aparece em cima do trilho com o contador vivo (a conferência `confereMissoes` já roda a cada `mudou`). Se a missão é de outra tela, a frase diz "Vá para Regras" e o botão direito leva para lá.
- O chip do topo continua, mas **repete a mesma frase** (uma voz só) e deixa de ser a única pista.
- No Testar o trilho some na tela grande e volta ao fim do teste: "Mostrar" vira o botão amarelo, ao lado de "De novo".
- Os botões soltos de saída ("pronto, vou testar") ficam desnecessários: o trilho é a saída.

### 2.4 Setas e destaques que apontam ONDE clicar

Um único componente, `pista`: **seta amarela quicando + halo** sobre o alvo, com o alto-falante "Clique aqui". Regras:
1. Uma pista por vez, nunca duas.
2. Aparece sobre: (a) o botão do trilho; (b) a peça/ferramenta que a missão pede (a missão já sabe `onde`; ampliar para `alvo`: paleta de peça X, botão "Regra nova", botão verde do Testar); (c) o botão "Continuar" no Início.
3. Some quando ela clica no alvo. **Fica** até ela agir (não é timer; é estado).
4. Quando ela ignora a pista e faz outra coisa, não há bronca: a pista continua esperando.
5. Em Fases: a seta aponta a paleta; em Regras, "Regra nova"; no fim do Testar, a carinha ("conte como foi").

Convites pontuais para as telas laterais, sempre como seta + frase de uma linha no trilho, nunca como modal:
- Fim do Testar: "Tire uma foto do jogo" aponta Diário (1ª vez e a cada 3 testes).
- Missão de pedir peça: aponta Robô (já existe).

### 2.5 Missões: três pedrinhas, não 25

Missões deixa de ser a porta de entrada. Na tela, no alto: **"Agora" (a missão atual, cartão grande, 1 botão "Ir")** e ao lado "Depois" com as 2 seguintes, menores. As 25 ficam numa lista dobrada, "Ver todas". A tela continua igual para quem quer escolher (compatível com a regra "pode fazer na ordem que quiser").

## 3. Regras de clareza

1. **Um botão principal por tela.** Amarelo, grande, no mesmo lugar (canto inferior direito do trilho, desktop; faixa acima da barra, celular). Todos os outros ficam azul/cinza e menores. Início: Continuar. Fases/Desenhar/Regras: o do trilho. Testar: Recomeçar durante o jogo, Mostrar depois. Fim do teste: "De novo" verde, "Próximo" amarelo.
2. **Tamanho.** Alvos de toque >= 56 px para o botão principal, >= 48 px para o resto (o checklist do projeto cobra 44). Palavra do botão 20 px ou mais; nada de texto no botão com mais de 3 palavras.
3. **Ícone + palavra, sempre; alto-falante ao lado de toda frase.** Nenhum ícone sozinho como única forma de entender (exceção: engrenagem e som, universais). Nada de emoji: SVGs do `FAB.ICONES`.
4. **Voz.** Frase curta, imperativo, 1 ação ("Aperte Continuar."), no máximo 8 palavras. Voz gravada (Thalita/Antonio; Ava/Brian em inglês); frase nova entra em `frases.js` e `ingles_dic.js`. Fala só quando ela pede (alto-falante) ou 1 vez ao abrir; nunca repete sozinha.
5. **Densidade.** Máximo de 5 ações visíveis por região. Mais que isso vira "mais..." (paleta, regras, barra do Testar).
6. **Texto de ajuda de cada tela** passa de descrição ("Escolha uma peça e pinte...") para **instrução do próximo passo** ("Pinte o caminho. Depois aperte Regras."). Pode seguir recolhível.
7. **Sem "não pode".** Nada trava e nada pede confirmação para navegar; apenas destaca o recomendado.
8. **Papai à parte.** Arquivo, microfone, "Mandar para o papai" ficam numa linha cinza no rodapé do Início e em Opções; nunca na mesma linha de botões dela.
9. **Contraste.** Pista e botão principal são os únicos elementos amarelo-vivo da tela.

## 4. Convivência com a barra recolhível e a tela grande

- **Barra de telas (ui.nav).** Continua como está: recolhível, esquerda/direita, ícones ou nomes, e vira barra inferior no celular. O trilho é um complemento, não substituto: quem recolhe a barra continua navegando pelo trilho. Dois ajustes baratos: (a) a bolinha `tem-missao` vira halo amarelo maior; (b) a tela do passo atual do caminho ganha o mesmo halo. Reordenar para a ordem do caminho (Início, Desenhar, Fases, Regras, Testar) já é a ordem de hoje.
- **Barra recolhida / topo recolhido.** O trilho é parte da área de conteúdo, não do topo: continua visível mesmo com os dois recolhidos. O selo "Salvo" fica no topo; se o topo estiver recolhido, o selo aparece pequeno no canto da seta `abreTopo`.
- **Tela grande (imersivo do Testar).** Já esconde barra, topo e ajuda; o trilho também esconde. O jeito de sair continua o mesmo: botão "Mostrar menus" e a seta que reabre. Ao terminar o teste (`fimTeste`), mostra de novo o trilho dentro do painel de resultado (a "caixa" ganha o botão amarelo "Mostrar"). Assim a tela grande nunca deixa a criança sem saída.
- **Sem conflito de espaço:** o trilho ocupa 64 px; no Testar fica fora do palco (a área do palco já calcula proporção por `encaixaPalco`). No celular paisagem (740x360) o trilho vira uma linha de 44 px sem texto de missão (só botão e pontos).

## 5. Como mostrar "salvo" e "você parou aqui"

**Salvo**
- Selo no topo, ao lado do nome do jogo: `[check] Salvo`. Estados: "Salvando..." (cinza, 300 ms após cada `FAB.mudou()`), depois "Salvo" (verde) com pulso. Ícone + palavra, voz opcional ao tocar: "Seu jogo está guardado."
- O Início diz em uma linha: "Tudo guardado. Última vez: hoje 16:40."
- Falha de armazenamento (`localStorage` cheio/bloqueado): selo vira vermelho "Não guardou", com botão "Guardar no computador". Hoje esse erro é silencioso.
- "Guardar com nome" e a foto do Diário viram "Marcar este momento", mas isso é o item 10 do designer e pode esperar.

**Você parou aqui**
- No Início: frase em cima do botão ("Você parou em FASES, Fase 1, ontem").
- Nas telas: no mapa de 5 ilhas, a ilha em que parou tem uma **bandeirinha**; ao chegar nela, a bandeirinha some (ela voltou).
- Dentro de Fases e Regras: ao reabrir, a tela volta à fase e à aba exatas; um aviso de 3 s: "Aqui você parou." com seta sobre a última peça ou regra mexida (guardar `ultimoItem`).
- Missão em andamento: o contador vivo do trilho ("faltam 4") é, na prática, o "onde parei".

## 6. Avaliação da proposta do designer (1_designer.md)

**Aprovo**
- 2.1 Painel com um botão grande + "você parou aqui" + botões do papai no rodapé: é exatamente o pedido do pai. Aprovado com a correção de que **Continuar leva ao último lugar**, não à missão.
- 2.3 Trilho "Próximo" em todas as telas com contador vivo: aprovado como peça central.
- 2.6 Guardar a tela/fase/aba para retomar: aprovado; acrescentar `ultimoItem` e a reabertura do Testar.
- 2.5 Selo "Salvo": aprovado, com o estado de erro que faltava.
- Regra "bloco só aparece quando a peça existe na fase" e o limite de 7 grupos na paleta: ajudam a clareza.
- Tudo com voz e dicionário de inglês.

**Simplifico**
- 2.2 Tela nova "Caminho" com 3 pedrinhas por ilha: **cortar a tela**. O mapa de 5 ilhas vira uma faixa no Início e pontinhos no trilho; as pedrinhas viram "Agora / Depois" em Missões. Uma tela nova a menos e a barra continua com 11 itens.
- 2.3 "No Testar o trilho vira ◀ Regras · Mostrar ▶": simplificar para o mesmo trilho de sempre, só escondido na tela grande e mostrado no resultado.
- 2.5 Estante, "Guardar com nome", "Mandar para o papai": válidos, mas não resolvem a queixa do pai. Adiar; só o selo "Salvo" entra na primeira leva de navegação.
- 4 (carimbos, bocejo, "Queria que tivesse"): são bons, mas **têm que vir depois** do trilho; se entrarem junto, a tela ganha mais 3 pontos de decisão no pior momento.
- 5: os itens 1, 2 e 10 (parcial: selo) do designer sobem para **antes** de Torre/Lago/poderes. Sem a navegação, as 10 novidades criam 10 novos lugares onde ela se perde. Minha ordem: (a) Início + Continuar real + "você parou aqui"; (b) trilho + pista; (c) selo Salvo; (d) Missões "Agora/Depois"; só então a Torre e o resto.

**Faltou no documento do designer**
- Setas/halos que apontam o alvo (2.4 aqui): ele diz "um botão principal" mas não diz como ela encontra o botão certo dentro da tela de Fases (40 peças).
- A convivência com barra recolhível e tela grande (seção 4).
- O erro de armazenamento do selo.
- O conflito de que "Continuar" já existe com outro significado: precisa de mudança de rótulo e de comportamento ao mesmo tempo, senão quem já usa se confunde.

## 7. Portões de aceitação (para o `jogador` e o QA)

- Abrir a Fábrica sem mexer em nada: o primeiro clique possível só tem 1 botão amarelo grande.
- Fechar o navegador em Fases > Fase 1 > peça "estrela" e reabrir: Início diz "Fases", Continuar chega na mesma fase e aponta a peça.
- 390x800: Continuar, caminho e próximo passo cabem sem rolar.
- Barra e topo recolhidos: ainda dá para ir ao próximo passo.
- Tela grande: ao fim do teste aparece "Mostrar" sem precisar abrir menus.
- Falha de `localStorage` simulada: o selo vira vermelho.
- Todo texto novo com voz gravada e entrada no dicionário; `teste_ingles.py` e `qa_fabrica.py` verdes.
