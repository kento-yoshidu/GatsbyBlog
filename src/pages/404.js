import React from "react"
import { graphql, Link } from "gatsby"

import Header from "../components/header"
import Seo from "../components/seo"

import * as Styles from "../styles/404.module.scss"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <>
      <Seo title="404: Not Found" />

      <Header
        pageTitle="404 Page Not Found"
      />

      <main className={Styles.main}>
          <h3>ページが見つかりません。</h3>
          <p>ページが削除された、もしくは移動した可能性があります。<Link to={`/`}>トップページ</Link>に戻り、改めてお探しください。</p>
          <p>また、<Link to={`/categories/`}>カテゴリ一覧ページ</Link>や<Link to={`/tags/`}>タグ一覧ページ</Link>も用意してあります。こちらからの方が探しやすいかもしれません。</p>
      </main>

    </>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
