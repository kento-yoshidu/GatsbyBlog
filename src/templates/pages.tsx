import React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Header from "../components/header"
import PageInfo from "../components/pageInfo"
import PostList from "../components/postList"
import Pagination from "../components/pagination"
import MobilePagination from "../components/mobilePagination"
import Footer from "../components/footer"

const ArticleList = ({ data, pageContext, location }) => {
	const postData = data.postData;
  console.log(location)

  return (
    <>
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
        //tag={pageContext.tag}
      />

      <MobilePagination
        isFirst={pageContext.isFirst}
        isLast={pageContext.isLast}
        currentPage={pageContext.currentPage}
        pageCount={pageContext.pageCount}
      />

      <Footer />
    </>
  )
}

export default ArticleList

export const pageQuery = graphql`
  query(
    $limit: Int!,
    $skip: Int!
    ) {
      siteData: site {
        siteMetadata {
          title
          description
        }
      }
      postData:
        allMarkdownRemark(
          sort: {
            fields: [frontmatter___postdate],
            order: DESC,
          }
          limit: $limit,
          skip: $skip
        ) {
          nodes {
            id
            excerpt
            fields {
              slug
            }
            frontmatter {
              postdate(formatString: "YYYY年MM月DD日")
              updatedate(formatString: "YYYY年MM月DD日")
              seriesName
              seriesSlug
              title
              tags
            }
          }
        }
      }
`