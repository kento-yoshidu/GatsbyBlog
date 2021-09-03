---
title: "JamstackなWebサイトを構築してみた③ SSGについて"
postdate: "9999-99-99"
updatedate: "9999-99-99"
categoryName: "JamstackなWebサイトを構築してみた"
categorySlug: "Jamstack"
description: "Jamstack構成のWebサイトで使用されている、静的サイトジェネレーターについてお話しします。"
tags: ["Jamstack", "SSG"]
---

# SSGについて

SSGは「Static Site Generator」の略称で、いわゆる静的サイトジェネレーターというやつです。

簡単な動作検証だけをしたものも含めると、

- Gatsby
- Nuxt.js
- Next.js
- Gridsome

## 各種SSGの特徴と難易度は？

私が使用してきたSSGをいくつかピックアップして、個人的難易度順に並べて簡単な解説をしたいと思います。

### Gatsby

[公式サイト](https://www.gatsbyjs.com/)

多分、一番難しいのがGatsbyです。Reactベースなのに加えデータ取得にGraphQLを使用していますので、それらについて初見の方が一から覚えていくのはきついと思います。

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

初見でこれだけを見ると何のこっちゃ分からないと思いますが、Gatsbyには**GraphiQL**というGUIなGraphQLクライアントツールが付属しています。これを使用すればクエリ作成をだんだん覚えていけるはずです。

### Next.js

[公式サイト](https://nextjs.org/)

Next.jsはGatsbyと同じく、ReactベースのSSGです。SSGだけでなく、SSRやISRにも対応しているのが特徴です（これらはサーバーサイトレンダリングを行うので、Jamstackサイトには適しませんが）。

### Nuxt.js

こちらもサーバーサイトレンダリングモードが備わっています。

[公式サイト](https://ja.nuxtjs.org/)

### Gridsome

[公式サイト](https://gridsome.org/)

## 参考

[【2021注目】フロントエンド開発「静的サイトジェネレータ」 | FASTCODING BLOG](https://fastcoding.jp/blog/all/info/ssg/)
[Next.js と Gatsby の比較 | gotohayato.com](https://gotohayato.com/content/511/)