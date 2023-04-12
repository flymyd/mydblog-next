import {FC} from "react";
import IndexLayout from "@/components/layouts/IndexLayout";
import PageTitle from "@/components/PageTitle";

const Categories: FC = () => {
  return (
    <IndexLayout>
      <PageTitle title="按分类浏览文章" subtitle="专注阅读"/>
    </IndexLayout>
  )
}
export default Categories;
