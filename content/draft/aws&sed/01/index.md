---
title: "#1 モダンCSS"
postdate: "2022-06-16"
update: "2022-06-16"
seriesName: "awk&sed"
seriesSlug: "awk & sed入門"
description: ""
tags: ["awk", "sed"]
keywords: ["awk", "sed"]
---

# awk

awkはUnixコマンドの一種ではなく、れっきとした**プログラミング言語**です。

テキストファイルから特定の条件を抜き出しすような**フィルタリング**を得意としています。

## 実行方法

awkは**フィルターコマンド**なので、入力を渡す必要があります。

ファイルとして渡すことも出来ますし、コマンドラインに直接コードを書いてわたすこともできます。

`sample.awk`に以下のコードを書きます。

```awk
{ print "Hello awk" }
```

`-f`を付け、ファイルを渡します。

```bash
$ echo | awk -f sample.awk
Hello awk
```

コマンドラインに直接各場合。

```bash
$ echo | awk '{ print "Hello World" }'
Hello World
```

## フィールドのn番目の項目を抜き出す

`ls -l`コマンドでルートディレクトリ配下の情報を得ることができます。

```bash
$ ls -l /
total 392
lrwxrwxrwx  1 root root      7 Aug 20  2021 bin -> usr/bin
drwxr-xr-x  2 root root   4096 Aug 20  2021 boot
drwxr-xr-x  8 root root   2720 Mar 30 15:59 dev
drwxr-xr-x 95 root root   4096 Mar 30 15:59 etc
drwxr-xr-x  3 root root   4096 Mar 29 15:16 home
-rwxr-xr-x  2 root root 632096 Mar  8 13:26 init
lrwxrwxrwx  1 root root      7 Aug 20  2021 lib -> usr/lib
lrwxrwxrwx  1 root root      9 Aug 20  2021 lib32 -> usr/lib32
lrwxrwxrwx  1 root root      9 Aug 20  2021 lib64 -> usr/lib64
lrwxrwxrwx  1 root root     10 Aug 20  2021 libx32 -> usr/libx32
drwx------  2 root root  16384 Apr 11  2019 lost+found
drwxr-xr-x  2 root root   4096 Aug 20  2021 media
drwxr-xr-x  4 root root   4096 Mar 29 15:16 mnt
drwxr-xr-x  2 root root   4096 Aug 20  2021 opt
dr-xr-xr-x 91 root root      0 Mar 30 15:59 proc
drwx------  3 root root   4096 Mar 29 15:27 root
drwxr-xr-x  9 root root    180 Mar 30 15:59 run
lrwxrwxrwx  1 root root      8 Aug 20  2021 sbin -> usr/sbin
drwxr-xr-x  6 root root   4096 Aug 20  2021 snap
drwxr-xr-x  2 root root   4096 Aug 20  2021 srv
dr-xr-xr-x 11 root root      0 Mar 30 15:59 sys
drwxrwxrwt  2 root root   4096 Mar 29 15:29 tmp
drwxr-xr-x 15 root root   4096 Aug 20  2021 usr
drwxr-xr-x 13 root root   4096 Aug 20  2021 var
```

実は、awkに渡せるのはファイルだけではありません。上記のようなlsコマンドの出力を渡すこともできます。まず最初に`ls -l /`の結果を題材に、

`$1`は入力の一番目のフィールドを取り出すことを意味します（結果が長くなるので、`head`で先頭10行のみをフィルタリングしています）。

```shell
$ ls -l / | awk '{ print $1 }' | head

total
lrwxrwxrwx
drwxr-xr-x
drwxr-xr-x
drwxr-xr-x
drwxr-xr-x
-rwxr-xr-x
lrwxrwxrwx
lrwxrwxrwx
lrwxrwxrwx
```

「1番目と2番目、5番目のフィールドを抜き出す」という場合には、カンマ`,`で区切ります。

```bash
$ ls -l / | awk '{ print $1, $2, $5 }' | head

total 392
lrwxrwxrwx 1 7
drwxr-xr-x 2 4096
drwxr-xr-x 8 2720
drwxr-xr-x 95 4096
drwxr-xr-x 3 4096
-rwxr-xr-x 2 632096
lrwxrwxrwx 1 7
lrwxrwxrwx 1 9
lrwxrwxrwx 1 9
```

なお、全てのフィールドを取得する場合には`$0`を使用します。

末尾は`$NF`。
