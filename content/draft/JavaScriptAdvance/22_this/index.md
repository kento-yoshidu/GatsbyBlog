---
title: "this完全攻略"
postdate: "2021-01-01"
updatedate: "2020-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript", "this"]
---

# JavaScript中級者を目指そう

JavaScriptにおける`this`は**グローバル変数**です。グローバル変数というからにはどこからでも呼び出すことができ、呼び出し場所によって値が変化します。この「呼び出し場所」というのは**実行コンテキスト**などとも呼ばれており、これは聞いたことがあるかも知れません。

## メソッドでthisを呼び出した時

まずは一番シンプルであろう例から説明します。あるオブジェクトの中のメソッドが`this`を呼び出している場合です。

**`this`を返すだけ**メソッッドを持つ超シンプルなオブジェクトを用意しました。`this`を返すのは`returnThis`メソッドです。これを実行するとどうなるでしょう？

この場合、`this`は`obj`です。

`obj`が持つ`returnThis`メソッドが表示されています。

```javascript
const obj = {
  returnThis: function() {
    console.log(this)
  }
};

obj.returnThis();
// { returnThis: [Function: returnThis] }
```


次にプロパティを追加します。何でもいいですが、`name`プロパティを用意して、適当な値を入れておきましょう。これを呼び出すと、、、

```javascript
const obj = {
  name: 'kento',
  returnThis: function() {
    console.log(this)
  }
}

obj.returnThis()
// { name: 'kento', returnThis: [Function: returnThis] }
```

nameプロパティも出力されていますね。さらに、`returnThis`を、`this.name`を返すようなメソッドに書き換えてみましょう。

```javascript
const obj = {
  name: 'kento',
  returnThis: function() {
    console.log(this.name)
  }
};

obj.returnThis();
// kento
```



### `.`(ドット)の前にあるのが`this`




## 関数呼び出し

## メソッド呼び出し

[JavaScript の this を理解する多分一番分かりやすい説明 - Qiita](https://qiita.com/takkyun/items/c6e2f2cf25327299cf03#bind)

[JavaScriptの「this」は「4種類」？？ - Qiita](https://qiita.com/takeharu/items/9935ce476a17d6258e27)

[JavaScriptのthisの挙動を完全に理解した話 - Qiita](https://qiita.com/renesisu727/items/c77954a437afa1d9e711)
