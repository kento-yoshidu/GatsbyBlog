import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { SearchOutline } from 'react-ionicons'

import * as Styles from "../styles/search.module.scss"

interface Edge {
  node: {
    slug: string;
    keywords?: string[];
    title: string;
  }
}

const PostList = React.memo(({ key, slug, title}: { key: string, slug: string, title: string }) => {
  console.log("rendering!")
  return (
    <li
      key={key}
    >
      <Link to={slug}>
        {title}
      </Link>
    </li>
  )
})

const Search: React.VFC = () => {
  const { allKeywordSearchJson } = useStaticQuery(
    graphql`
      query {
        allKeywordSearchJson {
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

  const edges: Edge[] = allKeywordSearchJson.edges

  // 検索ボックスに入力された文字列
  const [inputtedKeywords, setInputtedKeywords] = useState<string>("")

  // 検索結果を表示するか否か
  const [showLists, setShowLists] = useState<boolean>(false)

  // 条件によって絞り込まれた記事
  const [filteredPosts, setFilteredPosts] = useState<Edge[] | null>(edges)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputtedKeywords(e.target.value)
  }

  useEffect(() => {
    if (inputtedKeywords === "") {
      setFilteredPosts(edges)
      return
    }

    // 入力された文字列をspaceごとに配列に格納
    const lowerCaseKeywords: string[] | null = inputtedKeywords
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

    const searchedResult: Edge[] = edges.filter(({node}) => {
      return lowerCaseKeywords?.every((keyword) => {
        return node?.keywords?.toString().toLocaleLowerCase().includes(keyword)
      })
    })

    setFilteredPosts(searchedResult.length ? searchedResult : null)
  }, [inputtedKeywords])

  return (
    <div className={Styles.wrapper}>
      <input
        type="checkbox"
        className={Styles.check}
        id="checked"
      />

      <label className={Styles.menuBtn} htmlFor="checked">
        <SearchOutline
          color={'#00000'}
          width="30px"
          height="30px"
        />
      </label>

      <div className={Styles.list}>
        <input
          type="text"
          onChange={handleInput}
          onClick={() => setShowLists(true)}
        />

        <div className={Styles.resultArea}>
          {showLists && filteredPosts &&
            <div className={Styles.inner}>
              <p>キーワード検索</p>
              <p><span>{filteredPosts.length}件</span>の記事がヒットしました。</p>
              <ul>
                {
                  filteredPosts.map((edge: Edge, i: number) => (
                    <PostList
                      key={`key${i}`}
                      slug={edge.node.slug}
                      title={edge.node.title}
                    />
                    /*
                    return (
                      <li
                        key={`key${i}`}
                      >
                        <Link to={edge.node.slug}>
                          {edge.node.title}
                        </Link>
                      </li>
                    )
                    */
                  ))
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Search
