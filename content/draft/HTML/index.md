---
title: "「HTMLとか簡単ｗｗｗ」とか言う香具師はこの本嫁"
postdate: "2022-07-02"
update: "2022-07-02"
seriesName: "その他"
seriesSlug: "Others"
description: "2022年発売されたHTMLの書籍を紹介します。"
tags: ["HTML", "書籍"]
keywords: ["HTML", "書籍", "本"]
published: false
---

# 「HTMLとか簡単ｗｗｗ」とか言うな👿

HTMLについてはこれまで、

- ・「HTMLｗｗｗ中学生の時に3日でマスターしたわｗｗｗ」
- ・「あーｗHTMLねｗｗｗテキトーにパパッとやっといてよｗｗｗ」
- ・「タグで囲うだけやんｗｗｗ」
- ・「HTMLとかプログラミング言語ですらなくて草」

という声を聞いてきました（誇張あり）。

2022年、そんなことを言う奴らに読ませたい本が2冊出版されました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 170px; padding-bottom: 0;"><a href="https://www.borndigital.co.jp/book/25999.html" data-iframely-url="//iframely.net/7YNmOLr"></a></div></div><script async src="//iframely.net/embed.js" charset="utf-8"></script>

世に存在するHTML（とCSS）の本といえば、そのほとんどが「サンプルのWebサイトを作りながらHTMLとCSSを学習する」というような構成になっています（独自調べ）。

しかしこれらの本は違います。それぞれの本の表紙の、「仕様から読み解く本格入門」

![](./images/image01.jpg)

や、「HTMLはこんなに深い」

![](./images/image01.jpg)

といった言葉が表す通り、HTMLについてより詳しく知るための本です。サンプルのWebページの作成の仕方を手取り足取り教えるような内容ではありませんし、CSSに至ってはほとんど触れられていません。というわけで、2冊とも完全なHTML & CSS初心者向けの本ではありません。

## 2冊を比べて

2冊の難易度としては、「HTML解体新書」 > 「武器になるHTML」でしょうか。「武器になるHTML」はわりかし初心者向けで、「HTML解体新書」は硬派でハードコアである印象を受けました（私が知らないことがより多く書かれている、という項目も判定基準に含まれています）。

### 武器になるHTML

先述した通り、難易度は低めです。フルカラーで目に優しく読みやすいです。最低限のHTMLを知っている人であれば、詰まることなく読み進めていけると思います。

かと言って優しすぎるというわけでもありません。HTMLで一番難しいのはリンクと画像の取り扱いだと個人的に思っていますが、それらについてもしっかり触れられています。

例えばa要素に関しては、

アクセシビリティに関する言及は後者の方が詳しいと思いますが、「何もしないのがアクセリビリティ向上のコツ」なんて言われてたりもするので、入門者に関しては

### HTML解体新書

ある程度しかHTMLを触った経験がない人、セマンティックやアクセシビリティという言葉を知らない人が読んでも、知識の羅列を咀嚼することはできないと感じました。こちらの書籍は「2冊目に読むといい」と言った紹介文もどこかで見ましたが、2冊目でも難しいと個人的には思います（多分「想像してたのと違う」と言って眠くなる）。

現代のHTMLコーダーである私たちが知りたいアクセシビリティやWAI-ARIAに関する事柄がこと細かに書かれています。

私が特に好きなのが「HTML標準化の歴史」というパートです。HTMLの誕生から、標準化が行われ現在のHTML Living Standardに一本化されるまでの経緯がまとめられています。私はこういう歴史ものというか、技術ではないけど読み物的なものが好きなのでこの辺りは興味深く読めました。

また、各要素の具体的な使われ方が記載されていたのが助かりました。使い方がイマイチ分からなかった要素に関しても、その謎が解決できるかもしれません。さらに「仕様はともかく、実際に使用していけるのか？」という所にも焦点が当てられて、著者なりの意見まで記されていてGoodです。

さらに、「アクセシビリティの注意点」として、デフォルトのARIAロール、スクリーンリーダーにおける想定される扱われ方、などの解説があります。

