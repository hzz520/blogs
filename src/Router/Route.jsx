
import React, {Component} from 'react'
import {Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router'
import App from '../containers/index'

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;



const Home = (nextState, cb) => {
    
    require.ensure([],require=>{
        cb(null,require('../components/home').default)
    }, 'Home')
};

const Detail = (nextState, cb) => {
    
    require.ensure([],require=>{
        cb(null,require('../components/detail').default)
    }, 'Detail')
};

const Publish = (nextState, cb) => {
    
    require.ensure([],require=>{
        cb(null,require('../components/publish').default)
    }, 'Publish')
}

const About = (nextState, cb) => {
    
    require.ensure([],require=>{
        cb(null,require('../components/about').default)
    }, 'About')
}

const Myblog = (nextState, cb) => {
    
    require.ensure([],require=>{
        cb(null,require('../components/myblog').default)
    }, 'Myblog')
}

const UserInfo = (nextState, cb) => {
    
    require.ensure([],require=>{
        cb(null,require('../components/userinfo').default)
    }, 'UserInfo')
}


const RouteConfig = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute getComponent={Home}/>
            <Route path='/detail/:_id' getComponent={Detail}/>     
            <Route path='/publish' getComponent={Publish}/>
            <Route path='/about' getComponent={About}/>
            <Route path='/myblog' getComponent={Myblog}/>
            <Route path='/userinfo' getComponent={UserInfo}/>
        </Route>
    </Router>
);



export default RouteConfig;