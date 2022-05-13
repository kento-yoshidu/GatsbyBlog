---
title: "eval"
postdate: "2099-01-01"
update: "2099-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: "evalについて紹介します。"
tags: ["JavaScript"]
keywords: ["eval"]
published: false
---

# evalって何？

使用することはほぼありません。

evalには数値を渡します。数値以外を私は場合は、その値がそのまま返されます。

```js
console.log(eval(1))
//=> 1

console.log(eval({x: 1}))
//=> { x: 1 }
```

で、文字列を渡した場合には、JavaScriptコードとして実行されます。

```js
console.log(eval("console.log('Hello World')"))
//=> Hello World
```

渡した文字列がJavaScriptコードとして評価できなかった場合にはシンタックスエラーとなります。

```js
console(eval("console.log('Hello World')"))
// TypeError: console is not a function
```

最後の式が評価され、返されます。最後の式に値がなければ`undefined`が帰ります。

```js
console.log(eval("x = 1; y = 10"))
//=> 10
```

レキシカルスコープを持ちます。

```js
const num = 1;

function f() {
  const num = 100;

  eval("console.log(num)");
}

f();
```

このように変数が書き換えられることもあります。

```js
let x = 10;

eval("x = 100");

console.log(x);
```

`const`、または`let`を使って変数を宣言した場合、そのローカルスコープの中でだけ変数は有効です。

```js
eval("let x = 100; console.log(x);")
//=> 100

eval("let y = 100;")

// スコープが違う
console.log(y)
// ReferenceError: y is not defined
```









