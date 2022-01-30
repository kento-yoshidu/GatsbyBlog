---
title: "再レンダリングのタイミング"
postdate: "2099-01-01"
update: "2099-01-01"
seriesName: "ラーニングReact"
seriesSlug: "LearningReact"
description: ""
tags: ["React", "React Hooks"]
---

# Reactのライフサイクル

私がReactを理解できないのは、Reactのライフサイクルを理解していなかったからでした。


Reactのライフサイクルは**Reactコンポーネント**が生まれてから死ぬまでの流れです。

大きく分けると、

- コンポーネント生成～レンダリングまで(Mounting)
- コンポーネントのデータ更新(updating)
- 終了(Unmounting)

の3つになります。

## Mounting

### constructor

最初、**Mount前**に呼ばれるメソッド。

### render

JSXコードから、**仮想DOM**を生成する。

### componentDidMount

1回目の`render`が呼ばれた後にのみ、実行される。

## 参考

https://zenn.dev/web_tips/articles/8911d3b761c8f3

https://zenn.dev/b1essk/articles/react-re-rendering