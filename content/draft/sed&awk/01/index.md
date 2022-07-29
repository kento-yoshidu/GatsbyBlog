---
title: "#1 地道にsed&awkに入門する"
postdate: "2022-06-16"
update: "2022-06-16"
seriesName: "awk&sed"
seriesSlug: "awk & sed入門"
description: ""
tags: ["awk", "sed"]
keywords: ["awk", "sed"]
---

# sedとawk

皆様はsed、awkという言葉を聞いたことがありますでしょうか。共にUNIX/Linux環境で用いられるコマンド/プログラミング言語です。テキストファイルへの何らかの処理を行うのに適しています。

sed（**セド**と読む）は、テキストに対して一連のバッチ処理ができるコマンドです。様々な機能がありますが、主に**文字の置き換え**に使用されます。

例えば以下のようなログファイルがあったとして、

```log
25/May/2022:08:32:27 200 kento@aaa.co.jp https://api～
25/May/2022:08:49:01 200 miyuki@bbb.com https://api～
25/May/2022:09:10:20 404 takashi@aaa.co.jp https://api～
25/May/2022:09:32:49 401 sachika@ccc.co.jp https://api～
25/May/2022:09:36:00 200 takuya@ddd.co.jp https://api～
25/May/2022:09:38:01 200 meika@aaa.co.jp https://api～
25/May/2022:09:32:49 200 gorou@ddd.co.jp https://api～
25/May/2022:09:32:49 200 haruka@aaa.co.jp https://api～
25/May/2022:09:32:49 404 shinji@bbb.co.jp https://api～
25/May/2022:09:32:49 404 yuki@aaa.co.jp https://api～
25/May/2022:09:32:49 200 kenji@ccc.co.jp https://api～
```

メールアドレスは個人情報のためマスクしたいとします。この時、以下のようなsedコマンドを実行することで`@`の前後を`xxx`という文字に置き換えることができます（どの文字をどんな風に置き換えるか、という部分は正規表現の仕事ですね）。

```log
$ sed -e "s/[^@ ]*@[^@]*\.[^@]* /xxx@xxx /g" sed.log

25/May/2022:08:32:27 200 xxx@xxx https://api～
25/May/2022:08:49:01 200 xxx@xxx https://api～
25/May/2022:09:10:20 404 xxx@xxx https://api～
25/May/2022:09:32:49 401 xxx@xxx https://api～
25/May/2022:09:36:00 200 xxx@xxx https://api～
25/May/2022:09:38:01 200 xxx@xxx https://api～
25/May/2022:09:32:49 200 xxx@xxx https://api～
25/May/2022:09:32:49 200 xxx@xxx https://api～
25/May/2022:09:32:49 404 xxx@xxx https://api～
25/May/2022:09:32:49 404 xxx@xxx https://api～
25/May/2022:09:32:49 200 xxx@xxx https://api～
```

以下のようにすれば、置き換えではなくメールアドレス自体を削除できます。

```log
$ sed -e "s/[^@ ]*@[^@]*\.[^@]* //g" sed.txt

25/May/2022:08:32:27 200 https://api～
25/May/2022:08:49:01 200 https://api～
25/May/2022:09:10:20 404 https://api～
25/May/2022:09:32:49 401 https://api～
25/May/2022:09:36:00 200 https://api～
25/May/2022:09:38:01 200 https://api～
25/May/2022:09:32:49 200 https://api～
25/May/2022:09:32:49 200 https://api～
25/May/2022:09:32:49 404 https://api～
25/May/2022:09:32:49 404 https://api～
25/May/2022:09:32:49 200 https://api～
```

また、2列目の数字が400番台の行だけ取り出したいのであれば以下のようにします。sedの結果は標準出力に出力されるので、パイプで連結させることができます。

```log
$ sed -n "/ 4.* /p" sed.txt | sed -e "s/[^@ ]*@[^@]*\.[^@]* /xxx@xxx /g"

25/May/2022:09:10:20 404 xxx@xxx https://api～
25/May/2022:09:32:49 401 xxx@xxx https://api～
25/May/2022:09:32:49 404 xxx@xxx https://api～
25/May/2022:09:32:49 404 xxx@xxx https://api～
```

これらは一見すると地味な技術ですが、いざという時に「あ、俺（私）sedとawk使えちゃうんだよな～」とか言ってさらっと使えるとカッコいいわけです。Vimにしても正規表現にしてもsed&awkにしても、こういった地味な技術こそ地道な努力が必要だと私は考えています。私もsed&awkを覚えるまでに、週に3回以上は時間を作って勉強すると決めていました（正規表現は週5回、Vimは毎日）。

## 目次

まずは**ed**というエディターと、**正規表現**について簡単に学びます。

どちらもストリーム指向であり、テキストファイルの内容を**1行ずつ読み込み**それぞれに何らかの処理をほどこし、標準出力に出力します。

## ed

edは、特に**ラインエディター**などとも呼ばれます。ラインがどこから来ているかというと、『行』から来ています。edでは**行単位**での編集を行います。作業したい行に移動して作業、終わったらまた行を移動して～という風なエディターです。対してファイルの内容を画面に表示し、縦横無尽にカーソル移動できるVimなどは、**スクリーンエディター**などとも呼ばれます。

`ed ファイル名`と実行すると、文字数を表します。

```shell
$ ed text
20
```

そしてこの時、edは最終行に移動しています。edが現在いる行の内容を確認するには、`p`と入力します。

```shell
p
eee
```

`q`で終了します。。

さて、出力が余りにもシンプル過ぎるのも考えものです。せめてもの装飾として、ed起動時に`-p`オプションを渡して、プロンプトを表示させてみましょう。具体的には`e -p 'ed: ' text`という風にします。シングルクオートで囲っている部分がプロンプトとして表示されます。

```bash
$ ed -p 'ed> ' text
20
ed> p
eee
```

edは明確なエラーを出してくれません。試しにメチャクチャなコマンドを入力しても、`?`と出力されるだけです。

```ed
ed> Hello
?
ed>
```

エラーを表示させたい時は、`H`と打って実行します。するとエラー表示モードがONになり、次のコマンド実行からはエラーが表示されるようになります（と言ってもすごく簡単な内容ですが、、、）。

```bash
ed> H
ed> Hello
?
Invalid command suffix # エラー文の表示
ed>
```

元に戻したい時は再度`H`と実行します。


さて、実際は「n行目」対象にすることは少なく、「〇〇が含まれる行」を対象にすることがほとんどでしょう。edでももちろん、アドレス指定に正規表現が使用できます。

## 参考

https://qiita.com/httpd443/items/6aba2c776f3b241cdb2a

https://tech-blog.rakus.co.jp/entry/20181114/texteditor/ed

https://www.kabipan.com/computer/ed/


# sed

なお、sedとは「Stream EDtor」の略称らしいです。

```bash

```

例えばスクリプトにA、B、Cという3つの命令があり、入力ファイルに3行のデータがあるとすると、Aという命令が3行全部に適用されます。それが終わってからBが実行され、それも終わればCが実行される、という流れです。

## パターンスペース

1行分の入力が入った状態で編集コマンドが実行されます。

`-f`を付けることでsedのスクリプトファイルを実行することができます。



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


## 参考

https://dukelab.hatenablog.com/entry/2018/08/21/152831
