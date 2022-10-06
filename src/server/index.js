import express from 'express'
// matchRoutes ，实现 多级路由匹配
import { matchRoutes } from 'react-router-config'

// 路由条目
import routes from '../Routes'
// 创建store的函数
import { getStore } from '../store'
import { render } from './utils'

const app = express()
// 所有静态文件的请求都去public目录下拿
app.use(express.static('public')) 

app.get('*', function(req, res){
  // 生成新的store
  const store = getStore()
  // 这里获取异步数据，并填充到store当中
  // store里面填充什么，我们不知道，需要结合当前用户请求地址，和路由做判断
  // 如果用户访问 / 路径，我们就拿home组件的异步数据
  // 如果用户访问 /login 路径，我们就拿login组件的异步数据
  // 总结：根据路由的路径，来往store里面加载数据

  // 根据请求地址匹配路由
  const matchedRoutes = matchRoutes(routes, req.path)
  const promises = []

  // 可能请求地址对应多个组件，多个组件就可能有多个loadData异步请求
  matchedRoutes.forEach(item => {
    if(item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  })

  // 等到异步加载完毕，store中有数据再执行后面
  Promise.all(promises).then(() => {
    res.send(render(store, routes, req))
  })

})

var server = app.listen(3000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})


// ssr只发生在第一次进入页面的时候，这个第一次的含义：
// 包含直接在浏览器中输入地址的情况；
// 也包括你刷新浏览器当前网页的情况；

/* 
    服务端渲染只发生在第一次进入页面的时候，第一次进入页面浏览器会向服务器发送请求，
    
    服务器把渲染好的页面返回给浏览器，同时浏览器也请求到了js文件，但是执行完毕js文件后，页面就被js，或者说被react接管了，
    
    所有之后页面的交互和页面跳转都是js当中的react代码执行的效果而已，可以理解为服务端渲染只渲染第一个页面，其他都是客户端渲染
*/

/* 
    react-router-dom是依赖于react-router-config的，而且多级路由匹配必须依赖于react-router-config当中的matchRoutes方法，而不是react-router-dom当中默认的matchPath方法，
    比如我们访问localhost:3000/ttt，matchPath方法只能匹配到/ttt，而matchRoutes方法能匹配到/和/ttt两个路径，如果两个路径对应的组件都要异步加载数据，那么显然就只能使用matchRoutes方法。
*/
