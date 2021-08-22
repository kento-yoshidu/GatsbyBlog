import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/pagination.module.scss"

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
	let prevButton,
			nextButton

	prevButton = 
		<div>
			{!isFirst && (
				<Link
					className={Styles.prev}
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
	
	nextButton =
		<div>
			{!isLast && (
				<Link
					className={Styles.next}
					to={`/page/${currentPage + 1}`}
				>
					<span>Next</span>
          <FontAwesomeIcon icon={faChevronCircleRight} />
				</Link>
			)}

		</div>

	return (
		<div className={Styles.pagination}>
			{ prevButton }
			{ nextButton }
		</div>
	)

}

export default Pagination
