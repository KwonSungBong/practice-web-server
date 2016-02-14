import {checkHttpStatus, parseJSON} from '../utils'
import {SIGNIN_USER_REQUEST, SIGNIN_USER_FAILURE, SIGNIN_USER_SUCCESS, SIGNOUT_USER,
        SIGNUP_USER_REQUEST, SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS,
        DUPLICATE_USER_EMAIL_REQUEST, DUPLICATE_USER_EMAIL_FAILURE, DUPLICATE_USER_EMAIL_SUCCESS,
        DUPLICATE_USER_NAME_REQUEST, DUPLICATE_USER_NAME_FAILURE, DUPLICATE_USER_NAME_SUCCESS,
        GET_BOARDS_REQUEST, GET_BOARDS_FAILURE, GET_BOARDS_SUCCESS} from '../constants'
import {pushState} from 'redux-router'

export function signInUserSuccess(token, user){
    localStorage.setItem('token',token)
    return {
        type:SIGNIN_USER_SUCCESS,
        payload:{
            token: token,
            idx: user._idx_,
            email: user._email_,
            name: user._name_
        }
    }
}

export function signInUserFailure(error){
    localStorage.removeItem('token')
    return {
        type:SIGNIN_USER_FAILURE,
        payload:{
            status:error.response.status,
            statusText:error.response.statusText
        }
    }
}

export function signInUserRequest(){
    return {
        type:SIGNIN_USER_REQUEST
    }
}

export function signInUser(email, password, redirect="/"){
    return function(dispatch){
        dispatch(signInUserRequest())
        return fetch('http://localhost:3001/signIn',{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'userEmail':email,
                'userPassword':password
            }),
            mode: 'cors'
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response=>{
            try{
                dispatch(signInUserSuccess(response.accessToken, response.user))
                dispatch(pushState(null, redirect))
            }catch(e){
                dispatch(signInUserFailure({
                    response:{
                        status:403,
                        statusText:'Invalid token'
                    }
                }))
            }
        })
        .catch(error=>{
            dispatch(signInUserFailure(error))
        })
    }
}


export function signOut(){
    localStorage.removeItem('token')
    return {
        type:SIGNOUT_USER
    }
}

export function signOutAndRedirect(){
    return (dispatch,state)=>{
        dispatch(signOut())
        dispatch(pushState(null, '/signIn'))
    }
}

export function signUpUserSuccess(){
    return {
        type:SIGNUP_USER_SUCCESS
    }
}

export function signUpUserFailure(error){
    return {
        type:SIGNUP_USER_FAILURE,
        payload:{
            status:error.response.status,
            statusText:error.response.statusText
        }
    }
}

export function signUpUserRequest(){
    return {
        type:SIGNUP_USER_REQUEST
    }
}

export function signUpUser(email, password, name, redirect='/'){
    return function(dispatch){
        dispatch(signUpUserRequest())
        return fetch('http://localhost:3001/signUp/',{
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
                    dispatch(signUpUserSuccess())
                    dispatch(pushState(null,redirect))
                }catch(e){
                    dispatch(signUpUserFailure({
                        response:{
                            status:403,
                            statusText:'Invalid token'
                        }
                    }))
                }
            })
            .catch(error=>{
                dispatch(signUpUserFailure())
            })
    }
}

export function duplicateUserEmailSuccess(isDuplicateEmail, stateText){
    return {
        type:DUPLICATE_USER_EMAIL_SUCCESS,
        payload:{
            'isDuplicateEmail':isDuplicateEmail,
            'stateText':stateText
        }
    }
}

export function duplicateUserEmailFailure(){
    return {
        type:DUPLICATE_USER_EMAIL_FAILURE
    }
}

export function duplicateUserEmailRequest(){
    return {
        type:DUPLICATE_USER_EMAIL_REQUEST
    }
}

export function duplicateUserEmail(email){
    return function(dispatch){
        dispatch(duplicateUserEmailRequest())
        return fetch('http://localhost:3001/duplicate/user/email/'+email,{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            mode: 'cors'
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response=>{
            try{
                dispatch(duplicateUserEmailSuccess(response.duplicateState, response.message))
            }catch(e){
                dispatch(duplicateUserEmailFailure())
            }
        })
        .catch(error=>{
            dispatch(duplicateUserEmailFailure())
        })
    }
}

export function duplicateUserNameSuccess(isDuplicateName, stateText){
    return {
        type:DUPLICATE_USER_NAME_SUCCESS,
        payload:{
            'isDuplicateName':isDuplicateName,
            'stateText':stateText
        }
    }
}

export function duplicateUserNameFailure(){
    return {
        type:DUPLICATE_USER_NAME_FAILURE
    }
}

export function duplicateUserNameRequest(){
    return {
        type:DUPLICATE_USER_NAME_REQUEST
    }
}

export function duplicateUserName(name){
    return function(dispatch){
        dispatch(duplicateUserNameRequest())
        return fetch('http://localhost:3001/duplicate/user/name/'+name,{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            mode: 'cors'
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response=>{
            try{
                dispatch(duplicateUserNameSuccess(response.duplicateState, response.message))
            }catch(e){
                dispatch(duplicateUserEmailFailure())
            }
        })
        .catch(error=>{
            dispatch(duplicateUserNameFailure())
        })
    }
}


export function getBoardsSuccess(boards){
    return {
        type:GET_BOARDS_SUCCESS,
        payload:{
            boards:boards
        }
    }
}

export function getBoardsFailure(){
    return {
        type:GET_BOARDS_FAILURE
    }
}

export function getBoardsRequest(){
    return {
        type:GET_BOARDS_REQUEST
    }
}

export function getBoards(){
    const token = localStorage.getItem('token')
    return function(dispatch){
        dispatch(getBoardsRequest())
        return fetch('http://localhost:3001/boards/',{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors'
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response=>{
            try{
                dispatch(getBoardsSuccess(response.boards))
            }catch(e){
                dispatch(getBoardsFailure())
            }
        })
        .catch(error=>{
            dispatch(getBoardsFailure())
        })
    }
}
