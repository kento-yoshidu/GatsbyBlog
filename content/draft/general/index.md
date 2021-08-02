---
title: temp
postdate: "2021-01-09"
updatedate: "2021-01-09"
---
## その他

### default_transaction_isolation

新しいトランザクションの分離レベルを設定します。

postgres.confの再読み込み、SETコマンドで設定の繁栄が可能です。

READ UNCOMMITED

**コミットされていない**変更を他のトランザクションから参照できます。なお、コミットされていない変更を読み取ってしまうことを**ダーディリード**といいます。

READ COMMITTED

**コミットされた**変更を他のトランザクションから参照できます。postgres.sqlにおけるデフォルトのレベルです。

REPEATABLE READ

## SETコマンドによる設定の変更

**コミットされた追加・変更**を他のトランザクションから参照できます。

セッション内でのみ有効です。切断してしまえば元に戻ります。

## ALTER SYSTEM

サーバのパラメータ値を書き換えます。コマンド実行後、`postgresql.auto.conf`ファイルに内容が書き込まれ、`postgresql.conf`の次回読み込み時に上書きされます。


## システムカタログ



# postgres.conf

initdb実行時に作成されます。

## サーバの動作関係

|パラメータ|内容|デフォルト|
|:--|:--|:--|
|listen_address|Postgresサーバ自身のIPアドレス|localhost|
|log_connections|待ち受けポート番号|5432|
|max_connections|サーバへの最大同時接続数|100|

上記設定は**Postgresサーバの再起動のみ**によって、設定変更が反映されます。
※postgres.confの再読み込みやSETコマンドの実行によって変更されない。


## pg_settingsビュー

pg_settingsはサーバの実行時パラメータを取得できるビューです。
中でもcontextカラムは**パラメータを変更するために必要な動作**が記載されています。

なお、sighupは（sig）
|値|内容|
|:--|:--|
|internal|変更不可。再度サーバを構築する必要がある|
|postmaster|PostgreSQLサーバ起動時にのみ適用|
|sighup|postgresql.confの再読み込み|
|superuser-backend|スーパーユーザが新しいセッションを開始|
|backend|一般ユーザが新しいセッションを開始|
|superuser|スーパーユーザがSETコマンドを実行|
|user|一般ユーザがSETコマンドを実行|


https://sites.google.com/site/kojimemos/home/mysql/toranzakushon/toranzakushon-fen-lireberu

https://www.postgresql.jp/document/12/html/view-pg-settings.html

https://www.kakiro-web.com/postgresql/postgresql-sql-log-system.html
