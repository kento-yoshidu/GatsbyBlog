---
title: "#1 Rustのイテレーター系メソッド雑まとめ"
postdate: "2023-10-11"
update: "2023-10-15"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "競技プログラミングの問題を解くことでRustを学びます。"
tags: ["Rust", "競技プログラミング", "AtCoder"]
keywords: ["Rust", "競技プログラミング", "AtCoder"]
published: true
---

# 競プロで学ぶRust

いきなり話が逸れますが、ある言語を初めて勉強する時、これまでは大抵、入門書を一冊買って勉強していました。しかし、いまいちスムーズに学習できない、、、。写経するのも退屈だし、書けるようになっている実感が湧かない、、、。そして本を投げ出して中途半端に書ける状態で終わる、という事態に陥っていました。

そこで適当に文法を勉強した後、競プロ（特にAtCoder）の問題をひたすら解きまくるという学習方法に切り替えたところ、一気に理解度が高まるようになりました。

私の場合、Rustで言えば、

- ❌ 型についての理解が不十分なため解けない
- ❌ イレテーターの取扱い方が分からないため解けない
- ❌ イテレーターメソッドを上手く使いこなせないため解けない

などがあり、A問題やB問題すらも解けないことがよくありました。問題の解き方は分かってもコードに落とし込めないのです。しかし、繰り返し問題を解いたり他の人のコードを参考にすることで自然にシンタックスが身につくようになりました。

別に難しい問題を解く必要はありません。そもそも解けないし、本格的にアルゴリズムの勉強が必要になってしまいます（いやもちろん勉強するべきなんですが）。AtCoderで言えばA、B、C問題を中心に解いていけば十分だと思います。また、問題の数も相当あるので、毎日コードを書く習慣が身につきます。さらに、解答をGitHubにプッシュしていけば大量の草を生やせます。「プログラミングの勉強が退屈で続かない」「特に作りたいものや目標がない」という方にはお勧めです。

ということで本記事では、私が競技プログラミングにRustで挑戦していく中で身に着けた知識、特にイテレーター系メソッドを中心に紹介します。

## 構成

本シリーズではイテレーター系のメソッドに照準をあて説明します。一つ一つを事細かに説明するわけではありませんが、簡単な使用例を載せています。実際に触ってみて理解してください。

また、別途記事を設け、そこで詳しい使い方やそのメソッドを使って解ける競プロ（ほとんどAtCoder）の問題を紹介します。同じ問題が複数の記事で登場することがありますがご了承ください。

本記事の構成は以下の記事を多いに参考にしました。

