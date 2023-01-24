---
title: "【悲報】CSSのfont-sizeが分からない"
postdate: "2023-01-01"
update: "2023-01-01"
seriesName: "その他"
seriesSlug: "Others"
description: "font-sizeの指定方法がわからない"
tags: ["CSS", "アクセシビリティ"]
keywords: ["CSS", "font-size"]
published: false
---

# pxなのかremなのか

いささか語りつくされた感のあるネタですが、世には「font-size、pxを使うかremを使うか問題」があります。この話題について食傷気味の方も多いと思いますが、私は勉強不足のため、そもそもこの議論に参加する資格すらない人間であることが判明しました。

なので今日はこれをテーマにしたいと思います。結論は「どちらかと言うとremを使った方が良さそう」です。

ハック的に以下のようにルートのサイズを変更する手法もあり、そこそこ広まっているようです。

```css
html {
  font-size: 62.5%;
}
```

かくいう私も、以前は妄信的に`font-size: 62.5%`を指定していましたが、色々考えた結果やめることにしました。

## font-sizeをpxで指定する

アクセシビリティのことを考えるならば、当然

ただ、文字通り変更されるのは文字だけですので、レイアウトが崩れる原因になるのではという声もよく耳にしました。

例えばこのブログのような、文書メインのサイトであればブラウザーの文字サイズ変更によるレイアウト崩れの影響は少ないでしょう。

しかし、利用者からしてみればレイアウトが崩れようが何だろうが、文字がちゃんと読めるのが最低条件であり、それを優先すべきとは思います。

## 参考

[html { font-size: 62.5%; } は嫌いだ - デフォルトを変更するのは悪手です - Qiita](https://qiita.com/mrd-takahashi/items/8396d84bd2c52ab1cf3e#%E6%9C%80%E5%96%84%E6%89%8B%E3%81%AF%E6%99%82%E3%81%AE%E6%B5%81%E3%82%8C%E3%81%A8%E5%85%B1%E3%81%AB%E6%82%AA%E6%89%8B%E3%81%AB%E8%90%BD%E3%81%A1%E3%82%8B%E4%BA%8B%E3%82%82%E3%81%82%E3%82%8B)

http://site.oukasei.com/?p=2332

https://qiita.com/NagayamaToshiaki/items/77e929d855d052863a85

https://zenn.dev/tak_dcxi/articles/26280e7607bcd2


https://to.camp/lesson?v=syr7IVIVoL7ZIoPVuHps

https://jsnotice.com/posts/2020-07-20/

https://coliss.com/articles/build-websites/operation/css/about-pixels-and-accessibility.html

https://zenn.dev/ojk/articles/web-resolution

https://css-tricks.com/accessible-font-sizing-explained/

https://whitep4nth3r.com/blog/how-to-make-your-font-sizes-accessible-with-css/
