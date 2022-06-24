---
title: TypeScript環境構築
postdate: 2021-01-15
updatedate: 2021-01-27
categoryName: "入門TypeScript"
categorySlug: introTypescript
tags: ["TypeScript", "入門"]
---

# 最小構成

まずは`npm --init`。

```shell
$ npm init -y
```

typescriptコンパイラのインストール。

```shell
$ yarn add --dev typescript

info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ typescript@4.1.3
info All dependencies
└─ typescript@4.1.3
Done in 7.75s.

$ cat package.json
{
  "name": "ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^4.1.3"
  }
}

$ cat yarn.lock

typescript@^4.1.3:
  version "4.1.3"
  resolved "https://registry.yarnpkg.com/typescript/-/typescript-4.1.3.tgz#519d582bd94cba0cf8934c7d8e8467e473f53bb7"
  integrity sha512-B3ZIOf1IKeH2ixgHhj6la6xdwR9QrLC5d1VKeCSY4tvkqhF2eqd9O7txNlS0PO3GrBAFIdr3L1ndNwteUbZLYg==
```

コンパイルに関する設定ファイルを作成します。コマンドを実行すると、tsconfig.jsonファイルが作成されます。

```shell
$ npx tsc --init

message TS6071: Successfully created a tsconfig.json file.

$ ls

node_modules/  package.json  tsconfig.json  yarn.lock
```

tsconfig.jsonを以下のように修正します。

```Javascript
{
  "compilerOptions": {
    // 出力されるjavaScriptのバージョンを指定
    "target": "es5",
    // モジュール化の規格
    "module": "commonjs",
    // アウトプット先
    "outDir": "./dist",
    // strictモード "useStrict"が付与される
    "strict": true,
    // nullとundefinedを他の型の変数に代入しない
    "strictNullChecks": true,
    "esModuleInterop": true,
  },
  "include": [
    // コンパイルするTypeScriptファイルの置き場
    "./src/ts/*.ts",
  ]
}
```

これだけやれば始められます。
`src/ts/`フォルダを作成、中に`script.ts`を作成します。

```typescript
const test = "test"

console.log(test)
```

コンパイルは`tsc`コマンドで行います。tsconfig.jsonに設定しているので、引数等は必要ありません。自動でsrc/ts/フォルダを見に行ってくれます。

コパイルして、distフォルダにscript.jsファイルが生成されていれば成功です。

```shell
$ npx tsc

$ ls dist/
script.js
```

## 型ガード

ある値の方によって処理を分けること。

`typeof`演算子を使って型を得ることができる。

```ts
function typeGuard (a: string | number ) {
  if (typeof a === "number") {
    console.log("数値型です。")
  } else {
    console.log("文字列型です。")
  }
}
```

`instanceof`演算子は、特定のクラスのインスタンスかどうかを判定します。
