---
title: "Union Findをしっかり勉強する"
postdate: "2025-10-25"
update: "2025-10-25"
seriesName: "その他"
seriesSlug: "Others"
description: ""
tags: ["アルゴリズム", "Union Find"]
keywords: ["アルゴリズム", "Union Find"]
published: false
---

# Union Find

最近`Union Find`のライブラリを整備しました。まぁ呼び出して使えてはいるんですが本当にやってることを理解しているかと怪しいです。

---

Union Find（別名: Disjoint Set Union / DSU）は、**複数の要素をグループ（集合）に分けて管理する**データ構造です。主に次の2つの操作を高速に行えます。

- **Find** — ある要素がどのグループに属するか調べる
- **Unite** — 2つのグループを1つに合併する

## 例題：都市間の連結クエリ

n 個の都市と m 本の道路があります。各道路は2つの都市を双方向につなぎます。q 個のクエリが与えられ、それぞれ「都市 u と都市 v はつながっているか？」に答えてください。

```
n = 6（都市 1〜6）
道路: (1,2), (2,3), (4,5)
クエリ:
  same(1, 3) → true  （1→2→3 でつながっている）
  same(1, 4) → false （つながっていない）
  same(4, 5) → true  （直接つながっている）
```

## 素朴な解法：BFS

クエリのたびに u を起点として BFS を走らせ、v に到達できるか確認します。

```rust
fn bfs(graph: &Vec<Vec<usize>>, start: usize, goal: usize) -> bool {
    let n = graph.len();
    let mut visited = vec![false; n];
    let mut queue = std::collections::VecDeque::new();

    visited[start] = true;
    queue.push_back(start);

    while let Some(cur) = queue.pop_front() {
        if cur == goal {
            return true;
        }
        for &next in &graph[cur] {
            if !visited[next] {
                visited[next] = true;
                queue.push_back(next);
            }
        }
    }

    false
}
```

1クエリあたり O(n + m) かかるため、q クエリ全体では **O(q(n + m))** になります。n = m = q = 100,000 の場合、約 **200 億回**の操作になり現実的ではありません。

今回の例題のように「動的にグループが合併していく」場面が得意です。逆に**グループを分割する操作はサポートしない**という特性があります。

## データ構造

内部では `parent` という配列1本で管理します。

```
初期状態 (n=5):
ノード:   0  1  2  3  4
parent:  [0, 1, 2, 3, 4]
```

最初は全員が自分自身を親としており、各ノードが独立したグループを形成しています。

## 各操作

### Find（根を探す）

`parent[x] == x` であれば `x` が根（グループの代表）です。そうでなければ親を辿り続けます。

```
parent[3] = 1, parent[1] = 0, parent[0] = 0
→ ノード3の根は0
```

素朴に辿るだけだと、最悪ケースで木が一直線になり O(n) かかります。そこで**経路圧縮**を使います。

#### 経路圧縮（Path Compression）

根を見つけた帰りに、途中のノードの親を全て根に直接つなぎ直します。

```
圧縮前: 3 → 1 → 0
圧縮後: 3 → 0, 1 → 0
```

次回以降の `find` が O(1) に近くなります。

### Unite（合併）

2つのノードの根を求め、片方の根をもう片方の根の子にします。

```
unite(3, 4):
  3の根 = 0, 4の根 = 4
  → parent[4] = 0
```

ただし常に一方に偏った結合をすると木が深くなります。そこで**Union by Size**を使います。

#### Union by Size

`size` 配列でグループの要素数を管理し、**小さい木を大きい木にぶら下げる**ようにします。これにより木の高さが O(log n) に抑えられます。

## Union Find で例題を解く

道路情報を事前に全て `unite` で処理しておけば、クエリは `same` の1呼び出しで終わります。

```rust
let mut uf = UnionFind::new(n + 1);

for (u, v) in edges {
    uf.unite(u, v);
}

uf.same(1, 3); // true
uf.same(1, 4); // false
uf.same(4, 5); // true
```

### 計算量の比較

| | 前処理 | 1クエリ | q クエリ合計 |
|---|---|---|---|
| BFS（毎回） | なし | O(n + m) | O(q(n + m)) |
| Union Find | O(m・α(n)) | O(α(n)) | O((m + q)・α(n)) |

α はアッカーマン関数の逆関数で、実用上はほぼ定数です。n = m = q = 100,000 の場合：

- BFS: 約 **200 億回**の操作
- Union Find: 約 **20 万回**の操作

BFS は各クエリで毎回グラフ全体を探索するのに対し、Union Find は道路情報を一度処理すれば後はほぼ定数時間で答えられます。

## 実装

```rust
use std::collections::HashSet;

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
