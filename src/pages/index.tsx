import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"


const Styles = require("../styles/index.module.scss")

type Props = {
  data: GatsbyTypes.IndexPageQuery,
  location: {
    pathname: string
  }
}

const BlogIndex: React.VFC<Props> = ({ data, location }) => {
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
        <div className={Styles.image}>
          <StaticImage
            layout="fullWidth"
            alt="hoge"
            src="../../static/gatsby.svg"
          />
        </div>

        <div className={Styles.box}>
          <Link to="/page/1/">
            記事一覧を見る
          </Link>
        </div>

        <div className={Styles.box}>
          <Link to="/series">
            シリーズ一覧を見る
          </Link>
        </div>

        <div className={Styles.box}>
          <Link to="/tags">
            タグ一覧を見る
          </Link>
        </div>


      </main>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`