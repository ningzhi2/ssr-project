import express from 'express'
import { render } from './utils'

const app = express()
// 所有静态文件的请求都去public目录下拿
app.use(express.static('public')) 

app.get('*', function(req, res){
  res.send(render(req))
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
