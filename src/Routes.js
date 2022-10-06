// import React from "react"
// import { Route } from 'react-router-dom'
import Home from "./containers/Home"
import Login from './containers/Login'

// export default (
//   <div>
//     <Route path="/" exact component={Home}></Route>
//     <Route path="/login" exact component={Login}></Route>
//   </div>
// )

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    loadData: Home.loadData,
    key: 'home',
    // routes: [{
		// 	path: '/ttt',
		// 	component: Ttt,
		// 	exact: true,
		// 	key: 'ttt'
		// }]
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    key: 'login'
  }
]
