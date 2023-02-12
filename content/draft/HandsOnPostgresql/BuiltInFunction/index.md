---
title: "組み込み関数"
postdate: "2022-07-05"
update: "2022-07-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
description: "PostgreSQLの関数機能について説明します。"
tags: ["PostgreSQL"]
keywords: ["PostgreSQL", "function", "関数"]
published: false
---

# now()

`now`関数で現在の日時を取得することができます。

`interval`で時間間隔を格納できる。

```
postgres=# SELECT now() - interval '3 month' as result;
            result
-------------------------------
 2022-04-15 20:51:05.249825+09 
(1 row)
```

もしくはこんな書き方もできます。

```
postgres=# SELECT now() - '3 month'::interval as result;
            result
------------------------------
 2022-04-15 20:52:55.87543+09
(1 row)
```

うーん、覚えにくい、、、。

## システム情報関数

`SELECT [関数名]`のように利用します。もちろん`INSERT`や`UPDATE`文でも使用できます。

|関数名|説明|出力例|
|---|---|---|
|version()|PostgreSQLのバージョンを出力する|PostgreSQL 12.11 on x86_64-pc-linux-musl, compiled by gcc (Alpine 11.2.1_git20220219) 11.2.1 20220219, 64-bit |
|current_database()|接続しているデータベース情報を出力する|sample_db|
|current_user|コマンドを実行したユーザーを出力する|myuser|
|current_timestamp|現在の日時を出力する|2022-07-18 12:38:25.19573+09|
|current_date|現在の日付を出力する|2022-07-18|

関数名に`()`を含むか含まないかが紛らわしいですね。この辺の命名ポリシーはどうなっているんでしょうか？

ちなみに、[公式リファレンス](https://www.postgresql.jp/document/12/html/functions-info.html)を見てもらえばわかりますが、非常に多くのシステム情報関数があります。なお、現在のユーザー情報を出力する`current_user`ですが、類似のものとして`current_role`や`user`なんて関数もあります。細かい違いはありますが、試験対策上は考慮する必要はなさそうです。

