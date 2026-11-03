# Crítica do jogo CIE3 (03/11) — por que ficou abaixo de HIS3/ING3 e o plano de refeitura

Paulo: "fases péssimas, nenhuma ideia aceitável [...] avalie se há como corrigir pra ficar um jogo bom no nível dos anteriores". Capturas: scratchpad `critica/` (HIS3_*, ING3_*, CIE3_*).

## Causas (medidas)
1. **Mapas pobres:** `gen_mapas_cie3.py` descartou de propósito os mapas v2 aprovados ("Mapas NOVOS, nada recopiado"). CIE3 fase 1 = 2 buracos + 5 inimigos + 1 rolante; HIS3 fase 4 = 7 buracos, 7 inimigos, 5 que caem, 5 cipós, 8 muros `%`. Meta v2: ≥18 obstáculos no reino 1, ≥22 do 2 em diante, ≥4 tipos de perigo, 1 submundo (GAME_DESIGN_v2.md:48). Nenhum mapa CIE3 tem `W ^ % v B H l L t u X`, canos `1/2` nem submundo (`OUT` nunca grava `sub`).
2. **Poderes não mudam o jogo:** bola repetida nas fases 1 e 8; "corda" = pulo duplo renomeado; fase 6 sem poder. PREPROMPTS.md proíbe poder genérico repetido.
3. **Mecânicas rasas:** escorregador = esteira plana roxa solta no ar; giro aparece 1 vez; vento empurra 48 px/s (não se sente); sem voo.
4. **Cenário-colagem:** móveis e slide são papel de parede; o que se pisa é barra genérica. Em HIS3/ING3 o objeto do cenário É a peça de jogo (cipó, gancho = argola, andaime = plataforma).
5. **Leitura ruim:** plataforma no mesmo tom do fundo (quarto marrom sobre marrom; escola cinza sobre cinza); inimigos somem no cenário.
6. **Selo "In development"** sobre todas as telas (já movido para o canto).

## Plano mínimo (aprovar na prática por resultado)
1. Mapas = grades aprovadas do ING3/HIS3, só reposicionando portas/estrelas/moedas e mantendo `sub`: sala←ING1, escola←ING2, torre←HIS2 (vertical), rio←ING4 (nado), campo←ING5 (voo, `Z`, `~`), parque←ING6 (trave, argolas, ritmo, salto = brinquedos), estádio←ING7, rally = corrida, Twister = chefão.
2. Pele do material nas peças que já existem: sofá/prateleira = blocos e `=`, escorregador = rampa real, balanço = argola, turbina/pipa = voo.
3. Um poder por fase que mude o jogo, tirado do material, nunca repetido.
4. Paleta: chão/plataforma saturados com topo claro; fundo mais escuro/frio; inimigo em cor oposta.
5. Portão: verifica com as métricas v2 (contagem e tipos de obstáculo, submundo por fase) além de completabilidade.
