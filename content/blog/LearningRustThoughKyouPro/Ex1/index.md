---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる"
postdate: "2023-11-23"
update: "2024-02-26"
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
|[全探索](#全探索)|[スタック](#スタック)|[文字列操作](#文字列操作)|
|[約数列挙](#約数列挙)|[HashMap](#hashmap)|[最小公倍数](#最小公倍数)|
|[bit全探索](#bit全探索)|[HashSet](#hashset)|[回文判定](#回文判定)|
|[再帰関数](#再帰関数)| |[n進数](#n進数)|
|[メモ化再帰](#メモ化再帰)|
|[ユークリッドの互除法](#ユークリッドの互除法)|
|[ランレングス圧縮](#ランレングス圧縮)|
|[動的計画法](#動的計画法)|

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

## 累積和

### ABC099 B - Stone Monument

[B - Stone Monument](https://atcoder.jp/contests/abc099/tasks/abc099_b)

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

アルゴリズムの考え方自体は簡単ですが、実装したり圧縮したものを扱うのは難しいと思います。

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

pub fn run(_n: usize, s: &str) -> usize {
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

### ABC329 C - Count xxx

[C - Count xxx](https://atcoder.jp/contests/abc329/tasks/abc329_c)（<span style="color: gray">Difficulty : 205</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc329/tasks/abc329_c

use std::collections::HashMap;

pub fn run(n: usize, s: &str) -> usize {
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

# データ構造

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

<!--

## 累積和


状態が変化するものはスタックで扱います。状態が変化するたびに最初から走査するのではなく、スタックを上手く利用して計算量を削減します。
-->

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
