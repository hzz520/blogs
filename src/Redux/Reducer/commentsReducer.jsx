import { combineReducers } from 'redux'
import * as types from '../ActionType/ActionTypes'

const queryState = {
    page:1
}
const pageListState = {
    count:0,
    pageNum:0,
    limitNum:5
}

const query = (state=queryState,action) => {
    switch (action.type) {
        case types.COMMENTSQUERY:

            return action.query
    
        default:
            return state
    }
}

const pageList = (state=pageListState,action) => {
    switch (action.type) {
        case types.COMMENTSPAGELIST:

            return Object.assign({},state,{
                count:action.pageList.count,
                pageNum:action.pageList.pageNum
            })
    
        default:
            return state
    }
}

export default combineReducers({
    query,
    pageList
})

