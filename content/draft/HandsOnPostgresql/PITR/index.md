---
title: "PITR"
postdate: "2021-01-09"
update: "2021-01-09"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
description: "PITRでデータベースを復旧する方法を学びます。"
tags: ["PostgreSQL", "バックアップ"]
keywords: ["PostgreSQL", "DB", "database"]
published: false
---

## PITR

PITRは**Point In Time Recovery**の略称で、**ベースバックアップ**と**WAL**を使用してデータベースを復旧することです。

ベースアップが完全バックアップ、WALは差分バックアップと捉えるとわかりやすいのではないでしょうか。

なお、ベースバックアップは物理バックアップであり、サーバーを起動したままバックアップを行うことができます。

> また、PITRで使用するWALはWALファイルに記録され、溜り続けていくと古いものから削除されます。そのため、WALファイルが削除されないよう、WALアーカイブとして保存する設定を行います。

リカバリー時には`recovery.conf`を作成する必要があります。

ただし、WALファイルは古いものから削除されていくので退避させる必要があります。これはWALアーカイブなどとも呼ばれます。

`postgres.conf`にはこのWALに関する項目が設けられています。一つは`wal_level`という項目です。

|項目|説明|
|---|---|
|minimal|クラッシュまたは即時停止から回復するのに必要な情報のみを書き出す|
|replica(デフォルト)|minimalの内容に加え、WALファイルのアーカイブに必要な情報を書き出す|
|logical|replicaの内容に加え、ロジカルレプリケーションに必要な情報を書き出す|

OSS-DB Silver受験に際しては、細かい内容は覚える必要はありません。覚えるべきは、**PITR（WALアーカイビング）のためにはreplicaかlogicalが設定されている必要がある**ということ、そしてデフォルトが`replica`なので管理者がこの項目を変更する必要はないということです。

続いて`archive_mode`です。これはずばり、WALファイルのアーカイブを行うかどうかという項目です。

　on … WALアーカイブを有効にする
　always … アーカイブリカバリやスタンバイモードにおいてWALアーカイブを有効にする
　off … WALアーカイブを無効にする

PITRを行うには、このarchive_modeをデフォルト値から変更する必要があります。

archive_modeはデフォルトでは**off**であるため、`on`もしくは`always`に変更する必要があります。
