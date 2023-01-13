---
title: "【随時更新】css-nestingについて"
postdate: "2023-01-11"
update: "2023-01-13"
seriesName: "その他"
seriesSlug: "Others"
tags: ["CSS", "css-nesting"]
description: "待望のcss-nestingについてまとめます。"
keywords: ["CSS", "css-nesting"]
published: true
---

# 【随時更新】css-nestingについて

個人的に一番実現を望んでいる**css-nesting**ですが、2022年後半から大きく進み出した雰囲気があり、(　ﾟ∀ﾟ)o彡゜ワッフル！ワッフル！しています。

実は、今年の目標の一つとして**脱Sass**を掲げています。Sassを覚えたてのころは「Sassすごすぎｗｗｗｗ」とか言って既存のCSSを全てSassに置き換える勢いで利用していましたが、CSSネイティブの機能が充実してきた今、「出来るだけCSSのみを使っていこうかな」という風にお気持ちが変わってきました。そして、それを一番後押ししているのがcss-nestingの存在です。

将来css-nestingが実用化されたとき、乗り遅れないために今のうちから情報を集めておこうと思い、この記事にまとめたいと思います。とりあえずは随時更新という形をとり、どこかのタイミングでクローズするつもりです。仕様の解説ではなく、調べたことをメモ的に羅列していくだけなので悪しからず。間違ったことを書いている可能性も高いと思いますので、半信半疑でお読みください。

## W3Cの仕様書

W3Cの仕様書はこちら。[CSS Nesting Module(Working Draft)](https://www.w3.org/TR/2021/WD-css-nesting-1-20210831/)

2023年1月現在のステータスは**FPWD**です。

Editors Draftはこちら。[CSS Nesting Module(Editor's Draft)](https://drafts.csswg.org/css-nesting-1/)

## 日本語で書かれている記事

- 2021年12月　[そろそろ Native CSS Nesting の話をしよう - Qiita](https://qiita.com/otsuky/items/68a5fa533aff3f9386e5)
- 2022年11月　[CSS Nestingを試してみる - Qiita](https://qiita.com/yuki-endo/items/37cd718318488ced7254)
- 2022年11月　[Sassなしで入れ子が可能に。CSSネストがブラウザにやってきた](https://zenn.dev/moneyforward/articles/css-nesting-without-sass)

## 英語で書かれている記事

- 2023年1月　[🎨 W3C Decided On CSS Nested Syntax | by Tom Smykowski | Jan, 2023 | Medium](https://tomaszs2.medium.com/w3c-decided-on-css-nested-syntax-950bc13f3ce7)
- 2022年12月　[Help choose the syntax for CSS Nesting | WebKit](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/)

## GitHubのIssue

- [[css-nesting-1] Syntax Invites Errors · Issue #7834 · w3c/csswg-drafts · GitHub](https://github.com/w3c/csswg-drafts/issues/7834)

## ブラウザーで使えるのか

Google Chromeのバージョン109以降であれば、フラッグを立てることで利用できます。

[Can I use](https://caniuse.com/css-nesting)

## シンタックス

[投票の結果](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/)、最多の票を獲得したシンタックス。でも変更される可能性もなくはないと思われます。基本的に、Sass(というかSCSS)と同じように書くことができます。

```css
.wrapper {
  width: 50%;

  .inner {
    width: 50%;
  }
}
```

要素セレクターを記述する時は、前に`&`を置く必要があります。

```css
.wrapper {
  width: 50%;

  .inner {
    width: 50%;

    & p {
      font-size: 3rem;
    }
  }
}
```

擬似クラスや擬似要素もSCSSと同じように記述できます。

```css
/* 擬似クラスの例① */
p {
  color: #444;

  &:hover {
    color: blue;
  }
}

/* 擬似クラスの例② */
article {
  & p:first-child {
    font-weight: bold;
  }
}

/* 擬似要素の例① */
ul {
  & li {
    &::before {
      content: "★"
    }
  }
}

/* 擬似要素の例② */
p {
  &::first-letter {
    font-size: 2rem;
  }
}
```

## CSSに書き換えてみて

現在、プライベートで運用しているサイトのSassをCSSに置き換えていっています。

ちょっと大袈裟な例ですが、以下のような深いネストの記述が点在していました。

```scss
ul {
  li {
    a {
      color: #444;

      &:hover {
        color: lightblue;
      }
    }
  }
}
```

css-nestingで書き換えるなら以下のようになると思います。

```scss
ul {
  & li {
    & a {
      color: #444;

      &:hover {
        color: lightblue;
      }
    }
  }
}
```

ネストで書けるのはSass（とcss-nesting）のメリットではありますが、そもそもネストはレンダリング的にも良くないので、適切なクラスを付与して以下のように書くことにしました。CSS Modulesを利用しモジュール分割しているので、クラス名がバッティングする心配も少ないです。

```css
.link {
  color: #444;
}

.link:hover {
  color: lightblue;
}
```

これくらいの記述量であれば負担にもなりませんね。css-nestingが実現すれば以下のように記述できそうです。

```scss
.link {
  color: #444;

  &:hover {
    color: lightblue;
  }
}
```


- [Help pick a syntax for CSS nesting - Chrome Developers](https://developer.chrome.com/blog/help-css-nesting/)
