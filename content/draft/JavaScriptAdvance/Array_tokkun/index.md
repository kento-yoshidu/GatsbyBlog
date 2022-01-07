---
title: "配列"
postdate: "2099-01-01"
updatedate: "2099-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript"]
---

# 配列

**配列**とはデータの集合のことです。`[]`を使って表します。

以下のコードは`arr`に`a`、`b`、`c`というデータを格納しています。つまり、`arr`配列を作成したことになります。この時、格納した値は**要素**とも呼びます。

```javascript
const arr = ['a', 'b', 'c'];
```

また、配列に格納された要素にはそれぞれ、`0`から始まるインデックスが付与されています（`1`ではなく`0`であることに注意してください。）。このインデックスを使って各値にアクセスします。

```javascript
const arr = ['a', 'b', 'c'];

console.log(arr[0]); //=> a
console.log(arr[1]); //=> b
console.log(arr[2]); //=> c
```

実は、配列もオブジェクトの一種です。`typeof`演算子を使ってみると、、、。

```javascript
console.log(typeof [])
//=> object
```

ここは`array`みたいに出力してほしい気もしますが、こういう仕様なのでしょうがありません。

本当に文字通り配列であるかどうかを確認するには、`Array.isArray()`メソッドを使わなければいけません。

```javascript
console.log(Array.isArray([]));
//=> true
```

少し話がそれますが、他の

## 配列を作成する

配列の作成は2つの方法があります。先ほどやって見せたように`[]`を使う方法です。`[]`を**配列リテラル**といいます。以下の例では空の配列を作成しています。

```javascript
// 配列リテラルを使って配列を作成
const emptyArr = [];

console.log(emptyArr);
//=> []
```

また、**Arrayコンストラクタ**である`new Array()`を使うこともできますが、これは`[]`を使うのと一緒です。普通に配列を扱いたいなら、わざわざArrayコンストラクタを使う理由はありません。

```javascript
const emptyArr = new Array();

console.log(emptyArr);
//=> []
```

ただ、`Array()`には変わった性質があります。引数に`10`を渡して配列を生成してみます。すると、10個の`undefined`が格納された配列が作成されます。

```javascript
console.log(Array(10).length);
//=> 10
```

```javascript
[...Array(10000)].forEach((_, i) => {
  i++
  if(i % 15 === 0) {
    console.log(`${i} => FizzBuzz`)
  } else if (i % 3 === 0) {
    console.log(`${i} => Fizz`)
  } else if (i % 5 === 0) {
    console.log(`${i} => Buzz`)
  }
  console.log(performance.memory)	
})
```

## 多次元配列

```javascript
const arr = [
	["0-0", "0-1", "0-2"], // 0
	["1-0", "1-1", "1-2"], // 1
	["2-0", "2-1", "2-2"], // 2
];

console.log(arr[0][0]); //=> 0-0
console.log(arr[1][1]); //=> 1-1
console.log(arr[2][0]); //=> 2-0
```

JavaScriptの配列には様々な型のデータを自由に格納することができます。

```javascript
const arr = [1, "one", true, {}];

console.log(arr);
//=> [ 1, 'one', true, {} ]
```

また、関数を代入することもできます。これはJavaScriptの関数が第一級関数（後ほど説明）であるためです（これは配列というよりも、関数の特性の話ですね）。

```javascript
function func() { return "foo" }

const arr = [func];

console.log(arr[0]());
//=> foo
```

## 要素へのアクセス


インデックスは`0`から始まっているので、`length - 1`で末尾の要素にアクセスできます。

```javascript
const arr = [];

console.log(arr[0]); //=> undefined
```

## Array.length

配列が持つ要素の数は、`Array.length`プロパティで確認することができます。

```Javascript
console.log([].length);
console.log(["aaa"].length);
```

いわゆるfalsyな値も、要素の数としてカウントされます。

```javascript
console.log([undefined, null, "", false].length);
//=> 4
```

## 代表的なメソッド

Arrayオブジェクトのメソッドは数多くあり、これらのメソッドを使いこなすことこそがJavaScriptを使いこなすことであるとも言えます。

配列取り扱いの特訓は別のページで行うとして、ここでは代表的なメソッドを取り上げます。


### `push`と`pop`

配列の末尾に要素を挿入したい場合、`push`メソッドを使用します。

下の例では、`1`と`2`を持つ`arr`配列の末尾に`3`を挿入しています。

```javascript
const arr = [1,2];
arr.push(3);

console.log(arr);
//=> [1, 2, 3]
```


## 「破壊的」と「非破壊的」


### 破壊的（push）

配列の末尾に要素を挿入する`push`メソッドは破壊的なメソッドです。

## 配列のコピー

JavaScriptは**参照の値渡し**をしているので、`=`による代入では本当の意味での複製を行うことはできません。

## 参考

[JavaScriptに参照渡し/値渡しなど存在しない - Qiita](https://qiita.com/yuta0801/items/f8690a6e129c594de5fb)

