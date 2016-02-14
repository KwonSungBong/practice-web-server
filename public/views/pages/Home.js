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

    componentWillMount(){
        if(this.props.boards.length == 0){
            this.props.actions.getBoards()
        }
    }

    render(){
        if(this.props.boards.length > 0){
            this.props.actions.getBoard(this.props.boards[0])
        }

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
    isBoardLoading:state.home.isBoardLoading,
    boards:state.home.boards
})

const mapDispatchToProps=(dispatch)=>({
    actions:bindActionCreators(actionCreators,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)