// Junta banco/*.json em ferramentas/CIE3_banco.js (fonte: banco/; nao editar o .js). Uso: node monta_banco.js
const fs=require('fs'),path=require('path');
const raiz=path.join(__dirname,'..'),dir=path.join(raiz,'banco'),out=path.join(raiz,'..','..','ferramentas','CIE3_banco.js');
let I=[];fs.readdirSync(dir).filter(f=>f.endsWith('.json')&&/^T/.test(f)).sort().forEach(f=>{I=I.concat(JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')));});
// lente fino do Paulo (02/11): so entra o que esta em banco/_lente.json (max. 100); o resto fica guardado em banco/*.json
{const lf=path.join(dir,'_lente.json');if(fs.existsSync(lf)){const k=new Set(Object.values(JSON.parse(fs.readFileSync(lf,'utf8'))).flat());I=I.filter(i=>k.has(i.id));}}
const vis=new Set();I.forEach(i=>{i.c=0;if(vis.has(i.id))throw new Error('id repetido '+i.id);vis.add(i.id);
 if(i.o.length!==i.o_pt.length)throw new Error('o_pt '+i.id);
 if(i.img&&!fs.existsSync(path.join(raiz,'..','..','ferramentas',i.img)))throw new Error('img '+i.id+' '+i.img);});
const T={position:{nome:'Position',nome_pt:'Posição',cor:'#f472b6',emoji:'📍'},directions:{nome:'Directions and maps',nome_pt:'Direções e mapas',cor:'#fb7185',emoji:'🧭'},perspective:{nome:'Changing perspective',nome_pt:'Mudando a perspectiva',cor:'#fbbf24',emoji:'👀'},forces:{nome:'Wind and water',nome_pt:'Vento e água',cor:'#38bdf8',emoji:'🌬️'},objects:{nome:'Movement of objects',nome_pt:'Movimento dos objetos',cor:'#a78bfa',emoji:'⚽'},animals:{nome:'Animals and body',nome_pt:'Animais e corpo',cor:'#34d399',emoji:'🐾'},pushpull:{nome:'Push or pull',nome_pt:'Empurrar ou puxar',cor:'#f97316',emoji:'💪'}};
fs.writeFileSync(out,`/* CIE3_banco.js — GERADO por trabalho/3tri_ciencias/gen/monta_banco.js a partir de banco/*.json. Não editar à mão. */
window.CIE3=(function(){var TEMAS=${JSON.stringify(T)};var ITENS=${JSON.stringify(I)};
function embaralha(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
return {TEMAS:TEMAS,ITENS:ITENS,POEMAS:{},doTema:function(k){return ITENS.filter(function(i){return i.tema===k;});},
sorteia:function(temas,n,tipo){if(typeof temas==='string')temas=[temas];var pool=ITENS.filter(function(i){return temas.indexOf(i.tema)>=0&&(!tipo||i.tipo===tipo);});return embaralha(pool).slice(0,n);}};})();
`);console.log('itens',I.length);
