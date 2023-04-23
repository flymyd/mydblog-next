import {FC} from "react";
import {useRouter} from "next/router";
import IndexLayout from "@/components/layouts/IndexLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {getArticlesList} from "@/utils/articlesHelper";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {useRouter as useNavi} from "next/dist/client/components/navigation";
import Pagination from "@/components/pagination/Pagination";
import PageTitle from "@/components/PageTitle";
import ArchiveCard from "@/components/ArchiveCard";


const pageSize = 10;

export const Archives: FC<any> = ({listData, totalPage}) => {
  const router = useRouter();
  const pageNum = Number(router.query?.pageNum) ?? 1;
  const navi = useNavi();

  return <IndexLayout>
    <PageTitle title="归档，现以时间排序" subtitle="How time flies"/>
    <FluidWrapper innerStyle={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
      <div className="flex flex-col w-full" style={{minHeight: 'calc(100vh - 230px)'}}>
        {
          listData.map((obj: any) => <ArchiveCard key={obj.id} article={obj}></ArchiveCard>)
        }
      </div>
      <div className="flex flex-row items-center justify-center w-full my-3 pb-3">
        <Pagination totalPage={totalPage} pageNum={pageNum}
                    onPageChange={(num: number) => navi.push('/archives/' + num)}></Pagination>
      </div>
    </FluidWrapper>
  </IndexLayout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  let articles: Array<any> = await getArticlesList()
  const totalPage = Math.ceil(articles.length / pageSize);
  const paths = Array.from({length: totalPage}, (_, i) => i + 1)
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
  const totalPage = Math.ceil(articles.length / pageSize);
  return {
    props: {
      listData: articles.slice(startIndex, endIndex),
      totalPage
    },
  }
}

export default Archives;
