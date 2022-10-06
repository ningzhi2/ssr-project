import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../Routes'
// 引入包装器
import { Provider } from 'react-redux'
// 引入创建store的函数
import getStore from '../store'

export const render = (req) => {
  // 实现首屏渲染加快、seo   但是js交互会丢失 ===>  ReactDom.hydrate() 实现同构
  // 把组件的内容转换成html的字符串
  // 使用包装器接入store 
  const content = renderToString((
    <Provider store={getStore()}>             
      <StaticRouter location={req.path} context={{}}>
        { Routes }
      </StaticRouter>
    </Provider>
  ))
  return (
    `
    <html lang="zh-CN">
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <!-- webpack打包时 ReactDom.hydrate 方法会 对比虚拟dom,  插入dom结点, 实现js交互 -->
        <script src="/index.js"></script>  <!-- 引入一个script标签   /index.js 会匹配到 /public 实现同构 -->
      </body>
    </html>
    `
  )
}

// 由于StaticRouter是在服务端，它不能像BrowserRouter直接拿到浏览器的地址，所以必需给传递location参数，而且要写在后端路由处理函数当中，才能拿到req.path

//context属性是在书写StaticRouter时必需要写的，关乎于数据的处理，这个我们后面再说

//后端路由为了能走react的路由，必需将app.get('/')改成app.get('*')
