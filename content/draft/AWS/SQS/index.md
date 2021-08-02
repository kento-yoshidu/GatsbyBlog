---
title: "AWS SAAメモ サーバーレス(SQS)"
postdate: "2021-06-24"
updatedate: "2021-06-24"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "SAA", "AWS SQS"]
---

# AWS SQS

Amazon Simple Queue Serviceの略。

メッセージのキューを提供するサービス。非同期処理を実現できる。サービス同士を**疎結合**に緩くつなぐ。フルマネージドサービス。

キューはKMSで暗号化される。

## 用語の整理

- メッセージ = サービスが送受信するデータ
- キュー = SQS上のメッセージを保持するキュー
- ポーリング = キューを呼び出すこと
- プロデューサー キューにメッセージを入れるサービス
- コンシューマー キューからメッセージを取り出すサービス

## 処理の流れ

1 送信側は、SQSに向けてメッセージを送信する。
2 SQSは送信内容を**requestキュー**として保持する。
3 受信側は、SQSに問い合わせて保存されているrequestキューを取り出す。この取り出す動作を**ポーリング**とおいう。これは受信側の任意のタイミングで行える。
4 受信側がデータを返信するとSQSは**responseキュー**として保持する。
5 送信側も任意のタイミングでSQSからresponseキューをポーリングする。

キューは複数のサーバーに分散して保存されるため障害に強い。

メッセージのサイズは256KBまで。Extended Client Libraryオプションなら2GBまで。

## キューのタイプ

### スタンダートキュー

キューはランダムに保存される。取り出すときもランダムに取得される。処理の順番は保証されないが、1回以上の配信が行われ確実にメッセージを届けることができる。

データのバックアップなどに利用。

### FIFOキュー

そのまま。順序が保証される。1回のみの配信。

### ライフサイクル

ポーリングされてもキューはすぐには削除されない。そもそも**SQSはキューの削除を行わず**、一定期間はSQS上に残っている。削除するのはコンシューマである。「可視性タイムアウト」。二重取得を防止するため。非同期なので送受信が上手くいったかを確かめられないため。

デフォルトでは30秒。


https://business.ntt-east.co.jp/content/cloudsolution/column-135.html

https://qiita.com/UpAllNight/items/7c5022661a1eadc8a88a

https://www.fenet.jp/aws/column/aws-beginner/299/

https://www.acrovision.jp/service/aws/?p=2910

https://qiita.com/taka_22/items/718ec340a710bbf5e3d0

https://ya6mablog.com/aws-sqs/


