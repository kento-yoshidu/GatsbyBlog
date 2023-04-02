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

Rustにおける**所有権**とは、**メモリーを安全に管理するため**の機構です。メモリーに保存された値には**所有者**と呼ばれる変数が設定されます。所有者はある一時点において必ず一人（つまり一つの変数）であり、所有者がスコープから外れるなど不要になったら、所有者がメモリー上の値を破棄します。

```rust
{
    // メモリーに「Hello Rust」が格納される
    // 文字列「Hello Rust」の所有者は変数str
    let str = String::from("Hello Rust");
    println!("greeting : {}", str);
}
// strがスコープを抜けることで、メモリーの「Hello Rust」が破棄される
```

この所有権についてざっと調べてみましたので記事にします。最初の方は所有権とは直接関係ない所へ話が逸れています。また、初学者の学習メモで微妙に分かっていない部分もありますがその辺は悪しからず。

## メモリー

所有権の話には**メモリー**が絡んできますので、まずはそこから学習します。

Rustはメモリーを以下のように大別し利用します。

- ① 静的領域
- ② テキスト領域
- ③ スタック領域
- ④ ヒープ領域

①の静的領域には、グローバル変数や文字列リテラルが格納されます。また、②のテキスト領域には、コンパイル時に生成されたバイナリーコードが格納されます。静的領域とテキスト領域は今回のお話には登場しないので忘れることにします。

③のスタック領域には、関数呼び出しや関数内のローカル変数など**コンパイル時点で必要なメモリーのサイズが判明する**データが格納されます。スタック領域はいわゆる**後入れ先出し方式**でデータを管理しており、容量は限られているものの高速なアクセスが可能です。このスタック領域も今回のお話ではそんなに登場しません。

そして、残る④の**ヒープ領域**にはStringやVectorなどの可変長データが格納されます。可変長データとは**コンパイル時に必要なメモリーのサイズが分からない**という特徴があるデータ型です。

## スタック領域

繰り返しになりますが、スタック領域は**コンパイル時**に必要なメモリー領域のサイズが分かるデータを格納するのに対し、ヒープ領域には**実行時に**必要なサイズが分かる（裏を返せばコンパイル時にサイズが分からない）データを格納します。

スタックは**積み上げ**などと訳されますが、以下の画像のような細い箱のイメージです。スタック領域にデータを保存するときは1番上に積み上げます。データを取り出す時は1番上から取り出します。

今回の記事のテーマとは直接関係ありませんが、Rustにおいてスタックにデータが積まれるというのがどのような感じか、試してみたいと思います。

---

Rustではデータ型によって、データがスタックに積まれるかヒープに格納されるかが決まります。今回はいわゆる数値を表すデータ型、`i32`と`f64`を例にとります。

`i32`は32bit、つまり4バイトでデータを表現します。以下のように変数に値を束縛すれば、型推論が働き`i`と`i2`は共に`i32`型となります。

```rust:title=main.rs
fn main() {
    // 共にi32型
    let i = 1;
    let i2 = 2;
}
```

これらの変数が積まれているスタックのアドレスは、以下のようにして出力します。変数名に`&`をつけることでそのデータのアドレスを得ることができます。また、`println!`では`{:p}`とすることでポインターの形で整形し出力することができます。

```rust:title=main.rs
fn main() {
    let i = 1;
    let i2 = 2;

    println!("1: 変数iのスタック上のアドレス : {:p}", &i);
    //=> 1: 変数iのスタック上のアドレス : 0x94e9effa70

    println!("2: 変数i2のスタック上のアドレス : {:p}", &i2);
    //=> 2: 変数i2のスタック上のアドレス : 0x94e9effa74
}
```

その結果出力される値は、その時々によって変わることに注意します。さて、アドレスの末尾に注目すると、`i`が`70`、`i2`が`74`となっていて、4バイトのずれがあることが読み取れます。上記のコートで取得できるアドレスは、正確にはデータの先頭アドレスを指しているため、これを図解すると以下のようになっていると考えられます。

図を挿入

さて、続いては`f64`を試します。`: f64`のように、型を明示する必要があります。`f64`は64bit、つまり8バイトでデータを表現します。`i32`の時のようにアドレスを出力すると、アドレスに8バイトのずれがあることが予想されます。

```rust:title=main.c
fn main() {
    let f: f64 = 1.0;
    let f2: f64 = 2.0;

    println!("3: 変数fのスタック上のアドレス : {:p}", &f);
    //=> 3: 変数fのスタック上のアドレス : 0x72909bf4d8

    println!("4: 変数fのスタック上のアドレス : {:p}", &f2);
    //=> 4: 変数fのスタック上のアドレス : 0x72909bf4e0
}
```

