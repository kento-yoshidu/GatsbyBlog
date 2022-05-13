---
title: 今更Rubyに入門してみた
postdate: 2021-02-03
updatedate: 2021-02-03
categoryName: "今更Rubyに入門してみた"
categorySlug: introRuby
tags: ["Ruby"]
---

## 変数宣言

宣言のみは不可、エラーになる。宣言と同時に値を代入する必要がある。

```ruby
x
#=> undefined local variable or method `x' for main:Object (NameError)
```

## 文字列

ダブルクオートとシングルクオートは役割が違う。式展開する場合はダブルクオートを使用する。式は`#{}`で囲う。

```ruby
# 特殊文字の埋め込み
puts "Hello\nWorld"
#=> Hello
#=> World

# 計算して値を出力
puts "1 + 1 = #{1 + 1}"
#=> 1 + 1 = 2
```

### ヒアドキュメント

`<<識別子 ～ 識別子`のように書く。改行ができて、式展開もできる。

```ruby

name = "健太"

str = <<TEXT
こんにちは、僕の名前は#{name}です。
よろしくお願いいたします。
TEXT

puts str
#=> こんにちは、僕の名前は健太です。
#=> よろしくお願いいたします。
```

開始識別子`<<TEXT`は式とみなされるため、メソッドを呼び出すことができる。

```ruby
str = <<TEXT.upcase
aaa
bbb
TEXT

puts str
#=> AAA
#=> BBB
```

### sprintf


## 数値

普通通りにリテラルを書けばいい。`Integer`型と`Float`型に分かれている。

```ruby
puts 1.class
#=> Integer

puts -1.class
#=> Integer

puts 1.1.class
#=> Float
```

また、`_`をリテラルに含めることができるので、大きな数を区切る時に使える。

```ruby
puts 1_000_000
#=> 1000000
```

整数同士の割り算は**整数が返ってくる**。

```ruby
puts 10 / 3
#=> 3
```

小数で値を得たければ、どちらかのオペランドを`Float`型にする必要がある。

```ruby
puts 10.0 / 3
#=> 3.3333333333333335
```

