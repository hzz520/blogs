/**
 * Action（动作）实质上是包含 `type` 属性的普通对象
 * Action Creator 可以是同步的，也可以是异步的
 * Action Creator 是 action 的创造者，本质上就是一个函数，返回值是一个 action（对象）
 * @author  Darcy.X <darcyonw@163.com>
 */


import * as types from '../ActionType/ActionTypes'
import request from 'superagent'
import {_alert} from './commonAction'
import { pageListAction } from './commentsAction'


const clickLi = query => ({
    type:types.QUERY,
    query
})



export const serchSubmit = (info,router) => (dispatch) => {


    let { keyword, currentpage, type, pageList } = info

    router.push({
        pathname:'/',
        query:{
            keyword:keyword,
            page:currentpage
        }
    })
    
    if(router.location.pathname != '/' )
        return
    
    let querys = {
        keyword:keyword,
        page:currentpage
    }
    let data = Object.assign({},querys,{
        limitNum:pageList.limitNum,
        type:type
    })
    if(keyword == '') {
        dispatch(
            _alert({
                isAlert:true,
                content:'请输入关键字'
            })
        )
        setTimeout(function(){
            dispatch(_alert({
                isAlert:false,
                content:''
            }))
        },1000)
        return
    } 
    dispatch(typeAction(type))
    dispatch(clickLi(querys))
    dispatch(
        ajaxData({
            url:'/api/blog/articleList',
            method:'post',
            data:data
        },router,querys)
    )

}

export const clickPreview = (info,state) => (dispatch) => {
    let { currentpage,type,serchPage,category,keyword,userId } = info
    let {query,pageList} = state
    if(serchPage){
        var num = Number(currentpage)
        
        if( isNaN(num) || num > pageList.pageNum || num < 1 ) {
            var message = num < 1 ? '请输入大于0的页码数' : (isNaN(num) ? '请输入数字类型的页码' : '您输入的页码超过最大页码数，请重新输入')
            if(serchPage=='btn')
                message = num < 1 ? '已经是第一页了' : num > pageList.pageNum ? '已经是最后一页了': ''
            dispatch(
                _alert({
                    isAlert:true,
                    content:message
                })
            )
            setTimeout(function(){
                dispatch(
                    _alert({
                        isAlert:false,
                        content:''
                    })
                )
            },1000)
            return
        }
    }
    
    let querys = type == 'index' ? { page:currentpage } : type == 'category' ?  { page:currentpage,category:category } : { page:currentpage,keyword:keyword }
    let data = type == 'index' ? {
            page:currentpage,
            limitNum:pageList.limitNum,
            type:type,
            userId:userId
        } : type == 'category' ? {
            page:currentpage,
            limitNum:pageList.limitNum,
            category:category,
            type:type,
            userId:userId
        }: {
            page:currentpage,
            limitNum:pageList.limitNum,
            type:type,
            keyword:keyword
        }
    
    

    dispatch(typeAction(type))
    dispatch(clickLi(querys))
    
    dispatch(
        ajaxData({
            url:'/api/blog/articleList',
            method:'post',
            data:data
        })
    )
}


export const details =  details => ({
    type:types.DETAILS,
    details
})



const pageList = pageList => ({
    type:types.PAGELIST,
    pageList
})

export const typeAction = newType => ({
    type:types.TYPE,
    newType
})


const receiveArticleList = articleList => ({
    type:types.ARTICLELIST,
    articleList
})

export const ajaxData = (requestInfo) => (dispatch) => {
    const {method,url,data} = requestInfo
    if(method === 'post')
        request.post(url) 
            .send(data)
            .end((err,res)=>{
                if (res.ok){
                   
                    if(res.body.data.articleList){
                        dispatch(receiveArticleList(res.body.data.articleList))
                        dispatch(
                            pageList({
                                count:res.body.data.count,
                                pageNum:res.body.data.pageNum
                            })
                        )
                    } else if(res.body.data.article){
                        
                        dispatch(pageListAction({
                            count:res.body.data.count,
                            pageNum:res.body.data.pageNum
                        }))
                        dispatch(details(res.body.data.article))
                    }
                }
            })
    else
        request.get(url)    
            .query(data)
            .end((err,res)=>{
                if (res.ok){
                    if(res.body.data.articleList){
                        
                        dispatch(receiveArticleList(res.body.data.articleList))
                        dispatch(
                            pageList({
                                count:res.body.data.count,
                                pageNum:res.body.data.pageNum
                            })
                        )
                    } else if(res.body.data.article){
                        
                        dispatch(details(res.body.data.article))
                        
                    }
                }
            })
}

export const delArticle = (info) => (dispatch) => {
    
    let { query,type,articleId,userId,index } = info
    
    let currentpage = query.page

   

    request.post('/api/blog/delArticle')
        .send({
            page:currentpage,
            limitNum:info.pageList.limitNum,
            articleId:articleId,
            type:type,
            category:query.category,
            userId:userId,
            index:index
        })
        .end(function(err,res){
            if(res.ok){
                dispatch(
                    _alert({
                        isAlert:true,
                        content:res.body.message
                    })
                )
                setTimeout(()=>{
                    dispatch(
                        _alert({
                            isAlert:false,
                            content:''
                        })
                    )
                  
                    dispatch(receiveArticleList(res.body.data.articleList))
                    dispatch(
                        pageList({
                            count:res.body.data.count,
                            pageNum:res.body.data.pageNum
                    }))
                },1000)
            }
        })
}




















