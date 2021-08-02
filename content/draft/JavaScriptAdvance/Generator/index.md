---
title: "ジェネレーター"
postdate: "2021-01-01"
updatedate: "2020-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript", "ジェネレーター"]
---

# ジェネレーター

ジェネレーター関数を作成してみます。ポイントは2つ、`function`の後に`*`を付けること、関数内で`yield`キーワードを使用することです。

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

続けて、ジェネレーターオブジェクト`gen`を作成します。試しにコンソール出力してみると、どうやらジェネレーターオブジェクトっぽいことが分かります。

```javascript
// ジェネレーター
const gen = myGenerator();

console.log(gen);
//=> Object [Generator] {}
```

ジェネレーターオブジェクトは**イテレーターオブジェクトでもあり**、`next()`を呼ぶことができます。

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