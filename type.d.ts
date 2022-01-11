export type PageContext = {
  postCount: number,
  pageCount: number,
  skip: number,
  limit: number,
  currentPage: number,
  isFirst: boolean,
  isLast: boolean,
  series?: string,
  seriesName?: string,
  seriesSlug?: string,
  tag?: string,
}