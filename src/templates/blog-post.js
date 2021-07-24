import * as React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"
import Seo from "../components/seo"

import * as Styles from "./post.module.scss"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <div>
      <Header
      />

      <div className="all-wrapper">
        <div className="wrapper">
          <main
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
            className={`${Styles.blogPost} main`}
          />

          <div className={Styles.tableOfContent}>
            目次
          </div>
        </div>  

        <div>前後</div>
      </div>
    </div>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
