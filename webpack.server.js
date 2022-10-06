const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base.js')

const serverConfig  = {
  mode: 'development',
  // 需要设置这一项，服务端和客户端的打包结果不同
  target: 'node',  //不将node自带的诸如path、fs这类的包打进去
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  // externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法
  externals: [
    // node当中引入的包（比如express）不会被打包进入bundle.js
    //不将node_modules里面的包打进去
    nodeExternals()
  ]
}

module.exports = merge(config, serverConfig)
