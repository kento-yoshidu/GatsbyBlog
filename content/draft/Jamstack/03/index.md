---
title: "JamstackなWebサイトを構築してみた③ SSGについて"
postdate: "9999-99-99"
updatedate: "9999-99-99"
categoryName: "JamstackなWebサイトを構築してみた"
categorySlug: "Jamstack"
description: "Jamstack構成のWebサイトで使用されている、SSG（静的サイトジェネレーター）についてお話しします。"
tags: ["Jamstack", "SSG"]
---

# SSGについて

SSGは「Static Site Generator」の略称で、いわゆる静的サイトジェネレーターというやつです。SSGもWebフレームワークの1種であると言えます。SSGを利用することで、ReactやVue.jsなどのテンプレートから静的なファイル（HTMLやCSS、画像など）を生成することができます。

伝統的なWebサイトといえばLAMP構成のようにバックエンドが介在し、**動的にページを生成する**ものが大半でしたが、それと対比してSSGという言葉が生まれたのだと思います。

このシリーズではJavaScriptベースのSSGを紹介しますが、GolangベースのHugoやRubyベースのJekyllという風に、JavaScript以外のSSGというのももちろん存在しています。

また、SSGには、その土台となるフレームワークが存在していることが多いです。Next.jsやGatsbyの土台にReactがあり、Nuxt.jsやGridsomeの土台にはVue.jsがある、といった具合です。そのため、「Reactを全くつかったことがないけど、いきなりGatsbyやるぞ！」というのは中々難しいのではないかと思います。SSGを解説しているサイトはいっぱいあるので簡単なサイトを作成してデプロイ、までは簡単ですが、ベースとなるフレームワークの知識がないとカスタマイズしようとした際にすぐに手詰まりになるんじゃないかと。

## SSGの特徴

前回の記事でJamstackの特徴を説明しましたが、そこでSSGの特徴もほぼ説明してしまっている感があります。ですので、ざっとおさらい程度にSSGの特徴を説明します。

### 静的ファイルの事前生成

まぁ、SSGの特徴と言えばこれに尽きます。前回の記事でも説明しましたね。アクセスしてからページが生成されるのがLAMP構成、コンテンツの更新時にページが生成されるのがSSGです。

ユーザーがアクセスした際には既に必要なページが生成されているため高速なアクセスが可能です。

<aside>

正確に言うと、Gatsbyも最初から完成されたHTMLファイルを生成しているのではなく、ほぼ空のHTMLファイルを用意しJSONファイルと組み合わせてページを完成させています。

ただ、それらのファイルも事前に生成されていますし、HTMLファイルの在り方は事前ビルドという特徴とは関係が薄いものだと考え、あえて触れていません。

</aside>

「それってサーバーにHTMLとかのファイルを直置きするのと何が違うの？」と思われるかもしれません。私も最初はレンタルサーバーを借りて、手動でHTMLファイルをコピーしてWebサイトを運用していました。しかし、外部サービスとの連携を行えるのがSSGの2つ目の特徴です。

### 外部サービスとの連携

SSGの機能を利用して、外部サービスで管理しているコンテンツの内容を静的ファイルに取り込むことができます。

例えば、データベースから値を引っ張り出してテーブルにして表示させる方法を考えてみます。SQLを叩いて結果を見ながら1つ1つHTMLでコーディング、、、という方法は限界があるのが分かります。

この役割を担っていたのがLAMP構成におけるCGIサーバーやデータベースだったわけですが、SSGはこのデータ取得という部分でも活躍します。SSGは、外部サービスやデータベースにアクセスして、**その時点でのデータ**を元に静的ファイルを生成することが可能です。

SSGとは、

- 最初からHTMLファイルを用意しておくことによる高速なアクセス
- LAMP構成による外部サービスとの連携

といった、それぞれのメリットを良いところ取りした構成であると言えます。

## JamstackやSSGという言葉について

当初、JamstackというとSSGありきという印象でしたが、最近はSSRやISRなどもJamstackの構成要素として紹介されることが多く、ますますJamstackという言葉が抽象的になってきているように感じます。こんな記事タイトルを掲げといてなんですが、もはやJamstackという言葉にこだわる意味がないかもしれません。

ただ、このページに関してはあくまでJamstackにおけるSSGの紹介を行うことにします。

## 各種SSGの特徴と難易度は？

- Gatsby
- Next.js
- Nuxt.js
- Gridsome

私が使用してきたSSGをいくつかピックアップして簡単な解説をしたいと思います。私はReactベースのSSGばかり触っていますので、そっちに偏った解説になっていると思いますがご了承ください。

### Gatsby

