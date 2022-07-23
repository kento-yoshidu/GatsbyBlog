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

## 情報スキーマ

名前空間、もしくはカテゴリーみたいなものです。

情報スキーマは**データベースクラスターに関する情報**をかくのうしています。具体的には、沢山のテーブルとビューの集合です。

前述したとおり、標準SQLに準拠していて、他の多くのデータベースへの移植できます。

「情報スキーマ」にも「information_schema」というスキーマがあります。

例えば、全てののテーブルとビューの一覧は`information_schema.tables`ビューを参照することで確認できます。`SELECT table_name FROM information.schema.tables`とし、テーブル名一覧を取得してみます。

```dummy
postgres=# SELECT table_name FROM information_schema.tables;
              table_name
---------------------------------------
 sample
 zooa
 sample2
 sample
 pg_statistic
 pg_type
 animal
 pg_foreign_server
 pg_authid
 pg_shadow
 pg_statistic_ext_data
 pg_roles
 pg_settings
# 以下略
```

なお、情報スキーマの閲覧に権限は必要ありません。


## システムカタログ

情報スキーマに対してシステムカタログはPostgreSQL固有の情報を含むテーブルのことです。

スキーマ名はsystem_catalog、、、ではなく、`pg_catalog`です。`pg_catalog.pg_tables`テーブルを参照することで、テーブル一覧を取得することができます。





