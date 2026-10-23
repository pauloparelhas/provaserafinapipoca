# Fábrica de Jogos: crítica da pedagoga (23/10/2026)

Lido: `1_designer.md`, `DESIGN.md`, cabeça de `banco/missoes.js`. Nenhum arquivo do produto foi tocado.
Perfil de referência: Mariana, 7 anos, 8 meses de codeSpark, ama pixel art, lê pouco, depende da voz.

## 1. O que ensina de verdade e o que é enfeite

Ensina de verdade (cada item muda o que ela precisa PENSAR):
- **Fôlego** (caixinha que esvazia sozinha): variável com consequência, o melhor conceito da proposta.
- **Poder ligado/desligado com tempo** ("ligar Planar por 10 s", "quando o poder acabar"): estado e duração.
- **SÓ SE estiver montada / pequena**: condição sobre o herói, o "se" de verdade.
- **Cano pareado por cor**: "ir para" com origem e destino, causa e efeito à distância.
- **Trocar quem liga o poder** (pena por estrela): mudar o QUANDO sem mexer no FAÇA. Isso é programar.
- **Contador vivo da missão**: feedback imediato do efeito da regra dela.

Enfeite ou quase (bonito, mas ela não pensa diferente por causa disso):
- Torre, Poço, Céu, Caverna como "formatos": são o mesmo mapa em outra orientação. Divertem, ensinam design de fase, não programação. Valem como cenário, não como conceito.
- Cipó e escada: é física, o próprio designer admite custo cognitivo zero. Ótimo para a leva, mas não conta como aprendizado de código.
- Planar, pulo duplo, grudar: física pronta. Só viram programação no momento em que ela mexe em QUANDO ou duração.
- Estante, "Guardar com nome", selo "Salvo": segurança emocional e autoria. Útil, não pedagogia de código.
- Carimbos coração/bocejo e "Queria que tivesse": coleta de dados para nós. Para ela é um toque; não alega aprendizagem.
- Mapa de caminhos com 5 ilhas, trilho, mini-mapa: navegação. Corretos se reduzirem escolhas, enfeite se somarem telas.

Regra de ouro: **recurso novo só entra se existir uma missão que obriga a mexer numa regra por causa dele.** Sem missão-regra, é decoração.

## 2. Carga cognitiva

Uma criança de 7 anos segura 2 a 3 elementos novos de uma vez, e só se o resto estiver automático. Medida prática:
- **Por sessão: no máximo 1 conceito novo e 1 peça nova**; a segunda peça só se for física pura (cipó).
- **Por leva: no máximo 3 blocos novos visíveis ao mesmo tempo.** A proposta soma 13 blocos novos (4 QUANDO, 3 SÓ SE, 6 FAÇA) mais 22 FAÇA já existentes. Mesmo com o filtro "só aparece se a peça existe", quem põe pena, luva, asinha, cavalo, tartaruga e cano na mesma fase vê tudo de uma vez. O filtro protege a fase reta; não protege a fase cheia.
- **Paleta**: 7 grupos de até 9 peças = 63 peças. Para quem lê pouco, é muito. Esconder grupos não usados atrás de "mais peças" e abrir um por vez conforme a missão.
- **Cartas do saber**: uma por conceito novo, mostrada uma vez, lida em voz alta. Não empilhar.
- Fôlego + bolha + peixe + polvo + água-viva + pé de pato na mesma sessão são 6 peças e 2 blocos. Cortar: Lago entra só com **bolha + peixe + fôlego**. O resto vem por missão.

## 3. Ordem de entrada dos conceitos

1. Sem conceito novo: **formato de fase** (Reta, Torre) e **cipó**. Ela ganha mundo sem ganhar vocabulário.
2. **Fôlego** (variável que cai sozinha): bolha como "recarregar". Primeiro conceito de código novo.
3. **Ligar poder com tempo** (um poder só, a pena): estado + duração.
4. **QUANDO o poder acabar**: segundo evento ligado ao primeiro (encadeamento).
5. **Cano com par**: "ir para".
6. **SÓ SE estiver pequena / montada**: condição sobre estado do herói.
7. Montaria completa (cavalo): junta 2 e 6; por isso vem depois.
8. Leva 2: alavanca (interruptor), chefão (variável de outro).

