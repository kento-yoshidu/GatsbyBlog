---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる その2"
postdate: "2024-10-27"
update: "2025-04-12"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "アルゴリズムやデータ構造ごとに解ける問題を分類しました。"
tags: ["Rust", "アルゴリズム", "競技プログラミング", "AtCoder"]
keywords: ["Rust", "アルゴリズム", "競技プログラミング", "AtCoder", "algorithm"]
published: true
---

# アルゴリズムやデータ構造ごとに問題を分類する その2

# 目次

|アルゴリズム|
|---|
|[幅優先探索-5問](#幅優先探索-5問)|
|[ダイクストラ法-6問](#ダイクストラ法-6問)|
|[半分全列挙](#半分全列挙)|

# アルゴリズム

## 幅優先探索-5問

### ABC254 E - Small d and k

[E - Small d and k](https://atcoder.jp/contests/abc254/tasks/abc254_e)（<span style="color: skyblue">Difficulty : 1202</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc254/tasks/abc254_e

use std::collections::{HashMap, VecDeque};

fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>, _q: usize, xk: Vec<(usize, usize)>) -> Vec<usize> {
    let mut hash_map = HashMap::new();

    for (a, b) in ab {
        hash_map.entry(a).or_insert_with(Vec::new).push(b);
        hash_map.entry(b).or_insert_with(Vec::new).push(a);
    }

    let mut ans = Vec::new();

    for (x, k) in xk {
        if let None =  hash_map.get(&x) {
            ans.push(x);
            continue;
        }

        let mut graph = vec![false; n];
        let mut queue = VecDeque::new();

        queue.push_back((x, k));

        // 辿ったノードの合計
        let mut sum = x;

        while let Some((x, k)) = queue.pop_front() {
            if k == 0 {
                continue;
            }

            graph[x-1] = true;

            let next = hash_map.get(&x).unwrap();

            for n in next {
                if !graph[n-1] {
                    graph[n-1] = true;
                    queue.push_back((*n, k-1));
                    sum += *n;
                }
            }
        }

        ans.push(sum);
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<(usize, usize)>, usize, Vec<(usize, usize)>, Vec<usize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(6, 5, vec![(2, 3), (3, 4), (3, 5), (5, 6), (2, 6)], 7, vec![(1, 1), (2, 2), (2, 0), (2, 3), (4, 1), (6, 0), (4, 3)], vec![1, 20, 2, 20, 7, 6, 20]),
        ];

        for TestCase(n, m, ab, q, xk, expected) in tests {
            assert_eq!(run(n, m, ab, q, xk), expected);
        }
    }
}
```
</details>

### ABC400 D - Takahashi the Wall Breaker

[D - Takahashi the Wall Breaker](https://atcoder.jp/contests/abc400/tasks/abc400_d)（<span>Difficulty : 不明</span>）

典型的な01-BFS。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc400/tasks/abc400_d

use std::collections::VecDeque;

fn out_of_bounds(h: usize, w: usize, i: isize, j: isize) -> bool {
    i < 0 || j < 0 || i == h as isize || j == w as isize
}

fn run(h: usize, w: usize, s: Vec<&str>, a: usize, b: usize, c: usize, d: usize) -> usize {
    let vec: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut dist = vec![vec![-1; w]; h];
    dist[a - 1][b - 1] = 0;

    let mut queue = VecDeque::new();
    queue.push_back((a - 1, b - 1));

    let dx = [0, 1, 0, -1];
    let dy = [1, 0, -1, 0];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        for i in 0..4 {
            let new_i = cur_i as isize + dx[i];
            let new_j = cur_j as isize + dy[i];

            if out_of_bounds(h, w, new_i, new_j) {
                continue;
            }

            let new_i = new_i as usize;
            let new_j = new_j as usize;

            if vec[new_i][new_j] != '#' {
                if dist[new_i][new_j] == -1 || dist[new_i][new_j] > dist[cur_i][cur_j] {
                    dist[new_i][new_j] = dist[cur_i][cur_j];
                    queue.push_front((new_i, new_j));
                }
            } else {
                // 1マス先
                if dist[new_i][new_j] == -1 {
                    dist[new_i][new_j] = dist[cur_i][cur_j] + 1;
                    queue.push_back((new_i, new_j));
                }

                // 2マス先の座標
                let new_i2 = cur_i as isize + dx[i] * 2;
                let new_j2 = cur_j as isize + dy[i] * 2;

                if out_of_bounds(h, w, new_i2, new_j2) {
                    continue;
                }

                let new_i2 = new_i2 as usize;
                let new_j2 = new_j2 as usize;

                if dist[new_i2][new_j2] != -1 {
                    continue;
                }

                dist[new_i2][new_j2] = dist[cur_i][cur_j] + 1;
                queue.push_back((new_i2, new_j2));
            }
        }
    }

    dist[c - 1][d - 1] as usize
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<&'static str>, usize, usize, usize, usize, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(2, 2, vec![".#", "#."], 1, 1, 2, 2, 1),
            TestCase(1, 3, vec![".#."], 1, 1, 1, 3, 1),
        ];

        for TestCase(h, w, s, a, b, c, d, expected) in tests {
            assert_eq!(run(h, w, s, a, b, c, d), expected);
        }
    }
}
```
</details>

### ABC176 D - Wizard in Maze

[D - Wizard in Maze](https://atcoder.jp/contests/abc176/tasks/abc176_d)（<span style="color: skyblue">Difficulty : 1276</span>）

01-BFS。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc176/tasks/abc176_d

use std::collections::VecDeque;

fn check(i: isize, j: isize, h: isize, w: isize) -> bool {
    i < 0 || j < 0 || i >= h || j >= w
}

const INF: isize = std::isize::MAX;

fn run(h: usize, w: usize, c: (usize, usize), d: (usize, usize), s: Vec<&str>) -> isize {
    let vec: Vec<Vec<char>> = s.into_iter().map(|s| s.chars().collect()).collect();

    let mut dist = vec![vec![INF; w]; h];
    dist[c.0 - 1][c.1 - 1] = 0;

    let mut queue = VecDeque::new();
    queue.push_back((c.0-1, c.1-1));

    let dx = [0, 1, 0, -1];
    let dy = [1, 0, -1, 0];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        for i in 0..4 {
            if check(cur_i as isize + dx[i], cur_j as isize + dy[i], h as isize, w as isize) {
                continue;
            }

            let next_i = (cur_i as isize + dx[i]) as usize;
            let next_j = (cur_j as isize + dy[i]) as usize;

            if vec[next_i][next_j] == '#' || dist[next_i][next_j] <= dist[cur_i][cur_j] {
                continue;
            }

            dist[next_i][next_j] = dist[cur_i][cur_j];
            queue.push_front((next_i, next_j));
        }

        for i in -2..=2 {
            for j in -2..=2 {
                let new_i = cur_i as isize + i;
                let new_j = cur_j as isize + j;

                if check(cur_i as isize + i, cur_j as isize + j, h as isize, w as isize) {
                    continue;
                }

                let jump_i = new_i as usize;
                let jump_j = new_j as usize;

                if vec[jump_i][jump_j] == '#' || dist[jump_i][jump_j] <= dist[cur_i][cur_j] + 1 {
                    continue;
                }

                dist[jump_i][jump_j] = dist[cur_i][cur_j] + 1;
                queue.push_back((jump_i, jump_j));
            }
        }
    }

    if dist[d.0-1][d.1-1] == INF {
        -1
    } else {
        dist[d.0-1][d.1-1]
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, (usize, usize), (usize, usize), Vec<&'static str>, isize);

    #[test]
    fn abc176_d() {
        let tests = [
            TestCase(4, 4, (1, 1), (4, 4), vec!["..#.", "..#.", ".#..", ".#.."], 1),
            TestCase(4, 4, (1, 4), (4, 1), vec![".##.", "####", "####", ".##."], -1),
            TestCase(4, 4, (2, 2), (3, 3), vec!["....", "....", "....", "...."], 0),
            TestCase(4, 5, (1, 2), (2, 5), vec!["#.###", "####.", "#..##", "#..##"], 2),
        ];

        for TestCase(h, w, c, d, s, expected) in tests {
            assert_eq!(run(h, w, c, d, s), expected);
        }
    }
}
```
</details>

### ARC005 C - 器物損壊！高橋君

[C - 器物損壊！高橋君](https://atcoder.jp/contests/arc005/tasks/arc005_3)（<span style="color: skyblue">🧪 Difficulty : 1503</span>）

これも01-BFS。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/arc005/tasks/arc005_3

use std::collections::VecDeque;

fn check(i: isize, j: isize, h: isize, w: isize) -> bool {
    i < 0 || j < 0 || i >= h || j >= w
}

fn run(h: usize, w: usize, c: Vec<&str>) -> &'static str {
    let vec: Vec<Vec<char>> = c.into_iter().map(|s| s.chars().collect()).collect();

    let mut s = (0, 0);
    let mut g = (0, 0);

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == 's' {
                s = (i, j);
            }

            if vec[i][j] == 'g' {
                g = (i, j);
            }

        }
    }

    let mut dist = vec![vec![-1; w]; h];
    dist[s.0][s.1] = 0;

    let mut queue = VecDeque::new();
    queue.push_back((s.0, s.1));

    let dx = [0, 1, 0, -1];
    let dy = [1, 0, -1, 0];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        for i in 0..4 {
            if check(cur_i as isize + dx[i],cur_j as isize + dy[i], h as isize, w as isize) {
                continue;
            }

            let next_i = (cur_i as isize + dx[i]) as usize;
            let next_j = (cur_j as isize + dy[i]) as usize;

            if dist[next_i][next_j] != -1 {
                continue;
            }

            if vec[next_i][next_j] != '#' {
                dist[next_i][next_j] = dist[cur_i][cur_j];
                queue.push_front((next_i, next_j));
            } else {
                dist[next_i][next_j] = dist[cur_i][cur_j] + 1;
                queue.push_back((next_i, next_j));
            }
        }
    }

    if dist[g.0][g.1] <= 2 {
        "YES"
    } else {
        "NO"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<&'static str>, &'static str);

    #[test]
    fn test() {
        let tests = [
            TestCase(4, 5, vec!["s####", "....#", "#####", "#...g"], "YES"),
            TestCase(4, 4, vec!["...s", "....", "....", ".g.."], "YES"),
            TestCase(6, 6, vec![".....s", "###...", "###...", "######", "...###", "g.####"], "YES"),
            TestCase(1, 10, vec!["s..####..g"], "NO"),
        ];

        for TestCase(h, w, c, expected) in tests {
            assert_eq!(run(h, w, c), expected);
        }
    }
}
```
</details>

### ABC218 F - Blocked Roads

[F - Blocked Roads](https://atcoder.jp/contests/abc218/tasks/abc218_f)（<span style="color: rgb(136, 136, 255)">Difficulty : 1753</span>）

最初にBFSで最短経路を求めておく。後は各エッジについて最短経路に含まれないなら`dist[n]`を出力、最短経路に含まれるなら再度BFSを回すだけで解ける。

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc218/tasks/abc218_f

use std::collections::{HashMap, VecDeque};

fn bfs(n: usize, start: usize, hash_map: &HashMap<usize, Vec<usize>>) -> Vec<usize> {
    let mut dist = vec![std::usize::MAX; n+1];
    dist[start] = 0;

    let mut queue = VecDeque::new();
    queue.push_front(start);

    while let Some(cur) = queue.pop_front() {
        let Some(next) = hash_map.get(&cur) else {
            continue;
        };

        for next in next {
            if dist[*next] != std::usize::MAX {
                continue;
            }

            dist[*next] = dist[cur] + 1;

            queue.push_back(*next);
        }
    }

    dist
}

fn run(n: usize, _m: usize, st: Vec<(usize, usize)>) -> Vec<isize> {
    let mut graph = HashMap::new();

    for &(s, t) in &st {
        graph.entry(s).or_insert_with(Vec::new).push(t);
    }

    let dist = bfs(n, 1, &graph);

    let mut ans = Vec::new();

    for &(s, t) in &st {
        if dist[s] + 1 != dist[t] {
            ans.push(dist[n] as isize);
            continue;
        }

        let mut graph_clone = graph.clone();
        graph_clone.get_mut(&s).map(|v| v.retain(|&x| x != t));

        let dist_after_removal = bfs(n, 1, &graph_clone);

        let dist: isize = if dist_after_removal[n] == std::usize::MAX {
            -1
        } else {
            dist_after_removal[n] as isize
        };

        ans.push(dist);
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<(usize, usize)>, Vec<isize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, 3, vec![(1, 2), (1, 3), (2, 3)], vec![1, 2, 1]),
            TestCase(4, 4, vec![(1, 2), (2, 3), (2, 4), (3, 4)], vec![-1, 2, 3, 2]),
            TestCase(5, 10, vec![(1, 2), (1, 4), (1, 5), (2, 1), (2, 3), (3, 1), (3, 2), (3, 5), (4, 2), (4, 3)], vec![ 1, 1, 3, 1, 1, 1, 1, 1, 1, 1]),
            TestCase(4, 1, vec![(1, 2)], vec![-1]),
        ];

        for TestCase(n, m, st, expected) in tests {
            assert_eq!(run(n, m, st), expected);
        }
    }
}
```
</details>

## ダイクストラ法-6問

### 競技プログラミングの鉄則 A64 - Shortest Path 2

[A64 - Shortest Path 2](https://atcoder.jp/contests/tessoku-book/tasks/tessoku_book_bl)（<span style="color: gray">Difficultyなし</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/tessoku-book/tasks/tessoku_book_bl

use std::collections::{BinaryHeap, HashMap};
use std::cmp::Reverse;

const INF: usize = std::usize::MAX;

fn run(n: usize, _m: usize, abc: Vec<(usize, usize, usize)>) -> Vec<isize> {
    let mut hash_map = HashMap::new();

    for (a, b, c) in abc {
        hash_map.entry(a).or_insert_with(|| Vec::new()).push((c, b));
        hash_map.entry(b).or_insert_with(|| Vec::new()).push((c, a));
    }

    let mut current = vec![INF; n+1];

    current[1] = 0;

    let mut priority_queue = BinaryHeap::new();
    priority_queue.push(Reverse((0, 1)));


    while let Some(Reverse((cur_cost, cur_i))) = priority_queue.pop() {
        if cur_cost > current[cur_i] {
            continue;
        }

        let Some(next) = hash_map.get(&cur_i) else {
            continue;
        };

        for (next_cost, next_i) in next {
            let new_cost = cur_cost + next_cost;

            if new_cost < current[*next_i] {
                current[*next_i] = new_cost;
                priority_queue.push(Reverse((new_cost, *next_i)));
            }
        }
    }

    current[1..].into_iter()
        .map(|c| {
            if *c == INF {
                -1
            } else {
                *c as isize
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<(usize, usize, usize)>, Vec<isize>);

    #[test]
    fn test() {
        let tests = [
            TestCase(6, 7, vec![(1, 2, 15), (1, 4, 20), (2, 3, 65), (2, 5, 4), (3, 6, 50), (4, 5, 30), (5, 6, 8)], vec![0, 15, 77, 20, 19, 27]),
        ];

        for TestCase(n, m, abc, expected) in tests {
            assert_eq!(run(n, m, abc), expected);
        }
    }
}
```
</details>

### ABC012 D バスと避けられない運命

[D - バスと避けられない運命](https://atcoder.jp/contests/abc012/tasks/abc012_4)（<span style="color: green">🧪 Difficulty : 1166</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc012/tasks/abc012_4

use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};
use std::cmp::min;

fn dijkstra(n: usize, start: usize, hash_map: &HashMap<usize, Vec<(usize, usize)>>) -> usize {
    let mut dist = vec![std::usize::MAX; n+1];
    dist[start] = 0;

    let mut priority_queue = BinaryHeap::new();
    priority_queue.push(Reverse((0, start)));

    while let Some(Reverse((cur_cost, cur_i))) = priority_queue.pop() {
        for (next_cost, next_i) in hash_map.get(&cur_i).unwrap() {
            let new_cost = cur_cost + next_cost;

            if new_cost < dist[*next_i] {
                dist[*next_i] = new_cost;
                priority_queue.push(Reverse((new_cost, *next_i)));
            }
        }
    }

    dist.into_iter().filter(|n| *n != std::usize::MAX).max().unwrap()
}

fn run(n: usize, _m: usize, abt: Vec<(usize, usize, usize)>) -> usize {
    let mut ans = std::usize::MAX;

    let mut hash_map = HashMap::new();

    for (a, b, t) in abt {
        hash_map.entry(a).or_insert_with(|| Vec::new()).push((t, b));
        hash_map.entry(b).or_insert_with(|| Vec::new()).push((t, a));
    }

    for i in 1..=n {
        ans = min(ans, dijkstra(n, i, &hash_map));
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<(usize, usize, usize)>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, 2, vec![(1, 2, 10), (2, 3, 10)], 10),
            TestCase(5, 5, vec![(1, 2, 12), (2, 3, 14), (3, 4, 7), (4, 5, 9), (5, 1, 18)], 26),
            TestCase(4, 6, vec![(1, 2, 1), (2, 3, 1), (3, 4, 1), (4, 1, 1), (1, 3, 1), (4, 2, 1)], 1),
        ];

        for TestCase(n, m, abt, expected) in tests {
            assert_eq!(run(n, m, abt), expected);
        }
    }
}
```
</details>

### ABC325 E - Our clients, please wait a moment

[E - Our clients, please wait a moment](https://atcoder.jp/contests/abc325/tasks/abc325_e)（<span style="color: green">Difficulty : 1093</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc325/tasks/abc325_e

use std::collections::{BinaryHeap, HashMap};
use std::cmp::{min, Reverse};

const INF: usize = std::usize::MAX;

fn dijkstra(
    n: usize,
    start: usize,
    a: usize,
    b: usize,
    c: usize,
    d: &Vec<Vec<usize>>,
    is_forward: bool
) -> Vec<usize> {
    let mut dist = vec![INF; n+1];

    dist[start] = 0;

    let mut priority_queue = BinaryHeap::new();
    priority_queue.push(Reverse((0, start)));

    while let Some(Reverse((cur_cost, cur_i))) = priority_queue.pop() {
        if cur_cost > dist[cur_i] {
            continue;
        }

        for next in 1..=n {
            if next == cur_i {
                continue;
            }

            let new_cost =
                if is_forward {
                    cur_cost + d[cur_i-1][next-1] * a
                } else {
                    cur_cost + (d[cur_i-1][next-1] * b) + c
                };

            if new_cost < dist[next] {
                dist[next] = new_cost;
                priority_queue.push(Reverse((new_cost, next)));
            }
        }
    }

    dist
}

fn run(n: usize, a: usize, b: usize, c: usize, d: Vec<Vec<usize>>) -> usize {
    let dijk = dijkstra(n, 1, a, b, c, &d, true);
    let dijk2 = dijkstra(n, n, a, b, c, &d, false);

    (1..=n)
        .map(|i| dijk[i] + dijk2[i])
        .min()
        .unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, usize, usize, Vec<Vec<usize>>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(4, 8, 5, 13, vec![vec![0, 6, 2, 15], vec![6, 0, 3, 5], vec![2, 3, 0, 13], vec![15, 5, 13, 0]], 78),
            TestCase(3, 1, 1000000, 1000000, vec![vec![0, 10, 1], vec![10, 0, 10], vec![1, 10, 0]], 1),
            TestCase(5, 954257, 954213, 814214, vec![vec![0, 84251, 214529, 10017, 373342], vec![84251, 0, 91926, 32336, 164457], vec![214529, 91926, 0, 108914, 57762], vec![10017, 32336, 108914, 0, 234705], vec![373342, 164457, 57762, 234705, 0]], 168604826785),
        ];

        for TestCase(n, a, b, c, d, expected) in tests {
            assert_eq!(run(n, a, b, c, d), expected);
        }
    }
}
```
</details>

