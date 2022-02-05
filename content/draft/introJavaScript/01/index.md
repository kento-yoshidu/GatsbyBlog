---
title: "#1 入門JavaScript"
postdate: "2021-04-12"
updatedate: "2021-05-28"
seriesName: "入門JavaScript"
seriesSlug: "JavaScriptFirstPart"
description: 
tags: ["JavaScript"]
---

# 入門JavaScript

## JavaScriptとは

JavaScriptはNetscape社によって開発された、ブラウザー上で動作するスクリプト言語です。
HTMLファイルやCSSファイルと共にサーバーからダウンロードされ、ブラウザー上で実行されます。

[初めてのHTML&CSS](/HelloWeb/01/)という記事では、HTMLとCSSという言語でWEBページを作成しました。

それぞれの言語の役割としては、

 - ✔️ HTML = 文書構造を記述する
 - ✔️ CSS = Webページをスタイリングする

という風に言えます。

これらに対してJavaScriptは**Webサイトに動きを与える**役割を持っていると言えます。

分かりやすい例を挙げるならば、

 - 🔧 カウントダウンタイマーを作る
 - 🔧 ボタンをクリックするとコンテンツが現れる
 - 🔧 （例えば）オセロゲームを作る

などと言ったところです。

HTMLやCSSは正しくはプログラミング言語とは言えません。HTMLはマークアップ言語、CSSはスタイルシート言語と分類されます。

しかし、JavaScriptはれっきとしたプログラミング言語です。

2021年現在、WebサイトはHTML、CSS、そしてJavaScriptの3つの言語で構成されており、JavaScriptはWebサイトの構築のために習得が必須な言語と言えます。

<aside>

「～3つで構成されており～」というのは、私たちユーザから見える部分に限った話です。HTML、CSS、JavaScriptで表現される部分を**フロントエンド**などと言ったりします。対して、私たちから見えない部分、例えばショッピングサイトでユーザを作成しその情報を保持する、商品の在庫数を管理するなど、直接見ることができない仕組みを**バックエンド**といいます。このバックエンドを構成するのはPHPやRubyなどと言った言語です。そして**そこにはJavaScriptも含まれています**。ただ、HTMLとCSSは含まれていません。JavaScriptはフロントエンドでもバックエンドでも利用されていると憶えておいてください。

</aside>

なお、どこかで聞いたことのある話だと思いますが、プログラミング言語JavaとJavaScriptは**関係ありません**。名前が似ているだけです。
「Java JavaScript 違い」「JavaScript 歴史」などで検索してみてください。

## JavaScriptを学ぶメリット

JavaScriptは、2023年現在、フロントエンド領域を支配しているほぼ唯一のプログラミング言語と言えます。

もしかしたら**React**や**Vue.js**という言葉を聞いたことがあるかもしれませんが、これらはいわゆるフロントエンドのWebフレームワークというやつです。元となっている言語はJavaScriptであり、コードを書くのもJavaScript、実行されるのもJavaScriptプログラムです。やはりJavaScriptの学習なしにこれらのフレームワークを扱うことはできません。

なお、このブログもJavaScriptを応用した**Gatsby**というフロントエンドWebフレームワークを使用して構築しています。

また、Node.jsという**JavaScriptの実行環境**の誕生により、JavaScriptはバックエンド（サーバーサイド）でも動作するようになりました。端的に言うと、JavaScriptを使用してデータベースから値を取得し、Webサイトに表示させることが出来るようになったのです。

## 具体的になにを学ぶの？

[静的ページと動的ページの違いとメリット・デメリット | Webmedia](https://www.itra.co.jp/webmedia/static-dynamic-difference.html)

[静的コンテンツ/動的コンテンツの違いを１分で解説【初心者向け】 | ビズドットオンライン](https://it-biz.online/it-skills/static-dynamic/)
