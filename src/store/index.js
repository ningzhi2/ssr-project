import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../containers/Home/store'

const reducer = combineReducers({
  home: homeReducer
})

// 返回创建store的函数 
export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk))
}

export const getClientStore = () => {
  // 是否 在浏览器打开redux插件
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
  const enhancer = composeEnhancers( applyMiddleware(thunk) )
  // 客户端渲染的时候直接从window.context中拿出数据使用的方式就叫做 数据的脱水
  const defaultState = window.context.state
  // 从服务端渲染时获取的store作为第2个参数
  return createStore(reducer, defaultState, enhancer)
}
