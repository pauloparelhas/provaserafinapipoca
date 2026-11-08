/* ============================================================
   GEO3_estudo_licoes.js — as 12 LIÇÕES da teoria de Geografia Y2,
   3º trimestre (prova ESCRITA em português, 12/11/2026).
   Unidade 3 (T1–T8): ruas, deslocamentos e transportes.
   Unidade 4 (T9–T12): meio ambiente, nossa casa maior.

   Fonte única: trabalho/3tri_geografia/_roteiro.md (cada tela aponta para
   um slide). Cores: trabalho/3tri_geografia/BIBLIA_GEO3.md.
   Tudo em português, sem bandeira e sem tradução.

   v2 (08/11, Paulo: "só faz sentido a oclusão nas palavras que a criança tem
   condições de adivinhar"; jogabilidade no nível do Inglês):
   - <b> comum = DESTAQUE colorido, sempre visível;
   - O('termo') = <b class="ocl">: hachurado SÓ quando dá para adivinhar na hora
     (a figura mostra, a frase/título entrega, ou acabou de aparecer);
     no máximo 1–2 por tela, até 3 palavras (decisão em avaliacao/oclusao_decisao.md);
   - mecânicas: texto · arrasta · revela (cartões com figura e pergunta) ·
     escolha (classificar item a item, com placar) · ordena · liga · pares
     (revisão da tela anterior); nunca 2 telas de texto seguidas;
   - fala: o que o botão de ouvir lê (curta, sem ler o que está hachurado);
   - sem lista de perguntas A/B/C na teoria (questões ficam no simulado);
     cada lição termina na tela "Na prova", com a resposta oculta.
   Figuras: recortes das figuras da escola em media/geo3/t_*.jpg.
   ============================================================ */
