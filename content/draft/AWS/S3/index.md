---
title: "AWS SAA勉強メモ Amazon S3"
postdate: "2021-06-25"
updatedate: "2021-06-25"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "AWS SAA", "S3"]
---

## ストレージクラス

|クラス|
|---|
|S3 Standard|
|S3 Standard-IA|
|S3 Intelligent-Tiering|
|S3 One Zone-IA|
|S3 Glacier|
|S3 Glacier Deep Archive|

https://dev.classmethod.jp/articles/3minutes-s3-versioning-lifecycle/

### IA

IAは**Infrequent Access**のことで、低頻度なアクセスの意味を持つ。データの取り出しに料金が発生する。また、最低ストレージ期間が30日である。つまり1日保管しただけで30日分の料金が発生する。

### Glacier

最低ストレージ期間は90日。

## 最小ストレージ期間



## バージョニングの考え方

https://dev.classmethod.jp/articles/3minutes-s3-versioning-lifecycle/

## プロトコル

SFTPを利用してファイルを転送する。
## 暗号化方式

サーバー側（S3上）で暗号化する方法と、クライアント側で暗号化してからS3に送る方法がある。

SSEは「Server Side Encryption」つまり、サーバー側暗号化のこと。暗号化作業はS3上で行われるが、暗号化キーを**どこで生成、管理するか**によって、3種類に分類される。

### SSE-S3

S3が暗号化キーの生成と管理と保管を行う。暗号化自体には費用はかからない。AES-256で暗号化。

### SSE-KMS

KMSが暗号化キーを生成、管理、保管。KMSに対するAPIコールのたびに費用が発生する。

KMSの設定が必要になるが、これにより任意のキーを用いて暗号化することが可能になる。また、CloudTrailでログを追跡することができるようにもなる。

### SSE-C

ユーザーが暗号化キーの生成から保管まで、全てを行う。

クライアント側で暗号化キーを管理。

https://dev.classmethod.jp/articles/lim-s3-sse-2021/

https://blog.usize-tech.com/s3-encryption/

https://tech-dive.xyz/2018/10/29/post-122/

## ライフサイクル

