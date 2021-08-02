---
title: "変数"
postdate: "2021-01-01"
updatedate: "2021-01-01"
categoryName: "JavaScript中級者を目指す"
categorySlug: "JavaScriptAdvance"
description: ""
tags: ["JavaScript", "Iterator"]
---

# constとletによる変数の宣言

## constによる変数の宣言

`const`キーワードを用いて変数を定義することができます。`const`は**constant**の略であり、「定数、不変」といった意味を持ちます。`const`によって宣言された変数は、**値の再代入**ができません。

```javascript:title="script.js
const i = 1;

i = 2;
// => TypeError: Assignment to constant variable.

i++;
// => TypeError: Assignment to constant variable.

const myObj = {};

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

### 宣言と同時に初期化も行う

`const`を使用する場合、「とりあえず変数を宣言だけして、値は後から代入する」といったことはできません。シンタックスエラーになります。宣言と同時に値を代入して初期化する必要があります。

```javascript
const i;
// => SyntaxError: Missing initializer in const declaration

// 初期化も同時に
const i = 10;
```

### 値は書き換えが可能

constant=定数、という言葉から、その値は変わらないイミュータブルなものであると思われるかもしれませんが、必ずしもそうではありません。定数がイミュータブルであるかどうかは、何を代入するかによって変わります。

つまり、イミュータブルであるプリミティブ型のデータを代入すればイミュータブルになるし、ミュータブルであるオブジェジェクト型のデータを代入すればミュータブルになります。

JavaScriptにおけるプリミティブ型は、`string`、`number`、`boolean`、`symbol`、`null`、`undefined`、`BigInt`でした。これらは、値を後から変更しようとしてもできません。よってイミュータブルな定数であると言えます。

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

myObj.id = 2;
console.log(myObj.id)
// => 2

myObj = {id: 3};
// => TypeError: Assignment to constant variable.
// **再代入**は不可
```

```javascript
const myObj = {};

myObj.id = 1;

console.log(myObj.id)
//=> 1

myObj.id = 2;

console.log(myObj.id)
//=> 2
```

MDNでも以下のように述べられています。

>const 宣言は、値への読み取り専用の参照を作ります。これは、定数に保持されている値は不変ではなく、その変数の識別子が再代入できないということです。たとえば、定数の中身がオブジェクトの場合、オブジェクトの内容（プロパティなど）は変更可能です。

[const - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const)

MDNでは**定数**という言葉を用いていますが、私としては**再代入できない変数**であると捉えた方が分かりやすいんじゃないかと思っています。

---

[メモリ管理 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Memory_Management)

---

## letによる変数宣言

`let`キーワードを用いることでも変数を宣言できます。`const`による変数は再代入が不可でしたが、letによる変数は後から値の再代入が可能です。

```javascript
let i = 1;

// 再代入
i = 10;

console.log(i)
//=> 10
```

また、`let`では変数宣言のみを行うことが可能です。後から必要になったタイミングで値を代入することができます。

```javascript
// 宣言のみも可。後から代入できる。
let j;

j = 10;

console.log(j);
//=> 10
```