window.GEO3_LICOES = (function(){
'use strict';
function I(n){ return 'media/geo3/'+n+'.jpg'; }
function R(t){ return '<div class="regra">'+t+'</div>'; }
function O(t){ return '<b class="ocl">'+t+'</b>'; }
function caixa(t,corpo,cor){ return '<div class="caixa"'+(cor?' style="border-color:'+cor+'"':'')+'><h3'+(cor?' style="color:'+cor+'"':'')+'>'+t+'</h3>'+corpo+'</div>'; }
function esp(){ return '<div style="height:8px"></div>'; }
/* figura ao lado do texto (na tela larga) — encolhe até caber */
function lado(n,txt){ return '<div class="lado"><div class="lfig"><img src="'+I(n)+'" alt=""></div><div class="ltx">'+txt+'</div></div>'; }
/* grade de figuras com legenda: itens [figura, legenda] */
function grade(cols,itens,larga){
  return '<div class="grd'+(larga?' '+larga:'')+'" style="--g:'+cols+'">'+itens.map(function(i){
    return '<figure><img src="'+I(i[0])+'" alt="">'+i[1]+'</figure>';
  }).join('')+'</div>';
}
/* cartões dos biomas (cor do mapa da escola, U4 S8) */
var COR={amz:'#9ccc3c',cer:'#f06fae',caa:'#e8d44d',pam:'#f58b4c',pan:'#d9a3d4',mat:'#7cc0ea'};
var NOME={amz:'Amazônia',cer:'Cerrado',caa:'Caatinga',pam:'Pampa',pan:'Pantanal',mat:'Mata Atlântica'};
var ORD=['amz','cer','caa','pam','pan','mat'];
/* v4: com fotos = cartao do bioma com a foto da escola + faixa na cor do mapa (referencia aprovada Biomas.dc) */
var FOTO={amz:'t_amazonia',cer:'t_cerrado',caa:'t_caatinga',pam:'t_pampa',pan:'t_pantanal',mat:'t_mata'};
function bios(txt,so,fotos){ return '<div class="bios">'+(so||ORD).map(function(k){ var v=txt[k], ds=typeof v==='string'?[v]:v;
  return fotos?FXI(FOTO[k],NOME[k],ds,COR[k]).replace('class="fx fxi"','class="fx fxi fxb"'):FX(NOME[k],ds,{cor:COR[k],cl:'fxb'}); }).join('')+'</div>'; }
function cxBio(){ return ORD.map(function(k){ return {k:k,t:NOME[k],cor:COR[k]}; }); }
/* "Na prova": pergunta + resposta (oculta pela oclusão); f = figura opcional */
function P(pede,resp,f){
  return {pede:pede, q:pede+'<br>'+(resp.indexOf('<b')>=0?'<span class="resp">'+resp.replace(/<b>/g,'<b class="resp">')+'</span>':'<b class="resp">'+resp+'</b>'), f:f};
}
function naProva(itens){
  return '<p class="nptit">É assim que pode cair na prova.</p><ol class="naprova">'+itens.map(function(x,i){
    var q='<span class="npn">'+(i+1)+'.</span> '+x.q;
    return x.f?'<li class="npf"><img src="'+I(x.f)+'" alt=""><div>'+q+'</div></li>':'<li>'+q+'</li>';
  }).join('')+'</ol>';
}
/* ---------- v3 (08/11, Paulo: "tipo INFOGRÁFICO, não texto tosco"): cada tela de ensino é um infográfico ----------
   figura grande (recorte do material ou desenho SVG) + fichas curtas (RÓTULO forte + 1–4 palavras por chip),
   comparações lado a lado, sequências e ícones. Nada de parágrafo. Lacuna O(): no máximo 1 por tela, só quando
   a figura, a outra coluna ou a sequência entrega a resposta. Classe .rot = rótulo (não conta como leitura). */
function tc(h){ h=String(h).replace('#',''); if(h.length===3) h=h.split('').map(function(x){ return x+x; }).join('');
  var c=[0,2,4].map(function(i){ var v=parseInt(h.substr(i,2),16)/255; return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4); });
  var L=.2126*c[0]+.7152*c[1]+.0722*c[2]; return (1.05/(L+.05))>=((L+.05)/.0556)?'#fff':'#111'; }
var ICS={
 casa:'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6', predio:'M6 21V3h12v18M3 21h18M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2',
 alto:'M8 22V2h8v20M5 22h14M10 5h1M13 5h1M10 9h1M13 9h1M10 13h1M13 13h1M10 17h1M13 17h1',
 escola:'M2 9l10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5M22 9v6', praca:'M12 2a5 5 0 0 0-5 5c0 3 2 5 5 5s5-2 5-5a5 5 0 0 0-5-5zM12 12v9M4 21h16M6 17h4M6 17v4M10 17v4',
 igreja:'M12 1v5M10 3h4M6 21V11l6-5 6 5v10M3 21h18M10 21v-4h4v4', hospital:'M4 4h16v16H4zM12 8v8M8 12h8', farmacia:'M9 2h6v4H9zM6 6h12v15H6zM12 10v7M8.5 13.5h7',
 onibus:'M5 3h14a1 1 0 0 1 1 1v13H4V4a1 1 0 0 1 1-1zM4 11h16M7 20v-3M17 20v-3M7.5 14h.01M16.5 14h.01', loja:'M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18M9 20v-6h6v6',
 carro:'M3 16v-4l2-5h14l2 5v4zM7 16v3M17 16v3M3 12h18', bici:'M6 17m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M18 17m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M6 17l4-8h5l3 8M9 6h3',
 ape:'M13 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M10 21l2-6-2-3 1-4 3 3 3 1M8 12l2-4', moto:'M5 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M19 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M5 17h4l3-5h4l3 5M14 7h3l2 5',
 caminhao:'M2 6h12v10H2zM14 9h4l3 4v3h-7zM6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
 torre:'M12 2L7 22M12 2l5 20M8 8h8M6 14h12M9.5 14l2.5 8 2.5-8', arvore:'M12 2l6 9h-3l4 6H5l4-6H6zM12 17v5',
 sol:'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
 agua:'M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z', ar:'M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8',
 solo:'M2 17h20M4 21h3M10 21h4M17 21h3M12 17v-6M12 11c-3 0-5-2-5-5 3 0 5 2 5 5zM12 11c3 0 5-2 5-5-3 0-5 2-5 5z', pedra:'M3 19l2-7 5-4 7 2 4 6-2 3z',
 nuvem:'M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4 4 0 1 1 17 18z', chuva:'M7 14a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4 4 0 1 1 17 14zM8 17l-1 3M12 17l-1 3M16 17l-1 3',
 pata:'M12 13c-3 0-5 3-5 5 0 2 2 2 5 2s5 0 5-2c0-2-2-5-5-5zM5.5 11.5m-1.8 0a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0-3.6 0M18.5 11.5m-1.8 0a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0-3.6 0M9 7m-1.8 0a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0-3.6 0M15 7m-1.8 0a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0-3.6 0',
 folha:'M5 19c0-9 6-14 15-14 0 9-5 15-14 15zM5 19l8-8', pessoas:'M9 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 21v-1a6 6 0 0 1 12 0v1M17 8m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M16 14a5 5 0 0 1 6 5v2',
 pessoa:'M12 7m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M5 21v-1a7 7 0 0 1 14 0v1', rio:'M2 7c3-2 5 2 10 0s7 2 10 0M2 12c3-2 5 2 10 0s7 2 10 0M2 17c3-2 5 2 10 0s7 2 10 0',
 som:'M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12', lixo:'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6',
 enchente:'M3 10l9-6 9 6M6 8.5V13M18 8.5V13M2 16c3-2 5 2 10 0s7 2 10 0M2 20c3-2 5 2 10 0s7 2 10 0', fumaca:'M7 21h10M9 21v-8h6v8M5 10a3 3 0 0 1 3-3 4 4 0 0 1 7-1 3 3 0 1 1 3 4',
 termo:'M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0zM12 9v7', seco:'M12 21v-8M12 13c-2-2-5-2-7 0M12 13c2-3 5-3 7-1M3 21h18M7 21l2-3 1.5 3M14 21l1.5-3 2 3',
 toco:'M7 21v-9h10v9M5 21h14M7 12c0-2 10-2 10 0M10 15v3M14 14v4', coracao:'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z',
 mapa:'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14', celular:'M7 2h10v20H7zM11 18h2', papel:'M6 2h9l4 4v16H6zM14 2v5h5',
 olho:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', ideia:'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c1 1 1 2 1 3.5h6c0-1.5 0-2.5 1-3.5A6 6 0 0 0 12 3z',
 atencao:'M12 3l10 18H2zM12 10v5M12 18h.01', pin:'M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12zM12 10m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0',
 montanha:'M2 20l7-12 4 6 3-4 6 10z', escudo:'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z', fruta:'M12 7c-1-3-4-4-4-4M12 7c-4-2-8 1-8 6s3 9 6 9c1 0 1.5-.5 2-.5s1 .5 2 .5c3 0 6-4 6-9s-4-8-8-6z',
 trabalho:'M3 7h18v13H3zM8 7V4h8v3M3 12h18', bola:'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
 caixa:'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10', rampa:'M3 20h18L3 10z', estrada:'M8 21L10 3M16 21L14 3M12 5v2M12 10v2M12 15v2',
 check:'M5 12l5 5L20 7', xis:'M6 6l12 12M18 6L6 18', seta:'M5 12h14M13 6l6 6-6 6', cima:'M12 19V5M6 11l6-6 6 6', vira_d:'M7 20V11a3 3 0 0 1 3-3h9M15 4l4 4-4 4',
 vira_e:'M17 20V11a3 3 0 0 0-3-3H5M9 4L5 8l4 4', bandeira:'M5 21V4M5 4h12l-2 4 2 4H5', semaforo:'M8 2h8v20H8zM12 6m-1.6 0a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0M12 12m-1.6 0a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0M12 18m-1.6 0a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0',
 esq:'M19 12H5M11 6l-6 6 6 6', ciclo:'M6 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M18 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M6 17l3-7h6l3 7', ponto:'M7 3h10v7H7zM12 10v11M8 21h8'
};
function IC(k,cl){ if(String(k).charAt(0)==='<') return k; return '<svg class="ic'+(cl?' '+cl:'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ICS[k]+'"/></svg>'; }
/* ficha: RÓTULO (faixa de cor sólida, letra preta ou branca pelo contraste) + chips curtos */
function FX(rot,ds,o){ o=o||{};
  return '<div class="fx'+(o.cl?' '+o.cl:'')+'"'+(o.cor?' style="--fc:'+o.cor+';--ft:'+tc(o.cor)+'"':'')+'><b class="fx-rot rot">'+(o.ic?IC(o.ic):'')+'<span>'+rot+'</span></b>'+
    (ds&&ds.length?'<div class="fx-ds">'+ds.map(function(d){ return '<span class="fx-d">'+d+'</span>'; }).join('')+'</div>':'')+'</div>'; }
/* infográfico: figura grande (nome do recorte ou SVG) + coluna de fichas */
function IG(fig,corpo,cl){ return '<div class="ig'+(fig?' comfig':'')+(cl?' '+cl:'')+'">'+(fig?'<div class="ig-fig">'+(fig.charAt(0)==='<'?fig:'<img src="'+I(fig)+'" alt="">')+'</div>':'')+'<div class="ig-tx">'+corpo+'</div></div>'; }
function FXS(fs,cl){ return '<div class="fxs'+(cl?' '+cl:'')+'">'+fs.join('')+'</div>'; }
/* comparação lado a lado: c = {img, rot, cor, cap, ds, ic} */
function VC(c){ return '<div class="vs-c fx" style="--fc:'+c.cor+';--ft:'+tc(c.cor)+'">'+(c.img?'<img src="'+I(c.img)+'" alt="">':'')+
  '<b class="fx-rot rot">'+(c.ic?IC(c.ic):'')+'<span>'+c.rot+'</span></b>'+(c.cap?'<span class="vs-cap">'+c.cap+'</span>':'')+
  (c.ds&&c.ds.length?'<div class="fx-ds">'+c.ds.map(function(d){ return '<span class="fx-d">'+d+'</span>'; }).join('')+'</div>':'')+'</div>'; }
function VS(a,b,cl){ return '<div class="vs'+(cl?' '+cl:'')+'">'+VC(a)+'<span class="vs-x" aria-hidden="true">×</span>'+VC(b)+'</div>'; }
/* ícone + nome (rótulo) */
function TL(k,rot,cor){ return '<span class="tl"'+(cor?' style="--fc:'+cor+'"':'')+'>'+IC(k)+'<span class="rot">'+rot+'</span></span>'; }
function TLS(ts,cl){ return '<div class="tls'+(cl?' '+cl:'')+'">'+ts.join('')+'</div>'; }
/* sequência com setas: itens já em HTML */
function SEQ(its,cl){ return '<div class="seq'+(cl?' '+cl:'')+'">'+its.join('<span class="sqa" aria-hidden="true">'+IC('seta')+'</span>')+'</div>'; }
function SQ(html,cor){ return '<div class="sq"'+(cor?' style="--fc:'+cor+';--ft:'+tc(cor)+'"':'')+'>'+html+'</div>'; }
/* ficha com ícone + nome (rótulos) e, se houver, chips de detalhe */
function FXT(rot,tls,ds,o){ o=o||{}; return '<div class="fx fxt'+(o.cl?' '+o.cl:'')+'"'+(o.cor?' style="--fc:'+o.cor+';--ft:'+tc(o.cor)+'"':'')+'><b class="fx-rot rot">'+(o.ic?IC(o.ic):'')+'<span>'+rot+'</span></b>'+TLS(tls)+
  (ds&&ds.length?'<div class="fx-ds">'+ds.map(function(d){ return '<span class="fx-d">'+d+'</span>'; }).join('')+'</div>':'')+'</div>'; }
/* ficha com foto à esquerda (cartazes dos biomas) */
function FXI(img,rot,ds,cor){ return '<div class="fx fxi" style="--fc:'+cor+';--ft:'+tc(cor)+'"><img src="'+I(img)+'" alt=""><div class="fxi-c"><b class="fx-rot rot"><span>'+rot+'</span></b><div class="fx-ds">'+ds.map(function(d){ return '<span class="fx-d">'+d+'</span>'; }).join('')+'</div></div></div>'; }
/* foto com nome (rótulo) e detalhe curto */
function FOT(img,rot,det,cor){ return '<figure class="fot"'+(cor?' style="--fc:'+cor+';--ft:'+tc(cor)+'"':'')+'><img src="'+I(img)+'" alt=""><figcaption>'+(det?'<span class="fot-d">'+det+'</span>':'')+'<b class="rot fot-r">'+rot+'</b></figcaption></figure>'; }
function FOTS(fs,cl){ return '<div class="fots'+(cl?' '+cl:'')+'">'+fs.join('')+'</div>'; }
/* um dentro do outro: casa ⊂ rua ⊂ bairro ⊂ cidade */
function NINHO(){ var n=[['cidade','#f97316'],['bairro','#a855f7'],['rua','#0ea5e9'],['casa','#22c55e']], h='';
  for(var i=n.length-1;i>=0;i--) h='<div class="nn" style="--fc:'+n[i][1]+';--ft:'+tc(n[i][1])+'"><b class="rot nn-r">'+n[i][0]+'</b>'+h+'</div>';
  return '<div class="ninho ig-svg">'+h+'</div>'; }
/* sinal de pedestre com o bonequinho verde */
var SEMV='<svg class="ic sv" viewBox="0 0 20 28" aria-hidden="true"><rect width="20" height="28" rx="4" fill="#1f2937"/><circle cx="10" cy="6.5" r="2.6" fill="#22c55e"/><path d="M10 10v7l-3 7M10 17l3 7M10 11l-4 4M10 11l4 4" stroke="#22c55e" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>';
var CORIDA='<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 11l10-8 10 8z" fill="#ef4444"/><rect x="4" y="11" width="8" height="10" fill="#facc15"/><rect x="12" y="11" width="8" height="10" fill="#3b82f6"/><rect x="9" y="15" width="6" height="6" fill="#22c55e"/></svg>';
function TEX(k){ var c={par:['#a8a29e','#78716c'],blo:['#94a3b8','#475569'],ter:['#d6a46b','#a16207'],asf:['#334155','#0f172a']}[k], g='';
  if(k==='par') g='<g fill="'+c[1]+'"><rect x="1" y="1" width="10" height="6" rx="2"/><rect x="13" y="1" width="10" height="6" rx="2"/><rect x="-4" y="9" width="10" height="6" rx="2"/><rect x="8" y="9" width="10" height="6" rx="2"/><rect x="20" y="9" width="10" height="6" rx="2"/><rect x="1" y="17" width="10" height="6" rx="2"/><rect x="13" y="17" width="10" height="6" rx="2"/></g>';
  if(k==='blo') g='<path d="M0 6h6l3 3 3-3h6l3 3h3M0 15h3l3 3h6l3-3h6l3 3M6 6v9M18 6v9M12 15v9M12 0v6" stroke="'+c[1]+'" stroke-width="1.6" fill="none"/>';
  if(k==='ter') g='<g fill="'+c[1]+'"><circle cx="5" cy="6" r="1.4"/><circle cx="15" cy="4" r="1"/><circle cx="19" cy="12" r="1.5"/><circle cx="8" cy="15" r="1.1"/><circle cx="14" cy="19" r="1.4"/><circle cx="4" cy="20" r="1"/></g>';
  if(k==='asf') g='<path d="M12 2v5M12 10v5M12 18v5" stroke="#fde047" stroke-width="2.4"/>';
  return '<svg class="ic tex" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="'+c[0]+'"/>'+g+'</svg>'; }
/* rua larga × estreita, vista de cima */
function LARG(k){ var w=k==='larga'?26:9, x=(32-w)/2; return '<svg class="ic via" viewBox="0 0 32 24" aria-hidden="true"><rect x="0" y="0" width="32" height="24" rx="4" fill="#86efac"/><rect x="'+x+'" y="0" width="'+w+'" height="24" fill="#475569"/><path d="M16 2v4M16 10v4M16 18v4" stroke="#fde047" stroke-width="2"/></svg>'; }
/* o boneco de costas (como na figura do material) e as 4 direções */
/* v4 (08/11, Paulo): nada de boneco inventado. A figura da ESCOLA (U3 S4: o menino de costas olhando
   para a esquerda e para a direita) no centro, grande, e as 4 setas desenhadas em volta dela com rotulo forte. */
function DIRS(){
  function seta(cl,rot,d,vb){ return '<span class="d2-s '+cl+'" aria-hidden="true"><svg viewBox="'+vb+'"><path d="'+d+'" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="rot">'+rot+'</span></span>'; }
  var fig='<div class="d2-g"><img src="'+I('t_olhar')+'" alt="Menino de costas olhando para a esquerda e para a direita antes de atravessar">'+
    seta('sf','frente','M22 48V8M8 22L22 8l14 14','0 0 44 52')+seta('sa','atrás','M22 4v40M8 30l14 14 14-14','0 0 44 52')+
    seta('se','esquerda','M52 22H8M22 8L8 22l14 14','0 0 56 44')+seta('sd','direita','M4 22h44M34 8l14 14-14 14','0 0 56 44')+'</div>';
  function d(cl,rot,cor,ic,det){ return '<div class="'+cl+'">'+FX(rot,[det],{cor:cor,ic:ic})+'</div>'; }
  return '<div class="dirs2">'+d('d2-f','Frente','#16a34a','cima','para onde <b>queremos ir</b>')+d('d2-e','Esquerda','#ea580c','esq','lado da mão <b>esquerda</b>')+
    fig+d('d2-d','Direita','#2563eb','seta','lado da mão <b>direita</b>')+d('d2-a','Atrás','#9333ea',null,'por onde <b>já passamos</b>')+'</div>';
}
var NP='Na prova';
/* a tela "Na prova" fala só as perguntas: a resposta continua escondida */
function NPT(itens,tit){ return {tipo:'texto', tit:tit||NP, html:naProva(itens), fala:'É assim que pode cair na prova. '+itens.map(function(x,i){ return (i+1)+'. '+x.pede; }).join(' ')}; }
var REV='Toque em cada frase para ver o pedaço que falta.';

var LS=[

/* ===================== UNIDADE 3 ===================== */

/* T1. O espaço urbano (U3 S3, S4) */
{k:'urbano', tema:'urbano', unid:3, nome:'O espaço urbano', curto:'O espaço urbano', capa:'t_cidade', cor:'#0ea5e9', treino:[], telas:[
 {tipo:'texto', tit:'A cidade',
  fala:'A cidade, o espaço urbano. Olhe a foto: é onde vivem… quem? Tem ruas, casas, comércios, escolas e prédios. É feita de caminhos, sons e movimentos. E se organiza a partir de ruas e bairros.',
  html:IG('t_cidade', FX('Cidade = espaço urbano',['onde vivem '+O('muitas pessoas')],{ic:'pessoas'})+
   FXT('Tem',[TL('estrada','ruas'),TL('casa','casas'),TL('loja','comércios'),TL('escola','escolas'),TL('predio','prédios')])+
   FXS([FX('É feita de',['caminhos','sons','movimentos']),FX('Se organiza a partir de',['<b>ruas</b>','<b>bairros</b>'])],'g2'))},
 {tipo:'revela', tit:'Palavras da cidade', cols:4, regra:'Vire cada cartão para ver o que a palavra quer dizer.', q:'O que é?',
  fala:'Palavras da cidade. Vire cada cartão: deslocamento, rua, bairro e sinalização.',
  cartoes:[
   {n:'Deslocamento', img:'t_cidade', b:'A pessoa se <b>movimenta</b> de um lugar para outro: a pé, de bicicleta, de carro, de ônibus.'},
   {n:'Rua', img:'t_residencial', b:'Via por onde as <b>pessoas</b> e os <b>veículos</b> se deslocam. Pode ter calçada, asfalto e sinalização.'},
   {n:'Bairro', img:'t_bairro_sb', b:'Parte de uma <b>cidade</b> onde vivem várias pessoas. Tem casas, ruas e comércios.'},
   {n:'Sinalização', img:'t_faixa', b:'<b>Placas, faixas</b> ou <b>sinais</b> que ajudam as pessoas a <b>se orientar</b> nas ruas.'}]},
 {tipo:'arrasta', tit:'Qual é a palavra?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: a pessoa se movimenta de um lugar para outro.'},{k:'k1',frase:'___: via por onde as pessoas e os veículos se deslocam.'},{k:'k2',frase:'___: parte de uma cidade onde vivem várias pessoas.'},{k:'k3',frase:'___: placas, faixas e sinais que ajudam a se orientar.'},{k:'k4',frase:'A ___ é o lugar onde vivem muitas pessoas.'}],
  itens:[{c:'k0',t:'Deslocamento'},{c:'k1',t:'Rua'},{c:'k2',t:'Bairro'},{c:'k3',t:'Sinalização'},{c:'k4',t:'cidade'}]},
 {tipo:'escolha', tit:'Deslocamento ou sinalização?', pergunta:'É um jeito de se deslocar ou é sinalização?',
  fala:'Deslocamento ou sinalização? Toque na resposta certa.', op:['Deslocamento','Sinalização'], itens:[
   {m:'a pé', c:'Deslocamento', d:'Ir a pé é um jeito de se deslocar.'},
   {m:'de bicicleta', c:'Deslocamento', d:'Ir de bicicleta é um jeito de se deslocar.'},
   {m:'de carro', c:'Deslocamento', d:'Ir de carro é um jeito de se deslocar.'},
   {m:'de ônibus', c:'Deslocamento', d:'Ir de ônibus é um jeito de se deslocar.'},
   {m:'placas', c:'Sinalização', d:'Placas são sinalização: ajudam a se orientar nas ruas.'},
   {m:'faixas', c:'Sinalização', d:'Faixas são sinalização: ajudam a se orientar nas ruas.'},
   {m:'sinais', c:'Sinalização', d:'Sinais são sinalização: ajudam a se orientar nas ruas.'}]},
 {tipo:'arrasta', tit:'O que a rua pode ter?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'A rua pode ter ___, asfalto e sinalização.'},{k:'k1',frase:'A rua pode ter calçada, ___ e sinalização.'},{k:'k2',frase:'A rua pode ter calçada, asfalto e ___.'}],
  itens:[{c:'k0',t:'calçada'},{c:'k1',t:'asfalto'},{c:'k2',t:'sinalização'}]},
 NPT([
   P('O que é deslocamento?','a pessoa se <b>movimenta</b> de um lugar para outro'),
   P('Cite dois jeitos de se deslocar.','<b>a pé</b>, de <b>bicicleta</b>, de <b>carro</b>, de <b>ônibus</b>'),
   P('Complete: a rua pode ter calçada, asfalto e ___.','sinalização'),
   P('Para que serve a sinalização?','para ajudar as pessoas a <b>se orientar</b>')])
]},

/* T2. Segurança e sinalização para atravessar (U3 S3, S4, S30) */
{k:'sinal', tema:'sinal', unid:3, nome:'Atravessar com segurança', curto:'Atravessar a rua', capa:'t_faixa', cor:'#ef4444', treino:[], telas:[
 {tipo:'texto', tit:'Na hora de atravessar',
  fala:'Na hora de atravessar. Um: sempre na faixa de pedestre. Dois: quando o sinal para o pedestre estiver… olhe a cor do bonequinho! Três: mesmo com o sinal de pedestre, olhe para a esquerda e para a direita.',
  html:IG('t_faixa', FX('1 · Onde?',['sempre na <b>faixa de pedestre</b>'],{ic:'pin'})+
   FX('2 · Quando?',[SEMV+'sinal '+O('verde')+' para o pedestre'],{ic:'semaforo'})+
   FX('3 · Mesmo com o sinal, olhe',[IC('esq')+'<b>esquerda</b>','<b>direita</b>'+IC('seta')],{ic:'olho'}))},
 {tipo:'liga', tit:'Ligue as duas partes', regra:'Toque no começo da frase e depois no fim dela.',
  fala:'Ligue as duas partes. Toque no começo da frase e depois no fim dela.',
  pares:[['Atravesse a rua','sempre na faixa de pedestre.'],['Atravesse quando o sinal','estiver verde para o pedestre.'],['Mesmo com o sinal de pedestre,','olhe para a esquerda e para a direita.']]},
 {tipo:'texto', tit:'Ruas seguras',
  fala:'Ruas seguras: sinalizadas e com faixas de pedestre. A cidade precisa de ruas, calçadas, ciclovias, pontos de ônibus e sinais, para todos andarem com segurança. Saber se localizar ajuda a andar com segurança e a ajudar outras pessoas.',
  html:IG('t_olhar', FX('Ruas seguras',['<b>sinalizadas</b>','com <b>faixas de pedestre</b>'],{ic:'escudo'})+
   FXT('A cidade precisa de',[TL('estrada','ruas'),TL('ape','calçadas'),TL('ciclo','ciclovias'),TL('ponto','pontos de ônibus'),TL('semaforo','sinais')],['para todos andarem com <b>segurança</b>'])+
   FX('Saber se localizar ajuda a',['andar com segurança','<b>ajudar outras pessoas</b>'],{ic:'pin'}))},
 {tipo:'pares', tit:'Lembra das ruas seguras?', regra:REV,
  fala:'Lembra das ruas seguras? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Ruas seguras são as ___ e com faixas de pedestre.','sinalizadas'],['A cidade precisa de sinais para todos andarem com ___.','segurança'],['Saber se localizar ajuda a andar com segurança e a ___.','ajudar outras pessoas']]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_faixa', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Atravesse sempre na ___ de pedestre.'},{k:'k1',frase:'Atravesse quando o sinal estiver ___ para o pedestre.'},{k:'k2',frase:'Antes de atravessar, olhe para os ___ lados.'},{k:'k3',frase:'Ruas seguras são as ___ e com faixas de pedestre.'}],
  itens:[{c:'k0',t:'faixa'},{c:'k1',t:'verde'},{c:'k2',t:'dois'},{c:'k3',t:'sinalizadas'}]},
 NPT([
   P('Onde devemos atravessar a rua?','na <b>faixa de pedestre</b>','t_faixa'),
   P('O sinal de pedestre deve estar de que cor para atravessar?','<b>verde</b>'),
   P('Para que lados olhamos antes de atravessar?','para a <b>esquerda</b> e para a <b>direita</b>'),
   P('Quais ruas são seguras?','as <b>sinalizadas</b> e com <b>faixas de pedestre</b>')])
]},

