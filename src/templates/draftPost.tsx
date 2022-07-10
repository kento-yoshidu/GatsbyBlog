import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"
import PostInfo from "../components/postInfo"

import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

interface Props {
  data: GatsbyTypes.BlogPostBySlugQuery
  location: {
    pathname: string
  }
}

const DraftBlogPostTemplate: React.VFC<Props> = ({ data, location }) => {
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
            to={`/draft${previous?.fields?.slug}`}
            rel="prev"
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
            to={`/draft${next?.fields?.slug}`}
            className={Styles.after}
          >
            <h2>次の記事 →</h2>
            <p className={Styles.title}>
              {next?.frontmatter?.title}
            </p>
          </Link>
        )}
      </nav>
    </Layout>
  )
}

export default DraftBlogPostTemplate

export const pageQuery = graphql`
  query DraftBlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
