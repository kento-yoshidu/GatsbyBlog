import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

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
    
    // ヒットした記事がここに格納される
    const searchedResult = allKeywordSearchJson.edges.filter(({node}) => {
      return lowerCaseWords?.every((word) => {
        return node?.keywords?.toString().toLocaleLowerCase().includes(word)
      })
    })

    // 絞り込まれた記事一覧で更新する
    setFilteredPosts(searchedResult.length ? searchedResult : null)
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
    <>
      <input
        type="text"
        onChange={(e) => setInputtedWords(e.target.value)}
      />

      <ul>
        {filteredPosts && filteredPosts.map((post) => {
          return (
            <li style={{"fontSize": "140%"}}>
              <Link
                to={post.node.slug}
                key={post.node.slug}
              >
                {post.node.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

