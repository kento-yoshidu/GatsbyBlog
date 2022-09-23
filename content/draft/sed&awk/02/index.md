---
title: "#2 sed"
postdate: "2022-06-16"
update: "2022-06-16"
seriesName: "モダンCSS"
seriesSlug: "ModernCSS"
description: "現代のモダンなCSSを学びます。"
tags: ["CSS"]
keywords: ["CSS"]
---

# sedはテキスト加工を行う

`-e`で編集コマンドを指定します。しかし、コマンドが一つの場合は`-e`は省略可能です。

`sed -e s/aaa/AAA/`

`sed s/aaa/AAA/`

以下のように2つの場合はそれぞれに`-e`をつけます。

`sed -e s/aaa/AAA/ -e s/bbb/BBB/`

例えば「行頭が#の行を削除する」としたら`sed /^#/d`とします。
