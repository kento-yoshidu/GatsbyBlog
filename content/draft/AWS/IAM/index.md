---
title: "AWS SAAメモ IAM"
postdate: "2021-06-21"
update: "2021-06-22"
seriesName: "AWS SAA勉強メモ"
seriesSlug: "AWS"
description: ""
tags: ["AWS", "SAA", "IAM"]
draft: true
---

# IAM

AWS Identity and Access Managementの略。アイアムと読む。

アカウントや権限を設定。

「このユーザーはこのS3にアクセスできる」みたいな権限設定を柔軟にできる。

IAMユーザーを作成してもどのサービスにもアクセスできない。権限を付与する必要がある。

## AIMポリシー

具体的な権限設定内容。JSONで書く。ユーザー、対象のAWSサービス、対象のリソースを並べ、許可する（もしくはしない）という内容。

以下はS3にアクセスするIAMポリシーの内容。

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Action": [
				// 対象のサービス。S3
				"s3:GetObjectLegalHold"
			],
			// 許可するか。許可する
			"Effect": "Allow",
			"Resource": [
				// 対象のリソース。S3のリソース名
				"arn:aws:s3:::😀😀😀😀/*"
			],
			"Condition": {
				// IPアドレスで絞る
				"IpAddress": {
					// 送信元IPアドレスで絞る
					"aws:SourceIP"
						// アドレスを指定
						["1.1.1.1"]
				}
			},
		},
	]
}
```

- Action: 対象のAWSサービス。S3だったりEC2だったり。
- Effect: アクセスを許可するかしないか。
- Resource: 対象のリソース。S3バケットだったりEC2インスタンスだったり。
- Condition: 条件。いっぱい種類がある。

## IAMユーザー

IAMポリシーをアタッチされたユーザー。

## IAMロール

エンティティ(ユーザー、別アカウント、サービス間、リソース間)のアクセス権限を設定する。



IAMによって新しいユーザを作成した際に、アクセスキー IDとシークレットアクセスキーによりセキュリティ認証を生成します。

## 参考

https://dev.classmethod.jp/articles/aws-iam-policy/