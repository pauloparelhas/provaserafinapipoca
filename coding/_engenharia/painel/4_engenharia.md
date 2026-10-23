# Fábrica de Jogos — plano de engenharia da primeira leva (painel, 23/10/2026)

Base lida: `1_designer.md`, `js/motor.js`, `js/editor.js`, `banco/catalogo.js`, `banco/blocos.js`, `js/regras.js` (trechos),
`js/telas.js` (palco/toques), `banco/oficina.js`, `_engenharia/gate/jogador_robo.py`, `valida_banco.js`. Nenhum arquivo do produto foi tocado.
Estimativa: P = meio dia, M = 1 a 2 dias, G = 3 a 5 dias de um programador.

## 0. Como o motor é hoje (o que decide o risco)

- `LINHAS = 12` e `VH = 192` são constantes lidas em ~10 lugares do `motor.js` (`tipoEm`, `solidoTile`, `carregaFase`, `desenha`, queda `h.y > VH+24`,
  `cria()` com `ty 1..5`, `confete` com `y=-5`) e em 4 do `editor.js` (`desenhaMapa`, `poe` com `j > 11`, `celula`, `zAuto`). `valida_banco.js` exige `mapa.length === 12`.
- O canvas tem altura fixa `VH` e largura 200..420 pela proporção do palco. `cam.y` existe e fica em 0. Esta é a melhor notícia: **a janela de visão continua
  sendo 12 linhas**; só o mundo fica mais alto. Nada de `encaixaPalco`, CSS ou toques muda.
- Toda física é uma função só, `passoHeroi` (variáveis `tPulo`/`tChao` são fechadas no módulo), e as ações são um `switch` em `faz()`. Para dois programadores
  não pisarem no mesmo arquivo, o motor precisa de **ganchos** (seção 3, fatia S0a); sem isso, 6 dos 8 itens editam `motor.js` ao mesmo tempo.
- Água hoje é **uma entidade por casinha** (`ents.some(... cruza ...)` a cada passo, duas vezes por quadro, e `contatos()` de novo). Um Lago de 120x24 tem até
  ~2900 entidades de água: inviável. Água e escada têm de virar **casinha de grade** (como grama), não entidade.
- `bate()` chama `solidoEnt()`, que varre `ents` inteiro a cada colisão de cada corpo: custo O(inimigos x entidades) por passo. Em mapa alto isso aparece.
- O robô (`jogador_robo.py`) usa só `FAB.motor.olha()` (noChao, buraco, parede, perigo) e as teclas `dir` e `pulo`: anda sempre para a direita e pula na frente de
  obstáculo. Não sabe subir, nadar, nem usar poder. Cada modelo novo precisa de **política própria**; o robô atual só ganha "Reta".

## 1. Formato dos dados (compatibilidade)

Regra de ouro: **nenhum campo novo é obrigatório e nenhum campo antigo muda de sentido.** Jogo salvo = JSON atual.

```
fase = { nome, cenario, mapa: [linhas de texto],            // antigo, igual
         formato?: 'reta'|'torre'|'poco'|'lago'|'ceu'|'castelo',   // novo, só rótulo (miniatura, "Fase nova")
         nada?: true }                                      // novo: liga o modo nado (fôlego, ▲ segurado sobe) só nesta fase
jogo.ajustes = { vidas, tempo, perguntas, folego? }         // folego: segundos de ar (padrão 10)
regras: { quando:{t,...}, se?:{t,...}, faca:[{t,...}], liga?, pacote? }   // t novos; pacote = id da peça que gerou a regra
```

- **Altura do mapa = `mapa.length`**, qualquer valor de 12 a 48; todas as linhas com a mesma largura (já é a regra). Mapa de 12 linhas: `ALT = 12`,
  `cam.y` preso em 0, comportamento idêntico ao de hoje. Linhas novas entram **no topo** (o chão continua na última linha), então aumentar a altura de uma
  fase existente nunca desloca o que já foi pintado em relação ao chão.
- Letras novas ficam em `FAB.TIPOS` como as atuais; letra desconhecida num build antigo vira "vazio" (`tipoEm` devolve null), então um jogo novo aberto num
  build velho degrada em vez de quebrar. Regras com `t` desconhecido em build velho quebram a tela de Regras: o link publicado carrega o jogo, então o
  `?v=` de cache (memória do projeto) precisa subir junto com a primeira fatia que publica (S8).
