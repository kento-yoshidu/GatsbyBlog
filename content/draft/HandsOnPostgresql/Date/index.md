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


```
postgres=# select now();
              now
-------------------------------
 2022-07-08 20:26:15.239435+09 
(1 row)
```

```
postgres=# select statement_timestamp();
      statement_timestamp      
-------------------------------
 2022-07-08 20:28:54.733503+09
(1 row)
```

```
postgres=# select current_date;
 current_date 
--------------
 2022-07-08
(1 row)
```

```
postgres=# select current_time;
    current_time    
--------------------
 13:13:45.116368+09
(1 row)
```


## `age`で日付の差分を求める

`age`を使用すれば、日付の差分を求めることができます。`Date`型、もしくは`TIMESTAMP`型を2つ引数にとります。

### DATE型

`DATE`型であれば、`DATE '日付'`もしくは`'日付'::DATE`という風に指定します。

```
postgres=# SELECT age(DATE '20221003', DATE '20220101');
      age      
---------------
 9 mons 2 days
(1 row)
```

`古い, 新しい`の順で実行すると、マイナスの値を得ることができます。

```
postgres=# SELECT age(DATE '20220101', DATE '20221003');
       age       
-----------------
 -9 mons -2 days
(1 row)
```

### TIMESTAMP型

```
postgres=# select age(now(), timestamp '20210101');
                 age
-------------------------------------
 1 year 6 mons 9 days 13:09:15.12121
(1 row)
```

## インターベル値から特定のフィールド値を取り出す


`extract(フィールド from interval 'インターバル値')`

`date_part('フィールド', interval 'インターバル値')`

```
postgres=# SELECT extract (day from interval '2 years 9 mons 2 days');
 date_part 
-----------
         2
(1 row)
```

```
postgres=# SELECT extract (mon from interval '2 years 9 mons 2 days');
 date_part 
-----------
         9
(1 row)
```

```
postgres=# SELECT extract (year from interval '2 years 9 mons 2 days');
 date_part 
-----------
         2
(1 row)
```


`date_part`

```
postgres=# select date_part('day', interval '2 years 0 mons 2 days');
 date_part 
-----------
         2
(1 row)
```
