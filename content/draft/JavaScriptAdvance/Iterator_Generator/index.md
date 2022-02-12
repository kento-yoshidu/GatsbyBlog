---
title: "イテレーター"
postdate: "2099-01-01"
updatedate: "2099-01-01"
categoryName: "JavaScript中級者を目指す"
categorySlug: "JavaScriptAdvance"
description: ""
tags: ["JavaScript", "Iterator"]
---

# イテレーターとジェネレーター

今回と次回にわたって、イテレーターとジェネレーターについて解説します。

イテレーターとは、「値を一つずつ取り出すことのできるオブジェクト」です。iterateは「繰り返す」「反復する」という動詞ですから、何となく意味は分かりますね。

イテレーターはただ一つ`next`メソッドを持っており（ES2021現在）、これを呼ぶたびにイテレーターから値が一つずつ順番に返ってきます。

イテレーターを作成するには2種類の作成方法があります。

1つ目がイテレーターを作成してくれるメソッドを使用する方法、そしてもう一つがジェネレーター関数を作成し使用する方法です。このように、イテレーターとジェネレーターは紐づいています。ジェネレーター関数については、次の記事で解説します。

<!--ややこしいのは、IteratorとIterableという2つの似たようなものが存在するという事です。まずはiteratorの例を見て、Iteratorが何かという事を考えたいと思います。-->

## イテレーターを使ってみる

何はともあれ、まずはイテレーターを作成してみます。今回は、ビルドインメソッドとして用意されている`Array.prototype.values`を使用します。このメソッドは配列をイテレーターとして返してくれます。

> values() メソッドは、配列の各インデックスの値を含む新しい Array Iterator オブジェクトを返します。

