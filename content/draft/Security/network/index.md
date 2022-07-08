---
title: "衝突を回避する技術"
postdate: "2022-06-16"
update: "2022-06-16"
seriesName: "苦しんで覚える正規表現"
seriesSlug: "RegularExpression"
description: ""
tags: ["セキュリティ", "ネットワーク"]
keywords: ["security", "セキュリティ", "network", "ネットワーク", "IEEE802.11"]
---

# 衝突を回避する技術

そんな中、久しぶりに**CSMA/CD**という単語を見ました。「あー応用情報の試験を勉強してる時によく見たなー」とか呑気な事を思ったのですが、詳しいことは記憶から抜け落ちていることに気付きました。

また、無線LANで用いられるCSMA/CAにおいても「新しめのacとかaxでも使われているのか？」という疑問が出てきましたので、素人ながら周辺情報をまとめてみました。

## CSMA/CA

> IEEE 802.11は、無線LANの伝送方式を規定した標準規格です。

> CSMA/CA(搬送波感知多元接続／衝突回避方式)は、無線LANにおけるアクセス制御方式の一つで、IEEE 802.11a/b/g/nなどにおいて基本的な通信手順として使われています。CSMA/CDが「衝突の発生を許容し、衝突発生後に再び衝突が発生しないように制御する」のに対し、CSMA/CAは「できるだけ衝突を回避できる」ような仕組みになっていることが特徴です。

なお、CSMA/CDの方はイーサネットで使用される（されていた）規格です。

言葉の意味を覚えましょう。CAはCollision **Avoidance**の略であり、Avoidanceには「回避」という意味があります。無線LANではそもそもフレームの衝突、干渉の検知が難しいですから、いかに避けるかという考え方をします。

対してCDはCollision **Detection**の略であり、「検知」という意味があります。

そもそも衝突自体が起こらなくなりました。ですので、現代のイーサネットにおいては基本的には使われていない技術の様です。

https://teratail.com/questions/333708

https://internet.watch.impress.co.jp/docs/column/nettech/1123484.html

https://milestone-of-se.nesuke.com/nw-basic/wireless/ieee802-11ax-ofdma-mu-mimo/
