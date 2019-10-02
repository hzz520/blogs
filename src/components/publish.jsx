import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/publishAction'
import * as commomAction from '../Redux/Action/commonAction' 


import DocumentTitle from 'react-document-title'
import style from '../styles/public.scss'

class t extends Component {
    constructor () {
        super()
    }
    componentDidMount(){
        
    }
    render () {
        let {actions,publish,common,router} = this.props
        let { title, content, cover, category, blobcover} = publish
        let {alert,userInfo} = common
        let {info,isLogin} = common.userInfo
        let {name,_id} = info
     
        return (
            <DocumentTitle title='发布文章'>  
                <div className={'content ' + style.container}>
                    <form className={style.publish}>
                        <div className={style.publishItem}>
                            <label>文章标题：</label>
                            <div>
                                <input value={title} type="text"  placeholder='最少5个字' onChange={(e)=>{
                                    actions.title(e.target.value)
                                }}/>
                            </div>
                        </div>
                        <div className={style.publishItem}>
                            <label>文章内容：</label>
                            <div>
                                <textarea value={content} type="text" rows='10' placeholder='最少20个字,支持markdown写法' onChange={(e)=>{
                                    actions.content(e.target.value)
                                }}/>
                            </div>
                        </div>
                        <div className={style.publishItem}>
                            <label>封面预览：</label>
                            <div className={style.inputDiv}>
                                <img src={blobcover} />
                            </div>
                        </div>
                        <div className={style.publishItem}>
                            <label>上传封面：</label>
                            <div>
                                <input type="file" ref='btn' onChange={(e)=>{
                                    actions.coverToBase64(e.target.files[0])
                                }}/>
                                <span onClick={()=>{this.refs.btn.click()}}>选择本地图片</span>
                            </div>
                        </div>
                        <div className={style.publishItem}>
                            <label>文章类型：</label>
                            <div>
                                <select name="category" id="category"  value={category} onChange={(e)=>{
                                    actions.category(e.target.value)
                                }}>
                                    <option value="1">web开发</option>
                                    <option value="2">node开发</option>
                                </select>
                            </div>
                        </div>
                        <div className={style.publishItem}>
                            
                            <input type="button" value='发布文章' onClick={()=>{actions.publish({
                                _id:_id,
                                isLogin:isLogin,
                                name:name,
                                title:title,
                                content:content,
                                category:category,
                                cover:cover
                            },router)}}/>
                        </div>
                    </form>
                </div> 
            </DocumentTitle>
        )
    }
}

const mapStateToProps = state => ({
    publish:state.publish,
    common:state.common
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(actions,dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(t)