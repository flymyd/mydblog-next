import fs from "node:fs/promises";
import path from "node:path";
import process from "process";

export const dataPath = path.join(process.cwd(), '/data')

export async function getArticlesList(fileName: string = "articles") {
  const articlesJSON = await fs.readFile(path.join(dataPath, `${fileName}.json`), 'utf-8')
  try {
    const json = JSON.parse(articlesJSON);
    let result = Array.isArray(json) ? json : []
    result.sort((v1, v2) => new Date(v2.updateTime).getTime() - new Date(v1.updateTime).getTime())
    return result;
  } catch (e) {
    return []
  }
}
