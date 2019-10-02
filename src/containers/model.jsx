import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/commonAction'

import style from '../styles/model.scss'

class t extends Component {
    constructor () {
        super()
    }

    renderForm (modelData,actions) {
    
        let { isShow } = modelData
        let { router } = this.props
       
        if(isShow == false) 
            return null
        return (
            <form className={style.panel}>
                <i onClick={()=>{actions.switchTab(false)}}>x</i>
                <div className={style.title}>欢迎{isShow=='regShow'?'注册':'登录'}</div>
                <div className={style.item}>
                    <label>用户名：</label>
                    <div className={style.inputDiv}>
                        {
                            isShow == 'regShow'?
                            <input type="text" maxLength='10' placeholder='长度为2-10' ref='name'/>
                            :<input type="text" maxLength='10' ref='name'/>
                        }
                    </div>
                </div>
                <div className={style.item}>
                    <label>密码：</label>
                    <div className={style.inputDiv}>
                       {
                            isShow == 'regShow'?
                            <input maxLength='16' type="password" placeholder='长度为6-16' ref='password'/>
                            :<input maxLength='16' type="password" ref='password'/>
                        }
                    </div>
                </div>
                {
                    isShow == 'regShow' && (
                            <div className={style.item}>
                                <label>确认密码：</label>
                                <div className={style.inputDiv}>
                                    <input maxLength='10' type="password" placeholder='长度为6-16' ref='repassword'/>
                                </div>
                            </div>
                        )
                }
                
                <input  type="button" value={isShow == 'regShow'?'注册':'登录'} onClick={()=>{
                    let { name, password, repassword } = this.refs
                    
                    if(isShow == 'regShow'){
                        actions.registerSubmit({
                            name:name.value,
                            password:password.value,
                            repassword:repassword.value
                        })
                    } else {
                        actions.loginSubmit({
                            name:name.value,
                            password:password.value  
                        },router)
                    }
                }}/>
                
            </form>
        )
    }

    render () {
        let { modelData,actions } = this.props
        
        return (
            <div className={!modelData.isShow ? style.model + style.hid + '': style.model }>
                <div className={style.modelbg} onClick={()=>{actions.switchTab(false)}}></div>
                {this.renderForm(modelData,actions)}
            </div>
        )
    }

}

const mapStateToProps = state => ({
    modelData:state.common.modelData
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(actions,dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(t)