[公式サイト](https://www.gatsbyjs.com/)

多分、一番難易度が高いのがGatsbyです。Reactベースのグレー無ワークです。

Reactベースなのに加えデータ取得にGraphQLを使用していますので、それらについて初見の方が一から覚えていくのはきついと思います。

ただ、参考にできる日本語記事も多くありますし、実際私も「Reactほんの少しだけ＋GraphQL初見」という所から、ブログの基本機能の作成まで2週間くらいで進めましたので（結構苦労はしましたが）、難しいと言ってもソコソコです。爆速＋高機能なフレームワークなので頑張って覚える価値は間違いなくあります。

後に紹介する同じReactベースのNext.jsとの違いは、**GraphQLでデータを取得する点**です。

以下のコードは、マークダウンで作成しているブログの記事一覧を、ページネーション機能付きで取得するGraphQLクエリです。

```graphql
query(
	$limit: Int!,
	$skip: Int!
) {
	postData:
		allMarkdownRemark(
			sort: {
				fields: [frontmatter___postdate],
				order: DESC,
			}
			limit: $limit,
			skip: $skip
		) {
			nodes {
				id
				excerpt
				fields {
					slug
				}
				frontmatter {
					postdate(formatString: "YYYY年MM月DD日")
					updatedate(formatString: "YYYY年MM月DD日")
					seriesName
					seriesSlug
					title
					tags
				}
			}
		}
	}
```

初見でこれだけを見ると何のこっちゃ分からないと思いますが、Gatsbyには**GraphiQL**というGUIなGraphQLクライアントツールが付属しています。これを使用すればクエリー作成をだんだん覚えていけるはずです。



<aside>

最新リリースの**Gatsby V4**では、SSGだけではなくDSG(Deferred Static Generation)やSSR(Server Side Rendering)に対応しており、機能が充実していっています。もはや「Gatsby=SSG」ではなく、機能の厚いWebフレームワークであると捉えた方がいいでしょう。

</aside>

### Next.js

[公式サイト](https://nextjs.org/)

Next.jsはGatsbyと同じく、Reactベースのフレームワークです。SSGだけでなくSSRやISRにも対応しているのが特徴です。

Next.jsの方が機能がぐっと薄い印象です。プラグインに頼らず、ゴリゴリ機能を付与したい方にとってはNext.jsの方が取り組みやすいかも知れません。

また、GitHubのスター数でみても、Next.jsの方が主流であると言えます。

前述したように、Gatsbyも機能が追加されてきており、だんだんNext.jsとできることが重複してきました。

https://trends.google.co.jp/trends/explore?q=%2Fm%2F012l1vxv,%2Fm%2F0j45p7w,%2Fg%2F11c0vmgx5d&geo=,,&date=today%205-y,today%205-y,today%205-y&cat=13#TIMESERIES

両者とも単なるWebフレームワークの一種に過ぎないので、3年後、5年後には跡形もなく無くなっているかもと思いながら勉強する必要があります。

とはいいつつ、ベースがReactであることからして、早々廃れることはないんじゃないかというのが個人的な感想です。

最近では**Remix**というReactベースのフレームワークがリリースされました。ますますReact界隈が盛り上がっていきそうな予感です。

### Nuxt.js

Nuxt.jsはVue.jsベースのフレームワークです。SSGの他に、SSR機能が備わっています。

GatsbyとNext.jsにベッタリだったのでVue.jsベースのフレームワークにはあまり触れていません。これから勉強して、追記したいと思います。

[公式サイト](https://ja.nuxtjs.org/)

### Gridsome

GridsomeもVue.jsベースのフレームワークです。Nuxt.jsと違い、SSG機能のみを持ちます。

[公式サイト](https://gridsome.org/)

### Webフレームワークの人気

最後に、かなり話は脱線しますが、各種Webフレームワークがどれくらいの人気を誇っているのかを調べてみました。どのSSGを使うかの選定材料になると思います。

### React、Vue.js、Angular

対象は、3大巨頭とも言える**React**、**Vue.js**、**Angular**と、後発でありながらこれから人気の出そうな**Svelte**の計4つとします。

ReactはMeta社（旧Facebook社）、Vue.jsはエヴァン・ヨー氏、AngularはGoogle社、SvelteはRich Harris氏によって開発されました。

[Google Trends](https://trends.google.co.jp/trends/explore?cat=13&date=today%205-y,today%205-y,today%205-y,today%205-y&geo=,,,&q=%2Fm%2F012l1vxv,%2Fm%2F0j45p7w,%2Fg%2F11c0vmgx5d,Svelte#TIMESERIES)


## 参考

[【2021注目】フロントエンド開発「静的サイトジェネレータ」 | FASTCODING BLOG](https://fastcoding.jp/blog/all/info/ssg/)

[Next.js と Gatsby の比較 | gotohayato.com](https://gotohayato.com/content/511/)

[ISRから考察するこれからのJamstack | microCMSブログ](https://blog.microcms.io/think-about-jamstack-2021/)

[](https://qiita.com/umamichi/items/9bd08a21fddc71588efc)

[](https://frontarm.com/james-k-nelson/static-vs-server-rendering/)

https://dev.classmethod.jp/articles/gatsby-prerendering/