### ABC335 E - Non-Decreasing Colorful Path

[E - Non-Decreasing Colorful Path](https://atcoder.jp/contests/abc335/tasks/abc335_e)（<span style="color: skyblue">Difficulty : 1540</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc335/tasks/abc335_e

use std::collections::{BinaryHeap, HashMap};
use std::cmp::Reverse;

fn dijkstra(
    n: usize,
    hash_map: &HashMap<usize, Vec<usize>>,
    a: &Vec<usize>
) -> usize {
    let mut count = vec![0; n+1];
    count[1] = 1;

    let mut priority_queue = BinaryHeap::new();
    priority_queue.push((Reverse(a[0]), 1, 1));

    while let Some((_, cur_count, cur_i)) = priority_queue.pop() {
        if count[cur_i] > cur_count {
            continue;
        }

        let Some(next) = hash_map.get(&cur_i) else {
            continue;
        };

        for next_i in next {
            if a[cur_i-1] > a[*next_i-1] {
                continue;
            }

            let new_count = if a[cur_i - 1] < a[next_i - 1] {
                cur_count + 1
            } else {
                cur_count
            };

            if count[*next_i] < new_count {
                count[*next_i] = new_count;
                priority_queue.push((Reverse(a[*next_i-1]), new_count, *next_i));
            }
        }
    }

    count[n]
}

fn run(
    n: usize,
    _m: usize,
    a: Vec<usize>,
    uv: Vec<(usize, usize)>
) -> usize {
    let mut hash_map = HashMap::new();

    for (u, v) in uv {
        hash_map.entry(u).or_insert_with(|| Vec::new()).push(v);
        hash_map.entry(v).or_insert_with(|| Vec::new()).push(u);
    }

    dijkstra(n, &hash_map, &a)
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<usize>, Vec<(usize, usize)>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(5, 6, vec![10, 20, 30, 40, 50], vec![(1, 2),(1, 3),(2, 5),(3, 4),(3, 5),(4, 5)], 4),
            TestCase(4, 5, vec![1, 10, 11, 4], vec![(1, 2), (1, 3), (2, 3), (2, 4), (3, 4)], 0),
            TestCase(10, 12, vec![1, 2, 3, 3, 4, 4, 4, 6, 5, 7], vec![(1, 3), (2, 9), (3, 4), (5, 6), (1, 2), (8, 9), (4, 5), (8, 10), (7, 10), (4, 6), (2, 8), (6, 7)], 5),
        ];

        for TestCase(n, m, a, uv, expected) in tests {
            assert_eq!(run(n, m, a, uv), expected);
        }
    }
}
```
</details>

### ABC051 D - Candidates of No Shortest Paths

[D - Candidates of No Shortest Paths](https://atcoder.jp/contests/abc051/tasks/abc051_d)（<span style="color: skyblue">Difficulty : 1566</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc051/tasks/abc051_d

use core::hash;
use std::collections::{BinaryHeap, HashMap};

const INF: usize = std::usize::MAX;

fn dijkstra(n: usize, start: usize, hash_map: &HashMap<usize, Vec<(usize, usize)>>) -> Vec<usize> {
    let mut dist = vec![INF; n+1];
    dist[start] = 0;

    let mut priority_queue = BinaryHeap::new();
    priority_queue.push((0, start));

    while let Some((cur_cost, cur_i)) = priority_queue.pop() {
        let Some(next) = hash_map.get(&cur_i) else {
            continue;
        };

        for (next_cost, next_i) in next {
            let new_cost = cur_cost + next_cost;

            if new_cost < dist[*next_i] {
                dist[*next_i] = new_cost;
                priority_queue.push((new_cost, *next_i));
            }
        }
    }

    dist
}

fn run(n: usize, m: usize, abc: Vec<(usize, usize, usize)>) -> usize {
    let mut hash_map = HashMap::new();

    for &(a, b, c) in &abc {
        hash_map.entry(a).or_insert_with(|| Vec::new()).push((c, b));
        hash_map.entry(b).or_insert_with(|| Vec::new()).push((c, a));
    }

    let mut dist = vec![vec![INF; n + 1]; n + 1];

    for i in 1..=n {
        dist[i] = dijkstra(n, i, &hash_map);
    }

    let mut used = vec![false; m];

    for i in 1..=n {
        for j in 1..=n {
            if i == j || dist[i][j] == INF {
                continue;
            }

            for (k, &(a, b, c)) in abc.iter().enumerate() {
                if dist[i][a] + c + dist[b][j] == dist[i][j] || dist[i][b] + c + dist[a][j] == dist[i][j] {
                    used[k] = true;
                }
            }
        }
    }

    used.iter().filter(|&&u| !u).count()
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, Vec<(usize, usize, usize)>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(3, 3, vec![(1, 2, 1), (1, 3, 1), (2, 3, 3)], 1),
            TestCase(3, 2, vec![(1, 2, 1), (2, 3, 1)], 0),
        ];

        for TestCase(n, m, abc, expected) in tests {
            assert_eq!(run(n, m, abc), expected);
        }
    }
}
```
</details>

