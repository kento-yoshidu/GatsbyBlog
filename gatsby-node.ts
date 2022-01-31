import type { GatsbyNode } from "gatsby"
import path, { resolve } from "path"
import fs from "fs"
//import { faTags } from "@fortawesome/free-solid-svg-icons"

const { createFilePath } = require(`gatsby-source-filesystem`)

const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const queryResult = await graphql(
    `
      {
        # 全ての記事を取得
        allArticles: allMarkdownRemark(
          filter: {frontmatter: {published: {eq: true}}}
          sort: {fields: frontmatter___postdate, order: DESC}
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }

        # 全ての記事を取得(検索用)
        allArticlesForSearching: allMarkdownRemark(
          filter: {frontmatter: {published: {eq: true}}}
          sort: {fields: frontmatter___postdate, order: DESC}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                keywords
                title
              }
            }
          }
        }

        # 全ての記事をグループごとに取得
        allArticlesByGroup: allMarkdownRemark(
          filter: {frontmatter: {published: {eq: true}}}
          sort: { fields: frontmatter___postdate}
        ) {
          group(field: frontmatter___seriesSlug) {
            nodes {
              id
              fields {
                slug
              }
            }
          }
        }

        # シリーズごとに記事を取得
        articlesBySeries: allMarkdownRemark(
          filter: {frontmatter: {published: {eq: true}}}
          sort: { fields: frontmatter___postdate, order: DESC }
        ) {
          group(field: frontmatter___seriesSlug) {
            fieldValue
            nodes {
              frontmatter {
                seriesName
              }
            }
          }
        }

        # タグごとに記事を取得
        articlesByTag: allMarkdownRemark(
          filter: {frontmatter: {published: {eq: true}}}
          sort: { fields: frontmatter___postdate, order: DESC }
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            nodes {
              id
            }
          }
        }
      }
    `
  )

  if (queryResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      queryResult.errors
    )
    return
  }

  // --------------------------------------------------
  // 全ての記事を投稿日時順に表示

  const allArticles = queryResult.data.allArticles

  allArticles.nodes.forEach(_ => {
    const postCount = allArticles.nodes.length;
    const pageCount = Math.ceil(postCount / 6)

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: i === 0 ? "/page/1/" : `/page/${i + 1}/`,
        component: path.resolve("./src/templates/pages.tsx"),
        context: {
          postCount: postCount,
          pageCount: pageCount,
          totalPageCount: pageCount,
          skip: 6 * i,
          limit: 6,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === pageCount,
        }
      })
    })
  })

  // --------------------------------------------------
  // 記事ページを生成

  const allArticlesByGroup = queryResult.data.allArticlesByGroup.group

  allArticlesByGroup.forEach((group) => {
    group.nodes.forEach((node, index) => {
      const previousPostId = index === 0 ? null : group.nodes[index - 1].id
      const nextPostId = index === group.nodes.length - 1 ? null : group.nodes[index + 1].id

      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/blog-post.tsx"),
        context: {
          id: node.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  })

  // --------------------------------------------------
  // カテゴリごとの記事を表示

  const articlesBySeries = queryResult.data.articlesBySeries.group

  articlesBySeries.forEach(series => {
    const seriesSlug = series.fieldValue
    const seriesName = series.nodes[0].frontmatter.seriesName

    const postCount = series.nodes.length;
    const pageCount = Math.ceil(postCount / 6)

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/series/${series.fieldValue}/page/1/` : `/series/${series.fieldValue}/page/${i + 1}/`,
        component: path.resolve("./src/templates/series.tsx"),
        context: {
          postCount: postCount,
          pageCount: pageCount,
          totalPageCount: pageCount,
          skip: 6 * i,
          limit: 6,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === pageCount,
          seriesName: seriesName,
          seriesSlug: seriesSlug,
        }
      })
    })
  })

  // --------------------------------------------------
  // タグごとの記事を表示

  const postsByTag = queryResult.data.articlesByTag.group

  postsByTag.forEach(tag => {
    const postCount = tag.nodes.length;
    const pageCount = Math.ceil(postCount / 6);

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tag/${tag.fieldValue}/page/1/` : `/tag/${tag.fieldValue}/page/${i + 1}/`,
        component: path.resolve(`./src/templates/tag.tsx`),
        context: {
          postCount: postCount,
          pageCount: pageCount,
          skip: 6 * i,
          limit: 6,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === pageCount,
          tag: tag.fieldValue,
        }
      })
    })
  })

  if(process.env.NODE_ENV === 'production') {
    const keywords = queryResult.data.allArticlesForSearching.edges.map(({node}) => {
      return {
        slug: node.fields.slug,
        title: node.frontmatter.title,
        keywords: node.frontmatter.keywords,
      }
    })

    fs.writeFileSync('./static/keywordSearch.json', JSON.stringify(keywords, null , 2))
  }

  /*
  * ドラフトページを作成(develop環境時のみ)
  */
  if(process.env.NODE_ENV === 'development') {
    const draftPosts = await graphql(`
      {
        # 全てのドラフト記事を取得
        allDraftArticles: allMarkdownRemark(
          filter: {frontmatter: {published: {ne: true}}}
          sort: {fields: frontmatter___postdate, order: DESC}
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        # 全ての記事をグループごとに取得
        allDraftArticlesByGroup: allMarkdownRemark(
          filter: {frontmatter: {published: {ne: true}}}
          sort: { fields: frontmatter___postdate}
        ) {
          group(field: frontmatter___seriesSlug) {
            nodes {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `)

    // --------------------------------------------------
    // 全てのドラフト記事を投稿日時順に表示

    const { allDraftArticles } = draftPosts.data

    allDraftArticles.nodes.forEach(_ => {
      const postCount = allDraftArticles.nodes.length;
      const pageCount = Math.ceil(postCount / 10)

      Array.from({ length: pageCount }).forEach((_, i) => {
        createPage({
          path: i === 0 ? "/draft/page/1/" : `/draft/page/${i + 1}/`,
          component: path.resolve("./src/templates/draftPages.tsx"),
          context: {
            postCount: postCount,
            pageCount: pageCount,
            totalPageCount: pageCount,
            skip: 6 * i,
            limit: 6,
            currentPage: i + 1,
            isFirst: i + 1 === 1,
            isLast: i + 1 === pageCount,
          }
        })
      })
    });

    const { allDraftArticlesByGroup } = draftPosts.data

    allDraftArticlesByGroup.group.forEach((group) => {
      group.nodes.forEach((node, index) => {
        const previousPostId = index === 0 ? null : group.nodes[index - 1].id
        const nextPostId = index === group.nodes.length - 1 ? null : group.nodes[index + 1].id

        createPage({
          path: `/draft${node.fields.slug}`,
          component: path.resolve("./src/templates/draftPost.tsx"),
          context: {
            id: node.id,
            previousPostId,
            nextPostId,
          },
        })
      })
    });
  }
}

const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export { createPages, onCreateNode }

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
