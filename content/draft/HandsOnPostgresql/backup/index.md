---
title: "バックアップを行う"
postdate: "2021-01-09"
update: "2021-01-09"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandSonPostgreSQL"
tags: ["PostgreSQL", "バックアップ", "OSS-DB Silver"]
keywords: ["PostgreSQL", "Database", "DB", "OSS DB Silver"]
published: false
---

## 分類

PostgreSQLを停止させて行うオフラインバックアップは、OSのコマンドなどを利用したディレクトリーのコピーのみです。それ以外は全てオンラインバックアップに分類されます。

必要なファイルが格納されているディレクトリーを丸ごとバックアップする方法です。復元する際にOSが違ったり、PostgreSQLのバージョンが違ったりするとリストアが上手くいかない可能性があります。

そしてオンラインバックアップは物理バックアップと論理バックアップに分かれます。



## pg_dumpとpg_dumpall

オンラインで行う論理バックアップです。

バックアップデータはDBを構築するSQL文で構成されています。

pg_dumpコマンドはバックアップするDBを指定できること、出力するファイル形式を指定できることが特徴です。逆にpg_dumpallコマンドはDBクラスタ全体をバックアップします。そこにはロールやテーブルスペースなども含まれます。

## pg_dump

オンラインで行う論理バックアップ方法です。

pg_dumpはバックアップするDBを指定することができます。また、`>`または`-f`でファイルへバックアップ内容を出力します（指定しない場合は標準出力へ出力）。

以下の例では、testdbデータベースの内容をbackup.dmpファイルに出力しています。ファイル形式を指定しなかった場合はプレーンテキストとして出力されますので、lessコマンドで内容を確認できます。

前述しましたが、pg_dump（pg_dumpallも）コマンドは、**SQL文のみを用いてバックアップファイルを作成します。**

今回バックアップしたtestdbデータベースは、テーブルが一つ(testtable)、レコードが2件のみの簡単な構成です。中を見てもらえればこのバックアップ方法のシンプルさが分かると思います。極端な話、手動でコピペしてDBを復元することも可能ですね。

```shell
$ pg_dump testdb > backup.dmp
$ less todo_bk.dmp

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 12.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: testtable; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE public.testtable (
    id integer,
    name character varying(10)
);


ALTER TABLE public.testtable OWNER TO test;

--
-- Data for Name: testtable; Type: TABLE DATA; Schema: public; Owner: test
--

COPY public.testtable (id, name) FROM stdin;
1       takashi
2       shizuko
\.


--
-- PostgreSQL database dump complete
--
```

### pg_dumpコマンドのオプション

|オプション|内容|
|:--|:--|
|-f, --file|バックアップ内容を指定のファイルに書き出す（デフォルトは標準出力）<br> `>` でも可|
|-F, --format|出力するファイルの形式を指定する（後述）|
|-a, --data-only|データのみをバックアップし、スキーマ情報は対象としない|
|-s, --schema-only|スキーマ情報のみをバックアップし、データは対象としない|

まず、`-a`オプションを試してみます。データ情報のみをバックアップするので、スキーマに関する記述が見当たらないことが分かります。

```
# -aでデータのみ
$ pg_dump testdb -a > backup-a.dmp
$ less backup-a.dmp

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 12.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: testtable; Type: TABLE DATA; Schema: public; Owner: todo
--

COPY public.testtable (id, name) FROM stdin;
1       takashi
2       shizuko
\.
```

逆にスキーマ情報のみをバックアップするには、`-s`オプションを渡します。

```
# -sでスキーマ情報のみ
$ pg_dump testdb -s > backup-s.dmp
$ less backup-s.bmp

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 12.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: testtable; Type: TABLE; Schema: public; Owner: todo
--

CREATE TABLE public.testtable (
    id integer,
    name character varying(10)
);

ALTER TABLE public.testtable OWNER TO todo;
```

### 出力ファイル形式を指定する

