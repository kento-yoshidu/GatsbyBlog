---
title: "トランザクション"
postdate: "2021-01-05"
update: "2020-01-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "PREPARE"]
keywords: ["PostgreSQL"]
published: false
---

# トランザクション


## ACCESS EXCLUSIVE

ロック対象のテーブルへの他トランザクションの全ての処理がブロックされる。

自動コミットがONになっている場合は、明示的にトランザクションを開始しない限り、SQLが処理された時点でその内容はコミットされる。

## DIRTY READ

DIRTY READは、他トランザクションによって変更された**コミット前のデータ**を読み込んでしまう現象。

## FUZZY READ

> トランザクションAでデータを複数回読み取っている途中で、トランザクションBでデータを更新してコミットした場合、トランザクションAで違う結果のデータを読み取ってしまう問題が起きます。(非再現リードとも呼ぶ)

https://qiita.com/song_ss/items/38e514b05e9dabae3bdb#%E3%83%95%E3%82%A1%E3%82%B8%E3%83%BC%E3%83%AA%E3%83%BC%E3%83%89%E3%83%8E%E3%83%B3%E3%83%AA%E3%83%94%E3%83%BC%E3%82%BF%E3%83%96%E3%83%AB%E3%83%AA%E3%83%BC%E3%83%89-fuzzy-read--non-repeatable-read


## 分離レベル

|分離レベル|ダーティリード|ファジーリード|ファントムリード|
|---|---|---|---|
|READ UNCOMMITTED|❌|❌|❌|
|READ COMMITTED|⭕|❌|❌|
|REPEATABLE READ|⭕|⭕|❌|
|SERIALIZABLE|⭕|⭕|⭕|