参考 : [Array.prototype.values() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

```javascript
const iterator = [1, 2, 3].values();

console.log(iterator);
//=> Object [Array Iterator] {}
```

出力してみると`Object [Array Iterator] {}`と出てくるので何だかイテレーターっぽいですね。

先ほど、

> iteratorはただ一つ`next`メソッドを持っており（ES2021現在）、これを呼ぶたびにイテレーターから値が一つずつ順番に返ってきます。

と説明しましたが、これが本当かどうかを検証してみたいと思います。

```javascript
const iterator = [1, 2, 3].values();

console.log(iterator.next());
//=> { value: 1, done: false }

console.log(iterator.next());
//=> { value: 2, done: false }

console.log(iterator.next());
//=> { value: 3, done: false }

console.log(iterator.next());
//=> { value: undefined, done: true }
```

`value`やら`done`などの見覚えのないプロパティが存在していますが、この辺りはこの後解説しますので置いといてください。

`next()`を呼び出すことで`value`プロパティの値が`1`→`2`→`3`と変化していっており、値を順番に取り出せていることがわかります。

また、4回目の呼び出しの結果は、`value`がundefinedで`done`が`ture`になっていることを覚えておいてください。

## イテレーターの特徴

では改めて、イテレーターの特徴を考えてみたいと思います。

1. `next()`を持つオブジェクトである
2. `next()`を使用することで、自身が持つ値を順番に取り出すことができる
3. `next()`の戻り値はオブジェクトであり、`value`プロパティと`done`プロパティを持つ
4. イテレーターが持つ値は`value`プロパティに格納される
5. 値を全て取り出し終えていない時は`done`プロパティの値はfalseであり、取り出し終えた状態だと`true`である

以上の5つが満たされていればイテレーターであると言えます。

上記サンプルコードの`iterator`オブジェクトはこれが全て当てはまっていることが分かります。

なお、`next()`の戻り値であるオブジェクトは、特に**イテレーターリザルト**と呼ばれることがあります。

## イテレーターを自作する

試しにイテレーターを自作してみましょう。その方がきっと理解が進みます。

上記の5つの条件を踏まえ、このようなイテレーターを作成しました。

```js
const iterator = {
  value: 0,

  next: function() {
    if (this.value < 3) {
      return {
        value: this.value,
        done: false
      }
      this.value++;
    } else {
      return {
        done: true
      }
    }
  }
}
```

`next()`をもち、`value`の値が3以下であれば

参考 ： [【JavaScript】 Iterator(イテレーター)とは？避けて通りたいけど説明してみる](https://note.affi-sapo-sv.com/js-iterator.php)



## `for...of`はイテラブル

`next()`を呼び出さなくても、`for...of`構文を使用することでIteratorを扱うことができます。

```ts
for (const i of iterator) {
  console.log(i)
}
```

`for-of`にはiterableを渡します。iteratorではありません。

## Iterableなオブジェクト

次は**Iterableなオブジェクト**です。Iterableなオブジェクトは**Iteratorを生成する+**ことができます。

[Symbol.iterator]() メソッドが実装されている事。メソッドを呼ぶことで新しいイテレーターオブジェクトが返ります。


イテラブルなオブジェクトは以下のような方法で処理できます。

- for-of文
- スプレッド演算子


## `for-of`文

iterableを扱うために、`for-of`文を使用するのが簡単です。

```javascript
const arr = [1, 2, 3];

for(const num of arr) {
  console.log(num)
}
//=> 1
//=> 2
//=> 3
```

for-ofに**iterable**を渡すと**iterator**が作成され、値を順番に寄り出すことができます。

```javascript
// 空のオブジェクトを作成
const iterator = {};

// nextメソッドを実装
iterator.next = () => {
	const iteratorResult = { value: 1, done: false};
	return iteratorResult;
}
```

## iterable

反復可能なオブジェクトを**イテラブルなオブジェクト**といい、以下、**iterable**と呼びます。`Array`や`Map`など。

そして、イテラブルなオブジェクトはiteratorを持ちます。iteratorは`Iterble[Symbol.iterator]()`で取得することができます。

```javascript
const arr = [1, 2, 3];
const myIterator = arr[Symbol.iterator]();

console.log(myIterator)
//=> Object [Array Iterator] {}
```

|名称|メソッド|メソッドを使用すると|
|----|------|-----------------|
|iterable|[Symbol.iterator]\()|iteratorを取得できる|
|iterator|next()|iteratorリザルトを取得できる|

## iterator

```javascript
console.log(myIterator.next())
//=> { value: 1, done: false }
```

## オブジェクトはiterableではない

```javascript
const obj = { a: 1, b: 2 };

for (const num of obj) {
	console.log(num)
}
//=> TypeError: obj is not iterable
```

```javascript
const obj = { a: 1, b: 2 };

const iterableObj = Object.keys(obj);

console.log(iterableObj)

for (const key of iterableObj) {
	console.log(`key=>${key} : value=>${obj[key]}`)
}
```

## 参考

[](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Iterators_and_Generators)

[Objectオブジェクトについて[組み込みオブジェクト]](https://noumenon-th.net/programming/2017/02/02/object-built/)

[Array.prototype.values() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

[JavaScriptのIterator / Generatorの整理](https://zenn.dev/qnighy/articles/112af47edfda96)

[反復可能なオブジェクト](https://ja.javascript.info/iterable)

[JavaScriptのIteratorとGeneratorを使って反復処理を書く](https://sbfl.net/blog/2016/08/17/javascript-iterator-generator/)

[JavaScript iterators and generators: A complete guide - LogRocket Blog](https://blog.logrocket.com/javascript-iterators-and-generators-a-complete-guide/#:~:text=With%20the%20introduction%20of%20ES6,object%20that%20follows%20the%20specification.)

[JavaScriptのイテレータが持つメソッドをそろそろ知っておきたい人が読む記事 - Qiita](https://qiita.com/uhyo/items/cc68e66e4008a66f3d94)

[tc39/proposal-iterator-helpers: Methods for working with iterators in ECMAScript](https://github.com/tc39/proposal-iterator-helpers)

[JavaScript の イテレータ を極める！ - Qiita](https://qiita.com/kura07/items/cf168a7ea20e8c2554c6)

[【javascript】イテラブル - Qiita](https://qiita.com/oouaioi/items/d00fe83800ba613a0de7)

[JavaScriptプログラミング講座【Iterator について】](https://hakuhin.jp/js/iterator.html)

[JavaScript のジェネレーターでフィボナッチ数列を返す関数作ってみた](https://zenn.dev/phi/articles/javascript-generator-fibonacci)

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

