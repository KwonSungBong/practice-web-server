import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'
import auth from './auth'
import join from './join'


export default combineReducers({
    auth,
    join,
    router: routerStateReducer
})