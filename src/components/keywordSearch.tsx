import React, { useState, useEffect, useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { SearchOutline } from "react-ionicons"

import * as Styles from "../styles/search.module.scss"

interface Edge {
  node: {
    slug: string;
    keywords?: string[];
    title: string;
  }
}

const PostList = React.memo((
  { key, slug, title }:
  { key: string, slug: string, title: string }
) => (
  <li
    key={key}
    className={Styles.listItem}
  >
    <Link to={slug}>
      {title}
    </Link>
  </li>
))

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

  const ref = useRef<HTMLDialogElement | null>(null)

  // 検索ボックスに入力された文字列
  const [inputtedKeywords, setInputtedKeywords] = useState<string>("")

  // 検索結果を表示するか否か
  const [showLists, setShowLists] = useState<boolean>(false)

  // 条件によって絞り込まれた記事
  const [filteredPosts, setFilteredPosts] = useState<Edge[] | null>(edges)

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowLists(!showLists)
    ref?.current?.showModal()
  }

  const handleCloseClick = () => {
    setShowLists(false)
    ref?.current?.close()
  }

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

    const searchedResult: Edge[] = edges.filter(({ node }) => {
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
        onClick={handleClick}
      />

      <label
        className={Styles.menuBtn}
        htmlFor="checked"
      >
        <SearchOutline
          width="27px"
          height="27px"
        />
      </label>

      <dialog
        ref={ref}
        className={Styles.list}
      >
        <input
          type="text"
          className={Styles.input}
          onChange={handleInput}
        />

        <div className={Styles.resultArea}>
          {showLists && filteredPosts &&
            <div className={Styles.inner}>
              <p>キーワード検索 <span>{filteredPosts.length}件</span>の記事がヒットしました。</p>

              <ul>
                {
                  filteredPosts.map((edge: Edge, i: number) => (
                    <PostList
                      key={`key${i}`}
                      slug={edge.node.slug}
                      title={edge.node.title}
                    />
                  ))
                }
              </ul>
            </div>
          }
        </div>

        <button onClick={handleCloseClick}>CLOSE</button>
      </dialog>
    </div>
  )
}

export default Search
