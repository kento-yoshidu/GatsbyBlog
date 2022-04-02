---
title: "変数"
postdate: "2021-01-01"
updatedate: "2021-01-01"
categoryName: "JavaScript中級者を目指す"
categorySlug: "JavaScriptAdvance"
description: ""
tags: ["JavaScript", "Iterator"]
---

# 変数

変数とは何でしょうか。私は、データ（数値や文字列など）に**名前を付けたもの**だと考えています。

データに名前を付け変数にすることによって、データに意味を持たせ、繰り返し利用することができるようになります。

お店で取り扱っている商品の価格を管理する場合を考えましょう。例えばリンゴが1個100円だとすると、`applePrice`という名前の変数を用意し、そこに`100`を代入するのは自然な変数の使い道だと思います。

```javascript
// applePriceにリンゴ1個あたりの値段を代入する
const applePrice = 100;
```

変数を宣言するには、`const`キーワードもしくは`let`キーワードを用います。実は`var`というキーワードを使って変数を宣言することもできますが、現代のJavaSciptプログラミングでは推奨されません。そのため、この講座では`var`の説明は基本的に行いません。`const`、`let`さえ覚えればプログラミングに困ることはありません。

## constによる変数の宣言

`const`キーワードを用いて変数を定義することができます。`const 変数名 = 初期値;`という風に記述します。

```javascript
// 変数iに 1 を代入
const i = 1;
```

`const`は**constant**の略であり、「定数、不変」といった意味を持ちます。`const`によって宣言された変数は、**値の再代入**ができません。

```javascript:title="script.js
const i = 1;

// 後から2を代入しようとしてエラー
i = 2;
// => TypeError: Assignment to constant variable.

// 後から+1使用としてエラー
i++;
// => TypeError: Assignment to constant variable.

// オブジェクトを定義
const myObj = {};

// オブジェクトに再代入しようとしてエラー
myObj = {id: 1};
// => TypeError: Assignment to constant variable.
```

そして、同じ変数を再度宣言することもできません。シンタックスエラーになります。

```javascript
const i = 1;

// 再度宣言
const i = 10;
//=> SyntaxError: Identifier 'i' has already been declared
```

### 宣言と同時に初期化も行う

`const`を使用する場合、「とりあえず変数を宣言だけして、値は後から代入する」といったことはできません。シンタックスエラーになります。宣言と同時に値を代入して初期化する必要があります。

```javascript
const i;
// => SyntaxError: Missing initializer in const declaration

// 初期化も同時にすればO.K.
const i = 10;
```

### 変数は「不変」ではない？

constant=定数、という言葉から、その値は変わらないイミュータブルなものであると思われるかもしれませんが、必ずしもそうではありません。定数がイミュータブル（=不変）であるかどうかは、何を代入するかによって変わります。

つまり、イミュータブルであるプリミティブ型のデータを代入すればイミュータブルになるし、ミュータブル（=可変）であるオブジェジェクト型のデータを代入すればミュータブルになります。

JavaScriptにおけるプリミティブ型は、`string`、`number`、`boolean`、`symbol`、`null`、`undefined`、`BigInt`でした。これらは、値を後から変更しようとしてもできません。よってイミュータブルな変数であると言えます。

```javascript
const i = 1;

i = 2;
// => TypeError: Assignment to constant variable.
```

しかし、ミュータブルであるオブジェクト型データならどうでしょう。前述の通り、再代入はできませんが、値の変更は可能です。

```javascript
const myObj = {};

myObj.id = 1;
console.log(myObj.id)
//=> 1

// idの値の変更が可能
myObj.id = 2;
console.log(myObj.id)
// => 2

// **再代入**は不可
myObj = {id: 3};
// => TypeError: Assignment to constant variable.
```

MDNでも以下のように述べられています。

>const 宣言は、値への読み取り専用の参照を作ります。これは、定数に保持されている値は不変ではなく、その変数の識別子が再代入できないということです。たとえば、定数の中身がオブジェクトの場合、オブジェクトの内容（プロパティなど）は変更可能です。

[const - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const)

MDNでは**定数**という言葉を用いていますが、私としては**再代入できない変数**であると捉えた方が分かりやすいんじゃないかと思っています。

## letによる変数宣言

`let`キーワードを用いることでも変数を宣言できます。`const`による変数は再代入が不可でしたが、`let`による変数は後から値の再代入が可能です。

```javascript
let i = 1;

// 再代入
i = 10;

console.log(i)
//=> 10
```

また、`let`では変数宣言のみを行うことが可能です。後から必要になったタイミングで値を代入することができます。

`let`を使って変数宣言のみを行った場合、その変数には`undefined`として初期化されます。

```javascript
// 宣言のみも可。後から代入できる。
let j;

console.log(j);
//=> undefined
```

値の再代入は可能ですが、変数の**再宣言**はできません。

```javascript
let i = 0;

let i = 1;
//=> SyntaxError: Identifier 'i' has already been declared
```

### constとlet、どっちを使う？

値が書き換えられるなら`let`キーワードを使った方がいい？と思われるかもしれませんが、実はあまりよろしくありません。**意図しない**値の書き換えが発生するためです。

`const`を使えば、意図しない値の書き換えにも（プリミティブ値なら）JavaScriptがエラーを出してくれます。

基本的には`const`で変数を宣言し、値の書換が必要な時にのみ`let`を使用するのがいいと思います。

### constとletはブロックスコープを持つ

`const`と`let`で宣言された変数は、**ブロックスコープ**を持ちます。よって、`{}`で囲まれている部分の外と中であれば、同じ名前で変数を宣言できます。`{}`が境界線になっているのです。詳しくはブロックスコープの章で解説します。

```javascript
const i = 10;

{
  // {}の中なので、外と同じ名前を利用できる
  const i = 100;

  // {}の中のiの値を出力
  console.log(i);
  //=> 100
}

// {}の外のiの値を出力
console.log(i);
//=> 10
```

## 参考

[メモリ管理 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Memory_Management)
