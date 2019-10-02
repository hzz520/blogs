import React ,{ Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/homeAction'

import '../styles/articleList'

class t extends Component {
    constructor () {
        super()
    }
    renderArticle (articleList) {
        let { clickPreview, delArticle } = this.props.actions
        let { query,pageList,location,isMine,type,userId } = this.props
 
        let { pathname } = location
        if(articleList.length == 0)
            return (
                <li data-cls='null'>
                    {
                        isMine ? '您还未发布文章呢' : '暂无搜索结果'
                    }
                </li>
            )
        let doms = []


        articleList.forEach(function(el,index,arr) {
            let { _id ,name, time, title, content, category, pv, cover } = el
            
            let data = {
                currentpage:1,
                type:'category',
                category:category,
                userId:isMine ? this.props.userId : undefined
            }
            let data1 = {
                query:query,
                pageList:pageList
            }
            doms.push(
                <li  key={index+1}>
                    <Link to={{pathname:'/detail/' + _id }} >
                        <div data-cls='title'>{title}</div>
                        <div data-cls='content'>{content}</div>
                    </Link>
                    <div>
                        <span>作者：</span> 
                        <span>{name}</span> 
                        <span>&nbsp;&nbsp; 阅读量：</span>
                        <span>{pv}</span>
                        <span>&nbsp;&nbsp; 发布时间：</span>
                        <span>{time.minute}</span>
                        <span>&nbsp;&nbsp; 分类：</span>
                        <Link to={{pathname:pathname,query:{category:category}}} onClick={()=>{clickPreview(data,data1)}}>{category==1?'web开发':'node开发'}</Link>
                        { isMine && 
                            <span
                                data-cls='del'
                                onClick={
                                    () => {
                                        delArticle({
                                            query:query,
                                            pageList:pageList,
                                            type:type,
                                            articleId:_id,
                                            userId:userId,
                                            index:index
                                        })
                                    }
                                }
                            >
                                删除
                            </span>
                        }
                    </div>
                </li>
            )
        }, this)
        return doms
    }
    render () {
        const { articleList } = this.props
        return (
            <ul data-cls='articleList'>
                {
                    this.renderArticle(articleList)
                }
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    query:state.home.query,
    pageList:state.home.pageList,
    articleList:state.home.articleList,
    type:state.home.type,
    userId:state.common.userInfo.info._id
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(actions,dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(t)