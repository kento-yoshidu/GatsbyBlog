---
title: "「HTMLとか簡単ｗｗｗ」とか言う香具師はこの本嫁"
postdate: "2023-04-09"
update: "2023-04-09"
seriesName: "その他"
seriesSlug: "Others"
description: "2022年に発売されたHTMLの書籍を紹介します。"
tags: ["HTML", "書籍"]
keywords: ["HTML", "書籍", "本"]
published: true
---

# 「HTMLとか簡単ｗｗｗ」とか言うな👿

HTMLについてはこれまで、

- ・「HTMLｗｗｗ中学生の時に3日でマスターしたわｗｗｗ」
- ・「あーｗHTMLねｗｗｗテキトーにパパッとやっといてよｗｗｗ」
- ・「divで囲うだけやんｗｗｗ」
- ・「HTMLとかプログラミング言語ですらなくて草」

という声を聞いてきました（誇張あり）。

2022年、そんなことを言う奴らに読ませたい本が出版されました。

世に存在するHTML（とCSS）の本といえば、そのほとんどが「サンプルのWebサイトを作りながらHTMLとCSSを学習する」というような構成になっています（独自調べ）。

しかしこれらの本は違います。それぞれの本の表紙の**仕様から読み解く本格入門**や、

※ 引用 : [HTML解体新書 | ボーンデジタル](https://www.borndigital.co.jp/book/25999.html)

<div style="width: 40%">

![""](./images/image01.png)

</div>

**HTMLは、こんなに深い**

※ 引用 : [武器になるHTML：書籍案内｜技術評論社](https://gihyo.jp/book/2022/978-4-297-13132-6)

<div style="width: 40%">

![""](./images/9784297131326.jpg)

</div>


といった言葉が表す通り、HTMLについてより詳しく知るための本です。サンプルのWebページの作成の仕方を手取り足取り教えるような内容ではありませんし、CSSに至ってはほとんど触れられていません。

というわけで、完全なHTML & CSS初心者向けの本ではありません。ある程度しかHTMLを触った経験がない人、セマンティックやアクセシビリティという言葉を知らない人が読んでも、知識の羅列を咀嚼することはできないでしょう。特に「HTML解体新書」の方は「2冊目に読むといい」と言った紹介文もどこかで見ましたが、2冊目でも難しいと個人的には思います（多分「想像してたのと違う」と言って眠くなる）。

確かに仕様書というのはなんとも読みにくく、MDNならまだしも、初心者の内から[HTML Living Standard](https://html.spec.whatwg.org/multipage/)を読む人なんていないでしょう。この2冊はHTML初心者からの脱却の助け、そして仕様書を読めるようになるための足がかりとなると思います。

## 2冊を比べて

2冊の難易度としては、「HTML解体新書」>「武器になるHTML」だと思います。「武器になるHTML」はわりかし初心者向けで、「HTML解体新書」は硬派でハードコアである印象を受けました（私が知らないことがより多く書かれている、という項目も判定基準に含まれています）。


HTMLとCSSで綺麗な見た目のページを作れる人と、アクセシビリティまで考慮したページを作れる人の間には（私が考えていたよりもずっと）大きな差があり、「武器になるHTML」はその橋渡しに、「HTML解体新書」はより高みへ上るための書籍と言えます。

### 武器になるHTML

「武器になるHTML」の方は前述した通り内容は優しめです。フルカラーで目にも優しく読みやすいです。

HTMLについてかなり基礎的なことから（htmlファイルの作り方など）説明してくれています。それだけでなく、「HTMLの本を1冊読んで、簡単なページを作れるようになった人」に刺さる内容が多いです。例えば、

- ・ HTMLとCSSの役割の違い、文章構造と装飾を分離する意義
- ・ 要素が属するカテゴリーと、コンテンツモデル（何を子要素として内包できるか）
- ・ アクセシビリティについて（例えば、スクリーンリーダーでどのように読み上げられるか）

といった内容が挙げられます。

また、HTMLで一番難しいのは画像の取扱いだと思っていますが、画像に関する説明は**17ページ**にも及んでいます。img要素だけではなくpicture要素やsource要素にも言及していて、さらには「高解像度ディスプレイの対応」「画像の描画処理と読み込みタイミング」といった内容もあります。

各章の最後には実際にHTMLコードを書いてみる課題があり、「HTMLの仕様をただただ説明する」のではなくハンズオン形式で理解を深めることができます。

### HTML解体新書

HTML解体新書は筆者らの主張というか、そういったものは少なく仕様を淡々と解説している印象です。「HTMLの仕様をもっと深く知りたい」という人はワクワクしながら読み進められますが、「HTMLとCSSを使って綺麗なWebサイトを作れるようになりたい」人が手に取るような内容ではないと思います。

私が特に好きなのが「HTML標準化の歴史」というパートです。HTMLの誕生から、標準化が行われ現在のHTML Living Standardに一本化されるまでの経緯がまとめられています。私はこういう歴史ものというか、技術ではないけど読み物的なものが好きなのでこの辺りは興味深く読めました。

また、各要素の具体的な使われ方が記載されていたのが個人的にとても参考になりました。使い方がイマイチ分からなかった要素に関しても、その謎が解決できるかもしれません。また、「仕様はともかく、実際に使用していけるのか？」という所にも焦点が当てられて、著者なりの意見まで記されていてGoodです。さらに、「アクセシビリティの注意点」として、デフォルトのARIAロール、スクリーンリーダーにおける想定される扱われ方、などの解説があります。

そしてWAI-ARIAについては、60ページほどページを割いてしっかり解説されています。HTMLの参考書でここまでアクセシビリティについて取り上げているのはこの本くらいじゃないでしょうか。恥ずかしながら私は知らないことだらけでしたので、勉強した内容はまたいつか記事に使用と考えています。

## HTMLを勉強するモチベーション

私は、HTMLというのは現在のWebにおいて土台となるものであり、担当領域がフロントエンドだろうがバックエンドだろうが軽視していいものではないと考えています。そんな中、（Web黎明期やテーブルレイアウトの時代ならいざ知らず）現代のHTMLを「使いこなせる」と言える人がどれだけいるのでしょうか（私はまだまだ言えません）。

Web開発と言えばReact、Ruby on Railsといった格好よくて高性能なライブラリーやフレームワークが沢山あります。巷でよく耳にする「Webエンジニアになるためのロードマップ」的なものでは、「まずはHTMLとCSSとJavaScriptを学び、それが終わればPHPやRubyのフレームワークを使いこなし、最後にはポートフォリオをAWSにデプロイ！」といった流れが多いと思うのですが（独自調べ）、これを見るに、HTMLはスタートラインの一歩目であり、先に進んだらそれ以上深堀りされないようなポジションなのかなーと感じます。

もちろん仕事を得るという意味ではこれらの技術を学習するのはとても有意義であることに間違いはありませんが（私もHTML以外の学習に割く時間の方が長い）、スキルアップという意味では、HTMLやJavaScriptの知識、セマンティックやアクセシビリティ、HTTPやブラウザーの仕組みなど、ベースとなる知識の習得する方向に進むのも面白いんじゃないかなーと思います。

私に関して言えば、覚えも悪くプログラミングの適性もないだろうことは薄々感じています。ReactだのVue.jsだの最新のフレームワークで遊んでいた時期もありましたが、勉強する順番が違ったなと反省している最近です。

HTMLはW3C管轄の時と違い、**常に**更新されています。これだけの仕様を理解し、最新の情報もキャッチアップできれば他のエンジニアとの差別化になる、というのが私がHTMLを勉強するモチベーションです。

## 余談ですが

「HTMLについてちゃんとしたことを学びたい」という方は**HTML5プロフェッショナル認定試験**の受験をお勧めします。

この試験はレベル1とレベル2に分かれており、レベル1でHTMLとCSSに関する問題が出題されます（レベル2ではJavaScriptに関する問題が出題されるようです）。

資格名は「HTML5」と冠していますが、[その有効性はこれからも変わらないでしょう](https://html5exam.jp/measures/column_01.html)。私もPing-tや書籍を使って勉強しましたのでお勧めです（資格は取っていません）。

---

余談その2。HTML解体新書は2022年4月発売、武器になるHTMLは2022年11月発売です。何で2023年4月にこんな記事を書いているのかというと、今回紹介した2冊を読み「自分、HTMLやアクセシビリティのこと何も分かってないな」と感じ「そんな自分が本についての記事を書くなんておこがましいな」と思ったからです。まぁそれから勉強して、だからと言って特段HTMLに詳しくなったわけではないですが、この記事をアップすることで「これからもHTMLを勉強します宣言」に代えさせていただきます。

## 最後に

CSS解体新書を出してほしい。

## 参考

[書籍「HTML解体新書」、満を持してついに登場 - 弁護士ドットコム株式会社 Creators’ blog](https://creators.bengo4.com/entry/2022/04/04/120000)

[HTMLとWebアクセシビリティを見つめなおす​―『HTML解体新書』発売に​よせて | ドクセル](https://www.docswell.com/s/momdo/54MX1Z-20220519)

[HTML解体新書ができるまで | ドクセル](https://www.docswell.com/s/momdo/5JNJVZ-20220407)

[#32「『HTML解体新書』発売記念！『HTML解体新書』の歩き方」 | ミツエーテックラジオ | ミツエーリンクス](https://www.mitsue.co.jp/knowledge/tech_radio/202204/21_1724.html)

[アクセシビリティを考慮してHTMLを書く意義：新刊ピックアップ｜技術評論社](https://gihyo.jp/book/pickup/2023/0003)

[HTMLが強みになる解説書、アクセシビリティやユーザビリティに配慮したコーディングを学べる -武器になるHTML | コリス](https://coliss.com/articles/book-review/isbn-9784297131326.html)

[Web Hypertext Application Technology Working Group (WHATWG)](https://whatwg.org/)

[MDN Web Docs](https://developer.mozilla.org/ja/docs/Web)

[whatwg/html: HTML Standard](https://github.com/whatwg/html)