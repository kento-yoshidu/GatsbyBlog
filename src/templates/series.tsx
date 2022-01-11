import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/header"
import PageInfo from "../components/pageInfo"
import PostList from "../components/postList"
import Pagination from "../components/pagination"
import MobilePagination from "../components/mobilePagination"

import type { PageContext } from "../../type"

interface Series {
  seriesName: string;
  seriesSlug: string;
}
interface Props {
  data: GatsbyTypes.SeriesQuery,
  pageContext: PageContext & Series,
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
        series={pageContext.seriesSlug}
      />

      <MobilePagination
        isFirst={pageContext.isFirst}
        isLast={pageContext.isLast}
        currentPage={pageContext.currentPage}
        pageCount={pageContext.pageCount}
        series={pageContext.seriesSlug}
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