import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/postList.module.scss"

import type { Frontmatter } from "../types/type"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder,
  faClock,
  faUndo,
  faTags,
  faCommentDots
} from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

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
              {!isDraft && (
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{ title }</span>
                </Link>
              )}
              {
                isDraft && (
                  <Link to={`/draft${post.fields.slug}`} itemProp="url">
                    <span itemProp="headline">{ title }</span>
                  </Link>
                )
              }
            </p>

            <ul className={Styles.date}>
              <li className={Styles.post}>
                <FontAwesomeIcon icon={faClock} />
                <time dateTime={post.frontmatter.postdate}>
                  {`${postY}年${postM}月${postD}日`}
                </time>
              </li>

              <li className={Styles.update}>
                <FontAwesomeIcon icon={faUndo} />
                <time dateTime={post.frontmatter.postdate}>
                  {`${updateY}年${updateM}月${updateD}日`}
                </time>
              </li>
            </ul>

            <p className={Styles.series}>
              <FontAwesomeIcon icon={faFolder} /> <span>シリーズ</span>
              <Link to={`/series/${post.frontmatter.seriesSlug}/page/1/`}>
                { post.frontmatter.seriesName }
              </Link>
            </p>

            <ul className={Styles.tags}>
              <li>
                <FontAwesomeIcon icon={faTags} /> <span>タグ</span>
                {post.frontmatter.tags.map((tag: string) => (
                  <Link
                    to={`/tag/${tag}/page/1/`}
                    key={tag}
                  >#{ tag }</Link>
                ))}
              </li>
            </ul>

            <p className={Styles.description}>
              <FontAwesomeIcon icon={faCommentDots} />
              { post.frontmatter.description }
            </p>
          </div>
        )
      })}
    </section>
  </div>
)

export default PostList
