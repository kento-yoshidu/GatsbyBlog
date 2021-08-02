---
title: "ラッパーオブジェクト"
postdate: "2021-04-28"
updatedate: "2021-04-28"
categoryName: "JavaScript中級者を目指す"
categorySlug: "JavaScriptAdvance"
description: "JavaScriptの持つデータ型について解説します。長くなってしまうので前後2つの記事に分けて解説します。"
tags: ["JavaScript"]
---

プリミティブの中でも、数値型、文字列型、真偽値型、シンボル型にはオブジェクトが用意されている。null、undefinedにはない。


リテラルを使用するとプリミティブ型、ラッパーオブジェクトを使用するとオブジェクトにあんる。

```javascript
const str = "str";
console.log(typeof str)
//=> string

const str2 = new String("str2");
console.log(typeof str2)
//=> object
```

メソッドが呼び出された時、**一時的にラッパーオブジェクトに変換されます**。

```javascript
console.log('string'.toUpperCase());
//=> STRING

// 以下のようにラッパーオブジェクトに変換される
console.log((new String('string')).toUpperCase());
//=> STRING
```

しかし、自動的に変換してくれる以上、リテラル表現を使用しておけば困ることはありません。
