import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from './store'

const Header = ({ login, handleLogin, handleLogout }) => {
  return (
    <div>
      <Link to="/">首页</Link>
      &nbsp; &nbsp;
      {
        login ?
          <Fragment>
            <Link to="/translation">翻译列表</Link>  &nbsp; &nbsp;
            <span onClick={handleLogout}>退出</span>
          </Fragment>
          :
          <span onClick={handleLogin}>登录</span>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  login: state.header.login
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin() {
    dispatch(actions.login())
  },
  handleLogout() {
    dispatch(actions.logout())
  }
})

// 导出Header的容器组件（有store的Header）
export default connect(mapStateToProps, mapDispatchToProps)(Header)



/* 
    <Fragment></Fragment> 相当于 <></>
    起辅助作用的标签
*/