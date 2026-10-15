// verifica_ing3.js — PORTÃO dos mapas do The Lost Endings (fork do verificador do WiseBear).
// Herói GRANDE (110 px = 3 tiles de altura livre) em todo o caminho; cada morador (Q), o
// livro do fim (F) e as moedas têm de ser alcançáveis andando/pulando desde o início (U).
// Reinos de nado/voo (movimento livre) e de modo próprio (corrida, estádio) ficam de fora.
// Uso: node verifica_ing3.js <pasta ferramentas>   (sai com 1 se houver falha)
// Parâmetros conservadores em relação à física real (pulo 152 px = 3,4 tiles; alcance 216 px = 4,8 tiles).
const fs=require('fs'), path=require('path');
const DIR=process.argv[2];
global.window={};
eval(fs.readFileSync(path.join(DIR,'ING3_jogo_mapas.js'),'utf8'));
eval(fs.readFileSync(path.join(DIR,'ING3_jogo_fases.js'),'utf8'));
const F=window.FASES, MAPAS=window.MAPAS;

function blocking(ch){ return ch==='#'||ch==='B'||ch==='?'||ch==='M'||(ch>='1'&&ch<='4'); }
function support(ch){ return blocking(ch)||ch==='='||ch==='f'||ch==='S'||ch==='h'||ch==='L'||ch==='t'||ch==='u'||ch==='V'; } /* v2: trave, blocos do ritmo, salto; '%' (parede) não bloqueia: a estrela quebra */

function fechaTravas(rows){ const h=rows.length; const g=rows.map(r=>r.split('')); for(let r=0;r<h;r++) for(let c=0;c<g[r].length;c++){ const ch=rows[r][c]; if(ch==='G'||ch==='X'){ for(let k=0;k<8;k++){ const rr=r-k; if(rr>=0) g[rr][c]='#'; } } } return g.map(a=>a.join('')); }
function analisa(rows, nome){
  const h=rows.length, w=Math.max(...rows.map(s=>s.length));
  rows=rows.map(s=>(s+' '.repeat(w)).slice(0,w));
  const at=(c,r)=>(r<0||r>=h||c<0||c>=w)?' ':rows[r][c];
  // cobertura de plataformas móveis
  const mov=new Set();
  for(let r=0;r<h;r++) for(let c=0;c<w;c++){
    if(at(c,r)==='m') for(let k=0;k<8;k++) mov.add((c+k)+','+r);
    if(at(c,r)==='n') for(let k=0;k<2;k++) for(let d=0;d<=4;d++) mov.add((c+k)+','+(r-d));
    if(at(c,r)==='N') for(let k=0;k<2;k++) for(let d=0;d<=8;d++) mov.add((c+k)+','+(r-d));
  }
  /* v2: cipó (l), argola (R) e barra (X) viram pontos de apoio virtuais onde o herói fica pendurado */
  const virt=new Set();
  for(let r=0;r<h;r++) for(let c=0;c<w;c++){ const ch=at(c,r); if(ch==='l') virt.add(c+','+(r+5)); if(ch==='R') virt.add(c+','+(r+4)); if(ch==='X') virt.add(c+','+(r+2)); }
  const sup=(c,r)=>support(at(c,r))||mov.has(c+','+r);
  const stand=(c,r)=>{ if(c<0||c>=w||r<2||r>=h) return false; if(virt.has(c+','+r)) return true; if(!sup(c,r)) return false; if(blocking(at(c,r-1))||blocking(at(c,r-2))||blocking(at(c,r-3))) return false; /* herói grande: 3 linhas */ if(at(c,r-1)==='^') return false; return true; };
  return {rows,h,w,at,stand,sup,virt};
}

function bfs(worlds, startKey){
  // worlds: {main:{A}, sub:{A}}; nodes "world:c,r"
  const seen=new Set([startKey]); const fila=[startKey]; const pipes={};
  // índice de canos: digito -> {world:[c,r]}
  for(const wn in worlds){ const A=worlds[wn]; for(let r=0;r<A.h;r++) for(let c=0;c<A.w;c++){ const ch=A.at(c,r); if(ch>='1'&&ch<='4' && A.at(c-1,r)!==ch){ pipes[ch]=pipes[ch]||{}; pipes[ch][wn]=[c,r]; } } }
  while(fila.length){
    const k=fila.shift(); const [wn,cr]=k.split(':'); const [c,r]=cr.split(',').map(Number); const A=worlds[wn];
    const push=(w2,c2,r2)=>{ const kk=w2+':'+c2+','+r2; if(!seen.has(kk)){ seen.add(kk); fila.push(kk); } };
    // andar
    for(const dc of [-1,1]) if(A.stand(c+dc,r)) push(wn,c+dc,r);
    // pulo (com mola: mais alto)
    const mola = A.at(c,r-1)==='S' || A.at(c,r)==='S' || A.at(c,r)==='V' || A.at(c,r-1)==='V';
    const balanco = A.virt.has(c+','+r); /* soltar do cipó/argola/barra: voa mais longe */
    const headFree1=!blocking(A.at(c,r-4)), headFree2=headFree1&&!blocking(A.at(c,r-5));
    for(let r2=r-(mola?8:3); r2<=Math.min(A.h-1,r+9); r2++){
      const up=r-r2; let maxdc;
      if(up>=7) maxdc=3; else if(up>=4) maxdc=4; else if(up===3) maxdc=2; else if(up===2) maxdc=3; else if(up>=0) maxdc=4; else maxdc=5;
      if(balanco) maxdc+=3; if(A.at(c,r)==='V'||A.at(c,r-1)==='V') maxdc+=4;
      if(up>=1 && !headFree1) continue; if(up>=2 && !headFree2) continue;
      for(let c2=c-maxdc;c2<=c+maxdc;c2++){ if(c2===c&&r2===r) continue; if(!A.stand(c2,r2)) continue;
        /* colunas intermediárias: parede contínua de 4+ linhas a partir do nível do apoio (8+ com mola) bloqueia o pulo */
        let livre=true; const topoMax=mola?8:4, rb=Math.min(r,r2);
        for(let cc=Math.min(c,c2)+1; cc<Math.max(c,c2); cc++){ let alt=0; for(let rr=r-1; rr>=r-topoMax; rr--){ if(rr<0||blocking(A.at(cc,rr))) alt++; else break; } if(alt>=topoMax){ livre=false; break; } }
        if(livre) push(wn,c2,r2); }
    }
    // cano: em cima do cano (digito na linha r, coluna c ou c-1)
    const ch=A.at(c,r); if(ch>='1'&&ch<='4'){ const par=pipes[ch]; for(const w2 in par){ if(w2===wn) continue; const [pc,pr]=par[w2]; push(w2,pc,pr); } }
  }
  return seen;
}

