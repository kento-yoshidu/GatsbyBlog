import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"

const Styles = require("../styles/index.module.scss")

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFolder,
  faTag
} from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
//import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons"
config.autoAddCss = false

type Props = {
  data: GatsbyTypes.IndexPageQuery,
  location: {
    pathname: string
  }
}

const BlogIndex: React.VFC<Props> = ({ location }) => {
  const pagepath = location.pathname  

  return (
    <Layout>
      <Seo
        pagepath={pagepath}
      />

      <Header
        pageTitle="Top Page"
      />

      <main className={Styles.main}>

        <Link
          to="/page/1/"
          className={Styles.box}
        >
          <FontAwesomeIcon icon={faFileAlt} />
          <span>記事一覧</span>
          </Link>

        <Link
          className={Styles.box} 
          to="/series/"
        >
          <FontAwesomeIcon icon={faFolder} />
          <span>シリーズ一覧</span>
        </Link>

        <Link
          to="/tags/"
          className={Styles.box}
        >
          <FontAwesomeIcon icon={faTag} />
          <span>タグ一覧</span>
        </Link>
      </main>
    </Layout>
  )
}

export default BlogIndex
