/* ============================================================
   MAT3_jogo_fases.js — os REINOS do jogo de Inglês (The Lost
   Endings), cada um ligado aos átomos do roteiro que ele treina
   (campo `at` do MAT3_banco.js), e o parser que transforma a grade
   de tiles (MAT3_jogo_mapas.js) no objeto de nível.
   Base: LP3_jornada_fases.js (parser igual) + os símbolos novos:
     Q  morador que pergunta (3 perguntas → 1 página)
     P  ovo do Pip (montaria: pulo planado)
     H  maçã mágica (cresce)      A capa   J bota
   Spec: trabalho/3tri_ingles/JOGO_SPEC.md
   ============================================================ */
window.FASES = (function(){
'use strict';
var T=45, CHAO_Y=10*T;

/* nome/lugar em inglês (o que a criança lê); _pt = tradução da bandeira */
var LISTA=[
  {id:1, nome:'Long and Short Lane', nome_pt:'A Rua do Comprido e do Curto', cena:'vila', tema:'measure', moradores:['lapis','lapis','lapis'],
   resumo:'Long, short, wide, narrow, tall.', resumo_pt:'Comprido, curto, largo, estreito, alto.'},
  {id:2, nome:'Perimeter Park', nome_pt:'O Parque do Perímetro', cena:'bosque', tema:'perimeter', moradores:['quadrado','quadrado','quadrado'],
   resumo:'Perimeter: add all the sides!', resumo_pt:'Perímetro: some todos os lados!'},
  {id:3, nome:'Solid Tower', nome_pt:'A Torre dos Sólidos', cena:'casa', tema:'solids', moradores:['cubo','piramide','cilindro'], rod:['cubo','cone','esfera','cilindro','piramide','cuboide'],
   resumo:'Faces, edges and vertices.', resumo_pt:'Faces, arestas e vértices.'},
  {id:4, nome:'Bar Graph Bay', nome_pt:'A Baía do Gráfico de Barras', cena:'recife', modo:'nado', tema:'data', moradores:['hamster','coelho','cao'], rod:['hamster','coelho','cao','gato'],
   resumo:'Read the bar graph.', resumo_pt:'Leia o gráfico de barras.'},
  {id:5, nome:'Chance Sky', nome_pt:'O Céu das Chances', cena:'nuvens', modo:'voo', tema:'probability', moradores:['pinguim','pinguim','pinguim'],
   resumo:'Certain, likely, possible, unlikely, impossible.', resumo_pt:'Certo, provável, possível, improvável, impossível.'},
  {id:6, nome:'Equal Groups Garden', nome_pt:'O Jardim dos Grupos Iguais', cena:'ginasio', tema:'multiplication', moradores:['botao','botao','botao'],
   resumo:'Equal groups: 4 × 3 = 12.', resumo_pt:'Grupos iguais: 4 × 3 = 12.'},
  {id:7, nome:'The Rolling Race', nome_pt:'A Corrida que Rola', cena:'pista', modo:'corrida', tema:'todos', moradores:['esfera','cilindro','cone'],
   resumo:'Race! Answer at the pit stop.', resumo_pt:'Corrida! Responda no pit stop.'},
  {id:8, nome:'Sharing Picnic', nome_pt:'O Piquenique da Divisão', cena:'estadio', tema:'division', moradores:['amigo','amigo','amigo'],
   resumo:'Share equally: 10 ÷ 2 = 5.', resumo_pt:'Repartir igualmente: 10 ÷ 2 = 5.'},
  {id:9, nome:'The Big Eraser!', nome_pt:'A Grande Borracha!', cena:'tinta', tema:'todos', chefao:true, moradores:[],
   resumo:'Write the numbers back!', resumo_pt:'Escreva os números de volta!'}
];
/* a frase que cada fase devolve (aparece no fim da fase) */
var FINS={1:['Now we can say long, short, wide and tall!','Agora sabemos dizer comprido, curto, largo e alto!'],2:['Perimeter: we add all the sides!','Perímetro: somamos todos os lados!'],3:['A cube has 6 faces, 12 edges and 8 vertices!','O cubo tem 6 faces, 12 arestas e 8 vértices!'],4:['The tallest bar has the most!','A barra mais alta tem mais!'],5:['Certain, likely, possible, unlikely, impossible!','Certo, provável, possível, improvável, impossível!'],6:['4 groups of 3 buttons are 12 buttons!','4 grupos de 3 botões são 12 botões!'],7:['A sphere and a cylinder can roll!','A esfera e o cilindro podem rolar!'],8:['10 oranges shared into 2 equal groups is 5 in each group!','10 laranjas repartidas em 2 grupos iguais dão 5 em cada grupo!'],9:['All the numbers are back!','Todos os números voltaram!']};
LISTA.forEach(function(f){ if(FINS[f.id]){ f.fim=FINS[f.id][0]; f.fim_pt=FINS[f.id][1]; } });
var PRONTOS={1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true}; /* reinos já construídos (E1: vila e floresta; E2: recife e céu) */

/* ---------- parser: grade → objeto de nível ---------- */
var ITENS={H:'maca',A:'capa',J:'bota',Y:'estrelas',d:'traje'};
function parse(rows,opts){
  opts=opts||{};
  var h=rows.length, w=0; rows.forEach(function(s){ w=Math.max(w,s.length); });
  rows=rows.map(function(s){ return (s+new Array(w+1).join(' ')).slice(0,w); });
  var L={w:w*T, h:h*T, cols:w, grade:rows, segs:[], plats:[], tijolos:[], caixas:[], moedas:[], itens:[], canhoes:[], travas:[], espinhos:[], pingentes:[], molas:[], caindo:[], agua:[], canos:[], checkpoints:[], inimigos:[], troncos:[], movers:[], moradores:[], ovos:[], paredes:[], chefinhos:[], chefs:[], pendulos:[], barras:[], saltos:[], mastro:null, inicioX:90, mundo:opts.mundo||'main'};
  var at=function(c,r){ return (r<0||r>=h||c<0||c>=w)?' ':rows[r][c]; };
  var visto={};
  for(var r=0;r<h;r++) for(var c=0;c<w;c++){
    var ch=at(c,r), x=c*T, y=r*T, k=c+','+r; if(visto[k]) continue;
    if(window.APARELHOS&&APARELHOS.parse(ch,x,y,L)) continue;
    if(window.MARCEU&&MARCEU.parse(ch,x,y,L)) continue;
    if(window.MAT3X&&MAT3X.parse(ch,x,y,L)) continue;
    switch(ch){
      case '#': { var n=1; while(at(c+n,r)==='#'){ visto[(c+n)+','+r]=1; n++; } L.segs.push({x:x,y:y,w:n*T,h:T}); break; }
      case '=': { var n2=1; while(at(c+n2,r)==='='){ visto[(c+n2)+','+r]=1; n2++; } L.plats.push({x:x,y:y,w:n2*T,h:18}); break; }
      case 'f': { var n3=1; while(at(c+n3,r)==='f'){ visto[(c+n3)+','+r]=1; n3++; } L.caindo.push({x:x,y:y,x0:x,y0:y,w:n3*T,h:18,t:0,estado:'ok'}); break; }
      case 'W': { var n4=1; while(at(c+n4,r)==='W'){ visto[(c+n4)+','+r]=1; n4++; } if(at(c,r-1)!=='W') L.agua.push({x:x,y:y,w:n4*T,h:(h-r)*T}); break; }
      case 'B': L.tijolos.push({x:x,y:y,w:T,h:T,vivo:true}); break;
      case 'o': L.moedas.push({x:x+T/2,y:y+T/2,r:11,big:false}); break;
      case 'O': L.moedas.push({x:x+T/2,y:y+T/2,r:17,big:true}); break;
      case '^': L.espinhos.push({x:x,y:y+T-22,w:T,h:22}); break;
      case 'S': L.molas.push({x:x+4,y:y+T-20,w:T-8,h:20,t:0}); break;
      case 'm': L.movers.push({x:x,y:y,x0:x,y0:y,w:3*T,h:18,dx:4*T,dy:0,per:4.2}); break;
      case 'n': L.movers.push({x:x,y:y,x0:x,y0:y,w:2*T,h:18,dx:0,dy:-3*T,per:4.5}); break;
      case 'T': L.troncos.push({x:x+T/2,y:y+T,prox:1.5,cada:3.6}); break;
      case 'K': L.troncos.push({x:x+T/2,y:y+T,prox:1.2,cada:3.2,bola:true}); break;
      case 'v': L.pingentes.push({x:x+T/2,y:y,y0:y,estado:'preso',t:0}); break;
      case 'C': L.canhoes.push({x:x+T/2,y:y+T/2,prox:2,cada:3.4}); break;
      case 'N': L.movers.push({x:x,y:y,x0:x,y0:y,w:2*T,h:18,dx:0,dy:-6*T,per:7,elevador:true}); break;
      case '%': L.paredes.push({x:x,y:y,w:T,h:T,viva:true}); break;
      case '&': L.itens.push({x:x+T/2,y:y+T/2,tipo:'historia',pego:false}); break;
      case '*': L.itens.push({x:x+T/2,y:y+T/2,tipo:'poder',pego:false}); break; /* o PODER do reino (MAT3_jogo_poderes.js) */
      case 'q': L.chefs.push({x:x+T/2,y:y+T,x0:x+T/2,estado:'espera',t:1.2,desligado:false}); break; /* Chef de Tinta: joga pratos */
      case 'D': L.moradores.push({x:x+T/2,y:y+T,i:L.moradores.length,feito:false,visto:false,falando:0,mundo:L.mundo}); break;
      case 'e': L.inimigos.push({tipo:'espinho',x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:40,voa:false,espinho:true}); break;
      case 'E': L.chefinhos.push({x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,hp:3,max:3,estado:'anda',t:0,dir:-1,vencido:false}); break;
      case 'c': L.checkpoints.push({x:x+T/2,y:y+T,acesa:false}); break;
      case 'F': L.mastro={x:x+T/2,y:y+T}; break;
      case 'U': L.inicioX=x+T/2; L.inicioY=y+T; break;
      case 'Q': L.moradores.push({x:x+T/2,y:y+T,i:L.moradores.length,feito:false,visto:false,falando:0}); break;
      case 'P': L.ovos.push({x:x+T/2,y:y+T,chocado:false,t:0}); break;
      case 'b': case 'r': case 'k': case 'w': L.inimigos.push({tipo:{b:'castor',r:'guaxinim',k:'gamba',w:'carcaju'}[ch],x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:ch==='w'?95:(ch==='k'?45:60),voa:false}); break;
      case 'g': L.inimigos.push({tipo:'corvo',x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:70,voa:true,amp:40}); break;
      case 'i': L.inimigos.push({tipo:'tinta',x:x+T/2,y:y+T,x0:x+T/2,y0:y+T,dir:-1,v:55,voa:false}); break;
      default:
        if(ITENS[ch]) L.itens.push({x:x+T/2,y:y+T/2,tipo:ITENS[ch],pego:false});
        else if(ch>='1'&&ch<='4'){ var n5=1; while(at(c+n5,r)===ch){ visto[(c+n5)+','+r]=1; n5++; } var hh=1; while(r+hh<h && at(c,r+hh)===' ') hh++; L.canos.push({x:x,y:y,w:n5*T,h:hh*T,id:ch,mundo:L.mundo}); }
    }
  }
  var segs=[]; L.segs.sort(function(a,b){ return a.x-b.x||a.y-b.y; });
  L.segs.forEach(function(s){ var u=null; for(var i=0;i<segs.length;i++){ var q=segs[i]; if(q.x===s.x&&q.w===s.w&&q.y+q.h===s.y){ u=q; break; } } if(u) u.h+=s.h; else segs.push(s); });
  L.segs=segs;
  if(L.inicioY===undefined) L.inicioY=CHAO_Y;
  /* itens da história do Mouse: na ordem do livro, da esquerda para a direita */
  return L;
}

/* ---------- monta um reino ---------- */
function monta(f){
  var MP=window.MAPAS&&MAPAS[f.id];
  var L=parse(MP.main,{mundo:'main'}); L.fase=f; L.cena=f.cena; L.modo=f.modo||''; L.superficie=f.modo==='nado'?(MP.sup?MP.sup*T:20):0;
  if(MP.sup){ L.praiaX=0; var r0=MP.main[MP.sup]; while(L.praiaX<r0.length&&r0.charAt(L.praiaX)==='#') L.praiaX++; L.praiaX*=T; } /* recife: a praia do começo, fora d'água */
  if(MP.sub){ var S=parse(MP.sub,{mundo:'sub'}); S.fase=f; S.cena=f.subCena||'sub_caverna'; S.modo=L.modo; S.superficie=f.modo==='nado'?20:0; S.sub=true; L.sub=S; }
  var todos=L.moradores.concat(L.sub?L.sub.moradores:[]);
  todos.forEach(function(m,i){ m.tipo=f.moradores[i%f.moradores.length]||'pin'; });
  L.todasEntradas=todos; L.totalArenas=todos.length; todos.forEach(function(m,i){ m.corda=false; if(f.rod){ m.rod=f.rod; m.i0=i; } }); /* MAT3: sem cabo de guerra; na torre e na baía cada pergunta é de um sólido/bicho */ /* 2ª porta do estádio: cabo de guerra */
  if(f.treino) L.passos=MP.passos;
  return L;
}

/* ---------- caminho entre dois nós do mapa ---------- */
function caminho(a,b){
  var pts=[], n=14, mx=(a.mx+b.mx)/2, my=(a.my+b.my)/2-24;
  for(var i=0;i<=n;i++){ var t=i/n, u=1-t; pts.push([u*u*a.mx+2*u*t*mx+t*t*b.mx, u*u*a.my+2*u*t*my+t*t*b.my]); }
  return pts;
}
/* posição dos nós: vem da arte (A.MAPA_NOS); sem ela, um arco simples */
function posiciona(){
  var nos=(window.ARTE&&ARTE.MAPA_NOS)||null;
  LISTA.forEach(function(f,i){ var p=nos&&nos[i]; f.mx=p?p.x:110+i*95; f.my=p?p.y:300+Math.sin(i*1.3)*90; });
}
posiciona();

return {LISTA:LISTA, PRONTOS:PRONTOS, monta:monta, parse:parse, caminho:caminho, posiciona:posiciona, CHAO_Y:CHAO_Y, T:T};
})();
