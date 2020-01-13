# tamlin
```
tamlin(macro,(mes,me)=>{
 //mes
})
```

## controller
```
 c.keys={37:'<',39:'>',38:'^',40:'v',70:'A',68:'B',65:'X',83:'Y',82:'R',69:'L'}
```
## macro
```
MRK(`＃開始`,i);
RTN(`あいうえを入れておく`);「「あいうえを入れておく」」 //RTN set to $$$
_(`＄０２＝＄＄＄`); //＄０２＝＄＄＄； evl inner toSmall
RTN(_(`＄０１＋１０＋１０＊２`));//｛＄０１＋１０＋１０＊２｝
MES(`結果は１０３０ですか${$$$}`);//「結果は１０３０ですか｛＄＄＄｝」
SEL(`選択肢は先頭に米印、行頭はリストではない。問として処理される。
あ
い
う
え
`); //＊「…」
IFJ(_(`＄１１＝＝－１`),`＃いいえ`); //｛＄１１＝＝－１｝＞＞＞＃いいえ；
```
```

＃開始　；ラベル。
；先頭；はコメント。末尾コメントは；。
；ユーザ変数は＄＋数字２文字のみ。例えば、＄００
「「あいうえを入れておく」」
＄０２＝＄＄＄；同じ意味「あいうえを入れておく」
＄０１＝１０００
；変数への代入が不要な場合は＄＄＄に入れる。
｛＄０１＋１０＋１０＊２｝
「結果は１０３０ですか｛＄＄＄｝」

｛２０｝
｛＄＄＄－２０｝
「結果はゼロ。｛＄＄＄｝」

；結果は＄＄＄か＄＄＋数字に入る。複数の結果が有る場合、＄＄０　＄＄１。
「「二重括弧は、出力されないが、＄＄＄に代入される。
複数行の代入を可能にする手段。この時点では文字列」」
＄２２＝＄＄＄；代入しておく。
「直前の結果は｛＄＄＄｝に入る」
「」
「」
＊「選択肢は先頭に米印、行頭はリストではない。問として処理される。
あ
い
う
え
」
＄１１＝＄＄＄；
｛＄１１＝＝－１｝＞＞＞＃いいえ；キャンセルされた場合。＄＄＄には－１がはいる。
｛＄１１＝＝０｝＞＞＞＃いち　；選択肢一番の場合。
｛＄１１＝＝１｝＞＞＞＃あいうえを　；選択肢２番の場合。
｛＄１１＝＝２｝＞＞＞＃かきく　
｛１｝＞＞＞＃かきく

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

```
