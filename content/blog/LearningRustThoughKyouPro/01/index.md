---
title: "#1 Rustのイテレーター系メソッド雑まとめ"
postdate: "2023-10-11"
update: "2025-10-12"
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

本シリーズではイテレーター系メソッドに照準をあて説明します。一つ一つを事細かに説明するわけではありませんが、簡単な使用例を載せています。実際に触ってみて理解してください。

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

### map

[`fn map<B, F>(self, f: F) -> Map<Self, F>`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.map)

`map`は各要素に任意の関数を適用し、その値を集約しイテレーターとして返します。

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

イテレーターの要素がそれぞれいくつ存在するかの`HashMap`を返します。

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

[fn position&lt;P&gt;(&mut self, predicate: P) -> Option<usize>](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.position)

クロージャーとして`bool`を返す関数を設定し、最初に`true`が返ってきたときのインデックスを返します。該当する要素があれば`Some(usize)`が返ってきて、なければ`None`が返ってきます。

```rust
fn main() {
    println!("Hello World");

    let vec = vec![1, 3, 5, 7, 8];

    // 偶数が見つかった時点でインデックスを返す
    println!("{:?}", vec.iter().position(|i| i % 2 == 0));
    //=> Some(4)
}
```

<!--
positionの問題

https://atcoder.jp/contests/abc277/tasks/abc277_a
https://atcoder.jp/contests/abc275/tasks/abc275_a

-->

### dedup_with_count(Itertools)

各文字と連続する個数をカウントします。そのままランレングス圧縮に使えそうです。

```rust
use itertools::Itertools;

fn main() {
    let vec = ['a', 'a', 'a', 'b', 'a', 'a', 'c', 'c'];

    for (len, c) in vec.into_iter().dedup_with_count() {
        println!("len={len}, char={c}");
        //=> len=3, char=a
        //=> len=1, char=b
        //=> len=2, char=a
        //=> len=2, char=c
    }     
}
```

### positions(Itertools)

`position`は`true`が返ってきた時点でインデックスを返し終了しましたが、`positions`では`true`を返す全ての要素のインデックスを返します。

```rust
use itertools::Itertools;

fn main() {
    let vec = vec![1, 2, 1, 4, 6, 1, 9, 10];

    let result: Vec<usize> = vec.iter().positions(|i| {
        i % 2 == 0
    }).collect();

    println!("{:?}", result);
    //=> [1, 3, 4, 7]
}
```

## イテレーターから1つ要素を得る

### min

[fn min(self) -> Option<Self::Item>](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.min)

イテレーターの各要素の中で最小の値の要素を得ます。戻り値はOption型であり、何らかの理由で最小の要素を得られなかった場合は`None`が返ってきます。要素の大小を比べるわけですから、イテレーターの要素の型は`Ord`トレイトを実装している必要があります。

```rust
fn main() {
    let vec = vec![-5, 0, 10];

    println!("{:?}", vec.iter().max());
    //=> Some(-5)

    let vec = 0..=100;

    println!("{:?}", vec.min());
    //=> Some(0)

    let vec = vec!['a', 'b', 'c'];

    println!("{:?}", vec.iter().min());
    //=> Some('a')

    let vec: Vec<usize> = Vec::new();

    println!("{:?}", vec.iter().min());
    //=> None
}
```

### max

[fn max(self) -> Option<Self::Item>](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.max)

イテレーターの各要素の中で最大の値の要素を得ます。こちらも戻り値はOption型であり、何らかの理由で最大の要素を得られなかった場合は`None`が返ってきます。

### find

[fn find&lt;P&gt;(&mut self, predicate: P) -> Option&lt;Self::Item&gt;](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.find)

イテレーターの各要素の中で、クロージャーが`true`を返す最初の要素をSome(T)で返します。`true`を返す要素がなければ`None`が返ります。

```rust
fn main() {
    let vec = vec![1, 2, 3, 4, 5];

    println!("{:?}", vec.iter().find(|num| **num == 3));
    //=> Some(3)

    println!("{:?}", vec.iter().find(|num| **num == 10));
    //=> None
}
```

### find_position(itertools)

`find`のインデックスもついてくる版です。`true`を返す最初の要素とそのインデックスを`Some((usize, T))`で返します。

```rust
use itertools::Itertools;

fn main() {
    let vec = vec!['a', 'b', 'c', 'd', 'e'];

    println!("{:?}", vec.iter().find_position(|c| **c == 'c'));
    //=> Some((2, 'c'))

    println!("{:?}", vec.iter().find_position(|c| **c == 'z'));
    //=> None
}
```

## イテレーターを変換して新しいイレテーターを得る

### rev

イテレーターの各要素を逆から並び替えます。

```rust
fn main() {
    let vec = vec![3, 1, 4, 1, 5];

    let rev_vec = vec.iter().rev().collect::<Vec<&usize>>();

    println!("{:?}", rev_vec);
    //=> [5, 1, 4, 1, 3]

    let str = "abcdef".to_string();

    let rev_str = str.chars().rev().collect::<String>();

    println!("{:?}", rev_str);
    //=> "fedcba"
}
```

<!-- revの問題
https://atcoder.jp/contests/abc281/tasks/abc281_a
-->

### tuple_windows(Itertools)

隣り合う要素をタプルとして順に取り出すイテレーターを生成します。

`windows`はスライス(&[T]) 専用で要素をスライス参照(&[T])として返しますが、tuple_windowsは任意のイテレーターに使えます。

```rust
fn main() {
    let s: String = String::from("abcde");

    s.chars()
        .tuple_windows::<(char, char)>()
        .for_each(|a| println!("{:?}", a));
        //=> ('a', 'b')
        //=> ('b', 'c')
        //=> ('c', 'd')
        //=> ('d', 'e')
}
```