- Letras livres sugeridas (conferir contra `valida_banco.js` e `oficina.js`, que reserva as dela): cipó `Y`, escada `H`, cano `U` (4 cores = `U` `V` `W` `Z`),
  bolha `q`, peixe `i`, polvo `p`, água-viva `j`, pé de pato `d`, pena `w`, luva `u`, asinha `y`, cogumelo roxo `n`, portinha de rato `R`, cavalo `K`,
  tartaruga `Q`, dino `O`. A atual lista de usadas: `# T B P X I = ~ L ^ M o * h k D F ? C g b a f s - N A c t m v z e r @`.
- Estante: `E.estante = []` (novo, ausente = vazio), cada item `{id, nome, quando, capa, jogo: cópia}`; teto de 12 itens por causa do localStorage e do
  envio da nuvem (`nuvem.js`) — medir o tamanho do JSON de um jogo de 5 fases de 120x24 antes de fechar o teto.
- `.json` do "Guardar no computador": só ganha os campos acima. Carimbo opcional `J.fmt = 2`, gravado **somente** se o jogo usa altura > 12 ou letra/regra
  nova, para o gate e o robô-de-melhoria distinguirem; jogo antigo continua byte a byte igual.
- `valida_banco.js`: `mapa.length` de 12 a 48 e largura 20 a 120; letras únicas entre todos os pacotes; todo modelo antigo precisa seguir com 12 linhas
  (teste de regressão: "os 6 modelos atuais têm hash do mapa igual ao de antes").

## 2. Item por item

### 2.1 Mapa alto com câmera vertical (Torre, Poço, Céu)

Motor (menor risco):
- `ALT = grade.length` em `carregaFase`; trocar `LINHAS` por `ALT` em `tipoEm`, `solidoTile` (fora de `0..ALT` = vazio, exceto laterais sólidas) e nos laços de
  desenho; queda: `h.y > ALT*TS + 24`. `LINHAS` e `VH` continuam existindo para a *janela*.
- Câmera Y: alvo `heroi.y + h/2 - VH/2`, **zona morta de ±24 px** (pulo comum não mexe a tela; evita enjoo), olhar um pouco para baixo ao cair
  (`vy > 150` soma +24) e para cima ao subir cipó; lerp 8*dt; clamp `0..ALT*TS - VH`. Com ALT=12 o clamp é 0..0: nada muda.
- Desenho: `setTransform(1,0,0,1, -cam.x, -cam.y)`; laço de casinhas só nas linhas visíveis; descarte de entidades fora da janela também em Y.
  `fundo()` fica em coordenadas de tela; opcional: deslocar parallax por `cam.y*.1` (e degradê do céu variar com a altura, só na Torre, depois).
- Teleportes (`volta`, cano, nascer) devem **encaixar** a câmera (`cam = alvo` sem lerp), senão a tela atravessa o mapa inteiro.
- Pontas soltas: `cria()` sorteia `ty` relativo a `cam.y`; `confete` nasce em `cam.y - 5`; teto invisível em `y >= -3*TS` (herói não sai pelo topo);
  "cair custa tempo, não vida" não é motor: é o modelo da Torre ter chão largo embaixo e a regra `cai` já existente.
- Ganhos de desempenho nesta fatia (porque o mapa alto os expõe): lista separada `solidosEnt` (portas) para `bate()`; inimigos só andam a menos de ~1,5 janela
  do herói (dorme os distantes — comportamento só ativo em ALT > 12, para não mudar o que já existe).

Editor:
- `desenhaMapa` e `celula` passam a usar `f.mapa.length`. O `fzScroll` ganha rolagem vertical; ao abrir/trocar de fase rola até o **fundo** (onde está o chão).
  Botões ▲▼ (irmãos de ◀▶) rolam; "+alto/−alto" (±6 linhas, 12..48) **prepend** de linhas '.' no topo; −alto recusa se houver `@` ou `F` nas linhas que somem.
  `snap()/desfaz` já guarda `mapa` inteiro: serve.
- `poe()` troca `j > 11` por `j >= mapa.length`.
- Mini-mapa: depois (nice to have). A rolagem + ▲▼ resolvem a primeira leva.

