---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる"
postdate: "2023-11-23"
update: "2026-04-19"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "アルゴリズムやデータ構造ごとに解ける問題を分類しました。"
tags: ["Rust", "アルゴリズム", "競技プログラミング", "AtCoder"]
keywords: ["Rust", "アルゴリズム", "競技プログラミング", "AtCoder", "algorithm"]
published: true
---

# アルゴリズムやデータ構造ごとに問題を分類する

タイトルのまんまです。アルゴリズムやデータ構造ごとに、そのアルゴリズムを使って解けそうな問題をリストアップします。基本的に私が解いた問題から載せていくので、最初の内は簡単なものばかりで数も少ないです。

# 目次

|アルゴリズム|データ構造|その他|
|---|---|---|
|[全探索-11問](#全探索-11問)|[累積和](#累積和)|[文字列操作](#文字列操作)|
|[工夫のいる全探索-3問](#工夫のいる全探索-3問)|[いもす法](#いもす法)|[最小公倍数](#最小公倍数)|
|[バブルソート](#バブルソート)|[スタック-8問](#スタック-8問)|[回文判定](#回文判定)|
|[約数列挙](#約数列挙)|[HashSet](#hashset)|[n進数](#n進数)|
|[二分探索](#二分探索)|[HashMap](#hashmap)|[周期性](#周期性)|
|[bit全探索](#bit全探索)|[BTreeSet](#btreeset)|[後から帳尻合わせる系](#後から帳尻合わせる系)|
|[再帰関数](#再帰関数)|[BTreeMap](#btreemap)|
|[メモ化再帰](#メモ化再帰)|
|[深さ優先探索-5問](#深さ優先探索-5問)|
|[幅優先探索-24問](#幅優先探索-24問)|
|[ユークリッドの互除法](#ユークリッドの互除法)|
|[ランレングス圧縮](#ランレングス圧縮)|
|[動的計画法](#動的計画法)|
|[貪欲法](#貪欲法)|||
|[尺取り法](#尺取り法)|

# アルゴリズム

## 全探索-11問

アルゴリズムの基本というか、考え得るパターンを全て試していく方法です。B問題までであれば全探索で間に合うことが多いです。

### ABC419 B - Get Min

[B - Get Min](https://atcoder.jp/contests/abc419/tasks/abc419_b)（<span style="color: gray">Difficulty : 31</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(_q: usize, query: Vec<(usize, Option<usize>)>) -> Vec<usize> {
    let mut arr = vec![0; 101];

    let mut ans = Vec::new();

    for (q, x)in query {
        match q {
            1 => {
                arr[x.unwrap()] += 1;
            },
            2 => {
                for i in 0..100 {
                    if arr[i] > 0 {
                        ans.push(i);
                        arr[i] -= 1;
                        break;
                    }
                }
            },
            _ => unreachable!(),
        }
    }

    ans
}
```
</details>

### ABC393 B - A..B..C

[B - A..B..C](https://atcoder.jp/contests/abc393/tasks/abc393_b)（<span style="color: gray">Difficulty : 44</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> usize {
    let chars: Vec<char> = s.chars().collect();
    let mut ans = 0;

    for i in 0..s.len() {
        for j in i+1..s.len() {
            for k in j+1..s.len() {
                if j - i == k - j {
                    if chars[i] == 'A' && chars[j] == 'B' && chars[k] == 'C' {
                        ans += 1;
                    }
                }
            }
        }
    }

    ans
}
```
</details>

### ABC418 B - You're a teapot

[B - You're a teapot](https://atcoder.jp/contests/abc418/tasks/abc418_b)

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> f64 {
    let mut ans: f64= 0.0;

    let s: Vec<char> = s.chars().collect();

    for i in 0..s.len() {
        if s[i] != 't' {
            continue;
        }

        for j in i+1..s.len() {
            if s[j] != 't' {
                continue;
            }

            let str = &s[i..=j];

            if str.len() < 3 {
                continue;
            }

            let not_t = &s[i..=j].iter().filter(|c| **c != 't').count();

            ans = ans.max((str.len() as f64 - *not_t as f64 - 2.0) / (str.len() as f64 - 2.0));
        }
    }

    ans
}
```
</details>

### ABC409 B - Citation

[B - Citation](https://atcoder.jp/contests/abc409/tasks/abc409_b)（<span style="color: gray">Difficulty : 126</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(_n: usize, a: Vec<usize>) -> usize {
    for i in (0..=100).rev() {
        let mut count = 0;

        for num in a.iter() {
            if *num >= i {
                count += 1;
            }
        }

        if count >= i {
            return i;
        }
    }

    unreachable!();
}
```
</details>

### ABC331 B - Buy One Carton of Milk

[B - Buy One Carton of Milk](https://atcoder.jp/contests/abc331/tasks/abc331_b)（<span style="color: gray">Difficulty : 182</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, s: usize, m: usize, l: usize) -> usize {
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
```
</details>

### ABC224 C - Triangle?

[C - Triangle?](https://atcoder.jp/contests/abc224/tasks/abc224_c)（<span style="color: gray">Difficulty : 301</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC407 B - P(X or Y)

[B - P(X or Y)](https://atcoder.jp/contests/abc407/tasks/abc407_b)（<span style="color: gray">Difficulty : -</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::cmp::{min, max};

fn run(x: usize, y: usize) -> f64 {
    let mut count = 0;

    for i in 1..=6 {
        for j in 1..=6 {
            let l = max(i, j);
            let s = min(i, j);

            if i + j >= x || l - s >= y {
                count += 1;
            }
        }
    }

    count as f64 / 36.0
}
```
</details>

### ABC391 B - Seek Grid

[B - Seek Grid](https://atcoder.jp/contests/abc391/tasks/abc391_b)（<span style="color: gray">Difficulty : 110</span>）

4重forループですが、M ≦ N ≦ 50なので間に合います。

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, m: usize, s: Vec<&str>, t: Vec<&str>) -> (usize, usize) {
    let vec_s: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();
    let vec_t: Vec<Vec<char>> = t.into_iter().map(|s| s.chars().collect()).collect();

    for i in 0..=n-m {
        for j in 0..=n-m {
            let mut flag = true;

            for k in 0..m {
                for l in 0..m {
                    if vec_s[i+k][j+l] != vec_t[k][l] {
                        flag = false;
                    }
                }
            }

            if flag {
                return (i+1, j+1);
            }
        }
    }

    unreachable!();
}
```
</details>

### ABC201 C - Secret Number

[C - Secret Number](https://atcoder.jp/contests/abc201/tasks/abc201_c)（<span style="color: brown">Difficulty : 439</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> usize {
    let chars: Vec<char> = s.chars().collect();

    let mut ans = 0;

    for i in 0..10000 {
        let str = format!("{:04}", i);

        let mut flags = vec![false; 10];

        for c in str.chars() {
            let i = c.to_digit(10).unwrap();

            flags[i as usize] = true;
        }

        let mut flag = true;

        for j in 0..10 {
            if chars[j] == 'o' && flags[j] == false {
                flag = false;
                break;
            }

            if chars[j] == 'x' && flags[j] {
                flag = false;
                break;
            }
        }

        if flag {
            ans += 1;
        }
    }

    ans
}
```
</details>

### ABC227 C - ABC conjecture

[C - ABC conjecture](https://atcoder.jp/contests/abc227/tasks/abc227_c)（<span style="color: brown">Difficulty : 692</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize) -> usize {
    let mut ans = 0;

    for a in 1..=n {
        if a * a * a > n {
            break;
        }

        for b in a..=n {
            if a * b * b > n {
                break;
            }

            let c_count = n / a / b;

            if c_count >= b {
                ans += c_count - b + 1;
            } else {
                break;
            }
        }
    }

    ans
}
```
</details>

### LeetCode 1534. Count Good Triplets

[1534. Count Good Triplets](https://leetcode.com/problems/count-good-triplets/description/)（<span style="color: #1cb8b8">Difficulty : Easy</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(arr: Vec<isize>, a: isize, b: isize, c: isize) -> usize {
    let mut ans = 0;

    let len = arr.len();

    for i in 0..len {
        for j in i+1..len {
            if (arr[i] - arr[j]).abs() > a {
                continue;
            }

            for k in j+1..len {
                if (arr[j] - arr[k]).abs() <= b && (arr[i] - arr[k]).abs() <= c {
                    ans += 1;
                }
            }
        }
    }

    ans
}
```
</details>

## 工夫のいる全探索-3問

とりえるパターンを全て試すとTLEになるので、何らかの工夫を凝らして計算量を減らすタイプの全探索です。

### JOI 2023/2024 二次予選 A - カードゲーム 2 (Card Game 2)

[A - カードゲーム 2 (Card Game 2)](https://atcoder.jp/contests/joi2024yo2/tasks/joi2024_yo2_a)（<span style="color: gray">Difficultyなし</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```

</details>

### JOI 2022/2023 二次予選 A - 年齢の差 (Age Difference)

[A - 年齢の差 (Age Difference)](https://atcoder.jp/contests/joi2023yo2/tasks/joi2023_yo2_a)（<span style="color: gray">Difficultyなし</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC085 C - Otoshidama

[C - Otoshidama](https://atcoder.jp/contests/abc085/tasks/abc085_c)（<span style="color: brown">Difficulty : 584</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: isize, y: isize) -> Vec<isize> {
    for i in 0..=n {
        for j in 0..=n {
            let k = n - i - j;

            if k < 0 || n < k {
                continue;
            }

            if i * 10000 + j * 5000 + k * 1000 == y {
                return vec![i, j, k];
            }
        }
    }

    vec![-1, -1, -1]
}
```
</details>

## バブルソート

### ABC264 D - "redocta".swap(i,i+1)

[D - "redocta".swap(i,i+1)](https://atcoder.jp/contests/abc264/tasks/abc264_d)（<span style="color: brown">Difficulty : 414</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> usize {
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
```

</details>

## 二分探索

### ABC388 C - Various Kagamimochi

[C - Various Kagamimochi](https://atcoder.jp/contests/abc388/tasks/abc388_c)（<span style="color: gray">Difficulty : 211</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::cmp::Ordering;

fn upper_bound<T: Ord>(vec: &[T], value: T) -> usize {
    vec.binary_search_by(|x| {
        if *x <= value {
            Ordering::Less
        } else {
            Ordering::Greater
        }
    })
    .err()
    .unwrap()
}

fn run(_n: usize, a: Vec<usize>) -> usize {
    a.iter()
        .map(|x| {
            upper_bound(&a, x/2)
        })
        .sum()
}
```
</details>

### ABC365 C - Transportation Expenses

[C - Transportation Expenses](https://atcoder.jp/contests/abc365/tasks/abc365_c)（<span style="color: gray">Difficulty : 269</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::cmp::min;

fn check(a: &Vec<usize>, x: usize, m: usize) -> bool {
    let mut total = 0;

    for n in a.iter() {
        total += min(n, &x);
    }

    total <= m
}

fn run(_n: usize, m: usize, a: Vec<usize>) -> String {
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
```
</details>

### ABC326 C - Peak

[C - Peak](https://atcoder.jp/contests/abc326/tasks/abc326_c)（<span style="color: gray">Difficulty : 292</span>）

<details>
<summary>コード例を見る</summary>

```rust
use itertools::Itertools;

fn run(n: usize, m: usize, a: Vec<usize>) -> usize {
    let a: Vec<usize> = a.into_iter().sorted().collect();

    let mut ans = 0;

    for i in 0..n {
        let upper = a.partition_point(|&x| x < a[i] + m);
        ans = ans.max(upper - i);
    }

    ans
}
```
</details>

## 約数列挙

### ABC180 C - Cream puff

[C - Cream puff](https://atcoder.jp/contests/abc180/tasks/abc180_c)（<span style="color: gray">Difficulty : 142</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize) -> Vec<usize> {
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
```
</details>

### ARC025 A - ゴールドラッシュ

[A - ゴールドラッシュ](https://atcoder.jp/contests/arc025/tasks/arc025_1)（<span style="color: gray">🧪 Difficulty : 120</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC374 C - Separated Lunch

[C - Separated Lunch](https://atcoder.jp/contests/abc374/tasks/abc374_c)（<span style="color: gray">Difficulty : 226</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC182 C - To 3

[C - To 3](https://atcoder.jp/contests/abc182/tasks/abc182_c)（<span style="color: gray">Difficulty : 292</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC079 C - Train Ticket

[C - Train Ticket](https://atcoder.jp/contests/abc079/tasks/abc079_c)（<span style="color: gray">Difficulty : 337</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC473 C - Sneaking Glances

[C - Sneaking Glances](https://atcoder.jp/contests/abc453/tasks/abc453_c)（<span style="color: gray">Difficulty : 338</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, l: Vec<isize>) -> usize {
    let mut ans = 0;

    for bit in 0..(1 << n) {
        let mut pos = 0.5;
        let mut count = 0;

        for i in 0..n {
            let new_pos;

            if bit & (1 << i) != 0 {
                // +の方向に移動
                new_pos = pos + l[i] as f64;

                if pos < 0.0 && 0.0 < new_pos {
                    count += 1;
                }
            } else {
                // -の方向に移動
                new_pos = pos - l[i] as f64;

                if pos > 0.0 && new_pos < 0.0 {
                    count += 1;
                }
            }

            pos = new_pos;
        }

        ans = ans.max(count);
    }

    ans
}
```
</details>

### ARC061 C - たくさんの数式

[C - たくさんの数式](https://atcoder.jp/contests/arc061/tasks/arc061_a)（<span style="color: green">Difficulty : 1089</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> usize {
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
```
</details>

## 再帰関数

### ABC229 B - Hard Calculation

[B - Hard Calculation](https://atcoder.jp/contests/abc229/tasks/abc229_b)（<span style="color: gray">Difficulty : 42</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn calc(a: usize, b: usize) -> bool {
    if a == 0 || b == 0 {
        true
    } else if a%10 + b %10 >= 10 {
        false
    } else {
        calc(a/10, b/10)
    }
}

fn run(a: usize, b: usize) -> String {
    if calc(a, b) == true {
        String::from("Easy")
    } else {
        String::from("Hard")
    }
}
```
</details>

### ABC248 B - Slimes

[B - Slimes](https://atcoder.jp/contests/abc248/tasks/abc248_b)（<span style="color: gray">Difficulty : 41</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC083 C - Multiple Gift

[C - Multiple Gift](https://atcoder.jp/contests/abc083/tasks/arc088_a)（<span style="color: gray">Difficulty : 392</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn calc(n: usize, y: usize, count: usize) -> usize {
    if n > y {
        count
    } else {
        calc(n*2, y, count+1)
    }
}

fn run(x: usize, y: usize) -> usize {
    calc(x, y, 0)
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

fn run(_n: usize, a: vec<usize>) -> usize {
    a.iter()
        .map(|num| {
            // 各要素が2で何回割り切れるかを合計
            calc(*num, 0)
        })
        .sum()
}
```
</details>

### ABC029 C - Brute-force Attack

[C - Brute-force Attack](https://atcoder.jp/contests/abc029/tasks/abc029_c)（<span style="color: brown">Difficulty : 584</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

## メモ化再帰

### ABC275 D - Yet Another Recursive Function

[D - Yet Another Recursive Function](https://atcoder.jp/contests/abc275/tasks/abc275_d)（<span style="color: brown">Difficulty : 606</span>）

<details>
<summary>コード例を見る</summary>

```rust
// すぐ書く
```

</details>

### ABC340 C - Divide and Divide

[C - Divide and Divide](https://atcoder.jp/contests/abc340/tasks/abc340_c)（<span style="color: brown">Difficulty : 528</span>）

<details>
<summary>コード例を見る</summary>

```rust
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

fn run(n: usize) -> usize {
    let mut hash_map: HashMap<usize, usize> = HashMap::new();

    calc(n, &mut hash_map)
}
```
</details>

## 深さ優先探索-5問

### ATC001 A - 深さ優先探索

[A - 深さ優先探索](https://atcoder.jp/contests/atc001/tasks/dfs_a)（<span style="color: gray">Difficultyなし</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn out_of_bounds(h: isize, w: isize, i: isize, j: isize) -> bool {
    i < 0 || j < 0 || i >= h || j >= w
}

fn dfs(vec: &Vec<Vec<char>>, seen: &mut Vec<Vec<bool>>, cur_i: usize, cur_j: usize) {
    seen[cur_i][cur_j] = true;

    let dx = [0, 1, 0, -1];
    let dy = [1, 0, -1, 0];

    for i in 0..4 {
        if out_of_bounds(vec.len() as isize, vec[0].len() as isize, cur_i as isize + dx[i], cur_j as isize + dy[i]) {
            continue;
        }

        let next_i = (cur_i as isize + dx[i]) as usize;
        let next_j = (cur_j as isize + dy[i]) as usize;

        if vec[next_i][next_j] == '#' || seen[next_i][next_j] {
            continue;
        }

        dfs(&vec, seen, next_i, next_j)
    }
}

fn run(h: usize, w: usize, c: Vec<&str>) -> &'static str {
    let vec: Vec<Vec<char>> = c.into_iter().map(|str| str.chars().collect()).collect();

    let mut start = (0, 0);
    let mut end = (0, 0);

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == 's' {
                start = (i, j);
            }
            if vec[i][j] == 'g' {
                end = (i, j);
            }
        }
    }

    let mut seen = vec![vec![false; w]; h];

    dfs(&vec, &mut seen, start.0, start.1);

    if seen[end.0][end.1] {
        "Yes"
    } else {
        "No"
    }
}
```
</details>

### ABC277 C - Ladder Takahashi

[C - Ladder Takahashi](https://atcoder.jp/contests/abc277/tasks/abc277_c)（<span style="color: brown">Difficulty : 540</span>）

<details>
<summary>コード例を見る</summary>

```rust
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

fn run(_n: usize, ab: Vec<(usize, usize)>) -> usize {
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
```

</details>

### ABC378 D - Count Simple Paths

[D - Count Simple Paths](https://atcoder.jp/contests/abc378/tasks/abc378_d)（<span style="color: brown">Difficulty : 587</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn out_of_bounds(h: usize, w: usize, i: isize, j: isize) -> bool {
    i < 0 || j < 0 || h as isize == i || w as isize == j
}

fn dfs(
    h: usize,
    w: usize,
    i: usize,
    j: usize,
    k: usize,
    step: usize,
    grid: &Vec<Vec<char>>,
    visited: &mut Vec<Vec<bool>>,
    count: &mut usize
) {
    if step == k {
        *count += 1;
        return;
    }

    let di = [0, 1, 0, -1];
    let dj = [1, 0, -1, 0];

    for dir_i in 0..4 {
        let new_i = i as isize + di[dir_i];
        let new_j = j as isize + dj[dir_i];

        if out_of_bounds(h, w, new_i, new_j) {
            continue;
        }

        let new_i = new_i as usize;
        let new_j = new_j as usize;

        if visited[new_i][new_j] || grid[new_i][new_j] == '#' {
            continue;
        }

        visited[new_i][new_j] = true;
        dfs(h, w, new_i, new_j, k, step+1, &grid, visited, count);
        visited[new_i][new_j] = false;

    }
}

fn run(h: usize, w: usize, k: usize, s: Vec<&str>) -> usize {
    let vec: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut visited = vec![vec![false; w]; h];

    let mut ans = 0;

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == '#' {
                continue;
            }

            visited[i][j] = true;
            dfs(h, w, i, j, k, 0, &vec, &mut visited, &mut ans);
            visited[i][j] = false;
        }
    }

    ans
}
```
</details>

### ABC396 D - Minimum XOR Path

[D - Minimum XOR Path](https://atcoder.jp/contests/abc396/tasks/abc396_d)（<span style="color: brown">Difficulty : 601</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn dfs(
    n: usize,
    hash_map: &HashMap<usize, Vec<(usize, usize)>>,
    seen: &mut Vec<bool>,
    cur: usize,
    xor: usize,
    ans: &mut usize
) {
    seen[cur] = true;

    let Some(next) = hash_map.get(&cur) else {
        return;
    };

    for (w, next) in next {
        if *next == n {
            *ans = (*ans).min(w ^ xor);
            continue;
        }

        if seen[*next] {
            continue;
        }

        dfs(n, hash_map, seen, *next, w ^ xor, ans)
    }

    seen[cur] = false;
}

fn run(n: usize, _m: usize, uvw: Vec<(usize, usize, usize)>) -> usize {
    let mut hash_map = HashMap::new();

    for (u, v, w) in uvw {
        hash_map.entry(u).or_insert_with(|| Vec::new()).push((w, v));
        hash_map.entry(v).or_insert_with(|| Vec::new()).push((w, u));
    }

    let mut seen = vec![false; n+1];

    let mut ans = std::usize::MAX;

    dfs(n, &hash_map, &mut seen, 1, 0, &mut ans);

    ans
}
```
</details>

### ABC270 C - Simple path

[C - Simple path](https://atcoder.jp/contests/abc270/tasks/abc270_c)（<span style="color: brown">Difficulty : 625</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn dfs(
    map: &HashMap<&usize, Vec<&usize>>,
    ans: &mut Vec<usize>,
    seen: &mut Vec<bool>,
    current: usize,
    y: usize,
) -> bool {
    if current == y {
        return true;
    }

    for &next in map.get(&current).unwrap_or(&vec![]) {
        if seen[*next] {
            continue;
        }

        seen[*next] = true;
        ans.push(*next);

        if dfs(map, ans, seen, *next, y) {
            return true;
        }

        ans.pop();
    }

    false
}

fn run(n: usize, x: usize, y: usize, uv: Vec<(usize, usize)>) -> Vec<usize> {
    let mut hash_map = HashMap::new();

    for (u, v) in uv.iter() {
        hash_map.entry(u).or_insert_with(|| Vec::new()).push(v);
        hash_map.entry(v).or_insert_with(|| Vec::new()).push(u);
    }

    let mut seen = vec![false; n+1];
    seen[x] = true;

    let mut ans = vec![x];

    dfs(&hash_map, &mut ans, &mut seen, x, y);

    ans
}
```
</details>

## 幅優先探索-24問

[BFS (幅優先探索) 超入門！ 〜 キューを鮮やかに使いこなす 〜](https://qiita.com/drken/items/996d80bcae64649a6580)

### ABC007 C - 幅優先探索

[C - 幅優先探索](https://atcoder.jp/contests/abc007/tasks/abc007_3)（<span style="color: green">🧪 Difficulty : 1024</span>）

そのまんまの問題です。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn run(r: usize, c: usize, s: (usize, usize), g: (usize, usize), v: Vec<&str>) -> usize {
    let vec: Vec<Vec<char>> = v.into_iter().map(|c| c.chars().collect()).collect();

    let mut graph = vec![vec![-1; c]; r];
    let mut queue = VecDeque::new();

    graph[s.0-1][s.1-1] = 0;
    queue.push_back((s.0-1, s.1-1));

    let di = [0, -1, 0, 1];
    let dj = [-1, 0, 1, 0];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        for i in 0..4 {
            let h = (cur_i as isize + di[i]) as usize;
            let w = (cur_j as isize + dj[i]) as usize;

            if vec[h][w] == '#' || graph[h][w] != -1 {
                continue;
            }

            graph[h][w] = graph[cur_i][cur_j] + 1;

            queue.push_back((h, w));
        }
    }

    graph[g.0-1][g.1-1] as usize
}
```
</details>

### 競技プログラミングの鉄則 A63 - Shortest Path 1

[Shortest Path 1](https://atcoder.jp/contests/tessoku-book/tasks/math_and_algorithm_an)（<span style="color: gray">Difficultyなし</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::{HashMap, VecDeque};

fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> Vec<isize> {
    let mut hash_map = HashMap::new();

    for (a, b) in ab {
        hash_map.entry(a-1).or_insert_with(Vec::new).push(b-1);
        hash_map.entry(b-1).or_insert_with(Vec::new).push(a-1);
    }

    let mut graph = vec![-1; n];
    graph[0] = 0;

    let mut queue = VecDeque::new();
    queue.push_back(0);

    while let Some(cur) = queue.pop_front() {
        let Some(next) = hash_map.get(&cur) else {
            continue;
        };

        for next in next.iter() {
            if graph[*next] != -1 {
                continue;
            }

            graph[*next] = graph[cur] + 1;
            queue.push_back(*next);
        }
    }

    graph
}
```
</details>

### ABC454 C - Straw Millionaire

[C - Straw Millionaire](https://atcoder.jp/contests/abc454/tasks/abc454_c)（<span style="color: gray">Difficulty : 274</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut map = HashMap::new();

    for (a, b) in ab {
        map.entry(a).or_insert_with(Vec::new).push(b);
    }

    let mut dequeue = VecDeque::new();
    dequeue.push_front(1);

    let mut visited = vec![false; n + 1];

    while let Some(cur) = dequeue.pop_front() {
        if visited[cur] {
            continue;
        }

        visited[cur] = true;

        let Some(next) = map.get(&cur) else {
            continue;
        };

        for n in next {
            dequeue.push_front(*n);
        }
    }

    visited
        .into_iter()
        .filter(|b| *b)
        .count()
}
```
</details>

### ABC399 C - Make it Forest

[C - Make it Forest](https://atcoder.jp/contests/abc399/tasks/abc399_c)（<span style="color: gray">Difficulty : 321</span>）

連結成分を数えれば解ける。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::{HashMap, VecDeque};

fn run(n: usize, m: usize, vu: Option<Vec<(usize, usize)>>) -> usize {
    if vu.is_none() {
        return 0;
    }

    let mut map = HashMap::new();

    for (v, u) in vu.unwrap() {
        map.entry(v).or_insert_with(|| Vec::new()).push(u);
        map.entry(u).or_insert_with(|| Vec::new()).push(v);
    }

    let mut visited = vec![false; n+1];
    let mut count = 0;

    for i in 1..=n {
        if visited[i] {
            continue;
        }

        count += 1;

        let mut queue = VecDeque::new();
        visited[i] = true;
        queue.push_back(i);

        while let Some(v) = queue.pop_front() {
            let Some(next) = map.get(&v) else {
                continue;
            };

            for n in next {
                if visited[*n] {
                    continue;
                }

                visited[*n] = true;
                queue.push_back(*n);
            }
        }
    }

    m - (n - count)
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Option<Vec<(usize, usize)>>, usize);

    #[test]
    fn abc399_c() {
        let tests = [
            TestCase(4, 4, Some(vec![(1, 2), (1, 3), (2, 4), (3, 4)]), 1),
            TestCase(5, 0, None, 0),
            TestCase(10, 10, Some(vec![ (7, 9), (4, 6), (6, 10), (2, 5), (5, 6), (5, 9), (6, 8), (4, 8), (1, 5), (1, 4)]), 2),
        ];

        for TestCase(n, m, vu, expected) in tests {
            assert_eq!(run(n, m, vu), expected);
        }
    }
}
```
</details>

### ABC325 C - Sensors

[C - Sensors](https://atcoder.jp/contests/abc325/tasks/abc325_c)（<span style="color: brown">Difficulty : 400</span>）

これも連結成分を数える。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(i: isize, j: isize, h: isize, w: isize) -> bool {
    i < 0 || j < 0 || i >= h || j >= w
}

fn run(h: usize, w: usize, s: Vec<&str>) -> usize {
    let mut vec: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut ans = 0;

    let di = vec![0, 0, -1, 1, -1, -1, 1, 1];
    let dj = vec![-1, 1, 0, 0, -1, 1, -1, 1];

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == '.' {
                continue;
            }

            ans += 1;

            let mut queue = VecDeque::new();
            queue.push_back((i, j));

            while let Some((cur_i, cur_j)) = queue.pop_front() {
                for i in 0..8 {
                    if out_of_bounds(cur_i as isize + di[i], cur_j as isize + dj[i], h as isize, w as isize) {
                        continue;
                    }

                    let new_i = (cur_i as isize + di[i]) as usize;
                    let new_j = (cur_j as isize + dj[i]) as usize;

                    if vec[new_i][new_j] == '#' {
                        vec[new_i][new_j] = '.';
                        queue.push_front((new_i, new_j));
                    }
                }
            }
        }
    }

    ans
}
```
</details>

### ABC293 C - Make Takahashi Happy

[C - Make Takahashi Happy](https://atcoder.jp/contests/abc293/tasks/abc293_c)（<span style="color: brown">Difficulty : 431</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn run(h: usize, w: usize, a: Vec<Vec<usize>>) -> usize {
    let mut queue = VecDeque::new();
    queue.push_back((0, 0, vec![a[0][0]]));

    let di = [0, 1];
    let dj = [1, 0];

    let mut ans = 0;

    while let Some((cur_i, cur_j, visited)) = queue.pop_front() {
        for i in 0..2 {
            let new_i = cur_i + di[i];
            let new_j = cur_j + dj[i];

            if new_i == h || new_j == w {
                continue;
            }

            if visited.contains(&a[new_i][new_j]) {
                continue;
            }

            if new_i == h-1 && new_j == w-1 {
                ans += 1;
                continue;
            }

            let mut new_visited = visited.clone();

            new_visited.push(a[new_i][new_j]);

            queue.push_back((new_i, new_j, new_visited));
        }
    }

    ans
}
```
</details>

### ABC405 D - Escape Route

[D - Escape Route](https://atcoder.jp/contests/abc405/tasks/abc405_d)（<span style="color: brown">Difficulty : 471</span>）

多始点BFS。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(h: usize, w: usize, i: isize, j: isize) -> bool {
    i < 0 || j < 0 || h as isize == i || w as isize == j
}

fn run(h: usize, w: usize, s: Vec<&str>) -> Vec<String> {
    let mut vec: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut queue = VecDeque::new();

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == 'E' {
                queue.push_back((i, j));
            }
        }
    }

    let di = [0, 1, 0, -1];
    let dj = [1, 0, -1, 0];
    let dis = ['<', '^', '>', 'v'];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        for i in 0..4 {
            if out_of_bounds(h, w, cur_i as isize + di[i], cur_j as isize + dj[i]) {
                continue;
            }

            let new_i = (cur_i as isize + di[i]) as usize;
            let new_j = (cur_j as isize + dj[i]) as usize;

            if vec[new_i][new_j] != '.' {
                continue;
            }

            vec[new_i][new_j] = dis[i];

            queue.push_back((new_i, new_j));
        }
    }

    vec.into_iter()
        .map(|v| v.into_iter().collect())
        .collect()
}
```
</details>

### ABC292 D - Unicyclic Components

[D - Unicyclic Components](https://atcoder.jp/contests/abc292/tasks/abc292_d)（<span style="color: brown">Difficulty : 579</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, uv: Vec<(usize, usize)>) -> &'static str {
    let mut graph: HashMap<usize, Vec<usize>> = HashMap::new();

    for (u, v) in uv {
        graph.entry(u).or_default().push(v);
        graph.entry(v).or_default().push(u);
    }

    let mut seen = vec![false; n+1];

    for i in 1..=n {
        if seen[i] {
            continue;
        }

        let mut dequeue = VecDeque::new();
        dequeue.push_back(i);
        seen[i] = true;

        let mut v_count = 0;
        let mut e_count = 0;

        while let Some(cur) = dequeue.pop_front() {
            v_count += 1;

            let Some(next) = graph.get(&cur) else {
                continue;
            };

            for next in next {
                e_count += 1;

                if !seen[*next] {
                    seen[*next] = true;
                    dequeue.push_back(*next);

                }
            }
        }

        e_count /= 2;

        if v_count != e_count {
            return "No";
        }
    }

    "Yes"
}
```
</details>

### ABC308 D - Snuke Maze

[D - Snuke Maze](https://atcoder.jp/contests/abc308/tasks/abc308_d)（<span style="color: brown">Difficulty : 619</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(h: usize, w: usize, i: isize, j: isize) -> bool {
    i < 0 || j < 0 || i == h as isize || j == w as isize
}

fn run(h: usize, w: usize, s: Vec<&str>) -> &'static str {
    let str = ['s', 'n', 'u', 'k', 'e'];
    let chars: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut dist = vec![vec![false; w]; h];

    let mut queue = VecDeque::new();
    queue.push_back(((0, 0), 0));

    let dx = [0, 1, 0, -1];
    let dy = [1, 0, -1, 0];

    while let Some(((cur_i, cur_j), count)) = queue.pop_front() {
        if &str[count % 5] != &chars[cur_i][cur_j] || dist[cur_i][cur_j] {
            continue;
        }

        if cur_i == h-1 && cur_j == w-1 {
            return "Yes";
        }

        dist[cur_i][cur_j] = true;

        for i in 0..4 {
            let new_i = cur_i as isize +  dx[i];
            let new_j = cur_j as isize +  dy[i];

            if out_of_bounds(h, w, new_i, new_j) {
                continue;
            }

            queue.push_back(((new_i as usize, new_j as usize), count+1));
        }
    }

    "No"
}
```
</details>

### ABC269 D - Do use hexagon grid

[D - Do use hexagon grid](https://atcoder.jp/contests/abc269/tasks/abc269_d)（<span style="color: brown">Difficulty : 629</span>）

これも連結成分を数える問題です。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(i: isize, j: isize) -> bool {
    i < 0 || j < 0 || i >= 2001 || j >= 2001
}

fn run(_n: usize, xy: Vec<(isize, isize)>) -> usize {
    let offset = 1000;

    let xy: Vec<(isize, isize)> = xy.into_iter().map(|(x, y)| (x+offset, y+offset)).collect();

    let mut vec = vec![vec![false; 2001]; 2001];

    for (x, y) in xy.iter() {
        vec[*x as usize][*y as usize] = true;
    }

    let di = [0, 1, 1, 0, -1, -1];
    let dj = [1, 1, 0, -1, -1, 0];

    let mut ans = 0;

    for (x, y) in xy.iter() {
        if !vec[*x as usize][*y as usize] {
            continue;
        }

        ans += 1;

        let mut queue = VecDeque::new();

        queue.push_back((*x, *y));

        while let Some((cur_i, cur_j)) = queue.pop_front() {
            if !vec[cur_i as usize][cur_j as usize] {
                continue;
            }

            vec[cur_i as usize][cur_j as usize] = false;

            for i in 0..6 {
                if out_of_bounds(cur_i as isize + di[i], cur_j as isize + dj[i]) {
                    continue;
                }

                let new_i = (cur_i as isize + di[i]) as usize;
                let new_j = (cur_j as isize + dj[i]) as usize;

                if vec[new_i][new_j] {
                    queue.push_back((new_i as isize, new_j as isize));
                }
            }
        }
    }

    ans
}
```
</details>

### ABC376 D - Cycle

[D - Cycle](https://atcoder.jp/contests/abc376/tasks/abc376_d)（<span style="color: brown">Difficulty : 743</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::{HashMap, VecDeque};

fn run(_n: usize, _m: usize, ab: Vec<(usize, usize)>) -> isize {
    let mut hash_map = HashMap::new();

    for (a, b) in ab {
        hash_map.entry(a).or_insert_with(|| Vec::new()).push(b);
    }

    let mut queue = VecDeque::new();
    queue.push_back((1, 0));

    while let Some((cur, count)) = queue.pop_front() {
        let Some(next) = hash_map.get(&cur) else {
            continue;
        };

        for next in next.iter() {
            if *next == 1 {
                return count + 1;
            }

            queue.push_back((*next, count+1));
        }
    }

    -1
}
```
</details>

### ABC383 C - Humidifier 3

[C - Humidifier 3](https://atcoder.jp/contests/abc383/tasks/abc383_c)（<span style="color: brown">Difficulty : 750</span>）

多始点BFS

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(i: isize, j: isize, h: isize, w: isize) -> bool {
    i < 0 || j < 0 || i == h || j == w
}

fn run(h: usize, w: usize, d: usize, s: Vec<&str>) -> usize {
    let vec: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut graph = vec![vec![-1; w]; h];
    let mut queue = VecDeque::new();

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == 'H' {
                queue.push_back((i, j));
                graph[i][j] = 0;
            }
        }
    }

    let di = [0, 1, 0, -1];
    let dj = [1, 0, -1, 0];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        if d == 0 {
            continue;
        }

        for i in 0..4 {
            if out_of_bounds(cur_i as isize + di[i], cur_j as isize + dj[i], h as isize, w as isize) {
                continue;
            }

            let new_i = (cur_i as isize + di[i]) as usize;
            let new_j = (cur_j as isize + dj[i]) as usize;

            if vec[new_i][new_j] == '#' || graph[new_i][new_j] != -1 {
                continue;
            }

            graph[new_i][new_j] = graph[cur_i][cur_j] + 1;

            queue.push_back((new_i, new_j));
        }
    }

    graph.into_iter()
        .map(|g| {
            g.into_iter()
                .filter(|i| {
                    *i >= 0 && *i <= d as isize
                })
                .count()
        })
        .sum()
}
```
</details>

### ABC211 D - Number of Shortest paths

[D - Number of Shortest paths](https://atcoder.jp/contests/abc211/tasks/abc211_d)（<span style="color: brown">Difficulty : 755</span>）

最短路をカウントする問題です。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::{HashMap, VecDeque};

fn run(n: usize, _m: usize, ab: Option<Vec<(usize, usize)>>) -> usize {
    let Some(ab) = ab else {
        return 0;
    };

    let mut vec = HashMap::new();

    let md = 1000_000_007;

    for (a, b) in ab {
        vec.entry(a).or_insert_with(Vec::new).push(b);
        vec.entry(b).or_insert_with(Vec::new).push(a);
    }

    let mut graph = vec![-1; n];
    let mut queue = VecDeque::new();
    let mut count = vec![0; n];

    graph[0] = 0;
    count[0] = 1;
    queue.push_back(1);

    while let Some(current) = queue.pop_front() {
        let Some(next) = vec.get(&current) else {
            continue;
        };

        for &next in next.iter() {
            if graph[next-1] == -1 {
                queue.push_back(next);
                graph[next-1] = graph[current-1] + 1;
                count[next-1] = count[current-1];
            } else if graph[next-1] == graph[current-1] + 1 {
                count[next-1] += count[current-1];
                count[next-1] %= md;
            }
        }
    }

    count[n-1] as usize
}
```
</details>

### ABC373 D - Hidden Weights

[D - Hidden Weights](https://atcoder.jp/contests/abc373/tasks/abc373_d)（<span style="color: brown">Difficulty : 765</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::{HashMap, VecDeque};

fn run(n: usize, _m: usize, uvw: Vec<(usize, usize, isize)>) -> Vec<isize> {
    let mut hash_map = HashMap::new();

    for (u, v, w) in uvw {
        hash_map.entry(u).or_insert_with(|| Vec::new()).push((v, w));
        hash_map.entry(v).or_insert_with(|| Vec::new()).push((u, -w));
    }

    let mut visited = vec![false; n+1];
    let mut graph = vec![0; n+1];

    for i in 1..=n {
        if visited[i] {
            continue;
        }

        let mut queue = VecDeque::new();
        queue.push_back(i);

        while let Some(cur) = queue.pop_front() {
            if visited[cur] {
                continue;
            }

            visited[cur] = true;

            let Some(next) = hash_map.get(&cur) else {
                continue;
            };

            for &(next_v, w) in next {
                if visited[next_v] {
                    continue;
                }

                graph[next_v] = graph[cur] + w;
                queue.push_back(next_v);
            }
        }
    }

    graph.into_iter().skip(1).collect()
}
```
</details>

### ABC168 D - .. (Double Dots)

[D - .. (Double Dots)](https://atcoder.jp/contests/abc168/tasks/abc168_d)（<span style="color: green">Difficulty : 804</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::{HashMap, VecDeque};

fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> Vec<usize> {
    let mut hash_map = HashMap::new();

    for (a, b) in ab {
        hash_map.entry(a-1).or_insert_with(Vec::new).push(b-1);
        hash_map.entry(b-1).or_insert_with(Vec::new).push(a-1);
    }

    let mut ans = vec![0; n-1];

    let mut graph = vec![false; n];
    graph[0] = true;

    let mut queue: VecDeque<usize> = VecDeque::new();
    queue.push_back(0);

    while let Some(cur) = queue.pop_front() {
        let next = hash_map.get(&cur).unwrap();

        for new_i in next.iter() {
            if graph[*new_i] == true {
                continue;
            }

            graph[*new_i] = true;
            ans[*new_i-1] = cur + 1;
            queue.push_back(*new_i);
        }
    }

    ans
}
```
</details>

### ABC387 D - Snaky Walk

[D - Snaky Walk](https://atcoder.jp/contests/abc387/tasks/abc387_d)（<span style="color: green">Difficulty : 817</span>）

縦移動と横移動を1回ずつ交互に行うところが難しいです。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(i: isize, j: isize, h: isize, w: isize) -> bool {
    i < 0 || j < 0 || i >= h || j >= w
}

fn run(h: usize, w: usize, s: Vec<&str>) -> isize {
    let vec: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut pos_s = (0, 0);
    let mut pos_g = (0, 0);

    for h in 0..h {
        for w in 0..w {
            if vec[h][w] == 'S' {
                pos_s = (h, w);
            }

            if vec[h][w] == 'G' {
                pos_g = (h, w);
            }
        }
    }

    let d = [1, -1];

    // 縦移動始まりと横移動始まりをそれぞれ試す
    (0..2)
        .filter_map(|i| {
            let mut graph = vec![vec![-1; w]; h];
            graph[pos_s.0][pos_s.1] = 0;

            let mut queue = VecDeque::new();
            queue.push_back(pos_s);

            while let Some((cur_i, cur_j)) = queue.pop_front() {
                for j in 0..2 {
                    let (new_i, new_j) = if (i + cur_i + cur_j) % 2 == 0 {
                        (cur_i as isize + d[j], cur_j as isize)
                    } else {
                        (cur_i as isize, cur_j as isize + d[j])
                    };

                    if out_of_bounds(new_i, new_j, h as isize, w as isize) {
                        continue;
                    }

                    let new_i = new_i as usize;
                    let new_j = new_j as usize;

                    if vec[new_i][new_j] == '#' || graph[new_i][new_j] != -1 {
                        continue;
                    }

                    graph[new_i][new_j] = graph[cur_i][cur_j] + 1;
                    queue.push_back((new_i, new_j));
                }
            }

            (graph[pos_g.0][pos_g.1] != -1).then_some(graph[pos_g.0][pos_g.1])
        })
        .min()
        .unwrap_or(-1)
}
```
</details>

### ABC016 C - 友達の友達

[C - 友達の友達 ](https://atcoder.jp/contests/abc016/tasks/abc016_3)（<span style="color: green">🧪 Difficulty : 830</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::{HashMap, VecDeque};

fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> Vec<usize> {
    let mut hash_map = HashMap::new();

    for (a, b) in ab {
        hash_map.entry(a).or_insert_with(Vec::new).push(b);
        hash_map.entry(b).or_insert_with(Vec::new).push(a);
    }

    let mut ans = Vec::new();

    for i in 1..=n {
        let mut graph = vec![false; n+1];
        let mut queue = VecDeque::new();

        // 友達の友達
        let mut count = 0;

        graph[i] = true;
        queue.push_back((i, 2));

        while let Some((x, k)) = queue.pop_front() {
            if k == 0 {
                continue;
            }

            let Some(next) = hash_map.get(&x) else {
                continue;
            };

            for &n in next {
                if !graph[n] {
                    graph[n] = true;
                    if k == 1 {
                        count += 1;
                    }
                    queue.push_back((n, k-1));
                }
            }
        }

        ans.push(count);
    }

    ans
}
```
</details>

### ABC015 C - 高橋くんのバグ探し

[C - 高橋くんのバグ探し](https://atcoder.jp/contests/abc015/tasks/abc015_3)（<span style="color: green">🧪 Difficulty : 912</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn run(n: usize, _k: usize, t: Vec<Vec<usize>>) -> &'static str {
    let mut queue = VecDeque::new();

    for &n in &t[0] {
        queue.push_back((0, vec![n]));
    }

    while let Some((i,  vec)) = queue.pop_front() {
        if i + 1 == n {
            if vec.iter().fold(0, |acc, &x| acc ^ x) == 0 {
                return "Found";
            }
            continue;
        }

        let next_values = t[i + 1].clone();

        for next in next_values {
            let mut new_vec = vec.clone();
            new_vec.push(next);
            queue.push_back((i + 1, new_vec));
        }
    }

    "Nothing"
}
```
</details>

### ABC151 D - Maze Master

[D - Maze Master](https://atcoder.jp/contests/abc151/tasks/abc151_d)（<span style="color: green">Difficulty : 959</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(i: isize, j: isize, h: isize, w: isize) -> bool {
    i < 0 || j < 0 || i >= h || j >= w
}

fn run(h: usize, w: usize, s: Vec<&str>) -> usize {
    let vec: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut ans = 0;

    let di = [0, -1, 0, 1];
    let dj = [-1, 0, 1, 0];

    // '.'である全ての座標をスタートに設定し、最も大きい距離とansを比べる
    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == '#' {
                continue;
            }

            let mut graph = vec![vec![-1; w]; h];
            graph[i][j] = 0;

            let mut queue = VecDeque::new();
            queue.push_back((i, j));

            while let Some((cur_i, cur_j)) = queue.pop_front() {
                for k in 0..4 {
                    if out_of_bounds(cur_i as isize + di[k], cur_j as isize + dj[k], h as isize, w as isize) {
                        continue;
                    }

                    let new_i = (cur_i as isize + di[k]) as usize;
                    let new_j = (cur_j as isize + dj[k]) as usize;

                    if vec[new_i][new_j] == '#' || graph[new_i][new_j] != -1 {
                        continue;
                    }

                    graph[new_i][new_j] = graph[cur_i][cur_j] + 1;
                    ans = ans.max(graph[new_i][new_j] as usize);
                    queue.push_back((new_i, new_j));
                }
            }
        }
    }

    ans
}
```
</details>

### ABC088 D - Grid Repainting

[D - Grid Repainting](https://atcoder.jp/contests/abc088/tasks/abc088_d)（<span style="color: green">Difficulty : 999</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(r: isize, c: isize, h: usize, w: usize) -> bool {
    r < 0 || c < 0 || r >= h as isize || c >= w as isize
}

fn run(h: usize, w: usize, s: Vec<&str>) -> isize {
    let vec: Vec<Vec<char>> = s.iter().map(|str| str.chars().collect()).collect();

    let mut graph: Vec<Vec<isize>> = vec![vec![-1; w]; h];
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new();

    graph[0][0] = 0;
    queue.push_back((0, 0));

    let di = [0, -1, 0, 1];
    let dj = [-1, 0, 1, 0];

    while let Some((cur_i, cur_j)) =  queue.pop_front() {
        for i in 0..4 {
            let new_i = cur_i as isize + di[i];
            let new_j = cur_j as isize + dj[i];

            if out_of_bounds(new_i, new_j, h, w) {
                continue;
            }

            let (new_i, new_j) = (new_i as usize, new_j as usize);

            if vec[new_i][new_j] == '#' || graph[new_i][new_j] != -1 {
                continue;
            }

            graph[new_i][new_j] = graph[cur_i][cur_j] + 1;
            queue.push_back((new_i, new_j));
        }
    }

    // 右下にたどり着けない場合
    if graph[h-1][w-1] == -1 {
        return -1;
    }

    // #の数
    let count: usize = s.into_iter().map(|str| str.chars().filter(|c| *c == '#').count()).sum();

    // 全体のマス数 - 既存の#の数 - 最短経路のマス数
    (h * w - count - 1) as isize - graph[h-1][w-1]
}
```
</details>

### ABC276 E - Round Trip

[E - Round Trip](https://atcoder.jp/contests/abc276/tasks/abc276_e)（<span style="color: green">Difficulty : 1058</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn out_of_bounds(i: isize, j: isize, h: isize, w: isize) -> bool {
    i < 0 || j < 0 || i >= h || j >= w
}

fn run(h: usize, w: usize, c: Vec<&str>) -> &'static str {
    let vec: Vec<Vec<char>> = c.into_iter().map(|str| str.chars().collect()).collect();

    let mut s_pos = (0, 0);

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == 'S' {
                s_pos = (i as isize, j as isize);
            }
        }
    }

    // スタートとゴールの組み合わせ
    let pair = [
        ((-1, 0), (1, 0)),
        ((-1, 0), (0, 1)),
        ((-1, 0), (0, -1)),
        ((0, 1), (0, -1)),
        ((1, 0), (0, 1)),
        ((1, 0), (0, -1)),
    ];

    let di = [0, 1, 0, -1];
    let dj = [1, 0, -1, 0];

    for i in 0..6 {
        let start_i = s_pos.0 + pair[i].0.0;
        let start_j = s_pos.1 + pair[i].0.1;

        let end_i = s_pos.0 + pair[i].1.0;
        let end_j = s_pos.1 + pair[i].1.1;

        if out_of_bounds(start_i, start_j, h as isize, w as isize) || out_of_bounds(end_i, end_j, h as isize, w as isize) {
            continue;
        }

        if vec[start_i as usize][start_j as usize] == '#' || vec[end_i as usize][end_j as usize] == '#' {
            continue;
        }

        let start = (start_i as usize, start_j as usize);

        let mut dist = vec![vec![-1; w]; h];
        dist[s_pos.0 as usize][s_pos.1 as usize] = 0;
        dist[start.0][start.1] = 1;

        let mut queue = VecDeque::new();
        queue.push_front((start.0, start.1));

        while let Some((cur_i, cur_j)) = queue.pop_front() {
            for i in 0..4 {
                if out_of_bounds(cur_i as isize + di[i], cur_j as isize + dj[i], h as isize, w as isize) {
                    continue;
                }

                let next_i = (cur_i as isize + di[i]) as usize;
                let next_j = (cur_j as isize + dj[i]) as usize;

                if vec[next_i][next_j] == '#' || dist[next_i][next_j] != -1 {
                    continue;
                }

                dist[next_i][next_j] = dist[cur_i][cur_j] + 1;
                queue.push_back((next_i, next_j));
            }
        }

        if dist[end_i as usize][end_j as usize] >= 3 {
            return "Yes";
        }
    }

    "No"
}
```
</details>

### ARC031 B - 埋め立て

[B - 埋め立て](https://atcoder.jp/contests/arc031/tasks/arc031_2)（<span style="color: green">Difficulty : 1106</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

// 境界チェック
fn out_of_bounds(r: isize, c: isize, h: usize, w: usize) -> bool {
    r < 0 || c < 0 || r == h as isize || c == w as isize
}

fn run(a: Vec<&str>) -> &'static str {
    let vec: Vec<Vec<char>> = a.into_iter().map(|s| s.chars().collect()).collect();

    for i in 0..10 {
        for j in 0..10 {
            let mut graph = vec![vec![-1; 10]; 10];
            let mut queue = VecDeque::new();
            queue.push_front((i, j));

            graph[i][j] = 0;

            let dx = [0, -1, 0, 1];
            let dy = [-1, 0, 1, 0];

            while let Some((cur_i, cur_j)) = queue.pop_front() {
                for i in 0..4 {
                    let new_i = cur_i as isize + dx[i];
                    let new_j = cur_j as isize + dy[i];

                    if out_of_bounds(new_i, new_j, 10, 10) {
                        continue;
                    }

                    if vec[new_i as usize][new_j as usize] == 'x' || graph[new_i as usize][new_j as usize] != -1 {
                        continue;
                    }

                    graph[new_i as usize][new_j as usize] = graph[cur_i][cur_j] + 1;
                    queue.push_back((new_i as usize, new_j as usize));
                }
            }

            let mut flag = true;

            for i in 0..10 {
                for j in 0..10 {
                    if vec[i][j] == 'o' && graph[i][j] == -1 {
                        flag = false;
                    }
                }
            }

            if flag {
                return "YES";
            }
        }
    }

    "NO"
}
```
</details>

### AGC033 A - Darker and Darker

[A - Darker and Darker](https://atcoder.jp/contests/agc033/tasks/agc033_a)（<span style="color: green">Difficulty : 1159</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

// 境界チェック
fn out_of_bounds(r: isize, c: isize, h: usize, w: usize) -> bool {
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

            if out_of_bounds(new_r, new_c, h, w) {
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
```
</details>

### ABC424 C - New Skill Acquired

[C - New Skill Acquired](https://atcoder.jp/contests/abc424/tasks/abc424_c)（<span style="color: gray">difficulty : 不明</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::{HashMap, VecDeque};

fn run(n: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut map = HashMap::new();
    let mut seen = vec![false; n];

    let mut queue = VecDeque::new();

    for (i, (a, b)) in ab.into_iter().enumerate() {
        if a == 0 && b == 0 {
            queue.push_back(i);
            seen[i] = true;
        } else {
            map.entry(a-1).or_insert_with(|| Vec::new()).push(i);
            map.entry(b-1).or_insert_with(|| Vec::new()).push(i);
        }
    }

    let mut ans = 0;

    while let Some(cur) = queue.pop_front() {
        ans += 1;

        let Some(next) = map.get(&cur) else {
            continue;
        };

        for n in next {
            if !seen[*n] {
                seen[*n] = true;
                queue.push_back(*n);
            }
        }
    }

    ans
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
fn gcd(a: usize, b: usize) -> usize {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

fn run(a: usize, b: usize) -> usize {
    gcd(a, b)
}
```
</details>

### arc105 b - max-=min

[b - max-=min](https://atcoder.jp/contests/arc105/tasks/arc105_b)（<span style="color: gray">difficulty : 366</span>）

<details>
<summary>コード例を見る</summary>

```rust
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

fn run(_n: usize, x: isize, v: Vec<isize>) -> isize {
    v.iter()
        .skip(1)
        .fold((x - &v[0]).abs(), |state, num| {
            gcd(state, (x - num).abs())
        })
}
```
</details>

### ABC118 C - Monsters Battle Royale

[C - Monsters Battle Royale](https://atcoder.jp/contests/abc118/tasks/abc118_ck)（<span style="color: brown">Difficulty : 646</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn gcd(a: usize, b: usize) -> usize {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

fn run(_n: usize, v: Vec<usize>) -> usize {
    v.iter()
        .fold(0, |state, num| {
            gcd(state, *num)
        })
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

fn run(s: &str) -> String {
    let rle = run_length(s.chars().collect());

    rle.iter()
        .map(|(c, i)| {
            format!("{}{}", c, i)
        })
        .collect()
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
```
</details>

### ABC299 C - Dango

[C - Dango](https://atcoder.jp/contests/abc299/tasks/abc299_c)（<span style="color: gray">Difficulty : 191</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC329 C - Count xxx

[C - Count xxx](https://atcoder.jp/contests/abc329/tasks/abc329_c)（<span style="color: gray">Difficulty : 205</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC380 C - Move Segment

[C - Move Segment](https://atcoder.jp/contests/abc380/tasks/abc380_c)（<span style="color: gray">Difficulty : 223</span>）

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
```
</details>

### ABC259 C - XX to XXX

[C - XX to XXX](https://atcoder.jp/contests/abc259/tasks/abc259_c)（<span style="color: brown">Difficulty : 451</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::iter::zip;

fn run_lengths(s: Vec<char>) -> Vec<(char, usize)> {
    let mut i = 0;
    let mut run_lengths = vec![];
    let mut current = (s[0], 0);

    loop {
        while i < s.len() && s[i] == current.0 {
            current.1 += 1;
            i += 1;
        }

        run_lengths.push(current);

        if i == s.len() {
            break;
        } else {
            current = (s[i], 0);
        }
    }

    run_lengths
}

fn run(s: &str, t: &str) -> &'static str {
    let s_length = run_lengths(s.chars().collect());
    let t_length = run_lengths(t.chars().collect());

    if s_length.len() != t_length.len() {
        return "No";
    }

    if s_length.into_iter()
        .zip(t_length.into_iter())
        .any(|(s, t)| {
            // 文字が違う場合
            // tが長さ2以上なのにsが長さ1しかない場合
            // sの方が長い場合（tを増やすことはできないので）
            s.0 != t.0 || (t.1 > 1 && s.1 == 1) || s.1 > t.1
        }) {
            "No"
        } else {
            "Yes"
        }
}
```
</details>

### ABC247 D - Cylinder

[D - Cylinder](https://atcoder.jp/contests/abc247/tasks/abc247_d)（<span style="color: brown">Difficulty : 468</span>）

### AGC039 A - Connection and Disconnection

[A - Connection and Disconnection](https://atcoder.jp/contests/agc039/tasks/agc039_a)（<span style="color: brown">Difficulty : 517</span>）

<details>
<summary>コード例を見る</summary>

```rust
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

fn run(s: &str, k: usize) -> usize {
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
```
</details>

### ABC047 C - 一次元リバーシ

[C - 一次元リバーシ ](https://atcoder.jp/contests/abc047/tasks/arc063_a)（<span style="color: brown">Difficulty : 755</span>）

文字が切り替わる回数を数えます。

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

fn run(s: &str) -> usize {
    run_lengths(s.chars().collect()).len() - 1
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

fn run(s: &str) -> usize {
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
```
</details>

### ABC061 C - Big Array

[C - Big Array](https://atcoder.jp/contests/abc061/tasks/abc061_c)（<span style="color: green">Difficulty : 887</span>）

これまでは「入力をランレングス圧縮して扱う」問題でしたが、この問題はランレングス圧縮された状態で入力が与えられると言えます。圧縮されたものを解凍するイメージです。

<details>
<summary>コード例を見る</summary>

```rust
fn run(_n: usize, k: usize, ab: Vec<(usize, usize)>) -> usize {
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
```
</details>

## 動的計画法

### ABC087 C - Candies

[C - Candies](https://atcoder.jp/contests/abc087/tasks/arc090_a)（<span style="color: gray">Difficulty : 312</span>）

`N`が100と小さいので全探索でもいけますがDPで。

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, a: [Vec<usize>; 2]) -> usize {
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
```
</details>

### ABC245 C - Choose Elements

[C - Choose Elements](https://atcoder.jp/contests/abc245/tasks/abc245_c)（<span style="color: brown">Difficulty : 403</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, k: isize, a: Vec<isize>, b: Vec<isize>) -> &'static str {
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
```
</details>

### ABC260 C - Changing Jewels

[C - Changing Jewels](https://atcoder.jp/contests/abc260/tasks/abc260_c)（<span style="color: brown">Difficulty : 413</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, x: usize, y: usize) -> usize {
    let mut r_dp = vec![0; n+1];
    let mut b_dp = vec![0; n+1];

    r_dp[n] = 1;

    for i in (2..=n).rev() {
        r_dp[i-1] += r_dp[i];
        b_dp[i] += r_dp[i] * x;

        r_dp[i-1] += b_dp[i];
        b_dp[i-1] += b_dp[i] * y;
    }

    b_dp[1]
}
```
</details>

### ABC240 C - Jumping Takahashi

[C - Jumping Takahashi](https://atcoder.jp/contests/abc240/tasks/abc240_c)（<span style="color: brown">Difficulty : 464</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, x: usize, ab: Vec<(usize, usize)>) -> &'static str {
    let mut dp = vec![vec![false; x+1]; n+1];

    dp[0][0] = true;

    for i in 0..n {
        for j in 0..=x {
            if dp[i][j] {
                let (a, b) = ab[i];

                if j + a <= x {
                    dp[i + 1][j + a] = true;
                }

                if j + b <= x {
                    dp[i + 1][j + b] = true;
                }
            }
        }
    }

    if dp[n][x] {
        "Yes"
    } else {
        "No"
    }
}
```
</details>

### ABC289 D - Step Up Robot

[D - Step Up Robot](https://atcoder.jp/contests/abc289/tasks/abc289_d)（<span style="color: brown">Difficulty : 551</span>）


<details>
<summary>コード例を見る</summary>

```rust
fn run(_n: usize, a: Vec<usize>, _m: usize, b: Vec<usize>, x: usize) -> &'static str {
    let mut dp = vec![false; x+1];
    let mut mochi = vec![false; x+1];

    for m in b {
        mochi[m] = true;
    }

    dp[0] = true;

    for i in 1..=x {
        if mochi[i] {
            continue;
        }

        for &j in a.iter() {
            if i >= j && dp[i - j] {
                dp[i] = true;
                break;
            }
        }
    }

    if dp[x] {
        "Yes"
    } else {
        "No"
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
```
</details>

## 尺取り法

### ABC038 C - 単調増加

[C - 単調増加](https://atcoder.jp/contests/abc038/tasks/abc038_c)（<span style="color: green">Difficulty : 894</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

# データ構造

## 累積和

### ABC099 B - Stone Monument

[B - Stone Monument](https://atcoder.jp/contests/abc099/tasks/abc099_b)（<span style="color: gray">Difficulty : 131</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(a: usize, b: usize) -> usize {
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
```
</details>

### ABC371 D - 1D Country

[D - 1D Country](https://atcoder.jp/contests/abc371/tasks/abc371_d)（<span style="color: brown">Difficulty : 408</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC098 C - Attention

[C - Attention](https://atcoder.jp/contests/abc098/tasks/arc098_a)（<span style="color: brown">Difficulty : 635</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, s: &str) -> usize {
    let mut ans = std::usize::MAX;

    let mut w = vec![0; n+1];
    let mut e = vec![0; n+1];

    for (i, c) in s.chars().enumerate() {
        if c == 'W' {
            w[i] += 1;
        } else {
            e[i] += 1;
        }
    }

    for i in 1..=n {
        w[i] += w[i-1];
        e[i] += e[i-1];
    }

    for i in 0..n {
        let mut sum = 0;

        if i != 0 {
            sum += w[i-1];
        }

        sum += e[n-1] - e[i];

        ans = ans.min(sum);
    }

    ans
}
```
</details>

### ABC122 C - GeT AC

[C - GeT AC](https://atcoder.jp/contests/abc122/tasks/abc122_c) （<span style="color: brown">Difficulty : 700</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _q: usize, s: &str, lr: Vec<(usize, usize)>) -> Vec<usize> {
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
```
</details>

## いもす法

### ABC408 C - Not All Covered

[C - Not All Covered](https://atcoder.jp/contests/abc408/tasks/abc408_c)（<span style="color: gray">Difficulty : 223</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, lr: Vec<(usize, usize)>) -> usize {
    let mut imos: Vec<isize> = vec![0; n];

    for (l, r) in lr {
        imos[l-1] += 1;

        if n != r {
            imos[r] -= 1;
        }
    }

    let mut acc = vec![imos[0]];

    for i in 1..imos.len() {
        acc.push(imos[i] + acc[i-1]);
    }

    acc.into_iter()
        .min()
        .unwrap() as usize
}
```
</details>

### ABC419 D - Substr Swap

[D - Substr Swap](https://atcoder.jp/contests/abc419/tasks/abc419_d)（<span style="color: gray">Difficulty : 251</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, s: &str, t: &str, lr: Vec<(usize, usize)>) -> String {
    let mut imos = vec![0; n+2];

    for (l, r) in lr {
        imos[l] += 1;
        imos[r+1] -= 1;
    }

    let mut acc = vec![imos[0]];

    for i in 1..imos.len() {
        acc.push(imos[i] + acc[i-1]);
    }

    let s: Vec<char> = s.chars().collect();
    let t: Vec<char> = t.chars().collect();

    let mut ans = Vec::new();

    for i in 1..=n {
        if acc[i] % 2 == 0 {
            ans.push(s[i-1]);
        } else {
            ans.push(t[i-1]);
        }
    }

    ans.into_iter().collect()
}
```
</details>

### ABC035 C - オセロ

[C - オセロ](https://atcoder.jp/contests/abc035/tasks/abc035_c)（<span style="color: green">🧪 Difficulty : 1096</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _q: usize, lr: Vec<(usize, usize)>) -> String {
    let mut imos = vec![0; n];

    for (l, r) in lr {
        imos[l-1] += 1;

        if n != r {
            imos[r] -= 1;
        }
    }

    let mut acc = vec![imos[0]];

    for i in 1..n {
        acc.push(imos[i] + acc[i-1]);
    }

    acc.into_iter()
        .map(|n| {
            match n % 2 {
                0 => '0',
                1 => '1',
                _ => unreachable!(),
            }
        })
        .collect()
}
```
</details>

### ABC014 C - AtColor

[C - AtColor](https://atcoder.jp/contests/abc014/tasks/abc014_3)（<span style="color: skyblue">🧪 Difficulty : 1276</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

## スタック-8問

[スタックとキューを極める！ 〜 考え方と使い所を特集 〜](https://qiita.com/drken/items/6a95b57d2e374a3d3292)

### ABC286 B - Cat

[B - Cat](https://atcoder.jp/contests/abc286/tasks/abc286_b)（<span style="color: gray">Difficulty : 32</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, s: &str) -> String {
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
```
</details>

### ABC351 C - Merge the balls

[C - Merge the balls](https://atcoder.jp/contests/abc351/tasks/abc351_c)（<span style="color: gray">Difficulty : 228</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(_n: usize, a: Vec<usize>) -> usize {
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
```
</details>

### ABC394 D - Colorful Bracket Sequence

[D - Colorful Bracket Sequence](https://atcoder.jp/contests/abc394/tasks/abc394_d)（<span style="color: gray">Difficulty : 253</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> &'static str {
    let mut stack = Vec::new();

    for c in s.chars() {
        stack.push(c);

        if stack.len() > 1 {
            let len = stack.len();

            if stack.ends_with(&['(', ')']) ||
                stack.ends_with(&['[', ']']) ||
                stack.ends_with(&['<', '>'])
            {
                stack.truncate(len-2);
            }
        }
    }

    if stack.is_empty() {
        "Yes"
    } else {
        "No"
    }
}
```
</details>

### ABC283 D - Scope

[D - Scope](https://atcoder.jp/contests/abc283/tasks/abc283_d)（<span style="color: brown">Difficulty : 453</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> &'static str {
    let s: Vec<char> = s.chars().collect();

    let mut is_stacked = vec![false; 26];

    let mut stack = Vec::new();

    for c in s {
        match c {
            '(' => {
                stack.push(c);
            },
            ')' => {
                while let Some(popped) = stack.pop() {
                    if popped == '(' {
                        break;
                    }
                    is_stacked[(popped as u8 - b'a') as usize] = false;
                }
            },
            _ => {
                if is_stacked[(c as u8 - b'a') as usize] {
                    return "No";
                }

                is_stacked[(c as u8 - b'a') as usize] = true;
                stack.push(c);
            }
        }
    }

    "Yes"
}
```
</details>

### ABC328 D - Take ABC

[D - Take ABC](https://atcoder.jp/contests/abc328/tasks/abc328_d)（<span style="color: brown">Difficulty : 555</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> String {
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
fn run2(s: &str) -> String {
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
```
</details>

### ARC108 B - Abbreviate Fox

[B - Abbreviate Fox](https://atcoder.jp/contests/arc108/tasks/arc108_b)（<span style="color: green">Difficulty : 681</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(_n: usize, s: &str) -> usize {
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
```
</details>

### AGC005 A - STring

[A - STring](https://atcoder.jp/contests/agc005/tasks/agc005_a)（<span style="color: green">Difficulty : 1054</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> usize {
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
```
</details>

## HashMap

### ABC230 B - Election

[B - Election](https://atcoder.jp/contests/abc231/tasks/abc231_b)（<span style="color: gray">Difficulty : 39</span>）

まさにHashMapを使ってくれと言わんばかりの問題です。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn run(_n: usize, s: Vec<&str>) -> String {
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
```
</details>

### ABC241 B - Pasta

[B - Pasta](https://atcoder.jp/contests/abc241/tasks/abc241_b)（<span style="color: gray">Difficulty : 42</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn run(n: usize, m: usize, a: Vec<usize>, b: Vec<usize>) -> String {
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
```
</details>

### ABC155 C - Poll

[C - Poll](https://atcoder.jp/contests/abc155/tasks/abc155_c)（<span style="color: gray">Difficulty : 236</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn run(_n: usize, h: Vec<&str>) -> Vec<String> {
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
```

</details>

### ABC261 C - NewFolder(1)

[C - NewFolder(1)](https://atcoder.jp/contests/abc261/tasks/abc261_c)（<span style="color: gray">Difficulty : 179</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn run(_n: usize, s: Vec<&str>) -> Vec<String> {
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
```

</details>

### ABC235 C - The Kth Time Query

[C - The Kth Time Query](https://atcoder.jp/contests/abc235/tasks/abc235_c)（<span style="color: gray">Difficulty : 249</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn run(_n: usize, _q: usize, a: Vec<usize>, xk: Vec<(usize, usize)>) -> Vec<isize> {
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
```
</details>

### ABC210 C - Colorful Candies

[C - Colorful Candies](https://atcoder.jp/contests/abc210/tasks/abc210_c)（<span style="color: gray">Difficulty : 359</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC194 C - Squared Error

[C - Squared Error](https://atcoder.jp/contests/abc194/tasks/abc194_c)（<span style="color: gray">Difficulty : 386</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn run(_n: usize, a: Vec<isize>) -> isize {
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
```
</details>

### ABC278 D - All Assign Point Add

[D - All Assign Point Add](https://atcoder.jp/contests/abc278/tasks/abc278_d)（<span style="color: brown">Difficulty : 559</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

## HashSet

### ABC166 B - Trick or Treat

[B - Trick or Treat](https://atcoder.jp/contests/abc166/tasks/abc166_b)（<span style="color: gray">Difficulty : 84</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashSet;

fn run(n: usize, _k: usize, vec: Vec<(usize, Vec<usize>)>) -> usize {
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
```
</details>

### ABC226 B - Counting Arrays

[B - Counting Arrays](https://atcoder.jp/contests/abc226/tasks/abc226_b)（<span style="color: gray">Difficulty : 192</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC251 C - Poem Online Judge

[C - Poem Online Judge](https://atcoder.jp/contests/abc251/tasks/abc251_c)（<span style="color: gray">Difficulty : 246</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC278 C - FF

[C - FF](https://atcoder.jp/contests/abc278/tasks/abc278_c)（<span style="color: gray">Difficulty : 327</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

<!--

## 累積和


状態が変化するものはスタックで扱います。状態が変化するたびに最初から走査するのではなく、スタックを上手く利用して計算量を削減します。
-->

## BTreeSet

### ABC385 D - Bank

[D - Bank](https://atcoder.jp/contests/abc294/tasks/abc294_d)（<span style="color: gray">Difficulty : 385</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(_n: usize, _q: usize, event: Vec<(usize, Option<usize>)>) -> Vec<usize> {
    let mut ans = Vec::new();

    let mut bt_set = BTreeSet::new();

    let mut current = 0;

    for (e, x) in event {
        match e {
            1 => {
                bt_set.insert(current + 1);
                current += 1;
            },
            2 => {
                bt_set.remove(&x.unwrap());
            },
            3 => {
                let min = bt_set.iter().min().unwrap();
                ans.push(*min);
            },
            _ => unreachable!(),
        }
    }

    ans
}
```
</details>


### ABC352 D - Permutation Subsequence

[D - Permutation Subsequence](https://atcoder.jp/contests/abc352/tasks/abc352_d)（<span style="color: brown">Difficulty : 714</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::BTreeSet;

fn run(n: usize, k: usize, p: Vec<usize>) -> usize {
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
```
</details>

## BTreeMap

### ABC331 C - Sum of Numbers Greater Than Me

[C - Sum of Numbers Greater Than Me](https://atcoder.jp/contests/abc331/tasks/abc331_c)（<span style="color: gray">Difficulty : 288</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, a: Vec<usize>) -> Vec<usize> {
    let mut btree_map = BTreeMap::new();

    for (i, n) in a.into_iter().enumerate() {
        btree_map.entry(n).or_insert_with(|| Vec::new()).push(i);
    }

    let mut ans = vec![0; n];

    let mut sum = 0;

    for (num, vec) in btree_map.into_iter().rev() {
        for i in vec.iter() {
            ans[*i] = sum;
        }

        sum += num * vec.len();
    }

    ans
}
```
</details>

### ABC253 C - Max - Min Query

[C - Max - Min Query](https://atcoder.jp/contests/abc253/tasks/abc253_c)（<span style="color: brown">Difficulty : 518</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::BTreeMap;
use std::cmp::min;

fn run(_q: usize, query: Vec<(usize, Option<usize>, Option<usize>)>) -> Vec<usize> {
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
```
</details>

## 最小公倍数

### ABC148 C - Snack

[C - Snack](https://atcoder.jp/contests/abc148/tasks/abc148_c)（<span style="color: gray">Difficulty : 82</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn gcd(m: usize, n: usize) -> usize {
    if n == 0 {
        m
    } else {
        gcd(n, m % n)
    }
}

fn run(a: usize, b: usize) -> usize {
    a / gcd(a, b) * b
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
fn gcd(m: usize, n: usize) -> usize {
    if n == 0 {
        m
    } else {
        gcd(n, m % n)
    }
}

fn run(n: usize) -> usize {
    let mut num = 1;

    for i in 2..=n {
        num = num / gcd(num, i) * i;
    }

    num + 1
}
```
</details>

## 回文判定

### 競技プログラミングの鉄則 B56 - Palindrome Queries

[B56 - Palindrome Queries](https://atcoder.jp/contests/tessoku-book/tasks/tessoku_book_ec)

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC066 B - ss

[B - ss](https://atcoder.jp/contests/abc066/tasks/abc066_b)（<span style="color: gray">Difficulty : 384</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn check(s: &str) -> bool {
    if s[0..s.len()/2] == s[s.len()/2..] {
        true
    } else {
        false
    }
}

fn run(s: String) -> usize {
    (0..s.len())
        .rev()
        .skip(1)
        .step_by(2)
        .find(|i| {
            check(&s[0..*i])
        }).unwrap()
}
```
</details>

### ABC147 B - Palindrome-philia

[B - Palindrome-philia](https://atcoder.jp/contests/abc147/tasks/abc147_b)（<span style="color: gray">Difficulty : 44</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(s: &str) -> usize {
    let chars: Vec<char> = s.chars().collect();

    (0..chars.len()/2).filter(|i| {
        chars[*i] != chars[s.len() - *i - 1]
    }).count()
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

fn run(_n: usize, s: Vec<&str>) -> String {
    if s.iter()
        .permutations(2)
        .any(|v| check(format!("{}{}", v[0], v[1])))
    {
        String::from("Yes")
    } else {
        String::from("No")
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
```
</details>

### ABC237 C - kasaka

[C - kasaka](https://atcoder.jp/contests/abc237/tasks/abc237_c)（<span style="color: gray">Difficulty : 267</span>）


<details>
<summary>コード例を見る</summary>

```rust
fn check(s: String) -> bool {
    s.chars().eq(s.chars().rev())
}

// Refactoring
fn run(s: String) -> &'static str {
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
```
</details>

### ABC363 C - Avoid K Palindrome 2

[C - Avoid K Palindrome 2 ](https://atcoder.jp/contests/abc363/tasks/abc363_c)（<span style="color: brown">Difficulty : 602</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

## n進数

### ABC336 C - Even Digits

[C - Even Digits](https://atcoder.jp/contests/abc336/tasks/abc336_c)（<span style="color: gray">Difficulty : 343</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn calc(num: usize, mut result: Vec<usize>) -> Vec<usize> {
    if num == 0 {
        result
    } else {
        result.push(num % 5);
        calc(num / 5, result)
    }
}

fn run(n: usize) -> usize {
    let mut vec = calc(n-1, Vec::new());

    vec.reverse();

    vec.iter()
        .fold(0, |state, num| {
            state * 10 + num * 2
        })
}
```
</details>

## 周期性

### ABC165 D - Floor Function

[D - Floor Function](https://atcoder.jp/contests/abc165/tasks/abc165_d)（<span style="color: brown">Difficulty : 600</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::cmp::min;

fn run(a: f64, b: f64, n: f64) -> usize {
    let x = f64::min(b - 1.0, n) as f64;

    ((a*x/b).floor() - a * (x/b).floor()) as usize
}
```
</details>

## 後から帳尻合わせる系

その都度リスト操作してると間に合わないので、操作状況を記録しておいて出力時に帳尻合わせるというか。C問題に多いイメージ。

### ABC420 C - Sum of Min Query

[C - Sum of Min Query](https://atcoder.jp/contests/abc420/tasks/abc420_c)（<span style="color: gray">Difficulty : 169</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _q: usize, a: Vec<usize>, b: Vec<usize>, cxv: Vec<(char, usize, usize)>) -> Vec<usize> {
    let mut a = a.clone();
    let mut b = b.clone();

    let mut min_vec = Vec::new();

    for i in 0..n {
        min_vec.push(min(a[i], b[i]));
    }

    let mut total: usize = min_vec.iter().sum();

    let mut ans = Vec::new();

    for (c, x, v) in cxv {
        total -= min(a[x-1], b[x-1]);

        match c {
            'A' => a[x-1] = v,
            'B' => b[x-1] = v,
            _ => unreachable!(),
        }

        total += min(a[x-1], b[x-1]);

        ans.push(total);
    }

    ans
}
```
</details>

### ABC410 C - Rotatable Array

[C - Rotatable Array](https://atcoder.jp/contests/abc410/tasks/abc410_c)（<span style="color: gray">Difficulty : 230</span>）

「A の先頭の要素を末尾にする」を毎回やってると間に合わないので、どれだけずれているかを記憶しておく。

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _q: usize, query: Vec<(usize, usize, Option<usize>)>) -> Vec<usize> {
    let mut ans = Vec::new();

    let mut vec: Vec<usize> = (1..=n).collect();

    let mut pos = 0;

    for (p, x, k) in query {
        match p {
            1 => {
                vec[(pos + x - 1) % n] = k.unwrap();
            },
            2 => {
                ans.push(vec[(pos + x - 1) % n]);
            },
            3 => {
                pos += x;
            },
            _ => unreachable!(),
        }
    }

    ans
}
```
</details>

### ABC258 C - Rotation

[C - Rotation](https://atcoder.jp/contests/abc258/tasks/abc258_c)（<span style="color: brown">Difficulty : 419</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _q: usize, s: &str, query: Vec<(usize, usize)>) -> Vec<char> {
    let vec: Vec<char> = s.chars().collect();

    let mut count = 0;

    let mut ans = Vec::new();

    for (t, x) in query {
        match t {
            1 => {
                count += x;
            },
            2 => {
                if x < count {
                    count %= n;
                }

                ans.push(vec[(x + n - count - 1) % n]);
            },
            _ => unreachable!(),
        }
    }

    ans
}
```
</details>

### ABC158 D - String Formation

[D - String Formation](https://atcoder.jp/contests/abc158/tasks/abc158_d)（<span style="color: brown">Difficulty : 610</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

<details style="margin-top: 60px" class="history">
<summary>更新履歴</summary>

<ul class="history-list">
  <li>2026年04月19日 : ABC474 <span style="color: gray">C - Straw Millionaire</span>を追加</li>
  <li>2026年04月18日 : ABC473 <span style="color: gray">C - Sneaking Glances</span>を追加</li>
  <li>2025年08月30日 : ABC292 <span style="color: brown">D - Unicyclic Components</span>を追加</li>
  <li>2025年08月14日 : ABC098 <span style="color: brown">C - Attention</span>を追加</li>
  <li>2025年08月09日 : ABC260 <span style="color: brown">C - Changing Jewels</span>を追加</li>
  <li>2025年08月08日 : ABC289 <span style="color: brown">D - Step Up Robot</span>を追加</li>
  <li>2025年07月30日 : ABC035 <span style="color: green">🧪 C - オセロ</span>を追加</li>
  <li>2025年07月19日 : ABC227 <span style="color: brown">C - ABC conjecture</span>を追加</li>
  <li>2025年06月28日 : ABC240 <span style="color: brown">C - Jumping Takahashi</span>を追加</li>
  <li>2025年06月09日 : ABC270 <span style="color: brown">C - Simple path</span>を追加</li>
  <li>2025年05月31日 : コード例からテストコードを削除</li>
  <li>2025年05月31日 : ABC378 <span style="color: brown">D - Count Simple Paths</span>を追加</li>
  <li>2025年05月28日 : ABC405 <span style="color: brown">D - Escape Route</span>を追加</li>
  <li>2025年05月25日 : ABC308 <span style="color: brown">D - Snuke Maze</span>を追加</li>
  <li>2025年03月23日 : ABC396 <span style="color: brown">D - Minimum XOR Path</span>を追加</li>
  <li>2025年03月14日 : ABC283 <span style="color: brown">D - Scope</span>を追加</li>
  <li>2025年03月11日 : ABC258 <span style="color: brown">C - Rotation</span>を追加</li>
  <li>2025年03月08日 : ABC276 <span style="color: green">E - Round Trip</span>を追加</li>
  <li>2025年02月21日 : ABC015 <span style="color: green">🧪 C - 高橋くんのバグ探し</span>を追加</li>
  <li>2025年02月19日 : ABC373 <span style="color: brown">D - Hidden Weights</span>を追加</li>
  <li>2025年02月18日 : ABC376 <span style="color: brown">D - Cycle</span>を追加</li>
  <li>2025年02月15日 : ABC383 <span style="color: brown">C - Humidifier 3</span>を追加</li>
  <li>2025年02月09日 : ABC293 <span style="color: green">C - Make Takahashi Happy</span>を追加</li>
  <li>2025年02月08日 : ABC387 <span style="color: green">D - Snaky Walk</span>を追加</li>
  <li>2025年02月01日 : 競技プログラミングの鉄則 <span style="color: gray">A63 - Shortest Path 1</span>を追加</li>
  <li>2025年01月30日 : ABC168 <span style="color: green">D - .. (Double Dots)</span>を追加</li>
  <li>2025年01月29日 : ABC151 <span style="color: green">D - Maze Master</span>を追加</li>
  <li>2025年01月28日 : ABC325 <span style="color: brown">C - Sensors</span>を追加</li>
  <li>2025年01月25日 : ABC269 <span style="color: brown">D - Do use hexagon grid</span>を追加</li>
  <li>2025年01月16日 : ABC211 <span style="color: brown">D - Number of Shortest paths</span>を追加</li>
  <li>2025年01月14日 : ABC088 <span style="color: green">D - Grid Repainting</span>を追加</li>
  <li>2025年01月13日 : ABC016 <span style="color: green">C - 友達の友達</span>を追加</li>
  <li>2025年01月12日 : ABC388 <span style="color: gray">C - Various Kagamimochi</span>を追加</li>
</details>
