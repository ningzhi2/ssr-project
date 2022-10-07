import React from "react";
// renderRoutes支持多级路由
import { renderRoutes } from "react-router-config";

import Header from "./components/Header";
import { actions } from "./components/Header/store";

// 渲染一级路由的内容
const App = (props) => {
  return (
    <div>
      <Header />
      {/* 渲染二级路由的内容 */}
      {
        renderRoutes(props.route.routes)
      }
    </div>
  )
}

App.loadData = (store) => {
  // 判断是否登录，更新store
  return store.dispatch( actions.getHeaderInfo() )
}

export default App
