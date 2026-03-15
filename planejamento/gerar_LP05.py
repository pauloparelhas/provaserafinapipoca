import json

WORD_BANK = {
    'A': ['abacate','abacaxi','abelha','abraço','açúcar','agulha','alegria','alface','alto',
          'aluno','amigo','amor','anel','anjo','arara','arco','areia','arroz','asas','avião','azul'],
    'B': ['bala','balão','bambolê','banana','barco','batata','bicho','boca','bola','bolo',
          'borboleta','borracha','bota','branco','brinco','brinquedo','bruxa','bule','buzina',
          'baleia','bambu','blusa','boneca','bolacha','botão','berço','bicicleta','beijo'],
    'C': ['cabelo','cachorro','caju','cama','camelo','campo','caneca','caneta','cara','carrinho',
          'casa','casaco','cavalo','cebola','cenoura','cereja','céu','chave','chuva','cobra',
          'coco','coelho','cor','cravo','calça','canguru','castanha','chapéu','circo','coruja',
          'cozinha','criança','canário','caracol','castelo'],
    'D': ['dado','dança','dedo','dinossauro','doce','dragão','duende','duna','dúvida','dama',
          'dente','dedal','desejo','disco','drama','duelo','damasco','delícia'],
    'E': ['escola','elefante','erva','espelho','espiga','estrela','escova','esquilo','escada',
          'ema','evento','ervilha','espada','espuma','estrada','égua'],
    'F': ['faca','feijão','festa','flor','floresta','fogão','folha','formiga','fruta','futebol',
          'fada','foca','figo','fita','forno','faixa','feliz','ferro','filho','foguete',
          'fonte','flauta','farinha','família','fivela'],
    'G': ['gato','gibi','girafa','giz','globo','golfinho','goiaba','gorila','gravata','grilo',
          'guarda','galho','ganso','garfo','gelo','gente','goma','grama','gruta',
          'galinha','gado','guitarra','girassol'],
    'H': ['herói','hipopótamo','hortelã','hora','hotel','haste','helicóptero','hibisco','homem'],
    'I': ['iguana','ilha','inhame','íris','ideia','imagem','inverno','inseto','isca','índio','irmão'],
    'J': ['jaca','jaguar','janela','jipe','joelho','jogo','jornal','jabuti','jacaré',
          'jato','jantar','jardim','joia','judoca'],
    'K': ['kiwi','koala','karatê','kit'],
    'L': ['lagarto','lagoa','laranja','leão','leme','limão','livro','lobo','lua','lula',
          'lata','lima','lona','laço','lápis','letra','leite','linho','lixo','lousa','lagarta'],
    'M': ['macaco','maçã','mala','mamão','manga','mapa','mar','massa','mel','minhoca',
          'mochila','morango','mosca','música','mato','meia','mesa','milho','molho',
          'mulher','mula','mundo','morcego','montanha','máquina','melão','marmelo'],
    'N': ['navio','nectarina','ninho','nó','nuvem','nabo','nave','neta','noite','nome',
          'nota','nariz','neve','nata','natural','nuca'],
    'O': ['oito','óculos','onça','orca','orelha','osso','ouro','ovo','ovelha','olho',
          'obra','óleo','ordem','onda','ogro','oliveira','objeto'],
    'P': ['panda','papagaio','pato','pedra','peixe','peru','pipa','piranha','pizza','planta',
          'polvo','pomba','pote','pijama','pêra','palha','panela','papel','parque',
          'pé','pena','picolé','piloto','pinto','piso','porta','palmeira'],
    'Q': ['quadro','quati','queijo','quiabo','quintal','queda','quilo','quase','quina','queimada'],
    'R': ['raio','rato','régua','relógio','rio','rocha','rosa','rua','rabo','rede',
          'rena','raiz','ramo','ralo','raposa','rei','remo','roupa','rolo','rapaz','raquete','riacho'],
    'S': ['sapo','semente','sino','sol','sorvete','saco','sala','sopa','suco',
          'sabão','saúde','sela','seta','sola','sorte','sapato','sardinha','salmão','selva'],
    'T': ['tartaruga','tesoura','tigre','tomate','trem','tubarão','tucano','taco','tema','tia',
          'teia','tempo','terra','toco','toque','tosse','tulipa','túnel','torta','toalha','tinta'],
    'U': ['uva','urso','uniforme','uivo','umbigo','útil','urna','usado'],
    'V': ['vaca','vagem','vaso','ventilador','vidro','viola','vela','vento','vale','vapor',
          'veia','verde','vez','vida','viagem','voo','volta','vulcão','vovó','valsa','vitória'],
    'W': ['waffle','wombat'],
    'X': ['xadrez','xarope','xícara','xampu','xerife','xale','xô'],
    'Y': ['iogurte','yoga'],
    'Z': ['zebra','zero','zíper','zoológico','zangão','zabumba'],
}

MESSAGES = [
    "Uau! Você arrasou! Aprender é a melhor aventura! 🌟",
    "Incrível! Seu cérebro está brilhando de talento! ✨",
    "Parabéns! Você é um(a) craque em ordem alfabética! 🏆",
    "Fantástico! Brincando e aprendendo ao mesmo tempo! 🎉",
    "Que demais! Cada letra no lugarzinho certinho! 🌈",
    "Você é incrível! Aprender é divertido, não é? 🚀",
    "Sensacional! Serafina ficaria muito orgulhosa! 🌺",
    "Mandou bem! O conhecimento é o melhor superpoder! ⭐",
    "Top! Cada jogo te deixa mais inteligente! 💫",
    "Excelente! Você provou que aprender é uma aventura! 🎊",
    "Você completou tudo! É um(a) campeão(ã) do alfabeto! 🥇",
    "Que orgulho! Aprendeu brincando e chegou longe! 🦋",
]

ALL_LETTERS = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

HTML = r'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ordem Alfabetica - Projeto Serafina</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;}
body{font-family:'Nunito','Arial Rounded MT Bold',Arial,sans-serif;
  background:#0d0b1e;min-height:100vh;overflow-x:hidden;color:#fff;}

/* STARFIELD */
#starfield{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;}

/* APP */
#app{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;
  align-items:center;padding-bottom:32px;}

/* SCREENS */
.screen{display:none;width:100%;max-width:880px;padding:0 12px;}
.screen.active{display:block;}

