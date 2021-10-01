---
title: "#2 git logでコミット履歴を見る(前編)"
postdate: "2021-09-04"
updatedate: "2021-10-01"
seriesName: "Git中級者を目指す"
seriesSlug: "GitAdvance"
description: "git log のオプションは多岐にわたります。入門書に載っている基本的で有名なものからちょっとマニアックなものまで、できるだけ例を踏まえて紹介します。"
tags: ["git"]
---

# git logの基本的なオプション

`git log`コマンドを使用することでコミットの履歴を辿ることができます。オプションは数多くありますが、このページでは簡単なものを中心に紹介します。できるだけ例を踏まえて紹介しますので、よければ実際にコマンドを打ち込みながら読んでみてください。

対象はgitの入門書を読み終えた方を想定して書きました。~~自分が全然わかっていなかったこともあり~~ だからと言っては何ですが、記述が冗長になっていたりやたら丁寧だったりするかもしれませんが、ご了承ください。

## `--oneline`で簡易出力する

単純に`git log`を実行した場合、コミットのハッシュID40桁、ブランチが指しているコミット、Authorの名前とメールアドレス、コミット日時、コメント全行が表示されます(「そういえばAuthorって何？」っていう人は本ページ下部の参考を見てください。)。

```shell:title=console
$ git log

commit eee108669ce7c42613e091533de0f6d218e3098c (HEAD -> main)
Author: kento <kento@toriwatari.bird>
Date:   Tue Mar 16 19:57:22 2021 +0900

    main-commit

    mainブランチでのコミット

commit cce92e83d647515732629d0e5ea46cfb908383ca
Author: kento <kento@toriwatari.bird>
Date:   Tue Mar 16 19:56:58 2021 +0900

    Initial Commit
```

`--oneline`を付けた場合、短縮されたハッシュID、ブランチが指しているコミット、そしてコメントの先頭行だけが表示されます。

```shell:title=console
$ git log --oneline

eee1086 (HEAD -> main) main-commit
cce92e8 Initial Commit
```

`--oneline`は`--pretty=oneline --abbrev-commit`を短縮したオプションです。

※abbrev → abbreviated → 省略された の意。

## `--all`と`--graph`で他ブランチも含め、グラフィカルに出力する

developブランチを切っていてmainブランチにいるとします。おおよそこんなイメージです。

![](./images/image01.png)

ここで単純に`git log`と打つと、mainブランチのログしか表示されません。

```shell:title=console
$ git log --oneline

c5d4783 (HEAD -> main) main-commit
993a413 Initial Commit

※本当はdevelopブランチでのコミットがある。mainブランチにいるから見えない。
```

他のブランチのコミットも含めログを確認するには、`--all`オプションを渡します。

```shell:title=console
$ git log --all --oneline

9a9ba29 (develop) develop-commit # developブランチのコミットも見れる！
eee1086 (HEAD -> main) main-commit
cce92e8 Initial Commit
```

さらに`--graph`オプションを使用すると、アスタリスクや線を使い、グラフィカルにログを表示してくれます。

```shell:title=console
$ git log --all --graph --oneline

* 9a9ba29 (develop) develop-commit
| * eee1086 (HEAD -> main) main-commit
|/
* cce92e8 Initial Commit
```

通常、複数のブランチを切りマージを繰り返していきますので、`--all`と`--graph`の組み合わせは強力です。

私は`git log --oneline --all --graph`のエイリアスを設定しています。

一応、コマンドエイリアスの設定方法を紹介しておきます。`git config --global --edit`を実行すると、テキストエディタが立ち上がりますので、以下のように入力します。

```shell:title=.gitconfig
[alias]
  lol = log --oneline --all --graph
```

`lol`がエイリアスの名前です。一度設定しておけば`git lol`と実行するだけでグラフィカルなログが閲覧できます。

## `-p`で変更内容を確認する

`-p`オプションを渡すことで、コミットごとの**変更内容**を出力することができます。`git log`と`git diff`を組み合わせたものだと考えていいと思います。

以下のコマンドを実行してください。ファイルの作成と内容の変更を行っています。

```shell:title=console
# htmlファイルを作成し、コミットします。
$ touch index.html
$ git add .
$ git commit -m "Create index.html"

# 作成したファイルに3行追記し、コミットします。
$ echo -e "aaa\nbbb\nccc" >> index.html
$ git add .
$ git commit -m "Edit index.html"

# cssファイルを作成し、コミットします。
$ touch style.css
$ git add .
$ git commit -m "Create style.css"
```

`git log -p`とすることで、そのコミットでの変更箇所と内容を確認することができます。`git log -p --oneline`と入力してみます。

