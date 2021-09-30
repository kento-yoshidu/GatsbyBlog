import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"
import PageInfo from "../components/pageInfo"
import PostList from "../components/postList"
import Pagination from "../components/pagination"
import Footer from "../components/footer"

type Props = {
  data: GatsbyTypes.SeriesQuery,
  pageContext: {
    postCount: number,
    pageCount: number,
    totalPageCount: number,
    skip: number,
    limit: number,
    currentPage: number,
    isFirst: boolean,
    isLast: boolean,
    seriesName: string,
    seriesSlug: string
  },
  location: {
    pathname: string
  }
}

const Series: React.VFC<Props> = ({ data, pageContext, location }) => {
	const postData = data.allMarkdownRemark

	return (
		<Layout>
      <Seo
        title={`${pageContext.seriesName}シリーズの記事`}
        pagepath={location.pathname}
      />

			<Header
				pageTitle={`${pageContext.seriesName} シリーズの記事`}
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
        currentPage={pageContext.currentPage}
        pageCount={pageContext.pageCount}
        isFirst={pageContext.isFirst}
        isLast={pageContext.isLast}
      />
		</Layout>
	)
}

export default Series

export const pageQuery = graphql`
  query Series(
    $seriesSlug: String!,
    $limit: Int!,
    $skip: Int!
  ) {
    allMarkdownRemark (
      sort: {
        fields: [frontmatter___postdate],
        order: DESC
      }
      limit: $limit,
      skip: $skip
      filter: {
        frontmatter: {
          seriesSlug: {
            eq: $seriesSlug
          }
        }
      }
    ) {
      nodes {
        id
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