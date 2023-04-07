import Head from 'next/head'

import FluidWrapper from "@/components/layouts/FluidWrapper";
import IndexLayout from "@/components/layouts/IndexLayout";
import {Text} from "@fluentui/react-components";
import {FC} from "react";
import {GetStaticProps} from "next";
import {getArticlesList} from "@/utils/articlesHelper";
import NewArticles from "@/components/index/NewArticles";

const Home: FC<any> = (props) => {
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
        <footer className="bg-black text-white flex flex-col">
          <div className="flex flex-row justify-center my-1.5">
            <Text>Copyleft © 2022 Flymyd. All rights not reserved.</Text>
          </div>
        </footer>
      </IndexLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let articles: Array<any> = await getArticlesList()
  articles.sort((v1, v2) => new Date(v2.updateTime).getTime() - new Date(v1.updateTime).getTime())
  articles.sort((v1, v2) => v2.isTop - v1.isTop)
  return {
    props: {
      articles: articles.slice(0, 9)
      // articles
    },
  }
}

export default Home;

