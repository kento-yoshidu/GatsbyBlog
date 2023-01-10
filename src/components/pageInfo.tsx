import React from "react"

import * as Styles from "../styles/pageinfo.module.css"

type Props = {
  currentPage: number,
  postCount: number,
  pageCount: number
}

const PageInfo: React.VFC<Props> = ({ currentPage, postCount, pageCount }) => {
  return (
    <div className={Styles.countInfo}>
      <p className={Styles.page}>全 <span>{postCount}</span> 件の記事</p>
      <p className={Styles.page}><span>{pageCount}</span> ページ中 / <span>{currentPage}</span> ページ目</p>
    </div>
  )
}

export default PageInfo
