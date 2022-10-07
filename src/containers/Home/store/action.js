import { CHANGE_LIST } from "./contants";

const changeList = (list) => {
  return {
    type: CHANGE_LIST,
    list
  }
}

export const getHomeList = (server) => {
  console.log(server ? 'ajax__getHomeList() at NodeServer' : 'ajax__getHomeList() at Client')
  return (dispatch, getState, axiosIntance) => {
    // 因为请求数据是异步的，所以必须将 axios.get()方法这种promise返回回去
    // 请求localhost:3000/api/news.json?secret=abcd
    // ——————————————————————————————————————————————————————————————————————————
    // 如果是客户端请求，客户端创建store的时候携带的是axiosInstance = clientStore
		// 如果是服务端请求，服务端创建store的时候携带的是axiosInstance = serverStore
    return axiosIntance.get('/api/news.json?secret=abcd')
      .then(res => {
        const list = res.data
        dispatch(changeList(list))
      })
      .catch(err => {
        console.log('接口请求错误信息：', err)
      })
  }
}

/**
 *   axios.get('/api/news.json?secret=abcd') 如果是node服务器端发起的请求，访问的实际是 
 *    
 *      ::1:80/news.json?secret=abcd  也即   localhost:80/news.json?secret=abcd  
 * 
 *      但是并没有这个服务，所以报错 Error: connect ECONN REFUSED ::1:80 
 */


/* 
      如果直接访问localhost:3000 -> 此时是服务端渲染 -> 服务端向localhost:4000/ssr/api/news.json请求数据，返回完整的html给浏览器;

      如果先访问localhost:3000/login -> 此时是服务端渲染 -> 然后路由跳转到localhost:3000 -> 这个时候就是客户端渲染 -> 客户度向localhost:3000/api/news.json发送请求 -> node服务器把浏览器的请求代理到localhost:4000/ssr/api/news.json -> 数据返回给浏览器显示。
*/