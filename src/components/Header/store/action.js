import { CHANGE_LOGIN } from './constants'

export const changeLogin = value => ({
  type: CHANGE_LOGIN,
  value
})

// 判断是否登录
export const getHeaderInfo = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/isLogin.json?secret=abcd')
      .then(res => {
        const isLogin = res.data.data.login
        console.log('获取是否登录________', isLogin)
        dispatch(changeLogin(isLogin))
      })
  }
}

export const login = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/login.json?secret=abcd')
      .then(res => {
        dispatch(changeLogin(true))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const logout = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/logout.json?secret=abcd')
      .then(res => {
        dispatch(changeLogin(false))
      })
      .catch(err => {
        console.log(err)
      })
  }
}


