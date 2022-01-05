import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Search = () => {
  const { allSearchJson } = useStaticQuery(
    graphql`
      query {
        allSearchJson {
          edges {
            node {
              keywords
              slug
              title
            }
          }
        }
      }
    `
  )

  type Edge = {
    node: {
      keywords: string[];
      slug: string;
      title: string;
    }
  }

  // フォームに入力された文字列を保持するフック
  const [inputtedKeywords, setInputtedKeywords] = useState<string>("")

  // 条件によって絞り込まれた記事を保持するフック
  const [filteredPosts, setFilteredPosts] = useState<Edge[] | null>(null)

  useEffect(() => {
    const lowerCaseKeywords = inputtedKeywords
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

    const searchedResult: Edge[] = allSearchJson.edges.filter((edge: Edge) => {
      return lowerCaseKeywords?.every((keyword) => {
        return edge.node.keywords.toString().toLocaleLowerCase().includes(keyword)
        })
      })
      
    console.log(searchedResult)

    setFilteredPosts(searchedResult.length ? searchedResult : null)
  }, [inputtedKeywords])

  return (
    <>
      <input
        type="text"
        onChange={(e) => setInputtedKeywords(e.target.value)}
      />

      <ul>
        {filteredPosts?.map((posts) => (
          <li>
            <Link to={posts.node.slug}>
              {posts.node.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Search
