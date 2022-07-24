---
title: "CRUD"
postdate: "2023-01-01"
update: "2023-01-01"
seriesName: "CPU"
seriesSlug: "CPU"
tags: ["CPU", "命令セット"]
keywords: ["CPU"]
published: false
---


CREATE USERは接続権限あり、 CREATE ROLEはないため、`CREATE ROLE [ユーザー名] WITH LOGIN`とします。


## GRANT

>・SELECTとCOPY TOの実行を許可する(SELECT)
> ・INSERTとCOPY FROMの実行を許可する(INSERT)
> ・UPDATEの実行を許可する(UPDATE)
> ・DELETEの実行を許可する(DELETE)
> ・TRUNCATEの実行(テーブルの全データを高速で削除)を許可する(TRUNCATE)
> ・外部キー制約を作成することを許可する(REFERENCES)
> ・トリガーの作成を許可する(TRIGGER)
> ・データベースへの接続を許可する(CONNECT)
> ・データベースに対するスキーマの作成を許可する(CREATE)
> ・スキーマに対するオブジェクトの作成を許可する(CREATE)

スキーマ・トリガー・外部キー

## テーブルの継承


> 「sample1」テーブルの定義を引き継いだ「sample2」テーブルを作成することが読み取れます。

CREATE TABLE sample2 (tel CHAR(11)) INHERITS (sample1);

## ラージオブジェクト

