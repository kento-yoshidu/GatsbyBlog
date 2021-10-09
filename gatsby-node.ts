import type { GatsbyNode } from "gatsby"
import path, { resolve } from "path"

const { createFilePath } = require(`gatsby-source-filesystem`)

const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const queryResult = await graphql(
    `
      {
        allArticleByGroup: allMarkdownRemark(
          sort: { fields: [frontmatter___postdate]}
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

        allArticles: allMarkdownRemark {
          nodes {
            id
            fields {
              slug
            }
          }
        }

        # カテゴリごとに記事収集
        postsBySeries: allMarkdownRemark {
          group(field: frontmatter___seriesSlug) {
            fieldValue
            nodes {
              id
              frontmatter {
                seriesName
              }
            }
          }
        }

        # タグごとに記事収集
        postsByTag: allMarkdownRemark {
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
      result.errors
    )
    return
  }

  const allArticlesByGroup = queryResult.data.allArticleByGroup.group

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
  // 記事一覧の表示

  const allArticles = queryResult.data.allArticles

  allArticles.nodes.forEach(_ => {
    // 記事合計数
    const postCount = allArticles.nodes.length;

    // 何ページ生成することになるかの計算
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
  // カテゴリごとの記事一覧

  const postsBySeries = queryResult.data.postsBySeries.group

  postsBySeries.forEach(series => {
    const seriesSlug = series.fieldValue
    const seriesName = series.nodes[0].frontmatter.seriesName

    // カテゴリごとの記事合計数
    const postCount = series.nodes.length;

    // 何ページ生成することになるかの計算
    const pageCount = Math.ceil(postCount / 6)

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: 1 === 0 ? `/series/${series.fieldValue}/page/1/` : `/series/${series.fieldValue}/page/${i + 1}/`,
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
  // タグごとの記事一覧

  const postsByTag = queryResult.data.postsByTag.group

  postsByTag.forEach(tag => {
    // タグごとの記事合計数
    const postCount = tag.nodes.length;

    // 何ページ生成することになるかの計算
    const pageCount = Math.ceil(postCount / 6);

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: 1 === 0 ? `/tag/${tag.fieldValue}/page/1/` : `/tag/${tag.fieldValue}/page/${i + 1}/`,
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
