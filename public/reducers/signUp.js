import {createReducer} from '../utils'
import {SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE} from '../constants'

const initialState = {
    'isSignUping':false,
    'statusText':null
}

export default createReducer(initialState, {
    [SIGNUP_USER_REQUEST]:(state,payload)=>{
        return Object.assign({},state,{
            'isSignUping':true,
            'statusText':null
        })
    },
    [SIGNUP_USER_SUCCESS]:(state,payload)=>{
        return Object.assign({},state,{
            'isSignUping':false,
            'statusText':'성공했쩡'
        })
    },
    [SIGNUP_USER_FAILURE]:(state,payload)=>{
        return Object.assign({},state,{
            'isSignUping':false,
            'stateusText':`Join Error: ${payload.status} ${payload.statusText}`
        })
    }
})