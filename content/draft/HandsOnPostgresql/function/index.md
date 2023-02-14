---
title: "関数を作成する"
postdate: "2022-07-05"
update: "2022-07-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
description: "PostgreSQLの関数機能について説明します。"
tags: ["PostgreSQL"]
keywords: ["PostgreSQL", "function", "関数"]
published: false
---

# 関数

まずはテーブルを用意します。

```sql:title=console
postgres=# CREATE TABLE test_table (id INT, name TEXT);
CREATE TABLE

postgres=# INSERT INTO test_table VALUES(1, 'takashi');
postgres=# INSERT INTO test_table VALUES(2, 'keiko');
postgres=# INSERT INTO test_table VALUES(3, 'ryo');
postgres=# INSERT INTO test_table VALUES(4, 'takashi');

sample=# SELECT * FROM test_table;
 id |  name
----+---------
  1 | takashi
  2 | keiko
  3 | ryo
  4 | takashi
(4 行)
```

## `CREATE FUNCTION`コマンドで関数を定義する

`CREATE FUNCTION`の構文は以下の通りです。[青文字]の部分がオプションです。

![sql1.png](./sql1.png)

今回は引数に文字列を指定し、nameカラムと一致する行を返す関数を定義します。まずはこの通り作成してみてください。
引数に渡した値は`$n`で表し、`WHERE name = $1`といった感じで絞り込みます。
また、作成した関数は`\df`コマンドで確認します。

```sql
postgres=# CREATE OR REPLACE FUNCTION test_func(TEXT)
          RETURNS VARCHAR AS
          $$
            SELECT name FROM test_Table
            WHERE name = $1;
          $$
          LANGUAGE SQL;

postgres=# \df
                             関数一覧
 スキーマ |   名前    |  結果のデータ型   | 引数のデータ型 |  型
----------+-----------+-------------------+----------------+------
 public   | test_func | character varying | text           | 関数
(1 行)
```

- [OR REPLACE]オプションを付与し、既に同じ名前の関数があった場合に置き換えるように設定しています。
- 関数名は`test_func`としました。また、引数のデータ型はTEXTとしました。

```
postgres=# CREATE OR REPLACE FUNCTION test_func2(TEXT)
      RETURNS SETOF VARCHAR AS
    $$
      SELECT name FROM test_Table
      WHERE name = $1;
    $$
      LANGUAGE SQL;
```

では呼び出してみます。

`DROP FUNCTION [関数名]([引数名])`で関数を削除します。

> `SETOF`オプションが設定されているため、戻り値が複数ある場合は複数件返されます。また、`STRICT`オプションが設定されているため、引数に`NULL`が含まれる場合は処理を実行せずにNULLを返します。
