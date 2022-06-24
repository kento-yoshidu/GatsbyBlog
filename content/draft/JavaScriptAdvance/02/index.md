---
title: "#2 JavaScriptの歴史"
postdate: "2021-04-12"
updatedate: "2020-07-16"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript", "ECMAScript"]
---

# JavaScriptの歴史

## JavaScriptの誕生

JavaScriptは1995年、Netscape Communications社のプログラマーであった**ブレンダン・アイク**さんによって生み出されました。

JavaScriptはよく「Webサイトに動きを付ける言語」とも呼ばれますが、JavaScriptが生み出された当時はHTML＋CSSで構成されたWebサイトがほとんどだったようです。そんな中、「Webサイトに動きがつけられる！」という触れ込みで、ブレンダンさんが開発したJavaScriptの前身となるLiveScriptが、当時のナウいブラウザであったNetscape Navigatorに実装されました。

その後、LiveScriptは改名され、無事JavaScriptとなります。

JavaScriptに改名された背景として、当時Netscape Communications社はSun Microsystems社と業務提携しており、また、Sun社が開発し**イケイケドンドン**だったJavaの名前を拝借してあやかろう、というマーケティング的な一面があったようです。また、

> How a <mark>sidekick scripting language for Java</mark>, created at Netscape in a ten-day hack, ships first as a de facto Web standard and eventually becomes the world’s most widely used programming language.

参考 : 

とあるように、最初はJavaの兄弟的な言語になることを目的としていたことも伺えます。伴い、Javaから拝借している構文などもあります。ただ、あくまでも始まりの時点での話であり、現在においてはJavaScriptとJavaの間に技術的な関係はありません。

Netscape Navigatorの活躍から少し遅れ、Microsoft社が少し前まで現役だったInternet Explorer（以下、IE）を開発、リリースします。

IEにJavaScriptを乗せられればよかったのですが、Netscape社はそれを許さなかったようです。そしてMicrosoftはMicrosoftで、JavaScriptの代替として独自に**JScript**という言語を開発します。

<aside>

以前までは「JScriptってなに？変な略し方するなよ」とか思ってましたが、似てはいるものの、別物のれっきとしたプログラミング言語なんですね。勉強になりました。

</aside>

<aside>

Windows10になった現在でもJScriptはWSH（Windows Script Host）上で動作します。古めかしい言語のように思えますが、まだ現役です。

</aside>

しかし、JavaScriptとJScriptは似てはいるものの互換性がありませんでした。さらに、両社、さらにはブラウザーベンダー各社までが対抗しそれぞれに独自の機能を追加していき、「JavaScriptはIEでは動かない」、反対に「JScriptはNetscapeでは動かない」、、、etc と言った状況に陥りました（この辺りは想像に難しくないですよね）。

## ECMAScriptの誕生

「こりゃいかん！何とか標準的な規格をつくれないのか！」となり、Netscape社はECMA International（エクマインターナショナル）に**JavaScriptの標準化**を依頼します。そして誕生したのが**ECMAScript**(ECMA-262)です。

ECMAScriptとはいったい何でしょうか。ECMAScriptは「JavaScriptのコアとなる**仕様**」であると私は考えています。

ECMAScriptという仕様を元に、各社がブラウザーにJavaScriptを実装します。ECMAScriptは**仕様**を定めているのみで、実装方法を定めるものではありません。ですので、ほとんどの機能は同じだけど、細かいところでブラウザーによって挙動に違いがあることがあります。

<aside>

この「ブラウザー間の挙動の違い」を吸収していたのがJQueryだったりします。

</aside>

<aside>

標準化の流れのもと、2023年ともなれば、ブラウザー間でのJavaScriptの挙動の違いはほとんどないように思えます。

</aside>

逆に、「JavaScriptって何？」と問われれば、「ECMAScriptをブラウザーベンダーが実装したもの」と答えることができます。

### ECMAScriptは新しいエディションがリリースされる

ECMAScriptはたびたび改定されます。恐らく**ES5**だったり**ES2015**という言葉を聞いたことがあると思いますが、あれはECMAScriptのエディションを指しています。

以前は不定期に新しいエディションが登場していましたが、2015年にリリースされたECMAScript 2015以降は毎年新しいエディションがリリースされています。2021年5月現在、ES2020までがリリースされています。

|エディション名|リリース日|備考|
|---------|--------|-----|
|1|1997年6月|記念すべき初版|
|2|1998年6月||
|3|1999年12月|正規表現、try/catch構文が追加|
|4|放棄||
|5|2009年12月|strictモードが追加|
|5.1|2011年6月||
|2015(6)|2015年6月|class、let、const、Symbol、Promise 、、、など多数の機能/構文の追加|
|2016|2016年6月|べき乗演算子の追加など|
|2017|2017年6月|async/awaitの追加など|
|2018|2018年6月|オブジェクトに対するスプレッド構文の追加など|
|2019|2019年6月|flat()、flatMap()の追加など|
|2020|2020年6月|Optional Chaining演算子、Null合体演算子の追加など|

