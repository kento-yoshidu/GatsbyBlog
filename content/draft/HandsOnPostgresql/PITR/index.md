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

|関数|説明|例|
|---|---|---|
|now()|現在の**トランザクション**の日時|2022-01-01 00:00:00.000000+09|
|current_timestamp|同上|2022-01-01 00:00:00.000000+09|
|statement_timestamp()|現在の**文**の開始日時|
|clock_timestamp()|実際の日時|2022-01-01 00:00:00.000000+09|
|current_date|現在の**トランザクション**の開始日|


```dummy:title=console
postgres=# select now();
              now
-------------------------------
 2022-07-08 20:26:15.239435+09 
(1 row)
```

```dummy:title=console
postgres=# select statement_timestamp();
      statement_timestamp      
-------------------------------
 2022-07-08 20:28:54.733503+09
(1 row)
```

```dummy:title=console
postgres=# select current_date;
 current_date 
--------------
 2022-07-08
(1 row)
```

```dummy
