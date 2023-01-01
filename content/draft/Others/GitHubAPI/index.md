---
title: "Apollo ClientでGitHub APIからコントリビューション情報を取得する"
postdate: "2023-01-07"
update: "2023-01-07"
seriesName: "その他"
seriesSlug: "Others"
description: "Apollo Clientを使い、GitHub APIからデータを取得する方法を解説します。"
tags: ["React", "Apollo Client"]
keywords: ["React", "Apollo Client"]
published: true
---

# Apollo Clientの使い方

このブログとは別で[ポートフォリオサイト](https://www.toriwatari.work/)を作成しています。

そのサイトの中で、こんな風に筆者のGitHubアカウントのコントリビューション情報を表示しているセクションがあります。

![](./images/image01.png)

これは[GitHub GraphQL API](https://docs.github.com/en/graphql)から情報を取得し、そのデータを加工し表示しています。何だかポートフォリオサイトっぽいですね。

エラーハンドリングも行っており、何らかの理由でデータが取得できなかった時には

![](./images/image02.png)

こんな風にエラーメッセージが表示されます。

この記事ではApollo Clientの`useQuery`フックを使用し、GitHub APIからデータを取得する方法とそのエラーハンドリングの方法を解説します（コントリビューション情報を元に草を生やしたりなどのデータ表示に関する解説はありません）。

## 環境

- ⚙ React 18
- ⚙ TypeScript
- ⚙ Apollo Client

## 各種パッケージのインストール

以下のコマンドでReactとTypeScriptをインストールします。

```shell:title=console
$ npx create-react-app reactapp --template=typescript
```

次はApollo Clientとgraphqlをインストールします。

```shell:title=console
$ npm install @apollo/client graphql
```

## GitHubで認証キーを得る

次はGitHubでAPIを叩けるように設定を行います。誰でもAPIを叩けるわけではありませんので、秘密の認証キー(以下、アクセストークン)を手に入れます。

まずはGitHubの[こちらのページ](https://github.com/settings/apps)にアクセスします。恐らく画面左に「Personal Access Tokens」があるので「Tokens(classic)」をクリックします。

![](./images/image03.png)

さらに「Generate new token」をクリックし、こちらもclassicを選択します。

![](./images/image04.png)

「Note」がアクセストークンの名前を表すようなので任意の名前を入力、「Expiration」にはAPIキーの有効期限を設定します。最長1年間のようです。

![](./images/image05.png)

次に「Select Scopes」を設定します。全ての情報を取得できるようにするのではなく、必要なものだけアクセスできるようにしましょう、ということです。

コントリビューション情報を取得するには「read:user」のみにチェックを入れればOKです。

![](./images/image06.png)

チェックを入れたらページの一番下まで移動し、「Generate token」をクリックします。

すると画面遷移し、「ghp_」から始まるアクセストークンが表示されます。いわゆる「一度しか見れない系」の情報ですのでちゃんとコピーしておきます。

![](./images/image07.png)

また、これは秘密にしておかなければならない情報ですので、トークンを保存した`.env`をコミットしたり（後述）、トークンを外部に漏らすようなことがあってはいけません。

ではReactプロジェクトの方に戻ります。プロジェクトルートに`.env`を作成します。そこに`GITHUB_API=`と記入し、先ほどコピーしたアクセストークンを張りつけます。

```env:title=.env
GITHUB_API=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

続けて`.gitignore`に`.env`を追加してステージング対象から外すようにしておきましょう。

```bash:title=.gitignore
# 追記
.env
```

<aside>

ReactではなくNext.jsで利用する場合、かつクライアント側からAPIを利用する場合（今回の記事のような方法はこれに該当します）は、環境変数名は`NEXT_PUBLIC`から始める必要があります。

```env:title=.env
NEXT_PUBLIC_GITHUB_API=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

</aside>

## GraphQLクエリーをテストする

Reactでコードを書き始める前に、どのようなクエリーを投げればいいかを確認しておきます。[エクスプローラー - GitHub Docs](https://docs.github.com/ja/graphql/overview/explorer)にアクセスすればクエリーをテストできます。プレイグラウンドでテストするだけですので、読み飛ばしていただいても構いません。

画面右側にある緑色の「Sign in with GitHub」というボタンをクリックしてGitHubにログインします。そうすることでクエリーを実行できるようになります。

![](./images/image08.png)

いきなり例を出しますが、以下のようなクエリーを投げてみます。

```graphql
query {
  user(login: "<自身のアカウント名>") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
```

1年間の総コントリビューション数を表す「totalContributions」と「week」という配列が返され、配列の中に日ごとの日付やコントリビューション数が格納されていることがわかります。

![](./images/image09.png)