確かに仕様書というのはなんとも読みにくく、MDNならまだしも、初心者の内からWHATWGの[HTML Living Standard](https://html.spec.whatwg.org/multipage/)を読む人なんていないでしょう。この2冊はHTML初心者からの脱却の助け、そして仕様書を読めるようになるための足がかりとなると思います。

なお、

### 主要な属性とWAI-ARIA

WAI-ARIAについては、60ページほどページを割いてしっかり解説されています。HTMLの参考書でここまでアクセシビリティについて取り上げているのも珍しいのではないでしょうか。

恥ずかしながら私は知らないことだらけでしたので、勉強した内容はまたいつか記事に使用と考えています。


## HTMLを勉強するモチベーション

私は、HTMLというのは現在のWebにおいて土台となるものであり、担当領域がフロントエンドだろうがバックエンドだろうが軽視していいものではないと考えています。そんな中、（Web黎明期やテーブルレイアウトの時代ならいざ知らず）現代のHTMLを「使いこなせる」と言える人がどれだけいるのでしょうか（私はまだまだ言えません）。

Web開発と言えばReact、Vue.jsといった格好よくて高性能なライブラリーやフレームワークが沢山あります。仕事を得るという意味ではこれらの技術を学習するのはとても有意義であることは間違いありませんが、スキルアップという意味では、HTMLやJavaScriptの知識、セマンティックやアクセシビリティ、HTTPやブラウザーの仕組みなど、ベースとなる知識の習得を優先すべきではないかと思います。

私に関して言えば、覚えも悪くプログラミングの適性もないだろうことは薄々感じています。ReactだのGatsbyだのRemixだのQwikだの最新のフレームワークで遊んでいた時期もありましたが、勉強する順番が違ったなと反省している最近です。

HTMLはW3C管轄の時と違い、**常に**更新されています。これだけの仕様を理解し、最新の情報もキャッチアップできれば他のエンジニアとの差別化になる、というのが私がHTMLを勉強するモチベーションです。

## 余談ですが

「HTMLについてちゃんとしたことを学びたい」という方は**HTML5プロフェッショナル認定試験**の受験をお勧めします。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://html5exam.jp/" data-iframely-url="//iframely.net/xhiYUNQ"></a></div></div><script async src="//iframely.net/embed.js" charset="utf-8"></script>

この試験はレベル1とレベル2に分かれており、レベル1でHTMLとCSSに関する問題が出題されます（レベル2ではJavaScriptに関する問題が出題されるようです）。

資格名は「HTML5」と冠していますが、[その有効性はこれからも変わらないでしょう](https://html5exam.jp/measures/column_01.html)。私もPing-tや書籍を使って勉強しましたのでお勧めです（資格は取っていません）。

## 最後に

CSS解体新書を出してほしい。

## 参考

[アクセシビリティを考慮してHTMLを書く意義：新刊ピックアップ｜技術評論社](https://gihyo.jp/book/pickup/2023/0003)

[書籍「HTML解体新書」、満を持してついに登場 - 弁護士ドットコム株式会社 Creators’ blog](https://creators.bengo4.com/entry/2022/04/04/120000)

[HTMLとWebアクセシビリティを見つめなおす​―『HTML解体新書』発売に​よせて | ドクセル](https://www.docswell.com/s/momdo/54MX1Z-20220519)

[HTML解体新書ができるまで | ドクセル](https://www.docswell.com/s/momdo/5JNJVZ-20220407)

[#32「『HTML解体新書』発売記念！『HTML解体新書』の歩き方」 | ミツエーテックラジオ | ミツエーリンクス](https://www.mitsue.co.jp/knowledge/tech_radio/202204/21_1724.html)

[Web Hypertext Application Technology Working Group (WHATWG)](https://whatwg.org/)

[MDN Web Docs](https://developer.mozilla.org/ja/docs/Web)

[whatwg/html: HTML Standard](https://github.com/whatwg/html)
