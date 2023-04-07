const fs = require('fs')
const request = require('request')
const path = require('node:path')

/**
 * 下载文件并写入本地磁盘
 * @param fileLink  文件URL地址
 * @param filePath  文件路径,如: c:xx/xx.jpg
 */
function getFile(fileLink, filePath) {
  if (fileLink ?? '' !== '') {
    return new Promise((resolve, reject) => {
      request({
        url: fileLink,
        method: 'GET', // 根据实际情况改变请求方式
        encoding: null
      }, (err, response, body) => {
        if (!err && response.statusCode === 200) {
          fs.writeFileSync(filePath, body, {encoding: "binary"})
          resolve(filePath)
        } else {
          reject(err)
        }
      })
    })
  }
}

const fileList = [
  {
    "name": "从Vue到React-1.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/8e130953-84dd-4bfc-a5ed-3a6027e24d56"
  },
  {
    "name": "从Vue到React-2.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/dbe1c9da-7333-49a2-85d6-9d3f5463d607"
  },
  {
    "name": "从Vue到React-3.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/5e4f053e-f6ec-4140-9c1a-09684a2fc104"
  },
  {
    "name": "从Vue到React-4.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/31bca125-6b79-4a80-9308-b7d13c600661"
  },
  {
    "name": "从Vue到React-5.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/09a75047-8217-4bfd-8bbc-348565ad1eed"
  },
  {
    "name": "从Vue到React-6.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/4b7d4296-1b30-406e-a612-14219bee3367"
  },
  {
    "name": "github.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/c24e12a7-12e1-4bf0-b43b-e63692cfd9f2"
  },
  {
    "name": "uniapp-阿里云OSS直传封装.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/5ccd8e97-fcf0-41a5-b5c3-1c142e884b32"
  },
  {
    "name": "uniapp-仿微信相机.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/9f155bd7-2571-4bf5-896d-15aea4084ebe"
  },
  {
    "name": "uniapp-微信小程序实现全局事件监听.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/86171a82-9511-42d4-ad50-68e281502f0b"
  },
  {
    "name": "kms激活服务器.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/cff108ac-399e-41aa-b079-1a8f4e0deda4"
  },
  {
    "name": "pay-code.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/8588f197-8812-4f8a-8845-2a05aeb0ef09"
  },
  {
    "name": "Next.js文档 - 1.页面.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/c0bcfc3d-7471-4004-9462-6144512f4e96"
  },
  {
    "name": "Next.js文档 - 2.数据获取-SSR.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/a264ab53-f483-422f-9c0e-c0ec62f2498e"
  },
  {
    "name": "Next.js文档 - 3.数据获取-SSG.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/fc78977d-195d-4118-af7c-57bc8c8a6292"
  },
  {
    "name": "拿捏猫猫.png",
    "uuid": "https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/763fb304-5b85-4aee-bc0c-a48d96f60785"
  }
]

fileList.forEach(obj => getFile(obj.uuid, path.join("D:\\", "/tmp", obj.name)))
