---
title: PREPARE文2
postdate: "2021-01-05"
update: "2020-01-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsonPostgreSQL"
tags: ["PostgreSQL", "PREPARE"]
---

## `PREPARE`でプリペアド文を定義する

なんでもいいですが、以下のようなテーブルがあるとします。

```
postgres=# SELECT * FROM prepare;
 id |  name
----+---------
  1 | takashi
  2 | keiko
  3 | hiroshi
(3 行)
```

`PREPARE 名前 (引数のデータ型) AS 問い合わせ;`

## `EXECUTE`で実行する

以下は数値型の値を引数にとり、WHERE句で絞り込みをかけています。

```
postgres=# PREPARE prepare_state (INT) AS
              SELECT * FROM prepare
            WHERE id = $1;

postgres=# EXECUTE prepare_state(1);
 id |  name
----+---------
  1 | takashi
(1 行)


postgres=# EXECUTE prepare_state(2);
 id | name
----+-------
  2 | keiko
(1 行)


postgres=# EXECUTE prepare_state(3);
 id |  name
----+---------
  3 | hiroshi
(1 行)
```

もちろん、引数を複数とることもできます。\$1、\$2...と続く。

```
postgres=# PREPARE prepare_state (INT, TEXT) AS
                  SELECT * FROM prepare
              WHERE id = $1 AND name = $2;

postgres=# EXECUTE prepare_state(1, 'takashi');
 id |  name
----+---------
  1 | takashi
(1 行)

postgres=# EXECUTE prepare_state(2, 'takashi');
 id | name
----+------
(0 行)

```

DEALLOCATE文で削除

`DEALLOCATE prepare_state`
