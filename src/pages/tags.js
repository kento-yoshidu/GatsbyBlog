import React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"
import Footer from "../components/footer"

import * as Styles from "../styles/series.module.scss"

const Tags = ({ data }) => {

	const tags = data.allMarkdownRemark.group

	return (
		<>
			<Header
				pageTitle="タグ一覧"
			/>

			<main className={`${Styles.tagsMain} LoadAnimation`}>
				<ul className={Styles.tagList}>
          {tags.map(tag => {
            return (
              <li className={Styles.listItem}>
                <Link to={`/tag/${tag.fieldValue}/page/1/`}>
                  { tag.fieldValue }({ tag.totalCount })
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

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(filter: {frontmatter: {tags: {eq: $tag}}}) {
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