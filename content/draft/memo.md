---
title: "メモ"
postdate: "2022-01-07"
update: "2022-01-07"
seriesName: "メモ"
seriesSlug: "Memo"
description: "メモ"
tags: ["Memo"]
keywords: ["Memo"]
published: false
---

## 3月11日金曜日

[13.1 Writing HTML documents | HTML Standard](https://html.spec.whatwg.org/multipage/syntax.html#syntax)

> ASCII whitespace before the html element, at the start of the html element and before the head element, will be dropped when the document is parsed;

html要素の前と先頭、head要素の前の空白はパースの時に削除される。html要素の先頭っているのがよく分からん。

そもそもASCII whitespaceとは何なのか？

> ホワイトスペースとは、<mark>スペース、タブ、改行 (正確には、CRLF シーケンス、キャリッジリターン、改行)</mark> のみで構成されたテキストの文字列のことです。これらの文字を使用することで、自分や他の人が読みやすいようにコードを整形することができます。実際、私たちのソースコードの多くはこれらのホワイトスペースであふれており、コードのダウンロードサイズを減らすために、本番のビルド段階でホワイトスペースを取り除く傾向があります。

参考 : [ホワイトスペースは HTML、 CSS、そして DOM 内でどう扱われるか | MDN](https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Whitespace)

スペース、タブ、CRLF、CRらしい。

> ASCII whitespace after the html element will be parsed as if it were at the end of the body element.

html要素の後ろのホワイトスペースは、body要素の最後にあるようにパースされる。

> A DOCTYPE is a required preamble.

DOCTYPE宣言はプリアンブル。

> When omitted, browsers tend to use a different rendering mode that is incompatible with some specifications. 

DOCTYPE宣言を省略すると、ブラウザーは互換性モードでレンダリングすることがある。