import React from "react"
import { graphql } from "gatsby"

import Header from "../components/header"
import PageInfo from "../components/pageInfo"
import PostList from "../components/postList"
import Footer from "../components/footer"

const Tag = ({ data, pageContext }) => {
	const postData = data.allMarkdownRemark

	return (
		<>
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