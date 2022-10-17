---
title: "Linux マウント"
postdate: "2021-10-01"
update: "2021-10-01"
seriesName: "ラーニングGatsby"
seriesSlug: "LearningGatsby"
description: ""
tags: ["Gatsby", "SSG"]
keywords: ["Linux"]
published: false
---

# マウント

現在マウントされていファイルシステムは`/etc/mtab`に記録されている。

## mount

- mount /dev/sr0 /mnt/cdrom

- mount -t iso9660 /dev/hdc /mnt/cdrom

- --bind

-t ファイルシステムの種類の指定

> mountコマンドでマウントポイントのみの指定でマウントするためには、「/etc/fstab」ファイルにマウント設定を事前に行っておく必要があります。

## `/etc/fstab`

> マウントするファイルシステムの情報を記述するファイルです。OSを起動する際には、システムがデバイスをディレクトリにマウントしますが、その際、どのデバイスにどのディレクトリをマウントするか、の処理は、「/etc/fstab」ファイルの記述に従って進行します。

https://linuc.org/study/knowledge/505/

rw 読み書きを許可してマウント
async 入出力の非同期
nouser 一般ユーザーによるマウントの禁止
exec バイナリーの実行を許可
noauto `mount -a`でマウントしない

# /etc/mtab

現在マウントされているファイルシステムの情報が乗っています。

https://eng-entrance.com/linux-mount
