---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる"
postdate: "2023-11-23"
update: "2025-01-09"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "アルゴリズムやデータ構造ごとに解ける問題を分類しました。"
tags: ["Rust", "競技プログラミング", "AtCoder"]
keywords: ["Rust", "競技プログラミング", "AtCoder"]
published: true
---

# アルゴリズムやデータ構造ごとに問題を分類する

タイトルのまんまです。アルゴリズムやデータ構造ごとに、そのアルゴリズムを使って解けそうな問題をリストアップします。基本的に私が解いた問題から載せていくので、最初の内は簡単なものばかりで数も少ないです。

都合上、同じ問題が複数回登場することがありますがご了承ください🙇‍♂️。

# 目次

|アルゴリズム|データ構造|その他|
|---|---|---|
|[全探索](#全探索)|[累積和](#累積和)|[文字列操作](#文字列操作)|
|[工夫のいる全探索](#工夫のいる全探索)|[いもす法](#いもす法)|[最小公倍数](#最小公倍数)|
|[バブルソート](#バブルソート)|[スタック](#スタック)|[回文判定](#回文判定)|
|[約数列挙](#約数列挙)|[HashSet](#hashset)|[n進数](#n進数)|
|[二分探索](#二分探索)|[HashMap](#hashmap)|[周期性](#周期性)|
|[bit全探索](#bit全探索)|[BTreeSet](#btreeset)|[後から帳尻合わせる系](#後から帳尻合わせる系)|
|[再帰関数](#再帰関数)|[BTreeMap](#btreemap)|
|[メモ化再帰](#メモ化再帰)|
|[深さ優先探索](#深さ優先探索)|
|[幅優先探索](#幅優先探索)|
|[ユークリッドの互除法](#ユークリッドの互除法)|
|[ランレングス圧縮](#ランレングス圧縮)|
|[動的計画法](#動的計画法)|
|[貪欲法](#貪欲法)|||
|[尺取り法](#尺取り法)|

# アルゴリズム

## 全探索

アルゴリズムの基本というか、考え得るパターンを全て試していく方法です。B問題までであれば全探索で間に合うことが多いです。

### ABC331 B - Buy One Carton of Milk

[B - Buy One Carton of Milk](https://atcoder.jp/contests/abc331/tasks/abc331_b)（<span style="color: gray">🧪 Difficulty : 182</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc331/tasks/abc331_b

pub fn run(n: usize, s: usize, m: usize, l: usize) -> usize {
    let mut ans = std::usize::MAX;

    for i in 0..=100 {
        for j in 0..=100 {
            for k in 0..=100 {
                if i*6 + j*8 + k*12 >= n {
                    ans = ans.min(i*s + j*m + k*l);
                }
            }
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(300, run(16, 120,  150, 200));
        assert_eq!(10, run(10, 100, 50, 10));
        assert_eq!(10000, run(99, 600, 800, 1200));
    }
}
```
</details>

### ABC224 C - Triangle?

[C - Triangle?](https://atcoder.jp/contests/abc224/tasks/abc224_c)

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc224/tasks/abc224_c

fn run(n: usize, xy: Vec<(isize, isize)>) -> usize {
    let mut ans = 0;

    for i in 0..n {
        for j in i+1..n {
            for k in j+1..n {
                if (xy[j].0 - xy[i].0)*(xy[k].1 - xy[i].1) - (xy[k].0 - xy[i].0)*(xy[j].1 - xy[i].1) != 0 {
                    ans += 1;
                }
            }
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<(isize, isize)>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(4, vec![(0, 1), (1, 3), (1, 1), (-1, -1)], 3),
            TestCase(20, vec![(224, 433), (987654321, 987654321), (2, 0), (6, 4), (314159265, 358979323), (0, 0), (-123456789, 123456789), (-1000000000, 1000000000), (124, 233), (9, -6), (-4, 0), (9, 5), (-7, 3), (333333333, -333333333), (-9, -1), (7, -10), (-1, 5), (324, 633), (1000000000, -1000000000), (20, 0)], 1124),
        ];

        for TestCase(n, xy, expected) in tests {
            assert_eq!(run(n, xy), expected);
        }
    }
}

```
</details>

## 工夫のいる全探索

とりえるパターンを全て試すとTLEになるので、何らかの工夫を凝らして計算量を減らすタイプの全探索です。

### JOI 2023/2024 二次予選 A - カードゲーム 2 (Card Game 2)

[A - カードゲーム 2 (Card Game 2)](https://atcoder.jp/contests/joi2024yo2/tasks/joi2024_yo2_a)（<span style="color: gray">Difficultyなし</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/joi2024yo2/tasks/joi2024_yo2_a

fn run(_n: usize, a: Vec<usize>) -> &'static str {
    let mut vec = vec![false; 200_000];

    for i in a {
        vec[i-1] = true;
    }

    for i in 0..200_000-3 {
        if vec[i] == true && vec[i+3] == true && vec[i+6] == true {
            return "Yes";
        }
    }

    "No"
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<usize>, &'static str);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, vec![2, 5, 8], "Yes"),
            TestCase(4, vec![1, 4, 6, 4], "No"),
            TestCase(8, vec![9, 8, 11, 1, 1, 6, 10, 4], "No"),
            TestCase(20, vec![2, 15, 4, 30, 6, 8, 11, 27, 14, 3, 16, 26, 19, 2, 23, 21, 18, 13, 28, 6], "Yes"),
        ];

        for TestCase(n, a, expected) in tests {
            assert_eq!(run(n, a), expected);
        }
    }
}
```

</details>

### JOI 2022/2023 二次予選 A - 年齢の差 (Age Difference)

[A - 年齢の差 (Age Difference)](https://atcoder.jp/contests/joi2023yo2/tasks/joi2023_yo2_a)

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/joi2023yo2/tasks/joi2023_yo2_a

use itertools::Itertools;

fn run(_n: usize, a: Vec<isize>) -> Vec<usize> {
    let vec: Vec<isize> = a.clone().into_iter().sorted().collect();

    let min = vec.iter().min().unwrap();
    let max = vec.iter().max().unwrap();

    a.into_iter()
        .map(|i| {
            std::cmp::max((i - *min).abs(), (*max - i).abs()) as usize
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<isize>, Vec<usize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, vec![13, 15, 20], vec![7, 5, 7]),
            TestCase(2, vec![100, 100], vec![0, 0]),
            TestCase(10, vec![440894064, 101089692, 556439322, 34369336, 98417847, 216265879, 623843484, 554560874, 247445405, 718003331], vec![406524728, 616913639, 522069986, 683633995, 619585484, 501737452, 589474148, 520191538, 470557926, 683633995]),
        ];

        for TestCase(n, a, expected) in tests {
            assert_eq!(run(n, a), expected);
        }
    }
}
```

</details>

## バブルソート

### ABC264 D - "redocta".swap(i,i+1)

[D - "redocta".swap(i,i+1)](https://atcoder.jp/contests/abc264/tasks/abc264_d)（<span style="color: brown">Difficulty : 414</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc264/tasks/abc264_d

pub fn run(s: &str) -> usize {
    let mut ans = 0;

    let mut vec: Vec<usize> = s.chars()
        .map(|c| {
            match c {
                'a' => 0,
                't' => 1,
                'c' => 2,
                'o' => 3,
                'd' => 4,
                'e' => 5,
                'r' => 6,
                _ => unreachable!(),
            }
        })
        .collect();

    for i in 0..7 {
        let mut flag = true;

        for j in 0..7-i-1 {
            if vec[j] > vec[j+1] {
                vec.swap(j, j+1);
                ans += 1;
                flag = false;
            }
        }

        if flag == true {
            return ans;
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(&'static str, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase("catredo", 8),
            TestCase("atcoder", 0),
            TestCase("redocta", 21),
        ];

        for TestCase(s, expected) in tests {
            assert_eq!(run(s), expected);
        }
    }
}
```

</details>

## 二分探索

### ABC365 C - Transportation Expenses

[C - Transportation Expenses](https://atcoder.jp/contests/abc365/tasks/abc365_c)（<span style="color: gray">Difficulty : 269</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc365/tasks/abc365_c

use std::cmp::min;

fn check(a: &Vec<usize>, x: usize, m: usize) -> bool {
    let mut total = 0;

    for n in a.iter() {
        total += min(n, &x);
    }

    total <= m
}

pub fn run(_n: usize, m: usize, a: Vec<usize>) -> String {
    let sum: usize = a.iter().sum();

    if sum <= m {
        return "infinite".to_string();
    }

    let mut l = 0;
    let mut r = std::usize::MAX;

    while l+1 < r {
        let tmp = (l+r)/2;

        if check(&a, tmp, m) == true {
            l = tmp;
        } else {
            r = tmp;
        }
    }

    l.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<usize>, &'static str);

    #[test]
    fn test() {
        let tests = [
            TestCase(4, 8, vec![1, 3, 2, 4], "2"),
            TestCase(3, 20, vec![5, 3, 2], "infinite"),
            TestCase(10, 23, vec![2, 5, 6, 5, 2, 1, 7, 9, 7, 2], "2"),
        ];

        for TestCase(n, m, a, expected) in tests {
            assert_eq!(run(n, m, a), expected);
        }
    }
}
```

</details>

## 約数列挙

### ABC180 C - Cream puff

[C - Cream puff](https://atcoder.jp/contests/abc180/tasks/abc180_c)（<span style="color: gray">Difficulty : 142</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc180/tasks/abc180_c

pub fn run(n: usize) -> Vec<usize> {
    let mut ans = Vec::new();

    for i in 1..=(n as f64).sqrt() as usize {
        if n % i == 0 {
            let j = n / i;

            ans.push(i);

            if i != j {
                ans.push(j);
            }
        }
    }

    ans.sort();

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(vec![1, 2, 3, 6], run(6));
        assert_eq!(vec![1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 30, 36, 40, 45, 48, 60, 72, 80, 90, 120, 144, 180, 240, 360, 720], run(720));
        assert_eq!(vec![1, 1000000007], run(1000000007));
        assert_eq!(vec![1], run(1));
    }
}
```
</details>

## bit全探索

[bit 全探索 - けんちょんの競プロ精進記録](https://drken1215.hatenablog.com/entry/2019/12/14/171657)

### ARC105 A - Fourtune Cookies

[A - Fourtune Cookies](9https://atcoder.jp/contests/arc105/tasks/arc105_a)（<span style="color: gray">Difficulty : 34</span>）

bit全探索の練習にはぴったりだと思います。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/arc105/tasks/arc105_a

fn run(a: usize, b: usize, c: usize, d: usize) -> String {
    let vec = vec![a, b, c, d];

    for bit in 0..(1 << 4) {
        let mut eat = 0;
        let mut rest = 0;

        for i in 0..4 {
            if bit & (1 << i) != 0 {
                eat += vec[i];
            } else {
                rest += vec[i];
            }
        }

        if eat == rest {
            return String::from("Yes");
        }
    }

    String::from("No")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("Yes"), run(1, 3, 2, 4));
        assert_eq!(String::from("No"), run(1, 2, 4, 8));
        assert_eq!(String::from("Yes"), run(1, 1, 1, 1));
        assert_eq!(String::from("Yes"), run(1, 100, 50, 51));
        assert_eq!(String::from("Yes"), run(2, 100, 48, 50));
        assert_eq!(String::from("Yes"), run(63214004, 4741111, 4654151, 63300964));
        assert_eq!(String::from("No"), run(4630987, 9157337, 18793476, 5005153));
        assert_eq!(String::from("No"), run(93407609, 30427494, 56229544, 81174201));
    }
}
```
</details>

### ARC025 A - ゴールドラッシュ

[A - ゴールドラッシュ](https://atcoder.jp/contests/arc025/tasks/arc025_1)（<span style="color: gray">🧪 Difficulty : 120</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/arc025/tasks/arc025_1

fn run(dd: Vec<usize>, jj: Vec<usize>) -> usize {
    let mut ans = 0;

    for bit in 0..(1 << dd.len()) {
        let mut total = 0;

        for i in 0..dd.len() {
            if bit & (1 << i) != 0 {
                total += dd[i];
            } else {
                total += jj[i];
            }
        }

        ans = ans.max(total);
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(33, run(vec![4, 2, 0, 5, 6, 2, 5], vec![6, 1, 4, 3, 6, 4, 6]));
        assert_eq!(35, run(vec![1, 2, 3, 4, 5, 6, 7], vec![2, 3, 4, 5, 6, 7, 8]));
        assert_eq!(0, run(vec![0, 0, 0, 0, 0, 0, 0], vec![0, 0, 0, 0, 0, 0, 0]));
        assert_eq!(793, run(vec![8, 3, 0, 2, 5, 25, 252], vec![252, 252, 2, 5, 2, 5, 2]));
    }
}
```
</details>

### ABC374 C - Separated Lunch

[C - Separated Lunch](https://atcoder.jp/contests/abc374/tasks/abc374_c)

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc374/tasks/abc374_c

use std::cmp::{min, max};

fn run(n: usize, k: Vec<usize>) -> usize {
    let mut ans = std::usize::MAX;

    for bit in 0..(1 << n) {
        let mut left = 0;
        let mut right = 0;

        for i in 0..n {
            if bit & 1 << i != 0 {
                left += k[i];
            } else {
                right += k[i];
            }
        }

        ans = min(ans, max(left ,right));
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<usize>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(5, vec![2, 3, 5, 10, 12], 17),
            TestCase(2, vec![1, 1], 1),
            TestCase(6, vec![22, 25, 26, 45, 22, 31], 89),
        ];

        for TestCase(n, k, expected) in tests {
            assert_eq!(run(n, k), expected);
        }
    }
}
```

</details>

### ABC182 C - To 3

[C - To 3](https://atcoder.jp/contests/abc182/tasks/abc182_c)（<span style="color: gray">Difficulty : 292</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc182/tasks/abc182_c

fn run(n: usize) -> i32 {
    // 1個も消さずに3で割り切れる場合
    if n % 3 == 0 {
        return 0;
    }

    let mut ans = std::i32::MAX;
    // 各桁をVec<i32>に格納
    let vec: Vec<i32> = n.to_string().chars().map(|c| c.to_digit(10).unwrap() as i32).collect();

    for bit in 1..(1 << vec.len()) {
        // 各桁の合計数
        let mut num = 0;

        // 数値を消した数
        let mut count = 0;

        for i in 0..vec.len() {
            if bit & (1 << i) != 0 {
                num += vec[i] * 10_i32.pow(i as u32);
                count += 1;
            }
        }

        if num % 3 == 0 {
            ans = ans.min(count);
        }
    }

    if ans == std::i32::MAX {
        -1
    } else {
        ans
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(1, run(35));
        assert_eq!(0, run(369));
        assert_eq!(1, run(6227384));
        assert_eq!(-1, run(11));
    }
}
```
</details>

### ABC079 C - Train Ticket

[C - Train Ticket](https://atcoder.jp/contests/abc079/tasks/abc079_c)（<span style="color: gray">Difficulty : 337</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc079/tasks/abc079_c

fn run(s: &str) -> String {
    let nums: Vec<i32> = s.chars().map(|c| c.to_digit(10).unwrap() as i32).collect();

    for bit in 0..(1 << 3) {
        // +、-を格納していくVec<char>
        let mut ans = Vec::new();
        // 各数値を+-した合計値
        let mut sum = nums[0];

        for i in 0..3 {
            if bit & (1 << i) != 0 {
                sum += nums[i+1];
                ans.push('+');
            } else {
                sum -= nums[i+1];
                ans.push('-');
            }
        }

        if sum == 7 {
            return format!("{}{}{}{}{}{}{}=7", nums[0], ans[0], nums[1], ans[1], nums[2], ans[2], nums[3]);
        }
    }

    unreachable!();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("1+2+2+2=7"), run("1222"));
        assert_eq!(String::from("0-2+9-0=7"), run("0290"));
        assert_eq!(String::from("3+2+4-2=7"), run("3242"));
    }
}
```
</details>

### ARC061 C - たくさんの数式

[C - たくさんの数式](https://atcoder.jp/contests/arc061/tasks/arc061_a)（<span style="color: green">Difficulty : 1089</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc045/tasks/arc061_a

pub fn run(s: &str) -> usize {
    let len = s.len();
    let chars: Vec<char> = s.chars().collect();

    let mut ans = 0;

    for bit in 0..(1 << len-1) {
        let mut current = chars[0].to_string();
        let mut sum = 0;

        for i in 0..(len-1) {
            if bit & (1 << i) != 0 {
                current.push(chars[i+1]);
            } else {
                sum += current.parse::<usize>().unwrap();
                current = chars[i+1].to_string();
            }
        }

        sum += current.parse::<usize>().unwrap();
        ans+= sum;
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(&'static str, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase("125", 176),
            TestCase("9999999999", 12656242944),
        ];

        for TestCase(s, expected) in tests {
            assert_eq!(run(s), expected);
        }
    }
}
```

</details>

## 再帰関数

### ABC229 B - Hard Calculation

[B - Hard Calculation](https://atcoder.jp/contests/abc229/tasks/abc229_b)（<span style="color: gray">Difficulty : 42</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc229/tasks/abc229_b

fn calc(a: usize, b: usize) -> bool {
    if a == 0 || b == 0 {
        true
    } else if a%10 + b %10 >= 10 {
        false
    } else {
        calc(a/10, b/10)
    }
}

pub fn run(a: usize, b: usize) -> String {
    if calc(a, b) == true {
        String::from("Easy")
    } else {
        String::from("Hard")
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("Hard"), run(229, 390));
        assert_eq!(String::from("Easy"), run(123456789, 9876543210));
    }
}
```
</details>

### ABC248 B - Slimes

[B - Slimes](https://atcoder.jp/contests/abc248/tasks/abc248_b)（<span style="color: gray">Difficulty : 41</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc248/tasks/abc248_b

fn calc(count: usize, a: usize, b: usize, k: usize) -> usize {
    if a >= b {
        count
    } else {
        calc(count+1, a*k, b, k)
    }
}

fn run(a: usize, b: usize, k: usize) -> usize {
    calc(0, a, b, k)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(2, run(1, 4, 2));
        assert_eq!(0, run(7, 7, 10));
        assert_eq!(6, run(31, 415926, 5));
        assert_eq!(1, run(158260522, 200224287, 10));
        assert_eq!(30, run(1, 1000000000, 2));
        assert_eq!(1, run(999999999, 1000000000, 500000000));
        assert_eq!(29, run(1, 536870912, 2));
    }
}
```
</details>

### ABC083 C - Multiple Gift

[C - Multiple Gift](https://atcoder.jp/contests/abc083/tasks/arc088_a)（<span style="color: gray">Difficulty : 392</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc083/tasks/arc088_a

fn calc(n: usize, y: usize, count: usize) -> usize {
    if n > y {
        count
    } else {
        calc(n*2, y, count+1)
    }
}

pub fn run(x: usize, y: usize) -> usize {
    calc(x, y, 0)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(3, run(3, 20));
        assert_eq!(3, run(25, 100));
        assert_eq!(31, run(314159265, 358979323846264338));
    }
}
```
</details>

### ABC100 C - *3 or /2

[C - *3 or /2](https://atcoder.jp/contests/abc100/tasks/abc100_c)（<span style="color: gray">Difficulty : 327</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn calc(num: usize, count: usize) -> usize {
    if num % 2 != 0 {
        count
    } else {
        calc(num/2, count+1)
    }
}

pub fn run(_n: usize, a: vec<usize>) -> usize {
    a.iter()
        .map(|num| {
            // 各要素が2で何回割り切れるかを合計
            calc(*num, 0)
        })
        .sum()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(3, run2(3, vec![5, 2, 4]));
        assert_eq!(0, run2(4, vec![631, 577, 243, 199]));
        assert_eq!(39, run2(10, vec![2184, 2126, 1721, 1800, 1024, 2528, 3360, 1945, 1280, 1776]));
    }
}
```
</details>

### ABC029 C - Brute-force Attack

[C - Brute-force Attack](https://atcoder.jp/contests/abc029/tasks/abc029_c)（<span style="color: brown">difficulty : 584</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc029/tasks/abc029_c

fn func(n: usize, s: String, vec: &mut Vec<String>) -> Vec<String> {
    if n == 0 {
        vec.push(s);
        vec.clone()
    } else {
        for c in ["a", "b", "c"].iter() {
            func(n - 1, s.clone() + &c.to_string(), vec);
        }
        vec.clone()
    }
}

fn run(n: usize) -> Vec<String> {
    func(n, "".to_string(), &mut Vec::new())
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<&'static str>);

    #[test]
    fn test() {
        let tests = [
            TestCase(1, vec!["a", "b", "c"]),
            TestCase(2, vec!["aa", "ab", "ac", "ba", "bb", "bc", "ca", "cb", "cc"]),
        ];

        for TestCase(n, expected) in tests {
            assert_eq!(run(n), expected);
        }
    }
}
```

</details>

## メモ化再帰



### ABC275 D - Yet Another Recursive Function

[D - Yet Another Recursive Function](https://atcoder.jp/contests/abc275/tasks/abc275_d)（<span style="color: brown">difficulty : 606</span>）

<details>
<summary>コード例を見る</summary>

```rust
// すぐ書く
```

</details>

### ABC340 C - Divide and Divide

[C - Divide and Divide](https://atcoder.jp/contests/abc340/tasks/abc340_c)（<span style="color: brown">difficulty : 528</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc340/tasks/abc340_c

use std::collections::HashMap;

fn calc(n: usize, h: &mut HashMap<usize, usize>) -> usize {
    if n < 2 {
        return 0;
    }

    if let Some(x) = h.get(&n) {
        return *x;
    }

    let a = n/2;
    let b = if n % 2 == 0 { n / 2 } else { n / 2 + 1 };

    let num = n + calc(a, h) + calc(b, h);
    h.entry(n).or_insert(num);

    return num;
}

pub fn run(n: usize) -> usize {
    let mut hash_map: HashMap<usize, usize> = HashMap::new();

    calc(n, &mut hash_map)
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, 5),
            TestCase(340, 2888),
            TestCase(100000000000000000, 5655884811924144128),
        ];

        for TestCase(n, expected) in tests {
            assert_eq!(run(n), expected);
        }
    }
}
```

</details>

## 深さ優先探索 

### ABC277 C - Ladder Takahashi

[C - Ladder Takahashi](https://atcoder.jp/contests/abc277/tasks/abc277_c)（<span style="color: brown">difficulty : 540</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc277/tasks/abc277_c

use std::collections::{HashMap, HashSet};

fn dfs(current: usize, seen: &mut HashSet<usize>, graph: &HashMap<usize, Vec<usize>>) -> usize {
    let mut ans = current;
    seen.insert(ans);

    for tmp in graph.get(&current).unwrap() {
        if seen.contains(tmp) {
            continue;
        }

        ans = ans.max(dfs(*tmp, seen, graph));
    }

    ans
}

pub fn run(_n: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut hash_map: HashMap<usize, Vec<usize>> = HashMap::new();

    for &(a, b) in ab.iter() {
        hash_map.entry(a).or_insert_with(|| Vec::new()).push(b);
        hash_map.entry(b).or_insert_with(|| Vec::new()).push(a);
    }

    // 1階からどこにも行けなかったら1を返す
    let Some(_) = hash_map.get(&1) else {
        return 1;
    };

    dfs(1, &mut HashSet::new(), &hash_map)
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<(usize, usize)>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(4, vec![(1, 4), (4, 3), (4, 10), (8, 3), (1, 2)], 10),
            TestCase(6, vec![(1, 3), (1, 5), (1, 12), (3, 5), (3, 12), (5, 12)], 12),
            TestCase(3, vec![(500000000, 600000000), (600000000, 700000000), (700000000, 800000000)], 1),
        ];

        for TestCase(n, ab, expected) in tests {
            assert_eq!(run(n, ab), expected);
        }
    }
}
```

</details>

## 幅優先探索 

[BFS (幅優先探索) 超入門！ 〜 キューを鮮やかに使いこなす 〜](https://qiita.com/drken/items/996d80bcae64649a6580)

### ABC007 C - 幅優先探索

[C - 幅優先探索](https://atcoder.jp/contests/abc007/tasks/abc007_3)（<span style="color: green">🧪 Difficulty : 1024</span>）

そのまんまの問題です。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/atc002/tasks/abc007_3

use std::collections::VecDeque;

fn run(r: usize, c: usize, s: (usize, usize), g: (usize, usize), v: Vec<&str>) -> usize {
    let vec: Vec<Vec<char>> = v.into_iter().map(|c| c.chars().collect()).collect();

    let mut graph = vec![vec![-1; c]; r];
    let mut queue = VecDeque::new();

    graph[s.0-1][s.1-1] = 0;
    queue.push_back((s.0-1, s.1-1));

    let dx = [0, -1, 0, 1];
    let dy = [-1, 0, 1, 0];

    while queue.len() > 0 {
        let cur = queue.pop_front().unwrap();

        for i in 0..4 {
            let h = (cur.0 as isize + dx[i]) as usize;
            let w = (cur.1 as isize + dy[i]) as usize;

            if vec[h][w] == '#' || graph[h][w] != -1 {
                continue;
            }

            graph[h][w] = graph[cur.0][cur.1] + 1;

            queue.push_back((h, w));
        }
    }

    graph[g.0-1][g.1-1] as usize
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, (usize, usize), (usize, usize), Vec<&'static str>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(7, 8, (2, 2), (4, 5), vec!["########", "#......#", "#.######", "#..#...#", "#..##..#", "##.....#", "########"], 11),
            TestCase(5, 8, (2, 2), (2, 4), vec!["########", "#.#....#", "#.###..#", "#......#", "########"], 10),
            TestCase(50, 50, (2, 2), (49, 49), vec!["##################################################", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "#................................................#", "##################################################"], 94),
        ];

        for TestCase(r, c, s, g, v, expected) in tests {
            assert_eq!(run(r, c, s, g, v), expected);
        }
    }
}
```
</details>

### AGC033 A - Darker and Darker

[A - Darker and Darker](https://atcoder.jp/contests/agc033/tasks/agc033_a)（<span style="color: green">Difficulty : 1159</span>）


<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/agc033/tasks/agc033_a

use std::collections::VecDeque;

// 境界チェック
fn check(r: isize, c: isize, h: usize, w: usize) -> bool {
    r < 0 || c < 0 || r >= h as isize || c >= w as isize
}

fn run(h: usize, w: usize, a: Vec<&str>) -> usize {
    let vec: Vec<Vec<char>> = a.into_iter().map(|s| s.chars().collect()).collect();

    let mut graph = vec![vec![-1; w]; h];
    let mut queue = VecDeque::new();

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == '#' {
                graph[i][j] = 0;
                queue.push_back((i, j));
            }
        }
    }

    let dx = [0, -1, 0, 1];
    let dy = [-1, 0, 1, 0];

    while let Some((cur_r, cur_c)) = queue.pop_front() {
        for i in 0..4 {
            let new_r = cur_r as isize + dx[i];
            let new_c = cur_c as isize + dy[i];

            if check(new_r, new_c, h, w) {
                continue;
            }

            let (new_r, new_c) = (new_r as usize, new_c as usize);

            if vec[new_r][new_c] == '#' || graph[new_r][new_c] != -1 {
                continue;
            }

            graph[new_r][new_c] = graph[cur_r][cur_c] + 1;
            queue.push_back((new_r, new_c));
        }
    }

    graph.iter()
        .flat_map(|row| row.iter())
        .copied()
        .max()
        .unwrap() as usize
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<&'static str>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, 3, vec!["...", ".#.", "..."], 2),
            TestCase(6, 6, vec!["..#..#", "......", "#..#..", "......", ".#....", "....#."], 3),
        ];

        for TestCase(h, w, a, expected) in tests {
            assert_eq!(run(h, w, a), expected);
        }
    }
}

```
</details>

## ユークリッドの互除法

[atcoder 版！マスター・オブ・整数 (最大公約数編)](https://qiita.com/drken/items/0c88a37eec520f82b788)

### アルゴリズムと数学　演習問題集 015 - calculate gcd

[015 - calculate gcd](https://atcoder.jp/contests/math-and-algorithm/tasks/math_and_algorithm_o)

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/math-and-algorithm/tasks/math_and_algorithm_o

fn gcd(a: usize, b: usize) -> usize {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

pub fn run(a: usize, b: usize) -> usize {
    gcd(a, b)
}


fn main() {
    println!("{}", run(33, 88));
    println!("{}", run(123, 777));
}
```
</details>

### arc105 b - max-=min

[b - max-=min](https://atcoder.jp/contests/arc105/tasks/arc105_b)（<span style="color: gray">difficulty : 366</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/arc105/tasks/arc105_b

fn gcd(a: usize, b: usize) -> usize {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

fn run(n: usize, a: vec<usize>) -> usize {
    let mut ans = a[0];

    for b in 1..a.len() {
        ans = ans.min(gcd(ans, a[b]));
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(2, run(3, vec![2, 6, 6]));
        assert_eq!(42, run(15, vec![546, 3192, 1932, 630, 2100, 4116, 3906, 3234, 1302, 1806, 3528, 3780, 252, 1008, 588]));
    }
}
```
</details>

### abc109 c - skip

[c - skip](https://atcoder.jp/contests/abc109/tasks/abc109_c)（<span style="color: brown">difficulty : 542</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn gcd(a: isize, b: isize) -> isize {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

pub fn run(_n: usize, x: isize, v: Vec<isize>) -> isize {
    v.iter()
        .skip(1)
        .fold((x - &v[0]).abs(), |state, num| {
            gcd(state, (x - num).abs())
        })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(2, run(3, 3, vec![1, 7, 11]));
        assert_eq!(24, run(3, 81, vec![33, 105, 57]));
        assert_eq!(999999999, run(1, 1, vec![1000000000]));;
    }
}
```
</details>

### ABC118 C - Monsters Battle Royale

[C - Monsters Battle Royale](https://atcoder.jp/contests/abc118/tasks/abc118_ck)（<span style="color: brown">Difficulty : 646</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc118/tasks/abc118_c

fn gcd(a: usize, b: usize) -> usize {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

pub fn run(_n: usize, v: Vec<usize>) -> usize {
    v.iter()
        .fold(0, |state, num| {
            gcd(state, *num)
        })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(2, run(4, vec![2, 10, 8, 40]));
        assert_eq!(1, run(4, vec![5, 13, 8, 1000000000]));
        assert_eq!(1000000000, run(3, vec![1000000000, 1000000000, 1000000000]));
    }
}
```
</details>

## ランレングス圧縮

[ランレングス圧縮の魅力　～茶diff攻略への強い味方～ - YU2TA7KA&#39;s BLOG  ～take one step at a time～](https://www.yu2ta7ka-emdded.com/entry/2020/08/13/135134)

全要素を回していると間に合わないのでランレングス圧縮で要素数を減らし計算量を削減する、という問題が多いです。また、同じ文字で固めて、文字が切り替わるタイミングで何かする、という問題もあります。

なお、`itertools`の`dedup_with_count`を使えば簡単にランレングス圧縮できます。

```rust
use itertools::Itertools;

fn main() {
    let vec = vec!['a', 'a', 'a', 'b', 'a', 'c', 'c'];

    for (count, char) in vec.into_iter().dedup_with_count() {
        println!("count={}, char={}", count, char);
        // count=3, char=a
        // count=1, char=b
        // count=1, char=a
        // count=2, char=c
    }
}
```

### ABC019 B - 高橋くんと文字列圧縮

[B - 高橋くんと文字列圧縮](https://atcoder.jp/contests/abc019/tasks/abc019_2)（<span style="color: brown">🧪 Difficulty : 534</span>）

そのものズバリの問題です。

<details>
<summary>コード例を見る</summary>

```rust
fn run_length(s: Vec<char>) -> Vec<(char, usize)> {
    let mut result = vec![];
    let mut current = (s[0], 1);

    for i in 1..s.len() {
        if s[i] == current.0 {
            current.1 += 1;
        } else {
            result.push(current);
            current = (s[i], 1);
        }
    }

    result.push(current);

    result
}

pub fn run(s: &str) -> String {
    let rle = run_length(s.chars().collect());

    rle.iter()
        .map(|(c, i)| {
            format!("{}{}", c, i)
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("a2b3a2d1"), run("aabbbaad"));
        assert_eq!(String::from("a2b12x1y1z1a1"), run("aabbbbbbbbbbbbxyza"));
        assert_eq!(String::from("e1d1c1b1a1"), run("edcba"));
    }
}
```
</details>

### ABC143 C - Slimes

[C - Slimes](https://atcoder.jp/contests/abc143/tasks/abc143_c)（<span style="color: gray">Difficulty : 66</span>）

連続している部分をひとまとまりとして扱います。

<details>
<summary>コード例を見る</summary>

```rust
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

fn run(_n: usize, s: &str) -> usize {
    run_lengths(s.chars().collect()).len()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(5, run(10, "aabbbbaaca"));
        assert_eq!(1, run(5, "aaaaa"));
        assert_eq!(10, run(20, "xxzaffeeeeddfkkkkllq"));
    }

    #[test]
    fn test2() {
        assert_eq!(5, run2(10, "aabbbbaaca"));
        assert_eq!(1, run2(5, "aaaaa"));
        assert_eq!(10, run2(20, "xxzaffeeeeddfkkkkllq"));
    }
}
```
</details>

### ABC299 C - Dango

[C - Dango](https://atcoder.jp/contests/abc299/tasks/abc299_c)（<span style="color: gray">Difficulty : 191</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc299/tasks/abc299_c

use itertools::Itertools;

fn run(_n: usize, s: &str) -> isize {
    let run_length: Vec<(usize, char)> = s.chars().dedup_with_count().collect();

    run_length
        .iter()
        .enumerate()
        .filter_map(|(i, (count, c))| {
            if *c == 'o' {
                let left = i > 0 && run_length[i-1].1 == '-';
                let right = i+1 < run_length.len() && run_length[i+1].1 == '-';

                if left || right {
                    return Some(count);
                }
            }
            None
        })
        .max()
        .map(|x| *x as isize)
        .unwrap_or(-1)
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, &'static str, isize);

    #[test]
    fn test() {
        let tests = [
            TestCase(10, "o-oooo---o", 4),
            TestCase(1, "-", -1),
            TestCase(30, "-o-o-oooo-oo-o-ooooooo--oooo-o", 7),
        ];

        for TestCase(n, s, expected) in tests {
            assert_eq!(run(n, s), expected);
        }
    }
}
```
</details>

### ABC329 C - Count xxx

[C - Count xxx](https://atcoder.jp/contests/abc329/tasks/abc329_c)（<span style="color: gray">Difficulty : 205</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc329/tasks/abc329_c

use std::collections::HashMap;

fn run(n: usize, s: &str) -> usize {
    let chars: Vec<char> = s.chars().collect();

    let mut hashmap = HashMap::new();
    let mut count = 1;

    hashmap.insert(chars[0], 1);

    for i in 1..n {
        if chars[i] == chars[i-1] {
            count += 1;

            if count > *hashmap.get(&chars[i]).unwrap() {
                *hashmap.get_mut(&chars[i]).unwrap() += 1;
            }
        } else {
            count = 1;

            hashmap.entry(chars[i]).or_insert(1);
        }
    }

    hashmap.values().sum()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(4, run(6, "aaabaa"));
        assert_eq!(1, run(1, "x"));
        assert_eq!(8, run(12, "ssskkyskkkky"));
    }
}

```
</details>

### ABC380 C - Move Segment

[C - Move Segment](https://atcoder.jp/contests/abc380/tasks/abc380_c)（<span style="color: gray">Difficulty : 223</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc380/tasks/abc380_c

fn run_length(s: Vec<char>) -> Vec<(char, usize)> {
    let mut result = vec![];
    let mut current = (s[0], 1);

    for i in 1..s.len() {
        if s[i] == current.0 {
            current.1 += 1;
        } else {
            result.push(current);
            current = (s[i], 1);
        }
    }

    result.push(current);

    result
}

fn run(_n: usize, k: usize, s: &str) -> String {
    let mut rle = run_length(s.chars().collect());

    let one_idx = rle
        .iter()
        .enumerate()
        .filter(|&(_, &(ch, _))| ch == '1')
        .nth(k - 1)
        .map(|(i, _)| i)
        .unwrap();

    if one_idx > 0 && rle[one_idx - 1].0 == '0' {
        rle.swap(one_idx - 1, one_idx);
    }

    rle
        .iter()
        .flat_map(|&(ch, len)| std::iter::repeat(ch).take(len))
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, &'static str, &'static str);

    #[test]
    fn test() {
        let tests = [
            TestCase(15, 3, "010011100011001", "010011111000001"),
            TestCase(10, 2, "1011111111", "1111111110"),
        ];

        for TestCase(n, k, s, expected) in tests {
            assert_eq!(run(n, k, s), expected);
        }
    }
}
```
</details>

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

これはランレングス圧縮とは言えないですが、連続する文字数を数えるという意味では考え方は似てると思います。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/agc016/tasks/agc016_a

use itertools::Itertools;

// c以外の文字が最大何文字続くかをカウント
fn max_streak(c: char, s: &str) -> usize {
    s.chars()
        .scan(0, |streak, char| {
            if char == c {
                *streak = 0;
                Some(0)
            } else {
                *streak += 1;
                Some(*streak)
            }
        })
        .max()
        .unwrap()
}

pub fn run(s: &str) -> usize {
    if s.chars().all_equal() {
        return 0;
    }

    ('a'..='z')
        .map(|c| {
            max_streak(c, s)
        })
        .min()
        .unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(3, run("serval"));
        assert_eq!(2, run("jackal"));
        assert_eq!(0, run("zzz"));
        assert_eq!(8, run("whbrjpjyhsrywlqjxdbrbaomnw"));
        assert_eq!(50, run("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"));
        assert_eq!(0, run("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"));
        assert_eq!(4, run("dcddccddccdcddddddccdccdcddccdccccdddddddddccddccccdddddcdcdcccdcccddddddcdddddccdcccddcc"));
    }
}
```
</details>

### ABC061 C - Big Array

[C - Big Array](https://atcoder.jp/contests/abc061/tasks/abc061_c)（<span style="color: green">Difficulty : 887</span>）

これまでは「入力をランレングス圧縮して扱う」問題でしたが、この問題はランレングス圧縮された状態で入力が与えられると言えます。圧縮されたものを解凍するイメージです。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc061/tasks/abc061_c

pub fn run(_n: usize, k: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut vec = ab.clone();

    vec.sort_by(|a, b| a.0.cmp(&b.0));

    let mut rest = k;

    for i in vec {
        if rest <= i.1 {
            return i.0
        } else {
            rest -= i.1
        }
    }

    unreachable!();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(3, run(3, 4, vec![(1, 1), (2, 2), (3, 3)]));
        assert_eq!(1, run(10, 500000, vec![(1, 100000), (1, 100000), (1, 100000), (1, 100000), (1, 100000), (100000, 100000), (100000, 100000), (100000, 100000), (100000, 100000), (100000, 100000)]));
    }
}
```
</details>

## 動的計画法

### ABC087 C - Candies

[C - Candies](https://atcoder.jp/contests/abc087/tasks/arc090_a)（<span style="color: gray">Difficulty : 312</span>）

`N`が100と小さいので全探索でもいけますがDPで。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc087/tasks/arc090_a

pub fn run(n: usize, a: [Vec<usize>; 2]) -> usize {
    let mut dp: Vec<Vec<usize>> = vec![vec![], vec![]];

    dp[0].push(a[0][0]);

    for i in 1..n {
        let prev = dp[0][i-1];
        dp[0].push(prev + a[0][i]);
    }

    dp[1].push(a[0][0] + a[1][0]);

    for i in 1..n {
        let prev = dp[1][i-1];
        let next = dp[0][i];
        dp[1].push(prev.max(next) + a[1][i]);
    }

    dp[1][n-1]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(14, run(5, [vec![3, 2, 2, 4, 1], vec![1, 2, 2, 2, 1]]));
        assert_eq!(5, run(4, [vec![1, 1, 1, 1], vec![1, 1, 1, 1]]));
        assert_eq!(29, run(7, [vec![3, 3, 4, 5, 4, 5, 3], vec![5, 3, 4, 4, 2, 3, 2]]));
        assert_eq!(5, run(1, [vec![2], vec![3]]));
    }
}
```
</details>

### ABC245 C - Choose Elements

[C - Choose Elements](https://atcoder.jp/contests/abc245/tasks/abc245_c)（<span style="color: brown">Difficulty : 403</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc245/tasks/abc245_c

pub fn run(n: usize, k: isize, a: Vec<isize>, b: Vec<isize>) -> &'static str {
    let mut dp_a = vec![false; n];
    let mut dp_b = vec![false; n];

    dp_a[0] = true;
    dp_b[0] = true;

    for i in 0..n-1 {
        if dp_a[i] == true {
            dp_a[i+1] |= (a[i] - a[i+1]).abs() <= k;
            dp_b[i+1] |= (a[i] - b[i+1]).abs() <= k;
        }
        if dp_b[i] == true {
            dp_a[i+1] |= (b[i] - a[i+1]).abs() <= k;
            dp_b[i+1] |= (b[i] - b[i+1]).abs() <= k;
        }
    }

    if dp_a[n-1] || dp_b[n-1] {
        "Yes"
    } else {
        "No"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, isize, Vec<isize>, Vec<isize>, &'static str);

    #[test]
    fn test() {
        let tests = [
            TestCase(5, 4, vec![9, 8, 3, 7, 2], vec![1, 6, 2, 9, 5], "Yes"),
            TestCase(3, 2, vec![1, 3, 100, 101, 102], vec![1, 3, 100, 101, 102], "No"),
            TestCase(4, 1000000000, vec![1, 1, 1000000000, 1000000000], vec![1, 1000000000, 1, 1000000000], "Yes"),
        ];

        for TestCase(n, k, a, b, expected) in tests {
            assert_eq!(run(n, k, a, b), expected);
        }
    }
}
```
</details>

## 貪欲法

### ABC011 C - 123引き算

[C - 123引き算](https://atcoder.jp/contests/abc011/tasks/abc011_3)（<span style="color: green">🧪 Difficulty : 810</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc011/tasks/abc011_3

fn run(n: isize, ng: [isize; 3]) -> &'static str {
    if ng.contains(&n) {
        return "NO";
    }

    let mut cur = n;

    for _ in 0..100 {
        // 3引いた数がNGじゃないなら3引く
        // 2, 1も同様

        for j in (1..=3).rev() {
            if ng.contains(&(cur - j)) {
                continue;
            }

            cur -= j;
            break;
        }

        if cur <= 0 {
            return "YES";
        }
    }

    "NO"
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(isize, [isize; 3], &'static str);

    #[test]
    fn test() {
        let tests = [
            TestCase(2, [1, 7, 15], "YES"),
            TestCase(5, [1, 4, 2], "YES"),
            TestCase(300, [57, 121, 244], "NO"),
        ];

        for TestCase(n, ng, expected) in tests {
            assert_eq!(run(n, ng), expected);
        }
    }
}
```
</details>

## 尺取り法

### ABC038 C - 単調増加

[C - 単調増加](https://atcoder.jp/contests/abc038/tasks/abc038_c)（<span style="color: green">Difficulty : 894</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc038/tasks/abc038_c

fn run(n: usize, a: Vec<usize>) -> usize {
    let mut ans = 0;
    let mut r = 0;

    for l in 0..n {
        while r < n && (r <= l || a[r] > a[r-1]) {
            r += 1;
        }

        ans += r - l;

        if l == r {
            r += 1;
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<usize>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(5, vec![1, 2, 3, 2, 1], 8),
            TestCase(4, vec![1, 2, 3, 4], 10),
            TestCase(6, vec![3, 3, 4, 1, 2, 2], 8),
            TestCase(6, vec![1, 5, 2, 3, 4, 2], 10),
        ];

        for TestCase(n, a, expected) in tests {
            assert_eq!(run(n, a), expected);
        }
    }
}
```

</details>

# データ構造

## 累積和

### ABC099 B - Stone Monument

[B - Stone Monument](https://atcoder.jp/contests/abc099/tasks/abc099_b)（<span style="color: gray">Difficulty : 131</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc099/tasks/abc099_b

pub fn run(a: usize, b: usize) -> usize {
    let mut cum_sum = Vec::new();

    for i in 0..=(b-a) {
        if i == 0 {
            cum_sum.push(i)
        } else {
            cum_sum.push(cum_sum[i-1] + i);
        }
    }

    *cum_sum.iter().last().unwrap() - b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(2, run(8, 13));
        assert_eq!(1, run(54, 65));
    }
}
```
</details>

### ABC371 D - 1D Country

[D - 1D Country](https://atcoder.jp/contests/abc371/tasks/abc371_d)（<span style="color: brown">Difficulty : 408</span>）


<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc371/tasks/abc371_d

fn run(n: usize, x: Vec<isize>, p: Vec<isize>, q: usize, lr: Vec<(isize, isize)>) -> Vec<isize> {
    let mut cum = vec![0];

    for i in 1..=n {
        cum.push(cum[i-1] + p[i-1])
    }

    (0..q)
        .map(|i| {
            let l = x.partition_point(|x| *x < lr[i].0);
            let r = x.partition_point(|x| *x < lr[i].1 + 1);
            cum[r] - cum[l]
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<isize>, Vec<isize>, usize, Vec<(isize, isize)>, Vec<isize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(4, vec![1, 3, 5, 7], vec![1, 2, 3, 4], 4, vec![(1, 1), (2, 6), (0, 10), (2, 2)], vec![1, 5, 10, 0]),
            TestCase(7, vec![-10, -5, -3, -1, 0, 1, 4], vec![2, 5, 6, 5, 2, 1, 7], 8, vec![(-7, 7), (-1, 5), (-10, -4), (-8, 10), (-5, 0), (-10, 5), (-8, 7), (-8, -3)], vec![26, 15, 7, 26, 18, 28, 26, 11]),
        ];

        for TestCase(n, x, p, q, lr, expected) in tests {
            assert_eq!(run(n, x, p, q, lr), expected);
        }
    }
}

```
</details>

### ABC122 C - GeT AC

[C - GeT AC](https://atcoder.jp/contests/abc122/tasks/abc122_c) （<span style="color: brown">Difficulty : 700</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc122/tasks/abc122_c

pub fn run(n: usize, _q: usize, s: &str, lr: Vec<(usize, usize)>) -> Vec<usize> {
    let mut ans = Vec::new();

    let mut cum_sum = vec![0; n];

    let chars = s.chars().collect::<Vec<char>>();

    for (i, lr) in chars.windows(2).enumerate() {
        if lr[0] == 'A' && lr[1] == 'C' {
            cum_sum[i+1] = cum_sum[i]+1;
        } else {
            cum_sum[i+1] = cum_sum[i];
        }
    }

    for (l, r) in lr.iter() {
        ans.push(cum_sum[r-1] - cum_sum[l-1]);
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, &'static str, Vec<(usize, usize)>, Vec<usize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(8, 3, "ACACTACG", vec![(3, 7), (2, 3), (1, 8)], vec![2, 0, 3]),
        ];

        for TestCase(n, q, s, lr, expected) in tests {
            assert_eq!(run(n, q, s, lr), expected);
        }
    }
}
```
</details>

## いもす法

### ABC014 C - AtColor

[C - AtColor](https://atcoder.jp/contests/abc014/tasks/abc014_3)（<span style="color: skyblue">🧪 Difficulty : 1276</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc014/tasks/abc014_3

fn run(_n: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut vec: Vec<isize> = vec![0; 1_000_000+2];

    for (a, b) in ab {
        vec[a] += 1;
        vec[b+1] -= 1;
    }

    let mut ans = vec![vec[0]];

    for i in 1..vec.len() {
        ans.push(ans[i-1] + vec[i]);
    }

    ans.into_iter()
        .max()
        .unwrap() as usize
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<(usize, usize)>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(4, vec![(0, 2), (2, 3), (2, 4), (5, 6)], 3),
            TestCase(4, vec![(1000000, 1000000), (1000000, 1000000), (0, 1000000), (1, 1000000)], 4),
        ];

        for TestCase(n, ab, expected) in tests {
            assert_eq!(run(n, ab), expected);
        }
    }
}
```
</details>

## スタック

[スタックとキューを極める！ 〜 考え方と使い所を特集 〜](https://qiita.com/drken/items/6a95b57d2e374a3d3292)

### ABC286 B - Cat

[B - Cat](https://atcoder.jp/contests/abc286/tasks/abc286_b)（<span style="color: gray">Difficulty : 32</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc286/tasks/abc286_b

pub fn run(n: usize, s: &str) -> String {
    let chars: Vec<char> = s.chars().collect();

    chars.iter()
        .fold(Vec::new(), |mut stack, c| {
            stack.push(*c);

            if stack.len() >= 2 && stack[stack.len()-2..] == ['n', 'a'] {
                stack.truncate(stack.len()-2);
                stack.append(&mut vec!['n', 'y', 'a']);
            }

            stack
        })
        .iter()
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("nyaan"), run(4, "naan"));
        assert_eq!(String::from("near"), run(4, "near"));
        assert_eq!(String::from("nyationyal"), run(8, "national"));
    }
}
```
</details>


### ABC351 C - Merge the balls

[C - Merge the balls](https://atcoder.jp/contests/abc351/tasks/abc351_c)（<span style="color: gray">Difficulty : 228</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc351/tasks/abc351_c

pub fn run(_n: usize, a: Vec<usize>) -> usize {
    a.into_iter()
        .fold(Vec::new(), |mut stack, num| {
            stack.push(num);

            loop {
                let len = stack.len();

                if len > 1 && stack[len-2] == stack[len-1] {
                    let i = stack[len-1];

                    stack.truncate(len-2);

                    stack.push(i+1);
                } else {
                    break stack;
                }
            }
        })
        .len()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<usize>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(7 , vec![2, 1, 1, 3, 5, 3, 3], 3),
            TestCase(5, vec![0, 0, 0, 1, 2], 4),
        ];

        for TestCase(n, a, expected) in tests {
            assert_eq!(run(n, a), expected);
        }
    }
}
```
</details>

### ABC328 D - Take ABC

[D - Take ABC](https://atcoder.jp/contests/abc328/tasks/abc328_d)（<span style="color: brown">Difficulty : 555</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc328/tasks/abc328_d

pub fn run(s: &str) -> String {
    let chars: Vec<char> = s.chars().collect();
    let mut ans: Vec<char> = Vec::new();

    for c in chars {
        ans.push(c);
        let len = ans.len();

        if len >= 3 && &ans[len-3..] == ['A', 'B', 'C'] {
            ans.truncate(len-3);
        }
    }

    ans.iter().collect()
}

/* foldを使った別解 */
pub fn run2(s: &str) -> String {
    let chars: Vec<char> = s.chars().collect();

    chars.iter()
        .fold(Vec::new(), |mut state, c: &char| {
            state.push(*c);
            let len = state.len();

            if len >= 3 && &state[state.len()-3..] == ['A', 'B', 'C'] {
                state.truncate(state.len()-3);
            }

            state
        })
        .iter()
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("BCAC"), run("BAABCBCCABCAC"));
        assert_eq!(String::new(), run("ABCABC"));
        assert_eq!(String::from("AAABBBCCC"), run("AAABCABCABCAABCABCBBBAABCBCCCAAABCBCBCC"));
    }

    #[test]
    fn test2() {
        assert_eq!(String::from("BCAC"), run2("BAABCBCCABCAC"));
        assert_eq!(String::new(), run2("ABCABC"));
        assert_eq!(String::from("AAABBBCCC"), run2("AAABCABCABCAABCABCBBBAABCBCCCAAABCBCBCC"));
    }
}
```
</details>

### ARC108 B - Abbreviate Fox

[B - Abbreviate Fox](https://atcoder.jp/contests/arc108/tasks/arc108_b)（<span style="color: green">Difficulty : 681</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/arc108/tasks/arc108_b

pub fn run(_n: usize, s: &str) -> usize {
    let chars: Vec<char> = s.chars().collect();

    chars.iter()
        .fold(Vec::new(), |mut stack, c| {
            stack.push(*c);

            if stack.len() >= 3 && stack[stack.len()-3..] == ['f', 'o', 'x'] {
                stack.truncate(stack.len()-3);
            }

            stack
        })
        .len()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(3, run(6, "icefox"));
        assert_eq!(7, run(7, "firebox"));
        assert_eq!(27, run(48, "ffoxoxuvgjyzmehmopfohrupffoxoxfofofoxffoxoxejffo"));
    }
}
```
</details>

### AGC005 A - STring

[A - STring](https://atcoder.jp/contests/agc005/tasks/agc005_a)（<span style="color: green">Difficulty : 1054</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/agc005/tasks/agc005_a

pub fn run(s: &str) -> usize {
    let chars: Vec<char> = s.chars().collect();

    chars.iter()
        .fold(Vec::new(), |mut stack, c| {
            stack.push(*c);

            let len = stack.len();

            if len >= 2 && stack[len-2] == 'S' && stack[len-1] == 'T' {
                stack.truncate(len-2);
                stack
            } else {
                stack
            }
        })
        .iter()
        .count()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(4, run("TSTTSS"));
        assert_eq!(0, run("SSTTST"));
        assert_eq!(4, run("TSSTTTSS"));
    }
}
```
</details>

## HashMap

### ABC230 B - Election

[B - Election](https://atcoder.jp/contests/abc231/tasks/abc231_b)（<span style="color: gray">Difficulty : 39</span>）

まさにHashMapを使ってくれと言わんばかりの問題です。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc231/tasks/abc231_b

use std::collections::HashMap;

pub fn run(_n: usize, s: Vec<&str>) -> String {
    let mut map = HashMap::new();

    for name in s {
        let count = map.entry(name).or_insert(0);
        *count += 1;
    }

    map.iter()
        .max_by(|a, b| a.1.cmp(b.1))
        .unwrap()
        .0.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("takahashi"), run(5, vec!["snuke", "snuke", "takahashi", "takahashi", "takahashi"]));
        assert_eq!(String::from("takahashi"), run(5, vec!["takahashi", "takahashi", "aoki", "takahashi", "snuke"]));
        assert_eq!(String::from("a"), run(1, vec!["a"]));
    }
}
```
</details>

### ABC241 B - Pasta

[B - Pasta](https://atcoder.jp/contests/abc241/tasks/abc241_b)（<span style="color: gray">Difficulty : 42</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc241/tasks/abc241_b

use std::collections::HashMap;

pub fn run(n: usize, m: usize, a: Vec<usize>, b: Vec<usize>) -> String {
    // 各長さのパスタが何本あるかのHashMap
    let mut hash_map_a = HashMap::new();

    for num in a {
        *hash_map_a.entry(num).or_insert(0) += 1;
    }

    for num in b {
        // numの長さの麺が残り0か、そもそも無ければNoを返す
        if *hash_map_a.get(&num).unwrap_or(&0) == 0 {
            return String::from("No")
        } else {
            *hash_map_a.entry(num).or_insert(0) -= 1;
        }
    }

    String::from("Yes")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("Yes"), run(3, 2, vec![1, 1, 3], vec![3, 1]));
        assert_eq!(String::from("No"), run(1, 1, vec![1000000000], vec![1]));
        assert_eq!(String::from("No"), run(5, 2, vec![1, 2, 3, 4, 5], vec![5, 5]));
    }
}
```
</details>

### ABC155 C - Poll

[C - Poll](https://atcoder.jp/contests/abc155/tasks/abc155_c)（<span style="color: gray">Difficulty : 236</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc155/tasks/abc155_c

use std::collections::HashMap;

pub fn run(_n: usize, h: Vec<&str>) -> Vec<String> {
    let mut hash_map = HashMap::new();

    for s in h {
        *hash_map.entry(s).or_insert(0) += 1;
    }

    let max_value = hash_map.values().max().unwrap();

    let mut ans = hash_map.iter()
        .filter(|e| e.1 == max_value)
        .map(|e| e.0.to_string())
        .collect::<Vec<String>>();

    ans.sort();

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(vec!["beet", "vet"], run(7, vec!["beat", "vet", "beet", "bed", "vet", "bet", "beet"]));
        assert_eq!(vec!["buffalo"], run(8, vec!["buffalo", "buffalo", "buffalo", "buffalo", "buffalo", "buffalo", "buffalo", "buffalo"]));
        assert_eq!(vec!["kick"], run(7, vec!["bass", "bass", "kick", "kick", "bass", "kick", "kick"]));
        assert_eq!(vec!["kun", "nichia", "tapu", "ushi"], run(4, vec!["ushi", "tapu", "nichia", "kun"]));
    }
}
```

</details>

### ABC261 C - NewFolder(1)

[C - NewFolder(1)](https://atcoder.jp/contests/abc261/tasks/abc261_c)（<span style="color: gray">Difficulty : 179</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc261/tasks/abc261_c

use std::collections::HashMap;

pub fn run(_n: usize, s: Vec<&str>) -> Vec<String> {
    let mut hash_map = HashMap::new();

    let mut ans = Vec::new();

    for str in s {
        match hash_map.get(str) {
            Some(num) => {
                let s = format!("{}({})", str, num);
                ans.push(s);
            },
            None => {
                ans.push(str.to_string());
            }
        }

        *hash_map.entry(str.to_string()).or_insert(0) += 1;
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<&'static str>, Vec<&'static str>);

    #[test]
    fn test() {
        let tests = [
            TestCase(5, vec!["newfile", "newfile", "newfolder", "newfile", "newfolder"], vec!["newfile", "newfile(1)", "newfolder", "newfile(2)", "newfolder(1)"]),
            TestCase(11, vec!["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"], vec!["a", "a(1)", "a(2)", "a(3)", "a(4)", "a(5)", "a(6)", "a(7)", "a(8)", "a(9)", "a(10)"]),
        ];

        for TestCase(n, s, expected) in tests {
            assert_eq!(expected, run(n, s));
        }
    }
}

```

</details>

### ABC235 C - The Kth Time Query

[C - The Kth Time Query](https://atcoder.jp/contests/abc235/tasks/abc235_c)（<span style="color: gray">Difficulty : 249</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc235/tasks/abc235_c

use std::collections::HashMap;

pub fn run(_n: usize, _q: usize, a: Vec<usize>, xk: Vec<(usize, usize)>) -> Vec<isize> {
    let mut hash_map = HashMap::new();

    for (i, n) in a.iter().enumerate() {
        hash_map.entry(n).or_insert(Vec::new()).push(i+1);
    }

    xk.into_iter()
        .map(|(x, k)| {
            if let Some(arr) = hash_map.get(&x) {
                if let Some(i) = arr.get(k-1) {
                    *i as isize
                } else {
                    -1
                }
            } else {
                -1
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<usize>, Vec<(usize, usize)>, Vec<isize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(6, 8, vec![1, 1, 2, 3, 1, 2], vec![(1, 1), (1, 2), (1, 3), (1, 4), (2, 1), (2, 2), (2, 3), (4, 1)], vec![1, 2, 5, -1, 3, 6, -1, -1]),
            TestCase(3, 2, vec![0, 1000000000, 999999999], vec![(1000000000, 1), (123456789, 1)], vec![2, -1]),
        ];

        for TestCase(n, q, a, xk, expected) in tests {
            assert_eq!(run(n, q, a, xk), expected);
        }
    }
}

```

</details>

### ABC210 C - Colorful Candies

[C - Colorful Candies](https://atcoder.jp/contests/abc210/tasks/abc210_c)（<span style="color: gray">Difficulty : 359</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc210/tasks/abc210_c

use std::collections::HashMap;

fn run(n: usize, k: usize, c: Vec<usize>) -> usize {
    let mut hash_map = HashMap::new();

    for num in &c[0..k] {
        *hash_map.entry(num).or_insert(0) += 1;
    }

    let mut ans = hash_map.len();

    for i in k..n {
        *hash_map.entry(&c[i]).or_insert(0) += 1;

        if let Some(count) = hash_map.get_mut(&c[i-k]) {
            *count -= 1;

            if *count == 0 {
                hash_map.remove(&c[i-k]);
            }

            ans = ans.max(hash_map.len());
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
            TestCase(7, 3, vec![1, 2, 1, 2, 3, 3, 1], 3),
            TestCase(5, 5, vec![4, 4, 4, 4, 4], 1),
            TestCase(10, 6, vec![304621362, 506696497, 304621362, 506696497, 834022578, 304621362, 414720753, 304621362, 304621362, 414720753], 4),
        ];

        for TestCase(n, k, c, expected) in tests {
            assert_eq!(run(n, k, c), expected);
        }
    }
}

```
</details>


### ABC194 C - Squared Error

[C - Squared Error](https://atcoder.jp/contests/abc194/tasks/abc194_c)（<span style="color: gray">Difficulty : 386</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc194/tasks/abc194_c

use std::collections::HashMap;

pub fn run(_n: usize, a: Vec<isize>) -> isize {
    let mut hash_map = HashMap::new();

    for i in a {
        *hash_map.entry(i).or_insert(0) += 1;
    }

    let vec: Vec<(isize, usize)> = hash_map.into_iter().collect();

    let mut ans = 0;

    for i in 0..vec.len() {
        for j in i+1..vec.len() {
            ans += (vec[i].0 - vec[j].0).pow(2) * vec[i].1 as isize * vec[j].1 as isize;
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<isize>, isize);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, vec![2, 8, 4], 56),
            TestCase(5, vec![-5, 8, 9, -4, -3], 950),
        ];

        for TestCase(n, a, expected) in tests {
            assert_eq!(run(n, a), expected);
        }
    }
}

```

</details>

### ABC278 D - All Assign Point Add

[D - All Assign Point Add](https://atcoder.jp/contests/abc278/tasks/abc278_d)（<span style="color: brown">Difficulty : 559</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc278/tasks/abc278_d

use std::collections::HashMap;

fn run(n: usize, a: Vec<usize>, _q: usize, q_vec: Vec<(usize, Option<usize>, Option<usize>)>) -> Vec<usize> {
    let mut hash_map = HashMap::new();

    for i in 1..=n {
        hash_map.insert(i, a[i-1]);
    }

    let mut base = 0;

    let mut ans: Vec<usize> = Vec::new();

    for (a, b, c) in q_vec.iter() {
        match a {
            1 => {
                base = b.unwrap();
                hash_map.clear()
            },
            2 => {
                hash_map.entry(b.unwrap())
                    .and_modify(|n| {
                        *n += c.unwrap();
                    })
                    .or_insert(c.unwrap());
            },
            3 => {
                ans.push(base + hash_map.get(&(b.unwrap())).unwrap_or(&0));
            },
            _ => unreachable!(),
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<usize>, usize, Vec<(usize, Option<usize>, Option<usize>)>, Vec<usize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(5, vec![3, 1, 4, 1, 5], 6, vec![(3, Some(2), None), (2, Some(3), Some(4)), (3, Some(3), None), (1, Some(1), None), (2, Some(3), Some(4)), (3, Some(3), None)], vec![1, 8, 5]),
            TestCase(1, vec![1000000000], 8, vec![(2, Some(1),Some(1000000000)), (2, Some(1), Some(1000000000)), (2, Some(1), Some(1000000000)), (2, Some(1), Some(1000000000)), (2, Some(1), Some(1000000000)), (2, Some(1), Some(1000000000)), (2, Some(1), Some(1000000000)), (3, Some(1), None)], vec![8000000000]),
            TestCase(10, vec![1, 8, 4, 15, 7, 5, 7, 5, 8, 0], 20, vec![(2, Some(7), Some(0)), (3, Some(7), None), (3, Some(8), None), (1, Some(7), None), (3, Some(3), None), (2, Some(4), Some(4)), (2, Some(4), Some(9)), (2, Some(10), Some(5)), (1, Some(10), None), (2, Some(4), Some(2)), (1, Some(10), None), (2, Some(3), Some(1)), (2, Some(8), Some(11)), (2, Some(3), Some(14)), (2, Some(1), Some(9)), (3, Some(8), None), (3, Some(8), None), (3, Some(1), None), (2, Some(6), Some(5)), (3, Some(7), None)], vec![7, 5, 7, 21, 21, 19, 10]),
        ];

        for TestCase(n, a, q, q_vec, expected) in tests {
            assert_eq!(run(n, a, q, q_vec), expected);
        }
    }
}
```

</details>

## HashSet

### ABC166 B - Trick or Treat

[B - Trick or Treat](https://atcoder.jp/contests/abc166/tasks/abc166_b)（<span style="color: gray">Difficulty : 84</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc166/tasks/abc166_b

use std::collections::HashSet;

pub fn run(n: usize, _k: usize, vec: Vec<(usize, Vec<usize>)>) -> usize {
    let mut hash_set = HashSet::new();

    for v in vec {
        for num in v.1 {
            hash_set.insert(num);
        }
    }

    (1..=n)
        .filter(|num| {
            !hash_set.contains(num)
        })
        .count()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(1, run(3, 2, vec![(2, vec![1, 3]), (1, vec![3])]));
        assert_eq!(2, run(3, 3, vec![(1, vec![3]), (1, vec![3]), (1, vec![3])]));
    }
}
```

</details>

### ABC226 B - Counting Arrays

[B - Counting Arrays](https://atcoder.jp/contests/abc226/tasks/abc226_b)（<span style="color: gray">Difficulty : 192</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc232/tasks/abc232_b

use std::collections::HashSet;

fn next_char(c: char, n: u8) -> char {
    let val = (c as u8 - 97 + n) % 26 + 97;
    val as char
}

fn run(s: &str, t: &str) -> String {
    if (0..26)
        .any(|i| {
            let str: String = s.chars().map(|c| next_char(c, i)).collect();

            str == t
        }) {
            String::from("Yes")
        } else {
            String::from("No")
        }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("Yes"), run("abc", "ijk"));
        assert_eq!(String::from("Yes"), run("z", "a"));
        assert_eq!(String::from("No"), run("ppq", "qqp"));
        assert_eq!(String::from("Yes"), run("atcoder", "atcoder"));
    }
}
```
</details>

### ABC251 C - Poem Online Judge

[C - Poem Online Judge](https://atcoder.jp/contests/abc251/tasks/abc251_c)（<span style="color: gray">Difficulty : 246</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc251/tasks/abc251_c

use std::collections::HashSet;

fn run(_n: usize, st: Vec<(&str, usize)>) -> usize {
    let mut hash_set = HashSet::new();

    let mut pos = 0;
    let mut score = 0;

    for (i, (s, t)) in st.into_iter().enumerate() {
        if hash_set.contains(&s) {
            continue;
        }

        hash_set.insert(s);

        if t > score {
            pos = i+1;
            score = t;
        }
    }

    pos
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<(&'static str, usize)>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, vec![("aaa", 10), ("bbb", 20), ("aaa", 30)], 2),
        ];

        for TestCase(n, st, expected) in tests {
            assert_eq!(run(n, st), expected);
        }
    }
}
```

</details>

### ABC278 C - FF 

[C - FF](https://atcoder.jp/contests/abc278/tasks/abc278_c)（<span style="color: gray">Difficulty : 327</span>）


<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc278/tasks/abc278_c

use std::collections::HashSet;

fn run(_n: usize, _q: usize, tab: Vec<(usize, usize, usize)>) -> Vec<&'static str> {
    let mut hash_set = HashSet::new();

    tab.into_iter()
        .filter_map(|(t, a, b)| {
            match t {
                1 => {
                    hash_set.insert((a, b));
                    None
                },
                2 => {
                    hash_set.remove(&(a, b));
                    None
                },
                3 => {
                    if hash_set.contains(&(a, b)) && hash_set.contains(&(b, a)) {
                        Some("Yes")
                    } else {
                        Some("No")
                    }
                },
                _ => unreachable!(),
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<(usize, usize, usize)>, Vec<&'static str>);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, 9, vec![(1, 1, 2), (3, 1, 2), (1, 2, 1), (3, 1, 2), (1, 2, 3), (1, 3, 2), (3, 1, 3), (2, 1, 2), (3, 1, 2)], vec!["No", "Yes", "No", "No"]),
            TestCase(2, 8, vec![(1, 1, 2), (1, 2, 1), (3, 1, 2), (1, 1, 2), (1, 1, 2), (1, 1, 2), (2, 1, 2), (3, 1, 2)], vec!["Yes", "No"]),
            TestCase(10, 30, vec![(3, 1, 6), (3, 5, 4), (1, 6, 1), (3, 1, 7), (3, 8, 4), (1, 1, 6), (2, 4, 3), (1, 6, 5), (1, 5, 6), (1, 1, 8), (1, 8, 1), (2, 3, 10), (1, 7, 6), (3, 5, 6), (1, 6, 7), (3, 6, 7), (1, 9, 5), (3, 8, 6), (3, 3, 8), (2, 6, 9), (1, 7, 1), (3, 10, 8), (2, 9, 2), (1, 10, 9), (2, 6, 10), (2, 6, 8), (3, 1, 6), (3, 1, 8), (2, 8, 5), (1, 9, 10)], vec!["No", "No", "No", "No", "Yes", "Yes", "No", "No", "No", "Yes", "Yes"]),
        ];

        for TestCase(n, q, tab, expected) in tests {
            assert_eq!(run(n, q, tab), expected);
        }
    }
}

```
</details>

<!--

## 累積和


状態が変化するものはスタックで扱います。状態が変化するたびに最初から走査するのではなく、スタックを上手く利用して計算量を削減します。
-->

## BTreeSet

### ABC352 D - Permutation Subsequence

[D - Permutation Subsequence](https://atcoder.jp/contests/abc352/tasks/abc352_d)（<span style="color: brown">Difficulty : 714</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc352/tasks/abc352_d

use std::collections::BTreeSet;

pub fn run(n: usize, k: usize, p: Vec<usize>) -> usize {
    let mut vec = vec![0; n];

    for (i, num) in p.iter().enumerate() {
        vec[num-1] = i+1;
    }

    let mut btree_set = BTreeSet::new();

    let mut ans = std::usize::MAX;

    for num in vec.iter().take(k) {
        btree_set.insert(num);
    }

    for i in 0..n {
        if i >= k {
            btree_set.remove(&vec[i-k]);
        }

        btree_set.insert(&vec[i]);

        ans = ans.min(**btree_set.last().unwrap() - **btree_set.first().unwrap());
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
            TestCase(4, 2, vec![2, 3, 1, 4], 1),
            TestCase(4, 1, vec![2, 3, 1, 4], 0),
            TestCase(10, 5, vec![10, 1, 6, 8, 7, 2, 5, 9, 3, 4], 5),
        ];

        for TestCase(n, k, p, expected) in tests {
            assert_eq!(run(n, k, p), expected);
        }
    }
}
```

</details>

## BTreeMap

### ABC253 C - Max - Min Query

[C - Max - Min Query](https://atcoder.jp/contests/abc253/tasks/abc253_c)（<span style="color: gray">Difficulty : 518</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc253/tasks/abc253_c

use std::collections::BTreeMap;
use std::cmp::min;

pub fn run(_q: usize, query: Vec<(usize, Option<usize>, Option<usize>)>) -> Vec<usize> {
    let mut bt = BTreeMap::new();

    let mut ans = Vec::new();

    for tup in query.iter() {
        match tup {
            (1, Some(b), None) => {
                *bt.entry(b).or_insert(0) += 1;
            },
            (2, Some(b), Some(c)) => {
                if let Some(value) = bt.get_mut(b) {
                    let subtract_amount = min(*value, *c);
                    *value -= subtract_amount;

                    if *value == 0 {
                        bt.remove(b);
                    }
                }
            },
            (3, None, None) => {
                ans.push(*bt.iter().next_back().unwrap().0 - *bt.iter().next().unwrap().0);
            },
            _ => unreachable!(),
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, Vec<(usize, Option<usize>, Option<usize>)>, Vec<usize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(8, vec![(1, Some(3), None), (1, Some(2), None), (3, None, None), (1, Some(2), None), (1, Some(7), None), (3, None, None), (2, Some(2), Some(3)), (3, None, None)], vec![1, 5, 4]),
            TestCase(4, vec![(1, Some(10000), None), (1, Some(1000), None), (2, Some(100), Some(3)), (1, Some(10), None)], vec![]),
        ];

        for TestCase(q, query, expected) in tests {
            assert_eq!(run(q, query), expected);
        }
    }
}

```

</details>

# その他

アルゴリズムやデータ構造ではないですが、様々なテーマで問題を分類しました。

## 文字列操作

### ABC232 B - Caesar Cipher

[B - Caesar Cipher](https://atcoder.jp/contests/abc232/tasks/abc232_b)（<span style="color: gray">Difficulty : 82</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc232/tasks/abc232_b

fn next_char(c: char, n: u8) -> char {
    let val = (c as u8 - 97 + n) % 26 + 97;
    val as char
}

fn run(s: &str, t: &str) -> String {
    if (0..26)
        .any(|i| {
            let str: String = s.chars().map(|c| next_char(c, i)).collect();

            str == t
        }) {
            String::from("Yes")
        } else {
            String::from("No")
        }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("Yes"), run("abc", "ijk"));
        assert_eq!(String::from("Yes"), run("z", "a"));
        assert_eq!(String::from("No"), run("ppq", "qqp"));
        assert_eq!(String::from("Yes"), run("atcoder", "atcoder"));
    }
}
```
</details>

## 最小公倍数

### ABC148 C - Snack

[C - Snack](https://atcoder.jp/contests/abc148/tasks/abc148_c)（<span style="color: gray">Difficulty : 82</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc148/tasks/abc148_c

fn gcd(m: usize, n: usize) -> usize {
    if n == 0 {
        m
    } else {
        gcd(n, m % n)
    }
}

pub fn run(a: usize, b: usize) -> usize {
    a / gcd(a, b) * b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test () {
        assert_eq!(6, run(2, 3));
        assert_eq!(18696, run(123, 456));
        assert_eq!(9999900000, run(100000, 99999));
    }
}
```
</details>

<aside>

最大公約数は[ユークリッドの互除法](#%E3%83%A6%E3%83%BC%E3%82%AF%E3%83%AA%E3%83%83%E3%83%89%E3%81%AE%E4%BA%92%E9%99%A4%E6%B3%95)を参照ください。

</aside>

### ARC110 A - Redundant Redundancy

[A - Redundant Redundancy](https://atcoder.jp/contests/arc110/tasks/arc110_a)（<span style="color: gray">Difficulty : 120</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/arc110/tasks/arc110_a

fn gcd(m: usize, n: usize) -> usize {
    if n == 0 {
        m
    } else {
        gcd(n, m % n)
    }
}

pub fn run(n: usize) -> usize {
    let mut num = 1;

    for i in 2..=n {
        num = num / gcd(num, i) * i;
    }

    num + 1
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, 7),
            TestCase(10, 2521),
        ];

        for TestCase(n, expected) in tests {
            assert_eq!(run(n), expected);
        }
    }
}
```

</details>

## 回文判定

### 競技プログラミングの鉄則 B56 - Palindrome Queries

[B56 - Palindrome Queries](https://atcoder.jp/contests/tessoku-book/tasks/tessoku_book_ec)

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/tessoku-book/tasks/tessoku_book_ec

fn check(s: &str) -> bool {
    s.chars().eq(s.chars().rev())
}

fn run(_n: usize, _q: usize, s: &str, vec: Vec<(usize, usize)>) -> Vec<String> {
    vec.iter().map(|v| {
        if check(&s[(v.0 - 1)..=(v.1 - 1)]) {
            String::from("Yes")
        } else {
            String::from("No")
        }
    }).collect::<Vec<String>>()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(vec![String::from("Yes"), String::from("No"), String::from("Yes")], run(11, 3, "mississippi", vec![(5, 8), (6, 10), (2, 8)]));
    }
}
```
</details>

### ABC066 B - ss

[B - ss](https://atcoder.jp/contests/abc066/tasks/abc066_b)（<span style="color: gray">Difficulty : 384</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc066/tasks/abc066_b

fn check(s: &str) -> bool {
    if s[0..s.len()/2] == s[s.len()/2..] {
        true
    } else {
        false
    }
}

pub fn run(s: String) -> usize {
    (0..s.len())
        .rev()
        .skip(1)
        .step_by(2)
        .find(|i| {
            check(&s[0..*i])
        }).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(6, run(String::from("abaababaab")));
        assert_eq!(2, run(String::from("xxxx")));
        assert_eq!(6, run(String::from("abcabcabcabc")));
        assert_eq!(14, run(String::from("akasakaakasakasakaakas")));
    }
}
```
</details>

### ABC147 B - Palindrome-philia

[B - Palindrome-philia](https://atcoder.jp/contests/abc147/tasks/abc147_b)（<span style="color: gray">Difficulty : 44</span>）

<details>
<summary>コード例を見る</summary>

```rust
pub fn run(s: &str) -> usize {
    let chars: Vec<char> = s.chars().collect();

    (0..chars.len()/2).filter(|i| {
        chars[*i] != chars[s.len() - *i - 1]
    }).count()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(1, run("redcoder"));
        assert_eq!(0, run("wwwww"));
        assert_eq!(1, run("rng"));
        assert_eq!(50, run("ndfzvmkpudjeocebkfpexoszwczmpbdmivjnfeqapwvmbiiiarpwrjyezwdgydqbldyfyslboertiilckvacvroxycczmpfmdymu"));
        assert_eq!(10, run("aybmyzzankubfabovxfkoazziskrl"));
        assert_eq!(1, run("ax"));
        assert_eq!(0, run("xxx"));
        assert_eq!(34, run("uqoppvgpiqmsiwhpyfqnilmqkokdzowhrkzlavboipnljjlljpjwqalvxfvwpuairhxqiioqflgcwxvjupvghpadng"));
        assert_eq!(2, run("hjvqwycocvwqvth"));
        assert_eq!(34, run("xzamzvhfwhndreischtcucykbfjqasqlbkoxjpglbppptrvfccnfvlzppgdlmmseoidlqschqwnkfvqptsriiorvfqdjhrumjfc"));
    }
}
```
</details>

### ABC307 B - racecar

[B - racecar](https://atcoder.jp/contests/abc307/tasks/abc307_b)（<span style="color: gray">Difficulty : 70</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn check(s: String) -> bool {
    s.chars().eq(s.chars().rev())
}

pub fn run(_n: usize, s: Vec<&str>) -> String {
    if s.iter()
        .permutations(2)
        .any(|v| check(format!("{}{}", v[0], v[1])))
    {
        String::from("Yes")
    } else {
        String::from("No")
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("Yes"), run(5, vec!["ab", "ccef", "da", "a", "fe"]));
        assert_eq!(String::from("No"), run(3, vec!["a", "b", "aba"]));
        assert_eq!(String::from("Yes"), run(2, vec!["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]));
    }
}
```
</details>

### ABC198 B - Palindrome with leading zeros

[B - Palindrome with leading zeros](https://atcoder.jp/contests/abc198/tasks/abc198_b)（<span style="color: gray">Difficulty : 96</span>）

先頭に好きなだけ`0`を付けれるという事は、末尾の`0`を全て削除できると同じと捉えられます。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc198/tasks/abc198_b

fn check(s: &str) -> bool {
	s.chars().eq(s.chars().rev())
}

fn run(n: usize) -> String {
    if n == 0 {
		return String::from("Yes");
	}

	let mut num = n;

	// numの末尾0を取り除く
	// (10で割り切れる限り割る)
	while num % 10 == 0 {
		num /= 10
	}

	if check(&num.to_string()) {
		String::from("Yes")
	} else {
		String::from("No")
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test() {
		assert_eq!(String::from("Yes"), run(1210));
		assert_eq!(String::from("Yes"), run(12100000000));
		assert_eq!(String::from("Yes"), run(777));
		assert_eq!(String::from("No"), run(123456789));
	}
}
```
</details>

### ABC237 C - kasaka

[C - kasaka](https://atcoder.jp/contests/abc237/tasks/abc237_c)（<span style="color: gray">Difficulty : 267</span>）


<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc237/tasks/abc237_c

fn check(s: String) -> bool {
    s.chars().eq(s.chars().rev())
}

// Refactoring
pub fn run(s: String) -> &'static str {
    // 先頭、末尾から連続して何文字aが続くかをカウント
    let mut head = 0;
    let mut tail = 0;

    for c in s.chars() {
        if c == 'a' {
            head += 1;
        } else {
            break
        }
    }

    for c in s.chars().rev() {
        if c == 'a' {
            tail += 1;
        } else {
            break
        }
    }

    // 先頭のaの方が多い時
    if head > tail {
        return "No"
    }

    // 全てaの時
    if head == s.len() {
        return "Yes"
    }

    let mut vec: Vec<char> = s.chars().collect();

    // 先頭と末尾の連続するaを削除
    vec.drain(0..head);
    vec.drain((vec.len()-tail)..vec.len());

    let str: String = vec.iter().collect();

    if check(str) {
        "Yes"
    } else {
        "No"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(String::from("Yes"), run(String::from("kasaka")));
        assert_eq!(String::from("No"), run(String::from("atcoder")));
        assert_eq!(String::from("Yes"), run(String::from("php")));
        assert_eq!(String::from("Yes"), run(String::from("aaaaaaaa")));
        assert_eq!(String::from("Yes"), run(String::from("aaabaaa")));
        assert_eq!(String::from("No"), run(String::from("aaaabaaa")));
        assert_eq!(String::from("Yes"), run(String::from("aaabaaaa")));
    }
}
```
</details>

### ABC363 C - Avoid K Palindrome 2

[C - Avoid K Palindrome 2 ](https://atcoder.jp/contests/abc363/tasks/abc363_c)（<span style="color: brown">Difficulty : 602</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc363/tasks/abc363_c

use itertools::Itertools;
use std::collections::HashSet;

fn check(chars: &[char]) -> bool {
    chars.iter().eq(chars.iter().rev())
}

fn run(n: usize, k: usize, s: &str) -> usize {
    let chars: Vec<char> = s.chars().collect();

    // 文字列の重複を防ぐ
    let mut hash_set: HashSet<Vec<char>> = HashSet::new();

    for str in chars.into_iter().permutations(n) {
        hash_set.insert(str);
    }

    let mut ans = 0;

    'outer: for str in hash_set.into_iter() {
        // k文字の部分文字列生成
        for arr in str.windows(k) {
            // 部分文字列に一つでも回文があったら次の文字に進む
            if check(arr) == true {
                continue 'outer;
            }
        }

        ans += 1;
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, &'static str, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, 2, "aab", 1),
            TestCase(5, 3, "zzyyx", 16),
            TestCase(10, 5, "abcwxyzyxw", 440640),
        ];

        for TestCase(n, k, s, expected) in tests {
            assert_eq!(run(n, k, s), expected);
        }
    }
}

```

</details>

## n進数

### ABC336 C - Even Digits

[C - Even Digits](https://atcoder.jp/contests/abc336/tasks/abc336_c)（<span style="color: gray">Difficulty : 343</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc336/tasks/abc336_c

fn calc(num: usize, mut result: Vec<usize>) -> Vec<usize> {
    if num == 0 {
        result
    } else {
        result.push(num % 5);
        calc(num / 5, result)
    }
}

pub fn run(n: usize) -> usize {
    let mut vec = calc(n-1, Vec::new());

    vec.reverse();

    vec.iter()
        .fold(0, |state, num| {
            state * 10 + num * 2
        })
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(8, 24),
            TestCase(133, 2024),
            TestCase(31415926535, 2006628868244228),
        ];

        for TestCase(n, expected) in tests {
            assert_eq!(expected, run(n));
        }
    }
}
```

</details>

## 周期性

### ABC165 D - Floor Function

[D - Floor Function](https://atcoder.jp/contests/abc165/tasks/abc165_d)（<span style="color: brown">Difficulty : 600</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc165/tasks/abc165_d

use std::cmp::min;

fn run(a: f64, b: f64, n: f64) -> usize {
    let x = f64::min(b - 1.0, n) as f64;

    ((a*x/b).floor() - a * (x/b).floor()) as usize
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(f64, f64, f64, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(5.0, 7.0, 4.0, 2),
            TestCase(11.0, 10.0, 9.0, 9),
        ];

        for TestCase(a, b, n, expected) in tests {
            assert_eq!(run(a, b, n), expected);
        }
    }
}
```

</details>

## 後から帳尻合わせる系

### ABC158 D - String Formation

[D - String Formation](https://atcoder.jp/contests/abc158/tasks/abc158_d)（<span style="color: brown">Difficulty : 610</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc158/tasks/abc158_d

use std::collections::VecDeque;

fn run(s: &str, _n: usize, query: Vec<(usize, Option<usize>, Option<char>)>) -> String {
    let mut ans = VecDeque::new();

    for c in s.chars() {
        ans.push_back(c);
    }

    let mut flag = true;

    for q in query.iter() {
        match q.0 {
            1 => {
                flag = !flag;
            },
            2 => {
                let p = q.1.unwrap();
                let c = q.2.unwrap();

                if p == 1 {
                    if flag {
                        ans.push_front(c);
                    } else {
                        ans.push_back(c);
                    }
                } else {
                    if flag {
                        ans.push_back(c);
                    } else {
                        ans.push_front(c);
                    }
                }
            },
            _ => unreachable!(),
        }
    }

    if flag {
        ans.into_iter().collect::<String>()
    } else {
        ans.into_iter().rev().collect::<String>()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(&'static str, usize, Vec<(usize, Option<usize>, Option<char>)>, &'static str);

    #[test]
    fn test() {
        let tests = [
            TestCase("a", 4, vec![(2, Some(1), Some('p')), (1, None, None), (2, Some(2), Some('c')), (1, None, None)], "cpa"),
            TestCase("a", 6, vec![(2, Some(2), Some('a')), (2, Some(1), Some('b')), (1, None, None), (2, Some(2), Some('c')), (1, None, None), (1, None, None)], "aabc"),
            TestCase("y", 1, vec![(2, Some(1),  Some('x'))], "xy"),
        ];

        for TestCase(s, n, query, expected) in tests {
            assert_eq!(run(s, n, query), expected);
        }
    }
}
```

</details>