[Rustのイテレータの網羅的かつ大雑把な紹介 - Qiita](https://qiita.com/lo48576/items/34887794c146042aebf1)

ただ本記事では、特に競プロで使用できそうな（実際に私が使用した）メソッドをターゲットに抜き出しています。

<aside>

本シリーズは思い付きで書き始めました。後から構成が大きく変わるかもしれません。

</aside>

<aside>

まだ全然できてないですが、随時更新します。

</aside>

## itertoolsクレート

itertoolsクレートのメソッドも存分に使用しています。対象のメソッドはメソッドの見出しに(itertools)と記載していますので、以下のようにしてクレートを読み込んでください。

```rust
use itertools::Itertools;

fn main() {}
```

## 各要素に対して何らかの処理を行う

`map`に代表されるメソッドたちです。メソッドを適用すると`Iterator<T>`が返ってくるので、`collect()`などを使用して`Vec`や`String`の形で好きな形に書き換えることができます。

### map

[`fn map<B, F>(self, f: F) -> Map<Self, F>`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.map)

`map`は各要素に任意の関数を適用し、その値を集約します。

`x`には`1`、`2`、`3`が入り、2倍した値がそれぞれイテレーターに格納されます。`collect()`や`sum()`を使えば、新しいコレクション（Vec<i32>）を作成したり合計値を得ることができます。

```rust
fn main() {
    let vec = vec![1, 2, 3];

    /* 各要素を2倍してVec<i32>を作成する */
    let new_vec: Vec<i32> =
        vec.iter()
            .map(|x| { x * 2 })
            .collect();

    println!("{:?}", new_vec);
    //=> [2, 4, 6]

    /* 各要素を2倍して合計数を求める */
    let total =
        vec.iter()
            .map(|x| { x * 2 })
            .sum();

    println!("{:?}", total);
    //=> 12
}
```

## イテレーター全体から何か情報を得る

例えば要素数はいくつか、重複している要素はあるかなどを得られます。

### count

[fn count(self) -> usize](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.count)

その名の通り、イテレーターの要素数をカウントし`usize`を返します。

```rust
fn main() {
    let vec = vec![1, 2, 3, 4, 5];

    println!("{}", vec.iter().count());
    //=> 5
}
```

### counts(Itertools)

[fn counts(self) -> HashMap<Self::Item, usize>](https://docs.rs/itertools/latest/itertools/trait.Itertools.html#method.counts)

イテレータの要素がそれぞれいくつ存在するかの`HashMap`を返します。

```rust
use itertools::Itertools;

fn main() {
    let vec = vec![1, 2, 2, 3, 4, 4, 5, 5, 5, 6];

    let map = vec.iter().counts();

    println!("{:#?}", map);
    /*
    {
        1: 1,
        2: 2,
        3: 1,
        4: 2,
        5: 3,
        6: 1,
    }
    */

    println!("{:?}", map.get(&5));
    //=> Some(3)
}
```

### all_unique(Itertools)

[fn all_unique(&mut self) -> bool](https://docs.rs/itertools/latest/itertools/trait.Itertools.html#method.all_unique)

イテレーターの要素が重複しているかしていないかを返します。

```rust
use itertools::Itertools;

fn main() {
    let vec = vec![1, 2, 3];

    println!("{}", vec.iter().all_unique());
    //=> true

    let vec2 = vec![1, 1, 2];
    println!("{}", vec2.iter().all_unique());
    //=> false
}
```

### all_equal(Itertools)

全ての要素が等しいかを返します。

```rust
use itertools::Itertools;

fn main() {
    let vec = vec![1, 1, 1];

    println!("{}", vec.iter().all_equal());
    //=> true

    let vec = vec![1, 1, 2];
    println!("{}", vec.iter().all_equal());
    //=> false
}
```

### position

[fn position<P>(&mut self, predicate: P) -> Option<usize>](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.position)

クロージャーとして`bool`を返す関数を設定し、最初に`true`が返ってきたときのインデックス番号を返します。該当する要素があれば`Some(usize)`が返ってきて、なければ`None`が返ってきます。

```rust
fn main() {
    println!("Hello World");

    let vec = vec![1, 3, 5, 7, 8];

    // 偶数が見つかった時点でインデックス番号を返す
    println!("{:?}", vec.iter().position(|i| i % 2 == 0));
    //=> Some(4)
}
```

<!--
問題

https://atcoder.jp/contests/abc277/tasks/abc277_a
https://atcoder.jp/contests/abc275/tasks/abc275_a

>

<!--

### filter_map


## イテレーターから何か一つ取り出す

### max

### min

https://atcoder.jp/contests/abc005/tasks/abc005_2

### find_map

#### AtCoderの問題へのリンク

- [ABC002 A - 正直者](https://atcoder.jp/contests/abc002/tasks/abc002_1)

## イテレーターを並び変える

### sort

https://atcoder.jp/contests/abc009/tasks/abc009_2

## イテレーターの要素を書き換える

### dedup

https://atcoder.jp/contests/abc009/tasks/abc009_2

## その他（未分類）

### chunks

[pub fn chunks(&self, chunk_size: usize) -> Chunks<'_, T>](https://doc.rust-lang.org/std/primitive.slice.html#method.chunks)

任意の数の要素を持ったイテレーターに分割します。

```rust
fn main() {
    let vec = vec![1, 2, 3, 4, 5, 6, 7, 8, 9];

    // 4つごとに分割してコレクションを返す
    let new_vec = vec
        .chunks(4)
        .collect::<Vec<_>>();

    println!("{:?}", new_vec);
    //=> [[1, 2, 3, 4], [5, 6, 7, 8], [9]]
}

```

-->

<details style="margin-top: 60px" class="history">
<summary>更新履歴</summary>

<ul class="history-list">
  <li>2023年10月15日 : positionを追加。</li>
  <li>2023年10月12日 : count、counts、all_unique、all_equalを追加。</li>
</details>

## 参考

[Rustのイテレータの網羅的かつ大雑把な紹介 - Qiita](https://qiita.com/lo48576/items/34887794c146042aebf1)

[Ruby脳のためのRust配列系メソッドまとめ](https://zenn.dev/megeton/articles/fb6266bcb6aa1b)

[競プロで使えそうなRustのitertoolsのマクロとメソッドまとめ - Qiita](https://qiita.com/okaponta_/items/8d6032b8f2b664c24ad19)
