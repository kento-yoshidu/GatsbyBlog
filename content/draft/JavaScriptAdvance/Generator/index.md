---
title: "ジェネレーター"
postdate: "2021-01-01"
updatedate: "2020-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript", "ジェネレーター"]
---

## ジェネレーター関数

<!--ジェネレーター関数は、**イテレーター**を作成するための関数です。-->
ジェネレーター関数は、**ジェネレーターオブジェクト**を作成するための関数です。

ジェネレーター関数を作成し、さらにジェネレーターオブジェクトを作成してみたいと思います。まずはジェネレーター関数の作成からですね。ポイントは2つあり、`function`の後に`*`を付けること、関数内で`yield`キーワードを使用することです。

```javascript
// ジェネレーター関数
function* myGenerator() {
  console.log('first');
  yield;

  console.log('second');
  yield;

  console.log('third');
}
```

ジェネレーター関数は、**ジェネレーターオブジェクト**を返します。

では`myGenerator`を利用し、**ジェネレーターオブジェクト**`gen`を作成します。試しにコンソール出力してみると、`gen`がどうやらジェネレーターオブジェクトっぽいことが分かります。

```javascript
// ジェネレーターオブジェクト
const gen = myGenerator();

console.log(gen);
//=> Object [Generator] {}
```

ジェネレーターオブジェクトは、`next()`を呼ぶことで、ジェネレーター関数を実行することができます。

```javascript
const gen = myGenerator();

gen.next();
//=> first
```

`next()`を呼ぶと、**最初のyieldキーワード**が出現するまでの内容が実行されます。最初の`yield`の前には`first`を出力する`console`文しかないので、`first`のみが出力されます。

続けて`next()`を呼び出していきます。

```javascript
const gen = myGenerator();

gen.next(); //=> first
gen.next(); //=> second
gen.next(); //=> third
```

`next()`を実行すると、`yield`が出現するところまでを実行し、そこで一時停止するイメージです。再度`next()`を呼ぶことで、次の`yield`までを実行することができます。

戻り値がイテレーターリザルトであることがわかります。以下は、`next()`を実行した時に返ってくる入れてーたーオブジェクトを1回ずつコンソール出力した様子です。

```javascript
const gen = myGenerator();

let g = gen.next(); //=> first

console.log(g) //=> { value: undefined, done: false }

g = gen.next(); //=> second

console.log(g); //=> { value: undefined, done: false }

g = gen.next(); //=> third

console.log(g); //=> { value: undefined, done: true }
```


## 値を渡す

```javascript
// ジェネレーター関数
function* myGenerator() {
  let text = yield;
  console.log(`My name is ${text}`)
}

const gen = myGenerator();

gen.next();
gen.next("Kento");
```


## 参考

[](https://zenn.dev/phi/articles/javascript-generator-fibonacci)