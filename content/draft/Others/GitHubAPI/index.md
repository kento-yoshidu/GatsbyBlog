---
title: "Apollo ClientでGitHub APIからコントリビューション情報を取得する"
postdate: "2023-01-07"
update: "2023-01-07"
seriesName: "その他"
seriesSlug: "Others"
description: "Apollo Clientを使い、GitHub APIからデータを取得する方法を解説します。"
tags: ["React", "Apollo Client"]
keywords: ["React", "Apollo Client"]
published: false
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

ではReactプロジェクトの方に戻ります。プロジェクトルートに`.env`を作成します。そこに`REACT_APP_GITHUB_API=`と記入し、先ほどコピーしたアクセストークンを張りつけます（環境変数名は`REACT_APP`から始める必要があります）。

```env:title=.env
REACT_APP_GITHUB_API=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

続けて`.gitignore`に`.env`を追加してステージング対象から外すようにしておきましょう。

```bash:title=.gitignore
# 追記
.env
```

<aside>

ReactではなくNext.jsで利用する場合、かつクライアント側から環境変数を利用する場合（今回の記事のような方法はこれに該当します）は、環境変数名は`NEXT_PUBLIC`から始める必要があります。

```bash:title=.env
# Reactの場合
REACT_APP_GITHUB_API=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Next.jsの場合
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

## ReactからAPIを利用する

ではReact側でAPIを叩くコードを書いてみます。コンポーネントに切り出してもいいですが、ここでは`app.tsx`にロジックを書くことにします。

まずは`gql`をインポートし、GraphQLクエリーを変数として定義しておきます。

```tsx:title=app.tsx
import { gql } from "@apollo/client"

const Query = gql`
  query {
    user(login: "<アカウント名>") {
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
`
```

続いて、Apollo Clientの接続先、認証情報、キャッシュ設定が格納されたApollo Clientインスタンスを変数`client`に保存します。


```tsx:title=app.tsx
// ApolloClientとInMemoryCacheを追加
import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {authorization: `Bearer ${process.env.REACT_APP_GITHUB_API}`},
  cache: new InMemoryCache()
})
```

これで接続準備は整いました。以下のようにuseQueryを利用します。

```tsx:title=app.tsx
// useQueryを追加
import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client"

// 略

function App() {
  const { loading, error, data } = useQuery(Query, {
    client
  });

  if (loading) {
    console.log(loading)
  }

  if (error) {
    console.log("error has occurred", error)
  }

  console.log({ data })

  return (
    <>
      <h1>Apollo Client</h1>
    </h1>
  )
}
```

`npm run start`でReactアプリを起動し、デベロッパーツールを使ってコンソール出力を確認します。

`loading...`が出力され、その後にデータが取得されていることがわかります。

![](./images/image10.png)

もしエラーが出力される場合は、

- ・ アクセスキーが間違っている
- ・ 環境変数から値が取得できていない

などの理由があります。

### loading

APIからデータを取得している間は`loading`が`true`になっています。実際は以下のようにローディング中で表すメッセージを返したり、コンポーネントを表示させるのがいいでしょう。

```tsx:title=app.tsx
if (loading) {
  return (
    <p>データを取得しています...</p>
  )
}
```

「データの取得が速すぎてメッセージが表示されているのか分からない」