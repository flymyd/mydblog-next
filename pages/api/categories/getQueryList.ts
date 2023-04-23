import type {NextApiRequest, NextApiResponse} from 'next'
import {getArticlesList} from "@/utils/articlesHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let articles: Array<any> = await getArticlesList()
  const ymRange: any = {};
  articles.forEach(({updateTime}) => {
    const [year, month] = updateTime.slice(0, 7).split('-');
    const formattedMonth = String(Number(month));
    ymRange[year] = [...new Set([...(ymRange[year] || []), formattedMonth])].sort();
  });
  Object.keys(ymRange).sort().forEach((year) => {
    ymRange[year] = ymRange[year].map((month: any) => String(Number(month))).sort();
  });
  await res.status(200).json({ymRange})
}
