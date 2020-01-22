;(function(root){
 function entry(text,caller,fps,cmd){
  let tm={};
  tm.mes='';
  tm.fps=fps||20;
  tm.caller=caller||function(){/**/}
  tm.text=text||''
  tm.lex=lex
  tm.lists=tm.lex(tm.text)
  tm=Object.assign(tm,reader(tm.lists))
  tm.trick=0;
  tm.ctrl=controller
  tm.ci;
  tm.len=30 ;//string max size
  tm.cursor='＊'
  tm.getcursor=()=>{return (tm.trick%10>5)?'　':tm.cursor}
  tm.search=(addr)=>{ //searchline
   //console.log(addr)
   let i=tm.lists.filter(d=>d.str===addr).map(d=>d.line)||void 0
   return i;
  }
  tm.cmd=cmd;
  //
  tm.calc=(list,tm)=>{
   let f=tm.cmd[list.type]||tm.cmd['CMM']
   return f(_t(list.str),tm)
  }  
  tm.done=()=>{
   //let list;
   tm.ctrl.done()
   tm.ci=setInterval(()=>{
    tm.trick++;
    tm.caller(tm.mes,tm);
    let list=tm.get();
    if(list) tm.calc(list,tm)
   },1000/tm.fps);
  }
  ;
  //
  tm.done();
  return tm;
 }

 root.tamlin=entry;
})(this);

;(function(root){

 function sel(_str,tm){

  let str=_m(_str,1)
  tm.ctrl.flash(); 
  let list=str.split('\n').filter(d=>d)
  ,title=list.shift()
  ;
  list=_l(list.join('\n'))
  let n=0
  ,cep='｜'
  ,cursor=tm.getcursor()
  ,sp='　'
  ,len=tm.len
  ,add=4
  ,pagemax=Math.floor(list.length/add)
  ,pagenow=Math.floor(n/add)
  ,sub
  ,mes
  ,f=(num)=>{return (num===(n%add))?cursor:sp}
  ,ff=(num)=>{
   if(!list[pagenow*add+num])return sp;
   let a=list[pagenow*add+num]
   return padder(a[0],a[1]||sp,len,sp)
  } 
  ;

  let calc=()=>{
   pagenow=Math.floor(n/add)
   sub=list[n][2]||sp;
   mes=title+` ${pagenow+1}/${pagemax+1}`+'\n'
    +Array.from({length:add}).map((d,i)=>f(i) + ff(i)).join('\n')
    +'\n'+padder(sub,sp,len,sp)+'\n'  
  }
  ;
  ////
  let cl=setInterval(()=>{
   let key=tm.ctrl.key0
   if(key==='^'){//^
    n=pagenow*add+(n-1)%add
    if(0>n) n=add-1;
    if(n>list.length-1) n=list.length-1
   }
   if(key==='v'){//v
    n=pagenow*add+(n+1)%add
    if(n>list.length-1) n=pagenow*add+0
   }
   if(key==='<'){//<
    n=(n-add)-(n%add)
    if(0>n) n=list.length-1
   }
   if(key==='>'){//>
    n=(n+add)-(n%add)
    if(n>list.length-1) n=0   
   }
   cursor=tm.getcursor();
   calc();
   tm.mes=mes;
   if(key==='A'){
    $$$ = n,$$0 = list[n][0],$$1 = list[n][1];
    return clearInterval(cl),tm.ctrl.flash(),tm.next();
   }
   if(key==='B'){
    $$$ = -1,$$0='戻る';
    return clearInterval(cl),tm.ctrl.flash(),tm.next();    
   }
   tm.ctrl.flash()
  },1000/tm.fps)
  }

 let cmd={}
 cmd.CMM=(str,tm)=>{
  //comment
  return tm.next()
 }
 cmd.EVL=(str,tm)=>{
  $$$ = _(str);
  return tm.next();
 }
 cmd.EVM=(str,tm)=>{
  $$$ =_m(str);///
  return tm.next();
 }
 cmd.JMP=(str,tm)=>{
  let a=str.split('>>>'),i=tm.search(a[1])
  let flg = _(a[0]);
  $$$ =flg;
  //console.log('!jump!',i)
  return (!flg || i==void 0)?tm.next():tm.next(i)
 }

 cmd.MRK=(str,tm)=>{
  $$$ = tm.line////////
  return tm.next();
 }
 cmd.SEL=sel;
 cmd.MES=(str,tm)=>{
  //...
  let len=tm.len,sp='　'
  let a=_m(str,1)
  tm.mes=a
  if(a.length===0)return tm.next();
  tm.ctrl.flash();
  let calc=()=>{ 
  let ary=a.split('\n')
   ary[ary.length-1] = padder(ary[ary.length-1],tm.getcursor(),len,sp)
   tm.mes=ary.join('\n')
  }
  let cl=setInterval(()=>{
   calc();
   if(tm.ctrl.key0==='A') return clearInterval(cl),tm.ctrl.flash(),tm.next();
  },1000/tm.fps)   
 }


 root.cmd=cmd; 
})(this);


let tm= tamlin(text,(mes,tm)=>{
 //mes
 fn.q('pre.mes').textContent=tm.mes
 fn.q('pre.key').textContent=tm.ctrl.key0
},20,cmd) //default 20
