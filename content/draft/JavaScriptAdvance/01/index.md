---
title: "#1 JavaScript中級者を目指そう"
postdate: "2021-04-09"
updatedate: "2020-07-02"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript"]
---

# JavaScript中級者を目指そう

入門JavaScriptのシリーズでは「WebページでJavaScriptを動作させる」「JavaScriptで簡単なアプリを作る」ことを目標としていました。

とりあえずJavaScriptを書いて動かすことを最優先にしていたので、**JavaScriptの言語仕様**についてはほとんど触れていませんでしたが、今回はその言語仕様を理解することが目標です。具体的にこんなアプリを作る、といった目標はありません。ただひたすらにJavaScriptの仕様を学んでいくだけです。人によっては退屈な内容に思えるかもしれません。

学習することはJavaScriptについてのほぼ全てで（そうしたいという目標）、目次は以下の通りです（随時更新します）。

- \#1 JavaScript中級者を目指そう（本ページ）

- ### 前半

- [#2 JavaScriptの歴史](/JavaScriptAdvance/02/)
- [#3 Node.jsのインストール](http://blog.toriwatari.work/JavaScriptAdvance/03/)
- [#4 JavaScriptの基本的な書き方](http://blog.toriwatari.work/JavaScriptAdvance/04/)
- [#5 JavaScriptのデータ型(1)](http://blog.toriwatari.work/JavaScriptAdvance/05/)
- [#6 JavaScriptのデータ型(2)]
- [#7 プリミティブ値とオブジェクト]
- [#8 演算子①]
- [#9 演算子②]
- [#10 変数]
- [#11 関数]
- [#12 Numberオブジェクト]
- [#13 Stringオブジェクト]
- [#14 if/else文]
- [#15 for文とwhile文]
- [#x 非同期処理（コールバック関数）]
- [#x 非同期処理（Promise）]
- [#x 非同期処理（async/await）]
- [#x iterator]
- [#x generator]

- ### 後半

- [#x DOM]

---

- [コラム#1 【ECMAScript】この構文って使える？](http://blog.toriwatari.work/JavaScriptAdvance/column/01/)

- [#コラム this完全攻略]
- [#コラム オブジェクト処理大全]

前半では**Node.js**を使用して学習を行うので、それをインストールするところから始めます。

後半はブラウザーをベースにブラウザーオブジェクトなどを学習します。

## JavaScriptからの発展

JavaScriptを学習することで、様々なフレームワークやランタイムに発展することができます。

- フロントエンドフレームワークであるAngular、React、Vue.js、Svelte
- サーバーサイドランタイムであればNode.jsやDeno
- 静的型付け言語のTypeScript
- モバイルアプリを作るならreact Native
- デスクトップアプリならelectron

・・・などなど、夢が広がりますね。

私もまだまだ未熟者ですが、中級者になれるよう、そしてゆくゆくは上級者と呼ばれるよう、一緒に勉強していきましょう。

## このコンテンツで学習しない内容

- Node.jsの仕様（スクリプトの実行にNode.jsを利用しますが、Node.js自体の解説は行いません）

- TypeScript（AltJSの代表とも言えるTypeScriptですが、このコンテンツでは学習しません）

- 各種JavaScriptフレームワーク（React、Vue.js、EXPRESSなどのフレームワークについては学習しません）

## 参考にした書籍、サイト

このシリーズを書くにあたり参考にした書籍やWebサイトを紹介しておきます。書籍に関してはお勧め度を⭐️で表しています。

<aside>

一部、Amazonへのリンクを貼っていますが、アフィリエイトリンクではありません。クリックしても筆者に収益が発生することはありません。

</aside>

### JavaScript リファレンス - JavaScript | MDN（Webサイト）

[JavaScript リファレンス - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference)

JavaScriptの公式リファレンスです。ほとんどのページが日本語されています。

### ECMAScript 2021 Language Specification（Webサイト）

[Webサイトリンク](https://262.ecma-international.org/11.0/)

JavaScriptともコアともいえる、ECMAScriptの公式リファレンスです。

### JavaScript Primer 迷わないための入門書

[Amazonリンク](https://www.amazon.co.jp/JavaScript-Primer-%E8%BF%B7%E3%82%8F%E3%81%AA%E3%81%84%E3%81%9F%E3%82%81%E3%81%AE%E5%85%A5%E9%96%80%E6%9B%B8-azu/dp/4048930737/ref=cm_cr_arp_d_pl_foot_top?ie=UTF8)

出版：2020年4月

お勧め度：⭐⭐️⭐⭐️⭐️

個人的に一番お勧めの本です。JavaScriptの基礎や他の言語の経験があった方がいいと思いますが、本格的な書籍の中ではとっつきやすいと思います。

実はWebサイトも存在しており、どうやら最新の内容のものを無料で読めるようですが、素晴らしい本なので購入したいですね。

[JavaScript Primer(Webサイト)](https://jsprimer.net/)

### JavaScript: The Definitive Guide, 7th Edition

[Amazonリンク](https://www.amazon.co.jp/Javascript-Definitive-Most-used-Programming-Language/dp/1491952024/ref=pd_lpo_14_t_0/356-6084002-4274440?_encoding=UTF8&pd_rd_i=1491952024&pd_rd_r=4c12a428-25c6-4422-8ba4-1c7b4bf8c7a7&pd_rd_w=oYNI9&pd_rd_wg=d464b&pf_rd_p=43793539-bb55-42ca-a906-e224e71aa7fd&pf_rd_r=0A4E885RX080FC2565YP&psc=1&refRID=0A4E885RX080FC2565YP)

出版：2020年6月

お勧め度：⭐⭐️⭐️⭐️

いわゆるサイ本の7版（英語）です。英語は苦手ですが、文章は平易なのでそんなに苦労せず読めました。ES2020まで対応しています。ページ数はなんと687ページにわたり詳しさは言わずもがなですが、価格が少し高いのがネックです（2021年1月時点で、Amazonで6,500円くらい）。

早く日本語版が出てほしいですね。日本語版がでたら️⭐5です、多分。️

### 改訂新版JavaScript本格入門 ～モダンスタイルによる基礎から現場での応用まで

[Amazonリンク](https://www.amazon.co.jp/dp/B01LYO6C1N/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)

出版：2016年9月

お勧め度：⭐⭐️

内容は充実しており、私はすごく好きで何週も読み直した本です。ただ、いかんせん古いですね。ES2015には対応していますが、「まずはES5で解説、その後ES2015にあてはめて解説」という形になっています。

今はもっと新しく充実した本がたくさんあるので、選択肢にはあがりにくいと思います。早く改訂版が出てほしいですね。改定版がでたら️⭐5です、多分。️

### 開眼! JavaScript ―言語仕様から学ぶJavaScriptの本質

[Amazonリンク](https://www.amazon.co.jp/%E9%96%8B%E7%9C%BC-JavaScript-%E2%80%95%E8%A8%80%E8%AA%9E%E4%BB%95%E6%A7%98%E3%81%8B%E3%82%89%E5%AD%A6%E3%81%B6JavaScript%E3%81%AE%E6%9C%AC%E8%B3%AA-Cody-Lindley/dp/487311621X/ref=sr_1_6?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1J2KZFHJO1CQN&dchild=1&keywords=javascript+%E3%82%AA%E3%83%A9%E3%82%A4%E3%83%AA%E3%83%BC&qid=1619239437&sprefix=javascript+%2Caps%2C335&sr=8-6)

出版：2013年6月

お勧め度：⭐⭐️⭐️

こちらも2013年出版ということでES5までしか対応していませんが、

入門と題してありますが、JavaScriptを触ったことがない初心者がいきなりこれを読むと挫折します。変数の説明の前にBabelの説明から始まりますから。



### 現代の JavaScript チュートリアル(サイト)

### https://jsprimer.net/




# 参考

[JavaScript ベスト・オブ・ザ・イヤー 2020](https://risingstars.js.org/2020/ja)
