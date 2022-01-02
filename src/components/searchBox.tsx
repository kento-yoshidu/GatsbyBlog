import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { SearchOutline } from 'react-ionicons'

import * as Styles from "../styles/search.module.scss"

type Edge = {
  node: {
    slug: string;
    keyword?: string[];
    title: string
  }
}

type Props = {
  title?: string;
  slug?: string
}

const ListItems: React.VFC<Props> = ({ title, slug }) => {
  return (
    <li>
      <Link to={slug}>
        {title}
      </Link>
    </li>
  )
}

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

  const edges: Edge[] = allSearchJson.edges

  // 検索ボックスに入力された文字列
  const [keyword, setKeyword] = useState<string>("")

  // 検索結果を表示するか否か
  const [showLists, setShowLists] = useState<boolean>(false)

  // 条件によって絞り込まれた記事
  const [filteredPosts, setFilteredPosts] = useState<Edge[] | null>(edges)

  useEffect(() => {
    if (keyword === "") {
      setFilteredPosts(edges)
      return
    }

    const searchKeywords = keyword
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

    const searchedResult: Edge[] = []

    // TODO: リファクタリング
    edges.filter((edge) => {
      searchKeywords?.every((kw) => {
        edge.node.keyword?.some((key) => {
          if (key.toLocaleLowerCase().indexOf(kw) !== -1) {
            if(searchedResult.indexOf(edge) === -1) {
              searchedResult.push(edge)
            }
          }
        })
      })
    })

    setFilteredPosts(searchedResult.length ? searchedResult : null)
  },[keyword])

  return (
    <ul className={Styles.wrapper}>
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
          onChange={(e) => setKeyword(e.target.value)}
          onClick={() => setShowLists(true)}
        />

        <div className={Styles.slugList}>
          {showLists && typeof filteredPosts !== "string" && filteredPosts &&
            <ul>
              <p>キーワード検索</p>
              <p><span>{filteredPosts.length}件</span>の記事がヒットしました。</p>
              {
                filteredPosts.map((edge: Edge, i: number) => {
                  return (
                    <ListItems
                      key={`key${i}`}
                      title={edge.node.title}
                      slug={edge.node.slug}
                    />
                  )
                })
              }
            </ul>
          }
        </div>
      </div>
    </ul>
  )
}

export default Search
