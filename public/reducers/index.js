import {combineReducers} from 'redux'
import {routerStateReducer} from 'redux-router'
import auth from './auth'
import duplicate from './duplicate'
import signUp from './signUp'
import boards from './boards'

export default combineReducers({
    auth,
    duplicate,
    signUp,
    boards,
    router: routerStateReducer
})