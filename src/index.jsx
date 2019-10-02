
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import route from './Router/Route'
import store from './Redux/Store/Store'
// import App from './containers/App'

import 'babel-polyfill'

/*
 |--------------------------------------------------------------------------
 | public stylesheet
 |--------------------------------------------------------------------------
 |
 */
import '../libs/scss/normalize.scss'
import '../libs/scss/public.scss'

// store.subscribe(render)



let render = () => ReactDOM.render(
    <Provider store={store}>
        { route }
    </Provider>
, document.getElementById('root'))

render()