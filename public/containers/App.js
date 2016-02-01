import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export default class App extends Component {
    render(){
        const {dispatch} = this.props
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}