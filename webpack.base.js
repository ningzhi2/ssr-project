
// webpack 基于 node环境， EsModule 基于 webpack配置（commonJS模块化规范）

module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,  // 所有js文件
        loader: 'babel-loader', // 使用babel-loader编译
        exclude: /node_modules/,  // 排除node_modules
        options: {
          // 配置编译规则
          presets: [
            'react', // 按照react代码编译，需要babel-preset-react
            'stage-0', // 识别异步的语法，需要babel-preset-stage-0
            [
              'env', // 根据环境做一些适配
              {
                targets: {
                  // 打包时，babel 会兼容 所有主流浏览器 最新的2个版本
                  browsers: ['last 2 versions']
                }
              }
            ]
          ]
        }
      }
    ]
  }
}