---
title: 今更Rubyに入門してみた
postdate: 2021-02-03
updatedate: 2021-02-03
categoryName: "今更Rubyに入門してみた"
categorySlug: introRuby
tags: ["Ruby"]
---

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


