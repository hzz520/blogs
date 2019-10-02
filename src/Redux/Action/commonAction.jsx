import * as types from '../ActionType/ActionTypes'
import request from 'superagent'


export const _alert = alert => ({
    type:types.ISALERT,
    alert
}) 

export const switchTab = isShow => ({
    type:types.SWITCHTAB, 
    isShow
})

const modelData = modelData => ({
    type:types.MODELDATA,
    modelData
})

const userInfo = userInfo => ({
    type:types.USERINFO,
    userInfo
})

export const getUserInfo = () => (dispatch) => {
    request.post('/api/blog/getUserInfo')
        .end(function(err,res){
            if(res.ok){
                // console.log(res.body.data)
                dispatch(
                    userInfo({
                        isLogin:res.body.code==0 ? true : false,
                        info:res.body.data
                    })
                )
               
            }
        })
}

const loginOutAction = isLogin =>({
    type:types.ISLOGIN,
    isLogin
})

export const loginOut = (isLogin) => (dispatch) => {
    request.post('/api/blog/loginOut')
        .end(function(err,res){
            if(res.ok){
                
                dispatch(userInfo({
                    isLogin:false,
                    info:{}
                }))
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
                },1000)
            }
        })
}

export const loginSubmit  = (userInfos,router) => (dispatch) => {
    let {name,password} = userInfos


    if(name.length<2){
        dispatch(
            _alert({
                isAlert:true,
                content:'用户名格式不正确'
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


    if(password.length<6){
        dispatch(
            _alert({
                isAlert:true,
                content:'密码格式不正确'
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


    request.post('/api/blog/login')
        .send(userInfos)
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
                },1000)
                if(res.body.code==0){
                    let { code, data, message } = res.body
                    dispatch(userInfo({
                        isLogin:true,
                        info:res.body.data
                    }))
                    dispatch(modelData({
                        isShow:false,
                        data:{
                            code:code,
                            info:data,
                            message:message,

                        }
                    }))
                    // router.push('/')
                }
            }
        })
}

export const registerSubmit = (userInfos) => (dispatch) => {
    let { name,password,repassword } = userInfos
    if(name.length<2){
        dispatch(
            _alert({
                isAlert:true,
                content:'用户名长度为2-10位'
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


    if(password.length<6){
        dispatch(
            _alert({
                isAlert:true,
                content:'密码长度为6-16位'
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
    if(repassword!=password) {
        dispatch(
            _alert({
                isAlert:true,
                content:'两次输入密码不一致'
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

    request.post('/api/blog/register')
        .set('Content-Type', 'application/json')
        .send({
            name:name,
            password:password
        }).end(function(err,res){
            if(res.ok) {
                if(res.body.code==1){
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
                    },1000)
                } else if(res.body.code==0){
                    let { code, data, message } = res.body
                    
                   
                    dispatch(modelData({
                        isShow:false,
                        data:{
                            code:code,
                            info:data,
                            message:message
                        }
                    }))
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
                    },1000)
                }
            }
        })
}

export const updateUserInfo = (info,fn) => (dispatch) => {
    let { name,  oldPassword, newPassword ,avatar, type } = info
    let message

    if(type != 'avatar'){
    
        if(oldPassword.length<5||oldPassword.length>16)
            message = '旧密码格式不正确'
        else if(newPassword.length<5||newPassword.length>16)
            message = '新密码格式不正确'
        else if(newPassword == oldPassword)
            message = '新密码不能和旧密码一致'
    } else {
        if(avatar=='')
            message = '你还未裁剪图片'
    }

    if(message){
        dispatch(
            _alert({
                isAlert:true,
                content:message
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

    request.post('/api/blog/updateUserInfo')
        .send(info)
        .end(function(err,res){
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
                    if(res.body.code==0){
                        dispatch(userInfo(res.body.data))
                        fn && fn()
                    }
                },1000)
            }
        })
}