import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/postInfo.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUndo ,faFolder, faTags } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const PostInfo = ({
		postTitle,
		seriesSlug,
		seriesName,
		postdate,
		updatedate,
		tags
	}) => {

	const tag = tags.map(tag => {
		return (
			<p key={`tag${tag}`}>
				<Link
					to={`/tag/${tag}/page/1/`}
					key={`link${tag}`}
				>
				#{ tag }
				</Link>
			</p>
		)
	})

	return (
		<div class={Styles.postInfo}>

			<p className={Styles.series}>
				<FontAwesomeIcon icon={ faFolder } />
				<Link to={`/series/${seriesSlug}/page/1/`}>
					{ seriesName }
				</Link>
			</p>

			<h2 className={Styles.postTitle}>
				{postTitle}
			</h2>

			<div className={Styles.dateInfo}>
				<p>
					<FontAwesomeIcon icon={faClock} />{ postdate }
				</p>
				<p>
					<FontAwesomeIcon icon={faUndo} />{ updatedate }
				</p>
			</div>

			<div className={Styles.tags}>
				<FontAwesomeIcon icon={ faTags } />
				{ tag }
			</div>

		</div>
	)
}

export default PostInfo