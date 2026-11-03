# -*- coding: utf-8 -*-
"""Frases do video CIE3 (Science Y2, 3o tri, AF 04/11) — refeito em 03/11/2026.

Fonte: os 8 slides da escola (fontes/3tri/CIE/zip/p01..p08.jpeg) e o texto ja auditado de
ferramentas/CIE3_estudo_licoes.js e ferramentas/CIE3_pocket.html. O _roteiro.md NAO e fonte.
Regras do dono: so o que e verdadeiro e coerente com o material; objetivo (sem personagem,
sem curiosidade, sem pegadinha); figura real do slide e a frase dele.
Proibido: "water is always moving", piano, rope of a kite, dunas/canions/erosao,
"the 2 forces are push and pull", "force makes things move" absoluto,
"every animal moves in its own way".

Cada frase = (legenda, texto_tts, traducao_pt, figura).
- legenda: o que aparece na tela (em ingles);
- texto_tts: o que a voz le (so muda quando ajuda a pronuncia: virgula de respiro);
- traducao_pt: legenda em portugues (arquivo .vtt, atras da bandeira);
- figura: {kw, cor, imgs:[{n, crop, label, w}], rings:[{x,y,r,label}], words:[...]}.
  n = recorte de media/cie3 (n='orig/mapa' = slide inteiro). rings em coordenadas da imagem.
Animals nao tem slide: so palavras (texto auditado do CIE3_estudo_licoes.js).
"""

TITULO = "Science: Position and Motion"
CAPA = ["prep-between", "map-school", "obj-spin-top", "push-box"]


def fig(*nomes, kw=None, cor=None, rings=None, crop=None):
    imgs = [{"n": n} if isinstance(n, str) else {"n": n[0], "label": n[1], "w": n[2] if len(n) > 2 else None} for n in nomes]
    if crop:
        imgs[0]["crop"] = crop
    return {"kw": kw, "cor": cor, "imgs": imgs, "rings": rings or []}


def words(*ws, kw=None, cor=None):
    return {"kw": kw, "cor": cor, "imgs": [], "rings": [], "words": list(ws)}


def prep(nome, kw, frase, pt, tts=None):
    return (frase, tts or frase, pt, fig("prep-" + nome, kw=kw, cor="#f472b6"))


def sala(frase, pt, x, y, r, tts=None):
    return (frase, tts or frase, pt, fig("room", rings=[{"x": x, "y": y, "r": r}], cor="#f472b6"))


MAPA_CROP = [40, 290, 800, 430]


def escola(frase, tts, pt, rings, kw=None):
    return (frase, tts, pt, fig("map-school", kw=kw, cor="#fb7185", rings=rings, crop=MAPA_CROP))


def torre(lado, pt):
    f = f"The Eiffel Tower seen from the {lado}."
    return (f, f, pt, fig("view-" + lado, kw=lado, cor="#fbbf24"))


def forca(n, kw, cor, frase, pt, tts=None):
    return (frase, tts or frase, pt, fig(n, kw=kw, cor=cor))


AJUDA, DANO = "#22c55e", "#ef4444"


def mov(verbo, cor, defin, def_pt, ex, ex_tts, ex_pt, itens):
    nomes = [(f"obj-{verbo}-{a}", b, c) for a, b, c in itens]
    return [
        (defin, defin, def_pt, fig(*[(n, b) for n, b, _ in nomes], kw=verbo, cor=cor)),
        (ex, ex_tts, ex_pt, fig(*nomes, kw=verbo, cor=cor)),
    ]


def forca_mao(kw, nome, frase, pt):
    return (frase, frase, pt, fig(nome, kw=kw, cor="#f97316"))


BODY = [0, 0, 700, 232]

