import React from "react";
import ReactDom from 'react-dom'
import { BrowserRouter } from "react-router-dom";
// 引入路由条目
import Routes from '../Routes'
// 引入包装器
import { Provider } from "react-redux";
// 引入创建store的函数
import getStore from "../store";

const App = () => {
    return (
        <Provider store={getStore()}>
            <BrowserRouter>
                { Routes }
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
