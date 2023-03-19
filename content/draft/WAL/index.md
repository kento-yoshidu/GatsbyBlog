---
title: "WAL"
postdate: "2021-01-09"
update: "2021-01-09"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandSonPostgreSQL"
tags: ["PostgreSQL", "バックアップ", "OSS-DB Silver"]
keywords: ["PostgreSQL", "Database", "DB", "OSS DB Silver"]
published: false
---

# GUC

Grand Unified Configureationの略。動的に変更できるパラメーターを管理するモジュール。

# WAL


WAL(Write Ahead Log)。

いったんwalファイルに書き出し、何らかの契機にディスクに書き込む。ディスクに書き込まれて時点でデータが永続化されることになる。

例えばテーブルを更新するSQLコマンドが発行されたとして、その内容がいきなりディスクに書き込まれるかと言えばそうではなく、まずはログファイルに書き出され、その後にディスクに書き込まれます。間に1ステップ挟まっている感じですね。

https://changineer.info/server/postgresql/postgresql_wal.html
