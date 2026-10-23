# Fábrica de Jogos da Mariana — engenharia

**Abrir:** `coding/index.html` (duas vezes no arquivo, ou pelo site em `/coding/`).
**Fonte de verdade do desenho:** `DESIGN.md`. **Pedidos à IA:** `OFICINA.md`. **O que vem depois:** `ROADMAP.md`.

## Mapa dos arquivos

| Arquivo | O que é | Quem mexe |
|---|---|---|
| `index.html` | casca + todo o CSS | raramente |
| `js/estado.js` | memória (localStorage `fab_mariana_v1`), jogos, fotos (versões), arquivo .json, sprites→canvas, missões e nível | raramente |
| `js/motor.js` | o jogo rodando: física, inimigos, regras, Placa ?, lupa, sons sintetizados | quando entra regra/comportamento novo |
| `js/ui.js` | barra de telas, topo, janelas, medalha, ditado | raramente |
| `js/pixel.js` · `editor.js` · `regras.js` · `telas.js` | as telas | ao melhorar uma tela |
| `banco/catalogo.js` | paleta, sprites prontos, tipos de peça, cenários, jogos-modelo | ao criar modelo/peça base |
| `banco/blocos.js` | QUANDO/SE/FAÇA, opções, regras-modelo, ícones | ao criar bloco |
| `banco/missoes.js` | trilha de missões (com conferência) + cartas do saber + níveis | missão nova entra NO FIM |
| `banco/provas.js` | qual banco de prova alimenta a Placa ? | **a cada prova nova** |
| `banco/oficina.js` | peças que o robô fez a pedido dela (cresce sempre) | a cada pedido |
| `_engenharia/gate/` | `valida_banco.js`, `qa_fabrica.py` (telas × 4 tamanhos, mudo), `jogador_robo.py` (joga com teclas) | rodar antes de publicar |
| `_engenharia/entrada/` | os .json que ela exportou (dados da criança: **fora do git**) | só leitura |
| `js/voz.js` · `banco/audio_indice.js` · `audio/<voz>/` | a voz: Thalita/Antonio (pt), Ava/Brian (en), frases gravadas por `frases.js` + `gera_audio.py`; sem voz robótica | texto falado novo → regravar |
| `js/idioma.js` · `banco/ingles.js` · `banco/ingles_dic.js` | a Fábrica em inglês (tradutor da tela + dicionário) | texto novo → entrada no dicionário |
| `js/jeito.js` | tela Opções (engrenagem): idioma, voz, cores, tamanho, barras, tela grande, do que é feita | ao criar preferência |
| `_engenharia/gate/seguranca.js` · `teste_ingles.py` | trava de rede (CSP, sem endereço de fora) · nada em português no modo inglês | rodar antes de publicar |

## Trocar a prova (quando o Paulo mandar a próxima matéria)
1. A matéria nova já tem `ferramentas/<MAT>_banco.js` com `window.<MAT>.ITENS` no formato
   `{id, p, o:[certa, errada, errada], c:0, dica, ex, tema}` (é o padrão do projeto).
2. Em `banco/provas.js`: `atual: '<MAT>'` e a linha da matéria em `lista`.
3. `node coding/_engenharia/gate/valida_banco.js` → abre a Fábrica → Regras → Ajustes mostra
   "Prova de agora: <nome> (N perguntas)".
Pergunta só entra pelo banco da matéria — que já passou pelo `avaliador-questoes` e pelo portão do projeto.

## Princípios (não mudam)
- Ela constrói; o robô faz peças. Nada trava; missão sugere.
- Uma frase por instrução, sempre com o botão de ouvir. Detalhe só atrás de clique.
- Toda mudança passa pelos três portões, mudos.
- Dado dela (o .json) nunca vai para o git.
