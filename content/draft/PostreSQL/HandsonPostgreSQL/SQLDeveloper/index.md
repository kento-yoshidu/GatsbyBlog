---
title: "SQL DeveloperでPostgreSQLを操作する"
postdate: "2021-03-26"
updatedate: "2021-03-26"
categoryName: "ハンズオンPostgreSQL"
categorySlug: "HandsonPostgreSQL"
tags: ["PostgreSQL", "SQL Developer"]
---

# SQL Developerって？

**Oracle SQL Developer**は、Oracle社が提供するGUIのデータベース管理ツールです。無償で使用できます。

Oracle Databaseにしか使えないと思いきや、ドライバを適用すればpostgreSQL（他にもMySQLなど）にも接続できます。

PGAdminもいいんですが、個人的にはSQL Developerの方が好きなのでインストール方法を紹介します。

## 注意点

SQL Developerのダウンロードには、Oracle社のWebサイトにて**アカウントの作成が必要**です。それが許容される方のみ、以下をお読みください。

## インストーラをダウンロードする

まずはOracle社のWebサイトからインストーラをダウンロードしましょう。

[こちら](https://www.oracle.com/jp/tools/downloads/sqldev-downloads.html)にアクセスします。

プラットフォームの中にWindowsの文字が2つ見えますが、「Windows 64ビット、JDK 8が付属」の方を選んでおけばいいでしょう。

![](./images/image01.png)

SQL Developerを動かすにはJava(JDK)が必要なようですので、それも一緒にダウンロードしてくれます。

すでにJDKがインストールされている方はいいですが、「そんなもん知らん」という人は上記をダウンロードすれば問題ありません。

**オタクは黒が好き**なのでダークモードにしたいんですが、どうやら対応していないようです。


https://www.oracle.com/downloads/licenses/sqldev-license.html#licenseContent

https://mat0401.info/blog/oracle-sql-developer-configure-example/

https://docs.oracle.com/cd/F40598_01/rptug/sql-developer-concepts-usage.html#GUID-23986933-92E3-466F-8220-8C2793CB4F9E