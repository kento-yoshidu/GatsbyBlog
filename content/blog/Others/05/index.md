---
title: "メディアクエリーで > とか < が（一部）使えるぞ"
postdate: "2022-06-24"
update: "2022-06-24"
seriesName: "その他"
seriesSlug: "Others"
description: "メディアクエリーにおける比較演算子の使い方を紹介します"
tags: ["CSS"]
keywords: ["CSS", "Media Query"]
published: true
---

# 比較演算子が使用可能になる

レスポンシブデザインを実装する時、CSSにてメディアクエリーを使用してスタイリングすることが主流だと思います。

例えば、「ビューポートが768px以下の時にある要素の高さを`50vh`にしたい」としましょう。これまでは以下のように実装していました。

```css:title=style.css
@media (max-width: 768px) {
  .box {
    height: 50vh;
  }
}
```

逆に、ビューポートが768px以上の時のデザインは`min-width`とすることで実装できます。

で、この`max-width`と`min-width`という言葉ですが、直感的に分かりにくいですよね？私は未だに迷う瞬間があります。

Media Queries Level 4によれば、これを**比較演算子**に置き換えることができます。

```css:title=style.css
@media (width <= 768px) {
  .box {
    height: 50vh;
  }
}
```

めっちゃ分かりやすいやないかい😎。

この構文は、[Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/#mq-range-context)で**Range Context**として記載されています。

比較演算子として、`<=`、`<`、`>`、`>=`の4種類が定義されています。

## 複数条件の時も

例えば「ビューポートが400pxから768pxの間だけ」という時にもこのRange Contextは活躍します。これまではこう書いていましたが、、、

```css:title=style.css
@media (min-width: 400px) and (max-width: 768px) {
  .box {
    height: 50vh;
  }
}
```

このように書き換えることができます。

```css:title=style.css
@media (400px <= width <= 768px) {
  .box {
    height: 50vh;
  }
}
```

簡潔に書き表わすことができて💯です。

## ブラウザーの対応状況は？

さて、肝心のブラウザーの対応状況ですが、2022年6月現在、実はまだChromeのバージョン104以上とFirefoxでしか動作しません（Firefoxは謎に昔から対応していますね）。

[Can I use](https://caniuse.com/mdn-css_at-rules_media_range_syntax)

EdgeとSafariの対応が待たれるところです（と言っても、仕様としてはまだ勧告候補の段階ですが、、、）。

## 参考

[Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/)

[New syntax for range media queries in Chrome 104 - Chrome Developers](https://developer.chrome.com/blog/media-query-range-syntax/)

[メディアクエリーの使用 | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Media_Queries/Using_media_queries#syntax_improvements_in_level_4)
