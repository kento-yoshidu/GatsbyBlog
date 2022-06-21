---
title: "Materialized View"
postdate: "2021-03-25"
update: "2021-03-26"
SeriesName: "ハンズオンPostgreSQL"
SeriesSlug: "HandsonPostgreSQL"
tags: ["PostgreSQL", "View"]
keywords: ["PostgreSQL", "Database", "DB", "Materialized View"]
---

## マテリアライズドビュー

SQL 文を定義する。対象のデータをキャッシュし、実体として保存する。インデックスの作成が可能。

実体として保存しているため、元のテーブルのデータが更新された場合は、`REFRESH MATERIALIZED VIEW`コマンドでマテリアライズドビューの更新を行う必要がある。

## マテリアライズドビューを作成する

`CREATE

`WITH NO DATA`オプションは、ビューの作成時や更新後にデータを投入しません。

## 変更する

`IF EXISTS`オプションは、指定したビューが作成されていない場合もエラーになりません。ALTER と DROP の時に有効です。

## 削除する

`CASCADE`対象ビューに依存するオブジェクトも削除されます。

`RESTRICT`対象ビューに依存するオブジェクトがある場合は、ビューは削除されません。

## リフレッシュする

`CONCURRENTLY`ビューの更新中も、**SELECT 処理をブロックしません**。
