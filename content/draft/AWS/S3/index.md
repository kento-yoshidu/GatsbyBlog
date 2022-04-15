---
title: "Amazon S3"
postdate: "2021-06-25"
update: "2021-06-25"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "AWS SAA", "S3"]
draft: true
---

# S3

オブジェクトストレージの1種。Key-Value型。

99.99999999%の耐久性。

デフォルトで複数AZに冗長化されている。

## バケット

オブジェクトの保存場所。バケット名はグローバルで一意である必要がある。

## オブジェクト

データ、ファイル。一つ一つにURLが付与される。オブジェクト数は無制限。データサイズは**5TB**まで可能。

key、value、バージョンID、メタデータ、サブリソース。

## ストレージクラス

IA = 低頻度アクセス用ストレージ。
One Zone = 一つのAZで保管されるので可用性が落ちる.

|クラス|可用性|特徴|
|---|---|---|
|S3 Standard|99.99%|標準|
|S3 Standard-IA|99.9%|安価。ただし、取り出しに費用が発生する|
|S3 One Zone-IA|99.5%|頻度は低いが、すぐに取り出したいとき|
|S3 Glacier|-|アーカイブ。取り出しに時間と費用がかかる|
|S3 Intelligent-Tiering|
|S3 Glacier Deep Archive|

https://dev.classmethod.jp/articles/3minutes-s3-versioning-lifecycle/

### IA

IAは**Infrequent Access**のことで、低頻度なアクセスの意味を持つ。データの取り出しに料金が発生する。また、最低ストレージ期間が30日である。つまり1日保管しただけで30日分の料金が発生する。

## Intelligent-Tiering

低頻度アクセスのオブジェクトを自動的に低頻度アクセス層に移動させる機能。

強い一貫性。

## アクセス管理

### IAM

IAMユーザー単位での制限ができる。

### バケットポリシー

バケット単位で制御。JSONで設定。他アカウントの制御も可能。

### ACL

バケットと個々のオブジェクトへのアクセスを管理。XMLで設定。他アカウントの制御も可能。

### バブリックアクセス

インターネットからHTTPSで直接アクセスできる。
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

### Glacier

最低ストレージ期間は90日。

## 最小ストレージ期間



## バージョニングの考え方

https://dev.classmethod.jp/articles/3minutes-s3-versioning-lifecycle/

## プロトコル

SFTPを利用してファイルを転送する。
## ライフサイクル

