---
title: "Erlangのあれこれ"
postdate: "2023-06-01"
update: "2023-06-01"
seriesName: "その他"
seriesSlug: "Others"
description: "Erlangについて"
tags: ["Erlang"]
keywords: ["Erlang"]
published: false
---

# Erlang

単純なループ処理。

```erlang
-module(a_double_click).
-export([main/0]).

func([H | T]) ->
  io:format("~p : ", [H]),
  io:format("~p ~n", [T]),
  func(T);
func([]) ->
  ok.

main() ->
  func([1, 2, 3]).
```

1回目のループは`H`に`1`、`T`に`[2, 3]`が入る。次は`2`と`[3]`、次に`3`と`[]`という風になります。最後は`func([]) ->`が実行され処理終了になります。

