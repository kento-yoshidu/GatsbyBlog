---
title: "CRUD"
postdate: "2023-01-01"
update: "2023-01-01"
seriesName: "CPU"
seriesSlug: "CPU"
tags: ["CPU", "命令セット"]
keywords: ["CPU"]
published: false
---


CREATE USERは接続権限あり、 CREATE ROLEはないため、`CREATE ROLE [ユーザー名] WITH LOGIN`とします。


## GRANT

>・SELECTとCOPY TOの実行を許可する(SELECT)
> ・INSERTとCOPY FROMの実行を許可する(INSERT)
> ・UPDATEの実行を許可する(UPDATE)
> ・DELETEの実行を許可する(DELETE)
> ・TRUNCATEの実行(テーブルの全データを高速で削除)を許可する(TRUNCATE)
> ・外部キー制約を作成することを許可する(REFERENCES)
> ・トリガーの作成を許可する(TRIGGER)
> ・データベースへの接続を許可する(CONNECT)
> ・データベースに対するスキーマの作成を許可する(CREATE)
> ・スキーマに対するオブジェクトの作成を許可する(CREATE)

スキーマ・トリガー・外部キー

## テーブルの継承

> 「sample1」テーブルの定義を引き継いだ「sample2」テーブルを作成することが読み取れます。

CREATE TABLE sample2 (tel CHAR(11)) INHERITS (sample1);

## ラージオブジェクト


# 副問い合わせ

SELECT句を使用した副問い合わせの場合、1列、結果は1件のみ。

```
postgres=# SELECT (SELECT * FROM sample);
ERROR:  subquery must return only one column
LINE 1: select (select * from sample);
```

```
postgres=# select (select id from sample);
ERROR:  more than one row returned by a subquery used as an expression
```

```
postgres=# select (select id from sample where id = 1);
 id
----
  1
(1 row)
```


```
postgres=# insert into sample values (10);
ERROR:  new row for relation "sample" violates check constraint "num_check"
DETAIL:  Failing row contains (10).
```

```
postgres=# insert into sample values (9);
INSERT 0 1
```

https://zukucode.com/2017/09/sql-subquery-select.html
