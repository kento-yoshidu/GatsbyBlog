---
title: "HTML & CSS 応用編"
postdate: "2021-01-30"
updatedate: "2021-01-30"
categoryName: "HTML & CSS 応用編"
categorySlug: HTMLAdvance
tags: ["HTML"]
---

# コンテンツモデル

- フローコンテンツ
- メタデータコンテンツ
- セクショニングコンテンツ
- ヘッディングコンテンツ (セクションの見出し)
- フレージングコンテンツ(従来のインライン要素)
- エンベデッドコンテンツ 外部ファイルの埋め込み
- インタラクティブコンテンツ

# 空要素

開始タグのみで中身がないもの。

# セクショニングルート

独立した階層構造を持つ要素。以下の6要素。

- body
- fieldset
- td
- blockquote 
- details
- figure

# アウトライン

HTML文書の構造を表す概念。セクショニングコンテンツで構成される。

## セクショニングコンテンツ

- aside
- body
- nav
- section

# 属性

どの要素にも指定できる属性を、**グローバル属性**という。

## グローバル属性

|属性名|内容|属性型|
|:--|:--|:--|
|id|一意の識別子|
|class|分類|
|style|CSSファイルを指定|
|lang|言語を指定|
|dir|文字列の方向|
|hidden|ページと無関係(表示されない)|論理|
|accesskey|キーボード、ショートカット|
|title|タイトル|
|spellcheck|スペルチェックの有効か/無効化|列挙|
|draggable|ドラッグできるかどうか|列挙|
|contenteditable|編集可能か不可能か|列挙|

## meta要素に指定できるもの

|属性名|内容|設定値|
|:--|:--|
|charset|エンコーディング|
|content|メタデータの値|
|http-equiv|プラグマ指示子にする|
|name|名前を指定|

# 文字コード

|文字コード|説明|
|:--|:--|
|UTF-8|HTML5での使用が推奨されている|
|ISO-2022-JP|半角カタカナに対応していない|
|Shift-JIS|WIndowsで使用されている|
|EUC-JP|UNIX、Linuxで使用されていた日本語文字コード|
