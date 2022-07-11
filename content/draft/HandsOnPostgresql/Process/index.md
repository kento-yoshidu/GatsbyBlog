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

# 

`pg_ctl`にオプションを渡すことでPostgreSQLプロセスを停止することができます。


|シグナル名|特徴|
|---|---|
|TERM|smartシャットダウンと同様、全てのクライアントの切断を待ってからプロセスを停止する|
|INT|fastシャットダウンと同様、接続を終了させ、ロールバックを行ったうえでプロセスを停止する|
|QUIT|immediateシャットダウンと同様、即座に強制的にプロセスを停止する。次回起動時に回復処理を行う|

それぞれのシグナル名から挙動を連想しにくくとても覚えにくいですが、3種類しかないので根性で覚えましょう。
