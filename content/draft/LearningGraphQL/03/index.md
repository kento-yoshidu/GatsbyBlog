---
title: "#2 graphql-yoga🧘でMongoDBに接続する"
postdate: "2021-03-01"
update: "2021-03-02"
seriesName: "入門GraphQL"
seriesSlug: introGraphQL
tags: ["GraphQL", "GraphQL-Yoga", "入門"]
---

# graphql-yogaでMongoDBに接続する

前回まではサーバスクリプトに記載したオブジェクトからデータを取得しました。

## 前提

- Node.jsをインストールしていること
- MongoDBをインストールしていること
- MongoDBの基本的な操作ができること

## 環境

```shell

$ Windows10 Pro 64bit

$ node -v
v14.15.4

$ yarn -v
1.22.5

$ mongo --version
MongoDB shell version v4.4.4

$ mongoose 5.11.18
```

## まずはコレクションを用意しておく

ここで、「MongoDBはDockerを使って…」などとやり出すと話が横道に逸れるので、今回はWindowsに直接MongoDBを入れていることを前提とします。
<!--MongoDBがインストールされていない方は[こちら](https://blog.toriwatari.work/introMongoDB/)を確認ください。-->

今回はCLIでドキュメントを追加します。フィールドは数値型の`id`と文字列型の`name`の2つです。

```shell
# MongoDBにログイン
$ mongo

# DBの作成と選択
> use graphqlTest;
switched to db graphqlTest

# usersコレクションにドキュメントを登録します
> db.users.insert({id: 1, name: "kento"});
WriteResult({ "nInserted" : 1 })

# `find`でドキュメントが登録されたことを確認しておきます
> db.users.find({});
{ "_id" : ObjectId("603e2036d4f2edb3d330ca42"), "id" : 1, "name" : "kento" }

# もう一件登録しておきます
> db.users.insert({id: 1, name: "kento"});
WriteResult({ "nInserted" : 1 })
```

これでMongoDBに2件のドキュメントが登録されました。

## ライブラリのインストール

前回のフォルダーをそのまま使用してもかまいません。私は新しくフォルダーを作成しその中で作業することにします。

主役のgraphql-yogaとMongoDBに接続するモジュールである**mongoose**（マングース）をインストールします🦝。モジュールはこの2つのみでOKです。

```shell
$ yarn init -y

$ yarn add graphql-yoga mongoose

$ cat package.json
{
  ...
  "dependencies": {
    "graphql": "^15.5.0",
    "mongoose": "^5.11.18"
  }
}
```

## graphql-yogaサーバを立てる

index.jsを作成。まずはローカルにサーバーを立てるところまでやっておきましょう。ここでは前回の最初の例をコピーしましたが、サーバーさえ走ればリゾルバーはなんでもかまいません。

```javascript:title=index.js
const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    hello: String!
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello World`
  }
}

const server = new GraphQLServer({typeDefs, resolvers});

server.start(() =>{
  console.log('server is running on localhost:4000');
});
```

GraphQL Playgroundを開き、クエリーを投げて動作確認を行います。

## MongoDBに接続する

では、mongooseを使用してMongoDBに接続します。まずはライブラリからmongooseをインポートします。

```javascript
const mongoose = require('mongoose');
```

MongoDBヘの接続は`connect`メソッドを使用します。`mongodb://ホスト名/DB名`という形式で記述します。

```javascript
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/graphqlTest");
```

ここで`node index.js`でサーバを走らせます。

```shell
$ node index.js
(node:13424) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:13424) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNew
UrlParser: true } to MongoClient.connect.
(node:13424) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server
Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
server is running on localhost:4000
(node:13424) DeprecationWarning: Listening to events on the Db class has been deprecated and will be removed in the next major version.
```

いくつかwarningが出てますがひとまず目をつぶりましょう。DBに接続できているかどうかが大事です。

`connect`はPromiseを返すので以下のように記述して例外をキャッチするように書き換えます。

```javascript:title=index.js
mongoose.connect("mongodb://localhost/graphqlTest")
  .then(() => {
    // 接続成功したとき
    console.log('Connected to MongoDB!')
  })
  .catch((err) => {
    // 失敗したとき
    console.log('Oh My God... ' + err)
  })
```

成功メッセージが表示されればOKです。

```shell
$ node index.js
...
server is running on localhost:4000
...
Connected to MongoDB!
```

### warningを消す

接続には問題ありませんが、やはりwarningは気になります。気になりますよね🙄？

結論から言うと、以下の通りにオプションを渡せばいくつかのwarningは消えます。両方とも、Node.jsの接続ドライバの変更に関するwarningのようです。将来的にはオプションを渡さなくてもいいようになるのでしょうか。

```javascript:title=index.js
// オブジェクト形式でオプションを定義します
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// 第二引数に渡します
mongoose.connect('mongodb://localhost:27017/graphqlTest', connectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err)
  })
```

改めて接続します。

```shell
$ node index.js
(node:11484) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
server is running on localhost:4000
Connected to MongoDB!
```

すみませんが僕のスキルでは説明できませんので、気になる方は以下を参照ください。

参考 : [Mongoose v5.11.18: Deprecation Warnings](https://mongoosejs.com/docs/deprecations.html)

### もしかしたらまだwarningでる😭?

2021年3月現在、mongooseのバージョンによってはwarningがでるかもしれません。

```shell
$ node index.js
(node:11484) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
server is running on localhost:4000
Connected to MongoDB!
```

どうやらNode.jsのドライバの問題のようで、mongooseのバージョンが`5.11.16`以上だとこのwarningが出現するようです。最新のmongooseをインストールしたところ、今回は`5.11.18`がインストールされましたのでwarningが出ましたが、`5.11.15`を指定してインストールみたらwarningは出現しませんでした。

そのうち解消されるようですし、出たとしても特段支障は出ないので気にしなくてもOKです。

すみませんが、これも以下を参照ください。

[Warning: Accessing non-existent property &#39;MongoError&#39; of module exports inside circular dependency - Drivers &amp; ODMs - MongoDB Developer Community Forums](https://developer.mongodb.com/community/forums/t/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-circular-dependency/15411)

[node.js - Warning: Accessing non-existent property &#39;MongoError&#39; of module exports inside circular dependency - Stack Overflow](https://stackoverflow.com/questions/66185671/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-c)

## スキーマを定義する

MongoDBはスキーマレスですが、mongooseで接続する時にはスキーマを定義する必要があります。

まず、schameフォルダを作成し、その中に`userSchame.js`を作成します（この辺はGraphQLではなくMongoDBとmongooseの話ですがお付き合いください。）。




# 参考

[Playing with GraphQL yoga and mongoose - DEV Community](https://dev.to/aurelkurtula/playing-with-graphql-yoga-and-mongoose-f4f)

[mongoose - npm](https://www.npmjs.com/package/mongoose)

[Get a GraphQL server up and running in 5 minutes using graphql-yoga and mongoose | Hacker Noon](https://hackernoon.com/get-a-graphql-server-up-and-running-in-5-minutes-using-graphql-yoga-and-mongoose-2740e36e961e)