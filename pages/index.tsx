import Head from 'next/head'

import FluidWrapper from "@/components/layouts/FluidWrapper";
import IndexLayout from "@/components/layouts/IndexLayout";
import {useRouter} from "next/router";
import useScroll from "@/hooks/useScroll";
import {CSSProperties, FC, useEffect, useRef} from "react";
import IndexCurtain from "@/components/index/IndexCurtain";
import {GetStaticProps} from "next";
import {dataPath, getArticlesList} from "@/utils/articlesHelper";
import ArticleCard from "@/components/ArticleCard";
import NewArticles from "@/components/index/NewArticles";

const Home: FC<any> = (props) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <IndexLayout>
        <main className="w-screen">
          <FluidWrapper>
            <NewArticles articles={props.articles}/>
          </FluidWrapper>
        </main>
      </IndexLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let articles: Array<any> = await getArticlesList()
  articles.sort((v1, v2) => new Date(v2.updateTime).getTime() - new Date(v1.updateTime).getTime())
  return {
    props: {
      articles: articles.slice(0, 9)
      // articles
    },
  }
}

export default Home;

