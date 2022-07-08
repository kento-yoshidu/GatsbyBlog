---
title: "PostgreSQL メタ的なコマンド(仮)"
postdate: "2021-01-28"
update: "2021-01-28"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
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


