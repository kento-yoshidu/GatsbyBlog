---
title: "プロキシー環境でKali Linuxを使う"
postdate: "2021-12-13"
update: "2021-12-13"
seriesName: "メモ"
seriesSlug: "Memo"
description: "プロキシー環境でKali Linux(WSL2)を使うための設定項目をメモします。"
tags: ["Jamstack", "HeadlessCMS", "SSG"]
---

# プロキシ－環境でKali Linuxを使いたい

会社（プロキシ－環境）にて、とある事情からKali Linux(WSL2)を使おうと思いプロキシ－設定を行いました。普段はWindowsを使用しておりLinuxのプロキシー設定など滅多にやることがなく、やる度に検索することになりそうなのでここにメモしておきます（プロキシ面倒くさいんだよ😡）。

プロキシ－設定を行い、`apt`コマンドでVimをインストールするところまでを行います。

## 環境

- Windows 10 20H2
- WSL2

```shell
$ grep VERSION /etc/os-release

VERSION="2021.1"
VERSION_ID="2021.1"
VERSION_CODENAME="kali-rolling"
```

## aptの設定

`/etc/apt/`に`apt.conf`を作成し、プロキシ－に関する設定を記述します。

```shell
$ sudo vim /etc/apt/apt.conf

===

## 以下を入力
Acquire::http::Proxy "http://<proxy_server>:<port_number>";
Acquire::https::Proxy "http://<proxy_server>:<port_number>";
```

`apt udpate`が成功すればインターネットとの通信が確立されています。

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

見事、Vimをインストールできました🎉。めちゃくちゃ簡単でした。以前はもっと苦労した記憶があるんだけど、、、。

## 環境変数を設定する

情報を収集していると、環境変数にプロキシ－サーバーのアドレスを設定しなければならないという情報が多く見つかりましたが、今回の環境では上記のように「/etc/apt/apt.conf」の作成と編集のみでインターネットへの接続が可能でした。

私の知識不足で、詳しいことは分からないのですが、環境変数の設定も一応メモしておきます。