Riscos: (a) **canvas do editor gigante**: 120x48 a z=3 são 5760x2304 = 13 Mpx (e iOS corta em 4096 de lado/16 Mpx; já estoura hoje a z>=2,1 em fase de 120 de largura).
Mitigar: limitar `Z` para lado <= 4096 e área <= 8 Mpx em mapa alto, e **redesenhar só a casinha pintada** (e a de baixo, por causa de grama virar terra) em vez de
`redesenha()` a cada movimento do ponteiro; (b) colisão no topo (teto invisível acima); (c) enjoo de câmera (zona morta); (d) o robô: ver 2.2.
Tamanho: **G** (core + editor + gate), repartido em S0a (ganchos) e S1.

### 2.2 Escada e cipó (`classe: 'escada'`) + tecla ▼

- Casinha de grade não sólida (mesmo caminho da água): `carregaFase` deixa `escada` e `agua` na grade (não vira entidade). `escadaTile(tx,ty)`.
- Teclas: `ArrowDown`/`s`/`S` -> `baixo` em `MAPA_TECLAS`; botão ▼ na mesa de toques (`palcoHTML` em `telas.js`). Não há conflito com `a/d/w` já mapeadas.
- Física (módulo `js/mod_subida.js`, via gancho `entrada`): agarra se centro do herói está a <= 5 px do eixo da escada, ▲ **segurado** ou ▼ apertado, e não
  (andando no chão com esq/dir). Agarrado: sem gravidade, `vy = ±60`, esq/dir a 40%; soltar tudo = fica parado (não cai: mais amigável) ou cai se ▼ + pulo. Sair de lado = pulo + esq/dir.
  Ao os pés passarem do topo da escada: empurrão `vy=-120` para subir na plataforma.
- Conflito conhecido: ▲ é também pulo. Resolvido pela regra acima (perto da escada, ▲ segurado sobe; para pular dentro da área de escada, segure esq/dir).
  O modelo deve ter a escada 1 casinha mais alta que a borda do chão.
- Fora da escada, ▼ = agachar (depende do pequeno real, 2.4); prioridade: escada > cano > agachar.
- Dados: peças `cipo` e `escada` (mesma classe, pele diferente) em `banco/pacote_subida.js`. Nenhum bloco novo.
Riscos: agarrar sem querer ao correr (mitigado), travar na ponta (empurrão), robô (abaixo). Tamanho: **M**.

### 2.3 Água, fôlego, bolhas, bichos que nadam

- **Conversão da água para casinha** (em S0a, com teste de equivalência): `naAgua` = casinha de água no centro do herói; a regra "tocar em água" continua
  disparando ao entrar (detecta a transição, passa uma entidade-fantasma `{tipo:'agua', classe:'agua'}` — `some` nela é inofensivo). Prova: o robô ganha
  todos os modelos atuais e `desenhaMapa` não muda uma casinha. Seguro, e tira o maior custo do Lago.
- Modo nado só se `fase.nada` (formato Lago): ▲ **segurado** sobe a -60 (hoje cada toque dá um tranco de -200; a água das fases antigas fica como é),
  cabeça submersa = casinha de água em `y+2`. Fora disso, nada muda.
- Fôlego: `S.folego` (0..max, `J.ajustes.folego||10`), gasta 1/s com a cabeça submersa em fase `nada`, recarrega 4/s fora (e a bolha dá +5). Ao chegar a 0 dispara
  `folego0` **uma vez** (trava até voltar a >0). `volta` repõe o fôlego (senão a regra padrão "fôlego acabou -> vida -1, voltar ao controle" repetiria todo quadro).
  HUD: `onHud` ganha `extra:[{ico,valor,max}]` (genérico, reaproveitado por poderes); `telas.js` desenha barra.
- Bichos: `mover:'nada'` por registro (`M.movers.nada`); peixe vai e volta e vira ao sair da água ou bater; polvo sobe e desce; água-viva reaproveita `flutua`
  limitada a casinhas de água. `classe:'inimigo'` -> as regras padrão "tocar/pular em inimigo" já valem; **nenhuma regra nova para eles**.
- Blocos: QUANDO `folego0`; FAÇA `folego` (+N). Filtro "só aparece se a peça existe" (`requer:'bolha'`) em `regras.js`.
- Nadadeira (pé de pato): `c.vel *= 2` e sem gasto de fôlego (usa a API de poderes, 2.4).
Riscos: bicho preso em parede (testar com o gate de lupa), regra `folego0` apagada = herói imortal debaixo d'água (aceitável, é escolha dela), fase `nada` sem
bolha possível = injogável (o gate "robô termina o Lago sem perder o fôlego" cobre). Tamanho: **G**.

