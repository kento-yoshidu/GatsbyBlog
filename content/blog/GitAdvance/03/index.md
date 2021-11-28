updatedate: "2021-11-19"
description: "git logコマンドのオプションを紹介します。今回は、条件によって出力するコミットを絞るようなオプションを紹介します。"
`--grep`の結果を反転させる、つまり、`Rename`を含むコミットメッセージを**除く**には、`--invert-grep`を付与します。
`--grep`を複数使用した場合、**OR**でコミットメッセージが検索されます。以下の例だと、`Rename`もしくは`Create`が含まれているコミットが出力されます。


任意のファイルに変更があったコミットのみ出力する場合には、`-- [path]`と記述します。`--stat`や`-p`と組み合わせることも可能です。
今回のように、既にワーキングツリーに存在していないファイルのコミットも検索したい場合は、`--follow`オプションを付けてください。リネーム前の`index.html`も検索対象になります。
ファイルやパスを記述してコミット履歴を絞るには`--`を付与すると説明しましたが、実は`--`はつけなくても、多くの場合はちゃんと動作します。つけなくてはいけない場合について、いくつか検証してみます。
現在、`index.ejs`は削除されていますが、ここで`--`をつけずに`index.ejs`を指定するとエラーになってしまいます。
## `--merge`と`--no-merge`でマージ関係
## `--Author`と`--Committer`
  console.log(str);
let message = "Hello World";
func(message);
次に、`message`変数の宣言文を、`let`から`const`に変更します。
$ git commit -m "letからconstに変更"
## `-S`で特定の文字列の変更で絞る
`-S`オプションの後に任意の文字列を渡すことで、ファイルの中身を参照し、任意の文字列が**記述された／削除された**コミットに絞って出力させることができます。`--grep`オプションはコミットメッセージの検索でした。`-S`オプションはファイルの中身を見るという違いがあります。

例えば`git log -S message`とすると、「`message`って変数名っていつ記述されたんだっけ？」を調べることができます。
b7a09d0 (HEAD -> master) func関数を作成

fa964e3 func関数を作成
diff --git a/script.js b/script.js
new file mode 100644
index 0000000..ea8a27a
--- /dev/null
+++ b/script.js
@@ -0,0 +1,7 @@
+const func = (str) => {
+    console.log(str);
+};
+
+let message = "Hello World";
+
+func(message);
\ No newline at end of file
```

続けて、`message`を削除してみましょう。

```javascript
// この行を削除してください。
const message = "Hello World";
```

コミットします。

```console

$ git add .

$ git commit -m "変数を削除"
```

下記の通り、`message`が削除されたコミットも出力されています。

```shell
$ git log --oneline -S message

83130f1 (HEAD -> master) 変数を削除
fa964e3 func関数を作成

$ git log --oneline -S message -p

83130f1 (HEAD -> master) 変数を削除