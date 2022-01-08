import * as React from "react"
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
      lastButton,
      prevButton,
      nextButton

  if (!isFirst) {
    if(!tag && !series) {
      topButton =
        <Link
          to={`/page/1/`}
          className={Styles.topButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Link>
    } else if (tag && !series) {
      topButton =
        <Link
          to={`/tag/${tag}/page/1/`}
          className={Styles.topButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Link>
    } else if (!tag && series) {
      topButton =
        <Link
          to={`/series/${series}/page/1/`}
          className={Styles.topButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Link>
    }

    if(!tag && !series) {
      prevButton =
        <Link
          className={Styles.prevButton}
          to={`/page/${currentPage - 1}/`}
          rel="prev"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
    } else if (series && !tag) {
      prevButton =
        <Link
          className={Styles.prevButton}
          to={`/series/${series}/page/${currentPage - 1}/`}
          rel="prev"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
    } else if (!series && tag) {
      prevButton =
        <Link
          className={Styles.prevButton}
          to={`/tag/${tag}/page/${currentPage - 1}/`}
          rel="prev"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
    }
  }	

  if(!isLast) {
    if(!tag && !series) {
      lastButton =
        <Link
          to={`/page/${pageCount}/`}
          className={Styles.lastButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Link>
    } else if (series && !tag) {
      lastButton =
        <Link
          to={`/series/${series}/page/${pageCount}/`}
          className={Styles.lastButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Link>
    } else if (!series && tag) {
      lastButton =
        <Link
          to={`/tag/${tag}/page/${pageCount}/`}
          className={Styles.lastButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Link>
    }

    if(!tag && !series) {
      nextButton =
        <Link
          to={`/page/${currentPage + 1}/`}
          className={Styles.nextButton}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
    } else if (series && !tag) {
      nextButton =
        <Link
          to={`/series/${series}/page/${currentPage + 1}/`}
          className={Styles.nextButton}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
    } else if (!series && tag) {
      nextButton =
        <Link
          to={`/tag/${tag}/page/${currentPage + 1}/`}
          className={Styles.nextButton}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
    }
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