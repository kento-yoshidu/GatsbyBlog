---
title: "CSS高速化が分からない"
postdate: "2023-01-01"
update: "2023-01-01"
seriesName: "その他"
seriesSlug: "Others"
description: "どのようにしてCSSのレンダリング速度を向上させればいいかを考えます。"
tags: ["CSS"]
keywords: ["CSS"]
published: false
---

> when the engine sees a selector like `.wrapper .section .title .link` it will try to match the `link` class with the element first,

セレクターは右から左に読まれます。

CSSコーダーとしては、「`.wrapper`の中の`.inner`の中の`p`」という感覚で書いたり読んだりするでしょうから、それとは反対の向きでたどっていることになります。

つまり、右に要素セレクターや全称セレクター（`*`）など詳細度の低いセレクターを置くことで計算コストが増大することになります。

https://zenn.dev/lollipop_onl/articles/eoz-devtools-rendering-panel
