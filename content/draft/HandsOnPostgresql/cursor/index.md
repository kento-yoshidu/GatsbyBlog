
カーソルは`pg_cursors`テーブルで確認することができます。


## `NO SCROLL`で逆方向へのカーソル移動を不可にする

`BACKWARD`で逆方向へのカーソル移動を行えることは説明しましたが、`NO SCROLL`オプションを指定することでそれを禁止することができます。

`DECLARE sample_cursor NO SCROLL CURSOR FOR SELECT* FROM sample;`とします。

```
postgres=*# DECLARE sample_cursor NO SCROLL CURSOR FOR SELECT * FROM sample;
DECLARE CURSOR
```

順方向への`FETCH`は問題なくできますね。

```
postgres=*# FETCH FROM sample_cursor; 
 id | name
----+------
  1 | 高橋
(1 行)
```

`BACKWARD`オプションを付けるとエラーになることがわかります。

```
postgres=*# FETCH BACKWARD from sample_cursor;
ERROR:  cursor can only scan forward
HINT:  Declare it with SCROLL option to enable backward scan.
```

## `WITH HOLD`でカーソルを維持する

実は`WITHOUT HOLD`オプションがデフォルトで付与されていて、カーソルを生成した**トランザクションの外部**では、そのカーソルを使用できません。

カーソルを維持できます。

```
postgres=*# DECLARE sample_cursor CURSOR WITH HOLD FOR SELECT * FROM sample;
DECLARE CURSOR
```

適当に`FETCH`でカーソルを移動させ、`COMMIT`でトランザクションを終了させます。

```
postgres=*# fetch from sample_cursor;
 id | name
----+------
  1 | 高橋
(1 行)


postgres=*# fetch from sample_cursor;
 id | name
----+------
  2 | 山田
(1 行)


postgres=*# commit;
COMMIT
```

トランザクションを開始し、`FETCH`を実行すると、前回のカーソル位置が維持されていることがわかります。

```
postgres=# BEGIN;

postgres=*# fetch from sample_cursor;
 id | name
----+------
  3 | 結城
(1 行)
```

さらに、`COMMIT`してトランザクションを終了させ、`pg_cursors`テーブルを確認してみましょう。

```
postgres=*# commit;
COMMIT

postgres=# select * from pg_cursors;
     name      |                            statement                             | is_holdable | is_binary | is_scrollable |         creation_time
---------------+------------------------------------------------------------------+-------------+-----------+---------------+-------------------------------
 sample_cursor | declare sample_cursor cursor with hold for select * from sample; | t           | f         | t             | 2022-06-29 12:30:31.856551+09
(1 行)
```
