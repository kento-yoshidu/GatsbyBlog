import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
          faChevronCircleLeft,
          faChevronCircleRight
        } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Pagination = ({
	isFirst,
	isLast,
	currentPage
}) => {
	let prevButton

	prevButton = 
		<div>
			{!isFirst && (
				<Link
					className="prev"
					to={
						currentPage === 2
							? `/page/1/`
							: `/page/${currentPage - 1}/`
					}
					rel="prev"
				>
					<FontAwesomeIcon icon={faChevronCircleLeft} />
					<span>Prev</span>
				</Link>
			)}
		</div>

	return (
		<div className="pagination">
			{ prevButton }
		</div>
	)

}

export default Pagination
