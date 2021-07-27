import * as React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"

const BlogIndex = ({ data, location }) => {
  console.log(data)
  return (
    <>
      <Header
        pathname={ location.pathname }
        pageTitle="test"
      />
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