## イテレーター2つを組み合わせたイテレーターを得る

### zip

2つのイテレーターを合体させます。各要素はタプルとしてクロージャーで受け取れます。

```rust
fn main() {
    let vec1 = vec!['a', 'b', 'c'];
    let vec2 = vec![1, 2, 3];

    vec1.iter()
        .zip(vec2.iter())
        .for_each(|t| {
            println!("{}, {}", t.0, t.1)
        });
        /*
            a, 1
            b, 2
            c, 3
        */
}
```

### zip_lengest(Itertools)

イテレーターの要素数が異なる時は、`zip_longest`を使用します。

```rust
use itertools::{Itertools, EitherOrBoth::*};

fn main() {
    let vec1 = vec!['a', 'b', 'c', 'd', 'e', 'f'];
    let vec2 = vec![1, 2, 3];

    vec1.iter()
        .zip_longest(vec2.iter())
        .for_each(|t| {
            match t {
                Both(v1, v2) => println!("vec1={}, vec2={}", v1, v2),
                Left(v1) => println!("vec1={}, vec2は要素なし", v1),
                Right(v2) => println!("vec1は要素なし, vec2={}", v2),
            }
        })
        /*
          vec1=a, vec2=1
          vec1=b, vec2=2
          vec1=c, vec2=3
          vec1=d, vec2は要素なし
          vec1=e, vec2は要素なし
          vec1=f, vec2は要素なし
        */
}
```

## 番外編

イテレーターのメソッドではないですが、コレクションを並び変えたりするようなメソッドを紹介します。

### sort

[pub fn sort(&mut self)](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.sort)

その名の通り、Vectorなどの要素を昇順に並び替えます。`sort`した後に`reverse`を呼べば降順に並び変えることができます。

[pub fn reverse(&mut self)](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.reverse)

```rust
fn main() {
    let mut vec = vec![3, 1, 4, 1, 5, 9, 2];

    vec.sort();

    println!("{:?}", vec);
    //=> [1, 1, 2, 3, 4, 5, 9]

    vec.reverse();

    println!("{:?}", vec);
    //=> [9, 5, 4, 3, 2, 1, 1]
}
```

<!--
https://www.educative.io/answers/how-to-sort-a-vector-in-rust

https://atcoder.jp/contests/abc009/tasks/abc009_2
-->

### dedup

[pub fn dedup(&mut self)](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.dedup)

Vectorにおいて、隣り合う要素が重複していれば一つにします。

```rust
fn main() {
    let mut vec = vec![1, 1, 2, 2, 3, 3, 3, 3, 3];

    vec.dedup();

    println!("{:?}", vec);
    //=> [1, 2, 3]
}
```

「隣り合う」という条件があるため、以下の例では要素は重複したままです。

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 1, 2, 3];

    vec.dedup();

    println!("{:?}", vec);
    //=> [1, 2, 3, 1, 2, 3]
}
```

もし各要素をユニークにしたいなら、`sort()`でソートした後で`dedup`を呼びます。

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 1, 2, 3];

    vec.sort();
    vec.dedup();

    println!("{:?}", vec);
    //=> [1, 2, 3]
}
```

<!--https://atcoder.jp/contests/abc009/tasks/abc009_2 -->

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

<!--
### partition

```rust
fn main() {
    let vec = vec![3, 1, 4, 1, 5];

    let (even, odd): (Vec<&usize>, Vec<&usize>) = vec.iter().partition(|i| {
        *i % 2 == 0
    });

    println!("even={:?}, odd={:?}", even, odd);
}
```

### filter_map

## イテレーターから何か一つ取り出す

### find_map

#### AtCoderの問題へのリンク

- [ABC002 A - 正直者](https://atcoder.jp/contests/abc002/tasks/abc002_1)

-->

<details style="margin-top: 60px" class="history">
<summary>更新履歴</summary>

<ul class="history-list">
  <li>2023年11月22日 : min、maxを追加。</li>
  <li>2023年10月25日 : zip、zip_longestを追加。</li>
  <li>2023年10月22日 : dedupを追加。</li>
  <li>2023年10月17日 : sort、chinksを追加。</li>
  <li>2023年10月16日 : revを追加。</li>
  <li>2023年10月15日 : positionを追加。</li>
  <li>2023年10月12日 : count、counts、all_unique、all_equalを追加。</li>
</details>

## 参考

[Itertools in itertools - Rust](https://docs.rs/itertools/latest/itertools/trait.Itertools.html#provided-methods)

[Rustのイテレータの網羅的かつ大雑把な紹介 - Qiita](https://qiita.com/lo48576/items/34887794c146042aebf1)

[Ruby脳のためのRust配列系メソッドまとめ](https://zenn.dev/megeton/articles/fb6266bcb6aa1b)

[競プロで使えそうなRustのitertoolsのマクロとメソッドまとめ - Qiita](https://qiita.com/okaponta_/items/8d6032b8f2b664c24ad19)

[Rustでイテレータを積極的に使っていくメモ (逐次更新) #Rust - Qiita](https://qiita.com/lo48576/items/ccef72649883af343f84)

[rust - Are there equivalents to slice::chunks/windows for iterators to loop over pairs, triplets etc? - Stack Overflow](https://stackoverflow.com/questions/42134874/are-there-equivalents-to-slicechunks-windows-for-iterators-to-loop-over-pairs)

[Why there is no windows for iterators? - The Rust Programming Language Forum](https://users.rust-lang.org/t/why-there-is-no-windows-for-iterators/65515)

[vec型に対してiter関数からslice::Iterが返ってくるのはなぜか - やわらかテック](https://www.okb-shelf.work/entry/vec_iter)

https://blog.ryota-ka.me/posts/2015/05/18/generators-and-lazy-evaluation-in-rust
