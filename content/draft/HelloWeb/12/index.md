---
title: "#12 CSSプロパティ① color/font-size"
postdate: "2022-03-25"
updatedate: "2022-03-25"
seriesName: ""
seriesSlug: ""
description: 
tags: ["CSS"]
keywords: ["css", "color", "font-size"]
published: false
---

# colorプロパティ

これからはいよいよ具体的にCSSプロパティを扱っていきます。今回はテキストの色を変える`color`プロパティと、テキストの大きさを変える`font-size`プロパティを学習します。

まずは`color`プロパティから説明します。値には当然色を記述するわけですが、実は様々な色の表現方法があります。

## キーワードで色を指定する

一番直感的で分かりやすいのは、色を表すキーワードで色を指定することです。キーワードというのは`blue`であったり`grren`であったり`red`といったもので、アルファベットで値を記述します。

```css
h1 {
  color: blue;
}

h2 {
  color: green;
}

h3 {
  color: red;
}
```

![](images/image01.png)

キーワードですが、代表的な色はもちろん、様々な色に対応するキーワードが用意されています。どのようなキーワードがあるかは[こちら](https://developer.mozilla.org/ja/docs/Web/CSS/color_value#%E8%89%B2%E3%82%AD%E3%83%BC%E3%83%AF%E3%83%BC%E3%83%89)を参照ください。

## 16進数カラーコードで色を指定する

キーワードの他にも、**RGB16進数**で色を指定することができます。16進数、つまり`0`から`9`、そして`a`から`f`の文字を組み合わせて**カラーコード**で色を表現する方法です。キーワードと違い直感的ではありませんが、より細かい色の指定をすることができます。

16進数表記は、例えば`#ff0000`という風に指定します。`#`はカラーコードを使って色を表すという意味を持ちます。続いて6個の文字が並んでいますが、前から2つずつでくくって、それぞれが『赤』『緑』『青』を表します。この例でいうと、`ff`が赤、次の`00`が緑、最後の`00`が青を表します。値が大きいほどその色が強く表示されます。`#ff0000`を指定した場合、文字の色は真っ赤になります。

```css
h1 {
  color: #ff0000;
}
```

![](images/image02.png)

わかりにくいですか？そうですか。私も頭で理解してカラーコードを使用していません。

私は良い感じの色を調べたいとき、例えば[こういうページ](https://itsakura.com/html-color-codes)をブックマークしておいて、カラーコードをコピーするようにしています。

もちろん、キーワードで指定してもいいです。ただ、マイナーなキーワード（例えば`Thistle`）を指定すると逆に

## 参考

[color | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/color)

[](https://webukatu.com/wordpress/blog/15327/)

[CSS Color Module Level 4#the-color-property](https://drafts.csswg.org/css-color/#the-color-property)

https://creativememomemo.com/color_code_method/