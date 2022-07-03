export type PageContext = {
  postCount: number,
  pageCount: number,
  skip: number,
  limit: number,
  currentPage: number,
  isFirst: boolean,
  isLast: boolean,
}

export interface Frontmatter {
  title: string
  seriesSlug: string
  seriesName: string
  postdate: string
  update: string
  series: string
  tags: string[]
  description: string
}
