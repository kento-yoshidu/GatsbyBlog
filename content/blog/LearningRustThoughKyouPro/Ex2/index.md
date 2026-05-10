---
title: "[番外編] アルゴリズム・データ構造ごとに問題を分類してみる その2"
postdate: "2024-10-27"
update: "2026-05-06"
seriesName: "競プロで学ぶRust"
seriesSlug: "LearningRustThoughKyouPro"
description: "アルゴリズムやデータ構造ごとに解ける問題を分類しました。"
tags: ["Rust", "アルゴリズム", "競技プログラミング", "AtCoder"]
keywords: ["Rust", "アルゴリズム", "競技プログラミング", "AtCoder", "algorithm"]
published: true
---

# アルゴリズムやデータ構造ごとに問題を分類する その2

# 目次

|アルゴリズム|データ構造|
|---|---|
|[深さ優先探索]()|[UnionFind](#unionfind)|
|[幅優先探索-7問](#幅優先探索-7問)|[UnionFind-逆順処理](#unionfind-逆順処理)|
|[ダイクストラ法-6問](#ダイクストラ法-6問)|[UnionFind-クラスカル法](#unionfind-クラスカル法)|
|[半分全列挙](#半分全列挙)|[重み付きUnionFind](#重み付きunionfind)|

# アルゴリズム

## 深さ優先探索

### ABC054 C - One-stroke Path

[C - One-stroke Path](https://atcoder.jp/contests/abc054/tasks/abc054_c)（<span style="color: skyblue">Difficulty : 1244</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::HashMap;

fn dfs(n: usize, current: usize, seen: &mut Vec<bool>, graph: &HashMap<usize, Vec<usize>>) -> usize {
    seen[current] = true;

    if (1..=n).all(|i| seen[i]) {
        seen[current] = false;
        return 1;
    }

    let mut count = 0;

    for next in graph.get(&current).unwrap() {
        if seen[*next] {
            continue;
        }

        count += dfs(n, *next, seen, graph);
    }

    seen[current] = false;

    count
}

fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut hash_map = HashMap::new();

    for (a, b) in ab {
        hash_map.entry(a).or_insert_with(|| Vec::new()).push(b);
        hash_map.entry(b).or_insert_with(|| Vec::new()).push(a);
    }

    dfs(n, 1, &mut vec![false; n+1], &mut hash_map)
}
```
</details>

## 幅優先探索-7問

### ABC400 D - Takahashi the Wall Breaker

[D - Takahashi the Wall Breaker](https://atcoder.jp/contests/abc400/tasks/abc400_d)（<span style="color: green">Difficulty : 1026</span>）

典型的な01-BFS。

<details>
<summary>コード例を見る</summary>

```rust
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

    let di = [0, 1, 0, -1];
    let dj = [1, 0, -1, 0];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        for i in 0..4 {
            let new_i = cur_i as isize + di[i];
            let new_j = cur_j as isize + dj[i];

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
```
</details>

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
```
</details>

### ABC213 E - Stronger Takahashi

[E - Stronger Takahashi](https://atcoder.jp/contests/abc213/tasks/abc213_e)（<span style="color: skyblue">Difficulty : 1423</span>）

これも01-BFS。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(h: usize, w: usize, i: isize, j: isize) -> bool {
    i < 0 || j < 0 || h as isize <= i || w as isize <= j
}

fn run(h: usize, w: usize, s: Vec<&str>) -> usize {
    let vec: Vec<Vec<char>> = s.into_iter().map(|str| str.chars().collect()).collect();

    let mut dist = vec![vec![std::usize::MAX; w]; h];
    dist[0][0] = 0;

    let mut queue = VecDeque::new();
    queue.push_back((0, 0));

    let di = [0, 1, 0, -1];
    let dj = [1, 0, -1, 0];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        for i in 0..4 {
            let new_i = cur_i as isize + di[i];
            let new_j = cur_j as isize + dj[i];

            if out_of_bounds(h, w, new_i, new_j) {
                continue;
            }

            let new_i = new_i as usize;
            let new_j = new_j as usize;

            if vec[new_i][new_j] == '#' {
                continue;
            }

            if dist[new_i][new_j] > dist[cur_i][cur_j] {
                dist[new_i][new_j] = dist[cur_i][cur_j];
                queue.push_front((new_i, new_j));
            }
        }

        for di in -2..=2 {
            for dj in -2..=2 {
                let new_i = cur_i as isize + di;
                let new_j = cur_j as isize + dj;

                if di.abs() + dj.abs() == 4 {
                    continue;
                }

                if out_of_bounds(h, w, new_i, new_j) {
                    continue;
                }

                let new_i = new_i as usize;
                let new_j = new_j as usize;

                if dist[new_i][new_j] > dist[cur_i][cur_j] + 1 {
                    dist[new_i][new_j] = dist[cur_i][cur_j] + 1;
                    queue.push_back((new_i, new_j));
                }
            }
        }
    }

    dist[h-1][w-1]
}
```
</details>

### ABC020 C - 壁抜け

[C - 壁抜け](https://atcoder.jp/contests/abc020/tasks/abc020_c)（<span style="color: skyblue">🧪 Difficulty : 1477</span>）

BFSと解の二分探索の組み合わせ。

<details>
<summary>コード例を見る</summary>

```rust
use std::collections::VecDeque;

fn out_of_bounds(h: usize, w: usize, i: isize, j: isize) -> bool {
    i < 0 || j < 0 || h as isize == i || w as isize == j
}

fn bfs(h: usize, w: usize, t: usize, s: Vec<&str>, x: isize) -> bool {
    let vec: Vec<Vec<char>> = s.iter().map(|str| str.chars().collect()).collect();

    let mut s = (0, 0);
    let mut g = (0, 0);

    for i in 0..h {
        for j in 0..w {
            if vec[i][j] == 'S' {
                s = (i, j);
            }

            if vec[i][j] == 'G' {
                g = (i, j);
            }
        }
    }

    let mut dist = vec![vec![std::isize::MAX; w]; h];
    dist[s.0][s.1] = 0;

    let mut queue = VecDeque::new();
    queue.push_back(s);

    let di = [0, 1, 0, -1];
    let dj = [1, 0, -1, 0];

    while let Some((cur_i, cur_j)) = queue.pop_front() {
        for i in 0..4 {
            let new_i = cur_i as isize + di[i];
            let new_j = cur_j as isize + dj[i];

            if out_of_bounds(h, w, new_i, new_j) {
                continue;
            }

            let new_i = new_i as usize;
            let new_j = new_j as usize;

            let cost = if vec[new_i][new_j] == '#' { x } else { 1 };

            if dist[new_i][new_j] > dist[cur_i][cur_j] + cost {
                dist[new_i][new_j] = dist[cur_i][cur_j] + cost;

                if cost == 1 {
                    queue.push_front((new_i, new_j));
                } else {
                    queue.push_back((new_i, new_j));
                }
            }
        }
    }

    dist[g.0][g.1] <= t as isize
}

fn run(h: usize, w: usize, t: usize, s: Vec<&str>) -> usize {
    let mut low = 1;
    let mut high = 1_000_000_000;
    let mut ans = 1;

    while low <= high {
        let mid = (low + high) / 2;

        if bfs(h, w, t, s.clone(), mid) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    ans as usize
}
```
</details>

### ABC176 D - Wizard in Maze

[D - Wizard in Maze](https://atcoder.jp/contests/abc176/tasks/abc176_d)（<span style="color: skyblue">Difficulty : 1276</span>）

01-BFSその3。

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ARC005 C - 器物損壊！高橋君

[C - 器物損壊！高橋君](https://atcoder.jp/contests/arc005/tasks/arc005_3)（<span style="color: skyblue">🧪 Difficulty : 1503</span>）

01-BFSその4。

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC218 F - Blocked Roads

[F - Blocked Roads](https://atcoder.jp/contests/abc218/tasks/abc218_f)（<span style="color: rgb(136, 136, 255)">Difficulty : 1753</span>）

最初にBFSで最短経路を求めておく。後は各エッジについて最短経路に含まれないなら`dist[n]`を出力、最短経路に含まれるなら再度BFSを回すだけで解ける。

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

## ダイクストラ法-6問

### 競技プログラミングの鉄則 A64 - Shortest Path 2

[A64 - Shortest Path 2](https://atcoder.jp/contests/tessoku-book/tasks/tessoku_book_bl)（<span style="color: gray">Difficultyなし</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC012 D バスと避けられない運命

[D - バスと避けられない運命](https://atcoder.jp/contests/abc012/tasks/abc012_4)（<span style="color: green">🧪 Difficulty : 1166</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::cmp::{min, Reverse};
use std::collections::{BinaryHeap, HashMap};

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
```
</details>

### ABC325 E - Our clients, please wait a moment

[E - Our clients, please wait a moment](https://atcoder.jp/contests/abc325/tasks/abc325_e)（<span style="color: green">Difficulty : 1093</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC335 E - Non-Decreasing Colorful Path

[E - Non-Decreasing Colorful Path](https://atcoder.jp/contests/abc335/tasks/abc335_e)（<span style="color: skyblue">Difficulty : 1540</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC051 D - Candidates of No Shortest Paths

[D - Candidates of No Shortest Paths](https://atcoder.jp/contests/abc051/tasks/abc051_d)（<span style="color: skyblue">Difficulty : 1566</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC035 D - トレジャーハント

[D - トレジャーハント](https://atcoder.jp/contests/abc035/tasks/abc035_d)（<span style="color: skyblue">🧪 Difficulty : 1591</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

## 半分全列挙

### ABC292 C - Four Variables

[C - Four Variables](https://atcoder.jp/contests/abc292/tasks/abc292_c)（<span style="color: brown">Difficulty : 444</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC143 D - Triangles

[D - Triangles](https://atcoder.jp/contests/abc143/tasks/abc143_d)（<span style="color: brown">Difficulty : 686</span>）

<details>
<summary>コード例を見る</summary>

```rust
use std::cmp::Ordering;
use itertools::Itertools;

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
```
</details>

### ABC184 F - Programming Contest

[F - Programming Contest](https://atcoder.jp/contests/abc184/tasks/abc184_f)（<span style="color: skyblue">Difficulty : 1432</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

### ABC123 D - Cake 123

[D - Cake 123](https://atcoder.jp/contests/abc123/tasks/abc123_d)（<span style="color: skyblue">Difficulty : 1489</span>）

<details>
<summary>コード例を見る</summary>

```rust
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
```
</details>

# データ構造

## UnionFind

<details>
<summary>Union Find実装を見る</summary>

どこかから拾ってきたものにいくつか生やしている。

```rust
#[derive(Debug)]
pub struct UnionFind {
    parent: Vec<usize>,
    size: Vec<usize>,
}

impl UnionFind {
    pub fn new(n: usize) -> Self {
        Self {
            parent: (0..n).collect(),
            size: vec![1; n],
        }
    }

    pub fn find(&mut self, x: usize) -> usize {
        if self.parent[x] != x {
            let root = self.find(self.parent[x]);

            self.parent[x] = root;
        }

        self.parent[x]
    }

    pub fn unite(&mut self, x: usize, y: usize) -> bool {
        let mut x = self.find(x);
        let mut y = self.find(y);

        if x == y {
            return false;
        }

        if self.size[x] < self.size[y] {
            std::mem::swap(&mut x, &mut y);
        }

        self.parent[y] = x;
        self.size[x] += self.size[y];

        true
    }

    pub fn same(&mut self, x: usize, y: usize) -> bool {
        self.find(x) == self.find(y)
    }

    pub fn size(&mut self, x: usize) -> usize {
        let root = self.find(x);

        self.size[root]
    }

    pub fn count_roots(&mut self, n: usize) -> usize {
        (1..=n)
            .map(|i| self.find(i))
            .collect::<HashSet<_>>()
            .len()
    }
}
```
</details>

### ATC001 B Union Find

[B - Union Find](https://atcoder.jp/contests/atc001/tasks/unionfind_a)（<span style="color: gray">Difficulty : なし</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _q: usize, pab: Vec<(usize, usize, usize)>) -> Vec<&'static str> {
    let mut uf = UnionFind::new(n + 1);

    pab
        .into_iter()
        .filter_map(|(p, a, b)| {
            match p {
                0 => {
                    uf.unite(a, b);
                    None
                },
                1 => {
                    if uf.same(a, b) {
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

### ABC288 C - Don’t be cycle

[C - Don’t be cycle](https://atcoder.jp/contests/abc288/tasks/abc288_c)（<span style="color: brown">Difficulty : 400</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut uf = UnionFind::new(n + 1);

    ab.into_iter()
        .filter(|(a, b)| {
            !uf.unite(*a, *b)
        })
        .count()
}
```
</details>

### ABC285 D - Change Usernames

[D - Change Usernames](https://atcoder.jp/contests/abc285/tasks/abc285_d)（<span style="color: brown">Difficulty : 663</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(_n: usize, st: Vec<(&str, &str)>) -> &'static str {
    let mut id_map = HashMap::new();
    let mut id = 0;

    for (s, t) in st.iter() {
        for x in [s, t] {
            if !id_map.contains_key(x) {
                id_map.insert(*x, id);
                id += 1;
            }
        }
    }

    let mut uf = UnionFind::new(id);

    for (s, t) in st {
        let s = id_map[&s];
        let t = id_map[&t];

        if !uf.unite(s, t) {
            return "No";
        }
    }

    "Yes"
}
```
</details>

### ABC333 D - Erase Leaves

[D - Erase Leaves](https://atcoder.jp/contests/abc333/tasks/abc333_d)（<span style="color: brown">Difficulty : 704</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, uv: Vec<(usize, usize)>) -> usize {
    let mut uf = UnionFind::new(n + 1);
    let mut max_size = 0;

    for (u, v) in uv {
        if u != 1 {
            uf.unite(u, v);
        }

        max_size = max_size.max(uf.size(u));
    }

    n - max_size
}
```
</details>

### ABC231 D - Neighbors

[D - Neighbors](https://atcoder.jp/contests/abc231/tasks/abc231_d)（<span style="color: brown">Difficulty : 726</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> &'static str {
    let mut count = vec![0; n + 1];
    let mut uf = UnionFind::new(n + 1);

    for (a, b) in ab {
        count[a] += 1;
        count[b] += 1;

        if count[a] > 2 || count[b] > 2 {
            return "No";
        }

        if !uf.unite(a, b) {
            return "No";
        }
    }

    "Yes"
}
```
</details>

### ABC177 D - Friends

[D - Friends](https://atcoder.jp/contests/abc177/tasks/abc177_d)（<span style="color: brown">Difficulty : 732</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut uf = UnionFind::new(n + 1);

    for (a, b) in ab {
        uf.unite(a, b);
    }

    (1..=n)
        .map(|n| uf.size(n))
        .max()
        .unwrap()
}
```
</details>

### ABC206 D - KAIBUNsyo

[D - KAIBUNsyo](https://atcoder.jp/contests/abc206/tasks/abc206_d)（<span style="color: green">Difficulty : 879</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, a: Vec<usize>) -> usize {
    let mut uf = UnionFind::new(200_001);

    for i in 0..n/2 {
        if a[i] != a[n - 1 - i] {
            uf.unite(a[i], a[n - 1 - i]);
        }
    }


    let mut map = HashMap::new();

    for &v in &a {
        let root = uf.find(v);
        map.entry(root).or_insert(HashSet::new()).insert(v);
    }

    let mut ans = 0;

    for (_, set) in map {
        ans += set.len() - 1;
    }

    ans
}
```
</details>

### ABC304 E - Good Graph

[E - Good Graph](https://atcoder.jp/contests/abc304/tasks/abc304_e)（<span style="color: green">Difficulty : 971</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(
    n: usize,
    _m: usize,
    uv: Vec<(usize, usize)>,
    _k: usize,
    xy: Vec<(usize, usize)>,
    _q: usize,
    pq: Vec<(usize, usize)>
) -> Vec<&'static str> {
    let mut uf = UnionFind::new(n + 1);

    for (u, v) in uv {
        uf.unite(u, v);
    }

    let mut ng_pair = HashSet::new();

    for (x, y) in xy {
        let x = uf.find(x);
        let y = uf.find(y);

        ng_pair.insert((min(x, y), max(x, y)));
    }

    pq
        .into_iter()
        .map(|(p, q)| {
            let p = uf.find(p);
            let q = uf.find(q);

            if ng_pair.contains(&(min(p, q), max(p, q))) {
                "No"
            } else {
                "Yes"
            }
        })
        .collect()
}
```
</details>

### ABC372 E - K-th Largest Connected Components

[E - K-th Largest Connected Components](https://atcoder.jp/contests/abc372/tasks/abc372_e)（<span style="color: green">Difficulty : 1042</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _q: usize, qux: Vec<(usize, usize, usize)>) -> Vec<isize> {
    let mut ans = Vec::new();

    let mut sets = vec![BTreeSet::new(); n+1];

    for i in 1..=n {
        sets[i].insert(i);
    }

    let mut uf = UnionFind::new(n + 1);

    for (q, u, x) in qux {
        match q {
            1 => {
                let mut ru = uf.find(u);
                let mut rx = uf.find(x);

                if ru == rx {
                    continue;
                }

                if sets[ru].len() < sets[rx].len() {
                    std::mem::swap(&mut ru, &mut rx);
                }

                uf.unite(ru, rx);

                let small = sets[rx].clone();

                for v in small {
                    sets[ru].insert(v);
                }
            },
            2 => {
                let root = uf.find(u);

                if sets[root].len() < x {
                    ans.push(-1);
                } else {
                    let val = sets[root]
                        .iter()
                        .rev()
                        .nth(x - 1)
                        .unwrap();

                    ans.push(*val as isize);
                }
            },
            _ => unreachable!(),
        }
    }

    ans
}
```
</details>

### ABC075 C - Bridge

[C - Bridge](https://atcoder.jp/contests/abc075/tasks/abc075_c)（<span style="color: green">Difficulty : 1067</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, m: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut ans = 0;

    for i in 0..m {
        let mut uf = UnionFind::new(n + 1);

        for j in 0..m {
            if i == j {
                continue;
            }

            uf.unite(ab[j].0, ab[j].1);
        }

        if uf.count_roots(n) > 1 {
            ans += 1;
        }
    }

    ans
}
```
</details>

### ARC032 B - 道路工事

[B - 道路工事](https://atcoder.jp/contests/arc032/tasks/arc032_2)（<span style="color: green">Difficulty : 1106</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> usize {
    let mut uf = UnionFind::new(n + 1);

    for (a, b) in ab {
        uf.unite(a, b);
    }

    uf.count_roots(n) - 1
}
```
</details>

### ARC037 B - バウムテスト

[B - バウムテスト](https://atcoder.jp/contests/arc037/tasks/arc037_b)（<span style="color: green">🧪 Difficulty : 1109</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, uv: Vec<(usize, usize)>) -> usize {
    let mut uf = UnionFind::new(n + 1);

    for &(u, v) in &uv {
        uf.unite(u, v);
    }

    // 頂点数
    let mut v_count = HashMap::new();

    for i in 1..=n {
        let root = uf.find(i);

        *v_count.entry(root).or_insert(0) += 1;
    }

    // 辺数
    let mut e_count = HashMap::new();

    for &(u, _) in &uv {
        let root = uf.find(u);

        *e_count.entry(root).or_insert(0) += 1;
    }

    let mut ans = 0;

    for (root, &v) in &v_count {
        let e = e_count.get(root).unwrap_or(&0);

        if *e == v - 1 {
            ans += 1;
        }
    }

    ans
}
```
</details>

### ABC157 D - Friend Suggestions

[D - Friend Suggestions](https://atcoder.jp/contests/abc157/tasks/abc157_d)（<span style="color: skyblue">Difficulty : 1208</span>）

abを回してUnion Find木を構築しながら、隣接する友達をNGリストに入れていく。次にcdを回して同じグループに属する場合は同様にNGに入れる。

自身が属するグループの人数 - 1(自分自身) - ngリストの人数 が答え。

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, _k: usize, ab: Vec<(usize, usize)>, cd: Vec<(usize, usize)>) -> Vec<usize> {
    let mut uf = UnionFind::new(n + 1);

    let mut ng = vec![HashSet::new(); n + 1];

    for (a, b) in ab {
        ng[a].insert(b);
        ng[b].insert(a);

        uf.unite(a, b);
    }

    for (c, d) in cd {
        if uf.same(c, d) {
            ng[c].insert(d);
            ng[d].insert(c);
        }
    }

    (1..=n)
        .map(|i| {
            let s = uf.size(i);
            s - 1 - ng[i].len()
        })
        .collect()
}
```
</details>

## UnionFind-逆順処理

Union-Findは要素・辺の削除をサポートしない。削除クエリを含む問題は**クエリを逆順に処理し、削除を追加に変換する**ことで解ける。全クエリを先読みするオフライン処理が前提になる。

### ABC229 E - Graph Destruction

[E - Graph Destruction](https://atcoder.jp/contests/abc229/tasks/abc229_e)（<span style="color: green">Difficulty : 1015</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> Vec<usize> {
    let mut graph = vec![vec![]; n + 1];

    for (a, b) in ab.iter() {
        graph[*a].push(b);
        graph[*b].push(a);
    }

    let mut ans = vec![0; n + 2];

    let mut uf = UnionFind::new(n + 1);
    let mut used = vec![false ; n + 1];
    let mut count = 0;

    for i in (1..=n).rev() {
        count += 1;
        used[i] = true;

        for &to in &graph[i] {
            if used[*to] {
                if uf.unite(i, *to) {
                    count -= 1;
                }
            }
        }

        ans[i] = count;
    }

    (1..=n).map(|i| ans[i+1]).collect()
}
```
</details>

### ABC264 E - Blackout 2

[E - Blackout 2](https://atcoder.jp/contests/abc264/tasks/abc264_e)（<span style="color: skyblue">Difficulty : 1229</span>）

<details>
<summary>コード例を見る</summary>

```rust
#[derive(Debug)]
pub struct UnionFind {
    parent: Vec<usize>,
    size: Vec<usize>,
    has_power: Vec<bool>,
    city_count: Vec<usize>,
}

impl UnionFind {
    fn new(n: usize, city_n: usize) -> Self {
        let mut has_power = vec![false; n + 1];
        let mut city_count = vec![0; n + 1];

        for i in 1..=n {
            if i <= city_n {
                city_count[i] = 1;
            } else {
                has_power[i] = true;
            }
        }

        Self {
            parent: (0..=n).collect(),
            size: vec![1; n + 1],
            has_power,
            city_count,
        }
    }

    fn find(&mut self, x: usize) -> usize {
        if self.parent[x] != x {
            let root = self.find(self.parent[x]);

            self.parent[x] = root;
        }

        self.parent[x]
    }

    fn unite(&mut self, x: usize, y: usize) -> usize {
        let mut x = self.find(x);
        let mut y = self.find(y);

        if x == y {
            return 0;
        }

        if self.size[x] < self.size[y] {
            std::mem::swap(&mut x, &mut y);
        }

        let add: usize = if self.has_power[x] && !self.has_power[y] {
            self.city_count[y]
        } else if !self.has_power[x] && self.has_power[y] {
            self.city_count[x]
        } else {
            0
        };

        self.parent[y] = x;
        self.size[x] += self.size[y];

        self.has_power[x] |= self.has_power[y];
        self.city_count[x] += self.city_count[y];

        add
    }
}

fn run(n: usize, m: usize, e: usize, uv: Vec<(usize, usize)>, q: usize, x: Vec<usize>) -> Vec<usize> {
    let mut removed = vec![false; e + 1];

    for i in x.iter() {
        removed[*i] = true;
    }

    let mut uf = UnionFind::new(n + m, n);

    let mut powered = 0;

    for i in 1..=e {
        if !removed[i] {
            let (u, v) = uv[i - 1];
            powered += uf.unite(u, v);
        }
    }

    let mut ans = vec![0; q];

    for i in (0..q).rev() {
        ans[i] = powered;

        let idx = x[i];
        let (u, v) = uv[idx - 1];

        powered += uf.unite(u, v);
    }

    ans
}
```
</details>

### ABC120 D - Decayed Bridges

[D - Decayed Bridges](https://atcoder.jp/contests/abc120/tasks/abc120_d)（<span style="color: skyblue">Difficulty : 1355</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, ab: Vec<(usize, usize)>) -> Vec<usize> {
    let mut uf = UnionFind::new(n + 1);
    let mut cur = n * (n - 1) / 2;

    let mut ans = Vec::new();

    for (a, b) in ab.into_iter().rev() {
        ans.push(cur);

        if !uf.same(a, b) {
            cur -= uf.size(a) * uf.size(b);

            uf.unite(a, b);
        }
    }

    ans.into_iter().rev().collect()
}
```
</details>

### ABC040 D - 道路の老朽化対策について

[D - 道路の老朽化対策について](https://atcoder.jp/contests/abc040/tasks/abc040_d)（<span style="color: rgb(136, 136, 255)">🧪 Difficulty : 1656</span>）

クエリ条件`w`で降順に並べ、条件を満たす辺（`y` > `w`）を追加していく形に変換する。その状態をUnion-Findで管理し、各`v`の連結成分サイズが答え。

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, aby: Vec<(usize, usize, usize)>, q: usize, vw: Vec<(usize, usize)>) -> Vec<usize> {
    let mut wvi = BinaryHeap::new();

    for (i, (v, w)) in vw.into_iter().enumerate() {
        wvi.push((w, v, i));
    }

    let mut yab = BinaryHeap::new();

    for (a, b, y) in aby {
        yab.push((y, a, b));
    }

    let mut uf = UnionFind::new(n + 1);
    let mut ans = vec![0; q];

    while let Some((w, v, i)) = wvi.pop() {
        while let Some(&(y, _, _)) = yab.peek() {
            if y > w {
                let (_, a, b) = yab.pop().unwrap();
                uf.unite(a, b);
            } else {
                break;
            }
        }

        ans[i] = uf.size(v);
    }

    ans
}
```
</details>

### ARC056 B - 駐車場

[B - 駐車場](https://atcoder.jp/contests/arc056/tasks/arc056_b)（<span style="color: rgb(136, 136, 255)">🧪 Difficulty : 1726</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, s: usize, uv: Vec<(usize, usize)>) -> Vec<usize> {
    let mut map = HashMap::new();

    for (u, v) in uv {
        map.entry(u).or_insert_with(|| Vec::new()).push(v);
        map.entry(v).or_insert_with(|| Vec::new()).push(u);
    }

    let mut used = vec![false; n + 1];

    let mut uf = UnionFind::new(n + 1);
    let mut ans = Vec::new();

    for i in (1..=n).rev() {
        used[i] = true;

        if let Some(next) = map.get(&i) {
            for n in next {
                if used[*n] {
                    uf.unite(i, *n);
                }
            }

            if uf.same(i, s) {
                ans.push(i);
            }
        }
    }

    ans.into_iter().rev().collect()
}
```
</details>

## UnionFind-クラスカル法

### 競技プログラミングの鉄則 A67 - MST (Minimum Spanning Tree)

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, abc: Vec<(usize, usize, usize)>) -> usize {
    let abc: Vec<(usize, usize, usize)> = abc.into_iter().sorted_by(|a, b| a.2.cmp(&b.2)).collect();

    let mut uf = UnionFind::new(n + 1);

    abc.into_iter()
        .filter_map(|(a, b, c)| {
            if uf.unite(a, b) {
                Some(c)
            } else {
                None
            }
        })
        .sum()
}
```
</details>

### 典型90問 F - 最小全域木問題

[F - 最小全域木問題](https://atcoder.jp/contests/typical-algorithm/tasks/typical_algorithm_f)

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, uvc: Vec<(usize, usize, usize)>) -> usize {
    let mut uvc = uvc.clone();

    uvc.sort_by(|a, b| a.2.cmp(&b.2));

    let mut uf = UnionFind::new(n + 1);

    uvc.into_iter()
        .filter_map(|(u, v, c)| {
            if uf.unite(u, v) {
                Some(c)
            } else {
                None
            }
        })
        .sum()
}
```
</details>

### ABC218 E - Destruction

[E - Destruction](https://atcoder.jp/contests/abc218/tasks/abc218_e)（<span style="color: green">Difficulty : 1004</span>）

罰金を払う辺は取り除く必要がないので先に`unite`だけしておく。後はコスト順にソートしてクラスカル法を適用するだけ。

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, abc: Vec<(usize, usize, isize)>) -> isize {
    // cが0未満とそうでないものに分割する
    let (neg, mut non_neg): (Vec<_>, Vec<_>) =
        abc.into_iter()
            .partition(|&(_, _, c)| c < 0);

    let mut uf = UnionFind::new(n + 1);

    // cが0未満(取り除くと罰金を払う)辺
    for (a, b, _) in neg {
        uf.unite(a, b);
    }

    non_neg.sort_by(|a, b| a.2.cmp(&b.2));

    let mut ans = 0;

    for (a, b, c) in non_neg {
        if !uf.unite(a, b) {
            ans += c;
        }
    }

    ans
}
```
</details>

### ABC065 D - Built?

[D - Built?](https://atcoder.jp/contests/abc065/tasks/arc076_b)（<span style="color: rgb(136, 136, 255)">Difficulty : 1615</span>）

2点間のコストが`min(|xi - xj|, |yi - yj|)`で定義されるMST問題。

`x`でソートした3点A, B, C（`xA ≤ xB ≤ xC`）を考えると、`cost(A, C) = xC - xA = (xB - xA) + (xC - xB) = cost(A, B) + cost(B, C)`となる。つまりA-C間の直接の辺を使うより隣接辺を組み合わせた方が絶対に有利なので、**隣接する点への辺だけ考えれば十分**。`y`軸についても同様。

1. `x`, `y`それぞれでソートする
2. `x`, `y`ごとに隣接する点への辺のみを`edges`に追加する
3. `edges`をコストの昇順にソートする
4. `edges`を小さい順に見て、Union-Findで同じ連結成分でなければ辺を採用してコストを加算する（クラスカル法）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, xy: Vec<(usize, usize)>) -> usize {
    let mut xi: Vec<(usize, usize)> = xy.iter().enumerate().map(|(i, &(x, _))| (x, i)).collect();
    let mut yi: Vec<(usize, usize)> = xy.iter().enumerate().map(|(i, &(_, y))| (y, i)).collect();

    xi.sort();
    yi.sort();

    let mut edges = Vec::new();

    for i in 0..n - 1 {
        let (x1, i1) = xi[i];
        let (x2, i2) = xi[i + 1];
        edges.push((x2 - x1, i1, i2));
    }

    for i in 0..n - 1 {
        let (y1, i1) = yi[i];
        let (y2, i2) = yi[i + 1];
        edges.push((y2 - y1, i1, i2));
    }

    edges.sort_by(|a, b| a.0.cmp(&b.0));

    let mut uf = UnionFind::new(n + 1);
    let mut ans = 0;

    for (c, u, v) in edges {
        if uf.unite(u, v) {
            ans += c;
        }
    }

    ans
}
```
</details>

## 重み付きUnionFind

<details>
<summary>重み付きUnion Find実装を見る</summary>

```rust
#[derive(Debug)]
pub struct WeightedUnionFind {
    parent: Vec<usize>,
    size: Vec<usize>,
    // 親との差分
    diff_weight: Vec<isize>,
}

impl WeightedUnionFind {
    pub fn new(n: usize) -> Self {
        Self {
            parent: (0..n).collect(),
            size: vec![1; n],
            diff_weight: vec![0; n],
        }
    }

    // rootを返す + 経路圧縮
    pub fn find(&mut self, x: usize) -> usize {
        if self.parent[x] != x {
            let p = self.parent[x];
            let root = self.find(p);

            // 親の重みを足す
            self.diff_weight[x] += self.diff_weight[p];

            self.parent[x] = root;
        }

        self.parent[x]
    }

    // xのrootからの重み
    pub fn weight(&mut self, x: usize) -> isize {
        self.find(x);
        self.diff_weight[x]
    }

    // weight[y] - weight[x]
    pub fn diff(&mut self, x: usize, y: usize) -> isize {
        self.weight(y) - self.weight(x)
    }

    // 「yはxよりwだけ重い」を追加
    pub fn unite(&mut self, x: usize, y: usize, w: isize) -> bool {
        let mut w = w + self.weight(x) - self.weight(y);

        let mut x = self.find(x);
        let mut y = self.find(y);

        if x == y {
            return false;
        }

        if self.size[x] < self.size[y] {
            std::mem::swap(&mut x, &mut y);
            w = -w;
        }

        self.parent[y] = x;
        self.diff_weight[y] = w;
        self.size[x] += self.size[y];

        true
    }

    pub fn same(&mut self, x: usize, y: usize) -> bool {
        self.find(x) == self.find(y)
    }

    pub fn is_valid(&mut self, x: usize, y: usize, w: isize) -> bool {
        if self.same(x, y) {
            self.diff(x, y) == w
        } else {
            true
        }
    }
}
```
</details>

### ABC087 D - People on a Line

[D - People on a Line](https://atcoder.jp/contests/abc087/tasks/arc090_b)（<span style="color: skyblue">Difficulty : 1452</span>）

<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _m: usize, lrd: Option<Vec<(usize, usize, isize)>>) -> &'static str {
    if lrd.is_none() {
        return "Yes";
    }

    let mut wuf = WeightedUnionFind::new(n + 1);

    for (l, r, d) in lrd.unwrap() {
        if !wuf.is_valid(l, r, d) {
            return "No";
        }

        wuf.unite(l, r, d);
    }

    "Yes"
}
```
</details>

### ABC328 F - Good Set Query

[F - Good Set Query](https://atcoder.jp/contests/abc328/tasks/abc328_f)（<span style="color: skyblue">Difficulty : 1477</span>）


<details>
<summary>コード例を見る</summary>

```rust
fn run(n: usize, _q: usize, abd: Vec<(usize, usize, isize)>) -> Vec<usize> {
    let mut wuf = WeightedUnionFind::new(n + 1);

    abd.into_iter()
        .enumerate()
        .filter_map(|(i, (a, b, d))| {
            if !wuf.is_valid(a, b, d) {
                None
            } else {
                wuf.unite(a, b, d);
                Some(i + 1)
            }
        })
        .collect()
}
```
</details>

<details style="margin-top: 60px" class="history">
<summary>更新履歴</summary>

<ul class="history-list">
  <li>2026年05月06日 : ABC218 <span style="color: green">E - Destruction<span>を追加</li>
  <li>2026年05月05日 : ABC065 <span style="color: rgb(137, 137, 255)">D - Built?</span>を追加</li>
  <li>2026年05月04日 : ARC056 <span style="color: rgb(137, 137, 255)">🧪 B - 駐車場</span>を追加</li>
  <li>2026年05月03日 : ABC264 <span style="color: skyblue">E - Blackout 2</span>を追加</li>
  <li>2026年05月02日 : ABC157 <span style="color: skyblue">D - Friend Suggestions</span>を追加</li>
  <li>2026年05月01日 : ABC120 <span style="color: skyblue">D - Decayed Bridges</span>を追加</li>
  <li>2026年04月29日 : ABC040 <span style="color: rgb(137, 137, 255)">🧪 D - 道路の老朽化対策について</span>を追加</li>
  <li>2026年04月26日 : ABC229 <span style="color: green">E - Graph Destruction</span>を追加</li>
  <li>2026年04月24日 : ABC231 <span style="color: brown">D - Neighbors</span>を追加</li>
  <li>2026年04月19日 : ABC328 <span style="color: skyblue">F - Good Set Query</span>を追加</li>
  <li>2026年04月19日 : ABC087 <span style="color: skyblue">D - People on a Line</span>を追加</li>
  <li>2026年04月18日 : ABC372 <span style="color: green">E - K-th Largest Connected Components</span>を追加</li>
  <li>2026年04月15日 : ABC304 <span style="color: green">E - Good Graph</span>を追加</li>
  <li>2026年04月13日 : ARC037 <span style="color: green">🧪 B - バウムテスト</span>を追加</li>
  <li>2026年04月13日 : ABC075 <span style="color: green">C - Bridge</span>を追加</li>
  <li>2026年04月12日 : ABC177 <span style="color: brown">D - Friends</span>を追加</li>
  <li>2026年04月12日 : ARC032 <span style="color: green">B - 道路工事</span>を追加</li>
  <li>2026年03月29日 : ABC206 <span style="color: green">D - KAIBUNsyo</span>を追加</li>
  <li>2025年08月16日 : ABC054 <span style="color: skyblue">C - One-stroke Path</span>を追加</li>
  <li>2025年06月08日 : ABC213 <span style="color: skyblue">E - Stronger Takahashi</span>を追加</li>
  <li>2025年06月07日 : ABC020 <span style="color: skyblue">🧪 C - 壁抜け</span>を追加</li>
  <li>2025年04月12日 : ABC400 <span style="color: green">D - Takahashi the Wall Breaker</span>を追加</li>
  <li>2025年03月22日 : ABC218 <span style="color: rgb(137, 137, 255)">F - Blocked Roads</span>を追加</li>
  <li>2025年03月09日 : ABC012 <span style="color: green">🧪 D - バスと避けられない運命</span>を追加</li>
  <li>2025年03月03日 : ABC176 <span style="color: skyblue">D - Wizard in Maze</span>を追加</li>
  <li>2025年03月02日 : ARC005 <span style="color: skyblue">🧪 C - 器物損壊！高橋君</span>を追加</li>
  <li>2025年03月01日 : ABC035 <span style="color: skyblue">🧪 D - トレジャーハント</span>を追加</li>
  <li>2025年02月28日 : ABC335 <span style="color: skyblue">E - Non-Decreasing Colorful Path</span>を追加</li>
  <li>2025年02月23日 : ABC325 <span style="color: green">E - Our clients, please wait a moment</span>を追加</li>
  <li>2025年01月13日 : ABC254 <span style="color: skyblue">E - Small d and k</span>を追加</li>
</details>

## 参考

- [01-BFSのちょっと丁寧な解説 - ARMERIA](https://betrue12.hateblo.jp/entry/2018/12/08/000020)
