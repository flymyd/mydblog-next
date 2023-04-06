export interface ArticleCardType {
  type?: "large" | "medium" | "small",
  title?: string,
  updateTime: any,
  poster?: string,
  tags?: Array<any>,
  abstract?: string,
  id: number
}
