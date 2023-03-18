---
title: "組み込みビュー"
postdate: "2022-07-05"
update: "2022-07-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
description: "PostgreSQLの関数機能について説明します。"
tags: ["PostgreSQL", "組み込みビュー"]
keywords: ["PostgreSQL", "View", "ビュー", "組み込み"]
published: false
---

## pg_stat_database

データベース全体の統計情報。

## pg_stat_ssl

接続、またはWALプロセスごとに1行出力される。

|列|意味|
|---|---|
|pid|プロセスID|
|cipher|SSL暗号の名前|
|bits|暗号アルゴリズムのビット数|
|ssl|SSLが使用されているか(真偽値)|

## track_activities

サーバープロセス。

## trust_functions

ユーザー定義関数


