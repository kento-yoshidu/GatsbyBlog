---
title: "bash"
postdate: "2099-01-01"
update: "2099-01-01"
seriesName: "Git中級者を目指す"
seriesSlug: "GitAdvance"
description: "Git内部構造ツアーの第一弾です。git add、git commitコマンドを実行した時、Git内部で何が起こるのかを検証します。"
tags: ["React", "React Hooks"]
draft: true
---

# 基本

## 変数の取扱い

変数宣言と代入。

```bash
NAME=kento

echo $NAME
#=> kento
```

変数展開するときはダブルクオートで囲う。

```bash
NAME=kento

echo "My name is $NAME"
#=> My name is kento
```

`$()`でコマンドを出力できる。

```bash
echo "File list = $(ls)"
#=> File list = bash.bash
```

# 位置パラメーター

`$#`はパラメーターの数、`$0`は実行されたスクリプト名。`$1`～でパラメーターを取り出せる。

```bash
# bash bash.bash Hello World

echo $#
#=> 2

echo $0
#=> bash.bash

echo $1
#=> Hello

echo $2
#=> World
```

# 入力

`read`で受け取れる。

```bash
read WORD

echo "$WORD"
```

# 条件分岐

bashから起動するコマンドは、成功もしくは失敗を表す値を返し、`$?`で参照できる。

成功の場合は`0`、それ以外は失敗と見做される。

```bash
echo $?
#=> 0
```

```bash
if cd /c/
then
  echo "True"
else
  echo "False"
fi
#=> True

if cd /ccc/
then
  echo "True"
else
  echo "False"
fi
#=> False
```

条件式はパイプも使える。

```bash
if ls | grep md
then
  echo "There is a Markdown file."
else
  echo "Nothing"
fi
```

組み込みコマンドや複合コマンドも使える。

```bash
FILENAME=index.md

if [[ -e $FILENAME ]]
then
  echo "There is a $FILENAME"
else
  echo "Nothing"
fi
```

|演算子|説明|
|---|---|
|-e|ファイルかどうかを評価する|
|-d|ディレクトリかどうかを評価する|
|-eq|数値が等しいかを評価する|
|-gt, -lt|数値の大小を評価する|

もしくは、評価式を`()`で囲えば`<`や`>`を使える。

```bash
VAR=10

if ((VAR < 5))
then
  echo "less than 5"
else
  echo "larger than 5"
fi
```
