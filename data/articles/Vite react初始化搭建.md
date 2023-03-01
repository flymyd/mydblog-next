```shell
yarn create vite mydblog --template react-ts && cd ./mydblog && yarn install
yarn add @types/node --dev 
yarn add react-router-dom
yarn add tailwindcss@latest postcss@latest autoprefixer@latest --dev
yarn tailwindcss init -p
yarn add axios
yarn add react-redux
yarn add sass --dev
yarn add -D typescript-plugin-css-modules
yarn add @emotion/react
yarn add -D @emotion/babel-plugin
```

### 配置Ant design 按需引入 & 自定义主题

```shell
yarn add antd
yarn add -D vite-plugin-imp less less-vars-to-js
```

vite.config.ts

```typescript
import {defineConfig} from 'vite'
import vitePluginImp from 'vite-plugin-imp'
import fs from 'fs'
import lessToJS from 'less-vars-to-js' // less 样式转化为 json 键值对的形式

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/assets/css/variables.less'), 'utf8')
)
export default defineConfig({
  plugins: [vitePluginImp({libList: [{libName: "antd", style: (name) => `antd/lib/${name}/style/index.less`}]})],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
        modifyVars: themeVariables, // 重写 ant design的 less 变量，定制样式
      }
    }
  }
})
```

./src/assets/css/variables.less

```less
@primary-color: #00f; // 全局主色, 覆盖Ant Design的@primary-color
```

