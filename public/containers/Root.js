import React, {Component,PropTypes} from 'react'
import {Provider} from 'react-redux'
import routes from '../routes'
import {ReduxRouter} from 'redux-router'

export default class Root extends Component{
    render(){
        return (
            <div>
                <Provider store={this.props.store}>
                    <ReduxRouter>
                        {routes}
                    </ReduxRouter>
                </Provider>
            </div>
        )
    }
}