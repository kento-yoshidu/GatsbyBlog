---
title: "今更Pythonに入門してみた"
postdate: "2021-01-01"
updatedate: "2021-01-01"
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


