# The Lost Endings — especificação do jogo de Inglês (3º tri)

Aprovado pelo Paulo em 14/10 ("vou te dar um voto de confiança, pode fazer"), com as ressalvas:
- **nada de reação forçada** ou não natural ao jogo; ele não consegue avaliar o que é ousado demais, então tudo tem de ser jogável e natural para uma criança de 8 anos;
- **arte de qualidade** (os SVG da proposta foram reprovados como "péssima qualidade");
- **jogo inteiro em inglês**, perguntas e respostas inclusive, com vocabulário do material ou inglês simples de 8 anos;
- **bandeira do Brasil** mostra a tradução em fonte menor logo abaixo de cada trecho em inglês;
- data da prova: ele avisa depois.
Proposta original: `_proposta_jogo.html`. Conteúdo: `_roteiro.md`. Banco: `ferramentas/ING3_banco.js` (campo `at` = átomo).

## Arquitetura (fork do WiseBear, que funciona)
Arquivos novos `ferramentas/ING3_jogo*`; o LP3 fica intacto. Reaproveitados sem mudar: `LP3_jornada_partituras/musica/som.js` (SOM, música), `LP3_jornada_arte.js` e `arte2.js` (utilitários rr/el/circ/lin/hash, tiles, partículas, molas, canos, moedas…), `serafina-core.js`, `OP_voz.js` (Thalita multilíngue: `SERA_CFG.voz='thalitamultilingual'`, `lang:'en-US'`).

| arquivo | papel |
|---|---|
| `ING3_jogo.html` | casca; HUD em inglês; botão bandeira (`body.show-tr` + `J.tr`) |
| `ING3_jogo_arte.js` | heróis (Lia/Theo/Bia), Pip, moradores que perguntam, Conde Rabisco, cenas novas, mapa-livro |
| `ING3_jogo_fases.js` + `ING3_jogo_mapas.js` | reinos, mapas ASCII, parser (+ `Q` = morador que pergunta, `P` = ovo do Pip) |
| `ING3_jogo_motor.js` / `motor2.js` | física, checkpoints, laço, mapa, intro |
| `ING3_jogo_quiz.js` | a pergunta DENTRO do mundo |
| `ING3_jogo_cena.js` | desenho por estado |
| `ING3_jogo_ui.js` | DOM: HUD, menus, escolha do herói (tudo EN + `<span class="tr">`) |

### Contrato da arte (`window.ARTE`, estendido por `ING3_jogo_arte.js`)
- `A.heroi(c,x,y,estado,t,dir,escala,quem,look)`: pés em (x,y); `quem` ∈ `lia|theo|bia`; estados `idle walk jump fall cheer dizzy swim fly crawl`; altura base 88 px (como o urso).
- `A.pip(c,x,y,estado,t,dir,escala)`: dragãozinho; `estado` ∈ `idle walk fly ride egg`.
- `A.morador(c,tipo,x,y,t,dir,falando)`: `crier` (arauto), `godmother` (fada madrinha), `owl` (coruja), `octopus` (polvo poeta), `bard` (bardo das nuvens), `coach` (treinadora), `referee` (juiz), `mouse` (ratinho), `announcer` (locutor). Pés em (x,y), ~110 px.
- `A.conde(c,x,y,estado,t)`: Conde Rabisco (cômico).
- Cenas em `A.CENAS` + `A.longe/A.perto` para `vila`, `bosque`, `recife`, `nuvens`, `ginasio`, `estadio`, `biscoito`, `tinta`, `biblioteca`.
- `A.mapaLivro(c,t)`: o livro aberto com o caminho dos reinos.

## A pergunta dentro do mundo (ING3_jogo_quiz.js)
- No mapa, `Q` marca um morador. Ao chegar perto (no chão), o jogo entra em `quiz`: inimigos congelam, a câmera enquadra o morador, o balão dele mostra a pergunta (EN; PT menor embaixo com a bandeira) e **três placas de resposta descem** à altura de um pulo.
- Responder = **pular e bater a cabeça na placa** (o mesmo gesto da caixa "?") ou tocar nela. Teclas 1/2/3 também.
- Acertou: placa verde, brilho, o morador diz o porquê curto (`ex`), uma estrela vai para o HUD. Errou: placa treme e apaga, a certa acende, o morador explica (`ex`); toque/pulo segue.
- Cada morador faz **3 perguntas** (número especial dos contos), depois entrega **uma página** do livro. 3 moradores por reino = 3 páginas.
- Botão "✕ Leave" sai na hora; o morador fica com "!" para depois. A bandeira do fim sempre deixa passar.
- Pergunta com `texto` (poema/historinha): o morador segura um pergaminho grande com o texto.
- Regra de mapa (verificada por script): depois de cada `Q`, 18 tiles de chão plano livre (sem buraco, inimigo ou bloco) para as placas.

