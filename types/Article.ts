import {BaseType} from "@/types/BaseType";

export interface Article extends BaseType {
  name: string,  //标题
  abstract?: string,  //摘要
  poster?: string,  //标题图
  isTop: boolean,  //是否置顶
  tags?: Array<number>,
  categories?: Array<number>
}
