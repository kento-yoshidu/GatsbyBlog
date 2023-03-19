---
title: "Rustの所有権が分からない"
postdate: "2023-01-20"
update: "2023-01-20"
seriesName: "その他"
seriesSlug: "Others"
description: "Rustの所有権について学びました。"
tags: ["Rust"]
keywords: ["Rust"]
published: false
---

# 所有権なんか知らん

**所有権**とは、Rustにおいて**メモリーを安全に管理するため**の機構です。メモリーに保存された値には、**所有者**と呼ばれる変数が設定されます。所有者はある一時点において必ず一人（つまり一つの変数）であり、所有者がスコープから外れるなど不要になったら、所有者がメモリー上の値を破棄します。

```rust
{
    // 文字列「Hello Rust」の所有者は変数str
    let str = String::from("Hello Rust");
    println!("greeting : {}", str);
}
// strがスコープを抜けることで、メモリーから「Hello Rust」が破棄される
```

権利というか、開放する**責任**を持っているとも言えます。

## メモリー

所有権の話には**メモリー**が絡んできますので、まずはそこから学習します。

Rustはメモリーを以下のように分類し、利用します。

- ・ ヒープ領域
- ・ スタック領域
- ・ 静的領域
- ・ テキスト領域

テキスト領域にはコンパイル時に生成されたバイナリーコードが格納されます。また、静的領域には定数や文字列リテラルが格納されます。テキスト領域と静的領域は今回のお話には登場しないので忘れることにします。

スタック領域には固定長配列や変数など、**コンパイル時点で必要なメモリー量が判明している**データが格納されます。具体的にはローカル変数や関数の引数などが該当します。いわゆる後入れ先出し方式でデータを管理しており、容量は限られているものの高速なアクセスが可能です。このスタック領域も今回のお話ではそんなに登場しません。

そして、残る**ヒープ領域**にはStringやVectorなどの可変長データが格納されます。

つまり所有権という仕組みは、はメモリーの中でも特に**ヒープ領域**を管理するためのものだと言えます。

## 各言語でのメモリー管理の方法

Cであれば`malloc`と`free`でやっていますね。

JavaScriptやRuby、Pythonなど、私たちの目に映るほとんどの言語はガベージコレクション（以下、GC）を利用し、メモリーを管理しています。


## 文字列スライスと文字列

～これらは全てスタック領域に積まれ、その変数のスコープが終わるとスタックからポップされます。しかし、先述した通り、ヒープ領域にあるデータは「順番」と言った考え方はありませんから、何らかの方法でメモリーの確保と解放を表現する必要があります。

所有権は**ヒープ領域の管理**のためにあると言えます。

文字列リテラルは**コンパイル時に中身（そしてサイズ）が判明している**ため、コンパイル後にはバイナリーファイルに直接記述される。

これはJavaScriptにおいても同じだと思われます。いわゆるプリミティブ型データと言われる数値型や文字列型はスタックで管理され、オブジェクトデータは

対してString型はコンパイル時に不明な文字列をヒープ領域を使って表現します。


## 所有権の移動

この時、値`kento`の所有権は`func()`の変数`str`に移動します。

```rust
fn func(str: String) {
    println!("{}", str);
}

fn main() {
    let s = String::from("kento");

    func(s); //所有権が移動
}
```

`func()`の呼び出し後、`main()`の中では`s`を扱うことはできません。値に対する所有権を持っていませんからね。

```rust
fn func(str: String) {
    println!("{}", str);
}

fn main() {
    let s = String::from("kento");

    func(s); //所有権が移動

    println!("{}", s);
    /*
      Compiling playground v0.0.1 (/playground)
      error[E0382]: borrow of moved value: `s`
        --> src/main.rs:10:20
        |
        |     let s = String::from("kento");
        |         - move occurs because `s` has type `String`, which does not implement the `Copy` trait |
        |     func(s);
        |          - value moved here
        |
        |     println!("{}", s);
        |                    ^ value borrowed here after move
        |
        = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)

      For more information about this error, try `rustc --explain E0382`.
    */
}
```

メモリーリーク、メモリーの多重開放、ダングリングポインターを防ぐことができる。

## 所有権の移動が発生するケース

- 関数の引数に値を渡す時
- 関数から値を返す時

```rust
fn concat(a: String, b: String) -> String {
    let c = format!("{}, {}", a, b);

    c
}

pub fn main() {
    let s1 = String::from("Hello");
    let s2 = String::from("Rust");
    // s1とs2の所有権は関数concatのaとbに移動する
    let s = concat(s1, s2);

    println!("{}", s1);
    println!("{}", s2);
}
```

Copyトレイトを実装している型は所有権の移動ではなく、値のコピーが行われます。具体的には整数型や浮動小数点型、真偽値型、文字型、要素が全てCopyトレイトを実装しているタプル、など。

## 共有参照

`&`をつけることで、値に対する**共有参照**を表すことができます。

今回の例のように、単純に読みだすだけ（値の変更がない）時には共有参照を使用します。

