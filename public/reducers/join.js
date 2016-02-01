import {createReducer} from '../utils'
import {JOIN_USER_REQUEST, JOIN_USER_SUCCESS, JOIN_USER_FAILURE} from '../constants'

const initialState = {
    isJoining:false,
    statusText:null
}

export default createReducer(initialState, {
    [JOIN_USER_REQUEST]:(state,payload)=>{
        return Object.assign({},state,{
            'isJoining':true,
            'statusText':null
        })
    },
    [JOIN_USER_SUCCESS]:(state,payload)=>{
        return Object.assign({},state,{
            'isJoining':false,
            'statusText':'성공했쩡'
        })
    },
    [JOIN_USER_FAILURE]:(state,payload)=>{
        return Object.assign({},state,{
            'isJoining':false,
            'stateusText':`Join Error: ${payload.status} ${payload.statusText}`
        })
    }
})