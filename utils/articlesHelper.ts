import fs from "node:fs/promises";
import path from "node:path";
import process from "process";

export const dataPath = path.join(process.cwd(), '/data')

export async function getArticlesList() {
  const articlesJSON = await fs.readFile(path.join(dataPath, 'articles.json'), 'utf-8')
  try {
    const json = JSON.parse(articlesJSON);
    return Array.isArray(json) ? json : []
  } catch (e) {
    return []
  }
}
