import React, {FC, useEffect} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {remark} from "remark";
import html from 'remark-html';
import prism from 'remark-prism';
import {dataPath, getArticlesList} from "@/utils/articlesHelper";
import 'prismjs/themes/prism-tomorrow.min.css';
import IndexLayout from "@/components/layouts/IndexLayout";
import FluidWrapper from "@/components/layouts/FluidWrapper";

export const Detail: FC<any> = ({postData}) => {
  return (
    <IndexLayout>
      <FluidWrapper>
        <div className="w-full mx-0 mt-6">
          {postData.title}
          <br/>
          {postData.id}
          <br/>
          {postData.date}
          <br/>
          <div
            dangerouslySetInnerHTML={{__html: postData.contentHtml}}
          />
        </div>
      </FluidWrapper>
    </IndexLayout>
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
  let articles: Array<any> = await getArticlesList()
  const fileName = articles.filter(o => o.id == id)[0].name;
  const markdownFile = await fs.readFile(path.join(dataPath, '/articles', fileName), 'utf-8')
  const matterResult = matter(markdownFile);
  const processedContent = await remark()
    .use(html, {sanitize: false})
    .use(prism)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    props: {
      postData: {
        id,
        contentHtml,
        title: matterResult.data?.title ?? '',
        date: matterResult.data?.date?.toString() ?? '',
      }
    },
  }
}
export default Detail;
