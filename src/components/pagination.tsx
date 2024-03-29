import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/pagination.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons"

type Props = {
  isFirst: boolean,
  isLast: boolean,
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
  const prevButton = <>
    {!isFirst &&
      !tag && !series && (
      <Link
        className={Styles.prev}
        to={
          currentPage === 2
            ? "/page/1/"
            : `/page/${currentPage - 1}/`
        }
        rel="prev"
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
        <span>Prev</span>
      </Link>
    )}
    {!isFirst &&
      tag && !series && (
      <Link
        className={Styles.prev}
        to={
          currentPage === 2
            ? `/tag/${tag}/page/1/`
            : `/tag/${tag}/page/${currentPage - 1}/`
        }
        rel="prev"
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
        <span>Prev</span>
      </Link>
    )}
    {!isFirst &&
      !tag && series && (
      <Link
        className={Styles.prev}
        to={
          currentPage === 2
            ? `/series/${series}/page/1/`
            : `/series/${series}/page/${currentPage - 1}/`
        }
        rel="prev"
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
        <span>Prev</span>
      </Link>
    )}
  </>

  const nextButton = <>
    {!isLast && !tag && !series && (
      <Link
        className={Styles.next}
        to={`/page/${currentPage + 1}/`}
      >
        Next
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </Link>
    )}
    {!isLast && tag && !series && (
      <Link
        className={Styles.next}
        to={`/tag/${tag}/page/${currentPage + 1}/`}
      >
        <span>Next</span>
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </Link>
    )}
    {!isLast && !tag && series && (
      <Link
        className={Styles.next}
        to={`/series/${series}/page/${currentPage + 1}/`}
      >
        <span>Next</span>
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </Link>
    )}
  </>

  const nationLinks =
  <div className={Styles.nationLinks}>
    {Array.from({ length: pageCount }, (_, i) => (
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
                <Link to={`/tag/${tag}/page/${i + 1}/`}>
                  {i + 1}
                </Link>
            }
            {
              !tag && series &&
                <Link to={`/series/${series}/page/${i + 1}/`}>
                  {i + 1}
                </Link>
            }
          </p>
        }
      </div>
    ))}
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
