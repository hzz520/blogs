import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/homeAction'
import * as commentsActions from '../Redux/Action/commentsAction'

import style from '../styles/detail'
import DocumentTitle from 'react-document-title'
import Pages from '../containers/commentsPages'


class t extends Component {
    constructor () {
        super()
        this.state = {
            answerTo:''
        }
    }
    componentDidMount () {
        
        let { actions,params} = this.props
        let { page } = this.props.location.query
        let { _id } = params
       

        actions.ajaxData({
            url:'/api/blog/articleList',
            method:'post',
            data:{
                _id:_id,
                page:page||1
            }
        })
    }
    componentWillUnmount () {
       
        let { details } = this.props.actions
        details({
            name:'',
            category:'',
            content:'',
            cover:'',
            pv:0,
            title:'',
            time:{
                minute:''
            },
            comments:[]
        })
    }

    renderReplys (data,name,i,showTextarea,commentId) {
        let { showTextareaAction} = this.props.actions
        let user = this.props.info.name

        let arr = []
        data.forEach((el,index,array)=>{
            let { avatar, answerBy, answerTo, message, time, _id } = el
            arr.push(
                <li key={index} className={style.item}>
                    <img src={avatar.avatar||''}/>
                    <div>
                        <p>
                            <span className={style.answerBy}>{answerBy}</span>
                            {
                                answerBy == name && answerTo == ''  ? null : <span className={style.answerTo}>&nbsp;回复 { answerTo }</span>
                            }
                            <span className={style.message}>:&nbsp;{message}</span>
                        </p>
                        <div>
                            {
                                answerBy == user && 
                                <span className={style.del}
                                    onClick={()=>{
                                        
                                        this.props.actions.deleteComment({
                                            key:i,
                                            key1:index,
                                            commentId:commentId,
                                            subcommentId:_id,
                                            type:'subcomment',
                                            query:this.props.query,
                                            pageList:this.props.pageList
                                        })
                                    }}
                                >
                                    删除
                                </span>
                            }
                            {time}
                            <span onClick={()=>{
                                showTextareaAction(i)
                                this.refs[i].placeholder = '回复 ' + answerBy + ':'
                                this.setState({
                                    answerTo:answerBy
                                })
                            }}>回复</span>
                        </div>
                    </div>
                </li>
            )
        })
        return arr
    }

    renderComments (comments,articleId,user) {
        
        let { replyArticle,extendAction,showTextareaAction,deleteComment} = this.props.actions
        let { query,pageList } = this.props
        let { limitNum,count,pageNum } = pageList
        let { page } = query
        
        let arr = []
        
        comments.forEach((el,index,array)=>{
            let { reply,replyByOther,extend,showTextarea,_id } = el
            let { name, avatar, message, time } = reply
            let userId = this.props.info._id
            

            arr.push(
                <li key={index} className={style.commentBox}>
                    <div className={style.userInfo}>
                        <img src={avatar.avatar} />
                        <div className={style.name}>{name}</div>
                    </div>
                    <div className={style.replyBox}>
                        <p>{message}</p>
                        <div className={style.timeInfo}>
                            {
                               user == name && <span className={style.delete} onClick={
                                  ()=>{
                                    deleteComment({
                                        articleId:articleId,
                                        commentId:_id,
                                        type:'comment',
                                        query:query,
                                        pageList:pageList,
                                        key: count - index + ( 1 - page ) * limitNum
                                    })
                                  }
                               }>删除</span>
                            }
                            <span className={style.floor}>{ count - index + ( 1 - page ) * limitNum  }楼</span>
                            <span>{time}</span>
                            <span className={ (extend ? '' : style.hid) } onClick={()=>{
                                extendAction(index)
                            }}>
                                {
                                    extend ? '收起回复' : replyByOther.length==0?'回复':`回复(${replyByOther.length})`
                                }
                            </span>
                        </div>
                        {
                                <ul className={style.replyDetails + ' ' + (extend ? '' : style.hid) }>
                                    { replyByOther.length > 0 &&  this.renderReplys(replyByOther,name,index,showTextarea,_id) }

                                    {
                                       replyByOther.length > 0 && <div className={style.showTextarea + ' ' + (extend ? '' : style.hid)  } onClick={()=>{
                                            showTextareaAction(index)
                                            this.setState({
                                                answerTo:''
                                            },()=>{
                                                this.refs[index].placeholder = ''
                                            })
                                        }}>我也说一句</div>
                                    }
                                    
                                    <textarea ref={`${index}`} className={ showTextarea ? '' : style.hid }/>
                                    
                                    <div className={`${style.publish} ${showTextarea ? '' : style.hid}`} onClick={()=>{
                                           
                                        replyArticle({
                                            message:this.refs[`${index}`].value,
                                            _id:_id,
                                            answerBy:user,
                                            type:'floor',
                                            index:index,
                                            answerTo:this.state.answerTo,
                                            userId:userId
                                        },()=>{
                                            this.refs[index].value = ''
                                        })

                                        
                                    }}>发表</div>
                                </ul>
                        }
                        
                    </div>
                </li>
            )
        })
        return arr
    }

    render () {
        let { name, title, content, pv, time, cover,_id,comments } = this.props.details
        let { replyArticle } = this.props.actions
        let { pageList } = this.props
        let user = this.props.info.name
        let userId = this.props.info._id
        
        return (
            <DocumentTitle title='详情页'>
                <div className={'content ' + style.container}>
                    <h1>{title}</h1>
                    <div className={style.info}>
                        <span>作者：</span>
                        <span>{name}</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;阅读量：</span>
                        <span>{pv}</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;发布时间：</span>
                        <span>{time.minute}</span>
                    </div>
                    <div className={style.main}>
                        {
                            cover!='' && 
                                <div className={style.coverImg}>
                                    <img src={cover}/>
                                </div>
                        }
                        <p>{content}</p>
                    </div>
                    <div className={style.messageBox}>
                        <h2>留言区</h2>
                        {
                            comments.length == 0 ? <span>暂无留言</span> : <ul>{this.renderComments(comments,_id,user)}</ul>
                        }
                        {
                            pageList.pageNum >1 && <Pages  location={this.props.location}/>
                        }
                        <h2>发布评论</h2>
                        <div className={style.formItem}>
                            <label>留言：</label>
                            <div className={style.inputDiv}>
                                <textarea ref='textarea' rows='5' cols='30' placeholder='说点什么呢'/>
                            </div>
                        </div>
                        <div className={style.btn} onClick={()=>{
            
                            replyArticle({
                                message:this.refs.textarea.value,
                                _id:_id,
                                answerBy:user,
                                type:'article',
                                userId:userId
                            },()=>{
                                this.refs.textarea.value = ''
                            })
                        }} >提交</div>
                    </div>
                </div> 
            </DocumentTitle>
        )
    }
}

const mapStateToProps = state => ({
    details:state.home.details,
    info:state.common.userInfo.info,
    type:'index',
    query:state.comments.query,
    pageList:state.comments.pageList
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(Object.assign({},commentsActions,{
       ajaxData:actions.ajaxData,
       details:actions.details
   }),dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(t)