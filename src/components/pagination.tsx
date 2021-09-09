import React from "react"
import { Link } from "gatsby"

const Styles = require("../styles/pagination.module.scss")

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
          faChevronCircleLeft,
          faChevronCircleRight
        } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

type Props = {
	isFirst: number,
	isLast: number,
	currentPage: number,
	pageCount: number,
	tag?: string,
	series?: string
}

const Pagination: React.VFC<Props> = ({
	isFirst,
	isLast,
	currentPage,
	pageCount,
	tag,
	series
}) => {
	let prevButton,
			nextButton,
			nationLinks

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

	nationLinks =
		<div className={Styles.nationLinks}>
			{Array.from({ length: pageCount }, (_, i) => {
				return (
					<div
						className={Styles.items}
						key={`page_${i}`}
					>
						{i + 1 === currentPage
							? <p className={Styles.text}>{ i + 1 }</p>
							: <p className={Styles.link}>
								{
									!tag && !series &&
									<Link to={`/page/${i + 1}/`}>
										{i + 1}
									</Link>
								}
								{
									tag && !series &&
									<Link to={`${tag}/page/${i + 1}/`}>
										{i + 1}
									</Link>
								}
								</p>
						}
					</div>
				)
			})}
		</div>

	return (
		<div className={Styles.pagination}>
			{ prevButton }
			{ nationLinks }
			{ nextButton }
		</div>
	)

}

export default Pagination
