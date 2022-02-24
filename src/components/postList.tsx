import React from "react"
import { Link } from "gatsby"

import * as Styles from "../styles/postList.module.scss"

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
  frontmatter: {
    postdate: string;
    description: string;
    seriesName: string;
    seriesSlug: string;
    tags: string[];
    title: string;
    update: string;
  }
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

            <div className={Styles.date}>
              <p className={Styles.post}><FontAwesomeIcon icon={faClock} />{post.frontmatter.postdate}</p>
              <p className={Styles.update}><FontAwesomeIcon icon={faUndo} />{post.frontmatter.update}</p>
            </div>

            <p className={Styles.series}>
              <FontAwesomeIcon icon={faFolder} /> <span>シリーズ</span>
              <Link to={`/series/${post.frontmatter.seriesSlug}/page/1/`}>
                { post.frontmatter.seriesName }
              </Link>
            </p>

            <p className={Styles.tags}>
              <FontAwesomeIcon icon={faTags} /> <span>タグ</span>
              {post.frontmatter.tags.map((tag: string) => (
                <Link
                  to={`/tag/${tag}/page/1/`}
                  key={`${tag}`}
                >#{ tag }</Link>
              ))}
            </p>

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