/* T3. Direções — as "palavras especiais" (U3 S3, S4, S19, S25) */
{k:'direcoes', tema:'direcoes', unid:3, nome:'As palavras especiais', curto:'Frente, atrás, lados', capa:'t_olhar', cor:'#f59e0b', treino:[], telas:[
 {tipo:'texto', tit:'Para se orientar',
  fala:'Para se orientar. Frente: para onde queremos ir. Atrás: por onde já passamos. Direita: o lado da mão direita. Esquerda: o lado da mão esquerda.',
  html:DIRS()},
 {tipo:'arrasta', tit:'Para onde aponta?', cols:2, regra:'Arraste cada palavra para a sua seta.',
  caixas:[{k:'f',t:'<span class="seta-dir" aria-label="para cima">&#8679;</span>'},{k:'a',t:'<span class="seta-dir" aria-label="para baixo">&#8681;</span>'},{k:'d',t:'<span class="seta-dir" aria-label="para a direita">&#8680;</span>'},{k:'e',t:'<span class="seta-dir" aria-label="para a esquerda">&#8678;</span>'}],
  itens:[{c:'f',t:'em frente'},{c:'a',t:'atrás'},{c:'d',t:'direita'},{c:'e',t:'esquerda'}]},
 {tipo:'texto', tit:'Descrever o caminho',
  fala:'Descrever o caminho. As direções ajudam a descrever o caminho. Um exemplo: siga em frente por 200 metros, vire à direita na próxima esquina, ande mais um quarteirão, vire à esquerda e você chegará ao seu destino.',
  html:IG('t_mapa_cel', FX('As direções ajudam a',['<b>descrever o caminho</b>'],{ic:'mapa'})+
   FX('Um exemplo',[IC('cima')+'<b>frente</b>: 200 metros',IC('vira_d')+'<b>direita</b>: próxima esquina',IC('cima')+'mais um quarteirão',IC('vira_e')+'<b>esquerda</b>',IC('bandeira')+'destino!'],{ic:'ape',cl:'passos'}))},
 {tipo:'ordena', tit:'O caminho, passo a passo', linha:true, regra:'Toque nos passos do exemplo, na ordem.',
  fala:'O caminho, passo a passo. Toque nos passos do exemplo, na ordem.',
  fimMsg:'Muito bem! Esse é o caminho do exemplo.',
  quadros:[{cap:'Siga em <b>frente</b> por 200 metros.'},{cap:'Vire à <b>direita</b> na próxima esquina.'},{cap:'Ande mais um quarteirão.'},{cap:'Vire à <b>esquerda</b>.'},{cap:'Você chegará ao seu destino.'}]},
 {tipo:'pares', tit:'Lembra das direções?', regra:REV,
  fala:'Lembra das direções? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Frente: a direção para onde ___.','queremos ir'],['Atrás: por onde ___.','já passamos'],['As direções ajudam a ___.','descrever o caminho']]},
 {tipo:'arrasta', tit:'Qual é a palavra?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: a direção para onde queremos ir.'},{k:'k1',frase:'___: por onde já passamos.'},{k:'k2',frase:'___: o lado da nossa mão direita.'},{k:'k3',frase:'___: o lado da nossa mão esquerda.'}],
  itens:[{c:'k0',t:'Frente'},{c:'k1',t:'Atrás'},{c:'k2',t:'Direita'},{c:'k3',t:'Esquerda'}]},
 NPT([
   P('O que quer dizer "atrás"?','por onde <b>já passamos</b>'),
   P('O que quer dizer "frente"?','a direção para onde <b>queremos ir</b>'),
   P('Complete: a ___ é o lado da nossa mão esquerda.','esquerda'),
   P('Para que servem as direções?','para <b>descrever o caminho</b>')])
]},

