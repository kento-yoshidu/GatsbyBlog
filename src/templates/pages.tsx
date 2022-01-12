import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"
import PageInfo from "../components/pageInfo"
import PostList from "../components/postList"
import Pagination from "../components/pagination"
import MobilePagination from "../components/mobilePagination"

import type { PageContext } from "../../type"

interface Props {
  data: GatsbyTypes.PagesQuery,
  pageContext: PageContext,
  location: {
    pathname: string
  }
}

const ArticleList: React.VFC<Props> = ({ data, pageContext, location }) => {
	const { postData } = data

  return (
    <Layout>
      <Seo
        title="記事一覧"
        pagepath={location.pathname}
      />

      <Header
        pageTitle="記事一覧"
        pathname={location.pathname}
      />

      <PageInfo
        currentPage={pageContext.currentPage}
        postCount={pageContext.postCount}
        pageCount={pageContext.pageCount}
      />

      <PostList
        postData={postData}
      />

      <Pagination
        isFirst={pageContext.isFirst}
        isLast={pageContext.isLast}
        currentPage={pageContext.currentPage}
        pageCount={pageContext.pageCount}
      />

      <MobilePagination
        isFirst={pageContext.isFirst}
        isLast={pageContext.isLast}
        currentPage={pageContext.currentPage}
        pageCount={pageContext.pageCount}
      />
    </Layout>
  )
}

export default ArticleList

export const pageQuery = graphql`
  query Pages(
    $limit: Int!,
    $skip: Int!
  ) {
    siteData: site {
      siteMetadata {
        title
        description
      }
    }
    postData: allMarkdownRemark(
      sort: {
        fields: [frontmatter___postdate],
        order: DESC,
      }
      limit: $limit,
      skip: $skip
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          postdate(formatString: "YYYY年MM月DD日")
          update(formatString: "YYYY年MM月DD日")
          seriesName
          seriesSlug
          title
          tags
          description
        }
      }
    }
  }
`