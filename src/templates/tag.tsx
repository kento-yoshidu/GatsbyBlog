import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Header from "../components/header"
import PageInfo from "../components/pageInfo"
import PostList from "../components/postList"
import Pagination from "../components/pagination"
import Footer from "../components/footer"

type Props = {
  data: Object,
  location: string,
  pageContext: Object
}

const Tag: React.VFC<Props> = ({ data, location, pageContext }) => {
	const postData = data.allMarkdownRemark

	return (
		<>
      <Seo
        title={`${pageContext.tag}タグの記事`}
        pagepath={location.pathname}
      />

			<Header
				pageTitle={`${pageContext.tag} タグの記事`}
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
        tag={pageContext.tag}
      />

			<Footer />
		</>
	)
}

export default Tag

export const pageQuery = graphql`
  query(
    $tag: String!,
    $limit: Int!,
    $skip: Int!
  ) {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___postdate],
        order: DESC
      }
      limit: $limit,
      skip: $skip
      filter: {
        frontmatter: {
          tags: {
            in: [$tag]
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