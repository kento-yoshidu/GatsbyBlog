---
title: "#1 Git中級者を目指そう"
postdate: "2021-09-03"
update: "2021-12-10"
seriesName: "Git中級者を目指す"
seriesSlug: "GitAdvance"
description: "Git中級者を目指すためのシリーズです。基本的なコマンドの紹介からはじまり、Gitの内部構造を理解するところまでが目標です。"
tags: ["Git"]
---

# Git中級者を目指す

Gitは今や、私たちの日常に欠かせない当たり前のツールになりました。しかし、「イマイチ何をしているか分からずに打っているコマンドがある」「実行するのが怖いコマンドがある（`git rebase`とか）」「コンフリクトが起きると泡を吹く」という人も（私も含め）いると思います。また、「Gitの仕組み、内部構造ってどうなってるんだろう🤔」という疑問を持っている方も多いと思います（多いですよね？）。

そこで「Git中級者を目指す」という題名をつけ、いくつかの解説記事をあげたいと思います。それぞれの記事間のつながりは薄いので、好きなところからつまみ読みしても問題ないと思います。

## 目次

- \#1 Git中級者を目指そう（本ページ）
- [#2 git logでコミット履歴を見る(前編)](/GitAdvance/02/)
- [#3 git logでコミット履歴を見る(中編)](/GitAdvance/03/)
- [#4 git logでコミット履歴を見る(後編)](/GitAdvance/04/)
- #5 git logのコミット履歴を装飾する
- #6 git rebaseを使いこなす

- #x Git内部構造ツアー①
- #x Git内部構造ツアー②


## 参考にした書籍、サイト

このシリーズを書くにあたり参考にした書籍やWebサイトを紹介しておきます。書籍に関してはお勧め度を⭐️で表しています。

<aside>

一部、Amazonへのリンクを貼っていますが、アフィリエイトリンクではありません。クリックしても筆者に収益が発生することはありません。

</aside>

### 独習Git

[Amazonリンク](https://www.amazon.co.jp/dp/B01C2TRNUG/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)

出版：2016年2月

お勧め度：⭐⭐️⭐⭐️⭐️

私が最初に購入したGitの本です。個人的にお勧めの本No.1です。Gitに関して何も知らなくても、これ一冊をやりこめば初心者の域は十分超えられるんじゃないかと思います。

### 【改訂新版】Gitポケットリファレンス

[Amazonリンク](https://www.amazon.co.jp/dp/B01NBJYEXP/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)

出版：2016年12月

お勧め度：⭐⭐️⭐⭐️

Gitのリファレンス本です。Gitの公式リファレンスも良いのですが、何故か私にとって読みにくいのと日本語されているページがまだまだ少ないので、私はもっぱらこっちを参照しています。

### サル先生のGit入門〜バージョン管理を使いこなそう〜【プロジェクト管理ツールBacklog】

[Webサイト](https://backlog.com/ja/git-tutorial/)

全くのGit初心者が最初から勉強できるサイトです。ブランチやstashなどイメージにしにくい要素も図を用いて説明されています。

上記で挙げた**独習Git**よりも易しいと思いますので、まずはこのサイトでGitの感触をつかんでみるのもいいと思います。

### Learn Git Branching

[Webサイト](https://learngitbranching.js.org/?locale=ja)

ブランチに関することを中心に学習できるサイトです。ブランチの様子が可視化されていて非常に勉強になるサイトです。

## 参考

[私家版 Git For Windowsのインストール手順 | OPCDiary](https://opcdiary.net/technical/programming/%E7%A7%81%E5%AE%B6%E7%89%88-git-for-windows%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E6%89%8B%E9%A0%86/)

[Gitのマージを図解する | To Be Decided](https://www.kaitoy.xyz/2015/12/28/git-merge/)