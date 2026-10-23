# Fábrica de Jogos da Mariana — desenho (v1, 23/10/2026)

Módulo `coding/` do projeto das provas. A Mariana (7 anos, Y2, 8 meses de codeSpark + Construct 3
na escola, ADORA pixel art) é a **criadora**: ela inventa o jogo, desenha os personagens, monta as
fases, escreve as regras, testa, conserta, documenta e mostra para alguém jogar. A IA entra como
**oficina de peças** (faz a peça que ela especificou), nunca como quem faz o jogo por ela.

O produto nunca fica "pronto": o banco (`banco/`) cresce a cada pedido dela e a cada missão nova;
o motor aceita tipos novos por registro (`FAB.registraTipo`), sem reescrever nada.

## O ciclo que a tela ensina (o mesmo de quem faz jogo de verdade)

```
 IDEIA  →  PERSONAGENS  →  FASES  →  REGRAS  →  TESTAR  →  DIÁRIO  →  (mostrar p/ alguém)
 plano     pixel art       mapa      código     jogar      o que      papai joga e perde
           (Ateliê)        (tiles)   (quando→   + caçar    deu certo,
                                      faça)     bug        o que mudar
                    ↖_________________ melhorar ________________↙
```

Cada passo é um botão grande na barra da esquerda, com desenho (SVG, nunca emoji como
ilustração), uma palavra e o alto-falante que lê em voz alta o que se faz ali (uma frase).

## Telas

| Tela | O que ela faz | Habilidade |
|---|---|---|
| **Painel** | vê os jogos dela, o nível de criadora, a missão sugerida e "continuar de onde parei" | organização, continuidade |
| **Ideia** | ficha do jogo por cartões: nome, herói, objetivo, onde acontece, o que atrapalha, para quem, quão difícil; história curta (digitada ou ditada) | planejamento, documentação |
| **Personagens** (Ateliê de Pixel) | editor 16×16 com 2 quadros de animação; lápis, borracha, balde, espelho, conta-gotas; começa de um modelo ou do zero; dá nome e escolhe quem é quem no jogo | criatividade, simetria, algoritmo (balde) |
| **Fases** | pinta o mapa com peças (chão, nuvem, gelo, água, lava, espinho, mola, moeda, estrela, coração, chave, porta, bandeira, placa de pergunta, ponto de controle, inimigos); várias fases por jogo; cenário de fundo; medidor de dificuldade | design de níveis, equilíbrio |
| **Regras** (blocos) | regras no formato do Construct 3 / codeSpark: **QUANDO** (evento) · **SE** (condição, opcional) · **FAÇA** (até 3 ações em sequência); liga/desliga cada regra; ajustes de física (gravidade, pulo, velocidade, vidas, tempo) | eventos, condições, sequência, variáveis, laços |
| **Testar** | joga na hora; "óculos de detetive" mostra caixas de colisão e o registro em português de cada regra que disparou; ao fim, placar do teste (tempo, vidas perdidas, onde morreu) | teste, depuração, causa e efeito |
| **Diário** | registro automático dos testes + reflexão (3 caras + frase); guardar versão / voltar versão | metacognição, controle de versão |
| **Robô** (pedir à IA) | ficha de pedido: O QUE é · COMO é · O QUE FAZ (texto ou ditado); vê o estado de cada pedido (enviado → o robô está construindo → pronto) | especificação (escrever para alguém construir) |
| **Missões** | trilha de missões curtas de uma frase, com conferência automática e medalha; nada trava, tudo fica aberto | progresso, gamificação |
| **Jogar** (modo convidado) | tela cheia com a capa (nome + história) para outra pessoa jogar; link de compartilhar | satisfação, validação por terceiros |

## Integração com as provas

A peça **Placa ?** faz uma pergunta. A pergunta vem do banco da prova atual (`banco/provas.js`
aponta para `../ferramentas/<MAT>_banco.js`, a mesma fonte única que o jogo e o simulado da
matéria usam) ou de uma pergunta que ela mesma escreveu (criar a pergunta é estudar duas vezes).
Trocar de prova = trocar uma linha em `banco/provas.js` quando o Paulo mandar a próxima matéria.

## Arquitetura

```
coding/
  index.html            a Fábrica (casca + CSS)
  js/estado.js          estado, autosave, versões, exportar/importar, XP, medalhas
  js/pixel.js           desenho de sprite (string → canvas) + Ateliê
  js/motor.js           motor do jogo (plataforma / vista de cima), regras, detetive
  js/editor.js          editor de fases
  js/regras.js          editor de regras (blocos)
  js/telas.js           Painel, Ideia, Diário, Robô, Missões, Jogar
  banco/catalogo.js     sprites prontos, peças, cenários, jogos-modelo
  banco/blocos.js       QUANDO / SE / FAÇA (texto de criança + conceito)
  banco/missoes.js      trilha (frase, conceito, conferência, prêmio)
  banco/conceitos.js    cartas do saber (evento, condição, variável, laço, bug, teste, versão)
  banco/provas.js       qual banco de prova alimenta a Placa ?
  banco/oficina.js      peças que a IA construiu a pedido dela (cresce sempre)
  _engenharia/          este desenho, o fluxo da oficina, o roteiro de melhoria, o gate
```

Persistência: `localStorage` (autosave a cada mudança) + arquivo `.json` baixado
("Guardar no computador" / "Mandar para o robô"), que também é o canal com a IA.

## Regras de produto (herdadas das lições do Paulo)

- Missão, não lição. Se em 10 minutos não tem coisa engraçada na tela, a missão está errada.
- Instrução mínima, só onde é indispensável; detalhe só atrás do "?".
- Nada trava. Medalha e missão sugerem, não bloqueiam.
- Ela constrói à mão; o robô faz PEÇAS que ela encaixa. Pedido sem "o que faz" volta.
- Teste automatizado sempre mudo (REGRA ZERO do CLAUDE.md).
- Voz só em português (Antonio/Google pt-BR), nunca voz multilíngue.
