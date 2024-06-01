---
title: "[下書き]今更のJavaScript例外処理再入門"
postdate: "2024-05-12"
update: "2024-05-12"
seriesName: "その他"
seriesSlug: "Others"
description: ""
tags: ["JavaScript", "例外処理", "非同期処理"]
keywords: ["JavaScript", "非同期処理", "try-catch", "Promise", "async/await"]
published: false
---

正常に動作した例

```js
const main = () => {
  try {
    const data = {
      id: 1,
      name: "kento"
    };

    console.log(data);
  } catch(error) {
    console.log(`[Error] ${error}`);
  } finally {
    console.log("処理が終了しました");
  }
}

main();

/*
{ id: 1, name: 'kento' }
処理が終了しました
*/
```

エラーが出る例


```js
const main = () => {
  try {
    /*
    const data = {
      id: 1,
      name: "kento"
    };
    */

    console.log(data);
  } catch(error) {
    console.log(`[Error] ${error}`);
  } finally {
    console.log("処理が終了しました");
  }
}

/*
[Error] ReferenceError: data is not defined
処理が終了しました
*/
```

`throw`でカスタムエラーを発生させることができる

```js
const main = () => {
  try {
    // ここでcatchブロックに処理がうつる
    throw new Error("エラーをスローします");

    // ここから下は実行されない
    const data = {
      id: 1,
      name: "kento"
    };

    console.log(data);
  } catch(error) {
    console.log(`[Error] ${error}`);
  } finally {
    console.log("処理が終了しました");
  }
}

/*
[Error] Error: エラーをスローします
処理が終了しました
*/
```

非同期処理はキャッチできない。

```js
const main = () => {
  try {
    setTimeout(() => {
      console.log(data);
    }, 1000);
  } catch (error) {
    console.log(`[Error] ${error}`);
  } finally {
    console.log("処理が終了しました");
  }
}

/*
処理が終了しました
/home/foobar/github/GatsbyBlog/content/blog/Others/try_catch/test.js:4
      console.log(data);
                  ^

ReferenceError: data is not defined
    at Timeout._onTimeout (/home/foobar/github/GatsbyBlog/content/blog/Others/try_catch/test.js:4:19)
    at listOnTimeout (node:internal/timers:557:17)
    at processTimers (node:internal/timers:500:7)
*/
```

非同期処理関数の中でtry-catchを記述すること

```js
const main = () => {
  setTimeout(() => {
    try {
      console.log(data);
    } catch (error) {
      console.log(`[Error] ${error}`);
    } finally {
      console.log("setTimeoutが終了しました。");
    }
  }, 1000);
}

/*
  [Error] ReferenceError: data is not defined
  setTimeoutが終了しました。
*/
```

エラーオブジェクト

```js
const main = () => {
  try {
    console.log(data);
  } catch (error) {
    console.log(`[Error] name = ${error.name}`);
    console.log(`[Error] message = ${error.message}`);
    console.log(`[Error] message = ${error.message}`);
  } finally {
    console.log("処理が終了しました。");
  }
}

/*
  [Error] name = ReferenceError
  [Error] message = data is not defined
  [Error] stack = ReferenceError: data is not defined
    at main (/home/foobar/github/GatsbyBlog/content/blog/Others/try_catch/test.js:3:17)
    at Object.<anonymous> (/home/foobar/github/GatsbyBlog/content/blog/Others/try_catch/test.js:13:1)
    at Module._compile (node:internal/modules/cjs/loader:1108:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1137:10)
    at Module.load (node:internal/modules/cjs/loader:988:32)
    at Function.Module._load (node:internal/modules/cjs/loader:828:14)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
    at node:internal/main/run_main_module:17:47
  setTimeoutが終了しました。
*/
```

json取扱い時

```js
const main = () => {
  try {
    let json = '{ "id": 1 }';

    let data = JSON.parse(json);

    console.log(data);
  } catch (error) {
    console.log(`Error ${error}`);
  } finally {
    console.log("処理が終了しました。");
  }
}

/*
  { id: 1 }
  処理が終了しました。
*/
```

nameが何らかの理由でないとき

```js
const main = () => {
  try {
    let json = '{ "id": 1 }';

    let {id, name} = JSON.parse(json);

    console.log(`id = ${id}, name = ${name}`);
  } catch (error) {
    console.log(`Error ${error}`);
  } finally {
    console.log("処理が終了しました。");
  }
}

/*
  id = 1, name = undefined
  処理が終了しました。
*/
```

ネストしていてもキャッチできる

```js
const func1 = () => {
  func2();
}

const func2 = () => {
  data
}

const main = () => {
  try {
    func1();
  } catch (error) {
    console.log(`[Error] ${error}`);
  } finally {
    console.log("処理が終了しました。");
  }
}

/*
  [Error] ReferenceError: data is not defined
  処理が終了しました。
*/
```


## リファレンスエラー

参照エラーともいいます。存在しない変数や関数にアクセスした時に起こります。


```js
const func1 = () => {
  func2();
}

const main = () => {
  try {
    func1();
  } catch (error) {
    console.log(`[Error] ${error}`);
  } finally {
    console.log("処理が終了しました");
  }
}

/*
  [Error] ReferenceError: func2 is not defined
  処理が終了しました
*/
```

## シンタックスエラー

構文が間違っている時に発生します。ただ、これはJavaScriptの実行時にパースエラーが出るので、try-catchではキャッチできません。

```js

```

例外は自ら発生させることもできます。

```js
const func1 = () => {
  throw new Error("例外が発生しました");
}

const main = () => {
  try {
    func1();
  } catch (error) {
    console.log(`[Error] ${error.name}`);
    console.log(`[Error] ${error.message}`);
    console.log(`[Error] ${error.stack}`);
  } finally {
    console.log("処理が終了しました");
  }
}

/*
  [Error] Error
  [Error] 例外が発生しました
  [Error] Error: 例外が発生しました
      at func1 (/home/foobar/github/GatsbyBlog/content/blog/Others/try_catch/test.js:2:9)
      at main (/home/foobar/github/GatsbyBlog/content/blog/Others/try_catch/test.js:7:5)
      at Object.<anonymous> (/home/foobar/github/GatsbyBlog/content/blog/Others/try_catch/test.js:17:1)
      at Module._compile (node:internal/modules/cjs/loader:1108:14)
      at Object.Module._extensions..js (node:internal/modules/cjs/loader:1137:10)
      at Module.load (node:internal/modules/cjs/loader:988:32)
      at Function.Module._load (node:internal/modules/cjs/loader:828:14)
      at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
      at node:internal/main/run_main_module:17:47
  処理が終了しました
*/
```

例えば、0除算やjsonのあるプロパティが欠如しているなど、エラーになってほしいのにならないときに使ってみましょう

以下のようにエラーメッセージだけを投げることもできますが、特に意味はありません。素直にnew Errorで例外を投げましょう。

```js
const func1 = () => {
  throw "例外が発生しました";
}

const main = () => {
  try {
    func1();
  } catch (error) {
    console.log(`[Error] ${error}`);
  } finally {
    console.log("処理が終了しました");
  }
}

/*
  [Error] 例外が発生しました
  処理が終了しました
*/
```

## 参考

[エラーハンドリング, &quot;try..catch&quot;](https://ja.javascript.info/try-catch)
