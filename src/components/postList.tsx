import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/postList.module.css"

import type { Frontmatter } from "../types/type"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder,
  faClock,
  faUndo,
  faTags,
  faCommentDots
} from "@fortawesome/free-solid-svg-icons"

interface Node {
  fields: {
    slug: string;
  }
  frontmatter: Frontmatter
}

interface Props {
  postData: {
    nodes: Node[]
  },
  isDraft: boolean
}

const PostList: React.VFC<Props> = ({ postData, isDraft }) => (
  <div className="load-animation">
    <section className={Styles.postList}>
      {postData.nodes.map((post: Node) => {
        const title = post.frontmatter.title || post.fields.slug

        const [postY, postM, postD] = post.frontmatter.postdate.split("-")
        const [updateY, updateM, updateD] = post.frontmatter.update.split("-")

        return (
          <div
            className={Styles.postItem}
            itemScope
            itemType="http://schema.org/Article"
            key={`${post.fields}key`}
          >
            <p className={Styles.postTitle}>
              <Link
                className={Styles.postLink}
                to={post.fields.slug}
              >
                { title }
              </Link>
            </p>

            <ul className={Styles.date}>
              <li className={Styles.post}>
                <FontAwesomeIcon
                  icon={faClock}
                  className={Styles.svg}
                />
                <time dateTime={post.frontmatter.postdate}>
                  {`${postY}年${postM}月${postD}日`}
                </time>
              </li>

              <li className={Styles.update}>
                <FontAwesomeIcon
                  className={Styles.svg}
                  icon={faUndo}
                />
                <time dateTime={post.frontmatter.postdate}>
                  {`${updateY}年${updateM}月${updateD}日`}
                </time>
              </li>
            </ul>

            <p className={Styles.series}>
              <FontAwesomeIcon
                className={Styles.svg}
                icon={faFolder}
              />

              <Link to={`/series/${post.frontmatter.seriesSlug}/page/1/`}>
                { post.frontmatter.seriesName }
              </Link>
            </p>

            <ul className={Styles.tags}>
              <li>
                <FontAwesomeIcon
                  className={Styles.svg}
                  icon={faTags}
                />
                {post.frontmatter.tags.map((tag: string) => (
                  <Link
                    to={`/tag/${tag}/page/1/`}
                    key={tag}
                  >#{ tag }</Link>
                ))}
              </li>
            </ul>

            <p className={Styles.description}>
              <FontAwesomeIcon
                className={Styles.svg}
                icon={faCommentDots}
              />
              { post.frontmatter.description }
            </p>
          </div>
        )
      })}
    </section>
  </div>
)

export default PostList
