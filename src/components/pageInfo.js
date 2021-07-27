import React from "react"

import * as Styles from "../styles/pageinfo.module.scss"

const PageInfo = ({ currentPage, postCount, pageCount }) => {
	return (
    <div class={Styles.countInfo}>
      <p className={Styles.page}><span>{postCount}</span> 件の記事</p>
      <p className={Styles.page}><span>{pageCount}</span> ページ中 / <span>{currentPage}</span> ページ目</p>
    </div>
	)
}

export default PageInfo