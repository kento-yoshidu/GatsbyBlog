---
title: "AWS SAAメモ EFS"
postdate: "2021-06-21"
updatedate: "2021-06-22"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "SAA", "EFS"]
---

## Linuxディストリビューション

### RedHat系

- CentOS

### Debian系

- Ubuntu

## ログインシェル

ログイン時、最初に起動されるシェルの事。

```shell
$ echo $SHELL
# /bin/bash
```

## 別のシェルの起動

切り替えたいシェルのコマンドを打つだけ。

```shell
# shを起動
[toriwatari@localhost ~]$ sh
sh-4.4$ 

# bashを起動
sh-4.4$ bash
[toriwatari@localhost ~]$ 
```

一時的に起動したこれらのシェルは非ログインシェルであるため、`logout`ではなく、`exit`で終了する。

```shell
[c-yoshizuke@localhost ~]$ logout
# bash: logout: ログインシェルではありません: `exit' を使用してください

# `exit`でbashを終了、shに切り替わる
[c-yoshizuke@localhost ~]$ exit
exit
sh-4.4$ 

# `exit`でshを終了、bashに切り替わる
sh-4.4$ exit
exit
[c-yoshizuke@localhost ~]$ 
```

## ライセンス

Linuxカーネルは**GNU GPL**ライセンス。

プログラムの複製、改変したプログラムの再配布が可能。ただし、再配布の際はGNU GPLライセンスで配布すること、は生物においてもソースコードを合わせて配布することが条件。

## コマンドライン

### 操作方法

|コマンド|動作|
|:------|:---|
|Ctrl + b|カーソルを1文字分左に移動|
|Ctrl + f|カーソルを1文字分右に移動|
|Ctrl + a|カーソルを行頭に移動|
|Ctrl + e|カーソルを行末に移動|
|Alt + b|カーソルを1単語分左に移動|
|Alt + f|カーソルを1単語文右に移動|
|Ctrl + h|カーソルの左方向の1文字を削除する|
|Ctrl + d|カーソルの1文字を削除する|
|Ctrl + w|カーソルの左方向の1単語分を削除する|
|Ctrl + k|カーソルから行末までをカットする|
|Ctrl + u|カーソルから行頭までをカットする|
|Ctrl + y|最後に削除した内容を張り付ける|
|Ctrl + l|コンソール画面のリフレッシュ|
|Ctrl + p|前の履歴を参照|
|Ctrl + n|次の履歴を参照|

## ディレクトリの役割

ディレクトリ構造は**FHS**に基づいている。

### bin

実行ファイル置き場

### dev

デバイスファイル置き場

### etc

linuxシステム全体に関する**設定ファイル**置き場。

### home

ホームディレクトリ置き場

### sbin

管理者ユーザー向けの実行ファイル置き場。

### tmp

temp。一時ファイル置き場。

### usr

追加でアプリケーションをインストールした際、それらの設定ファイル置き場。

### var

varibale。ログなど。

## ls

|オプション|説明|
|-|-|
|-l|詳細表示|
|-a|隠しファイル|
|-F|ファイルの種類|


## cat

|オプション|説明|
|-|-|
|-n|行番号付与|


## cp

|オプション|説明|
|-|-|
|-i|上書きしていいかの確認|
|-r|再帰|

## ln

### inode

ファイルを作成すると「inode番号」という一意の番号が割り振られる。

https://eng-entrance.com/linux-permission-link

## find

|オプション|説明|
|--|--|
|-name|ファイル名で検索|
|-iname|ファイル名で検索(大文字小文字を区別しない)|

ファイル名検索には`*`と`?`が使えるが、その時はシングルクオートかダブルクオートで囲う事。

|オプション|説明|
|--|--|
|-type f|ファイル|
|-type d|ディレクトリ|
|-type l|シンボリックリンク|
|-a|AND条件|

```shell
$find . -type f -a -name 'a*.txt'
```

## locate

専用のデータベースからファイル名を検索してファイルを探す。


[GNU/Linuxってなに？を学んだ - matobaの備忘録](https://blog.mtb-production.info/entry/2018/03/18/151646)

[tarコマンドについて詳しくまとめました 【Linuxコマンド集】](https://eng-entrance.com/linux-command-tar)

[CentOS リポジトリ repository](http://mrs.suzu841.com/tebiki/memo/repository.html)

[yum installで学ぶ！ yum の仕組み - RAKUS Developers Blog | ラクス エンジニアブログ](https://tech-blog.rakus.co.jp/entry/2017/12/14/105052)