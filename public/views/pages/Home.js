import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions'
import Header from '../components/Header'
import Content from '../components/Content'

export default class Home extends Component{
    constructor(props){
        super(props)
        const redirectRoute=this.props.location.query.next || '/signIn'
        this.state = {
            redirectTo:redirectRoute
        }
    }

    componentDidMount(){
        this.props.actions.getBoards()
    }

    render(){
        return (
            <div>
                <span>ÇÑ±Û</span>
                <Header/>
                <Content/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(actionCreators,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)