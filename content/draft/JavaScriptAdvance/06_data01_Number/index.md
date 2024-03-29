---
title: "#5 JavaScriptのデータ型（数値型）"
postdate: "2021-04-28"
updatedate: "2021-04-28"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: "JavaScriptの持つデータ型について解説します。長くなってしまうので前後2つの記事に分けて解説します。"
tags: ["JavaScript"]
---

# JavaScriptのデータ型

JavaScriptに限らない話ですが、ほとんどのプログラミング言語で**データ型**という概念が存在します。

データ型は、ある変数やある値が「整数なのか、少数なのか、文字なのか、複数のデータをひとまとめにしたものなのか」など、**データの種類**を表すものです。言語や文脈によって、**タイプ（Type）**や**型**などとも呼ばれたりします。

データ型の必要性を考える例として、`1 + 1`という式をプログラミング言語に計算させた時の答えを考えてみます。

私たち人間からしてみれば、「数字の1と数字の1を足すんだから、答えは2である」と自然と考えてしまいそうなところです。

ただ、多くのプログラミング言語には**数値型**、そして**文字列型**というデータ型が存在します。数字の1だけではなく、文字列の1が存在するということです。そして、プログラミング言語が`1 + 1`という計算式を実行する時には、それぞれの数値のデータ型が明確になっていなければなりません。

例えば、上記の計算結果を考えたとき、`数字の1 + 数字の1`の答えは`数字の2`であると想像できますが、`文字列の1 + 数値の1`の場合はどうなるでしょうか？`文字列の1 + 文字列の1`の場合は？

これらの計算結果、そして、そもそも計算が行えるかどうかは、言語によって異なります。

JavaScriptにおいては、**暗黙的な型変換**が行われ`文字列 + 数値`という式はエラーにならず計算が行われます。計算結果は以下の通りです。

```javascript
// 数値 + 数値
console.log(1 + 1);
//=> 2

// 数値 + 文字列
console.log(1 + "1");
//=> 11

// 文字列 + 数値
console.log("1" + 1);
//=> 11

// 文字列 + 文字列
console.log("1" + "1");
//=> 11
```

数値と文字列が混在している場合には、数値が文字列に変換され、2つの文字をくっつけたような文字列の`11`という結果が得られるようです。

今回から、JavaScriptが持っているデータ型について、数回に分けて解説します。本ページでは**数値型**について解説します。

## リテラル

まず最初に**リテラル**という用語の解説をはさみます。リテラルとは、数値や文字を直接記述した定数のことです。

難しく考える必要はないんですが、下のコードで

```javascript
const name = "kento";
const age = 18;
```

変数に`kento`や`18`を代入していますが、この`kento`や`18`がリテラルです。また、更に分類して**文字列リテラル**や**数値リテラル**などと呼ぶこともあります。

ソースコードにべた書きした**数値や文字列そのもの**のことを言ってるんだなーくらいに考えてもらえれば大丈夫です。

リテラルという単語はこれから何度も使用しますので覚えておいてください。いまいちピンと来ていない方も、読み進めていくうちにわかると思います。

## JavaScriptは動的型付け言語

**「JavaScriptにはデータ型がない」**

もしかしたら、このような文言をどこかで見かけたことがあるかも知れません。もうお分かりだと思いますが、これは間違いです。

JavaScriptでは変数宣言時、データ型を指定する必要がありません（というより指定できない）。これが上記のような誤解を引き起こしたのかもしれませんが、JavaScriptは、自動的に型を判定し変数に割り当てる仕組みをもっています。

```javascript
// 変数iは自動的に数値型の変数になる
let i = 1;
```

[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Data_structures)でも

>JavaScript では、変数が直接的に特定のデータ型に関連付けられているわけではなく、どの変数にもあらゆる型の値を代入(および再代入)できます。

と述べられています。

また、後から違うデータ型の値を再代入することも可能です。

```javascript
// 数値型の変数i
let i = 1;

// 文字列を代入することができる
i = "hello";
```

このように、自動的に型を付与してくれたり後から型を変更できる型システムを持った言語は、**動的型付け言語**と呼ばれ分類されます。JavaScriptは動的型付け言語です。

逆に、後からデータ型を変更できない言語を**静的型付け言語**と言います。JavaScriptの親戚である**TypeScript**はまさに静的型付け言語です。

TypeScriptでは、変数宣言時、`変数名: データ型`という風に変数の型を明示的に宣言することができます。例えば数値型の変数に文字列型の値を入れようとするとコンパイル時にエラーが発生します。

```typescript
// iは数値型であると宣言
let i: number = 1

// 数値型であると宣言しているのに、文字列を代入しようとしているのでエラー
let j: number = "hello"
// error TS2322: Type 'string' is not assignable to type 'number'.
```

