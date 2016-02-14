import {createReducer} from '../utils'
import {GET_BOARDS_REQUEST, GET_BOARDS_FAILURE, GET_BOARDS_SUCCESS,
        GET_BOARD_REQUEST, GET_BOARD_FAILURE, GET_BOARD_SUCCESS,
        GET_POST_REQUEST, GET_POST_FAILURE, GET_POST_SUCCESS} from '../constants'
import {normalize, Schema, arrayOf} from 'normalizr'

const initialState = {
    'isBoardLoading':false,
    'isPostLoading':false,
    'entities':null,
    'boards':[],
    'posts':[]
}

const boardSchema = new Schema('boards',{idAttribute:'_idx_'})
const postSchema = new Schema('posts',{idAttribute:'_idx_'})
const replySchema = new Schema('replies',{idAttribute:'_idx_'})



////////////// 게시판 선택 초반에 하는 엑션이 필요하다다다다다다다다다다다다...


/*board.define({
 board:arrayOf(board)
 })
/*post.define({
 replies:arrayOf(reply)
 })*/

export default createReducer(initialState, {
    [GET_BOARDS_REQUEST]:(state,payload)=>{
        return Object.assign({},state,{
            'isBoardsLoading':true
        })
    },
    [GET_BOARDS_FAILURE]:(state,payload)=>{
        return Object.assign({},state,{
            'isBoardsLoading':false,
            'boards':[]
        })
    },
    [GET_BOARDS_SUCCESS]:(state,payload)=>{
        const response = normalize(payload.boards, arrayOf(boardSchema))

        return Object.assign({},state,{
            'isBoardsLoading':false,
            'entities':response.entities,
            'boards':response.result
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
        console.log(payload)
        /*_posts_, _pagination_
        const response = normalize(payload.board, arrayOf(postSchema))*/

        return Object.assign({},state,{
            'isBoardLoading':false,
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