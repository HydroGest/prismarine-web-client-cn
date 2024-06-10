# prismarine-web-client

一个在网页中运行的Minecraft客户端。**实时演示请访问 https://prismarinejs.github.io/prismarine-web-client/**

## 工作原理
prismarine-web-client 在浏览器中运行 mineflayer 和 prismarine-viewer，通过 WebSocket 连接到一个代理，
该代理将 WebSocket 连接转换为 TCP 以连接到正常的Minecraft服务器。Prismarine-web-client基于以下项目：
* [prismarine-viewer](https://github.com/PrismarineJS/prismarine-viewer) 用于世界渲染
* [mineflayer](https://github.com/PrismarineJS/mineflayer) 提供高级Minecraft客户端API

如果你想了解更多工作原理并贡献代码，请查看这些模块！

## 截图
![prismarine-web-client 实际运行截图](screenshot.png)

## 实时演示
点击此链接在你的浏览器中打开，无需安装：https://prismarinejs.github.io/prismarine-web-client/

*已在桌面平台的 Chrome & Firefox 上测试。*

## 使用方法
要在你自己主机上托管，请在bash中运行以下命令：
```bash
$npm install -g prismarine-web-client$ prismarine-web-client
```
最后，在浏览器中打开 http://localhost:8080。
