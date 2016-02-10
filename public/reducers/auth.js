import {createReducer} from '../utils'
import {SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS,SIGNIN_USER_FAILURE,SIGNOUT_USER} from '../constants'

const initialState = {
    'token':null,
    'idx':null,
    'name':null,
    'email':null,
    'isAuthenticated':false,
    'isAuthenticating':false,
    'statusText':null
}

export default createReducer(initialState, {
    [SIGNIN_USER_REQUEST]:(state,payload)=>{
        return Object.assign({},state,{
            'isAuthenticating':true,
            'statusText':null
        })
    },
    [SIGNIN_USER_SUCCESS]:(state,payload)=>{
        return Object.assign({},state,{
            'isAuthenticating':false,
            'isAuthenticated':true,
            'token':payload.token,
            'idx':payload.idx,
            'name':payload.name,
            'email':payload.email,
            'statusText':'You have been successfully logged in.'
        })
    },
    [SIGNIN_USER_FAILURE]:(state,payload)=>{
        return Object.assign({},state,{
            'isAuthenticating':false,
            'isAuthenticated':false,
            'token':null,
            'idx':null,
            'name':null,
            'email':null,
            'statusText':`Authentication Error: ${payload.status} ${payload.statusText}`
        })
    },
    [SIGNOUT_USER]:(state,payload)=>{
        return Object.assign({},state,{
            'isAuthenticated':false,
            'token':null,
            'idx':null,
            'name':null,
            'email':null,
            'statusText':'You have been successfully logged out.'
        })
    }
})