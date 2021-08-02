---
title: "#1 MongoDBをインストールする"
postdate: "2021-01-21"
updatedate: "2021-03-01"
categoryName: "入門MongoDB"
categorySlug: introMongoDB
description: 
tags: ["MongoDB","入門"]
---

# WindowsにMongoDBをインストールする

[こちら](https://www.mongodb.com/try/download/community)にアクセスし、**MongoDB Community Server**を選択します。

![](./images/image01.jpg)

下記の通り、ダウンロードするバージョン等を選択できます。Downloadをクリックすれば、インストーラをダウンロードできます。

![](./images/image02.jpg)

インストーラを実行します。

![](./images/image03.jpg)

同意して
![](./images/image04.jpg)


![](./images/image05.jpg)

![](./images/image06.jpg)
![](./images/image07.jpg)
![](./images/image08.jpg)
![](./images/image09.jpg)
![](./images/image10.jpg)
![](./images/image11.jpg)

ついでに`version()`コマンドでバージョンも確認しときましょう。

```shell
$ mongo
MongoDB shell version v4.4.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("4a5d045d-ef2a-4161-be64-2b6a3404de8c") }
MongoDB server version: 4.4.3
---
The server generated these startup warnings when booting:
        2021-01-25T09:58:28.440+09:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
---
---
        Enable MongoDB's free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

> version()
4.4.3
```

とりあえず

データベースを作成する

データベースを作成するには、useコマンドを使用します。

```shell
> use test
switched to db test
```

これだけ！簡単！

コレクション（テーブル）を作成する。

```shell
> db.createCollection("testColl")
{ "ok" : 1 }
```

これまた簡単！

`show dbs`コマンドで、データベース一覧を表示させることができます。
```shell
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
```


```shell
> db.testColl.insertOne({name: "kento", age: 17})
{
  "acknowledged" : true,
  "insertedId" : ObjectId("600e1f8cbf91faeb9710fd92")
}
```

```shell
> db.testColl.find()
{ "_id" : ObjectId("600e1f8cbf91faeb9710fd92"), "name" : "kento", "age" : 17 }
```

## Robo 3Tをインストールする

MongoDBのGUIツールは様々ありますが、個人的にはRobo 3Tというツールが使いやすかったのでずっと使っています。


(こちら)[https://robomongo.org/download]にアクセスします。
**Download Robo 3T Only**を選択します。

![](./images/image12.jpg)

![](./images/image13.jpg)

![](./images/image14.jpg)

完了したらexeを実行します。

![](./images/image15.jpg)
![](./images/image16.jpg)
![](./images/image17.jpg)
![](./images/image18.jpg)
![](./images/image19.jpg)
![](./images/image20.jpg)
![](./images/image21.jpg)
![](./images/image22.jpg)
![](./images/image24.jpg)
![](./images/image23.jpg)
