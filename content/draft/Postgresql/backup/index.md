---
title: バックアップを行う
postdate: "2021-01-09"
updatedate: "2021-01-09"
categoryName: "ハンズオンPostgreSQL"
categorySlug: "HandsonPostgreSQL"
tags: ["PostgreSQL", "バックアップ"]
---

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


## まとめ

|バックアップコマンド|ファイル形式|リストア方法|
|:--|:--|:--|
|pg_dump -Fp|テキスト|psql|
|pg_dumpall|テキスト|psql|
|pg_dump -Ft, -Fc|アーカイブ|pg_restore|

SELECT * FROM information_schema.tables;