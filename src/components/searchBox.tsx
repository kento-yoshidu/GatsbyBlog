import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { KeyOutline, SearchOutline } from 'react-ionicons'

import * as Styles from "../styles/search.module.scss"

type Edge = {
  node: {
    slug: string;
    keywords?: string[];
    title: string
  }
}

const Search: React.VFC = () => {
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

  const edges: Edge[] = allSearchJson.edges

  // 検索ボックスに入力された文字列
  const [inputtedKeywords, setInputtedKeywords] = useState<string>("")

  // 検索結果を表示するか否か
  const [showLists, setShowLists] = useState<boolean>(false)

  // 条件によって絞り込まれた記事
  const [filteredPosts, setFilteredPosts] = useState<Edge[] | null>(edges)

  useEffect(() => {
    if (inputtedKeywords === "") {
      setFilteredPosts(edges)
      return
    }

    const lowerCaseKeywords = inputtedKeywords
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

    const searchedResult: Edge[] = []

    // TODO: リファクタリング
    edges.forEach((edge) => {
      lowerCaseKeywords?.forEach((kw) => {
        edge.node.keywords?.forEach((postsKeyword) => {
          if (postsKeyword.toLocaleLowerCase().indexOf(kw) !== -1) {
            if(searchedResult.indexOf(edge) === -1) {
              searchedResult.push(edge)
            }
          }
        })
      })
    })
    
    /*
    const searchedResult = edges.filter(({node}) => {
      return lowerCaseKeywords?.every((keyword) => {
        console.log(node.keywords?.indexOf(keyword))
        return node?.keywords?.indexOf(keyword) != -1
      })
    })

    console.log(searchedResult)
    */

    setFilteredPosts(searchedResult.length ? searchedResult : null)
  },[inputtedKeywords])

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
          onChange={(e) => setInputtedKeywords(e.target.value)}
          onClick={() => setShowLists(true)}
        />

        <div className={Styles.resultArea}>
          {showLists && filteredPosts &&
            <div className={Styles.inner}>
              <p>キーワード検索</p>
              <p><span>{filteredPosts.length}件</span>の記事がヒットしました。</p>
              {
                filteredPosts.map((edge: Edge, i: number) => {
                  return (
                    <li
                      key={`key${i}`}
                    >
                      <Link to={edge.node.slug}>
                        {edge.node.title}
                      </Link>
                    </li>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Search
