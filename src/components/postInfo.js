import React from "react"
import { Link } from "gatsby"

const PostInfo = ({
		postTitle
}) => {
	return (
		<div class="PostInfo">
			<h2 className="PostTitle">
				{postTitle}
			</h2>
		</div>
	)
}

export default PostInfo