### 2.4 Poderes (pulo duplo, grudar na parede, planar, pequeno real, portinha de rato, nadadeira)

- Estado `heroi.pod = {nome: segundos}` (Infinity = até o fim da fase; zerado em `carregaFase`, **mantido** em `volta`), API pública `M.poder.liga/desliga/tem`.
  FAÇA `ligar` com `v:'planar:10'` / `'planar:fim'` e `desligar`; QUANDO `poderacaba`; SÓ SE `tempoder`. Uma só peça de bloco com lista (`FAB.OPCOES.poderes`),
  sem 2 parâmetros no cartão: `regras.js` só precisa tratar parâmetro-lista genérico (hoje `chaveParam` conhece só `sons|falas`).
- Pulo duplo: contador `pulosAr` (zera no chão/água/escada); no gancho `pulo`, se o buffer `tPulo>0`, sem coyote e `pod.pulo2` e `pulosAr<1`: `vy=-PULO*.9`.
- Planar: ▲ segurado, `vy>0`, no ar: `c.maxQ=45`, `c.grav*=.3`.
- Grudar: depois de `move()`, `r.parede` + no ar + `vy>0` + direção apertada contra a parede: `c.maxQ=30`; pulo = `vy=-PULO*.95`, `vx=-lado*110` e trava de
  controle horizontal de 0,18 s (senão a seta pressionada devolve o herói à parede).
- Pequeno real e agachar (hitbox 6x8, pés e centro preservados): `setaCaixa(w,h)` no motor (S0a) em vez de mexer em `heroi.w/h` à mão; crescer só se a caixa
  grande couber (`bate`), senão continua pequeno ("encaixado"). Desenho do herói usa `h.w/2` (hoje é `+5` fixo). Portinha de rato = casinha sólida com
  `rato:true`, ignorada por `solidoTile` só quando o corpo atual é o herói pequeno (variável `corpoAtual` ajustada em `passoHeroi`).
- Regras nascem com a peça: `FAB.pacoteNasce(tipo)` chamado em `poe()` empurra as regras-modelo do pacote (marcadas `pacote:`) na primeira vez que a peça entra
  num jogo; jogo antigo que ganha uma pena ganha as regras. Inconsistência do documento do designer: "funciona sem regra" não vale — sem regra a pena não liga
  nada; o contrato é regra gerada automaticamente (consistente com `REGRAS_PADRAO`). Se ela apagar a regra, a pena fica decorativa.
Riscos: colisão com hitbox menor (varredura x depois y em `move()` aguenta; sem tunelamento: 3,5 px/passo a 60 Hz, 7 px no teto de 30 fps), grudar prendendo o herói
em parede lisa (testar parede de 1 casinha e quina), cogumelo roxo de 10 s sufocando em túnel (encaixado resolve). Tamanho: **G**.

### 2.5 Montarias

- Dados em tabela (para a oficina poder acrescentar): `FAB.MONTARIAS = {cavalo:{vel:1.6,pulo:1.3,agua:'desmonta'}, tartaruga:{vel:.6,velAgua:2,semFolego:true}, dino:{...}}`.
- Peça parada no mapa (`classe:'montaria'`, entidade). FAÇA `montar` (usa `ctx.ent`, some com a entidade, guarda `heroi.mont`) e `desmontar` (a montaria
  some com poeira, herói ganha `inv`); SÓ SE `montada`; QUANDO `montar` (para balão). A regra do designer "inimigo + montada -> desmontar" é um `se` na regra padrão
  que já existe ("tocar em inimigo"): dá para nascer com **duas regras na ordem certa** (a com `se montada` primeiro e a de vida -1 com `se NÃO montada`; precisa de um
  `naomontada` ou de uma flag `para:'montada'` no `dispara` — decisão: criar SÓ SE `montada` com polaridade, igual a `tem`/`naotem`).
- Hitbox do herói **não muda** (menor risco): a montaria é só desenho (herói 6 px mais alto, sprite da montaria embaixo) + multiplicadores em `c` pelo gancho `entrada`.
  Cavalo na água: desmonta e o cavalo volta ao ponto de origem (evita ficar preso).
