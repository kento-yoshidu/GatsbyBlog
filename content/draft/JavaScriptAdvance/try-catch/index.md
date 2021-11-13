---
title: "例外処理"
postdate: "2099-01-01"
updatedate: "2099-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: ""
tags: ["React", "React Hooks"]
---

# try-catch構文

`try-catch`構文は、何かしらの**例外**が発生した時に、その例外をどのように処理するかを記述する構文です。下記のような感じで書きます。

```javascript
try {
  // 例外が起こるかもしれないようなコード
} catch (error) {
  // 例外起こった時の処理方法 
  // eにはエラーに関する情報が入っている
}
```

`try`ブロックのコードが実行され、そこで例外が発生した時のみ`catch`ブロックの内容が実行されます。

また、`catch`ブロックはエラーオブジェクトを受け取れます。`catch(error) {`の部分ですね。もちろん、変数名は`error`じゃなくても、`e`とか`err`など、好きなものを指定できます。

基本的に、例外が発生するとJavaScriptはそこで処理を中止します。以下の例では未定義の変数`x`を呼び出すことによって例外が発生していますが、ここで処理はストップしてしまい、次の`console.log()`は実行されません。

```javascript
console.log(x);
//=> ReferenceError: x is not defined

console.log("以降の処理"); // これは実行されない
```

`try-catch`構文はこのエラー処理を受け取り、以降の処理を続行することができます。

```javascript
try {
  console.log(x);
} catch(error) {
  console.log("例外が発生しました");
}

console.log("以降の処理");
//=> 例外が発生しました
//=> 以降の処理
```

`try-catch`構文は慎重に使うべきです。このシンタックスの処理自体が重いという意味もありますし、エラーを**握りつぶす**（臭いものには蓋🙄）ような使い方になってしまう可能性があります。テストが行いにくくなったり、エラーの発生源が分かりにくくなったりします。


## `throw`で例外を投げる

`throw`文を使用すれば、例外を投げることができます。ここでは**Error**オブジェクトを投げてみましょう。

`new Error()`の形でインスタンスを生成できます。コンストラクター関数には任意の文字列を入力します。エラーの内容を表す文字列を入れましょう。

以下の例は、`num`に数値が入っていない場合に例外処理を行う`try`文です。`typeof`演算子で`num`の型を検査し、数値型でない時に`throw`文で例外を投げています。

```javascript
try {
  if(typeof num !== 'number') {
    throw new Error('数値以外が与えられています。');
  } else {
    console.log(num * 2);
  }
}
```

続けて`catch`文も書いていきます。コンストラクター関数に渡した文字列は`error.message`のように取り出せます。

```javascript
catch(error) {
  console.log(error.message);
  //=> 数値以外が与えられています。 
}
```

コード全体は以下のようになります。`num`の値の型を変えてみたりしてどのような挙動をするかを確認してみてください。

```javascript
const num = "1";

try {
  if(typeof num !== 'number') {
    throw new Error('数値以外が与えられています。');
  } else {
    console.log(num * 2);
  }
} catch(error) {
  console.log(error.message);
}

console.log("以降の処理");
```

## エラーにも型がある

上記の例では`new Error()`という形で例外を`Error`オブジェクトのインスタンスを投げましたが、


[Error | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error)

[JavaScriptのエラーついて知っておくべきこと - Qiita](https://qiita.com/Tsuyoshi84/items/c50fbbf30a2af387efdf)