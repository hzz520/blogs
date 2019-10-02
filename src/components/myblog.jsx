import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/homeAction'
import request from 'superagent'

import DocumentTitle from 'react-document-title'
import style from '../styles/myblog'

import ArticleList from './articList'
import Pages from '../containers/homePages'

class t extends Component {
    constructor () {
        super()
    }
    componentDidMount () {
        let { clickPreview } = this.props.actions
        let { query,pageList,userInfo  } = this.props
        const {page,category,keyword} = this.props.location.query
        let currentpage =  page ?  page : 1

        request.post('/api/blog/getUserInfo')
            .end(function(err,res){
                if(res.ok){
                    
                    let data = category ? {
                        currentpage:currentpage,
                        type:'category',
                        category:category,
                        userId:res.body.data._id
                    } : {
                        currentpage:currentpage,
                        type:'index',
                        userId:res.body.data._id
                    }
                    let data1 = {
                        query:query,
                        pageList:pageList
                    }
                    clickPreview(data,data1)
  
                }
            })
        
    }
    render () {
        let { articleList, userInfo, query, pageList } = this.props
        let { isLogin, info } = userInfo
        let { name, _id, avatar } = info
        
        return (
            <DocumentTitle title='我的博客'>
                {
                    isLogin ? 
                    <div className={`${style.container} content`}>
                        <ArticleList isMine={true} location={this.props.location}/>
                        {
                           pageList.pageNum > 1 &&  <Pages isMine={true} location={this.props.location}/>
                        }
                    </div>
                    :<div className={`${style.container} ${style.null} content`}>
                        您还未登录
                    </div>
                }
            </DocumentTitle>
        )
    }
}

const mapStateToProps = state => ({
    query:state.home.query,
    pageList:state.home.pageList,
    articleList:state.home.articleList,
    userInfo:state.common.userInfo,
    type:'index'
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(actions,dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(t)