Princípio: poder simples (um liga, um desliga) antes de condição sobre poder. Montaria não pode vir antes de ela dominar "ligar/desligar" e "SÓ SE".

## 4. O que cortar ou adiar

- **Adiar para leva 2:** Tartaruga e Dino amigo (a Montaria já é um conceito difícil; três montarias não ensinam três vezes mais). Luva grudenta e Asinha (mesma mecânica da Pena: o segundo poder só serve como variação, no fim). Portinha de rato (só faz sentido com Pequeno real, que depende de SÓ SE).
- **Adiar:** Céu e Caverna como formatos separados. Torre + cenário trocado dá o mesmo efeito.
- **Cortar da leva 1:** carimbos coração/bocejo. A criança não tem como saber por que carimba, e o dado já vem do uso real e do "Queria que tivesse".
- **Cortar:** "Mapa de caminhos" com 5 ilhas como tela nova. É a barra de 11 telas reempacotada. Basta o Painel com um botão grande e o trilho; o trilho já diz "próximo".
- **Simplificar:** Estante e "Guardar com nome" viram um só botão, "Guardar este jogo" (nome por ditado, opcional).
- **Manter nome único por conceito:** "poder" (não "pacote", "item", "habilidade"); "fôlego" (não "ar", "oxigênio").
- **A frase "bloco só aparece se a peça existe" é o item mais valioso** da proposta e deve ser portão duro, não promessa.

## 5. Como formular as missões dos pacotes

Regras: até 16 palavras, imperativo, uma ação, um número ou um objeto verificável, nenhum termo técnico, o efeito visível ("depois teste"). Uma missão obriga a mexer numa REGRA (confere por regra mudada + disparou no teste), nunca só por peça posta.

Modelo: **[Troque/Mude/Faça] + [peça ou regra] + [valor]. Depois teste.**

Reformulação das 6 missões do designer:
- "Ponha uma pena na Torre. Troque o tempo do planar para 5 segundos e chegue no topo." (17: cortar para "Ponha uma pena na Torre e troque o planar para 5 segundos. Chegue ao topo.")
- "Mude a luva grudenta para durar 5 segundos. Teste." (só depois de Luva voltar à leva 2)
- "Monte no cavalo. Troque o que acontece quando o besouro encosta. Teste." (conceito: SÓ SE)
- "Faça a estrela dar o poder da pena. Depois teste." (troca do QUANDO)
- "Ponha 4 bolhas no Lago. Chegue na bandeira sem o fôlego acabar." (OK, 15 palavras)
- "Faça aparecer um balão quando o poder da pena acabar. Teste." (QUANDO o poder acabar)

Cada missão tem duas versões: **a que ela faz com a regra pronta** (ver funcionar) e **a que muda uma peça da regra** (programar). Nesta ordem, sempre.

## 6. Riscos de frustração e como evitar

| Risco | Evitar |
|---|---|
| Fase vertical: cair do topo e voltar ao começo | Cair custa **tempo, não vida**, e ponto de controle a cada 1/3 da altura, nascido junto com o modelo. Sem ponto de controle, a Torre não entra. |
| Câmera em y que treme ou perde o herói | Seguir com folga (zona morta), sem salto brusco; prova no robô-jogador antes. |
| Cipó exige ▼ e ela só conhece ▲ | Botão ▼ com seta desenhada e voz na primeira vez; cipó pega sozinho ao tocar, e subir é só ▲ (▼ opcional para descer). |
| Fôlego acabando rápido demais | Modelo do Lago com **fôlego longo (ex. 40 s)**, bolhas visíveis a cada ~8 casinhas, e **aviso antes de zerar** (barra pisca e som suave aos 25%). O fôlego acabar não pode custar mais que voltar ao ponto de controle. |
| Barra de fôlego não percebida | Ícone de bolhas na barra, não só uma cor; o mesmo cuidado no ícone do poder com tempo. |
| Fase vertical com espinhos e inimigos | Modelo de Torre sem inimigo; Poço com espinhos só nas laterais, nunca no centro do caminho. |
| Montaria: perder o cavalo "sem entender" | Balão "Ai! Você caiu do cavalo" e som próprio; a regra visível no cartão do cavalo. |
| Muitos poderes dispersos | Um poder por vez no modelo; os demais só por missão. |
| Pedido de missão que ela não consegue conferir sozinha | Contador vivo ao lado da frase ("faltam 3") e, na missão de regra, a regra destacada no Regras. |
| Nada travar mas missão difícil parada | Se 3 sessões sem concluir, a missão vira duas (já previsto). Acrescento: oferecer a regra "pela metade" antes disso. |

