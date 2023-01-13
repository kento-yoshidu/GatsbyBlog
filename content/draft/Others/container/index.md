---
title: "CSS Container Query"
postdate: "2022-10-10"
update: "2022-10-10"
seriesName: "その他"
seriesSlug: "Others"
description: "CSSのContainer Queryを触ってみました。"
tags: ["CSS", "@container"]
keywords: ["CSS", "@container", "Container Query", "コンテナークエリー"]
published: false
---

# 対応完了間近の`@container`

CSSの新しいクエリーであるContainer Query（`@container`）ですが、2023年1月現在、Firefoxを除く主要ブラウザーで使用できるようになっています。Firefoxもバージョン108からは対応されているようですので、実践投入できるタイミングも近づいてきたように思います。

![Firefox以外のブラウザーで対応完了。Firefoxでもバージョン108から対応。](./images/image01.png)

ブラウザーのビューポートのサイズではなく、コンテナー（≒親要素）のサイズによって変更できます。

https://www.w3.org/TR/2022/WD-css-contain-3-20220818/