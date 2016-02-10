import {createReducer} from '../utils'
import {DUPLICATE_USER_EMAIL_REQUEST, DUPLICATE_USER_EMAIL_FAILURE, DUPLICATE_USER_EMAIL_SUCCESS,
        DUPLICATE_USER_NAME_REQUEST, DUPLICATE_USER_NAME_FAILURE, DUPLICATE_USER_NAME_SUCCESS} from '../constants'

const initialState = {
    'isDuplicateEmail': false,
    'isDuplicateName': false,
    'stateText': null
}

export default createReducer(initialState, {
    [DUPLICATE_USER_EMAIL_REQUEST]: (state, payload)=> {
        return Object.assign({}, state, {
        })
    },
    [DUPLICATE_USER_EMAIL_FAILURE]: (state, payload)=> {
        return Object.assign({}, state, {
            'isDuplicateEmail': false
        })
    },
    [DUPLICATE_USER_EMAIL_SUCCESS]: (state, payload)=> {
        return Object.assign({}, state, {
            'isDuplicateEmail': payload.isDuplicateEmail,
            'stateText': payload.message
        })
    },
    [DUPLICATE_USER_NAME_REQUEST]: (state, payload)=> {
        return Object.assign({}, state, {
        })
    },
    [DUPLICATE_USER_NAME_FAILURE]: (state, payload)=> {
        return Object.assign({}, state, {
            'isDuplicateName': false
        })
    },
    [DUPLICATE_USER_NAME_SUCCESS]: (state, payload)=> {
        return Object.assign({}, state, {
            'isDuplicateName': payload.isDuplicateName,
            'stateText': payload.message
        })
    }
})