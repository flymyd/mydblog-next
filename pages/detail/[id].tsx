import 'github-markdown-css/github-markdown-light.css'
import React, {FC, useEffect, useState} from "react";
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
  const {date, title, contentHtml} = postData;
  const [updateTime, setUpdateTime] = useState(date || '')
  useEffect(() => {
    if (date) {
      setUpdateTime(new Date(date).toLocaleString('zh-Hans-CN'))
    }
  }, [])
  const headerRender = () => {
    return <div className="markdown-body">
      {title ? <h1 style={{border: 'none', padding: 0}}>{title}</h1> : <></>}
      {date ? <h5 className="pb-3"
                  style={{border: 'none', margin: 0}}>{updateTime}</h5> : <></>}
    </div>
  }
  return (
    <IndexLayout title={title}>
      <FluidWrapper>
        <div className="w-full mx-0 mt-6 myd-md">
          {headerRender()}
          <div
            className="markdown-body pb-10"
            dangerouslySetInnerHTML={{__html: contentHtml}}
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
  const articleInfo = articles.filter(o => o.id == id)[0]
  const {name, updateTime, title} = articleInfo;
  const markdownFile = await fs.readFile(path.join(dataPath, '/articles', name), 'utf-8')
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
        title: matterResult.data?.title ?? (title || ''),
        date: matterResult.data?.date?.toString() ?? (updateTime || ''),
      }
    },
  }
}
export default Detail;
