import * as React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"
//import PageInfo from "../components/pageInfo"
import PostInfo from "../components/postInfo"
import Footer from "../components/footer"
import Seo from "../components/seo"

import * as Styles from "../styles/post.module.scss"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <div>
      <Header
        pathname={location.pathname}
      />

      <PostInfo
        postTitle={post.frontmatter.title}
        seriesSlug={data.markdownRemark.frontmatter.seriesSlug}
        seriesName={data.markdownRemark.frontmatter.seriesName}
        postdate={data.markdownRemark.frontmatter.postdate}
        updatedate={post.frontmatter.updatedate}
        tags={post.frontmatter.tags}
      />

      <div className="LoadAnimation">
        <main
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className={`${Styles.blogPost} main`}
        />

        <div className={Styles.tableOfContent}>
          目次
        </div>
      </div>  

      <nav className={Styles.beforeAndAfter}>
        {previous && (
          <Link
            to={previous.fields.slug} rel="prev"
            className={Styles.before}
          >
            <h2>← 前の記事</h2>
            <p className={Styles.title}>
              {previous.frontmatter.title}
            </p>
          </Link>
        )}

        {next && (
          <Link
            to={next.fields.slug}
            className={Styles.after}
          >
            <h2>後の記事 →</h2>
            <p className={Styles.title}>
              {next.frontmatter.title}
            </p>
          </Link>
        )}
      </nav>

      <Footer />
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
