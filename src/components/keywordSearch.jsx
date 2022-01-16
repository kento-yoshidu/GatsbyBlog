import React, {useState, useEffect} from "react"
import { useStaticQuery, graphql } from "gatsby"

export const KeywordSearch = () => {
  // フォームに入力された文字列を保持するState
  const [inputtedWords, setInputtedWords] = useState("")

  // 条件によって絞り込まれた記事を保持するState
  const [filteredPosts, setFilteredPosts] = useState(null)

  // フォームに文字列が入力されるたびに実行される
  useEffect(() => {
    // 入力されたキーワードを小文字に変換する
    const lowerCaseWords = inputtedWords
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)
    
    console.log(lowerCaseWords)

  }, [inputtedWords])

  const { allKeywordSearchJson } = useStaticQuery(
    graphql`
      {
        allKeywordSearchJson(skip: 3) {
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

  return (
    <input
      type="text"
      onChange={(e) => setInputtedWords(e.target.value)}
    />
  )
}

