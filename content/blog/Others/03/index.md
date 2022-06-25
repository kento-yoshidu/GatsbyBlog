---
title: "CSSのwhere()擬似クラス関数"
postdate: "2022-05-01"
update: "2022-06-25"
seriesName: "その他"
seriesSlug: "Others"
description: "CSSのwhere()擬似クラス関数について学習しました。"
tags: ["CSS", "擬似クラス関数"]
keywords: ["CSS", "擬似クラス関数", "where()"]
published: true
---

# :where()擬似クラス関数について

[こちらのページ](/Others/02/)で`:is()`擬似クラス関数を紹介しましたが、今回はそれととても似ている`:where()`擬似クラス関数を紹介します。

`:where()`も複数のセレクターをまとめることができる疑似クラス関数ですが、**リストの詳細度が0になる**という特徴があります。

`:is()`と同じく、2022年5月現在、ほぼ全ての主要ブラウザーで使用することができます。

※参考 : [Can I use](https://caniuse.com/?search=%3Awhere())

<aside>

`:where()`は`:is()`と被る部分が多く重複する部分は説明を省いていますので、ぜひ`:is()`の記事もご覧ください。

</aside>

## 複数のセレクターを一つにまとめることができる

`:is()`と同じく、`:where()`を使用すれば複数のセレクターをまとめて記述することができます。

> :where() は CSS の擬似クラス関数で、セレクターリストを引数として取り、列挙されたセレクターのうちの何れかに当てはまるすべての要素を選択します。

※参考 : [:where() | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/:where)

`section`の中にある見出しや本文の色を薄くしたい場合は、`:where()`を使用してセレクターをまとめて記述することができます。

```css:title=style.css
/* 従来の書き方 */
section h1,
section h2,
section h3,
section p {
  color: #444;
}

section :where(h1, h2, h3, p) {
  color: #444;
}
```

## 詳細度は0になる

`:is()`と違い、`:where()`で宣言されたリストは**詳細度が0**になります。

例えば以下のようなHTMLとCSSがあった時、文字は何色に表示されるでしょうか？

```html
<h1 class="title">h1</h1>
```

```css:title=style.css
/* 詳細度 : 0 */
:where(.title) {
  color: red;
}

/* 詳細度 : 0.0.1 */
h1 {
  color: blue;
}
```

classセレクターの方が要素セレクターより詳細度が高いのはご存じだと思います。しかし、`:where()`によって`.title`の詳細度は0になるため、要素セレクターで指定されている`color: blue`が適用されます。これはつまり容易に上書きできるという事ですね。

## リセットCSSにぴったり

後から容易に上書きできるという性質上、**リセットCSS**に用いると便利だと思います。

以下のように、`:where(a)`でブラウザーの持つデフォルトCSSを上書きし（詳細度が0と言ってもUser Agent Stylesheetは上書きできるため注意）、`nav a`のように必要な箇所にCSSを当てていくことができます。

```css:title=style.css
/* ブラウザーのデフォルトCSSを上書き */
:where(a) {
  color: #444
}

/* navの中のa要素は緑にする */
nav a {
  color: green;
}
```

実際に各種リセットCSSも`:where()`を使用していることがあります。代表として、`:where()`がふんだんに使用されているsanitize.cssを取り上げたいと思います。

### sanitize.css

sanitize.cssでは、リストに関するスタイルを一まとめにして`margin`をなくしています。

```css:title=style.css
:where(dl, ol, ul) :where(dl, ol, ul) {
  margin: 0;
}
```

また、セレクターをまとめずとも、詳細度を0にする目的で`:where()`を利用しているであろう部分もありました。

```css:title=style.css
:where(body) {
  margin: 0;
}

:where(h1) {
  font-size: 2em;
  margin: 0.67em 0;
}
```

参考 : [sanitize.css](https://github.com/csstools/sanitize.css/blob/main/sanitize.css)

他にも色々なリセットCSSを見ましたが、`:where()`が使用されているものは少なかったです。これは恐らく、IEを含むレガシーブラウザーを考慮してのことだと邪推します。もう少し時間が経てば`where()`の利用も増えてくるんじゃないかと思っています。

## 寛容なセレクター解釈

`:is()`と同じく`:where()`にも無効なセレクター宣言を無視してくれるような働きがあります。詳しくは[:is()の記事](/Others/02/)をご覧ください。

<details style="margin-top: 60px">
<summary>更新履歴</summary>

- 2022年6月25日 : 誤字脱字を修正。細かい文言を変更。

</details>

## 参考

[:where() | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/:where)

[Selectors Level 4](https://www.w3.org/TR/selectors-4/#zero-matches)

[:where | CSS-Tricks - CSS-Tricks](https://css-tricks.com/almanac/selectors/w/where/)

[New CSS functional pseudo-class selectors :is() and :where()](https://web.dev/css-is-and-where/)
