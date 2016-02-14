import {createReducer} from '../utils'
import {GET_BOARDS_REQUEST, GET_BOARDS_FAILURE, GET_BOARDS_SUCCESS} from '../constants'
import {normalize, Schema, arrayOf} from 'normalizr'

const initialState = {
    'isLoading':false,
    'boards':[]
}




const boardSchema = new Schema('boards',{idAttribute:'idx'})
const menuSchema = new Schema('menus')

/*boardSchema.define({
    menus:arrayOf(menuSchema)
})*/

/*const post = new Schema('posts',{idAttribute:'idx'})
 const reply = new Schema('replies',{idAttribute:'idx'})*/

/*board.define({
 board:arrayOf(board)
 })
/*post.define({
 replies:arrayOf(reply)
 })*/


export default createReducer(initialState, {
    [GET_BOARDS_REQUEST]:(state,payload)=>{
        return Object.assign({},state,{
            'isLoading':true
        })
    },
    [GET_BOARDS_FAILURE]:(state,payload)=>{
        return Object.assign({},state,{
            'isLoading':false,
            'boards':[]
        })
    },
    [GET_BOARDS_SUCCESS]:(state,payload)=>{
        console.log(payload.boards)
        console.log(normalize(payload.boards, arrayOf(boardSchema)))

        return Object.assign({},state,{
            'isLoading':false,
            'boards':[]
        })
    }
})