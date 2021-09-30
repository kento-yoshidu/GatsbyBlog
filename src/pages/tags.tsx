import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"

const Styles = require("../styles/series.module.scss")

type Props= {
  data: GatsbyTypes.TagsPageQuery
  location: {
    pathname: string
  }
}

const Tags: React.VFC<Props> = ({ data, location }) => (
  <Layout>
    <Seo
      title="タグ一覧"
      pagepath={location.pathname}
    />

    <Header
      pageTitle="タグ一覧"
    />

    <main className={`${Styles.tagsMain} LoadAnimation`}>
      <ul className={Styles.tagList}>
        {data.allMarkdownRemark.group.map(tag => (
          <li
            className={Styles.listItem}
            key={tag.fieldValue}
          >
            <Link to={`/tag/${tag.fieldValue}/page/1/`}>
              { tag.fieldValue }({ tag.totalCount })
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </Layout>
)

export default Tags

export const pageQuery = graphql`
  query TagsPage($tag: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          tags: {eq: $tag}
        }
      }
    ) {
      group(field: frontmatter___tags, limit: 1) {
        nodes {
          frontmatter {
            tags
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`