let falhas=0;
function testaFase(f, rows, subRows, nome){
  const worlds={main:analisa(rows,'main')}; if(subRows) worlds.sub=analisa(subRows,'sub');
  // início
  let start=null; const A=worlds.main; for(let r=0;r<A.h;r++) for(let c=0;c<A.w;c++) if(A.at(c,r)==='U') start='main:'+c+','+(r+1);
  if(!start){ console.log(nome,'SEM U'); falhas++; return; }
  const seen=bfs(worlds,start);
  const problemas=[]; let caixas=0, ok=0;
  for(const wn in worlds){ const W=worlds[wn];
    for(let r=0;r<W.h;r++) for(let c=0;c<W.w;c++){ const ch=W.at(c,r);
      if(ch==='?'||ch==='M'){ caixas++; let hit=false;
        for(let rf=r+3; rf<=r+6; rf++){ if(!seen.has(wn+':'+c+','+rf)) continue; let livre=true; for(let rr=r+1;rr<rf;rr++) if(blocking(W.at(c,rr))) livre=false; if(livre){ hit=true; break; } }
        if(hit) ok++; else problemas.push('caixa '+ch+' em '+wn+' col '+c+' lin '+r+' INALCANÇÁVEL');
      }
      if(ch==='Q'){ caixas++; if(seen.has(wn+':'+c+','+(r+1))) ok++; else problemas.push('morador Q em col '+c+' INALCANÇÁVEL'); }
      if(ch==='F'){ if(!seen.has(wn+':'+c+','+(r+1))&&!seen.has(wn+':'+(c-1)+','+(r+1))) problemas.push('MASTRO inalcançável'); }
      if(ch==='D'){ caixas++; if(seen.has(wn+':'+c+','+(r+1))) ok++; else problemas.push('porta D em '+wn+' col '+c+' lin '+r+' INALCANÇÁVEL'); }
      if(ch>='1'&&ch<='4' && W.at(c-1,r)!==ch){ if(!seen.has(wn+':'+c+','+r)&&!seen.has(wn+':'+(c+1)+','+r)) problemas.push('cano '+ch+' em '+wn+' col '+c+' inalcançável'); }
      if(ch==='o'||ch==='O'){ /* moedas: só informativo */ }
    }
  }
  // moedas alcançáveis (corpo 2 tiles acima do apoio, ou no caminho do pulo: até 3 tiles acima)
  let moedas=0, moedasOk=0;
  for(const wn in worlds){ const W=worlds[wn]; for(let r=0;r<W.h;r++) for(let c=0;c<W.w;c++){ const ch=W.at(c,r); if(ch!=='o'&&ch!=='O') continue; moedas++; let got=false; for(let rf=r+1; rf<=r+6; rf++){ for(const dc of [-1,0,1]) if(seen.has(wn+':'+(c+dc)+','+rf)) got=true; } if(got) moedasOk++; } }
  const larg=rows[0].length*45;
  console.log((problemas.length?'FALHA ':'ok    ')+nome.padEnd(30)+' moradores '+ok+'/'+caixas+'  moedas '+moedasOk+'/'+moedas+'  '+rows[0].length+' cols');
  problemas.forEach(p=>console.log('   - '+p)); if(problemas.length) falhas++;
  // linhas de tamanho igual?
  const ls=new Set(rows.map(s=>s.length)); if(ls.size>1){ console.log('   - linhas de tamanho desigual', [...ls]); }
}

F.LISTA.forEach(f=>{ if(f.chefao||f.modo) return; const mp=MAPAS[f.id]; if(!mp){ console.log('--    '+f.id+' '+f.nome+' (sem mapa)'); return; } testaFase(f, mp.main, mp.sub, f.id+' '+f.nome); });
if(process.argv[3]==='mapa'){ MAPAS[+process.argv[4]].main.forEach(s=>console.log(s)); }
if(process.argv[3]==='sub'){ MAPAS[+process.argv[4]].sub.forEach(s=>console.log(s)); }
console.log(falhas?('FALHAS: '+falhas):'TODAS AS FASES COMPLETÁVEIS');
process.exit(falhas?1:0);
