import React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"
import PageInfo from "../components/pageInfo"

import * as Styles from "../styles/pages.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFolder,
          faClock,
          faUndo,
          faTags,
        } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false


const ArticleList = ({ data, pageContext }) => {
	const postData = data.postData;

  return (
    <>
      <Header
        pageTitle="記事一覧"
        isTopPage={true}
      />

      <PageInfo
        currentPage={pageContext.currentPage}
        postCount={pageContext.postCount}
        pageCount={pageContext.pageCount}
      />

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
                    <FontAwesomeIcon icon={faFolder} /> シリーズ
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
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}

export default ArticleList

export const pageQuery = graphql`
  query(
    $limit: Int!,
    $skip: Int!
    ) {
      siteData: site {
        siteMetadata {
          title
          description
        }
      }
      postData:
        allMarkdownRemark(
          sort: {
            fields: [frontmatter___postdate],
            order: DESC,
          }
          limit: $limit,
          skip: $skip
        ) {
          nodes {
            id
            excerpt
            fields {
              slug
            }
            frontmatter {
              postdate(formatString: "YYYY年MM月DD日")
              updatedate(formatString: "YYYY年MM月DD日")
              seriesName
              seriesSlug
              title
              tags
            }
          }
        }
      }
`