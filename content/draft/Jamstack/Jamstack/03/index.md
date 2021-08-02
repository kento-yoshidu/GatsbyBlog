---
title: "JamstackなWebサイトを構築してみた②"
postdate: "2021-06-11"
updatedate: "2021-06-11"
categoryName: "JamstackなWebサイトを構築してみた"
categorySlug: "Jamstack"
description: "いわゆるJamstackなサイトを作成してみて、何となく分かってきたので知見を記載します。"
tags: ["Jamstack", "Nuxt.js", "Gatsby", "静的サイトジェネレータ"]
---

# SSGについて


## 各種SSGの難易度は？

では、私が試用した中で、各種SSGを個人的難易度順に並べてみたいと思います。

### Gatsby

多分、一番難しいのがGatsbyです。Reactベースなのに加えクエリ言語にGraphQLを使用していますので、それらについて初見の方が一から憶えていくのはきついと思います。ただ、参考にできる記事も多くありますし、実際私も「Reactほんの少しだけ＋GraphQL初見」という所から、ブログの基本機能の作成まで～2週間くらいで進めましたので（結構苦労はしましたが）、難しいと言ってもソコソコです。爆速＋高機能なフレームワークなので頑張って覚える価値は間違いなくあります。

## 参考

[【2021注目】フロントエンド開発「静的サイトジェネレータ」 | FASTCODING BLOG](https://fastcoding.jp/blog/all/info/ssg/)