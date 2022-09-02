---
title: "Linux"
postdate: "2021-10-01"
update: "2021-10-01"
seriesName: "ラーニングGatsby"
seriesSlug: "LearningGatsby"
description: ""
tags: ["Gatsby", "SSG"]

---

## カーネルモジュール

`lsmod`もしくは`/proc/modules`を参照する。

## DMA

CPUを介することなくメインメモリと周辺機器の間で直接的に情報転送を行う方式。`/proc/dma`を参照。

## メモリーの使用状況

`/proc/meminfo`を参照。

## PCIデバイス

`lspci`で取得。もしくは`/proc/bus/pci/devices`。

## I/Oポートアドレス

I/Oポートアドレスとは周辺機器(デバイス)とCPUがデータをやり取りする際に使用する16ビットのアドレスのことです。

## `modprobe`

依存関係を考慮しカーネルモジュールをロードする。`/etc/modprobe.d/`の`.conf`が設定ファイル。

- options: 各カーネルモジュールのデフォルトパラメータを指定する
- alias: カーネルモジュールに別名をつける
- install: 特定のカーネルモジュールのロード時に実行されるコマンドを指定する
- remove: 特定のカーネルモジュールのアンロード時に実行されるコマンドを指定する
- blacklist: ロードしたくないカーネルモジュールを指定する

## `udev`

カーネルはデバイスを検知すると「/sys」以下（sysfsと呼ばれます）の情報を更新しますが、その更新をudevは検知し、/dev以下にデバイスファイルを動的に作成します。
デバイスファイル作成時の動作は、「/etc/udev/rules.d」ディレクトリに配置された設定ファイル（拡張子「.rules」）に記述された情報に基づいて行われます。

## cpuの情報

`/proc/cpuinfo`

## USBデバイス

`lsusb`、`/proc/bus/usb/devices`。

`/proc/interrupts`

# initプログラム

Upstart

ジョブ、イベント駆動型、並列処理が可能

## 初期RAMディスク

・ファイルシステムへアクセスするのに必要なドライバやスクリプトが含まれている
・カーネルイメージと同様に「/boot」ディレクトリに格納される
・カーネルのバージョンごとに内容が異なる

# SysVinit

`telinit q`、`init Q`で`/etc/inittab`の変更を即座に反映する。

# systemd

扱う処理をUnitという単位で管理する

サービスの並列起動によって高速なシステム起動や停止が行える

cgroupsでプロセスのリソースを管理する

## systemd-journald

各サービスのログを扱う

## cgroups

プロセスのリソース管理

## /proc/cmdline

ブートローダーからカーネルに渡されたパラメーター


# ランレベル

`systemctl rescue`でシングルユーザーモードに切り替える。`systemctl default`、`Ctrl-D`を実行するか、`systemctl reboot`で再起動すると元に戻る。


`runlevel.target`、`rescue.target`

マルチユーザー`2, 3, 5`

マルチユーザー、GUIログイン`5`


## ランレベルの変更

`init`、`telinit`

## 一つ前のランレベル

`runlevel`

## 次回起動時のランレベル

`/etc/systemd/system`のシンボリックリンク`default.target`確認する。

`shutdown -h +60`

`systemd`システムなら`systemctl get-defalut`で確認する。

`systemctl set-default graphical.target`などで次回を指定する。

# Debian

# apt系

`apt-cache`

パッケージ情報の検索・参照。

- `depends` 依存しているパッケージ一覧
- `showpkg` 依存しているパッケージの詳細情報
- `show` パッケージの情報

`apt-get`

- `update` データベースを最新版に更新
- `upgrade` インストールしているパッケージをアップグレード

`apt`

リポジトリーは`/etc/apt/sources.list`で設定する。

`dpkg`

設定ファイルは`/etc/dpkg/dpkg.cfg`。

> 「-G」オプションを併用することで、既に新しいバージョンのパッケージがインストールされている場合は、インストールを行わないようにすることができます。

> 「-E」オプションを併用することで、既に同じバージョンのパッケージがインストールされている場合は、インストールを行わないようにできます。

- `-R` ディレクトリーを再帰処理
- `-l` `--list` インストール済みパッケージの一覧
- `-L` `--listfiles` あるパッケージからインストールされたファイル一覧
- `-s` `--status` インストール済みパッケージの詳細情報
- `-r` `--remove` 設定ファイルを残してパッケージを削除
- `-P` `--purge` 設定ファイルごとパッケージを削除
- `-C` `--audit` 不完全なパッケージの表示
- `-S` `--search` 指定したファイルがどのパッケージからインストールされたか


