---
title: "#x 分割代入"
postdate: "2099-01-01"
updatedate: "2099-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript", "分割代入"]
---

# 分割代入

分割代入は、配列やオブジェクトから**各値やプロパティをバラバラに取り出して**、別個の変数に代入することができる式です。分割代入はES2015で登場しました。

もちろん、分割代入を使用しなくても値を変数に代入することは可能ですが、より短い記述で代入を行うことができます。

Reactではこの分割代入式がふんだんに使用されていますので、Reactの学習を視野に入れている方は気合を入れて覚えましょう。

## 配列の分割代入

まずは配列の場合を考えます。`a`、`b`、`c`をそれぞれ`first`、`second`、`third`に代入したいとします。以下のようなコードは既に勉強しましたね。

```javascript
const arr = ['a', 'b', 'c']

const first = arr[0] //a
const second = arr[1] //b
const third = arr[2] //c
```

特に不満はありません。正しい記述方法です。しかし、これをもっと短く記述できるのが分割代入式です。

配列のように`[]`を用意して、その中に変数名を書いていくことで値を別個に受け取ることができます。

```javascript
const arr = ['a', 'b', 'c']

const [first, second, third] = arr

console.log(first)		// a
console.log(second)		// b
console.log(third)		// c
```

左辺の受け取る側の変数の数と、右辺の値を持っている配列の長さが同じでなくてもエラーにはなりません（それが良いか悪いかは置いといて）。右辺の配列の長さの方が大きい場合には、余った値は無視されます。

```javascript
const arr = ['a', 'b', 'c']
// 値は3つ

const [first, second] = arr
// 変数は2つ

console.log(first)		// a
console.log(second)		// b
// cは無視される
```

左辺の受け取る側の変数の数の方が大きい場合、値が代入されない変数は`undefined`になります。

```javascript
const arr = ['a', 'b']
// 値は2つ

const [first, second, third] = arr
// 変数は3つ

console.log(first)		// a
console.log(second)		// b
console.log(third)		// undefined
```

また、undefinedを防ぐため、デフォルト値を指定しておくことができます。

```javascript
const arr = ['a', 'b']

const [first, second = 'aaa', third = "c"] = arr

console.log(first)		// a
// 分割代入される

console.log(second)		// b
// デフォルト値としてaaaが指定されているが、値が用意されているのでbが代入される

console.log(third)		// c
// 値が用意されていないので、デフォルト値であるcが代入される
```

### レストパラメーターと組み合わせる

また、前回紹介した**レストパラメーター**と組み合わせることもできます。

以下のコードは、配列の最初の値を`first`、2番目の値を`second`、3番目以降の値を`rest`に代入します。

```javascript
const arr = ['a', 'b', 'c', 'd', 'e']

const [first, second, ...rest] = arr

console.log(first)		// a
console.log(second)		// b
console.log(rest)			// ['c', 'd', 'e']
```

### 任意の位置の値だけを代入する

また、任意の位置の値だけを受け取ることもできます。受け取りたくない場所に変数を記述しないことで代入されることを防ぎます。

上手く日本語化できないので以下のコードを見てください。配列の一番目の値を`first`、4番目以降を`rest`に代入します。2,3番目の値は無視します。

これはぱっと見でやっていることが分かりくいので、私はあまり好きではありません。

```javascript
const arr = ['a', 'b', 'c', 'd', 'e'];

const [first, , , ...rest] = arr;
// カンマで区切って飛ばす

console.log(first);		// a
console.log(rest);    // ['d', 'e']
```

### 変数の値を入れ替える

分割代入式を利用し、1行で変数の値を入れ替えることができます。知らなければ少し混乱する記述ですね。

```javascript
let str1 = "111";

let str2 = "222";

[str1, str2] = [str2, str1]

console.log(str1) // 222
console.log(str2) // 111
```

### 戻り値を分割代入する

関数の戻り値（配列）を分割代入することも当然できます。これはとてもコードがすっきりしますね。

```javascript
function func() {
	return [1, 2]
}

const [a, b] = func()
// a = 1, b = 2
```

## オブジェクトの場合

オブジェクトに関しても、各プロパティの値を別個の変数に代入することができます。

分割代入を使わないのであれば、以下のように代入を行います。

```javascript
const obj = {
	name: 'kento',
	age: 18,
};

const name = obj.name; // kento
const age = obj.age;		// 18
```

分割代入なら以下のように書けます。

```javascript
const obj = {
	name: 'kento',
	age: 18,
};

const { name } = obj;
const { age } = obj;

console.log(name); // kento
console.log(age);	 // 18
```

オブジェクトのプロパティ名と代入する変数名が同じであれば、このようにシンプルに記述することができます。見やすさのために`name`と`age`への代入をそれぞれ分けましたが、1行で記述することができます。

```javascript
const obj = {
	name: 'kento',
	age: 18,
};

const { name, age } = obj;
```

プロパティ名とは異なる変数名を使用したいのであれば、以下のように記述します。

```javascript
const obj = {
	name: 'kento',
	age: 18,
};

const {
	name: altName,
	age: altAge,
} = obj;

console.log(altName); // kento
console.log(altAge);	 // 18
```

## 関数の引数に利用する

Reactではpropsを受け取る時に多用されます。