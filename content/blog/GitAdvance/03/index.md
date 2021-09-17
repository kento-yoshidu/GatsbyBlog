---
title: "#3 git logでコミット履歴を見る(後編)"
postdate: "2021-09-12"
updatedate: "2021-09-12"
seriesName: "Git中級者を目指す"
seriesSlug: GitAdvance
description: "git logのコマンドを紹介した前回、`git log --oneline --all --graph`の組み合わせが便利ですよーとお話ししました。"
tags: ["git"]
---

# 複数ブランチを考慮したgit log

前回はgit logの基本的なオプションを紹介しましたが、今回はもっと掘り下げてより高度なオプションを紹介したいと思います。

前回までは、いわば、ある一つのブランチの中で完結するようなオプションを紹介しました。しかし、複数のブランチが切られている時（というかそれが当たり前ですが）、git logと打ってどの範囲のログが出力されるか、正確にわかっていますか？ 「あのブランチだけのログが見たいのに、違うブランチのログも出力される。。。」といったことはありませんか？「雰囲気でHEAD~とか打ってるけど詳しい意味は分かってない。。。」といったことはありませんか？

たまーに出てくるチルダ(~)やキャレット(^)ですが、どのような意味を持っているかわかっていますか？

私もわかっていなかったので改めて確認したいと思います。

## その前に参考記事

この記事を読むためには、ブランチとHEADという概念をある程度わかっている必要があります。「ブランチって何？」「HEADって何？」を確認しておきたい方は以下の良記事を読むことをお勧めします。

