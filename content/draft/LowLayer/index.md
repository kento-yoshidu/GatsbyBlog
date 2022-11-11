---
title: "普通のやつらの下を行け"
postdate: "2025-01-01"
update: "2025-01-01"
seriesName: "日記"
seriesSlug: "Diary"
description: "低レイヤーを一通り勉強しましたので、内容をまとめます。"
tags: ["低レイヤー", "CPU"]
---

# 普通のやつらの下を行け

おおよそ5年ほどかけて、低レイヤーをある程度勉強しました。ここでいう低レイヤーとは、以下の内容を指します。

- CPU
- C、C++、Rust
- アセンブラ
- アルゴリズム
- コンパイラー、インタプリター
- OS概論
- Linuxカーネル
- ネットワーク（イーサネット、無線LAN、TCP/IP）
- DBアーキテクチャー
- Webブラウザー

「これ低レイヤーっていうか？」っていうのもあるかもしれませんが、「一般的なアプリケーション開発」未満のレイヤー、という意味で低レイヤーと括りました。

この記事では、低レイヤーについて勉強した内容と、勉強に使用した書籍やサイトを紹介します。

## 電気・数学

まずは、失われた義務教育の知識+αを復習します。もう20年近く前の内容は満足に覚えていません。

数学と電気についてしっかり目に復習します。

[静電気-高校物理をあきらめる前に](https://www.yukimura-physics.com/entry/elemag-f01)

大学数学の範囲で言うと、線形代数と微分積分を学習しました。

## コンピューターサイエンス

各要素の学習の前に、いわゆるコンピューターサイエンスを広く浅く学習しました。

## C言語、Rust

当初はC/C++のみでやっていくつもりだったのですが、かなりきつく心が折れそうだったのでRustに切り替えることにしました（Rustの学習で心が折れましたが）。

## CPU

CPUを創ろう

## コンパイラー、インタプリター、言語処理など

### オートマトン

[白と黒のとびら - 東京大学出版会](http://www.utp.or.jp/book/b306519.html)

[O'Reilly Japan - コンピュータシステムの理論と実装](https://www.oreilly.co.jp/books/9784873117126/)

[O'Reilly Japan - Go言語でつくるインタプリタ](https://www.oreilly.co.jp/books/9784873118222/)

[O'Reilly Japan - アンダースタンディング コンピュテーション](https://www.oreilly.co.jp/books/9784873116976/)

## ブール演算

[](https://www.saluteweb.net/~oss_1bitcpu.html)

[1バイトの都市伝説](http://diode.matrix.jp/LEGEND/BYTE.htm)

[](https://qiita.com/yaju/items/c5da6df2221d5c3611e0)

### CPU

[CPUのアーキテクチャの違いまとめ（x86/x64/x86_64/AMD64/i386/i686とはなんなのか？） - フラミナル](https://blog.framinal.life/entry/2020/04/22/041548)

[トランジスターの仕組み](https://www.intel.co.jp/content/www/jp/ja/innovation/transworks.html)

### メモリー

[メモリの規格と種類は？DDRとPCの違いは何？マザーボードとの相性や帯域の関係とは？ | 自作PCテクニカルセンター](https://jisakupc-technical.info/basic/memory/specification/)

[メモリにも種類がある？DDR4のメモリは何が違うの？｜ドスパラ通販【公式】](https://www.dospara.co.jp/5info/cts_str_parts_ddr4)

### アルゴリズム

[B-Tree by Java &amp; Python -- B木のすごく簡単な実例](http://wwwa.pikara.ne.jp/okojisan/b-tree/index.html)

[JavaScriptで学ぶアルゴリズム②[2分探索]｜Tasting.com 【アプリリリース予定】｜note](https://note.com/tasting/n/n6d746606c532)

[B TreeとB+ Treeの違い - Carpe Diem](https://christina04.hatenablog.com/entry/2017/05/17/190000)

## 感想

この5年間、かなり苦しかったです。自分の出来なさ加減に、誇張抜きに日々生きているのが苦しく感じる時期が続きました。

しかしそれでも勉強を続けられたのは、普通のやつらが知らない下の世界を知りたいという気持ちと、このままだと爺さんになって死ぬ時に「もっと勉強しとけばよかった」と後悔するに違いないという予感があったからです。

ここまでやってやっと道が開けたというか、「Linuxカーネルのメンテナー」とかまるで雲の上の存在だった人達が少し身近に感じられた気がします。

## 参考

[低レイヤーの歩き方 - るくすの日記 ~ Out_Of_Range ~](https://rkx1209.hatenablog.com/entry/2016/12/25/141543)

[低レイヤを知りたい人のためのCコンパイラ作成入門](https://www.sigbus.info/compilerbook)
