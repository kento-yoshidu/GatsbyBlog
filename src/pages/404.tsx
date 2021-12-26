import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"

import * as Styles from "../styles/404.module.scss"

type Props = {
  location: {
    pathname: string
  }
}

const NotFoundPage: React.VFC<Props> = ({ location }) => {
  const pagepath=location.pathname

  return (
    <Layout>
      <Seo
        title="Page Not Found"
        pagepath={pagepath}
      />

      <Header
        pageTitle="404 Page Not Found"
      />

      <main className={Styles.main}>
        <h2>ページが見つかりません。</h2>
        <p>ページが削除された、もしくは移動した可能性があります。<Link to={`/page/1/`}>トップページ</Link>に戻り、改めてお探しください。</p>
        <p>また、<Link to={`/series/`}>カテゴリ一覧ページ</Link>や<Link to={`/tags/`}>タグ一覧ページ</Link>も用意してあります。こちらからの方が探しやすいかもしれません。</p>
      </main>
    </Layout>
  )
}

export default NotFoundPage
