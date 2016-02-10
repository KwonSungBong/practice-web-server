import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions'
import {Input, Button} from 'react-bootstrap'

export default class SignUp extends Component{
    constructor(props){
        super(props)
        const redirectRoute = this.props.location.query.next || '/signUp'
        this.state={
            email:'',
            password:'',
            name:'',
            redirectTo:redirectRoute
        }
    }

    signUp(e){
        this.props.actions.signUpUser(this.state.email,this.state.password,this.state.name,'/signIn')
    }
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleNameChange(e){
        this.setState({name: e.target.value});
    }
    handleDuplicateEmail(e){
        this.props.actions.duplicateUserEmail(this.state.email)
    }
    handleDuplicateName(e){
        this.props.actions.duplicateUserName(this.state.name)
    }
    isDisabledSignUp(){
        if(this.props.isDuplicateEmail === false){
            return true
        } else if(this.props.isDuplicateName === false){
            return true
        } else if(this.state.password.trim() === ''){
            return true
        }
        return false;
    }

    render(){
        const isDisabledSignUp = this.isDisabledSignUp()
        return (
            <div>
                signUp
                <div>
                    <Input type="text" label="이메일" value={this.state.email} onChange={this.handleEmailChange.bind(this)} placeholder="email" />
                    <Button onClick={this.handleDuplicateEmail.bind(this)}>이메일중복검사</Button>
                    {this.props.isDuplicateEmail && <span>사용가능</span>}
                    <Input type="text" label="이름" value={this.state.name} onChange={this.handleNameChange.bind(this)} placeholder="name" />
                    <Button onClick={this.handleDuplicateName.bind(this)}>이름중복검사</Button>
                    {this.props.isDuplicateName && <span>사용가능</span>}
                    <Input type="text" label="비밀번호" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} placeholder="password" />

                    <Button bsStyle="primary" disabled={isDisabledSignUp} onClick={this.signUp.bind(this)} >signUp</Button>
                    <Button bsStyle="success"><Link to='signIn'>취소</Link></Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    isSignUping:state.signUp.isSignUping,
    isDuplicateEmail:state.duplicate.isDuplicateEmail,
    isDuplicateName:state.duplicate.isDuplicateName,
    statesText:state.signUp.statusText
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(actionCreators,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)