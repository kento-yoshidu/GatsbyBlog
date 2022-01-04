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
  const [inputtedKeywords, setInputtedKeywords] = useState("")

  // 条件によって絞り込まれた記事を保持するフック
  const [filteredPosts, setFilteredPosts] = useState(null)

  useEffect(() => {
    const lowerCaseKeywords = inputtedKeywords
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

    const searchResult = []

    allSearchJson.edges.forEach((edge) => {
      lowerCaseKeywords?.forEach((kw) => {
        edge.node.keywords?.forEach((postsKeyword) => {
          if (postsKeyword.toLocaleLowerCase().indexOf(kw) !== -1) {
            if(searchResult.indexOf(edge) === -1) {
              searchResult.push(edge)
            }
          }
        })
      })
    })
  }, [inputtedKeywords])


  return (
    <input
      type="text"
      onChange={(e) => setInputtedKeywords(e.target.value)}
    />
  )
}

export default Search
