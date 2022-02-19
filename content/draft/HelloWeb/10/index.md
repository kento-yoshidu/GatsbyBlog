---
title: "#10 CSSの基本②（セレクターの基礎）"
postdate: "2022-02-18"
update: "2022-02-18"
seriesName: "初めてのHTML & CSS"
seriesSlug: "HelloWeb"
description: "CSSの子孫セレクターとIDセレクターについて学習します。"
tags: ["CSS"]
keywords: ["CSS", "セレクター"]
---

# 子孫セレクター

子孫セレクターとは、その名の通りある要素の子孫要素を指定するセレクターです。

## div要素

まずは新しいHTML要素をひとつ紹介します。`div`要素です。`div`要素はコンテンツを囲うボックスのようなものを作成します。

`div`要素に文書構造的な意味はありません。`h1`要素なら見出し、`p`要素なら段落、という風に各要素に意味があると説明しましたが、`div`要素にはそれがありません。

CSSでスタイリングする上で、`div`要素はとても重要です。「この要素を囲ってひとまとまりにして、CSSを適用させたいな」という場面がかなりあります。文書的に意味を持たないからこそ、汎用的に使うことができます。

「囲う」という意味で`wrapper`というクラス名を付けることが多いです。

ちょっと話は逸れますが、`wrapper`クラスの周りに枠線を引いてみましょう。`border`プロパティを使用します。`border`プロパティの値は、「`線の太さ、線の種類、線の色`」という風に記述します。以下のように記述することで、1pxの黒い直線が`wrapper`クラスに引かれます。

```css:title=style.css
.wrapper {
  border: 1px solid #000;
}
```

また、`wrapper`クラスの内部に余白を付ける`padding`プロパティもついでに定義しておきましょう。

```css:title=style.css
.wrapper {
  border: 1px solid #000;
  padding: 10px;
}
```

さて、この`wrapper`クラスの中の`important`クラスだけ文字を赤くしたい時はどうすればいいでしょうか。（`important`というクラス名自体を変えるというのも大変素晴らしい考え方ですが、ここではそれは置いておきましょう。)

子孫セレクターはこんな時に利用できるセレクターです。`親要素名 子孫要素名`という風に、半角スペースを空けて要素名やクラス名を記述します。これで`wrapper`クラスの中にある`.important`クラスに限定してスタイルが適用されます。

```css:title=style.css
.wrapper {
  border: 1px solid #000;
}

.wrapper .important {
  color: red;
}
```

`.wrapper`クラスの外にある`.important`クラスにはスタイルが適用されていないことがわかりますね。

### 範囲内の全ての要素に適用される

**子孫**セレクターという名前の通り、指定したスタイルは孫要素やひ孫要素までずっと辿って適用されます。以下のHTMLは`.wrapper`クラスの中に`inner`要素を作成し、その中に`.important`クラスを用意した例です。

```html:title=index.html
<body>
  <div class="wrapper">
    <p class="important">
      wrapperクラスの中のp要素です。
    </p>
    <div class="inner">
      <p class="important">
        wrapperクラスの中のp要素です。
      </p>
    </div>
  </div>

  <p class="important">p要素です。</p>
</body>
```

※`inner`クラスの周りに青い枠線を引きます。

```css
.wrapper {
  border: 1px solid #000;
  padding: 10px;
}

.inner {
  border: 1px solid blue;
}

.wrapper .important {
  color: red;
}
```

ページを確認してみると、`.important`クラスの文字が赤くなっていますね。`.wrapper`クラスの全ての`.important`クラスに

セレクターを、`.wrapper div div div div .important`のように記述する必要はありません。

<aside>

子要素のみを指定する**子セレクター**`>`というのもあります。

</aside>





## まとめ

- ✅ 子孫セレクターは子孫要素に対するセレクター
- ✅ `class="クラス名"`という風にクラス属性を付与する
- ✅ クラスセレクターは`.クラス名`、ユニバーサルセレクターは`*`と記述する
- ✅ 各セレクターには**詳細度**という考え方があり、詳細度が高いセレクターのスタイルが適用される

次回は、主に**子孫セレクター**について学習します。

## 参考
