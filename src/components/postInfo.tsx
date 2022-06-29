import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/postInfo.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faUndo, faFolder, faTags, faCommentDots } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

interface Props {
  postTitle?: string
  seriesSlug?: string
  seriesName?: string
  postdate?: string
  update?: string
  series?: string
  tags?: string[]
  description?: string
}

const PostInfo: React.VFC<Props> = ({
  postTitle,
  seriesSlug,
  seriesName,
  postdate,
  update,
  tags,
  description
}) => {
  const tag = tags?.map((tag: string) => (
    <li key={`tag${tag}`}>
      <Link
        to={`/tag/${tag}/page/1/`}
        key={`link${tag}`}
      >
        #{ tag }
      </Link>
    </li>
  ))

  return (
    <div className={Styles.postInfo}>

      <p className={Styles.series}>
        <FontAwesomeIcon icon={ faFolder } />
        <Link to={`/series/${seriesSlug}/page/1/`}>
          { seriesName }
        </Link>
      </p>

      <h2 className={Styles.postTitle}>
        {postTitle}
      </h2>

      <ul className={Styles.dateInfo}>
        <li>
          <FontAwesomeIcon icon={faClock} />
          <time>{ postdate }</time>
        </li>
        <li>
          <FontAwesomeIcon icon={faUndo} />{ update }
        </li>
      </ul>

      <ul className={Styles.tags}>
        <FontAwesomeIcon icon={ faTags } />
        { tag }
      </ul>

      <div className={Styles.description}>
        <FontAwesomeIcon icon={faCommentDots} />
        { description }
      </div>

    </div>
  )
}

export default PostInfo
