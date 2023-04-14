import {BaseType} from "@/types/BaseType";

export interface Article extends BaseType {
  name: string,  //文件名
  title: string,  //标题
  poster: string,  //标题图
  isTop: boolean,  //是否置顶
  tags: Array<string>,
  categories: Array<string>
}