CENAS = [
  ("open", "Position and motion", [
    ("This video is about position and motion.", "This video is about position, and motion.",
     "Este vídeo é sobre posição e movimento.", fig("prep-between", "map-school", "obj-spin-top", "push-box")),
    ("Position: where things are. Motion: how things move.", "Position: where things are. Motion: how things move.",
     "Posição: onde as coisas estão. Movimento: como as coisas se movem.", fig("prep-between", "map-school", "obj-spin-top", "push-box")),
  ]),
  ("position", "Position", [
    prep("in", "in", "The teddy bear is in the box.", "O ursinho está dentro da caixa."),
    prep("on", "on", "The apple is on the book.", "A maçã está sobre o livro."),
    prep("under", "under", "The ball is under the table.", "A bola está embaixo da mesa."),
    prep("behind", "behind", "The boy is behind the tree.", "O menino está atrás da árvore."),
    prep("in-front-of", "in front of", "The dog is in front of the chair.", "O cachorro está na frente da cadeira."),
    prep("between", "between", "The teddy bear is between the two plants.", "O ursinho está entre as duas plantas."),
    prep("next-to", "next to", "The clock is next to the lamp.", "O relógio está ao lado do abajur."),
    prep("near", "near", "The tree is near the house.", "A árvore está perto da casa."),
    prep("far-from", "far from", "The tree is far from the house.", "A árvore está longe da casa."),
    prep("above", "above", "The lamp is above the table.", "A luminária está acima da mesa."),
    prep("below", "below", "The cat is below the shelf.", "O gato está abaixo da prateleira."),
    prep("inside", "inside", "The fish is inside the bowl of water.", "O peixe está dentro do aquário, na água."),  # so "bowl" no fim sai "ball" (ASR)
  ]),
  ("room", "In the room", [
    sala("There is some pizza in the box.", "Tem pizza dentro da caixa.", 318, 300, 50, tts="There is some pizza, in the box."),
    sala("There is a guitar between the lamp and the plant.", "Tem um violão entre o abajur e a planta.", 120, 235, 72),
    sala("There are two dogs under the table.", "Tem dois cachorros embaixo da mesa.", 385, 378, 62),
    sala("There is a window behind the sofa.", "Tem uma janela atrás do sofá.", 350, 95, 95),
    sala("There is a racket next to the bag.", "Tem uma raquete ao lado da mochila.", 675, 385, 78),
    sala("There is some cheese on the plate.", "Tem queijo sobre o prato.", 388, 308, 38),
    sala("There is a rug in front of the sofa.", "Tem um tapete na frente do sofá.", 540, 395, 52),
    sala("There is a lamp under the shelf.", "Tem um abajur embaixo da prateleira.", 180, 160, 62),
    sala("There is a trophy between the books.", "Tem um troféu entre os livros.", 110, 55, 42),
    sala("There is a picture on the wall.", "Tem um quadro na parede.", 578, 65, 72),
    sala("There is a bird flying over the trees.", "Tem um pássaro voando por cima das árvores.", 320, 97, 40),
    sala("There are two fish in the bowl.", "Tem dois peixes no aquário.", 535, 165, 48),
  ]),
  ("maps", "Maps", [
    ("When we read maps, we need to pay a lot of attention in the details",
     "When we read maps, we need to pay a lot of attention in the details,",
     "Quando lemos mapas, precisamos prestar muita atenção nos detalhes", fig("orig/mapa", kw="pay attention", cor="#fb7185")),
    ("and in the path (way) that we are going.", "and in the path, or way, that we are going.",
     "e no caminho que estamos seguindo.", fig("orig/mapa", kw="path", cor="#fb7185", crop=[10, 560, 575, 330])),
    ("We might get lost if we run or don't pay attention!", "We might get lost if we run, or don't pay attention!",
     "Podemos nos perder se corrermos ou não prestarmos atenção!", fig("orig/mapa", kw="lost", cor="#fb7185", crop=[605, 305, 360, 480])),
    escola("This is the map of the school. The red pin marks a place on the map.",
           "This is the map of the school. The red pin marks a place on the map.",
           "Este é o mapa da escola. O pino vermelho marca um lugar no mapa.", [{"x": 683, "y": 345, "r": 50}], kw="red pin"),
    escola("A section is on the left of the Auditorium.", 'The "A" section is on the left of the Auditorium.',
           "A seção A fica à esquerda do auditório.", [{"x": 235, "y": 470, "r": 95, "label": "left"}], kw="left"),
    escola("B section is on the right of the Auditorium.", "The B section is on the right of the Auditorium.",
           "A seção B fica à direita do auditório.", [{"x": 640, "y": 470, "r": 95, "label": "right"}], kw="right"),
    escola("The Auditorium is between A section and B section.", "The Auditorium is between A section, and B section.",
           "O auditório fica entre a seção A e a seção B.", [{"x": 445, "y": 505, "r": 95}], kw="between"),
  ]),
  ("persp", "Changing perspective", [
    ("We can see many things from different positions,", "We can see many things from different positions,",
     "Podemos ver muitas coisas de posições diferentes,", fig("view-front", "view-top", "view-side", "view-bottom", kw="different positions", cor="#fbbf24")),
    ("and our perspective changes depending on where we are looking from.", "and our perspective changes, depending on where we are looking from.",
     "e nossa perspectiva muda dependendo de onde estamos olhando.", fig("view-shadow", kw="where", cor="#fbbf24")),
    torre("front", "A Torre Eiffel vista de frente."),
    torre("top", "A Torre Eiffel vista de cima."),
    torre("side", "A Torre Eiffel vista de lado."),
    torre("bottom", "A Torre Eiffel vista de baixo."),
    ("The same tower. A different view.", "The same tower. A different view.",
     "A mesma torre. Uma vista diferente.", fig("view-front", "view-top", "view-side", "view-bottom", kw="same tower", cor="#fbbf24")),
    ("The giraffe and the woman look at the painting from different positions.",
     "The giraffe and the woman look at the painting from different positions.",
     "A girafa e a mulher olham o quadro de posições diferentes.", fig("view-giraffe", kw="different positions", cor="#fbbf24")),
    ("People are not right or wrong. They just have a different view of things.",
     "People are not right or wrong. They just have a different view of things.",
     "As pessoas não estão certas nem erradas. Só têm uma visão diferente das coisas.", fig("view-giraffe", kw="view", cor="#fbbf24")),
  ]),
  ("forces", "Wind and water", [
    ("Wind and water are two natural forces that exist in nature, and they can be harmful and helpful to us.",
     "Wind and water are two natural forces that exist in nature, and they can be harmful and helpful to us.",
     "O vento e a água são duas forças naturais que existem na natureza, e podem ser prejudiciais e úteis para nós.",
     fig("orig/agua-vento", kw="natural forces", cor="#38bdf8")),
    forca("help-water-plants", "helpful · water", AJUDA, "Helpful: water the plants.", "Útil: regar as plantas."),
    forca("help-water-energy", "helpful · water", AJUDA, "Helpful: water to make energy.", "Útil: água para fazer energia."),
    forca("help-wind-energy", "helpful · wind", AJUDA, "Helpful: wind to make energy.", "Útil: vento para fazer energia.", tts="Helpful: wind, to make energy."),
    forca("help-wind-seeds", "helpful · wind", AJUDA, "Helpful: wind that spreads the seeds.", "Útil: vento que espalha as sementes."),
    forca("harm-tsunami", "harmful · water", DANO, "Harmful: a tsunami.", "Prejudicial: um tsunami."),
    forca("harm-floods", "harmful · water", DANO, "Harmful: heavy rain and floods.", "Prejudicial: chuva forte e enchentes."),
    forca("harm-tornado", "harmful · wind", DANO, "Harmful: a tornado.", "Prejudicial: um tornado."),
    forca("harm-winds", "harmful · wind", DANO, "Harmful: strong winds.", "Prejudicial: ventos fortes.", tts="Harmful: strong winds."),
  ]),
  ("moves", "Movement of objects", [
    *mov("bounce", "#eab308", "To bounce means to go up and down after hitting a surface.",
         "Quicar é subir e descer depois de bater numa superfície.",
         "Bounce: a soccer ball, a tennis ball and a basketball.", "Bounce: a soccer ball, a tennis ball, and a basketball.",
         "Quicar: uma bola de futebol, uma bola de tênis e uma bola de basquete.",
         [("soccer-ball", "soccer ball", "soccer"), ("tennis-ball", "tennis ball", "tennis"), ("basketball", "basketball", "basketball")]),
    *mov("fly", "#0ea5e9", "To fly means to move through the air.", "Voar é se mover pelo ar.",
         "Fly: an airplane, a hot air balloon and a kite.", "Fly: an airplane, a hot air balloon, and a kite.",
         "Voar: um avião, um balão de ar quente e uma pipa.",
         [("airplane", "airplane", "airplane"), ("balloon", "hot air balloon", "hot"), ("kite", "kite", "kite")]),
    *mov("roll", "#ec4899", "To roll means to move by turning over and over.", "Rolar é se mover virando e virando.",
         "Roll: a wheel, a can and a beach ball.", "Roll: a wheel, a can, and a beach ball.",
         "Rolar: uma roda, uma lata e uma bola de praia.",
         [("wheel", "wheel", "wheel"), ("can", "can", "can"), ("beach-ball", "beach ball", "beach")]),
    *mov("slide", "#8b5cf6", "To slide means to move smoothly along a surface.", "Deslizar é se mover suavemente sobre uma superfície.",
         "Slide: a slide, an ice cube and a book.", "Slide: a slide, an ice cube, and a book.",
         "Deslizar: um escorregador, um cubo de gelo e um livro.",
         [("slide", "slide", "slide"), ("ice-cube", "ice cube", "ice"), ("book", "book", "book")]),
    *mov("spin", "#f97316", "To spin means to turn around and around.", "Girar é dar voltas e voltas.",
         "Spin: a pinwheel, a fan and a top.", "Spin: a pinwheel, a fan, and a top.",
         "Girar: um cata-vento, um ventilador e um pião.",
         [("pinwheel", "pinwheel", "pinwheel"), ("fan", "fan", "fan"), ("top", "top", "top")]),
    *mov("swing", "#22c55e", "To swing means to move back and forth like a pendulum.", "Balançar é ir e voltar como um pêndulo.",
         "Swing: a swing, a hanging plant and a door.", "Swing: a swing, a hanging plant, and a door.",
         "Balançar: um balanço, uma planta pendurada e uma porta.",
         [("swing", "swing", "swing"), ("plant", "hanging plant", "hanging"), ("door", "door", "door")]),
  ]),
  ("dirs", "Directions and speed", [
    ("Things move in different directions: back and forth, up and down, round and round.",
     "Things move in different directions: back and forth, up and down, round and round.",
     "As coisas se movem em direções diferentes: para a frente e para trás, para cima e para baixo, em voltas.",
     fig(("obj-swing-swing", "back and forth", "back"), ("obj-bounce-basketball", "up and down", "up"), ("obj-spin-top", "round and round", "round"), kw="directions", cor="#a78bfa")),
    ("Things move at different speeds: slow or fast.", "Things move at different speeds: slow, or fast.",
     "As coisas se movem em velocidades diferentes: devagar ou rápido.", words("slow", "fast", kw="speed", cor="#a78bfa")),
  ]),
  ("body", "Body, hand and animals", [
    ("Movements you can do with your body: swim, climb, play, pick, walk, sit.",
     "Movements you can do with your body: swim, climb, play, pick, walk, sit.",
     "Movimentos que você faz com o corpo: nadar, escalar, brincar, pegar, andar, sentar.", fig("orig/corpo-mao", kw="body", cor="#34d399", crop=BODY)),
    ("Movements you can do with your hand: touch, lift, point, write, grab, push.",
     "Movements you can do with your hand: touch, lift, point, write, grab, push.",
     "Movimentos que você faz com a mão: tocar, levantar, apontar, escrever, agarrar, empurrar.", fig("orig/corpo-mao", kw="hand", cor="#34d399")),
    ("A fish swims.", "A fish swims.", "O peixe nada.", words("fish", "swims", kw="animals", cor="#34d399")),
    ("A bird flies.", "A bird flies.", "O pássaro voa.", words("bird", "flies", kw="animals", cor="#34d399")),
    ("A monkey climbs.", "A monkey climbs.", "O macaco escala.", words("monkey", "climbs", kw="animals", cor="#34d399")),
    ("A dog walks and runs.", "A dog walks and runs.", "O cachorro anda e corre.", words("dog", "walks and runs", kw="animals", cor="#34d399")),
    ("A kangaroo and a frog jump.", "A kangaroo and a frog jump.", "O canguru e o sapo pulam.", words("kangaroo and frog", "jump", kw="animals", cor="#34d399")),
    ("A snake crawls on the ground.", "A snake crawls on the ground.", "A cobra rasteja no chão.", words("snake", "crawls", kw="animals", cor="#34d399")),
  ]),
  ("push", "Push and pull", [
    ("A push is when I use a force to move something away from me.", "A push is when I use a force to move something away from me.",
     "Empurrar é quando uso uma força para mover algo para longe de mim.",
     fig("push-bike", "push-box", "push-door", "push-ball", kw="push", cor="#f97316")),
    forca_mao("push", "push-bike", "Push: riding a bike.", "Empurrar: andar de bicicleta."),
    forca_mao("push", "push-box", "Push: pushing a box.", "Empurrar: empurrar uma caixa."),
    forca_mao("push", "push-door", "Push: pushing a door.", "Empurrar: empurrar uma porta."),
    forca_mao("push", "push-ball", "Push: kicking a ball.", "Empurrar: chutar uma bola."),
    ("A pull is when I use a force to move something closer to me.", "A pull is when I use a force to move something closer to me.",
     "Puxar é quando uso uma força para trazer algo para perto de mim.",
     fig("pull-rope", "pull-wagon", "pull-drawer", "pull-fish", kw="pull", cor="#f97316")),
    forca_mao("pull", "pull-rope", "Pull: tug of war with a rope.", "Puxar: cabo de guerra com uma corda."),
    forca_mao("pull", "pull-wagon", "Pull: pulling a wagon.", "Puxar: puxar um carrinho."),
    forca_mao("pull", "pull-drawer", "Pull: opening a drawer.", "Puxar: abrir uma gaveta."),
    forca_mao("pull", "pull-fish", "Pull: fishing with a rod.", "Puxar: pescar com uma vara."),
  ]),
  ("end", "Review", [
    ("We saw position, maps, perspective, wind and water, movement, push and pull.",
     "We saw position, maps, perspective, wind and water, movement, push, and pull.",
     "Vimos posição, mapas, perspectiva, vento e água, movimento, empurrar e puxar.",
     fig("prep-between", "map-school", "help-wind-seeds", "push-box")),
  ]),
]

NOME_PT = {
    "open": "Posição e movimento", "position": "Posição", "room": "Na sala", "maps": "Mapas",
    "persp": "Mudando a perspectiva", "forces": "Vento e água", "moves": "Movimento dos objetos",
    "dirs": "Direções e velocidade", "body": "Corpo, mão e animais", "push": "Empurrar e puxar", "end": "Revisão",
}
