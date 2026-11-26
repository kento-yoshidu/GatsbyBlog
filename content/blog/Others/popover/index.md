---
title: "Popover APIを理解する"
postdate: "2026-12-01"
update: "2026-12-01"
seriesName: "その他"
seriesSlug: "Others"
description: ""
tags: ["HTML"]
keywords: ["HTML"]
published: false
---

今年に入ってからPopover APIを本格的に使いだし実戦投入もしました。

雰囲気で使っているところもあるので仕様理解も兼ねて記事にします。

## popover

Popover APIは、ツールチップやメニューなどのポップアップUIを作るためのWeb標準の機能です。HTML要素に`popover`属性をつけることで、その要素を表示させた時に最前面に表示させることができます。

MDNを参照します。[popover API](https://developer.mozilla.org/ja/docs/Web/API/Popover_API)については、

> ポップオーバー API は、他のページコンテンツの上に表示するポップオーバーコンテンツを表示するための、標準的な、一貫性のある、柔軟な仕組みを開発者に提供します。ポップオーバーコンテンツは、HTML 属性を用いて、または JavaScript を用いて制御することができます。

[popover属性](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Global_attributes/popover)については以下の記述があります。

> popover はグローバル属性で、要素をポップオーバー要素として示すために使われます。

`popover`属性を持つ要素は、表示中は**Top Layer**へ昇格します。話は逸れますがまずはTop Layerについて考えてみます。

### Top Layer

> 上位レイヤーは、ビューポートの幅と高さ全体にわたり、ウェブ文書内に表示される他のすべてのレイヤーの最上位に位置する固有のレイヤーです。これは、ページ上の他のすべてのコンテンツの上に現れるべき要素を含むために、ブラウザーによって作成されます。

レイヤー、とぼんやりとした説明がありますが、要素ではなく、概念のようなものです。なのでJavaScriptから操作できるわけではありません。ただ、`::backdrop`は付与されるので

Top Layerに`::backdrop` → `popover`要素の順で積まれるイメージです。

## `dialog`要素との違い

||`popover`|`dialog`|
|---|---|---|
|背景の操作|できる|できない|
|フォーカスの閉じ込め|なし|あり|
|外側クリックで閉じるか|`auto`なら閉じる|閉じない|
|JavaScriptなしで開閉|できる|基本的にはできない|
|主な用途|ツールチップ、メニュー、トースト|モーダル、ダイアログ|


## 参考

- https://developer.mozilla.org/ja/docs/Web/API/Popover_API
- https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Global_attributes/popover
