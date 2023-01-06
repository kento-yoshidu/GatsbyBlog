import React, { useState, useEffect, useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { SearchOutline } from "react-ionicons"

import * as Styles from "../styles/search.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

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

  // 条件によって絞り込まれた記事
  const [filteredPosts, setFilteredPosts] = useState<Edge[] | null>(edges)

  const dialogOpen = () => {
    ref?.current?.showModal()
  }

  const dialogClose = () => {
    ref?.current?.close()
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputtedKeywords(e.target.value)
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    // 何も入力されていない時は全ての記事を表示
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
      <button
        className={Styles.menuBtn}
        onClick={dialogOpen}
      >
        {/*
        <SearchOutline
          width="38px"
          height="38px"
        />
  */}
        <FontAwesomeIcon
          icon={faSearchPlus}
        />
      </button>

      <dialog
        ref={ref}
        className={Styles.dialog}
        onClick={dialogClose}
      >
        <div
          className={Styles.inner}
          onClick={stopPropagation}
        >
          <input
            type="text"
            className={Styles.input}
            onChange={handleInput}
          />

          <p className={Styles.message}>キーワード検索
            {filteredPosts !== null
              ? (
                <span>{filteredPosts?.length}件</span>
              ) : (
                <span>0件</span>
              )}
            の記事がヒットしました。
          </p>

          <ul className={Styles.resultArea}>
            {
              filteredPosts?.map((edge: Edge, i: number) => (
                <PostList
                  key={`key${i}`}
                  slug={edge.node.slug}
                  title={edge.node.title}
                />
              ))
            }
          </ul>

          <button
            className={Styles.closeButton}
            onClick={dialogClose}
          >
          </button>
        </div>
      </dialog>
    </div>
  )
}

export default Search
