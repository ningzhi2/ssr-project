const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base.js')

const clientConfig = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  }
}

module.exports = merge(config, clientConfig)

/* 
    我们在同时打包服务端代码的同时又要去打包客户端的代码，所以此时此刻我们就完成了一个最简单的同构。

    服务端运行React代码渲染出HTML
    服务器发送HTML给浏览器
    浏览器接收到内容并展示
    浏览器向服务器请求js文件并加载
    JS中的React代码在浏览器端重新执行
    JS中的React代码接管页面操作
*/