import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Helmet } from "react-helmet"
import Header from "../components/header"
import PostInfo from "../components/postInfo"
import intersectionObserver from "../lib/intersectionObserver"

import * as Styles from "../styles/post.module.css"
import * as TableStyles from "../styles/tableOfContent.module.scss"

import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

interface Props {
  data: GatsbyTypes.BlogPostBySlugQuery
  location: {
    pathname: string
  }
}

const BlogPostTemplate: React.VFC<Props> = ({ data, location }) => {
  useEffect(() => {
    intersectionObserver()
  }, [])

  const post = data.markdownRemark
  const { previous, next } = data
  const tableOfContents = data.markdownRemark?.tableOfContents

  return (
    <Layout>
      <Seo
        title={post?.frontmatter?.title}
        pagepath={location.pathname}
      />

      <Helmet>
        <script async src="//cdn.iframe.ly/embed.js" charSet="utf-8"></script>
      </Helmet>

      <Header
        pathname={location.pathname}
      />

      <PostInfo
        title={post?.frontmatter?.title}
        seriesSlug={data.markdownRemark?.frontmatter?.seriesSlug}
        seriesName={data.markdownRemark?.frontmatter?.seriesName}
        postdate={data.markdownRemark?.frontmatter?.postdate}
        update={post?.frontmatter?.update}
        tags={post?.frontmatter?.tags}
        description={post?.frontmatter?.description}
      />

      <div className="load-animation">
        <main
          dangerouslySetInnerHTML={{ __html: post?.html }}
          itemProp="articleBody"
          className={`${Styles.blogPost} main`}
        />

        <div
          className={`${TableStyles.tableOfContent} tableOfContent }`}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
      </div>

      <nav className={Styles.beforeAndAfter}>
        {previous && (
          <Link
            to={previous?.fields?.slug}
            rel="prev"
            className={Styles.before}
          >
            <h2 className={Styles.title}>← 前の記事</h2>
            <p className={Styles.postTitle}>
              {previous?.frontmatter?.title}
            </p>
          </Link>
        )}

        {next && (
          <Link
            to={next?.fields?.slug}
            className={Styles.after}
          >
            <h2 className={Styles.title}>次の記事 →</h2>
            <p className={Styles.postTitle}>
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
      html
      tableOfContents
      frontmatter {
        title
        postdate(formatString: "YYYY-MM-DD")
        update(formatString: "YYYY-MM-DD")
        description
        seriesSlug
        seriesName
        tags
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
