import * as types from '../ActionType/ActionTypes'
import request from 'superagent'

import { _alert } from './commonAction'


export const replyArticle = (info,fn) => (dispatch) => {
    let { index, _id, message,  type, answerBy, answerTo, avatar,userId } = info
    //console.log(123)
    
   
    if(answerBy==undefined){
        dispatch(
            _alert({
                isAlert:true,
                content:'请先登录您的账号'
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
   
    if(message=='') {
        
        dispatch(
            _alert({
                isAlert:true,
                content:'请输入回复的内容'
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

    if(answerBy == answerTo) {
        dispatch(
            _alert({
                isAlert:true,
                content:'不能回复自己'
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

    
  
    request.post('/api/blog/comments')
        .send(info)
        .end((err,res)=>{
            if(res.ok) {
               
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
                    if(res.body.code == 0){
                        let temp = type=='article' ? res.body.data.comment : res.body.data
                        dispatch(updateComments(temp,index))
                        if(type=='article') {
                            dispatch(
                                pageListAction({
                                    count:res.body.data.count,
                                    pageNum:res.body.data.pageNum
                                })
                            )
                        }
                        fn && fn()
                    }
               },1000)
            }
        })
    
}

const updateComments = (comments,index) => ({
    type:types.UPDATECOMMENTS,
    comments,
    index
})

export const clickPreview = (info,state) => (dispatch) => {
    let { currentpage, _id, serchPage,userId } = info
    const {query,pageList} = state
    
    
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
    
    let querys = { page:currentpage } 
    let data = {
            page:currentpage,
            limitNum:pageList.limitNum,
            _id:_id
        } 


    dispatch(queryAction(querys))
    
    request.post('/api/blog/commentspage')
        .send(data)
        .end((err,res)=>{
            if(res.ok) {
                
                dispatch(updateComments(res.body.data.comments,'update')) 
                dispatch(pageListAction({
                    count:res.body.data.count,
                    pageNum:res.body.data.pageNum
                }))  
            }
        })
}

const queryAction = query => ({
    type:types.COMMENTSQUERY,
    query
})

export const pageListAction = pageList => ({
    type:types.COMMENTSPAGELIST,
    pageList
})



export const extendAction= (index,extend) => ({
    type:types.EXTEND,
    index,
    extend
})

export const showTextareaAction = (index,showTextarea) => ({
    type:types.SHOWTEXTAREA,
    index,
    showTextarea
})

const delComment = info => ({
    type:types.DELETES,
    info
})

export const deleteComment = (info) => (dispatch) => {
    let { articleId, commentId, subcommentId, type, query, pageList, key, key1 } = info
    let { count, pageNum,limitNum} = pageList
    let currentpage = query.page

    request.post('/api/blog/del')
        .send({
            articleId:articleId,
            commentId:commentId,
            type:type,
            subcommentId:subcommentId,
            key:key1
        })
        .end(function(err,res){
            if(res.ok) {
                dispatch(
                    _alert({
                        isAlert:true,
                        content:res.body.message
                    })
                )
                setTimeout(()=>{
                    var count1 = count - 1
                    dispatch(
                        _alert({
                            isAlert:false,
                            content:''
                        })
                    )
                    if(type == 'comment'){
                        if(currentpage == pageNum && key == 1){
                            let temp = window.location.href.split('?')[0]
                            window.location.href = `${temp}?page=${pageNum-1}`
                            dispatch(
                                queryAction({
                                    page: currentpage === 1 ? currentpage : currentpage - 1
                                })
                            )
                            dispatch(
                                pageListAction({
                                    count:count-1,
                                    pageNum: pageNum === 1 ? pageNum : pageNum-1
                                })
                            )
    
                            dispatch(
                                delComment({
                                    key:key,
                                    Types:'comment'
                                })
                            )
                            dispatch(
                                clickPreview({
                                    currentpage:1,
                                    _id:articleId
                                },{
                                   query:query,
                                   pageList:pageList  
                                })
                            )
                        } else if(currentpage != pageNum && count%limitNum == 1){
                            dispatch(
                                pageListAction({
                                    count:count-1,
                                    pageNum:pageNum-1
                                })
                            )
                            request.post('/api/blog/addOneComment')
                                .send({
                                    page:currentpage,
                                    _id:articleId
                                })
                                .end(function(err,res){
                                    if(res.ok) {
                                        if(res.body.code == 0) {
                                            dispatch(
                                               delComment({
                                                   Types:'comment',
                                                   key:key,
                                                   comment:res.body.data.comment
                                               }) 
                                            )
                                            dispatch(
                                                clickPreview({
                                                    currentpage:1,
                                                    _id:articleId
                                                },{
                                                    query:query,
                                                    pageList:pageList
                                                })
                                            )
                                        }
                                    }
                                })
                        } else {
                            dispatch(
                                pageListAction({
                                    count:count-1,
                                    pageNum:pageNum
                                })
                            )
                            if(count < limitNum)
                                dispatch(
                                    delComment({
                                       Types:'comment',
                                        key:key
                                    })
                                )
                            else if (count != 1)
                            request.post('/api/blog/addOneComment')
                                .send({
                                    page:currentpage,
                                    _id:articleId
                                })
                                .end(function(err,res){
                                    if(res.ok) {
                                        if(res.body.code == 0) {
                                            dispatch(
                                               delComment({
                                                   Types:'comment',
                                                   key:key,
                                                   comment:res.body.data.comment
                                               }) 
                                            )
                
                                        }
                                    }
                                })
                        }
                    } else {
                        dispatch(
                            delComment({
                                Types:'subcomment',
                                key:key,
                                key1:key1
                            }) 
                        )
                        if(res.body.count == 0) {
                            dispatch(
                                showTextareaAction(key,true)
                            )
                        }
                    }
                    
                },1000)
            }
        })
}


