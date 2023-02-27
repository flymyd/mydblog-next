async function builder() {
  const fs = require('node:fs/promises')
  const path = require('node:path')
  const indexesPath = path.resolve(__dirname, '../public')
  const articlesJSON = await fs.readFile(path.join(indexesPath, 'articles.json'))
  const articles = JSON.parse(articlesJSON)
  articles[0]['test'] = new Date().toLocaleString()
  await fs.writeFile(path.join(indexesPath, 'articles.json'), JSON.stringify(articles, null, '  '))
  console.log(articles)
  // const fileInfo = await fs.stat(path.join(indexesPath, 'articles.json'))
}

builder()
