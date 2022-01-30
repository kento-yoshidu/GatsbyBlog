---
title: "プロキシ環境でKali Linuxを使う"
postdate: "2021-12-13"
update: "2021-12-14"
seriesName: "その他"
seriesSlug: "Others"
description: "プロキシ環境でKali Linux(WSL2)を使うための設定項目をメモします。"
tags: ["Kali Linux", "WSL2", "Proxy"]
keywords: ["Kali Linux", "WSL2", "Proxy", "プロキシー", "apt", "wget", "curl"]
published: true
---

# プロキシ環境でKali Linuxを使いたい

会社（プロキシ環境）にて、とある事情からKali Linux(WSL2)を使おうと思いプロキシ設定を行いました。普段はWindowsを使用しておりLinuxのプロキシ設定など滅多にやることがなく、やる度に検索することになりそうなのでここにメモしておきます（プロキシ面倒くさいんだよ😡）。

Kali Linuxにおいて、プロキシ設定を行い、`apt`、`wget`、`curl`コマンドが成功するかを確認します。

<aside>

タイトルには「Kali Linux」と銘打っていますが、Debian系であれば概ね共通しているのではないかと推察します。

</aside>

## 環境

- Windows 10 20H2
- WSL2

```shell
$ grep VERSION /etc/os-release

VERSION="2021.1"
VERSION_ID="2021.1"
VERSION_CODENAME="kali-rolling"
```

記事を書くにあたって、Kali Linuxを初期化してから検証作業を行いました。つまり、ほぼサラピンの状態から以下の作業を行うことでプロキシ設定ができると思われます。

<!--
## 環境変数の設定

以下のように設定します。

-->

## aptの設定

まずは`apt`コマンドでVimをインストールできるようにしてみます。

`/etc/apt/`に`apt.conf`を作成し、プロキシーに関する設定を記述します。

```shell
$ sudo vim /etc/apt/apt.conf

## 以下を入力
Acquire::http::Proxy "http://<proxy_server>:<port>";
Acquire::https::Proxy "http://<proxy_server>:<port>";
```

`apt update`が成功することを確認します。

```shell
$ sudo apt update

Get:1 http://kali.cs.nctu.edu.tw/kali kali-rolling InRelease [30.6 kB]
Get:2 http://kali.cs.nctu.edu.tw/kali kali-rolling/main amd64 Packages [17.8 MB]
Get:3 http://kali.cs.nctu.edu.tw/kali kali-rolling/non-free amd64 Packages [209 kB]
Get:4 http://kali.cs.nctu.edu.tw/kali kali-rolling/contrib amd64 Packages [114 kB]
Fetched 18.2 MB in 5s (3,614 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
157 packages can be upgraded. Run 'apt list --upgradable' to see them.
```

`apt install vim`でVimをインストールできることを確認します。

```shell
$ sudo apt install vim

...(略)
```

見事、Vimをインストールできました🎉。めちゃくちゃ簡単ですね。

## wgetの設定

`/etc/wget`を変更します。

```shell
$ sudo vim /etc/wget

## 以下を入力
https_proxy = <proxy_server>:<port>
http_proxy = <proxy_server>:<port>
ftp_proxy = <proxy_server>:<port>
```

以下のようにコマンドを打ち、カレントディレクトリに`index.html`が保存されればOKです。

```shell
wget https://www.google.com
--2021-12-14 11:12:43--  https://www.google.com/
Connecting to <server>:<port>... connected.
Proxy request sent, awaiting response... 200 OK
Length: unspecified [text/html]
Saving to: ‘index.html’

index.html                                          [ <=>                                                                                                  ]  14.92K  --.-KB/s    in 0.01s

2021-12-14 11:12:43 (1.37 MB/s) - ‘index.html’ saved [15281]
```

見事、`wget`コマンドを実行できました。

## curlの設定

`curl`コマンドについては、`~/.curlrc`を作成し、以下のように記述します。

```shell
$ vim ~/.curlrc

proxy=http://<proxy_server>:<port>
```

以下のようにコマンドを打ち、カレントディレクトリに`index.html`が保存されればOKです。


以上、簡単な内容でしたが、メモ書きという事でこれくらいにします。いつかちゃんとした記事にしたいと思います。

そして、2022年こそはちゃんとLinuxを勉強したいと思います🙋‍♂️。

## 参考

[Proxy 接続設定のまとめ - Qiita](https://qiita.com/msi/items/e3a9700a2ac4a407cec1)

[Debian 10 Buster : プロキシクライアントの設定 : Server World](https://www.server-world.info/query?os=Debian_10&p=squid&f=2)

[プロキシ下でLinuxを使う際のメモ - Λlisue&#39;s blog](https://lambdalisue.hatenablog.com/entry/2013/06/25/140630)

[【2021年最新版】【Linux共通】プロキシサーバーの利用設定](https://www.servernote.net/article.cgi?id=use-proxy-setting-for-linux)

[プロキシ設定いろいろ](https://kapibara-sos.net/archives/109)