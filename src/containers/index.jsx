
import React, {Component} from 'react'
import { Link,IndexLink } from 'react-router'


import Header from './header'
import Footer from './footer'
import Model from './model'
import Alert from './alert'
import style from '../styles/navBar.scss'

export default class t extends Component {
    constructor() {
        super();
    }
    render(){
        let {router} = this.props
       
        return (
            <div>
                <Header router={router}/>
                <div className={style.navBox}>
                    <div className='nav content'>
                        <IndexLink to='/' activeClassName='active'>首页</IndexLink>
                        <Link to='/publish' activeClassName='active'>发布文章</Link>
                        <Link to='/about'  activeClassName='active'>关于网站架构</Link>
                        <Link to='/myblog'  activeClassName='active'>我的博客</Link>
                        <Link to='/userinfo'  activeClassName='active'>个人资料</Link>
                    </div>
                </div>
                <div data-cls='container'>
                    {this.props.children}
                </div> 
                <Model router={router}/>
                <Alert/>
                <Footer/>
            </div>
        )
    }
}

