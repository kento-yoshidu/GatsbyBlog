---
title: "今更Pythonに入門してみた"
postdate: "2021-01-01"
update: "2021-01-01"
categoryName: "今更Rubyに入門してみた"
categorySlug: "introPython"
tags: ["Python"]
---

## 標準出力

`print`関数を実行

```python
print('Hello World')
# Hello World
```

## 数値の型

int型とfloat型。型は`type`関数で求められる。

```python
print(type(1))
# <type 'int'>

print(type(1.0))
# <type 'float'>
```

```python
print(1 + 1.0)
## 2.0

print(1.0 - 1)
## 0.0

print(10 / 3)
# 3

print(10.0 / 3)
# 3.33333333333
```

# f-strings

テンプレートリテラル的なやつ。`f"{式}"`の形。

```python
age = 34

print(f'I\'m {age} years old.')
# I'm 34 years old.
```

## 書式設定

`f{式:書式設定}`の形。

### パディング

`:埋める文字+文字数`で記載。

```python
age = 34

# 8文字になるように0で埋める
print(f'{age:08}')
#=> 00000034
```

### 埋めたうえで寄せる

```python
age = 34

# 右に寄せる(>)
print(f'{age:>08}')
# I'm 34 years old.

# 中央に寄せる(^)
print(f'{age:^08}')

# 左に寄せる(<)
print(f'{age:<08}')

```


## for-else

```python
numbers = [2, 4, 11]

for number in numbers:
	if number % 2 == 1:
		print(number)
		break

else:
	print('hogehoge')
```

elseブロックは、「breakでループを抜けられなかった」場合に実行されます。


## heapq(ヒープキュー)

```python
import heapq

numbers = [6, 2, 3, 7, 1, 4, 5]

# numbersから最大値を3つ取得する
print(heapq.nlargest(3, numbers))
#=> [7, 6, 5]

# numbersから最小値を3つ取得する
print(heapq.nsmallest(3, numbers))
#=> [1, 2, 3]
```

[heapq --- ヒープキューアルゴリズム &#8212; Python 3.9.4 ドキュメント](https://docs.python.org/ja/3/library/heapq.html)


## *でリストの値を渡す

```python
def hoge(*arg):
	print(arg)

hoge(*[1,2,3])
#=> (1, 2, 3)
```

こんな風に、最初と最後だけを取り除いて取得することも可能。

```python
_, *hoge, _ = [1,2,3,4,5,6,7]

print(hoge)
```

## リスト内包表記

```python
numbers = [2,3,4]

new_numbers = [num * num for num in numbers]

print(new_numbers)
```

## Enum 列挙型

複数の定数を一つにまとめておくことができる。定数名には`name`、値には`value`でアクセスできる。

```python
from enum import Enum

class Hoge(Enum):
	OK = 1

print(Hoge.OK.name)
#=> OK
print(Hoge.OK.value)
#=> 1

print(Hoge.NG.name)
#=> NG
print(Hoge.NG.value)
#=> -1
```


