import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from '../containers/App'
import Login from '../views/pages/Login'
import Join from '../views/pages/Join'
import Home from '../views/pages/Home'
import {requireAuthentication} from '../components/AuthenticatedComponent'

export default (
    <Route path='/' component={App}>
        <IndexRoute component={requireAuthentication(Home)}/>
        <Route path="login" component={Login}/>
        <Route path="join" component={Join}/>
        <Route path="home" component={requireAuthentication(Home)}>
            <Route path="board" component={Board}/>
            <Route path="talk" component={Talk}/>
        </Route>
    </Route>
)