- Tartaruga lê `naAgua` (casinha) e `pod`/fôlego (S4).
Riscos: ponto de origem do cavalo dentro de água -> loop (gate valida: peça de montaria não pode ficar a < 2 casinhas de água), pele da montaria (Ateliê já pinta
inimigo; `skinDe` serve). Tamanho: **M**.

### 2.6 Canos e portais

- Peça sólida `cano` (você pisa em cima), 4 letras = 4 cores; pareamento no `carregaFase`: mesma letra, ordem de leitura, 1ª com 2ª, 3ª com 4ª; sobrando = sem par.
- QUANDO `cano`: ▼ apertado com os pés centrados em cima de um cano (`pisa em`). FAÇA `iraoutro` (destino `outro` ou `proxima`): teleporta para cima do par,
  **cam encaixa**, cooldown de 0,5 s e exigir *borda* da tecla (não ficar entrando e saindo), `proxima` chama `ganhaFase()` com o mesmo caminho da bandeira.
- Sem par e regra `iraoutro/outro` = nada (fala "sem saída" no log da lupa). Tamanho: **P/M** (junto à subida, pelo uso de ▼).
Riscos: teleportar para dentro de sólido (par colocado sob teto baixo): testar `bate` na chegada e subir 1 casinha. Robô: cano de atalho fica opcional no modelo.

### 2.7 Formatos de fase (janela "Fase nova")

- `banco/formatos.js`: gerador por formato `{id, nome, mini, constroi(){ devolve fase }}` para Reta, Torre, Poço, Lago, Céu, Castelo (mapas em texto escritos à mão,
  como `FAB.MODELOS`; todos **ganháveis** pelo robô). `editor.js` só troca o corpo de `#fzNova` por `FAB.formatos.escolhe(function(f){...})`. Miniatura = `FAB.desenhaMapa`
  na janela de 6 cartões (já existe). Cada formato define `cenario`, `nada`, altura.
- Depende dos pacotes para os modelos completos: **Reta/Torre/Poço/Castelo** saem logo após S1+S2; **Lago** após S4; **Céu** após S5. Entrega incremental por formato.
- Reorganizar `GRUPOS_PECAS` para 7 grupos (Chão, Coisas, Perigos, Inimigos, Caminho, Água, Poderes): fica nesta fatia, via `FAB.pacote.grupo()`. Água sai de Perigos.
Tamanho: **M**.

### 2.8 Estante (e selo "Salvo", "Guardar com nome" no mesmo bloco)

- `E.estante` (seção 1); botão "Pôr na estante" em Mostrar cria cópia congelada (`copia(J)`) + capa; Painel lista a estante; abrir de lá = jogar, não editar
  (cópia nova se ela quiser editar). Reaproveita `tiraFoto`. Arquivos: `js/estado.js`, `js/telas.js`, estilos. Independente do motor.
Riscos: cota do localStorage (teto 12), tamanho do envio da nuvem. Tamanho: **P/M**.

## 3. Ganchos do motor (o que torna o paralelismo possível) — fatia S0a

Em `motor.js`, sem mudar nenhum comportamento antigo:

```
M.mods = []   // cada módulo: FAB.motor.mod({ nome, carrega(fase), entrada(c,h,S), pulo(c,h), pos(c,h,r), desenha(cx,cam), olha(o) })
c = { vel, grav, maxQ, pulo, naAgua, lock }   // objeto de contexto recriado a cada passo; módulos só mutam c
M.movers   = {}          // mover:'nada' etc.
M.acoes    = {}          // acoes[t](a, ctx)  <- default do switch de faz()
M.condicoes = {}         // condicoes[t](se)  <- default de condicao()
M.eventos  = (nome, ctx)  // = dispara(), exportado
M.poder, M.setaCaixa, M.encaixaCamera(), M.classesGrade = ['agua','escada']
```
`FAB.pacote({tipos, grupo, quando, se, faca, opcoes, regras, modelos, requer})` em `banco/pacotes.js` registra tudo (no estilo do `oficina.js`), então
`catalogo.js` e `blocos.js` **não são editados** pelas fatias de pacote.
`regras.js` (S0a): parâmetro-lista genérico (`FAB.OPCOES[param]`) e filtro `requer` (bloco aparece se a peça existe em alguma fase **ou** já está em uso numa
regra: nunca esconder bloco que ela usou). Fatias de pacote ficam em arquivos próprios (`js/mod_*.js`, `banco/pacote_*.js`, `banco/ingles_<pacote>.js`,
`_engenharia/frases_<pacote>.json`, `_engenharia/gate/roteiros/<modelo>.json`); `index.html` ganha **todas** as tags `<script>` (arquivos vazios) uma só vez em S0a.