```shell:title=console
$ git log -p --oneline

4aefdf3 (HEAD -> main) Create style.css
diff --git a/style.css b/style.css
new file mode 100644
index 0000000..e69de29

be1bf08 Edit index.html
diff --git a/index.html b/index.html
index e69de29..1802a74 100644
--- a/index.html
+++ b/index.html
@@ -0,0 +1,3 @@
+aaa
+bbb
+ccc

fd4955b Create index.html
diff --git a/index.html b/index.html
new file mode 100644
index 0000000..e69de29
```

最初`index.html`を作成したコミット（上記で言うfd4955b）を見てみると、`new file`という記述があり、新しいファイルがコミットされたことを表しています。

```shell:title=console
fd4955b Create index.html
diff --git a/index.html b/index.html
new file mode 100644 # これ
index 0000000..e69de29
```

次のコミットでは空だった`index.html`に3行追記しました。これは追記した行に`＋`を記すことによって表されます。

```shell:title=console
be1bf08 Edit index.html
diff --git a/index.html b/index.html
index e69de29..1802a74 100644
--- a/index.html
+++ b/index.html
@@ -0,0 +1,3 @@
+aaa  # これ！
+bbb  # 同じく
+ccc  # 同じく
```

行を削除した場合や編集した場合は`-`で表現されます。

```shell:title=console
# ファイルを上書きします。
$ echo -e "aaaaaa\nbbb" > index.html

$ git add .

$ git commit -m "2nd Edit index.html"

$ git log -p --oneline -1

360e27d (HEAD -> main) 2nd Edit index.html
diff --git a/index.html b/index.html
index 1802a74..183df72 100644
--- a/index.html
+++ b/index.html
@@ -1,3 +1,2 @@
-aaa
+aaaaaa
 bbb
-ccc
```

1行目の`aaa`は`aaaaaa`に変更されました。これは「`aaa`を削除し`aaaaaa`を追記した」と捉えられます。ですので、`aaa`には`-`、`aaaaaa`には`＋`が付与されます。削除された`ccc`も同じく`-`が付与されます。

次、ファイル名を変更してみます。`rename`と表示されます。

```shell:title=console
# ファイルをindex.ejsに変更
$ git mv index.html index.ejs

$ git commit -m "Rename index.html"

$ git log -p --oneline -1

cb039c3 (HEAD -> main) Rename index.html to index.ejs
diff --git a/index.html b/index.ejs
similarity index 100%
rename from index.html # ～から
rename to index.ejs    # ～へ
```

続いて、`index.ejs`を削除します。`deleted`でファイルが削除されたこと、そして削除されたファイルの内容も教えてくれます。

```shell:title=console
$ git rm index.ejs

$ git commit -m "Delete index.ejs"

$ git log -p --oneline -1

d7e6535 (HEAD -> main) Delete index.ejs
diff --git a/index.ejs b/index.ejs
deleted file mode 100644 # deleted
index 183df72..0000000
--- a/index.ejs
+++ /dev/null
@@ -1,2 +0,0 @@
-aaaaaa
-bbb
```

## `--word-diff`で-pの出力を読みやすくする

`-p`オプションは便利ですが、出力結果が読みにくい気がしませんか？
`2nd commit`では「aaaをaaaaaaに変更」、「cccを削除」という内容でした。`-p`を渡すだけだと、

```shell:title=console
@@ -1,3 +1,2 @@
-aaa
+aaaaaa
 bbb
-ccc
```

というアウトプットですが、`-p`に加えて`--word-diff`を渡すと以下のように変化します。

```shell:title=console
#--grep="2nd"でログの絞り込み
$ git log -p --word-diff --oneline --grep="2nd"

360e27d 2nd Edit index.html
diff --git a/index.html b/index.html
index 1802a74..183df72 100644
--- a/index.html
+++ b/index.html
@@ -1,3 +1,2 @@
[-aaa-]{+aaaaaa+}
bbb
[-ccc-]
```

`aaa`と`aaaaaa`が同じ行で、`[-...-]`と`{+...+}`で表現されています。これにより変更内容が分かりやすくなった…気がしませんか:thinking:?私はあまり使いませんが。

## `--stat`で変更内容を簡易的に確認する

`-p`よりももっとざっくり変更内容を確認したい、という時には`--stat`オプションを渡します。

`-p`は具体的にどう変更されたかを教えてくれますが、`--stat`はどのファイルに変更があったか、そして**変更の要約**を出力します。

