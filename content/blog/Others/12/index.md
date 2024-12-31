---
title: "Erlangメモ"
postdate: "2024-12-06"
update: "2024-12-31"
seriesName: "その他"
seriesSlug: "Others"
description: "Erlangのメモ"
tags: ["Erlang"]
keywords: ["Erlang"]
published: true
---

# Erlangメモ

Erlangに関してメモする。他人が読んでも役に立たない。閲覧注意。

## リスト

多分配列みたいなもの。要素の追加/削除ができる。O(n)。

### ソート

`lists:sort/1`

昇順ソート

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

`lists:usort/1`

ソートして重複を除く

```erlang
List = [3, 1, 3],
UniquedSort = lists:usort(List),

io:format("~p~n", [UniqedSort]).
%=> [1,3]
```

`lists:member/2`

多分containsみたいなやつ

```erlang
case lists:member("A", ["A", "B", "C"]) of
  true -> io:format("true\n");
  false -> io:format("false\n")
  %=> true
end.
```

## 文字列

文字列を連結するには`++`を使用する。

```erlang
Str = "dog",
NewStr = Str ++ "s",

io:format("~s~n", [NewStr]).
%=> dogs
```

