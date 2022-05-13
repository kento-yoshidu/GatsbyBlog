---
title: "CSSのカスケードについて復習する"
postdate: "2022-05-13"
update: "2022-05-13"
seriesName: "その他"
seriesSlug: "Others"
description: "CSS Cascade Layersについて紹介します。"
tags: ["CSS", "Cascade Layers"]
keywords: ["CSS", "Cascade Layers"]
published: false
---

# CSSのカスケードについて復習する

CSSには新しく`Cascade Layers`という概念が提唱されています。これについて記事を書こうかなーと思っていたんですが、「そもそもカスケードや継承について本当に分かっているのか？」という不安がよぎったので復習することにします。

根拠は[CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/)です。Level5はまだ勧告候補の段階ですが、モダンCSSを学習するという意味でもこちらを採用しました。

<aside>

Cascade layersについて知りたい方は、[こちら](https://developer.mozilla.org/ja/docs/Web/CSS/@layer)から確認ください。

</aside>

<aside>

まだ草案の段階ですが、[CSS Cascading and Inheritance Level 6](https://www.w3.org/TR/2021/WD-css-cascade-6-20211221/)も発行されています。

</aside>

## カスケードについて

カスケードとは何か、一言で説明するのは難しいですが、複数のCSSスタイルが定義された時にどのスタイルが適用されるかを決定するルール、であるとします。

これは**詳細度の話ではありません**。例えば、「idセレクターの方がclassセレクターよりも詳細度が高くてー」という話は皆さんご存じだと思いますが、では「同じclassセレクターで違うスタイルが定義されている」時や、「インラインCSS（`<p style="color: red">`というやつ）と、CSSファイルで違うスタイルが定義されている」時などです。いうなれば、**詳細度が同じ**スタイルが複数存在する時にどのスタイルが適用されるか、を決定するものです。



