import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from '../containers/App'
import SignIn from '../views/pages/SignIn'
import SignUp from '../views/pages/SignUp'
import EditProfile from '../views/pages/EditProfile'
import Home from '../views/pages/Home'
import Boards from '../views/subPages/Boards'
import Board from '../views/subPages/Board'
import {requireAuthentication} from '../components/AuthenticatedComponent'

export default (
    <Route path='/' component={App}>
        <IndexRoute component={SignIn}/>
        <Route path="signIn" component={SignIn}/>
        <Route path="signUp" component={SignUp}/>
        <Route path="editProfile" component={requireAuthentication(EditProfile)}/>
        <Route path="home" component={requireAuthentication(Home)}>
            <Route path="board" component={Board}/>
            <Route path="board/:idx" component={Board}/>
        </Route>
    </Route>
)