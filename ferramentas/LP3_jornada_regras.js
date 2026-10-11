/* ============================================================
   LP3_jornada_regras.js — o CARTÃO DA REGRA de cada tema, em
   linguagem de criança: a regra em 1-2 linhas e 3-4 exemplos com a
   parte-chave destacada (*assim*). Texto tirado de
   trabalho/3tri_portugues/_roteiro.md — nada inventado. O nome do
   tema vem de LP3.TEMAS em tempo de execução.
   Aparece no mapa (ao selecionar o nó), no início da fase e no
   fim da fase (recapitulação em 1 linha).
   ============================================================ */
window.REGRAS = (function(){
'use strict';
var R={
  conto:  {regra:'Conto de fadas é uma história inventada, com começo, meio e fim.',
           ex:['*Tempo*: era uma vez… · *Lugar*: floresta, castelo','*Personagens*: herói, vilão e seres mágicos','*Magia*: feijões mágicos, lobo que fala','*Fim*: e viveram felizes para sempre']},
  chapeu: {regra:'Chapeuzinho Vermelho: a história em ordem, do começo ao fim.',
           ex:['A *cesta de doces* para a vovó doente','O conselho da mãe: *não sair do caminho*','O *Lobo Mau* chega antes e se disfarça de vovó','Que olhos grandes! — *É para te ver melhor!*']},
  joao:   {regra:'João e o pé de feijão: a sequência da história e os objetos mágicos.',
           ex:['A vaca trocada por *feijões mágicos*','O *pé de feijão* que sobe até as nuvens','A *galinha dos ovos de ouro* e a *harpa*','João corta o pé de feijão com o *machado*']},
  parodia:{regra:'Paráfrase: as mesmas ideias com outras palavras (sinônimos). Paródia: imita e muda de propósito.',
           ex:['menina → *garota* · vovó → *avó* (paráfrase)','doces → *guloseimas* (sinônimo)','Chapeuzinho *Verde* de bicicleta (paródia)','Ciranda, cirandinha, vamos todos *estudar* (paródia)']},
  h:      {regra:'O H no começo não tem som nenhum, mas a palavra se escreve com H.',
           ex:['*H*oje, *H*ora, *H*omem, *H*otel','*H*ospital, *H*ipopótamo, *H*elicóptero','*H*istória, *H*orta, *H*erói','Sem H: ovo, uva, ilha, escola']},
  jg:     {regra:'Som de jê: com A, O, U é sempre J. Com E, I pode ser J ou G: decore a palavra.',
           ex:['*JA JO JU*: janela, jacaré, jogo, caju','*JE JI*: jeito, jiló, jipe','*GE GI*: gelo, gente, girafa, gigante','fei*j*ão, laran*j*a, reló*g*io']},
  ggu:    {regra:'Som de guê: GA, GO, GU direto. Antes de E e I entra o U quietinho: GUE, GUI.',
           ex:['*GA GO GU*: gato, gola, fogo, agulha','*GUE GUI*: guerra, foguete, guitarra, águia','Sem o U, GE e GI soam jê: gelo, girafa','*GIGANTE* tem os dois sons']},
  dic:    {regra:'No dicionário as palavras estão em ordem alfabética. Mesma 1ª letra? Olhe a 2ª.',
           ex:['b*A*la, b*O*la, b*U*le','ca*S*a, ca*V*alo (olhe a 3ª letra)','*Verbete*: a palavra explicada','*Palavras-guia* no alto da página · manga: fruta ou parte da camisa']},
  invento:{regra:'Invenção: as pessoas criaram, não existia. Descoberta: achar o que já existia.',
           ex:['*Invenção*: roda, lâmpada, telefone, avião','*Descoberta*: o fogo, uma planta nova','*Inventor*: quem inventa','*Santos Dumont*: o pai da aviação (14-Bis)']},
  cqu:    {regra:'Som de quê: C com A, O e U. Antes de E e I se escreve QU (o U não se fala).',
           ex:['*CA*: casa, cavalo · *CO*: copo, coelho','C com U: cubo, caju','*QUE*: queijo, quente, leque','*QUI*: quiabo, esquilo, mosquito, máquina']},
  dig:    {regra:'CH, NH e LH: duas letras, um som só.',
           ex:['*CH*: chave, chuva, chapéu, chocolate','*NH*: ninho, galinha, banho, caminho','*LH*: folha, coelho, abelha, olho','Uma letra muda tudo: mola × mo*lh*a, fila × fi*lh*a']},
  plural: {regra:'Plural é mais de um. O artigo acompanha: o lobo → os lobos.',
           ex:['Vogal + *S*: casa → casa*s*, lobo → lobo*s*','R, Z + *ES*: flor → flor*es*, luz → luz*es*','*ÃO → ÕES*: avião → avi*ões*, balão → bal*ões*','*AL → AIS*: animal → anim*ais* · *M → NS*: homem → home*ns*']}
};
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function marca(s){ return esc(s).replace(/\*([^*]+)\*/g,'<b>$1</b>'); }
function nomeTema(k){ var t=window.LP3&&LP3.TEMAS[k]; return t?t.nome:k; }
function corTema(k){ var t=window.LP3&&LP3.TEMAS[k]; return t?t.cor:'#60a5fa'; }
/* HTML do cartão de uma fase: um bloco por tema (compacto quando há vários) */
function cartaoFase(f,compacto){
  var temas=f.temas||[]; if(f.chefao) temas=['conto','parodia','h','jg','ggu','cqu','dig','plural','dic','invento'];
  var h='';
  if(f.chefao){ h+='<div class="rg"><div class="rgt" style="--tc:#a5b4fc">Todos os temas</div><div class="rgr">O Gigante pergunta de tudo: ortografia, plural, dicionário, contos, paráfrase e paródia, invenções.</div></div>'; return h; }
  temas.forEach(function(k,i){ var r=R[k]; if(!r) return; if(compacto&&i>=2) return; var n=compacto?2:4;
    h+='<div class="rg"><div class="rgl"><span class="rgt" style="--tc:'+corTema(k)+'">'+esc(nomeTema(k))+'</span><span class="rgr">'+marca(r.regra)+'</span></div><ul class="rge">'+r.ex.slice(0,n).map(function(e){ return '<li>'+marca(e)+'</li>'; }).join('')+'</ul></div>'; });
  return h;
}
function linhaResumo(f){ var k=(f.temas||[])[0]; var r=R[k]; return r? nomeTema(k)+': '+r.regra : ''; }
return {R:R, cartaoFase:cartaoFase, linhaResumo:linhaResumo, nomeTema:nomeTema, corTema:corTema, marca:marca};
})();
