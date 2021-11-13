---
title: "Stringオブジェクト"
postdate: "2099-01-01"
updatedate: "2099-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: "JavaScriptの持つデータ型について解説します。長くなってしまうので前後2つの記事に分けて解説します。"
tags: ["JavaScript"]
---

# 文字列型

## String#localeCompare

`A.localeCompare(B)`としましょう。AとBを比べ、AよりもBの方が先に出現するなら**正の数**、Bの方が後に出現するなら**f負の数**、それ以外、つまり、AとBが同じであれば**0**が出力されます。

これは分かりにくいですね、実演しましょう。