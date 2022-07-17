---
title: "マテリアライズドビュー"
postdate: "2021-01-28"
update: "2021-01-28"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL"]
keywords: ["PostgreSQL", "Database", "DB", "Materialized View"]
published: false
---

# マテリアライズビュー

マテリアライズドビューとは、ビューと同じように、複雑なSQL文のSELECT結果を頻繁に取得する場合に使用する機能です。ビューは定義したSQL文で取得するデータを保持しないのに対し、マテリアライズドビューでは対象のデータをキャッシュし、実体として保持します。
ビューを定義するSQL文には、ORDER BY句やLIMIT句を使用できます。ビューに対してインデックスを作成することも可能です。

頻繁に使用する複雑なSQL文を取り回しできるのは通常のビューと同じですが、マテリアライズドビューはキャッシュとして**実体**を持ちます。

`ORDER`句や`LIMIT`句を使用できます。さらにインデックスを作成することまでできます。

## CREATE MATERIALIZED VIEW

### IF NOT EXISTS

同じ名前のマテリアライズドビューが存在している場合もエラーにならない。

### WITH DATA

マテリアライズドビュー作成時や更新時に、データを投入する。

### WITH NO DATA

反対に、データを投入しない

## ALTER MATERIALIZED VIEW

### IF EXISTS

ビューが作成されていない場合でもエラーにならない

## DROP

### IF EXISTS

ビューが作成されていない場合でもエラーにならない

### CASCADE

依存するオブジェクトも削除する

### RESTRICT

偉人するオブジェクトがある場合は、ニューを削除しない

## REFRESH

### CONCURRENTLY

マテリアライズドビューの更新中も、SELECT処理をブロックしません。

ビューの更新中、**SELECT処理を**ぶろっくしない

### WITH DATA

マテリアライズドビュー作成時に、データを投入する。

### WITH NO DATA

反対に、データを投入しない






