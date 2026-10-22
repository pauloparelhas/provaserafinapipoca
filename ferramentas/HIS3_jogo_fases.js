/* ============================================================
   HIS3_jogo_fases.js — as FASES do jogo de História (Detetives do
   Tempo), cada uma ligada aos átomos do roteiro que ela treina
   (campo `at` do HIS3_banco.js), e o parser que transforma a grade
   de tiles (HIS3_jogo_mapas.js) no objeto de nível.
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
  {id:1, nome:'Escola do Tempo', nome_pt:'Escola do Tempo', cena:'vila', tema:'todos', at:['S1','S2','S3','S4','S5','S6','S7','P4','F1','F10'], moradores:['lucia','lucia','lucia'],
   resumo:'A escola tem história: fontes da escola, documentos da vida escolar, o que mudou e o que continuou.', resumo_pt:'A escola tem história: fontes da escola, documentos da vida escolar, o que mudou e o que continuou.'},
  {id:2, nome:'Casa da Vovó', nome_pt:'Casa da Vovó', cena:'casa', subCena:'sub_arquivo', tema:'todos', at:['F2','F3','F4','F5','F6','F7','F8','F9','F12','M1','B6','B7'], moradores:['vovo','vovo','vovo'],
   resumo:'Suba até o sótão: as 4 cartas de fonte (oral, escrita, visual e material) e as fotos da família.', resumo_pt:'Suba até o sótão: as 4 cartas de fonte (oral, escrita, visual e material) e as fotos da família.'},
  {id:3, nome:'Corrida do Correio', nome_pt:'Corrida do Correio', cena:'pista', modo:'corrida', tema:'todos', at:['P3','P10','P8','P2','P1','P9','P14'], moradores:['francisco','francisco','francisco'],
   resumo:'Seu Francisco, o carteiro: a pé, de bicicleta, de moto e hoje. Profissões que mudaram e que sumiram.', resumo_pt:'Seu Francisco, o carteiro: a pé, de bicicleta, de moto e hoje. Profissões que mudaram e que sumiram.'},
  {id:4, nome:'Fazenda do Seu Pedro', nome_pt:'Fazenda do Seu Pedro', cena:'bosque', tema:'todos', at:['P5','M2','P12','P11','P13'], moradores:['pedro','pedro','pedro'],
   resumo:'Do arado puxado por bois ao trator e ao celular. Nômades, agricultura e as primeiras cidades.', resumo_pt:'Do arado puxado por bois ao trator e ao celular. Nômades, agricultura e as primeiras cidades.'},
  {id:5, nome:'Rios Antigos', nome_pt:'Rios Antigos', cena:'recife', modo:'nado', tema:'todos', at:['M3','M4','M1','M5','F11'], moradores:['clio','clio','clio'],
   resumo:'Nilo, Tigre e Eufrates, Rio Amarelo: as cidades antigas nasceram perto dos rios. Patrimônio material e imaterial.', resumo_pt:'Nilo, Tigre e Eufrates, Rio Amarelo: as cidades antigas nasceram perto dos rios. Patrimônio material e imaterial.'},
  {id:6, nome:'Cidade em Construção', nome_pt:'Cidade em Construção', cena:'ginasio', tema:'todos', at:['P6','P7','P8','P9','P1','P11'], moradores:['joao','engenheira','fotografo'],
   resumo:'Doutor João, a engenheira e o fotógrafo: ferramentas de antes e de hoje.', resumo_pt:'Doutor João, a engenheira e o fotógrafo: ferramentas de antes e de hoje.'},
  {id:7, nome:'Estádio da Feira das Profissões', nome_pt:'Estádio da Feira das Profissões', cena:'estadio', tema:'todos', at:['F6','F2','F3','F4','F5','S5','P1','P2'], moradores:['locutor','locutor','locutor'],
   resumo:'Chute para o canto certo: que tipo de fonte é? Mudou ou continuou igual?', resumo_pt:'Chute para o canto certo: que tipo de fonte é? Mudou ou continuou igual?'},
  {id:8, nome:'Trilha da Linha do Tempo', nome_pt:'Trilha da Linha do Tempo', cena:'biscoito', tema:'todos', at:['B1','B2','B3','B4','B5','I1','I2','I3','I4','I5'], moradores:['tic','tic','tic'],
   resumo:'Recolha os registros na ordem do tempo. Quem fez a fonte, e por quê? Cada um vê de um jeito.', resumo_pt:'Recolha os registros na ordem do tempo. Quem fez a fonte, e por quê? Cada um vê de um jeito.'},
  {id:9, nome:'Museu da Memória', nome_pt:'Museu da Memória', cena:'tinta', tema:'todos', chefao:true, moradores:[],
   resumo:'A Rainha Traça está roendo as pistas do passado! Salve o museu.', resumo_pt:'A Rainha Traça está roendo as pistas do passado! Salve o museu.'}
];
/* a PISTA que cada fase devolve ao Museu da Memória (aparece no fim da fase: o fio da história) */
var FINS={1:'A escola guardou as suas fontes: fotos de turma, cadernos, boletins e troféus contam a história dela.',2:'A Vovó contou, a carta foi escrita, a foto se vê e o brinquedo se toca: oral, escrita, visual e material!',3:'Seu Francisco entregou a última carta: a profissão de carteiro mudou, mas continua existindo.',4:'Seu Pedro trocou os bois pelo trator, mas continua amando a terra.',5:'As cidades mais antigas nasceram abraçadas aos rios: Nilo, Tigre e Eufrates, Rio Amarelo.',6:'Ferramentas mudaram; o cuidado com as pessoas continuou.',7:'Cada fonte no seu canto: oral, escrita, visual e material. Golaço!',8:'Jornal, carta, diário, álbum, foto digital, redes sociais: a linha do tempo está completa!'};
LISTA.forEach(function(f){ if(FINS[f.id]){ f.fim=FINS[f.id]; f.fim_pt=FINS[f.id]; } });
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
      case '*': L.itens.push({x:x+T/2,y:y+T/2,tipo:'poder',pego:false}); break; /* o PODER do reino (HIS3_jogo_poderes.js) */
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