## Jogabilidade (correções do WiseBear, verificadas por script)
1. Checkpoint só acende quando o herói passa por ele na mesma altura (±4 tiles); reaparece sempre no último aceso.
2. Todo espaço com moeda/item/morador cabe o herói no maior tamanho (110 px) e o pulo alcança (`lint_grande`).
3. Primeiros ~20 s de cada reino sem perigo; o primeiro inimigo só depois do primeiro checkpoint.
4. Poderes mudam o jeito de jogar: Pip (planar), roupa de mergulho (nado livre, recife), capa (voo livre, céu).

## Reinos (átomos do roteiro)
| # | reino | mecânica | quem pergunta | átomos |
|---|---|---|---|---|
| 1 | Once Upon a Time Village | plataforma | crier | F1 F2 F6 F7 F10 F11 F12 F15 |
| 2 | Enchanted Forest | Pip | godmother, owl | F3 F4 F5 F8 F9 F13 F14 |
| 3 | Real or Make-believe Rally | corrida (faixas) | announcer | R1–R8 |
| 4 | Rhyme Reef | nado | octopus | P7 P9 P10 |
| 5 | Stanza Skies | voo | bard | P1–P6 P11 |
| 6 | Rhythm Gym | ritmo | coach | P8 P10 + revisão |
| 7 | Cause & Effect Stadium | futebol | referee | E1–E7 |
| 8 | The Cookie Circle | fase-roda | mouse | C1–C8 |
| 9 | Inkwell Castle | chefão | conde | todos |

## Etapas
- **E1 (fatia jogável):** casca EN, escolha de herói, mapa-livro, intro curta, Village + Forest, quiz no mundo, checkpoint/encaixe verificados. Publicar como beta para o Paulo sentir a jogabilidade.
- **E2:** Reef (nado) e Skies (voo).
- **E3:** Rally, Gym, Stadium, Cookie Circle.
- **E4:** Castle, final circular, trilha de domínio público, polimento.

## Ponto de parada (14/10, noite) — retomar daqui
Feito e testado (QA mudo, Playwright): casca EN + bandeira; intro; escolha de herói; mapa; quiz no mundo (placas, bater a cabeça, toque, 1/2/3; 3 perguntas → 1 página; Leave); Village (1) e Forest (2, com Pip); Reef (4, nado) e Skies (5, voo com teto); checkpoint corrigido; instruções mínimas (Paulo). Teste: `scratchpad/t_jogo1.py`, `t_jogo2.py` (bate em todas as placas nos 3 tamanhos), `t_jogo3.py` (nado/voo).
Em andamento:
- `ING3_jogo_corrida.js` (Rally, reino 3) ESCRITO, ainda NÃO ligado: falta `<script>` no html, `iniciaFase` desviar para `CORRIDA.inicia(f)` quando `f.modo==='corrida'`, estado 'corrida' no laço/cena/teclado/toque, `UI.modoCorrida(on)` (trocar rótulos ▲▼), `FASES` reino 3 `modo:'corrida'` e PRONTOS[3]; exportar `QUIZ.embaralha`/`QUIZ.marca`.
- Agente de arte (ING3_jogo_arte.js + trabalho/3tri_ingles/arte_preview.html): heróis, Pip, moradores, conde, cenas vila/bosque/biblioteca/recife/nuvens, mapa-livro, placa (centro em x,y). Regra do Paulo: humano NUNCA de quatro apoios — estados 'crouch' (agachado) e 'crawl' (rastejar de barriga).
A fazer: Stadium (pênaltis, reino 7), Gym (6) e Cookie Circle (8) como fases de plataforma temáticas, Castle (9, chefão Conde), final circular, trilha domínio público, teoria e vídeo; publicar o jogo como beta (hoje não está linkado; site com aviso "em construção").

## Ponto de parada (15/10) — v2 em implementação (GAME_DESIGN_v2.md)
Feito e testado (QA mudo): ambiente de questões (porta/baú + ▼ ou toque; moldura, suspense, 30 s, cartões tocáveis); intro só com Next; mapa com toque duplo/Play; capa do livro; Leo (2+2); perigos do WiseBear portados (ING3_jogo_perigos.js: quedas, barris, canhão, canos+submundo, espinhento, voador, paredes %, estrela, corações); mini-chefe genérico (ING3_jogo_chefinho.js, pele Big Blot em todos os reinos); aparelhos (ING3_jogo_aparelhos.js: cipó/argola pêndulo, barra com janela, trave, salto, ritmo, zagueiro); recife/céu (ING3_jogo_marceu.js); itens da história do Mouse; castelo em 3 fases (ING3_jogo_chefao.js). Mapas: gen_mapas.py (usa gen_mapas_v2_proposta.py) + portão verifica_ing3.js (entende os aparelhos). Contagem de obstáculos ativos por reino: 17–56 (WiseBear média 17,8).
Em andamento (agentes): corrida vertical com pit stop (ING3_jogo_corrida.js) e cena de pênaltis (ING3_jogo_penalti.js).
Pendente: chefinhos com pele temática por reino; música 'suspense' própria; arte de poses de pendurar/girar (hoje usa 'cheer' rotacionado).

