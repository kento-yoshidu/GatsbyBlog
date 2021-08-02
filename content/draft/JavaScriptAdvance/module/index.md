---
title: "#5 モジュールシステム"
postdate: "2021-04-28"
updatedate: "2021-04-28"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: "JavaScriptの持つデータ型について解説します。長くなってしまうので前後2つの記事に分けて解説します。"
tags: ["JavaScript"]
---

## モジュールの歴史

- JavaScriptにはモジュールがなかった。
- `CommonJS`、`AMD`、`ESModules`は仕様の名前

# CommonJsによるexport

```javascript

// module.jsから関数をエクスポート
module.exports.test = () => {
  consoel.log('testモジュール');
}

// script.js
const test = require('./module.js');

test.test();
// => testモジュール

/*****************************************/

// module.jsから関数をエクスポート
module.exports.test = "testモジュール";

// script.js
const { test } = require('./script')

console.log(test)
// => testモジュール

/*****************************************/

// mojule.jsからオブジェクトをエクスポート
module.exports.test = {
  name: "kento",
  age: 42,
}

// script.js
const { test } = require('./module')

console.log(test)
```

[Node.jsでimportでES moduleのコードが動作しないときの対処法](https://iwb.jp/nodejs-esmodule-code-import-error/)j:w


[Node.js における ES Modules を理解する](https://numb86-tech.hatenablog.com/entry/2020/08/07/091142)

[JavaScript のモジュールを理解する](https://blog.ikeryo1182.com/javascript-modules/)

[JavaScriptのモジュールの歴史](https://uuuundefined.tokyo/blog/javascript-modules)

[CommonJS のモジュールシステムをおさらい](https://hysryt.com/archives/1542)

[Node.jsとECMAScript Modules](https://blog.hiroppy.me/entry/nodejs-esm)