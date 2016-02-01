import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

export default class Join extends Component{
    constructor(props){
        super(props)
        const redirectRoute = this.props.location.query.next || '/join'
        this.state={
            email:'',
            password:'',
            name:'',
            redirectTo:redirectRoute
        }
    }

    join(e){
        this.props.actions.joinUser(this.state.email,this.state.password,this.state.name,'/login')
    }

    render(){
        return (
            <div>
                Join
                <div>
                    <button disabled={this.props.isjoining} onClick={this.join.bind(this)} >join</button>
                    <Link to='login'>취소</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    isAuthenticating:state.join.isJoining,
    statesText:state.auth.statusText
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(actionCreators,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Join)