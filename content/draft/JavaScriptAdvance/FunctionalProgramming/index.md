
## カリー化

3つの数を掛け算する関数。普通に書くと引数が3つになる。

```js
function func(x, y, z) {
  return x * y * z
}

console.log(func(2, 2, 10))
//=> 40
```

関数を返せることを利用して、

```js
function func(x) {
  return function func2(y) {
    return function func3(z) {
      return x * y * z
    }
  }
}

console.log(func(2)(2)(10))
//=> 40
```
