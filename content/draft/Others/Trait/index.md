---
title: "Rustのトレイトが分からない"
postdate: "2023-01-20"
update: "2023-01-20"
seriesName: "その他"
seriesSlug: "Others"
description: "Rustのトレイトについて学びました。"
tags: ["Rust"]
keywords: ["Rust"]
published: false
---


traitは「特性」という意味を持つ。

共通の振る舞いを定義できる。他の言語で言うところのインターフェースに近いと思っています。

トレイトは`trait`キーワードを使用して定義します。

```rust
trait Summary {
    fn summarize(&self) -> String;
}
```

このトレイトを実装する型は、それぞれ違う`summary`メソッドを定義する。


## 参考

[Rustのtrait（トレイト）の使い方を解説します【impl, トレイト境界】 - ブログ](https://yu-nix.com/archives/rust-trait/)

[トレイトの実体を捉えれば、Rustへの恐怖は少し減る　コンパイルエラーの対処で理解できた言語のコンセプト - ログミーTech](https://logmi.jp/tech/articles/326357)


