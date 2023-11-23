---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる"
postdate: "2023-11-23"
update: "2023-11-24"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "アルゴリズムやデータ構造ごとに解ける問題を分類しました。"
tags: ["Rust", "競技プログラミング", "AtCoder"]
keywords: ["Rust", "競技プログラミング", "AtCoder"]
published: true
---

# アルゴリズムやデータ構造ごとに問題を分類する

タイトルのまんまです。アルゴリズムやデータ構造ごとに、そのアルゴリズムを使って解けそうな問題をリストアップします。基本的に私が解いた問題から載せていくので、最初の内は簡単なものばかりで数も少ないです。

# アルゴリズム

## ランレングス圧縮

全要素を回していると間に合わないのでランレングス圧縮で要素数を減らし計算量を削減する、という問題が多いです。また、同じ文字で固めて、文字が切り替わるタイミングで何かする、という問題もあります。

### ABC019 B - 高橋くんと文字列圧縮

[B - 高橋くんと文字列圧縮](https://atcoder.jp/contests/abc019/tasks/abc019_2)（<span style="color: brown">Difficulty : 534</span>）

そのものズバリの問題です。

### ABC143 C - Slimes

[C - Slimes](https://atcoder.jp/contests/abc143/tasks/abc143_c)（<span style="color: gray">Difficulty : 66</span>）

連続している部分をひとまとまりとして扱います。

### ABC329 C - Count xxx

[C - Count xxx](https://atcoder.jp/contests/abc329/tasks/abc329_c)（<span style="color: gray">Difficulty : 205</span>）

### ABC259 C - XX to XXX

[C - XX to XXX](https://atcoder.jp/contests/abc259/tasks/abc259_c)（<span style="color: brown">Difficulty : 451</span>）

### ABC247 D - Cylinder

[D - Cylinder](https://atcoder.jp/contests/abc247/tasks/abc247_d)（<span style="color: brown">Difficulty : 468</span>）

### AGC039 A - Connection and Disconnection

[A - Connection and Disconnection](https://atcoder.jp/contests/agc039/tasks/agc039_a)（<span style="color: brown">Difficulty : 517</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/agc039/tasks/agc039_a

use itertools::Itertools;

fn run_length(s: &str) -> Vec<(char, usize)> {
    let mut i = 0;
    let mut run_lengths = vec![];
    let mut current = (s.chars().nth(0).unwrap(), 0);

    loop {
        while i < s.len() && s.chars().nth(i).unwrap() == current.0 {
            current.1 += 1;
            i += 1;
        }

        run_lengths.push(current);

        if i == s.len() {
            return  run_lengths;
        } else {
            current = (s.chars().nth(i).unwrap(), 0);
        }
    }
}

pub fn run(s: &str, k: usize) -> usize {
    // 全て同じ文字だった場合
    if s.chars().all_equal() {
        return s.len() * k / 2
    }

    let rle = run_length(s);

    // 最初と最後の文字が違うなら、連続している数 / 2を合計してk倍して返す
    if s.chars().nth(0) != s.chars().last() {
        rle.iter()
            .map(|(_, num)| num / 2 )
            .sum::<usize>() * k
    } else {
        let mut ans = 0;

        // 両端以外を合計する
        for i in 1..rle.len()-1 {
            ans += rle[i].1 / 2;
        }

        let left = rle[0].1;
        let right = rle.iter().last().unwrap().1;

        ans * k + (left + right) / 2 * (k - 1) + left/2 + right/2
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(4, run("issii", 2));
        assert_eq!(81, run("qq", 81));
        assert_eq!(8999939997, run("cooooooooonteeeeeeeeeest", 999993333));
        assert_eq!(50000000000, run("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 1000000000));
        assert_eq!(49499999950, run("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 999999999));
    }
}
```

</details>

### ABC047 C - 一次元リバーシ

[C - 一次元リバーシ ](https://atcoder.jp/contests/abc047/tasks/arc063_a)（<span style="color: brown">Difficulty : 755</span>）

文字が切り替わる回数を数えます。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc047/tasks/arc063_a

fn run_lengths(s: Vec<char>) -> Vec<(char, usize)> {
    let mut run_lengths = vec![];
    let mut current = (s[0], 1);

    for i in 1..s.len() {
        if s[i] == current.0 {
            current.1 += 1;
        } else {
            run_lengths.push(current);
            current = (s[i], 1);
        }
    }

    run_lengths.push(current);

    run_lengths
}

pub fn run(s: &str) -> usize {
    run_lengths(s.chars().collect()).len() - 1
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(1, run("BBBWW"));
        assert_eq!(0, run("WWWWWW"));
        assert_eq!(9, run("WBWBWBWBWB"));
    }
}
```

</details>

### ABC127 D - Integer Cards

[D - Integer Cards](https://atcoder.jp/contests/abc127/tasks/abc127_d)（<span style="color: green">Difficulty : 887</span>）

### AGC016 A - Shrinking

[A - Shrinking](https://atcoder.jp/contests/agc016/tasks/agc016_a)（<span style="color: green">Difficulty : 951</span>）

これはランレングス圧縮とは言えないですが、考え方は似てると思います。

### ABC061 C - Big Array

[C - Big Array](https://atcoder.jp/contests/abc061/tasks/abc061_c)（<span style="color: green">Difficulty : 887</span>）

これまでは「入力をランレングス圧縮して扱う」問題でしたが、この問題はランレングス圧縮された状態で入力が与えられると言えます。圧縮されたものを解凍するイメージです。

<!--
## 累積和

# データ構造

## スタック

状態が変化するものはスタックで扱います。状態が変化するたびに最初から走査するのではなく、スタックを上手く利用して計算量を削減します。
-->

