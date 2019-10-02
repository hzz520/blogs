import React ,{ Component } from 'react'
import { IndexLink,Link } from 'react-router'

import '../styles/pages.scss'
export default class t extends Component {
    constructor (props) {
        super(props)
        this.state = {
            page:1
        }
    }
    componentDidMount () {
        
        let { page, category } = this.props.location.query
        let { _id, pageList,actions  } = this.props
        
        this.setState({
            page:page||1
        })
        
        
    }
    renderBtns (pageNum,data) {
        let { query, pageList,type,actions,location,_id,isMine,userId} = this.props
        let { clickPreview }  = actions
        let {count,limitNum} = pageList
        let {page,category,keyword} = query
        let {pathname } = location
        var doms = []
        if(pageNum<8) {
            for(let i=1; i<pageNum + 1; i++){
                doms.push( 
                    <li key={i}>
                        <IndexLink activeClassName={'active'}  to={{pathname:pathname,query:{page:i,category:category,keyword:keyword}}} onClick={()=>{
                            clickPreview({
                                currentpage:i,
                                type:type,
                                category:category,
                                keyword:keyword,
                                _id:_id,
                                userId:isMine ? userId :undefined
                            },data)
                        }}>{ i }</IndexLink>
                    </li>
                )
            }
        }
        else {
            var start = 1,end=7
            if(page > 3 && page < pageNum - 3){
                start = page - 3
                end = page + 3
            } else if(page >= pageNum - 3 && page < pageNum + 1) {
                start = pageNum - 6
                end = pageNum
            } 
            for(let i=start; i < end + 1; i++){
                doms.push( 
                    <li key={i} >
                        <IndexLink activeClassName={'active'}   to={{pathname:'/',query:{page:i,category:category,keyword:keyword}}} onClick={()=>{
                            clickPreview({
                                currentpage:i,
                                type:type,
                                category:category,
                                keyword:keyword,
                                _id:_id,
                                userId:isMine ? userId :undefined
                            },data)
                        }}>{ i }</IndexLink>
                    </li>
                )
            }
        }
        return doms
    }
    render () {
        
        let { query, pageList,type,actions,location,_id,userId,isMine } = this.props
        let { pathname } = location
        let { clickPreview } = actions
        let {count,limitNum,pageNum} = pageList
        let {page,category,keyword} = query
        let data = {
            query:query,
            pageList:pageList
        }
        
          
        return (
                <ul data-cls='pages'>
                    {
                        pageNum > 7 && 
                            ( <li onClick={()=>{
                                actions.clickPreview({
                                    currentpage:1,
                                    category:category,
                                    type:type,
                                    keyword:keyword,
                                    _id:_id,
                                    userId:isMine ? userId :undefined
                                },data)
                            }}>
                                <Link data-cls='pageBtn'  to={{pathname:pathname,query:{
                                    path:1,
                                    category:category,
                                    keyword:keyword
                                }}}>首页</Link>
                            </li> )
                    }
                    <li onClick={()=>{
                        clickPreview({
                            currentpage:Number(page)-1,
                            serchPage:'btn',
                            category:category,
                            type:type,
                            keyword:keyword,
                            _id:_id,
                            userId:isMine ? userId :undefined
                        },data)
                    }}>
                        <Link data-cls='pageBtn'  to={{pathname:pathname,query:{
                            page:page==1 ? 1 : Number(page)-1,
                            category:category,
                            keyword:keyword
                        }}}>上一页</Link>
                    </li> 
                    {
                        page <= pageNum && this.renderBtns(pageNum,data)
                    }
                    <li onClick={()=>{
                        clickPreview({
                            currentpage:Number(page)+1,
                            serchPage:'btn',
                            category:category,
                            type:type,
                            keyword:keyword,
                            _id:_id,
                            userId:isMine ? userId :undefined
                        },data)
                    }}>
                        <Link data-cls='pageBtn'  to={{pathname:pathname,query:{
                            page: page == pageNum ? pageNum : Number(page)+1,
                            category:category,
                            keyword:keyword
                        }}}>下一页</Link>
                    </li>
                    {
                        pageNum > 7 && 
                        (<li onClick={()=>{
                            clickPreview({
                                currentpage:pageNum,
                                type:type,
                                category:category,
                                keyword:keyword,
                                _id:_id,
                                userId:isMine ? userId :undefined
                            },data)
                        }}>
                            <Link data-cls='pageBtn' to={{pathname:pathname,query:{
                            page: pageNum,
                            category:category,
                            keyword:keyword
                        }}}>尾页</Link>
                        </li> )
                    }
                    <li data-cls='inputWrap'>
                        <input type="text" ref='input' onChange={(e)=>{
                            this.setState({
                                page:e.target.value
                            })
                        }}/>
                    </li>
                    <li onClick={
                        ()=>{
                            clickPreview({
                                currentpage:this.state.page,
                                serchPage:true,
                                type:type,
                                category:category,
                                keyword:keyword,
                                _id:_id,
                                userId:isMine ? userId :undefined
                            },data)
                            this.refs.input.value = ''
                        }
                    }>
                        <Link data-cls='pageBtn' to={{pathname:pathname,query:{
                            page: this.state.page > pageNum ? page : this.state.page,
                            category: category,
                            keyword:keyword
                        }}}>跳转</Link>
                    </li>
                </ul>      
           
        )
    }
}

