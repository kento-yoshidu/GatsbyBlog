---
title: プリペアド文を作成する
postdate: "2021-01-05"
update: "2020-01-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsonPostgreSQL"
tags: ["PostgreSQL", "PREPARE"]
---

まずはテーブルを用意します。

```sql
sample=# CREATE TABLE test_table (id INT, name TEXT);
CREATE TABLE

sample=# INSERT INTO test_table VALUES(1, 'takashi');
sample=# INSERT INTO test_table VALUES(2, 'keiko');
sample=# INSERT INTO test_table VALUES(3, 'ryo');
sample=# INSERT INTO test_table VALUES(4, 'takashi');

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
sample=# CREATE OR REPLACE FUNCTION test_func(TEXT)
          RETURNS VARCHAR AS
          $$
            SELECT name FROM test_Table
            WHERE name = $1;
          $$
          LANGUAGE SQL;

sample=# \df
                             関数一覧
 スキーマ |   名前    |  結果のデータ型   | 引数のデータ型 |  型
----------+-----------+-------------------+----------------+------
 public   | test_func | character varying | text           | 関数
(1 行)
```

 - [OR REPLACE]オプションを付与し、既に同じ名前の関数があった場合に置き換えるように設定しています。
 - 関数名は`test_func`としました。また、引数のデータ型はTEXTとしました。
 - 

```
sample=# CREATE OR REPLACE FUNCTION test_func2(TEXT)
      RETURNS SETOF VARCHAR AS
    $$
      SELECT name FROM test_Table
      WHERE name = $1;
    $$
      LANGUAGE SQL;
```






