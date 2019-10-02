import * as types from '../ActionType/ActionTypes'
import request from 'superagent'

import * as common from './commonAction'
let { _alert } = common



export const title = title => ({
    type:types.TITLE,
    title
})

export const content = content => ({
    type:types.CONTENT,
    content
})

export const category = category => ({
    type:types.CATEGORY,
    category
})

const cover =  cover => ({
    type:types.COVER,
    cover
})

const blobcover = blobcover => ({
    type:types.BLOBCOVER,
    blobcover
})

export const coverToBase64= (file) => (dispatch) => {
    
    dispatch(blobcover(window.URL.createObjectURL(file)))
    dispatch(cover(file))

    // let reader = new FileReader()
    // reader.readAsDataURL(file)
    // reader.onload = function(e) {
    //     dispatch(cover(e.target.result))
    // }
}

export const publish = (publish,router) => (dispatch) => {
    
    if(publish.isLogin==false) {
        dispatch(
            _alert({
                isAlert:true,
                content:'登录后才可以发布文章'
            })
        )
        setTimeout(()=>{
            dispatch(
                _alert({
                    isAlert:false,
                    content:''
                })
            )
        },1000)
        return
    }
    if(publish.title.length<5) {
        dispatch(
            _alert({
                isAlert:true,
                content:'标题最少5个字'
            })
        )
        setTimeout(()=>{
            dispatch(
                _alert({
                    isAlert:false,
                    content:''
                })
            )
        },1000)
        return
    }
    if(publish.content.length<20) {
        dispatch(
            _alert({
                isAlert:true,
                content:'内容最少20个字'
            })
        )
        setTimeout(()=>{
            dispatch(
                _alert({
                    isAlert:false,
                    content:''
                })
            )
        },1000)
        return
    }

    request.post('/api/blog/publish')
        .field('data',JSON.stringify({
            _id:publish._id,
            name:publish.name,
            title:publish.title,
            content:publish.content,
            category:publish.category
        }))
        .attach( 'cover',publish.cover==''?{}:publish.cover)
        // .send({
        //     _id:publish._id,
        //     name:publish.name,
        //     title:publish.title,
        //     content:publish.content,
        //     cover:publish.cover,
        //     category:publish.category
        // })
        .end(function(err,res){
            
            if(res.ok){
                 dispatch(
                    _alert({
                        isAlert:true,
                        content:res.body.message
                    })
                 )
                setTimeout(function(){
                     dispatch(
                        _alert({
                            isAlert:false,
                            content:''
                        })
                     )
                    if(res.body.code==0){
                        dispatch(title(''))
                        dispatch(content(''))
                        dispatch(cover(''))
                        dispatch(blobcover(''))
                        router.push('/')
                    }
                },1000)
            }
            
        })

}