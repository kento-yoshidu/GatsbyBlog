import React from "react"

const PageInfo = ({ currentPage, postCount, pageCount }) => {
	return (
		<>
			<div>{currentPage} / {pageCount}</div>
			<div>{postCount}県の記事</div>
		</>
	)
}

export default PageInfo