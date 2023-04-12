import {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import IndexLayout from "@/components/layouts/IndexLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {dataPath, getArticlesList} from "@/utils/articlesHelper";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {useRouter as useNavi} from "next/dist/client/components/navigation";
import Pagination from "@/components/pagination/Pagination";
import PageTitle from "@/components/PageTitle";

const pageSize = 10;

export const Archives: FC<any> = ({listData, totalPage}) => {
  const navi = useNavi();
  const router = useRouter();
  const pageNum = Number(router.query?.pageNum) ?? 1;
  return <IndexLayout>
    <PageTitle title="归档，现以时间排序" subtitle="How time flies"/>
    <FluidWrapper innerStyle={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
      <div className="flex flex-col min-h-[80vh] w-full">
        {
          listData.map((obj: any) => <p className="my-5" onClick={() => navi.push('/detail/' + obj.id)}
                                        key={obj.id}>{obj.name}</p>)
        }
      </div>
      <div className="flex flex-row items-center justify-center w-full">
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
