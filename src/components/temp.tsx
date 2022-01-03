import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

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

  // フォームに入力された文字列を保持するフック
  const [inputtedKeyword, setInputtedKeyword] = useState("")

  // 条件によって絞り込まれた記事を保持するフック
  const [filteredPosts, setFilteredPosts] = useState(null)

  useEffect(() => {
    const searchKeywords = inputtedKeyword
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

  }, [inputtedKeyword])

  return (
    <input
      type="text"
      onChange={(e) => setInputtedKeyword(e.target.value)}
    />
  )
}

export default Search
