import React /*, { useDebugValue }*/ from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/MobilePagination.module.scss"

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
				className={Styles.topButton}
			>
				<FontAwesomeIcon icon={faAngleDoubleLeft} />
			</Link>

		prevButton =
		<Link
			className={Styles.prevButton}
			to={`/page/${currentPage - 1}/`}
			rel="prev"
		>
			<FontAwesomeIcon icon={faAngleLeft} />
		</Link>
	} else if (!isLast) {
		lastButton =
			<Link
				to={`/page/${pageCount}/`}
				className={Styles.lastButton}
			>
				<FontAwesomeIcon icon={faAngleDoubleRight} />
			</Link>

		nextButton =
      <Link
        to={`/page/${currentPage + 1}/`}
        className={Styles.nextButton}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Link>
	}

	return (
		<div className={Styles.mobilePagination}>
			{ topButton }
			{ prevButton }
			{ nextButton }
			{ lastButton }
		</div>
	)
}

export default MobilePagination