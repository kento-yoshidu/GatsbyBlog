---
title: "#4 JavaScriptの基本的な書き方"
postdate: "2021-06-12"
updatedate: "2021-07-02"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript"]
---

# JavaScriptの書き方

まずは簡単にJavaScriptの書き方や基本的なルールを説明します。入門JavaScriptで解説した部分も多いので、さらっと行きましょう。

## 文の末尾にはセミコロンをつける

JavaScriptには**文**という表現があります。「変数を宣言する」「関数を呼び出す」などの命令の一つ一つが「文」です。

そして**文を記述したら**その後ろにはセミコロン`;`をつけます。`;`が文と文の区切りを表します。

```javascript
// 変数を定義する文
const myId = 1;

// 関数を定義し変数に代入する文
const getId = function (id) {

  // return文
  return id;
};

// 関数を呼び出す文
getId(myId);
```

実は`;`をつけなくても、JavaScriptはコンパイル時に自動で`;`をつけてくれますが、これは時に意図しない不具合を招くことがあります。

`;`を付けるつけないで**宗教戦争**もあったりしますが、少なくともこのサイトで学習するうえでは`;`は付けるようにしましょう。

## コメントアウト

HTMLやCSSと同じように、JavaScriptでもコメントを残すことができます。

1行コメントは`//`を用います。先頭に書けばその行がコメントアウトされます。コメントアウトされた命令は実行されません。また、`//`は行の途中にも書くことができ、書いたところから後ろがコメントアウトされます。

```javascript
//console.log('test'); 行全体がコメントアウト

console.log('test'); // ここからコメントアウト
```

複数行コメントは`/* */`を用います。

```javascript
/*
  全てコメントアウトされ実行されません。
  const int = 1;
  console.log(int);
*/
console.log('これは実行されます。');
```

## 大文字と小文字は区別される

JavaScriptでは大文字と小文字は個別されます。例えば`myObj`というオブジェクトを用意したなら、きちんと`myObj`と呼び出さなければなりません。`myobj`（全部小文字）ではだめです。

```javascript
const myObj = {};

console.log(myObj);
//=> {}

// 小文字になっている
console.log(myobj);
//=> ReferenceError: myobj is not defined
```


## `"use strict";`を付ける

JavaScriptファイルの中に`"use strict";`と記述することで、そのファイル中のコードは**Strictモード**で実行されます。これによりシンタックスがより厳格にチェックされ、問題のあるコードや推奨されないコードはエラーとなります（JavaScriptは普段、構文を厳密にチェックしていない、ということもわかります）。

実際に例を見てみます。変数宣言の例です。変数宣言には`const`、`let`、`var`キーワードを用いるのが推奨されます。しかし、実際にはこれらのキーワードを使用しなくても変数を宣言することができます。

```javascript
str = "hoge"

console.log(str)
//=> hoge
```

しかし、ファイルの先頭に`"use strict";`と記述した上でこのコードを時効するとエラーが発生します。

```javascript
"use strict";

str = "hoge"

console.log(str)
//=> ReferenceError: str is not defined
```

なぜキーワードなしに変数宣言するのが良くないのかは後で考えましょう。`"use strict";`を付けることで、危険なコードを未然に防止してくれるという事を理解してもらえればOKです。

`"use strict";`はスコープを持っていますので、ファイルのどこに記述するかで効果が適用される範囲が変わってきます。

この講座においては、明記しない限り**ファイルの先頭に**`"use strict";`を記述しているものとします。

## 予約語

どういった単語が予約語なのかは自然と覚えられますし、JavaScriptを実行した時にエラーが発生しますので、予約語を覚えていくのは労力の無駄です。

いざエラーが出た時にびっくりしないように、エラーの文面だけ記憶の片隅に置いておきましょう。

## プログラムの書き方



