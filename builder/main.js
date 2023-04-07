const fs = require('node:fs/promises')
const path = require('node:path')
const indexesPath = path.resolve(__dirname, '../data')
const publicPath = path.resolve(__dirname, '../public')

async function traverse(dir, res, suffix = '.md') {
  let files = await fs.readdir(dir);
  for (let file of files) {
    let filePath = path.join(dir, '/', file)
    let stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await traverse(filePath, res);
    } else if (file.endsWith(suffix)) {
      res.push({
        name: file,
        updateTime: stats.mtime,
      });
    }
  }
}

async function checkPoster(name) {
  name = name.replace(".md", '')
  let files = await fs.readdir(path.join(publicPath, '/posters'));
  for (let file of files) {
    if (file === name + '.png' || file === name + '.jpg') {
      return 'local';
    }
  }
  return '';
}

async function builder() {
  const articlesJSON = await fs.readFile(path.join(indexesPath, 'articles.json'), 'utf-8')
  let articles = JSON.parse(articlesJSON)
  // 处理articles文件夹
  let articlesFolderInfo = []
  await traverse(path.join(indexesPath, '/articles'), articlesFolderInfo)
  let names = new Set();
  for (let folder of articlesFolderInfo) {
    let {name, createTime, updateTime} = folder;
    names.add(name);
    let article = articles.find(a => a.name === name);
    if (!article) {
      let newArticle = {name, createTime, updateTime};
      newArticle.title = name.replace(".md", '')
      newArticle.id = articles.length > 0 ? articles[articles.length - 1].id + 1 : 0;
      newArticle.isTop = false;
      newArticle.tags = [];
      newArticle.categories = [];
      newArticle.poster = await checkPoster(name);
      articles = [...articles, newArticle];
    } else {
      article.poster = await checkPoster(name);
      if (article.updateTime !== updateTime) {
        article.updateTime = updateTime;
      }
      article.poster = await checkPoster(name);
    }
  }
  articles = articles.filter(obj => Array.from(names).includes(obj.name))
  await fs.writeFile(path.join(indexesPath, 'articles.json'), JSON.stringify(articles, null, '  '))
  console.log("**************************")
  console.log("BUILD ARTICLE LIST SUCCESS")
  console.log("**************************\n")
  return true;
}

builder()