```shell:title=console
$ git log --stat --oneline

d7e6535 (HEAD -> main) Delete index.ejs   # ファイル削除
 index.ejs | 2 --                         # 削除されたファイルに2行記載があった
 1 file changed, 2 deletions(-)           # 変更の要約

cb039c3 Rename index.html to index.ejs              # ファイル名変更
 index.html => index.ejs | 0                        # 新旧ファイル名
 1 file changed, 0 insertions(+), 0 deletions(-)

360e27d 2nd Edit index.html
 index.html | 3 +--                                 # 3箇所変更
 1 file changed, 1 insertion(+), 2 deletions(-)

4aefdf3 Create style.css                            # ファイル作成
 style.css | 0                                      # 作成したファイル名
 1 file changed, 0 insertions(+), 0 deletions(-)

be1bf08 Edit index.html
 index.html | 3 +++
 1 file changed, 3 insertions(+)

fd4955b Create index.html
 index.html | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
```

## `--name-status`で`--stat`よりも更に簡易表示する

変更があったファイルと、その変更内容を一文字で表してくれます。

A=Add、M=Modify、R=Rename、D=Deleteです。

```shell:title=console
$ git log --name-status --oneline

d7e6535 (HEAD -> main) Delete index.ejs
D       index.ejs

cb039c3 Rename index.html to index.ejs
R100    index.html      index.ejs

360e27d 2nd Edit index.html
M       index.html

4aefdf3 Create style.css
A       style.css

be1bf08 Edit index.html
M       index.html

fd4955b Create index.html
A       index.html
```

Renameの時に`R100`と表示されていますが、この数字は「変更の前と後で、ファイルの中身がどれくらい一緒か」をパーセンテージで教えてくれています。
今回の例ではファイル名を変更しただけで内容は一切触っていないので、100=「100%一緒だよ」という意味です。

## `--name-only`でファイル名のみ表示する

名前からも分かる通り、変更のあったファイル名のみが表示されます。

```shell:title=console
$ git log --name-only --oneline

d7e6535 (HEAD -> main) Delete index.ejs
index.ejs

cb039c3 Rename index.html to index.ejs
index.ejs

360e27d 2nd Edit index.html
index.html

4aefdf3 Create style.css
style.css

be1bf08 Edit index.html
index.html

fd4955b Create index.html
index.html
```

## `-- <path>`で特定のファイルの履歴を確認する

任意のファイルに変更があったコミットのみ出力する場合には、`-- <ファイル名 もしくは パス>`と記述します。`--stat`や`-p`と組み合わせることも可能です。

```shell:title=console
$ git log --oneline -- index.ejs
# index.ejsのみ
d7e6535 (HEAD -> main) Delete index.ejs

cb039c3 Rename index.html to index.ejs

# style.cssのみ
$ git log --oneline -- style.css

4aefdf3 Create style.css
```

なお、パスの前に`--`を付与していますが、これは`git log`に「渡しているのはファイル名だよ」と伝える意味を持っています。

### あれ？index.htmlが引っかからないけど。。。

今回は途中で`index.html`から`index.ejs`にファイル名を変更しています。`-- index.ejs`で検索しても、`index.html`が対象のコミットは出力されません。

![キャプチャ](./images/image02.png)

そういう時は`--follow`オプションを付けてください。変更前のindex.htmlも検索してくれます。

なお、引数の順番は注意が必要です。`--follow -- ファイル名`としなければ旧ファイルが検索されませんでした（git version 2.22.0）。

```shell:title=console
$ git log --oneline --follow -- index.ejs

d7e6535 (HEAD -> main) Delete index.ejs

cb039c3 Rename index.html to index.ejs

360e27d 2nd Edit index.html

be1bf08 Edit index.html

fd4955b Create index.html
```

![キャプチャ](./images/image03.png)

### パスの前に`--`を付けるのはどんな時？

ファイルやパス記述してコミット履歴を絞るには`--`を付与すると説明しました。「じゃあ付けなかったらどうなるの？」と思うのが人情です。

いくつか検証してみます。

現在、`index.ejs`は削除されていますが、ここで`--`をつけずにindex.ejsを指定するとエラーになってしまいます。

```shell
# -- なしで実行
$ git log --oneline index.ejs

fatal: ambiguous argument 'index.ejs': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

`ambiguous argument`、つまり「曖昧な引数」というメッセージが出力され、ご丁寧に「ファイル名の前に`--`をつけてね」というアドバイスまでくれています。

ワーキングツリーに存在している`style.css`であれば`--`なしでも検索できます。

```shell
$ git log --oneline style.css

4aefdf3 Create style.css
```

次に、**ファイル名と同じブランチが切られている場合**について検証します。

今、ワーキングツリーには`style.css`がありますから、`style.css`という名前のブランチを切ります。特にコミットはしなくてOKです。

```shell:title=console
$  git checkout -b style.css
```

ここで`--`を渡さないで

```shell:title=console

$ git checkout main

$ git log --stat --oneline develop

fatal: ambiguous argument 'develop': both revision and filename
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

