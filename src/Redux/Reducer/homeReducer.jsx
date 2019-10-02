import { combineReducers } from 'redux'
import * as types from '../ActionType/ActionTypes'

const queryState = {
    page:1
}

const pageListState = {
    count:0,
    limitNum:5,
    pageNum:0
}

const detailsState = {
    category:"1",
    content:"",
    cover:"",
    name:"",
    pv:0,
    time:{
        date:new Date(),
        day:'',
        minute:'',
        month:'',
        year:''
    },
    title:'',
    _id:'',
    comments:[]
}



const details = (state=detailsState,action) => {
    switch (action.type) {
        case types.DETAILS:
            var temp = Object.assign({},state,{
                 category:action.details.category,
                 content:action.details.content,
                 cover:action.details.cover,
                 name:action.details.name,
                 pv:action.details.pv,
                 time:action.details.time,
                 title:action.details.title,
                 _id:action.details._id,
                 comments:action.details.comments
            })
            
            temp.comments.forEach((el,index,arr)=>{
                el.extend = el.replyByOther.length == 0 ? false :true
                el.showTextarea = el.replyByOther.length == 0 ? true : false 
            }, this);

            return temp

        case types.EXTEND:
             
             var newObj = Object.assign({},state,{})
             newObj.comments[action.index].extend = action.extend == undefined ? newObj.comments[action.index].extend ? false : true : action.extend
             
             return newObj

        case types.SHOWTEXTAREA:
            
            var newObj = Object.assign({},state,{})
            newObj.comments[action.index].showTextarea = action.showTextarea == undefined ? (newObj.comments[action.index].showTextarea ? false : true) : action.showTextarea 
            
            return newObj

        case types.UPDATECOMMENTS:

            var newObj = Object.assign({},state,{})
           
            if(action.index == undefined ){

                if(newObj.comments.length == 5)
                    newObj.comments.pop()
                newObj.comments.unshift(action.comments)
                
                newObj.comments[0].extend = false
                newObj.comments[0].showTextarea = true

            } else if(action.index=='update'){

                newObj.comments = action.comments
                
                newObj.comments.forEach((el,index,arr)=>{
                    el.extend = el.replyByOther.length == 0 ? false :true
                    el.showTextarea = el.replyByOther.length == 0 ? true : false 
                }, this)

            }  else {

                newObj.comments[action.index].replyByOther.push(action.comments) 
            }

            return newObj
   
        case types.DELETES :
            
            let newObj = Object.assign({},state,{})
            let {comment,Types,key,key1} = action.info
            if(Types == 'comment') {
               comment ? newObj.comments.splice(key,1).push(comment) : newObj.comments.splice(key,1)
            } else {
                newObj.comments[key].replyByOther.splice(key1,1)
            }
            return newObj
        default:
            return state
    }
}

const type = (state='index',action) => {
    switch (action.type) {
        case types.TYPE:
            
            return action.newType
    
        default:
            return state
    }
}

const query = (state=queryState,action) => {
    switch (action.type) {
        case types.QUERY:
          
            return action.query
        default:
            return state
    }
}

const  pageList = (state=pageListState,action) => {
    switch (action.type) {
        case types.PAGELIST:
            return Object.assign({},state,{
                count:action.pageList.count,
                pageNum:action.pageList.pageNum
            })
        default:
            return state
    }
}

const articleList = (state=[],action) => {
    switch (action.type) {
        case types.ARTICLELIST:
            return action.articleList
        default:
            return state
    }
}

export default combineReducers({
    query,
    pageList,
    articleList,
    details,
    type
})