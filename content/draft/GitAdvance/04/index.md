---
title: "#5 git logの出力をカスタマイズする"
postdate: "2022-02-18"
update: "2020-02-18"
seriesName: "Git中級者を目指す"
seriesSlug: "GitAdvance"
description: "git logの出力結果をカスタマイズするオプションを紹介します。"
tags: ["git"]
keywords: ["git", "git log", "format", "pretty"]
---

# うわっ、git log --onelineの結果、簡単すぎ...？

`git log`のオプションを紹介した時、`git log --oneline --all --graph`の組み合わせが便利ですよーとお話ししました。

```shell
$ git log --oneline --all --graph
*   3edb107 (HEAD -> master) Merge branch 'develop'
|\
| * 10a59c9 (develop) Develop commit
|/
* 6a374bb Initial commit
```

しかしコミットの日時情報すらなく、ちょっと簡素的すぎるかもと思います。コミット日時くらいは欲しいですよね。そこで本記事では、任意の形式にカスタマイズしてもっと自由にログの表示形式を変更する方法をお伝えします。

## --pretty=formatでカスタマイズ

まずは以下のコマンドを入力してみてください。`--all`と`--graph`を付けているので、全てのブランチのコミット情報がグラフ形式で出力されるのは変わりません。`--format="%h"`としているところがポイントです。

```shell
$ git log --all --graph --format="%h"
*   3edb107
|\
| * 10a59c9
|/
* 6a374bb
```

何となーくお分かりかもしれませんが、`%h`はハッシュIDの短縮版を表します。続けて半角スペースを空けて`%s`も付けてみましょう。

```shell
$ git log --all --graph --format="%h %s"
*   3edb107 Merge branch 'develop'
|\
| * 10a59c9 Develop commit
|/
* 6a374bb Initial commit
```

この`%s`はコミットメッセージを表します。そう！`--pretty="format:"%〇%〇"`の形式で、出力内容を自由にフォーマットすることができるのです。

|記号 |内容 |
|---|---|
|%H|ハッシュID|
|%h|ハッシュID(短縮版)|
|%P|親のハッシュID|
|%p|親のハッシュID(短縮版)|
|%T|ツリーのハッシュID|
|%t|ツリーのハッシュID(短縮版)|
|%s|コミットメッセージ|
|%an|Authorの名前|
|%ad|Author Date|
|%cn|committerの名前|
|%cd|Committer Date|

また、"[]"や"-"の記号も自由に記述できます。 `%h`を"[]"で囲うとこうなります。

```shell
$ git log --all --graph --format="[%h] %s"
*   [3edb107] Merge branch 'develop'
|\
| * [10a59c9] Develop commit
|/
* [6a374bb] Initial commit
```

ちょっと特殊な文字で、タブも入力できます。

|記号 |内容 |
|:----|----:|
|%x09|水平タブ|

**x09**は「水平タブ」のASCIIコードです。文字コードを直接入力することができるようですね（"**0x09**"ではなく、"**x09**"と入力しないと駄目なようです。）。

```shell
$ git log --all --graph --format="%x09 [%h] %s"
*        [3edb107] Merge branch 'develop'
|\
| *      [10a59c9] Develop commit
|/
*        [6a374bb] Initial commit
```

なに？色が消えて白黒になった？大丈夫です。色付けする方法も後でお伝えします。

## 日付も表示させる

とりあえずハッシュIDの短縮版とコミットメッセージは表示させましたが、肝心の日付がありません。
あらかじめ用意されたフォーマットで日付を出力するなら、`--date=〇〇`を記述します。まずはコミット日時を表す`%cd`を追記します。

```shell
$ git log --all --graph --format="%h [%cd] %s"
*   3edb107 [Fri Nov 13 10:56:57 2020 +0900] Merge branch 'develop'
|\
| * 10a59c9 [Fri Nov 13 10:56:38 2020 +0900] Develop commit
|/
* 6a374bb [Fri Nov 13 10:56:12 2020 +0900] Initial commit
```

長い、、、。というわけで、`--date=short`を追記します。これは出力された日付の形式を加工するオプションです。場所はどこでも構いません。私は末尾に記述しました。

```shell
$ git log --all --graph --pretty=format:"%h [%cd] %s" --date=short
*   9cb427f [2020-01-22] Merge branch 'develop'
```

指定できるオプションは以下の通りです。

|オプション|出力|
|:---------|----|
|local|ローカルタイムゾーン|
|iso|ISO 8601フォーマット|
|rfc|rfc 2822フォーマット|
|short|YYYY-MM-DD|

## `--date=format`でカスタマイズする

|オプション|出力|出力例|
|:---------|----|----|
|%Y|年|2020|
|%m|月|11|
|%d|日|11|
|%H|時|17|
|%M|分|42|
|%S|秒|01|

```
$ git log --graph --pretty=format:"%C(red bold) %cd %Creset %x09 %C(magenta dim) %an %Creset %x09 %s" --date=format:"%Y-%m-%d %H:%M"
```

# 参考

[git logのフォーマットを指定する](https://qiita.com/harukasan/items/9149542584385e8dea75)

[git log を見やすくする](https://qiita.com/takasianpride/items/842a785af610025a2030)

https://qiita.com/qurage/items/daa67763e5a0090af06a