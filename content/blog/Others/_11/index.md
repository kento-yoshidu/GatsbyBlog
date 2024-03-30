---
title: "[下書き]今更のReact総復習"
postdate: "2024-03-30"
update: "2024-03-30"
seriesName: "その他"
seriesSlug: "Others"
description: "今更Reactを総復習します。"
tags: ["React"]
keywords: ["React"]
published: true
---

## コンポーネント

propsとstateはコンポーネントで値（状態 ≒ state）を扱う。propsは引数、stateはコンポーネントのローカル変数。


propsにはいろんな型の値を渡せる（プリミティブ & オブジェクト）。

```jsx
const Child = (props) => {
  console.log(props)

  return (
    <>
      <p>id: {props.obj.id}</p>
      <p>name: {props.obj.name}</p>
    </>
  )
}

const App = () => {
  return (
    <Child obj={{ id: 1, name: "kento" }} />
  )
}
```

分割代入で受け取る。

```jsx
const Child = ({ obj: { id, name }}) => {
  return (
    <>
      <p>id: {id}</p>
      <p>name: {name}</p>
    </>
  )
}

const App = () => {
  return (
    <Child obj={{ id: 1, name: "kento" }} />
  )
}
```

TypeScriptでの型定義。

```tsx
const Child = ({ obj: { id, name }}: { obj: { id: number, name: string }}) => {
  return (
    <>
      <p>id: {id}</p>
      <p>name: {name}</p>
    </>
  )
}
```

## useState

```jsx
const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}
```


## コンポーネントが再レンダリングされるタイミング（詳しく書く）

- stateが変化した時
- propsが変化した時
- 親コンポーネントが再レンダリングされた時

## 参考

[>Vueユーザー「あれ、ReactでonClickが動かない。。」のワケ - Qiita](https://qiita.com/shiori_hoshimi/items/1179abac2e017ef20a03)
