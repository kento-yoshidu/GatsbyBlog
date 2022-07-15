---
title: "typeとinterfaceの違い"
postdate: "2022-06-10"
update: "2022-06-10"
seriesName: "その他"
seriesSlug: "Others"
description: "TypeScriptにおいて、typeとinterfaceは何が違うのか。"
tags: ["TypeScript"]
keywords: ["TypeScript", "type", "interface"]
published: false
---

# TypeScriptにおけるtypeとinterfaceの違い

型定義をする際、ほとんどの場合interfaceを使ってきました。しかし、なぜinterfaceを使っているのか、そもそも両者の違いを正確に把握しているのか、という疑問が湧いてきましたのでまとめます。

ざっくり言うと、両者ともに型に**名前を付けることができる**ものです。例えば、`id`、`name`、`email`というプロパティを持つオブジェクトの型定義をしたいとします。

```ts
const user = {
  id: 1,
  name: "kento",
  email: "kento@example.co.jp"
}
```

型アノテーションの機能を使って型を定義することもできますが、、、

```ts
// 型アノテーションで型定義
const user: {
  id: number;
  name: string;
  email: string;
} = {
  id: 1,
  name: "kento",
  email: "kento@example.co.jp"
}
```

余りメリットは感じられません。再利用性がないので、他所で登場するオブジェクトにも同じ作業を繰り返していくことになります。また、オブジェクトの型が変われば型アノテーションも部分も書き換えていくことになります。

## interfaceを使ってみる

型定義を宣言して、それに**名前を付けて**、色んな所から呼び出せるようにしておけば上手くいきそうな気がします。**interface**を利用すればこれが実現できます。

```ts:title=script.ts
// interfaceを使って型を定義し、Userという名前を付ける
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "kento",
  email: "kento@example.co.jp"
}
```

## typeでも

似たようなことは`type`を使っても実現できます。

```ts:title=script.ts
type User = {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "kento",
  email: "kento@example.co.jp"
}
```

構文もほとんど同じですね。正確に言うと、`type`の場合は型に名前を付けるのではなく、**型エイリアス**を宣言するということになっています。

### interfaceは型定義が拡張される

`interface`を使用した同名の型定義が複数あった場合、それらは拡張されます。

例えば`id`だけを持つ`User`という型定義と、`name`だけを持つ`User`型定義が別々に宣言されていた時、`id`と`name`を持つ`User`型定義が生成されるイメージです。

この時、`User`を利用するオブジェクトは`id`と`name`の両方のプロパティを持たないと型エラーが吐かれます。

```ts:title=script.ts
interface User {
  id: number;
}

// 中略

interface User {
  name: string;
}

// OK
const user: User = {
  id: 1,
  name: "kento",
}

// Error
const user2: User = {
  id: 2
}
// Property 'name' is missing in type '{ id: number; }' but required in type 'User'.
// nameプロパティがないというエラー
```


## 参考

[interfaceとtypeの違い、そして何を使うべきかについて](https://zenn.dev/luvmini511/articles/6c6f69481c2d17)
