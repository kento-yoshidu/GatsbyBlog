---
title: "prototype"
postdate: "2021-04-28"
updatedate: "2021-04-28"
categoryName: "JavaScript中級者を目指す"
categorySlug: "JavaScriptAdvance"
description: "JavaScriptの持つデータ型について解説します。長くなってしまうので前後2つの記事に分けて解説します。"
tags: ["JavaScript"]
---

# 

空のオブジェクトのはずなのに、`toString()`はどこから来た？

```javascript
console.log({}.toString())
//=> [object Object]
```

JavaScriptのオブジェクトと言えば、`Array`、`Function`などが挙げられますが、これらのオブジェクトは、`Object`オブジェクトを継承しています。

`Object`は**prototype**というプロパティを持っており、`Object`を継承している`Array`などのオブジェクトは、この`prototype`プロパティがもつ`toString()`などのメソッドを継承することになります。

```javascript
console.log(Object.prototype.toString)
//=> [object Object]
```

`Object`オブジェクトは、オブジェクトの共通の特徴・機能を提供する、ベースとなるオブジェクトであると言えます。

## プロトタイプチェーン

インスタンスから`prototype`にあるメソッドを参照できる仕組み。


## `hasOwnProperty`と`in`

`hasOwnProperty`はそのオブジェクト自身が指定したプロパティを持っているかを判定。例えば`{}`でも`toString`を利用できますが、それは`Object.prototype`から継承されているから利用できるのであって、`{}`自身が持っているわけではありません。よって、結果は`false`になります。

```javascript
console.log({}.hasOwnProperty("toString"));
//=> false
```

オブジェクトに`toString`メソッドを独自に定義すれば、`hasOwnProperty`は`true`を返します。

```javascript
const obj = {
	toString() {
		return "Original toString"
	}
};

console.log(obj.hasOwnProperty("toString"));
//=> true
```

`in`演算子は、`Object.prototype`まで、継承元をさかのぼって、メソッドが存在しているかを返します。

```javascript
console.log("toString" in {});
//=> true
```

## Arrayオブジェクト

Arrayオブジェクトも、`Array.prototype`を持っている。Arrayオブジェクト自身もObjectオブジェクトを継承しているので、`Array.prototype`は`Object.prototype`を継承したものです。

```javascript
console.log("toString" in []);
//=> true

console.log([].hasOwnProperty("toString"))
//=> false

console.log(Array.hasOwnProperty("toString"))
//=> false

console.log("toString" in Array);
//=> true
```

`Object.create(null)`でメソッドを一切継承しない、真の意味で空のオブジェクトを生成できる。

```javascript
const obj = {};

console.log(obj.toString())

const obj2 = Object.create(null);

console.log(obj2.toString())
//=> TypeError: obj2.toString is not a function
// toString()が継承されていないことが分かる
```

ES2015から`Map`が登場したため使用しなくてもいい。


[](https://qiita.com/howdy39/items/35729490b024ca295d6c)

[JavaScriptの「継承」はどう定義されるのか？　仕様書を読んで理解する - Qiita](https://qiita.com/uhyo/items/b63ac11e8ec54d2c3a2b)

[JavaScriptのオブジェクト指向が10%理解できる記事（実践編） - Qiita](https://qiita.com/uhyo/items/ab8e273e1eb71d02e29a)

[や...やっと理解できた！JavaScriptのプロトタイプチェーン - maeharinの日記](https://maeharin.hatenablog.com/entry/20130215/javascript_prototype_chain)