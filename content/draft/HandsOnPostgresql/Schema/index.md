---
title: "スキーマ"
postdate: "2020-12-23"
update: "2020-12-23"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL"]
keywords: ["PostgreSQL"]
published: false
---

# スキーマ

- データベース内のオブジェクトは必ず単一のスキーマに属する

- 各スキーマでは、他スキーマと名称の同じオブジェクトを作成することができる

- スキーマは複数のユーザに使用されることができ、ユーザも複数のスキーマを所有・操作することができる

つまり、**名前空間**のように使用することができる。

デフォルトは、データベースクラスター作成時に作成される`public`スキーマであり、スキーマを明示的に指定しない限り`public`スキーマに属することになります。

`current_schema()`で現在のスキーマを確認することができます。

```
postgres=# select current_schema();
 current_schema 
----------------
 public
(1 row)
```

テーブルはスキーマの中に作成します。

```
postgres=# create table sample_schema.sample (id INT);
CREATE TABLE
```

```
postgres=# select * from sample_schema.sample;
 id  
-----
 100
(1 row)
```

```
postgres=# select * from sample;
 id 
----
  1
  2
  3
(3 rows)
```



