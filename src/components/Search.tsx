import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { SearchOutline } from 'react-ionicons'

import * as Styles from "../styles/search.module.scss"

type Edge = {
  node: {
    slug: string;
    tags: string[];
    title: string
  }
}

/*
const products2: Post[] = [
  {
    "item": "Apple",
    "slug": "AppleSlug"
  },
  {
    "item": "Banana",
    "slug": "BananaSlug"
  },
  {
    "item": "Lemon",
    "slug": "LemonSlug"
  },
];
*/

const ListItems = ({title}: { title: string | null}) => {
  return (
  <>
    {title
      ?  <li>{title}</li>
      : <p>Not Found</p>
    }
  </>
  )
}

const Search = () => {
  const { allSearchJson } = useStaticQuery(
    graphql`
      query {
        allSearchJson {
          edges {
            node {
              tags
              slug
              title
            }
          }
        }
      }
    `
  )


  const edges: Edge = allSearchJson.edges

  // 検索ボックスに入力された文字列
  const [keyword, setKeyword] = useState<string>("")

  // 検索結果を表示するか否か
  const [showLists, setShowLists] = useState<boolean>(false)

  // 条件によって絞り込まれた記事
  const [filteredPosts, setFilteredPosts] = useState<Edge | string | null>(edges)

  console.log(filteredPosts)

  useEffect(() => {
    if (keyword === "") {
      setFilteredPosts("入力して下さい。")
      return
    }

    const searchKeywords = keyword
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

    const result = edges.filter(edge => {
      return searchKeywords?.every((kw) => edge.node.title.toLowerCase().indexOf(kw) !== -1) 
    })

    setFilteredPosts(result.length ? result : null)
  },[keyword])

  return (
    <>
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
            onChange={(e) => setKeyword(e.target.value)}
            onClick={() => setShowLists(true)}
          />

          <div className="slugList">
            {showLists && typeof filteredPosts !== "string" && filteredPosts &&
              filteredPosts.map((v: any, i: number) => {
                console.log("v = ", v)
                return (
                  <ListItems key={i} title={v.node.title} />)
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Search

/*
import React, { useState, useEffect } from "react"

import { SearchOutline } from 'react-ionicons'

import * as Styles from "./styles.module.scss"

type Products2 = {
  item: string;
  slug: string;
}

const products2: Products2[] = [
  {
    "item": "Apple",
    "slug": "AppleSlug"
  },
  {
    "item": "Banana",
    "slug": "BananaSlug"
  },
  {
    "item": "Lemon",
    "slug": "LemonSlug"
  },
];


const ListItems = ({slug}: { slug: string | null}) => (
  <>
    {slug
      ?  <li>{slug}</li>
      : <p>Not Found</p>
    }
  </>
)

const SearchTextField = () => {
  const [keyword, setKeyword] = useState("")
  const [showLists, setShowLists] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<Products2[] | string | null>(null)

  useEffect(() => {
    if (keyword === "") {
      setFilteredProducts("入力して下さい。")
      return
    }

    const searchKeywords = keyword
      .trim()
      .toLocaleLowerCase()
      .match(/[^\s]+/g)

    const result = products2.filter(product => {
      return searchKeywords?.every((kw) => product.item.toLowerCase().indexOf(kw) !== -1) 
    })

    setFilteredProducts(result.length ? result : null)
  },[keyword])

  return (
    <>
      <div className={Styles.wrapper}>
        <input
          type="checkbox"
          className={Styles.check}
          id="checked"
        />

        <label className="menuBtn" htmlFor="checked">
          <SearchOutline
            color={'#00000'}
          />
        </label>

        <div className={Styles.list}>
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            onClick={() => setShowLists(true)}
          />

          <div className={Styles.slugList}>
            {showLists && typeof filteredProducts !== "string" && filteredProducts &&
              filteredProducts.map((v: any, i: number) => {
                return (
                  <ListItems key={i} slug={v.slug} />)
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

const App = () => (
  <SearchTextField />
)

export default App
*/