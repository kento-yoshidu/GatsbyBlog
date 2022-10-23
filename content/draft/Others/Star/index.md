---
title: "JavaScriptで⭐⭐⭐★★を生成する"
postdate: "2022-11-01"
update: "2022-11-01"
seriesName: "その他"
seriesSlug: "Others"
description: "サロゲートペアについて簡単に触れます。"
tags: ["JavaScript", "文字コード", "サロゲートペア"]
keywords: ["JavaScript", "文字コード", "サロゲートペア"]
published: false
---

# 数値から⭐⭐⭐★★を生成する

記事を書くモチベーションがない病なので小ネタです。

[小ネタサイト](https://bookstogive-kento-yoshidu.vercel.app/)を作っている時に、与えられた数値から「⭐⭐⭐★★」みたいな文字列を作りたくなりました。Amazonにもあります、

![](./images/image01.png)

こんな奴ですね。具体的には

```ts
const book = {
  rating: 3
}
```

みたいなデータがあって、`rating`が`3`なら`⭐⭐⭐★★`、`1`なら`⭐★★★★`という文字列にしたいわけです。

## `repeat`を使う

任意の文字列を繰り返したいなら`repeat`関数を使用します。

```js
console.log("⭐".repeat(5))
// => ⭐⭐⭐⭐⭐

console.log("⭐".repeat(4))
// => ⭐⭐⭐⭐

console.log("⭐".repeat(3))
// => ⭐⭐⭐

console.log("⭐".repeat(2))
// => ⭐⭐

console.log("⭐".repeat(1))
// => ⭐

console.log("⭐".repeat(0))
// => 
```

MDNによると、

> 呼び出し元の文字列を<mark>指定した数</mark>だけコピーして結合した新しい文字列を構築して返します。

とのことです。`⭐`の生成にはこの`repeat`関数を使うことにします。

## `padEnd`でお尻を埋める

`padEnd`を使えば、文字列が任意の長さになるように、末尾に任意の文字を追加する関数です。ある文字列に対して、5文字になるように後方を`a`で埋めるには以下のようにします。

```js
console.log("A".padEnd(5, "a"))
// => Aaaaa

console.log("AA".padEnd(5, "a"))
// => AAaaa

console.log("AAA".padEnd(5, "a"))
// => AAAaa

console.log("AAAA".padEnd(5, "a"))
// => AAAAa

console.log("AAAAA".padEnd(5, "a"))
// => AAAAA
```

この2つの関数を使えば、大抵の文字列の場合は上手くいきます。
