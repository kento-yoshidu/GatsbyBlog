import React, { useDebugValue } from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
          faAngleLeft,
          faAngleDoubleLeft,
          faAngleRight,
          faAngleDoubleRight
        } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const MobilePagination = ({
	isFirst,
	isLast,
	currentPage,
	pageCount
}) => {

	let topButton,
			lastButton,
			prevButton,
			nextButton

	if(!isFirst) {
		topButton =
			<Link
				to={`/page/1/`}
				className="topButton"
			>
				<FontAwesomeIcon icon={faAngleDoubleLeft} />
			</Link>

		prevButton =
		<Link
			className="prev-button"
			to={`/page/${currentPage - 1}/`}
			rel = "prev"
		>
			<FontAwesomeIcon icon={faAngleLeft} />
		</Link>
	} else if (!isLast) {
		lastButton =
			<Link
				to={`/page/${pageCount}/`}
				className="topButton"
			>
				<FontAwesomeIcon icon={faAngleDoubleRight} />
			</Link>

		nextButton =
      <Link
        className="next-button"
        to={`/page/${currentPage + 1}/`}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Link>
	}

	return (
		<div>
			{ topButton }
			{ prevButton }
			{ nextButton }
			{ lastButton }
		</div>
	)
}

export default MobilePagination