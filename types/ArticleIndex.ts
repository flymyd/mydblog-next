import {Article} from "@/types/Article";

export interface ArticleIndex extends Article {
  heads: string[],  //文章各级标题
  _formatted: ArticleIndex;
}
