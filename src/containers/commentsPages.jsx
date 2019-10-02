import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Redux/Action/commentsAction'

import pages from '../components/pages'

const mapStateToProps = state => ({
    query:state.comments.query,
    pageList:state.comments.pageList,
    type:'index',
    _id:state.home.details._id
})

const mapDispatchToProps = dispatch => ({
   actions:bindActionCreators(actions,dispatch)
})

export default  connect (mapStateToProps,mapDispatchToProps)(pages)
