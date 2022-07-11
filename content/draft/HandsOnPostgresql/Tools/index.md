---
title: "[PostgreSQL]付属ツール"
postdate: "2020-12-12"
update: "2020-12-12"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
description: "test"
tags: ["PostgreSQL", "pg_ctl"]
keywords: ["PostgresQL", "OSS-DB", "資格"]
published: false
---


## createdb

createdbコマンドを使って新しいデータベースを作成することができます。

```dummy
# createdb -U myuser testdb
```

特にメッセージは表示されません。`psql -l`でデータベース一覧を確認してみます。

```dummy
# psql -l
                              List of databases
   Name    | Owner  | Encoding |  Collate   |   Ctype    | Access privileges 
-----------+--------+----------+------------+------------+-------------------
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres        +
           |        |          |            |            | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres        +
           |        |          |            |            | postgres=CTc/postgres
 testdb    | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
(5 rows)
```

`dropdb`コマンドでデータベースを削除することができます。書式は`dropdb [データベース名]`です。

```dummy
# dropdb testdb
```

### createdbのオプション

|オプション|説明|
|---|---|
|-E, --encoding|エンコーディングを指定する|
|-O, --owner|データベースの所有者を指定する|
|-l, --locale|ロケールを指定する|
|-T, --template|テンプレートを指定する|

ロケールを指定する`-l`が大文字のLではないところが嫌らしいですね。何度か手打ちしていれば覚えてしまえますが。


