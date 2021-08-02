---
title: "Iterator"
postdate: "2021-01-01"
updatedate: "2021-01-01"
categoryName: "JavaScript中級者を目指す"
categorySlug: "JavaScriptAdvance"
description: ""
tags: ["JavaScript", "Iterator"]
---

# IterableとIterator

Iterator（イテレーター）とは、「値を一つずつ取り出すことのできるオブジェクト」です。iterateは「繰り返す」「反復する」という動詞ですから、何となく意味は分かりますね。

Iteratorは`next`メソッドを持っており、これを呼ぶたびにIteratorから値が一つずつ順番に返ってきます。

ややこしいのは、IteratorとIterableという2つの似たようなものが存在するという事です。まずはiteratorの例を見て、Iteratorが何かという事を考えたいと思います。

## Iteratorを使ってみる

Iteratorには2種類の作成方法があります。1つ目にGenerator関数を使用する方法、もう一つはIteratorを作成してくれるメソッドを使用する方法です。

後者の方法として`Array.prototype.values`メソッドを使用します。このメソッドは配列をIteratorとして返してくれます。

> values() メソッドは、配列の各インデックスの値を含む新しい Array Iterator オブジェクトを返します。

参考 : [Array.prototype.values() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

```javascript
const iterator = [1, 2, 3].values();

console.log(iterator);
//=> Object [Array Iterator] {}
```

出力してみると`Object [Array Iterator] {}`と出てくるので何だかIteratorっぽいですね。

先ほど、

> iteratorは`next`メソッドを持っており、これを呼ぶたびにイテレーターから値が一つずつ順番に返ってきます。

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

また、4回目の呼び出しの結果は、`value`がundefinedで`done`が`ture`にあっていることも分かります。

## Iteratorの定義

では改めて、Iteratorの定義を考えてみたいと思います。

1. `next()`を持つオブジェクトである
2. `next()`を使用することで、自身が持つ値を順番に取り出すことができる
3. `next()`の戻り値はオブジェクトであり、`value`プロパティと`done`プロパティを持つ
4. 自身が持つ値は`value`プロパティに格納される
5. 値を全て取り出し終えていない時は`done`プロパティの値はfalseであり、取り出し終えた状態だと`true`である

以上の5つが満たされていればIteratorであると言えます。

上記サンプルコードの`iterator`オブジェクトはこれが全て当てはまっていることが分かります。

なお、`next()`の戻り値であるオブジェクトは、特に**Iteratorリザルト**と呼ばれることがあります。

## Iteratorを反復処理する

`for-of`にはiterableを渡します。iteratorではありません。




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

[Objectオブジェクトについて[組み込みオブジェクト]](https://noumenon-th.net/programming/2017/02/02/object-built/)

[Array.prototype.values() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

https://scleapt.com/javascript_iterator/

[JavaScriptのIteratorとGeneratorを使って反復処理を書く](https://sbfl.net/blog/2016/08/17/javascript-iterator-generator/)

https://blog.logrocket.com/javascript-iterators-and-generators-a-complete-guide/#:~:text=With%20the%20introduction%20of%20ES6,object%20that%20follows%20the%20specification.

https://www.javadrive.jp/javascript/start/index1.html