---
title: "【メモ】RustのResult型"
postdate: "2022-06-24"
update: "2022-06-24"
seriesName: "その他"
seriesSlug: "Others"
description: "メディアクエリーにおける比較演算子の使い方を紹介します"
tags: ["Rust"]
keywords: ["Rust"]
published: false
---

# Result型のエラーハンドリング

最近、趣味でRustを勉強しています。エラーハンドリングがややこしくテンパってしまったので、Result型について学習メモを残しておきます。間違いが多くあるかもしれませんので参考程度にお願いします。

## Rustにおけるエラー

本題の前に。Rustには例外が存在しませんが、2種類に大別されるエラーが存在します。

- 回復不能なエラー。`panic!`を使用するなど
- 回復可能なエラー。`Result<T, E>`で表現する

回復不能なエラー（以下、パニック）はマクロ`panic!`を呼び出すことで起こすことができます。

```rust
fn main() {
    panic!("回復不能なエラーが発生!");
    // thread 'main' panicked at '回復不能なエラーが発生!'
}
```

他にも、配列の範囲外の要素へアクセスしようとした時にもパニックが発生します。

```rust
fn main() {
    let v = vec![1, 2, 3];

    println!("{}", v[10]);
    // thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 10'
}
```

## Result型って何

本題の`Result`型です。Result型は列挙型の一種です。「エラーになるかも？」を扱える型で、`Ok(T)`と`Err(E)`という列挙子を持ちます。

```rust
enum Result<T, E> {
    Ok(T),
    Err(E)
}
```

パニックはその時点でプログラムは終了しますが、Result型を用いればエラーをプログラマーが扱うことができます。

例えば、与えられた数値で100を割る関数を定義します。引数に`0`が渡されるとpanicになります。

```rust
fn division(num: i32) -> i32 {
    100 / num
}

fn main() {
    println!("{}", division(0));
    // thread 'main' panicked at 'attempt to divide by zero', src/main.rs:2:5
}
```

関数`division`の戻り値の型を`Result`に変更します。

`<T, E>`はジェネリック型引数なので、成功した時に返る値の型を`T`、失敗した時に返る値の型を`E`で表現します。今回は、引数が`0`以外で除算が成功した時は商を返すので`i32`、`0`の時は0除算になり失敗したことを表すメッセージを返すので`String`をそれぞれあてはめます。

成功した場合には`Ok`、失敗した場合には`Err`を返すよう関数を定義します。

```rs
// 除算が成功したらi32、0除算になり失敗したならStringを返す
fn division(num: i32) -> Result<i32, String> {
    if num != 0 {
        Ok(100 / num)
    } else {
        Err(String::from("0除算です。"))
    }
}

fn main() {
    println!("{:?}", division(2));
    //=> Ok(50)

    println!("{:?}", division(0));
    //=> Err("0除算です。")
}
```

列挙型なので、`match`式で`Ok`の場合と`Err`の場合をすくうことができます。

```rs
fn main() {
    let result = division(0);

    match result {
        Ok(value) => println!("{}", value),
        Err(err) => println!("エラーが発生しました！ {}", err)
        //=> エラーが発生しました！ 0除算です。
    }
}
```

`Err`が返ってきた場合に`panic!`を使うこともできます。でも、後で紹介する`unwrap`を使う方法もあります。

```rs
fn main() {
    let result = devision(0);

    match result {
        Ok(value) => println!("{}", value),
        Err(err) => panic!("{}", err)
        // thread 'main' panicked at '0除算です。', src/main.rs:14:25
    }
}
```

`match`式で`Ok`しか処理しなかった場合（その逆もしかり）、「`Err(_)`をカバーしていないよ」ということでエラーが発生します。

```rs
fn main() {
    let result = division(1);

    match result {
        Ok(value) => println!("{}", value)
        // error[E0004]: non-exhaustive patterns: `Err(_)` not covered
    }
}
```

### `if-let`式

`Ok`の場合だけ、またその逆の場合だけ処理したいなら、`if let`式を使用します。

```rs
fn main() {
    let result = division(1);

    if let Ok(value) = result {
        println!("{}", value);
        //=> 100
    }
}
```

## 各種メソッド

### `unwrap`

`unwrap`は`Result`型から値を取り出すメソッドです。つまり`Ok`か`Err`を取り出すことができます。

値が`Ok`の場合は`T`を返し（今回の例であれば商）、`Err`の場合はパニックを起こします。

```rs
fn main() {
    let result = division(1);

    println!("{}", result.unwrap());
    //=> 100

    let result = division(0);

    println!("{}", result.unwrap());
    // thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: "0除算です"'
}
```

### `expect`

`expect`メソッドは`unwrap`メソッドに似ていて、`Result`型から`Ok`もしくは`Err`を取り出します。値が`Ok`の場合は`T`を返すのは同じですが、`Err`の場合は`expect`に渡した引数のメッセージとともにパニックを起こします。`unwrap()`＋任意のメッセージ、という感じでしょうか。

```rs
fn main() {
    let result = division(1);

    println!("{}", result.expect("エラーが発生しました！"));
    //=> 100

    let result = division(0);

    println!("{}", result.expect("エラーが発生しました！"));
    // thread 'main' panicked at 'エラーが発生しました！: "0除算です。"'
}
```

### `unwrap_or`

`Ok`の場合は`T`、`Err`の場合は引数に渡した値を返します。

```rs
fn main() {
    let result = division(1);

    println!("{}", result.unwrap_or(999));
    //=> 100

    let result = division(0);

    // 0を渡してしまった場合は999が返る
    println!("{}", result.unwrap_or(999));
    //=> 999
}
```

`unwrap_or`に渡す引数の型は`Result`型の`T`型と同じでなければいけません（要出典）。

```rs
fn main() {
    let result = devision(0);

    println!("{}", result.unwrap_or("エラー発生!"));
    /*
        error[E0308]: mismatched types
        --> src/main.rs:12:37

        println!("{}", result.unwrap_or("エラー発生!"));
                              --------- ^^^^^^^^^^^^^ expected `i32`, found `&str`
                              |
                              arguments to this function are incorrect
    */
}
```

### `expect_err`

`Ok`の場合は引数に渡した`&str`とともにパニック、`Err`の場合はエラーメッセージ（今回の例なら`String`）が返り、パニックは起こりません。

```rs
fn main() {
    let result = division(1);

    // panicになる
    println!("{}", result.expect_err("OK"));
    // thread 'main' panicked at 'OK: 100'

    let result = division(0);

    println!("{}", result.expect_err("エラーが発生しました!"));
    //=> 0除算です。
}
```

## まとめ

|メソッド|真|偽|
|

## 参考

[Result in std::result - Rust](https://doc.rust-lang.org/std/result/enum.Result.html)

[panic!で回復不能なエラー - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch09-01-unrecoverable-errors-with-panic.html)

https://qiita.com/plotter/items/0d8dc2782f21178d64f1

https://blog.cardinaG1.red/2019/12/19/dont-fear-the-panic/

[Rustのエラー処理 - Qiita](https://qiita.com/fujitayy/items/cafe661415b6aa33d884)

[[Rust] Resultのメソッド早見表](https://zenn.dev/megeton/articles/1380ffda5a7e41)

[Rust を始める時に少しだけ読み書きしやすくなる Result と Option の話 | IIJ Engineers Blog](https://eng-blog.iij.ad.jp/archives/11405)

[RustのOptionとResult - Qiita](https://qiita.com/take4s5i/items/c890fa66db3f71f41ce7)

