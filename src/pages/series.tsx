import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"

import * as Styles from "../styles/series.module.css"

type Props = {
  data: GatsbyTypes.SeriesPagesQuery
  location: {
    pathname: string
  }
}

const Series: React.VFC<Props> = ({ data, location }) => (
  <Layout>
    <Seo
      title="シリーズ一覧"
      pagepath={location.pathname}
    />

    <Header
      pageTitle="シリーズ一覧"
    />

    <main className={`${Styles.seriesMain} LoadAnimation`}>
      <ul className={Styles.seriesList}>
        {data.allMarkdownRemark.group.map((series) => (
          <li
            key={series.fieldValue}
          >
            <Link
              className={Styles.link}
              to={`/series/${series.nodes[0].frontmatter?.seriesSlug}/page/1/`}
            >
              { series.fieldValue }({ series.totalCount })
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </Layout>
)

export default Series

export const pageQuery = graphql`
  query SeriesPages($series: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          published: { eq: true }
          seriesSlug: {
            eq: $series
          }
        }
      }
    ) {
      group(field: frontmatter___seriesName) {
        nodes {
          frontmatter {
            seriesSlug
            seriesName
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`
