import React,{ Component } from 'react'

import style from '../styles/footer'

export default  class t extends Component {
    constructor () {
        super()
    }
    render () {
        var url = 'https://github.com/hzz520/express-react'
        return (
            <div className={style.footer}>
                <span>源码：<a href={url}>{url}</a></span>
            </div>
        )
    }
}