/* T4. Pontos de referência e localização (U3 S3, S14, S18, S19, S28, S29) */
{k:'referencia', tema:'referencia', unid:3, nome:'Pontos de referência', curto:'Pontos de referência', capa:'t_padaria', cor:'#a855f7', treino:[], telas:[
 {tipo:'texto', tit:'Onde estou?',
  fala:'Onde estou? Localização é saber onde estamos, para onde vamos e como chegaremos lá. Pontos de referência não mudam na paisagem e ajudam a encontrar outros lugares.',
  html:IG('t_mapa_cel', FX('Localização é saber',[IC('pin')+'onde estamos',IC('seta')+'para onde vamos',IC('mapa')+'como chegaremos lá'],{ic:'pin'})+
   FX('Pontos de referência',['<b>não mudam</b> na paisagem','ajudam a <b>encontrar outros lugares</b>'],{ic:'olho'}))},
 {tipo:'escolha', tit:'Localização ou ponto de referência?', pergunta:'É localização ou é um ponto de referência?',
  fala:'Localização ou ponto de referência? Toque na resposta certa.', op:['Localização','Ponto de referência'], itens:[
   {m:'saber onde estamos', c:'Localização', d:'Localização é saber onde estamos, para onde vamos e como chegaremos lá.'},
   {m:'saber para onde vamos', c:'Localização', d:'Localização é saber onde estamos, para onde vamos e como chegaremos lá.'},
   {m:'saber como chegaremos lá', c:'Localização', d:'Localização é saber onde estamos, para onde vamos e como chegaremos lá.'},
   {m:'um prédio alto', c:'Ponto de referência', d:'Um prédio alto é um ponto de referência: não muda na paisagem.'},
   {m:'uma árvore', c:'Ponto de referência', d:'Uma árvore é um ponto de referência do material.'},
   {m:'uma construção colorida', c:'Ponto de referência', d:'Uma construção colorida é um ponto de referência do material.'},
   {m:'a padaria na esquina', img:'t_padaria', c:'Ponto de referência', d:'A padaria na esquina serve de ponto de referência.'}]},
 {tipo:'texto', tit:'Exemplos do material',
  fala:'Exemplos do material. Pontos de referência: uma construção colorida, um prédio alto, uma árvore, a linha de transmissão de energia ao lado da escola. A padaria na esquina é um comércio que serve de… você acabou de ver!',
  html:IG('t_padaria', FXT('Pontos de referência',[TL(CORIDA,'construção colorida'),TL('alto','prédio alto'),TL('arvore','árvore')],[IC('torre')+'a linha de transmissão de energia ao lado da escola'],{ic:'olho'})+
   FX('A padaria na esquina',['um comércio','serve de '+O('ponto de referência')],{ic:'loja'}))},
 {tipo:'pares', tit:'Para que servem?', regra:REV,
  fala:'Para que servem? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Pontos de referência são lugares que ___ na paisagem.','não mudam'],['Eles nos ajudam a ___ outros lugares.','encontrar'],['A padaria na esquina serve de ___.','ponto de referência']]},
 {tipo:'texto', tit:'Para chegar lá',
  fala:'Para chegar lá. No croqui do jogo: casa da família, escola do João, escola da Maria, padaria do José e trabalho da Antônia. A rua da escola é muito movimentada; Antônia vai ao trabalho pelo caminho mais… pense! Sem saber o caminho, usamos pontos indicados por alguém que conhece o trajeto. Saber se localizar é observar, pensar e se locomover com atenção.',
  html:FXT('No croqui do jogo',[TL('casa','casa da família'),TL('escola','escola do João'),TL('escola','escola da Maria'),TL('loja','padaria do José'),TL('trabalho','trabalho da Antônia')],null,{ic:'mapa'})+
   VS({rot:'Rua da escola', cor:'#dc2626', ic:'atencao', ds:['muito movimentada']},{rot:'Antônia vai pelo', cor:'#16a34a', ic:'check', ds:[O('caminho mais tranquilo')]},'semimg')+
   FXS([FX('Sem saber o caminho',['pontos indicados por <b>alguém que conhece</b> o trajeto'],{ic:'pessoas'}),
   FX('Saber se localizar é',[IC('olho')+'observar',IC('ideia')+'pensar',IC('atencao')+'se locomover com <b>atenção</b>'])],'g2w')},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Pontos de referência ___ na paisagem.'},{k:'k1',frase:'Eles nos ajudam a ___ outros lugares.'},{k:'k2',frase:'___ é saber onde estamos, para onde vamos e como chegaremos lá.'},{k:'k3',frase:'Sem saber o caminho, seguimos pontos indicados por alguém que já ___ o trajeto.'}],
  itens:[{c:'k0',t:'não mudam'},{c:'k1',t:'encontrar'},{c:'k2',t:'Localização'},{c:'k3',t:'conhece'}]},
 NPT([
   P('O que é um ponto de referência?','um lugar que <b>não muda</b> na paisagem e ajuda a <b>encontrar outros lugares</b>'),
   P('Cite um ponto de referência do material.','um <b>prédio alto</b>, uma <b>árvore</b>, a <b>padaria</b>','t_padaria'),
   P('Por que Antônia não vai pela rua da escola?','porque ela é <b>muito movimentada</b>')])
]},

