---
title: "#2 graphql-yogaでGraphQLサーバーを立てる"
postdate: "2021-09-24"
update: "2021-09-24"
seriesName: "ラーニングGraphQL"
seriesSlug: "LearningGraphQL"
tags: ["GraphQL", "graphql-yoga"]
---

# graphql-yoga🧘を使ってみる

なかなかGraphQLに慣れない。GraphQLを手軽に操作検証できるように、勉強がてらNode.js環境でローカルサーバーを立てます。

サーバーライブラリーはいくつかありますが、シンプルそうだったのでまずは`graphql-yoga`を使用してみたいと思います。色々と細かい部分で不明な所はありますが、とりあえずはやってみます。

公式ページ？である[こちら](https://github.com/prisma-labs/graphql-yoga)を参考にしました。今回はgraphql-yogaでサーバーを立て、queryでデータを取得するところまでやります。クライアントはgraphql-yogaについてくるGraphQL Playgroundというのを使います。

肝心のデータですが、いきなりDBに接続するのはハードルが高いので、サーバースクリプトにオブジェクト形式で記述した値を取得することにしたいと思います。

この後の記事ではMongoDBやPostgreSQLに接続してデータ取得を行いたいと思います。

## 環境

```shell
$ node -v
v14.17.0

$ yarn -v
1.22.5
```

## まずは最小構成

`yarn init -y`して、サーバーライブラリーの`graphql-yoga`をインストールします。

```shell
$ yarn init -y

$ yarn add graphql-yoga

$ cat package.json
{
  ...(略)
  "dependencies": {
    "graphql-yoga": "^1.18.3"
  }
}
```

ルートディレクトリに`index.js`を作成し、以下の通りに記述します。まずは最小構成という事で、"Hello World"と返すだけのhelloクエリを定義します。

```javascript:title="index.js"
const { GraphQLServer } = require("graphql-yoga");

// クエリーのスキーマを定義
const typeDefs = `
  type Query {
    hello: String!
  }
`
const resolvers = {
  Query: {
    // helloクエリ
    hello: () => `Hello World`
  }
}

const server = new GraphQLServer({typeDefs, resolvers});

server.start(() => {
  console.log('Server is running on localhost:4000');
})
```

まず、`typeDefs`にスキーマを定義します。

GraphQLでは、データを取得する時には**Query**、データの登録・更新・削除の場合には**Mutation**を投げます。

今回の例題では`Hello World`という文字列を返すだけのサーバーを立てるので、データを取得する`Query`について、`hello`クエリーについて、文字列を返すスキーマを定義します。具体的には以下のようになります。

```javascript

// スキーマを定義
const typeDefs = `

  type Query {
    // helloクエリーが文字列を返す
    hello: String!
  }
`
```

`String`の後ろに`!`を付与していますが、これは必ず文字列のデータを返すという意味です（nullにはならない）。

スキーマを定義した後は、`resolvers`を用意して、クエリーがどんな値を返すかを実際に定義します。

```javascript
const resolvers = {
  Query: {
    // helloクエリがHello Worldを返す
    hello: () => `Hello World`
  }
}
```

---

スキーマ情報とリゾルバーは、インスタンス生成する時の必須の引数です。

では、サーバを起動します。

```shell
$ node index.js

Server is running on localhost:4000
```

ブラウザを立ち上げ`http://localhost:4000`にアクセスすると、GraphQL Playgroundが現れます（かっこいいですね）。簡易的なクライアントとして使用でき、サーバーに対して様々なクエリを投げることができます。

![](./images/image01.png)

左上のペインに以下の`hello`クエリを入力し、画面真ん中の三角ボタンをクリックします。

```graphql:title="Playground"
  query {
    hello
  }
```

以下のような形で**Hello World**が返されたら成功です。

![](./images/image02.png)

## 引数付きのクエリを作成する

さすがにもう少し凝ったことをしたいので、先ほどのhelloクエリを編集し、自分の名前を渡し「`Hello 名前`」と返ってくるようにしたいと思います。

引数名はnameとし、String型を指定、末尾に`!`をつけて必須にします。

```javascript{3,5}:title=index.js
...(略)

const typeDefs = `
  type Query {
    # 必須の引数にString型のname、戻り値も必須でString型
    hello(name: String!): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, {name}) => {
      `Hello ${ name }`
    }
  }
}

...
```

```graphql:title="GraphQL Playground"
  query {
    hello(name: "kento")
  }

  # result
  {
    "data": {
      "hello": "Hello kento"
    }
  }
```

## 引数を増やす

年齢を格納する数値型のageフィールドを追加します。

```javascript
...

