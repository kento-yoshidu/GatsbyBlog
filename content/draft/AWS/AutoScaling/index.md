---
title: "AWS SAAメモ Auto Scaling"
postdate: "2021-06-21"
update: "2021-06-22"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "SAA", "CloudFront"]
draft: true
---

## 

閾値を超えてもスケーリングが何らかの事情で機能しない場合、30時間たつとAuto Scalingが停止する。

## ライフサイクルフック

インスタンスの起動時または終了時に任意の処理を実行できる。