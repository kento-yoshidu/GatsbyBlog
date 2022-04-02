---
title: "関数"
postdate: "2021-01-01"
updatedate: "2021-01-01"
categoryName: "JavaScript中級者を目指す"
categorySlug: "JavaScriptAdvance"
description: ""
tags: ["JavaScript", "Iterator"]
---

# 関数

```javascript
const func = function(){}

console.log(func);
//=> [Function: func]

func.test = "hoge"

console.log(func.test)
```

## スコープ

```javascript
{
	const a = 1;
	console.log(a); //=> 1
	{
		const a = 2;
		console.log(a); //=> 2
		{
			const a = 3;
			console.log(a); //=> 3
		}
	}
}
const a = 0;
console.log(a); //=> 0
```

**内**から**外**は参照できます。`consele.log(a);`の文のあるスコープには`a`は定義されていないため、外側のスコープの`a`を探しに行きます。

```javascript
{
	const a = 1;
	{
		// 外のaを参照
		console.log(a); //=> 1
	}
}
```

反対に、**外**から**内**は参照できません。

```javascript
{
	{
		const a = 1;
	}
	// 内のaを参照？
	console.log(a);
	//=> ReferenceError: a is not defined
}
```

このように、外側へ外側へと変数を探しに行く仕組みを**スコープチェーン**と言います。

## ビルトインオブジェクト

**グローバルスコープ**に定義される。