# Síntese do painel (23/10/2026) — o que entra na v3

Fontes: 1_designer.md (Fable), 2_pedagoga.md, 3_navegacao.md, 4_engenharia.md. Pedido do pai:
fases que sobem, descem, aquáticas, poderes e montarias; e FÁCIL — comece por aqui, caminho
sugerido em cada tela, salvar e saber de onde parou, guardar fases para continuar ou publicar.

## Decisões
1. **Navegação vem primeiro** (navegação + pedagoga): sem ela, mecânica nova só aumenta a confusão.
2. **Regra da pedagoga vira portão:** peça ou poder novo só entra com missão que obrigue a MEXER
   numa regra, com voz gravada e com tradução. Bloco só aparece na escolha quando a peça dele existe
   no jogo (filtro), para a fase reta continuar simples.
3. **Pacotes nascem com a regra aberta** (engenharia corrige o designer): a peça no mapa traz
   1–3 regras-modelo visíveis que ela troca; a física fica no motor.
4. **Montaria: uma só na v3** (pedagoga vetou três; o pai pediu "tipo Yoshi, cavalos"): o Cavalo
   de montar — tocar inimigo montada faz descer do cavalo em vez de perder vida (lógica SÓ SE).
5. **Corta/adia:** tela nova "Caminho" com ilhas (fica a faixa de 5 passos), carimbos adoro/chato,
   estante como tela própria (vira "Guardar este jogo" com nome), Céu/Caverna como formatos,
   Tartaruga/Dino/Asinha, alavanca, chefão, plataforma móvel → v4.
6. **Nuvem da família** já entrou na v2 (NUVEM.md); publicar continua sendo o link.

## v3 em duas frentes paralelas (arquivos separados)

### Frente A — Navegação (js/telas.js, js/ui.js, js/estado.js, index.html)
- Início = uma pergunta: botão grande "Continuar de onde parei" + "Você parou em: Fases, Fase 2
  do jogo X" (lido em voz); missão atual em segundo plano; jogos embaixo.
- Faixa de 5 passos (Desenhar, Fases, Regras, Testar, Mostrar) e trilho fixo em toda tela:
  "◀ anterior · Próximo passo ▶" + contador vivo da missão. Continua visível com as barras recolhidas.
- Seta guia amarela que quica sobre o lugar exato de clicar da missão atual (uma por vez).
- Selo "Salvo / Salvando… / Não salvou" no topo (e "Na nuvem" quando ligada).
- Missões em "Agora" (a atual + 2) e "Depois" (dobradas).
- "Guardar este jogo" com nome (foto nomeada) e lista dos guardados no Início.
- Fim do teste: "Queria que tivesse…" com 6 figuras (1 toque) → vai no .json para o robô/mentor;
  cartão "Você pediu, o robô fez" quando o pedido virar peça.

### Frente B — Mundo (js/motor.js, js/editor.js, js/regras.js [só o filtro], banco/*, gate/)
- Mapa alto (12 a 48 linhas) com câmera vertical; mapas antigos de 12 linhas idênticos.
- Fase nova por formato, 3 cliques, com miniatura: Reta, Torre (sobe), Poço (desce), Lago (água).
- Cipó/escada + tecla ▼ (descer); Lago com fôlego longo, bolha que enche, peixe que nada.
- Poderes como pacote: Pena (pulo duplo), Luva (gruda na parede e pula dela), Pequeno de verdade
  (passa no túnel baixo). Montaria: Cavalo. Cano/porta-cano em par (vai para outro lugar).
- Blocos novos só com a peça presente; missões novas no fim, cada uma obrigando a mudar regra.
- Modelos jogáveis e ganháveis pelo robô-jogador (que aprende a subir, descer, nadar).
