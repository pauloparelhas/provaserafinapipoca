// Paulo 03/11: enunciado sem textao (a lista de palavras ja sao as alternativas; a figura ja mostra a cena).
const fs=require('fs'),path=require('path');const dir=path.join(__dirname,'..','banco');
const N={p17:['Not right or wrong: they just have a different ___ of things.','Nem certo nem errado: elas só têm uma ___ diferente das coisas.'],
 p18:['The giraffe is up high. The woman is down low. Why do they see differently?','A girafa está no alto. A mulher está embaixo. Por que veem diferente?'],
 f04:['A girl moves a door away from her. Push or pull?','Uma menina leva a porta para longe dela. Empurrar ou puxar?'],
 x08:['There is a racket ___ the bag.','Tem uma raquete ___ a mochila.'],
 x09:['There is a trophy ___ the books.','Tem um troféu ___ os livros.'],
 x10:['There is a window ___ the sofa.','Tem uma janela ___ o sofá.']};
let n=0;for(const f of fs.readdirSync(dir).filter(f=>/^T.*\.json$/.test(f))){const p=path.join(dir,f),a=JSON.parse(fs.readFileSync(p,'utf8'));let m=0;
 a.forEach(i=>{if(N[i.id]){i.p=N[i.id][0];i.p_pt=N[i.id][1];m++;n++;}});if(m)fs.writeFileSync(p,JSON.stringify(a,null,1)+'\n');}
if(n!==6)throw new Error('achou '+n);console.log('ok',n);
