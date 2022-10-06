import React from "react"
import Header from "../../components/Header"
import { connect } from "react-redux"
// actionCreators
import { getHomeList } from "./store/action"

class Home extends React.Component {
  // 我们获取的数据依旧是客户端渲染出来的，
  // 因为服务端不渲染 React组件的生命周期函数，所以我们要考虑在服务端获取数据。
  componentDidMount() {
    // 发送异步请求，并保存到store  |  客户端store有数据时，不发送请求获取数据
    this.props.list.length === 0 && this.props.getHomeList()
  }
  getList() {
    const { list } = this.props
    return list.map(item => <li key={item.hash}>{item.title}</li>)
  }
  render() {
    return (
      <div>
        <Header />
        <ul style={{color: 'skyblue'}}>
          { this.getList() }
        </ul>
        <button
          onClick={ () => { alert('click') } }
        >
          click
        </button>
      </div>
    )
  }
}

// 添加mapStateToProps
const mapStateToProps = (state) => ({
  list: state.home.newList
})

const mapDispatchToProps = (dispatch) => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

Home.loadData = (store) => {
  // 这个函数 负责 在服务端渲染之前，把这个路由对应组件需要的数据提前加载好
  return store.dispatch(getHomeList())
}

// 导出容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Home)
