---
title: "#2 graphql-yogað§ã§MongoDBã«æ¥ç¶ãã"
postdate: "2021-03-01"
updatedate: "2021-03-02"
categoryName: "å¥éGraphQL"
categorySlug: introGraphQL
tags: ["GraphQL", "GraphQL-Yoga", "å¥é"]
---

# graphql-yogaã§MongoDBã«æ¥ç¶ãã

ååã¾ã§ã¯ãµã¼ãã¹ã¯ãªããã«è¨è¼ãããªãã¸ã§ã¯ããããã¼ã¿ãåå¾ãã¾ããã

## åæ

- Node.jsãã¤ã³ã¹ãã¼ã«ãã¦ãããã¨
- MongoDBãã¤ã³ã¹ãã¼ã«ãã¦ãããã¨
- MongoDBã®åºæ¬çãªæä½ãã§ãããã¨

## ç°å¢

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

## ã¾ãã¯ã³ã¬ã¯ã·ã§ã³ãç¨æãã¦ãã

ããã§ããMongoDBã¯Dockerãä½¿ã£ã¦â¦ããªã©ã¨ããåºãã¨è©±ãæ¨ªéã«é¸ããã®ã§ãä»åã¯Windowsã«ç´æ¥MongoDBãªããPostgreSQLãå¥ãã¦ãããã¨ãåæã¨ãã¾ãã

â»Dockerã§MongoDBãæ±ãã®ã¯å¾ã»ã©è¨äºã«ãã¾ãã

