---
title: "【PostgreSQL】POITRによるバックアップと復元"
postdate: "2022-06-10"
update: "2022-06-10"
seriesName: "その他"
seriesSlug: "Others"
description: "PostgreSQLのPITRをハンズオン形式で学びます。"
tags: ["PostgreSQL", "PITR"]
keywords: ["PostgreSQL", "PITR", "DB", "Database"]
published: false
---

## 用語の整理

### PITR

PITRは、Point In Time Recoveryの略で、バックアップとリストアーの手法の一つです。PostgreSQLにおいては、データベースのある時点のスナップショット（これを**ベースバックアップ**といいます）と、そこからのトランザクションログ（**WAL**といいます）をバックアップし、障害時にリストアに利用する方法をさします。

いわゆる完全バックアップと増分バックアップの関係と似ていますね。

## WALアーカイブの設定


## 参考

[1.63_Silverの例題解説「運用管理 - バックアップ方法(ポイントインタイムリカバリ(PITR)の概念と手順)」](https://oss-db.jp/sample/silver_management_04/63_160419)

[PostgreSQL WALログの仕組みとタイミングを理解したい - SIerだけど技術やりたいブログ](https://www.kimullaa.com/entry/2019/10/28/000000)

[【PostgreSQL 12】指定した時間までリカバリするPITR - Qiita](https://qiita.com/yaju/items/51e7b1037a99856e547c)

https://changineer.info/server/postgresql/postgresql_wal.html
