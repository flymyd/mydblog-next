# Electron + Vite + Vue3-TS

```shell
npm init vite@latest scrypygui -- --template vue-ts && cd ./scrypygui && npm i
npm i -D concurrently cross-env electron electron-builder wait-on
```

修改package.json

```json
{
  "name": "scrcpygui",
  "private": true,
  "version": "0.0.0",
  "main": "src/electron/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "electron": "wait-on tcp:3000 && cross-env NODE_ENV=development electron .",
    "electron:serve": "concurrently -k \"npm run dev\" \"npm run electron\"",
    "electron:build": "vite build && electron-builder"
  },
  "build": {
    "appId": "com.your-website.your-app",
    "productName": "ElectronApp",
    "copyright": "Copyright © 2021 <your-name>",
    "mac": {
      "category": "public.app-category.utilities"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    },
    "files": [
      "dist/**/*",
      "src/electron/**/*"
    ],
    "directories": {
      "buildResources": "assets",
      "output": "dist_electron"
    }
  },
  "dependencies": {
    "vue": "^3.2.25"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^2.3.3",
    "concurrently": "^7.2.2",
    "cross-env": "^7.0.3",
    "electron": "^19.0.6",
    "electron-builder": "^23.1.0",
    "typescript": "^4.5.4",
    "vite": "^2.9.9",
    "vue-tsc": "^0.34.7",
    "wait-on": "^6.0.1"
  }
}
```

新建src/electron文件夹并新建两个文件

main.js

```javascript
// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow } = require('electron')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV
function createWindow () {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  // mainWindow.loadFile('dist/index.html') // 此处跟electron官网路径不同，需要注意
  mainWindow.loadURL(
    NODE_ENV === 'development'
    ? 'http://localhost:3000'
    :`file://${path.join(__dirname, '../../dist/index.html')}`
  );
  // 打开开发工具
  // 打开开发工具
  if (NODE_ENV === "development") {
    mainWindow.webContents.openDevTools()
  }
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。
```

preload.js

```javascript
// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

在macos下，使用fix-path包来修复$PATH
