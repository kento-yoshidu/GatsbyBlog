---
title: "AWSメモ"
postdate: "2022-01-07"
update: "2022-01-07"
seriesName: "メモ"
seriesSlug: "Memo"
description: "メモ"
tags: ["Memo"]
keywords: ["Memo"]
published: false
---

## Aurora

> Aurora のストレージシステムは、分散型で耐障害性と自己修復機能を備えており、<mark>コンピューティングリソースから切り離され</mark>、データベースインスタンスごとに<mark>最大 128 TB まで自動的にスケールアップされます</mark>。

> <mark>最大 15 個の低レイテンシーリードレプリカ</mark>、ポイントインタイムリカバリ、Amazon Simple Storage Service (Amazon S3) への継続的なバックアップ、<mark>3つのアベイラビリティーゾーン (AZ) 間でのレプリケーション</mark>により、優れたパフォーマンスと可用性を発揮します。

> Amazon Aurora DB インスタンスでは常に自動バックアップが有効です。

> スナップショットを作成する際にパフォーマンスに影響はありません。DB スナップショットからデータを復元する場合は新しく DB インスタンスを作成する必要があることに注意してください。

> Amazon Aurora では、3 つのアベイラビリティーゾーン (AZ) に 6 つのデータコピーが自動的に保持され、データ損失のない正常なアベイラビリティーゾーンのデータベースの復旧が自動的に試みられます。

> Amazon Aurora は、DB インスタンスが削除された後も、このユーザーが作成した最終的な DB スナップショットと手動で作成されたその他の DB スナップショットをすべて保持します。

> スナップショットは別の AWS アカウントと共有でき、受取人アカウントの所有者は、そのスナップショットを使用して、お客様のデータを含む DB を復元できます。

> 1 秒未満という一般的なレイテンシーを特徴とする最大 5 つのセカンダリリージョンにレプリケートできます。

[よくある質問 - Amazon Aurora | AWS](https://aws.amazon.com/jp/rds/aurora/faqs/)

## ECS

> 今までECS TaskでIAMロールを利用する場合は、EC2インスタンスに付与したIAMロールを利用していました。

> 今回のアップデートで、ECS上のTask(コンテナ)単位でIAMロールを付与できるようになりました。これにより、Taskに対して最小限の権限を付与することができます。

[[アップデート]ECS TaskにIAMロールを付与することができるようになりました | DevelopersIO](https://dev.classmethod.jp/articles/20160715-ecs-task-iam-role/)

