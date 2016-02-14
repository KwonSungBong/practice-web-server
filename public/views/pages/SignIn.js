import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions'
import {Input, Button} from 'react-bootstrap'

export default class SignIn extends Component{
    constructor(props){
        super(props)
        const redirectRoute=this.props.location.query.next || '/home'
        this.state = {
            email:'',
            password:'',
            redirectTo:redirectRoute
        }
    }

    signIn(e){
        this.props.actions.signInUser(this.state.email,this.state.password,this.state.redirectTo)
    }
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }

    render(){
        return (
            <div>
                signIn
                <div>
                    <Input type="text" label="이메일" value={this.state.email} onChange={this.handleEmailChange.bind(this)} placeholder="email" />
                    <Input type="text" label="비밀번호" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} placeholder="password" />
                    <Button bsStyle="primary" disabled={this.props.isAuthenticating} onClick={this.signIn.bind(this)}>signIn</Button>
                    <Link to="signUp"><Button bsStyle="success">signUp</Button></Link>
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

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)