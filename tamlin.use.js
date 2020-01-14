;(function(root){
 let fn={}
 fn.q=(s,doc=document)=>{return doc.querySelector(s)}
 let c={}
 c.keys={37:'<',39:'>',38:'^',40:'v',70:'A',68:'B',65:'X',83:'Y',82:'R',69:'L'}
 c.key0=''
 c.key1=''
 c.block=0
 c.flash=()=>{c.key0=c.key1=''}
 //c.fps=10
 c.done=(/*fps,*/debughtml)=>{
  //c.fps=fps||c.fps;
  document.documentElement.onkeydown=function(ev){
   if(!c.keys[ev.which])return;
   if(c.block)return;  
   if(c.key0) c.key1=c.key0;
   c.key0=c.keys[ev.which]
  }
  ;
  //setInterval(()=>{ c.key0='' },1000/c.fps)
  ;
  if(!fn.q(debughtml))return;
  setInterval(()=>{fn.q(debughtml).textContent=c.key0+'　'},1000/60)
 }
 ;
 root.controller=c;
 //controller.done('pre')
})(this);

;(function(root){
 let fn={}
 fn.toSmall=(str)=>{
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
   return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  }) 
 }
 fn.toBig=(str)=>{
  return str.replace(/[A-Za-z0-9]/g, function(s) {
   return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });
 }
 root.toSmall=fn.toSmall;
 root.toBig=fn.toBig
})(this);

//eval
//function _(obj){return Function('"use strict";return (' + obj + ')')()}
function _(obj){return Function('return (' + obj + ')')()}
/*function _(obj){
 console.log(obj);
 return Function('return (' + obj + ')')()}
*/

function _m(obj,bigflg){
 //message rep
 let re=/{(.*)}/g
 return obj.replace(re,(d,dd)=>{
  $$$=_(dd);
  //console.log(d,dd)
  return bigflg?toBig(''+$$$):$$$
 })
}

function _t(obj){
 let re_trimwrap=/{|}/g
 let re_trimwrap2=/「|」|＊「/g
 let re_head=/^{/;
 let re=re_head.test(obj)?re_trimwrap:re_trimwrap2
 return obj.replace(re,'')
}

function _l(_str){
 //あ｜い｜う｜え
 //か｜き｜く｜け
 let cep="｜",str=_str.trim()
 return str.split('\n').map(d=>{return d.split(cep)})
}

;(function(root){
 function entry(_list){
  let o={}
  o.lists=_list||[] //lists
  o.line=0 //count
  o.block=0 //flg
  o.end=0 //flg
  ;
  o.get=()=>{
   let s=o.block?void 0:o.lists[o.line]
   if(s) o.block=1;
   return s;
  }
  o.next=(d)=>{
   (d!=null)?o.line=d:o.line++;
   o.end=(o.lists.length-1<o.line)?1:0;
   return o.block=0
  }
  o.isend=()=>{return o.end}
  o.isEnd=o.isend
  return o;
 }
 root.reader=entry;
/*
let li=`MRK\nCMM\nEVL「「あいうえを入れておく」」`.split('\n');
let rd=reader(li);
fn.q('button').onclick=()=>{
 fn.q('pre').textContent=rd.get();
 fn.q('pre.line').textContent=rd.line +','+ rd.end
 fn.q('pre.end').textContent=rd.isEnd()?'end':'not'
 rd.next();
}
*/ 
})(this);

;(function(root){
 function typecheck(d){
  //CMM,EVL,EVM,JMP,MRK,SEL,MES
  let type='CMM'
  ,re_EVL=/^{(\s|\S)*?}/
  ,re_EVM=/^「「(\s|\S)*?」」/
  ,re_JMP=/^{(.*)}>>>#(.*)/
  ,re_MRK=/^#(.*)/
  ,re_SEL=/^\*「(\s|\S)*?」|^＊「(\s|\S)*?」/ 
  ,re_MES=/^「(\s|\S)*?」/
  let str=d
  if(re_MRK.test(str)) type='MRK'
  if(re_MES.test(str)) type='MES' 
  if(re_EVL.test(str)) type='EVL'
  if(re_EVM.test(str)) type='EVM' 
  if(re_JMP.test(str)) type='JMP' 
  if(re_MRK.test(str)) type='MRK'
  if(re_SEL.test(str)) type='SEL'
  return type
 } 
 function lex(text){
  let re=/(＊「(?:\s|\S)*?」)|(「「(?:\s|\S)*?」」)|(「(?:\s|\S)*?」)|(.+)/g
  return text.match(re).map((d,i)=>{return {str:d,line:i,type:typecheck(d)}})
  ;
 }
  root.lex=lex;
  root.typecheck=typecheck;
 })(this)

;(function(root){
 let padder=(_l,_r,_max,_sp)=>{
  let max=_max||8,sp=_sp||' ',l=_l||'',r=_r||''
  return l+(Array(max).join(sp)+_r).slice(-1*(max-l.length))
  //let s=padder('鉄の爪','３００',33,'　')
 }
 root.padder=padder;
})(this);


