---
title: "async/await"
postdate: "2021-01-01"
updatedate: "2020-01-01"
seriesName: "JavaScript中級者を目指す"
seriesSlug: "JavaScriptAdvance"
description: 
tags: ["JavaScript", "非同期処理", "async/await"]
---



```javascript
function fet() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("start");
      resolve()
    }, 1000);
  })
}

async function hidouki() {
  const a = await fet();
  console.log("end")
}

hidouki();
```



## 参考

https://dev.classmethod.jp/articles/javascript-asynchronous-processing/