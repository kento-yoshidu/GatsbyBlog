---
title: "AWS SAAメモ CloudFront"
postdate: "2021-06-21"
update: "2021-06-22"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "SAA", "CloudFront"]
draft: true
---

# CloudFront

CDNサービス

## コンテンツがない場合は？

エッジにない場合、オリジンサーバーにアクセスし、コンテンツを取得しようとする。この時、エッジサーバーにコンテンツがキャッシュされ、次回からはそれが利用される。

## 事前署名付きURL