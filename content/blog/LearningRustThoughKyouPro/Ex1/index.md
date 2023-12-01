---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる"
postdate: "2023-11-23"
update: "2023-12-01"
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

<!--
## 累積和

# データ構造

## スタック

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