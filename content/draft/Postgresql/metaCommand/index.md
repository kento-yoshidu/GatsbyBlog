---
title: "PostgreSQL メタ的なコマンド(仮)"
postdate: "2021-01-28"
updatedate: "2021-01-28"
categoryName: "ハンズオンPostgreSQL"
categorySlug: "HandsonPostgreSQL"
tags: ["PostgreSQL"]
---

## DBクラスタの場所を知りたい

```postgresql
# => SHOW data_directory

    data_directory
-----------------------
 C:/workspace/postgres
(1 行)
```

## 稼働統計情報

=> pg_stat_databaseテーブル


