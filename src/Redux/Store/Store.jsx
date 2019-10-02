import {createStore, applyMiddleware} from 'redux';
import reducer from '../Reducer/IndexReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger'



/**
 * 创建一个 Redux store 来以存放应用中所有的 state，
 * 应用中应有且仅有一个 store。
 */
let middlewares = []
middlewares.push(thunk)

process.env.NODE_ENV !== 'production' ? middlewares.push(logger) : null

let store = createStore(
    reducer,
    applyMiddleware(...middlewares)
);



export default store;