/* ============================================================
   ING3_jogo_fases.js — os REINOS do jogo de Inglês (The Lost
   Endings), cada um ligado aos átomos do roteiro que ele treina
   (campo `at` do ING3_banco.js), e o parser que transforma a grade
   de tiles (ING3_jogo_mapas.js) no objeto de nível.
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
  {id:1, nome:'Once Upon a Time Village', nome_pt:'Vila do Era Uma Vez', cena:'vila', tema:'fairy', at:['F1','F2','F6','F7','F10','F11','F12','F15'], moradores:['crier','crier','crier'],
   resumo:'Characters, settings and story events. "Once upon a time…" and "…happily ever after."', resumo_pt:'Personagens, cenários e acontecimentos. "Era uma vez…" e "…felizes para sempre."'},
  {id:2, nome:'Enchanted Forest', nome_pt:'Floresta Encantada', cena:'bosque', tema:'fairy', at:['F3','F4','F5','F8','F9','F13','F14'], moradores:['godmother','owl','godmother'],
   resumo:'Magic, magical creatures, the special helper, threes and sevens, good and bad characters, the lesson.', resumo_pt:'Magia, criaturas mágicas, o ajudante especial, três e sete, personagem bom e mau, a lição.'},
  {id:3, nome:'Real or Make-believe Rally', nome_pt:'Corrida Real ou Faz de Conta', cena:'pista', modo:'corrida', tema:'realmb', moradores:['announcer','announcer','announcer'],
   resumo:'Real or make-believe? Can it really happen?', resumo_pt:'Real ou faz de conta? Pode acontecer de verdade?'},
  {id:4, nome:'Rhyme Reef', nome_pt:'Recife das Rimas', cena:'recife', modo:'nado', tema:'poem', at:['P7','P9','P10'], moradores:['octopus','octopus','octopus'],
   resumo:'Rhyme and imagery.', resumo_pt:'Rima e imagens na mente.'},
  {id:5, nome:'Stanza Skies', nome_pt:'Céu das Estrofes', cena:'nuvens', modo:'voo', tema:'poem', at:['P1','P2','P3','P4','P5','P6','P11'], moradores:['bard','bard','bard'],
   resumo:'Title, lines, stanzas and author. Poem or poetry?', resumo_pt:'Título, versos, estrofes e autor. Poema ou poesia?'},
  {id:6, nome:'Rhythm Gym', nome_pt:'Ginásio do Ritmo', cena:'ginasio', tema:'poem', at:['P8','P10','P7','P9'], moradores:['coach','coach','coach'],
   resumo:'Rhythm: the beat of a poem.', resumo_pt:'Ritmo: a batida do poema.'},
  {id:7, nome:'Cause & Effect Stadium', nome_pt:'Estádio da Causa e Efeito', cena:'estadio', tema:'cause', moradores:['referee','referee','referee'],
   resumo:'If… (cause) → Then… (effect).', resumo_pt:'Se… (causa) → Então… (efeito).'},
  {id:8, nome:'The Cookie Circle', nome_pt:'A Roda do Biscoito', cena:'biscoito', tema:'circle', moradores:['mouse','mouse','mouse'],
   resumo:'A circle story ends where it began.', resumo_pt:'A história circular termina onde começou.'},
  {id:9, nome:'Inkwell Castle', nome_pt:'Castelo do Tinteiro', cena:'tinta', tema:'todos', chefao:true, moradores:[],
   resumo:'Count Scribble mixed up all the stories!', resumo_pt:'O Conde Rabisco misturou todas as histórias!'}
];
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
      case '*': L.itens.push({x:x+T/2,y:y+T/2,tipo:'poder',pego:false}); break; /* o PODER do reino (ING3_jogo_poderes.js) */
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
  var NOMES=['cookie','milk','napkin','mirror','scissors','broom','tape','cookie']; /* 18/10: o canudo vem no copo de leite */
  L.itens.filter(function(it){ return it.tipo==='historia'; }).sort(function(a,b){ return a.x-b.x; }).forEach(function(it,i,arr){ it.ordem= (i===arr.length-1&&i>0)?8:i; it.nome=NOMES[Math.min(i,NOMES.length-1)]; it.fim=i===arr.length-1&&i>0; if(it.fim) it.nome='cookie'; }); /* o último é sempre o biscoito de novo: a história volta ao começo */
  return L;
}

/* ---------- monta um reino ---------- */
function monta(f){
  var MP=window.MAPAS&&MAPAS[f.id];
  var L=parse(MP.main,{mundo:'main'}); L.fase=f; L.cena=f.cena; L.modo=f.modo||''; L.superficie=f.modo==='nado'?(MP.sup?MP.sup*T:20):0;
  if(MP.sup){ L.praiaX=0; var r0=MP.main[MP.sup]; while(L.praiaX<r0.length&&r0.charAt(L.praiaX)==='#') L.praiaX++; L.praiaX*=T; } /* recife: a praia do começo, fora d'água */
  if(MP.sub){ var S=parse(MP.sub,{mundo:'sub'}); S.fase=f; S.cena=f.subCena||'sub_caverna'; S.modo=L.modo; S.superficie=f.modo==='nado'?20:0; S.sub=true; L.sub=S; }
  var todos=L.moradores.concat(L.sub?L.sub.moradores:[]);
  todos.forEach(function(m,i){ m.tipo=f.moradores[i%f.moradores.length]||'crier'; });
  L.todasEntradas=todos; L.totalArenas=todos.length;
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
