import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {remark} from "remark";
import html from 'remark-html';
import {dataPath, getArticlesList} from "@/utils/articlesHelper";

export const Detail: FC<any> = ({postData}) => {
  return (
    <>
      <div>
        {postData.title}
        <br/>
        {postData.id}
        <br/>
        {postData.date}
        <br/>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
      </div>
    </>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  let articles: Array<any> = await getArticlesList()
  const paths = articles.map(v => ({params: {id: String(v.id)}}))
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const id = params!.id;
  // const articlesJSON = await fs.readFile(path.join(dataPath, 'articles.json'), 'utf-8')
  // let articles: Array<any> = JSON.parse(articlesJSON)
  let articles: Array<any> = await getArticlesList()
  const fileName = articles.filter(o => o.id == id)[0].name;
  const markdownFile = await fs.readFile(path.join(dataPath, '/articles', fileName), 'utf-8')
  const matterResult = matter(markdownFile);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    props: {
      postData: {
        id,
        contentHtml,
        ...matterResult.data,
      }
    },
  }
}
export default Detail;
