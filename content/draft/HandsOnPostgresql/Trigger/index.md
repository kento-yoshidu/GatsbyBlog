---
title: "トリガー"
postdate: "2021-01-05"
update: "2020-01-05"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL", "PREPARE"]
keywords: ["PostgreSQL"]
published: false
---

# トリガー

trigger

タイミングとして`INSERT`、`UPDATE`、`DELETE`、`TRUNCATE`の4種類を指定できます。

## ALTER

ALTER TRIGGER [トリガー名] ON [テーブル名] RENAME TO [新しいトリガー名]
