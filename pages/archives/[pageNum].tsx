import {FC} from "react";
import {useRouter} from "next/router";
import IndexLayout from "@/components/layouts/IndexLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {dataPath, getArticlesList} from "@/utils/articlesHelper";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {useRouter as useNavi} from "next/dist/client/components/navigation";

const pageSize = 10;
export const Archives: FC<any> = ({listData}) => {
  const navi = useNavi();
  const router = useRouter();
  const pageNum = router.query?.pageNum ?? 1;
  return <IndexLayout>
    <FluidWrapper>
      <div className="flex flex-col">
        {
          listData.map((obj: any) => <p className="my-5" onClick={() => navi.push('/detail/' + obj.id)}
                                        key={obj.id}>{obj.name}</p>)
        }
        <h1>
          Page num is: {pageNum}
        </h1>
      </div>
    </FluidWrapper>
  </IndexLayout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  let articles: Array<any> = await getArticlesList()
  const maxPageNum = Math.ceil(articles.length / pageSize);
  const paths = Array.from({length: maxPageNum}, (_, i) => i + 1)
    .map(v => ({params: {pageNum: String(v)}}))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const pageNum = Number(params?.pageNum ?? 1);
  let articles: Array<any> = await getArticlesList()
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    props: {
      listData: articles.slice(startIndex, endIndex)
    },
  }
}

export default Archives;
