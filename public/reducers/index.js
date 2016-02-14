import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'
import auth from './auth'
import duplicate from './duplicate'
import signUp from './signUp'
import home from './home'

export default combineReducers({
    auth,
    duplicate,
    signUp,
    home,
    router: routerStateReducer
})