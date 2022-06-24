---
title: "CSSのカスケードと継承について復習する"
postdate: "2022-05-13"
update: "2022-05-13"
seriesName: "その他"
seriesSlug: "Others"
description: "CSS Cascade Layersについて紹介します。"
tags: ["CSS", "Cascade"]
keywords: ["CSS", "Cascade Layers"]
published: false
---

# CSSのカスケードと継承について復習する

CSSには新しく`Cascade Layers`という概念が提唱されています。これについて記事を書こうかなーと思っていたんですが、「そもそもカスケードや継承について本当に分かっているのか？」という不安がよぎったので復習することにします。

根拠は[CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/)です。Level5はまだ勧告候補の段階ですが、モダンCSSを学習するという意味でもこちらを採用しました。

<aside>

Cascade layersについて知りたい方は、[こちら](https://developer.mozilla.org/ja/docs/Web/CSS/@layer)から確認ください。

</aside>

<aside>

まだ草案の段階ですが、[CSS Cascading and Inheritance Level 6](https://www.w3.org/TR/2021/WD-css-cascade-6-20211221/)も発行されています。

</aside>

## プロパティの値はどのように決定されるのか？

今回の記事では、CSSプロパティの値がどのように決定されどのスタイルが適用されるか、そのルールについて学びます。

これは**詳細度の話とは限りません**。例えば、「idセレクターの方がclassセレクターよりも詳細度が高くてー」という話は皆さんご存じだと思いますが、では「同じclassセレクターで違うスタイルが定義されている」時や、「インラインCSS（`<p style="color: red">`というやつ）と、CSSファイルで違うスタイルが定義されている」時などです。いうなれば、**詳細度が同じ**スタイルが複数存在する時にどのスタイルが適用されるか、を決定するものです。

逆に、ある要素に対してスタイルが宣言されていない場合にどうするかというのも決定する必要があります。

これらは普段CSSを書いている我々であれば感覚的に（そしていくらかの知識を元に）判断できますが、仕様書レベルでちゃんと理解しよう、というのが今回のテーマです。


