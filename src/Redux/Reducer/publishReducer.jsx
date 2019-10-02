import { combineReducers } from 'redux'
import * as types from '../ActionType/ActionTypes'
import {} from './commonReducer'

const title = (state='',action) => {
    switch (action.type) {
        case types.TITLE:
            return action.title
        default:
            return state
    }
}



const content = (state='',action) => {
    switch (action.type) {
        case types.CONTENT:
            return action.content
        default:
            return state
    }
}

const cover = (state='',action) => {
    switch (action.type) {
        case types.COVER:
            return action.cover
        default:
            return state
    }
}

const blobcover = (state='',action) => {
    switch (action.type) {
        case types.BLOBCOVER:
            return action.blobcover
    
        default:
            return state
    }
}

const category = (state="1",action) => {
    switch (action.type) {
        case types.CATEGORY:
            return action.category
        default:
            return state
    }
}


export default combineReducers({
    title,
    content,
    category,
    cover,
    blobcover
})