また、違うデータ型の値を後から代入することも不可能です。

```typescript
// 数値型で宣言
let i :number = 1

// 文字列型を代入しようとしているのでエラー
i = "string"
// error TS2322: Type 'string' is not assignable to type 'number'.
```

話が逸れてしまうのでTypeScriptは別で勉強したいと思います。まずは以下の点だけ押さえておけばOKです。

- JavaScriptは**動的型付け言語**である
- 変数に型が自動で付与され、途中で型が変わる可能性もある

[javascriptの変数のメモリへの割当について｜teratail](https://teratail.com/questions/72635)

## 数値型

数値型は文字通り、**数**を指します。10進数、2進数、8進数、16進数、浮動小数点数などが表現できます。

JavaScriptにおいて数を表すデータ型は2種類です。今回解説する数値型と、非常に大きな整数を表すBigInt型です。

言語によっては整数と浮動小数点数でデータ型が分かれていたり、桁数によって分かれていたりもしますが、JavaScriptにおいてはこのような分け方はされておらず、上記2種類のみです。

### 10進数

10進数を表現するのは簡単です。私たちが普段使っている通りに数を記述すれば、それがそのまま10進数リテラルになります。

`.`を付ければ小数点を表現できますし、`-`を付ければ負の数を表現できます。

```javascript
console.log(1);
//=> 1

console.log(-10.5);
//=> -10.5
```

しかし、先頭に`0`を付けてはいけません。`0`を付けると8進数とみなされ、strictモードではエラーが発生します。8進数についてはこの後解説します。

```javascript
"use strict"

console.log(077)
//=>SyntaxError: Octal literals are not allowed in strict mode.
```

<aside>

正確には、JavaScriptの数値型は全て[IEEE754](https://ja.wikipedia.org/wiki/IEEE_754)に準拠した64bitの浮動小数点数です。整数ではありません。「内部的に浮動小数点数で持ち、画面に表示する時に整数っぽく見せてくれている」ということです。これはまた別にページを設けたいと思います。

</aside>

ここで**typeof演算子**を紹介します。`typeof 変数や値`の形で記述すれば、その変数や値の**データ型**を返してくれる演算子です（一部**バグ**がありますが、、、後のページで紹介します）。

```javascript
console.log(typeof 1)
//=> number

console.log(typeof 1.1)
//=> number

console.log(typeof -1)
//=> number
```

この通り、整数も小数点も負の数も全てnumber（数値）型で一括りにされていることがわかります。`typeof`は他のデータ型の紹介部分でも使用しますので、覚えておいてください。

続けて、いくつかの計算演算子を使って計算もしてみましょう。

```javascript
console.log(1 + 2)
//=> 3

console.log(1.1 + 3.8)
//=> 4.9

console.log(1 - 3)
//=> -2
```

計算演算子については、演算子のページで詳しく触れます。

<aside>

小数点数が混じった式の計算をすると、意図しない結果が出力される可能性があります。

```javascript
console.log(0.1 + 0.2);
//=> 0.30000000000000004

console.log(0.3 === (0.1 + 0.2))
//=> false

console.log(1.3 + 1.1);
//=> 2.4000000000000004
```

前述しましたが、JavaScriptの数値型は64bitの浮動小数点数で値を持っているためです。これはJavaScriptに限った話ではありませんが、64bitという限られた値の中で循環小数を扱うことが出来ないために発生する結果です。

こちらも別でページを用意したいと思います。今は「こんなこともあるんだなー」くらいで考えてもらえばOKです。

</aside>

<!--

このような書き方もできる。

```js
console.log(1e10);
//=> 10000000000
```

-->

### 2進数[ES2015]

2進数は`0b`もしくは`0B`を先頭に付与し（Binaryのb）、続けて`0`か`1`を記述することで表現します。2進数リテラルはES2015から導入されました。

`0`と`1`以外の数値を使用した時はシンタックスエラーになります。また、`typeof`で`number`が出力されることも確認しておきましょう。

```javascript
console.log(0b11)
//=> 3

// 2を使ってるからエラー
console.log(0b12)
//=> SyntaxError: Invalid or unexpected token

console.log(typeof 0b11)
//=> number
```

### 8進数

8進数リテラルは`0o`もしくは`0O`を先頭に付与し（OctocalのO）、続けて`0`から`7`までの数値を記述することで表現します。8進数リテラル自体はES5以前からありましたが、`0o`、`0O`を用いたリテラル表現の導入はES2015からです。

```javascript
console.log(0o11)
//=> 9

console.log(typeof 0o11)
//=> number

// 8を使ってるからエラー
console.log(0o8)
//=> SyntaxError: Invalid or unexpected token
```

ES5までは先頭に`0`を付与して8進数リテラルを表現していたようですが、非常に分かりにくいですね。ただ、前述しましたが、現在はstrictモード配下ではこの記述方法はエラーになります。

```javascript
// "use starict";
// strictモードの記述をコメントアウト

// これでも8進数
console.log(011)
//=> 9
```

### 16進数

16進数リテラルは`0x`もしくは`0X`を先頭に付与し(heXadecimalのX)、続けて`0`から`9`までの数字か`a`から`f`までのアルファベットを記述することで表現します。また、アルファベットは大文字でも小文字でも構いません。

```javascript
console.log(0xff);
//=> 255

console.log(typeof 0xff);
//=> number

console.log(0xgg)
//=> SyntaxError: Invalid or unexpected token

// 大文字でも小文字でもOK
console.log(0xFf)
//=> 255
```

### 浮動小数点数

浮動小数点リテラルは`.`で小数点を表すか、`e`もしくは`E`を用いて指数表現の形で記述します。

```javascript
console.log(1.1);
//=> 1.1

console.log(314e-2);
//=> 3.14
```

浮動小数点数に関しては別サイトですが、こちらが分かりやすいいです。

[ビットで表す数字の世界～浮動小数点編～ - 半導体事業 - マクニカ](https://www.macnica.co.jp/business/semiconductor/articles/intel/133327/)

## 数値型で正確に扱える最大の数値

何度か言及していますが、数値型は倍精度浮動小数であるため、2^53-1（2の53乗マイナス1）よりも大きい数値を用いて計算した場合、正確に答えを求められない場合があります。

### NaN

次は、ちょっと分かりにくいですが、**数字ではない**ことを表すNaNです。数字を表しませんが、数値型です。計算できないものを計算しようとしたときなどに現れます。`NaN`というリテラルも用意されています。`typeof`で`number`が返ってくることから、数値型であることが分かります。

```javascript
console.log(NaN);
//=> NaN
```

例えば数値型の2を文字列型の2で割った時には1が返ってきます（JavaScriptが気を効かせて文字列を数値に変換した上で計算してくれています）。ですが、`test`など数値に変換しようのない文字列で割ると`NaN`が返ってきます。

```javascript
console.log(2 / "2");
//=> 1

console.log(2 / "test");
//=> NaN
```

`NaN`は、自分自身を含む、どんなものとも一致しない（つまり、等価演算子でtrueが返ってこない）という性質を持っています。

```javascript
console.log(NaN === NaN)
//=> false

console.log(NaN == NaN)
//=> false

console.log(NaN === 1)
//=> false

console.log(NaN === true)
//=> false

console.log(NaN === false)
//=> false
```

```javascript
console.log(Number.isNaN(NaN));
//=> true

console.log(Number.isNaN(1 - 'string'));
//=> true
```

### Infinity

```javascript
const i = 10 ** 1000;

console.log(i);
```

[データ型とリテラル · JavaScript Primer #jsprimer](https://jsprimer.net/basic/data-type/)

[IEEE 754 - Wikipedia](https://ja.wikipedia.org/wiki/IEEE_754)

[The history of “typeof null”](https://2ality.com/2013/10/typeof-null.html)

### Numeric Separator[ES2021]

ES2021から、任意の位置で数値を`_`で区切れる**Numeric Separator**が導入されました。これは大きな数値リテラルを表現する時に便利です。

大きな数値`1000000000`を見てもすぐには数を把握できませんよね。こういう時は3桁ごとに区切ってあげると幾分分かりやすくなります。

```javascript
// 10億
const num = 1_000_000_000;

console.log(num / 10);
//=> 100000000 # 1億
```

また、正の整数リテラルだけではなく、負の数、小数点数、そして後に紹介するBigInt型にも適用可能です。

```javascript
// 2進数
const numBin = 0b1100_0000 + '.' + 0b1010_1000;

console.log(numBin);
//=> 192.168

// 16進数
const numHex = 0xFF_FF;

console.log(numHex);
//=> 65535

const numBig = 111_111_111_111_111_111_111n

console.log(numBig)
//=> 111111111111111111111n
```

## 参考

[【JavaScript】0011は3じゃない！？2進数、8進数、16進数を表現する数値リテラルについて(知らない人向け) - Qiita](https://qiita.com/isoken26/items/a4fe52cc6015dbf4efed)

[tc39/proposal-numeric-separator: A proposal to add numeric literal separators in JavaScript.](https://github.com/tc39/proposal-numeric-separator)

[JavaScript クイズ解説: NaN === NaN の結果はどうなる？](http://nmi.jp/2021-09-09-NaN)