## Correções de 17/10 (crítica do Paulo depois de jogar) — regras que valem daqui em diante
- **Nada intransponível.** Parede de espinheiro/migalhas (`%`) agora tem 2 tiles e se pula (a estrela só é atalho). O portão `gen/verifica_ing3.js` trata `%` como BLOQUEIO: nenhum caminho pode depender de poder.
- **Impulso não se corta.** Mola, trampolim, cipó e barra marcam `u.lancado`: soltar PULAR não corta a subida (era isso que deixava o pula-pula "fraco" diante do obstáculo alto). `u.impulsoT` guarda o vx do salto.
- **Poder se GANHA na fase.** Céu começa andando; a capa está no caminho e um aviso (`UI.aviso`, pausa, botão) explica o voo. Recife começa na PRAIA (4 linhas de céu, `sup:4` no mapa), roupa de mergulho `d` no caminho, aviso, e só então mergulha. A 1ª porta de perguntas fica depois de um trecho de imersão.
- **Aparelhos fáceis de pegar e soltar.** Ponta do cipó/argola à altura das mãos (y≈290–300), agarrar com folga de 50×60 px, soltar sempre para a frente. Barras: pendurado pelos braços, pernas em pêndulo (sem giro de 360°), barra seguinte perto.
- **Mini-chefe se pisa.** Vale vindo de cima (pés na metade de cima); antes a queda rápida atravessava a margem.
- **Guia do caminho.** Seta para a porta pendente, para o cano que leva ao submundo pendente e, no fim, para o livro; dica "Press ▼ to go down the pipe".
- **Nuvem nunca cobre pergunta.** Partículas de clima são desenhadas antes do quadro da pergunta.
- **Casa = mapa.** Dentro de um reino o botão casa pergunta "Back to the map?"; só no mapa/capa sai do site.
- **Escolha do herói.** Os 4 heróis inteiros no canvas, nomes alinhados embaixo; tocar no herói escolhe.
- **Corrida.** Karts menores (KS .72), pista mais estreita e curvas fechadas; 10 corredores; larga em 10º; cada acerto no pit = 1 TURBO (▲ ou botão com raio), cada turbo passa UM carro → só é 1º quem acerta as 9; bater (pedra, ponte, tinta) faz o de trás passar (dá para repassar). Apresentação dos pilotos de macacão antes da largada. Rampa com voo de 1,9 s cobrindo a lama. Portão `gen/verifica_corrida.js` (programação dinâmica): sem trecho impossível, sem lama inevitável fora da rampa, curvas cabem no asfalto a 60 % da velocidade lateral.
- **Chefão (v3).** Abertura com Next (escuro, trovão, a poça borbulha, o Conde surge e se apresenta, o narrador diz o objetivo); o Conde anda na sacada e reage; tudo o que cai sai da pena dele em arco com sombra; objetivo sempre na tela; rodada 3 = letras que viram ESCADA até a sacada; faixa ROUND 2/3 entre os duelos.
QA mudo: `scratchpad/qa_v3.py` (telas) e `qa_v3b.py` (mecânicas por teletransporte; o headless roda em câmera lenta, então andar "de verdade" no teste é lento).

## Correções de 18/10 (segunda jogada do Paulo)
- **Um poder por reino**, pego no começo (antes da 1ª porta), num móvel desenhado, com ▼ ou toque, e cartão que diz como ajuda (`ING3_jogo_poderes.js`, tabela `TAB`): Vila = Botas de Sete Léguas (pulo duplo), Floresta = Pip (planar + faíscas que queimam espinhos), Recife = roupa de mergulho (bolhas), Céu = Capa das Nuvens (voo + vento), Ginásio = giz (cambalhota, pega fácil nos aparelhos), Estádio = bolas (chute), Cookie = canudo (leite). O saco de estrelas global saiu dos reinos 1-8; o castelo continua com estrelas.
- **Cookie Circle**: objetos da história nos seus móveis (mesa do café com biscoito, copo de leite "Drink!" e pote de canudos; porta-guardanapos; cômoda/espelho; caneca/tesoura; vassoura que varre as migalhas; fita que conserta a ponte). Guardanapo = paraquedas (nunca capa). O copo de leite gigante do fundo saiu.
- **Perigo com origem visível e aviso**: Chef de Tinta ergue o prato (!) antes de jogar, torneira, telhado, galho de carvalho (bolotas e cipós), pilha de toras, portão de barris, máquina de bolas (luz vermelha), nuvem que sopra, luminária/lanterna dos voadores. Rolante/máquina só disparam com a fonte na tela.
- **Corrida**: posição final = 10 − respostas certas (turbo passa um carro na tela; turbo automático no fim; batida só atrasa), kart de 20 px com chassi e cor próprios, pelotão visível, curvas que exigem direção com câmera lateral, slalom em reta, rampa por distância. Portão `verifica_corrida.js` endurecido (fórmula das fileiras, curvas, rampa).
- **Publicação**: o site sai do ramo `em-construcao` via `trabalho/3tri_ingles/publicar_ing3.sh` (push em main não publica).
