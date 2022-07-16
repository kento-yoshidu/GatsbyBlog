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

```dummy:title=console
postgres=# select now() - interval '3 month' as result;
            result
-------------------------------
 2022-04-15 20:51:05.249825+09 
(1 row)
```

もしくはこんな書き方もできます。

```dummy:title=console
postgres=# select now() - '3 month'::interval as result;
            result
------------------------------
 2022-04-15 20:52:55.87543+09
(1 row)
```

うーん、覚えにくい、、、。


