import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

const Search = () => {
  const { allSearchJson } = useStaticQuery(
    graphql`
      query {
        allSearchJson {
          edges {
            node {
              keyword
              slug
              title
            }
          }
        }
      }
    `
  )

  // フォームに入力された文字列を保持するフック
  const [inputedKeyword, setInputedKeyword] = useState("")

  // 条件によって絞り込まれた記事を保持するフック
  const [filteredPosts, setFilteredPosts] = useState(null)

  useEffect(() => {
    const searchKeywords = inputedKeyword
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

  }, [inputedKeyword])

  return (
    <input
      type="text"
      onChange={(e) => setInputedKeyword(e.target.value)}
    />
  )
}

export default Search
