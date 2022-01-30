---
title: "JamstackなWebサイトを構築してみた①"
postdate: "2021-08-06"
update: "2021-11-03"
seriesName: "JamstackなWebサイトを構築してみた"
seriesSlug: "Jamstack"
description: "Jamstackなサイトを作成してみて、Jamstackについての諸々が何となく分かってきたので知見を記載します。"
tags: ["Jamstack", "HeadlessCMS", "SSG"]
keywords: ["Jamstack", "HeadlessCMS", "SSG", "静的サイトジェネレーター", "Gatsby", "microCMS", "ホスティングサービス", "Netlify"]
published: true
---

# JamstackなWebサイトを沢山作ってみる

2021年度の目標の一つとして、「SSGやHeadlessCMSを使って、JamstackなWebサイトを10個作成する」を挙げました。

8月初旬時点でまだ10個は作れてないですが、何となくJamstackなWebサイト構築の感覚が分かってきたので、自分なりに「Jamstackとは何か？」というテーマで記事にしたいと思います。

## どんなJamstackサイトを作ってる？

「Jamstackって何？」という具体的な説明は後回しにするとして、私がこれまでに作成したJamstackなサイトについて列挙します。基本的にメインとなるページ＋ブログ記事ページという構成になっています。

<aside>

4番目以降はサンプル（お試し）で作成しており、内容やブログ記事を定期的に更新とかしているわけではありません。

</aside>

<aside>

どんなテーマ、デザインのサイトを作るか10個考える方が辛い😱

</aside>