### ABC035 D - トレジャーハント

[D - トレジャーハント](https://atcoder.jp/contests/abc035/tasks/abc035_d)（<span style="color: skyblue">🧪 Difficulty : 1591</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc035/tasks/abc035_d

use std::collections::{BinaryHeap, HashMap};
use std::cmp::Reverse;

const INF: usize = std::usize::MAX;

fn dijkstra(n: usize, start: usize, hash_map: &HashMap<usize, Vec<(usize, usize)>>) -> Vec<usize> {
    let mut dist = vec![INF; n+1];
    dist[start] = 0;

    let mut priority_queue = BinaryHeap::new();
    priority_queue.push(Reverse((0, start)));

    while let Some(Reverse((cur_cost, cur_i))) = priority_queue.pop() {
        if cur_cost > dist[cur_i] {
            continue;
        }

        if let Some(next) = hash_map.get(&cur_i) {
            for &(next_cost, next_i) in next {
                let new_cost = next_cost + cur_cost;

                if new_cost < dist[next_i] {
                    dist[next_i] = new_cost;
                    priority_queue.push(Reverse((new_cost, next_i)));
                }
            }
        }
    }

    dist
}

fn run(n: usize, _m: usize, t: usize, a: Vec<usize>, abc: Vec<(usize, usize, usize)>) -> usize {
    let mut forward = HashMap::new();
    let mut backward = HashMap::new();

    for (a, b, c) in abc {
        forward.entry(a).or_insert_with(Vec::new).push((c, b));
        backward.entry(b).or_insert_with(Vec::new).push((c, a));
    }

    let forward = dijkstra(n, 1, &forward);
    let backward = dijkstra(n, 1, &backward);

    let mut ans = 0;

    for i in 1..=n {
        if forward[i] == INF || backward[i] == INF {
            continue;
        }

        // 往復時間がT秒未満なら
        if forward[i] + backward[i] < t {
            ans = ans.max((t - forward[i] - backward[i]) * a[i-1]);
        }
    }

    ans
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestCase(usize, usize, usize, Vec<usize>, Vec<(usize, usize, usize)>, usize);

    #[test]
    fn test() {
        let tests = [
            TestCase(2, 2, 5, vec![1, 3], vec![(1, 2, 2), (2, 1, 1)], 6),
            TestCase(2, 2, 3, vec![1, 3], vec![(1, 2, 2), (2, 1, 1)], 3),
            TestCase(8, 15, 120, vec![1, 2, 6, 16, 1, 3, 11, 9], vec![(1, 8, 1), (7, 3, 14), (8, 2, 13), (3, 5, 4), (5, 7, 5), (6, 4, 1), (6, 8, 17), (7, 8, 5), (1, 4, 2), (4, 7, 1), (6, 1, 3), (3, 1, 10), (2, 6, 5), (2, 4, 12), (5, 1, 30)], 1488),
        ];

        for TestCase(n, m, t, a, abc, expected) in tests {
            assert_eq!(run(n, m, t, a, abc), expected);
        }
    }
}
```
</details>

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

### ABC143 D - Triangles

[D - Triangles](https://atcoder.jp/contests/abc143/tasks/abc143_d)（<span style="color: brown">Difficulty : 686</span>）

<details>
<summary>コード例を見る</summary>

```rust
// https://atcoder.jp/contests/abc143/tasks/abc143_d

use std::cmp::Ordering;
use itertools::Itertools;
use library::lib::upper_bound::upper_bound;

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


fn run(n: usize, l: Vec<usize>) -> usize {
    let vec: Vec<usize> = l.into_iter().sorted().collect();

    let mut ans = 0;

    for i in 0..n {
        for j in i+1..n {
            let res = upper_bound(&vec, vec[i] + vec[j] - 1);

            if res > j + 1 {
                ans += res - j - 1;
            }
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
            TestCase(4, vec![3, 4, 2, 1], 1),
            TestCase(3,vec![1, 1000, 1], 0),
            TestCase(7, vec![218, 786, 704, 233, 645, 728, 389], 23),
        ];

        for TestCase(n, l, expected) in tests {
            assert_eq!(run(n, l), expected);
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
fn max_under_n<T: Ord>(vec: &[T], value: T) -> Option<usize> {
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

    ans.into_sorted_vec()
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
        ];

        for TestCase(x, y, z, k, a, b, c, expected) in tests {
            assert_eq!(run(x, y, z, k, a, b, c), expected);
        }
    }
}
```
</details>

<details style="margin-top: 60px" class="history">
<summary>更新履歴</summary>

<ul class="history-list">
  <li>2025年4月12日 : ABC400 D - Takahashi the Wall Breakerを追加</li>
  <li>2025年3月22日 : ABC218 <span style="color: rgb(137, 137, 255)">F - Blocked Roads</span>を追加</li>
  <li>2025年3月09日 : ABC012 <span style="color: green">🧪 D - バスと避けられない運命</span>を追加</li>
  <li>2025年3月03日 : ABC176 <span style="color: skyblue">D - Wizard in Maze</span>を追加</li>
  <li>2025年3月02日 : ARC005 <span style="color: skyblue">🧪 C - 器物損壊！高橋君</span>を追加</li>
  <li>2025年3月01日 : ABC035 <span style="color: skyblue">🧪 D - トレジャーハント</span>を追加</li>
  <li>2025年2月28日 : ABC335 <span style="color: skyblue">E - Non-Decreasing Colorful Path</span>を追加</li>
  <li>2025年2月23日 : ABC325 <span style="color: green">E - Our clients, please wait a moment</span>を追加</li>
  <li>2025年2月22日 : 競技プログラミングの鉄則 <span style="color: gray">A64 - Shortest Path 2</span>を追加</li>
  <li>2025年1月13日 : ABC254 <span style="color: skyblue">E - Small d and k</span>を追加</li>
</details>

## 参考

- [01-BFSのちょっと丁寧な解説 - ARMERIA](https://betrue12.hateblo.jp/entry/2018/12/08/000020)
