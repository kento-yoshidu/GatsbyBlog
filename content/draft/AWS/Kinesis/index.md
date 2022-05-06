---
title: "AWS SAAメモ Kinesis"
postdate: "2021-06-21"
update: "2021-06-22"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "SAA", "Kinesis"]
draft: true
---

# Kinesis

ストリーミング処理用のサービス。

デフォルトで24時間、最大で7日間の保存。

## Data Streams

データ処理プログラムを構築するサービス。処理の中心、APサーバーみたいなやつ。

**シャード**単位で処理するため、高速な並列処理が可能。シャードにインスタンスを割り当てる。

## Streams

レイテンシーが低い。上がってくるデータを次々に加工しリアルタイム処理を行うのに向いている。

## Data Firehouse

データをS3やRedShiftへ配信。いったんデータをためて後から解析などを行うのに向いている。

## Data Analytics

SQLでデータを可視化、

## 参考

https://aws.amazon.com/jp/kinesis/