/* T5. Mapas, croqui e planta baixa (U3 S5, S9, S10, S19, S20, S21, S22, S25, S29)
   O material não define croqui nem planta baixa: aqui só se RECONHECE pelo exemplo e pela função. */
{k:'mapas', tema:'mapas', unid:3, nome:'Mapa, croqui e planta baixa', curto:'Mapa, croqui e planta', capa:'t_croqui_rua', cor:'#14b8a6', treino:[], telas:[
 {tipo:'texto', tit:'Para que serve um mapa?',
  fala:'Para que serve um mapa? Os mapas servem para localizar e representar os espaços. Ajudam a entender os caminhos e a planejar os trajetos. Podem ser de papel ou… olhe a foto do celular!',
  html:IG('t_app', FX('Os mapas servem para',['<b>localizar</b>','<b>representar</b> os espaços'],{ic:'mapa'})+
   FX('Ajudam a',['entender os caminhos','planejar os trajetos'],{ic:'pin'})+
   FX('Podem ser',[IC('papel')+'de papel',IC('celular')+O('digitais'),'aplicativos do celular e do computador']))},
 {tipo:'pares', tit:'O mapa serve para…', regra:REV,
  fala:'O mapa serve para… Toque em cada frase para ver o pedaço que falta.',
  pares:[['Os mapas servem para ___ e representar os espaços.','localizar'],['Eles ajudam a entender os caminhos e a ___.','planejar os trajetos'],['Os mapas podem ser de papel ou ___.','digitais']]},
 {tipo:'texto', tit:'O desenho da rua',
  fala:'O desenho da rua. Este desenho da rua é um croqui. Nele aparecem casas, calçada, poste de iluminação, placas, árvores, veículos e pessoas. O croqui mostra os elementos da rua e ajuda a ler um caminho.',
  html:IG('t_croqui_rua', FX('Croqui',['este <b>desenho da rua</b>'],{ic:'papel'})+
   FXT('Nele aparecem',[TL('casa','casas'),TL('ape','calçada'),TL('ideia','poste de iluminação'),TL('ponto','placas'),TL('arvore','árvores'),TL('carro','veículos'),TL('pessoas','pessoas')])+
   FX('O croqui',['mostra os elementos da rua','ajuda a <b>ler um caminho</b>'],{ic:'olho'}))},
 {tipo:'arrasta', tit:'O croqui da rua', cols:1, fig:'t_croqui_rua', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O desenho da rua, com casas, calçada e postes, é um ___.'},{k:'k2',frase:'O croqui ajuda a ler um ___.'}],
  itens:[{c:'k0',t:'croqui'},{c:'k2',t:'caminho'}]},
 {tipo:'texto', tit:'A planta baixa',
  fala:'A planta baixa. A sala de aula, e a mesma sala vista de cima: esse desenho é uma planta baixa, que mostra onde ficam as coisas. Na planta baixa do apartamento: sacada, quarto, sala, escritório, cozinha e banheiro.',
  html:SEQ([SQ('<img src="'+I('t_sala3d')+'" alt=""><span class="rot">a sala de aula</span>'),SQ('<img src="'+I('t_planta_sala')+'" alt=""><span>a mesma sala, <b>vista de cima</b></span>')],'fotos')+
   IG('t_planta_ap', FX('Planta baixa',['mostra <b>onde ficam as coisas</b>'],{ic:'mapa'})+
   FX('Na planta do apartamento',['sacada','quarto','sala','escritório','cozinha','banheiro'],{ic:'casa'}),'pequena')},
 {tipo:'escolha', tit:'Croqui da rua ou planta baixa?', pergunta:'Onde aparece: no croqui da rua ou na planta baixa do apartamento?',
  fala:'Croqui da rua ou planta baixa? Toque na resposta certa.', op:['Croqui da rua','Planta baixa'], itens:[
   {m:'casas', c:'Croqui da rua', d:'Aparece no croqui da rua.'},
   {m:'calçada', c:'Croqui da rua', d:'Aparece no croqui da rua.'},
   {m:'poste de iluminação', c:'Croqui da rua', d:'Aparece no croqui da rua.'},
   {m:'veículos', c:'Croqui da rua', d:'Aparece no croqui da rua.'},
   {m:'sacada', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'},
   {m:'quarto', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'},
   {m:'cozinha', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'},
   {m:'banheiro', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'},
   {m:'escritório', c:'Planta baixa', d:'Aparece na planta baixa do apartamento.'}]},
 {tipo:'texto', tit:'De cima ou de frente',
  fala:'De cima ou de frente. Imagens aéreas, mapas e fotos mostram os lugares de pontos de vista diferentes: de cima ou de frente.',
  html:VS({img:'t_bairro_sb', rot:'Vista de cima', cor:'#0d9488', ic:'cima', ds:['uma imagem aérea']},{img:'t_paraty', rot:'Vista de frente', cor:'#d97706', ic:'olho', ds:['uma foto da rua']})+
   FX('Imagens aéreas, mapas e fotos',['mostram os lugares de <b>pontos de vista diferentes</b>'],{ic:'olho'})},
 {tipo:'arrasta', tit:'Qual é o nome?', cols:3, regra:'Arraste cada nome para a sua figura.',
  caixas:[{k:'cro',t:'',img:'t_croqui_rua'},{k:'pla',t:'',img:'t_planta_ap'},{k:'map',t:'',img:'t_app'}],
  itens:[{c:'cro',t:'croqui da rua'},{c:'pla',t:'planta baixa'},{c:'map',t:'mapa digital'}]},
 NPT([
   P('Este desenho da sala, visto de cima, é um croqui ou uma planta baixa?','uma <b>planta baixa</b>','t_planta_sala'),
   P('Este desenho da rua é um ___.','croqui','t_croqui_rua'),
   P('Para que serve um mapa?','para <b>entender os caminhos</b> e <b>planejar os trajetos</b>')])
]},

/* T6. Tipos de rua e vias de circulação (U3 S6, S7, S8) */
{k:'ruas', tema:'ruas', unid:3, nome:'Tipos de rua e vias', curto:'Tipos de rua', capa:'t_avenida', cor:'#6366f1', treino:[], telas:[
 {tipo:'texto', tit:'As ruas não são iguais',
  fala:'As ruas não são iguais. Rua residencial: muitas casas, mais tranquila, pouco comércio. Rua comercial: olhe a foto! Muito movimentada. E as ruas podem ser largas ou estreitas.',
  html:VS({img:'t_residencial', rot:'Rua residencial', cor:'#22c55e', ic:'casa', ds:['muitas casas','mais tranquila','pouco comércio']},
          {img:'t_comercial', rot:'Rua comercial', cor:'#f97316', ic:'loja', ds:[O('muitas lojas'),'muito movimentada']})+
   FXS([FX('As ruas podem ser',[LARG('larga')+'largas',LARG('estreita')+'estreitas'],{ic:'estrada',cor:'#475569'})])},
 {tipo:'escolha', tit:'Residencial ou comercial?', pergunta:'É rua residencial ou rua comercial?',
  fala:'Residencial ou comercial? Toque na resposta certa.', op:['Residencial','Comercial'], opc:{Residencial:'#22c55e',Comercial:'#f97316'}, itens:[
   {img:'t_residencial', c:'Residencial', d:'Muitas casas: rua residencial.'},
   {img:'t_comercial', c:'Comercial', d:'Muitas lojas: rua comercial.'},
   {img:'t_rua_lojas', c:'Comercial', d:'Muitas lojas: rua comercial.'},
   {m:'muitas casas', c:'Residencial', d:'A rua residencial tem muitas casas.'},
   {m:'mais tranquila', c:'Residencial', d:'A rua residencial geralmente é mais tranquila.'},
   {m:'pouco comércio', c:'Residencial', d:'A rua residencial tem pouco comércio.'},
   {m:'muitas lojas', c:'Comercial', d:'A rua comercial tem muitas lojas.'},
   {m:'muito movimentada', c:'Comercial', d:'A rua comercial é muito movimentada.'}]},
 {tipo:'texto', tit:'Dentro e entre as cidades',
  fala:'Dentro e entre as cidades. Nas cidades: ruas e avenidas, como a Avenida Paulista, em São Paulo. Entre as cidades: … olhe a segunda foto, a Rodovia dos Imigrantes! E estradas de terra ou asfaltadas.',
  html:VS({img:'t_avenida', rot:'Nas cidades', cor:'#0ea5e9', ic:'predio', cap:'Avenida Paulista, São Paulo', ds:['ruas','<b>avenidas</b>']},
          {img:'t_rodovia', rot:'Entre as cidades', cor:'#a855f7', ic:'estrada', cap:'Rodovia dos Imigrantes', ds:[O('rodovias'),'estradas de terra ou asfaltadas']})},
 {tipo:'revela', tit:'Como cada uma é', cols:4, regra:'Vire cada cartão para ver como é a via.', q:'Como é?',
  fala:'Como cada uma é. Vire cada cartão: avenida, rodovia, rua residencial e rua comercial.',
  cartoes:[
   {n:'Avenida', cor:'#0ea5e9', img:'t_avenida', b:'Mais <b>larga</b> que a rua, com mais de uma faixa, semáforos e placas. Liga <b>distâncias maiores</b> dentro da cidade.'},
   {n:'Rodovia', cor:'#a855f7', img:'t_rodovia', b:'Usada por carros, motos, ônibus e caminhões. <b>Liga cidades</b> e passa por áreas <b>mais afastadas</b>.'},
   {n:'Rua residencial', cor:'#22c55e', img:'t_residencial', b:'Predominam as <b>moradias</b>: casas e prédios.'},
   {n:'Rua comercial', cor:'#f97316', img:'t_comercial', b:'Lojas, mercados, padarias e <b>muitas pessoas</b> circulando.'}]},
 {tipo:'arrasta', tit:'Que tipo de via é?', cols:2, regra:'Arraste cada foto para o seu tipo de via.',
  caixas:[{k:'res',t:'Rua residencial',cor:'#22c55e'},{k:'com',t:'Rua comercial',cor:'#f97316'},{k:'ave',t:'Avenida',cor:'#0ea5e9'},{k:'rod',t:'Rodovia',cor:'#a855f7'}],
  itens:[{c:'res',img:'t_residencial'},{c:'com',img:'t_comercial'},{c:'com',img:'t_rua_lojas'},{c:'ave',img:'t_avenida'},{c:'rod',img:'t_rodovia'}]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'A ___ liga uma cidade a outra.'},{k:'k1',frase:'A ___ é mais larga e liga distâncias maiores dentro da cidade.'},{k:'k2',frase:'Na rua ___ há muitas lojas.'},{k:'k3',frase:'Na rua ___ predominam as moradias.'}],
  itens:[{c:'k0',t:'rodovia'},{c:'k1',t:'avenida'},{c:'k2',t:'comercial'},{c:'k3',t:'residencial'}]},
 {tipo:'texto', tit:'Cada rua tem um jeito',
  fala:'Cada rua tem um jeito de ser usada: faz parte do planejamento urbano. Em Campinas há uma área onde prédios são permitidos e, perto do lago, só casas. Entender as ruas ajuda a andar com mais segurança, cuidar do bairro e melhorar o lugar onde vivemos.',
  html:IG('t_zoneamento', FX('Planejamento urbano: cada rua tem',['um <b>jeito de ser usada</b>'],{ic:'mapa'})+
   VS({rot:'Uma área', cor:'#0ea5e9', ic:'predio', ds:['prédios permitidos']},{rot:'Perto do lago', cor:'#22c55e', ic:'casa', ds:['só casas']},'semimg')+
   FX('Entender as ruas ajuda a',['andar com mais <b>segurança</b>','cuidar do bairro','melhorar o lugar onde vivemos'],{ic:'check'}))},
 {tipo:'arrasta', tit:'Como é a rua?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'A rua residencial geralmente é mais ___.'},{k:'k1',frase:'A rua comercial é muito ___.'},{k:'k2',frase:'As ruas não são iguais: algumas são largas, outras ___.'}],
  itens:[{c:'k0',t:'tranquila'},{c:'k1',t:'movimentada'},{c:'k2',t:'estreitas'}]},
 {tipo:'texto', tit:'Do que a rua é feita?',
  fala:'Do que a rua é feita? Paralelepípedo: cidades mais antigas ou históricas, como Paraty. Bloquetes: blocos encaixados, em muitos bairros. Terra batida: sem calçamento, mais comum em áreas rurais. E a rua também pode ter asfalto.',
  html:IG('t_paraty', FXS([FX('Paralelepípedo',['cidades <b>mais antigas</b> ou históricas','como Paraty (RJ)'],{ic:TEX('par'),cor:'#c2410c'}),
   FX('Bloquetes',['<b>blocos encaixados</b>','em muitos bairros'],{ic:TEX('blo'),cor:'#7c3aed'}),
   FX('Terra batida',['<b>sem calçamento</b>','mais comum em áreas rurais'],{ic:TEX('ter'),cor:'#a16207'}),
   FX('Asfalto',null,{ic:TEX('asf'),cor:'#1e293b'})]))},
 {tipo:'arrasta', tit:'Qual é o material?', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'___: ruas de cidades mais antigas ou históricas.'},{k:'k1',frase:'___: blocos encaixados, usados em muitos bairros.'},{k:'k2',frase:'___: rua sem calçamento, comum em áreas rurais.'}],
  itens:[{c:'k0',t:'Paralelepípedo'},{c:'k1',t:'Bloquetes'},{c:'k2',t:'Terra batida'}]},
 NPT([
   P('Olhe a foto. É uma rua residencial ou comercial?','<b>comercial</b>','t_comercial'),
   P('Qual via liga uma cidade a outra?','a <b>rodovia</b>','t_rodovia'),
   P('Ruas de cidades antigas ou históricas, como Paraty, usam ___.','paralelepípedo'),
   P('Ligue: muitas lojas, muitas casas → residencial, comercial.','muitas lojas: <b>comercial</b> · muitas casas: <b>residencial</b>')])
]},

/* T7. O bairro e a cidade (U3 S11, S12, S13, S14) */
{k:'bairro', tema:'bairro', unid:3, nome:'O bairro e a cidade', curto:'O bairro e a cidade', capa:'t_bairro_sb', cor:'#f97316', treino:[], telas:[
 {tipo:'texto', tit:'O que é o bairro?',
  fala:'O que é o bairro? Uma cidade é composta por vários bairros. O bairro é um conjunto de ruas e quarteirões. Nos bairros há casas, prédios, escolas, praças, igrejas, hospitais, farmácias e pontos de ônibus. No bairro as pessoas frequentam espaços de lazer, praticam esportes e convivem.',
  html:IG('t_bairro_sb', FXS([FX('Cidade',['composta por <b>vários bairros</b>'],{ic:'predio'}),FX('Bairro',['<b>conjunto de ruas</b> e quarteirões'],{ic:'mapa'})],'g2')+
   FXT('No bairro há',[TL('casa','casas'),TL('predio','prédios'),TL('escola','escolas'),TL('praca','praças'),TL('igreja','igrejas'),TL('hospital','hospitais'),TL('farmacia','farmácias'),TL('ponto','pontos de ônibus')])+
   FX('No bairro as pessoas',['frequentam espaços de <b>lazer</b>','praticam esportes','convivem'],{ic:'pessoas'}))},
 {tipo:'pares', tit:'Lembra do bairro?', regra:REV,
  fala:'Lembra do bairro? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Uma cidade é composta por ___.','vários bairros'],['O bairro é um ___ e quarteirões.','conjunto de ruas'],['No bairro as pessoas frequentam espaços de ___.','lazer']]},
 {tipo:'texto', tit:'Tudo está conectado',
  fala:'Tudo está conectado. Pela rua chegamos à escola, ao trabalho e aos lugares de lazer. Os veículos transportam pessoas e mercadorias. No poema O meu bairro: supermercado, sorveteria, hospital, banco, padaria, parquinho e rampas para quem é especial.',
  html:IG('t_bairro_praia', FX('Pela rua chegamos',[IC('escola')+'à escola',IC('trabalho')+'ao trabalho',IC('bola')+'aos lugares de lazer'],{ic:'estrada'})+
   FX('Os veículos transportam',[IC('pessoas')+'<b>pessoas</b>',IC('caixa')+'<b>mercadorias</b>'],{ic:'caminhao'})+
   FX('Poema "O meu bairro"',['supermercado','sorveteria','hospital','banco','padaria','parquinho',IC('rampa')+'<b>rampas</b> para quem é especial']))},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_bairro_sb', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'No bairro as pessoas frequentam espaços de ___.'},{k:'k1',frase:'No bairro as pessoas praticam ___ e convivem.'},{k:'k2',frase:'Pela rua chegamos à ___, ao trabalho e aos lugares de lazer.'},{k:'k3',frase:'Os veículos transportam pessoas e ___.'}],
  itens:[{c:'k0',t:'lazer'},{c:'k1',t:'esportes'},{c:'k2',t:'escola'},{c:'k3',t:'mercadorias'}]},
 {tipo:'texto', tit:'Um dentro do outro',
  fala:'Um dentro do outro. Na canção Ora bolas: a casa tá na rua, a rua tá dentro da cidade. Do menor para o maior: casa, rua, bairro e… olhe o desenho!',
  html:IG(NINHO(), FX('Canção "Ora bolas"',['a casa tá na <b>rua</b>','a rua tá dentro da <b>cidade</b>'],{ic:'som'})+
   FX('Do menor para o maior',['casa'+IC('seta'),'rua'+IC('seta'),'bairro'+IC('seta'),O('cidade')],{ic:'cima',cl:'linha'}))},
 {tipo:'ordena', tit:'Do menor para o maior', cols:4, regra:'Toque do menor para o maior.',
  fala:'Do menor para o maior. Toque do menor para o maior: casa, rua, bairro e cidade, embaralhados.',
  fimMsg:'Muito bem! A casa fica na rua, a rua fica no bairro e o bairro fica na cidade.',
  quadros:[{cap:'casa'},{cap:'rua'},{cap:'bairro'},{cap:'cidade'}]},
 {tipo:'arrasta', tit:'A canção "Ora bolas"', cols:1, regra:'Arraste cada palavra para completar a canção.',
  caixas:[{k:'k0',frase:'A casa tá na ___.'},{k:'k1',frase:'A rua tá dentro da ___.'},{k:'k2',frase:'A cidade tá do lado da ___.'},{k:'k3',frase:'A floresta é no ___.'},{k:'k4',frase:'O Brasil tá na ___.'}],
  itens:[{c:'k0',t:'rua'},{c:'k1',t:'cidade'},{c:'k2',t:'floresta'},{c:'k3',t:'Brasil'},{c:'k4',t:'América do Sul'}]},
 NPT([
   P('Uma cidade é formada por vários ___.','bairros'),
   P('Ordene do menor para o maior: cidade, casa, bairro, rua.','<b>casa</b> → <b>rua</b> → <b>bairro</b> → <b>cidade</b>'),
   P('Cite dois lugares que existem no bairro.','<b>escola</b>, <b>praça</b>, <b>mercado</b>, <b>farmácia</b>','t_bairro_sb'),
   P('O que os veículos transportam?','<b>pessoas</b> e <b>mercadorias</b>')])
]},

