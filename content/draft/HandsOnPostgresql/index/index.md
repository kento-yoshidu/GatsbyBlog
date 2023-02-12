---
title: "インデックス"
postdate: "2020-12-23"
update: "2020-12-23"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL"]
---

# インデックス

PostgreSQLのインデックスは、

- B-Tree
- GiST
- Hash

のデータ構造を取り、基本的にはB-Treeがたが採用されます。

## 単一カラムのインデックス

`CREATE INDEX [インデックス名] ON [テーブル名] ([カラム名])`という形でインデックスを作成します。

```
postgres=# \d sample;
                       テーブル"public.sample"
  列  |        タイプ         | 照合順序 | Null 値を許容 | デフォルト
------+-----------------------+----------+---------------+------------
 id   | integer               |          |               |
 name | character varying(20) |          |               |
```

```
postgres=# CREATE INDEX sample_index ON sample (id);
CREATE INDEX
```

`\d テーブル名`でテーブル情報を確認してみます。

```
postgres=# \d sample;
                       テーブル"public.sample"
  列  |        タイプ         | 照合順序 | Null 値を許容 | デフォルト
------+-----------------------+----------+---------------+------------
 id   | integer               |          |               |
 name | character varying(20) |          |               |
インデックス:
    "sample_index" btree (id)
```

なお、インデックス名は省略可能です。省略した場合はPostgreSQLが良い感じにインデックス名を付与してくれます。

```
postgres=# CREATE INDEX ON sample (id);
CREATE INDEX
```

インデックスの種類を指定しないと、B-treeインデックスが採用されます。

https://www.dbonline.jp/postgresql/index/index1.html

[PostgreSQLのインデックスについて理解する - Qiita](https://qiita.com/t-shmp/items/cd82b73b2cbb488a812e)

