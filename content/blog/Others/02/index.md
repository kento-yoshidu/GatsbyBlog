---
title: "CSSのis()擬似クラス関数"
postdate: "2022-04-29"
update: "2022-06-25"
seriesName: "その他"
seriesSlug: "Others"
description: "CSSのis()擬似クラス関数について学習しました。"
tags: ["CSS", "擬似クラス関数"]
keywords: ["CSS", "擬似クラス関数", "is()"]
published: true
---

# `:is()`擬似クラス関数について

CSSの擬似クラス関数である`:is()`については、前から存在は知っていましたが実際に使ったことは一度もありませんでした。

[Can I use](https://caniuse.com/?search=is())を見ても分かるように、ほとんどのブラウザーで対応済みになっており使用することができます。

今年度の目標はモダンCSSを全て頭に入れることですからね。手始めに`:is()`を学習しました。

## 複数のセレクターを一つにまとめることができる

`:is()`ですが、[MDN](https://developer.mozilla.org/ja/docs/Web/CSS/:is)によると、

> :is() は CSS の擬似クラス関数で、セレクターのリストを引数に取り、リスト中のセレクターの何れか一つに当てはまる要素をすべて選択します。数多くのセレクターを小さくまとめて書くのに便利です。

とのことです。これ、わかりますか？私は分かりませんでした。

要約すると、**複数のセレクターをまとめてかける**ということだと考えています。

`header`、`section`、`footer`の直下にある`h1`にだけCSSを当てたい状況があるとします。通常、こんな風に書きますよね。

```css:title=style.css:title=style.css
header > h1,
main > h1,
footer > h1 {
  color: red;
}
```

このようにカンマで複数のセレクターを並べる書き方を、便宜上**従来の書き方**とします。

で、この従来の書き方でももちろんちゃんと表示されるんですが、`> h1`を3回記述していますよね。ちょっと無駄な感じがします。

ここで`:is()`を使用すれば、`header`、`main`、`footer`を**リスト**としてまとめることができます。

```css:title=style.css
:is(header, main, footer) > h1 {
  color: red;
}
```

記述量が減り見通しも良くなりました。実際にCSSを書いて動作を確認してみてください。ちゃんと描画されるはずです。

上記は要素セレクターを使用しましたが、もちろんクラスセレクターなどを使用することもできます。

```css:title=style.css
/* プライマリーとセカンダリーのボックスの中の.textだけ文字を太くする */
:is(.primary-box, .secondary-box) .text {
  font-weight: bold;
}
```

また、`section`の中でだけ`h1`、`h2`、`h3`にCSSを当てたい場合には、以下のように記述できます。

```css:title=style.css
section :is(h1, h2, h3) {
  font-weight: bold;
}
```

`:is()`を複数組み合わせることもできます。以下の例では、`header`もしくは`footer`の直下の、`h1`もしくは`h2`にスタイルが当たります。

```css:title=style.css
:is(header, footer) > :is(h1, h2) {
  color: blue;  
}
```

## 詳細度はややこしい

`:is()`を用いた時、セレクターの詳細度はどうなるのでしょうか？

[MDN](https://developer.mozilla.org/ja/docs/Web/CSS/:is#is_%E3%81%A8_where_%E3%81%AE%E9%81%95%E3%81%84)によると、

> :is() がセレクター全体の詳細度にカウントされる（<mark>最も詳細な引数の詳細度を取る</mark>）

とあります。ちょっと日本語が分かりにくいですが、例えばリストにidセレクターとclassセレクタ－があれば、リストの詳細度が（最も高い詳細度を持つ）idセレクターと同じになるということです。ちょっと信じにくいですが、まずは実験してみました。

以下のようなHTMLを用意します。

```html:title=index.html
<section>
  <h1 class="red">h1</h1>
</section>
```

`:is()`を使用してCSSを記述します。この時、要素セレクターが2つ並んでいると見做され、詳細度は0.0.2となります。

```css:title=style.css
/* 詳細度 : 0.0.2 */
section :is(h1) {
  color: blue;
}
```

続いて、`.red`を追加し文字を赤くします。

```css:title=style.css

/* 詳細度 : 0.0.2 */
section :is(h1) {
  color: blue;
}

/* 詳細度 : 0.1.0 */
.red {
  color: red;
}
```

クラスセレクターですから詳細度は0.1.0であり、文字は赤く表示されます。この辺りまでは自然と理解できますね。

次に、`:is()`のリストの中に適当なidセレクターを追記します。しかし、HTMLの方には変更は加えません。つまり、全く使用していないidセレクターを追加するというわけです。この時CSSはどのように適用されるかというと、、、

なんと、青く表示されます。この時、詳細度は1.0.1となったのではないかと推測されます。

```css:title=style.css
/* 詳細度 : 1.0.1 */
section :is(h1, #hello-world) {
  color: blue;
}

/* 詳細度 : 0.1.0 */
.red {
  color: red;
}
```

もちろん、従来の書き方であればこんなことは起こりません。以下のCSSの場合、文字は赤く表示されます。

```css:title=style.css
/* 詳細度 : 0.0.2 */
section h1,
/* 詳細度 : 1.0.1 */
section #hello-world {
  color: blue;
}

/* 詳細度 : 0.1.0 */
.red {
  color: red;
}
```

## 仕様書を確認する

まぁ自分の手で作業して確認するのもいいんですが、特にこういう目に見えないものはちゃんと仕様書を確認しましょうという話です。

[こちらのページ](https://drafts.csswg.org/selectors/#specificity-rules)には、

> The specificity of an :is(), :not(), or :has() pseudo-class is <mark>replaced by the specificity of the most specific complex selector</mark> in its selector list argument.

> is(), :not(), :has() 擬似クラスの詳細度は、そのセレクターリスト引数の中で<mark>最も詳細な複合セレクターの詳細度で置き換えられます</mark>。

とありますね。さらに具体的な例として、

> .foo :is(.bar, #baz) /* a=1 b=1 c=0 */

という風にも記述されています。

やはり`:is()`を用いることによって場合によっては詳細度が変わり、従来の書き方の単純なシンタックスシュガーではないということがわかります。

## 寛容なセレクター解釈

さてもう一つ、`:is()`が従来の書き方とは違う働きをする部分があります。それは、無効なセレクターを記述した場合です。

現在ドラフト状態にあるSelectors Level 4の中に、[:has()](https://www.w3.org/TR/selectors-4/#has-pseudo)という擬似クラスがあります。

```css:title=style.css
/* MDNより */
/* https://developer.mozilla.org/ja/docs/Web/CSS/:has */

a:has(> span) {
  color: red;
}
```

上記のMDNの例で言うと、span要素を直近の子要素にもつa要素に対してスタイルを指定する擬似クラスです。かなり便利そうですね。

まぁ一例として挙げただけなので、詳しい挙動は置いておきます。この擬似クラスは2022年4月現在、まだどのブラウザーも実装していないため動作しないわけです。これを従来の書き方に沿って記述した場合、**セレクターリスト全体が無効になります**。

```css:title=style.css
.title,
a :has(> span) {
  color: red;
}
```

> Warning: the equivalence is true in this example because all the selectors are valid selectors. <mark>If just one of these selectors were invalid, the entire selector list would be invalid</mark>. This would invalidate the rule for all three heading elements, whereas in the former case only one of the three individual heading rules would be invalidated.

上記の例で言うと、`.title`も含め無効化されるので、`.title`は赤くなりません。将来`:has()`が実用化された時、あのブラウザーだけまだ対応されない、という状況は容易に想像できますね。

しかし、`:is()`を使用すると、無効なセレクターは無視して出来る限りスタイルを当ててくれるようになります。

```css:title=style.css
/* これなら.titleは赤くなる */
:is(.title, a:has(> span)) {
  color: red;
}
```

この動作はたいていの場合は良い方向に働いてくれると思いますし、頭の片隅に置いておくといいと思います。

## 詳細度が変わらないなら

さて、実際にこの擬似クラス関数を使うかどうかという話です。

`:is()`を使用しても詳細度が変わらないのであれば使用しやすいかなと思います。つまり、リストの中の各セレクターの詳細度が同じ場合ですね。この場合はこれまでのセレクターを並べる書き方を単純に置き換えるものとして使用できます。

```css:title=style.css
/* この2つは同じ意味を持つと見做せる */

/* これまで */
section h1,
section h2,
section h3 {
  color: red;
}

/* :is()を使用 */
section :is(h1, h2, h3) {
  color: red;
}
```

しかし、idセレクターとclassセレクターなど、詳細度が違うものがリストに混在する時にはこの書き方は避けたいかなーと思いました。詳細度が予期せず高くなることで、後からスタイルを上書きすることが出来なくなります。

```css:title=style.css
/* 1.0.1 */
section :is(.title, h1, h2, #page-title) {
  color: red;
}
```

もちろん、CSSを上手に書ける人やCSS設計をちゃんと出来る人であれば問題ないかも知れませんが、大規模なCSSになってくると私には難しいと感じました。

<details style="margin-top: 60px">
<summary>更新履歴</summary>

<ul class="history-list">
  <li>2022年6月25日 : 誤字脱字を修正。細かい文言を変更。</li>
</ul>
</details>

## 参考

[:is() (:matches(), :any()) | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/:is)

[Selectors Level 4](https://drafts.csswg.org/selectors/#specificity-rules)

[:is | CSS-Tricks - CSS-Tricks](https://css-tricks.com/almanac/selectors/i/is/)

[New CSS functional pseudo-class selectors :is() and :where()](https://web.dev/css-is-and-where/)
