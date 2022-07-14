---
title: "ハンズオンPostgreSQL はじめに"
postdate: "2020-12-23"
update: "2020-12-23"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL"]
---

# ハンズオンPostgreSQL

OSS-DB試験の勉強を進めるうちに、学んだことを残しておこうと思いました。
OracleDBやMySQLはネットでの情報や書籍も多いですが、PostgreSQLは少ないですよね。
公式リファレンスを見てもらうのが一番ですが、

なお、SQL自体については特に説明しませんのであしからず。

## DDL

Data Definition Languageの略で、データを**定義**するSQLです。

- CREATE
- DROP
- ALTER
- TRUNCATE


## DML

Data Manipulation Languageの略で、データを**操作**するSQLです。いわゆるCRUDにあたるSQLが該当します。

## DCL

Data Control Languageの略で、システムを**管理**するSQLです。権限とトランザクションに関するSQLが該当します。

- BEGIN
- ROLLBACK
- COMMIT
- GRANT
- REVOKE

## 記事一覧

- 関数
- トリガー
