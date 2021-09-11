import * as React from "react"
import { graphql } from "gatsby"

import Header from "../components/header"

type Props = {
  data: GatsbyTypes.IndexPageQuery,
  location: Object
}

const BlogIndex: React.VFC<Props> = ({ data, location }) => {
  
  return (
    <>
      <Header
        pageTitle="Top Page"
      />
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPage {
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