/* NAVBAR */
.navbar{width:100%;max-width:880px;display:flex;align-items:center;justify-content:space-between;
  padding:10px 16px;background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);
  border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:16px;
  position:sticky;top:0;z-index:100;}
.nav-logo{font-size:clamp(13px,2.5vw,17px);font-weight:900;
  background:linear-gradient(135deg,#a78bfa,#f472b6,#fb923c);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.nav-right{display:flex;gap:8px;align-items:center;}
.nav-score{background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:20px;
  padding:4px 12px;font-size:13px;font-weight:800;color:#fff;
  box-shadow:0 2px 8px rgba(245,158,11,.4);}
.nav-btn{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);
  border-radius:8px;padding:5px 11px;font-family:inherit;font-size:11px;font-weight:800;
  color:#fff;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:4px;}
.nav-btn:hover{background:rgba(255,255,255,.2);transform:translateY(-1px);}
.nav-btn.nb-home{color:#a78bfa;}
.nav-btn.nb-skip{color:#fb923c;}

/* BUTTONS */
.btn{border:none;border-radius:14px;font-family:inherit;font-weight:800;
  cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:8px;}
.btn:active{transform:scale(.96)!important;}
.btn-start{background:linear-gradient(135deg,#a78bfa,#f472b6);color:#fff;
  font-size:clamp(15px,2.8vw,19px);padding:15px 44px;border-radius:50px;
  box-shadow:0 4px 30px rgba(167,139,250,.5);animation:startPulse 2.2s ease infinite;}
@keyframes startPulse{
  0%,100%{box-shadow:0 4px 30px rgba(167,139,250,.5),0 0 0 0 rgba(167,139,250,.3);}
  50%{box-shadow:0 4px 30px rgba(167,139,250,.6),0 0 0 16px rgba(167,139,250,0);}}
.btn-start:hover{transform:translateY(-3px);filter:brightness(1.1);}
.btn-check{background:linear-gradient(135deg,#10b981,#34d399);color:#fff;
  font-size:14px;padding:11px 22px;border-radius:12px;
  box-shadow:0 4px 14px rgba(16,185,129,.4);}
.btn-check:hover{transform:translateY(-2px);}
.btn-hint{background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#fff;
  font-size:14px;padding:11px 22px;border-radius:12px;}
.btn-hint:hover{transform:translateY(-2px);}
.btn-replay{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
  color:#fff;font-size:13px;padding:10px 18px;border-radius:12px;}
.btn-replay:hover{background:rgba(255,255,255,.18);transform:translateY(-2px);}
.btn-next{background:linear-gradient(135deg,#f472b6,#fb923c);color:#fff;
  font-size:15px;padding:12px 30px;border-radius:12px;
  box-shadow:0 4px 18px rgba(244,114,182,.4);}
.btn-next:hover{transform:translateY(-2px);}
.btn-home-lg{background:rgba(167,139,250,.15);border:1px solid rgba(167,139,250,.4);
  color:#a78bfa;font-size:13px;padding:10px 20px;border-radius:12px;}
.btn-home-lg:hover{background:rgba(167,139,250,.25);transform:translateY(-2px);}

/* ===== INTRO ===== */
#screen-intro{text-align:center;padding-top:8px;}
.intro-badge{display:inline-block;background:rgba(167,139,250,.12);
  border:1px solid rgba(167,139,250,.35);border-radius:30px;padding:4px 16px;
  font-size:11px;font-weight:700;color:#a78bfa;letter-spacing:2px;text-transform:uppercase;
  margin-bottom:14px;}
.intro-mascot{font-size:clamp(64px,12vw,92px);display:block;margin:0 auto 10px;
  animation:mfloat 3s ease-in-out infinite;
  filter:drop-shadow(0 0 24px rgba(167,139,250,.5));}
@keyframes mfloat{0%,100%{transform:translateY(0) rotate(-3deg);}
  50%{transform:translateY(-14px) rotate(3deg);}}
.intro-title{font-size:clamp(30px,6vw,54px);font-weight:900;
  background:linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#fb923c 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  filter:drop-shadow(0 0 28px rgba(167,139,250,.3));margin-bottom:6px;}
.intro-sub{font-size:clamp(13px,2.5vw,17px);color:rgba(255,255,255,.6);margin-bottom:24px;font-weight:600;}
.lv-pills{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:24px;}
.lv-pill{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);
  border-radius:12px;padding:10px 14px;display:flex;flex-direction:column;
  align-items:center;gap:4px;min-width:88px;transition:.2s;}
.lv-pill:hover{background:rgba(167,139,250,.14);border-color:rgba(167,139,250,.5);}
.lv-num{width:26px;height:26px;border-radius:50%;
  background:linear-gradient(135deg,#a78bfa,#f472b6);
  display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;}
.lv-lbl{font-size:11px;font-weight:700;color:rgba(255,255,255,.65);}
.intro-tip{color:rgba(255,255,255,.38);font-size:11px;font-weight:600;
  margin-bottom:22px;line-height:1.7;}

/* ===== GAME ===== */
.game-body{display:flex;flex-direction:column;gap:12px;}

/* level bar */
.level-bar{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
  border-radius:16px;padding:11px 16px;display:flex;align-items:center;
  justify-content:space-between;gap:10px;flex-wrap:wrap;}
.level-steps{display:flex;gap:7px;}
.step{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;
  justify-content:center;font-size:13px;font-weight:900;transition:.3s;}
.step.done{background:linear-gradient(135deg,#10b981,#34d399);box-shadow:0 2px 10px rgba(16,185,129,.4);}
.step.active{background:linear-gradient(135deg,#a78bfa,#f472b6);
  box-shadow:0 2px 14px rgba(167,139,250,.5);transform:scale(1.1);}
.step.pending{background:rgba(255,255,255,.07);color:rgba(255,255,255,.25);}
.li-title{font-size:14px;font-weight:900;color:#a78bfa;}
.li-desc{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px;}

/* Serafina bubble */
.sera-bubble{display:flex;align-items:flex-start;gap:12px;
  background:rgba(167,139,250,.09);border:1px solid rgba(167,139,250,.22);
  border-radius:18px;padding:13px 15px;transition:.3s;}
.sera-bubble.success{background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.3);}
.sera-bubble.error{background:rgba(239,68,68,.09);border-color:rgba(239,68,68,.25);}
.sera-bubble.hint-mode{background:rgba(245,158,11,.08);border-color:rgba(245,158,11,.28);}
.sera-icon{font-size:36px;flex-shrink:0;line-height:1;}
.sera-main{font-size:clamp(13px,2.5vw,15px);font-weight:700;
  color:rgba(255,255,255,.9);line-height:1.45;}
.sera-sub{font-size:11px;color:rgba(255,255,255,.45);margin-top:3px;font-weight:600;}

/* ===== DROP ZONE ===== */
.dz-wrapper{
  background:rgba(167,139,250,.07);
  border:2px dashed rgba(167,139,250,.35);
  border-radius:20px;padding:14px;transition:.3s;
  min-height:96px;
}
.dz-wrapper.dz-active{
  border-color:rgba(167,139,250,.75);
  background:rgba(167,139,250,.13);
  box-shadow:0 0 0 4px rgba(167,139,250,.1),inset 0 0 20px rgba(167,139,250,.05);
}
.dz-label{font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
  color:rgba(167,139,250,.7);margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.dz-count{background:rgba(167,139,250,.2);border-radius:20px;padding:1px 10px;
  font-size:10px;font-weight:800;color:rgba(167,139,250,.8);margin-left:auto;}

/* The sortable row inside drop zone */
.dz-row{
  display:flex;flex-wrap:wrap;gap:8px;
  min-height:60px;align-items:center;
  position:relative;
}
/* Empty placeholder when dz is empty */
.dz-empty{
  width:100%;text-align:center;color:rgba(255,255,255,.2);
  font-size:13px;font-weight:700;padding:10px 0;pointer-events:none;
}
/* Insertion indicator line */
.insert-line{
  width:4px;height:58px;border-radius:4px;
  background:linear-gradient(180deg,#a78bfa,#f472b6);
  flex-shrink:0;transition:none;
  box-shadow:0 0 8px rgba(167,139,250,.8);
  animation:insertPulse .6s ease infinite alternate;
}
@keyframes insertPulse{from{opacity:.6}to{opacity:1}}

/* SOURCE AREA */
.src-wrapper{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
  border-radius:20px;padding:14px;}
.src-label{font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
  color:rgba(255,255,255,.3);margin-bottom:10px;}
.src-row{display:flex;flex-wrap:wrap;gap:8px;min-height:60px;
  align-items:center;justify-content:center;}

/* CARDS */
.card{border-radius:12px;font-size:clamp(15px,3vw,21px);font-weight:900;
  cursor:grab;user-select:none;border:none;
  box-shadow:0 4px 14px rgba(0,0,0,.3);transition:transform .18s,box-shadow .18s;
  min-width:62px;height:56px;display:flex;align-items:center;justify-content:center;
  position:relative;touch-action:none;text-shadow:0 1px 3px rgba(0,0,0,.25);
  letter-spacing:.5px;padding:0 8px;}
.card:hover{transform:translateY(-4px) scale(1.05);box-shadow:0 8px 22px rgba(0,0,0,.4);}
.card.dragging{opacity:.3;transform:scale(.88);cursor:grabbing;}
.card.selected{transform:translateY(-6px) scale(1.08);
  box-shadow:0 0 0 3px #fff,0 8px 26px rgba(0,0,0,.5);}
.card.hint-card{animation:hglow 1s ease infinite;}
@keyframes hglow{0%,100%{box-shadow:0 4px 14px rgba(0,0,0,.3);}
  50%{box-shadow:0 0 0 4px #fbbf24,0 8px 24px rgba(245,158,11,.6);}}
.card.correct-glow{animation:cglow .6s ease;box-shadow:0 0 0 3px #34d399,0 6px 20px rgba(16,185,129,.5);}
@keyframes cglow{0%{transform:scale(1)}40%{transform:scale(1.2)}100%{transform:scale(1)}}
.card.wrong-shake{animation:wshake .45s ease;}
@keyframes wshake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}
  40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}

/* 8 card color themes */
.ct0{background:linear-gradient(135deg,#ef4444,#f97316);color:#fff;}
.ct1{background:linear-gradient(135deg,#f97316,#fbbf24);color:#1a0a00;}
.ct2{background:linear-gradient(135deg,#10b981,#34d399);color:#fff;}
.ct3{background:linear-gradient(135deg,#3b82f6,#818cf8);color:#fff;}
.ct4{background:linear-gradient(135deg,#8b5cf6,#d946ef);color:#fff;}
.ct5{background:linear-gradient(135deg,#06b6d4,#3b82f6);color:#fff;}
.ct6{background:linear-gradient(135deg,#ec4899,#f43f5e);color:#fff;}
.ct7{background:linear-gradient(135deg,#65a30d,#22c55e);color:#fff;}

/* BUTTONS ROW */
.btn-row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}

/* ===== LEVEL COMPLETE ===== */
#screen-levelcomplete{text-align:center;padding-top:12px;}
.lc-mascot{font-size:76px;display:inline-block;animation:mfloat 3s ease-in-out infinite;
  filter:drop-shadow(0 0 22px rgba(167,139,250,.5));}
.lc-title{font-size:clamp(24px,5vw,38px);font-weight:900;
  background:linear-gradient(135deg,#f472b6,#fb923c);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin:10px 0 6px;}
.lc-msg{font-size:15px;color:rgba(255,255,255,.65);margin-bottom:22px;font-weight:600;}
.stars-row{display:flex;justify-content:center;gap:12px;margin:14px 0;}
.star{font-size:52px;animation:starPop .4s ease backwards;
  filter:grayscale(1) opacity(.3);transition:filter .3s;}
.star.lit{filter:grayscale(0) opacity(1);}
.star:nth-child(1){animation-delay:.1s}.star:nth-child(2){animation-delay:.3s}.star:nth-child(3){animation-delay:.5s}
@keyframes starPop{0%{transform:scale(0) rotate(-30deg);opacity:0}
  60%{transform:scale(1.3) rotate(10deg);opacity:1}100%{transform:scale(1);opacity:1}}

/* ===== VICTORY ===== */
#screen-victory{text-align:center;padding-top:12px;}
.vic-mascot{font-size:90px;display:inline-block;animation:vbounce .7s ease infinite alternate;
  filter:drop-shadow(0 0 28px rgba(167,139,250,.6));}
@keyframes vbounce{from{transform:scale(1) rotate(-6deg)}to{transform:scale(1.1) rotate(6deg)}}
.vic-title{font-size:clamp(26px,5vw,44px);font-weight:900;
  background:linear-gradient(135deg,#a78bfa,#f472b6,#fb923c);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0;}
.vic-msg{font-size:clamp(14px,2.5vw,17px);font-weight:700;color:rgba(255,255,255,.85);
  line-height:1.5;background:rgba(167,139,250,.09);border:1px solid rgba(167,139,250,.22);
  border-radius:14px;padding:14px 18px;margin:0 auto 14px;max-width:480px;}
.vic-score{font-size:clamp(18px,3.5vw,24px);font-weight:900;
  background:linear-gradient(135deg,#f59e0b,#ef4444);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px;}
.vic-stars{font-size:34px;letter-spacing:4px;margin-bottom:22px;}

/* FIREWORKS */
#fw-canvas{position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999;}

/* GHOST */
#ghost{position:fixed;pointer-events:none;z-index:1000;opacity:.8;
  transform:scale(1.12) rotate(4deg);border-radius:12px;padding:10px 14px;
  font-size:18px;font-weight:900;color:#fff;box-shadow:0 12px 32px rgba(0,0,0,.4);
  display:none;font-family:inherit;}

@media(max-width:500px){
  .card{min-width:52px;height:50px;font-size:13px;}
  .btn-check,.btn-hint,.btn-replay{font-size:12px;padding:9px 14px;}
}
</style>
</head>
<body>
<canvas id="fw-canvas"></canvas>
<div id="ghost"></div>
<canvas id="starfield"></canvas>

<div id="app">

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <div class="nav-logo">&#x1F31F; Projeto Serafina</div>
  <div class="nav-right">
    <div class="nav-score">&#x2B50; <span id="score-val">0</span> pts</div>
    <button class="nav-btn nb-home" onclick="goHome()">&#x1F3E0; Inicio</button>
    <button class="nav-btn nb-skip" id="btn-skip" onclick="skipLevel()" style="display:none">&#x23ED; Pular</button>
  </div>
</nav>

<!-- INTRO -->
<div id="screen-intro" class="screen active">
  <div style="text-align:center;padding-top:8px;">
    <div class="intro-badge">&#x1F4DA; Projeto Serafina</div>
    <span class="intro-mascot">&#x1F467;</span>
    <div class="intro-title">Ordem Alfabetica!</div>
    <div class="intro-sub">Ajude a Serafina a ordenar tudo! Voce consegue?</div>
    <div class="lv-pills">
      <div class="lv-pill"><div class="lv-num">1</div><div class="lv-lbl">5 Letras</div></div>
      <div class="lv-pill"><div class="lv-num">2</div><div class="lv-lbl">8 Letras</div></div>
      <div class="lv-pill"><div class="lv-num">3</div><div class="lv-lbl">Palavras</div></div>
      <div class="lv-pill"><div class="lv-num">4</div><div class="lv-lbl">Desafio!</div></div>
    </div>
    <div class="intro-tip">
      &#x1F4F2; Celular: toque uma peca, depois toque onde quer inserir<br>
      &#x1F4BB; Computador: arraste as pecas para a zona de resposta acima
    </div>
    <button class="btn btn-start" onclick="startGame()">&#x1F680; Comecar Aventura!</button>
  </div>
</div>

<!-- GAME -->
<div id="screen-game" class="screen">
  <div class="game-body">
    <!-- Level bar -->
    <div class="level-bar">
      <div class="level-steps" id="level-steps"></div>
      <div style="text-align:right;">
        <div class="li-title" id="li-title">Nivel 1 de 4</div>
        <div class="li-desc" id="li-desc">5 letras aleatorias</div>
      </div>
    </div>
    <!-- Serafina -->
    <div class="sera-bubble" id="sera-bubble">
      <div class="sera-icon">&#x1F467;</div>
      <div>
        <div class="sera-main" id="sera-main">Qual e a PRIMEIRA letra do alfabeto entre essas?</div>
        <div class="sera-sub" id="sera-sub">Arraste para a zona de resposta acima</div>
      </div>
    </div>
    <!-- DROP ZONE -->
    <div class="dz-wrapper" id="dz-wrapper">
      <div class="dz-label">
        <span>&#x1F4CB; Resposta &mdash; coloque aqui em ordem</span>
        <span class="dz-count" id="dz-count">0 / 0</span>
      </div>
      <div class="dz-row" id="dz-row"></div>
    </div>
    <!-- SOURCE -->
    <div class="src-wrapper">
      <div class="src-label">&#x1F3B4; Suas pecas &mdash; arraste para cima</div>
      <div class="src-row" id="src-row"></div>
    </div>
    <!-- Buttons -->
    <div class="btn-row">
      <button class="btn btn-check" onclick="checkAnswer()">&#x2714;&#xFE0F; Verificar</button>
      <button class="btn btn-hint"  onclick="showHint()">&#x1F4A1; Dica</button>
      <button class="btn btn-replay" onclick="replayLevel()">&#x1F504; Novo Jogo</button>
    </div>
  </div>
</div>

<!-- LEVEL COMPLETE -->
<div id="screen-levelcomplete" class="screen">
  <div style="text-align:center;padding-top:14px;">
    <div class="lc-mascot">&#x1F973;</div>
    <div class="lc-title" id="lc-title">Nivel Completo!</div>
    <div class="stars-row">
      <span class="star" id="star1">&#x2B50;</span>
      <span class="star" id="star2">&#x2B50;</span>
      <span class="star" id="star3">&#x2B50;</span>
    </div>
    <div class="lc-msg" id="lc-msg"></div>
    <div class="btn-row" style="justify-content:center;gap:12px;">
      <button class="btn btn-next" id="btn-next" onclick="nextLevel()">Proximo Nivel &#x27A1;</button>
      <button class="btn btn-home-lg" onclick="goHome()">&#x1F3E0; Inicio</button>
    </div>
  </div>
</div>

<!-- VICTORY -->
<div id="screen-victory" class="screen">
  <div style="text-align:center;padding-top:14px;">
    <div class="vic-mascot">&#x1F973;</div>
    <div class="vic-title">Campea(o) do Alfabeto!</div>
    <div class="vic-stars" id="vic-stars"></div>
    <div class="vic-msg"   id="vic-msg"></div>
    <div class="vic-score" id="vic-score"></div>
    <div class="btn-row" style="justify-content:center;gap:12px;">
      <button class="btn btn-start" onclick="startGame()">&#x1F504; Jogar Novamente</button>
      <button class="btn btn-home-lg" onclick="goHome()">&#x1F3E0; Inicio</button>
    </div>
  </div>
</div>

</div><!-- /app -->
<script>
// ============================================================
//  DATA
// ============================================================
var WB  = __WORD_BANK__;
var AL  = __ALL_LETTERS__;
var MSG = __MESSAGES__;
var LVL = [
  {id:1,type:'letters',count:5, title:'Nivel 1 de 4',desc:'5 letras aleatorias'},
  {id:2,type:'letters',count:8, title:'Nivel 2 de 4',desc:'8 letras - mais dificil!'},
  {id:3,type:'words',  count:5, title:'Nivel 3 de 4',desc:'Palavras pela 1a letra'},
  {id:4,type:'same',   count:5, title:'Nivel 4 de 4',desc:'Mesma letra - ordene pela 2a!'},
];

// ============================================================
//  STATE
// ============================================================
var G={
  lvl:0, correct:[], count:5,
  score:0, stars:0, hintsUsed:0, attempts:0, msgIdx:0,
  src:[], dz:[],      // dz = ordered answer array
  dragSrc:null, dragFrom:null,
  sel:null, selFrom:null,
  tx:0, ty:0, touchCard:null,
  insertIdx:null,      // current insertion position during drag-over dz
};

// ============================================================
//  STARFIELD
// ============================================================
(function(){
  var c=document.getElementById('starfield'),ctx=c.getContext('2d'),stars=[];
  function resize(){
    c.width=window.innerWidth;c.height=window.innerHeight;stars=[];
    for(var i=0;i<180;i++) stars.push({
      x:Math.random()*c.width,y:Math.random()*c.height,
      r:Math.random()*1.5+.2,a:Math.random(),
      da:(Math.random()-.5)*.005,sp:Math.random()*.15+.04});
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    stars.forEach(function(s){
      s.y-=s.sp; if(s.y<-5)s.y=c.height+5;
      s.a+=s.da; if(s.a>1||s.a<.1)s.da*=-1;
      ctx.save();ctx.globalAlpha=s.a;ctx.fillStyle='#fff';
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  resize();window.addEventListener('resize',resize);draw();
})();

// ============================================================
//  UTILS
// ============================================================
function shuffle(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=~~(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
function norm(s){try{return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}catch(e){return s.toLowerCase();}}
function alpha(a){return a.slice().sort(function(x,y){return norm(x).localeCompare(norm(y));});}
function ri(a,b){return~~(Math.random()*(b-a+1))+a;}
function nextMsg(){var m=MSG[G.msgIdx%MSG.length];G.msgIdx++;return m;}
function cc(t){var n=0;for(var i=0;i<t.length;i++)n+=t.charCodeAt(i);return'ct'+(n%8);}

// ============================================================
//  SCREENS
// ============================================================
function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
  document.getElementById(id).classList.add('active');
  document.getElementById('btn-skip').style.display=(id==='screen-game')?'flex':'none';
}
function goHome(){showScreen('screen-intro');}
function skipLevel(){if(confirm('Pular este nivel?'))advLevel();}
function advLevel(){G.lvl++;if(G.lvl>=LVL.length)showVictory();else{showScreen('screen-game');loadLevel();}}
function startGame(){G.lvl=0;G.score=0;G.stars=0;G.msgIdx=0;document.getElementById('score-val').textContent='0';showScreen('screen-game');loadLevel();}
function replayLevel(){loadLevel();}
function nextLevel(){advLevel();}

// ============================================================
//  LOAD LEVEL
// ============================================================
function loadLevel(){
  var cfg=LVL[G.lvl];
  G.hintsUsed=0;G.attempts=0;G.sel=null;G.selFrom=null;G.count=cfg.count;G.dz=[];

  if(cfg.type==='letters'){
    var p=shuffle(AL).slice(0,cfg.count);
    G.correct=alpha(p);G.src=shuffle(p.slice());
  } else if(cfg.type==='words'){
    var keys=shuffle(Object.keys(WB).filter(function(l){return l!=='W'&&l!=='K'&&l!=='Y';}));
    var picked=[];
    for(var i=0;i<keys.length&&picked.length<cfg.count;i++){var ws=WB[keys[i]];picked.push(ws[ri(0,ws.length-1)]);}
    G.correct=alpha(picked);G.src=shuffle(picked.slice());
  } else {
    var good=Object.keys(WB).filter(function(l){return WB[l].length>=6;});
    var grp=null;
    for(var t=0;t<40&&!grp;t++){var l=good[ri(0,good.length-1)];var pp=pickDiverse(WB[l],5);if(pp.length===5)grp=pp;}
    if(!grp){var pl=shuffle(AL).slice(0,5);G.correct=alpha(pl);G.src=shuffle(pl.slice());}
    else{G.correct=alpha(grp);G.src=shuffle(grp.slice());}
  }
  renderAll();
}

function pickDiverse(words,n){
  var c=shuffle(words.slice()),picked=[],used={};
  for(var i=0;i<c.length&&picked.length<n;i++){var ch=norm(c[i])[1];if(!used[ch]){picked.push(c[i]);used[ch]=true;}}
  return picked;
}

// ============================================================
//  RENDER
// ============================================================
function renderAll(){
  var cfg=LVL[G.lvl];
  // steps
  var steps=document.getElementById('level-steps');steps.innerHTML='';
  for(var i=0;i<LVL.length;i++){
    var d=document.createElement('div');
    d.className='step '+(i<G.lvl?'done':i===G.lvl?'active':'pending');
    d.textContent=i<G.lvl?'\u2713':(i+1);steps.appendChild(d);
  }
  document.getElementById('li-title').textContent=cfg.title;
  document.getElementById('li-desc').textContent=cfg.desc;
  document.getElementById('score-val').textContent=G.score;
  updateInstruction();
  renderDZ();
  renderSrc();
}

function updateInstruction(){
  var filled=G.dz.length, total=G.count;
  var cfg=LVL[G.lvl];
  var isW=(cfg.type==='words'||cfg.type==='same');
  var item=isW?'palavra':'letra';
  var ord=['PRIMEIRA','SEGUNDA','TERCEIRA','QUARTA','QUINTA','SEXTA','SETIMA','OITAVA'];
  var main,sub;
  if(filled===0){main='Qual e a '+ord[0]+' '+item+' em ordem alfabetica?';sub='Arraste ou toque uma peca para a zona de resposta';}
  else if(filled<total){main='Otimo! Qual e a '+(ord[filled]||((filled+1)+'a'))+' '+item+' que vem agora?';sub=(total-filled)+' peca'+(total-filled>1?'s':'')+' restante'+(total-filled>1?'s':'')+'!';}
  else{main='Perfeito! Clique em Verificar para conferir a ordem!';sub='Voce pode ainda reorganizar as pecas';}
  var bub=document.getElementById('sera-bubble');
  bub.className='sera-bubble';
  document.getElementById('sera-main').textContent=main;
  document.getElementById('sera-sub').textContent=sub;
  document.getElementById('dz-count').textContent=filled+' / '+total;
}

function setHint(text,type){
  var bub=document.getElementById('sera-bubble');
  bub.className='sera-bubble'+(type?' '+type:'');
  document.getElementById('sera-main').textContent=text;
  document.getElementById('sera-sub').textContent='';
}

// ============================================================
//  DROP ZONE RENDER (sortable row with insertion)
// ============================================================
function renderDZ(){
  var row=document.getElementById('dz-row');row.innerHTML='';
  var wrapper=document.getElementById('dz-wrapper');

  if(G.dz.length===0){
    var emp=document.createElement('div');emp.className='dz-empty';
    emp.textContent='Arraste as pecas para ca...';row.appendChild(emp);
    // Make whole wrapper a drop target
    wrapper.ondragover=function(e){e.preventDefault();wrapper.classList.add('dz-active');setInsertLine(row,null,e);};
    wrapper.ondragleave=function(e){if(!wrapper.contains(e.relatedTarget)){wrapper.classList.remove('dz-active');clearInsertLine(row);}};
    wrapper.ondrop=function(e){e.preventDefault();wrapper.classList.remove('dz-active');clearInsertLine(row);dropIntoDZ(0);};
    return;
  }

  wrapper.ondragover=null;wrapper.ondragleave=null;wrapper.ondrop=null;

  G.dz.forEach(function(text,idx){
    (function(i,t){
      var card=makeCard(t,'dz',i);
      row.appendChild(card);
    })(idx,text);
  });

  // Row as drop target for inserting between
  row.ondragover=function(e){
    e.preventDefault();
    wrapper.classList.add('dz-active');
    var ins=getInsertIdx(row,e.clientX);
    if(ins!==G.insertIdx){G.insertIdx=ins;renderInsertLine(row,ins);}
  };
  row.ondragleave=function(e){
    if(!row.contains(e.relatedTarget)&&!wrapper.contains(e.relatedTarget)){
      wrapper.classList.remove('dz-active');clearInsertLine(row);G.insertIdx=null;
    }
  };
  row.ondrop=function(e){
    e.preventDefault();wrapper.classList.remove('dz-active');
    var ins=G.insertIdx!==null?G.insertIdx:G.dz.length;
    clearInsertLine(row);G.insertIdx=null;
    dropIntoDZ(ins);
  };
}

function getInsertIdx(row,clientX){
  var cards=row.querySelectorAll('.card');
  if(!cards.length) return 0;
  for(var i=0;i<cards.length;i++){
    var r=cards[i].getBoundingClientRect();
    var mid=r.left+r.width/2;
    if(clientX<mid) return i;
  }
  return cards.length;
}

function renderInsertLine(row,ins){
  clearInsertLine(row);
  var line=document.createElement('div');line.className='insert-line';line.id='ins-line';
  var cards=row.querySelectorAll('.card');
  if(!cards.length||ins>=cards.length){row.appendChild(line);}
  else{row.insertBefore(line,cards[ins]);}
}

function clearInsertLine(row){var l=row.querySelector('.ins-line,#ins-line');if(l)l.remove();}

// ============================================================
//  SOURCE RENDER
// ============================================================
function renderSrc(){
  var row=document.getElementById('src-row');row.innerHTML='';
  if(G.src.length===0){
    var d=document.createElement('div');
    d.style.cssText='color:rgba(255,255,255,.25);font-size:13px;font-weight:600;';
    d.textContent='Todas as pecas ja foram colocadas!';row.appendChild(d);return;
  }
  G.src.forEach(function(text,idx){
    (function(i,t){row.appendChild(makeCard(t,'src',i));})(idx,text);
  });
}

// ============================================================
//  MAKE CARD
// ============================================================
function makeCard(text,from,idx){
  var card=document.createElement('div');
  card.className='card '+cc(text);
  card.textContent=text;
  card.dataset.from=from;
  card.dataset.idx=idx;
  card.draggable=true;

  // Drag start
  card.addEventListener('dragstart',function(e){
    G.dragFrom=from;G.dragSrc=idx;
    e.dataTransfer.effectAllowed='move';
    card.classList.add('dragging');
    if(from==='src') document.getElementById('dz-wrapper').classList.add('dz-active');
  });
  card.addEventListener('dragend',function(){
    card.classList.remove('dragging');
    document.getElementById('dz-wrapper').classList.remove('dz-active');
    clearInsertLine(document.getElementById('dz-row'));
    G.insertIdx=null;
  });

  // DZ card: drag-over shows insert line on row (handled by row handler)
  // SRC card: can also be drop target (place between src cards? No — only DZ gets reordering)

  // Card in DZ: clicking sends back to source
  // Card in SRC: clicking selects to place

  card.addEventListener('click',function(e){
    e.stopPropagation();
    handleCardClick(from,idx,text);
  });

  // Touch
  card.addEventListener('touchstart',onTS,{passive:false});
  card.addEventListener('touchmove',onTM,{passive:false});
  card.addEventListener('touchend',onTE,{passive:false});

  return card;
}

// ============================================================
//  DROP INTO DZ
// ============================================================
function dropIntoDZ(insIdx){
  if(G.dragFrom===null) return;
  var text, finalIns=insIdx;

  if(G.dragFrom==='src'){
    text=G.src[G.dragSrc];
    G.src.splice(G.dragSrc,1);
  } else if(G.dragFrom==='dz'){
    text=G.dz[G.dragSrc];
    G.dz.splice(G.dragSrc,1);
    // Adjust insertion index after removal
    if(G.dragSrc<insIdx) finalIns=Math.max(0,insIdx-1);
  }
  if(text!==undefined){
    G.dz.splice(finalIns,0,text);
  }
  G.dragFrom=null;G.dragSrc=null;
  updateInstruction();renderDZ();renderSrc();
}

// Card dropped on source row (return to source)
document.getElementById('src-row').addEventListener('dragover',function(e){e.preventDefault();});
document.getElementById('src-row').addEventListener('drop',function(e){
  e.preventDefault();
  if(G.dragFrom==='dz'){
    var text=G.dz[G.dragSrc];
    G.dz.splice(G.dragSrc,1);
    G.src.push(text);
    G.dragFrom=null;G.dragSrc=null;
    updateInstruction();renderDZ();renderSrc();
  }
});

// ============================================================
//  TAP / CLICK LOGIC
// ============================================================
function handleCardClick(from,idx,text){
  if(G.sel===null){
    // Select this card
    G.sel=idx;G.selFrom=from;
    highlightSel(from,idx);
  } else {
    var sf=G.selFrom,si=G.sel;
    G.sel=null;G.selFrom=null;
    if(sf===from&&si===idx){renderDZ();renderSrc();return;} // deselect
    if(sf==='src'&&from==='dz'){
      // Insert src card at dz position
      var t=G.src[si];G.src.splice(si,1);G.dz.splice(idx,0,t);
    } else if(sf==='dz'&&from==='src'){
      // Move dz card back to src, put src card at its position
      var td=G.dz[si],ts=G.src[idx];
      G.dz.splice(si,1);G.src.splice(idx,1);
      G.dz.splice(si,0,ts);G.src.push(td);
    } else if(sf==='dz'&&from==='dz'){
      // Swap in dz
      var t1=G.dz[si],t2=G.dz[idx];G.dz[si]=t2;G.dz[idx]=t1;
    } else if(sf==='src'&&from==='src'){
      // Swap in src
      var t1=G.src[si],t2=G.src[idx];G.src[si]=t2;G.src[idx]=t1;
    }
    updateInstruction();renderDZ();renderSrc();
  }
}

// Tapping DZ empty area appends selected src card
document.getElementById('dz-row').addEventListener('click',function(e){
  if(e.target!==this) return;
  if(G.sel!==null&&G.selFrom==='src'){
    var t=G.src[G.sel];G.src.splice(G.sel,1);G.dz.push(t);
    G.sel=null;G.selFrom=null;
    updateInstruction();renderDZ();renderSrc();
  }
});

function highlightSel(from,idx){
  renderDZ();renderSrc();
  var row=from==='src'?document.getElementById('src-row'):document.getElementById('dz-row');
  row.querySelectorAll('.card').forEach(function(c){
    if(parseInt(c.dataset.idx)===idx&&c.dataset.from===from) c.classList.add('selected');
  });
}

// ============================================================
//  TOUCH DRAG
// ============================================================
function onTS(e){
  e.preventDefault();
  var card=e.currentTarget,t=e.touches[0],rect=card.getBoundingClientRect();
  G.tx=t.clientX-rect.left;G.ty=t.clientY-rect.top;
  G.touchCard=card;G.dragFrom=card.dataset.from;G.dragSrc=parseInt(card.dataset.idx);
  var g=document.getElementById('ghost');
  g.textContent=card.textContent;
  g.className='ct'+cc(card.textContent).slice(2);
  g.style.cssText='display:block;left:'+(t.clientX-G.tx)+'px;top:'+(t.clientY-G.ty)+'px;';
  card.classList.add('dragging');
  document.getElementById('dz-wrapper').classList.add('dz-active');
}
function onTM(e){
  e.preventDefault();if(!G.touchCard)return;
  var t=e.touches[0],g=document.getElementById('ghost');
  g.style.left=(t.clientX-G.tx)+'px';g.style.top=(t.clientY-G.ty)+'px';
  // Show insert line in DZ
  var row=document.getElementById('dz-row');
  var ins=getInsertIdx(row,t.clientX);
  if(ins!==G.insertIdx){G.insertIdx=ins;renderInsertLine(row,ins);}
}
function onTE(e){
  e.preventDefault();
  var g=document.getElementById('ghost');g.style.display='none';
  document.getElementById('dz-wrapper').classList.remove('dz-active');
  clearInsertLine(document.getElementById('dz-row'));
  if(G.touchCard) G.touchCard.classList.remove('dragging');

  var t=e.changedTouches[0];
  var el=document.elementFromPoint(t.clientX,t.clientY);
  var srcRow=el?el.closest('.src-wrapper'):null;
  var dzWrapper=el?el.closest('.dz-wrapper'):null;

  if(dzWrapper){
    var ins=G.insertIdx!==null?G.insertIdx:G.dz.length;
    G.insertIdx=null;
    dropIntoDZ(ins);
  } else if(srcRow&&G.dragFrom==='dz'){
    var text2=G.dz[G.dragSrc];
    G.dz.splice(G.dragSrc,1);G.src.push(text2);
    G.dragFrom=null;G.dragSrc=null;
    updateInstruction();renderDZ();renderSrc();
  } else {
    G.dragFrom=null;G.dragSrc=null;renderDZ();renderSrc();
  }
  G.touchCard=null;G.insertIdx=null;
}

// ============================================================
//  CHECK ANSWER
// ============================================================
function checkAnswer(){
  if(G.dz.length===0){setHint('Arraste pelo menos uma peca para a zona de resposta!','hint-mode');return;}
  if(G.dz.length<G.count){setHint('Ainda faltam pecas! Coloque todas as '+G.count+' pecas para verificar.','hint-mode');return;}
  G.attempts++;
  var ok=true;
  var row=document.getElementById('dz-row');
  var cards=row.querySelectorAll('.card');
  for(var i=0;i<G.dz.length;i++){
    var isRight=norm(G.dz[i])===norm(G.correct[i]);
    if(!isRight) ok=false;
    if(cards[i]){
      cards[i].classList.remove('correct-glow','wrong-shake');
      (function(c,r){ setTimeout(function(){c.classList.add(r?'correct-glow':'wrong-shake');},i*60); })(cards[i],isRight);
    }
  }
  if(ok){
    var st=(G.hintsUsed===0&&G.attempts===1)?3:(G.hintsUsed<=1&&G.attempts<=2)?2:1;
    G.score+=st*10;G.stars+=st;
    document.getElementById('score-val').textContent=G.score;
    setHint('Perfeito! Tudo na ordem certa! Voce e incrivel! 🎉','success');
    setTimeout(function(){showLevelComplete(st);},900);
  } else {
    var wrong=G.dz.filter(function(x,i){return norm(x)!==norm(G.correct[i]);}).length;
    setHint((wrong===1?'Quase! So uma peca esta na posicao errada. ':wrong+' pecas estao fora de ordem. ')+'Tente novamente!','error');
  }
}

// ============================================================
//  HINT
// ============================================================
function showHint(){
  G.hintsUsed++;
  for(var i=0;i<G.count;i++){
    if(i>=G.dz.length||norm(G.dz[i])!==norm(G.correct[i])){
      var needed=G.correct[i];
      document.querySelectorAll('.card').forEach(function(c){c.classList.remove('hint-card');});
      document.querySelectorAll('.card').forEach(function(c){
        if(norm(c.textContent.trim())===norm(needed)) c.classList.add('hint-card');
      });
      var ord=['1a','2a','3a','4a','5a','6a','7a','8a'];
      setHint('Dica: a peca piscando deve ir para a '+ord[i]+' posicao!','hint-mode');
      return;
    }
  }
  setHint('Tudo parece certo! Clique em Verificar!','success');
}

// ============================================================
//  LEVEL COMPLETE
// ============================================================
function showLevelComplete(st){
  showScreen('screen-levelcomplete');
  var msgs=['Continue assim, voce e incrivel! 🚀','Mais um nivel conquistado! Demais! 🌟',
    'Aprender e divertido, nao e? 😄','Proximo nivel vai ser show! 🏆'];
  document.getElementById('lc-title').textContent=G.lvl>=LVL.length-1?'Ultimo Nivel! 🏆':'Nivel Completo! 🎊';
  document.getElementById('lc-msg').textContent=msgs[G.lvl%msgs.length];
  ['star1','star2','star3'].forEach(function(id,i){
    var el=document.getElementById(id);
    el.classList.toggle('lit',i<st);el.style.animation='none';
    setTimeout(function(){el.style.animation='';},50);
  });
  document.getElementById('btn-next').textContent=
    G.lvl>=LVL.length-1?'Ver resultado! 🏆':'Proximo Nivel \u27A1';
}

// ============================================================
//  VICTORY
// ============================================================
function showVictory(){
  showScreen('screen-victory');startFireworks();
  document.getElementById('vic-stars').textContent='\u2B50'.repeat(Math.min(~~(G.stars/1.5),9));
  document.getElementById('vic-msg').textContent=nextMsg();
  document.getElementById('vic-score').textContent='\uD83C\uDFC6 Pontuacao final: '+G.score+' pontos!';
}

// ============================================================
//  FIREWORKS
// ============================================================
function startFireworks(){
  var cv=document.getElementById('fw-canvas'),ctx=cv.getContext('2d');
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  var COLS=['#f472b6','#fbbf24','#34d399','#60a5fa','#fb923c','#a78bfa','#f87171','#86efac'];
  var parts=[],animId,launches=0;
  function explode(x,y){var col=COLS[~~(Math.random()*COLS.length)];
    for(var i=0;i<70;i++){var a=(Math.PI*2/70)*i,sp=3+Math.random()*6;
      parts.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,a:1,c:col,r:3+Math.random()*4,d:.012+Math.random()*.01});}}
  function launch(){if(launches>=16)return;launches++;
    explode(80+Math.random()*(cv.width-160),60+Math.random()*(cv.height*.55));
    if(launches<16)setTimeout(launch,280+~~(Math.random()*420));}
  function frame(){ctx.clearRect(0,0,cv.width,cv.height);
    for(var i=parts.length-1;i>=0;i--){var p=parts[i];
      if(p.a<=.02){parts.splice(i,1);continue;}
      ctx.save();ctx.globalAlpha=p.a;ctx.fillStyle=p.c;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.restore();
      p.x+=p.vx;p.y+=p.vy;p.vy+=.09;p.a-=p.d;p.r*=.99;}
    if(parts.length>0||launches<16)animId=requestAnimationFrame(frame);
    else ctx.clearRect(0,0,cv.width,cv.height);}
  launch();frame();
  setTimeout(function(){cancelAnimationFrame(animId);ctx.clearRect(0,0,cv.width,cv.height);},9000);
}
window.addEventListener('resize',function(){var c=document.getElementById('fw-canvas');c.width=window.innerWidth;c.height=window.innerHeight;});
</script>
</body>
</html>'''

# Inject data
def fix_surrogates(s):
    res=[]; chars=list(s); i=0
    while i<len(chars):
        c=ord(chars[i])
        if 0xD800<=c<=0xDBFF and i+1<len(chars):
            n=ord(chars[i+1])
            if 0xDC00<=n<=0xDFFF:
                res.append(chr(0x10000+(c-0xD800)*0x400+(n-0xDC00))); i+=2; continue
        res.append(chars[i]); i+=1
    return ''.join(res)

HTML = HTML.replace('__WORD_BANK__',   json.dumps(WORD_BANK,   ensure_ascii=False, indent=2))
HTML = HTML.replace('__ALL_LETTERS__', json.dumps(ALL_LETTERS, ensure_ascii=False))
HTML = HTML.replace('__MESSAGES__',    json.dumps(MESSAGES,    ensure_ascii=False))
HTML = fix_surrogates(HTML)

out = r'C:\Users\paulo\OneDrive\td junto outlook hotmail\MAPLE BEAR\provas\01_LINGUA_PORTUGUESA\ferramentas\LP05_ordem_alfabetica.html'
with open(out, 'w', encoding='utf-8') as f:
    f.write(HTML)

total_words = sum(len(v) for v in WORD_BANK.values())
print(f'OK: {out}')
print(f'Tamanho: {len(HTML):,} chars | Palavras no banco: {total_words}')