/* T8. Meios de transporte e trabalho na cidade (U3 S4, S7, S24, S26, S27, S28) */
{k:'transporte', tema:'transporte', unid:3, nome:'Transporte e trabalho', curto:'Transporte e trabalho', capa:'t_motorista', cor:'#2563eb', treino:[], telas:[
 {tipo:'texto', tit:'Como as pessoas se deslocam',
  fala:'Como as pessoas se deslocam. Meios de transporte: a pé, de bicicleta, de carro, de ônibus e de moto. Na rodovia passam carros, motos, ônibus e… olhe o desenho! Muitas pessoas usam o ônibus para trabalhar ou estudar em outro bairro. No jogo da rota: sou professora, vou de ônibus até a escola.',
  html:FXT('Meios de transporte',[TL('ape','a pé'),TL('bici','de bicicleta'),TL('carro','de carro'),TL('onibus','de ônibus'),TL('moto','de moto')],null,{ic:'seta'})+
   FXS([FXT('Na rodovia passam',[TL('carro','carros'),TL('moto','motos'),TL('onibus','ônibus'),TL('caminhao',O('caminhões'))],null,{ic:'estrada'}),
   FX('Muitas pessoas usam o ônibus',['para <b>trabalhar</b> ou <b>estudar</b> em outro bairro'],{ic:'onibus'})],'g2w')+
   FX('No jogo da rota',['"Sou professora, vou de <b>ônibus</b> até a escola."'],{ic:'pessoa'})},
 {tipo:'pares', tit:'Lembra do ônibus?', regra:REV,
  fala:'Lembra do ônibus? Toque em cada frase para ver o pedaço que falta.',
  pares:[['Muitas pessoas usam o ônibus para ___ ou estudar em outro bairro.','trabalhar'],['No jogo da rota: "Sou professora, vou de ___ até a escola."','ônibus'],['Na rodovia passam carros, motos, ônibus e ___.','caminhões']]},
 {tipo:'texto', tit:'O trabalho na cidade',
  fala:'O trabalho na cidade. A professora, na sala de aula. O gari mantém as ruas limpas. O agente de trânsito. E quem dirige o ônibus? Também: cozinheiro, cientista, pedreiro, entregador, policiais e médica.',
  html:FOTS([FOT('t_professora','professora','na sala de aula'),FOT('t_gari','gari','mantém as ruas <b>limpas</b>'),FOT('t_agente','agente de trânsito',''),FOT('t_motorista',O('motorista')+' de ônibus','')])+
   FX('Também',['cozinheiro','cientista','pedreiro','entregador','policiais','médica'],{ic:'trabalho'})},
 {tipo:'escolha', tit:'Transporte ou trabalho?', pergunta:'É um meio de transporte ou um trabalho na cidade?',
  fala:'Transporte ou trabalho? Toque na resposta certa.', op:['Meio de transporte','Trabalho'], itens:[
   {m:'a pé', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'de bicicleta', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'de carro', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'de ônibus', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'de moto', c:'Meio de transporte', d:'É um meio de transporte.'},
   {m:'professora', img:'t_professora', c:'Trabalho', d:'A professora trabalha na sala de aula.'},
   {m:'gari', img:'t_gari', c:'Trabalho', d:'O gari mantém as ruas limpas.'},
   {m:'cozinheiro', c:'Trabalho', d:'Cozinheiro é um dos trabalhos na cidade.'},
   {m:'pedreiro', c:'Trabalho', d:'Pedreiro é um dos trabalhos na cidade.'},
   {m:'entregador', c:'Trabalho', d:'Entregador é um dos trabalhos na cidade.'},
   {m:'médica', c:'Trabalho', d:'Médica é um dos trabalhos na cidade.'}]},
 {tipo:'arrasta', tit:'Quem é?', cols:2, regra:'Arraste cada profissão para a sua foto.',
  caixas:[{k:'pro',t:'',img:'t_professora'},{k:'gar',t:'',img:'t_gari'},{k:'age',t:'',img:'t_agente'},{k:'mot',t:'',img:'t_motorista'}],
  itens:[{c:'pro',t:'professora'},{c:'gar',t:'gari'},{c:'age',t:'agente de trânsito'},{c:'mot',t:'motorista de ônibus'}]},
 NPT([
   P('Quem mantém as ruas limpas?','o <b>gari</b>','t_gari'),
   P('Cite dois meios de transporte.','<b>ônibus</b>, <b>carro</b>, <b>bicicleta</b>, <b>moto</b>, <b>a pé</b>'),
   P('Para que muitas pessoas usam o ônibus?','para <b>trabalhar</b> ou <b>estudar</b> em outro bairro')])
]},

/* ===================== UNIDADE 4 ===================== */

/* T9. Meio ambiente, a casa de todos (U4 S5, S6) */
{k:'ambiente', tema:'ambiente', unid:4, nome:'Meio ambiente, a casa de todos', curto:'Meio ambiente', capa:'t_ilha', cor:'#22c55e', treino:[], telas:[
 {tipo:'texto', tit:'Uma casa bem maior',
  fala:'Uma casa bem maior. O lugar onde moramos é muito… o título conta! … do que a nossa casa. Começa nas ruas e passa por parques, montanhas, mares, florestas e céus cheios de nuvens. Essa grande casa se chama meio ambiente.',
  html:IG('t_ilha', FX('O lugar onde moramos é muito',[O('maior')+' do que a nossa casa'],{ic:'casa'})+
   FX('Começa nas ruas e passa por',[IC('praca')+'parques',IC('montanha')+'montanhas',IC('rio')+'mares',IC('arvore')+'florestas',IC('nuvem')+'céus cheios de nuvens'],{ic:'estrada'})+
   FX('Essa grande casa se chama',['<b>meio ambiente</b>'],{ic:'coracao',cl:'grande'}))},
 {tipo:'pares', tit:'A grande casa', regra:REV,
  fala:'A grande casa. Toque em cada frase para ver o pedaço que falta.',
  pares:[['O lugar onde moramos é muito maior do que a nossa ___.','casa'],['Começa nas ___ e passa por parques, montanhas, mares, florestas e céus.','ruas'],['Essa grande casa se chama ___.','meio ambiente']]},
 {tipo:'texto', tit:'O que faz parte dela',
  fala:'O que faz parte dela. O meio ambiente é tudo o que existe na natureza: árvores, animais, pedras, água, ar, solo, Sol, chuva. E nós também fazemos parte disso tudo! Ele está nas plantas do quintal, no passarinho que visita a janela, no cheirinho da terra molhada e no céu.',
  html:IG('t_janela', FXT('Tudo o que existe na natureza',[TL('arvore','árvores'),TL('pata','animais'),TL('pedra','pedras'),TL('agua','água'),TL('ar','ar'),TL('solo','solo'),TL('sol','Sol'),TL('chuva','chuva')],null,{ic:'folha',cl:'larga'})+
   FX('E nós também',[IC('pessoas')+'fazemos <b>parte</b> disso tudo!'],{ic:'pessoa'})+
   FX('O meio ambiente está',['nas plantas do <b>quintal</b>','no <b>passarinho</b> que visita a janela','no cheirinho da terra molhada','no <b>céu</b>'],{ic:'olho'}))},
 {tipo:'arrasta', tit:'No nosso dia a dia', cols:1, fig:'t_janela', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O meio ambiente está nas plantas do ___.'},{k:'k1',frase:'Também está no ___ que visita a janela.'},{k:'k2',frase:'Também está no cheirinho da terra ___.'},{k:'k3',frase:'Também está no ___ cheio de nuvens.'}],
  itens:[{c:'k0',t:'quintal'},{c:'k1',t:'passarinho'},{c:'k2',t:'molhada'},{c:'k3',t:'céu'}]},
 {tipo:'texto', tit:'A casa de todos',
  fala:'A casa de todos. Meio ambiente: a casa de todos os seres vivos. Quando cuidamos dessa casa maior, cuidamos de… lembra? Nós também fazemos parte dela! E de todos que vivem com a gente. Seja um guardião do meio ambiente!',
  html:IG('t_ilha', FX('Meio ambiente',['a casa de todos os <b>seres vivos</b>'],{ic:'casa'})+
   FX('Quando cuidamos dessa casa maior, cuidamos de',[O('nós mesmos'),'todos que vivem com a gente'],{ic:'coracao'})+
   FX('Seja um guardião do meio ambiente!',null,{ic:'escudo',cl:'grande'}))},
 {tipo:'liga', tit:'Ligue as duas partes', regra:'Toque no começo da frase e depois no fim dela.',
  fala:'Ligue as duas partes. Toque no começo da frase e depois no fim dela.',
  pares:[['Essa grande casa se chama','meio ambiente.'],['O meio ambiente é a casa de todos os','seres vivos.'],['E nós também','fazemos parte disso tudo!'],['Seja um guardião','do meio ambiente!']]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_ilha', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O lugar onde moramos é muito ___ do que a nossa casa.'},{k:'k1',frase:'Essa grande casa se chama ___.'},{k:'k2',frase:'O meio ambiente é a casa de todos os ___.'},{k:'k3',frase:'Quando cuidamos do meio ambiente, cuidamos de ___ mesmos.'}],
  itens:[{c:'k0',t:'maior'},{c:'k1',t:'meio ambiente'},{c:'k2',t:'seres vivos'},{c:'k3',t:'nós'}]},
 NPT([
   P('O que faz parte do meio ambiente?','<b>animais</b>, <b>plantas</b>, <b>água</b>, <b>ar</b>, <b>solo</b>… e <b>nós também</b>'),
   P('Verdadeiro ou falso: as pessoas fazem parte do meio ambiente.','<b>Verdadeiro</b>'),
   P('O meio ambiente é a casa de todos os ___.','seres vivos')])
]},

