import React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"
import Seo from "../components/seo"
import Footer from "../components/footer"

import * as Styles from "../styles/series.module.scss"

const Series = ({ data }) => {

  const categories = data.allMarkdownRemark.group

  return (
    <>
      <Seo
        title="シリーズ一覧"
      />

      <Header
        headerTitle="鳥に生まれることができなかった人へ"
        pageTitle="シリーズ一覧"
        isArticle={ true }
      />


      <main className={`${Styles.seriesMain} LoadAnimation`}>
        <ul className={Styles.seriesList}>
          { categories.map(category => {
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
  query ($series: String) {
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