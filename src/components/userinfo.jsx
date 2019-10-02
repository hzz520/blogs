import React ,{ Component } from 'react' 

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import style from '../styles/userinfo'
import * as actions from '../Redux/Action/commonAction'
import DocumentTitle from 'react-document-title'
import AvatarEditor from 'react-avatar-editor'
import request from 'superagent'


class t extends Component {
    constructor () {
        super()
        this.state = {
            cropImage : false,
            img:'',
            previewImg:'',
            zoom:1,
            rotate:0
        }
    }

    handleYes (name) {
        let that = this
        this.setState({
            cropImage:false,
            rotate:0,
            zoom:1,
            img:''
        },()=>{
            this.props.actions.updateUserInfo({
                type:'avatar',
                avatar:this.state.previewImg,
                name:name
            })
           
           
            // request.post('/api/avatar')
            //     .field('data',JSON.stringify({
            //         name:name
            //     }))
            //     .attach('file',that.dataURLtoFile(that.state.previewImg,'temp'))
            //     .end((err,res)=>{
            //         if(res.ok && res.body.code == 0){
            //             console.log(res.body.data.avatar)
            //         }
            //     })
        })
    }

    handleNo () {
        this.setState({
            cropImage:false,
            rotate:0,
            zoom:1,
            previewImg:'',
            img:''
        })
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), 
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
     

    render () {
        let { userInfo,actions } = this.props
        let { isLogin, info } = userInfo
        let { name, _id, avatar } = info
        let { updateUserInfo } = actions
        
        return (
             <DocumentTitle title='个人资料'>
                {
                    isLogin ? 
                    <div className={`${style.container} content`}>
                       
                       <div>
                           <label>用户名：</label>
                           <input type="text" disabled value={name} />
                        </div>
                       <div>
                            <label>原始密码：</label>
                            <input type="password" placeholder='密码长度为6-16位' ref='oldPassword'/>
                       </div> 
                       <div>
                            <label>新的密码：</label>
                            <input type="password" placeholder='密码长度为6-16位' ref='newPassword'/>
                       </div>
                       <div>
                           <label>头像：</label>
                           <div className={style.avatarBox} >
                               <img data-cls='avatar' src={avatar}
                                    onClick={()=>{
                                
                                        this.setState({
                                            showCanvas:true
                                        },()=>{
                                            this.refs.file.click()
                                        })
                                    }}
                               />
                               <div>点击更新头像</div>
                               <input type="file" data-cls='hid' ref='file' onChange={(e)=>{
                                    let file = e.target.files[0]
                                    this.setState({
                                        img:window.URL.createObjectURL(file),
                                        cropImage:true,
                                        previewImg:''
                                    })
                                    
                                    
                               }}/>
                           </div>
                       </div>
                       <div className={style.btn}
                            onClick={()=>{
                               updateUserInfo({
                                   name:name,
                                   oldPassword:this.refs.oldPassword.value,
                                   newPassword:this.refs.newPassword.value,
                                   type:'password'
                               },()=>{
                                   this.refs.oldPassword.value = ''
                                   this.refs.newPassword.value = ''
                               }) 
                            }}
                       >提交</div>
                       {
                           this.state.cropImage ? 
                           <div className={style.crop} >
                                
                                <div className={style.bg}
                                    onClick={()=>{
                                        this.handleNo()
                                    }}
                                ></div>
                                <div className={style.wrapper}>
                                    <div className={style.close}
                                        onClick={()=>{
                                            this.handleNo()
                                        }}
                                    >x</div>
                                    <AvatarEditor
                                        ref={'canvas'}
                                        image={this.state.img}
                                        width={200}
                                        height={200}
                                        borderRadius={0}
                                        backgroundColor={[255, 255, 255, 0.5]} // RGBA
                                        scale={this.state.zoom}
                                        rotate={this.state.rotate}
                                    />
                                     
                                    <div className={style.panel}>
                                        <span>放大：</span>
                                        <input type="range" step='0.01' min='1' max='2' defaultValue={this.state.zoom} onChange={
                                            (e)=>{
                                                this.setState({
                                                    zoom:Number(e.target.value)
                                                })
                                            }
                                        }/>
                                        <br/><br/>
                                        <span>旋转：</span>
                                        <span className={style.rotate}
                                            onClick={()=>{
                                                this.setState({
                                                    rotate:this.state.rotate - 90
                                                })
                                            }}
                                        >左</span>
                                        <span data-cls='right' className={style.rotate}
                                            onClick={()=>{
                                                this.setState({
                                                    rotate:this.state.rotate + 90
                                                })
                                            }}
                                        >右</span>
                                        <span
                                            className={style.rotate}
                                            onClick={
                                                ()=>{
                                                    
                                                    this.setState({
                                                            previewImg:this.refs.canvas.getImageScaledToCanvas().toDataURL()
                                                    })  
                                                }
                                            }
                                        >预览</span>
                                       <div className={style.previewImgBox} >
                                            <img src={this.state.previewImg} />
                                       </div>
                                       <br/>
                                       <div className={style.rotate}
                                            data-cls='btn'
                                            onClick={()=>{
                                               this.handleYes(name)
                                            }}
                                       >
                                            更新头像
                                       </div>
                                       &nbsp;&nbsp;&nbsp;
                                       <div className={style.rotate}
                                            data-cls='btn'
                                            onClick={()=>{
                                               this.handleNo()
                                            }}
                                       >
                                            取消
                                       </div>
                                    </div>
                                </div>
                                
                           </div>
                          
                           : null
                       }
                    </div>
                    :<div className={`${style.container} ${style.null} content`}>
                        您还未登录
                    </div>
                }
            </DocumentTitle>
        )
    }
}

const mapStateToProps = state => ({
    userInfo:state.common.userInfo
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(actions,dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(t)