[ruby - Rubyで計算がずれてしまう理由と対策を教えてください。 - スタック・オーバーフロー](https://ja.stackoverflow.com/questions/55632/ruby%E3%81%A7%E8%A8%88%E7%AE%97%E3%81%8C%E3%81%9A%E3%82%8C%E3%81%A6%E3%81%97%E3%81%BE%E3%81%86%E7%90%86%E7%94%B1%E3%81%A8%E5%AF%BE%E7%AD%96%E3%82%92%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84)


`Integer`型の変数に対し、`to_f`メソッドを呼ぶことで`Float`型に変換できる。

```ruby
num = 1

puts num.to_f
#=> 1.0
```

なお、以下の通り、`to_f`は非破壊メソッド。

```ruby
num = 1

num_f = num.to_f

puts num
#=> 1

puts num_f
#=> 1.0
```

変数のインクリメント、デクリメントは`+=`と`-=`で。`++`,`--`は用意されていない。`*=`、

```ruby
i = 10

puts i += 1
#=> 11

puts i -= 1
#=> 10

puts i *= 10
#=> 100

puts i /= 2
#=> 50

puts i **= 2
#=> 2500

puts i
#=> 2500
```

### n進数リテラル

2進数は`0b`、8進数は`0`、16進数は`0x`を先頭に付与する。

```ruby
puts 0b1111
#=> 15

puts 017
#=> 15

puts 0xf
#=> 15
```

## クラス継承

`Numeric`クラスがおおもとにあり、`Integer`、`Float`、`Rational`（有理数）、`Complex`（複素数）クラスは全て`Numeric`クラスを継承している。

## 真偽値

`false`、`nil`がfalsyであり、それ以外の全てがtruthy。

## 論理演算子

### &&(AND)

```ruby
puts true && true
#=> true

puts true && false
#=> false
```

### ||(OR)

```ruby
puts true || true
#=> true

puts true || false
#=> fase

puts false || false
#=> false
```

`&&`の方が`||`よりも優先順位が高く、先に評価される。

### `&&`と`||`の戻り値について

`&&`と`||`は式全体をみて、真なら`true`を返すが、偽の場合に`false`を返すとは限らない。

Rubyリファレンスの`and`について確認すると、

> 左辺を評価し、結果が偽であった場合はその値(つまり nil か false) を返します。左辺の評価結果が真であった場合には右辺を評価しその結果を返します。

※[リンク](https://docs.ruby-lang.org/ja/latest/doc/spec=2foperator.html#and)

とある。式全体の真もしくは偽が確定すると、最後に評価した式の値が返ってくる。以下は左から右に見ていくので、2が最後に評価され2が返る。

```ruby
puts 1 && 2
#=> 2
```

同じく`or`について確認すると

>左辺を評価し、結果が真であった場合にはその値を返します。左辺の評価結果が偽であった場合には右辺を評価しその評価結果を返します。



以下の例だと、`1`→`nil`の順で評価される。`false`がある時点で式全体が偽になるので、最後に評価された`false`が返る。

```ruby
puts 1 && false && 2
#=> false
```

https://qiita.com/HEP/items/1cafc0c9559b1b29cced

### `and`、`or`、`not`

`&&`、`||`、`!`と同じ意味だが、それぞれの間で優先順位がないため、式は左から順番に評価される。

## if式

```ruby
num = 3

if num % 15 == 0
	puts "FizzBuzz"
elsif num % 3 == 0
	puts "Fizz"
elsif num % 5 == 0
	puts "Buzz"
end
#=> Fizz
```

if式は**最後に評価された値**が戻り値として返ってくる。それを変数に代入することも可能。

```ruby
result =
	if true
		"Hello Ruby"
	end

puts result
#=> Hello Ruby
```

## unless文

条件式が偽の場合に処理を実行する。if文の反対。

```ruby
unless false
	puts 'This is false'
end
#=> This is false
```

ただ、`elsif`に相当するものはない。

## case文

`case`句と`when`句を用いる。

```ruby
str = "hoge"

case str
	when "hoge"
		puts "hogehoge"
	when "foo"
		puts "foofoo"
	else
		puts "hogeとfoo以外"
end

#=> hogehoge
```

## 三項演算子

```ruby
n = 1

puts n > 10 ? '10より大きい' : "10未満"
#=> 10未満
```

## メソッド

メソッドでも**最後に評価された値**が返ってくるので、`return`文が不要。※`return`を使えばその時点でメソッドを抜けることになる。

```ruby
def add(num)
	num + 2
end

puts add(10)
#=> 12
```

引数が不足している時はエラー。

```ruby
def add(num)
	num + 2
end

add()
#=>wrong number of arguments (given 0, expected 1) (ArgumentError)
```

デフォルト引数を設定可能。

```ruby
def add(num = 1)
	num + 2
end

puts add()
#=> 3
```

## scan

いくつ存在するか。配列で返す。

```ruby
puts 'ruby-python-ruby-java'.scan('ruby')
#=> ruby
#=> ruby
```

lengthで数を数えられる。

```ruby
puts 'ruby-python-ruby-java'.scan('ruby').length
#=> 2
```

```ruby
def count_evens(nums)
  puts nums.count(&:even?)
end

nums = [2, 4, 6]

count_evens(nums)
#=> 3
```

# メソッドの名前

名前が`?`で終わるメソッドは真偽値を返す。

```ruby
puts ''.empty?
#=> true
```

`!`で終わるメソッドは、破壊的なメソッドである場合が多い（必ずしもそうではない）。また、`!`が付いていないからと言って破壊的なメソッドではないかと言うとそうでもない。

`upcase!`メソッドは呼び出したオブジェクトの文字列を大文字にして返す。この時、呼び出されたオブジェクト（つまり`low`）も大文字になる。

```ruby
low = "aaa"

up = low.upcase!

puts up
#=> AAA

puts low
#=> AAA
```

なお、非破壊的な`upcase`メソッドも用意されている。

```ruby
low = "aaa"

up = low.upcase

puts up
#=> AAA

puts low
#=> aaa
```

なお、自分で作るメソッドの名前の末尾に`?`や`!`を付けることができる。

```ruby
def myUpcase!(str)
  str.upcase
end

puts myUpcase!('Hello')
#=> HELLO
```

## 式と文

値を返せば式、返さなければ文、とひとまず考える。

https://qiita.com/raccy/items/89a1fc77337cb9df8928

http://ichitcltk.hustle.ne.jp/gudon2/index.php?pageType=file&id=word_expression_statement.md


## 擬似変数

```ruby
puts self
#=> main

puts __FILE__
#=> script.ruby

puts __LINE__
#=> 7

puts __ENCODING__
#=> UTF-8
```

## 参照

変数にはオブジェクトへの参照が格納されている。`object_id`メソッドで参照先を確認できる。

```ruby
a = "myObj"
b = a

puts a.object_id
#=> 400
puts b.object_id
#=> 400

a = "newObj"

puts a.object_id
#=> 420

puts b.object_id
#=> 400
```

https://magazine.rubyist.net/articles/0032/0032-CallByValueAndCallByReference.html

https://gam0022.net/blog/2013/02/09/ruby-variable/


## requireでライブラリの読み込み

```ruby
require 'date'

puts Date.today
#=> 2021-08-26
```

`require`は一回だけ読み込める。`load`ならその縛りはない。

自分自身からの相対パスを指定する場合は、`require_relative`を使う（普通はスクリプトを実行しているディレクトリが起点になる）。

## map,select,reduceの使い方

### map

新しい配列を作成する

```ruby
arr = [1,2,3]

arr2 = arr.map {
  | i | i * 2
}

puts arr
#=> 1,2,3

puts arr2
#=> 2,4,6
```


https://zenn.dev/tatsurom/articles/2b92156e509d9e27f81b

https://www.youtube.com/watch?v=sh4WrNGDvQM

