---
title: "トップレベルawait"
postdate: "2021-01-01"
updatedate: "2021-01-01"
seriesName: "JavaScript中級者を目指す"
seriesName: "JavaScriptAdvance"
description: ""
tags: ["JavaScript", "async/await"]
---

## トップレベルawait


```javascript:title=script.mjs
function func() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('promise')
		}, 1000)
	})
}

console.log("start")

console.log(await func())

console.log("finish")
```

## 参考

[tc39/proposal-top-level-await: top-level `await` proposal for ECMAScript (stage 4)](https://github.com/tc39/proposal-top-level-await)