```rs
fn func(str: &String) {
    println!("func関数のstr = {}", str);
    //=> func関数のstr = kento
}

fn main() {
    let s = String::from("kento");

    func(&s);

    println!("main関数のs = {}", s);
    //=> main関数のs = kento
}
```

`s`と`str`は同じヒープ領域上のデータを参照しています。

```rs
fn func(str: &String) {
    println!("func関数のstrのスタック上のアドレス = {:p}", &str);
    //=> func関数のstrのスタック上のアドレス = 0x7ffd04ab52c0

    println!("func関数のstrの実体の先頭アドレス = {:p}", str.as_ptr());
    //=> func関数のstrの実体の先頭アドレス = 0x5559fc9dc9d0
}

fn main() {
    let s = String::from("kento");

    func(&s);

    println!("main関数のsのスタック上のアドレス = {:p}", &s);
    //=> main関数のsのスタック上のアドレス = 0x7ffd04ab53a0

    println!("main関数のsのアドレス = {:p}", s.as_ptr());
    //=> main関数のsのアドレス = 0x5559fc9dc9d0
}
```

複数作ることができる。

```rs
fn main() {
    let s = String::from("hello");
    let s1 = &s;
    let s2 = &s;
}
```


イミュータブルな参照が作られている状態でミュータブルな参照を利用することはできない。既にどこからか参照されている状態で、値を変更することはできない。

```rs
fn main() {
    let mut s10 = String::from("Hello");
    let r = &s10;
    let m = &mut s10;

    println!("{}, {}", r, m);
    /*
      error[E0502]: cannot borrow `s10` as mutable because it is also borrowed as immutable
        |
        |     let r = &s10;
        |             ---- immutable borrow occurs here
        |     let m = &mut s10;
        |             ^^^^^^^^ mutable borrow occurs here
        |
        |     println!("{}, {}", r, m);
        |                        - immutable borrow later used here
      For more information about this error, try `rustc --explain E0502`.
    */
}
```



## 可変参照

可変参照は値を書き換えたいときに使用します。

`mut`をつけることで、値の書き換えが可能になります。

```rs
fn func(mut str: String) {
    str.push_str("!!!");

    println!("{}", str);
    //=> kento!!!
}

fn main() {
    // mutをつける
    let mut s = String::from("kento");

    func(s);
}
```

ただ、これだと所有権のmoveが起こり、`s`は使えなくなります。

```rs
fn func(mut str: String) {
    str.push_str("!!!");

    println!("{}", str);
}

fn main() {
    let mut s = String::from("kento");

    func(s);

    println!("{}", s);
    /*
      error[E0382]: borrow of moved value: `s`
        --> src/main.rs:12:20
        |
        |     let mut s = String::from("kento");
        |         ----- move occurs because `s` has type `String`, which does not implement the `Copy` trait
        |
        |     func(s);
        |          - value moved here
        |
        |     println!("{}", s);
        |                    ^ value borrowed here after move
        |
        = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)

      For more information about this error, try `rustc --explain E0382`.
    */
}
```

所有権を移動させずに値を操作したい場合、可変参照を利用します。

```rs
// &mutをつける
fn func(str: &mut String) {
    str.push_str("!!!");

    println!("{}", str);
    //=> kento!!!
}

fn main() {
    let mut s = String::from("kento");

    // &mutをつける
    func(&mut s);

    println!("{}", s);
    //=> kento!!!
}
```

以下は、可変参照されている状態で所有権者がアクセスしようとしてエラーになっている例。可変参照`m`が役割を終わる前に所有権者`s11`がアクセスしようとしているため。

```rs
fn main() {
    let mut s11 = String::from("Hello");

    let m = &mut s11;

    println!("{}", s11);
    println!("{}", m);
    /*
      Compiling rust-lesson v0.1.0 (C:\github\LearningRust\playground)
      error[E0502]: cannot borrow `s11` as immutable because it is also borrowed as mutable
        |
        |     let m = &mut s11;
        |             -------- mutable borrow occurs here
        |     println!("{}", s11);
        |                    ^^^ immutable borrow occurs here
        |     println!("{}", m);
        |                    - mutable borrow later used here
      For more information about this error, try `rustc --explain E0502`.
    */
}
```

順番を返ればコンパイルが通る。

```rs
fn main() {
    let mut s11 = String::from("Hello");

    let m = &mut s11;

    println!("{}", m);
    println!("{}", s11);
}
```

以下の例もOK。

```rs
fn main() {
    let mut s12 = String::from("Hello");
    let r1 = &s12;
    let r2 = &s12;

    println!("{}{}{}", s12, r1, r2);

    let m = &mut s12;
    *m = String::from("I love Rust.");
    println!("{}", m);
}
```

## 参考

[所有権とは？ - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch04-01-what-is-ownership.html)


https://zenn.dev/j5ik2o/articles/918c54411d5a61

https://atmarkit.itmedia.co.jp/ait/articles/2111/25/news008.html#_ga=2.32348413.211005990.1679010498-1194816548.1659573557

https://garasubo.github.io/hexo/2021/11/07/rust-memory.html

https://engineering.mercari.com/blog/entry/20220128-3a0922eaa4/

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management