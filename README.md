# tamlin
https://codepen.io/gnjo/pen/dyPKLPe
```
tamlin(macro,(mes,tm)=>{
 //mes
},fps) //default 20
```

## controller
```
 c.keys={37:'<',39:'>',38:'^',40:'v',70:'A',68:'B',65:'X',83:'Y',82:'R',69:'L'}
```
## macro

```js
//let re_trimwrap=/{|}|「|」|＊「/g
_() //eval core
_m() //eval rep
_t() //trim
_l() //stringlist ｜

tm.type=(str)=>{
CMM,EVL,EVM,JMP,MRK,SEL,MES
}

tm.lex=(text)=>{
 //[{str,type,line}]
}

tm.search=(addr)=>{ //searchline
 let i=tm.lists.filter(d=>d.str===a[1]).map(d=>d.line)||void 0
 return i;
}
tm.lists=[ {str:,type:,line:},... ]

let calc=(list,tm)=>{
 let f=tm.cmd[list.type]||tm.cmd['CMM']
 return f(_t(list.str),tm)
}

let CMM=(str,tm)=>{
//comment
 return tm.next()
}
let EVL=(str,tm)=>{
 $$$ = _(str);
 return tm.next();
}
let EVM=(str,tm)=>{
 $$$ =_m(str);///
 return tm.next();
}
let JMP=(str,tm)=>{
 let a=str.split('>>>'),i=tm.search(a[1])
 $$$ = _(str);
 return (!$$$ || i==void 0)?tm.next():tm.next(i)
}

let MRK=(str,tm)=>{
 $$$ = tm.line////////
 return tm.next();
}
let SEL=(str,tm)=>{
 //...
}
let MES=(str,tm)=>{
 //...
}

```
```
{} //eval
{}>>>#xyz //if {} is 1, eval jump 
「」 //mes
＊「」 //sel
「「」」 //eval input string to $$$
#xyz //mrk 
「{$$$}」 //rep replace
tail comment nothing
```
```
#stat
「「あいうえを入れておく」」
{$01=$$$}
{$01=1000}
；変数への代入が不要な場合は＄＄＄に入れる。
{$01+10+10*2}
「結果は１０３０ですか{$$$}」
{20}
{$$$-20}
「結果はゼロ。{$$$}」
；結果は＄＄＄か＄＄＋数字に入る。複数の結果が有る場合、＄＄０　＄＄１。
「「二重括弧は、出力されないが、{$$$}に代入される。
複数行の代入を可能にする手段。この時点では文字列」」
{$22=$$$}
「直前の結果は{$$$}に入る」
「{$22}」
「」
＊「選択肢は先頭に米印、行頭はリストではない。問として処理される。
あ
い
う
え
」
；キャンセルされた場合。＄＄＄には－１がはいる。
；選択肢一番の場合。

{$11=$$$}
{$11==-1}>>>#cancel
{$11==1}>>>#sel1
{$11==2}>>>#sel2
{1}>>>#stat
```
```
廃止。
；％％０：１０　黒；一文字の大きさ。色は黒か白。黒なら背景は白。白なら背景は黒。
；％％１：５　５　２０　３０　２；枠。エックス、ワイ、幅、高さ、枠線の幅、枠の幅以外は文字数
；％％２：W　A　S　D　F　C；キーコンフィグ。上、左、下、右、決定、戻る
；％％８：＊；カーソル
；％％９：２０　；フレームレートは二十。
＞＞＞＃＃＃　；一つ前の遷移に戻る。
＞＞＞＃かきく　；常にジャンプ；｛１｝＞＞＞＃あああ　で統一。
「｛＄＄＄｝」 //allow the big
```