## 4. Robô-jogador (`jogador_robo.py`) e o portão

Problema: hoje só "anda para a direita e pula". Torre exige subir; Lago exige nadar sem perder fôlego; poderes exigem apertar certo.
- S0b: robô passa a ler `roteiros/<modelo>.json` = `{prep_js, politica_js}`; a política roda dentro da página a cada quadro com o `olha()` ampliado e as teclas
  `dir/esq/pulo/baixo`. Os 5 roteiros atuais migram para arquivos (mesmo comportamento: `politica_js: "padrao"`). Cada fatia nova só adiciona o seu arquivo: o `.py`
  não é editado de novo.
- `olha()` ganha (via gancho `olha` dos módulos): `vy`, `alvo{dx,dy}` (bandeira ou próximo cipó/cano), `escada{dx}`, `folego`, `bolha{dx,dy}`, `pod`, `montada`.
- Políticas por formato: `sobe` (corre até a base do cipó, solta `dir`, segura ▲ até sair no topo, volta ao `dir`); `nada` (▲ segurado quando `y > alvo.y+4`, vai à bolha mais
  próxima se `folego<40%`); `duplo` (2º pulo na descida diante de buraco largo); `planar` (segura ▲ no ar com `vy>0`); `grudar` (pula contra a parede e alterna);
  montaria e cano: robô só segue em frente (o modelo põe o cavalo no caminho; o cano é atalho opcional).
- **Os modelos novos são desenhados para serem legíveis pelo robô** (um caminho só, escada 1 casinha acima da borda, bolha a cada <= 6 s de nado, tempo total < 45 s,
  que é o limite do loop do robô: 900 x 50 ms). Regra de projeto: modelo que o robô não vence não entra.
- Segunda rede, estática e barata: `valida_banco.js` ganha "alcance por BFS" na grade (pulo máx ≈ `PULO²/2G` = 60 px ≈ 3 casinhas; salto horizontal ≈ 4 casinhas;
  escada/água/cano como arestas; poderes ampliam) — acusa modelo cuja bandeira é inalcançável antes de gastar 45 s de Playwright.
- Gates novos pedidos pelo designer: "lista de FAÇA na fase reta tem o mesmo tamanho de hoje" (teste do `requer`) e "6 modelos antigos com mapa idêntico" (hash).

## 5. Ordem de construção e divisão em 2 programadores (arquivos disjuntos)

Dev1 = "mundo" (motor/editor/telas). Dev2 = "física e conteúdo" (módulos/pacotes/gate).

