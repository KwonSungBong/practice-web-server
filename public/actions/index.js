import {checkHttpStatus, parseJSON} from '../utils'
import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER
        ,JOIN_USER_REQUEST, JOIN_USER_FAILURE, JOIN_USER_SUCCESS} from '../constants'
import {pushState} from 'redux-router'

export function loginUserSuccess(token){
    localStorage.setItem('token',token)
    return {
        type:LOGIN_USER_SUCCESS,
        payload:{
            token:token
        }
    }
}

export function loginUserFailure(error){
    localStorage.removeItem('token')
    return {
        type:LOGIN_USER_FAILURE,
        payload:{
            status:error.response.status,
            statusText:error.response.statusText
        }
    }
}
export function loginUserRequest(){
    return {
        type:LOGIN_USER_REQUEST
    }
}

export function logout(){
    localStorage.removeItem('token')
    return {
        type:LOGOUT_USER
    }
}

export function joinUserSuccess(){
    return {
        type:JOIN_USER_SUCCESS
    }
}

export function joinUserFailure(error){
    return {
        type:JOIN_USER_FAILURE,
        payload:{
            status:error.response.status,
            statusText:error.response.statusText
        }
    }
}

export function joinUserRequest(){
    return {
        type:JOIN_USER_REQUEST
    }
}

export function logoutAndRedirect(){
    return (dispatch,state)=>{
        dispatch(logout())
        dispatch(pushState(null, '/login'))
    }
}

export function loginUser(email, password, redirect="/"){
    return function(dispatch){
        dispatch(loginUserRequest())
        return fetch('http://localhost:3000/auth/login/',{
            method:'post',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':email,'password':password})
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response=>{
            try{
                dispatch(loginUserSuccess(response.token))
                dispatch(pushState(null, redirect))
            }catch(e){
                dispatch(loginUserFailure({
                    response:{
                        status:403,
                        statusText:'Invalid token'
                    }
                }))
            }
        })
        .catch(error=>{
            dispatch(loginUserFailure(error))
        })
    }
}

export function joinUser(email, password, name, redirect='/'){
    return function(dispatch){
        dispatch(joinUserRequest())
        return fetch('http://localhost:3000/auth/join/',{
            method:'post',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':email,'password':password,'name':name})
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response=>{
            try{
                dispatch(joinUserSuccess())
                dispatch(pushState(null,redirect))
            }catch(e){
                dispatch(joinUserFailure({
                    response:{
                        status:403,
                        statusText:'Invalid token'
                    }
                }))
            }
        })
        .catch(error=>{
            dispatch(joinUserFailure())
        })
    }
}