MongoDBãã¤ã³ã¹ãã¼ã«ããã¦ããªãæ¹ã¯[ãã¡ã](https://blog.toriwatari.work/introMongoDB/)ãç¢ºèªãã ããã

ä»åã¯CLIã§ãã­ã¥ã¡ã³ããè¿½å ãã¾ãããã£ã¼ã«ãã¯æ°å¤åã®`id`ã¨æå­ååã®`name`ã®2ã¤ã§ãã

```shell
# MongoDBã«ã­ã°ã¤ã³
$ mongo

# DBã®ä½æã¨é¸æ
> use graphqlTest;
switched to db graphqlTest

# usersã³ã¬ã¯ã·ã§ã³ã«ãã­ã¥ã¡ã³ããç»é²ãã¾ã
> db.users.insert({id: 1, name: "kento"});
WriteResult({ "nInserted" : 1 })

# `find`ã§ãã­ã¥ã¡ã³ããç»é²ããããã¨ãç¢ºèªãã¦ããã¾ã
> db.users.find({});
{ "_id" : ObjectId("603e2036d4f2edb3d330ca42"), "id" : 1, "name" : "kento" }

# ããä¸ä»¶ç»é²ãã¦ããã¾ã
> db.users.insert({id: 1, name: "kento"});
WriteResult({ "nInserted" : 1 })
```

ããã§MongoDBã«2ä»¶ã®ãã­ã¥ã¡ã³ããç»é²ããã¾ããã

## ã©ã¤ãã©ãªã®ã¤ã³ã¹ãã¼ã«

ååã®ãã©ã«ãããã®ã¾ã¾ä½¿ç¨ãã¦ããã¾ãã¾ãããç§ã¯æ°ãããã©ã«ããä½æããã®ä¸­ã§ä½æ¥­ãããã¨ã«ãã¾ãã

ä¸»å½¹ã®graphql-yogaã¨MongoDBã«æ¥ç¶ããã¢ã¸ã¥ã¼ã«ã§ãã**mongoose**ï¼ãã³ã°ã¼ã¹ï¼ãã¤ã³ã¹ãã¼ã«ãã¾ããã¢ã¸ã¥ã¼ã«ã¯ãã®2ã¤ã®ã¿ã§OKã§ãã

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

## graphql-yogaãµã¼ããç«ã¦ã

index.jsãä½æãã¾ãã¯ã­ã¼ã«ã«ã«ãµã¼ããç«ã¦ãã¨ããã¾ã§ãã£ã¦ããã¾ããããããã§ã¯ååã®æåã®ä¾ãã³ãã¼ãã¾ãããããµã¼ãããèµ°ãã°ãªã¾ã«ãã¯ãªãã§ããã¾ãã¾ããã

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

## MongoDBã«æ¥ç¶ãã

ã§ã¯ãmongooseãä½¿ç¨ãã¦MongoDBã«æ¥ç¶ãã¾ããã¾ãã¯ã©ã¤ãã©ãªããmongooseãã¤ã³ãã¼ããã¾ãã

```javascript
const mongoose = require('mongoose');
```

MongoDBãã®æ¥ç¶ã¯`connect`ã¡ã½ãããä½¿ç¨ãã¾ãã`mongodb://ãã¹ãå/DBå`ã¨ããå½¢å¼ã§è¨è¿°ãã¾ãã

```javascript
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/graphqlTest");
```

ããã§`node index.js`ã§ãµã¼ããèµ°ããã¾ãã

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

ããã¤ãwarningãåºã¦ã¾ããã²ã¨ã¾ãç®ãã¤ã¶ãã¾ããããDBã«æ¥ç¶ã§ãã¦ãããã©ãããå¤§äºã§ãã

`connect`ã¯Promiseãè¿ãã®ã§ä»¥ä¸ã®ããã«è¨è¿°ãã¦ä¾å¤ãã­ã£ããããããã«æ¸ãæãã¾ãã

```javascript:title=index.js
mongoose.connect("mongodb://localhost/graphqlTest")
  .then(() => {
    // æ¥ç¶æåããã¨ã
    console.log('Connected to MongoDB!')
  })
  .catch((err) => {
    // å¤±æããã¨ã
    console.log('Oh My God... ' + err)
  })
```

æåã¡ãã»ã¼ã¸ãè¡¨ç¤ºãããã°OKã§ãã

```shell
$ node index.js
...
server is running on localhost:4000
...
Connected to MongoDB!
```

### warningãæ¶ã

æ¥ç¶ã«ã¯åé¡ããã¾ãããããã¯ãwarningã¯æ°ã«ãªãã¾ããæ°ã«ãªãã¾ããã­ðï¼

çµè«ããè¨ãã¨ãä»¥ä¸ã®éãã«ãªãã·ã§ã³ãæ¸¡ãã°ããã¤ãã®warningã¯æ¶ãã¾ããä¸¡æ¹ã¨ããNode.jsã®æ¥ç¶ãã©ã¤ãã®å¤æ´ã«é¢ããwarningã®ããã§ããå°æ¥çã«ã¯ãªãã·ã§ã³ãæ¸¡ããªãã¦ãããããã«ãªãã®ã§ããããã

```javascript:title=index.js
// ãªãã¸ã§ã¯ãå½¢å¼ã§ãªãã·ã§ã³ãå®ç¾©ãã¾ã
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// ç¬¬äºå¼æ°ã«æ¸¡ãã¾ã
mongoose.connect('mongodb://localhost:27017/graphqlTest', connectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err)
  })
```

æ¹ãã¦æ¥ç¶ãã¾ãã

```shell
$ node index.js
(node:11484) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
server is running on localhost:4000
Connected to MongoDB!
```

ãã¿ã¾ãããåã®ã¹ã­ã«ã§ã¯èª¬æã§ãã¾ããã®ã§ãæ°ã«ãªãæ¹ã¯ä»¥ä¸ãåç§ãã ããã

åè : [Mongoose v5.11.18: Deprecation Warnings](https://mongoosejs.com/docs/deprecations.html)

### ããããããã¾ã warningã§ãð­?

2021å¹´3æç¾å¨ãmougooseã®ãã¼ã¸ã§ã³ã«ãã£ã¦ã¯warningãã§ãããããã¾ããã

```shell
$ node index.js
(node:11484) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
server is running on localhost:4000
Connected to MongoDB!
```

ã©ãããNode.jsã®ãã©ã¤ãã®åé¡ã®ããã§ãmongooseã®ãã¼ã¸ã§ã³ã`5.11.16`ä»¥ä¸ã ã¨ãã®warningãåºç¾ããããã§ããææ°ã®mongooseãã¤ã³ã¹ãã¼ã«ããã¨ãããä»åã¯`5.11.18`ãã¤ã³ã¹ãã¼ã«ããã¾ããã®ã§warningãåºã¾ãããã`5.11.15`ãæå®ãã¦ã¤ã³ã¹ãã¼ã«ã¿ããwarningã¯åºç¾ãã¾ããã§ããã

ãã®ãã¡è§£æ¶ãããããã§ãããåºãã¨ãã¦ãç¹æ®µæ¯éã¯åºãªãã®ã§æ°ã«ããªãã¦ãOKã§ãã

ãã¿ã¾ãããããããä»¥ä¸ãåç§ãã ããã

[Warning: Accessing non-existent property &#39;MongoError&#39; of module exports inside circular dependency - Drivers &amp; ODMs - MongoDB Developer Community Forums](https://developer.mongodb.com/community/forums/t/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-circular-dependency/15411)

[node.js - Warning: Accessing non-existent property &#39;MongoError&#39; of module exports inside circular dependency - Stack Overflow](https://stackoverflow.com/questions/66185671/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-c)

## ã¹ã­ã¼ããå®ç¾©ãã

MongoDBã¯ã¹ã­ã¼ãã¬ã¹ã§ãããmongooseã§æ¥ç¶ããæã«ã¯ã¹ã­ã¼ããå®ç¾©ããå¿è¦ãããã¾ãã

ã¾ããschameãã©ã«ããä½æãããã®ä¸­ã«`userSchame.js`ãä½æãã¾ãï¼ãã®è¾ºã¯GraphQLã§ã¯ãªãMongoDBã¨mongooseã®è©±ã§ãããä»ãåããã ãããï¼ã




# åè

[Playing with GraphQL yoga and mongoose - DEV Community](https://dev.to/aurelkurtula/playing-with-graphql-yoga-and-mongoose-f4f)

[mongoose - npm](https://www.npmjs.com/package/mongoose)

[Get a GraphQL server up and running in 5 minutes using graphql-yoga and mongoose | Hacker Noon](https://hackernoon.com/get-a-graphql-server-up-and-running-in-5-minutes-using-graphql-yoga-and-mongoose-2740e36e961e)