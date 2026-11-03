# Motion Rangers — bíblia do universo (Ciências 3º tri, AF 04/11)

Conteúdo em `_roteiro.md`. Um universo só em jogo, teoria, simulado, pocket e vídeo (padrão aprovado em História).

**REGRA DO PAULO (02/11): ambiente, personagens, história e fases nascem do material DESTA prova.** Toda coisa na tela aponta para um slide ou vídeo. Fora do jogo: gelo, castelo, fada, conde, tinta, dragão, biscoito, Rainha Traça, museu, heróis antigos. No fork do motor do Inglês reaproveita-se o CÓDIGO; nenhum sprite, nome, cenário, poder ou texto daquele jogo aparece. Portão: grep por esses nomes em tudo o que a criança vê.

## História (toda ela tirada dos slides)
**Título:** *Motion Rangers: Find Everything!*

**Problema:** **Twister**, o tornado do slide S8 (vilão cômico, nunca assustador), passou pela escola e espalhou tudo: as bolas, a pipa, os brinquedos, os livros. Nada está no lugar e a turma se perdeu ("we might get lost", S1).

**Missão:** as crianças leem o mapa com o **Pin** (S1), acham cada coisa dizendo ONDE ela está (S3/S4), olham de vários lados (S7), usam o vento e a água que ajudam contra os que atrapalham (S8), recuperam os 6 movimentos (S5) e, no fim, empurram e puxam (S6) para vencer o Twister.

**Prêmio:** as 6 **Motion Stars**:
| movimento | cor | frase-âncora (slide S5) |
|---|---|---|
| bounce | amarelo #eab308 | up and down after hitting a surface |
| fly | azul #0ea5e9 | through the air |
| roll | rosa #ec4899 | turning over and over |
| slide | lilás #8b5cf6 | smoothly along a surface |
| spin | laranja #f97316 | around and around |
| swing | verde #22c55e | back and forth |

**Cores dos tópicos:** position #f472b6 · directions #fb7185 · perspective #fbbf24 · forces #38bdf8 · objects #a78bfa · animals #34d399 · pushpull #f97316.

## Personagens e origem
- **Heróis:** as crianças de S6: menino do capacete azul, menina do rabo de cavalo, menino de camisa amarela, menino de chapéu verde que pesca.
- **Pin** — o pino vermelho do mapa (S1): position e directions.
- **Gigi** — a girafa pintora (S7): perspective. "People are not right or wrong."
- **Breezy e Drop** — vento e água "helpful" (S8, V3).
- **Boing** — a bola que quica (S5): objects.
- **Paws** — o cachorrinho da sala (S3): animals e corpo.
- **Max** — o menino do cabo de guerra (S6): push or pull.
- **Vilões:** **Twister** (tornado, S8) · **Gusts** (rajadas, "strong winds") · **Puddles** (poças de enchente, "floods") · coisas soltas pelo tornado: latas que rolam, bolas que quicam, piões que giram (S5).

## Mapa inicial
Variação: **o mapa da escola visto de cima** (S1), com o Pin pulando de parada em parada numa rota tracejada; rosa left/right. Nem livro (Inglês) nem mapa-múndi (História).

## Fases (9, variadas; dificuldade mantida; perguntas nas portas ao longo)
| # | fase | tipo | origem | conteúdo |
|---|---|---|---|---|
| 1 | The Messy Room | plataforma no quarto de S3, gigante: sofá vermelho, violão, abajur, aquário, troféu, mochila | S3, S4 | position |
| 2 | The School Map | plataforma pela escola: Auditorium, sections, Gym, Trix, Treehouse, placas left/right | S1 | directions |
| 3 | Tower View | vertical: subir a Torre Eiffel, Gigi pinta a vista de cada lado | S7 | perspective |
| 4 | Wild River | água: nado e barco; represa, regador, enchente | S8, V3 | water |
| 5 | Windy Fields | campo com vento: pipa, turbinas, dente-de-leão, dunas | S8, V3 | wind |
| 6 | The Move Park | parque cujos aparelhos são os 6 movimentos: escorregador, balanço, cata-vento | S5, V1 | objects |
| 7 | Animal Rally | corrida 2,5D com bichos que nadam, voam, sobem | L10, S2 | animals |
| 8 | Tug-of-War Stadium | estádio: chute, cabo de guerra, carrinho | S6, V2 | push/pull |
| 9 | Twister! | chefão: empurrar e puxar; as letras formam "WIND AND WATER CAN HELP" | S8 + tudo | tudo |

## Varredura das imagens oficiais (ordem do Paulo 02/11): recortar, redesenhar ou recriar
Decisão por tipo de uso. Prova e teoria = RECORTE fiel (a criança reconhece a figura da aula; 54 recortes em `media/cie3/`, script `gen/recorta.py`). Jogo = nada de colagem de foto num cenário animado: RECRIAR em canvas no estilo do jogo, copiando forma e cor do slide; recorte só onde a imagem é o próprio objeto da cena (placa, quadro, pergunta).
| imagem oficial | simulado/teoria/pocket | jogo |
|---|---|---|
| S1 mapa da escola | recorte `map-school` | REDESENHAR como mapa inicial vivo: mesmas posições (2 hexágonos A/B, Auditorium no meio, Gym 1 e 2, C section, Trix, Treehouse, Drive, pino vermelho no Year 2) |
| S1 mapas de cidade, GPS | só no material | RECRIAR: rota tracejada azul do GPS no mapa; pino gigante = Pin, com o desenho do slide |
| S2 mão e listas | recorte/material | RECRIAR: mão aberta como placa dos gestos (touch, point, grab) |
| S3 sala | recorte `room` | REDESENHAR em escala gigante = fase 1 (sofá vermelho, cortina lilás, abajur, violão, planta, aquário, troféu, livros, tapete lilás, mesa, cachorros, caixa com coelho, TV, raquete, mochila). Sem a marca da TV |
| S4 12 preposições | recortes `prep-*` | RECRIAR: urso na caixa, maçã no livro, gato sob a prateleira, peixe no aquário viram cenas e itens da fase 1 |
| S5 objetos | recortes `obj-*` | RECRIAR como aparelhos: bola quica=mola, pipa=planar, roda/lata rolam=perigo, escorregador, gelo desliza, pião/ventilador/cata-vento giram, balanço/planta/porta balançam |
| S6 crianças | recortes `push-*`, `pull-*` | REDESENHAR as 4 crianças como heróis jogáveis, roupas iguais às do slide; carrinho vermelho, caixa, gaveta, cabo de guerra viram mecânicas |
| S7 torre e girafa | recortes `view-*` | RECORTE como quadros que Gigi pinta (a pergunta usa a foto); REDESENHAR torre e girafa para a fase vertical |
| S8 água e vento | recortes `help-*`, `harm-*` | REDESENHAR: regador, represa, turbinas, dente-de-leão como cenário; tornado=Twister, onda, enchente, palmeiras dobradas como perigos |
Etiquetas de edição, logos de terceiros (EduNestify, Netflix) e a legenda "Tower" ficam de fora dos recortes usados em pergunta e do jogo; no "School material" a imagem é a original, sem alteração.
