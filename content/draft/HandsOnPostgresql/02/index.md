---
title: "#2 [PostgreSQL]PostgreSQLの特徴"
postdate: "2099-12-24"
update: "2099-12-24"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "OSS-DB"]
keywords: ["PostgreSQL", "Database", "DB"]
published: false
---

# PostgreSQLの特徴

PostgreSQLはオープンソースデータベースの一種です。

## ライセンス

PostgreSQLは、そのまんまの名前の**PostgreSQLライセンス**というライセンスを使用しています。このライセンスは**BSDライセンス**をベースにしています。

まず、多くのOSSライセンスと同じように、**無保証**、そして**著作権表示をすること**が定められています。それに加え、BSDライセンスと同じく、商用・非商用問わず**無償で使用できる**こと、一定の条件のもとで**再配布**できることも定めれています。

再配布できる一定の条件とは、著作権とライセンス条文、無保証であることをドキュメントに


では実際にライセンス条文を見てみます。

https://www.postgresql.org/about/licence/

以下の部分に注目してみてみると、

> <mark>Permission to use, copy, modify, and distribute</mark> this software and its documentation for <mark>any purpose, without fee, and without a written agreement</mark> is hereby granted, provided that the above copyright notice and this paragraph and the following two paragraphs appear in all copies.

> 上記著作権表示と次の段落が全てのコピー含まれていることを条件に、このソフトウェアと文書を<mark>目的を問わず、無償で、書面による合意なしに</mark>、<mark>使用し、コピーし、変更し、配布することができます</mark>。

とあります。また、この後には以下の段落が続きます。これらが再配布の条件に該当するものですね。

> IN NO EVENT SHALL THE UNIVERSITY OF CALIFORNIA BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF THE UNIVERSITY OF CALIFORNIA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

> THE UNIVERSITY OF CALIFORNIA SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE PROVIDED HEREUNDER IS ON AN "AS IS" BASIS, AND THE UNIVERSITY OF CALIFORNIA HAS NO OBLIGATIONS TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.

試験対策としては、似たようなライセンスはどれか、みたいな問題も出そうです。同じBSDライセンスをベースにしている**MITランセンス**を覚えておきましょう。反対に、制限が厳しいライセンスとしてGPLライセンスがあります。対比的なライセンスとしてこちらも覚えておきましょう。

また、ソースコードの公開義務もありません。

## PGDG

PostgreSQLを開発しているのはPGDG（PostgreSQL Global Development Group）という開発コミュニティです。

- メーリングリストの運用
- ソースコード、バイナリーパッケージの無償公開

## 日本PostgreSQLユーザ会

日本でいうと、日本PostgreSQLユーザ会が存在します。

https://www.postgresql.jp/

> PostgreSQLの日本語訳マニュアル、PostgreSQLダウンロードへのリンク、各種イベントのお知らせ、ユーザ会各組織の情報を掲載しています。

とのことです。加えて、日本語メーリングリストの運営も行っています。


## 開発コミュニティ

メーリングリストの管理やイベントの開催などを行っています。

メーリングリストのメンバーによって議論がされますが、最終決定を行うのはあくまでコアメンバーです。

## バージョンについて

PostgreSQLのバージョン9.xまでは「X.Y.Z」のように表されていました。この場合、XとYがメジャーバージョンであり、Zがマイナーバージョンを表していました。

バージョン10からは「X.Y」のように表され、XがメジャーバージョンでYがマイナーバージョンです。

サポート期限はメジャーバージョンの**最初のリリースから5年間**と定められています。

## バージョンアップ

メジャーバージョン、マイナーバージョンのアップデートの両方でリリースノートが発行されます。

## 内部的なこと

クライアント接続ごとに1プロセス生成される。

エンコーディング

データベース（サーバー）側において、S-JISのみ設定できない。後はOK。