const typeDefs = `
  type Query {
    // ageを追加
    hello(name: String!, age: Int!): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, {name, age}) =>
      `I\'m ${name}. ${age} years old.`
  }
}

...
```

クエリは以下のように投げます。

```graphql
  query {
    hello(name: "kento", age: 33)
  }

  # result
  {
    "data": {
      "hello": "I'm kento. 33 years old."
    }
  }
```

---

渡した値は第二引数にオブジェクト形式で入るらしいので試しにダンプしてみます。

```javascript
...(略)

const typeDefs = `
  type Query {
    # [データ型]で、戻り値を配列に設定
    hello(name: String!, age: Int!): [String]!
  }
`

// プロパティを取得
const resolvers = {
  Query: {
    hello: (_, args) => {

      let result = [];

      Object.keys(args).map(arg => {
        result.push(arg)
      })

      return result
    }
  }
}

...(略)
```

```json:GraphQL Playground
query {
	hello(name: "kento", age: 33)
}

 # result
  {
    "data": {
      "hello": [
        "name",
        "age"
      ]
    }
  }
```

よって、以下のような取り出し方もできます（これはJavaScriptのオブジェクトの扱いの話ですね）。

```javascript
// 分割代入で受け取るか、
hello: (_, {name, age}) => `Hello ${ name }. `)

// argsでまとめて受け取り、nameキーにアクセスして受け取る
hello: (_, args) => `Hello ${ args.name }`)
```

## クエリを投げてデータを取得する

いよいよクエリからデータを取得してみたいと思います。DBに接続してクエリを投げて、、、と行きたいですが、まずは`index.js`にデータをハードコートして、それを取得してみます。

まず、データをオブジェクト形式で定義します。適当にpersonalDataなどとします。

```javascript
const personalData = [
  {
    id: 1,
    name: "kento"
  },
  {
    id: 2,
    name: "hikari"
  }
]
```

次にスキーマを定義します。

```javascript
const typeDefs = `
  type Data {
    id: Int,
    name: String,
  }
  type Query {
    data: [Data]
  }
`
```

以下のようなスクリプトを用意します。

```javascript
const { GraphQLServer } = require("graphql-yoga");

const personalData = [
  {
    id: 1,
    name: "kento"
  },
  {
    id: 2,
    name: "hikari"
  },
  {
    id: 3,
    name: "hiroshi"
  },
  {
    id: 4,
    name: "ayaka"
  },
]

const typeDefs = `
  type Data {
    id: Int,
    name: String,
  }
  type Query {
    data: [Data]
  }
`
const resolvers = {
  Query: {
    data: () => personalData
  }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log('Server is running on localhost:4000');
})
```

これまでと同じように`localhost:4000`にアクセスして、GraphQL Playgroudを開きます。

クエリは以下のように投げます。

```graphql
query {
  data {
    id,
    name
  }
}

# result
{
  "data": {
    "data": [
      {
        "id": 1,
        "name": "kento"
      },
      {
        "id": 2,
        "name": "hikari"
      },
      {
        "id": 3,
        "name": "hiroshi"
      },
      {
        "id": 4,
        "name": "ayaka"
      }
    ]
  }
}
```

見事！データを取得できました。

今回はここまでにしたいと思います。次回はMongoDBを用意してDBからデータを取得する方法を考えたいと思います。

> - obj The previous object, which for a field on the root Query type is often not used.
> - args The arguments provided to the field in the GraphQL query.
> - context A value which is provided to every resolver and holds important contextual information like the currently logged in user, or access to a database.
> - info A value which holds field-specific information relevant to the current query as well as the schema details, also refer to type GraphQLResolveInfo for more details.

# 参考

[prisma-labs/graphql-yoga](https://github.com/prisma-labs/graphql-yoga)

[graphql-yoga/index.js at master · prisma-labs/graphql-yoga](https://github.com/prisma-labs/graphql-yoga/blob/master/examples/fullstack/server/index.js)

[Resolvers - Apollo Server - Apollo GraphQL Docs](https://www.apollographql.com/docs/apollo-server/data/resolvers/)

https://apollographql-jp.com/tutorial/resolvers/


https://medium.com/@gbolahanolawuyi/setting-up-a-graphql-server-with-node-graphql-yoga-prisma-a3f59d33dac0

[How To Build a GraphQL Server in Node.js Using GraphQL-yoga and MongoDB | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-build-a-graphql-server-in-node-js-using-graphql-yoga-and-mongodb)

https://graphql.org/learn/execution/#root-fields-resolvers