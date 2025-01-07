---
title: "[下書き]今更のReact総復習"
postdate: "2024-03-30"
update: "2024-12-28"
seriesName: "その他"
seriesSlug: "Others"
description: "今更Reactを総復習します。"
tags: ["React"]
keywords: ["React"]
published: true
---

# 復習のReact

基本的にJavaScriptで書くが、必要があればTypeScript版のコードを掲載する。

React18を対象にする

Next.jsなどのフレームワークは扱わない

Viteで環境構築する

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

```tsx
type Book = {
  id: number,
  name: string
}

const books = [
  { id: 1, name: "kento" },
  { id: 2, name: "kouta" },
  { id: 3, name: "nao" },
  { id: 4, name: "miku" },
]

const Books = ({ books }: { books: Book[] }) => {
  return (
    <>
      {books.map(({id, name}) => (
        <Book id={id} name={name} key={id} />
      ))}
    </>
  )
}

const Book = ({ id, name }: Book) => {
  return (
    <>
      <p>id: {id}, name: {name}</p>
    </>
  )
}

const App = () => {
  return (
    <Books books={books} />
  )
}
```

### stateの更新は非同期


```typescript
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
};
```

このコードでは、setCount(count + 1) を2回呼び出しています。しかし、この場合、count は関数が呼ばれた時点の値 (すなわち現在の状態) を参照しています。

具体的な流れ
最初の setCount(count + 1) が呼ばれると、React は新しい状態を「現在の count + 1」に更新するようにスケジュールします。
2回目の setCount(count + 1) も、同じ現在の count を参照して「現在の count + 1」に更新するようにスケジュールします。
React は状態の更新をバッチ処理するため、結果として count は 1 増加するだけ になります。

```typescript
const handleClick = () => {
  setCount((count) => count + 1);
  setCount((count) => count + 1);
};
```

このコードでは、setCount に アップデート関数 を渡しています。この関数は「前回の状態」を引数として受け取ります。

具体的な流れ
最初の setCount((count) => count + 1) が呼ばれると、React は現在の状態 (count) を基に「count + 1」を計算し、次の状態をスケジュールします。
2回目の setCount((count) => count + 1) が呼ばれると、React は 最初の更新後の状態 を引数として「count + 1」を計算し、次の状態をスケジュールします。
結果として、count は 2 増加 します。

違いの要点
コード1: count は関数が呼ばれた時点の値を直接参照しているため、複数の setCount 呼び出しは同じ値を基に処理されます。
コード2: count はアップデート関数の引数として渡される「最新の状態」を基に処理されるため、逐次的に更新されます。
推奨方法
状態更新が前回の状態に依存する場合は、コード2のようにアップデート関数を使用することを推奨します。これは、複数回の更新や非同期処理が絡む場合にも、意図通りの動作を保証できるからです。

<!--
コード1: 状態の直接参照
jsx
コードをコピーする
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
};
このコードでは、count + 1 を2回実行して setCount に渡しています。

1回目の setCount(count + 1)

この時点で count の値を直接参照し、「count + 1」を計算します。
たとえば、count が 0 の場合、「0 + 1」をスケジュールします。
2回目の setCount(count + 1)

2回目も同じ現在の count を参照します (まだ状態は更新されていないため)。
その結果、再び「0 + 1」をスケジュールします。
React のバッチ処理によって、2回の状態更新は最適化され、結果として count は 1増加 します。

コード2: 関数型アップデート
jsx
コードをコピーする
const handleClick = () => {
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
};
このコードでは、setCount に 関数型アップデート を渡しています。

1回目の setCount((prevCount) => prevCount + 1)

React は現在の count の値を prevCount として関数に渡します。
たとえば、count が 0 の場合、「0 + 1」を計算し、新しい値 (1) をスケジュールします。
2回目の setCount((prevCount) => prevCount + 1)

React は 1回目の更新後の状態 (1) を prevCount として関数に渡します。
そのため、「1 + 1」を計算し、新しい値 (2) をスケジュールします。
関数型アップデートでは、状態の更新が「前回の状態に基づいて行われる」ため、複数の setCount 呼び出しが順番に実行され、結果として 2増加 します。

動作の違いの背景: 状態のキャプチャ
状態の直接参照 (コード1)
setCount(count + 1) は「現在の count 値」をキャプチャします。
そのため、handleClick が呼ばれた時点での count の値を基に計算します。
この計算結果は固定されており、React がその後の状態変更を認識していないため、2回目の計算でも同じ結果になります。
関数型アップデート (コード2)
setCount((prevCount) => prevCount + 1) は「最新の状態」を引数として関数に渡します。
状態更新は React の内部で逐次的に行われるため、複数回の setCount 呼び出しでも常に「前回の状態」が反映されます。
まとめ
React は状態を非同期でバッチ処理するため、同じ状態に基づいた複数の更新は最適化されて1回分だけ実行されます。
状態が前回の値に依存する場合、関数型アップデートを使用することで、正確な結果を得られます。
推奨パターン
常に最新の状態に基づいて更新を行いたい場合は、関数型アップデートを使うのが安全です。

jsx
コードをコピーする
setCount((prevCount) => prevCount + 1);
setCount((prevCount) => prevCount + 1);
-->

## コンポーネントが再レンダリングされるタイミング（詳しく書く）

- stateが変化した時
- propsが変化した時
- 親コンポーネントが再レンダリングされた時

## key属性

## children

ReactNodeで型定義?

参考 : [Reactのchildrenの型で子コンポーネントを制御する（したかった）](https://zenn.dev/mya_ake/articles/5517a5001db48e)

## useEffect

https://www.cxr-inc.com/blog/cc98228bc2ba48d3853d077f25fb831c

https://tech.enechange.co.jp/entry/2024/06/28/100239

https://designare.jp/blog/tokuyasu/useeffect%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E3%81%B9%E3%81%8D%E5%A0%B4%E6%89%80%E3%81%AA%E3%81%AE%E3%81%8B.html

https://developer.mamezou-tech.com/blogs/2024/08/13/react_useeffect/

https://zenn.dev/ippe/articles/a53386986ff236

https://zenn.dev/yumemi_inc/articles/react-effect-simply-explained

https://tech.iimon.co.jp/entry/2024/07/02/152657

## Transition

## Suspense

## 自動バッチング

複数のステート更新を一回にまとめる機能。

17と18で何が変わるかの例示。

`flushSync`の説明は不要。

## 参考

[>Vueユーザー「あれ、ReactでonClickが動かない。。」のワケ - Qiita](https://qiita.com/shiori_hoshimi/items/1179abac2e017ef20a03)

### strictモード

[【React】Strictモードの挙動【バージョン18による】 #JavaScript - Qiita](https://qiita.com/tsubasa_k0814/items/ce95b6b92e7994d4fdac)

### useState

https://zenn.dev/counterworks/articles/putting-props-to-use-state

### 自動バッチング

[新機能：自動バッチング](https://ja.react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching)
[React 18の新機能Automatic Batchingを理解する｜デザミス株式会社 U-motion 開発チーム](https://note.com/umotion/n/nadda0d47801c)

### Suspense

[](https://zenn.dev/uhyo/books/react-concurrent-handson)

https://tech.anotherworks.co.jp/article/react-suspense-react18

### SSR

https://blogs.jp.infragistics.com/entry/understanding-ssr