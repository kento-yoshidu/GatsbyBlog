---
title: "トリガー"
postdate: "2021-01-05"
update: "2020-01-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "トリガー"]
keywords: ["PostgreSQL"]
published: false
---

# トリガー

任意のテーブルで任意のイベントがあったタイミングで、任意の関数を呼び出すことができます。これを**トリガー**といいます。

`CREATE TRIGGER トリガー名 タイミング イベント ON テーブル名 [影響範囲] EXECUTE PROCEDURE 関数名([引数]);`

タイミングとして`INSERT`、`UPDATE`、`DELETE`、`TRUNCATE`の4種類を指定できます。

```
〇タイミング
・BEFORE
指定したイベントの実行前にトリガー（関数）を実行します。
トリガーがNULLを返した場合はイベントを実行せずに正常終了します。

・AFTER
指定したイベントの実行後にトリガーを実行します。

〇イベント
・INSERT
対象テーブルに対してINSERT処理が行われた場合にトリガーを実行します。

・UPDATE
対象テーブルに対してUPDATE処理が行われた場合にトリガーを実行します。

・DELETE
対象テーブルに対してDELETE処理が行われた場合にトリガーを実行します。

・TRUNCATE
対象テーブルに対してTRUNCATE処理が行われた場合にトリガーを実行します。
```


## ALTER

`ALTER TRIGGER [トリガー名] ON [テーブル名] RENAME TO [新しいトリガー名];`

## DROP

`DROP TRIGGER [トリガー名] ON [テーブル名];`