/* T10. Sons da natureza (U4 S6; U3 S3) — só o átomo cobrável */
{k:'sons', tema:'sons', unid:4, nome:'Sons da natureza', curto:'Sons da natureza', capa:'t_janela', cor:'#06b6d4', treino:[], telas:[
 {tipo:'texto', tit:'Quem mora na grande casa',
  fala:'Quem mora na grande casa. O mundo é como uma grande casa onde moram juntos pessoas, animais, plantas, rios, nuvens, ventos e até os sons da natureza. Os sons da natureza fazem parte do meio ambiente. A cidade também tem sons: ela é feita de caminhos… e de quê? A frase já contou!',
  html:IG('t_janela', FXT('O mundo é como uma grande casa onde moram juntos',[TL('pessoas','pessoas'),TL('pata','animais'),TL('folha','plantas'),TL('rio','rios'),TL('nuvem','nuvens'),TL('ar','ventos'),TL('som','até os sons da natureza')],null,{ic:'casa',cl:'larga'})+
   FX('Os sons da natureza',['<b>fazem parte</b> do meio ambiente'],{ic:'som'})+
   FX('A cidade também tem sons: é feita de',['caminhos',O('sons'),'movimentos'],{ic:'predio'}))},
 {tipo:'pares', tit:'Os sons', regra:REV,
  fala:'Os sons. Toque em cada frase para ver o pedaço que falta.',
  pares:[['O mundo é como uma grande ___.','casa'],['Os sons da natureza fazem parte do ___.','meio ambiente'],['A cidade é feita de caminhos, sons e ___.','movimentos']]},
 {tipo:'liga', tit:'Ligue as duas partes', regra:'Toque no começo da frase e depois no fim dela.',
  fala:'Ligue as duas partes. Toque no começo da frase e depois no fim dela.',
  pares:[['O mundo é como','uma grande casa.'],['Os sons da natureza','fazem parte do meio ambiente.'],['A cidade também tem sons:','ela é feita de caminhos, sons e movimentos.']]},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'Os sons da natureza fazem ___ do meio ambiente.'},{k:'k1',frase:'As cidades são feitas de caminhos, ___ e movimentos.'}],
  itens:[{c:'k0',t:'parte'},{c:'k1',t:'sons'}]},
 NPT([
   P('Verdadeiro ou falso: os sons da natureza fazem parte do meio ambiente.','<b>Verdadeiro</b>'),
   P('Complete: as cidades são feitas de caminhos, ___ e movimentos.','sons')])
]},

/* T11. Fauna e flora — os biomas do Brasil (U4 S4, S8–S14, S17, S20) */
{k:'biomas', tema:'biomas', unid:4, nome:'Fauna e flora: os biomas', curto:'Os 6 biomas', capa:'t_arara', cor:'#84cc16', treino:[], telas:[
 {tipo:'texto', tit:'Fauna e flora',
  fala:'Fauna e flora. Fauna: os animais de um lugar. Flora: as plantas, a vegetação de um lugar.',
  html:VS({img:'t_arara', rot:'Fauna', cor:'#d97706', ic:'pata', ds:['os <b>animais</b> de um lugar']},
          {img:'t_vitoria', rot:'Flora', cor:'#16a34a', ic:'folha', ds:['as <b>plantas</b>, a vegetação de um lugar']})},
 {tipo:'escolha', tit:'Fauna ou flora?', pergunta:'É fauna (animal) ou flora (planta)?',
  fala:'Fauna ou flora? Olhe a foto e toque na resposta certa.', op:['Fauna','Flora'], opc:{Fauna:'#d97706',Flora:'#16a34a'}, itens:[
   {m:'arara', img:'t_arara', c:'Fauna', d:'A arara é um animal: fauna.'},
   {m:'lobo-guará', img:'t_loboguara', c:'Fauna', d:'O lobo-guará é um animal: fauna.'},
   {m:'mico-leão-dourado', img:'t_mico', c:'Fauna', d:'O mico-leão-dourado é um animal: fauna.'},
   {m:'quero-quero', img:'t_queroquero', c:'Fauna', d:'O quero-quero é um animal: fauna.'},
   {m:'vitória-régia', img:'t_vitoria', c:'Flora', d:'A vitória-régia é uma planta: flora.'},
   {m:'bromélia', img:'t_bromelia', c:'Flora', d:'A bromélia é uma planta: flora.'},
   {m:'capim-dos-pampas', img:'t_capim', c:'Flora', d:'O capim-dos-pampas é uma planta: flora.'},
   {m:'sempre-viva', img:'t_sempreviva', c:'Flora', d:'A sempre-viva é uma planta: flora.'}]},
 {tipo:'texto', tit:'Os 6 biomas do Brasil',
  fala:'Os 6 biomas do Brasil. Amazônia: Norte. Cerrado: Centro. Caatinga: Nordeste. Pampa: Sul. Pantanal: Mato Grosso e Mato Grosso do Sul. Mata Atlântica: Litoral. Os biomas e os animais são a riqueza natural do país e precisam ser cuidados.',
  html:IG('t_mapa_biomas', bios({amz:['<b>Norte</b>'],cer:['<b>Centro</b>'],caa:['<b>Nordeste</b>'],pam:['<b>Sul</b>'],pan:['<b>Mato Grosso e Mato Grosso do Sul</b>'],mat:['<b>Litoral</b>']},null,true)+
   FXS([FX('Riqueza natural do país',['os biomas e os animais',IC('coracao')+'precisam ser <b>cuidados</b>'],{ic:'escudo'})]),'mapa6')},
 {tipo:'revela', tit:'Como é a vegetação?', cols:3, regra:'Vire cada cartão para ver a vegetação.', q:'Vegetação?',
  fala:'Como é a vegetação? Vire cada cartão: Amazônia, Cerrado, Caatinga, Pampa, Pantanal e Mata Atlântica.',
  cartoes:[
   {n:NOME.amz, cor:COR.amz, img:'t_amazonia', b:'<b>Norte</b> do Brasil.<br>Árvores altas e muitas folhas.'},
   {n:NOME.cer, cor:COR.cer, img:'t_cerrado', b:'<b>Centro</b> do Brasil.<br>Árvores tortas e grama.'},
   {n:NOME.caa, cor:COR.caa, img:'t_caatinga', b:'<b>Nordeste</b> do Brasil.<br>Plantas com espinhos (cactos).'},
   {n:NOME.pam, cor:COR.pam, img:'t_pampa', b:'<b>Sul</b> do Brasil.<br>Campos com capim baixo.'},
   {n:NOME.pan, cor:COR.pan, img:'t_pantanal', b:'<b>Mato Grosso</b> e Mato Grosso do Sul.<br>Plantas que gostam de água.'},
   {n:NOME.mat, cor:COR.mat, img:'t_mata', b:'<b>Litoral</b> do Brasil.<br>Floresta úmida e densa.'}]},
 {tipo:'arrasta', tit:'Onde fica?', cols:3, fig:'t_mapa_biomas', regra:'Arraste cada lugar para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',t:'Norte'},{c:'cer',t:'Centro'},{c:'caa',t:'Nordeste'},{c:'pam',t:'Sul'},{c:'pan',t:'Mato Grosso e Mato Grosso do Sul'},{c:'mat',t:'Litoral'}]},
 {tipo:'arrasta', tit:'De qual bioma é a paisagem?', cols:3, regra:'Arraste cada foto para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',img:'t_amazonia'},{c:'cer',img:'t_cerrado'},{c:'caa',img:'t_caatinga'},{c:'pam',img:'t_pampa'},{c:'pan',img:'t_pantanal'},{c:'mat',img:'t_mata'}]},
 {tipo:'texto', tit:'Os animais (fauna)',
  fala:'Os animais, a fauna. Amazônia: onça-pintada, macaco, arara. Cerrado: lobo-guará, tamanduá-bandeira. Caatinga: tatu, veado-catingueiro, asa-branca. Pampa: cavalo, ema, quero-quero, capivara. Pantanal: jacaré, tuiuiú, sucuri, capivara. Mata Atlântica: mico-leão-dourado, preguiça. No material, a capivara aparece em dois biomas: Pampa e Pantanal.',
  html:bios({amz:['onça-pintada','macaco','arara'],cer:['lobo-guará','tamanduá-bandeira'],caa:['tatu','veado-catingueiro','asa-branca'],pam:['cavalo','ema','quero-quero','<b>capivara</b>'],pan:['jacaré','tuiuiú','sucuri','<b>capivara</b>'],mat:['mico-leão-dourado','preguiça']})+
   FX('No material, a capivara aparece em 2 biomas',null,{ic:'pata',cl:'nota'})},
 {tipo:'arrasta', tit:'De qual bioma é o bicho?', cols:3, regra:'Arraste cada bicho para o seu bioma.',
  caixas:cxBio(), itens:[{c:'amz',img:'t_arara'},{c:'cer',img:'t_loboguara'},{c:'caa',img:'t_asabranca'},{c:'pam',img:'t_queroquero'},{c:'mat',img:'t_mico'},{c:'pan',t:'tuiuiú'}]},
 {tipo:'escolha', tit:'Mais bichos', pergunta:'Na tabela do material, de qual bioma é este bicho?',
  fala:'Mais bichos. Na tabela do material, de qual bioma é este bicho? Toque no bioma certo.', op:ORD.map(function(k){ return NOME[k]; }), itens:[
   {m:'onça-pintada', c:NOME.amz, d:'Amazônia: onça-pintada, macaco, arara.'},
   {m:'macaco', c:NOME.amz, d:'Amazônia: onça-pintada, macaco, arara.'},
   {m:'tamanduá-bandeira', c:NOME.cer, d:'Cerrado: lobo-guará, tamanduá-bandeira.'},
   {m:'tatu', c:NOME.caa, d:'Caatinga: tatu, veado-catingueiro, asa-branca.'},
   {m:'veado-catingueiro', c:NOME.caa, d:'Caatinga: tatu, veado-catingueiro, asa-branca.'},
   {m:'cavalo', c:NOME.pam, d:'Pampa: cavalo, ema, quero-quero, capivara.'},
   {m:'ema', c:NOME.pam, d:'Pampa: cavalo, ema, quero-quero, capivara.'},
   {m:'jacaré', c:NOME.pan, d:'Pantanal: jacaré, tuiuiú, sucuri, capivara.'},
   {m:'sucuri', c:NOME.pan, d:'Pantanal: jacaré, tuiuiú, sucuri, capivara.'},
   {m:'preguiça', c:NOME.mat, d:'Mata Atlântica: mico-leão-dourado, preguiça.'}]},
 {tipo:'texto', tit:'As plantas das fotos',
  fala:'As plantas das fotos. Vitória-régia: Amazônia. Sempre-viva: Cerrado. Louro-preto: Caatinga. Capim-dos-pampas: Pampa. Bromélias em área alagada: Pantanal. Bromélia: Mata Atlântica.',
  html:FOTS([FOT('t_vitoria',NOME.amz,'vitória-régia',COR.amz),FOT('t_sempreviva',NOME.cer,'sempre-viva',COR.cer),FOT('t_louro',NOME.caa,'louro-preto',COR.caa),
   FOT('t_capim',NOME.pam,'capim-dos-pampas',COR.pam),FOT('t_bromelia_agua',NOME.pan,'bromélias em área alagada',COR.pan),FOT('t_bromelia',NOME.mat,'bromélia',COR.mat)],'f6 tag')},
 {tipo:'arrasta', tit:'De qual bioma é a planta?', cols:2, regra:'Arraste cada planta para o seu bioma.',
  caixas:[{k:'amz',t:NOME.amz,cor:COR.amz},{k:'cer',t:NOME.cer,cor:COR.cer},{k:'caa',t:NOME.caa,cor:COR.caa},{k:'pam',t:NOME.pam,cor:COR.pam}],
  itens:[{c:'amz',img:'t_vitoria'},{c:'cer',img:'t_sempreviva'},{c:'caa',img:'t_louro'},{c:'pam',img:'t_capim'}]},
 {tipo:'texto', tit:'Os cartazes dos biomas (1/2)',
  fala:'Os cartazes dos biomas. Amazônia: o maior bioma do Brasil, quase metade do território. Cerrado: o segundo maior, a savana brasileira, de caules retorcidos. Caatinga: só existe no Brasil, clima semiárido, muitos cactos.',
  html:'<div class="fxis">'+FXI('t_amazonia',NOME.amz,['<b>maior bioma</b> do Brasil','quase metade do território'],COR.amz)+
   FXI('t_cerrado',NOME.cer,['<b>2º maior</b>','savana brasileira','caules retorcidos'],COR.cer)+
   FXI('t_caatinga',NOME.caa,['<b>só existe</b> no Brasil','semiárido','muitos <b>cactos</b>'],COR.caa)+'</div>'},
 {tipo:'arrasta', tit:'Qual é o bioma?', cols:1, regra:'Arraste cada bioma para a sua frase.',
  caixas:[{k:'amz',frase:'O maior bioma do Brasil: ___.'},{k:'caa',frase:'Só existe no Brasil e tem muitos cactos: ___.'},{k:'pan',frase:'Plantas que gostam de água: ___.'},{k:'cer',frase:'Árvores tortas e grama: ___.'},{k:'pam',frase:'Campos com capim baixo: ___.'},{k:'mat',frase:'Fica no litoral do Brasil: ___.'}],
  itens:[{c:'amz',t:'Amazônia'},{c:'caa',t:'Caatinga'},{c:'pan',t:'Pantanal'},{c:'cer',t:'Cerrado'},{c:'pam',t:'Pampa'},{c:'mat',t:'Mata Atlântica'}]},
 {tipo:'texto', tit:'Os cartazes dos biomas (2/2)',
  fala:'Os cartazes dos biomas. Pampa: só no Rio Grande do Sul, campos abertos. Pantanal: uma das maiores áreas úmidas do planeta, alagamentos. Mata Atlântica: no litoral, muito rica, mas muito reduzida.',
  html:'<div class="fxis">'+FXI('t_pampa',NOME.pam,['só no <b>Rio Grande do Sul</b>','campos abertos'],COR.pam)+
   FXI('t_pantanal',NOME.pan,['uma das maiores <b>áreas úmidas</b> do planeta','alagamentos'],COR.pan)+
   FXI('t_mata',NOME.mat,['no <b>litoral</b>','muito rica','<b>muito reduzida</b>'],COR.mat)+'</div>'},
 {tipo:'arrasta', tit:'O que diz o cartaz?', cols:1, regra:'Arraste cada bioma para a sua frase.',
  caixas:[{k:'amz',frase:'O maior bioma do Brasil: ___.'},{k:'cer',frase:'O segundo maior bioma do Brasil: ___.'},{k:'caa',frase:'Só existe no Brasil: ___.'},{k:'pam',frase:'Fica só no Rio Grande do Sul: ___.'},{k:'mat',frase:'Muito rica, mas muito reduzida: ___.'}],
  itens:[{c:'amz',t:'Amazônia'},{c:'cer',t:'Cerrado'},{c:'caa',t:'Caatinga'},{c:'pam',t:'Pampa'},{c:'mat',t:'Mata Atlântica'}]},
 NPT([
   P('Fauna são os ___ e flora são as ___.','fauna: <b>animais</b> · flora: <b>plantas</b>'),
   P('Qual é o maior bioma do Brasil?','a <b>Amazônia</b>'),
   P('Ligue: lobo-guará, mico-leão-dourado, tuiuiú → Pantanal, Cerrado, Mata Atlântica.','lobo-guará: <b>Cerrado</b> · mico-leão-dourado: <b>Mata Atlântica</b> · tuiuiú: <b>Pantanal</b>')], NP+' (1/2)'),
 {tipo:'liga', tit:'Cada planta no seu bioma', regra:'Toque na planta e depois no bioma dela.',
  fala:'Cada planta no seu bioma. Toque na planta e depois no bioma dela.',
  pares:[['vitória-régia',NOME.amz],['sempre-viva',NOME.cer],['louro-preto',NOME.caa],['capim-dos-pampas',NOME.pam],['bromélias em área alagada',NOME.pan],['bromélia',NOME.mat]]},
 NPT([
   P('Olhe a foto. De qual bioma é esta paisagem com cactos?','<b>Caatinga</b>','t_caatinga'),
   P('Qual bioma só existe no Brasil?','a <b>Caatinga</b>'),
   P('Em quais biomas do material aparece a capivara? Pode ser mais de uma resposta.','no <b>Pampa</b> e no <b>Pantanal</b>','t_capivara')], NP+' (2/2)')
]},

