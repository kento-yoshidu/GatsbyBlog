---
title: "Erlangメモ"
postdate: "2024-12-06"
update: "2024-12-06"
seriesName: "その他"
seriesSlug: "Others"
description: "Erlangのメモ"
tags: ["Erlang"]
keywords: ["Erlang"]
published: true
---

# Erlangメモ

Erlangに関してメモする。他人が読んでも役に絶たない。閲覧注意。

## リスト

多分配列みたいなもの。要素の追加/削除ができる。O(n)。

### ソート

`lists:sort/1`

```erlang
List = [2, 3, 1],
SortedList = lists:sort(List),

io:format("~p~n", [SortedList]).
%=> [1, 2, 3]
```

降順ソート

```erlang
List = [2, 3, 1],
SortedList = lists:sort(fun(X, Y) -> X > Y end, List),

io:format("~p~n", [SortedList]),
%=> [3, 2, 1]
```

## 文字列

文字列を連結するには`++`を使用する。

```erlang
Str = "dog",
NewStr = Str ++ "s",

io:format("~s~n", [NewStr]).
%=> dogs
```

