# Aderência aplicada (02/11) — 18 REPROVA de aderencia_produtos_resultado.json + ordens do dono

## ferramentas/CIE3_estudo_licoes.js
- :97 (L2-testPT) PT "Tem uma raquete ___ a mochila." (ao lado de) → "Tem uma raquete ___ mochila." (ao lado da); "Tem um quadro ___ a parede." → "Tem um quadro ___ parede." (na)
- :137 (L5-nomept) nome_pt "Vento e água: úteis e perigosos" → "Vento e água: úteis e prejudiciais"
- :149-151 (L5-video) fala/caixas sem "moves sand and makes dunes", "Rivers flow downhill", "wears rock away"; Water: "makes energy, carries boats and waters the fields" → "Water makes energy, carries boats and waters the plants" (+PT "A água faz energia, leva barcos e rega as plantas.")
- :196 / :200 (L8-falas) tirado "They move away from me." / "They move closer to me." do fim das falas Push/Pull
- :204-205 (L8-forca) "Force makes things move from one place to another." / "A força faz..." → "A push or a pull can make things move from one place to another." / "Empurrar ou puxar pode fazer as coisas irem de um lugar para outro." (push/pull em `<b>`)
- :204/:207 (L8-piano) EXCLUÍDO "playing the piano"/"tocar piano" da fala e da caixa Push
- :204/:208 (L8-pipa) "holding the rope of a kite"/"segurar a linha da pipa" → "pulling the rope of a kite"/"puxar a linha da pipa"
- :121 (ordem: lacuna/oclusão só em termo de conteúdo) `<b>where</b>` → `<b>perspective</b>` ("our perspective changes depending on where...")
- :133 On the test: "Our perspective changes depending on ___ we are looking from." (where) → "Our ___ changes depending on where we are looking from." (perspective). Demais lacunas dos On the test conferidas: preposições na unidade Position (conteúdo), path, bottom, view, natural, bounce, fast, away, closer — todas termo de conteúdo.
- :131-132 (ordem girafa) tela "A different view": antes da frase, "The giraffe and the woman look at the painting from different positions." / "A girafa e a mulher olham o quadro de posições diferentes." (fala e R, com fig view-giraffe)
- :133 On the test: "Complete: People are not right or wrong. They just have a different ___ of things." → fig view-giraffe + "The giraffe and the woman look at the painting from different positions. Complete: ... different ___ of things." (view); PT idem

## ferramentas/CIE3_pocket.html (mede_pocket VERDE, 1-2% vazio, sem transbordo; 0 "___")
- :135 (PK-piano) "trolley · volleyball · piano · golf" → "trolley · volleyball · golf"
- :144 (PK-forca) "Force makes things move from one place to another. The 2 forces are push and pull." → "A push or a pull can make things move. Push and pull are two types of force." + PT
- :155 (PK-video) "Moves sand (dunes), sails boats. Water flows downhill, wears rock (canyons), gives energy and carries boats." → "It sails boats and turns turbines. Water gives energy, carries boats and waters plants." + PT
- :126/141/156/169 (ordem: pocket sem exercício) 4 quadros "On the test" → "Remember", afirmativos:
  - 3: "To ___ means to turn around... → spin · Match..." → "To spin means to turn around and around. A wheel rolls, a kite flies, a door swings."
  - 4: "A push moves something away ___ me. A pull ... closer ___ me." → "Push: I move something AWAY from me. Pull: I move something CLOSER to me."
  - 5: "Helpful or harmful? · Wind or water? (...)" → "Tsunami and floods: water, harmful. Tornado: wind, harmful. Wind and water are two natural forces."
  - 6: "Picture: seen from...? · Make a list... · How does a fish move?" → "The same thing looks different from the top, bottom, front or side. A fish swims."
- :175 rodapé "Check yourself" (6 perguntas com ___ + respostas invertidas) → "Quick review" com as 6 afirmações (A top spins; Opening a drawer is a pull; A tornado is harmful; The ball is under the table; The Auditorium is between A and B sections; The Eiffel Tower from below: seen from the bottom)
- :164 (ordem girafa) citação ganhou o contexto "The giraffe and the woman look at the painting from different positions." + PT; sem figura (não cabe)

## Jogo — fonte trabalho/3tri_ciencias/gen/t_motor.py, regenerado por fork_jogo.py (arteA/B/C intocados)
- :11/:13 (JF-resumo4-5) resumo_pt "ajuda ou atrapalha?" → "ajuda ou prejudica?" (Água / Vento)
- :24 FINS 4/5 (JF-fim4-5) "pode atrapalhar!" → "pode prejudicar!"
- :24 FINS 7 (JF-fim7) "Every animal moves in its own way!"/"Cada bicho se move do seu jeito!" → "Animals move in different ways!"/"Os bichos se movem de jeitos diferentes!"
- :10/:12 ids das fases forces acompanharam o banco atual (n23, n25 sumiram; n03 entrou): Wild River += n03 − n25; Windy Fields − n23 (portão "partilha das forces" estava FALHA)

## trabalho/3tri_ciencias/_roteiro.md
- :33 (R-N4-N8) N5 dunes/arches e N6 rivers downhill/canyons/rain carries soil → "N5/N6: curiosidade de V3, NÃO ensinar nem cobrar."
- :47 (R-M3) "(só exemplos sem ambiguidade) ... a snake crawls/slides" → "(sem slide) ... a snake crawls on the ground. Nunca pôr crawl e slide como opções juntas."
- :52 (R-F5/F6/F7) "Force makes things move..." → "A push or a pull can make things move...; os dois tipos de força do vídeo são push e pull"; F6 sem "playing the piano"; F7 "holding" → "pulling the rope of a kite"

## Banco (só reportado, não editado)
- T5_T7.json:2010-2023 questão "Playing the piano. Is it a push or a pull?" (+ explicação "In our video, playing the piano is a push"); :2128/2133, :2177/2182 "playing the piano" como alternativa; :2188 "The fingers press the piano keys away from the hand"
- T5_T7.json:1158 "A snake slides on the ground." (choca com R-M3)
- T3_T4.json:853, 973, 984, 1021, 1032, 1042, 1046, 1056, 1070, 1151 dunes/arches/downhill/valleys/canyons/"wears rock" (N5/N6 fora do assunto)
- T8_auditoria.json:13 "to make dunes"
