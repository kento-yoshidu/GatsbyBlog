---
title: "#1 Webページレンダリングの仕組み"
postdate: "2023-01-01"
update: "2023-01-01"
seriesName: "ブラウザーレンダリングの仕組み"
seriesSlug: "BrowswerRendering"
description: ""
tags: ["AWS", "AWS SAA", "EFS"]
keywords: ["ブラウザー", "browser"]
published: false
---

## 大まかな流れ

1. HTMLファイルのダウンロード
2. HTMLファイルの解析とDOMツリーの生成
3. CSSのダウンロード
4. CSSの解析とCSSOMツリーの生成
5. JavaScriptのダウンロード
6. JavaScriptの実行
7. レンダリングツリーの生成
8. レイアウト
9. 画面の描画

「Webページを表示させる」時には、基本的にまずHTMLファイルをダウンロードします。そしてブラウザーがHTMLファイルの内容を解読していきます。

その中でCSSファイルや画像、JavaScriptファイルがあれば、その都度ファイルのダウンロードを行います。CSSファイルはほとんどの場合、head要素内で指定されています。JavaScriptの実行による画面描画に関しては色々なパターンがありますが、body要素の一番下にscript要素が置かれ、ダウンロードされていることにします。

## HTMLファイルのダウンロード

HTTPリクエストを使用してHTMLファイルをWebサーバーからダウンロードします。

## HTMLファイルの解析

さて、HTMLはタグの集合で出来ていることはご存じだと思います。後述する**DOMツリー**を生成するため、**DOM**に変換する作業を行います。

まず、バイトデータをHTMLドキュメントに変換する作業が待っています。

これを**トークン**というものに変換します。例えば`<html>`や`</html>`などの開始タグや終了タグはそれぞれ一つのトークンに変換されます。


### キャラクタートークン

まぁ役に立つかどうかは分かりませんが、頭の片隅に置いておけばいつか役に立つことがあるかもしれません。

タブ（U+009）、改行(U+000AとU+000D)、改ページ（U+000C）、

## 参考

[13.2 Parsing HTML documents | HTML Standard](https://html.spec.whatwg.org/multipage/parsing.html)

[オブジェクト モデルの構築 &nbsp;|&nbsp; Web &nbsp;|&nbsp; Google Developers](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)

[ブラウザレンダリングの仕組み](https://zenn.dev/ak/articles/c28fa3a9ba7edb)

[ブラウザはどのようにコンテンツをレンダリングしているのか？ - GIGAZINE](https://gigazine.net/news/20180323-rendering-engine/)

[Using the Chrome web developer tools, Part 2: The Network Tab](https://commandlinefanatic.com/cgi-bin/showarticle.cgi?article=art034)

[ブラウザレンダリングの仕組み - Qiita](https://qiita.com/sasakiki/items/91dcc8b50d7a61ce98bc)

[📚ブラウザの仕組みを学ぶ](https://zenn.dev/silverbirder/articles/e10295948e17ca)

[ブラウザレンダリングの仕組みを理解して、ブラウザに優しいJavaScriptを書こう - YoheiM .NET](https://www.yoheim.net/blog.php?q=20140703)

[ブラウザのしくみ: 最新ウェブブラウザの内部構造 - HTML5 Rocks](https://www.html5rocks.com/ja/tutorials/internals/howbrowserswork/)

[Webページ高速化に必須の知識！ブラウザがWebページをどのようにレンダリングしているか、図を用いて解説 | コリス](https://coliss.com/articles/build-websites/operation/work/how-the-browser-renders-a-web-page.html)