今回は`f`の末尾が`d8`、`f2`の末尾が`e0`という結果になりました。16進数なのでちょっとだけ分かりにくいですが、e0-d8を計算すると8になります。

図を挿入

ついでに、配列も取り上げます。

```rust
fn main() {
    let arr = [1, 3, 5];

    for (index, num) in arr.iter().enumerate() {
        println!("配列arrの{}番目の値 {}", index + 1 , num);
        //=> 配列arrの1番目の値 1
        //=> 配列arrの2番目の値 3
        //=> 配列arrの3番目の値 5
        //=> 配列arrの4番目の値 7
        //=> 配列arrの5番目の値 9
    };
}
```

Rustにおいて配列は変更不可であり、それゆえコンパイル時にデータサイズが決まっており、それゆえ各要素が配列に積まれていきます。

```rust
fn main() {
    let arr = [1, 3, 5];

    println!("配列arrの1番目の値のスタックアドレス {:p}", &arr[0]);
    println!("配列arrの2番目の値のスタックアドレス {:p}", &arr[1]);
    println!("配列arrの3番目の値のスタックアドレス {:p}", &arr[2]);
    //=> 配列arrの1番目の値のスタックアドレス 0x8d514ff814
    //=> 配列arrの2番目の値のスタックアドレス 0x8d514ff818
    //=> 配列arrの3番目の値のスタックアドレス 0x8d514ff81c
}
```

私が実行すると、末尾が`14`、`18`、`1c`となりました。それぞれ引き算すると差は4です。

---

後入れ先出しという性質上、「どこにデータを積むか」「いつどのデータを開放するか」といったことを考える必要はありません。スコープに入る時にpushして抜ける時にpopすればよいです。

データを積むにしても取り出すにしても、スタックアドレスとデータサイズさえ分かっていれば機械的に利用でき、それゆえ高速に処理でき、（語弊のある言い方かもしれませんが）メモリーを管理する必要がありません。

## ヒープ領域

対するヒープ領域にはスタックの様な順番はありません。どのようなデータがどのようなタイミングで保存され解放されるかが分かりません。そのため、何らかの仕組みを使ってこのヒープ領域を管理する必要があります。

### C

Cでは、プログラマーがコード上で`malloc`や`free`といった関数を用いてメモリーを確保/解放します。

`malloc`は「memory allocation」の略です。allocationは「割り当て」といった意味ですから、言葉通りメモリーの割り当てを行う、という関数ですね。

```c
char *p;
// ポインター変数pにはヒープ領域の先頭アドレスが格納される
p = malloc(20)
```

この「プログラマーが」というところが問題で、適切にメモリー管理を行えないと**メモリーの多重開放**や**不正領域へのアクセス**など重大なエラーが発生します。「自由には責任が伴う」とは正にこのことですね。

例えば、Androidは大部分がC/C++で書かれていたようですが、**メモリー安全性に関する問題が脆弱性の多くを占めていた**ようです。

