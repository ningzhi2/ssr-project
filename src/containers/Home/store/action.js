import axios from "axios";
import { CHANGE_LIST } from "./contants";

const changeList = (list) => {
  return {
    type: CHANGE_LIST,
    list
  }
}

export const getHomeList = () => {
  return (dispatch) => {
    // 因为请求数据是异步的，所以必须将 axios.get()方法这种promise返回回去
    return axios.get('https://robohash.org/1')
      .then(res => {
        const list = [
          { hash: 1, title: 'tom' },
          { hash: 2, title: 'jerry' },
          { hash: 3, title: 'gogo' },
          { hash: 4, title: 'tiky' }
        ]
        dispatch(changeList(list))
      })
      .catch(err => {
        console.log(err)
      })
  }
}