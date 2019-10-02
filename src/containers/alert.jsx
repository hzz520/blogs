import React, { Component } from 'react'
import { connect } from 'react-redux'

import style from '../styles/alert.scss'

class t extends Component {
    constructor () {
        super()
    }

    render () {
        let { alert } = this.props.common
        var cls1 = alert.isAlert ? style.show  : style.hid
        return (
            <div className={style.alert + ' ' + cls1 }>
                {alert.content}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    common:state.common
})


export default  connect (mapStateToProps)(t)