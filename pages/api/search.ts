import {NextApiRequest, NextApiResponse} from 'next';
import {MeiliSearch} from 'meilisearch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  /**
   * key 搜索的key
   * limit 搜索条数限制
   */
  const query = req.query as any
  const key = query.key;
  if (typeof key === 'string') {
    const client = new MeiliSearch({host: 'http://123.60.147.94:7700'})
    const results = await client.index('articles').search(key, {
      limit: query?.limit ?? 20,
      attributesToHighlight: ['*']
    })
    res.status(200).json(results);
  } else {
    res.status(400).json({error: 'Query parameter is required'});
  }
}
