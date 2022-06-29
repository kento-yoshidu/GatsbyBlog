---
title: "カーソル"
postdate: "2022-07-01"
update: "2021-07-01"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "バックアップ"]
keywords: ["PostgreSQL", "cursor", "Database", "DB"]
published: true
---

## カーソルの作成

`DECLARE CURSOR`コマンドでカーソルを作成できます。

トランザクション中である必要があるため、まずは`BEGIN`でトランザクションを開始します。

最低限の文法はこれだけです。とりあえず作ってましょう。

`DECLARE sample_cursor CURSOR for SELECT * FROM sample;`

```dummy:title=console
postgres=# DECLARE sample_cursor CURSOR for SELECT * FROM sample;
DECLARE CURSOR
```

`fetch`とするだけで現在行を取得し、カーソルは自動で1つ前進します。

具体的には、`FETCH FROM sample_cursor;`と入力します。

```dummy:title=console
postgres=# FETCH FROM sample_cursor;
 id | name 
----+------
  1 | 前田
(1 row)
```

この時、カーソルは2行目に移動しています。再度`FETCH`を実行すると、2行目が取得されます。

```dummy:title=console
postgres=# FETCH FROM sample_cursor;
 id | name 
----+------
  2 | 山本
(1 row)
```

このまま`FETCH`を続けていくと、やがて最終行にカーソルが移動します。そこからはいくら`FETCH`を実行してもデータが取得されることはありません。

```dummy:title=console
postgres=# FETCH FROM sample_cursor;
 id | name 
----+------
  3 | 高橋
(1 row)

postgres=# FETCH FROM sample_cursor;
 id | name 
----+------
  4 | 大西
(1 row)

postgres=# FETCH FROM sample_cursor;
 id | name 
----+------
  5 | 山田
(1 row)

postgres=# FETCH FROM sample_cursor;
 id | name 
----+------
(0 rows)
```

カーソルを後ろに進めるには、`BACKWARD`もしくは`PRIOR`オプションを付与します。

こちらも同じく、先頭行にたどり着いた後は`FETCH`してもデータは取得されません。

```dummy:title=console
postgres=# FETCH BACKWARD FROM sample_cursor;
 id | name 
----+------
  5 | 山田
(1 row)

postgres=# FETCH BACKWARD FROM sample_cursor;
 id | name 
----+------
  4 | 大西
(1 row)

postgres=# FETCH BACKWARD FROM sample_cursor;
 id | name 
----+------
  3 | 高橋
(1 row)

postgres=# FETCH BACKWARD FROM sample_cursor;
 id | name
----+------
  2 | 山本
(1 row)

postgres=# FETCH BACKWARD FROM sample_cursor;
 id | name 
----+------
  1 | 前田
(1 row)

postgres=# FETCH BACKWARD FROM sample_cursor;
 id | name 
----+------
(0 rows)
```

## MOVE

`MOVE`コマンドはカーソル移動のみを行い、データは取得しません。

```dummy:title=console
postgres=# MOVE FROM sample_cursor;
MOVE 1

postgres=# FETCH FROM sample_Cursor;
 id | name 
----+------
  2 | 山本
(1 row)
```

### ALLで全てのデータを取得する

`ALL`オプションを付与すると、現在のカーソル位置から先の全てのデータを取得し、末尾にカーソルを移動させます。

```dummy:title=console
postgres=# FETCH ALL FROM sample_cursor;
 id | name 
----+------
  1 | 前田
  2 | 山本
  3 | 高橋
  4 | 大西
  5 | 山田
(5 rows)
```