[参考 | ECMAScript - Wikipedia](https://ja.wikipedia.org/wiki/ECMAScript#%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3)

2015年リリースのES6までは1～6という風に数字が増えていっていました。ES6はリリース後にES2015と改名され、以降、リリースされた年度を冠する命名方式に変わりました。分かりやすくていいですね。

このブログでは、比較的新しく追加された構文や機能には、リリースされたECMAScriptのエディション名を出来る限り記述します。例えば、変数宣言に用いられる`const`キーワードはES2015から登場しました。`const`を紹介する時は`const[ES2015]`という形でECMAScriptエディションを書き記したいと思います。

## JavaScriptの発展まで

ECMAScriptが作成され標準化が一応進んだはいいものの、1990年代～2000年代初頭にかけてのJavaScriptの評価は**とても**低いものでした。

そのころのJavaScriptの使用目的と言えば、Webサイトをデコレーションする（例えば星⭐を降らせたりとか）のが主だったようです。

また、JavaScriptを悪用したブラクラなども流行しJavaScriptを無効化することが推奨されるような時代でした。

そのため、当時のプログラマーたちからは「プログラミング初心者が使う**おもちゃのような**言語」だったり「あくまでおまけ、無くても困らない言語」だったり「**使うこと自体が恥ずかしい**言語」など散々な評価をされていたようです（要出典）。

## Ajaxの登場

<aside>

2005年2月、Ajaxが発表された。HTL5でJavaScript APIが強化された。SPAの登場も追い風。


</aside>

どんどん現代的な機能、文法が取り込まれていくことになります。

## 【参考】ECMAScriptの仕様書の在処

「昔のECMAScriptも読んでみたい！」という物好きな諸兄姉のために、各エディションのWebページとPDFへのリンクを貼っておきます。

- [ECMAScript1](https://www.ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf)
- [ECMAScript2](https://www.ecma-international.org/wp-content/uploads/ECMA-262_2nd_edition_august_1998.pdf)
- [ECMAScript3](http://archives.ecma-international.org/1999/TC39WG/ecma262-3.pdf)
- [ECMAScript5](https://www.ecma-international.org/wp-content/uploads/ECMA-262_5th_edition_december_2009.pdf)
- [ECMAScript2015](https://262.ecma-international.org/6.0/ECMA-262.pdf)
- [ECMAScript2016](https://www.ecma-international.org/wp-content/uploads/ECMA-262_7th_edition_june_2016.pdf)
- [ECMAScript2017](https://www.ecma-international.org/wp-content/uploads/ECMA-262_8th_edition_june_2017.pdf)
- [ECMAScript2018](https://www.ecma-international.org/wp-content/uploads/ECMA-262_9th_edition_june_2018.pdf)
- [ECMAScript2019(HTML)](https://262.ecma-international.org/10.0/) | [ECMAScript2019(PDF)](https://www.ecma-international.org/wp-content/uploads/ECMA-262-10th-edition-June-2019.pdf)
- [ECMAScript2020(HTML)](https://262.ecma-international.org/11.0/) | [ECMAScript2020(PDF)](https://www.ecma-international.org/wp-content/uploads/ECMA-262_11th_edition_june_2020.pdf)


**※2021年6月22日、ECMAScript2021がリリースされました**🎊

- [ECMAScript2021(HTML)](https://262.ecma-international.org/12.0/) | [ECMAScript2021(PDF)](https://www.ecma-international.org/wp-content/uploads/ECMA-262_12th_edition_june_2021.pdf)

## 参考

[JavaScript: The First 20 Years](https://dl.acm.org/doi/pdf/10.1145/3386327)

[25 年に渡る JavaScript の歴史 | JetBrains](https://www.jetbrains.com/ja-jp/lp/javascript-25/)

[Javascriptの歴史](http://www.kogures.com/hitoshi/history/javascript/index.html)

[The History of JavaScript: Everything You Need to Know | Springboard Blog](https://www.springboard.com/blog/history-of-javascript/)

[JavaScript の生い立ちを探る - MarkupDancing](https://www.markupdancing.net/archive/20081111-083300.html)

[A brief history of JavaScript | by Ben Aston | Medium](https://medium.com/@_benaston/lesson-1a-the-history-of-javascript-8c1ce3bffb17)

[JavaScript（ジャバスクリプト）の歴史について](https://noveltyinc.jp/2020/02/14/javascript-history/)

[JavaScriptの歴史〜名前の由来とは？〜 | テクフリ](https://freelance.techcareer.jp/skills/21/articles/544/)

https://brendaneich.com/2008/04/popularity/