|No|サイト名|SSG|コンテンツ管理|ホスティング|
|---|---|---|---|---|
|1|[ポートフォリオサイト](https://ps.toriwatari.work)|Gatsby|tsxファイル|AWS Amplify|
|2|[CSS Animation & Tips](https://cssanimation-and-tips.netlify.app/)|Gatsby|mdxファイル|Netlify|
|3|鳥に生まれることができなかった人へ<br>（このサイト）|Gatsby|マークダウンファイル|AWS Amplify|
|4|[Gatsby-microCMS-Site](https://gatsby-micro-cms.vercel.app/)|Gatsby|microCMS|Vercel|
|5|[Gatsby-contentful-Site](https://gatsbycafesite.netlify.app/)|Gatsby|Contentfull|Netlify|
|6|Gatsby-graphCMS-Site|Gatsby|graphCMS|未定|
|7|Next-microCMS-Site|Next.js|microCMS|未定|
|8|Next-graphCMS-Site|Gridsome|graphCMS|未定|
|9|Nuxt-microCMS-Site|Nuxt.js|microCMS|未定|
|10|Svelte|SvelteKit|microCMS|未定|

## Jamstackの構成要素

Jamstackは概ね以下のような技術で構成されています。

 - ✨ SSG（静的サイトジェネレーター）
 - ✨ HeadlessCMSもしくはテキストファイル
 - ✨ ホスティングサービス（CDN）

Jamstackを触ってみて感じたのは、「それぞれのレイヤーの技術が**疎結合になっている**なぁ」ということです。自分が見識のある技術を、ある程度自由に組み合わせられるという事です。以下、3つの構成要素について、それぞれどんな選択肢があるのかを紹介したいと思います。

### SSGには何がある？

SSGにはとても多くの種類があります。[こちら](https://jamstack.org/generators/)のサイトでSSGがまとめられています。めちゃくちゃ多いですが、フロントエンド寄りの技術のためか**JavaScriptベース**のSSGが多いですね。

これまでに私は**Gatsby**、**NextJS**、**Nuxt.js**、**Gridsome**を使用してWebサイトを作成しました。後はSvelteベースの**SvelteKit**、Vue.jsベースの**VuePress**、Reactベースの**Docusaurus**なども試してみて形にしたいですね。

今のところ、お気に入りはGatsbyです。このブログもGatsby製です。次点でGridsomeです。両者ともGraphQLでデータを取得できるのでいい感じです。

### HeadlessCMSには何がある？

HeadlessCMSも[数多くあります](https://jamstack.org/headless-cms/)が、microCMS、Contentful、graphCMS、NetlifyCMSなどが挙げられます。

HeadlessCMSを使いこなすというのは私にとって中々難しく、利用し始めて間もないこともあり、それぞれのサービスの違いなどを上げられるほど知見がありません。「こんなHeadlessCMSがありますよー」という紹介くらいに留まると思います。

私がこの先も使用していきたいと考えているのは日本製のmicroCMSです。日本の会社なのでドキュメントを全て日本語で読め、サポートへの問い合わせなども日本語で出来るという安心感があります。また、技術ブログにも力が入っていて、特に**チュートリアルが充実**しています。このチュートリアルをこなすだけで1-2ヵ月くらいは暇をつぶせそうですね。

[microCMSブログ（チュートリアル）](https://blog.microcms.io/category/tutorial/page/1)

HeadlessCMSとCMSの違い、それぞれのメリットデメリットは次回以降の記事で紹介したいと思います。

### ホスティングサービスには何がある？

ホスティングサービスの中でNetlifyが一番有名なんじゃないかと思います。無料枠でも以下のようなサービスを受けられます（2021年6月現在）。

- 🌠 SSGによるビルドとCDNによるWebサイト公開
- 🌠 GitHubとの連携、自動ビルド
- 🌠 ホスティングするWebサイトの数は無制限
- 🌠 月100GBのデータ通信
- 🌠 ビルド時間は300分/月

<aside>

正確なことは[Netlifyのページ](https://www.netlify.com/pricing/)を参照ください。

</aside>

## その他採用した技術

Jamstackと直接関係があるわけではありませんが、以下のような要素を組み合わせています。

各種技術の組み合わせでとても苦労することが多く（例えば、Gatsby＋TypeScript＋SCSS＋CSS ModulesでStrorybookが上手く動かなかったり）、どういう手順で環境を作っていけばいいのかを検証する実験台にもしています。

### TypeScript

基本的にはTypeScriptでの型付けが前提になっています（Vue.jsベースのフレームワークだと上手く使いこなせていない感がありますが。やっぱりReactがいい）。

### GraphQLクライアント

一部のサイトではHeadless CMSからデータを取得する際、GraphQLクライアントとして、Apollo ClientやRaleyなどのGraphQLライブラリーを使用しています。Gatsby、GridsomeにはGraphQLクライアントが組み込まれていますが、他のSSGにはない（はず）なので、GraphQLでクエリーを投げたい禁断症状に襲われた際はこれらのライブラリーを使用しています。

### Storybook

**Storybook**はUIコンポ－ネントを管理できるツールです。コンポーネントのUIをカタログのように簡単に参照できます。

作っているのは普通のWebサイト（？）でありWebアプリではなく、コンポーネントの数も少なければ状態変化も少ないので、導入するメリットはそんなに大きくはないかなーと使いながら思っていますが、環境構築の練習にもなるかと思い積極的に取り入れています（案の定、その環境構築で苦労していますが）。

[Storybook公式サイト](https://storybook.js.org/)

### Tailwind CSS

Tailwind CSSはユーティリティクラスをまとめたライブラリのようなものです。少し前からやたら注目されていますね。

Tailwindはどちらかと言うと好きではないですし、使いこなせる領域にはまだまだ至っていませんが、いくつかのサイトに取り入れています。環境構築、各種カスタマイズの学習コストが高い気がします。

[Tailwind CSS公式サイト](https://tailwindcss.com/)

### Headless UI

いわゆるCSSフレームワークという物があまり好きではなく（勉強したが挫折した）、生CSSを書きたい私にとって**Headless UI**はぴったりでした。

Tailwindとの親和性が高いですが、もちろん必須というわけではなく、「SCSS ＋ CSS Modules」などの構成でも問題なく動きます。

[Headless UI公式サイト](https://headlessui.dev/)

## 感想

### 英語

一番の感想は「英語できないとダメだな。。。🤦‍♂️」でした。

WordPressなんかと比べて圧倒的に情報量が少なく、公式サイトはもちろん、何か躓くと海外ブログやGitHubのissueも漁らなければならず、英語よわよわな私は結構苦労しています。特にgraphCMSはほとんど日本語の情報がないんじゃないでしょうか。

これからは逃げずに英語勉強します😭。

### サイト作成のコツ

また、Jamstackサイトを作成するうえでの勘所みたいなものがあると思っていて、感覚的に、以下の3つに大雑把に分けられると思います。

- SSGを用いてのページ生成の方法
- Headless CMSでのデータの持ち方
- SSG、Headless CMS、ホスティングサービス、それぞれの連携

この辺りのコツを掴めれば、どの要素を組み合わせてもまぁまぁ同じノリでサイトを構築できるので、数を量産することができます。

### SSGならではの難しさ

HTML & CSS & JavaScriptでベタ書きしているサイトを、SSGで再現するには？と言った所も検証したいことの一つでした。

SSGにはベースとなるフレームワークがあるわけで、「生JSで書いていたものをReact Hooksを使って、、、」だったり、「プラグインやライブラリーを上手に扱えない、、、」と言った躓きや障壁がありました。やはりここがSSGを使う上での難所だと思います。

---

以上、今回はざっとJamstackの構成要素について説明しました。次回からは具体的にJamstackやSSG、HeadlessCMSについて解説したいと思います。

## 参考

[For fast and secure sites | Jamstack](https://jamstack.org/)
