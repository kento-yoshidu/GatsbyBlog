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


## vaccumdb

vacuumdbコマンドは不要領域を回収するコマンドです。

OSから削除するには`-f`を使用します。

`vacuumedb`コマンドは不要領域の回収のみを行いますが、`-z`ないし`--analyze`オプションを付けることで**統計情報の収集、更新**を行うことができます。`-Z`をつけると、不要領域の回収はせず、統計情報の収集、更新のみを行います（回収を行わないなんて、`vacuumdb`のオプションとしてこんなの必要か？と思うんですが）。

テーブルを指定するには`-t`オプションを使用します。

不要領域を回収するデーターベースを指定する必要があります。全てのデータベースを対象とする場合には`-a`ないし`--all`オプションを付与します。
