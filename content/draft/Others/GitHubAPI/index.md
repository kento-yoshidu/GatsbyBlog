---
title: "Apollo ClinetでGitHub APIからコントリビューション情報を取得する"
postdate: "2023-01-01"
update: "2023-01-01"
seriesName: "その他"
seriesSlug: "Others"
description: ""
tags: ["Next.js", "Apollo Client"]
keywords: ["Next.js", "Apollo Client"]
published: false
---

# 

このブログとは別で[ポートフォリオサイト](https://www.toriwatari.work/)を作成しています。

そのサイトの中で、こんな風に筆者のGitHubアカウントのコントリビューション情報を表示しているセクションがあります。

![](./images/image01.png)

これは[GitHub GraphQL API](https://docs.github.com/en/graphql)から情報を取得し、そのデータを加工し表示しています。

もちろんエラーハンドリングも行っており、何らかの理由でデータが取得できなかった時には、

![](./images/image02.png)

と表示されます。

この記事ではApollo Clientの`useQuery`フックを使用し、GitHub APIからデータを取得する方法とそのエラーハンドリングの方法を解説します（コントリビューション情報を元に草を生やしたりなどのデータ表示に関する解説はありません）。

## 環境

- Next.js 12
- Apollo Client

