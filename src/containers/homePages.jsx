import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/homeAction'

import pages from '../components/pages'


const mapStateToProps = state => ({
    query:state.home.query,
    pageList:state.home.pageList,
    type:state.home.type,
    userId:state.common.userInfo.info._id
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(actions,dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(pages)