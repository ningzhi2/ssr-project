/**
 *  proxyServer.js 模拟java服务器的接口
 */
const http = require('http')

const server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
	res.setHeader('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
	res.setHeader('X-Powered-By',' 3.2.1')
	res.setHeader('Content-Type', 'application/json;charset=utf-8')
  if(req.url === '/ssr/api/news.json?secret=abcd' && req.method === 'GET') {
    let result = [
      { "id": 1, "title": "this is first data","hash":"R59cdr"},
			{ "id": 2, "title": "this is second data","hash":"re58dr"},
			{ "id": 3, "title": "this is third data","hash":"OVk8rR"},
			{ "id": 4, "title": "this is fourth data","hash":"04C84R"},
			{ "id": 5, "title": "this is fifth data","hash":"Mkr90f"}
    ]
    res.end(JSON.stringify(result))
  }
})

server.listen(4000, () => {
  console.log('java server is running on 4000')
})
