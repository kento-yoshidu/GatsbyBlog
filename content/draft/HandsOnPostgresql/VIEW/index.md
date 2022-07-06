---
title: "ビュー"
postdate: "2021-01-28"
update: "2021-01-28"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "OSS-Silver"]
keywords: ["PostgreSQL", "Database", "DB", "OSS-Silver"]
---

# ビュー

`CREATE [OR REPLACE] RULE ルール名 AS ON イベント TO テーブル名 DO 元の処理の扱い {実行するSQL文 | NOTHING};`

## CREATE

`CREATE VIEW [ビュー名] AS 検索処理`でビューを作成します。

```dummy:title=console
postgres=# CREATE VIEW sample_view AS SELECT * FROM sample;
CREATE VIEW
```

`pg_views`テーブルを参照することでビューを確認することができます。なお、`pg_views`テーブルにはクラスター作成時点から大量のレコードが存在しているので、`viewname`カラムで絞りましょう。

```dummy:title=console
postgres=# SELECT * FROM pg_views WHERE viewname = 'sample_view';

 schemaname |  viewname   | viewowner |    definition     
------------+-------------+-----------+-------------------
 public     | sample_view | myuser    |  SELECT sample.id+
            |             |           |    FROM sample;
(1 row)
```

```dummy:title=console
postgres=# select * from sample_view;
 id 
----
  1 
  2
  3
(3 rows)
```

## 権限について

ビューの作成には参照先のテーブルの**SELECT権限**が必要です。

ただ、ビューの参照にはビューのSELECT権限が必要なのはもちろんですが、参照元テーブルのSELECT権限は必要ありません。


## ビューに対して出来る操作

基本的にビューに対してはSELECT文の実行しかできません。しかし、以下の2つの条件を満たせば更新処理を行うことができます。

- 複数テーブルの結合を行っていない
- 集約関数を使用していない

さらに、上記の条件を満たしていなくても**ルール**というものを作成することで更新処理を行うことができます。

ここからは実際に更新処理を行ってみたいと思います。

## ルールの作成

CREATE [OR REPLACE] RULE ルール名 AS ON イベント TO テーブル/ビュー名 DO 元の処理の扱い {実行するSQL文 | NOTHING};