[GitのHEADとは何者なのか](https://qiita.com/ymzkjpx/items/00ff664da60c37458aaa)


## 2つのブランチを対象にログを出力する

このセクションではダブルドット構文（`..`）とトリプルドット構文（`...`）の使用方法を説明します。

<aside>

ダブルドット構文とトリプルドット構文という言葉は公式リファレンスの日本語版ページから引用してます。

[こちら](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E3%83%AA%E3%83%93%E3%82%B8%E3%83%A7%E3%83%B3%E3%81%AE%E9%81%B8%E6%8A%9E)

</aside>

これらの構文は2つの引数（便宜上、引数と呼びます）をとります。

`..`は、どちらか一方からのみ辿れるコミットを出力します。結果は引数の渡し順によって変わります。

`...`は、どちらか一方から辿れるコミットを出力します。こちらの結果は引数の渡し順によって変わりません。

また、どちらも2つのブランチ間で重複しているコミットを除く動きをします。

前提として、リポジトリは以下の状態であるとします。

![](./images/image01.png)

master、develop、fixという3つのブランチがあります。8はdevelopにfixをマージしたマージコミットです。現在HEADはdevelopを指しています。

### コミット履歴を再現する

手を動かして動作検証したいという方もいらっしゃると思うので、コミット履歴を再現するスクリプトを以下に掲載します。適当なフォルダを作成し、`git init`した上で、シェルスクリプトを実行してください。

<details>
  <summary>スクリプトを見る</summary>

  ```shell
git init

git commit -m "(master)1" --allow-empty

git checkout -b develop

git commit -m "(develop)4" --allow-empty

git checkout -b fix master

git commit -m "(fix)6" --allow-empty

git checkout master

git commit -m "(master)2" --allow-empty
git commit -m "(master)3" --allow-empty

git checkout develop

git commit -m "(develop)5" --allow-empty

git checkout fix

git commit -m "(fix)7" --allow-empty

git checkout develop

git merge --no-ff -m "(merged)8" fix
  ```
</details>

## git log master

まずは`git log ブランチ名`と入力したときの出力を確認しておきます。最初はmasterブランチです。

masterブランチである`3`から矢印で辿れる、`3,2,1`が対象です。

![](./images/image02.png)

## git log develop (git log HEAD)

developブランチである`8`から辿れる、`8,7,6,5,4,1`が対象です。現在はHEADがdevelopブランチを指しているので、`git log HEAD`としても同じ出力結果です。

![](./images/image03.png)

## git log fix

fixブランチである`7`から辿れる、`7,6,1`が対象です。

![](./images/image04.png)

## git log develop..master

では、`..`の動作を確認します。

言語化するとしたら「developになくて、masterにだけあるもの」 でしょうか 。`3,2`が出力されます。

mainからは`3,2,1`が辿れますが、`1`はdevelopからも辿れるので対象外です。

![](./images/image05.png)

## git log master..develop

上記の逆です。読み方は「masterになくて、developにだけあるもの」です。

developから`8,7,6,5,4,1`が辿れますが、`1`はmainからも辿れるので対象外です。

![](./images/image06.png)

### git log master..fix

読み方は「masterになくて、fixにだけあるもの」です。

fixから`7,6,1`が辿れますが、`1`はmainからも辿れるので対象外です。

![](./images/image07.png)


### git log fix..develop

読み方は「fixになくて、developにあるもの」です。

developから`8,7,6,5,4,1`が辿れますが、`7,6,1`はfixからも辿れるので対象外です。

![](./images/image08.png)

### git log develop..fix

読み方は「developになくて、fixにだけあるもの」。

fixから7,6,1が辿れますが、これらは全てdevelopからも辿れるのでコミットは出力されません。

![](./images/image09.png)

### git log main...develop (git log develop...main)

ここからは`...`の使用方法です。

`...`は、**どちらか一方からだけ辿れるもの**を出力します。どちらからも辿れるものは対象外です。

上記のコマンドで言うと、読み方は「mainかdevelopのどちらか一方にあるもの」です。

masterとdevelopから全てのコミットを辿れますが、`1`はmainとdevelopの両方から辿れるので対象外です。

![](./images/image10.png)

なお、`...`を使用する場合、どのような順番でブランチを指定しても結果は同じです。

### git log develop...fix (git log fix...develop)

読み方は「developとfixのどちらか一方にあるもの」です。

7,6,1はdevelopからもfixからも辿れるので対象外です。

![](./images/image11.png)

### `^` と `--not`で除外する

これまでと似たようなことが`^`や`--not`を付けることで実現できます。こちらの方が直感的に分かりやすいかも知れません。

`^ブランチ名`や`--not ブランチ名`とすることで、そのブランチから辿れるコミットを除外することができます。いくつか例を置いておきますので、よかったら検証してみてください。



## チルダとキャレット

### git log develop~

チルダを付与することで親のコミットを取得できます。

この場合、git log develop~はgit log 5と同義と言えます。

![](./images/image12.png)

### git log develop~~ (git log develop~2)

チルダを複数つけることで、更に親を辿っていくことができます。また、~~は~2に置き換えることができます。

![](./images/image13.png)

### git log develop^

![](./images/image14.png)

## git logではないけれど

以上、git logに関係するオプションを紹介しましたが、git logではないもののコミットログに関係するコマンドをいくつか紹介したいと思います。

### git shortlogでユーザごとのコミット履歴を取得する

`git shortlog`で各コミットをコミットを行ったユーザごとに分類して表示します。 以下の例だと、alien👽さんが1コミット、potsunenさんが5コミット行ったことが分かります。コミット数でマウントをとりたいときに便利です。

```shell
$ git shortlog

alien (1):
      edit style.scss

potsunen (5):
      initial commit
      first commit
      second commit
      third commit
      create style.scss
```

## 感想

各種動作検証するのにめっちゃ疲れた。あと、日本語って難しい。。。

## 参考

- https://qiita.com/tearoom6/items/791f8a8b4ba39944e2f3
- https://yanor.net/wiki/?Git/git%20log/%E6%9D%A1%E4%BB%B6%E6%8C%87%E5%AE%9A%E3%81%97%E3%81%A6%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%82%92%E7%B5%9E%E3%82%8A%E8%BE%BC%E3%82%80
- https://git-scm.com/docs/git-log