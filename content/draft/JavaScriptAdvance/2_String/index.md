---
title: "#5 JavaScriptのデータ型（文字列型）"
postdate: "2021-04-28"
updatedate: "2021-04-28"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: "JavaScriptの持つデータ型について解説します。長くなってしまうので前後2つの記事に分けて解説します。"
tags: ["JavaScript"]
---

# 文字列型

JavaScriptにおける文字や文字列は、全て文字列型として表現されます。言語によっては1文字だと`char`型、みたいなこともありますが、JavaScriptでは1文字だろが100文字だろうが文字列型として扱われます。

文字列型は、引用符（ダブルクオテーション`"`、シングルクオテーション`'`）、もしくはバッククオテーション`` ` ``で文字列を囲って表現します。これを文字列リテラルといいます。

```javascript
console.log("Hello World");
//=> Hello World

const str = 'HogeFoo';

console.log(str);
//=> HogeFoo
```

また、文字列型データに`typeof`演算子を使用すると、`string`が返ってきます。

```javascript
console.log(typeof "Hello");
//=> string

console.log(typeof "a");
//=> string
```

### シングルクオートとダブルクオート

シングルクオートとダブルクオートは**全く同じ**です。違いはありません。どちらを使うかは個人（もしくはチーム）の自由です。どちらかというとシングルクオートを使用する人が多い、とツイッターのアンケートでは結果が出ていました。

2つの引用符を用い、文字列の中で引用符を表現することができます。以下の例では、文字列をダブルクオーテーションで囲い、`my`をシングルクオテーションで囲っています。

```javascript
console.log("This is 'my' cake");
// => This is 'my' cake
```

これは1種類の引用符を単純に使うだけでは実現できません。

```javascript
const str = 'This is 'my' cake';
//=> SyntaxError: Unexpected identifier
```

上記の例では文字列全体をシングルクオテーションで囲い、更にその中で`my`をシングルクオテーションで囲っています。

この時、`This is `と` cake`がシングルクオテーションで囲われていることになり、結果シンタックスエラーになります。

## バッククオート

バッククオートは上記2つの引用符とは違う特徴があります。バッククオートは文字列の中で**変数や関数を呼び出す**ことができます。

呼び出す変数や関数は`${}`で囲います。以下は変数を埋め込んだ例です。

```javascript
const name = "Kento";

//文字列をバッククオートで囲う
//nameは${}で囲う
console.log(`My name is ${name}`);
//=> My name is Kento
```

このように、バッククオートで囲った文字列の中に変数などを埋め込み、
値を表示させることを**式展開**などと言います。

これを引用符で実現しようと思っても上手くいきません。`${name}`も文字列の一部として認識され、そのまま出力されます。

```javascript
const name = "Kento";

//ダブルクオーテーションで囲う
console.log("My name is ${name}");
//=>My name is ${name}
```

ダブルクオートでも実現できますが、`+`演算子で文字列を連結させる必要があります。
バッククオートを使って変数展開した方が分かりやすいと思いますがどうでしょう。

```javascript
const name = "Kento";

// + で連結する
console.log("My name is " + name);
//=> My name is Kento
```

関数を展開する例も記述しておきます。

```javascript
const square = (num) => {
  return num * num;
}

console.log(`9の二乗は${square(9)}です。`);
//=> 9の二乗は81です。
```


JavaScriptは文字コードとしてUTF-16を採用しています。
