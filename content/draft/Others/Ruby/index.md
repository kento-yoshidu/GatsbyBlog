---
title: "今更Rubyに入門してみた"
postdate: 2021-02-03
update: 2021-02-03
categoryName: "今更Rubyに入門してみた"
categorySlug: "introRuby"
tags: ["Ruby"]
---

# 今更Rubyに入門してみた

Ruby on Railsを触ることになりそうなので、今更ですがRubyを勉強しています。学習したアウトプットとして、記事を残すことにします。

Rubyのバージョンは`3.1.2`です。

## 全てのデータがオブジェクトである

Rubyではありとあらゆる全てのデータがオブジェクトであるとのことです。

数値、文字列、配列、真偽値、nilも全てがオブジェクトです。例えばJavaScriptでしたらオブジェクトとプリミティブに分かれています。この、**全てのデータがオブジェクトである**という点は、Rubyの特徴であると言えそうです。

## `object_id`を使用してIDを取得する

Rubyではオブジェクトごとに重複しない一意の整数(**object_id**)が割り当てられます。`object_id`はオブジェクトの生成と共に振られ、GCが行われるか、プログラムが終了するまで変化しません。`object_id`メソッドを使用してその値を出力することができます。

```ruby
puts "test".object_id
#=> 440
```

全てのデータがオブジェクトであるならば、どんなものでも`object_id`を使用すれば必ず何かしらのidが返ってくるはずです。検証してみたいと思います。

## ミュータブルなStringクラス

以下の例を見てもらえれば、同じ`test`という文字列に違うオブジェクトIDが割り当てられていることがわかります。

```ruby
puts "test".object_id
#=> 440

puts "test".object_id
#> 460
```

idが違っているのですから当然、それぞれ違うオブジェクトが生成されているということになります。どうやらStringクラスなどのミュータブルな値はobject_idが違ってくるようです。

## イミュータブルなIntegerクラス

整数値はidが同じでした。

```ruby
puts 0.object_id
#=> 1

puts 0.object_id
#=> 1
```

0～10までの整数の`object_id`を調べてみました。整数 * 2 + 1の値を取るようになってるみたいです。

```ruby
for i in 0..10 do
  puts "#{i}のobject_id = #{i.object_id}"
end

\```
0のobject_id = 1
1のobject_id = 3
2のobject_id = 5
3のobject_id = 7
4のobject_id = 9
5のobject_id = 11
6のobject_id = 13
7のobject_id = 15
8のobject_id = 17
9のobject_id = 19
10のobject_id = 21
\```
```

### idからオブジェクトを参照する

`_id2ref`を使用してidからオブジェクトを調べることができます。

```ruby
obj = "Hello World"

obj.object_id
# 440

puts ObjectSpace._id2ref(440)
#=> Hello World
```

## 変数

ある変数を別の変数に代入し、2つの変数の`object_id`を調べると同じでした。

```ruby
var = "test"

var2 = var

puts var.object_id
#=> 440

puts var2.object_id
#=> 440
```

https://docs.ruby-lang.org/ja/latest/method/ObjectSpace/m/_id2ref.html

## ハッシュはコピーしてもidが同じ

`{}`を使ったハッシュの

https://magazine.rubyist.net/articles/0032/0032-CallByValueAndCallByReference.html

https://note.com/taka027/n/nf250327637ff

https://docs.ruby-lang.org/ja/latest/method/Object/i/object_id.html

https://note.com/milneon/n/n305f2f7ceaff

- メソッドの引数は参照の値渡し

## ミュータブルとイミュータブル

ミュータブルオブジェクトは文字列、配列、連想配列。イミュータブルオブジェクトは整数、浮動小数点、true、false、nil、シンボル。

## データ型

### 文字列

シングルクオートかダブルクオートを使用します。ダブルクオートなら特殊文字が使用できたり、変数展開が行われます。

```ruby:title=ruby.rb
puts "日本の首都は\n奈良県ではない"
=>日本の首都は
  奈良県ではない

name = "kento"

puts "My name is #{name}"
=> My name is kento
```

### 数値

整数同士の割り算は整数の結果が得られる。小数点以下が**切り捨て**。
オペランドのどちらかを少数にすれば、結果も少数で得られます。

```ruby

puts 2 / 1
=> 2

puts 3 / 2
=> 1

puts 3.0 / 2
=> 1.5
```

### 真偽値

Rubyにおいては、nilとfalseが*偽*であり、それ以外が全て"真"です。nilはnilではなく偽になるところが特徴です。

```ruby:title="ruby.rb
def trueOrFalse(arg)
  if arg
    puts "#{arg} is true"
  else
    puts "#{arg} is false"
  end
end

trueOrFalse(nil)
trueOrFalse(false)
trueOrFalse(0)
trueOrFalse(" ")
```

https://melborne.github.io/2013/02/07/understand-ruby-object/
