const fs = require('node:fs/promises')
const path = require('node:path')
const {MeiliSearch} = require('meilisearch')
const indexesPath = path.resolve(__dirname, '../data')
const publicPath = path.resolve(__dirname, '../public')

// const MEILI_SEARCH_HOST = 'http://123.60.147.94:7700';
const MEILI_SEARCH_HOST = 'http://121.41.170.75:7700';

function printLog(text, isEnd) {
  console.log("**********************************")
  console.log(text)
  if (isEnd) {
    console.log("**********************************\n")
  }
}

//判断结尾是否为标点符号
function isPunctuationEnd(str) {
  const reg = /[，。！？；：、,.?!;:]$/;
  return reg.test(str);
}

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

//海报链接构建
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

//提取摘要及各级标题
async function getAbstract(markdownText) {
  const markdownIt = require('markdown-it');
  const cheerio = require('cheerio');
  const md = new markdownIt();
  const html = md.render(markdownText);
  const $ = cheerio.load(html);
  const firstElement = $('p').first();
  let summary = firstElement.text().slice(0, 100);
  const heads = []
  $('h1, h2, h3, h4, h5, h6, p').each(function () {
    heads.push($(this).text())
  })
  return {
    abstract: isPunctuationEnd(summary) ? summary : summary + '...',
    heads
  };
}

async function builder() {
  printLog("BUILDING INDEXES...")
  const articlesJSON = await fs.readFile(path.join(indexesPath, 'articles.json'), 'utf-8')
  let articles = JSON.parse(articlesJSON)
  let indexes = JSON.parse(articlesJSON)
  // 处理articles文件夹
  let articlesFolderInfo = []
  await traverse(path.join(indexesPath, '/articles'), articlesFolderInfo)
  let names = new Set();
  for (let folder of articlesFolderInfo) {
    let {name, createTime, updateTime} = folder;
    names.add(name);
    let article = articles.find(a => a.name === name);
    let indexObj = indexes.find(a => a.name === name);
    const markdownText = await fs.readFile(path.join(indexesPath, '/articles', name), 'utf-8');
    const articleAbstract = await getAbstract(markdownText);
    if (!article) {
      let newArticle = {name, createTime, updateTime};
      newArticle.title = name.replace(".md", '')
      newArticle.id = articles.length > 0 ? articles[articles.length - 1].id + 1 : 0;
      newArticle.isTop = false;
      newArticle.tags = [];
      newArticle.categories = [];
      newArticle.poster = await checkPoster(name);
      newArticle.abstract = articleAbstract.abstract;
      articles = [...articles, newArticle];
      const indexObj = {}
      Object.assign(indexObj, {...article})
      indexObj.heads = articleAbstract.heads || [];
      indexes = [...articles, indexObj];
    } else {
      article.poster = await checkPoster(name);
      article.abstract = articleAbstract.abstract;
      Object.assign(indexObj, {...article})
      indexObj.heads = articleAbstract.heads || [];
    }
  }
  articles = articles.filter(obj => Array.from(names).includes(obj.name))
  indexes = indexes.filter(obj => Array.from(names).includes(obj.name))
  const resultJSON = JSON.stringify(articles, null, '  ');
  await fs.writeFile(path.join(indexesPath, 'articles.json'), resultJSON)
  const indexesJSON = JSON.stringify(indexes, null, '  ');
  await fs.writeFile(path.join(indexesPath, 'indexes.json'), indexesJSON)
  printLog("BUILD INDEXES SUCCESS")
  printLog("SENDING INDEXES TO MEILISEARCH...")
  const client = new MeiliSearch({host: MEILI_SEARCH_HOST})
  await client.index('articles').deleteAllDocuments()
  await client.index('articles').addDocuments(indexes)
    .then((res) => printLog("SEARCH INDEXES BUILD SUCCESS", true))
  return true;
}

builder()
