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
 const map={
  "１": "1"
  , "２": "2"
  , "３": "3"
  , '４': "4"
  ,"５": "5"
  , "６": "6"
  , "７": "7"
  , '８': "8"
  ,"９": "9"
  , "０": "0"
  ,"．":"."
  , "＋": "+"
  , '－': "-"
  ,"＊": "*"
  , "／": "/"
  , "＄": "$"
  
 }
 const pattern=Object.keys(map).join("|")
 function toSmall(str,turnflg){ //turnflg toBig
 return str.replace(new RegExp(pattern, "g") , function(e){return map[e]})
}
 var map2={}
 Object.keys(map).map(d=>{
  let k=map[d]
  let v=d
  map2[k]=v
 })
 console.log(map,map2)
 const pattern2=Object.keys(map2).join("|")
 
 function toBig(str,turnflg){ //turnflg toBig
  return str.replace(pattern2, function(e){return map2[e]})
 } 
 root.toSmall =toSmall;
 root.toBig=toBig;
})(this);

//eval
function _(obj){return Function('"use strict";return (' + obj + ')')()}

