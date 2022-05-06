---
title: "AWS SAA勉強メモ Amazon S3"
postdate: "2021-06-25"
update: "2021-06-25"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "AWS SAA", "S3"]
draft: true
---

## エンジン

- Amazon Aurora
- MySQL
- MariaDB
- Oracle
- SQL Server
- PostgreSQL

## for Oracle

ライセンス方式は2種類。

### BYOL

自分が所有するライセンスを利用する方法。

### ライセンス込み

自分で用意する必要はない。

## バックアップ

スケジュールの変更をした場合、**即時**変更が適用される。

## RDSプロキシー

> RDS Proxyは、アプリケーションとRDSデータベースの間の仲介役として機能します。RDS Proxyは、必要となるデータベースへのコネクションプールを確立および管理し、アプリケーションからのデータベース接続を少なく抑える機能です。RDS Proxyは、Lambda関数からデータベースに直接流れるすべてのデータベーストラフィックを処理します。

> Lambda関数は、データベースインスタンスではなくRDS Proxyと対話します。RDS Proxyは、Lambda関数の同時実行によって作成された大量の同時接続をスケーリングするために必要なコネクションをプーリングします。これにより、Lambdaアプリケーションは、Lambda関数呼び出しごとに新しいコネクションを作成するのではなく、既存のコネクションを再利用できます。

## Aurora

Oracleデータベースには対応していない。

### リードレプリカ

**別リージョン**にリードレプリカを作成可能。
