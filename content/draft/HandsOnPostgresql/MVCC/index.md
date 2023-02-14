---
title: "MVCC"
postdate: "2021-01-28"
update: "2021-01-28"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "MVCC"]
---

## PostgreSQLは追記型アーキテクチャのDB



# MVCCとは?

Multi-Version Concurrency Control（多版型同時実行制御）。

更新作業を行ったとき、**更新前のデータを保存しておく**仕組み。

定期的に整理しないと使用されないデータ（不要領域）が肥大していく。

定期的に自動でPostgreSQLがVACUUMしてくれる（AUTO VACCUM）が、手動で行う必要もある。

まぁなんとなく裏側でやってくれてるんだろうな～位に考えてましたが、ハンズオンと題している以上、やらないとだめですよね＾＾；。

## VACUUMコマンド

VACUUMコマンドを実行することで、不要領域を回収し、PostgreSQLがその領域を再利用できるようになります。

適当にテーブルを作成します。私はpostgresデータベース上でテーブルを作成しました。お好みでどうぞ。

```
postgres=# CREATE TABLE TEST (id INT, name TEXT);
```

ところで、クラスタがホストのどこに保存されているかはちゃんとわかっていますでしょうか。せっかくですから調べ方まで復習しておきましょう。

PostgreSQLにログインし(psql -cでもいいですよ)、`SHOW data_directory`を実行します。

```
postgres=# SHOW data_directory

    data_directory
-----------------------
 C:/workspace/postgres
(1 行)
```

次に、クラスタ内のどこにpostgresデータベースの実体が保存されているのかを調べます。


# 参考

[PostgreSQL VACUUM で年末大掃除](https://www.techscore.com/blog/2018/12/18/postgresql-vacuum%E3%81%A7%E5%B9%B4%E6%9C%AB%E5%A4%A7%E6%8E%83%E9%99%A4/)

[[ThinkIT] 第3回：アーキテクチャ比較 ファイル構造の違いPostgreSQLの特徴 (3/3)](https://thinkit.co.jp/cert/compare/1/3/3.htm)

[DBの実データサイズを調べる（PostgreSQL編）](https://doruby.jp/users/oneafter999_on_rails/entries/DB_PostgreSQL_)

[稼動統計情報を活用しよう(3)](https://lets.postgresql.jp/documents/technical/statistics/3)

[PostgreSQL のトランザクション & MVCC & スナップショットの仕組み](http://www.nminoru.jp/~nminoru/postgresql/pg-transaction-mvcc-snapshot.html)

[MVCC による PostgreSQL の並列性](https://devcenter.heroku.com/ja/articles/postgresql-concurrency)