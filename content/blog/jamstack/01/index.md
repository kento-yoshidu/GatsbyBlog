---
title: "JamstackなWebサイトを構築してみた①"
postdate: "2021-08-06"
updatedate: "2021-09-03"
seriesName: "JamstackなWebサイトを構築してみた"
seriesSlug: "Jamstack"
description: "いわゆるJamstackなサイトを作成してみて、Jamstackについての諸々が何となく分かってきたので知見を記載します。"
tags: ["Jamstack", "HeadlessCMS", "静的サイトジェネレータ"]
---

# JamstackなWebサイトを沢山作ってみる

2021年度の目標の一つとして、「SSGやHeadlessCMSを使ってWebサイトを10個作成する」を挙げました。

8月初旬時点でまだ10個は作れてないですが、何となくJamstackなWebサイト構築の感覚が分かってきたので、自分なりに「Jamstackとは何か？」というテーマで記事にしたいと思います。

## どんなJamstackサイトを作ってる？

「Jamstackって何？」という具体的な説明は後回しにするとして、私がこれまでに作成したJamstackなサイトについて列挙します。基本的にメインとなるページ＋ブログ記事ページという構成になっています。

<aside>

上から3番目以降はサンプル（お試し）で作成しており、内容やブログ記事を定期的に更新とかしているわけではありません。

</aside>

<aside>

どんなテーマのサイトを作るか10個考える方が辛い。

</aside>

|サイト名|SSG|コンテンツ管理|ホスティング|
|-------|---|-----------|-------|
|鳥に生まれることができなかった人へ<br>（このサイト）|Gatsby|マークダウン|AWS Amplify|
|[CSS Animation & Tips](https://cssanimation.toriwatari.work/)|Nuxt.js|vueファイル|AWS Amplify|
|[NuxtDentalClinic](https://nuxtdentalclinic.netlify.app/)|Nuxt.js|microCMS|Netlify|
|[GatsbyCafe](https://gatsbycafesite.netlify.app/)|Gatsby|Contentfull|Netlify|
|作成中|Gatsby|microCMS|Vercel|
|作成中|Next.js|microCMS|未定|
|作成中|Gridsome|graphCMS|未定|

## Jamstackの構成要素

Jamstackは概ね以下のような技術で構成されています。

 - ✨ SSG（静的サイトジェネレータ）
 - ✨ HeadlessCMSもしくはテキストファイル
 - ✨ ホスティングサービス(CDN)

Jamstackを触ってみて感じたのは、「それぞれのレイヤーの技術が**疎結合になっている**なぁ」ということです。自分が見識のある技術を、ある程度自由に組み合わせられるという事です。以下、3つの構成要素について、それぞれどんな選択肢があるのかを紹介したいと思います。

### SSGには何がある？

SSGにはとても多くの種類があります。[こちら](https://jamstack.org/generators/)のサイトでSSGがまとめられています。めちゃくちゃ多いですが、フロントエンドよりの技術のためか**JavaScriptベース**のSSGが多いですね。

これまでに私は**Gatsby**、**Next.js**、**Nuxt.js**、**Gridsome**を使用してWebサイトを作成しました。後はVue.jsベースの**VuePress**、Reactベースの**Docusaurus**も試してみて形にしたいですね。

今のところ、お気に入りはGatsbyです。このブログもGatsby製です。次点でGridsomeです。両者ともGraphQLでデータを取得できるのでいい感じです。

### HeadlessCMSには何がある？

HeadlessCMSも数多くありますが、microCMS、Contentful、graphCMS、NetlifyCMSなどが挙げられます。

HeadlessCMSを使いこなすというのは私にとって中々難しく、利用し始めて間もないこともあり、それぞれのサービスの違いなどを上げられるほど知見がありません。「こんなHeadlessCMSがありますよー」という紹介くらいに留まると思います。

私がこの先も使用していきたいと考えているのは日本製のmicroCMSです。日本の会社なのでドキュメントを全て日本語で読め、サポートへの問い合わせなども日本語で出来るという安心感があります。また、技術ブログにも力が入っていて、特に**チュートリアルが充実**しています。このチュートリアルをこなすだけで1-2ヵ月くらいは暇をつぶせそうですね。

[microCMSブログ（チュートリアル）](https://blog.microcms.io/category/tutorial/page/1)

HeadlessCMSとCMSの違い、それぞれのメリットデメリットは次回以降の記事で紹介したいと思います。

### ホスティングサービスには何がある？

AWSの中では、私はAWS Amplifyを主に利用しています。CloudFront + S3という構成もいいですね。

ホスティングサービスで言うとNetlifyが一番有名なんじゃないかと思います。無料枠でも以下のようなサービスを受けられます（2021年6月現在）。

- 🌠 SSGによるビルドとCDNによるWebサイト公開
- 🌠 GitHubとの連携、自動ビルド
- 🌠 ホスティングするWebサイトの数は無制限
- 🌠 月100GBのデータ通信
- 🌠 ビルド時間は300分/月

※正確なことは[Netlifyのページ](https://www.netlify.com/pricing/)を参照ください。

[**Cloudflare Pages**](https://pages.cloudflare.com/)、[**Gatsby Cloud**](https://www.gatsbyjs.com/products/cloud/)

---

以上、今回はざっとJamstackの構成要素について説明しました。次回からは具体的にJamstackやSSG、HeadlessCMSについて解説したいと思います。

## 参考

[For fast and secure sites | Jamstack](https://jamstack.org/)