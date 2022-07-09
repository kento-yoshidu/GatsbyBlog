---
title: "ハンズオンPostgreSQL はじめに"
postdate: "2020-12-23"
update: "2020-12-23"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL"]
---

# 日付を取得する関数

6種類あります。

`timestamp`とつく関数と`now()`関数の4つは**日時**を返し、それ以外はそれぞれ日付と時刻を返します。

|関数|説明|例|
|---|---|---|
|now()|現在の**トランザクション**の日時|2022-01-01 00:00:00.000000+09|
|current_timestamp|同上|2022-01-01 00:00:00.000000+09|
|statement_timestamp()|現在の**文**の開始日時|
|clock_timestamp()|実際の日時|2022-01-01 00:00:00.000000+09|
|current_date|現在の**トランザクション**の開始日|
|current_Time|現在のトランザクションの開始時間|


```dummy:title=console
postgres=# select now();
              now
-------------------------------
 2022-07-08 20:26:15.239435+09 
(1 row)
```

```dummy:title=console
postgres=# select statement_timestamp();
      statement_timestamp      
-------------------------------
 2022-07-08 20:28:54.733503+09
(1 row)
```

```dummy:title=console
postgres=# select current_date;
 current_date 
--------------
 2022-07-08
(1 row)
```

```dummy
postgres=# select current_time;
    current_time    
--------------------
 13:13:45.116368+09
(1 row)
```

