---
title: "その他"
postdate: "2021-01-09"
update: "2021-01-09"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
description: "PITRでデータベースを復旧する方法を学びます。"
tags: ["PostgreSQL", "バックアップ"]
keywords: ["PostgreSQL", "DB", "database"]
published: false
---

## 情報スキーマとシステムカタログ

ともに、データベースクラスターに関する情報を参照することができます。

情報スキーマは標準SQL規格に準拠しています。対してシステムカタログはPostgreSQL独自のフォーマットで出力されます。

テーブル一覧は`tables`ビューが用意されていますので、`information_schema.tables`としアクセスします。
