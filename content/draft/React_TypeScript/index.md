## 環境構築がつらい

辛いというか曖昧でその時その時行き当たりばったりでやってる感があったので、いい加減手順としてまとめたい。

以下の要素のインストール、設定を行います。

- React
- TypeScript
- ESLint
- Prettier
- Storybook

## ReactとTypeScriptのインストール

`npx create-react-app [project名] --template typescript`で行います。

続けて、`yarn add -D typescript @types/node @types/react @types/react-dom @types/jest`でTypeScript関連のパッケージを追加します。

```shell

$ npx create-react-app react-typescript --template typescript

...略

$ yarn add -D typescript @types/node @types/react @types/react-dom @types/jest

...略
```

`/src/app.js`があるはずなので、これを`app.tsx`に変更します。VSCodeなどで開いているとエラーが出ていると思いますが、無視します。

ルートディレクトリで`yarn start`します。`localhost:3000`にアクセスし、例の画面が表示されていればOKです。また、`src/app.tsx`を再度開き、エラーが解消されていることを確認してください。

