---
title: "正規表現"
postdate: "2023-01-01"
updatedate: "2023-01-01"
categoryName: "JavaScript中級者を目指す"
categorySlug: "JavaScriptAdvance"
description: "JavaScriptの正規表現について学習します。"
tags: ["JavaScript", "正規表現"]
---


`正規表現式.test(文字列)`とすることで、`boolean`が返ってきます。

```javascript
console.log(/[a-c]/.test("aabbcc"));
//=> true
```

## `ABC`

`/ABC/`は、`ABC`という文字にマッチします。

```javascript
console.log(/ABC/.test("ABC"))
//=> true
```

## `[ABC]`

`/[ABC]/`は、`A`、`B`、`C`のいずれかにマッチすれば`true`が返ります。

```javascript
console.log(/[ABC]/.test("A"))
//=> true

console.log(/[ABC]/.test("ABC"))
//=> true

console.log(/[ABC]/.test("AD"))
//=> true

console.log(/[ABC]/.test("D"))
//=> false
```

## `[A-Z]`

`[A-Z]`は、`A`から`Z`までのいずれかにマッチすれば`true`が返ります。同様に、`/[a-z]/`や`/[0-9]/`とすることで、任意の範囲を表現することができます。

```javascript
console.log(/[a-zA-Z0-9]/.test("a"))
//=> true
```

`[acs-z]`とすれば、`a`,`c`,`s~z`のいずれかという意味になります。`[a-cx-z]`とすれば、`a~c`,`x-z`のいずれかという意味になります。

この時、`-`は評価されません。例えば、「A～Z」と`-`のうちいずれか、という風に指定したいのであれば、`[-A-Z]`もしくは`[A-Z-]`という風に、`[]`の中の最初か最後に`-`を置きます。


```javascript
console.log(/^[a-zA-Z0-9]+$/.test("00001010101"))
```

## `\w` `\W`

`\w`とするだけで、大文字小文字のアルファベット、数字、アンダースコアに対応します。

```javascript
console.log(/\w/.test("HelloWorld"))
//=> true

console.log(/\w/.test("---"))
//=> false
```

`\W`はその逆です。大文字小文字のアルファベット、数字、アンダースコア**以外**に対応します。

```javascript
console.log(/\W/.test("HelloWorld"))
//=> false

console.log(/\W/.test("---"))
//=> true
```

## 参考

[【JavaScriptの応用】正規表現とは？JavaScriptの正規表現で使われるパターン・フラグ・メソッドを解説 | ワードプレステーマTCD](https://tcd-theme.com/2021/11/javascript-regularexpression.html)
