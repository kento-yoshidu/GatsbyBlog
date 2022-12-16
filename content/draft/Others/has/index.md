---
title: "CSSのhas()擬似クラス関数"
postdate: "2023-01-01"
update: "2022-01-01"
seriesName: "その他"
seriesSlug: "Others"
description: "2022年発売されたHTMLの書籍を紹介します。"
tags: ["CSS", "擬似クラス関数"]
keywords: ["CSS", "has"]
published: false
---


要素の親子関係でスタイルを決定するセレクターといえば、子孫セレクターが該当します。`div p {}`の様に要素間に半角スペースを空けて記述します。これの意味は「ある親要素を持つ子要素のスタイルを指定する」です。以下の例で言うと、「boxクラスを親要素に持つp要素」のみにスタイルを当てています。

```html
<div class="box">
  <p>boxクラスの中のp要素です。</p>
</div>

<p>p要素です。</p>
```

```css
.box {
  width: 150px;
  height: 150px;
  border: 1px solid #444;
}

/* boxクラスのp要素だけにスタイルが当たる */
.box p {
  color: red;
}
```

`has()`関数は言わば逆で、「ある子要素を持つ要素」のスタイルを指定することができます。子要素の有無で自身のスタイルを変更できるということです。

```html
<div class="box">
  <p>p要素を持つboxクラスです。</p>
</div>

<div class="box">
  boxクラスです。
</div>
```

```css
.box {
  width: 150px;
  height: 150px;
  border: 1px solid #444;
}

.box:has(p) {
  background-color: lightblue;
}
```

これは今まで実現する方法はCSSではありませんでした（JavaScriptなどを使う必要があった）。CSSネイティブの機能で実現できるのであれば



