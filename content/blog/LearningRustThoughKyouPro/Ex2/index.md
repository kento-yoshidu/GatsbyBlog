---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる その2"
postdate: "2024-10-27"
update: "2024-10-28"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "アルゴリズムやデータ構造ごとに解ける問題を分類しました。"
tags: ["Rust", "競技プログラミング", "AtCoder"]
keywords: ["Rust", "競技プログラミング", "AtCoder"]
published: true
---

# アルゴリズムやデータ構造ごとに問題を分類する その2

# 目次

|アルゴリズム|
|---|
|[半分全列挙](#半分全列挙)|

# アルゴリズム

## 半分全列挙

### ABC292 C - Four Variables 

[C - Four Variables](https://atcoder.jp/contests/abc292/tasks/abc292_c)（<span style="color: brown">Difficulty : 444</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc292/tasks/abc292_c

fn run(n: usize) -> usize {
    let mut ab = vec![0; n+1];

    for i in 1..=n {
        for j in 1..=(n / i) {
            ab[i*j] += 1;
        }
    }

    (1..=n)
        .map(|i| {
            ab[i] * ab[n-i]
        })
        .sum()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(4, 8),
            TestCase(292, 10886),
            TestCase(19876, 2219958),
        ];

        for TestCase(n, expected) in tests {
            assert_eq!(run(n), expected);
        }
    }
}
```

</details>

### ABC184 F - Programming Contest

[F - Programming Contest](https://atcoder.jp/contests/abc184/tasks/abc184_f)（<span style="color: skyblue">Difficulty : 1432</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc184/tasks/abc184_f

use itertools::Itertools;
use std::cmp::Ordering;

// upper_boundの拡張
// n以下の最大の数を返す
pub fn max_under_n<T: Ord>(vec: &[T], value: T) -> Option<usize> {
    vec.binary_search_by(|x| {
        if *x <= value {
            Ordering::Less
        } else {
            Ordering::Greater
        }
    })
    .err()
    .map(|x| if x == 0 {
        None
    } else {
        Some(x - 1)
    })
    .flatten()
}

fn run(n: usize, t: usize, a: Vec<usize>) -> usize {
    let (l, r) = a.split_at(n/2);

    let mut p = Vec::new();
    let mut q = Vec::new();

    for i in 0..=l.len() {
        for combination in l.iter().combinations(i) {
            let sum: usize = combination.iter().map(|&&x| x).sum();
            p.push(sum);
        }
    }

    for i in 0..=r.len() {
        for combination in r.iter().combinations(i) {
            let sum: usize = combination.iter().map(|&&x| x).sum();
            q.push(sum)
        }
    }

    q.sort();

    let mut ans = 0;

    for left in p.iter() {
        if t < *left {
            continue;
        }

        if let Some(right_idx) = max_under_n(&q, t - left) {
            ans = ans.max(q[right_idx] + left)
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<usize>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(5, 17, vec![2, 3, 5, 7, 11], 17),
            TestCase(6, 100, vec![1, 2, 7, 5, 8, 10], 33),
            TestCase(6, 100, vec![101, 102, 103, 104, 105, 106], 0),
        ];

        for TestCase(n, t, a, expected) in tests {
            assert_eq!(run(n, t, a), expected);
        }
    }
}
```

</details>

### ABC123 D - Cake 123

[D - Cake 123](https://atcoder.jp/contests/abc123/tasks/abc123_d)（<span style="color: skyblue">Difficulty : 1489</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc123/tasks/abc123_d

use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn run(_x: usize, _y: usize, _z: usize, k: usize, a: Vec<usize>, b: Vec<usize>, c: Vec<usize>) -> Vec<usize> {
    let mut ab = BinaryHeap::new();

    // AとBの和で大きい順にK個求める
    for i in a.iter() {
        for j in b.iter() {
            ab.push(Reverse(i + j));

            if ab.len() > k {
                ab.pop();
            }
        }
    }

    let mut vec: Vec<_> = ab.into_sorted_vec();
    vec.reverse();

    let mut ans = BinaryHeap::new();

    // ABとCの和で大きい順にK個求める
    for i in vec.iter() {
        for j in c.iter() {
            ans.push(Reverse(i.0 + j));

            if ans.len() > k {
                ans.pop();
            }
        }
    }

    ans
        .into_sorted_vec()
        .into_iter()
        .map(|x| x.0)
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, usize, usize, Vec<usize>, Vec<usize>, Vec<usize>, Vec<usize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(2, 2, 2, 8, vec![4, 6], vec![1, 5], vec![3, 8], vec![19, 17, 15, 14, 13, 12, 10, 8]),
            TestCase(3, 3, 3, 5, vec![1, 10, 100], vec![2, 20, 200], vec![1, 10, 100], vec![400, 310, 310, 301, 301]),
            TestCase(10, 10, 10, 20, vec![7467038376, 5724769290, 292794712, 2843504496, 3381970101, 8402252870, 249131806, 6310293640, 6690322794, 6082257488], vec![1873977926, 2576529623, 1144842195, 1379118507, 6003234687, 4925540914, 3902539811, 3326692703, 484657758, 2877436338], vec![4975681328, 8974383988, 2882263257,  7690203955, 514305523, 6679823484, 4263279310, 585966808, 3752282379, 620585736], vec![23379871545, 22444657051, 22302177772, 22095691512, 21667941469, 21366963278, 21287912315, 21279176669, 21160477018, 21085311041, 21059876163, 21017997739, 20703329561, 20702387965, 20590247696, 20383761436, 20343962175, 20254073196, 20210218542, 20150096547]),
            ];

        for TestCase(x, y, z, k, a, b, c, expected) in tests {
            assert_eq!(run(x, y, z, k, a, b, c), expected);
        }
    }
}

```

</details>
