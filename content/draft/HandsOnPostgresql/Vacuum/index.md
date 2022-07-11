---
title: "[PostgreSQL]バキューム"
postdate: "2021-01-28"
update: "2021-01-28"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "OSS-Silver"]
keywords: ["PostgreSQL", "Database", "DB", "OSS-Silver"]
---

# バキューム


OSから削除　→　`-f`(`--full`)。

## VACUUM

不要領域を回収するコマンドです。デフォルトでは全てのテーブルが回収の対象になります。

### FULL

不要領域をOS上から削除する。

### ANALYZE

統計情報の収集と更新を行う。

