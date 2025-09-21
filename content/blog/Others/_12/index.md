---
title: "TypeScript"
postdate: "2024-05-12"
update: "2024-05-12"
seriesName: "その他"
seriesSlug: "Others"
description: ""
tags: ["JavaScript", "非同期処理"]
keywords: ["JavaScript", "非同期処理", "Promise", "async/await"]
published: false
---

# TypeScriptを使うメリット

序盤の章。TypeScriptがあることで気づけるエラーなどを列挙する。

## プロパティ名の間違い

明示的に型を指定しないと気づけない。

```ts
type Book = {
  id: number;
  title: string;
};

const books = [
  {
    id: 1,
    title: "title1",
  },
  {
    id: 2,
    ttile: "title2"
  }
];
```
