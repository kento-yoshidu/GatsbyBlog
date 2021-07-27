import React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"

const ArticleList = ({ data, pageContext}) => {
	const postData = data.postData;

  console.log()

  return (
	<>

		<Header
			pageTitle="記事一覧"
			isTopPage={true}
		/>

      <section className="post-list">
        {postData.nodes.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <div key={post.id}
              className="post-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <p className="post-title">
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </p>
            </div>
          )
        })}
      </section>
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