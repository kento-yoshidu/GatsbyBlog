---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる"
postdate: "2023-11-23"
update: "2023-12-08"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "アルゴリズムやデータ構造ごとに解ける問題を分類しました。"
tags: ["Rust", "競技プログラミング", "AtCoder"]
keywords: ["Rust", "競技プログラミング", "AtCoder"]
published: true
---

# アルゴリズムやデータ構造ごとに問題を分類する

タイトルのまんまです。アルゴリズムやデータ構造ごとに、そのアルゴリズムを使って解けそうな問題をリストアップします。基本的に私が解いた問題から載せていくので、最初の内は簡単なものばかりで数も少ないです。

都合上、同じ問題が何度も登場することがありますがご了承ください🙇‍♂️。

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

## bit全探索

### ARC105 A - Fourtune Cookies

[A - Fourtune Cookies](9https://atcoder.jp/contests/arc105/tasks/arc105_a)（<span style="color: gray">🧪 Difficulty : 34</span>）

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

[B - Hard Calculation](https://atcoder.jp/contests/abc229/tasks/abc229_b)

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
    let mut ans = Vec::new();
    let chars: Vec<char> = s.chars().collect();

    for i in 0..n {
        ans.push(chars[i]);
        let len = ans.len();

        if len >= 2 {
            if ans[len-2..] == ['n', 'a'] {
                ans.truncate(len-2);
                ans.append(&mut vec!['n', 'y', 'a']);
            }
        }
    }

    ans.iter().collect()
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

<!--

## スタック

## 累積和


状態が変化するものはスタックで扱います。状態が変化するたびに最初から走査するのではなく、スタックを上手く利用して計算量を削減します。
-->

# その他

アルゴリズムやデータ構造ではないですが、様々なテーマで問題を分類しました。

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