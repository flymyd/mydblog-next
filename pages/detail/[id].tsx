import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import fs from "node:fs/promises";
import path from "node:path";
import * as process from "process";

const dataPath = path.join(process.cwd(), '/data')
export const Detail: FC<any> = ({post}) => {
  return (
    <>
      {post}
    </>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const articlesJSON = await fs.readFile(path.join(dataPath, 'articles.json'), 'utf-8')
  let articles: Array<any> = JSON.parse(articlesJSON)
  const paths = articles.map(v => ({params: {id: String(v.id)}}))
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const id = params!.id;
  const articlesJSON = await fs.readFile(path.join(dataPath, 'articles.json'), 'utf-8')
  let articles: Array<any> = JSON.parse(articlesJSON)
  const fileName = articles.filter(o => o.id == id)[0].name;
  const markdownFile = await fs.readFile(path.join(dataPath, '/articles', fileName), 'utf-8')
  return {
    props: {post: markdownFile},
  }
}
export default Detail;
