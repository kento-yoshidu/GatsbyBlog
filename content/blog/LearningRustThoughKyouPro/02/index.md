---
title: "#2 各要素に対して何らかの処理を行う"
postdate: "2023-10-14"
update: "2023-10-14"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "競技プログラミングの問題を解くことでRustを学びます。"
tags: ["Rust", "AtCoder", "競技プログラミング"]
keywords: ["Rust", "AtCoder", "競技プログラミング"]
published: false
---

# 各要素に対して何らかの処理を行う

`map`に代表されるメソッド達です。メソッドを適用すると`Iterator<T>`が返ってくるので、`collect()`などを使用して`Vec`や`String`の形で好きな形に書き換えることができます。

## map

[map](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.map)

`fn map<B, F>(self, f: F) -> Map<Self, F>`

`map`は各要素に任意の関数を適用し、その値を集約します。`x`には`1`、`2`、`3`が入り、2倍した値がそれぞれイテレーターに格納されます。

```rust
fn main() {
    let vec = vec![1, 2, 3];

    let result = vec.iter().map(|x| {
        x * 2
    });

    println!("{:?}", result);
    //=> Map { iter: Iter([1, 2, 3]) }
}
```

`collect()`や`sum()`を使えば、新しいVecを作成したり、合計値を得ることができます。

```rust
fn main() {
    let vec = vec![1, 2, 3];

    let new_vec: Vec<usize> = vec.iter().map(|x| {
        x * 2
    }).collect();

    println!("{:?}", new_vec);
    //=> [2, 4, 6]

    let total: usize = vec.iter().map(|x| {
        x * 2
    }).sum();

    println!("{:?}", total);
    //=> 12
}
```

各要素の先頭に`0x`を付け、それを`Vec<String>`として集約します。

```rust
fn main() {
    let vec = vec!["1", "9", "A", "E"];

    let new_vec: Vec<String> = vec.iter().map(|str| {
        format!("0x{}", str)
    }).collect();

    println!("{:?}", new_vec);
    //=> ["0x1", "0x9", "0xA", "0xE"]
}
```
