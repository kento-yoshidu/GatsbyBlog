---
title: "#4 [PostgreSQL]DBクラスターを作成する"
postdate: "2099-12-24"
update: "2099-12-24"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "OSS-DB"]
keywords: ["PostgreSQL", "Database", "DB"]
published: false
---

# 

PostgreSQLにおいて、複数のデータベースをまとめたものを**データベースクラスター**（以下、クラスター）といいます。

参考 : [第18回　データベースクラスタ](https://oss-db.jp/dojo/dojo_18)

```
postgres=# show data_directory;
           data_directory
-------------------------------------
 C:/Program Files/PostgreSQL/12/data
(1 行)
```

https://oss-db.jp/dojo/dojo_18

「インスタンス」と言い換えてもいいかもしれません。

`initdb`コマンドを用いて、データーベースクラスター（以下、クラスター）を作成できます。

PostgreSQLインストール時、デフォルトのまま進めていけば`C:\Program Files\PostrgteSQL\12\data`にクラスターができているわけですが、`initdb`コマンドでこれ以外にも自由にポコポコDBクラスターを作成できます。

Cドライブの直下に`workspace`フォルダーを作成し、そこに`data`という名前のフォルダーでクラスターを作成したいと思います。この`data`フォルダーは事前に作成しておいてもしなくても構いません。フォルダーが存在しない場合、`initdb`がフォルダーを作成してくれます。

## コマンド

それでは以下のように入力してコマンドを実行してみてください。

`initdb -D data -A password -W -U postgres -E UTF8 --no-locale`

途中で「新しいスーパユーザのパスワードを入力してください:」と聞かれますので、postgresユーザーでログインするためのパスワードを設定してください。

```bash
$ initdb -D data -A password -W -U postgres -E UTF8 --no-locale
データベースシステム内のファイルの所有者はユーザ"<ログインしているWindowsOSのユーザー>"となります。
このユーザをサーバプロセスの所有者とする必要があります。

データベースクラスタはロケール"C"で初期化されます。
デフォルトのテキスト検索構成は english に設定されます。

データベージのチェックサムは無効です。

新しいスーパユーザのパスワードを入力してください:
再入力してください:

ディレクトリdataを作成しています ... ok
サブディレクトリを作成しています ... ok
動的共有メモリの実装を選択しています ... windows
デフォルトのmax_connectionsを選択しています ... 100
デフォルトの shared_buffers を選択しています ... 128MB
selecting default time zone ... Asia/Tokyo
設定ファイルを作成しています ... ok
ブートストラップスクリプトを実行しています ... ok
ブートストラップ後の初期化を実行しています ... ok
データをディスクに同期しています ... ok

成功しました。以下のようにしてデータベースサーバを起動することができます:

    ^"C^:^\Program^ Files^\PostgreSQL^\12^\bin^\pg^_ctl^" -D data -l ログファイル start
```

そしてカレントディレクトリーに`data`フォルダーが作成されており、何やら沢山のファイルが保存されていることがわかります。この時点ではまだクラスターは起動していません。

### ポート番号を変える

PostgreSQLのデフォルトのポート番号は`5432`であり、今回作成したクラスターも`5432`に設定されています。このままだと他のクラスターとバッティングする可能性があるので、検証用のクラスターなどであればポート番号を変更するのをお勧めします。

ポート番号は`data`フォルダー直下の`postgresql.conf`に記載されています。`port`で検索すると、おそらく64行目あたりに以下の記述を見つけられます。

```
#port = 5432				# (change requires restart)
```

先頭の`#`によってコメントアウトされていますので、`#`は削除し、`5432`を`5433`などに書き換えましょう。

```
port = 5433				# (change requires restart)
```

### クラスターを起動する

`pg_ctl`を使用し、クラスターを起動します。`pg_ctl start -D data`とします。

```bash
$ pg_ctl start -D data

サーバの起動完了を待っています....2022-08-10 12:19:37.380 JST [10392] LOG:  starting PostgreSQL 12.11, compiled by Visual C++ build 1914, 64-bit
2022-08-10 12:19:37.387 JST [10392] LOG:  listening on IPv6 address "::1", port 5432      
2022-08-10 12:19:37.387 JST [10392] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2022-08-10 12:19:37.448 JST [15836] LOG:  database system was shut down at 2022-08-10 11:48:56 JST
2022-08-10 12:19:37.528 JST [10392] LOG:  database system is ready to accept connections
完了
サーバ起動完了
```

### ログインする

ではPostgreSQLにログインしてみます。`-U`でログインユーザーの指定、そして、ポート番号を変更している場合は`-p`でポート番号を指定する必要があります。

```shell
$ psql -U postgres -p 5433
ユーザ postgres のパスワード:
psql (12.11)
"help"でヘルプを表示します。

postgres=#
```

### クラスターを削除する

不要になったらクラスターを削除しましょう。まずは`pg_ctl stop`でクラスターを停止します。

```bash
$ pg_ctl stop -D ./data/

2022-08-10 15:47:46.234 JST [17256] LOG:  received fast shutdown request
サーバ停止処理の完了を待っています....2022-08-10 15:47:46.237 JST [17256] LOG:  aborting any active transactions
2022-08-10 15:47:46.266 JST [17256] LOG:  background worker "logical replication launcher" (PID 13436) exited with exit code 1
2022-08-10 15:47:46.271 JST [16960] LOG:  shutting down
2022-08-10 15:47:46.348 JST [17256] LOG:  database system is shut down
完了
サーバは停止しました
```

後は`data`フォルダーを削除するだけです。簡単ですね。
