import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/postInfo.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faUndo, faFolder, faTags, faCommentDots } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

type Props = {
  title: string,
  seriesSlug: string,
  seriesName: string,
  postdate: string,
  update: string,
  tags: string[],
  description: string
}

const PostInfo = ({
  title,
  seriesSlug,
  seriesName,
  postdate,
  update,
  tags,
  description
}: Props) => {
  const [postY, postM, postD] = postdate.split("-")
  const [updateY, updateM, updateD] = update.split("-")

  return (
    <div className={Styles.postInfo}>

      <h2 className={Styles.postTitle}>
        {title}
      </h2>

      <ul className={Styles.dateInfo}>
        <li className={Styles.listItem}>
          <FontAwesomeIcon
            icon={faClock}
            className={Styles.svg}
          />
          <time dateTime={postdate}>
            {`${postY}年${postM}月${postD}日`}
          </time>
        </li>

        <li>
          <FontAwesomeIcon
            icon={faUndo}
            className={Styles.svg}
          />
          <time dateTime={update}>
            {`${updateY}年${updateM}月${updateD}日`}
          </time>
        </li>
      </ul>

      <p className={Styles.series}>
        <FontAwesomeIcon
          icon={ faFolder }
          className={Styles.svg}
        />
        <Link to={`/series/${seriesSlug}/page/1/`}>
          { seriesName }
        </Link>
      </p>

      <ul className={Styles.tags}>
        <FontAwesomeIcon
          icon={ faTags }
          className={Styles.svg}
        />

        {tags?.map((tag: string) => (
          <li key={`tag${tag}`} className={Styles.listItem}>
            <Link
              to={`/tag/${tag}/page/1/`}
              key={`link${tag}`}
            >
              #{ tag }
            </Link>
          </li>
        ))}
      </ul>

      <div className={Styles.description}>
        <FontAwesomeIcon
          icon={faCommentDots}
          className={Styles.svg}
        />
        { description }
      </div>
    </div>
  )
}

export default PostInfo
