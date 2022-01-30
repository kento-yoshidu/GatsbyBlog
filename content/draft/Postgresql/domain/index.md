---
title: ドメイン
postdate: "2021-01-09"
update: "2021-01-09"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsonPostgreSQL"
tags: ["PostgreSQL","ドメイン"]
---

`CREATE DOMAIN ドメイン名 AS データ型`


```shell
postgres=# CREATE DOMAIN test_domain AS INT;
CREATE DOMAIN

postgres=# \dD
                                     ドメイン一覧
 スキーマ |    名前     |   型    | 照合順序 | Null 値を許容 | デフォルト | CHECK制約
----------+-------------+---------+----------+---------------+------------+-----------
 public   | test_domain | integer |          |               |            |
(1 行)
```

```shell
postgres=# CREATE TABLE test_table (id test_domain, name TEXT);
CREATE TABLE

postgres=# \d test_table
                テーブル"public.test_table"
  列  |     型      | 照合順序 | Null 値を許容 | デフォルト
------+-------------+----------+---------------+------------
 id   | test_domain |          |               |
 name | text        |          |               |
```

```shell
postgres=# INSERT INTO test_table VALUES (1, 'test');
INSERT 0 1

postgres=# INSERT INTO test_table VALUES ('hoge', 'test');
ERROR:  invalid input syntax for type integer: "hoge"
行 1: INSERT INTO test_table VALUES ('hoge', 'test');
```

```shell
postgres=# CREATE DOMAIN test_domain2 AS INT NOT NULL DEFAULT 10;
CREATE DOMAIN

postgres=# \dD
                                     ドメイン一覧
 スキーマ |     名前     |   型    | 照合順序 | Null 値を許容 | デフォルト | CHECK制約
----------+--------------+---------+----------+---------------+------------+-----------
 public   | test_domain  | integer |          |               |            |
 public   | test_domain2 | integer |          | not null      | 10         |
(2 行)
```

```shell
postgres=# CREATE DOMAIN test_domain2 AS INT NOT NULL DEFAULT 10;
CREATE DOMAIN
postgres=# \dD
                                     ドメイン一覧
 スキーマ |     名前     |   型    | 照合順序 | Null 値を許容 | デフォルト | CHECK制約
----------+--------------+---------+----------+---------------+------------+-----------
 public   | test_domain  | integer |          |               |            |
 public   | test_domain2 | integer |          | not null      | 10         |
(2 行)


postgres=# CREATE TABLE test_table2 (id test_domain2, name TEXT);
CREATE TABLE
postgres=# INSERT INTO (name) test_Table2 VALUES ('test');
ERROR:  syntax error at or near "("
行 1: INSERT INTO (name) test_Table2 VALUES ('test');
                  ^
postgres=# INSERT INTO test_Table2 (name) VALUES ('test');
INSERT 0 1
postgres=# SELECT * FROM test_table2;
 id | name
----+------
 10 | test
(1 行)
```

https://www.postgresql.jp/document/12/html/domains.html
