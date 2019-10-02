import React ,{ Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/homeAction'




import style from '../styles/home.scss'


import DocumentTitle from 'react-document-title'
import ArticleList from './articList'
import Pages from '../containers/homePages'

class t extends Component {
    constructor () {
        super()
    }
    
    componentDidMount () {
        

        let { clickPreview } = this.props.actions
        let { query,pageList  } = this.props
        const {page,category,keyword} = this.props.location.query
        let currentpage =  page ?  page : 1

        let data = category ? {
            currentpage:currentpage,
            type:'category',
            category:category
        } : keyword ? {
            currentpage:currentpage,
            type:'serch',
            keyword:keyword
        } :{
            currentpage:currentpage,
            type:'index'
        }  

        let data1 = {
            query:query,
            pageList:pageList
        }

        clickPreview(data,data1)
    }
    render () {
        const {query,actions,articleList,pageList} = this.props
       
        return (
            <DocumentTitle title='首页'>
                <div className= { 'content ' + style.container}>
                    <ArticleList location={this.props.location}/>
                    {
                        pageList.pageNum > 1 && <Pages location={this.props.location} />
                    }
                 </div>
            </DocumentTitle> 
        )
    }
}

const mapStateToProps = state => ({
    query:state.home.query,
    pageList:state.home.pageList,
    articleList:state.home.articleList,
    type:state.home.type
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(actions,dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(t)
