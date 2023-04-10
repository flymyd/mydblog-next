import type {NextApiRequest, NextApiResponse} from 'next'
import {getArticlesList} from "@/utils/articlesHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query: Partial<{ [p: string]: string }> = req.query as any;
  const pageNum = Number(query?.pageNum ?? 1);
  const pageSize = Number(query?.pageSize ?? 10);
  let articles: Array<any> = await getArticlesList()
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  await res.status(200).json(articles.slice(startIndex, endIndex))
}