Princípio: **a falha sempre ensina o motivo.** Todo "perdi" mostra uma frase de uma linha com voz (caí, o fôlego acabou, o cavalo foi embora) e o caminho de volta em até 3 segundos.

## 7. O que garantir para que ela programe e não só monte

1. **Toda peça nova nasce com regra aberta**, nunca escondida. Ao soltar a pena, o Regras já tem o cartão "Pena" e o Painel diz "Abra Regras e mude uma coisa".
2. **Toda missão de pacote tem uma versão de mudança de regra** (QUANDO ou FAÇA), com `confere` que olha `regras` e `disparos`, igual às missões atuais (`som`, `pontos`).
3. **Um desafio de previsão por conceito**: antes de testar, ela escolhe entre 2 desfechos ("o fôlego acaba aqui ou chega até a bandeira?"). Previsão ativa o raciocínio; montar não.
4. **Depuração guiada**: o detetive mostra quais regras do pacote dispararam. Se o poder não ligou, a lupa aponta a regra desligada.
5. **Poder ou peça sem regra é permitido, mas não conta** para medalha de programadora. A medalha só vem com regra mudada e disparada.
6. **Sequência visível**: pelo menos uma missão por pacote com 2 ações em ordem (ex. "ligar poder" e depois "balão").
7. **Cada pacote termina em decisão dela**: trocar quem liga, o tempo ou o que acontece quando acaba.
8. **Medir o uso**: se o .json mostrar fases montadas e zero regras mudadas em 3 sessões, a rodada prioriza missão de regra, não peça nova.

## 8. Minha versão da primeira leva (até 10 itens, ordem)

1. Painel "Continuar de onde parei" + botões do papai no rodapé (retomada sem ler).
2. Trilho "Próximo" + contador vivo da missão (feedback imediato).
3. Mapa alto (Torre) com câmera suave em y, ponto de controle automático e cair = perder tempo.
4. Fase nova por formato, só 3 cartões: Reta, Torre, Lago (miniatura real).
5. Cipó/escada + botão ▼ (física sem custo conceitual, prepara o Lago).
6. Filtro "bloco só aparece se a peça existe" como portão (teste: fase reta vê a lista de hoje).
7. Lago mínimo: bolha de ar + peixe + **fôlego** (barra com ícone, aviso aos 25%, 2 blocos).
8. Primeiro poder: **só a Pena** (ligar poder com tempo, QUANDO o poder acabar) + 2 missões, uma com regra mudada.
9. Cano com par de cor ("ir para") + 1 missão de troca de destino.
10. Selo "Salvo" + "Guardar este jogo" com nome por ditado + "Queria que tivesse…" (fecha o ciclo sem tela nova).

Fora da leva 1: Poço, Céu, Caverna, Luva, Asinha, Pequeno real, Portinha, Cavalo, Tartaruga, Dino, carimbos, Estante separada, Mapa de caminhos.

## 9. Vetos

1. **Veto às três montarias na leva 1** (Cavalo, Tartaruga, Dino): montaria exige "estiver montada" + "desmontar" + física própria, e Pequeno/Portinha ainda não existem. Uma montaria só, e na leva 2.
2. **Veto ao "Mapa de caminhos" como tela nova** substituindo Missões: duplica a barra, muda o lugar das coisas que ela já aprendeu, e uma criança de 7 anos com 8 meses de hábito sofre mais com mudança de lugar do que com falta de ilha.
3. **Veto a qualquer peça ou poder sem uma missão que obrigue a mexer em regra** e sem entrada de voz gravada: peça sem missão-regra é enfeite, e voz sem gravação não fala (regra da casa).
