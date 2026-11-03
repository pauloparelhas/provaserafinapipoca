// grep_tela.js — varredura ESTÁTICA: textos literais dos arquivos do jogo (fora de comentário) com nome velho.
// Identificador interno de uma palavra só em minúsculas ('tinta','cookie') é chave do motor e passa; texto com espaço ou maiúscula, não.
// Arte herdada e módulos A/B/C ficam com o testa_tela.py (tempo de execução).
const fs=require('fs'),path=require('path'); const D=process.argv[2];
const PROIB=/\b(conde|count scribble|tinta|ink|inkwell|fairy|godmother|castle|castelo|cookie|biscoito|rabisco|pip|lia|theo|bia|leo|p[aá]gina|p[aá]ginas|page|pages|tra[cç]a|detetive|detective|kingdom|reino)\b/i;
const ARQ=fs.readdirSync(D).filter(f=>/^CIE3_jogo.*\.(js|html)$/.test(f)&&!/arte[ABC]\.js|mapas|_arte\d?\.js$/.test(f)); let ruins=[];
ARQ.forEach(f=>{ let s=fs.readFileSync(path.join(D,f),'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*\/\/.*$/mg,''); if(f.endsWith('.html')) s=s.replace(/<!--[\s\S]*?-->/g,'');
  const re=/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g; let m; while((m=re.exec(s))){ const t=m[1]!==undefined?m[1]:m[2]; if(!PROIB.test(t)) continue; if(/^[a-z_]+$/.test(t)) continue; ruins.push(f+': '+t.slice(0,90)); } });
ruins=[...new Set(ruins)]; if(ruins.length){ console.log('GREP DA TELA REPROVADO ('+ruins.length+'):'); ruins.slice(0,40).forEach(x=>console.log('  '+x)); process.exit(1);} console.log('ok    grep estático: nenhum nome velho em '+ARQ.length+' arquivos');
