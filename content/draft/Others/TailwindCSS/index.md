---
title: "Tailwind CSSについて何となく考えてみた"
postdate: "2023-01-01"
update: "2023-01-01"
seriesName: "その他"
seriesSlug: "Others"
description: ""
tags: ["CSS", "Tailwind CSS"]
keywords: ["CSS", "Tailwind CSS"]
published: false
---

# Tailwind CSSについて考えてみただけの記事

流行っている、というか

## クラス名を考えなくてすむメリット

Tailwindのメリットとして「クラス名を考える必要がない」というものがありますが、私はここにメリットを感じたことはありません。

Tailwindを利用するということは（たいていの場合）ReactだったりVue.jsを使っているわけで、それらを使っているってことは（たいていの場合）コンポーネントごとに分けているわけで、その時点で（たいていの場合）コンポーネントごとに名前空間を作ってくれる技術が利用されているわけで、Tailwindを利用しなくてもクラス名を考えるしんどさは解消されていると思うのです。

`wrapper`だったり`inner`だったり`item`っていう名前を神経質にならずに使えるっていうメリットは、Tailwind（やユーティリティクラスフレームワーク）を使ってクラス名を完全に排除した時のメリットとほとんど変わらない気がします。

コンポーネント内でクラス名を10個も20個も考える必要があるなら、それはもうコンポーネントの設計というか、粒度の問題だと思います。

https://qiita.com/Takazudo/items/78ee15564bfefdea844c

https://dev.to/cher/sexism-racism-toxic-positivity-and-tailwindcss-cil
