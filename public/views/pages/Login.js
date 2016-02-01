import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

export default class Login extends Component{
    constructor(props){
        super(props)
        const redirectRoute=this.props.location.query.next || '/login'
        this.state = {
            email:'',
            password:'',
            redirectTo:redirectRoute
        }
    }

    login(e){
        this.props.actions.loginUser(this.state.email,this.state.password,this.state.redirectTo)
    }

    render(){
        return (
            <div>
                Login
                <div>
                    <button disabled={this.props.isAuthenticating} onClick={this.login.bind(this)}>login</button>
                    <Link to="join">가입</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    isAuthenticating:state.auth.isAuthenticating,
    statestext:state.auth.statusText
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(actionCreators,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)