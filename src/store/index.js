import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { reducer as homeReducer } from '../containers/Home/store'
import { reducer as headerReducer } from '../components/Header/store'
import { reducer as translationReducer } from '../containers/Translation/store'
import clientAxios from '../client/request'
import serverAxios from '../server/request'

const reducer = combineReducers({
  home: homeReducer,
  header: headerReducer,
  translation:translationReducer
})

// 返回创建store的函数 
export const getStore = (req) => {
  // 服务端渲染携带serverAxios， 这个参数可以在 actionCreators 的时候作为第3个参数拿到
  return createStore( reducer, applyMiddleware( thunk.withExtraArgument(serverAxios(req)) ) )
}

export const getClientStore = () => {
  // 是否 在浏览器打开redux插件
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
  // 客服端渲染携带clientAxios
  const enhancer = composeEnhancers( applyMiddleware( thunk.withExtraArgument(clientAxios) ) )
  // 客户端渲染的时候直接从window.context中拿出数据使用的方式就叫做 数据的脱水
  const defaultState = window.context.state
  // 服务端渲染时的store作为第2个参数
  return createStore(reducer, defaultState, enhancer)
}