| Fatia | O que | Dono | Arquivos que toca (exclusivos) | Tam. | Depende de |
|---|---|---|---|---|---|
| **S0a** | Ganchos do motor; casinha de grade (água, escada); `setaCaixa`; tecla ▼ e botão ▼; HUD genérico (`extra`); `FAB.pacote`; `regras.js` param-lista + `requer`; tags `<script>` | Dev1 | `js/motor.js`, `js/telas.js` (só palco/HUD), `js/regras.js`, `index.html`, `banco/pacotes.js` (novo) | M | — |
| **S0b** | Gate: roteiros externos do robô, `valida_banco` (altura 12..48, letras únicas, hash dos antigos, BFS de alcance), sprites dos pacotes (16x16, `banco/sprites_*.js`) | Dev2 | `_engenharia/gate/*` (todos), `_engenharia/gate/roteiros/` (novo), `banco/sprites_novos.js` (novo) | M | — (paralelo a S0a) |
| **S1** | Mapa alto: `ALT`, cam.y com zona morta, desenho por linhas visíveis, `solidosEnt` e sono de inimigos, `pacoteNasce` em `poe()`; editor: rolagem vertical, ▲▼, +alto/−alto, repinte por casinha, limite de Z | Dev1 | `js/motor.js`, `js/editor.js` | G | S0a |
| **S5** | Poderes: pulo duplo, planar, grudar, pequeno real, agachar, portinha de rato, FAÇA `ligar/desligar`, `poderacaba`, `tempoder`; modelos Pena/Luva/Asinha | Dev2 | `js/mod_poderes.js`, `banco/pacote_poderes.js`, `banco/ingles_poderes.js`, `_engenharia/frases_poderes.json`, `gate/roteiros/{duplo,planar,grudar}.json` | G | S0a (API), S0b (roteiros) |
| **S2** | Escada, cipó, cano (e `iraoutro`, evento `cano`) | Dev1 | `js/mod_subida.js`, `banco/pacote_subida.js`, `banco/ingles_subida.js`, `_engenharia/frases_subida.json`, `gate/roteiros/{torre,poco}.json` | M | S0a (S1 para testar a Torre) |
| **S4** | Água viva: fôlego, bolhas, peixe/polvo/água-viva, `folego0`, `fase.nada`, pé de pato | Dev2 | `js/mod_agua.js`, `banco/pacote_agua.js`, `banco/ingles_agua.js`, `_engenharia/frases_agua.json`, `gate/roteiros/lago.json` | G | S0a, S5 (API de poderes só para o pé de pato) |
| **S3** | Formatos de fase + janela "Fase nova" + 7 grupos de peças | Dev1 | `js/editor.js` (só `#fzNova`), `banco/formatos.js` (novo), `banco/modelos_formatos.js` (novo), `banco/catalogo.js` (só `GRUPOS_PECAS`) | M | S1, S2 (Torre/Poço), S4 (Lago), S5 (Céu) — entrega parcial possível |
| **S6** | Montarias (cavalo, tartaruga, dino) | Dev2 | `js/mod_montaria.js`, `banco/pacote_montaria.js`, `banco/ingles_montaria.js`, `_engenharia/frases_montaria.json`, `gate/roteiros/montaria.json` | M | S5 (estado `pod`), S4 (tartaruga) |
| **S7** | Estante (+ selo "Salvo", "Guardar com nome" se couber) | Dev1 | `js/estado.js`, `js/telas.js` (só Mostrar/Painel), `js/ui.js`, estilos | P/M | — (pode entrar em qualquer buraco do Dev1) |
| **S8** | Fechamento: áudio (`gera_audio.py`), frases, inglês, `qa_fabrica`, subir `?v=`, publicar | quem sobrar | `gera_audio.py`, `frases.js`, `banco/audio_indice.js`, `banco/ingles*.js`, `index.html` | M | todas |

Sequência no tempo (2 pessoas): semana 1: Dev1 S0a e S1; Dev2 S0b e depois S5 (já em cima da API do S0a, que sai no meio da semana). Semana 2: Dev1 S2 e S3 parcial
(Reta/Torre/Poço/Castelo); Dev2 S4. Semana 3: Dev1 S7 e S3 completo (Lago e Céu); Dev2 S6; S8 dos dois. Conflitos que sobram e como evitar:
`motor.js` é do Dev1 o tempo todo (Dev2 só vê ganchos); `telas.js` tem dois donos em momentos diferentes (S0a: palco/HUD; S7: Mostrar/Painel) — não acontecem juntos;
`editor.js` é do Dev1 (S1 e depois S3, em trechos diferentes); `index.html` só em S0a e S8; `catalogo.js` só em S3.

## 6. Resumo dos riscos (ordem de gravidade)

1. **Robô não vence os modelos novos** -> trava a publicação. Mitigação: políticas por formato, modelos legíveis, BFS estático, roteiros externos (S0b antes de tudo).
2. **Canvas do editor gigante em mapa alto** (13 Mpx, limite iOS 4096/16 Mpx) -> editor lento ou em branco. Mitigação: limitar Z, repintar por casinha (S1).
3. **Água como entidade** -> Lago inviável (milhares de entidades x2 substeps). Mitigação: casinha de grade em S0a, com teste de equivalência nos 5 modelos.
4. **Colisão**: hitbox pequena, parede de grudar, teleporte de cano para dentro de sólido, topo do mapa. Mitigação: encaixe ao crescer, trava de controle no pulo de parede, teste de `bate` na chegada, teto invisível.
5. **Câmera**: enjoo e panorâmica longa após `volta`/cano. Mitigação: zona morta, encaixe imediato nos teleportes.
6. **Conflito de ▲** (pulo x subir) e de ▼ (agachar x cano x escada): ordem de prioridade fixa e modelos que respeitam a folga de 1 casinha.
7. **Dois programadores** em `motor.js`: só através dos ganchos; sem S0a feito ninguém começa pacote.
8. **Compatibilidade do link publicado** em build antigo em cache: subir `?v=` na primeira publicação (S8).
