import { combineReducers } from 'redux'
import * as types from '../ActionType/ActionTypes'

import home from './homeReducer'
import publish from './publishReducer'
import common from './commonReducer'
import comments from './commentsReducer'


export default combineReducers({
    home,
    publish,
    common,
    comments
})