---
title: "マテリアライズドビュー"
postdate: "2021-01-28"
update: "2021-01-28"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsonPostgreSQL"
tags: ["PostgreSQL"]
---

# マテリアライズドニュー

## CREATE MATERIALIZED VIEW

### IF NOT EXISTS

同じ名前のマテリアライズドビューが存在している場合もエラーにならない。

### WITH DATA

マテリアライズドビュー作成時に、データを投入する。

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

CONCURRENTLY

ビューの更新中、**SELECT処理を**ぶろっくしない

### WITH DATA

マテリアライズドビュー作成時に、データを投入する。

### WITH NO DATA

反対に、データを投入しない






