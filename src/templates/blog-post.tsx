import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"
import PostInfo from "../components/postInfo"

const Styles = require("../styles/post.module.scss")
const TableStyles = require("../styles/tableOfContent.module.scss")

import "prismjs/themes/prism-tomorrow.css"
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

/*
// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles

// Highlighting for code blocks
import "prismjs/themes/prism.css"

*/

type Props = {
  data: GatsbyTypes.BlogPostBySlugQuery
  location: {
    pathname: string
  }
}

const BlogPostTemplate: React.VFC<Props> = ({ data, location }) => {
  const post = data.markdownRemark
  const { previous, next } = data
  const tableOfContents = data.markdownRemark?.tableOfContents

  return (
    <Layout>
      <Seo
        title={post?.frontmatter?.title}
        pagepath={location.pathname}
      />

      <Header
        pathname={location.pathname}
      />

      <PostInfo
        postTitle={post?.frontmatter?.title}
        seriesSlug={data.markdownRemark?.frontmatter?.seriesSlug}
        seriesName={data.markdownRemark?.frontmatter?.seriesName}
        postdate={data.markdownRemark?.frontmatter?.postdate}
        updatedate={post?.frontmatter?.updatedate}
        tags={post?.frontmatter?.tags}
      />

      <div className="LoadAnimation">
        <main
          dangerouslySetInnerHTML={{ __html: post?.html }}
          itemProp="articleBody"
          className={`${Styles.blogPost} main`}
        />

        <div
          className={TableStyles.tableOfContent}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
      </div>  

      <nav className={Styles.beforeAndAfter}>
        {previous && (
          <Link
            to={previous?.fields?.slug} rel="prev"
            className={Styles.before}
          >
            <h2>← 前の記事</h2>
            <p className={Styles.title}>
              {previous?.frontmatter?.title}
            </p>
          </Link>
        )}

        {next && (
          <Link
            to={next?.fields?.slug}
            className={Styles.after}
          >
            <h2>後の記事 →</h2>
            <p className={Styles.title}>
              {next?.frontmatter?.title}
            </p>
          </Link>
        )}
      </nav>
    </Layout>
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
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        postdate
        updatedate
        description
        seriesSlug
        seriesName
        tags,
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