/* T12. Preservação do meio ambiente (U4 S2, S3, S18–S22) */
{k:'preservacao', tema:'preservacao', unid:4, nome:'Preservação do meio ambiente', curto:'Preservação', capa:'t_araras_azuis', cor:'#16a34a', treino:[], telas:[
 {tipo:'texto', tit:'Por que as plantas importam',
  fala:'Por que as plantas importam. Ajudam a manter o ar limpo, protegem o solo, servem de alimento e abrigo para muitos animais e deixam o meio ambiente mais bonito e equilibrado.',
  html:IG('t_araras_azuis', FX('As plantas',[IC('ar')+'ajudam a manter o <b>ar limpo</b>',IC('solo')+'<b>protegem o solo</b>',IC('fruta')+'<b>alimento e abrigo</b> para muitos animais',IC('coracao')+'meio ambiente mais <b>bonito</b> e <b>equilibrado</b>'],{ic:'folha',cl:'col'}))},
 {tipo:'pares', tit:'O que as plantas fazem', regra:REV,
  fala:'O que as plantas fazem. Toque em cada frase para ver o pedaço que falta.',
  pares:[['As plantas ajudam a manter o ___.','ar limpo'],['Elas protegem o ___.','solo'],['Elas servem de ___ para muitos animais.','alimento e abrigo'],['Deixam o meio ambiente mais bonito e ___.','equilibrado']]},
 {tipo:'texto', tit:'Impactos no meio ambiente',
  fala:'Impactos no meio ambiente. O material mostra: desmatamento da mata das margens dos rios; acúmulo de lixo nas margens dos rios; enchentes e ruas alagadas depois da chuva na cidade; ar e água poluídos; sensação de calor e ar seco; áreas agrícolas secas e sem água.',
  html:FXS([FX('Nas margens dos rios',[IC('toco')+'desmatamento da mata',IC('lixo')+'acúmulo de <b>lixo</b>'],{ic:'rio',cor:'#b45309'}),
   FX('Na cidade, depois da chuva',[IC('enchente')+'<b>enchentes</b>','ruas alagadas'],{ic:'chuva',cor:'#0369a1'}),
   FX('Ar e água',[IC('fumaca')+'<b>poluídos</b>'],{ic:'ar',cor:'#0891b2'}),
   FX('Sensação de',[IC('termo')+'<b>calor</b>','ar seco'],{ic:'sol',cor:'#dc2626'}),
   FX('Áreas agrícolas',[IC('seco')+'<b>secas</b>','sem água'],{ic:'seco',cor:'#a16207'})],'g2 g3w')},
 {tipo:'escolha', tit:'Ajuda ou é impacto?', pergunta:'É o que as plantas fazem ou é um impacto no meio ambiente?',
  fala:'Ajuda ou é impacto? Toque na resposta certa.', op:['As plantas ajudam','Impacto'], itens:[
   {m:'ar limpo', c:'As plantas ajudam', d:'As plantas ajudam a manter o ar limpo.'},
   {m:'protegem o solo', c:'As plantas ajudam', d:'As plantas protegem o solo.'},
   {m:'alimento e abrigo para muitos animais', c:'As plantas ajudam', d:'As plantas servem de alimento e abrigo para muitos animais.'},
   {m:'meio ambiente bonito e equilibrado', c:'As plantas ajudam', d:'As plantas deixam o meio ambiente mais bonito e equilibrado.'},
   {m:'desmatamento da mata das margens dos rios', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'lixo nas margens dos rios', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'enchentes e ruas alagadas', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'ar e água poluídos', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'sensação de calor e ar seco', c:'Impacto', d:'É um dos impactos que o material mostra.'},
   {m:'áreas agrícolas secas e sem água', c:'Impacto', d:'É um dos impactos que o material mostra.'}]},
 {tipo:'texto', tit:'Florestas derrubadas',
  fala:'Florestas derrubadas. O desmatamento derruba florestas para cultivos agrícolas, pastagens para gado e o crescimento das cidades. Ele causa grandes impactos, como a perda do hábitat dos animais.',
  html:VS({img:'t_araras_azuis', rot:'Floresta preservada', cor:'#16a34a', ic:'arvore'},{img:'t_desmatamento', rot:'Desmatamento', cor:'#b45309', ic:'toco'})+
   FXS([FX('Derruba florestas para',['cultivos agrícolas','<b>pastagens para gado</b>','crescimento das cidades'],{ic:'toco',cor:'#b45309'}),
   FX('Causa grandes impactos',['perda do <b>hábitat</b> dos animais'],{ic:'atencao',cor:'#dc2626'})],'g2w')},
 {tipo:'arrasta', tit:'Os 6 impactos', cols:1, regra:'Arraste cada palavra para completar o impacto.',
  caixas:[{k:'k0',frase:'___ da mata das margens dos rios.'},{k:'k1',frase:'Acúmulo de ___ nas margens dos rios.'},{k:'k2',frase:'___ e ruas alagadas depois da chuva na cidade.'},{k:'k3',frase:'Ar e água ___.'},{k:'k4',frase:'Sensação de ___ e ar seco.'},{k:'k5',frase:'Áreas agrícolas ___ e sem água.'}],
  itens:[{c:'k0',t:'Desmatamento'},{c:'k1',t:'lixo'},{c:'k2',t:'Enchentes'},{c:'k3',t:'poluídos'},{c:'k4',t:'calor'},{c:'k5',t:'secas'}]},
 {tipo:'texto', tit:'Preservar',
  fala:'Preservar. A preservação é responsabilidade coletiva, voltada para o bem comum. Ajuda a manter a qualidade de vida das futuras gerações. Ter atenção com a vegetação e respeitar as áreas de preservação ajuda as plantas a continuarem vivas.',
  html:FX('Preservação',[IC('pessoas')+'responsabilidade <b>coletiva</b>',IC('coracao')+'para o <b>bem comum</b>'],{ic:'escudo'})+
   FX('Ajuda a manter',['a <b>qualidade de vida</b> das futuras gerações'],{ic:'check'})+
   FX('Ajuda as plantas a continuarem vivas',[IC('olho')+'atenção com a vegetação',IC('folha')+'respeitar as <b>áreas de preservação</b>'],{ic:'folha'})},
 {tipo:'arrasta', tit:'Complete as frases', cols:1, fig:'t_desmatamento', regra:'Arraste cada palavra para a sua frase.',
  caixas:[{k:'k0',frase:'O desmatamento causa a perda do ___ dos animais.'},{k:'k1',frase:'A preservação é responsabilidade ___.'},{k:'k2',frase:'Preservar ajuda a manter a qualidade de vida das ___ gerações.'},{k:'k3',frase:'Respeitar as áreas de ___ ajuda as plantas a continuarem vivas.'}],
  itens:[{c:'k0',t:'hábitat'},{c:'k1',t:'coletiva'},{c:'k2',t:'futuras'},{c:'k3',t:'preservação'}]},
 NPT([
   P('Cite uma importância das plantas.','manter o <b>ar limpo</b>, <b>proteger o solo</b>, dar <b>alimento e abrigo</b>'),
   P('O que o desmatamento causa aos animais?','a <b>perda do hábitat</b>','t_desmatamento'),
   P('Por que preservar a natureza?','para ajudar a manter a <b>qualidade de vida</b> das futuras gerações'),
   P('A preservação é responsabilidade de quem?','é responsabilidade <b>coletiva</b>, de todos')])
]}
];
/* arrastar: a fala é o título + a instrução (o que arrastar para onde), nunca a resposta */
LS.forEach(function(l){ l.telas.forEach(function(t){ if(!t.fala && t.tipo==='arrasta') t.fala=t.tit+'. '+(t.regra||'Arraste cada um para o lugar certo.'); }); });
return LS;
})();
