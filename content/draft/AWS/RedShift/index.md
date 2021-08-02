---
title: "AWS SAAメモ Redshift"
postdate: "2021-06-21"
updatedate: "2021-06-22"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "SAA", "Redshift"]
---

# Redshift

DWH、データレイク用のデータ分析サービス。**ペタバイト**まで扱うことができる。

**列志向**データモデル。Postgresと互換性がある。

**単一AZ**。

## インスタンスタイプ

### RA3

### DC2

RA3に比べて性能は低い。

## 構成

- リーダーノード: SQLクエリの発行。
- コンピューターノード: クエリの実行。キャッシュ。