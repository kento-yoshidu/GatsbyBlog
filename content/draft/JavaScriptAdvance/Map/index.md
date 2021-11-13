---
title: "Map"
postdate: "2099-01-01"
updatedate: "2099-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: ""
tags: ["JavaScript"]
---

# Map

```javascript
const map = new Map();
console.log(map);
//=> Map(0) {}
```


```javascript
const map = new Map([
  ["key1", "value1"],
  ["key2", "value2"]
]);

console.log(map);
//=> Map(2) { 'key1' => 'value1', 'key2' => 'value2' }
```

キーにはどのような型のデータでも渡せる。

```javascript
const map = new Map([
  [1, ": 1"], //number
  ["2", ": 2"], //string
  [3n, ": 3n"], // BigInt
  [true, ": true"], // boolean
  [undefined, ": undefined"], //undefined
  [null, ": null"], // null
]);

console.log(map.get(1)); //=> : 1
console.log(map.get("2")); //=> : 2
console.log(map.get(3n)); //=> : 3n
console.log(map.get(true)); //=> : true
console.log(map.get(undefined)); //=> : undefined
console.log(map.get(null)); //=> : null
```


さらに、オブジェクトをキーにすることもできます。

```javascript
const obj = {
  id: 1
}

const map = new Map([
  [obj, ": object"]
]);

console.log(map.get(obj)); //=> : object
```

ちょっとややこしいでSetは重複した値をもつことができません。

https://qiita.com/chihiro/items/9965cd7eca0380cf288c

https://tcd-theme.com/2021/10/javascript-map-set.html