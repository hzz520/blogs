import { combineReducers } from 'redux'
import * as types from '../ActionType/ActionTypes'

const alert = (state={isAlert:false,content:''},action) => {
    switch (action.type) {
        case types.ISALERT:
            return Object.assign({},state,{
                isAlert:action.alert.isAlert,
                content:action.alert.content
            })
        default:
            return state
    }
}

const modelData = (state={isShow:false,data:{}},action) => {
    switch (action.type) {
        case types.MODELDATA:
            return Object.assign({},state,{
                isShow:action.modelData.isShow,
                data:action.modelData.data
            })
        case types.SWITCHTAB:
            return Object.assign({},state,{
                isShow:action.isShow
            })
    
        default:
            return state
    }
}

const userInfo = (state={isLogin:false,info:{}},action) => {
    switch (action.type) {
        case types.USERINFO:
            return Object.assign({},state,{
                isLogin:action.userInfo.isLogin,
                info:action.userInfo.info
            })
        case types.ISLOGIN:
            return Object.assign({},state,{
                isLogin:action.isLogin
            })
        default:
            return state
    }
}

export default combineReducers({
    alert,
    modelData,
    userInfo
})