pg_dumpコマンドは`-F`オプションでバックアップファイルの形式を指定できます。これはpg_dumpallコマンドとの違いの一つです。

|オプション|ファイル形式|
|:--|:--|
|-Fp|プレーンテキスト|
|-Ft|tar形式|
|-Fc|カスタム（圧縮）形式|

> 通知関数を使用したバックアップの取得は、以下の手順で行われます。

> 1) SELECT文でpg_start_backup()関数を呼び出す (例) SELECT pg_start_backup('ラベル名');
> 2) データベースクラスタ全体の物理バックアップを取得する
> 3) SELECT文でpg_stop_backup()関数を呼び出す (例) SELECT pg_stop_backup();

## pg_dumpall

デフォルトはテキスト形式で保存される。ロールやテーブルスペースの情報もバックアップされるが、各種設定ファイルは対象外です。

`pg_dump`コマンドと`pg_dumpall`コマンドが論理バックアップに分類され、それ以外は物理バックアップになります。

## pg_dumpとpg_dumpallの共通点と違い

共通点は、

- PostgreSQLが稼働している時に行えるオンラインバックアップである
- 論理バックアップである
- postgres.confなどの設定ファイルは対象外である

などです。

`pg_dump`は、

- テーブル定義のみのバックアップも可能
- ロールやテーブルスペースは不可
- 出力されるファイル形式を選択できる

という特徴があり、`pg_dumpall`は

- グローバルオブジェクトのみをバックアップできる
- ファイルはテキスト形式で出力される（選択できない）


## pg_restore

`-c`で既存のデータベースオブジェクトを削除します。

## pg_basebackup

オンライン物理バックアップの際に利用されます。ベースバックアップを取得します。**WALファイルも含めて**バックアップを行う。

9.1で新機能として追加されました。

## PITR

PITRは**Point In Time Recovery**の略称で、**ベースバックアップ**と**WAL**を使用してデータベースを復旧することです。

ベースアップが完全バックアップ、WALは差分バックアップと捉えるとわかりやすいのではないでしょうか。

なお、ベースバックアップは物理バックアップであり、サーバーを起動したままバックアップを行うことができます。

> また、PITRで使用するWALはWALファイルに記録され、溜り続けていくと古いものから削除されます。そのため、WALファイルが削除されないよう、WALアーカイブとして保存する設定を行います。

リカバリー時には`recovery.conf`を作成する必要があります。

ただし、WALファイルは古いものから削除されていくので退避させる必要があります。これはWALアーカイブなどとも呼ばれます。

`postgres.conf`にはこのWALに関する項目が設けられています。一つは`wal_level`という項目です。

|項目|説明|
|---|---|
|minimal|クラッシュまたは即時停止から回復するのに必要な情報のみを書き出す|
|replica(デフォルト)|minimalの内容に加え、WALファイルのアーカイブに必要な情報を書き出す|
|logical|replicaの内容に加え、ロジカルレプリケーションに必要な情報を書き出す|

OSS-DB Silver受験に際しては、細かい内容は覚える必要はありません。覚えるべきは、**PITR（WALアーカイビング）のためにはreplicaかlogicalが設定されている必要がある**ということ、そしてデフォルトが`replica`なので管理者がこの項目を変更する必要はないということです。

続いて`archive_mode`です。これはずばり、WALファイルのアーカイブを行うかどうかという項目です。

　on … WALアーカイブを有効にする
　always … アーカイブリカバリやスタンバイモードにおいてWALアーカイブを有効にする
　off … WALアーカイブを無効にする

PITRを行うには、このarchive_modeをデフォルト値から変更する必要があります。

archive_modeはデフォルトでは**off**であるため、`on`もしくは`always`に変更する必要があります。

## まとめ

|バックアップコマンド|ファイル形式|リストア方法|
|:--|:--|:--|
|pg_dump -Fp|テキスト|psql|
|pg_dumpall|テキスト|psql|
|pg_dump -Ft, -Fc|アーカイブ|pg_restore|

SELECT * FROM information_schema.tables;
