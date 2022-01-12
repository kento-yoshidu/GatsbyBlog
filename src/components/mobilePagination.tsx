import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/mobilePagination.module.scss"

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

type Props = {
  isFirst: boolean,
  isLast: boolean,
  currentPage: number,
  pageCount: number,
  series?: string,
  tag?: string,
}

const MobilePagination: React.VFC<Props> = ({
  isFirst,
  isLast,
  currentPage,
  pageCount,
  tag,
  series
}) => {

  let topButton,
      topPath,
      lastButton,
      lastPath,
      prevButton,
      prevPath,
      nextButton,
      nextPath

  if(!isFirst) {
    if (!tag && !series) {
      topPath = `/page/1/`
      prevPath = `/page/${currentPage - 1}/`
    } else if (series) {
      topPath = `/series/${series}/page/1/`
      prevPath = `/series/${series}/page/${currentPage - 1}/`
    } else if (tag) {
      topPath = `/tag/${tag}/page/1/`
      prevPath = `/tag/${tag}/page/${currentPage - 1}/`
    }

    topButton =
      <Link
        to={topPath}
        className={Styles.topButton}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </Link>

    prevButton =
      <Link
        to={prevPath}
        className={Styles.prevButton}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Link>
  }

  if(!isLast) {
    if (!series && !tag) {
      lastPath = `/page/${pageCount}`
      nextPath = `/page/${currentPage + 1}`
    } else if (series) {
      lastPath = `/series/${series}/page/${pageCount}/`
      nextPath = `/series/${series}/page/${currentPage + 1}`
    } else if (tag) {
      lastPath = `/tag/${tag}/page/${pageCount}/`
      nextPath = `/tag/${tag}/page/${currentPage + 1}`
    }

    lastButton = 
      <Link
        to={lastPath}
        className={Styles.lastButton}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </Link>
      
    nextButton =
      <Link
        to={nextPath}
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