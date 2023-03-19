---
title: "[PostgreSQL]プロセス"
postdate: "2021-01-05"
update: "2020-01-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "PREPARE"]
keywords: ["PostgreSQL"]
published: false
---

# 各種プロセス

`pg_ctl`にオプションを渡すことでPostgreSQLプロセスを停止することができます。


|シグナル名|特徴|
|---|---|
|TERM|smartシャットダウンと同様、全てのクライアントの切断を待ってからプロセスを停止する|
|INT|fastシャットダウンと同様、接続を終了させ、ロールバックを行ったうえでプロセスを停止する|
|QUIT|immediateシャットダウンと同様、即座に強制的にプロセスを停止する。次回起動時に回復処理を行う|

それぞれのシグナル名から挙動を連想しにくくとても覚えにくいですが、3種類しかないので根性で覚えましょう。

|プロセス名|説明|
|---|---|
|スタートアップ|PostgreSQL起動時、クラッシュリカバリー処理を行う|
|WALライター|WALバッファをWALファイルに書き出す|
|WALセンダー|レプリケーション時、スレーブWALを転送する|