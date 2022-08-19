---
title: "セキュリティ"
postdate: "2022-06-16"
update: "2022-06-16"
seriesName: "セキュリティ"
seriesSlug: "Security"
description: ""
tags: ["awk", "sed"]
keywords: ["awk", "sed"]
---

# 共通鍵暗号化と公開鍵暗号化

## 共通鍵暗号化方式

ブロック暗号化方式とストリーム暗号化方式に分けられます。

ブロック暗号化方式は、データ撹拌部と鍵生成部から成り**ブロック単位**で暗号化が行われます。ストリーム暗号化方式は、乱数を用い平文を**ビット単位**で暗号化します。

ブロック暗号化方式には、3DESやAESという暗号化方式があり、現在はAESが主に用いられています。

ストリーム暗号化方式はRC4が代表ですが現在は使用を避けるべきと言われています。ChaCha20は比較的新しいアルゴリズムです。

# 中間者攻撃（man-in-the-middle）

通信経路上の第三者Cが,利用者Aから送られる情報を,にせの情報にすりかえて利用者Bに送信する。

# DNSキャッシュポイズニング

DNSサーバーのレコードを書き換える。


## 参考

https://developer.mozilla.org/ja/docs/Web/HTTP/CORS

https://blog.flatt.tech/entry/contents_recommendation_for_developers

https://scgajge12.hatenablog.com/entry/jwt_security

https://www.ipa.go.jp/files/000017316.pdf
