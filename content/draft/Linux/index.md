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