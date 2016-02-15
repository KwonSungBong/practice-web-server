import {createReducer} from '../utils'
import merge from 'lodash/merge'
import union from 'lodash/union'
import {GET_BOARDS_REQUEST, GET_BOARDS_FAILURE, GET_BOARDS_SUCCESS,
        GET_BOARD_REQUEST, GET_BOARD_FAILURE, GET_BOARD_SUCCESS,
        SELECT_BOARD,
        GET_POST_REQUEST, GET_POST_FAILURE, GET_POST_SUCCESS} from '../constants'
import {normalize, Schema, arrayOf} from 'normalizr'

const initialState = {
    'isBoardLoading':false,
    'isPostLoading':false,
    'selectedBoardIdx':1,
    'entities':null
}

const boardSchema = new Schema('boards',{idAttribute:'_idx_'})
const postSchema = new Schema('posts',{idAttribute:'_idx_'})
const replySchema = new Schema('replies',{idAttribute:'_idx_'})

export default createReducer(initialState, {
    [GET_BOARDS_REQUEST]:(state,payload)=>{
        return Object.assign({},state,{
            'isBoardsLoading':true
        })
    },
    [GET_BOARDS_FAILURE]:(state,payload)=>{
        return Object.assign({},state,{
            'isBoardsLoading':false
        })
    },
    [GET_BOARDS_SUCCESS]:(state,payload)=>{
        const response = normalize(payload.boards, arrayOf(boardSchema))

        return Object.assign({},state,{
            'isBoardsLoading':false,
            'entities':response.entities
        })
    },
    [SELECT_BOARD]:(state,payload)=>{
        return Object.assign({},state,{
            'selectedBoardIdx':payload.idx
        })
    },
    [GET_BOARD_REQUEST]:(state,payload)=>{
        return Object.assign({},state,{
            'isBoardLoading':true
        })
    },
    [GET_BOARD_FAILURE]:(state,payload)=>{
        return Object.assign({},state,{
            'isBoardLoading':false,
        })
    },
    [GET_BOARD_SUCCESS]:(state,payload)=>{
        const postResponse = normalize(payload.board._posts_, arrayOf(postSchema))

        state.entities.boards[payload.board._idx_]._posts_ = postResponse.result
        state.entities.boards[payload.board._idx_]._pagination_ = payload.board._pagination_;
        state.entities.boards[payload.board._idx_]._searchCondition_ = payload.board._searchCondition_;

        return Object.assign({},state,{
            'isBoardLoading':false,
            'entities':merge(state.entities, postResponse.entities)
        })
    },
    [GET_POST_REQUEST]:(state,payload)=>{
        return Object.assign({},state,{
            'isPostLoading':true
        })
    },
    [GET_POST_FAILURE]:(state,payload)=>{
        return Object.assign({},state,{
            'isPostLoading':false,
        })
    },
    [GET_POST_SUCCESS]:(state,payload)=>{
        return Object.assign({},state,{
            'isPostLoading':false,
        })
    }
})