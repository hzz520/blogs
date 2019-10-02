import React ,{ Component } from 'react'

import style from '../styles/about'
import DocumentTitle from 'react-document-title'

export default class t extends Component {
    constructor () {
        super()
    }
    render () {
      
        return (
            <DocumentTitle title='关于网站架构'>
                <div className={style.container + ' content' }>
                    <h1>关于网站架构</h1>
                    <h2>
                        <br/>前端采用的是react + redux + react-router 提供路由<br/><br/>
                        后端是node + express + mongoose提供API的方式<br/><br/>
                        前后端采用的是superagent的交互方式<br/><br/>
                        构建工具是基于webpakc打包， 线上是用nginx提供Gzip压缩。首屏加载整体优化下来从1.3M左右左右控制在80KB左右<br/><br/>
                        模块化方面是基于ES6模块化开发，配合react的组件化，以后复用率和扩展都很不错，同时配合webpack打包，完全实现按需加载<br/><br/>
                    </h2>
                </div> 
            </DocumentTitle>
        )
    }
}