import React from "react"
import Header from "../../components/Header"
import { connect } from "react-redux"
// actionCreators
import { getHomeList } from "./store/action"

class Home extends React.Component {
  componentDidMount() {
    // 发送异步请求，并保存到store
    this.props.getHomeList()
  }
  getHomeList() {
    const { list } = this.props
    return list.map(item => <div key={item.hash}>{item.title}</div>)
  }
  render() {
    return (
      <div>
        <Header />
        <div style={{color: 'skyblue'}}>
          { this.getHomeList() }
        </div>
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

// 导出容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Home)
