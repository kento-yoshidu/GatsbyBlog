---
title: "ラーニングGatsby"
postdate: "2021-10-01"
update: "2021-10-01"
seriesName: "ラーニングGatsby"
seriesSlug: "LearningGatsby"
description: ""
tags: ["Gatsby", "SSG"]
---

# Gatsbyを使ってWebサイトを構築する方法

業務レベルではありませんが、これまでにGatsbyを使用して10個のWebサイトを作成しデプロイまで行ってきました。まだまだ分からないことが多いですが、ある程度は構築の手順が分かってきたのでGatsbyの入門記事を作成しました。

## 学習する内容

WebフレームワークであるGatsbyに関すること、プラグインに関すること、そしてWebサイトのデプロイまで総合的に解説します。また、コンテンツ管理の場面では、各種Headless CMSとの連携も行います。

以前まで、GatsbyといえばSSG(Static Site Generator)でしたが、Gatsby v4になり、SSRやDSGにも対応しています。これらまで解説できれば理想ですが、まずはSSGに関することに集中して記事を作成します。

## 前提とGatsbyのバージョン

Gatsbyのことは全く分かっていなくてもOKです。GatsbyはReactベースですが、Reactの知識がなくてもまぁ雰囲気で結構いじれます。

- Node.jsがインストールされていること
- ES2015以降のJavaScriptを簡単に理解していること
- npm、またはyarnの使用方法をある程度理解していること
- Reactについてある程度理解していること
- Gitを使えること
- GitHubのアカウントを作成しており、ある程度使用方法が分かっていること

また、Gatsbyのバージョンは**4**とします。

## 記事一覧

- #1 はじめに
- #2 Gatsbyで静的サイトを生成する
- #3 NetlifyでWebサイトを公開する

- Gatsbyについて

- ブログ記事の作成（ローカル管理）

- #x マークダウンでブログ記事を書く
- #x MDXファイルでブログ記事を書く

- ブログ記事の作成（HeadlessCMSとの連携）

- #5 microCMSを利用してブログ記事を書く
- #6 Contentfulを利用してブログ記事を書く
- #7 graphCMSを利用してブログ記事を書く

## 参考

### Gatsby公式サイト

[Gatsby: Fastest Static-Site Generation Web Framework](https://www.gatsbyjs.com/)

公式サイトです。何か引っかかればまずはここを参照します。

### Gatsby: The Definitive Guide

[Gatsby: The Definitive Guide [Book]](https://www.oreilly.com/library/view/gatsby-the-definitive/9781492087502/)

O'Reilly社の本です。買ったばかりで読み進めているところですが、基本的にはこの本をベースに記事を作成したいと思っています。この本で扱っているのはバージョンv3です。

日本語のGatsbyの本は少ない、、、というか、英語版でも少ないです。未だに海外での技術書の探し方が上手くなりません。しかもGatsbyだと、まず「THE Great GATSBY」が出てくるし。

### Webサイト高速化のための 静的サイトジェネレーター活用入門

[Webサイト高速化のための 静的サイトジェネレーター活用入門 | エビスコム - EBISUCOM](https://ebisu.com/gatsbyjs-book/)

（電子書籍、同人誌を除けば多分）唯一日本語で読めるGatsbyの書籍です。

関係ないですが、このエビスコムさんという方の本は非常に丁寧に書かれていて読みやすいですね。

## Webフレームワークは儚くうつろいやすい

私はGatsby推しでGatsbyをたびたび使用していますが、Gatsbyは単なるWebフレームワークの一種ですので、数年後には跡形もなく消えているかもしれません。むしろ、この先ずっと生き残っている確率の方が低いでしょう（失礼？）。それでも構わないという方は一緒にGatsbyを勉強しましょう。Gatsbyを使いこなすために勉強したことは絶対に無駄になりません。

