import {ArticleIndex} from "@/types/ArticleIndex";

export interface SearchResponse {
  hits: Array<ArticleIndex>,  //搜索结果
  query: string,  //搜索关键词
  processingTimeMs: number,  //搜索用时
  limit: number,  //条数限制
  offset: number,  //偏移量
  estimatedTotalHits: number,  //搜索命中条数
}
