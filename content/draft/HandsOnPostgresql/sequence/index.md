---
title: "シーケンス"
postdate: "2020-12-23"
update: "2020-12-23"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL"]
keywords: ["PostgreSQL"]
published: false
---

# シーケンス

連番を振ってくれます。idなどに使用できます。

`CREATE SEQUENCE [シーケンス名]`で作成できます。

```
postgres=# CREATE SEQUENCE sample_seq; 
CREATE SEQUENCE
```

`\ds`コマンドで簡易的にシーケンス一覧を確認することができます。

```
postgres=# \ds
               リレーション一覧
 スキーマ |    名前    |   タイプ   |  所有者
----------+------------+------------+----------
 public   | sample_seq | シーケンス | postgres
(1 行)
```

また、`pg_sequences`テーブルにはより詳細なシーケンスに関する情報が記載されています。

```
postgres=# SELECT * FROM pg_sequences;
 schemaname | sequencename | sequenceowner | data_type | start_value | min_value |      max_value      | increment_by | cycle | cache_size | last_value
------------+--------------+---------------+-----------+-------------+-----------+---------------------+--------------+-------+------------+------------
 public     | sample_seq   | postgres      | bigint    |           1 |         1 | 9223372036854775807 |            1 | f     |          1 |
(1 行)
```

特に指定しない限り、初期値は`1`です。

## `nextval()`で連番を取り出す

`nextval([シーメンス名])`とすることで、次のシーケンス値を取得することができます。`SELECT`文を使って表示させてみましょう。

```
postgres=# select nextval('sample_seq');
 nextval
---------
       1
(1 行)
```

`last_value`カラムの値がNULLから`1`に変化していることがわかります。

```
postgres=# select * from pg_sequences;   
 schemaname | sequencename | sequenceowner | data_type | start_value | min_value |      max_value      | increment_by | cycle | cache_size | last_value
------------+--------------+---------------+-----------+-------------+-----------+---------------------+--------------+-------+------------+------------
 public     | sample_seq   | postgres      | bigint    |           1 |         1 | 9223372036854775807 |            1 | f     |          1 |          1
(1 行)
```

再度実行すれば`2`を取り出すことができます。

```
postgres=# select nextval('sample_seq');
 nextval
---------
       2
(1 行)
```

試しにテーブルに挿入してみます。

```
postgres=# CREATE TABLE sample (id INT, name VARCHAR(10));
CREATE TABLE

postgres=# INSERT INTO sample VALUES (nextval('sample_seq'), '高橋');
INSERT 0 1 
```

```
postgres=# select * from sample;
 id | name
----+------
  3 | 高橋
(1 行)
```

なお、現在のシーケンス値は`currval()`で取得することができます。ただし、シーケンスの作成後、`nextval()`を実行する前に`currval()`を実行するとエラーになります。

## `setval()`で任意の値をシーケンスにセットする

```
postgres=# select setval('sample_seq', 100); 
 setval
--------
    100
(1 行)
```

```
postgres=# select currval('sample_seq');
 currval
---------
     100
(1 行)
```

```
postgres=# insert into sample values (currval('sample_seq'), '荻野目');
INSERT 0 1
postgres=# select * from sample;
 id  |  name
-----+--------
   3 | 高橋
 100 | 荻野目
(2 行)
```

## シーケンスを削除する

`DROP SEQUENCE [シーケンス名]`でシーケンスを削除することができます。


## 上限値、下限値、初期値を決める

次に上限値を設定してみます。

上限値の3を超えた時にはエラーが発生します。

```
postgres=# insert into sample values (nextval('sample_seq'));
ERROR:  nextval: reached maximum value of sequence "sample_seq" (3)
```


次に、初期値を設定してみます。

```
postgres=# create sequence sample_seq start 100;
CREATE SEQUENCE
postgres=# select nextval('sample_seq');
 nextval 
---------
     100
(1 row)
```

## CACHE

> メモリに格納できるシーケンス番号の量を指定。

## CYCLE

```
postgres=# insert into sample values(nextval('sample_seq'));
INSERT 0 1
postgres=# insert into sample values(nextval('sample_seq'));
INSERT 0 1
postgres=# insert into sample values(nextval('sample_seq'));
INSERT 0 1
postgres=# insert into sample values(nextval('sample_seq'));
INSERT 0 1
postgres=# insert into sample values(nextval('sample_seq'));
INSERT 0 1
postgres=# select * from sample;
 id 
----
  1
  2
  3
  1
  2
```

## 参考

https://qiita.com/jiyu58546526/items/3edf794cc29dc05f364e
