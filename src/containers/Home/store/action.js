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
    // axios.get('http://localhost:4000/newList.json')
    // .then(res => {
    //   const list = res.data
    //   dispatch(changeList(list))
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    const list = [
      {hash: 1, title: 'tom'},
      {hash: 2, title: 'jerry'},
      {hash: 3, title: 'gogo'}
    ]
    dispatch(changeList(list))
  } 
}