import React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"

const Styles = require('../styles/series.module.scss');

type Props = {
  data: GatsbyTypes.SeriesPagesQuery
}

const Series: React.VFC<Props> = ({ data }) => {

  const categories = data.allMarkdownRemark.group

  return (
    <>
      <Seo
        title="シリーズ一覧"
      />

      <Header
        pageTitle="シリーズ一覧"
      />


      <main className={`${Styles.seriesMain} LoadAnimation`}>
        <ul className={Styles.seriesList}>
          { categories.map((category: any) => {
            return (
              <li className={Styles.listItem}>
                <Link to={`/series/${category.nodes[0].frontmatter.seriesSlug}/page/1/`}>
                  { category.nodes[0].frontmatter.seriesName }({ category.totalCount })
                </Link>
              </li>
            )
          })}
        </ul>
      </main>

      <Footer />
    </>
  )
}

export default Series

export const pageQuery = graphql`
  query SeriesPages($series: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          seriesSlug: {
            eq: $series
          }
        }
      }
    ) {
      totalCount
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