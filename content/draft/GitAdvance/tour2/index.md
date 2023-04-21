---
title: "Git内部構造ツアー②"
postdate: "2099-01-01"
update: "2099-01-01"
seriesName: "Git中級者を目指す"
seriesSlug: "GitAdvance"
description: "Git内部構造ツアーの第二弾です。git commitコマンドを実行した時、Git内部で何が起こるのかを検証します。"
tags: ["Git"]
keywords: ["Git"]
published: false
---

# コミット時の動作を追おう

前回は`git add`した時にblobオブジェクトが出来るということを説明しました。今回は`git commit`時の動作を追いますが、実は前回とそんなに変わらず、`.git/objects/`が話の主役です。

## リポジトリーを作成する

新しくリポジトリーを作成しましょう。ルートディレクトリーに空の`text.txt`を作成します。そして`echo -n "Hello World!" > text.txt`を実行し、`git add text.txt`でステージングに上げます。この時、blobオブジェクト`c57eff~`が作成されます。

```bash
$ find .git/objects/ -type f
.git/objects/c5/7eff55ebc0c54973903af5f72bac72762cf4f4

$ git cat-file -p c57eff
Hello World!
```

また、`index`にも以下の内容が登録されていることが確認できます。

```bash
$ git ls-files --stage
100644 c57eff55ebc0c54973903af5f72bac72762cf4f4 0       text.txt
```

では、いよいよ`git commit`をしてみましょう。

```bash
$ git commit -m "first commit"

...

1 file changed, 1 insertion(+)
 create mode 100644 text.txt
```

まずは`.git/objects`の中身を見てみると、、、

```bash
$ find .git/objects/ -type f
.git/objects/3f/8e66262c7fdcf2537e1adbe0d6d8d9015dcc4c # new
.git/objects/c5/7eff55ebc0c54973903af5f72bac72762cf4f4
.git/objects/fb/8ea63666bdd369989ebbc3c4d87fbe2d695b2d # new
```

新しいGitオブジェクトが2つ出来ていることがわかります。

さて、前回の記事でGitオブジェクトにはいくつかの種類があると説明しました。`git cat-file`コマンドにオプション`-t`を渡すことで、Gitオブジェクトの種類を得ることができます。

```bash
$ git cat-file -t 3f8e66
tree

$ git cat-file -t c57eff
blob

$ git cat-file -t fb8ea6
commit

```

`c57eff~`はお馴染みのblobオブジェクトですね。新しく出来た`3f8e66~`は**treeオブジェクト**、`747ebf~`は**commitオブジェクト**であると示されています。この2つのオブジェクトが何なのかをこれから説明していきます。

なお、treeオブジェクトである`3f8e66`は皆さんの環境でも同じだと思いますが、commitオブジェクトは違うハッシュIDになっているはずです（もっと言うと、再度実行しても違うハッシュIDになる）。その理由は後々判明します。

## treeオブジェクト

treeオブジェクトは、ある種**フォルダー**を表す役割を持つものです。blobオブジェクトはファイルの内容でしたが、treeオブジェクトはフォルダーです。対比すると覚えやすいですね。

さっそく`git cat-file -p`でtreeオブジェクトを解析してみましょう。

```bash
$ git cat-file -p 3f8e66
100644 blob c57eff55ebc0c54973903af5f72bac72762cf4f4    text.txt
```

すると、出力されたのはblobオブジェクトです。あるフォルダーの中に、どのようなファイルが存在していたかを保存しているのです。

![](./images/image01.png)

このtreeオブジェクトの中身も簡単に見てみたいと思います。treeオブジェクトは`index`とは違い、Hex Editorで読み込むことは出来ませんので、私はWSLを使用して`hexdump`コマンドでtreeオブジェクトをダンプしました。

```bash
$ git cat-file tree 3f8e66 | hexdump -C

00000000  31 30 30 36 34 34 20 74  65 78 74 2e 74 78 74 00  |100644 text.txt.|
00000010  c5 7e ff 55 eb c0 c5 49  73 90 3a f5 f7 2b ac 72  |.~.U...Is.:..+.r|
00000020  76 2c f4 f4                                       |v,..|
00000024
```

