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

```
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

# 正規表現

`LIKE`と`SIMILAR`演算子は文字列全体を対象に検索をかけます。つまり、`AAA`を**含む**パターンを検索したいなら、`%AAA%`とする必要があります。

```
postgres=# select * from sample where char like 'AAA';
 char
------
 AAA
(1 row)

postgres=# select * from sample where char like '%AAA%';
 char
-------
 .AAA.
 AAA
(2 rows)
```

POSIX検索パターンなら`AAA`とすると2行ともにマッチします。

```
postgres=# select * From sample where char ~ 'AAA';
 char
-------
 .AAA.
 AAA
(2 rows)
```




# fdw

> FDWというのはForeign Data Wrapperのことで、PostgreSQLのテーブルじゃないものをテーブルとして扱える、PostgreSQLの素敵機能の一つ。

https://qiita.com/nuko_yokohama/items/1044020576d3f5affb53

## postgres_fdw

|オプション|説明|
|---|---|
|fetch_size|1回のフェッチで取得する行数|
|batch_Size|1回のINSERTで症乳する行数|

https://qiita.com/mkyz08/items/c28fb1c28396cfc10e3a

# file_fdw


# レプリケーション

## ホットスタンバイ

スタンバイで読み取りが可能。データの書き換えは不可能。

RTO = 目標復旧時間。

## ストリーミングレプリケーション

データベースクラスター全体がレプリケーションされるため、データベース単位、テーブル単位などはできない。

## ロジカルレプリケーション

データの変更情報をコピーする。

## 設定

synchronous_commit = レプリケーションが同期か非同期か



## 遅延リカバリー

スタンバイサーバーへのデータ反映を遅らせる。