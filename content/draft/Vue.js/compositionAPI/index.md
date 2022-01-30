---
title: "Composition API"
postdate: "2021-03-05"
update: "2021-03-16"
seriesName: "Vue.js"
seriesSlug: "Vue.js"
description: ""
tags: ["Vue.js", "Composition API"]
---

# Composition APIとは

Vue3で登場したコンポーネントの新しい構築手法。以前までのはOptions APIという。

data、methods、computedなどは全て`setup`メソッド内に記述する。`this`が不要になる。そしてアロー関数で書けるようになる。

## 1

### データ

普通にデータ表示。`setup()`内で変数を定義する。ただし、`return`で返さないと駄目。

```vue
<template>
  <div id="app">
    {{ title }}
  </div>
</template>

<script lang="ts">
import { reactive } from "vue"

export default {
  setup() {
    const title = "Title"

    return {
      title
    }
  }
}
</script>
```

### methods

関数を定義して`return`で返す。

```vue
<template>
  <div id="app">
    <h1>{{ title }}</h1>

    <button @click="alertMsg">Click me</button>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const title = "Title"

    const alertMsg = (): viod => {
      alert('Hello World')
    }

    return {
      title,
      alertMsg
    }
  }
}
</script>
```

### computed

`computed`をインポートして関数定義

```vue
<template>
  <div id="app">
    <h1>{{ title }}</h1>

    <p>{{ upperTitle }}</p>

    <button @click="alertMsg">Click me</button>
  </div>
</template>

<script lang="ts">
import { computed } from "vue"

export default {
  setup() {
    const title = "Hello"

    const alertMsg = (): void => {
      alert('Hello World')
    }

    const upperTitle = computed(() => {
      return title.toUpperCase()
    })

    return {
      title,
      alertMsg,
      upperTitle
    }
  }
}
</script>
```

### reactive

```typescript
interface State {
	inputValue: String,
	hasError: Boolead,
}

const state = reactive<State> ({
	inputValue: '',
	hasError: false,
})
```
