import React from "react";
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from "react-router-dom";
// 路由条目
import routes from '../Routes'
// 包装器
import { Provider } from "react-redux";
// 创建客户端store的方法
import { getClientStore } from "../store";

const App = () => {
    // 创建有数据的store
    const store = getClientStore()
    return (
        // 默认使用和服务端一样的store
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {routes.map(route => <Route {...route} />)}
                </div>
            </BrowserRouter>
        </Provider>
    )
}

ReactDom.hydrate(<App />, document.getElementById('root'))


/* 
    ReactDOM.render()会将挂载dom节点的所有子节点全部清空掉，再重新生成子节点。
    而ReactDOM.hydrate()则会复用挂载dom节点的子节点，并将其与react的virtualDom关联上。

    从二者的区别我们可以看出，
    ReactDOM.render()会将服务端做的工作全部推翻重做，而ReactDOM.hydrate()在服务端做的工作基础上再进行深入的操作。
    
    显然ReactDOM.hydrate()此时是要比ReactDOM.render()更好。ReactDOM.render()在此时做了一大堆无用功。
*/
