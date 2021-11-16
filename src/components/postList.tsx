import * as React from "react"
import { Link } from "gatsby"

const Styles = require("../styles/pages.module.scss")

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFolder,
          faClock,
          faUndo,
          faTags,
          faCommentDots
        } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { decodedTextSpanIntersectsWith } from "typescript";
config.autoAddCss = false

type Props = {
  postData: {
    allMarkdownRemark: {
      nodes: {
        id: string,
      }
    }
  }
}

const PostList: React.VFC<Props> = ({postData}) => (
  <div className="LoadAnimation">
    <section className={Styles.postList}>
      {postData.nodes.map((post) => {
        const title = post.frontmatter.title || post.fields.slug

        return (
          <div key={post.id}
            className={Styles.postItem}
            itemScope
            itemType="http://schema.org/Article"
          >
            <p className={Styles.postTitle}>
              <Link to={post.fields.slug} itemProp="url">
                <span itemProp="headline">{ title }</span>
              </Link>
            </p>

            <div className={Styles.postInfo}>
              <div className={Styles.date}>
                <p className={Styles.post}><FontAwesomeIcon icon={faClock} />{post.frontmatter.postdate}</p>
                <p className={Styles.update}><FontAwesomeIcon icon={faUndo} />{post.frontmatter.updatedate}</p>
              </div>

              <p className={Styles.series}>
                <FontAwesomeIcon icon={faFolder} /> <span>シリーズ</span>
                <Link to={`/series/${post.frontmatter.seriesSlug}/page/1/`}>
                  { post.frontmatter.seriesName }
                </Link>
              </p>

              <p className={Styles.tags}>
                <FontAwesomeIcon icon={faTags} /> <span>タグ</span>
                {post.frontmatter.tags.map((tag) => (
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
          </div>
        )
      })}
    </section>
  </div>
)

export default PostList