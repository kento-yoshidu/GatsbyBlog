---
title: "PostgreSQL メタ的なコマンド(仮)"
postdate: "2021-01-28"
update: "2021-01-28"
seriesName: "ハンズオンPostgreSQL"
seriesSlug: "HandsOnPostgreSQL"
tags: ["PostgreSQL"]
---

## DBクラスタの場所を知りたい

```
# => SHOW data_directory

    data_directory
-----------------------
 C:/workspace/postgres
(1 行)
```

## 稼働統計情報

=> pg_stat_databaseテーブル

## pg_controldata

クラスターの制御情報を取得。

```
# pg_controldata
pg_control version number:            1201
Catalog version number:               201909212
Database system identifier:           7108217647941144605
Database cluster state:               in production
pg_control last modified:             Sun Jul 17 19:01:44 2022
Latest checkpoint location:           0/177E670
Latest checkpoint's REDO location:    0/177E670
Latest checkpoint's REDO WAL file:    000000010000000000000001
Latest checkpoint's TimeLineID:       1
Latest checkpoint's PrevTimeLineID:   1
Latest checkpoint's full_page_writes: on
# 略
```

`-D`で対象のクラスターを指定します。

また、クラスターの管理ユーザーで行う必要があります。

## データのコピー

### \copyコマンド


```
postgres=# \copy sample to sample.txt;
COPY 3

postgres=# \q

# cat sample.txt 
1       北海道
2       宮城
3       和歌山
```

`delimiter as '区切り文字'`で区切り文字を指定できます。

```
postgres=# \copy sample to sample.txt delimiter as ',';
COPY 3

postgres=# \q

# cat sample.txt 
1,北海道
2,宮城
3,和歌山
```

## CSVとして出力する

`csv`とします。

```
postgres=# \copy sample to sample.csv csv header;
COPY 3

postgres=# \q

# cat sample.csv 
1,北海道
2,宮城
3,和歌山
```

`header`を付ける。

```
postgres=# \copy sample to sample.csv csv header;
COPY 3

postgres=# \q

# cat sample.csv 
id,name
1,北海道
2,宮城
3,和歌山
```