またしても`ambiguous argument`、「曖昧な引数」のため致命的なエラーが発生しています。「`style.css`ファイルもあるし`style.css`ブランチもあるけど、どっちのこと言ってるの？」と言われています。

`-- style.css`とすることでエラーなく出力されることも確認しておきます。

```shell:title=console
$ git log --oneline -- style.css

4aefdf3 Create style.css
```

まとめると、

- 基本的には`--`なしでもパスで履歴を絞れる
- ただし、削除してワーキングツリーにないファイルで絞る場合には`--`を付与する
- 万が一ファイル名とブランチ名が被っている場合にも`--`を付与する

と考えていいと思います。

なお、私は常に`--`を付与している派です。

## `--diff-filtre`で変更内容でコミットを絞る

`--diff-filter`オプションを付けることで、「ファイルが削除されたコミットだけ」「リネームされたコミットだけ」という風にコミットを出力することができます。

`--diff-filter=D`という風に指定してみます。`D`は`Deleted`のことです。つまり、ファイルが削除されたコミットのみが出力されます。

```shell
$ git log --oneline --diff-filter=D

d7e6535 (HEAD -> main) Delete index.ejs
```

`D`以外にも、以下のような値が渡せます。

|値|コミットの内容|
|---|---|
|A(Added)|追加|
|M(Modify)|変更|
|R(Renamed)|リネーム|
|C(Copied)|ファイルコピー|
|T(Type?)|タイプが変更（シンボリックリンクへの変更など）|

```shell
# ファイルを新しく追加したコミットのみ
$ git log --oneline --diff-filter=A
4aefdf3 Create style.css
fd4955b Create index.html

# ファイルの内容を変更したコミットのみ
$ git log --oneline --diff-filter=M
360e27d 2nd Edit index.html
be1bf08 Edit index.html

# ファイルをリネームしたコミットのみ
$ git log --oneline --diff-filter=R
ae45f13 Rename index.html

# ファイルをコピーしたコミットのみ（今回の例では該当なし）
$ git log --oneline --diff-filter=C
```

そして、小文字にすることで意味を反転させることができます。つまり`--diff-filter=d`すると、削除があったコミット**以外**が出力されます。

```shell
$ git log --oneline --diff-filter=d

ae45f13 Rename index.html

1edf947 2nd Edit index.html

5a3abbc Create style.css

dc38817 Edit index.html

a81b18d Create index.html
```

## まとめ

長くなりましたので今回は以上です。中編に続きます。

## 参考 AuthorとCommitterの違い

私は

- Author ： 当該ファイルを最初にコミットした人、オリジナルのコードを書いた人
- Committer ： コミットした人

とイメージしています。

`git commit --amend`でコミットを修正した場合、以下のようになります。

- Author ： 変更されない
- Committer ： amendしたユーザーに変更される

`git log`は多くの場面でAuthorしか出力しませんが、`--pretty=fuller`オプションを渡すことでCommitterも確認することができます。

```shell:title=console
$ git log --pretty=fuller

commit 743c4d51cc9631705894e771e1633d6481f8b61b (HEAD -> main)
Author:     potsunen <potsunen@potsunen.co.jp>   # 作成者
AuthorDate: Fri Feb 28 11:13:02 2020 +0900
Commit:     宇宙人 <utyuujin@Andromeda.space>     # amendした人
CommitDate: Fri Feb 28 11:15:26 2020 +0900

    地球侵略記念amend
```

# 参考

- [Git - コミット履歴の閲覧](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E5%9F%BA%E6%9C%AC-%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E5%B1%A5%E6%AD%B4%E3%81%AE%E9%96%B2%E8%A6%A7)

- [git-log Documentation](https://git-scm.com/docs/git-log)

- [gitでrename&modifyしたファイルのログを追跡できるようにしたい場合](https://qiita.com/yukimura1227/items/fbb076db61a2e43a32e3)

- [git diff --name-status で出る R100 って何？](https://stakiran.hatenablog.com/entry/2019/01/14/072206)

- [Advanced Git log](https://www.atlassian.com/ja/git/tutorials/git-log)

- [Git で変更内容にある文字列が含まれているコミットを検索する (git log -G/-S) | まくまくGitノート](https://maku77.github.io/git/log/pickaxe.html)

- [Gitで過去に削除したファイルを検索、復元させる方法](https://rcmdnk.com/blog/2017/10/01/computer-git/)

- [SO](https://stackoverflow.com/questions/6058879/what-do-the-git-pairing-broken-and-unknown-statuses-mean-and-when-do-they-o)

- [git diffの全オプション一覧 - Qiita](https://qiita.com/rana_kualu/items/09d2dd379019b8ef0335)