1行目を見ると`100644 text.txt`とあり、ファイルの種類やパーミッション、ファイル名を保存していることが見て取れます。さらに次の行では`c5e7ff~`があり、ファイルに対応するblobオブジェクトIDも記述されていることが分かります。

ここまででtreeオブジェクトがファイル名、ファイルの中身（blobオブジェクト）を内包していることがわかりました。

## commitオブジェクト

では続いて、commitオブジェクトを確認します。先ほどと同じく`git cat-file -p [commitのハッシュID]`とします。

```bash
$ git cat-file -p [commitのハッシュID]
tree 3f8e66262c7fdcf2537e1adbe0d6d8d9015dcc4c
author xxx yyy <xxxyyy@exmaple.com> 1682044540 +0900
committer xxx yyy <xxxyyy@example.com> 1682044540 +0900

first commit
```

出力結果にtreeという項目があり、treeオブジェクトである`3f8e66`を指していますね。

つまり、commitオブジェクトはtreeオブジェクトを指していて、treeオブジェクトはblobオブジェクトを指しているということです。commit、tree、blobが連結していて、commitオブジェクトを見れば芋づる式にフォルダー構成が分かり、ファイルの中身も再現できる、と言えそうです。

---

さて、ざっとtreeオブジェクトとcommitオブジェクトについて確認しました、、、が、こんな簡単な説明ではよくわからなかったと思います。ここからさらにコミットを重ね、挙動を確認していきます。

## サブフォルダーを作成してみる


どこかで一度は耳にしたセリフかもしれませんが、「Gitのコミットは差分ではなくスナップショットである」というのが理解できると思います。

もう一つファイルを作成してコミットしてみましょう。`text2.txt`を作成し、`echo -n "I love Git." > text2.txt`で内容を記述し、commitします。

```bash
$ touch text2.txt

$ echo -n "I love Git." > text2.txt

$ git add text2.txt

$ git commit -m "second commit"
```

すると新しいtreeオブジェクト`b3ce0d~`ができています。これを`git cat-file -p`すると、

```bash
$ git cat-file -p b3ce
100644 blob c57eff55ebc0c54973903af5f72bac72762cf4f4    text.txt
100644 blob 932b85ca9129d15b57b416c508b7c584f393e528    text2.txt
```

という結果が得られます。

では、フォルダーを作成してその中にファイルを保存、コミットすると、treeオブジェクトはどのようになるのでしょうか。

`mkdir log`でフォルダーを作成し、`touch access.log`を作成、

```
$ git cat-file -p bd889
040000 tree dc5efa7035fa51f1f30fa03b7b14791c4066b795    log
100644 blob c57eff55ebc0c54973903af5f72bac72762cf4f4    text.txt
100644 blob 932b85ca9129d15b57b416c508b7c584f393e528    text2.txt
```

そう、treeオブジェクトの中にtreeオブジェクトが含まれているのです。続けて、`log/`を表す`dc5efa~`を`git cat-file`にかけてみましょう。`access.log`を表すblobオブジェクトが取得できそうですね。

```bash
$ git cat-file -p dc5efa
100644 blob 30d74d258442c7c65512eafab474568dd706c430    access.log
```

目論見通り、blobオブジェクトが出力されました。

これでtreeオブジェクトがフォルダーの役割を持っている、というのはおわかりいただけたと思います。

さぁこれで各オブジェクトがどんな役割を持っているかが段々分かってきました。

|オブジェクト|役割|
|---|---|
|blob|ファイルの中身を表す|
|tree|フォルダーの中身を表す（blobオブジェクトを内包する）|
|commit|コミットの情報を表す（treeオブジェクトを内包する）|

## 参考

[Gitのオブジェクトの中身](https://zenn.dev/kaityo256/articles/objects_of_git)

https://koseki.hatenablog.com/entry/2014/04/22/inside-git-1

https://arbitrary-but-fixed.net/git/julia/2021/03/18/git-tree-sha1-to-commit-sha1.html