[Rustの採用が進んだ「Android 13」、メモリ破壊バグは減少、脆弱性の深刻度も低下傾向 - 窓の杜](https://forest.watch.impress.co.jp/docs/news/1462573.html)

ちなみにネタバレすると、Rustでは`malloc`や`free`などを用いてメモリーを管理することは基本的にできません（unsafeな処理が必要）。

### JavaScript

JavaScriptではガベージコレクション（以下、GC）という言語処理系の機構を用いて、メモリーを管理します。例としてJavaScriptを挙げますが、近代のほとんどのプログラミング言語（の処理系）はGCを用いてヒープ領域を管理していると思われます。

Cのように明示的にメモリーを確保/解放するという命令を出さなくても、GCがOSと協力して定期的にメモリーを管理してくれます。

「じゃあ全部GCに置き換えたらええやん」となりそうですが、GCは使用されていない領域を掃除する時にプログラムの実行を停止する必要があり、これは例えばOSなどリアルタイム性の求められる環境では

ちなみにネタバレすると、RustではGCを用いてメモリーを管理することはできません。

<aside>

何かとRustと対比されがちな**Go**もGCによってメモリーを管理しています。そういう意味ではGoはRustやCの代替になりえないことが分かります。

</aside>

### Rust

**言語レベル**でサポートされています。

つまり所有権という仕組みは、メモリーの中でも特に**ヒープ領域**を管理する時に活躍するものだと言えます。

<!--
## 文字列スライスと文字列

～これらは全てスタック領域に積まれ、その変数のスコープが終わるとスタックからポップされます。しかし、先述した通り、ヒープ領域にあるデータは「順番」と言った考え方はありませんから、何らかの方法でメモリーの確保と解放を表現する必要があります。

文字列リテラルは**コンパイル時に中身（そしてサイズ）が判明している**ため、コンパイル後にはバイナリーファイルに直接記述される。

これは、例えばJavaScriptにおいても同じことが言えます。いわゆるプリミティブ型データと言われる数値型や文字列型はスタックで管理され、オブジェクトの実体はヒープ領域に保存されると思われます。

対してString型はコンパイル時に不明な文字列をヒープ領域を使って表現します。
-->

## 所有権


### &str型

`&str`は文字列を表現するデータ型です。特に文字列スライスと呼ばれることもありますが、当記事では`&str`と呼ぶことにします。`&str`はダブルクオートで文字を囲うだけで表現することができます。

```rust
fn main() {
    let str = "Hello";
    let str2 = "Hello World";
}
```

「String型と何が違うねん」という所ですが、文字列スライスは実データ（つまり、上記例でいう所の`Hello`と`Hello World`）を**静的領域**に格納します。そしてその先頭アドレスを指し示す参照8バイト、文字列のバイト数を示す8バイトがスタックに積まれることになります。

```rust
fn main() {
    let str = "Hello";
    let str2 = "Hello World";

    println!("strのスタックアドレス {:p}", &str);
    println!("str2のスタックアドレス {:p}", &str2);
    //=> strのスタックアドレス 0x6d4cbcf6f8
    //=> str2のスタックアドレス 0x6d4cbcf708
    // 0x708 - 0x6f8 = 10進数で16
}
```

`as_ptr()`で静的領域の先頭アドレスを得ることができます。また、`len()`でバイト数を得ることができます。

```rust
fn main() {

    let str = "Hello";
    let str2 = "Hello World";

    println!("4: str2の静的領域の先頭アドレス {:p}", str2.as_ptr());
    println!("4: str2の静的領域のバイト数 {}", str2.len());
    //=> strの静的領域の先頭アドレス 0x7ff634dc3548
    //=> strの静的領域のバイト数 5


    println!("4: str3の静的領域の先頭アドレス {:p}", str3.as_ptr());
    println!("4: str3の静的領域のバイト数 {}", str3.len());
    //=> str2の静的領域の先頭アドレス 0x7ff634dc34b0
    //=> str2の静的領域のバイト数 11
}
```

Rustにおいて文字はUTF-8で扱います。`Hello`でしたら1文字1バイトですから、`len`は`5`が出力されます。日本語でしたら1文字3バイトですから、`こんにちは`であれば`len`は`15`が出力されます。

```rust
fn main() {
    println!("5: こんにちはの静的領域のバイト数 {}", "こんにちは".len());
    //=> 5: こんにちはの静的領域のバイト数 15
}
```

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

```rust
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

```rust
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

```rust
fn main() {
    let s = String::from("hello");
    let s1 = &s;
    let s2 = &s;
}
```


イミュータブルな参照が作られている状態でミュータブルな参照を利用することはできない。既にどこからか参照されている状態で、値を変更することはできない。

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
fn main() {
    let mut s11 = String::from("Hello");

    let m = &mut s11;

    println!("{}", m);
    println!("{}", s11);
}
```

以下の例もOK。

```rust
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

[Rust は何を解決しようとしたのか；メモリとリソースと所有権](https://zenn.dev/karno/articles/630a64fbc9c65e29b566)

[わかる！？Rustの所有権システム](https://zenn.dev/j5ik2o/articles/918c54411d5a61)

[「Rustは安全でも難しい」といわれる理由――メモリ安全を実現する「所有権」の仕組み：基本からしっかり学ぶRust入門（5） - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/2111/25/news008.html)

[Rustのメモリ管理機能とその特徴 | 己の不学を恥じる](https://garasubo.github.io/hexo/2021/11/07/rust-memory.html)

[Memory management - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

[ヒープ割り当て | Writing an OS in Rust](https://os.phil-opp.com/ja/heap-allocation/)

https://engineering.mercari.com/blog/entry/20220128-3a0922eaa4/

[Rust のメモリ管理 | OKAZAKI Shogo&#x27;s Website](https://www.zakioka.net/blog/memory-management-for-rust)

https://www.zakioka.net/memo/rust/type

https://marycore.jp/coding/dangling-pointer/

[スタックとヒープを知る](https://scrapbox.io/mrsekut-p/%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%81%A8%E3%83%92%E3%83%BC%E3%83%97%E3%82%92%E7%9F%A5%E3%82%8B)
