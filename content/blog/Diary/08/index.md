---
title: "自分は今年、一体何をしていたのか"
postdate: "2022-12-31"
update: "2023-01-02"
seriesSlug: "Diary"
seriesName: "日記"
description: "虚無感に包まれた2022年を振り返ります。"
tags: ["2022年"]
keywords: ["2022年", "日記"]
published: true
---

# 2022年、何をしていたのか

最近というかしばらく前からですが、勉強すればするほど、物事を知れば知るほど自己肯定感が下がる現象に見舞われていて、精神的には底を這っている状態が続いています。

2022年も色々なことを学んだはずですが、振り返ってみて特に充実感はありません（むしろ自分に足りない知識がより明確になったことで自信がなくなった）。

そこで今年やったことをリストアップすることにしました（プライベート限定）。

## AWS SAA試験に合格

2022年5月、AWS SAA(SAA-002)を受験し合格しました。1000点満点中796点という何とも言えない点数でした。続けてSAPかDVAを受けるつもりでしたが、試験対策の勉強に飽きてしまい、放置しています。年明けにDVAを受けるつもりです。

## OSS-DB Silver試験に合格

2022年8月、OSS-DB Silverを受験し合格しました。100点満点中84点という何とも言えない点数でした。続けてOSS-DB Goldを受けるつもりでしたが、試験対策の勉強に飽きてしまい、放置しています。2023年中にGoldを受けるつもりです。

今年は「見える形で結果を残したい病」にかかっていたので資格を2つ取りましたが、満足感はありません。もうちょい難しい試験にしておくべきでした。

## Rustを一通り学んだ

2022年は新しい言語を覚えようと思い、RustとCommon-Lispを書いていました（比重はほとんどRust）。Rustは秋ごろから始め、書籍1冊とUdemyの講座1つで基本的な言語仕様について学ぶことができました。

確かに言語仕様は難しく（個人的にはジェネリクスとトレイトが鬼門、あと文字列の取扱いが分からずしんどい）難易度は高いと感じていますが、身構えていたほどではありませんでした。でもまだ何かを作るという所までは至っていません。

Rust以外には仕事でもプライベートでも専らTypeScriptを書いており、静的型付け言語一辺倒でした。私は別に静的型付け狂信者ではないので、来年は動的型付け言語に比重を移してみたいと思っています。

## AtCoderの過去問を解いていた

AtCoderという競技プログラミングサイトがあり（知っていますよね？）、コンテストで出題された問題を後から解くことができます。

[AtCoder：競技プログラミングコンテストを開催する国内最大のサイト](https://atcoder.jp/?lang=ja)

A～Cランクの過去問を中心に解きました。言語はJavaScript、そしてRustです。それぞれローカル環境でテストコードを書くところまで行いました。

非常に勉強にはなっているんですが、過去問を解くのみでコンテストには出ていません（リア充パリピ陽キャにとって土曜の夜が潰れるのは辛いし、出来なかったらそれこそ自信をなくしそうという逃げ）。来年はその気になったらコンテストに出るつもりです。

## Next.js

2021年はGatsbyでいくつかのサイトを作成しましたが、今年はNext.jsに比重を移し、いくつか簡単なサイトを作りました。

### ポートフォリオサイト

一つ目は、作成し直した[ポートフォリオサイト](https://www.toriwatari.work)です。Gatsbyで作成していたサイトをNext.jsを用いて再作成しました。

技術的に特筆すべき点はありませんが、申し訳程度の工夫として、Apollo Clientを使いGitHub APIから私のコントリビューション情報を取得、コントリビューショングラフを独自に再現しました。

![](./images/image01.png)

デプロイはAWS Amplifyです。

### スニペット置き場

[スニペット置き場](https://snipestrageplace.gatsbyjs.io/)というサイトで、ブログで記事にするほどでもないスニペット（例えば、配列から重複を取り除く方法など）をまとめています。AtCoderを解いている時に、「あれどうやるんだっけー」をさっと見返せるサイトがあれば便利だなと思い作成しました。言語は主にJavaScriptとちょっぴりRustです。

技術的に特筆すべき点はありませんが、記事はMarkdownで管理し、GatsbyのSSGで静的ファイルをアウトプットしています。デプロイはGatsby Cloudです。

側を作っただけで中身はこれからです😂。

### BooksToGive

[BooksToGive](https://bookstogive-kento-yoshidu.vercel.app/)というサイトも作成しました。私の知り合い向けのものですが、読み終わって寄付できる書籍を羅列するサイトです。

技術的に特筆すべき点はありませんが、書籍のISBNとレーティング（⭐）の値をSupabaseに保存し、書籍のタイトルや表紙の画像はISBNを元にGoogle Books APIを使用し取得しています。ORMにPrismaを使用し、APIからデータを取得するのにuseSWRを使用しています。

また、Next Authを使用しログイン機能を装備、管理者（私）だけが書籍登録ページにアクセスできるようにしています。デプロイはVercelです。

<aside>

Vercelは便利すぎて抜け出せません。現在はFreeプランをしています。課金したいんですが、Proプランは機能的に持て余すし、何より$20は高い、、、。$10のプランとかあれば課金するんですが。

</aside>

<details style="margin-top: 60px" class="history">
<summary>更新履歴</summary>

<ul class="history-list">
  <li>2023年1月2日 : 誤字脱字を修正。</li>
</details>
