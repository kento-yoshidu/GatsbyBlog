---
title: "#1 ESLint入門"
postdate: "2100-01-01"
update: "2100-01-01"
seriesName: "ESLint入門"
seriesSlug: "ESLint"
description: 
tags: ["JavaScript", "ESLint"]
draft: true
---

# ESLintでコードチェックを始めよう

この講座ではJavaScriptの**静的解析ツール**であるESLintの使い方を紹介します。

ESLintはいわゆるリンター（Linter）であり、使用することで構文チェックを事前に行うことができます。

JavaScriptの基本的な書き方が分かっていること、Node.jsがインストールされていてNPMないしYARNが使用できれば始められます。

## インストール

ESLintはnpmパッケージとして配布されているため、パッケージマネージャーであるnpmないしyarnを使用してインストールします。

まずは`npm init`します。デフォルトのまま、Enterキーを押していってください。概ね、以下のように進んでいくはずです。

```shell
$ npm init

package name: (eslinttest)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to C:\ws2\eslinttest\package.json:

{
  "name": "eslinttest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

続けて、`eslint`パッケージをインストールします。

```shell
$ npm install -D eslint

+ eslint@7.32.0
added 118 packages from 68 contributors and audited 118 packages in 54.85s
```

```shell
$ cat package.json

{
  ...(略)
  "devDependencies": {
    "eslint": "^7.32.0"
  }
}
```

ESLintの実行には設定ファイルが必要です。推奨はJSON形式の`.eslintrc.json`です。

`eslint --init`とすることで対話形式で`eslintrc.json`を作成することもできますが、まずは手動で最小構成の状態のファイルを作ってみましょう。

ルートフォルダに`.eslintrc.json`を作成します。先頭に`.`が付いていて隠しファイルになっていることに注意してください。

```shell
$ touch .eslintrc.json
```

中には1行だけ、`{}`と記述してください。これだけでもESLintは動作します。

次に、チェックしたいスクリプトを用意します。ルート直下に置いて構いません。中身は以下のように、1行だけ記述してみてください。

```script.js
console.log("test");
```

`yarn lint`とコンソールで打つだけで`script.js`をチェックしてくれるように、`package.json`を編集します。

```json

  ...(略)
  "devDependencies": {
    "eslint": "^7.32.0"
  },
  "scripts": {
    "lint": "eslint script.js"
  }
}
```

ではいよいよESLintを実行します。`yarn lint`と実行し、特にエラーなどが表示されずに終了すればOKです。

```shell
$ yarn lint
yarn run v1.22.5
$ eslint script.js
Done in 0.48s.
```

これでは味気ないので、ルールを設定して実行してみます。

```json
{
  "rules": {
    "quotes": ["warn", "single"]
  }
}
```

「クオートに関してはシングルクオートを使用する。シングルクオートでない場合はwarningを出す」旨の設定内容です。

`script.js`では

```shell
$ yarn lint

C:\workspace\eslinttest\script.js
  1:13  warning  Strings must use singlequote  quotes

✖ 1 problem (0 errors, 1 warning)
  0 errors and 1 warning potentially fixable with the `--fix` option.

Done in 0.53s.
```

### semi

セミコロンを付けるか付けないか。

```json
{
	"rules": {
    // 常に行末のセミコロンが必要
		"semi": ["warn", "always"]
    // 行末にセミコロンを付けてはいけない
		//"semi": ["warn", "never"]
	}
}
```

```javascript
console.log('test')
//=> warning
```


