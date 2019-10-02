import React,{ Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/commonAction'
import * as homeActions from '../Redux/Action/homeAction'


import style from '../styles/header'

class t extends Component {
    constructor () {
        super()   
    }
    componentDidMount(){
        let { getUserInfo } = this.props.actions
        getUserInfo()
    }
    render () {
        let { actions,modelData,userInfo,pageList,router } = this.props
        let { isLogin, info } = userInfo
        return (
            <div className={style.header}>
                <div className={style.topTips}>
                    <div className={style.welcome + ' content'}>
                        {!isLogin && <span className={style.isLogin}>登录即可发布文章</span>}
                        {isLogin?
                            <span>
                                {info.name}&nbsp;欢迎您的到来&nbsp;<a onClick={()=>{actions.loginOut(false)}}>退出登录</a>
                            </span>
                            :<span>欢迎您访问&nbsp;请&nbsp;<a onClick={()=>{actions.switchTab('loginShow')}}>登录</a>&nbsp;或&nbsp;<a onClick={()=>{actions.switchTab('regShow')}}>注册</a></span>
                        }
                    </div>
                </div>
               
                <div className={ style.logo + ' content'}>
                    <Link href="/">个人网站</Link>
                    <form className={style.serchForm}>
                        <input ref='keyword' type="text" name='keyword' placeholder='可以搜索标题、作者或者内容'/>
                        <div className={style.btn} onClick={()=>{
                            actions.serchSubmit({
                                keyword:this.refs.keyword.value,
                                type:'serch',
                                currentpage:1,
                                pageList:pageList
                            },router)
                            this.refs.keyword.value = ''
                        }}>提交</div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    modelData:state.common.modelData,
    userInfo:state.common.userInfo,
    pageList:state.home.pageList
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(Object.assign({},actions,{
       serchSubmit:homeActions.serchSubmit
   }),dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(t)