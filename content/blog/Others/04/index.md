---
title: "CSS Custom Properties"
postdate: "2022-05-04"
update: "2022-05-06"
seriesName: "その他"
seriesSlug: "Others"
description: "CSS Custom Properties（CSS変数）について紹介します。"
tags: ["CSS", "CSS Custom Properties", "CSS変数"]
keywords: ["CSS", "CSS Custom Properties", "CSS変数"]
published: true
---

# CSSでも変数が使える❗️❗️

CSSでは長らく、いわゆる「変数」なるものを使用することが出来ませんでした。例えばサイトのテーマカラーが`#339898`だとしたら、CSSファイルの色んな所でこの文字列をハードコードしないといけなかったわけです。ここだけ進化していないと言うか、何ともウェッブ黎明期らしい香りがしますね。

SCSSには変数という機能がありこれをカバーしてくれるので、SCSSを使用しだしてからは不便さは感じていなかったんですが、現在では生のCSSで変数を使用できるというわけです。

仕様としてはまだ勧告候補（Candidate Recommendation Draft）の状態ですが、[この通り](https://caniuse.com/css-variables)モダンブラウザーは既にこの仕様をサポートしているので早速試してみましょう。

今回の記事ではCSS変数の概要について簡単に説明します。なお、正式名称は「CSS変数」ではなく、**CSS custom properties for cascading variables**といいます。ただし今回の記事では便宜上、CSS変数と呼ぶことにします。

<aside>

余談ですが、CSSが充実するにつれ「SCSSを使用しなくてもいいのでは？」という場面が増えてきた印象です。大変喜ばしいことですね。

</aside>

<div class="iframely-embed"><a class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://blog.toriwatari.work/page/1/Others/02/" data-iframely-url="//iframely.net/LXtfFQM"></a></a></div><script async src="//iframely.net/embed.js" charset="utf-8"></script>

## 変数の定義と呼び出し方

では、サイトのメインカラーの値を定義する変数を用意して使用してみましょう。以下のように`変数名: 値`という風に変数を定義します。

```css:title=style.css
:root {
  --main-color: #399;
}
```

この変数`--main-color`を呼び出すには、`var`関数を使用します。

```css:title=style.css
:root {
  --main-color: #399;
}

h1 {
  color: var(--main-color);
}
```

たったこれだけの事でCSS変数を利用できます。簡単ですね。

### 命名規則

では、CSS変数の概要についてざっと追っていきましょう。

まずは変数の命名規則ですが、先頭に`--`をつける必要があります。また、単語をつなぐときはケバブケースにするのが慣習のようですね。

```css:title=style.css
:root {
  /* 先頭に--をつける */
  /* ケバブケースにするのがGood */
  --main-color: #399;
}
```

また、ケースセンシティブですのでアルファベットの大文字と小文字は区別されます。

```css:title=style.css
:root {
  /* これらは別の変数 */
  --main-color: #399;
  --Main-Color: #5f5;
}
```

大文字を含めるか否かという所ですが、全部小文字の方がCSSらしいと思いますし、ドキュメントのサンプルを見ていてもほとんど小文字だったのでやはりその方がいいと思います。CSSで大文字を使うと違和感がすごいですね。

### 単位も一緒に変数にする

これまでは色を定義する変数を例にとりましたが、もちろん`width`の値を定義しておくこともできます。この時、**単位も含めて**変数に格納しましょう。

```css:title=style.css
:root {
  /* 単位も含めること */
  --wrapper-width: 1166px;
}

.wrapper {
  width: var(--wrapper-width);
}
```

値（数値）だけを変数に含めて、呼び出し側で単位を付与することはできません。下記のようにするとスタイルは適用されません。

```css:title=style.css
:root {
  /* 単位なし */
  --wrapper-width: 1166;
}

.wrapper {
  /* こんな風に単位を付与しようとしても動作しない */
  width: var(--wrapper-width)px;
}
```

`calc()`を使用して、変数から呼び出した値に`* 1px`などとして単位を付与することもできます。ただ、これはハック的というか、個人的にはあまり好きではない方法です。使える場面ってどれだけあるんだろうか？

```css:title=style.css
:root {
  /* 単位なし */
  --width-container: 1166;
}

.wrapper {
  /* 1pxをかけて単位をつける */
  width: calc(var(--wrapper-width) * 1px);
}
```

### スコープ

プログラミング言語の変数と同じように、CSS変数もスコープを持ちます。変数定義の際、`:root`ブロックの中で宣言すればHTMLファイル全体で有効な変数を定義することになります。例えば`section`ブロックの中なら`section`要素の中だけ、`.wrapper`ブロックならば`wrapper`クラスの中でだけ有効な変数になります。

```css:title=style.css
/* HTML全体で使用できる、グローバル */
:root {
  --main-color: #338989;
}

/* section要素の中でのみ使用できる */
section {
  --section-title-color: #445;
}

/* wrapperクラスの中でのみ使用できる */
.wrapper {
  --wrapper-width: 1166px;
}
```

## HTML側で変数を定義できる

さて、ここまででもCSS変数の便利さは伝わったと思うのですが、もうひとつ、個人的にとても好きなCSS変数の利用方法を紹介します。CSS変数はなんと、html側のタグの**style属性でも定義できる**のです。

題材として、以下のようなプログレスバーを考えます。

![](./images/image01.png)

HTMLとCSSは以下の通りです。

```html:title=index.html
<body>
  <p>30%</p>
  <div class="wrapper">
    <span class="bar bar1"></span>
  </div>

  <p>40%</p>
  <div class="wrapper">
    <span class="bar bar2"></span>
  </div>

  <p>50%</p>
  <div class="wrapper">
    <span class="bar bar3"></span>
  </div>
</body>
```

```css:title=style.css
:root {
  --wrapper-width: 350px;
}

.wrapper {
  position: relative;
  width: var(--wrapper-width);
  height: 20px;
  margin-bottom: 30px;
  border: 1px solid #444;
}

/* グラデーションバーの共通スタイル */
.bar {
  position: absolute;
  display: block;
  height: 20px;
  background: linear-gradient(to right, #5691c8, #457fca);
}

/* グラデーションバーの横幅をそれぞれ定義 */
.bar1 {
  width: calc(var(--wrapper-width) * 0.3);
}

.bar2 {
  width: calc(var(--wrapper-width) * 0.4);
}

.bar3 {
  width: calc(var(--wrapper-width) * 0.5);
}
```

構成をざっと説明します。`.wrapper`がバーの外枠で、`.bar`が青のグラデーションになっている部分です。CSS変数`--wrapper-width`を定義することで、外枠の大きさを定義しています。グラデーションバーについては、`.bar`で定義しています。また、3つの`.bar`それぞれに`bar1`、`bar2`、`bar3`と個別のクラスを定義し、そこで`calc()`を使って`width`の値を計算しています。

これでも問題ないのですが、HTML側でもCSS側でも`bar1`、`bar2`、`bar3`という3つのクラスが定義されていることがちょっと気になります。以下のようにHTML側でCSS変数を定義してみましょう。

```html:title=index.html
<div class="wrapper">
  <span class="bar" style="--width: 0.3"></span>
</div>

<div class="wrapper">
  <span class="bar" style="--width: 0.4"></span>
</div>

<div class="wrapper">
  <span class="bar" style="--width: 0.5"></span>
</div>
```

HTML側では`style`属性の中にCSS変数を定義します。そうすればCSS側で取り出して利用することができます。

```css:title=style.css
.bar {
  position: absolute;
  display: block;
  height: 20px;
  /* style属性で定義された--widthを利用して計算する */
  width: calc(var(--wrapper-width) * var(--width));
  background: linear-gradient(to right, #5691c8, #457fca);
}
```

こうしてCSS側での`.bar1`、`.bar2`、`.bar3`を削除することができました。メンテナンス性も向上しますね。

---

このCSS変数はかなり利用シーンが広そうなので、改めて別で詳しく記事にする予定です。

## 参考

- [CSS カスタムプロパティ (変数) の使用 | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_custom_properties)

- [CSS Custom Properties for Cascading Variables Module Level 1](https://www.w3.org/TR/2021/CRD-css-variables-1-20211111/)

- [A Complete Guide to Custom Properties | CSS-Tricks - CSS-Tricks](https://css-tricks.com/a-complete-guide-to-custom-properties/)
