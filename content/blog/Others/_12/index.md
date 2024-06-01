---
title: "[下書き]今更のJavaScript非同期処理総復習"
postdate: "2024-05-12"
update: "2024-05-12"
seriesName: "その他"
seriesSlug: "Others"
description: ""
tags: ["JavaScript", "非同期処理"]
keywords: ["JavaScript", "非同期処理", "Promise", "async/await"]
published: false
---

2乗を返す関数を定義する。`処理スタート`が出力された後、約2秒後に`square: 16`が出力され、直後に`処理終了`が出力されることを確認する。

```js
const square = (arg) => {
  return new Promise((resolve, reject) => {
    if (typeof arg !== "number") {
      return reject(`square: ${arg}は数値ではないので計算できません`);
    }

    return setTimeout(() => {
      resolve(`square: ${arg}`)
    }, 2000)
  })
}

const main = () => {
  console.log("処理スタート")

  square(4)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log("処理完了");
    })
}
```

Todo: 失敗する例を記載する

## Promiseの状態

3乗を返す関数を定義する。

```js
const square = (arg) => {
  return new Promise((resolve, reject) => {
    if (typeof arg !== "number") {
      return reject(`square: ${arg}は数値ではないので計算できません`);
    }

    return setTimeout(() => {
      resolve(`square: ${arg}`)
    }, 2000)
  })
}

const cubed = (arg) => {
  return new Promise((resolve, reject) => {
    if (typeof arg !== "number") {
      return reject(`cubed: ${num}は数値ではないので計算できません`);
    }

    return setTimeout(() => {
      resolve(`cubed: ${arg * arg * arg}`);
    }, 2000)
  })
}

const main = () => {
  console.log("処理スタート")

  square(4)
    .then((result) => {
      console.log(result);

      return cubed(4)
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log("処理完了");
    })
}
```

複数の全ての非同期関数の`resolve`を待つには、`Promise.all`が使える。戻り値は配列。

```js
const main = () => {
  Promise.all([
    square(10),
    cubed(20)
  ])
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    })
    // [ 'square: 10', 'cubed: 8000' ]
}
```

`Promise.all`は全ての関数が`resolve`を返す場合成功する。`cubed`から`reject`が返ってくるので、`resolve`が返ってくる`square`の結果も表示されない。

```js
const main2 = () => {
  Promise.all([
    square(10),
    cubed("hello")
  ])
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    })
}
```

`resolve`でも`reject`でも、とにかく全ての関数が終わってから何か処理したいなら、`Promise.allSettled`を使う。

```js
const main = () => {
  Promise.allSettled([
    square(10),
    cubed("hello")
  ])
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("処理完了");
    })
    /*
      { status: 'fulfilled', value: 'square: 10' },
      { status: 'rejected', reason: 'cubed: helloは数値ではないので計算できません' }
      処理完了
    */
}
```

何か一つ`resolve`がただ一つのPromiseを返します。2つの

```js
const main = () => {
  Promise.any([
    square(10),
    cubed(20),
  ])
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("処理完了");
    })
}

main()
```

`Promise.all`の中の非同期処理関数は順次実行されない。4つがほぼ同時に発火するため、待機時間の短い順に出力される。


```js
const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`time: ${time}`);

      resolve();
    }, time) // 受け取ったtimeミリ秒待って出力する
  })
}

const main = async () => {
  const times = [
    1000,
    2000,
    3000,
    1500
  ];

  await Promise.all(
    times.map((time) => wait(time))
  )

  console.log("処理が終了しました");
}

main();

/*
  time: 1000
  time: 1500
  time: 2000
  time: 3000
  処理が終了しました
*/
```

`data`配列内を順次処理したいなら、for-ofが使える。

```js
const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`time: ${time}`);
      resolve();
    }, time) // 受け取ったtimeミリ秒待って出力する
  })
}

const main = async () => {
  const times = [
    1000,
    2000,
    3000,
    1500
  ];

  for (const time of times) {
    await wait(time)
  }

  console.log("処理が終了しました");
}

main();

/*
  time: 1000
  time: 2000
  time: 3000
  time: 1500
  処理が終了しました
*/
```

## 参考

[【ES6】 JavaScript初心者でもわかるPromise講座 #JavaScript - Qiita](https://qiita.com/cheez921/items/41b744e4e002b966391a)

[[JavaScript] asyncのloop処理をfor文以外で順番に処理する方法｜zochang](https://note.zochang.com/n/n3bf239a9fb15)

[配列のPromiseを直列で実行する方法](https://zenn.dev/wintyo/articles/2973f15a265581)

[[メモ]Promise.allの各非同期関数の結果は配列で取得できる #JavaScript - Qiita](https://qiita.com/niisan-tokyo/items/4ec961ee3f163b2dc4e7)
