---
title: "[PostgreSQL]データベースクラスター"
postdate: "2020-12-12"
update: "2020-12-12"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
description: "test"
tags: ["PostgreSQL", "pg_ctl"]
keywords: ["PostgresQL", "OSS-DB", "資格"]
published: false
---

# データベースクラスターの作成

以下の例では、`-D .`とすることでカレントディレクトリにクラスターを作成しています。

```
$ initdb -D .
データベースシステム内のファイルの所有者はユーザ"kento"となります。
このユーザをサーバプロセスの所有者とする必要があります。

データベースクラスタはロケール"Japanese_Japan.932"で初期化されます。
ロケールにより暗黙的に指定される符号化方式"SJIS"はサーバ側の
符号化方式として使用できません。
デフォルトのデータベース符号化方式は代わりに"UTF8"に設定されます。
initdb: could not find suitable text search configuration for locale "Japanese_Japan.932"
デフォルトのテキスト検索構成は simple に設定されます。

データベージのチェックサムは無効です。

(略)

initdb: 警告: ローカル接続に対して"trust"認証を有効にします
pg_hba.confを編集する、もしくは、次回initdbを実行する時に -A オプション、
あるいは --auth-local および --auth-host オプションを使用することで変更する
ことがきます。

成功しました。以下のようにしてデータベースサーバを起動することができます:

    pg_ctl -D . -l ログファイル start

$ ll
total 54
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 base/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 global/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_commit_ts/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_dynshmem/
-rw-r--r-- 1 kento 197121  4410 12月 13 15:12 pg_hba.conf
-rw-r--r-- 1 kento 197121  1678 12月 13 15:12 pg_ident.conf
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_logical/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_multixact/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_notify/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_replslot/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_serial/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_snapshots/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_stat/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_stat_tmp/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_subtrans/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_tblspc/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_twophase/
-rw-r--r-- 1 kento 197121     3 12月 13 15:12 PG_VERSION
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_wal/
drwxr-xr-x 1 kento 197121     0 12月 13 15:12 pg_xact/
-rw-r--r-- 1 kento 197121    90 12月 13 15:12 postgresql.auto.conf
-rw-r--r-- 1 kento 197121 27396 12月 13 15:12 postgresql.conf

```

rootユーザではinitdbは実行できない。
また、ローカルホストでのみinitdbを実行できる。

### オプション

#### ディレクトリの指定

 - `-D ディレクトリ名`
 - `--pgdata=ディレクトリ名`

ディレクトリの指定は必須ではありません。環境変数`$PGDATA`が定義されていればそこがディレクトリになります。なお、定義されていない場合にはちゃんと以下のようにエラーになります。

```
$ initdb

initdb: エラー: データディレクトリが指定されていません
データベースシステムのデータを格納するディレクトリを指定する必要があります。
実行時オプション -D、もしくは、PGDATA環境変数で指定してください。
```

#### エンコーディングの指定

 - `-E エンコーディング`
 - `--encoding="エンコーディング`

指定しない場合にはOSのロケールから自動的に設定される。

```

# 指定しなかったとき(OSのロケールから設定される)
postgres=# \l
                                             データベース一覧
   名前    |  所有者  | エンコーディング |      照合順序      | Ctype(変換演算子)  |     アクセス権限
-----------+----------+------------------+--------------------+--------------------+-----------------------
 bookshelf | postgres | UTF8             | Japanese_Japan.932 | Japanese_Japan.932 |
 postgres  | postgres | UTF8             | Japanese_Japan.932 | Japanese_Japan.932 |
 template0 | postgres | UTF8             | Japanese_Japan.932 | Japanese_Japan.932 | =c/postgres          +
           |          |                  |                    |                    | postgres=CTc/postgres
 template1 | postgres | UTF8             | Japanese_Japan.932 | Japanese_Japan.932 | =c/postgres          +
           |          |                  |                    |                    | postgres=CTc/postgres
```

#### ロケールの指定

 - `--locale=ロケール`
 - `--no-locale`

`--no-local`とした場合はロケールが無効になる。

#### スーパーユーザを指定する

 - `-U ユーザ名`
 - `--username=ユーザ名`

指定しない場合は実行したOSのユーザ名でスーパーユーザが作成される。

# テンプレート

`template0`、`template1`、そして`postgres`という3つのデータベースが作成されます。

この中で`template0`と`template1`がテンプレートデータベースと呼ばれるもので、データベースを作成するときにはこのどちらかをベースにすることになります。

`template0`は変更を許しませんが、`template1`はカスタマイズすることが可能です。

データベースクラスター作成直後は`template0`と`template1`は同じ内容です。